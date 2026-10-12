// src/common/service/storage.service.ts
import { PutObjectCommand } from '@aws-sdk/client-s3';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { envConfig } from '@/config/env.config';
import { s3Client } from '@/config/s3.config';
import { AppError } from '@/common/errors';
import { createLogger } from '@/common/logger';

const logger = createLogger('StorageService');

export interface UploadFileInput {
  fileName: string;
  fileType?: string;
  base64: string;
  folder?: string; // Tùy chọn gom nhóm: 'reviews', 'avatars', 'chats', 'products'
}

export interface UploadFileResult {
  url: string;
  type: 'image' | 'video' | 'file';
  key: string;
}

export class StorageService {
  private bucketName: string;

  constructor() {
    this.bucketName = envConfig.S3_BUCKET_NAME || 'fashion-uploads';
  }

  async uploadBase64(input: UploadFileInput): Promise<UploadFileResult> {
    if (!input.base64) {
      throw new AppError('Dữ liệu base64 không được để trống', 400);
    }

    // 1. Tách header data URL nếu có (vd: data:image/png;base64,...)
    let cleanBase64 = input.base64;
    let mimeType = input.fileType || '';

    if (input.base64.includes(';base64,')) {
      const parts = input.base64.split(';base64,');
      cleanBase64 = parts[1];
      if (!mimeType) {
        mimeType = parts[0].replace('data:', '');
      }
    }

    // 2. Chuyển đổi Base64 sang Buffer
    const buffer = Buffer.from(cleanBase64, 'base64');
    if (buffer.length === 0) {
      throw new AppError('File rỗng hoặc mã hóa base64 không hợp lệ', 400);
    }

    // Giới hạn dung lượng: 10MB (ảnh/video ngắn)
    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    if (buffer.length > MAX_FILE_SIZE) {
      throw new AppError('Kích thước file vượt quá giới hạn cho phép (10MB)', 413);
    }

    // 3. Phân loại loại tệp (Image / Video) & xác định đuôi mở rộng
    const extFromFilename = path.extname(input.fileName);
    let ext = extFromFilename;
    if (!ext) {
      if (mimeType.includes('png')) ext = '.png';
      else if (mimeType.includes('webp')) ext = '.webp';
      else if (mimeType.includes('mp4')) ext = '.mp4';
      else if (mimeType.includes('quicktime') || mimeType.includes('mov')) ext = '.mov';
      else ext = '.jpg';
    }

    const isVideo =
      mimeType.startsWith('video') ||
      ['.mp4', '.mov', '.webm', '.avi'].includes(ext.toLowerCase());
    const type: 'image' | 'video' = isVideo ? 'video' : 'image';

    // 4. Tạo đường dẫn key duy nhất trên bucket (phân theo thư mục)
    const folder = input.folder ? `${input.folder}/` : 'general/';
    const uniqueFileName = `${Date.now()}-${uuidv4()}${ext}`;
    const fileKey = `${folder}${uniqueFileName}`;

    // 5. Gửi lệnh PutObject tải trực tiếp lên Supabase S3
    try {
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fileKey,
        Body: buffer,
        ContentType: mimeType || (isVideo ? 'video/mp4' : 'image/jpeg'),
      });

      await s3Client.send(command);
    } catch (err: any) {
      logger.error({ err, fileKey }, 'Lỗi khi upload file lên S3 Storage');
      throw new AppError(`Tải file lên cloud thất bại: ${err.message}`, 500);
    }

    // 6. Xây dựng Public URL từ Supabase Project URL
    // Với Public Bucket của Supabase, link truy cập trực tiếp có dạng:
    // https://<project-ref>.supabase.co/storage/v1/object/public/<bucket-name>/<fileKey>
    const baseUrl = (envConfig.S3_ENDPOINT || '').replace('/s3', '').replace(/\/$/, '');
    const publicUrl = `${baseUrl}/object/public/${this.bucketName}/${fileKey}`;

    return {
      url: publicUrl,
      type,
      key: fileKey,
    };
  }
}

export const storageService = new StorageService();