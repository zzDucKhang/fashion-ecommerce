// src/config/s3.config.ts
import { S3Client } from '@aws-sdk/client-s3';
import { envConfig } from './env.config';

if (!envConfig.S3_ACCESS_KEY || !envConfig.S3_SECRET_KEY || !envConfig.S3_ENDPOINT) {
  console.warn('⚠️ S3 credentials chưa được cấu hình đầy đủ trong file .env');
}

export const s3Client = new S3Client({
  region: envConfig.S3_REGION || 'ap-southeast-1',
  endpoint: envConfig.S3_ENDPOINT,
  credentials: {
    accessKeyId: envConfig.S3_ACCESS_KEY || '',
    secretAccessKey: envConfig.S3_SECRET_KEY || '',
  },
  forcePathStyle: true, // Bắt buộc cho Supabase Storage / MinIO / R2
});