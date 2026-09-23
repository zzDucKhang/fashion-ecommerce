import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  
  ACCESS_TOKEN_SECRET: z.string().min(1),
  ACCESS_TOKEN_EXPIRES_IN: z.string().default('1h'),
  REFRESH_TOKEN_SECRET: z.string().min(1),
  REFRESH_TOKEN_EXPIRES_IN: z.string().default('1d'),
  
  PAYMENT_API_KEY: z.string().min(1),
  
  S3_ENDPOINT: z.string().optional(),
  S3_REGION: z.string().optional(),
  S3_ACCESS_KEY: z.string().optional(),
  S3_SECRET_KEY: z.string().optional(),
  S3_BUCKET_NAME: z.string().optional(),
})

const parseResult = envSchema.safeParse(process.env)

if (!parseResult.success) {
  console.error('❌ Các biến môi trường khai báo trong .env không hợp lệ:')
  console.error(parseResult.error.flatten().fieldErrors)
  process.exit(1)
}

export const envConfig = parseResult.data
export type EnvConfigType = z.infer<typeof envSchema>