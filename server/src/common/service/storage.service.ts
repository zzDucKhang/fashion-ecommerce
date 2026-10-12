import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { envConfig } from '@/config/env.config';
import { AppError } from '@/common/errors';

export interface UploadFileInput {
  fileName: string;
  fileType: string;
  base64: string;
}

export interface UploadFileResult {
  url: string;
  type: 'image' | 'video' | 'file';
}

export class StorageService {
  private uploadsDir: string;

  constructor() {
    this.uploadsDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(this.uploadsDir)) {
      fs.mkdirSync(this.uploadsDir, { recursive: true });
    }
  }

  async uploadBase64(input: UploadFileInput, reqProtocol = 'http', reqHost = `localhost:${envConfig.PORT}`): Promise<UploadFileResult> {
    if (!input.base64) {
      throw new AppError('Dữ liệu base64 không được để trống', 400);
    }

    // Clean base64 header if present (e.g. data:image/png;base64,...)
    let cleanBase64 = input.base64;
    let mimeType = input.fileType || '';
    if (input.base64.includes(';base64,')) {
      const parts = input.base64.split(';base64,');
      cleanBase64 = parts[1];
      if (!mimeType) {
        mimeType = parts[0].replace('data:', '');
      }
    }

    const buffer = Buffer.from(cleanBase64, 'base64');
    if (buffer.length === 0) {
      throw new AppError('File rỗng hoặc mã hóa base64 không hợp lệ', 400);
    }

    // Limit to 10MB
    if (buffer.length > 10 * 1024 * 1024) {
      throw new AppError('Kích thước file vượt quá giới hạn 10MB', 413);
    }

    const ext = path.extname(input.fileName) || (mimeType.includes('png') ? '.png' : mimeType.includes('mp4') ? '.mp4' : '.jpg');
    const uniqueFileName = `${Date.now()}-${uuidv4()}${ext}`;
    const filePath = path.join(this.uploadsDir, uniqueFileName);

    await fs.promises.writeFile(filePath, buffer);

    const isVideo = mimeType.startsWith('video') || ext === '.mp4' || ext === '.mov' || ext === '.webm';
    const type: 'image' | 'video' = isVideo ? 'video' : 'image';

    const url = `${reqProtocol}://${reqHost}/uploads/${uniqueFileName}`;

    return {
      url,
      type,
    };
  }
}

export const storageService = new StorageService();
