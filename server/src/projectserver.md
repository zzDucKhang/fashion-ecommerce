# Project Dump

**Root:** `C:\Programing\cnpm\fashion-ecom\server\src`

**Generated:** 2026-10-13 17:12:15.731065

**Files:** 133 | **Total size:** 396,139 bytes

---

# app.ts

| Property | Value |
|----------|-------|
| Path | `app.ts` |
| Size | 1,750 bytes |
| Extension | `.ts` |
| Modified | 2026-10-13 00:59:03.238042 |

```typescript
import express, { Express } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import pinoHttp from 'pino-http'
import { errorFilter } from '@/middlewares/filters/error.filter'

// Import 6 router tổng của 6 phân hệ
import { identityRouter } from '@/modules/identity/identity.routes'
import { catalogRouter } from '@/modules/catalog/catalog.routes'
import { cartOrderRouter } from '@/modules/cart-order/cart-order.routes'
import { inventorySaleRouter } from '@/modules/inventory-sale/inventory-sale.routes'
import { fulfillmentRouter } from '@/modules/fulfillment/fulfillment.routes'
import { loyaltyEngageRouter } from '@/modules/loyalty-engage/loyalty-engage.routes'
import { sepayWebhookRouter } from '@/modules/fulfillment/payment/payment.routes'

export const createApp = (): Express => {
  const app = express()

  app.use(helmet())
  app.use(cors())

  // QUAN TRONG QUAN TRONG QUAN TRONG. 
  // SePay webhook khong dung express.json()
  app.use('/api/v1/fulfillment/payments/webhook', sepayWebhookRouter)

  app.use(express.json({ limit: '10mb' }))
  app.use(express.urlencoded({ extended: true }))
  app.use(pinoHttp({ autoLogging: false }))

  // Health check
  app.get('/health', (_, res) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime() })
  })

  // Đăng ký 6 Route tổng
  app.use('/api/v1/identity', identityRouter)
  app.use('/api/v1/catalog', catalogRouter)
  app.use('/api/v1/cart-order', cartOrderRouter)
  app.use('/api/v1/inventory-sale', inventorySaleRouter)
  app.use('/api/v1/fulfillment', fulfillmentRouter)
  app.use('/api/v1/loyalty-engage', loyaltyEngageRouter)

  // Global Error Handler
  app.use(errorFilter)

  return app
}
```

# common\constants\index.ts

| Property | Value |
|----------|-------|
| Path | `common\constants\index.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-09-23 09:04:55.515028 |

```typescript

```

# common\errors\index.ts

| Property | Value |
|----------|-------|
| Path | `common\errors\index.ts` |
| Size | 1,844 bytes |
| Extension | `.ts` |
| Modified | 2026-09-29 13:25:28.361684 |

```typescript
import { Prisma } from '@prisma/client'

export const isUniqueConstraintPrismaError = (
  error: any,
): error is Prisma.PrismaClientKnownRequestError => {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002'
}

export const isNotFoundPrismaError = (
  error: any,
): error is Prisma.PrismaClientKnownRequestError => {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025'
}

export class AppError extends Error {
  public readonly statusCode: number
  public readonly isOperational: boolean

  constructor(message: string, statusCode = 500, isOperational = true) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational

    // Giữ nguyên stack trace sạch
    Error.captureStackTrace(this, this.constructor)
  }
}

// Các class lỗi kế thừa tiện dùng theo chuẩn HTTP Status Code
export class NotFoundError extends AppError {
  constructor(message = 'Bản ghi không tồn tại') {
    super(message, 404)
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Dữ liệu không hợp lệ') {
    super(message, 400)
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Chưa xác thực danh tính') {
    super(message, 401)
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Bạn không có quyền thực hiện hành động này') {
    super(message, 403)
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Dữ liệu đã tồn tại') {
    super(message, 409)
  }
}

export class UnprocessableEntityError extends AppError {
  constructor(message = 'Dữ liệu thực thể không thể xử lý') {
    super(message, 422)
  }
}


```

# common\helpers\index.ts

| Property | Value |
|----------|-------|
| Path | `common\helpers\index.ts` |
| Size | 38 bytes |
| Extension | `.ts` |
| Modified | 2026-09-29 13:25:28.363340 |

```typescript
export const ALL_LANGUAGE_CODE = 'all'
```

# common\logger\index.ts

| Property | Value |
|----------|-------|
| Path | `common\logger\index.ts` |
| Size | 1,127 bytes |
| Extension | `.ts` |
| Modified | 2026-10-06 21:26:07.965571 |

```typescript
// src/common/logger/index.ts
import pino from 'pino'
import { envConfig } from '@/config/env.config'

/**
 * Enterprise-grade structured logger using pino.
 * Creates child loggers for each module to enable structured log filtering
 * in K8s/ELK/Datadog environments via the `module` field.
 *
 * Usage:
 *   import { createLogger } from '@/common/logger'
 *   const logger = createLogger('PointService')
 *   logger.info({ userId, orderId }, 'Points earned successfully')
 */
const rootLogger = pino({
  level: envConfig.NODE_ENV === 'production' ? 'info' : 'debug',
  transport:
    envConfig.NODE_ENV === 'development'
      ? { target: 'pino-pretty', options: { colorize: true, translateTime: 'SYS:standard' } }
      : undefined,
  serializers: pino.stdSerializers,
  base: { pid: process.pid, env: envConfig.NODE_ENV },
})

/**
 * Creates a child logger scoped to a specific module name.
 * All log entries from this child logger will include `{ module: name }`.
 */
export function createLogger(module: string) {
  return rootLogger.child({ module })
}

export { rootLogger as logger }

```

# common\service\mail.ts

| Property | Value |
|----------|-------|
| Path | `common\service\mail.ts` |
| Size | 1,134 bytes |
| Extension | `.ts` |
| Modified | 2026-09-30 08:12:14.902012 |

```typescript
import { mailTransporter } from '@/config/mail';
import { envConfig } from '@/config/env.config';

export const sendVerificationEmail = (to: string, code: string) => {
  return mailTransporter.sendMail({
    from: `"Fashion Store" <${envConfig.MAIL_USER}>`,
    to,
    subject: 'Mã xác thực OTP – Fashion Store',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:8px">
        <h2 style="color:#111827">Mã xác thực của bạn</h2>
        <p style="color:#374151">Sử dụng mã OTP dưới đây để xác thực tài khoản:</p>
        <div style="font-size:36px;font-weight:bold;letter-spacing:8px;text-align:center;color:#4f46e5;padding:16px 0">${code}</div>
        <p style="color:#6b7280;font-size:14px">⏱ Mã có hiệu lực trong <strong>15 phút</strong> kể từ khi nhận được email này.</p>
        <p style="color:#6b7280;font-size:13px">⚠️ Không chia sẻ mã này với bất kỳ ai. Fashion Store sẽ không bao giờ hỏi mã OTP của bạn.</p>
      </div>
    `,
  });
};
```

# common\service\storage.service.ts

| Property | Value |
|----------|-------|
| Path | `common\service\storage.service.ts` |
| Size | 3,963 bytes |
| Extension | `.ts` |
| Modified | 2026-10-13 01:33:24.826280 |

```typescript
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
```

# common\websocket.ts

| Property | Value |
|----------|-------|
| Path | `common\websocket.ts` |
| Size | 5,675 bytes |
| Extension | `.ts` |
| Modified | 2026-10-13 01:30:17.991843 |

```typescript
// src/common/websocket.ts
import { Server as HttpServer } from 'http'
import { Server as SocketIOServer, Socket } from 'socket.io'
import { createAdapter } from '@socket.io/redis-adapter'
import Redis from 'ioredis'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { prisma } from '@/database/prisma'
import { envConfig } from '@/config/env.config'
import { createLogger } from './logger'

const logger = createLogger('WebSocketGateway')

let io: SocketIOServer | null = null
let pubClient: Redis | null = null
let subClient: Redis | null = null

export interface ChatMessagePayload {
  content: string
  receiverId?: number
  senderId?: number
  [key: string]: unknown
}

/**
 * Initializes Socket.io with Redis Pub/Sub Adapter for horizontal multi-node scaling.
 * Dedicated pubClient and subClient ensure cross-pod messaging in distributed environments.
 */
export function initWebSocket(httpServer: HttpServer): SocketIOServer {
  if (io) {
    logger.warn('WebSocket server already initialized. Returning existing instance.')
    return io
  }

  logger.info('Initializing WebSocket server with Redis Pub/Sub adapter...')

  const redisOptions = {
    maxRetriesPerRequest: null,
    enableReadyCheck: true,
    tls: envConfig.REDIS_URL.startsWith('rediss://') ? { rejectUnauthorized: false } : undefined,
  }

  pubClient = new Redis(envConfig.REDIS_URL, redisOptions)
  subClient = new Redis(envConfig.REDIS_URL, redisOptions)

  pubClient.on('connect', () => {
    logger.info('Redis PubClient connected successfully for WebSocket')
  })

  pubClient.on('error', (err) => {
    logger.error({ err }, 'Redis PubClient encountered an error')
  })

  subClient.on('connect', () => {
    logger.info('Redis SubClient connected successfully for WebSocket')
  })

  subClient.on('error', (err) => {
    logger.error({ err }, 'Redis SubClient encountered an error')
  })

  // 2. Initialize Socket.IO with CORS & Redis adapter
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      credentials: true,
    },
    transports: ['websocket', 'polling'],
    pingInterval: 25000,
    pingTimeout: 20000,
    adapter: createAdapter(pubClient, subClient),
  })

  io.use((socket, next) => {
    const token = socket.handshake.auth.token
    if (typeof token !== 'string' || !token) {
      return next(new Error('Authentication required'))
    }

    try {
      const payload = jwt.verify(token, envConfig.ACCESS_TOKEN_SECRET) as JwtPayload
      if (typeof payload.userId !== 'number' || typeof payload.roleId !== 'number') {
        return next(new Error('Invalid authentication token'))
      }

      socket.data.userId = payload.userId
      socket.data.roleId = payload.roleId
      next()
    } catch {
      next(new Error('Invalid authentication token'))
    }
  })

  // 3. Socket event handlers
  io.on('connection', (socket: Socket) => {
    const userId = socket.data.userId as number
    const roleId = socket.data.roleId as number

    logger.info({ socketId: socket.id, userId }, 'New WebSocket client connected')

    const userRoom = `user:${userId}`
    socket.join(userRoom)
    logger.debug({ socketId: socket.id, userRoom }, 'Socket joined user room')

    socket.on('join_shop', async () => {
      try {
        const user = await prisma.user.findUnique({
          where: { id: userId },
          select: { roleId: true, role: { select: { code: true, isActive: true, deletedAt: true } } },
        })
        if (
          user?.roleId !== roleId ||
          !user.role.isActive ||
          user.role.deletedAt ||
          !['ADMIN', 'STAFF'].includes(user.role.code)
        ) {
          socket.emit('chat_error', { message: 'Bạn không có quyền truy cập hộp thư cửa hàng' })
          return
        }

        socket.join('shop')
      } catch (err) {
        logger.error({ err, socketId: socket.id, userId }, 'Failed to authorize shop socket room')
        socket.emit('chat_error', { message: 'Không thể kết nối hộp thư cửa hàng' })
      }
    })

    socket.on('disconnect', (reason) => {
      logger.info({ socketId: socket.id, userId, reason }, 'WebSocket client disconnected')
    })

    socket.on('error', (err) => {
      logger.error({ socketId: socket.id, err }, 'Socket client encountered an error')
    })
  })

  logger.info('WebSocket server initialized and listening')
  return io
}

/**
 * Returns the active Socket.IO server instance.
 */
export function getIO(): SocketIOServer {
  if (!io) {
    throw new Error('WebSocket server has not been initialized. Call initWebSocket() first.')
  }
  return io
}

/**
 * Gracefully shuts down Socket.IO server and closes Redis pub/sub connections.
 */
export async function closeWebSocket(): Promise<void> {
  logger.info('Closing WebSocket server and Redis connections...')

  if (io) {
    await new Promise<void>((resolve) => {
      io!.close(() => {
        logger.info('Socket.IO server closed')
        resolve()
      })
    })
    io = null
  }

  if (pubClient) {
    try {
      await pubClient.quit()
      logger.info('Redis PubClient disconnected')
    } catch (err) {
      logger.error({ err }, 'Error disconnecting Redis PubClient')
    }
    pubClient = null
  }

  if (subClient) {
    try {
      await subClient.quit()
      logger.info('Redis SubClient disconnected')
    } catch (err) {
      logger.error({ err }, 'Error disconnecting Redis SubClient')
    }
    subClient = null
  }
}

```

# config\env.config.ts

| Property | Value |
|----------|-------|
| Path | `config\env.config.ts` |
| Size | 1,397 bytes |
| Extension | `.ts` |
| Modified | 2026-10-11 17:23:08.175689 |

```typescript
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
  
  SEPAY_QR_BASE_URL: z.string().optional(),
  SEPAY_ACCOUNT_NUMBER: z.string().optional(),
  SEPAY_BANK_CODE: z.string().optional(),
  SEPAY_WEBHOOK_SECRET: z.string().optional(),
  
  S3_ENDPOINT: z.string().optional(),
  S3_REGION: z.string().optional(),
  S3_ACCESS_KEY: z.string().optional(),
  S3_SECRET_KEY: z.string().optional(),
  S3_BUCKET_NAME: z.string().optional(),
  

  MAIL_USER: z.string().email(),
  MAIL_PASS: z.string().min(1),
})

const parseResult = envSchema.safeParse(process.env)

if (!parseResult.success) {
  console.error('❌ Các biến môi trường khai báo trong .env không hợp lệ: (tự tạo file env theo hàm envSchema trên trong file env.config.ts)')
  console.error(parseResult.error.flatten().fieldErrors)
  process.exit(1)
}

export const envConfig = parseResult.data
export type EnvConfigType = z.infer<typeof envSchema>

```

# config\mail.ts

| Property | Value |
|----------|-------|
| Path | `config\mail.ts` |
| Size | 256 bytes |
| Extension | `.ts` |
| Modified | 2026-09-30 08:12:14.906235 |

```typescript
import nodemailer from 'nodemailer';
import { envConfig } from '@/config/env.config';

export const mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: envConfig.MAIL_USER,
    pass: envConfig.MAIL_PASS,
  },
});
```

# config\s3.config.ts

| Property | Value |
|----------|-------|
| Path | `config\s3.config.ts` |
| Size | 643 bytes |
| Extension | `.ts` |
| Modified | 2026-10-13 01:33:03.882559 |

```typescript
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
```

# database\prisma.ts

| Property | Value |
|----------|-------|
| Path | `database\prisma.ts` |
| Size | 440 bytes |
| Extension | `.ts` |
| Modified | 2026-10-11 16:52:36.673292 |

```typescript
import { PrismaClient } from '@prisma/client'
import { envConfig } from '@/config/env.config'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: envConfig.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (envConfig.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

```

# database\redis.ts

| Property | Value |
|----------|-------|
| Path | `database\redis.ts` |
| Size | 759 bytes |
| Extension | `.ts` |
| Modified | 2026-10-13 01:18:16.881028 |

```typescript
import Redis from 'ioredis'
import { default as Redlock } from 'redlock'
import { envConfig } from '@/config/env.config'

export const redisClient = new Redis(envConfig.REDIS_URL, {
  maxRetriesPerRequest: null, // Giữ nguyên cho BullMQ / Worker
  tls: envConfig.REDIS_URL.startsWith('rediss://') ? { rejectUnauthorized: false } : undefined,
  connectTimeout: 10000,
})

redisClient.on('connect', () => {
  console.log('✅ Kết nối Redis Cloud thành công')
})

redisClient.on('error', (err) => {
  console.error('❌ Lỗi kết nối Redis Cloud:', err)
})

export const redlock = new Redlock([redisClient], {
  driftFactor: 0.01,
  retryCount: 3,
  retryDelay: 200,
  retryJitter: 200,
  automaticExtensionThreshold: 500,
})
```

# database\seeds\create-permission.ts

| Property | Value |
|----------|-------|
| Path | `database\seeds\create-permission.ts` |
| Size | 9,981 bytes |
| Extension | `.ts` |
| Modified | 2026-10-01 17:02:22.943305 |

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// 1. Danh sách Permissions chuẩn theo các Module của dự án
const PERMISSIONS = [
  // --- MODULE: IDENTITY (User, Role, Permission) ---
  { code: 'USER:VIEW', module: 'IDENTITY', description: 'Xem danh sách và chi tiết người dùng' },
  { code: 'USER:UPDATE', module: 'IDENTITY', description: 'Cập nhật thông tin người dùng' },
  { code: 'USER:STATUS_UPDATE', module: 'IDENTITY', description: 'Khóa / Mở khóa tài khoản người dùng' },
  { code: 'USER:DELETE', module: 'IDENTITY', description: 'Xóa người dùng' },

  { code: 'ROLE:VIEW', module: 'IDENTITY', description: 'Xem danh sách và chi tiết vai trò' },
  { code: 'ROLE:CREATE', module: 'IDENTITY', description: 'Tạo vai trò mới' },
  { code: 'ROLE:UPDATE', module: 'IDENTITY', description: 'Cập nhật vai trò và gán quyền' },
  { code: 'ROLE:DELETE', module: 'IDENTITY', description: 'Xóa vai trò' },

  { code: 'PERMISSION:VIEW', module: 'IDENTITY', description: 'Xem danh sách quyền hệ thống' },
  { code: 'PERMISSION:CREATE', module: 'IDENTITY', description: 'Tạo quyền hệ thống mới' },
  { code: 'PERMISSION:UPDATE', module: 'IDENTITY', description: 'Cập nhật quyền hệ thống' },
  { code: 'PERMISSION:DELETE', module: 'IDENTITY', description: 'Xóa quyền hệ thống' },

  // --- MODULE: CATALOG (Category, Brand, Product, Variant, Tag) ---
  { code: 'CATEGORY:VIEW', module: 'CATALOG', description: 'Xem danh mục sản phẩm' },
  { code: 'CATEGORY:CREATE', module: 'CATALOG', description: 'Tạo danh mục sản phẩm' },
  { code: 'CATEGORY:UPDATE', module: 'CATALOG', description: 'Cập nhật danh mục sản phẩm' },
  { code: 'CATEGORY:DELETE', module: 'CATALOG', description: 'Xóa danh mục sản phẩm' },

  { code: 'BRAND:VIEW', module: 'CATALOG', description: 'Xem thương hiệu' },
  { code: 'BRAND:CREATE', module: 'CATALOG', description: 'Tạo thương hiệu' },
  { code: 'BRAND:UPDATE', module: 'CATALOG', description: 'Cập nhật thương hiệu' },
  { code: 'BRAND:DELETE', module: 'CATALOG', description: 'Xóa thương hiệu' },

  { code: 'PRODUCT:VIEW', module: 'CATALOG', description: 'Xem sản phẩm' },
  { code: 'PRODUCT:CREATE', module: 'CATALOG', description: 'Tạo sản phẩm mới' },
  { code: 'PRODUCT:UPDATE', module: 'CATALOG', description: 'Cập nhật thông tin sản phẩm' },
  { code: 'PRODUCT:DELETE', module: 'CATALOG', description: 'Xóa sản phẩm' },

  { code: 'VARIANT:MANAGE', module: 'CATALOG', description: 'Đồng bộ và quản lý biến thể, thuộc tính' },

  { code: 'TAG:MANAGE', module: 'CATALOG', description: 'Quản lý thẻ tag sản phẩm' },
  { code: 'LANGUAGE:MANAGE', module: 'CATALOG', description: 'Quản lý ngôn ngữ và bản dịch' },

  // --- MODULE: CART & ORDER ---
  { code: 'ORDER:VIEW', module: 'CART_ORDER', description: 'Xem danh sách và chi tiết đơn hàng' },
  { code: 'ORDER:CREATE', module: 'CART_ORDER', description: 'Tạo đơn hàng mới' },
  { code: 'ORDER:CANCEL', module: 'CART_ORDER', description: 'Hủy đơn hàng' },
  { code: 'ORDER:STATUS_UPDATE', module: 'CART_ORDER', description: 'Cập nhật trạng thái đơn hàng (Duyệt, Giao hàng)' },

  // --- MODULE: INVENTORY & SALE ---
  { code: 'INVENTORY:VIEW', module: 'INVENTORY_SALE', description: 'Xem lịch sử biến động và tồn kho' },
  { code: 'INVENTORY:ADJUST', module: 'INVENTORY_SALE', description: 'Điều chỉnh nhập/xuất tồn kho thủ công' },

  { code: 'FLASH_SALE:VIEW', module: 'INVENTORY_SALE', description: 'Xem danh sách chiến dịch Flash Sale' },
  { code: 'FLASH_SALE:CREATE', module: 'INVENTORY_SALE', description: 'Tạo chiến dịch Flash Sale' },
  { code: 'FLASH_SALE:UPDATE', module: 'INVENTORY_SALE', description: 'Cập nhật chiến dịch Flash Sale' },
  { code: 'FLASH_SALE:DELETE', module: 'INVENTORY_SALE', description: 'Xóa chiến dịch Flash Sale' },

  // --- MODULE: FULFILLMENT (Shipment, Payment, Return) ---
  { code: 'SHIPMENT:VIEW', module: 'FULFILLMENT', description: 'Tra cứu thông tin vận chuyển đơn hàng' },
  { code: 'SHIPMENT:MANAGE', module: 'FULFILLMENT', description: 'Tạo, cập nhật trạng thái lô hàng vận chuyển' },

  { code: 'PAYMENT:VIEW', module: 'FULFILLMENT', description: 'Xem lịch sử giao dịch thanh toán' },

  { code: 'RETURN:VIEW', module: 'FULFILLMENT', description: 'Xem danh sách yêu cầu đổi trả' },
  { code: 'RETURN:CREATE', module: 'FULFILLMENT', description: 'Tạo yêu cầu đổi trả hàng' },
  { code: 'RETURN:UPDATE', module: 'FULFILLMENT', description: 'Duyệt hoặc từ chối yêu cầu đổi trả hàng' },

  // --- MODULE: LOYALTY & ENGAGE (Voucher, Point, Review, Chat) ---
  { code: 'VOUCHER:VIEW', module: 'LOYALTY_ENGAGE', description: 'Xem danh sách mã giảm giá' },
  { code: 'VOUCHER:CREATE', module: 'LOYALTY_ENGAGE', description: 'Tạo mã giảm giá mới' },
  { code: 'VOUCHER:UPDATE', module: 'LOYALTY_ENGAGE', description: 'Cập nhật mã giảm giá' },
  { code: 'VOUCHER:DELETE', module: 'LOYALTY_ENGAGE', description: 'Xóa mã giảm giá' },

  { code: 'POINT:VIEW', module: 'LOYALTY_ENGAGE', description: 'Xem lịch sử tích và dùng điểm thưởng' },
  { code: 'POINT:MANAGE', module: 'LOYALTY_ENGAGE', description: 'Cộng hoặc trừ điểm thưởng thủ công' },

  { code: 'REVIEW:VIEW', module: 'LOYALTY_ENGAGE', description: 'Xem đánh giá sản phẩm' },
  { code: 'REVIEW:CREATE', module: 'LOYALTY_ENGAGE', description: 'Đánh giá sản phẩm đã mua' },
  { code: 'REVIEW:REPLY', module: 'LOYALTY_ENGAGE', description: 'Phản hồi đánh giá của khách hàng' },
  { code: 'REVIEW:HIDE', module: 'LOYALTY_ENGAGE', description: 'Ẩn đánh giá vi phạm' },

  { code: 'CHAT:ACCESS', module: 'LOYALTY_ENGAGE', description: 'Tham gia nhắn tin tư vấn trực tiếp' },
]

async function main() {
  console.log('⏳ Bắt đầu quá trình seed Role & Permission...')

  // 1. Khởi tạo/Cập nhật toàn bộ Permission (Upsert)
  const upsertedPermissions = []
  for (const perm of PERMISSIONS) {
    const p = await prisma.permission.upsert({
      where: { code: perm.code },
      update: {
        module: perm.module,
        description: perm.description,
        deletedAt: null,
      },
      create: {
        code: perm.code,
        module: perm.module,
        description: perm.description,
      },
    })
    upsertedPermissions.push(p)
  }
  console.log(`✅ Đã đồng bộ ${upsertedPermissions.length} permissions vào Database.`)

  // 2. Tạo hoặc Cập nhật Role: ADMIN (Toàn quyền)
  const adminRole = await prisma.role.upsert({
    where: { code: 'ADMIN' },
    update: {
      name: 'Quản trị viên tối cao',
      isActive: true,
      deletedAt: null,
      permissions: {
        set: upsertedPermissions.map((p) => ({ id: p.id })),
      },
    },
    create: {
      code: 'ADMIN',
      name: 'Quản trị viên tối cao',
      isActive: true,
      permissions: {
        connect: upsertedPermissions.map((p) => ({ id: p.id })),
      },
    },
  })
  console.log(`✅ Đã gán ${upsertedPermissions.length} quyền cho Role: ADMIN (ID: ${adminRole.id})`)

  // 3. Tạo hoặc Cập nhật Role: STAFF (Nhân viên vận hành & bán hàng)
  const staffPermissions = upsertedPermissions.filter((p) => {
    // Staff không có quyền quản lý Phân quyền (ROLE, PERMISSION) và xóa Người dùng
    const forbiddenCodes = [
      'ROLE:CREATE', 'ROLE:UPDATE', 'ROLE:DELETE',
      'PERMISSION:CREATE', 'PERMISSION:UPDATE', 'PERMISSION:DELETE',
      'USER:DELETE',
    ]
    return !forbiddenCodes.includes(p.code)
  })

  const staffRole = await prisma.role.upsert({
    where: { code: 'STAFF' },
    update: {
      name: 'Nhân viên quản lý cửa hàng',
      isActive: true,
      deletedAt: null,
      permissions: {
        set: staffPermissions.map((p) => ({ id: p.id })),
      },
    },
    create: {
      code: 'STAFF',
      name: 'Nhân viên quản lý cửa hàng',
      isActive: true,
      permissions: {
        connect: staffPermissions.map((p) => ({ id: p.id })),
      },
    },
  })
  console.log(`✅ Đã gán ${staffPermissions.length} quyền cho Role: STAFF (ID: ${staffRole.id})`)

  // 4. Tạo hoặc Cập nhật Role: CUSTOMER (Khách hàng thông thường)
  const customerAllowedCodes = [
    'PRODUCT:VIEW',
    'CATEGORY:VIEW',
    'BRAND:VIEW',
    'ORDER:CREATE',
    'ORDER:VIEW',
    'ORDER:CANCEL',
    'FLASH_SALE:VIEW',
    'VOUCHER:VIEW',
    'POINT:VIEW',
    'REVIEW:VIEW',
    'REVIEW:CREATE',
    'RETURN:CREATE',
    'CHAT:ACCESS',
  ]
  const customerPermissions = upsertedPermissions.filter((p) =>
    customerAllowedCodes.includes(p.code)
  )

  const customerRole = await prisma.role.upsert({
    where: { code: 'CUSTOMER' },
    update: {
      name: 'Khách hàng',
      isActive: true,
      deletedAt: null,
      permissions: {
        set: customerPermissions.map((p) => ({ id: p.id })),
      },
    },
    create: {
      code: 'CUSTOMER',
      name: 'Khách hàng',
      isActive: true,
      permissions: {
        connect: customerPermissions.map((p) => ({ id: p.id })),
      },
    },
  })
  console.log(`✅ Đã gán ${customerPermissions.length} quyền cho Role: CUSTOMER (ID: ${customerRole.id})`)

  console.log('🎉 Quá trình Seed phân quyền hoàn tất thành công!')
}

main()
  .catch((e) => {
    console.error('❌ Lỗi khi thực thi Seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

# database\seeds\seed.js

| Property | Value |
|----------|-------|
| Path | `database\seeds\seed.js` |
| Size | 23,525 bytes |
| Extension | `.js` |
| Modified | 2026-10-12 22:18:00.172456 |

```javascript
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();



async function main() {
  console.log('🚀 Bắt đầu làm sạch dữ liệu cũ...');
  async function safeDelete(modelName) {
  if (prisma[modelName] && typeof prisma[modelName].deleteMany === 'function') {
    await prisma[modelName].deleteMany();
  }
}

  // 1. XÓA DỮ LIỆU CŨ THEO THỨ TỰ NGƯỢC CỦA RÀNG BUỘC KHÓA NGOẠI
  await safeDelete('message');
  await safeDelete('chat');
  await safeDelete('reviewMedia');
  await safeDelete('productReview');
  await safeDelete('pointTransaction');
  await safeDelete('flashSaleItem');
  await safeDelete('flashSaleCampaign');
  await safeDelete('inventoryTransaction');
  await safeDelete('returnMedia');
  await safeDelete('returnRequest');
  await safeDelete('paymentTransaction');
  await safeDelete('shipment');
  await safeDelete('orderItem');
  await safeDelete('order');
  await safeDelete('cartItem');
  await safeDelete('cart');
  await safeDelete('productImage');
  await safeDelete('productVariant');
  await safeDelete('product');
  await safeDelete('voucher');
  await safeDelete('tag');
  await safeDelete('brand');
  await safeDelete('category');
  await safeDelete('deviceSession');
  await safeDelete('shippingAddress');
  await safeDelete('user');

  console.log('🧹 Đã xóa sạch dữ liệu cũ. Bắt đầu seed 10 records mỗi bảng...\n');

  

  // ==========================================
  // BẢNG 4: USER (10 records)
  // ==========================================
  const defaultPassword = bcrypt.hashSync('Password123@', 10);
  const usersData = [
    { fullName: 'Nguyễn Quản Trị', email: 'admin@fashion.com', phoneNumber: '0901000001', roleId: 1, status: 'ACTIVE', rewardPoints: 5000 },
    { fullName: 'Trần Nhân Viên', email: 'staff@fashion.com', phoneNumber: '0901000002', roleId: 2, status: 'ACTIVE', rewardPoints: 200 },
    { fullName: 'Lê Hoàng Nam', email: 'nam.le@gmail.com', phoneNumber: '0901000003', roleId: 2, status: 'ACTIVE', rewardPoints: 1200 },
    { fullName: 'Phạm Thị Thảo', email: 'thao.pham@gmail.com', phoneNumber: '0901000004', roleId: 2, status: 'ACTIVE', rewardPoints: 450 },
    { fullName: 'Vũ Minh Tuấn', email: 'tuan.vu@gmail.com', phoneNumber: '0901000005', roleId: 3, status: 'ACTIVE', rewardPoints: 0 },
    { fullName: 'Hoàng Mai Anh', email: 'maianh.hoang@gmail.com', phoneNumber: '0901000003', roleId: 3, status: 'ACTIVE', rewardPoints: 3400 },
    { fullName: 'Đặng Quốc Bảo', email: 'bao.dang@gmail.com', phoneNumber: '0901000007', roleId: 3, status: 'ACTIVE', rewardPoints: 80 },
    { fullName: 'Bùi Phương Ly', email: 'ly.bui@gmail.com', phoneNumber: '0901000008', roleId: 3, status: 'ACTIVE', rewardPoints: 950 },
    { fullName: 'Đỗ Tiến Dũng', email: 'dung.do@gmail.com', phoneNumber: '0901000009', roleId: 3, status: 'INACTIVE', rewardPoints: 0 },
    { fullName: 'Ngô Khánh Linh', email: 'linh.ngo@gmail.com', phoneNumber: '0901000010', roleId: 3, status: 'BLOCKED', rewardPoints: 10 },
  ];

  const users = [];
  for (const u of usersData) {
    const item = await prisma.user.create({
      data: {
        ...u,
        passwordHash: defaultPassword,
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      },
    });
    users.push(item);
  }
  console.log('✅ Đã tạo 10 Users (Mật khẩu: Password123@)');

  // ==========================================
  // BẢNG 5: SHIPPING_ADDRESS (10 records)
  // ==========================================
  const addresses = [];
  for (let i = 0; i < 10; i++) {
    const addr = await prisma.shippingAddress.create({
      data: {
        userId: users[i].id,
        receiverName: users[i].fullName,
        phoneNumber: users[i].phoneNumber,
        province: 'Thành phố Hồ Chí Minh',
        district: `Quận ${i + 1}`,
        ward: `Phường 0${i + 1}`,
        detailAddress: `${100 + i * 15} Đường Lê Lợi`,
        isDefault: true,
      },
    });
    addresses.push(addr);
  }
  console.log('✅ Đã tạo 10 ShippingAddresses');

  // ==========================================
  // BẢNG 6: DEVICE_SESSION (10 records)
  // ==========================================
  for (let i = 0; i < 10; i++) {
    await prisma.deviceSession.create({
      data: {
        userId: users[i].id,
        refreshToken: `refresh_token_sample_string_hash_${i + 1}_uuid`,
        ipAddress: `192.168.1.${10 + i}`,
        isActive: i % 2 === 0,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });
  }
  console.log('✅ Đã tạo 10 DeviceSessions');

  // ==========================================
  // BẢNG 7: CATEGORY (10 records - ĐÃ THAY EMOJI BẰNG URL HỢP LỆ)
  // ==========================================
  const categoriesData = [
    { defaultName: 'Áo Nam', iconUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80', isVisible: true },
    { defaultName: 'Quần Nam', iconUrl: 'https://images.unsplash.com/photo-1506629905607-d9b1f1f3d7a8?auto=format&fit=crop&w=800&q=80', isVisible: true },
    { defaultName: 'Áo Nữ', iconUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80', isVisible: true },
    { defaultName: 'Váy & Đầm', iconUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80', isVisible: true },
    { defaultName: 'Áo Khoác & Blazer', iconUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80', isVisible: true },
    { defaultName: 'Đồ Thể Thao', iconUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80', isVisible: true },
    { defaultName: 'Phụ Kiện Thời Trang', iconUrl: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=800&q=80', isVisible: true },
    { defaultName: 'Giày & Dép', iconUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80', isVisible: true },
    { defaultName: 'Nón & Mũ', iconUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80', isVisible: true },
    { defaultName: 'Đồ Lót & Mặc Nhà', iconUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80', isVisible: true },
  ];

  const categories = [];
  for (const c of categoriesData) {
    const item = await prisma.category.create({ data: c });
    categories.push(item);
  }
  console.log('✅ Đã tạo 10 Categories (iconUrl chuẩn URL hình ảnh)');

  // ==========================================
  // BẢNG 8: BRAND (10 records)
  // ==========================================
  const brandsData = [
    { defaultName: 'Morrow Studio', logoUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=300&q=80' },
    { defaultName: 'Form & Field', logoUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=300&q=80' },
    { defaultName: 'House of Common', logoUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=300&q=80' },
    { defaultName: 'Sunday Objects', logoUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=300&q=80' },
    { defaultName: 'Lumen Goods', logoUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=300&q=80' },
    { defaultName: 'Urban Minimal', logoUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=300&q=80' },
    { defaultName: 'Nordic Clean', logoUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=300&q=80' },
    { defaultName: 'Cotton Atelier', logoUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=300&q=80' },
    { defaultName: 'Denim Craft', logoUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=300&q=80' },
    { defaultName: 'Silk & Linen', logoUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=300&q=80' },
  ];

  const brands = [];
  for (const b of brandsData) {
    const item = await prisma.brand.create({ data: b });
    brands.push(item);
  }
  console.log('✅ Đã tạo 10 Brands');

  // ==========================================
  // BẢNG 9: TAG (10 records)
  // ==========================================
  const tagsData = [
    'Hot Trend', 'Bestseller', 'Mùa Hè', 'Thu Đông', 'Vintage',
    'Minimalist', 'Cotton 100%', 'Cao Cấp', 'Giảm Giá', 'Mới Về'
  ];
  for (const name of tagsData) {
    await prisma.tag.create({ data: { name } });
  }
  console.log('✅ Đã tạo 10 Tags');

  // ==========================================
  // BẢNG 10: PRODUCT (10 records)
  // ==========================================
  const productNames = [
    'Áo Sơ Mi Linen Form Rộng',
    'Quần Tây Baggy Xếp Ly',
    'Áo Thun Heavyweight 260gsm',
    'Chân Váy Chữ A Lưng Cao',
    'Áo Khoác Blazer 2 Hàng Nút',
    'Quần Jeans Ống Suông Indigo',
    'Áo Len Dệt Kim Cổ Tròn',
    'Túi Canvas Đeo Vai Minimal',
    'Mũ Bucket Cotton Washed',
    'Áo Hoodie Nỉ Bông Unisex'
  ];

  const products = [];
  for (let i = 0; i < 10; i++) {
    const p = await prisma.product.create({
      data: {
        defaultName: productNames[i],
        thumbnailUrl: categoriesData[i].iconUrl,
        status: 'PUBLISHED',
        categoryId: categories[i].id,
        brandId: brands[i].id,
      },
    });
    products.push(p);
  }
  console.log('✅ Đã tạo 10 Products');

  // ==========================================
  // BẢNG 11: PRODUCT_IMAGE (10 records)
  // ==========================================
  for (let i = 0; i < 10; i++) {
    await prisma.productImage.create({
      data: {
        productId: products[i].id,
        imageUrl: categoriesData[i].iconUrl,
        displayOrder: 1,
      },
    });
  }
  console.log('✅ Đã tạo 10 ProductImages');

  // ==========================================
  // BẢNG 12: PRODUCT_VARIANT (10 records)
  // ==========================================
  const variants = [];
  for (let i = 0; i < 10; i++) {
    const origPrice = 250000 + i * 50000;
    const sellPrice = origPrice - 30000;
    const v = await prisma.productVariant.create({
      data: {
        productId: products[i].id,
        sku: `SKU-${products[i].id}-DEN-L`,
        variant: 'Màu sắc - Kích cỡ',
        variantValue: 'Đen - L',
        stockQuantity: 100,
        originalPrice: origPrice,
        sellingPrice: sellPrice,
        weightGram: 300,
        imageUrl: categoriesData[i].iconUrl,
      },
    });
    variants.push(v);
  }
  console.log('✅ Đã tạo 10 ProductVariants');

  // ==========================================
  // BẢNG 13: CART (10 records)
  // ==========================================
  const carts = [];
  for (let i = 0; i < 10; i++) {
    const c = await prisma.cart.create({
      data: {
        userId: users[i].id,
        sessionId: `session_token_${i + 1}`,
      },
    });
    carts.push(c);
  }
  console.log('✅ Đã tạo 10 Carts');

  // ==========================================
  // BẢNG 14: CART_ITEM (10 records)
  // ==========================================
  for (let i = 0; i < 10; i++) {
    await prisma.cartItem.create({
      data: {
        cartId: carts[i].id,
        variantId: variants[i].id,
        quantity: (i % 3) + 1,
      },
    });
  }
  console.log('✅ Đã tạo 10 CartItems');

  // ==========================================
  // BẢNG 15: VOUCHER (10 records)
  // ==========================================
  const vouchers = [];
  for (let i = 0; i < 10; i++) {
    const v = await prisma.voucher.create({
      data: {
        code: `FASHION${(i + 1) * 10}K`,
        discountType: i % 2 === 0 ? 'FIXED_AMOUNT' : 'PERCENTAGE',
        discountValue: i % 2 === 0 ? (i + 1) * 20000 : 10 + i,
        minOrderValue: 200000,
        maxDiscountAmt: 100000,
        totalUsageLimit: 500,
        usedCount: i * 5,
        userUsageLimit: 1,
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        isActive: true,
      },
    });
    vouchers.push(v);
  }
  console.log('✅ Đã tạo 10 Vouchers');

  // ==========================================
  // BẢNG 16: ORDER (10 records)
  // ==========================================
  const orderStatuses = [
    'PENDING_PAYMENT', 'CONFIRMED', 'PROCESSING', 'SHIPPED',
    'DELIVERED', 'DELIVERED', 'DELIVERED', 'CANCELLED', 'RETURNED', 'PROCESSING'
  ];

  const orders = [];
  for (let i = 0; i < 10; i++) {
    const subTotal = Number(variants[i].sellingPrice) * 2;
    const shippingFee = 30000;
    const discount = 20000;
    const totalAmount = subTotal + shippingFee - discount;

    const ord = await prisma.order.create({
      data: {
        orderCode: `ORD-2026100${i + 1}`,
        userId: users[i].id,
        shippingAddress: `${addresses[i].receiverName} | ${addresses[i].phoneNumber} | ${addresses[i].detailAddress}, ${addresses[i].ward}, ${addresses[i].district}, ${addresses[i].province}`,
        subTotal,
        shippingFee,
        shippingMethod: 'STANDARD',
        shippingDiscount: 0,
        voucherCode: vouchers[i].code,
        voucherDiscount: discount,
        pointUsed: 0,
        pointDiscount: 0,
        pointEarned: Math.floor(totalAmount * 0.01),
        totalAmount,
        paymentMethod: i % 2 === 0 ? 'COD' : 'BANK_TRANSFER',
        paymentStatus: i >= 4 ? 'SUCCESS' : 'PENDING',
        status: orderStatuses[i],
        customerNote: 'Giao hàng giờ hành chính',
      },
    });
    orders.push(ord);
  }
  console.log('✅ Đã tạo 10 Orders');

  // ==========================================
  // BẢNG 17: ORDER_ITEM (10 records)
  // ==========================================
  const orderItems = [];
  for (let i = 0; i < 10; i++) {
    const item = await prisma.orderItem.create({
      data: {
        orderId: orders[i].id,
        variantId: variants[i].id,
        productName: products[i].defaultName,
        skuCode: variants[i].sku,
        variantValue: variants[i].variantValue,
        productImageUrl: variants[i].imageUrl,
        unitPrice: variants[i].sellingPrice,
        quantity: 2,
      },
    });
    orderItems.push(item);
  }
  console.log('✅ Đã tạo 10 OrderItems');

  // ==========================================
  // BẢNG 18: SHIPMENT (10 records)
  // ==========================================
  const shipmentStatuses = ['PENDING', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED', 'DELIVERED', 'DELIVERED', 'DELIVERED', 'FAILED', 'DELIVERED', 'IN_TRANSIT'];
  for (let i = 0; i < 10; i++) {
    await prisma.shipment.create({
      data: {
        orderId: orders[i].id,
        carrier: i % 2 === 0 ? 'Giao Hàng Nhanh (GHN)' : 'Viettel Post',
        trackingCode: `TRK-VN-998877${i}`,
        actualShippingFee: 28000,
        status: shipmentStatuses[i],
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      },
    });
  }
  console.log('✅ Đã tạo 10 Shipments');

  // ==========================================
  // BẢNG 19: PAYMENT_TRANSACTION (10 records)
  // ==========================================
  for (let i = 0; i < 10; i++) {
    await prisma.paymentTransaction.create({
      data: {
        orderId: orders[i].id,
        provider: i % 2 === 0 ? 'COD' : 'SEPAY_BANK',
        providerTransId: `TXN_SEPAY_202610_${i + 1000}`,
        amount: orders[i].totalAmount,
        status: orders[i].paymentStatus,
      },
    });
  }
  console.log('✅ Đã tạo 10 PaymentTransactions');

  // ==========================================
  // BẢNG 20: RETURN_REQUEST (10 records)
  // ==========================================
  const returnRequests = [];
  const returnStatuses = ['PENDING', 'APPROVED', 'REJECTED', 'COMPLETED', 'PENDING', 'APPROVED', 'PENDING', 'REJECTED', 'COMPLETED', 'PENDING'];
  for (let i = 0; i < 10; i++) {
    const rr = await prisma.returnRequest.create({
      data: {
        orderItemId: orderItems[i].id,
        quantity: 1,
        reason: i % 2 === 0 ? 'Mặc không vừa size, muốn đổi lớn hơn' : 'Sản phẩm có chỉ thừa / lỗi nhẹ',
        description: 'Vải đẹp nhưng form hơi rộng so với bảng size chuẩn.',
        status: returnStatuses[i],
      },
    });
    returnRequests.push(rr);
  }
  console.log('✅ Đã tạo 10 ReturnRequests');

  // ==========================================
  // BẢNG 21: RETURN_MEDIA (10 records)
  // ==========================================
  if (prisma.returnMedia) {
    for (let i = 0; i < 10; i++) {
      await prisma.returnMedia.create({
        data: {
          returnRequestId: returnRequests[i].id,
          mediaUrl: 'https://images.unsplash.com/photo-1506629905607-d9b1f1f3d7a8?auto=format&fit=crop&w=400&q=80',
          mediaType: 'IMAGE',
        },
      });
    }
    console.log('✅ Đã tạo 10 ReturnMedias');
  }

  // ==========================================
  // BẢNG 22: INVENTORY_TRANSACTION (10 records)
  // ==========================================
  if (prisma.inventoryTransaction) {
    for (let i = 0; i < 10; i++) {
      await prisma.inventoryTransaction.create({
        data: {
          variantId: variants[i].id,
          quantityChange: 100,
          type: 'IMPORT',
          referenceId: `PO-IMPORT-2026-${i + 1}`,
          note: 'Nhập lô hàng đầu tháng từ xưởng may Hà Nội',
        },
      });
    }
    console.log('✅ Đã tạo 10 InventoryTransactions');
  }

  // ==========================================
  // BẢNG 23: FLASH_SALE_CAMPAIGN (10 records)
  // ==========================================
  const campaigns = [];
  for (let i = 0; i < 10; i++) {
    const fsc = await prisma.flashSaleCampaign.create({
      data: {
        name: `Flash Sale Giờ Vàng Ngày 10/${i + 1}`,
        bannerUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',
        startTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
        endTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
        isActive: i === 0,
      },
    });
    campaigns.push(fsc);
  }
  console.log('✅ Đã tạo 10 FlashSaleCampaigns');

  // ==========================================
  // BẢNG 24: FLASH_SALE_ITEM (10 records)
  // ==========================================
  for (let i = 0; i < 10; i++) {
    await prisma.flashSaleItem.create({
      data: {
        campaignId: campaigns[0].id,
        variantId: variants[i].id,
        flashSalePrice: 149000,
        promoQuantity: 50,
        soldQuantity: i * 3,
      },
    });
  }
  console.log('✅ Đã tạo 10 FlashSaleItems');

  // ==========================================
  // BẢNG 25: POINT_TRANSACTION (10 records)
  // ==========================================
  for (let i = 0; i < 10; i++) {
    await prisma.pointTransaction.create({
      data: {
        userId: users[i].id,
        orderId: orders[i].id,
        pointChange: 150,
        currentPoint: users[i].rewardPoints,
        transactionType: 'EARN',
        description: `Tích điểm 1% từ đơn hàng ${orders[i].orderCode}`,
      },
    });
  }
  console.log('✅ Đã tạo 10 PointTransactions');

  // ==========================================
  // BẢNG 26: PRODUCT_REVIEW (10 records)
  // ==========================================
  const reviews = [];
  const reviewContents = [
    'Chất vải thoáng mát, đường may rất kỹ lưỡng, rất đáng tiền!',
    'Màu sắc y như hình chụp, giao hàng thần tốc trong 2 ngày.',
    'Form áo mặc tôn dáng, đóng gói bọc hộp sang trọng.',
    'Vải mềm mịn không xù lông khi giặt máy.',
    'Giá quá rẻ so với chất lượng nhận được!',
    'Tư vấn viên nhiệt tình chọn size chuẩn vừa khít.',
    'Quần mặc đứng form, vải không bị nhăn nhiều.',
    'Rất thích phong cách tối giản này, sẽ ủng hộ shop tiếp.',
    'Sản phẩm đẹp 10/10, chấm shop 5 sao chất lượng.',
    'Mẫu mã hiện đại, rất dễ phối đồ đi làm hoặc đi chơi.'
  ];

  for (let i = 0; i < 10; i++) {
    const rev = await prisma.productReview.create({
      data: {
        productId: products[i].id,
        userId: users[i].id,
        orderId: orders[i].id,
        rating: 5,
        content: reviewContents[i],
        shopReply: 'Dạ cảm ơn bạn đã tin yêu và ủng hộ sản phẩm của thương hiệu ạ!',
        isHidden: false,
      },
    });
    reviews.push(rev);
  }
  console.log('✅ Đã tạo 10 ProductReviews');

  // ==========================================
  // BẢNG 27: REVIEW_MEDIA (10 records)
  // ==========================================
  if (prisma.reviewMedia) {
    for (let i = 0; i < 10; i++) {
      await prisma.reviewMedia.create({
        data: {
          reviewId: reviews[i].id,
          mediaUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80',
          mediaType: 'IMAGE',
        },
      });
    }
    console.log('✅ Đã tạo 10 ReviewMedias');
  }

  // ==========================================
  // BẢNG 28: CHAT (10 records)
  // ==========================================
  const chats = [];
  for (let i = 0; i < 10; i++) {
    const ch = await prisma.chat.create({
      data: {
        userId: users[i].id,
        status: i % 3 === 0 ? 'OPEN' : 'CLOSED',
      },
    });
    chats.push(ch);
  }
  console.log('✅ Đã tạo 10 Chats');

  // ==========================================
  // BẢNG 29: MESSAGE (10 records)
  // ==========================================
  for (let i = 0; i < 10; i++) {
    await prisma.message.create({
      data: {
        chatId: chats[i].id,
        senderId: users[i].id,
        content: `Chào shop, mình cao 1m75 nặng 68kg thì mặc size L của sản phẩm ${products[i].defaultName} có vừa không?`,
        isRead: true,
      },
    });
  }
  console.log('✅ Đã tạo 10 Messages');

  console.log('\n🎉 ================================================ 🎉');
  console.log('🎉 SEED DỮ LIỆU TOÀN DIỆN THÀNH CÔNG RỰC RỠ (10 records / bảng)! 🎉');
  console.log('🎉 ================================================ 🎉');
}

main()
  .catch((e) => {
    console.error('❌ Lỗi khi thực thi seed script:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

# middlewares\filters\error.filter.ts

| Property | Value |
|----------|-------|
| Path | `middlewares\filters\error.filter.ts` |
| Size | 1,131 bytes |
| Extension | `.ts` |
| Modified | 2026-10-11 17:23:08.183691 |

```typescript
import { Request, Response, NextFunction } from 'express'
import { Prisma } from '@prisma/client'
import { envConfig } from '@/config/env.config'

export const errorFilter = (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  let statusCode = err.statusCode || 500
  let message = err.message || 'Internal Server Error'

  // Xử lý lỗi trùng lặp dữ liệu từ Prisma
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      statusCode = 409
      message = `Dữ liệu đã tồn tại trên trường: ${(err.meta?.target as string[])?.join(', ')}`
    } else if (err.code === 'P2025') {
      statusCode = 404
      message = 'Bản ghi không tồn tại hoặc đã bị xóa'
    }
  }

  if (envConfig.NODE_ENV === 'development') {
    console.error('🔥 [ERROR LOG]:', err)
  }

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    ...(envConfig.NODE_ENV === 'development' && { stack: err.stack }),
  })
}
```

# middlewares\guards\auth.guard.ts

| Property | Value |
|----------|-------|
| Path | `middlewares\guards\auth.guard.ts` |
| Size | 1,914 bytes |
| Extension | `.ts` |
| Modified | 2026-10-01 17:02:22.945302 |

```typescript
import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { envConfig } from '@/config/env.config'
import { UnauthorizedError } from '@/common/errors'


const extractBearerToken = (req: Request): string | null => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  return authHeader.slice(7).trim()
}

export const requireAuth = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token = extractBearerToken(req)
    if (!token) {
      throw new UnauthorizedError('Vui lòng đăng nhập để thực hiện thao tác này')
    }

    const payload = jwt.verify(token, envConfig.ACCESS_TOKEN_SECRET) as JwtPayload

    if (typeof payload.userId !== 'number' || typeof payload.roleId !== 'number') {
      throw new UnauthorizedError('Access token không đúng định dạng')
    }

    req.user = {
      userId: payload.userId,
      roleId: payload.roleId,
      email: payload.email,
    }

    next()
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return next(error)
    }
    return next(new UnauthorizedError('Access token không hợp lệ hoặc đã hết hạn'))
  }
}

export const authGuard = requireAuth

export const optionalAuth = (req: Request, _res: Response, next: NextFunction) => {
  const token = extractBearerToken(req)
  if (!token) {
    return next()
  }

  try {
    const payload = jwt.verify(token, envConfig.ACCESS_TOKEN_SECRET) as JwtPayload
    if (typeof payload.userId === 'number' && typeof payload.roleId === 'number') {
      req.user = {
        userId: payload.userId,
        roleId: payload.roleId,
        email: payload.email,
      }
    }
  } catch {
    // Guest truy cập vãng lai, không chặn lỗi
  }

  next()
}
```

# middlewares\guards\permission.guard.ts

| Property | Value |
|----------|-------|
| Path | `middlewares\guards\permission.guard.ts` |
| Size | 1,610 bytes |
| Extension | `.ts` |
| Modified | 2026-10-01 17:02:22.947303 |

```typescript
import { Request, Response, NextFunction } from 'express'
import { prisma } from '@/database/prisma'
import { ForbiddenError, UnauthorizedError } from '@/common/errors'

export const permissionGuard = (...requiredPermissions: string[]) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.roleId) {
        throw new UnauthorizedError('Chưa xác thực người dùng')
      }

      // Tìm role cùng với các permission còn hiệu lực (chưa bị xóa mềm)
      const role = await prisma.role.findFirst({
        where: {
          id: req.user.roleId,
          isActive: true,
          deletedAt: null,
        },
        include: {
          permissions: {
            where: { deletedAt: null },
            select: { code: true },
          },
        },
      })

      if (!role) {
        throw new ForbiddenError('Vai trò người dùng không hợp lệ hoặc đã bị vô hiệu hóa')
      }

      // ADMIN tối cao tự động pass mọi quyền
      if (role.code === 'ADMIN') {
        return next()
      }

      const assignedPermissionCodes = role.permissions.map((p) => p.code)
      const hasAllPermissions = requiredPermissions.every((code) =>
        assignedPermissionCodes.includes(code)
      )

      if (!hasAllPermissions) {
        throw new ForbiddenError('Bạn không có quyền thực hiện hành động này')
      }

      next()
    } catch (error) {
      next(error)
    }
  }
}

export const requirePermission = permissionGuard
```

# middlewares\guards\role.guard.ts

| Property | Value |
|----------|-------|
| Path | `middlewares\guards\role.guard.ts` |
| Size | 900 bytes |
| Extension | `.ts` |
| Modified | 2026-10-01 17:02:22.948302 |

```typescript
import { Request, Response, NextFunction } from 'express'
import { prisma } from '@/database/prisma'
import { ForbiddenError, UnauthorizedError } from '@/common/errors'

export const roleGuard = (...allowedCodes: string[]) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.roleId) {
        throw new UnauthorizedError('Chưa xác thực người dùng')
      }

      const role = await prisma.role.findFirst({
        where: { id: req.user.roleId, isActive: true, deletedAt: null },
      })

      if (!role || !allowedCodes.includes(role.code)) {
        throw new ForbiddenError('Bạn không có quyền thực hiện hành động này')
      }

      next()
    } catch (error) {
      next(error)
    }
  }
}

export const requireRole = roleGuard
export const requireAdmin = roleGuard('ADMIN')
```

# middlewares\interceptors\logger.interceptor.ts

| Property | Value |
|----------|-------|
| Path | `middlewares\interceptors\logger.interceptor.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-09-23 09:04:55.688701 |

```typescript

```

# middlewares\interceptors\transform.interceptor.ts

| Property | Value |
|----------|-------|
| Path | `middlewares\interceptors\transform.interceptor.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-09-23 09:04:55.700702 |

```typescript

```

# middlewares\pipes\parse-int.pipe.ts

| Property | Value |
|----------|-------|
| Path | `middlewares\pipes\parse-int.pipe.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-09-23 09:04:55.657700 |

```typescript

```

# middlewares\pipes\validate.pipe.ts

| Property | Value |
|----------|-------|
| Path | `middlewares\pipes\validate.pipe.ts` |
| Size | 1,428 bytes |
| Extension | `.ts` |
| Modified | 2026-09-30 08:12:14.913321 |

```typescript
import { Request, Response, NextFunction } from 'express'
import { ZodTypeAny, ZodError } from 'zod'

interface RequestValidators {
  params?: ZodTypeAny
  query?: ZodTypeAny
  body?: ZodTypeAny
}

export const validateRequest = (validators: RequestValidators) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 1. Validate & Transform Params
      if (validators.params) {
        const parsedParams = await validators.params.parseAsync(req.params)
        req.params = parsedParams as any
      }

      // 2. Validate & Transform Query
      if (validators.query) {
        const parsedQuery = await validators.query.parseAsync(req.query)
        for (const key of Object.keys(req.query)) {
          delete (req.query as any)[key]
        }
        Object.assign(req.query, parsedQuery)
      }

      // 3. Validate & Transform Body (Chấp nhận cả ZodEffects từ .superRefine)
      if (validators.body) {
        const parsedBody = await validators.body.parseAsync(req.body)
        req.body = parsedBody
      }

      return next()
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(422).json({
          statusCode: 422,
          message: 'Dữ liệu đầu vào không hợp lệ',
          errors: error.flatten().fieldErrors,
        })
      }

      return next(error)
    }
  }
}
```

# middlewares\rate-limit.middleware.ts

| Property | Value |
|----------|-------|
| Path | `middlewares\rate-limit.middleware.ts` |
| Size | 1,195 bytes |
| Extension | `.ts` |
| Modified | 2026-10-11 17:23:08.185690 |

```typescript
import rateLimit from 'express-rate-limit'


// Rate limit nghiêm ngặt cho các endpoint nhạy cảm:
export const strictAuthLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        statusCode: 429,
        message: 'Quá nhiều yêu cầu. Vui lòng thử lại sau 15 phút.',
    },
})


// Rate limit trung bình cho các endpoint gửi email/tạo OTP:
export const otpLimiter = rateLimit({
    windowMs: 2 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        statusCode: 429,
        message: 'Quá nhiều yêu cầu gửi mã xác thực. Vui lòng thử lại sau.',
    },
})

/**
 * Rate limit chung cho toàn bộ auth routes:
 * 30 request / 15 phút / IP
 */
export const generalAuthLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        statusCode: 429,
        message: 'Quá nhiều yêu cầu. Vui lòng thử lại sau.',
    },
})


```

# modules\cart-order\cart\cart.controller.ts

| Property | Value |
|----------|-------|
| Path | `modules\cart-order\cart\cart.controller.ts` |
| Size | 3,833 bytes |
| Extension | `.ts` |
| Modified | 2026-10-01 17:02:22.950301 |

```typescript
import { NextFunction, Request, Response } from 'express'
import { BadRequestError } from '@/common/errors'
import { addCartItemSchema, cartOwnerSchema, updateCartItemSchema } from './cart.schema'
import { CartService } from './cart.service'

/**
 * Lấy userId an toàn từ Middleware xác thực (Auth Middleware)
 */
const userIdOf = (req: Request): number | undefined => {
  const userId = (req as any).user?.userId
  return userId ? Number(userId) : undefined
}

/**
 * Xác định SessionID cho giỏ hàng vãng lai (Guest)
 * Ưu tiên lấy từ Header hoặc Cookie, tránh lấy từ URL Query String
 */
const ownerOf = (req: Request) => {
  const raw = req.headers['x-session-id'] ?? req.body?.sessionId
  const sessionId = typeof raw === 'string' && raw.trim().length > 0 ? raw.trim() : undefined
  const result = cartOwnerSchema.safeParse({ sessionId })
  
  if (!result.success) {
    throw new BadRequestError('Session ID không hợp lệ hoặc không tồn tại')
  }
  
  return result.data
}

/**
 * Helper ép kiểu và kiểm tra itemId từ req.params
 */
const parseItemId = (param: string): number => {
  const itemId = Number(param)
  if (isNaN(itemId) || itemId <= 0) {
    throw new BadRequestError('Mã sản phẩm trong giỏ hàng (itemId) không hợp lệ')
  }
  return itemId
}

export class CartController {
  constructor(private readonly service = new CartService()) {}

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.get(userIdOf(req), ownerOf(req))
      return res.status(200).json({ statusCode: 200, data })
    } catch (error) {
      next(error)
    }
  }

  add = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = addCartItemSchema.safeParse(req.body)
      if (!input.success) {
        throw new BadRequestError(input.error.issues[0]?.message ?? 'Dữ liệu không hợp lệ')
      }

      const data = await this.service.add(userIdOf(req), ownerOf(req), input.data)
      return res.status(201).json({ statusCode: 201, data })
    } catch (error) {
      next(error)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const itemId = parseItemId(req.params.itemId)
      const input = updateCartItemSchema.safeParse(req.body)
      
      if (!input.success) {
        throw new BadRequestError(input.error.issues[0]?.message ?? 'Dữ liệu không hợp lệ')
      }

      const data = await this.service.update(userIdOf(req), ownerOf(req), itemId, input.data)
      return res.status(200).json({ statusCode: 200, data })
    } catch (error) {
      next(error)
    }
  }

  remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const itemId = parseItemId(req.params.itemId)
      const data = await this.service.remove(userIdOf(req), ownerOf(req), itemId)
      
      return res.status(200).json({ statusCode: 200, data })
    } catch (error) {
      next(error)
    }
  }

  clear = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.clear(userIdOf(req), ownerOf(req))
      return res.status(200).json({ statusCode: 200, data })
    } catch (error) {
      next(error)
    }
  }

  merge = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = userIdOf(req)
      if (!userId) {
        throw new BadRequestError('Bạn cần đăng nhập để thực hiện gộp giỏ hàng')
      }
      const data = await this.service.merge(userId, ownerOf(req))
      return res.status(200).json({ statusCode: 200, data })
    } catch (error) {
      next(error)
    }
  }
}
```

# modules\cart-order\cart\cart.repo.ts

| Property | Value |
|----------|-------|
| Path | `modules\cart-order\cart\cart.repo.ts` |
| Size | 7,132 bytes |
| Extension | `.ts` |
| Modified | 2026-10-09 10:38:13.235707 |

```typescript
import { Prisma, ProductStatus } from '@prisma/client'
import { prisma } from '@/database/prisma'

export const cartInclude = {
  cartItems: {
    include: { 
      variant: { 
        include: { 
          product: true, 
          
          flashSaleItems: {
            include: { campaign: true },
          },
        } 
      } 
    },
    orderBy: { createdAt: 'asc' as const },
  },
} satisfies Prisma.CartInclude

export class CartRepo {
  /**
   * Tìm giỏ hàng theo Owner. Ưu tiên tìm theo userId trước, nếu không có mới tìm theo sessionId.
   */
  async findByOwner(userId?: number, sessionId?: string, db: Prisma.TransactionClient | typeof prisma = prisma) {
    if (!userId && !sessionId) return null

    if (userId) {
      const userCart = await db.cart.findFirst({ where: { userId }, include: cartInclude })
      if (userCart) return userCart
    }

    if (sessionId) {
      return db.cart.findFirst({ where: { sessionId }, include: cartInclude })
    }

    return null
  }

  async createOwner(userId?: number, sessionId?: string, db: Prisma.TransactionClient | typeof prisma = prisma) {
    return db.cart.create({ data: { userId, sessionId }, include: cartInclude })
  }

  async findOrCreateOwner(userId?: number, sessionId?: string, db: Prisma.TransactionClient | typeof prisma = prisma) {
    const existing = await this.findByOwner(userId, sessionId, db)
    if (existing) return existing
    return this.createOwner(userId, sessionId, db)
  }

  /**
   * Gộp giỏ hàng Guest vào giỏ User (Tối ưu Query - Tránh lỗi N+1)
   */
  async mergeGuestCart(userId: number, sessionId: string, db: Prisma.TransactionClient | typeof prisma = prisma) {
    // 1. Tìm giỏ hàng guest và giỏ hàng user
    const guestCart = await this.findByOwner(undefined, sessionId, db)
    const userCart = await this.findOrCreateOwner(userId, undefined, db)

    // Nếu không có giỏ guest hoặc giỏ guest chính là giỏ user thì trả về giỏ user
    if (!guestCart || guestCart.id === userCart.id || guestCart.cartItems.length === 0) {
      return userCart
    }

    // 2. Tạo Map chứa danh sách item hiện có của User cart để tra cứu nhanh (O(1))
    const userItemMap = new Map(userCart.cartItems.map((item) => [item.variantId, item]))

    const updatePromises: Promise<any>[] = []
    const itemsToMoveIds: number[] = []

    // 3. Phân loại item cần cộng dồn số lượng hoặc chuyển chủ sở hữu
    for (const guestItem of guestCart.cartItems) {
      const existingUserItem = userItemMap.get(guestItem.variantId)

      if (existingUserItem) {
        // Nếu đã có trong giỏ User -> Cộng dồn số lượng nhưng tối đa 100 sản phẩm
        const mergedQuantity = Math.min(100, existingUserItem.quantity + guestItem.quantity)
        updatePromises.push(
          db.cartItem.update({
            where: { id: existingUserItem.id },
            data: { quantity: mergedQuantity },
          })
        )
      } else {
        // Nếu chưa có -> Gom ID lại để update hàng loạt (Bulk Update)
        itemsToMoveIds.push(guestItem.id)
      }
    }

    // 4. Thực thi các query cập nhật song song (Parallel execution)
    if (itemsToMoveIds.length > 0) {
      updatePromises.push(
        db.cartItem.updateMany({
          where: { id: { in: itemsToMoveIds } },
          data: { cartId: userCart.id },
        })
      )
    }

    await Promise.all(updatePromises)

    // 5. Xóa giỏ hàng Guest
    await db.cart.delete({ where: { id: guestCart.id } })

    // 6. Lấy lại dữ liệu giỏ hàng hoàn chỉnh cuối cùng
    return (await this.get(userCart.id, db)) ?? userCart
  }

  async get(cartId: number, db: Prisma.TransactionClient | typeof prisma = prisma) {
    return db.cart.findUnique({ where: { id: cartId }, include: cartInclude })
  }

  /**
   * Tìm biến thể sản phẩm đang active (chưa bị xóa mềm và sản phẩm cha đang mở bán PUBLISHED)
   */
  async findActiveVariantById(variantId: number, db: Prisma.TransactionClient | typeof prisma = prisma) {
    return db.productVariant.findFirst({
      where: {
        id: variantId,
        deletedAt: null,
        product: {
          status: ProductStatus.PUBLISHED,
          deletedAt: null,
        },
      },
      include: {
        product: true,
      },
    })
  }

  /**
   * Tìm cart item theo cartId và variantId
   */
  async findCartItem(cartId: number, variantId: number, db: Prisma.TransactionClient | typeof prisma = prisma) {
    return db.cartItem.findUnique({
      where: { cartId_variantId: { cartId, variantId } },
    })
  }

  /**
   * Tìm cart item theo id và cartId kèm thông tin biến thể và sản phẩm cha
   */
  async findCartItemById(itemId: number, cartId: number, db: Prisma.TransactionClient | typeof prisma = prisma) {
    return db.cartItem.findFirst({
      where: { id: itemId, cartId },
      include: {
        variant: {
          include: {
            product: true,
          },
        },
      },
    })
  }

  /**
   * Thêm mới hoặc cập nhật số lượng item trong giỏ
   */
  async upsertCartItem(
    cartId: number,
    variantId: number,
    quantity: number,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.cartItem.upsert({
      where: { cartId_variantId: { cartId, variantId } },
      update: { quantity },
      create: { cartId, variantId, quantity },
    })
  }

  /**
   * Cập nhật số lượng của cart item theo id
   */
  async updateCartItemQuantity(
    itemId: number,
    quantity: number,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    })
  }

  /**
   * Xóa 1 cart item theo id
   */
  async deleteCartItem(itemId: number, db: Prisma.TransactionClient | typeof prisma = prisma) {
    return db.cartItem.delete({
      where: { id: itemId },
    })
  }

  /**
   * Xóa cart item theo itemId và cartId (bảo đảm item thuộc đúng giỏ)
   */
  async deleteCartItemByIdAndCartId(
    itemId: number,
    cartId: number,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    const result = await db.cartItem.deleteMany({
      where: { id: itemId, cartId },
    })
    return result.count > 0
  }

  /**
   * Xóa danh sách cart items theo danh sách ID
   */
  async deleteCartItemsByIds(
    itemIds: number[],
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.cartItem.deleteMany({
      where: { id: { in: itemIds } },
    })
  }

  /**
   * Xóa toàn bộ sản phẩm trong giỏ hàng
   */
  async clearCart(
    cartId: number,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.cartItem.deleteMany({
      where: { cartId },
    })
  }
}
```

# modules\cart-order\cart\cart.routes.ts

| Property | Value |
|----------|-------|
| Path | `modules\cart-order\cart\cart.routes.ts` |
| Size | 1,045 bytes |
| Extension | `.ts` |
| Modified | 2026-10-01 17:02:22.953301 |

```typescript
import { Router } from 'express'
import { CartController } from './cart.controller'
import { optionalAuth } from '@/middlewares/guards/auth.guard'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import { addCartItemSchema, updateCartItemSchema } from './cart.schema'
import { z } from 'zod'

const cartItemIdParamSchema = z.object({
  itemId: z.coerce.number().int().positive('itemId phải là số nguyên dương'),
})

export const cartRouter = Router()
const controller = new CartController()

cartRouter.use(optionalAuth)

cartRouter.get('/', controller.get)
cartRouter.post('/items', validateRequest({ body: addCartItemSchema }), controller.add)
cartRouter.post('/merge', controller.merge)
cartRouter.patch(
  '/items/:itemId',
  validateRequest({ params: cartItemIdParamSchema, body: updateCartItemSchema }),
  controller.update,
)
cartRouter.delete(
  '/items/:itemId',
  validateRequest({ params: cartItemIdParamSchema }),
  controller.remove,
)
cartRouter.delete('/', controller.clear)
```

# modules\cart-order\cart\cart.schema.ts

| Property | Value |
|----------|-------|
| Path | `modules\cart-order\cart\cart.schema.ts` |
| Size | 2,858 bytes |
| Extension | `.ts` |
| Modified | 2026-10-01 17:02:22.955301 |

```typescript
import { z } from 'zod'

// 1. Schema xác thực chủ sở hữu giỏ hàng
export const cartOwnerSchema = z.object({
  sessionId: z
    .string({ invalid_type_error: 'Session ID phải là chuỗi ký tự' })
    .trim()
    .min(1, 'Session ID không được để trống')
    .max(255, 'Session ID quá dài')
    .optional(),
})

// 2. Schema thêm sản phẩm vào giỏ hàng
export const addCartItemSchema = z.object({
  variantId: z.coerce
    .number({ invalid_type_error: 'Mã biến thể sản phẩm phải là số' })
    .int('Mã biến thể phải là số nguyên')
    .positive('Mã biến thể sản phẩm không hợp lệ'),
  quantity: z.coerce
    .number({ invalid_type_error: 'Số lượng phải là số' })
    .int('Số lượng phải là số nguyên')
    .positive('Số lượng thêm vào phải lớn hơn 0')
    .max(100, 'Số lượng tối đa cho mỗi sản phẩm là 100'),
})

// 3. Schema cập nhật số lượng sản phẩm trong giỏ
export const updateCartItemSchema = z.object({
  quantity: z.coerce
    .number({ invalid_type_error: 'Số lượng phải là số' })
    .int('Số lượng phải là số nguyên')
    .min(0, 'Số lượng không được nhỏ hơn 0')
    .max(100, 'Số lượng tối đa cho mỗi sản phẩm là 100'),
})

// 4. BỔ SUNG: Schema Tạo đơn hàng (Checkout / Create Order)
export const createOrderSchema = z.object({
  customerName: z
    .string({ required_error: 'Vui lòng nhập họ tên người nhận' })
    .trim()
    .min(2, 'Họ tên phải có ít nhất 2 ký tự')
    .max(100, 'Họ tên không được vượt quá 100 ký tự'),
  customerPhone: z
    .string({ required_error: 'Vui lòng nhập số điện thoại' })
    .trim()
    .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Số điện thoại không đúng định dạng Việt Nam'),
  customerEmail: z
    .string()
    .trim()
    .email('Email không đúng định dạng')
    .optional()
    .or(z.literal('')),
  shippingAddress: z
    .string({ required_error: 'Vui lòng nhập địa chỉ giao hàng' })
    .trim()
    .min(5, 'Địa chỉ giao hàng quá ngắn')
    .max(500, 'Địa chỉ không được vượt quá 500 ký tự'),
  note: z.string().trim().max(1000, 'Ghi chú tối đa 1000 ký tự').optional(),
  paymentMethod: z.enum(['COD', 'BANK_TRANSFER', 'MOMO', 'VNPAY'], {
    errorMap: () => ({ message: 'Phương thức thanh toán không hợp lệ' }),
  }),
})

// Infer các Type cho TypeScript
export type CartOwner = z.infer<typeof cartOwnerSchema>
export type AddCartItemInput = z.infer<typeof addCartItemSchema>
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>
export type CreateOrderInput = z.infer<typeof createOrderSchema>
```

# modules\cart-order\cart\cart.service.ts

| Property | Value |
|----------|-------|
| Path | `modules\cart-order\cart\cart.service.ts` |
| Size | 6,305 bytes |
| Extension | `.ts` |
| Modified | 2026-10-09 10:38:13.237707 |

```typescript
import { Prisma, ProductStatus } from "@prisma/client";
import { prisma } from "@/database/prisma";
import { BadRequestError, NotFoundError } from "@/common/errors";
import {
  AddCartItemInput,
  CartOwner,
  UpdateCartItemInput,
} from "./cart.schema";
import { CartRepo } from "./cart.repo";

export const MAX_CART_ITEM_QUANTITY = 100;

export class CartService {
  constructor(private readonly cartRepo = new CartRepo()) {}

  /**
   * Helper thống nhất: Lấy hoặc tạo giỏ (tự động merge nếu có cả userId và sessionId)
   */
  private async resolveCart(
    userId?: number,
    sessionId?: string,
    tx: Prisma.TransactionClient | typeof prisma = prisma,
  ) {
    if (!userId && !sessionId) {
      throw new BadRequestError(
        "Cần userId hoặc sessionId để xác định giỏ hàng",
      );
    }
    if (userId && sessionId) {
      return this.cartRepo.mergeGuestCart(userId, sessionId, tx);
    }
    return this.cartRepo.findOrCreateOwner(userId, sessionId, tx);
  }

  /**
   * Lấy thông tin giỏ hàng (Tự động gộp giỏ nếu user vừa đăng nhập)
   */
  async get(userId?: number, owner?: CartOwner) {
    return prisma.$transaction(async (tx) => {
      return this.resolveCart(userId, owner?.sessionId, tx);
    });
  }

  /**
   * Thêm sản phẩm vào giỏ hàng
   */
  async add(
    userId: number | undefined,
    owner: CartOwner,
    input: AddCartItemInput,
  ) {
    if (input.quantity <= 0) {
      throw new BadRequestError("Số lượng sản phẩm thêm vào phải lớn hơn 0");
    }

    return prisma.$transaction(async (tx) => {
      const [cart, variant] = await Promise.all([
        this.resolveCart(userId, owner?.sessionId, tx),
        this.cartRepo.findActiveVariantById(input.variantId, tx),
      ]);

      if (!variant) {
        throw new NotFoundError(
          "Sản phẩm không tồn tại hoặc đã ngừng kinh doanh",
        );
      }

      const existing = await this.cartRepo.findCartItem(
        cart.id,
        input.variantId,
        tx,
      );
      const newQuantity = (existing?.quantity ?? 0) + input.quantity;

      // Kiểm tra giới hạn số lượng tối đa trên mỗi sản phẩm (Cart Limit)
      if (newQuantity > MAX_CART_ITEM_QUANTITY) {
        throw new BadRequestError(
          `Số lượng tối đa cho mỗi sản phẩm trong giỏ hàng là ${MAX_CART_ITEM_QUANTITY}`,
        );
      }

      // Kiểm tra tồn kho
      if (newQuantity > variant.stockQuantity) {
        throw new BadRequestError(
          `Số lượng yêu cầu vượt quá tồn kho hiện có (${variant.stockQuantity})`,
        );
      }

      await this.cartRepo.upsertCartItem(
        cart.id,
        input.variantId,
        newQuantity,
        tx,
      );
      return this.cartRepo.get(cart.id, tx);
    });
  }

  /**
   * Cập nhật số lượng sản phẩm trong giỏ
   */
  async update(
    userId: number | undefined,
    owner: CartOwner,
    itemId: number,
    input: UpdateCartItemInput,
  ) {
    if (input.quantity < 0) {
      throw new BadRequestError("Số lượng sản phẩm không hợp lệ");
    }

    if (input.quantity > MAX_CART_ITEM_QUANTITY) {
      throw new BadRequestError(
        `Số lượng tối đa cho mỗi sản phẩm trong giỏ hàng là ${MAX_CART_ITEM_QUANTITY}`,
      );
    }

    return prisma.$transaction(async (tx) => {
      const cart = await this.resolveCart(userId, owner?.sessionId, tx);

      const item = await this.cartRepo.findCartItemById(itemId, cart.id, tx);
      if (!item || !item.variant || item.variant.deletedAt !== null) {
        throw new NotFoundError("Mục sản phẩm không tồn tại trong giỏ hàng");
      }

      // Kiểm tra trạng thái sản phẩm cha (Product.status & deletedAt)
      const isProductActive =
        item.variant.product &&
        item.variant.product.deletedAt === null &&
        (item.variant.product.status === ProductStatus.PUBLISHED ||
          (item.variant.product.status as string) === "ACTIVE");

      if (!isProductActive) {
        throw new BadRequestError(
          "Sản phẩm hiện không còn mở bán hoặc đã ngừng kinh doanh",
        );
      }

      // Kiểm tra tồn kho
      if (input.quantity > item.variant.stockQuantity) {
        throw new BadRequestError(
          `Số lượng vượt quá tồn kho hiện có (${item.variant.stockQuantity})`,
        );
      }

      if (input.quantity === 0) {
        await this.cartRepo.deleteCartItem(itemId, tx);
      } else {
        await this.cartRepo.updateCartItemQuantity(itemId, input.quantity, tx);
      }

      return this.cartRepo.get(cart.id, tx);
    });
  }

  /**
   * Xóa sản phẩm khỏi giỏ hàng
   */
  async remove(userId: number | undefined, owner: CartOwner, itemId: number) {
    return prisma.$transaction(async (tx) => {
      const cart = await this.resolveCart(userId, owner?.sessionId, tx);
      const deleted = await this.cartRepo.deleteCartItemByIdAndCartId(
        itemId,
        cart.id,
        tx,
      );
      if (!deleted) {
        throw new NotFoundError("Mục sản phẩm không tồn tại trong giỏ hàng");
      }
      return this.cartRepo.get(cart.id, tx);
    });
  }

  /**
   * Xóa toàn bộ sản phẩm trong giỏ hàng (Clear Cart)
   */
  async clear(userId?: number, owner?: CartOwner) {
    return prisma.$transaction(async (tx) => {
      const cart = await this.resolveCart(userId, owner?.sessionId, tx);
      await this.cartRepo.clearCart(cart.id, tx);
      return this.cartRepo.get(cart.id, tx);
    });
  }

  /**
   * Gộp giỏ hàng vãng lai (Guest) vào giỏ tài khoản người dùng (User)
   */
  async merge(userId: number, owner: CartOwner) {
    if (!owner.sessionId) {
      throw new BadRequestError(
        "Session ID không tồn tại để thực hiện gộp giỏ hàng",
      );
    }
    return prisma.$transaction(async (tx) => {
      return this.cartRepo.mergeGuestCart(userId, owner.sessionId!, tx);
    });
  }
}

```

# modules\cart-order\cart-order.routes.ts

| Property | Value |
|----------|-------|
| Path | `modules\cart-order\cart-order.routes.ts` |
| Size | 612 bytes |
| Extension | `.ts` |
| Modified | 2026-09-30 08:28:34.525929 |

```typescript
import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { cartRouter } from './cart/cart.routes'
import { orderRouter } from './order/order.routes'

export const cartOrderRouter = Router()

// Giới hạn 100 requests mỗi 15 phút cho cụm Cart-Order
const checkoutLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { statusCode: 429, message: 'Bạn đã gửi quá nhiều yêu cầu, vui lòng thử lại sau.' },
})

cartOrderRouter.use(checkoutLimiter)
cartOrderRouter.use('/cart', cartRouter)
cartOrderRouter.use('/orders', orderRouter)
```

# modules\cart-order\order\order.controller.ts

| Property | Value |
|----------|-------|
| Path | `modules\cart-order\order\order.controller.ts` |
| Size | 4,859 bytes |
| Extension | `.ts` |
| Modified | 2026-10-10 15:03:16.245632 |

```typescript
import { NextFunction, Request, Response } from 'express'
import { BadRequestError, UnauthorizedError } from '@/common/errors'
import { createOrderSchema, listOrderSchema, updateOrderStatusSchema } from './order.schema'
import { OrderService } from './order.service'
import { prisma } from '@/database/prisma'

/**
 * Lấy userId BẮT BUỘC từ Middleware Xác thực (Auth Middleware)
 */
const getRequiredUserId = (req: Request): number => {
  const userId = (req as any).user?.userId
  
  if (!userId || isNaN(Number(userId))) {
    throw new UnauthorizedError('Bạn cần đăng nhập để thực hiện thao tác này')
  }
  
  return Number(userId)
}

/**
 * Helper kiểm tra và ép kiểu orderId từ URL params
 */
const parseOrderId = (param: string): number => {
  const orderId = Number(param)
  if (isNaN(orderId) || orderId <= 0) {
    throw new BadRequestError('Mã đơn hàng (orderId) không hợp lệ')
  }
  return orderId
}

export class OrderController {
  constructor(private readonly service = new OrderService()) {}

  // Lấy thống kê Dashboard cho Admin
  getDashboardStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getDashboardStats()
      return res.status(200).json({ statusCode: 200, data })
    } catch (error) {
      next(error)
    }
  }

  // Lấy danh sách đơn hàng của User (hoặc toàn bộ đơn nếu là Admin)
  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = getRequiredUserId(req)
      const parsed = listOrderSchema.safeParse(req.query)
      
      if (!parsed.success) {
        throw new BadRequestError(parsed.error.issues[0]?.message ?? 'Tham số truy vấn không hợp lệ')
      }

      let isAdmin = false
      if ((req as any).user?.roleId) {
        const role = await prisma.role.findFirst({
          where: { id: (req as any).user.roleId, isActive: true, deletedAt: null },
        })
        isAdmin = role?.code === 'ADMIN'
      }

      const data = await this.service.list(userId, parsed.data, isAdmin)
      return res.status(200).json({ statusCode: 200, data })
    } catch (error) {
      next(error)
    }
  }

  // Xem chi tiết một đơn hàng
  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = getRequiredUserId(req)
      const orderId = parseOrderId(req.params.orderId)

      const data = await this.service.findById(userId, orderId)
      return res.status(200).json({ statusCode: 200, data })
    } catch (error) {
      next(error)
    }
  }

  // Lấy thông tin thanh toán (QR code) cho đơn hàng PENDING_PAYMENT
  getPaymentDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = getRequiredUserId(req)
      const orderId = parseOrderId(req.params.orderId)

      const data = await this.service.getPaymentDetails(userId, orderId)
      return res.status(200).json({ statusCode: 200, data })
    } catch (error) {
      next(error)
    }
  }

  // Tạo đơn hàng mới (Checkout)
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = getRequiredUserId(req)
      const parsed = createOrderSchema.safeParse(req.body)

      if (!parsed.success) {
        throw new BadRequestError(parsed.error.issues[0]?.message ?? 'Dữ liệu đặt hàng không hợp lệ')
      }

      const data = await this.service.create(userId, parsed.data)
      return res.status(201).json({ statusCode: 201, data })
    } catch (error) {
      next(error)
    }
  }

  // Khách hàng hủy đơn hàng
  cancel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = getRequiredUserId(req)
      const orderId = parseOrderId(req.params.orderId)

      const data = await this.service.cancel(userId, orderId)
      return res.status(200).json({ statusCode: 200, data })
    } catch (error) {
      next(error)
    }
  }

  // Cập nhật trạng thái đơn hàng (Dành cho Admin / System Manager)
  updateStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const adminId = getRequiredUserId(req)
      const orderId = parseOrderId(req.params.orderId)
      
      const parsed = updateOrderStatusSchema.safeParse(req.body)
      if (!parsed.success) {
        throw new BadRequestError(parsed.error.issues[0]?.message ?? 'Trạng thái đơn hàng không hợp lệ')
      }

      const data = await this.service.updateStatus(orderId, parsed.data, adminId)
      return res.status(200).json({ statusCode: 200, data })
    } catch (error) {
      next(error)
    }
  }
}
```

# modules\cart-order\order\order.repo.ts

| Property | Value |
|----------|-------|
| Path | `modules\cart-order\order\order.repo.ts` |
| Size | 11,745 bytes |
| Extension | `.ts` |
| Modified | 2026-10-11 17:23:08.188691 |

```typescript
import { OrderStatus, PaymentStatus, PointTransType, Prisma } from '@prisma/client'
import { prisma } from '@/database/prisma'
import { ListOrderInput } from './order.schema'

export const orderItemInclude = {
  orderItems: {
    include: {
      variant: {
        include: {
          product: {
            select: { id: true, defaultName: true, thumbnailUrl: true },
          },
         
        },
      },
    },
  },
  shipment: true,
  paymentTransactions: true,
  pointTransactions: true,
} satisfies Prisma.OrderInclude

export class OrderRepo {
  /**
   * PESSIMISTIC LOCK: Khóa phiên giỏ hàng của User chống spam click / double-submit
   */
  async lockCartByUserId(userId: number, tx: Prisma.TransactionClient) {
    const carts = await tx.$queryRaw<Array<{ id: number }>>`
      SELECT id FROM "Cart" WHERE "userId" = ${userId} FOR UPDATE
    `
    return carts[0]
  }

  async list(userId: number, query: ListOrderInput, isAdmin: boolean = false) {
    const { page = 1, limit = 10, status, all } = query

    const where: Prisma.OrderWhereInput = {
      ...(isAdmin && all ? {} : { userId }),
      deletedAt: null,
      ...(status ? { status } : {}),
    }

    const [totalItems, data] = await Promise.all([
      prisma.order.count({ where }),
      prisma.order.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: orderItemInclude,
      }),
    ])

    return {
      data,
      totalItems,
      page,
      limit,
      totalPages: Math.ceil(totalItems / limit) || 1,
    }
  }

  async findById(
    id: number,
    userId?: number,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.order.findFirst({
      where: {
        id,
        deletedAt: null,
        ...(userId ? { userId } : {}),
      },
      include: orderItemInclude,
    })
  }

  async create(data: Prisma.OrderCreateInput, tx: Prisma.TransactionClient) {
    return tx.order.create({
      data,
      include: orderItemInclude,
    })
  }

  async updateStatus(
    id: number,
    status: OrderStatus,
    updatedById?: number,
    paymentStatus?: PaymentStatus,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.order.update({
      where: { id },
      data: {
        status,
        updatedById,
        ...(paymentStatus ? { paymentStatus } : {}),
      },
      include: orderItemInclude,
    })
  }

  async update(
    id: number,
    data: Prisma.OrderUpdateInput,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.order.update({
      where: { id },
      data,
      include: orderItemInclude,
    })
  }

  async findShippingAddress(
    id: number,
    userId: number,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.shippingAddress.findFirst({
      where: { id, userId },
    })
  }

  async findVariantForOrder(
    variantId: number,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    const now = new Date()
    return db.productVariant.findFirst({
      where: { id: variantId, deletedAt: null },
      include: {
        product: true,
       
        flashSaleItems: {
          where: {
            campaign: {
              isActive: true,
              deletedAt: null,
              startTime: { lte: now },
              endTime: { gte: now },
            },
          },
          include: {
            campaign: true,
          },
        },
      },
    })
  }

  async findVariantsForOrderList(
    variantIds: number[],
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    const now = new Date()
    return db.productVariant.findMany({
      where: { 
        id: { in: variantIds }, 
        deletedAt: null 
      },
      include: {
        product: true,
        flashSaleItems: {
          where: {
            campaign: {
              isActive: true,
              deletedAt: null,
              startTime: { lte: now },
              endTime: { gte: now },
            },
          },
          include: {
            campaign: true,
          },
        },
      },
    })
  }

  /**
   * OPTIMISTIC LOCK: Trừ tồn kho kiểm tra cả updatedAt lẫn stockQuantity
   */
  async decrementStockOptimistic(
    variantId: number,
    quantity: number,
    expectedUpdatedAt: Date,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    const updated = await db.productVariant.updateMany({
      where: {
        id: variantId,
        updatedAt: expectedUpdatedAt,
        stockQuantity: { gte: quantity },
      },
      data: { stockQuantity: { decrement: quantity } },
    })
    return updated.count
  }

  async incrementStock(
    variantId: number,
    quantity: number,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.productVariant.update({
      where: { id: variantId },
      data: { stockQuantity: { increment: quantity } },
    })
  }

  

  async refundUserPoints(
    userId: number,
    orderId: number,
    pointUsed: number,
    orderCode: string,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: { rewardPoints: { increment: pointUsed } },
      select: { rewardPoints: true },
    })

    return db.pointTransaction.create({
      data: {
        userId,
        orderId,
        pointChange: pointUsed,
        currentPoint: updatedUser.rewardPoints,
        transactionType: PointTransType.REFUND,
        description: `Hoàn điểm do hủy đơn hàng ${orderCode}`,
      },
    })
  }

  async refundVoucherUsage(
    voucherCode: string,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.voucher.updateMany({
      where: { code: voucherCode, usedCount: { gt: 0 } },
      data: { usedCount: { decrement: 1 } },
    })
  }

  async cancelOrder(
    orderId: number,
    paymentStatus: PaymentStatus,
    updatedById?: number,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.order.update({
      where: { id: orderId },
      data: {
        status: OrderStatus.CANCELLED,
        paymentStatus,
        updatedById,
      },
      include: orderItemInclude,
    })
  }

  async incrementFlashSaleSoldQuantity(
    flashSaleItemId: number,
    quantity: number,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.flashSaleItem.update({
      where: { id: flashSaleItemId },
      data: { soldQuantity: { increment: quantity } },
    })
  }

  async findVoucherByCode(
    code: string,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.voucher.findFirst({
      where: { code, deletedAt: null },
    })
  }

  async countUserVoucherOrders(
    userId: number,
    voucherCode: string,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.order.count({
      where: {
        userId,
        voucherCode,
        status: { not: OrderStatus.CANCELLED },
      },
    })
  }

  async incrementVoucherUsage(
    voucherCode: string,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.voucher.updateMany({
      where: { code: voucherCode },
      data: { usedCount: { increment: 1 } },
    })
  }

  async getUserRewardPoints(
    userId: number,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { rewardPoints: true },
    })
    return user?.rewardPoints ?? 0
  }

  /**
   * ATOMIC UPDATE: Trừ điểm thưởng có điều kiện chống trừ âm điểm khi chạy song song
   */
  async deductUserPoints(
    userId: number,
    orderId: number,
    pointUsed: number,
    orderCode: string,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    const updated = await db.user.updateMany({
      where: { id: userId, rewardPoints: { gte: pointUsed } },
      data: { rewardPoints: { decrement: pointUsed } },
    })

    if (updated.count === 0) {
      throw new Error('Số điểm thưởng không đủ hoặc đã bị trừ bởi giao dịch song song')
    }

    const user = await db.user.findUnique({
      where: { id: userId },
      select: { rewardPoints: true },
    })

    return db.pointTransaction.create({
      data: {
        userId,
        orderId,
        pointChange: -pointUsed,
        currentPoint: user?.rewardPoints ?? 0,
        transactionType: PointTransType.REDEEM,
        description: `Dùng ${pointUsed} điểm thanh toán đơn hàng ${orderCode}`,
      },
    })
  }

  async decrementFlashSaleSoldQuantity(
    variantId: number,
    quantity: number,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    const now = new Date()
    const activeItem = await db.flashSaleItem.findFirst({
      where: {
        variantId,
        soldQuantity: { gte: quantity },
        campaign: {
          isActive: true,
          deletedAt: null,
          startTime: { lte: now },
          endTime: { gte: now },
        },
      },
    })

    if (activeItem) {
      await db.flashSaleItem.update({
        where: { id: activeItem.id },
        data: { soldQuantity: { decrement: quantity } },
      })
    }
  }

  async findEarnTransactionByOrderId(
    orderId: number,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.pointTransaction.findFirst({
      where: {
        orderId,
        transactionType: PointTransType.EARN,
      },
    })
  }

  async awardUserPoints(
    userId: number,
    orderId: number,
    pointEarned: number,
    orderCode: string,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: { rewardPoints: { increment: pointEarned } },
      select: { rewardPoints: true },
    })

    return db.pointTransaction.create({
      data: {
        userId,
        orderId,
        pointChange: pointEarned,
        currentPoint: updatedUser.rewardPoints,
        transactionType: PointTransType.EARN,
        description: `Tích lũy điểm thưởng từ đơn hàng ${orderCode}`,
      },
    })
  }

  async getDashboardStats() {
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)

    const [totalUsers, totalOrders, totalProducts, revenueResult, newUsersThisMonth, ordersPending] = await Promise.all([
      prisma.user.count({ where: { deletedAt: null } }),
      prisma.order.count({ where: { deletedAt: null } }),
      prisma.product.count({ where: { deletedAt: null } }),
      prisma.order.aggregate({
        _sum: { totalAmount: true },
        where: { deletedAt: null, status: { notIn: ['CANCELLED', 'RETURNED'] } },
      }),
      prisma.user.count({
        where: {
          deletedAt: null,
          createdAt: { gte: startOfMonth },
        },
      }),
      prisma.order.count({
        where: { deletedAt: null, status: { in: ['PENDING_PAYMENT', 'PROCESSING', 'CONFIRMED'] } },
      }),
    ])

    return {
      totalUsers,
      totalOrders,
      totalProducts,
      totalRevenue: Number(revenueResult._sum.totalAmount || 0),
      newUsersThisMonth,
      ordersPending,
    }
  }
}
```

# modules\cart-order\order\order.routes.ts

| Property | Value |
|----------|-------|
| Path | `modules\cart-order\order\order.routes.ts` |
| Size | 1,543 bytes |
| Extension | `.ts` |
| Modified | 2026-10-10 15:03:16.246634 |

```typescript
import { Router } from 'express'
import { OrderController } from './order.controller'
import { requireAuth } from '@/middlewares/guards/auth.guard'
import { requireAdmin } from '@/middlewares/guards/role.guard'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import { createOrderSchema, listOrderSchema, updateOrderStatusSchema } from './order.schema'
import { z } from 'zod'

const orderIdParamSchema = z.object({
  orderId: z.coerce.number().int().positive('orderId phải là số nguyên dương'),
})

export const orderRouter = Router()
const controller = new OrderController()

orderRouter.use(requireAuth)

// Thống kê Dashboard dành riêng cho Quản trị viên (Admin)
orderRouter.get('/dashboard-stats', requireAdmin, controller.getDashboardStats)

orderRouter.get('/', validateRequest({ query: listOrderSchema }), controller.list)
orderRouter.post('/', validateRequest({ body: createOrderSchema }), controller.create)
orderRouter.get('/:orderId', validateRequest({ params: orderIdParamSchema }), controller.findById)
orderRouter.get('/:orderId/payment-details', validateRequest({ params: orderIdParamSchema }), controller.getPaymentDetails)
orderRouter.post('/:orderId/cancel', validateRequest({ params: orderIdParamSchema }), controller.cancel)

// Chỉ ADMIN mới có quyền đổi trạng thái đơn
orderRouter.patch(
  '/:orderId/status',
  requireAdmin,
  validateRequest({ params: orderIdParamSchema, body: updateOrderStatusSchema }),
  controller.updateStatus,
)
```

# modules\cart-order\order\order.schema.ts

| Property | Value |
|----------|-------|
| Path | `modules\cart-order\order\order.schema.ts` |
| Size | 3,610 bytes |
| Extension | `.ts` |
| Modified | 2026-10-11 17:23:08.192691 |

```typescript
import { z } from 'zod'

// Schema kiểm tra địa chỉ người nhận
const addressSchema = z.object({
  receiverName: z
    .string({ required_error: 'Vui lòng nhập tên người nhận' })
    .trim()
    .min(1, 'Tên người nhận không được để trống')
    .max(255, 'Tên người nhận quá dài'),
  receiverPhone: z
    .string({ required_error: 'Vui lòng nhập số điện thoại' })
    .trim()
    .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Số điện thoại không đúng định dạng Việt Nam'),
  province: z.string().trim().min(1, 'Vui lòng chọn Tỉnh/Thành phố').max(150),
  district: z.string().trim().min(1, 'Vui lòng chọn Quận/Huyện').max(150),
  ward: z.string().trim().min(1, 'Vui lòng chọn Phường/Xã').max(150),
  detailAddress: z.string().trim().min(1, 'Vui lòng nhập địa chỉ chi tiết').max(500),
})

// Các trạng thái đơn hàng hợp lệ
export const ORDER_STATUS = [
  'PENDING_PAYMENT',
  'CONFIRMED',
  'PROCESSING',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED',
  'RETURNED',
] as const

// 1. Schema Tạo đơn hàng (Checkout)
export const createOrderSchema = z
  .object({
    // Danh sách ID các sản phẩm trong giỏ muốn thanh toán (Nếu rỗng thì checkout toàn bộ giỏ)
    cartItemIds: z.array(z.coerce.number().int().positive()).min(1, 'Danh sách chọn thanh toán không hợp lệ').optional(),
    directBuy: z.object({ variantId: z.coerce.number().int().positive(), quantity: z.coerce.number().int().positive() }).optional(),
    
    // Địa chỉ giao hàng (Chọn ID có sẵn HOẶC nhập địa chỉ mới)
    shippingAddressId: z.coerce.number().int().positive().optional(),
    shippingAddress: addressSchema.optional(),

    paymentMethod: z.enum(['COD', 'VNPAY', 'MOMO', 'BANK_TRANSFER'], {
      errorMap: () => ({ message: 'Phương thức thanh toán không hợp lệ' }),
    }),
    shippingMethod: z.string().trim().min(1).max(50).default('STANDARD'),
    customerNote: z.string().trim().max(5000, 'Ghi chú không được quá 5000 ký tự').optional(),
    voucherCode: z.string().trim().max(100).optional(),
    pointUsed: z.coerce.number().int().min(0, 'Số điểm sử dụng không được nhỏ hơn 0').optional(),
    
    // LƯU Ý: Đã LOẠI BỎ shippingFee khỏi Schema để tránh việc Client tự gửi giá ship lên.
  })
  .refine((data) => data.shippingAddressId || data.shippingAddress, {
    message: 'Vui lòng chọn địa chỉ có sẵn hoặc nhập địa chỉ giao hàng mới',
    path: ['shippingAddress'], // Chỉ định hiển thị lỗi tại vị trí trường shippingAddress
  })

// 2. Schema Lấy danh sách đơn hàng (Đã BỔ SUNG lọc theo status)
export const listOrderSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  status: z.enum(ORDER_STATUS).optional(), // Bổ sung bộ lọc trạng thái đơn
  all: z.coerce.boolean().optional(),
})

// 3. Schema Cập nhật trạng thái đơn hàng (Dành cho Admin)
export const updateOrderStatusSchema = z.object({
  status: z.enum(ORDER_STATUS, {
    errorMap: () => ({ message: 'Trạng thái đơn hàng không hợp lệ' }),
  }),
})

// Infer các Types cho TypeScript
export type CreateOrderInput = z.infer<typeof createOrderSchema>
export type ListOrderInput = z.infer<typeof listOrderSchema>
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>

```

# modules\cart-order\order\order.service.ts

| Property | Value |
|----------|-------|
| Path | `modules\cart-order\order\order.service.ts` |
| Size | 19,120 bytes |
| Extension | `.ts` |
| Modified | 2026-10-10 15:03:16.250632 |

```typescript
import { randomBytes } from "node:crypto";
import {
  OrderStatus,
  PaymentStatus,
  Prisma,
  ProductStatus,
} from "@prisma/client";
import { prisma } from "@/database/prisma";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "@/common/errors";
import { CartRepo } from "../cart/cart.repo";
import {
  CreateOrderInput,
  ListOrderInput,
  UpdateOrderStatusInput,
} from "./order.schema";
import { OrderRepo } from "./order.repo";
import { VoucherService } from "@/modules/loyalty-engage/voucher/voucher.service";
import { PointService } from "@/modules/loyalty-engage/point/point.service";

export class OrderService {
  constructor(
    private readonly orderRepo = new OrderRepo(),
    private readonly cartRepo = new CartRepo(),
    private readonly voucherService = new VoucherService(),
    private readonly pointService = new PointService(),
  ) {}

  /**
   * Helper tạo mã đơn hàng ngẫu nhiên độ dài an toàn chống trùng lặp (Collision-safe)
   * randomBytes(4) sinh ra 8 ký tự hex (~4.29 tỷ khả năng/ngày)
   */
  private generateOrderCode(): string {
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomStr = randomBytes(4).toString("hex").toUpperCase();
    return `ORD-${dateStr}-${randomStr}`;
  }

  /**
   * Tính phí vận chuyển dựa trên tổng giá trị đơn hàng, hình thức giao hàng và khối lượng hàng
   */
  private calculateShippingFee(
    subTotal: number,
    shippingMethod: string = "STANDARD",
    totalWeightGram: number = 0,
  ): number {
    // Miễn phí vận chuyển cho đơn hàng từ 500,000đ trở lên (trừ đơn hàng EXPRESS) hoặc khi chọn FREE
    if (
      shippingMethod === "FREE" ||
      (subTotal >= 500_000 && shippingMethod !== "EXPRESS")
    ) {
      return 0;
    }

    if (shippingMethod === "EXPRESS") {
      const baseExpressFee = 50_000;
      const extraWeightKg = Math.max(
        0,
        Math.ceil((totalWeightGram - 2000) / 1000),
      );
      return baseExpressFee + extraWeightKg * 10_000;
    }

    // Mặc định STANDARD
    const baseStandardFee = 30_000;
    const extraWeightKg = Math.max(
      0,
      Math.ceil((totalWeightGram - 2000) / 1000),
    );
    return baseStandardFee + extraWeightKg * 5_000;
  }

  async list(userId: number, query: ListOrderInput, isAdmin: boolean = false) {
    return this.orderRepo.list(userId, query, isAdmin);
  }

  async getDashboardStats() {
    return this.orderRepo.getDashboardStats();
  }

  async findById(userId: number, orderId: number) {
    const order = await this.orderRepo.findById(orderId, userId);
    if (!order) throw new NotFoundError("Đơn hàng không tồn tại");
    return order;
  }

  async getPaymentDetails(userId: number, orderId: number) {
    const order = await this.orderRepo.findById(orderId, userId);
    if (!order) throw new NotFoundError("Đơn hàng không tồn tại");

    if (order.status !== "PENDING_PAYMENT") {
      throw new BadRequestError("Đơn hàng không ở trạng thái chờ thanh toán");
    }

    if (order.paymentMethod === "COD") {
       throw new BadRequestError("Đơn hàng COD không cần thanh toán trước");
    }

    // Generate VietQR URL as mock payment QR
    const bankId = "970415"; // VietinBank mock
    const accountNo = "113366668888"; // Mock account
    const accountName = "FASHION ECOMMERCE";
    const amount = order.totalAmount;
    const addInfo = encodeURIComponent(`Thanh toan don hang ${order.orderCode}`);

    const qrUrl = `https://img.vietqr.io/image/${bankId}-${accountNo}-compact2.png?amount=${amount}&addInfo=${addInfo}&accountName=${encodeURIComponent(accountName)}`;

    return {
      orderCode: order.orderCode,
      totalAmount: order.totalAmount,
      paymentMethod: order.paymentMethod,
      qrUrl
    };
  }

  /**
   * Tạo đơn hàng mới (Checkout)
   */
  async create(userId: number, input: CreateOrderInput) {
    return prisma.$transaction(
      async (tx) => {
        // =====================================================================
        // 1. KHÓA GIỎ HÀNG (PESSIMISTIC LOCK) & KIỂM TRA ĐẦU VÀO
        // =====================================================================
        let items: any[] = [];
          if (input.directBuy) {
            items = [{ id: -1, variantId: input.directBuy.variantId, quantity: input.directBuy.quantity }];
          } else {
            const initialCart = await this.cartRepo.findOrCreateOwner(userId, undefined, tx);
            await tx.$queryRaw`SELECT id FROM "Cart" WHERE id = ${initialCart.id} FOR UPDATE`;
            const cart = await this.cartRepo.findByOwner(userId, undefined, tx);
            if (!cart || !cart.cartItems.length) {
              throw new BadRequestError("Giỏ hàng của bạn đang trống");
            }
            items = cart.cartItems.filter((item) => !input.cartItemIds || input.cartItemIds.includes(item.id));
            if (!items.length) {
              throw new BadRequestError("Không có sản phẩm nào được chọn để đặt hàng");
            }
          }

        // =====================================================================
        // 2. CHUẨN HÓA ĐỊA CHỈ GIAO HÀNG (SNAPSHOT STRING)
        // =====================================================================
        const address = input.shippingAddressId
          ? await this.orderRepo.findShippingAddress(input.shippingAddressId, userId, tx)
          : input.shippingAddress;

        if (!address) {
          throw new BadRequestError("Địa chỉ giao hàng không hợp lệ");
        }

        const receiverName = address.receiverName?.trim();
        const receiverPhone = ("phoneNumber" in address ? address.phoneNumber : address.receiverPhone)?.trim();
        const province = address.province?.trim();
        const district = address.district?.trim();
        const ward = address.ward?.trim();
        const detailAddress = address.detailAddress?.trim();

        if (!receiverName || !receiverPhone || !province || !district || !ward || !detailAddress) {
          throw new BadRequestError("Thông tin địa chỉ giao hàng không hợp lệ");
        }

        // Tạo chuỗi snapshot lưu thẳng vào Order
        const shippingAddressSnapshot = `${receiverName} - ${receiverPhone} | ${detailAddress}, ${ward}, ${district}, ${province}`;

        // =====================================================================
        // 3. TÍNH TỔNG TIỀN, KIỂM TRA TỒN KHO & FLASH SALE (OPTIMIZED)
        // =====================================================================
        let subTotal = 0;
        let totalWeightGram = 0;
        const now = new Date();

        // [OPTIMIZE 1 - BATCH QUERY O(1)]: Lấy toàn bộ biến thể trong 1 lần query
        const variantIdsInCart = items.map(item => item.variantId);
        const variantsData = await this.orderRepo.findVariantsForOrderList(variantIdsInCart, tx);
        const variantMap = new Map(variantsData.map(v => [v.id, v]));

        // [OPTIMIZE 2 - PARALLEL MUTATION]: Update tồn kho song song
        const processedItems = await Promise.all(
          items.map(async (item) => {
            const variant = variantMap.get(item.variantId);

            const isProductActive =
              variant &&
              variant.product &&
              variant.product.deletedAt === null &&
              (variant.product.status === ProductStatus.PUBLISHED || (variant.product.status as string) === "ACTIVE");

            if (!variant || !isProductActive) {
              throw new BadRequestError(
                `Sản phẩm "${variant?.product?.defaultName ?? "Không xác định"}" hiện không còn mở bán`
              );
            }

            // OPTIMISTIC LOCK: Trừ tồn kho an toàn bằng version control (updatedAt)
            const updatedCount = await this.orderRepo.decrementStockOptimistic(
              variant.id,
              item.quantity,
              variant.updatedAt, 
              tx,
            );

            if (!updatedCount) {
              throw new BadRequestError(
                `Sản phẩm "${variant.product.defaultName}" vừa có thay đổi hoặc không đủ tồn kho để đặt hàng. Vui lòng thử lại.`
              );
            }

            const currentWeight = (variant.weightGram ?? 0) * item.quantity;
            let unitPrice = Number(variant.sellingPrice);
            
            // Xử lý Logic Flash Sale
            const activeFlashSale = variant.flashSaleItems?.find(
              (fsi) =>
                fsi.campaign &&
                fsi.campaign.isActive &&
                fsi.campaign.deletedAt === null &&
                fsi.campaign.startTime <= now &&
                fsi.campaign.endTime >= now &&
                (fsi.promoQuantity - fsi.soldQuantity) >= item.quantity 
            );

            if (activeFlashSale) {
              unitPrice = Number(activeFlashSale.flashSalePrice);
              await this.orderRepo.incrementFlashSaleSoldQuantity(activeFlashSale.id, item.quantity, tx);
            }

            return {
              calculatedSubTotal: unitPrice * item.quantity,
              calculatedWeight: currentWeight,
              orderItemData: {
                productName: variant.product.defaultName,
                skuCode: variant.sku,
                variantValue: variant.variantValue ?? "Tiêu chuẩn",
                productImageUrl: variant.imageUrl ?? variant.product.thumbnailUrl,
                unitPrice,
                quantity: item.quantity,
                variant: { connect: { id: variant.id } },
              },
            };
          })
        );

        // Tổng hợp Data sau Promise.all
        const orderItems: Prisma.OrderItemCreateWithoutOrderInput[] = [];
        for (const p of processedItems) {
          subTotal += p.calculatedSubTotal;
          totalWeightGram += p.calculatedWeight;
          orderItems.push(p.orderItemData);
        }

        // =====================================================================
        // 4. ÁP DỤNG VOUCHER & ĐIỂM THƯỞNG
        // =====================================================================
        const shippingFee = this.calculateShippingFee(subTotal, input.shippingMethod, totalWeightGram);
        let voucherDiscount = 0;

        if (input.voucherCode) {
          const voucher = await this.voucherService.applyVoucherSafely(input.voucherCode, userId, tx);
          if (subTotal < Number(voucher.minOrderValue)) {
            await this.voucherService.releaseVoucherSafely(input.voucherCode, userId, tx);
            throw new BadRequestError(`Đơn hàng tối thiểu ${Number(voucher.minOrderValue).toLocaleString("vi-VN")}đ`);
          }

          if (voucher.discountType === "PERCENTAGE") {
            voucherDiscount = Math.round((subTotal * Number(voucher.discountValue)) / 100);
            if (voucher.maxDiscountAmt && Number(voucher.maxDiscountAmt) > 0) {
              voucherDiscount = Math.min(voucherDiscount, Number(voucher.maxDiscountAmt));
            }
          } else {
            voucherDiscount = Number(voucher.discountValue);
          }

          voucherDiscount = Math.min(voucherDiscount, subTotal);
        }

        let pointUsed = 0;
        let pointDiscount = 0;

        if (input.pointUsed && input.pointUsed > 0) {
          const userPoints = await this.orderRepo.getUserRewardPoints(userId, tx);
          if (input.pointUsed > userPoints) throw new BadRequestError(`Bạn chỉ có ${userPoints} điểm`);

          const remainingPayable = Math.max(0, subTotal + shippingFee - voucherDiscount);
          pointDiscount = Math.min(input.pointUsed, remainingPayable);
          pointUsed = pointDiscount;
        }

        const totalAmount = Math.max(0, subTotal + shippingFee - voucherDiscount - pointDiscount);
        const pointEarned = Math.floor(totalAmount * 0.01);

        // =====================================================================
        // 5. LƯU DATABASE & DỌN DẸP GIỎ HÀNG
        // =====================================================================
        const orderCode = this.generateOrderCode();
        const customerNote = input.customerNote?.trim() ? input.customerNote.trim() : undefined;

        const order = await this.orderRepo.create(
          {
            orderCode,
            user: { connect: { id: userId } },
            shippingAddress: shippingAddressSnapshot, 
            subTotal,
            shippingFee,
            shippingMethod: input.shippingMethod || 'STANDARD',
            shippingDiscount: 0,
            voucherCode: input.voucherCode,
            voucherDiscount,
            pointUsed,
            pointDiscount,
            pointEarned,
            totalAmount,
            paymentMethod: input.paymentMethod,
            customerNote: customerNote,
            orderItems: { create: orderItems },
          },
          tx,
        );

        if (pointUsed > 0) {
          await this.orderRepo.deductUserPoints(userId, order.id, pointUsed, orderCode, tx);
        }

        if (!input.directBuy) { await this.cartRepo.deleteCartItemsByIds(items.map((i) => i.id), tx); }

        return order;
      },
      {
        // [OPTIMIZE 3 - THỜI GIAN CHỜ DB]: Giảm Timeout
        // Trước đây timeout = 150000 (150s) rất nguy hiểm làm treo DB Pool. 
        // Sau khi loại bỏ lỗi N+1 Query, toàn bộ logic này chạy trong < 50ms. 
        // Set timeout tối đa 15s là an toàn và lý tưởng cho CSDL.
        maxWait: 5000, 
        timeout: 15000, 
      },
    );
  }

  /**
   * Cập nhật trạng thái đơn hàng (Dành cho Admin)
   */
  async updateStatus(
    orderId: number,
    input: UpdateOrderStatusInput,
    updatedById?: number,
  ) {
    return prisma.$transaction(async (tx) => {
      const order = await this.orderRepo.findById(orderId, undefined, tx);
      if (!order) throw new NotFoundError("Đơn hàng không tồn tại");

      if (
        order.status === OrderStatus.CANCELLED ||
        order.status === OrderStatus.DELIVERED
      ) {
        throw new BadRequestError(
          "Không thể thay đổi trạng thái đơn hàng đã kết thúc",
        );
      }

      // Nếu Admin chọn hủy đơn -> Thực hiện hoàn kho mà không bị giới hạn trạng thái như Khách hàng
      if (input.status === OrderStatus.CANCELLED) {
        // Kiểm tra an toàn vận chuyển: Không thể hủy đơn nếu hàng đang trên đường giao
        if (
          order.status === OrderStatus.SHIPPED ||
          (order.shipment &&
            ["PICKED_UP", "IN_TRANSIT"].includes(order.shipment.status))
        ) {
          throw new BadRequestError(
            "Đơn hàng đang trong quá trình vận chuyển, không thể hủy trực tiếp. Vui lòng xử lý qua quy trình giao hàng thất bại hoặc hoàn hàng",
          );
        }
        return this.processOrderCancellation(order, updatedById, tx);
      }

      // Xử lý các nghiệp vụ đi kèm khi hoàn thành giao hàng (DELIVERED)
      let newPaymentStatus: PaymentStatus | undefined = undefined;
      if (input.status === OrderStatus.DELIVERED) {
        // 1. Tự động đồng bộ paymentStatus = SUCCESS cho đơn hàng COD
        if (
          order.paymentMethod === "COD" &&
          order.paymentStatus === PaymentStatus.PENDING
        ) {
          newPaymentStatus = PaymentStatus.SUCCESS;
        }

        // 2. Tự động tích lũy điểm thưởng (order.pointEarned) cho khách hàng nếu chưa nhận
        if (order.pointEarned > 0) {
          const existingEarn =
            await this.orderRepo.findEarnTransactionByOrderId(order.id, tx);
          if (!existingEarn) {
            await this.orderRepo.awardUserPoints(
              order.userId,
              order.id,
              order.pointEarned,
              order.orderCode,
              tx,
            );
          }
        }
      }

      return this.orderRepo.updateStatus(
        orderId,
        input.status,
        updatedById,
        newPaymentStatus,
        tx,
      );
    });
  }

  /**
   * Khách hàng tự hủy đơn hàng
   */
  async cancel(userId: number, orderId: number) {
    return prisma.$transaction(async (tx) => {
      const order = await this.orderRepo.findById(orderId, userId, tx);

      if (!order) throw new NotFoundError("Đơn hàng không tồn tại");

      // Khách hàng chỉ được phép hủy khi đơn chưa đi vào giai đoạn đóng gói / giao hàng
      if (!["PENDING_PAYMENT", "CONFIRMED"].includes(order.status)) {
        throw new ForbiddenError(
          "Đơn hàng đã được xử lý hoặc đang giao, bạn không thể tự hủy",
        );
      }

      return this.processOrderCancellation(order, userId, tx);
    });
  }

  /**
   * Helper chuẩn hóa logic hoàn kho, hoàn điểm, hoàn voucher và đồng bộ paymentStatus khi Hủy đơn
   */
  private async processOrderCancellation(
    order: any,
    updatedById: number | undefined,
    tx: Prisma.TransactionClient,
  ) {
    const concurrentTasks: Promise<any>[] = [];

    // 1. Task: Hoàn lại tồn kho và hoàn quota Flash Sale
    for (const item of order.orderItems) {
      if (!item.variantId) continue;
      concurrentTasks.push(this.orderRepo.incrementStock(item.variantId, item.quantity, tx));
      concurrentTasks.push(this.orderRepo.decrementFlashSaleSoldQuantity(item.variantId, item.quantity, tx));
    }

    // 2. Task: Hoàn lại & bồi hoàn Điểm thưởng qua PointService
    concurrentTasks.push(this.pointService.compensatePointsForCancelledOrder(order.id, tx));

    // 3. Task: Hoàn lại lượt dùng Voucher an toàn cả Redis và PostgreSQL
    if (order.voucherCode && Number(order.voucherDiscount) > 0) {
      concurrentTasks.push(this.voucherService.releaseVoucherSafely(order.voucherCode, order.userId, tx));
    }

    // Thực thi toàn bộ lệnh Update/Refund song song
    await Promise.all(concurrentTasks);

    // 4. Cập nhật trạng thái đơn và đồng bộ paymentStatus
    const isPaid = order.paymentStatus === "PAID" || order.paymentStatus === PaymentStatus.SUCCESS;
    const paymentStatus = isPaid ? PaymentStatus.REFUNDED : (order.paymentStatus as PaymentStatus);

    return this.orderRepo.cancelOrder(order.id, paymentStatus, updatedById, tx);
  }
}

```

# modules\catalog\brand\brand.controller.ts

| Property | Value |
|----------|-------|
| Path | `modules\catalog\brand\brand.controller.ts` |
| Size | 2,201 bytes |
| Extension | `.ts` |
| Modified | 2026-10-09 10:38:13.245705 |

```typescript
import { Request, Response, NextFunction } from 'express'
import { BrandService } from './brand.service'

export class BrandController {
  constructor(private brandService = new BrandService()) {}

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rawLang = String(req.query.lang || req.headers['accept-language'] || 'vi')
      const lang = rawLang.split(',')[0].split('-')[0].trim()
      const result = await this.brandService.list(req.query as any, lang)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const brandId = Number(req.params.brandId)
      const rawLang = String(req.query.lang || req.headers['accept-language'] || 'vi')
      const lang = rawLang.split(',')[0].split('-')[0].trim()
      const data = await this.brandService.findById(brandId, lang)
      return res.status(200).json({ statusCode: 200, data })
    } catch (err) {
      next(err)
    }
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const data = await this.brandService.create(userId, req.body)
      return res.status(201).json({ statusCode: 201, message: 'Tạo thương hiệu thành công', data })
    } catch (err) {
      next(err)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const brandId = Number(req.params.brandId)
      const data = await this.brandService.update({ updateById: userId, id: brandId, data: req.body })
      return res.status(200).json({ statusCode: 200, message: 'Cập nhật thành công', data })
    } catch (err) {
      next(err)
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const brandId = Number(req.params.brandId)
      const result = await this.brandService.delete(userId, brandId)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  
}
```

# modules\catalog\brand\brand.repo.ts

| Property | Value |
|----------|-------|
| Path | `modules\catalog\brand\brand.repo.ts` |
| Size | 2,098 bytes |
| Extension | `.ts` |
| Modified | 2026-10-10 00:01:54.937071 |

```typescript
import { prisma } from '@/database/prisma'
import {
  CreateBrandBodyType,
  GetBrandQueryType,
  UpdateBrandBodyType,
  UpsertBrandTranslationType,
} from './brand.schema'
import { ALL_LANGUAGE_CODE } from '@/common/helpers'


export class BrandRepo {
  async list(pagination: GetBrandQueryType, languageId?: string) {
    const skip = (pagination.page - 1) * pagination.limit
    const take = pagination.limit

    const [totalItems, data] = await Promise.all([
      prisma.brand.count({
        where: { deletedAt: null },
      }),
      prisma.brand.findMany({
        where: { deletedAt: null },
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
    ])

    return {
      data,
      totalItems,
      page: pagination.page,
      limit: pagination.limit,
      totalPages: Math.ceil(totalItems / pagination.limit),
    }
  }

  async findById(brandId: number, languageId?: string) {
    return prisma.brand.findUnique({
      where: { id: brandId, deletedAt: null },
     
    })
  }

  async create({ createdById, data }: { createdById: number; data: CreateBrandBodyType }) {
    return prisma.brand.create({
      data: {
        ...data,
        createdById,
      },
    })
  }

  async update({
    updateById,
    id,
    data,
  }: {
    updateById: number
    id: number
    data: UpdateBrandBodyType
  }) {
    return prisma.brand.update({
      where: { id, deletedAt: null },
      data: {
        ...data,
        updatedById: updateById,
      },
    })
  }

  // Xóa mềm chuẩn lưu vết deletedById và cờ isHard từ project mẫu
  async delete({
    deleteById,
    id,
    isHard = false,
  }: {
    deleteById: number
    id: number
    isHard?: boolean
  }) {
    return isHard
      ? prisma.brand.delete({
          where: { id },
        })
      : prisma.brand.update({
          where: { id, deletedAt: null },
          data: {
            deletedById: deleteById,
            deletedAt: new Date(),
          },
        })
  }

  
}
```

# modules\catalog\brand\brand.routes.ts

| Property | Value |
|----------|-------|
| Path | `modules\catalog\brand\brand.routes.ts` |
| Size | 1,190 bytes |
| Extension | `.ts` |
| Modified | 2026-10-09 10:38:13.248704 |

```typescript
import { Router } from 'express'
import { z } from 'zod'
import { BrandController } from './brand.controller'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import { requireAuth } from '@/middlewares/guards/auth.guard'
import { requireAdmin } from '@/middlewares/guards/role.guard'
import {
  getBrandQuerySchema,
  getBrandParamsSchema,
  createBrandBodySchema,
  updateBrandBodySchema,

} from './brand.schema'

export const brandRouter = Router()
const controller = new BrandController()

brandRouter.get('/', validateRequest({ query: getBrandQuerySchema }), controller.list)
brandRouter.get('/:brandId', validateRequest({ params: getBrandParamsSchema }), controller.findById)

brandRouter.post(
  '/',
  requireAuth,
  requireAdmin,
  validateRequest({ body: createBrandBodySchema }),
  controller.create,
)

brandRouter.put(
  '/:brandId',
  requireAuth,
  requireAdmin,
  validateRequest({ params: getBrandParamsSchema, body: updateBrandBodySchema }),
  controller.update,
)

brandRouter.delete(
  '/:brandId',
  requireAuth,
  requireAdmin,
  validateRequest({ params: getBrandParamsSchema }),
  controller.delete,
)


```

# modules\catalog\brand\brand.schema.ts

| Property | Value |
|----------|-------|
| Path | `modules\catalog\brand\brand.schema.ts` |
| Size | 1,995 bytes |
| Extension | `.ts` |
| Modified | 2026-09-30 08:12:14.941942 |

```typescript
import { z } from 'zod'

export const brandSchema = z.object({
  id: z.number(),
  name: z.string().max(500),
  logo: z.string().max(1000),
  createdById: z.number().nullable(),
  updatedById: z.number().nullable(),
  deletedById: z.number().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
})

export const brandTranslationSchema = z.object({
  id: z.number(),
  brandId: z.number(),
  languageId: z.string().max(10),
  name: z.string().max(500),
  description: z.string().nullable().optional(),
  createdById: z.number().nullable(),
  updatedById: z.number().nullable(),
  deletedById: z.number().nullable(),
})

// Query phân trang & ngôn ngữ chuẩn từ project gốc
export const getBrandQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(10),
  lang: z.string().optional().default('vi'),
})

export const getBrandParamsSchema = z.object({
  brandId: z.coerce.number().int().positive('brandId phải là số nguyên dương'),
})

export const createBrandBodySchema = z.object({
  defaultName: z.string().min(1, 'Tên thương hiệu không được để trống').max(500),
  logo: z.string().min(1, 'Logo URL không được để trống').max(1000).optional()
})

export const updateBrandBodySchema = createBrandBodySchema.partial()

// Schema cập nhật Translation
export const upsertBrandTranslationSchema = z.object({
  name: z.string().min(1, 'Tên bản dịch không được để trống').max(500),
  description: z.string().optional(),
})

export type BrandType = z.infer<typeof brandSchema>
export type GetBrandQueryType = z.infer<typeof getBrandQuerySchema>
export type CreateBrandBodyType = z.infer<typeof createBrandBodySchema>
export type UpdateBrandBodyType = z.infer<typeof updateBrandBodySchema>
export type UpsertBrandTranslationType = z.infer<typeof upsertBrandTranslationSchema>
```

# modules\catalog\brand\brand.service.ts

| Property | Value |
|----------|-------|
| Path | `modules\catalog\brand\brand.service.ts` |
| Size | 2,368 bytes |
| Extension | `.ts` |
| Modified | 2026-10-09 10:38:13.251705 |

```typescript
import { BrandRepo } from './brand.repo'
import {
  CreateBrandBodyType,
  GetBrandQueryType,
  UpdateBrandBodyType,
  UpsertBrandTranslationType,
} from './brand.schema'

import { AppError, isNotFoundPrismaError, isUniqueConstraintPrismaError } from '@/common/errors'

export class BrandService {
  constructor(private brandRepo = new BrandRepo()) {}

  async list(query: GetBrandQueryType, languageId: string) {
    return this.brandRepo.list(query, languageId)
  }

  async findById(id: number, languageId: string) {
    const brand = await this.brandRepo.findById(id, languageId)
    if (!brand) {
      throw new AppError('Thương hiệu không tồn tại hoặc đã bị xóa', 404)
    }
    return brand
  }

  async create(createdById: number, data: CreateBrandBodyType) {
    try {
      return await this.brandRepo.create({ createdById, data })
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw new AppError('Tên thương hiệu đã tồn tại', 422)
      }
      throw error
    }
  }

  async update({
    updateById,
    id,
    data,
  }: {
    updateById: number
    id: number
    data: UpdateBrandBodyType
  }) {
    try {
      const brand = await this.brandRepo.findById(id)
      if (!brand) {
        throw new AppError('Bản ghi không tồn tại để cập nhật', 404)
      }
      return await this.brandRepo.update({ updateById, id, data })
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw new AppError('Tên thương hiệu đã tồn tại', 422)
      }
      if (isNotFoundPrismaError(error)) {
        throw new AppError('Bản ghi không tồn tại', 404)
      }
      throw error
    }
  }

  // Soft delete lưu vết deletedById như dự án gốc
  async delete(deleteById: number, id: number) {
    try {
      const brand = await this.brandRepo.findById(id)
      if (!brand) {
        throw new AppError('Bản ghi không tồn tại để xóa', 404)
      }
      await this.brandRepo.delete({ deleteById, id, isHard: false })
      return { message: 'Xóa thương hiệu thành công' }
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw new AppError('Bản ghi không tồn tại', 404)
      }
      throw error
    }
  }

  
}
```

# modules\catalog\catalog.routes.ts

| Property | Value |
|----------|-------|
| Path | `modules\catalog\catalog.routes.ts` |
| Size | 618 bytes |
| Extension | `.ts` |
| Modified | 2026-10-13 02:02:28.719193 |

```typescript
import { Router } from 'express'
import { categoryRouter } from './category/category.routes'
import { brandRouter } from './brand/brand.routes'
import { productRouter } from './product/product.routes'
import { variantAttributeRouter } from './variant-attribute/variant-attribute.routes'
import { tagRouter } from './tag/tag.routes'

export const catalogRouter = Router()

catalogRouter.use('/categories', categoryRouter)
catalogRouter.use('/brands', brandRouter)
catalogRouter.use('/products', productRouter)
catalogRouter.use('/variants', variantAttributeRouter)
catalogRouter.use('/tags', tagRouter)


```

# modules\catalog\category\category.controller.ts

| Property | Value |
|----------|-------|
| Path | `modules\catalog\category\category.controller.ts` |
| Size | 2,154 bytes |
| Extension | `.ts` |
| Modified | 2026-10-09 10:38:13.253707 |

```typescript
import { Request, Response, NextFunction } from 'express'
import { CategoryService } from './category.service'

export class CategoryController {
  constructor(private categoryService = new CategoryService()) {}

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.categoryService.findAll(req.query as any)
      return res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryId = Number(req.params.categoryId)
      const rawLang = String(req.query.lang || req.headers['accept-language'] || 'vi')
      const lang = rawLang.split(',')[0].split('-')[0].trim()
      const data = await this.categoryService.findById(categoryId, lang)
      return res.status(200).json({ statusCode: 200, data })
    } catch (err) {
      next(err)
    }
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const data = await this.categoryService.create({ data: req.body, createdById: userId })
      return res.status(201).json({ statusCode: 201, message: 'Tạo danh mục thành công', data })
    } catch (err) {
      next(err)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const categoryId = Number(req.params.categoryId)
      const data = await this.categoryService.update({ id: categoryId, data: req.body, updatedById: userId })
      return res.status(200).json({ statusCode: 200, message: 'Cập nhật danh mục thành công', data })
    } catch (err) {
      next(err)
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const categoryId = Number(req.params.categoryId)
      const result = await this.categoryService.delete({ id: categoryId, deletedById: userId })
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  
}
```

# modules\catalog\category\category.repo.ts

| Property | Value |
|----------|-------|
| Path | `modules\catalog\category\category.repo.ts` |
| Size | 1,935 bytes |
| Extension | `.ts` |
| Modified | 2026-10-09 10:38:13.255705 |

```typescript
import { prisma } from '@/database/prisma'
import {
  CreateCategoryBodyType,
  GetAllCategoriesQueryType,
  UpdateCategoryBodyType,
  UpsertCategoryTranslationType,
} from './category.schema'
import { ALL_LANGUAGE_CODE } from '@/common/helpers'

export class CategoryRepo {
  async findAll({
    parentCategoryId,
    languageId,
  }: {
    parentCategoryId?: number | null
    languageId?: string
  }) {
    const categories = await prisma.category.findMany({
      where: {
        deletedAt: null,
        parentId: parentCategoryId ?? null,
      },
      
      orderBy: { createdAt: 'desc' },
    })

    return {
      data: categories,
      totalItems: categories.length,
    }
  }

  async findById({ id, languageId }: { id: number; languageId?: string }) {
    return prisma.category.findUnique({
      where: { id, deletedAt: null },
      
    })
  }

  async create({
    createdById,
    data,
  }: {
    createdById: number
    data: CreateCategoryBodyType
  }) {
    return prisma.category.create({
      data: {
        ...data,
        createdById,
      },
      
    })
  }

  async update({
    id,
    updatedById,
    data,
  }: {
    id: number
    updatedById: number
    data: UpdateCategoryBodyType
  }) {
    return prisma.category.update({
      where: { id, deletedAt: null },
      data: {
        ...data,
        updatedById,
      },
     
    })
  }

  // Soft delete lưu vết deletedById
  async delete({
    id,
    deletedById,
    isHard = false,
  }: {
    id: number
    deletedById: number
    isHard?: boolean
  }) {
    return isHard
      ? prisma.category.delete({
          where: { id },
        })
      : prisma.category.update({
          where: { id, deletedAt: null },
          data: {
            deletedAt: new Date(),
            deletedById,
          },
        })
  }

  
}
```

# modules\catalog\category\category.routes.ts

| Property | Value |
|----------|-------|
| Path | `modules\catalog\category\category.routes.ts` |
| Size | 1,272 bytes |
| Extension | `.ts` |
| Modified | 2026-10-09 10:38:13.257705 |

```typescript
import { Router } from 'express'
import { z } from 'zod'
import { CategoryController } from './category.controller'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import { requireAuth } from '@/middlewares/guards/auth.guard'
import { requireAdmin } from '@/middlewares/guards/role.guard'
import {
  getAllCategoriesQuerySchema,
  getCategoryParamsSchema,
  createCategoryBodySchema,
  updateCategoryBodySchema,

} from './category.schema'

export const categoryRouter = Router()
const controller = new CategoryController()

categoryRouter.get('/', validateRequest({ query: getAllCategoriesQuerySchema }), controller.findAll)
categoryRouter.get('/:categoryId', validateRequest({ params: getCategoryParamsSchema }), controller.findById)

categoryRouter.post(
  '/',
  requireAuth,
  requireAdmin,
  validateRequest({ body: createCategoryBodySchema }),
  controller.create,
)

categoryRouter.put(
  '/:categoryId',
  requireAuth,
  requireAdmin,
  validateRequest({ params: getCategoryParamsSchema, body: updateCategoryBodySchema }),
  controller.update,
)

categoryRouter.delete(
  '/:categoryId',
  requireAuth,
  requireAdmin,
  validateRequest({ params: getCategoryParamsSchema }),
  controller.delete,
)


```

# modules\catalog\category\category.schema.ts

| Property | Value |
|----------|-------|
| Path | `modules\catalog\category\category.schema.ts` |
| Size | 1,241 bytes |
| Extension | `.ts` |
| Modified | 2026-09-29 13:25:28.485366 |

```typescript
import { z } from 'zod'

export const getAllCategoriesQuerySchema = z.object({
  parentCategoryId: z.coerce.number().int().positive().optional(),
  lang: z.string().optional().default('vi'),
})

export const getCategoryParamsSchema = z.object({
  categoryId: z.coerce.number().int().positive('categoryId phải là số nguyên dương'),
})

export const createCategoryBodySchema = z.object({
  defaultName: z.string().min(1, 'Tên danh mục không được để trống').max(500),
  logo: z.string().max(1000).optional().nullable(),
  parentCategoryId: z.coerce.number().int().positive().optional().nullable(),
})

export const updateCategoryBodySchema = createCategoryBodySchema.partial()

export const upsertCategoryTranslationSchema = z.object({
  name: z.string().min(1, 'Tên bản dịch không được để trống').max(500),
  description: z.string().optional(),
})

export type GetAllCategoriesQueryType = z.infer<typeof getAllCategoriesQuerySchema>
export type CreateCategoryBodyType = z.infer<typeof createCategoryBodySchema>
export type UpdateCategoryBodyType = z.infer<typeof updateCategoryBodySchema>
export type UpsertCategoryTranslationType = z.infer<typeof upsertCategoryTranslationSchema>
```

# modules\catalog\category\category.service.ts

| Property | Value |
|----------|-------|
| Path | `modules\catalog\category\category.service.ts` |
| Size | 2,105 bytes |
| Extension | `.ts` |
| Modified | 2026-10-09 10:38:13.259706 |

```typescript
import { CategoryRepo } from './category.repo'
import {
  CreateCategoryBodyType,
  GetAllCategoriesQueryType,
  UpdateCategoryBodyType,
  UpsertCategoryTranslationType,
} from './category.schema'
import { AppError, isNotFoundPrismaError, isUniqueConstraintPrismaError } from '@/common/errors'

export class CategoryService {
  constructor(private categoryRepo = new CategoryRepo()) {}

  async findAll(query: GetAllCategoriesQueryType) {
    return this.categoryRepo.findAll({
      parentCategoryId: query.parentCategoryId,
      languageId: query.lang,
    })
  }

  async findById(id: number, languageId?: string) {
    const category = await this.categoryRepo.findById({ id, languageId })
    if (!category) {
      throw new AppError('Danh mục không tồn tại hoặc đã bị xóa', 404)
    }
    return category
  }

  async create({ data, createdById }: { data: CreateCategoryBodyType; createdById: number }) {
    try {
      return await this.categoryRepo.create({ createdById, data })
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw new AppError('Danh mục đã tồn tại', 422)
      }
      throw error
    }
  }

  async update({
    id,
    data,
    updatedById,
  }: {
    id: number
    data: UpdateCategoryBodyType
    updatedById: number
  }) {
    try {
      await this.findById(id)
      return await this.categoryRepo.update({ id, updatedById, data })
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw new AppError('Bản ghi không tồn tại để cập nhật', 404)
      }
      throw error
    }
  }

  async delete({ id, deletedById }: { id: number; deletedById: number }) {
    try {
      await this.findById(id)
      await this.categoryRepo.delete({ id, deletedById, isHard: false })
      return { message: 'Xóa danh mục thành công' }
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw new AppError('Bản ghi không tồn tại để xóa', 404)
      }
      throw error
    }
  }

  
}
```

# modules\catalog\product\product.controller.ts

| Property | Value |
|----------|-------|
| Path | `modules\catalog\product\product.controller.ts` |
| Size | 2,285 bytes |
| Extension | `.ts` |
| Modified | 2026-10-09 10:38:13.292027 |

```typescript
import { Request, Response, NextFunction } from 'express'
import { ProductService } from './product.service'

export class ProductController {
  constructor(private productService = new ProductService()) {}

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rawLang = String(req.query.lang || req.headers['accept-language'] || 'vi')
      const lang = rawLang.split(',')[0].split('-')[0].trim()
      const result = await this.productService.list(req.query as any, lang)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId = Number(req.params.productId)
      const rawLang = String(req.query.lang || req.headers['accept-language'] || 'vi')
      const lang = rawLang.split(',')[0].split('-')[0].trim()
      const data = await this.productService.findById(productId, lang)
      return res.status(200).json({ statusCode: 200, data })
    } catch (err) {
      next(err)
    }
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const data = await this.productService.create(userId, req.body)
      return res.status(201).json({ statusCode: 201, message: 'Tạo sản phẩm thành công', data })
    } catch (err) {
      next(err)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const productId = Number(req.params.productId)
      const data = await this.productService.update({
        id: productId,
        updatedById: userId,
        data: req.body,
      })
      return res.status(200).json({ statusCode: 200, message: 'Cập nhật sản phẩm thành công', data })
    } catch (err) {
      next(err)
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const productId = Number(req.params.productId)
      const result = await this.productService.delete(userId, productId)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  
}
```

# modules\catalog\product\product.repo.ts

| Property | Value |
|----------|-------|
| Path | `modules\catalog\product\product.repo.ts` |
| Size | 3,750 bytes |
| Extension | `.ts` |
| Modified | 2026-10-10 00:01:54.941068 |

```typescript
import { prisma } from '@/database/prisma'
import {
  CreateProductBodyType,
  GetProductQueryType,
  UpdateProductBodyType,
  UpsertProductTranslationType,
} from './product.schema'
import { ALL_LANGUAGE_CODE } from '@/common/helpers'


export class ProductRepo {
  async list(query: GetProductQueryType, languageId: string) {
    const skip = (query.page - 1) * query.limit
    const take = query.limit

    const where: any = { deletedAt: null }
    if (query.status) where.status = query.status
    if (query.categoryId) where.categoryId = query.categoryId
    if (query.brandId) where.brandId = query.brandId
    if (query.search) {
      where.defaultName = { contains: query.search, mode: 'insensitive' }
    }

    const [totalItems, data] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        skip,
        take,
        include: {
          category: { select: { id: true, defaultName: true } },
          brand: { select: { id: true, defaultName: true, logoUrl: true } },
          tags: { select: { id: true, name: true } },
          images: { orderBy: { displayOrder: 'asc' } },
          variants: {
            where: { deletedAt: null },
            select: { id: true, sku: true, originalPrice: true, sellingPrice: true, stockQuantity: true },
          },
         
        },
        orderBy: { createdAt: 'desc' },
      }),
    ])

    return {
      data,
      totalItems,
      page: query.page,
      limit: query.limit,
      totalPages: Math.ceil(totalItems / query.limit),
    }
  }

  async findById(productId: number, languageId?: string) {
    return prisma.product.findFirst({
      where: { id: productId, deletedAt: null },
      include: {
        category: true,
        brand: true,
        tags: true,
        images: { orderBy: { displayOrder: 'asc' } },
        variants: { where: { deletedAt: null } },
       
      },
    })
  }

  async create({ createdById, data }: { createdById: number; data: CreateProductBodyType }) {
    const { images, tagIds, translations, ...rest } = data

    return prisma.product.create({
      data: {
        ...rest,
        createdById,
        images: images
          ? {
              create: images.map((url, index) => ({
                imageUrl: url,
                displayOrder: index,
              })),
            }
          : undefined,
        tags: tagIds
          ? {
              connect: tagIds.map((id) => ({ id })),
            }
          : undefined,
      },
      include: {
        images: true,
        tags: true,
      },
    })
  }

  async update({
    id,
    updatedById,
    data,
  }: {
    id: number
    updatedById: number
    data: UpdateProductBodyType
  }) {
    const { images, tagIds, translations, ...rest } = data

    return prisma.product.update({
      where: { id, deletedAt: null },
      data: {
        ...rest,
        updatedById,
        ...(tagIds && {
          tags: {
            set: tagIds.map((tagId) => ({ id: tagId })),
          },
        }),
        ...(images && {
          images: {
            deleteMany: {},
            create: images.map((url, index) => ({
              imageUrl: url,
              displayOrder: index,
            })),
          },
        }),
      },
      include: {
        images: true,
        tags: true,
      },
    })
  }

  async delete({ id, deletedById }: { id: number; deletedById: number }) {
    return prisma.product.update({
      where: { id, deletedAt: null },
      data: {
        deletedAt: new Date(),
        deletedById,
      },
    })
  }

  
}
```

# modules\catalog\product\product.routes.ts

| Property | Value |
|----------|-------|
| Path | `modules\catalog\product\product.routes.ts` |
| Size | 1,293 bytes |
| Extension | `.ts` |
| Modified | 2026-10-09 10:38:13.296499 |

```typescript
import { Router } from 'express'
import { z } from 'zod'
import { ProductController } from './product.controller'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import { requireAuth } from '@/middlewares/guards/auth.guard'
import { requireAdmin } from '@/middlewares/guards/role.guard'
import {
  productParamsSchema,
  getProductQuerySchema,
  createProductBodySchema,
  updateProductBodySchema,
 
} from './product.schema'

export const productRouter = Router()
const controller = new ProductController()

// Public routes
productRouter.get('/', validateRequest({ query: getProductQuerySchema }), controller.list)
productRouter.get('/:productId', validateRequest({ params: productParamsSchema }), controller.findById)

// Protected routes (Admin / Quản trị viên)
productRouter.post(
  '/',
  requireAuth,
  requireAdmin,
  validateRequest({ body: createProductBodySchema }),
  controller.create,
)

productRouter.put(
  '/:productId',
  requireAuth,
  requireAdmin,
  validateRequest({ params: productParamsSchema, body: updateProductBodySchema }),
  controller.update,
)

productRouter.delete(
  '/:productId',
  requireAuth,
  requireAdmin,
  validateRequest({ params: productParamsSchema }),
  controller.delete,
)


```

# modules\catalog\product\product.schema.ts

| Property | Value |
|----------|-------|
| Path | `modules\catalog\product\product.schema.ts` |
| Size | 2,135 bytes |
| Extension | `.ts` |
| Modified | 2026-09-30 08:12:14.952526 |

```typescript
import { z } from 'zod'

export const productParamsSchema = z.object({
  productId: z.coerce.number().int().positive('productId phải là số nguyên dương'),
})

export const getProductQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(10),
  search: z.string().optional(),
  categoryId: z.coerce.number().int().positive().optional(),
  brandId: z.coerce.number().int().positive().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'OUT_OF_STOCK', 'ARCHIVED']).optional(),
  lang: z.string().optional().default('vi'),
})

export const createProductBodySchema = z.object({
  defaultName: z.string().min(1, 'Tên sản phẩm không được để trống').max(255),
  thumbnailUrl: z.string().url('Thumbnail URL không hợp lệ').optional().nullable(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'OUT_OF_STOCK', 'ARCHIVED']).default('DRAFT'),
  categoryId: z.number().int().positive('Danh mục là bắt buộc'),
  brandId: z.number().int().positive().optional().nullable(),
  images: z.array(z.string().url()).optional(),
  tagIds: z.array(z.number().int().positive()).optional(),
  translations: z
    .array(
      z.object({
        languageId: z.string().min(2),
        name: z.string().min(1),
        shortDesc: z.string().optional(),
        detailDesc: z.string().optional(),
      }),
    )
    .optional(),
})

export const updateProductBodySchema = createProductBodySchema.partial()

export const upsertProductTranslationSchema = z.object({
  name: z.string().min(1, 'Tên bản dịch không được để trống').max(255),
  shortDesc: z.string().optional(),
  detailDesc: z.string().optional(),
})

export type ProductParamsType = z.infer<typeof productParamsSchema>
export type GetProductQueryType = z.infer<typeof getProductQuerySchema>
export type CreateProductBodyType = z.infer<typeof createProductBodySchema>
export type UpdateProductBodyType = z.infer<typeof updateProductBodySchema>
export type UpsertProductTranslationType = z.infer<typeof upsertProductTranslationSchema>
```

# modules\catalog\product\product.service.ts

| Property | Value |
|----------|-------|
| Path | `modules\catalog\product\product.service.ts` |
| Size | 1,933 bytes |
| Extension | `.ts` |
| Modified | 2026-10-11 17:23:08.196895 |

```typescript
import { ProductRepo } from './product.repo'
import {
  CreateProductBodyType,
  GetProductQueryType,
  UpdateProductBodyType,
} from './product.schema'
import { AppError, isNotFoundPrismaError, isUniqueConstraintPrismaError } from '@/common/errors'

export class ProductService {
  constructor(private productRepo = new ProductRepo()) {}

  async list(query: GetProductQueryType, languageId: string) {
    return this.productRepo.list(query, languageId)
  }

  async findById(productId: number, languageId?: string) {
    const product = await this.productRepo.findById(productId, languageId)
    if (!product) {
      throw new AppError('Sản phẩm không tồn tại hoặc đã bị xóa', 404)
    }
    return product
  }

  async create(createdById: number, data: CreateProductBodyType) {
    try {
      return await this.productRepo.create({ createdById, data })
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw new AppError('Tên sản phẩm bị trùng lặp', 422)
      }
      throw error
    }
  }

  async update({
    id,
    updatedById,
    data,
  }: {
    id: number
    updatedById: number
    data: UpdateProductBodyType
  }) {
    try {
      await this.findById(id)
      return await this.productRepo.update({ id, updatedById, data })
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw new AppError('Bản ghi không tồn tại để cập nhật', 404)
      }
      throw error
    }
  }

  async delete(deletedById: number, id: number) {
    try {
      await this.findById(id)
      await this.productRepo.delete({ id, deletedById })
      return { message: 'Xóa sản phẩm thành công' }
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw new AppError('Bản ghi không tồn tại để xóa', 404)
      }
      throw error
    }
  }
}
```

# modules\catalog\tag\tag.controller.ts

| Property | Value |
|----------|-------|
| Path | `modules\catalog\tag\tag.controller.ts` |
| Size | 1,890 bytes |
| Extension | `.ts` |
| Modified | 2026-09-30 08:12:14.955790 |

```typescript
import { Request, Response, NextFunction } from 'express'
import { TagService } from './tag.service'

export class TagController {
  constructor(private tagService = new TagService()) {}

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.tagService.list(req.query as any)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tagId = Number(req.params.tagId)
      const data = await this.tagService.findById(tagId)
      return res.status(200).json({ statusCode: 200, data })
    } catch (err) {
      next(err)
    }
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.userId ?? 1
      const data = await this.tagService.create(userId, req.body)
      return res.status(201).json({ statusCode: 201, message: 'Tạo thẻ tag thành công', data })
    } catch (err) {
      next(err)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.userId ?? 1
      const tagId = Number(req.params.tagId)
      const data = await this.tagService.update({ id: tagId, updatedById: userId, data: req.body })
      return res.status(200).json({ statusCode: 200, message: 'Cập nhật thẻ tag thành công', data })
    } catch (err) {
      next(err)
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.userId ?? 1
      const tagId = Number(req.params.tagId)
      const result = await this.tagService.delete(userId, tagId)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }
}
```

# modules\catalog\tag\tag.repo.ts

| Property | Value |
|----------|-------|
| Path | `modules\catalog\tag\tag.repo.ts` |
| Size | 1,666 bytes |
| Extension | `.ts` |
| Modified | 2026-09-30 08:12:14.957050 |

```typescript
import { prisma } from '@/database/prisma'
import { CreateTagBodyType, GetTagQueryType, UpdateTagBodyType } from './tag.schema'

export class TagRepo {
  async list(query: GetTagQueryType) {
    const skip = (query.page - 1) * query.limit
    const take = query.limit

    const where: any = { deletedAt: null }
    if (query.search) {
      where.name = { contains: query.search, mode: 'insensitive' }
    }

    const [totalItems, data] = await Promise.all([
      prisma.tag.count({ where }),
      prisma.tag.findMany({
        where,
        skip,
        take,
        orderBy: { id: 'desc' },
      }),
    ])

    return {
      data,
      totalItems,
      page: query.page,
      limit: query.limit,
      totalPages: Math.ceil(totalItems / query.limit),
    }
  }

  async findById(id: number) {
    return prisma.tag.findFirst({
      where: { id, deletedAt: null },
    })
  }

  async create({ createdById, data }: { createdById: number; data: CreateTagBodyType }) {
    return prisma.tag.create({
      data: {
        ...data,
        createdById,
      },
    })
  }

  async update({
    id,
    updatedById,
    data,
  }: {
    id: number
    updatedById: number
    data: UpdateTagBodyType
  }) {
    return prisma.tag.update({
      where: { id, deletedAt: null },
      data: {
        ...data,
        updatedById,
      },
    })
  }

  async delete({ id, deletedById }: { id: number; deletedById: number }) {
    return prisma.tag.update({
      where: { id, deletedAt: null },
      data: {
        deletedAt: new Date(),
        deletedById,
      },
    })
  }
}
```

# modules\catalog\tag\tag.routes.ts

| Property | Value |
|----------|-------|
| Path | `modules\catalog\tag\tag.routes.ts` |
| Size | 1,153 bytes |
| Extension | `.ts` |
| Modified | 2026-10-01 17:02:22.977303 |

```typescript
import { Router } from 'express'
import { TagController } from './tag.controller'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import { authGuard } from '@/middlewares/guards/auth.guard'
import { requireAdmin } from '@/middlewares/guards/role.guard'
import {
  tagParamsSchema,
  getTagQuerySchema,
  createTagBodySchema,
  updateTagBodySchema,
} from './tag.schema'

export const tagRouter = Router()
const controller = new TagController()

tagRouter.get('/', validateRequest({ query: getTagQuerySchema }), controller.list)
tagRouter.get('/:tagId', validateRequest({ params: tagParamsSchema }), controller.findById)

// Áp dụng auth & role guard cho các tác vụ thay đổi
tagRouter.post(
  '/',
  authGuard,
  requireAdmin,
  validateRequest({ body: createTagBodySchema }),
  controller.create,
)
tagRouter.put(
  '/:tagId',
  authGuard,
  requireAdmin,
  validateRequest({ params: tagParamsSchema, body: updateTagBodySchema }),
  controller.update,
)
tagRouter.delete(
  '/:tagId',
  authGuard,
  requireAdmin,
  validateRequest({ params: tagParamsSchema }),
  controller.delete,
)
```

# modules\catalog\tag\tag.schema.ts

| Property | Value |
|----------|-------|
| Path | `modules\catalog\tag\tag.schema.ts` |
| Size | 812 bytes |
| Extension | `.ts` |
| Modified | 2026-09-30 08:12:14.961620 |

```typescript
import { z } from 'zod'

export const tagParamsSchema = z.object({
  tagId: z.coerce.number().int().positive('tagId phải là số nguyên dương'),
})

export const getTagQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(20),
  search: z.string().optional(),
})

export const createTagBodySchema = z.object({
  name: z.string().min(1, 'Tên tag không được để trống').max(100),
})

export const updateTagBodySchema = createTagBodySchema

export type TagParamsType = z.infer<typeof tagParamsSchema>
export type GetTagQueryType = z.infer<typeof getTagQuerySchema>
export type CreateTagBodyType = z.infer<typeof createTagBodySchema>
export type UpdateTagBodyType = z.infer<typeof updateTagBodySchema>
```

# modules\catalog\tag\tag.service.ts

| Property | Value |
|----------|-------|
| Path | `modules\catalog\tag\tag.service.ts` |
| Size | 1,848 bytes |
| Extension | `.ts` |
| Modified | 2026-09-30 08:12:14.963760 |

```typescript
import { TagRepo } from './tag.repo'
import { CreateTagBodyType, GetTagQueryType, UpdateTagBodyType } from './tag.schema'
import { AppError, isNotFoundPrismaError, isUniqueConstraintPrismaError } from '@/common/errors'


export class TagService {
  constructor(private tagRepo = new TagRepo()) {}

  async list(query: GetTagQueryType) {
    return this.tagRepo.list(query)
  }

  async findById(id: number) {
    const tag = await this.tagRepo.findById(id)
    if (!tag) {
      throw new AppError('Thẻ Tag không tồn tại hoặc đã bị xóa', 404)
    }
    return tag
  }

  async create(createdById: number, data: CreateTagBodyType) {
    try {
      return await this.tagRepo.create({ createdById, data })
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw new AppError('Tên thẻ Tag đã tồn tại', 422)
      }
      throw error
    }
  }

  async update({ id, updatedById, data }: { id: number; updatedById: number; data: UpdateTagBodyType }) {
    try {
      await this.findById(id)
      return await this.tagRepo.update({ id, updatedById, data })
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw new AppError('Tên thẻ Tag đã tồn tại', 422)
      }
      if (isNotFoundPrismaError(error)) {
        throw new AppError('Bản ghi không tồn tại để cập nhật', 404)
      }
      throw error
    }
  }

  async delete(deletedById: number, id: number) {
    try {
      await this.findById(id)
      await this.tagRepo.delete({ id, deletedById })
      return { message: 'Xóa thẻ Tag thành công' }
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw new AppError('Bản ghi không tồn tại để xóa', 404)
      }
      throw error
    }
  }
}
```

# modules\catalog\variant-attribute\variant-attribute.controller.ts

| Property | Value |
|----------|-------|
| Path | `modules\catalog\variant-attribute\variant-attribute.controller.ts` |
| Size | 1,946 bytes |
| Extension | `.ts` |
| Modified | 2026-10-01 17:02:22.978303 |

```typescript
import { Request, Response, NextFunction } from 'express'
import { VariantAttributeService } from './variant-attribute.service'

export class VariantAttributeController {
  constructor(private variantService = new VariantAttributeService()) {}

  getByProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId = Number(req.params.productId)
      const data = await this.variantService.getVariantsByProductId(productId)
      return res.status(200).json({
        statusCode: 200,
        message: 'Lấy danh sách biến thể sản phẩm thành công',
        data,
      })
    } catch (err) {
      next(err)
    }
  }

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const variantId = Number(req.params.variantId)
      const data = await this.variantService.getVariantById(variantId)
      return res.status(200).json({ statusCode: 200, data })
    } catch (err) {
      next(err)
    }
  }

  syncVariants = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const data = await this.variantService.syncProductVariants(req.body, userId)
      return res.status(200).json({
        statusCode: 200,
        message: 'Đồng bộ biến thể và ma trận thuộc tính thành công',
        data,
      })
    } catch (err) {
      next(err)
    }
  }

  updateStock = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const variantId = Number(req.params.variantId)
      const { quantityChange } = req.body
      const data = await this.variantService.updateStock(variantId, Number(quantityChange))
      return res.status(200).json({
        statusCode: 200,
        message: 'Cập nhật số lượng tồn kho thành công',
        data,
      })
    } catch (err) {
      next(err)
    }
  }
}
```

# modules\catalog\variant-attribute\variant-attribute.repo.ts

| Property | Value |
|----------|-------|
| Path | `modules\catalog\variant-attribute\variant-attribute.repo.ts` |
| Size | 4,160 bytes |
| Extension | `.ts` |
| Modified | 2026-10-09 10:38:13.298885 |

```typescript
import { prisma } from '@/database/prisma'
import { SyncProductVariantsBodyType } from './variant-attribute.schema'
import { Decimal } from '@prisma/client/runtime/library'
import { Prisma } from '@prisma/client'
import { AppError } from '@/common/errors'

export class VariantAttributeRepo {
  async getByProductId(productId: number) {
    return prisma.productVariant.findMany({
      where: { productId, deletedAt: null },
      orderBy: { id: 'asc' },
    })
  }

  async findById(variantId: number) {
    return prisma.productVariant.findFirst({
      where: { id: variantId, deletedAt: null },
      include: { product: true },
    })
  }

  async syncVariants(data: SyncProductVariantsBodyType, updatedById: number) {
    const { productId, variants } = data

    return prisma.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT id FROM "Product" WHERE id = ${productId} FOR UPDATE`

      const existingVariants = await tx.productVariant.findMany({
        where: { productId, deletedAt: null },
      })

      const existingVariantIds = existingVariants.map((v) => v.id)
      if (existingVariantIds.length > 0) {
        await tx.$queryRaw`SELECT id FROM "ProductVariant" WHERE id IN (${Prisma.join(existingVariantIds)}) FOR UPDATE`
      }

      const payloadSkus = new Set(variants.map((v) => v.sku))
      const variantsToSoftDelete = existingVariants.filter((ev) => !payloadSkus.has(ev.sku))
      const idsToDelete = variantsToSoftDelete.map((v) => v.id)

      if (idsToDelete.length > 0) {
        await tx.productVariant.updateMany({
          where: { id: { in: idsToDelete } },
          data: { deletedAt: new Date() },
        })
      }

      const finalVariants = await Promise.all(
        variants.map(async (item) => {
          const matchedExisting = existingVariants.find((ev) => ev.sku === item.sku)

          if (matchedExisting) {
            return tx.productVariant.update({
              where: { id: matchedExisting.id },
              data: {
                originalPrice: new Decimal(item.originalPrice),
                sellingPrice: new Decimal(item.sellingPrice),
                stockQuantity: item.stockQuantity,
                weightGram: item.weightGram,
                imageUrl: item.imageUrl,
                variant: item.variant,
                variantValue: item.variantValue,
              },
            })
          } else {
            return tx.productVariant.create({
              data: {
                productId,
                sku: item.sku,
                originalPrice: new Decimal(item.originalPrice),
                sellingPrice: new Decimal(item.sellingPrice),
                stockQuantity: item.stockQuantity,
                weightGram: item.weightGram,
                imageUrl: item.imageUrl,
                variant: item.variant,
                variantValue: item.variantValue,
              },
            })
          }
        })
      );

      return finalVariants
    })
  }

  async updateStockWithOptimistic(variantId: number, quantityChange: number) {
    return prisma.$transaction(async (tx) => {
      const current = await tx.productVariant.findUnique({
        where: { id: variantId, deletedAt: null },
      })

      if (!current) throw new AppError('Biến thể không tồn tại', 404)
      if (quantityChange < 0 && current.stockQuantity < Math.abs(quantityChange)) {
        throw new AppError('Số lượng tồn kho không đủ để khấu trừ', 400)
      }

      try {
        return await tx.productVariant.update({
          where: {
            id: variantId,
            updatedAt: current.updatedAt,
            ...(quantityChange < 0 && { stockQuantity: { gte: Math.abs(quantityChange) } }),
          },
          data: { stockQuantity: { increment: quantityChange } },
        })
      } catch (err: any) {
        if (err.code === 'P2025') {
          throw new AppError('Xung đột phiên bản dữ liệu (Version Conflict). Vui lòng thử lại!', 409)
        }
        throw err
      }
    })
  }
}
```

# modules\catalog\variant-attribute\variant-attribute.routes.ts

| Property | Value |
|----------|-------|
| Path | `modules\catalog\variant-attribute\variant-attribute.routes.ts` |
| Size | 1,275 bytes |
| Extension | `.ts` |
| Modified | 2026-10-01 17:02:22.980303 |

```typescript
import { Router } from 'express'
import { z } from 'zod'
import { VariantAttributeController } from './variant-attribute.controller'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import { requireAuth } from '@/middlewares/guards/auth.guard'
import { requireAdmin } from '@/middlewares/guards/role.guard'
import {
  syncProductVariantsBodySchema,
  variantIdParamSchema,
  getVariantsByProductParamSchema,
} from './variant-attribute.schema'

export const variantAttributeRouter = Router()
const controller = new VariantAttributeController()

variantAttributeRouter.get(
  '/products/:productId',
  validateRequest({ params: getVariantsByProductParamSchema }),
  controller.getByProduct,
)

variantAttributeRouter.get(
  '/:variantId',
  validateRequest({ params: variantIdParamSchema }),
  controller.getOne,
)

variantAttributeRouter.post(
  '/sync',
  requireAuth,
  requireAdmin,
  validateRequest({ body: syncProductVariantsBodySchema }),
  controller.syncVariants,
)

variantAttributeRouter.patch(
  '/:variantId/stock',
  requireAuth,
  requireAdmin,
  validateRequest({
    params: variantIdParamSchema,
    body: z.object({ quantityChange: z.coerce.number().int() }),
  }),
  controller.updateStock,
)
```

# modules\catalog\variant-attribute\variant-attribute.schema.ts

| Property | Value |
|----------|-------|
| Path | `modules\catalog\variant-attribute\variant-attribute.schema.ts` |
| Size | 1,752 bytes |
| Extension | `.ts` |
| Modified | 2026-10-09 10:38:13.301377 |

```typescript
import { z } from 'zod'

export const upsertVariantItemSchema = z.object({
  id: z.number().int().positive().optional().nullable(),
  sku: z.string().min(1, 'Mã SKU không được để trống'),
  originalPrice: z.coerce.number().positive('Giá gốc phải lớn hơn 0'),
  sellingPrice: z.coerce.number().positive('Giá bán phải lớn hơn 0'),
  stockQuantity: z.coerce.number().int().nonnegative('Số lượng tồn kho không được âm').default(0),
  weightGram: z.coerce.number().int().nonnegative().default(0),
  imageUrl: z.string().url().optional().nullable(),
  variant: z.string().max(100).optional().nullable(),
  variantValue: z.string().max(150).optional().nullable(),
})

export const syncProductVariantsBodySchema = z
  .object({
    productId: z.coerce.number().int().positive('productId phải là số nguyên dương'),
    variants: z.array(upsertVariantItemSchema).min(1, 'Danh sách biến thể không được để trống'),
  })
  .superRefine(({ variants }, ctx) => {
    variants.forEach((v, index) => {
      if (v.sellingPrice > v.originalPrice) {
        ctx.addIssue({
          code: 'custom',
          path: ['variants', index, 'sellingPrice'],
          message: `Giá bán (${v.sellingPrice}) không được lớn hơn giá gốc (${v.originalPrice})`,
        })
      }
    })
  })

export const variantIdParamSchema = z.object({
  variantId: z.coerce.number().int().positive(),
})

export const getVariantsByProductParamSchema = z.object({
  productId: z.coerce.number().int().positive(),
})

export type SyncProductVariantsBodyType = z.infer<typeof syncProductVariantsBodySchema>
export type UpsertVariantItemType = z.infer<typeof upsertVariantItemSchema>
```

# modules\catalog\variant-attribute\variant-attribute.service.ts

| Property | Value |
|----------|-------|
| Path | `modules\catalog\variant-attribute\variant-attribute.service.ts` |
| Size | 1,952 bytes |
| Extension | `.ts` |
| Modified | 2026-09-30 08:12:14.966882 |

```typescript
import { VariantAttributeRepo } from './variant-attribute.repo'
import { SyncProductVariantsBodyType } from './variant-attribute.schema'
import { AppError, isUniqueConstraintPrismaError } from '@/common/errors'
import { prisma } from '@/database/prisma'

export class VariantAttributeService {
  constructor(private variantRepo = new VariantAttributeRepo()) {}

  async getVariantsByProductId(productId: number) {
    const product = await prisma.product.findFirst({
      where: { id: productId, deletedAt: null },
    })
    if (!product) {
      throw new AppError('Sản phẩm không tồn tại hoặc đã bị xóa', 404)
    }
    return this.variantRepo.getByProductId(productId)
  }

  async getVariantById(variantId: number) {
    const variant = await this.variantRepo.findById(variantId)
    if (!variant) {
      throw new AppError('Biến thể không tồn tại hoặc đã bị vô hiệu hóa', 404)
    }
    return variant
  }

  async syncProductVariants(data: SyncProductVariantsBodyType, userId: number) {
    try {
      const product = await prisma.product.findFirst({
        where: { id: data.productId, deletedAt: null },
      })
      if (!product) {
        throw new AppError('Không tìm thấy sản phẩm tương ứng để đồng bộ biến thể', 404)
      }

      return await this.variantRepo.syncVariants(data, userId)
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw new AppError('Mã SKU bị trùng lặp trong hệ thống', 422)
      }
      throw error
    }
  }

  async updateStock(variantId: number, delta: number) {
    const variant = await this.getVariantById(variantId)
    if (variant.stockQuantity + delta < 0) {
      throw new AppError('Số lượng tồn kho không đủ để thực hiện khấu trừ', 400)
    }
    return this.variantRepo.updateStockWithOptimistic(variantId, delta)
  }
}
```

# modules\fulfillment\fulfillment.routes.ts

| Property | Value |
|----------|-------|
| Path | `modules\fulfillment\fulfillment.routes.ts` |
| Size | 408 bytes |
| Extension | `.ts` |
| Modified | 2026-09-29 13:25:28.518625 |

```typescript
import { Router } from 'express'
import { shipmentRouter } from './shipment/shipment.routes'
import { paymentRouter } from './payment/payment.routes'
import { returnRouter } from './return/return.routes'

export const fulfillmentRouter = Router()

fulfillmentRouter.use('/shipments', shipmentRouter)
fulfillmentRouter.use('/payments', paymentRouter)
fulfillmentRouter.use('/returns', returnRouter)

```

# modules\fulfillment\payment\payment.controller.ts

| Property | Value |
|----------|-------|
| Path | `modules\fulfillment\payment\payment.controller.ts` |
| Size | 2,671 bytes |
| Extension | `.ts` |
| Modified | 2026-10-09 10:38:13.303586 |

```typescript
import { Request, Response, NextFunction } from "express";
import { PaymentService } from "./payment.service";
import { UnauthorizedError } from "@/common/errors";

export class PaymentController {
  constructor(private paymentService = new PaymentService()) {}

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.paymentService.findAll(req.query as any);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const paymentId = Number(req.params.paymentId);
      const data = await this.paymentService.findById(paymentId);
      return res.status(200).json({ statusCode: 200, data });
    } catch (err) {
      next(err);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number((req as any).user?.userId);
      if (!userId) throw new UnauthorizedError();
      const orderId = req.body.orderId as number;
      return res
        .status(201)
        .json({
          statusCode: 201,
          data: await this.paymentService.create(orderId, userId),
        });
    } catch (err) {
      next(err);
    }
  };

  sepay = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rawBody = req.body as Buffer;

      const signature = req.headers["x-sepay-signature"];
      const timestamp = req.headers["x-sepay-timestamp"];

      if (typeof signature !== "string") {
        return res.status(401).json({
          success: false,
          message: "Missing SePay signature",
        });
      }

      if (typeof timestamp !== "string") {
        return res.status(401).json({
          success: false,
          message: "Missing SePay timestamp",
        });
      }

      const valid = this.paymentService.verifySePaySignature(
        rawBody,
        signature,
        timestamp,
      );

      if (!valid) {
        return res.status(401).json({
          success: false,
          message: "Invalid SePay signature",
        });
      }
      
      let payload;
      try {
        payload = JSON.parse(rawBody.toString("utf8"));
      } catch (parseError) {
        return res.status(400).json({
          success: false,
          message: "Payload is not a valid JSON",
        });
      }

      await this.paymentService.handleSePayWebhook(payload);

      return res.status(200).json({
        success: true,
      });
    } catch (err) {
      next(err);
    }
  };
}

```

# modules\fulfillment\payment\payment.repo.ts

| Property | Value |
|----------|-------|
| Path | `modules\fulfillment\payment\payment.repo.ts` |
| Size | 2,540 bytes |
| Extension | `.ts` |
| Modified | 2026-10-09 10:38:13.305592 |

```typescript
import { prisma } from '@/database/prisma'
import { GetAllPaymentsQueryType } from './payment.schema'

const paymentInclude = {
  order: {
    select: {
      id: true,
      orderCode: true,
      paymentMethod: true,
      paymentStatus: true,
      totalAmount: true,
    },
  },
} as const

export class PaymentRepo {
  async create(
    data: {
    orderId: number
    amount: number
  }) {
    return prisma.paymentTransaction.create({
      data: {
        orderId: data.orderId,
        amount: data.amount,
        provider: 'SEPAY',
        status: 'PENDING',
        
      },
    })
  }
    
  async findAll(query: GetAllPaymentsQueryType) {
    const where = {
      ...(query.status ? { status: query.status } : {}),
      ...(query.orderId ? { orderId: query.orderId } : {}),
    }

    const payments = await prisma.paymentTransaction.findMany({
      where,
      include: paymentInclude,
      orderBy: { createdAt: 'desc' },
    })

    return {
      data: payments,
      totalItems: payments.length,
    }
  }

  async findById(id: number) {
    return prisma.paymentTransaction.findUnique({
      where: { id },
      include: paymentInclude,
    })
  }

  async findByPaymentCode(paymentCode: string) {
    // Trích xuất số orderId từ nội dung chuyển khoản (VD: "DH15" -> 15)
    // SePay có thể nhét thêm nội dung rác, nên ta dùng regex lấy số sau chữ DH
    const match = paymentCode.toUpperCase().match(/DH(\d+)/);
    if (!match) return null;

    const orderId = parseInt(match[1], 10);
    if (isNaN(orderId)) return null;

    // Tìm giao dịch thanh toán PENDING đang gắn với Order này
    return prisma.paymentTransaction.findFirst({
      where: {
        orderId: orderId,
        status: 'PENDING',
        provider: 'SEPAY'
      },
      include: paymentInclude,
      orderBy: { createdAt: 'desc' }
    });
  }


  async markSuccess(paymentId: number, providerTransId: string) {
    return prisma.$transaction(async (tx) => {
      const payment = await tx.paymentTransaction.update({
        where: {
          id: paymentId,
        },
        data: {
          status: 'SUCCESS',
          providerTransId,
        },
      })

      await tx.order.update({
        where: {
          id: payment.orderId,
        },
        data: {
          paymentStatus: 'SUCCESS',
          status: 'CONFIRMED',
        },
      })

      return payment
    })
  }
}

```

# modules\fulfillment\payment\payment.routes.ts

| Property | Value |
|----------|-------|
| Path | `modules\fulfillment\payment\payment.routes.ts` |
| Size | 1,121 bytes |
| Extension | `.ts` |
| Modified | 2026-10-09 10:38:13.307590 |

```typescript
import { Router } from 'express'
import { PaymentController } from './payment.controller'
import { authGuard } from '@/middlewares/guards/auth.guard'
import { roleGuard } from '@/middlewares/guards/role.guard'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import { getAllPaymentsQuerySchema, paymentIdParamsSchema, createPaymentSchema } from './payment.schema'
import express from 'express'

export const paymentRouter = Router()
const controller = new PaymentController()


export const sepayWebhookRouter = Router()
sepayWebhookRouter.post(
  '/sepay',
  express.raw({ type: 'application/json' }),
  controller.sepay,
)

// Toàn bộ API thanh toán bắt buộc đăng nhập và yêu cầu quyền ADMIN
paymentRouter.use(authGuard)

paymentRouter.post('/', validateRequest({ body: createPaymentSchema }), controller.create)
paymentRouter.get('/', roleGuard('ADMIN'), validateRequest({ query: getAllPaymentsQuerySchema }), controller.findAll)
paymentRouter.get('/:paymentId', roleGuard('ADMIN'), validateRequest({ params: paymentIdParamsSchema }), controller.findById)

```

# modules\fulfillment\payment\payment.schema.ts

| Property | Value |
|----------|-------|
| Path | `modules\fulfillment\payment\payment.schema.ts` |
| Size | 969 bytes |
| Extension | `.ts` |
| Modified | 2026-10-06 21:26:07.990865 |

```typescript
import { PaymentStatus } from '@prisma/client'
import { z } from 'zod'

export const getAllPaymentsQuerySchema = z.object({
  status: z.nativeEnum(PaymentStatus).optional(),
  orderId: z.coerce.number().int().positive().optional(),
})

export const paymentIdParamsSchema = z.object({
  paymentId: z.coerce.number().int().positive('paymentId phải là số nguyên dương'),
})

export const createPaymentSchema = z.object({ orderId: z.number().int().positive() }).strict()
export type CreatePaymentInput = z.infer<typeof createPaymentSchema>

export type GetAllPaymentsQueryType = z.infer<typeof getAllPaymentsQuerySchema>

export interface SePayWebhookPayload {
  id: number
  gateway: string
  transactionDate: string
  accountNumber: string
  subAccount: string | null
  code: string | null
  content: string
  transferType: 'in' | 'out'
  description: string
  transferAmount: number
  accumulated: number
  referenceCode: string
}

```

# modules\fulfillment\payment\payment.service.ts

| Property | Value |
|----------|-------|
| Path | `modules\fulfillment\payment\payment.service.ts` |
| Size | 4,234 bytes |
| Extension | `.ts` |
| Modified | 2026-10-11 17:23:08.200466 |

```typescript
import { PaymentRepo } from './payment.repo'
import { GetAllPaymentsQueryType } from './payment.schema'
import { AppError } from '@/common/errors'
import { OrderService } from '@/modules/cart-order/order/order.service'
import { randomBytes } from 'node:crypto'
import crypto from 'node:crypto'
import { SePayWebhookPayload } from './payment.schema'

export class PaymentService {
  constructor(private paymentRepo = new PaymentRepo(), private orderService = new OrderService()) {}

  verifySePaySignature(
    rawBody: Buffer,
    signature: string,
    timestamp: string,
  ) {
    const secret = process.env.SEPAY_WEBHOOK_SECRET

    if (!secret) {
      throw new Error('SEPAY_WEBHOOK_SECRET chưa được cấu hình')
    }

    const timestampNumber = Number(timestamp)

    if (!Number.isFinite(timestampNumber)) {
      return false
    }

    // Reject replayed requests older than 5 minutes
    if (Math.abs(Date.now() / 1000 - timestampNumber) > 300) {
      return false
    }

    const payload = `${timestamp}.${rawBody.toString('utf8')}`

    const expected =
      'sha256=' +
      crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('hex')

    const expectedBuffer = Buffer.from(expected)
    const actualBuffer = Buffer.from(signature)

    if (expectedBuffer.length !== actualBuffer.length) {
      return false
    }

    return crypto.timingSafeEqual(
      expectedBuffer,
      actualBuffer,
    )
  }
  async handleSePayWebhook(payload: SePayWebhookPayload) {
    console.log("PAYMENT LOG PAYLOAD:", payload)
    if (payload.transferType !== 'in') {
      throw new AppError('Không phải giao dịch tiền vào', 400)
    }

    // vai shit
    const paymentCode = payload.code?.trim() || payload.content?.trim()

    if (!paymentCode) {
      throw new AppError('Không tìm thấy payment code', 400)
    }

    const payment = await this.paymentRepo.findByPaymentCode(paymentCode)

    if (!payment) {
      throw new AppError('Payment không tồn tại', 404)
    }

    if (payment.status === 'SUCCESS') {
      return payment
    }

    if (Number(payment.amount) !== Number(payload.transferAmount)) {
      throw new AppError('Số tiền thanh toán không khớp', 400)
    }

    const expectedAccount = process.env.SEPAY_ACCOUNT_NUMBER

    if (
      expectedAccount &&
      payload.accountNumber !== expectedAccount &&
      payload.subAccount !== expectedAccount
    ) {
      throw new AppError('Tài khoản nhận tiền không hợp lệ', 400)
    }

    return this.paymentRepo.markSuccess(
      payment.id,
      String(payload.id),
    )
  }
  

  async create(orderId: number, userId: number) {
    const order = await this.orderService.findById(userId, orderId)
    if (order.status !== 'PENDING_PAYMENT') throw new AppError('Đơn hàng không còn chờ thanh toán', 409)
   
    const amount = Number(order.totalAmount)
    const payment = await this.paymentRepo.create({ orderId, amount })
    
    // Nội dung chuyển khoản chuẩn theo ID đơn hàng
    const transferContent = `DH${order.id}`

    const qrBaseUrl = process.env.SEPAY_QR_BASE_URL ?? 'https://qr.sepay.vn/img'
    const accountNumber = process.env.SEPAY_ACCOUNT_NUMBER
    const bankCode = process.env.SEPAY_BANK_CODE
    if (!accountNumber || !bankCode) throw new AppError('SePay chưa được cấu hình', 500)
    
    const qrUrl = new URL(qrBaseUrl)
    qrUrl.searchParams.set('acc', accountNumber)
    qrUrl.searchParams.set('bank', bankCode)
    qrUrl.searchParams.set('amount', String(amount))
    qrUrl.searchParams.set('des', transferContent)
    
    // Sửa lại return: không trả về paymentCode
    return { paymentId: String(payment.id), amount, transferContent, qrUrl: qrUrl.toString() }
  }

  async findAll(query: GetAllPaymentsQueryType) {
    return this.paymentRepo.findAll(query)
  }

  async findById(id: number) {
    const payment = await this.paymentRepo.findById(id)
    if (!payment) {
      throw new AppError('Giao dịch thanh toán không tồn tại', 404)
    }
    return payment
  }
}

```

# modules\fulfillment\return\return.controller.ts

| Property | Value |
|----------|-------|
| Path | `modules\fulfillment\return\return.controller.ts` |
| Size | 1,767 bytes |
| Extension | `.ts` |
| Modified | 2026-09-30 08:12:14.981303 |

```typescript
import { Request, Response, NextFunction } from 'express'
import { ReturnService } from './return.service'

export class ReturnController {
  constructor(private returnService = new ReturnService()) {}

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.returnService.findAll(req.query as any)
      return res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const returnId = Number(req.params.returnId)
      const data = await this.returnService.findById(returnId)
      return res.status(200).json({ statusCode: 200, data })
    } catch (err) {
      next(err)
    }
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.returnService.create(req.body)
      return res.status(201).json({ statusCode: 201, message: 'Tạo yêu cầu trả hàng thành công', data })
    } catch (err) {
      next(err)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const returnId = Number(req.params.returnId)
      const data = await this.returnService.update(returnId, req.body)
      return res.status(200).json({ statusCode: 200, message: 'Cập nhật yêu cầu trả hàng thành công', data })
    } catch (err) {
      next(err)
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const returnId = Number(req.params.returnId)
      const result = await this.returnService.delete(returnId)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }
}

```

# modules\fulfillment\return\return.repo.ts

| Property | Value |
|----------|-------|
| Path | `modules\fulfillment\return\return.repo.ts` |
| Size | 2,016 bytes |
| Extension | `.ts` |
| Modified | 2026-09-30 08:12:14.982621 |

```typescript
import { prisma } from '@/database/prisma'
import {
  CreateReturnBodyType,
  GetAllReturnsQueryType,
  UpdateReturnBodyType,
} from './return.schema'

const returnInclude = {
  medias: true,
  orderItem: {
    select: {
      id: true,
      orderId: true,
      productName: true,
      skuCode: true,
      variantValue: true,
      quantity: true,
    },
  },
} as const

export class ReturnRepo {
  async findAll(query: GetAllReturnsQueryType) {
    const where = {
      ...(query.status ? { status: query.status } : {}),
      ...(query.orderItemId ? { orderItemId: query.orderItemId } : {}),
    }

    const returns = await prisma.returnRequest.findMany({
      where,
      include: returnInclude,
      orderBy: { createdAt: 'desc' },
    })

    return {
      data: returns,
      totalItems: returns.length,
    }
  }

  async findById(id: number) {
    return prisma.returnRequest.findUnique({
      where: { id },
      include: returnInclude,
    })
  }

  async create(data: CreateReturnBodyType) {
    const { medias, ...rest } = data
    return prisma.returnRequest.create({
      data: {
        ...rest,
        description: rest.description ?? undefined,
        medias: medias?.length
          ? {
              create: medias,
            }
          : undefined,
      },
      include: returnInclude,
    })
  }

  async update(id: number, data: UpdateReturnBodyType) {
    return prisma.returnRequest.update({
      where: { id },
      data: {
        ...(data.quantity !== undefined ? { quantity: data.quantity } : {}),
        ...(data.reason !== undefined ? { reason: data.reason } : {}),
        ...(data.description !== undefined ? { description: data.description } : {}),
        ...(data.status !== undefined ? { status: data.status } : {}),
      },
      include: returnInclude,
    })
  }

  async delete(id: number) {
    return prisma.returnRequest.delete({
      where: { id },
    })
  }
}

```

# modules\fulfillment\return\return.routes.ts

| Property | Value |
|----------|-------|
| Path | `modules\fulfillment\return\return.routes.ts` |
| Size | 1,131 bytes |
| Extension | `.ts` |
| Modified | 2026-10-01 17:02:22.983302 |

```typescript
import { Router } from 'express'
import { ReturnController } from './return.controller'
import { authGuard } from '@/middlewares/guards/auth.guard'
import { roleGuard } from '@/middlewares/guards/role.guard'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import {
  createReturnBodySchema,
  getAllReturnsQuerySchema,
  returnIdParamsSchema,
  updateReturnBodySchema,
} from './return.schema'

export const returnRouter = Router()
const controller = new ReturnController()

returnRouter.use(authGuard)

returnRouter.get('/', roleGuard('ADMIN'), validateRequest({ query: getAllReturnsQuerySchema }), controller.findAll)
returnRouter.get('/:returnId', validateRequest({ params: returnIdParamsSchema }), controller.findById)
returnRouter.post('/', validateRequest({ body: createReturnBodySchema }), controller.create)
returnRouter.put('/:returnId', roleGuard('ADMIN'), validateRequest({ params: returnIdParamsSchema, body: updateReturnBodySchema }), controller.update)
returnRouter.delete('/:returnId', roleGuard('ADMIN'), validateRequest({ params: returnIdParamsSchema }), controller.delete)
```

# modules\fulfillment\return\return.schema.ts

| Property | Value |
|----------|-------|
| Path | `modules\fulfillment\return\return.schema.ts` |
| Size | 1,381 bytes |
| Extension | `.ts` |
| Modified | 2026-09-30 08:12:14.985772 |

```typescript
import { ReturnStatus } from '@prisma/client'
import { z } from 'zod'

export const returnMediaSchema = z.object({
  mediaUrl: z.string().min(1).max(1000),
  mediaType: z.string().min(1).max(50),
})

export const getAllReturnsQuerySchema = z.object({
  status: z.nativeEnum(ReturnStatus).optional(),
  orderItemId: z.coerce.number().int().positive().optional(),
})

export const returnIdParamsSchema = z.object({
  returnId: z.coerce.number().int().positive('returnId phải là số nguyên dương'),
})

export const createReturnBodySchema = z.object({
  orderItemId: z.coerce.number().int().positive(),
  quantity: z.coerce.number().int().positive(),
  reason: z.string().min(1).max(255),
  description: z.string().optional().nullable(),
  medias: z.array(returnMediaSchema).optional(),
})

export const updateReturnBodySchema = z.object({
  quantity: z.coerce.number().int().positive().optional(),
  reason: z.string().min(1).max(255).optional(),
  description: z.string().optional().nullable(),
  status: z.nativeEnum(ReturnStatus).optional(),
})

export type GetAllReturnsQueryType = z.infer<typeof getAllReturnsQuerySchema>
export type CreateReturnBodyType = z.infer<typeof createReturnBodySchema>
export type UpdateReturnBodyType = z.infer<typeof updateReturnBodySchema>
export type ReturnMediaInput = z.infer<typeof returnMediaSchema>

```

# modules\fulfillment\return\return.service.ts

| Property | Value |
|----------|-------|
| Path | `modules\fulfillment\return\return.service.ts` |
| Size | 2,290 bytes |
| Extension | `.ts` |
| Modified | 2026-09-30 08:12:14.988071 |

```typescript
import { ReturnRepo } from './return.repo'
import {
  CreateReturnBodyType,
  GetAllReturnsQueryType,
  UpdateReturnBodyType,
} from './return.schema'
import { AppError, isNotFoundPrismaError } from '@/common/errors'
import { prisma } from '@/database/prisma'

export class ReturnService {
  constructor(private returnRepo = new ReturnRepo()) {}

  async findAll(query: GetAllReturnsQueryType) {
    return this.returnRepo.findAll(query)
  }

  async findById(id: number) {
    const returnRequest = await this.returnRepo.findById(id)
    if (!returnRequest) {
      throw new AppError('Yêu cầu trả hàng không tồn tại', 404)
    }
    return returnRequest
  }

  async create(data: CreateReturnBodyType) {
    const orderItem = await prisma.orderItem.findUnique({
      where: { id: data.orderItemId },
    })
    if (!orderItem) {
      throw new AppError('Dòng đơn hàng không tồn tại', 404)
    }
    if (data.quantity > orderItem.quantity) {
      throw new AppError('Số lượng trả không được vượt quá số lượng đã mua', 422)
    }
    return this.returnRepo.create(data)
  }

  async update(id: number, data: UpdateReturnBodyType) {
    try {
      const existing = await this.findById(id)
      if (data.quantity !== undefined && data.quantity > existing.orderItem.quantity) {
        throw new AppError('Số lượng trả không được vượt quá số lượng đã mua', 422)
      }
      return await this.returnRepo.update(id, data)
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw new AppError('Yêu cầu trả hàng không tồn tại để cập nhật', 404)
      }
      throw error
    }
  }

  async delete(id: number) {
    try {
      const existing = await this.findById(id)
      if (existing.status !== 'PENDING') {
        throw new AppError('Chỉ có thể xóa yêu cầu trả hàng đang chờ xử lý', 422)
      }
      await this.returnRepo.delete(id)
      return { message: 'Xóa yêu cầu trả hàng thành công' }
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw new AppError('Yêu cầu trả hàng không tồn tại để xóa', 404)
      }
      throw error
    }
  }
}

```

# modules\fulfillment\shipment\shipment.controller.ts

| Property | Value |
|----------|-------|
| Path | `modules\fulfillment\shipment\shipment.controller.ts` |
| Size | 2,104 bytes |
| Extension | `.ts` |
| Modified | 2026-09-30 08:12:14.990901 |

```typescript
import { Request, Response, NextFunction } from 'express'
import { ShipmentService } from './shipment.service'

export class ShipmentController {
  constructor(private shipmentService = new ShipmentService()) {}

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.shipmentService.findAll(req.query as any)
      return res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shipmentId = Number(req.params.shipmentId)
      const data = await this.shipmentService.findById(shipmentId)
      return res.status(200).json({ statusCode: 200, data })
    } catch (err) {
      next(err)
    }
  }

  findByOrderId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderId = Number(req.params.orderId)
      const data = await this.shipmentService.findByOrderId(orderId)
      return res.status(200).json({ statusCode: 200, data })
    } catch (err) {
      next(err)
    }
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.shipmentService.create(req.body)
      return res.status(201).json({ statusCode: 201, message: 'Tạo lô hàng thành công', data })
    } catch (err) {
      next(err)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shipmentId = Number(req.params.shipmentId)
      const data = await this.shipmentService.update(shipmentId, req.body)
      return res.status(200).json({ statusCode: 200, message: 'Cập nhật lô hàng thành công', data })
    } catch (err) {
      next(err)
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shipmentId = Number(req.params.shipmentId)
      const result = await this.shipmentService.delete(shipmentId)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }
}

```

# modules\fulfillment\shipment\shipment.repo.ts

| Property | Value |
|----------|-------|
| Path | `modules\fulfillment\shipment\shipment.repo.ts` |
| Size | 2,337 bytes |
| Extension | `.ts` |
| Modified | 2026-09-30 08:12:14.993652 |

```typescript
import { prisma } from '@/database/prisma'
import {
  CreateShipmentBodyType,
  GetAllShipmentsQueryType,
  UpdateShipmentBodyType,
} from './shipment.schema'

const shipmentInclude = {
  order: {
    select: {
      id: true,
      orderCode: true,
      status: true,
      receiverName: true,
      receiverPhone: true,
    },
  },
} as const

export class ShipmentRepo {
  async findAll(query: GetAllShipmentsQueryType) {
    const where = {
      ...(query.status ? { status: query.status } : {}),
      ...(query.orderId ? { orderId: query.orderId } : {}),
    }

    const shipments = await prisma.shipment.findMany({
      where,
      include: shipmentInclude,
      orderBy: { createdAt: 'desc' },
    })

    return {
      data: shipments,
      totalItems: shipments.length,
    }
  }

  async findById(id: number) {
    return prisma.shipment.findUnique({
      where: { id },
      include: shipmentInclude,
    })
  }

  async findByOrderId(orderId: number) {
    return prisma.shipment.findUnique({
      where: { orderId },
      include: shipmentInclude,
    })
  }

  async create(data: CreateShipmentBodyType) {
    return prisma.shipment.create({
      data: {
        orderId: data.orderId,
        carrier: data.carrier,
        trackingCode: data.trackingCode,
        actualShippingFee: data.actualShippingFee,
        status: data.status,
        estimatedDelivery: data.estimatedDelivery ?? undefined,
      },
      include: shipmentInclude,
    })
  }

  async update(id: number, data: UpdateShipmentBodyType) {
    return prisma.shipment.update({
      where: { id },
      data: {
        ...(data.carrier !== undefined ? { carrier: data.carrier } : {}),
        ...(data.trackingCode !== undefined ? { trackingCode: data.trackingCode } : {}),
        ...(data.actualShippingFee !== undefined
          ? { actualShippingFee: data.actualShippingFee }
          : {}),
        ...(data.status !== undefined ? { status: data.status } : {}),
        ...(data.estimatedDelivery !== undefined
          ? { estimatedDelivery: data.estimatedDelivery }
          : {}),
      },
      include: shipmentInclude,
    })
  }

  async delete(id: number) {
    return prisma.shipment.delete({
      where: { id },
    })
  }
}

```

# modules\fulfillment\shipment\shipment.routes.ts

| Property | Value |
|----------|-------|
| Path | `modules\fulfillment\shipment\shipment.routes.ts` |
| Size | 511 bytes |
| Extension | `.ts` |
| Modified | 2026-09-30 08:12:14.996139 |

```typescript
import { Router } from 'express'
import { ShipmentController } from './shipment.controller'

export const shipmentRouter = Router()
const controller = new ShipmentController()

shipmentRouter.get('/', controller.findAll)
shipmentRouter.get('/by-order/:orderId', controller.findByOrderId)
shipmentRouter.get('/:shipmentId', controller.findById)
shipmentRouter.post('/', controller.create)
shipmentRouter.put('/:shipmentId', controller.update)
shipmentRouter.delete('/:shipmentId', controller.delete)

```

# modules\fulfillment\shipment\shipment.schema.ts

| Property | Value |
|----------|-------|
| Path | `modules\fulfillment\shipment\shipment.schema.ts` |
| Size | 1,250 bytes |
| Extension | `.ts` |
| Modified | 2026-09-30 08:12:14.998303 |

```typescript
import { ShipmentStatus } from '@prisma/client'
import { z } from 'zod'

export const getAllShipmentsQuerySchema = z.object({
  status: z.nativeEnum(ShipmentStatus).optional(),
  orderId: z.coerce.number().int().positive().optional(),
})

export const shipmentIdParamsSchema = z.object({
  shipmentId: z.coerce.number().int().positive('shipmentId phải là số nguyên dương'),
})

export const orderIdParamsSchema = z.object({
  orderId: z.coerce.number().int().positive('orderId phải là số nguyên dương'),
})

export const createShipmentBodySchema = z.object({
  orderId: z.coerce.number().int().positive(),
  carrier: z.string().min(1).max(100),
  trackingCode: z.string().min(1).max(150),
  actualShippingFee: z.coerce.number().nonnegative(),
  status: z.nativeEnum(ShipmentStatus).optional(),
  estimatedDelivery: z.coerce.date().optional().nullable(),
})

export const updateShipmentBodySchema = createShipmentBodySchema
  .omit({ orderId: true })
  .partial()

export type GetAllShipmentsQueryType = z.infer<typeof getAllShipmentsQuerySchema>
export type CreateShipmentBodyType = z.infer<typeof createShipmentBodySchema>
export type UpdateShipmentBodyType = z.infer<typeof updateShipmentBodySchema>

```

# modules\fulfillment\shipment\shipment.service.ts

| Property | Value |
|----------|-------|
| Path | `modules\fulfillment\shipment\shipment.service.ts` |
| Size | 2,098 bytes |
| Extension | `.ts` |
| Modified | 2026-09-30 08:12:14.999587 |

```typescript
import { ShipmentRepo } from './shipment.repo'
import {
  CreateShipmentBodyType,
  GetAllShipmentsQueryType,
  UpdateShipmentBodyType,
} from './shipment.schema'
import { AppError, isNotFoundPrismaError, isUniqueConstraintPrismaError } from '@/common/errors'

export class ShipmentService {
  constructor(private shipmentRepo = new ShipmentRepo()) {}

  async findAll(query: GetAllShipmentsQueryType) {
    return this.shipmentRepo.findAll(query)
  }

  async findById(id: number) {
    const shipment = await this.shipmentRepo.findById(id)
    if (!shipment) {
      throw new AppError('Lô hàng không tồn tại', 404)
    }
    return shipment
  }

  async findByOrderId(orderId: number) {
    const shipment = await this.shipmentRepo.findByOrderId(orderId)
    if (!shipment) {
      throw new AppError('Không tìm thấy lô hàng cho đơn hàng này', 404)
    }
    return shipment
  }

  async create(data: CreateShipmentBodyType) {
    try {
      return await this.shipmentRepo.create(data)
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw new AppError('Đơn hàng đã có lô hàng hoặc mã vận đơn đã tồn tại', 422)
      }
      throw error
    }
  }

  async update(id: number, data: UpdateShipmentBodyType) {
    try {
      await this.findById(id)
      return await this.shipmentRepo.update(id, data)
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw new AppError('Lô hàng không tồn tại để cập nhật', 404)
      }
      if (isUniqueConstraintPrismaError(error)) {
        throw new AppError('Mã vận đơn đã tồn tại', 422)
      }
      throw error
    }
  }

  async delete(id: number) {
    try {
      await this.findById(id)
      await this.shipmentRepo.delete(id)
      return { message: 'Xóa lô hàng thành công' }
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw new AppError('Lô hàng không tồn tại để xóa', 404)
      }
      throw error
    }
  }
}

```

# modules\identity\address\address.controller.ts

| Property | Value |
|----------|-------|
| Path | `modules\identity\address\address.controller.ts` |
| Size | 2,374 bytes |
| Extension | `.ts` |
| Modified | 2026-09-30 08:12:15.002542 |

```typescript
import { NextFunction, Request, Response } from 'express'
import { AppError } from '@/common/errors'
import { AddressService } from './address.service'
import { CreateAddressBodyType, GetAddressQueryType, UpdateAddressBodyType } from './address.schema'

export class AddressController {
  constructor(private addressService = new AddressService()) {}

  private getUserId(req: Request) {
    const user = (req as any).user
    const userId = user?.userId ?? user?.id
    if (!userId) throw new AppError('Chưa xác thực người dùng', 401)
    return Number(userId)
  }

  getListAddresses = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query as unknown as GetAddressQueryType
      return res.status(200).json({ statusCode: 200, data: await this.addressService.listAddresses(this.getUserId(req), query) })
    } catch (error) {
      next(error)
    }
  }

  getAddressById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.addressService.getAddress(Number(req.params.addressId), this.getUserId(req))
      return res.status(200).json({ statusCode: 200, data })
    } catch (error) {
      next(error)
    }
  }

  createAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.addressService.createAddress(this.getUserId(req), req.body as CreateAddressBodyType)
      return res.status(201).json({ statusCode: 201, message: 'Tạo địa chỉ thành công', data })
    } catch (error) {
      next(error)
    }
  }

  updateAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.addressService.updateAddress(Number(req.params.addressId), this.getUserId(req), req.body as UpdateAddressBodyType)
      return res.status(200).json({ statusCode: 200, message: 'Cập nhật địa chỉ thành công', data })
    } catch (error) {
      next(error)
    }
  }

  deleteAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.addressService.deleteAddress(Number(req.params.addressId), this.getUserId(req))
      return res.status(200).json({ statusCode: 200, message: 'Xóa địa chỉ thành công' })
    } catch (error) {
      next(error)
    }
  }
}

```

# modules\identity\address\address.repo.ts

| Property | Value |
|----------|-------|
| Path | `modules\identity\address\address.repo.ts` |
| Size | 2,091 bytes |
| Extension | `.ts` |
| Modified | 2026-09-30 08:12:15.004951 |

```typescript
import { prisma } from '@/database/prisma'
import { CreateAddressBodyType, GetAddressQueryType, UpdateAddressBodyType } from './address.schema'

export class AddressRepo {
  async listAddresses(userId: number, query: GetAddressQueryType) {
    const skip = (query.page - 1) * query.limit
    const where = {
      userId,
      ...(query.search
        ? {
            OR: [
              { receiverName: { contains: query.search, mode: 'insensitive' as const } },
              { phoneNumber: { contains: query.search, mode: 'insensitive' as const } },
              { detailAddress: { contains: query.search, mode: 'insensitive' as const } },
            ],
          }
        : {}),
    }
    const [totalItems, data] = await Promise.all([
      prisma.shippingAddress.count({ where }),
      prisma.shippingAddress.findMany({ where, skip, take: query.limit, orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }] }),
    ])
    return { data, totalItems, page: query.page, limit: query.limit, totalPages: Math.ceil(totalItems / query.limit) }
  }

  async findAddressById(id: number, userId: number) {
    return prisma.shippingAddress.findFirst({ where: { id, userId } })
  }

  async createAddress(userId: number, data: CreateAddressBodyType) {
    return prisma.$transaction(async (transaction) => {
      if (data.isDefault) {
        await transaction.shippingAddress.updateMany({ where: { userId }, data: { isDefault: false } })
      }
      return transaction.shippingAddress.create({ data: { ...data, userId } })
    })
  }

  async updateAddress(id: number, userId: number, data: UpdateAddressBodyType) {
    return prisma.$transaction(async (transaction) => {
      if (data.isDefault) {
        await transaction.shippingAddress.updateMany({ where: { userId }, data: { isDefault: false } })
      }
      return transaction.shippingAddress.update({ where: { id, userId }, data })
    })
  }

  async deleteAddress(id: number, userId: number) {
    return prisma.shippingAddress.deleteMany({ where: { id, userId } })
  }
}

```

# modules\identity\address\address.routes.ts

| Property | Value |
|----------|-------|
| Path | `modules\identity\address\address.routes.ts` |
| Size | 1,050 bytes |
| Extension | `.ts` |
| Modified | 2026-09-30 08:12:15.006492 |

```typescript
import { Router } from 'express'
import { authGuard } from '@/middlewares/guards/auth.guard'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import { AddressController } from './address.controller'
import {
	addressParamsSchema,
	createAddressBodySchema,
	getAddressQuerySchema,
	updateAddressBodySchema,
} from './address.schema'

export const addressRouter = Router()
const controller = new AddressController()

addressRouter.use(authGuard)
addressRouter.get('/', validateRequest({ query: getAddressQuerySchema }), controller.getListAddresses)
addressRouter.get('/:addressId', validateRequest({ params: addressParamsSchema }), controller.getAddressById)
addressRouter.post('/', validateRequest({ body: createAddressBodySchema }), controller.createAddress)
addressRouter.put('/:addressId', validateRequest({ params: addressParamsSchema, body: updateAddressBodySchema }), controller.updateAddress)
addressRouter.delete('/:addressId', validateRequest({ params: addressParamsSchema }), controller.deleteAddress)

```

# modules\identity\address\address.schema.ts

| Property | Value |
|----------|-------|
| Path | `modules\identity\address\address.schema.ts` |
| Size | 2,290 bytes |
| Extension | `.ts` |
| Modified | 2026-09-30 08:12:15.007742 |

```typescript
import { z } from 'zod'

export const addressParamsSchema = z.object({
  addressId: z.coerce.number().int().positive('addressId phải là số nguyên dương'),
})

export const getAddressQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().optional(),
  userId: z.coerce.number().int().positive().optional(),
})

export const getAddressByUserIdQuerySchema = z.object({
  userId: z.coerce.number().int().positive('userId phải là số nguyên dương'),
})

export const createAddressBodySchema = z.object({
  receiverName: z.string().trim().min(1, 'Tên người nhận là bắt buộc').max(255),
    phoneNumber: z.string().trim().min(1, 'Số điện thoại là bắt buộc').max(50),
  province: z.string().trim().min(1, 'Tỉnh/Thành phố là bắt buộc').max(150),
  district: z.string().trim().min(1, 'Quận/Huyện là bắt buộc').max(150),
  ward: z.string().trim().min(1, 'Phường/Xã là bắt buộc').max(150),
  detailAddress: z.string().trim().min(1, 'Địa chỉ là bắt buộc').max(500),
    isDefault: z.boolean().optional(),
})

export const updateAddressBodySchema = z.object({
    receiverName: z.string().trim().min(1, 'Tên người nhận là bắt buộc').max(255).optional(),
    phoneNumber: z.string().trim().min(1, 'Số điện thoại là bắt buộc').max(50).optional(),
    province: z.string().trim().min(1, 'Tỉnh/Thành phố là bắt buộc').max(150).optional(),
    district: z.string().trim().min(1, 'Quận/Huyện là bắt buộc').max(150).optional(),
    ward: z.string().trim().min(1, 'Phường/Xã là bắt buộc').max(150).optional(),
    detailAddress: z.string().trim().min(1, 'Địa chỉ là bắt buộc').max(500).optional(),
    isDefault: z.boolean().optional(),
})

export type AddressParamsType = z.infer<typeof addressParamsSchema>
export type GetAddressQueryType = z.infer<typeof getAddressQuerySchema>
export type GetAddressByUserIdQueryType = z.infer<typeof getAddressByUserIdQuerySchema>
export type CreateAddressBodyType = z.infer<typeof createAddressBodySchema>
export type UpdateAddressBodyType = z.infer<typeof updateAddressBodySchema>

```

# modules\identity\address\address.service.ts

| Property | Value |
|----------|-------|
| Path | `modules\identity\address\address.service.ts` |
| Size | 1,129 bytes |
| Extension | `.ts` |
| Modified | 2026-09-30 08:12:15.009604 |

```typescript
import { AddressRepo } from './address.repo'
import { CreateAddressBodyType, GetAddressQueryType, UpdateAddressBodyType } from './address.schema'
import { AppError } from '@/common/errors'

export class AddressService {
    constructor(private repo = new AddressRepo()) {}
    async listAddresses(userId: number, query: GetAddressQueryType) {
        return this.repo.listAddresses(userId, query)
    }
    async getAddress(id: number, userId: number) {
        const address = await this.repo.findAddressById(id, userId)
        if (!address) throw new AppError('Địa chỉ không tồn tại', 404)
        return address
    }
    async createAddress(userId: number, data: CreateAddressBodyType) {
        return this.repo.createAddress(userId, data)
    }
    async updateAddress(id: number, userId: number, data: UpdateAddressBodyType) {
        await this.getAddress(id, userId)
        return this.repo.updateAddress(id, userId, data)
    }
    async deleteAddress(id: number, userId: number) {
        await this.getAddress(id, userId)
        return this.repo.deleteAddress(id, userId)
    }
}
```

# modules\identity\auth\auth.controller.ts

| Property | Value |
|----------|-------|
| Path | `modules\identity\auth\auth.controller.ts` |
| Size | 2,391 bytes |
| Extension | `.ts` |
| Modified | 2026-10-11 19:24:35.224358 |

```typescript
import { NextFunction, Request, Response } from 'express'
import { AppError } from '@/common/errors'
import { AuthService } from './auth.service'

export class AuthController {
  constructor(private authService = new AuthService()) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(201).json({ statusCode: 201, data: await this.authService.register(req.body) })
    } catch (error) { next(error) }
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({ statusCode: 200, data: await this.authService.login(req.body, req.ip || '') })
    } catch (error) { next(error) }
  }

  refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({ statusCode: 200, data: await this.authService.refresh(req.body.refreshToken, req.ip || '') })
    } catch (error) { next(error) }
  }

  forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({ statusCode: 200, data: await this.authService.forgotPassword(req.body.email) })
    } catch (error) { next(error) }
  }

  resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({ statusCode: 200, data: await this.authService.resetPassword(req.body) })
    } catch (error) { next(error) }
  }

  changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as any).user
      const userId = user?.userId ?? user?.id
      if (!userId) throw new AppError('Chưa xác thực người dùng', 401)
      return res.status(200).json({ statusCode: 200, data: await this.authService.changePassword(Number(userId), req.body) })
    } catch (error) { next(error) }
  }

  verifyCode = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({ statusCode: 200, data: await this.authService.verifyCode(req.body) })
    } catch (error) { next(error) }
  }

  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({ statusCode: 200, data: await this.authService.logout(req.body.refreshToken) })
    } catch (error) { next(error) }
  }
}

```

# modules\identity\auth\auth.repo.ts

| Property | Value |
|----------|-------|
| Path | `modules\identity\auth\auth.repo.ts` |
| Size | 2,394 bytes |
| Extension | `.ts` |
| Modified | 2026-10-11 19:08:09.530071 |

```typescript
import { prisma } from '@/database/prisma'
import { RegisterUserBodyType } from './auth.schema'
import { UserStatus } from '@prisma/client';

export class AuthRepo {
  async findUserByEmail(email: string) {
    return prisma.user.findFirst({ where: { email, deletedAt: null }, include: { role: true } })
  }

  async findUserById(id: number) {
    return prisma.user.findFirst({ where: { id, deletedAt: null }, include: { role: true } })
  }

  async findRoleByCode(code: string) {
    return prisma.role.findFirst({ where: { code, isActive: true, deletedAt: null } })
  }

  async createUser({ data, roleId, passwordHash, status }: { data: RegisterUserBodyType; roleId: number; passwordHash: string; status: UserStatus }) {
    return prisma.user.create({
      data: {
        email: data.email,
        fullName: data.fullName,
        phoneNumber: data.phoneNumber ?? '',
        passwordHash,
        roleId,
        status,
      },
      include: { role: true },
    })
  }

  async createDeviceSession(data: { userId: number; refreshToken: string; ipAddress: string; expiresAt: Date }) {
    return prisma.deviceSession.create({ data })
  }

  async findDeviceSession(refreshToken: string) {
    return prisma.deviceSession.findFirst({
      where: { refreshToken, isActive: true },
      include: { user: { include: { role: true } } },
    })
  }

  async deactivateDeviceSession(id: number) {
    return prisma.deviceSession.update({ where: { id }, data: { isActive: false } })
  }

  async updatePassword(userId: number, passwordHash: string) {
    return prisma.user.update({ where: { id: userId }, data: { passwordHash } })
  }

  async updateInactiveUser(userId: number, data: { fullName: string; phoneNumber?: string; passwordHash: string }) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        fullName: data.fullName,
        phoneNumber: data.phoneNumber ?? '',
        passwordHash: data.passwordHash,
      },
      include: { role: true },
    })
  }

 

 


 

  async activateUser(userId: number) {
    return prisma.user.update({ where: { id: userId }, data: { status: 'ACTIVE' } })
  }

  async deactivateAllUserSessions(userId: number) {
    return prisma.deviceSession.updateMany({ where: { userId, isActive: true }, data: { isActive: false } })
  }

  
}

```

# modules\identity\auth\auth.routes.ts

| Property | Value |
|----------|-------|
| Path | `modules\identity\auth\auth.routes.ts` |
| Size | 1,665 bytes |
| Extension | `.ts` |
| Modified | 2026-09-30 08:12:15.014597 |

```typescript
import { Router } from 'express'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import { generalAuthLimiter, otpLimiter, strictAuthLimiter } from '@/middlewares/rate-limit.middleware'
import { authGuard } from '@/middlewares/guards/auth.guard'
import { AuthController } from './auth.controller'
import {
  changePasswordBodySchema,
  forgotPasswordBodySchema,
  loginUserBodySchema,
  refreshTokenBodySchema,
  registerUserBodySchema,
  resetPasswordBodySchema,
  verificationCodeParamsSchema,
} from './auth.schema'

export const authRouter = Router()
const controller = new AuthController()

// Rate limit chung cho toàn bộ auth routes
authRouter.use(generalAuthLimiter)

authRouter.post('/register', otpLimiter, validateRequest({ body: registerUserBodySchema }), controller.register)
authRouter.post('/login', strictAuthLimiter, validateRequest({ body: loginUserBodySchema }), controller.login)
authRouter.post('/refresh', validateRequest({ body: refreshTokenBodySchema }), controller.refresh)
authRouter.post('/forgot-password', otpLimiter, validateRequest({ body: forgotPasswordBodySchema }), controller.forgotPassword)
authRouter.post('/reset-password', strictAuthLimiter, validateRequest({ body: resetPasswordBodySchema }), controller.resetPassword)
authRouter.post('/change-password', authGuard, validateRequest({ body: changePasswordBodySchema }), controller.changePassword)
authRouter.post('/verify-code', strictAuthLimiter, validateRequest({ body: verificationCodeParamsSchema }), controller.verifyCode)
authRouter.post('/logout', validateRequest({ body: refreshTokenBodySchema }), controller.logout)

```

# modules\identity\auth\auth.schema.ts

| Property | Value |
|----------|-------|
| Path | `modules\identity\auth\auth.schema.ts` |
| Size | 3,706 bytes |
| Extension | `.ts` |
| Modified | 2026-10-01 17:02:22.985301 |

```typescript
import { z } from 'zod';

export const registerUserBodySchema = z.object({
    email: z.string().trim().email('Email không đúng định dạng').max(255),
    password: z
        .string()
        .min(8, 'Mật khẩu tối thiểu 8 ký tự')
        .max(72, 'Mật khẩu tối đa 72 ký tự') 
        .regex(/[A-Z]/, 'Mật khẩu cần ít nhất 1 chữ in hoa')
        .regex(/[a-z]/, 'Mật khẩu cần ít nhất 1 chữ in thường')
        .regex(/[0-9]/, 'Mật khẩu cần ít nhất 1 chữ số')
        .regex(/[^A-Za-z0-9]/, 'Mật khẩu cần ít nhất 1 ký tự đặc biệt'),
    fullName: z.string().trim().min(1).max(100),
    phoneNumber: z.string().trim().optional(),
})

export const loginUserBodySchema = z.object({
    email: z.string().trim().email('Email không đúng định dạng').max(255),
    password: z.string().min(8, 'Mật khẩu tối thiểu 8 ký tự').max(72, 'Mật khẩu tối đa 72 ký tự'),
})

export const refreshTokenBodySchema = z.object({
    refreshToken: z.string().min(1, 'Refresh token là bắt buộc'),
})

export const forgotPasswordBodySchema = z.object({
    email: z.string().trim().email('Email không đúng định dạng').max(255),
})

export const verificationCodeParamsSchema = z.object({
    email: z.string().trim().email('Email không đúng định dạng').max(255),
    type: z.enum(['REGISTER', 'FORGOT_PASSWORD']),
    code: z.string().trim().length(6, 'Mã xác thực phải là 6 chữ số').regex(/^\d+$/, 'Mã xác thực chỉ gồm chữ số'),
})

export const resetPasswordBodySchema = z.object({
    token: z.string().min(1, 'Token xác thực là bắt buộc'),
    newPassword: z
      .string()
      .min(8, 'Mật khẩu mới tối thiểu 8 ký tự')
      .max(72, 'Mật khẩu tối đa 72 ký tự')
      .regex(/[A-Z]/, 'Cần ít nhất 1 chữ hoa')
      .regex(/[a-z]/, 'Cần ít nhất 1 chữ thường')
      .regex(/[0-9]/, 'Cần ít nhất 1 chữ số')
      .regex(/[^A-Za-z0-9]/, 'Cần ít nhất 1 ký tự đặc biệt'),
    confirmPassword: z.string().min(1, 'Xác nhận mật khẩu là bắt buộc'),
  })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: 'Mật khẩu xác nhận không khớp',
        path: ['confirmPassword'],
    })

export const changePasswordBodySchema = z.object({
    oldPassword: z.string().min(1, 'Mật khẩu cũ là bắt buộc'),
    newPassword: z
      .string()
      .min(8, 'Mật khẩu mới tối thiểu 8 ký tự')
      .max(72, 'Mật khẩu tối đa 72 ký tự')
      .regex(/[A-Z]/, 'Cần ít nhất 1 chữ hoa')
      .regex(/[a-z]/, 'Cần ít nhất 1 chữ thường')
      .regex(/[0-9]/, 'Cần ít nhất 1 chữ số')
      .regex(/[^A-Za-z0-9]/, 'Cần ít nhất 1 ký tự đặc biệt'),
    confirmPassword: z.string().min(1, 'Xác nhận mật khẩu là bắt buộc'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
    })

export type RegisterUserBodyType = z.infer<typeof registerUserBodySchema>
export type LoginUserBodyType = z.infer<typeof loginUserBodySchema>
export type RefreshTokenBodyType = z.infer<typeof refreshTokenBodySchema>
export type ForgotPasswordBodyType = z.infer<typeof forgotPasswordBodySchema>
export type VerificationCodeParamsType = z.infer<typeof verificationCodeParamsSchema>
export type ResetPasswordBodyType = z.infer<typeof resetPasswordBodySchema>
export type ChangePasswordBodyType = z.infer<typeof changePasswordBodySchema>
```

# modules\identity\auth\auth.service.ts

| Property | Value |
|----------|-------|
| Path | `modules\identity\auth\auth.service.ts` |
| Size | 13,495 bytes |
| Extension | `.ts` |
| Modified | 2026-10-12 22:18:00.176461 |

```typescript
import { randomInt } from 'node:crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthRepo } from './auth.repo';
import { AppError } from '@/common/errors';
import { envConfig } from '@/config/env.config';
import { sendVerificationEmail } from '@/common/service/mail';
import { redisClient } from '@/database/redis';
import {
  ChangePasswordBodyType,
  LoginUserBodyType,
  RegisterUserBodyType,
  ResetPasswordBodyType,
  VerificationCodeParamsType
} from './auth.schema';
import Redis from 'ioredis';

export class AuthService {
  constructor(
    private readonly authRepo: AuthRepo = new AuthRepo(),
    private readonly redis: Redis = redisClient
  ) {}

  // =========================================================================
  // 1. CÁC HÀM TIỆN ÍCH RIÊNG TƯ (PRIVATE HELPERS VỚI REDIS)
  // =========================================================================

  /**
   * Tạo mã OTP ngẫu nhiên 6 chữ số và lưu vào Redis kèm Cooldown chống spam
   */
  private async createVerificationCode(
    emailRaw: string,
    type: 'REGISTER' | 'FORGOT_PASSWORD'
  ): Promise<string> {
    const email = emailRaw.trim().toLowerCase();
    const otpKey = `otp:${type}:${email}`;
    const cooldownKey = `otp_cooldown:${type}:${email}`;

    // 1. Kiểm tra Cooldown 60s
    const cooldownRemaining = await this.redis.ttl(cooldownKey);
    if (cooldownRemaining > 0) {
      throw new AppError(
        `Vui lòng chờ ${cooldownRemaining} giây trước khi yêu cầu gửi lại mã`,
        429
      );
    }

    // 2. Sinh mã ngẫu nhiên 6 chữ số (100000 -> 999999)
    const code = randomInt(100000, 1000000).toString();

    // 3. Lưu vào Redis:
    // - OTP tồn tại trong 600 giây (10 phút)
    // - Cooldown tồn tại trong 60 giây
    await this.redis.set(otpKey, code, 'EX', 600);
    await this.redis.set(cooldownKey, '1', 'EX', 60);

    return code;
  }

  /**
   * So khớp OTP từ Redis và xóa ngay lập tức nếu chính xác (Chống Replay Attack)
   */
  private async verifyVerificationCode(
    emailRaw: string,
    codeRaw: string,
    type: 'REGISTER' | 'FORGOT_PASSWORD'
  ): Promise<void> {
    const email = emailRaw.trim().toLowerCase();
    const code = codeRaw.trim();
    const otpKey = `otp:${type}:${email}`;

    const storedCode = await this.redis.get(otpKey);

    if (!storedCode) {
      throw new AppError(
        'Mã xác thực đã hết hạn hoặc không tồn tại. Vui lòng gửi lại mã mới.',
        410
      );
    }

    if (storedCode !== code) {
      throw new AppError('Mã xác thực không chính xác', 400);
    }

    // Xóa mã khỏi Redis ngay sau khi xác thực thành công
    await this.redis.del(otpKey);
  }

  /**
   * Tạo JWT Token ngắn hạn (15 phút) dùng cho luồng Reset Password
   */
  private createResetPasswordToken(email: string): string {
    return jwt.sign(
      { email: email.trim().toLowerCase(), purpose: 'RESET_PASSWORD' },
      process.env.JWT_RESET_SECRET || 'super_secret_reset_key_123',
      { expiresIn: '15m' }
    );
  }

  /**
   * Sinh Access Token (1 giờ) & Refresh Token (7 ngày)
   */
  private generateTokens(user: any) {
    const payload = {
      sub: user.id,
      userId: user.id,
      roleId: user.roleId ?? user.role?.id ?? 3,
      email: user.email,
      role: user.role?.code || 'CUSTOMER',
    };

    const accessToken = jwt.sign(
      payload,
      envConfig.ACCESS_TOKEN_SECRET,
      { expiresIn: envConfig.ACCESS_TOKEN_EXPIRES_IN as any }
    );

    const refreshToken = jwt.sign(
      payload,
      envConfig.REFRESH_TOKEN_SECRET,
      { expiresIn: envConfig.REFRESH_TOKEN_EXPIRES_IN as any }
    );

    return { accessToken, refreshToken };
  }

  /**
   * Ẩn thông tin nhạy cảm (passwordHash) trước khi gửi về Client
   */
  private sanitizeUser(user: any) {
    if (!user) return null;
    const { passwordHash, ...safeUser } = user;
    return safeUser;
  }

  // =========================================================================
  // 2. NGHIỆP VỤ XÁC THỰC (AUTHENTICATION BUSINESS FLOWS)
  // =========================================================================

  /**
   * Đăng ký tài khoản (Hỗ trợ khôi phục tài khoản INACTIVE)
   */
  async register(data: RegisterUserBodyType) {
    const email = data.email.trim().toLowerCase();
    const existingUser = await this.authRepo.findUserByEmail(email);

    // TRƯỜNG HỢP 1: Tài khoản đã tồn tại
    if (existingUser) {
      if (existingUser.status === 'ACTIVE' || existingUser.status === 'BLOCKED') {
        throw new AppError('Email đã được sử dụng', 409);
      }

      // Tài khoản đang INACTIVE: Cập nhật thông tin mới và gửi lại mã OTP qua Redis
      const updatedUser = await this.authRepo.updateInactiveUser(existingUser.id, {
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        passwordHash: await bcrypt.hash(data.password, 10),
      });

      const code = await this.createVerificationCode(email, 'REGISTER');
      try {
        await sendVerificationEmail(email, code);
      } catch (mailError: any) {
        console.warn(`[MAIL_WARNING] Không thể gửi email tới ${email}:`, mailError?.message || mailError);
        console.info(`[DEV_OTP] Mã OTP đăng ký cho ${email} là: ${code}`);
      }

      return {
        user: this.sanitizeUser(updatedUser),
        message: 'Mã xác thực mới đã được gửi tới email của bạn',
      };
    }

    // TRƯỜNG HỢP 2: Đăng ký tài khoản hoàn toàn mới
    const role = await this.authRepo.findRoleByCode('CUSTOMER');
    if (!role) throw new AppError('Hệ thống chưa cấu hình vai trò CUSTOMER', 500);

    try {
      const user = await this.authRepo.createUser({
        data: { ...data, email },
        roleId: role.id,
        passwordHash: await bcrypt.hash(data.password, 10),
        status: 'INACTIVE',
      });

      const code = await this.createVerificationCode(email, 'REGISTER');
      try {
        await sendVerificationEmail(email, code);
      } catch (mailError: any) {
        console.warn(`[MAIL_WARNING] Không thể gửi email tới ${email}:`, mailError?.message || mailError);
        console.info(`[DEV_OTP] Mã OTP đăng ký cho ${email} là: ${code}`);
      }

      return {
        user: this.sanitizeUser(user),
        message: 'Đăng ký thành công. Vui lòng kiểm tra email để lấy mã xác thực.',
      };
    } catch (error: any) {
      if (error?.code === 'P2002') {
        throw new AppError('Email đã được sử dụng', 409);
      }
      throw error;
    }
  }

  /**
   * Xác thực mã OTP (Áp dụng cho cả Đăng ký và Quên mật khẩu)
   */
  async verifyCode(data: VerificationCodeParamsType) {
    const email = data.email.trim().toLowerCase();
    const code = data.code.trim();

    // 1. Kiểm tra mã trên Redis (hàm sẽ tự throw lỗi nếu sai/hết hạn và tự xóa key nếu đúng)
    await this.verifyVerificationCode(email, code, data.type);

    // 2. Kích hoạt tài khoản khi Đăng ký
    if (data.type === 'REGISTER') {
      const user = await this.authRepo.findUserByEmail(email);
      if (!user) throw new AppError('Tài khoản không tồn tại', 404);

      if (user.status === 'ACTIVE') {
        return { message: 'Tài khoản của bạn đã được kích hoạt từ trước' };
      }

      await this.authRepo.activateUser(user.id);
      return { message: 'Xác thực tài khoản thành công! Bạn có thể đăng nhập.' };
    }

    // 3. Cấp Token đặt lại mật khẩu cho luồng Quên mật khẩu
    const resetToken = this.createResetPasswordToken(email);
    return {
      message: 'Mã xác thực hợp lệ',
      resetToken,
    };
  }

  /**
   * Đăng nhập hệ thống
   */
  async login(data: LoginUserBodyType, ip: string) {
    const email = data.email.trim().toLowerCase();
    const user = await this.authRepo.findUserByEmail(email);

    if (!user) {
      throw new AppError('Email hoặc mật khẩu không chính xác', 401);
    }

    if (user.status === 'INACTIVE') {
      throw new AppError('Tài khoản chưa được kích hoạt. Vui lòng xác thực mã OTP.', 403);
    }

    if (user.status === 'BLOCKED') {
      throw new AppError('Tài khoản của bạn đã bị khóa. Vui lòng liên hệ CSKH.', 403);
    }

    const isMatch = await bcrypt.compare(data.password, user.passwordHash);
    if (!isMatch) {
      throw new AppError('Email hoặc mật khẩu không chính xác', 401);
    }

    const tokens = this.generateTokens(user);
    
    // (Optional: Nếu bạn có luồng device session thì lưu thêm ở đây với ip)
    // await this.authRepo.createDeviceSession({ userId: user.id, refreshToken: tokens.refreshToken, ipAddress: ip, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });

    return {
      ...tokens,
      user: this.sanitizeUser(user),
    };
  }

  /**
   * Cấp lại Access Token mới từ Refresh Token
   */
  async refresh(token: string, ip: string) {
    if (!token) throw new AppError('Vui lòng cung cấp Refresh Token', 401);

    let decoded: any;
    try {
      decoded = jwt.verify(
        token,
        envConfig.REFRESH_TOKEN_SECRET
      );
    } catch {
      throw new AppError('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.', 401);
    }

    const email = decoded.email;
    const user = await this.authRepo.findUserByEmail(email);
    if (!user || user.status !== 'ACTIVE') {
      throw new AppError('Tài khoản không hợp lệ hoặc đã bị khóa', 403);
    }

    const tokens = this.generateTokens(user);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  /**
   * Yêu cầu quên mật khẩu (Gửi OTP qua email)
   */
  async forgotPassword(emailRaw: string) {
    const email = emailRaw.trim().toLowerCase();
    const user = await this.authRepo.findUserByEmail(email);

    if (!user) {
      throw new AppError('Không tìm thấy tài khoản với địa chỉ email này', 404);
    }

    if (user.status === 'BLOCKED') {
      throw new AppError('Tài khoản này đã bị khóa', 403);
    }

    const code = await this.createVerificationCode(email, 'FORGOT_PASSWORD');
    try {
      await sendVerificationEmail(email, code);
    } catch (mailError: any) {
      console.warn(`[MAIL_WARNING] Không thể gửi email tới ${email}:`, mailError?.message || mailError);
      console.info(`[DEV_OTP] Mã OTP đặt lại mật khẩu cho ${email} là: ${code}`);
    }

    return {
      message: 'Mã xác thực đặt lại mật khẩu đã được gửi tới email của bạn',
    };
  }

  /**
   * Đặt lại mật khẩu mới (Sử dụng resetToken lấy được từ verifyCode)
   */
  async resetPassword(data: ResetPasswordBodyType) {
    let decoded: any;
    try {
      decoded = jwt.verify(
        data.token,
        process.env.JWT_RESET_SECRET || 'super_secret_reset_key_123'
      );
    } catch {
      throw new AppError('Mã token đặt lại mật khẩu đã hết hạn hoặc không hợp lệ', 401);
    }

    if (decoded.purpose !== 'RESET_PASSWORD') {
      throw new AppError('Token không đúng mục đích', 400);
    }

    const user = await this.authRepo.findUserByEmail(decoded.email);
    if (!user) throw new AppError('Người dùng không tồn tại', 404);

    const newPasswordHash = await bcrypt.hash(data.newPassword, 10);
    await this.authRepo.updatePassword(user.id, newPasswordHash);

    // Thu hồi toàn bộ session đăng nhập cũ nếu cần (tùy nghiệp vụ)
    // await this.authRepo.deactivateAllUserSessions(user.id);

    return {
      message: 'Đặt lại mật khẩu thành công. Vui lòng đăng nhập bằng mật khẩu mới.',
    };
  }

  /**
   * Đổi mật khẩu cho người dùng đã đăng nhập
   */
  async changePassword(userId: number, data: ChangePasswordBodyType) {
    const user = await this.authRepo.findUserById(userId);
    if (!user) throw new AppError('Người dùng không tồn tại', 404);

    const isMatch = await bcrypt.compare(data.oldPassword, user.passwordHash);
    if (!isMatch) {
      throw new AppError('Mật khẩu hiện tại không chính xác', 400);
    }

    const newPasswordHash = await bcrypt.hash(data.newPassword, 10);
    await this.authRepo.updatePassword(userId, newPasswordHash);

    return {
      message: 'Đổi mật khẩu thành công',
    };
  }

  /**
   * Đăng xuất tài khoản
   */
  async logout(refreshToken?: string) {
    // Có thể bổ sung blacklist token vào Redis nếu muốn hủy token ngay lập tức
    // Nếu có dùng DeviceSession thì cập nhật isActive = false ở bảng DeviceSession bằng refreshToken
    return {
      message: 'Đăng xuất thành công',
    };
  }
}
```

# modules\identity\identity.routes.ts

| Property | Value |
|----------|-------|
| Path | `modules\identity\identity.routes.ts` |
| Size | 499 bytes |
| Extension | `.ts` |
| Modified | 2026-09-29 13:25:28.562667 |

```typescript
import { Router } from 'express'
import { authRouter } from './auth/auth.routes'
import { userRouter } from './user/user.routes'
import { rolePermissionRouter } from './role-permission/role-permission.routes'
import { addressRouter } from './address/address.routes'

export const identityRouter = Router()

identityRouter.use('/auth', authRouter)
identityRouter.use('/users', userRouter)
identityRouter.use('/roles', rolePermissionRouter)
identityRouter.use('/addresses', addressRouter)

```

# modules\identity\role-permission\role-permission.controller.ts

| Property | Value |
|----------|-------|
| Path | `modules\identity\role-permission\role-permission.controller.ts` |
| Size | 3,726 bytes |
| Extension | `.ts` |
| Modified | 2026-10-01 17:02:22.988303 |

```typescript
  import { Request, Response, NextFunction } from 'express'
  import { AppError } from '@/common/errors'
  import { RolePermissionService } from './role-permission.service'

  export class RolePermissionController {
    constructor(private service = new RolePermissionService()) {}

    private getActorId(req: Request) {
      const user = (req as any).user
      const id = user?.userId ?? user?.id
      if (!id) throw new AppError('Chưa xác thực người dùng', 401)
      return Number(id)
    }

    listRoles = async (req: Request, res: Response, next: NextFunction) => {
      try {
        return res.status(200).json({ statusCode: 200, data: await this.service.listRoles(req.query as any) })
      } catch (error) {
        next(error)
      }
    }

    getRole = async (req: Request, res: Response, next: NextFunction) => {
      try {
        return res.status(200).json({ statusCode: 200, data: await this.service.getRole(Number(req.params.roleId)) })
      } catch (error) {
        next(error)
      }
    }

    createRole = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = await this.service.createRole(req.body, this.getActorId(req))
        return res.status(201).json({ statusCode: 201, message: 'Tạo vai trò thành công', data })
      } catch (error) {
        next(error)
      }
    }

    updateRole = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = await this.service.updateRole(Number(req.params.roleId), req.body, this.getActorId(req))
        return res.status(200).json({ statusCode: 200, message: 'Cập nhật vai trò thành công', data })
      } catch (error) {
        next(error)
      }
    }

    deleteRole = async (req: Request, res: Response, next: NextFunction) => {
      try {
        return res.status(200).json({ statusCode: 200, ...(await this.service.deleteRole(Number(req.params.roleId), this.getActorId(req))) })
      } catch (error) {
        next(error)
      }
    }

    listPermissions = async (req: Request, res: Response, next: NextFunction) => {
      try {
        return res.status(200).json({ statusCode: 200, data: await this.service.listPermissions(req.query as any) })
      } catch (error) {
        next(error)
      }
    }

    getPermission = async (req: Request, res: Response, next: NextFunction) => {
      try {
        return res.status(200).json({ statusCode: 200, data: await this.service.getPermission(Number(req.params.permissionId)) })
      } catch (error) {
        next(error)
      }
    }

    createPermission = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = await this.service.createPermission(req.body, this.getActorId(req))
        return res.status(201).json({ statusCode: 201, message: 'Tạo permission thành công', data })
      } catch (error) {
        next(error)
      }
    }

    updatePermission = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = await this.service.updatePermission(Number(req.params.permissionId), req.body, this.getActorId(req))
        return res.status(200).json({ statusCode: 200, message: 'Cập nhật permission thành công', data })
      } catch (error) {
        next(error)
      }
    }

    deletePermission = async (req: Request, res: Response, next: NextFunction) => {
      try {
        return res.status(200).json({ statusCode: 200, ...(await this.service.deletePermission(Number(req.params.permissionId), this.getActorId(req))) })
      } catch (error) {
        next(error)
      }
    }
  }

```

# modules\identity\role-permission\role-permission.repo.ts

| Property | Value |
|----------|-------|
| Path | `modules\identity\role-permission\role-permission.repo.ts` |
| Size | 4,570 bytes |
| Extension | `.ts` |
| Modified | 2026-10-01 17:02:22.990302 |

```typescript
import { prisma } from '@/database/prisma'
import {
    CreatePermissionBodyType,
    CreateRoleBodyType,
    GetPermissionQueryType,
    GetRolePermissionQueryType,
    UpdatePermissionBodyType,
    UpdateRoleBodyType,
} from './role-permission.schema'

const permissionSelect = { id: true, code: true, module: true, description: true } as const
const roleInclude = {
    permissions: { where: { deletedAt: null }, select: permissionSelect },
    _count: { select: { users: { where: { deletedAt: null } } } },
} as const

export class RolePermissionRepo {
    async listRoles(query: GetRolePermissionQueryType) {
        const skip = (query.page - 1) * query.limit
        const where = {
            deletedAt: null,
            ...(query.search
                ? { OR: [{ name: { contains: query.search, mode: 'insensitive' as const } }, { code: { contains: query.search, mode: 'insensitive' as const } }] }
                : {}),
        }
        const [totalItems, data] = await Promise.all([
            prisma.role.count({ where }),
            prisma.role.findMany({ where, skip, take: query.limit, include: roleInclude, orderBy: { createdAt: 'desc' } }),
        ])
        return { data, totalItems, page: query.page, limit: query.limit, totalPages: Math.ceil(totalItems / query.limit) }
    }

    async findRoleById(id: number) {
        return prisma.role.findFirst({ where: { id, deletedAt: null }, include: roleInclude })
    }

    async findRoleByCode(code: string) {
        return prisma.role.findFirst({ where: { code, deletedAt: null }, include: roleInclude })
    }

    async createRole(data: CreateRoleBodyType, createdById: number) {
        const { permissionIds = [], ...roleData } = data
        return prisma.role.create({ data: { ...roleData, createdById, permissions: { connect: permissionIds.map((id) => ({ id })) } }, include: roleInclude })
    }

    async updateRole(id: number, data: UpdateRoleBodyType, updatedById: number) {
        const { permissionIds, ...roleData } = data
        return prisma.role.update({
            where: { id },
            data: { ...roleData, updatedById, ...(permissionIds !== undefined && { permissions: { set: permissionIds.map((permissionId) => ({ id: permissionId })) } }) },
            include: roleInclude,
        })
    }

    async softDeleteRole(id: number, deletedById: number) {
        return prisma.role.update({ where: { id }, data: { deletedAt: new Date(), deletedById, isActive: false } })
    }

    async listPermissions(query: GetPermissionQueryType) {
        const skip = (query.page - 1) * query.limit
        const where = {
            deletedAt: null,
            ...(query.module ? { module: query.module } : {}),
            ...(query.search
                ? { OR: [{ code: { contains: query.search, mode: 'insensitive' as const } }, { module: { contains: query.search, mode: 'insensitive' as const } }, { description: { contains: query.search, mode: 'insensitive' as const } }] }
                : {}),
        }
        const [totalItems, data] = await Promise.all([
            prisma.permission.count({ where }),
            prisma.permission.findMany({ where, skip, take: query.limit, select: { ...permissionSelect, _count: { select: { roles: true } } }, orderBy: [{ module: 'asc' }, { code: 'asc' }] }),
        ])
        return { data, totalItems, page: query.page, limit: query.limit, totalPages: Math.ceil(totalItems / query.limit) }
    }

    async findPermissionById(id: number) {
        return prisma.permission.findFirst({ where: { id, deletedAt: null }, select: { ...permissionSelect, roles: { where: { deletedAt: null }, select: { id: true, code: true, name: true } } } })
    }

    async findPermissionByCode(code: string) {
        return prisma.permission.findFirst({ where: { code, deletedAt: null }, select: permissionSelect })
    }

    async createPermission(data: CreatePermissionBodyType, createdById: number) {
        return prisma.permission.create({ data: { ...data, createdById }, select: permissionSelect })
    }

    async updatePermission(id: number, data: UpdatePermissionBodyType, updatedById: number) {
        return prisma.permission.update({ where: { id }, data: { ...data, updatedById }, select: permissionSelect })
    }

    async softDeletePermission(id: number, deletedById: number) {
        return prisma.permission.update({ where: { id }, data: { deletedAt: new Date(), deletedById }, select: permissionSelect })
    }
}


```

# modules\identity\role-permission\role-permission.routes.ts

| Property | Value |
|----------|-------|
| Path | `modules\identity\role-permission\role-permission.routes.ts` |
| Size | 1,983 bytes |
| Extension | `.ts` |
| Modified | 2026-09-30 09:52:14.973237 |

```typescript
import { Router } from 'express'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import { authGuard } from '@/middlewares/guards/auth.guard'
import { roleGuard } from '@/middlewares/guards/role.guard'
import { RolePermissionController } from './role-permission.controller'
import {
	createPermissionBodySchema,
	createRoleBodySchema,
	getPermissionQuerySchema,
	getRolePermissionQuerySchema,
	permissionParamsSchema,
	roleParamsSchema,
	updatePermissionBodySchema,
	updateRoleBodySchema,
} from './role-permission.schema'

export const rolePermissionRouter = Router()
const controller = new RolePermissionController()

rolePermissionRouter.use(authGuard, roleGuard('ADMIN'))

rolePermissionRouter.get('/', validateRequest({ query: getRolePermissionQuerySchema }), controller.listRoles)
rolePermissionRouter.get('/permissions', validateRequest({ query: getPermissionQuerySchema }), controller.listPermissions)
rolePermissionRouter.get('/permissions/:permissionId', validateRequest({ params: permissionParamsSchema }), controller.getPermission)
rolePermissionRouter.post('/permissions', validateRequest({ body: createPermissionBodySchema }), controller.createPermission)
rolePermissionRouter.put('/permissions/:permissionId', validateRequest({ params: permissionParamsSchema, body: updatePermissionBodySchema }), controller.updatePermission)
rolePermissionRouter.delete('/permissions/:permissionId', validateRequest({ params: permissionParamsSchema }), controller.deletePermission)
rolePermissionRouter.get('/:roleId', validateRequest({ params: roleParamsSchema }), controller.getRole)
rolePermissionRouter.post('/', validateRequest({ body: createRoleBodySchema }), controller.createRole)
rolePermissionRouter.put('/:roleId', validateRequest({ params: roleParamsSchema, body: updateRoleBodySchema }), controller.updateRole)
rolePermissionRouter.delete('/:roleId', validateRequest({ params: roleParamsSchema }), controller.deleteRole)

```

# modules\identity\role-permission\role-permission.schema.ts

| Property | Value |
|----------|-------|
| Path | `modules\identity\role-permission\role-permission.schema.ts` |
| Size | 2,432 bytes |
| Extension | `.ts` |
| Modified | 2026-09-30 08:12:15.024398 |

```typescript
import { z } from 'zod'

export const roleParamsSchema = z.object({
  roleId: z.coerce.number().int().positive('roleId phải là số nguyên dương'),
})

export const getRolePermissionQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().trim().optional(),
})

export const createRoleBodySchema = z.object({
  name: z.string().trim().min(1, 'Tên vai trò không được để trống').max(100),
  code: z
    .string()
    .trim()
    .min(1, 'Mã vai trò không được để trống')
    .max(50)
    .toUpperCase(),
  permissionIds: z.array(z.number().int().positive()).max(100).optional().default([]),
})

export const updateRoleBodySchema = z.object({
  name: z.string().trim().min(1).max(100).optional(),
  isActive: z.boolean().optional(),
  permissionIds: z.array(z.number().int().positive()).max(100).optional(),
})

export const createPermissionBodySchema = z.object({
  code: z.string().trim().min(1).max(150).toUpperCase(),
  module: z.string().trim().min(1).max(100),
  description: z.string().trim().max(1000).nullable().optional(),
})

export const updatePermissionBodySchema = z.object({
  module: z.string().trim().min(1).max(100).optional(),
  description: z.string().trim().max(1000).nullable().optional(),
})

export const permissionParamsSchema = z.object({
  permissionId: z.coerce.number().int().positive('permissionId phải là số nguyên dương'),
})

export const getPermissionQuerySchema = z.object({
  page: z.coerce.number().int().positive().max(100).default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().trim().optional(),
  module: z.string().trim().optional(),
})

export type RoleParamsType = z.infer<typeof roleParamsSchema>
export type CreateRoleBodyType = z.infer<typeof createRoleBodySchema>
export type UpdateRoleBodyType = z.infer<typeof updateRoleBodySchema>
export type GetRolePermissionQueryType = z.infer<typeof getRolePermissionQuerySchema>
export type CreatePermissionBodyType = z.infer<typeof createPermissionBodySchema>
export type UpdatePermissionBodyType = z.infer<typeof updatePermissionBodySchema>
export type PermissionParamsType = z.infer<typeof permissionParamsSchema>
export type GetPermissionQueryType = z.infer<typeof getPermissionQuerySchema>

```

# modules\identity\role-permission\role-permission.service.ts

| Property | Value |
|----------|-------|
| Path | `modules\identity\role-permission\role-permission.service.ts` |
| Size | 2,513 bytes |
| Extension | `.ts` |
| Modified | 2026-09-30 08:12:15.026136 |

```typescript
import { AppError } from '@/common/errors'
import { RolePermissionRepo } from './role-permission.repo'
import {
  CreatePermissionBodyType,
  CreateRoleBodyType,
  GetPermissionQueryType,
  GetRolePermissionQueryType,
  UpdatePermissionBodyType,
  UpdateRoleBodyType,
} from './role-permission.schema'

export class RolePermissionService {
  constructor(private repo = new RolePermissionRepo()) {}

  listRoles(query: GetRolePermissionQueryType) {
    return this.repo.listRoles(query)
  }

  async getRole(id: number) {
    const role = await this.repo.findRoleById(id)
    if (!role) throw new AppError('Vai trò không tồn tại', 404)
    return role
  }

  async createRole(data: CreateRoleBodyType, actorId: number) {
    if (await this.repo.findRoleByCode(data.code)) throw new AppError('Mã vai trò đã tồn tại', 409)
    return this.repo.createRole(data, actorId)
  }

  async updateRole(id: number, data: UpdateRoleBodyType, actorId: number) {
    await this.getRole(id)
    return this.repo.updateRole(id, data, actorId)
  }

  async deleteRole(id: number, actorId: number) {
    const role = await this.getRole(id)
    if (role.code === 'CUSTOMER' || role.code === 'ADMIN') throw new AppError('Không được xóa role hệ thống', 400)
    if (role._count?.users > 0) {
      throw new AppError('Không thể xóa vai trò đang có người dùng sử dụng', 400)
    }
    await this.repo.softDeleteRole(id, actorId)
    return { message: 'Xóa vai trò thành công' }
  }

  listPermissions(query: GetPermissionQueryType) {
    return this.repo.listPermissions(query)
  }

  async getPermission(id: number) {
    const permission = await this.repo.findPermissionById(id)
    if (!permission) throw new AppError('Permission không tồn tại', 404)
    return permission
  }

  async createPermission(data: CreatePermissionBodyType, actorId: number) {
    if (await this.repo.findPermissionByCode(data.code)) throw new AppError('Mã permission đã tồn tại', 409)
    return this.repo.createPermission(data, actorId)
  }

  async updatePermission(id: number, data: UpdatePermissionBodyType, actorId: number) {
    await this.getPermission(id)
    return this.repo.updatePermission(id, data, actorId)
  }

  async deletePermission(id: number, actorId: number) {
    await this.getPermission(id)
    await this.repo.softDeletePermission(id, actorId)
    return { message: 'Xóa permission thành công' }
  }
}

```

# modules\identity\user\user.controller.ts

| Property | Value |
|----------|-------|
| Path | `modules\identity\user\user.controller.ts` |
| Size | 3,358 bytes |
| Extension | `.ts` |
| Modified | 2026-09-30 08:12:15.027889 |

```typescript
import { Request, Response, NextFunction } from 'express'
import { UserService } from './user.service'
import { GetUserQueryType, UpdateUserBodyType, UpdateUserStatusBodyType } from './user.schema'
import { AppError } from '@/common/errors'

export class UserController {
    constructor(private userService = new UserService()) { }

    private getCurrentUser(req: Request) {
        const user = (req as any).user
        const userId = user?.userId ?? user?.id
        if (!userId) throw new AppError('Chưa xác thực người dùng', 401)
        return { userId: Number(userId), roleId: Number(user?.roleId) }
    }

    getListUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const query = req.query as unknown as GetUserQueryType
            const result = await this.userService.listUsers(query)
            return res.status(200).json({
                statusCode: 200,
                data: result,
            })
        }
        catch (error) {
            next(error)
        }
    }

    getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = parseInt(req.params.userId)
            const currentUser = this.getCurrentUser(req)
            const result = await this.userService.getUserById(userId, currentUser)
            return res.status(200).json({
                statusCode: 200,
                data: result,
            })
        }
        catch (error) {
            next(error)
        }
    }

    updateUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = parseInt(req.params.userId)
            const currentUser = this.getCurrentUser(req)
            const data: UpdateUserBodyType = req.body
            const result = await this.userService.updateUser(userId, currentUser, data)
            return res.status(200).json({
                statusCode: 200,
                message: 'Cập nhật thông tin thành công',
                data: result,
            })
        }
        catch (error) {
            next(error)
        }
    }

    updateStatus = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = parseInt(req.params.userId)
            const currentUser = this.getCurrentUser(req)
            const data: UpdateUserStatusBodyType = req.body
            const result = await this.userService.updateStatus(userId, currentUser.userId, data)
            return res.status(200).json({
                statusCode: 200,
                message: 'Cập nhật trạng thái thành công',
                data: result,
            })
        }
        catch (error) {
            next(error)
        }
    }

    deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = parseInt(req.params.userId)
            const currentUser = this.getCurrentUser(req)
            await this.userService.deleteUser(userId, currentUser.userId)
            return res.status(200).json({
                statusCode: 200,
                message: 'Xóa người dùng thành công',
            })
        }
        catch (error) {
            next(error)
        }
    }
}
```

# modules\identity\user\user.repo.ts

| Property | Value |
|----------|-------|
| Path | `modules\identity\user\user.repo.ts` |
| Size | 4,464 bytes |
| Extension | `.ts` |
| Modified | 2026-10-11 17:23:08.202465 |

```typescript
import { prisma } from '@/database/prisma'
import { GetUserQueryType, UpdateUserBodyType, UpdateUserStatusBodyType} from './user.schema'

export class UserRepo {
    async list(query: GetUserQueryType) {
        const skip = (query.page - 1) * query.limit
        const take = query.limit

        const where: any = { deletedAt: null }
        if (query.status) where.status = query.status
        if (query.roleId) where.roleId = query.roleId
        if (query.search) {
            where.OR = [
                { email: { contains: query.search, mode: 'insensitive' } },
                { fullName: { contains: query.search, mode: 'insensitive' } },
            ]
        }

        const [totalItems, data] = await Promise.all([
            prisma.user.count({ where }),
            prisma.user.findMany({
                where,
                skip,
                take,
                select: {
                    id: true,
                    email: true,
                    fullName: true,
                    phoneNumber: true,
                    avatarUrl: true,
                    status: true,
                    role: { select: { id: true, name: true, code: true } },
                    createdAt: true,
                },
                orderBy: { createdAt: 'desc' },
            }),
        ])

        return {
            data,
            totalItems,
            page: query.page,
            limit: query.limit,
            totalPages: Math.ceil(totalItems / query.limit),
        }
    }

    //Lấy chi tiết 1 User
    async findById(id: number) {
        return prisma.user.findFirst({
            where: { id, deletedAt: null },
            select: {
                id: true,
                email: true,
                fullName: true,
                phoneNumber: true,
                avatarUrl: true,
                status: true,
                role: { select: { id: true, name: true, code: true } },
                shippingAddresses: true,
                createdAt: true,
                updatedAt: true,
            },
        })
    }

    // 3. Tìm user bằng email
    async findByEmail(email: string) {
        return prisma.user.findFirst({
            where: { email, deletedAt: null },
        })
    }

    // 4. Cập nhật hồ sơ
    async updateUser({
        id,
        updatedById,
        data,
    }: {
        id: number
        updatedById: number
        data: UpdateUserBodyType
    }) {
        return prisma.user.update({
            where: { id },
            data: {
                ...data,
                updatedById,
            },
            select: {
                id: true,
                email: true,
                fullName: true,
                phoneNumber: true,
                avatarUrl: true,
                status: true,
                roleId: true,
                role: { select: { id: true, name: true, code: true } },
                rewardPoints: true,
                createdAt: true,
            },
        })
    }

    // 5. Cập nhật trạng thái
    async updateStatus({
        id,
        updatedById,
        data,
    }: {
        id: number
        updatedById: number
        data: UpdateUserStatusBodyType
    }) {
        return prisma.$transaction(async (tx) => {
            if (data.status === 'BLOCKED' || data.status === 'INACTIVE') {
                await tx.deviceSession.updateMany({
                    where: { userId: id, isActive: true },
                    data: { isActive: false },
                })
            }
            return tx.user.update({
                where: { id },
                data: {
                    status: data.status,
                    updatedById,
                },
            })
        })
    }

    // 6. Xóa mềm (Soft Delete)
    async deleteUser({ id, deletedById }: { id: number; deletedById: number }) {
        return prisma.$transaction(async (tx) => {
            await tx.deviceSession.updateMany({
                where: { userId: id, isActive: true },
                data: { isActive: false },
            })
            return tx.user.update({
                where: { id },
                data: {
                    deletedAt: new Date(),
                    deletedById,
                },
            })
        })
    }
}
```

# modules\identity\user\user.routes.ts

| Property | Value |
|----------|-------|
| Path | `modules\identity\user\user.routes.ts` |
| Size | 1,350 bytes |
| Extension | `.ts` |
| Modified | 2026-09-30 08:12:15.031760 |

```typescript
import { Router } from 'express'
import { UserController } from './user.controller'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import { authGuard } from '@/middlewares/guards/auth.guard'
import { roleGuard } from '@/middlewares/guards/role.guard'
import { getUserQuerySchema, updateUserBodySchema, updateUserStatusBodySchema, userParamsSchema } from './user.schema'

export const userRouter = Router()
const controller = new UserController()

userRouter.use(authGuard)

// Danh sách user: chỉ ADMIN / STAFF xem được
userRouter.get('/', roleGuard('ADMIN'), validateRequest({ query: getUserQuerySchema }), controller.getListUsers)

// Xem chi tiết user
userRouter.get('/:userId', validateRequest({ params: userParamsSchema }), controller.getUserById)

// Cập nhật thông tin user
userRouter.put('/:userId', validateRequest({ params: userParamsSchema, body: updateUserBodySchema }), controller.updateUser)

// Cập nhật trạng thái (ACTIVE, BLOCKED, INACTIVE): chỉ ADMIN
userRouter.patch('/:userId/status', roleGuard('ADMIN'), validateRequest({ params: userParamsSchema, body: updateUserStatusBodySchema }), controller.updateStatus)

// Xóa user: chỉ ADMIN
userRouter.delete('/:userId', roleGuard('ADMIN'), validateRequest({ params: userParamsSchema }), controller.deleteUser)


```

# modules\identity\user\user.schema.ts

| Property | Value |
|----------|-------|
| Path | `modules\identity\user\user.schema.ts` |
| Size | 1,204 bytes |
| Extension | `.ts` |
| Modified | 2026-09-30 08:12:15.033522 |

```typescript
import { z } from 'zod'

export const userParamsSchema = z.object({
    userId: z.coerce.number().int().positive('userId phải là số nguyên dương'),
})

export const getUserQuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().default(10),
    search: z.string().optional(),
    status: z.enum(['ACTIVE', 'INACTIVE', 'BLOCKED']).optional(),
    roleId: z.coerce.number().int().positive().optional(),
})

export const updateUserBodySchema = z.object({
    fullName: z.string().trim().min(1).max(100).optional(),
    phoneNumber: z.string().trim().min(1, 'Số điện thoại là bắt buộc').max(50).optional(),
    avatarUrl: z.string().url('Avatar không hợp lệ').optional().nullable(),
})

export const updateUserStatusBodySchema = z.object({
    status: z.enum(['ACTIVE', 'INACTIVE', 'BLOCKED']),
})      

export type UserParamsType = z.infer<typeof userParamsSchema>
export type GetUserQueryType = z.infer<typeof getUserQuerySchema>
export type UpdateUserBodyType = z.infer<typeof updateUserBodySchema>
export type UpdateUserStatusBodyType = z.infer<typeof updateUserStatusBodySchema>
```

# modules\identity\user\user.service.ts

| Property | Value |
|----------|-------|
| Path | `modules\identity\user\user.service.ts` |
| Size | 2,539 bytes |
| Extension | `.ts` |
| Modified | 2026-09-30 08:12:15.035199 |

```typescript
import { UserRepo } from './user.repo'
import { GetUserQueryType, UpdateUserBodyType, UpdateUserStatusBodyType } from './user.schema'
import { AppError, ForbiddenError, NotFoundError } from '@/common/errors'
import { prisma } from '@/database/prisma'

export class UserService {
    private userRepo = new UserRepo()

    private async isAdmin(roleId: number) {
        if (!roleId) return false
        const role = await prisma.role.findFirst({ where: { id: roleId, isActive: true, deletedAt: null } })
        return role?.code === 'ADMIN'
    }

    async listUsers(query: GetUserQueryType) {
        return this.userRepo.list(query)
    }

    async getUserById(userId: number, currentUser: { userId: number; roleId: number }) {
        if (currentUser.userId !== userId && !(await this.isAdmin(currentUser.roleId))) {
            throw new ForbiddenError('Bạn không có quyền xem thông tin người dùng này')
        }
        const user = await this.userRepo.findById(userId)
        if (!user) {
            throw new NotFoundError('Người dùng không tồn tại')
        }
        return user
    }

    async updateUser(userId: number, currentUser: { userId: number; roleId: number }, data: UpdateUserBodyType) {
        if (currentUser.userId !== userId && !(await this.isAdmin(currentUser.roleId))) {
            throw new ForbiddenError('Bạn không có quyền cập nhật thông tin người dùng này')
        }
        const user = await this.userRepo.findById(userId)
        if (!user) {
            throw new NotFoundError('Người dùng không tồn tại')
        }
        return this.userRepo.updateUser({ id: userId, updatedById: currentUser.userId, data })
    }
    async updateStatus(userId: number, CurrentUserId: number, data: UpdateUserStatusBodyType) {
        const user = await this.userRepo.findById(userId)
        if (!user) throw new NotFoundError('Người dùng không tồn tại')
        return this.userRepo.updateStatus({ id: userId, updatedById: CurrentUserId, data })
    }
    async deleteUser(userId: number, CurrentUserId: number) {
        if (userId === CurrentUserId) {
            throw new AppError('Bạn không thể tự xóa tài khoản của chính mình', 400)
        }
        const user = await this.userRepo.findById(userId)
        if (!user) throw new NotFoundError('Người dùng không tồn tại')
        return this.userRepo.deleteUser({ id: userId, deletedById: CurrentUserId })
    }   
}

```

# modules\inventory-sale\flash-sale\flash-sale.controller.ts

| Property | Value |
|----------|-------|
| Path | `modules\inventory-sale\flash-sale\flash-sale.controller.ts` |
| Size | 2,442 bytes |
| Extension | `.ts` |
| Modified | 2026-10-01 17:02:22.992301 |

```typescript
import { Request, Response, NextFunction } from 'express'
import { FlashSaleService } from './flash-sale.service'
import {
  CreateFlashSaleBodyType,
  GetFlashSaleQueryType,
  UpdateFlashSaleBodyType,
} from './flash-sale.schema'

export class FlashSaleController {
  constructor(private flashSaleService = new FlashSaleService()) {}

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query as unknown as GetFlashSaleQueryType
      const result = await this.flashSaleService.list(query)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  findActive = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.flashSaleService.findActiveCampaigns()
      return res.status(200).json({ statusCode: 200, data })
    } catch (err) {
      next(err)
    }
  }

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const campaignId = Number(req.params.campaignId)
      const data = await this.flashSaleService.findById(campaignId)
      return res.status(200).json({ statusCode: 200, data })
    } catch (err) {
      next(err)
    }
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as CreateFlashSaleBodyType
      const data = await this.flashSaleService.create(body)
      return res.status(201).json({
        statusCode: 201,
        message: 'Tạo chiến dịch Flash Sale thành công',
        data,
      })
    } catch (err) {
      next(err)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const campaignId = Number(req.params.campaignId)
      const body = req.body as UpdateFlashSaleBodyType
      const data = await this.flashSaleService.update(campaignId, body)
      return res.status(200).json({
        statusCode: 200,
        message: 'Cập nhật chiến dịch Flash Sale thành công',
        data,
      })
    } catch (err) {
      next(err)
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const campaignId = Number(req.params.campaignId)
      const result = await this.flashSaleService.delete(campaignId)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }
}
```

# modules\inventory-sale\flash-sale\flash-sale.repo.ts

| Property | Value |
|----------|-------|
| Path | `modules\inventory-sale\flash-sale\flash-sale.repo.ts` |
| Size | 6,695 bytes |
| Extension | `.ts` |
| Modified | 2026-10-09 10:38:13.312589 |

```typescript
import { prisma } from '@/database/prisma'
import {CreateFlashSaleBodyType,GetFlashSaleQueryType,UpdateFlashSaleBodyType,} from './flash-sale.schema'

const flashSaleItemsInclude = {
    items: {
        include: {
            variant: {
                select: {
                    sku: true,
                    stockQuantity: true,
                    originalPrice: true,
                    sellingPrice: true,
                    product: {
                        select: {
                            defaultName: true,
                        },
                    },
                },
            },
        },
    },
} as const

export class FlashSaleRepo {
    async list(query: GetFlashSaleQueryType) {
        const skip = (query.page - 1) * query.limit
        const take = query.limit

        const where = {
            deletedAt: null,
            ...(query.isActive !== undefined
                ? { isActive: query.isActive }
                : {}),
        }

        const [totalItems, data] = await Promise.all([
            prisma.flashSaleCampaign.count({
                where,
            }),

            prisma.flashSaleCampaign.findMany({
                where,
                skip,
                take,
                include: flashSaleItemsInclude,
                orderBy: {
                    createdAt: 'desc',
                },
            }),
        ])

        return {
            data,
            totalItems,
            page: query.page,
            limit: query.limit,
            totalPages: Math.ceil(
                totalItems / query.limit
            ),
        }
    }

    async findActiveCampaigns() {
        const now = new Date()

        return prisma.flashSaleCampaign.findMany({
            where: {
                deletedAt: null,
                isActive: true,
                startTime: {
                    lte: now,
                },
                endTime: {
                    gte: now,
                },
            },

            include: flashSaleItemsInclude,

            orderBy: {
                endTime: 'asc',
            },
        })
    }

    async findById(campaignId: number) {
        return prisma.flashSaleCampaign.findFirst({
            where: {
                id: campaignId,
                deletedAt: null,
            },

            include: flashSaleItemsInclude,
        })
    }

    async findVariantsForFlashSale(
        variantIds: number[]
    ) {
        return prisma.productVariant.findMany({
            where: {
                id: {
                    in: variantIds,
                },
                deletedAt: null,
            },

            select: {
                id: true,
                sku: true,
                stockQuantity: true,
                sellingPrice: true,
            },
        })
    }

    async create(data: CreateFlashSaleBodyType) {
        const { items, ...campaignData } = data

        return prisma.flashSaleCampaign.create({
            data: {
                ...campaignData,

                items: {
                    create: items.map((item) => ({
                        variantId: item.variantId,
                        flashSalePrice: item.flashSalePrice,
                        promoQuantity: item.promoQuantity,
                        soldQuantity: 0,
                    })),
                },
            },

            include: flashSaleItemsInclude,
        })
    }

    async update(
        campaignId: number,
        data: UpdateFlashSaleBodyType
    ) {
        const { items, ...campaignData } = data

        return prisma.$transaction(async (tx) => {
            if (items !== undefined) {

                const existingItems =
                    await tx.flashSaleItem.findMany({
                        where: {
                            campaignId,
                        },

                        select: {
                            variantId: true,
                            soldQuantity: true,
                        },
                    })

                const soldQuantityMap = new Map(
                    existingItems.map((item) => [
                        item.variantId,
                        item.soldQuantity,
                    ])
                )

                const incomingVariantIds =
                    items.map((item) => item.variantId)

                await tx.flashSaleItem.deleteMany({
                    where: {
                        campaignId,

                        variantId: {
                            notIn: incomingVariantIds,
                        },
                    },
                })


                await Promise.all(
                    items.map((item) => {
                        const soldQuantity = soldQuantityMap.get(item.variantId) ?? 0;

                        return tx.flashSaleItem.upsert({
                            where: {
                                campaignId_variantId: { campaignId, variantId: item.variantId },
                            },
                            update: {
                                flashSalePrice: item.flashSalePrice,
                                promoQuantity: item.promoQuantity,
                                soldQuantity,
                            },
                            create: {
                                campaignId,
                                variantId: item.variantId,
                                flashSalePrice: item.flashSalePrice,
                                promoQuantity: item.promoQuantity,
                                soldQuantity: 0,
                            },
                        });
                    })
                );
            }

            return tx.flashSaleCampaign.update({
                where: {
                    id: campaignId,
                },

                data: campaignData,

                include: flashSaleItemsInclude,
            })
        })
    }

    async delete(
        campaignId: number,
        isHard = false
    ) {
        if (isHard) {
            return prisma.flashSaleCampaign.delete({
                where: {
                    id: campaignId,
                },
            })
        }

        return prisma.flashSaleCampaign.update({
            where: {
                id: campaignId,
            },

            data: {
                deletedAt: new Date(),
            },
        })
    }
}
```

# modules\inventory-sale\flash-sale\flash-sale.routes.ts

| Property | Value |
|----------|-------|
| Path | `modules\inventory-sale\flash-sale\flash-sale.routes.ts` |
| Size | 1,549 bytes |
| Extension | `.ts` |
| Modified | 2026-10-01 17:02:22.993302 |

```typescript
import { Router } from 'express'
import { FlashSaleController } from './flash-sale.controller'
import { authGuard } from '@/middlewares/guards/auth.guard'
import { requireAdmin } from '@/middlewares/guards/role.guard'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import {
  createFlashSaleBodySchema,
  getFlashSaleParamsSchema,
  getFlashSaleQuerySchema,
  updateFlashSaleBodySchema,
} from './flash-sale.schema'

export const flashSaleRouter = Router()
const controller = new FlashSaleController()

// Public routes (Khách hàng & người dùng có thể xem chiến dịch đang mở và danh sách)
flashSaleRouter.get('/active', controller.findActive)
flashSaleRouter.get(
  '/',
  validateRequest({ query: getFlashSaleQuerySchema }),
  controller.list,
)
flashSaleRouter.get(
  '/:campaignId',
  validateRequest({ params: getFlashSaleParamsSchema }),
  controller.findById,
)

// Admin routes (Bắt buộc phải đăng nhập và có quyền ADMIN mới được tạo/sửa/xoá)
flashSaleRouter.post(
  '/',
  authGuard,
  requireAdmin,
  validateRequest({ body: createFlashSaleBodySchema }),
  controller.create,
)

flashSaleRouter.put(
  '/:campaignId',
  authGuard,
  requireAdmin,
  validateRequest({
    params: getFlashSaleParamsSchema,
    body: updateFlashSaleBodySchema,
  }),
  controller.update,
)

flashSaleRouter.delete(
  '/:campaignId',
  authGuard,
  requireAdmin,
  validateRequest({ params: getFlashSaleParamsSchema }),
  controller.delete,
)
```

# modules\inventory-sale\flash-sale\flash-sale.schema.ts

| Property | Value |
|----------|-------|
| Path | `modules\inventory-sale\flash-sale\flash-sale.schema.ts` |
| Size | 3,446 bytes |
| Extension | `.ts` |
| Modified | 2026-10-01 17:02:22.995302 |

```typescript
import { z } from 'zod'

export const flashSaleItemPayloadSchema = z.object({
    variantId: z
        .number()
        .int()
        .positive('variantId phải là số nguyên dương'),

    flashSalePrice: z
        .number()
        .positive('Giá flash sale phải lớn hơn 0'),

    promoQuantity: z
        .number()
        .int()
        .positive('Số lượng khuyến mãi phải lớn hơn 0'),
})

const flashSaleItemsSchema = z
    .array(flashSaleItemPayloadSchema)
    .min(1, 'Phải có ít nhất 1 sản phẩm trong Flash Sale')
    .refine(
        (items) => {
            const variantIds = items.map((item) => item.variantId)

            return new Set(variantIds).size === variantIds.length
        },
        {
            message: 'Không được có sản phẩm trùng trong Flash Sale',
        }
    )

export const getFlashSaleQuerySchema = z.object({
    page: z.coerce
        .number()
        .int()
        .positive()
        .default(1),

    limit: z.coerce
        .number()
        .int()
        .positive()
        .default(10),

    isActive: z
        .enum(['true', 'false'])
        .transform((value) => value === 'true')
        .optional(),
})

export const getFlashSaleParamsSchema = z.object({
    campaignId: z.coerce
        .number()
        .int()
        .positive('campaignId phải là số nguyên dương'),
})

export const createFlashSaleBodySchema = z
    .object({
        name: z
            .string()
            .min(1, 'Tên chiến dịch không được để trống')
            .max(255),

        bannerUrl: z
            .string()
            .max(1000)
            .optional(),

        startTime: z.coerce.date({
            required_error: 'Thời gian bắt đầu là bắt buộc',
        }),

        endTime: z.coerce.date({
            required_error: 'Thời gian kết thúc là bắt buộc',
        }),

        isActive: z
            .boolean()
            .optional()
            .default(true),

        items: flashSaleItemsSchema,
    })
    .refine(
        (data) => data.startTime < data.endTime,
        {
            message: 'Thời gian kết thúc phải sau thời gian bắt đầu',
            path: ['endTime'],
        }
    )

export const updateFlashSaleBodySchema = z
  .object({
    name: z.string().min(1, 'Tên chiến dịch không được để trống').max(255).optional(),
    bannerUrl: z.string().max(1000).optional(),
    startTime: z.coerce.date().optional(),
    endTime: z.coerce.date().optional(),
    isActive: z.boolean().optional(),
    items: flashSaleItemsSchema.optional(),
  })
  .refine(
    (data) => {
      if (data.startTime && data.endTime) {
        return data.startTime < data.endTime
      }
      return true
    },
    {
      message: 'Thời gian kết thúc phải sau thời gian bắt đầu',
      path: ['endTime'],
    },
  )

export type FlashSaleItemPayloadType =
    z.infer<typeof flashSaleItemPayloadSchema>

export type GetFlashSaleQueryType =
    z.infer<typeof getFlashSaleQuerySchema>

export type GetFlashSaleParamsType =
    z.infer<typeof getFlashSaleParamsSchema>

export type CreateFlashSaleBodyType =
    z.infer<typeof createFlashSaleBodySchema>

export type UpdateFlashSaleBodyType =
    z.infer<typeof updateFlashSaleBodySchema>
```

# modules\inventory-sale\flash-sale\flash-sale.service.ts

| Property | Value |
|----------|-------|
| Path | `modules\inventory-sale\flash-sale\flash-sale.service.ts` |
| Size | 5,154 bytes |
| Extension | `.ts` |
| Modified | 2026-09-30 08:12:15.044166 |

```typescript
import { FlashSaleRepo } from './flash-sale.repo'
import {
    CreateFlashSaleBodyType,
    GetFlashSaleQueryType,
    UpdateFlashSaleBodyType,
} from './flash-sale.schema'
import { AppError } from '@/common/errors'

export class FlashSaleService {
    constructor(
        private flashSaleRepo = new FlashSaleRepo()
    ) {}

    async list(query: GetFlashSaleQueryType) {
        return this.flashSaleRepo.list(query)
    }

    async findActiveCampaigns() {
        return this.flashSaleRepo.findActiveCampaigns()
    }

    async findById(campaignId: number) {
        const campaign =
            await this.flashSaleRepo.findById(campaignId)

        if (!campaign) {
            throw new AppError(
                'Chiến dịch Flash Sale không tồn tại hoặc đã bị xóa',
                404
            )
        }

        return campaign
    }

    private validateUniqueVariantIds(
        items: {
            variantId: number
        }[]
    ) {
        const variantIds =
            items.map((item) => item.variantId)

        if (
            new Set(variantIds).size !==
            variantIds.length
        ) {
            throw new AppError(
                'Không được có sản phẩm trùng trong Flash Sale',
                422
            )
        }
    }

    private async validateVariants(
        items: {
            variantId: number
            promoQuantity: number
            flashSalePrice: number
        }[]
    ) {
        this.validateUniqueVariantIds(items)

        const variantIds =
            items.map((item) => item.variantId)

        const variants =
            await this.flashSaleRepo.findVariantsForFlashSale(
                variantIds
            )

        const variantMap = new Map(
            variants.map((variant) => [
                variant.id,
                variant,
            ])
        )

        for (const item of items) {
            const variant =
                variantMap.get(item.variantId)

            if (!variant) {
                throw new AppError(
                    `Biến thể SKU ID ${item.variantId} không tồn tại`,
                    404
                )
            }

            if (
                variant.stockQuantity <
                item.promoQuantity
            ) {
                throw new AppError(
                    `Tồn kho SKU ${variant.sku} không đủ. Tồn kho hiện có: ${variant.stockQuantity}, cấu hình sale: ${item.promoQuantity}`,
                    422
                )
            }

            if (
                item.flashSalePrice >=
                Number(variant.sellingPrice)
            ) {
                throw new AppError(
                    `Giá Flash Sale của SKU ${variant.sku} phải thấp hơn giá bán hiện tại`,
                    422
                )
            }
        }
    }

    async create(
        data: CreateFlashSaleBodyType
    ) {
        await this.validateVariants(data.items)

        return this.flashSaleRepo.create(data)
    }

    async update(
        campaignId: number,
        data: UpdateFlashSaleBodyType
    ) {
        const campaign =
            await this.findById(campaignId)


        const startTime =
            data.startTime ??
            campaign.startTime

        const endTime =
            data.endTime ??
            campaign.endTime

        if (startTime >= endTime) {
            throw new AppError(
                'Thời gian kết thúc phải sau thời gian bắt đầu',
                422
            )
        }

        if (data.items !== undefined) {
            await this.validateVariants(
                data.items
            )

            const existingItemMap =
                new Map(
                    campaign.items.map((item) => [
                        item.variantId,
                        item,
                    ])
                )

            for (const item of data.items) {
                const existingItem =
                    existingItemMap.get(
                        item.variantId
                    )

                if (
                    existingItem &&
                    item.promoQuantity <
                        existingItem.soldQuantity
                ) {
                    throw new AppError(
                        `Không thể giảm số lượng khuyến mãi của variant ${item.variantId} xuống ${item.promoQuantity} vì đã bán ${existingItem.soldQuantity}`,
                        422
                    )
                }
            }
        }

        return this.flashSaleRepo.update(
            campaignId,
            data
        )
    }

    async delete(campaignId: number) {
        await this.findById(campaignId)

        await this.flashSaleRepo.delete(
            campaignId
        )

        return {
            message:
                'Xóa chiến dịch Flash Sale thành công',
        }
    }
}
```

# modules\inventory-sale\inventory-sale.routes.ts

| Property | Value |
|----------|-------|
| Path | `modules\inventory-sale\inventory-sale.routes.ts` |
| Size | 209 bytes |
| Extension | `.ts` |
| Modified | 2026-10-01 17:02:22.996302 |

```typescript
import { Router } from 'express'

import { flashSaleRouter } from './flash-sale/flash-sale.routes'

export const inventorySaleRouter = Router()


inventorySaleRouter.use('/flash-sales', flashSaleRouter)
```

# modules\loyalty-engage\chat\chat.controller.ts

| Property | Value |
|----------|-------|
| Path | `modules\loyalty-engage\chat\chat.controller.ts` |
| Size | 5,278 bytes |
| Extension | `.ts` |
| Modified | 2026-10-11 16:52:36.699553 |

```typescript
// src/modules/loyalty-engage/chat/chat.controller.ts
import { NextFunction, Request, Response } from 'express'
import { ChatService } from './chat.service'
import type { GetChatHistoryQueryType } from './chat.schema'

export class ChatController {
  constructor(private chatService = new ChatService()) {}

  /** POST /chat/messages – Gửi tin nhắn mới */
  sendMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const senderId = req.user!.userId
      const data = await this.chatService.sendMessage(senderId, req.body)
      return res.status(201).json({ statusCode: 201, ...data })
    } catch (error) {
      next(error)
    }
  }

  getActiveChat = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const data = await this.chatService.getOrCreateActiveChat(userId)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  getShopConversationList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.chatService.getShopConversationList(req.user!.userId)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  closeConversation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const chatId = Number(req.params.chatId)
      const data = await this.chatService.closeConversation(req.user!.userId, chatId)
      return res.status(200).json({ statusCode: 200, message: 'Đã đóng cuộc trò chuyện', ...data })
    } catch (error) {
      next(error)
    }
  }

  /** GET /chat/messages?chatId=&page=&limit=&cursor= – Lịch sử hội thoại */
  getChatHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.chatService.getChatHistory(
        req.user!.userId,
        req.query as unknown as GetChatHistoryQueryType,
      )
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  /** POST /chat/messages/read – Đánh dấu đã đọc */
  markAsRead = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const receiverId = req.user!.userId
      const data = await this.chatService.markAsRead(receiverId, req.body)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  /** GET /chat/messages/unread – Số tin nhắn chưa đọc */
  getUnreadCount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const data = await this.chatService.getUnreadCount(userId)
      return res.status(200).json({ statusCode: 200, data })
    } catch (error) {
      next(error)
    }
  }

  /** GET /chat/conversations – Danh sách cuộc trò chuyện */
  getConversationList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const data = await this.chatService.getConversationList(userId)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  /** POST /chat/sessions – Lưu/cập nhật socket session */
  upsertSocketSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.chatService.upsertSocketSession(req.body)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  /** POST /chat/sessions/heartbeat – Gia hạn socket session qua heartbeat ping */
  extendSocketSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.chatService.extendSocketSession(req.body.socketId)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  /** DELETE /chat/sessions – Xoá socket session khi disconnect */
  removeSocketSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.chatService.removeSocketSession(req.body)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  /** GET /chat/sessions/:userId – Lấy sessions của một user */
  getSocketSessionsByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.userId)
      const data = await this.chatService.getSocketSessionsByUser(userId)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  /** GET /chat/sessions/:userId/online – Kiểm tra user online */
  checkUserOnline = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.userId)
      const data = await this.chatService.checkUserOnline(userId)
      return res.status(200).json({ statusCode: 200, data })
    } catch (error) {
      next(error)
    }
  }
}

```

# modules\loyalty-engage\chat\chat.repo.ts

| Property | Value |
|----------|-------|
| Path | `modules\loyalty-engage\chat\chat.repo.ts` |
| Size | 10,522 bytes |
| Extension | `.ts` |
| Modified | 2026-10-11 16:52:36.701072 |

```typescript
import { prisma } from '@/database/prisma'
import { redisClient } from '@/database/redis'
import { createLogger } from '@/common/logger'
import { ChatStatus } from '@prisma/client'

const logger = createLogger('ChatRepo')
const WS_SESSION_PREFIX = 'ws:sessions:user:'
const WS_SOCKET_PREFIX = 'ws:sessions:socket:'
const WS_SESSION_TTL_SECONDS = 60

export class ChatRepo {
  async createChat(userId: number) {
    return prisma.chat.create({
      data: {
        userId,
        status: ChatStatus.OPEN,
        startedAt: new Date(),
      },
      include: {
        messages: true,
      },
    })
  }

  async findActiveChatByUserId(userId: number) {
    return prisma.chat.findFirst({
      where: { userId, status: { in: [ChatStatus.OPEN, ChatStatus.WAITING] } },
      orderBy: { createdAt: 'desc' },
      include: {
        messages: {
          take: 1,
          orderBy: { sendDate: 'desc' },
        },
      },
    })
  }

  async findChatById(chatId: number) {
    return prisma.chat.findUnique({
      where: { id: chatId },
      select: { id: true, userId: true, status: true },
    })
  }

  async findUserRoleCode(userId: number) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: { select: { code: true, isActive: true, deletedAt: true } } },
    })
    return user?.role?.isActive && !user.role.deletedAt ? user.role.code : null
  }

  async closeChat(chatId: number) {
    return prisma.chat.update({
      where: { id: chatId },
      data: {
        status: ChatStatus.CLOSED,
        endedAt: new Date(),
      },
    })
  }

  async createMessage(data: { chatId: number; senderId: number; content: string }) {
    return prisma.$transaction(async (tx) => {
      const message = await tx.message.create({
        data: {
          chatId: data.chatId,
          senderId: data.senderId,
          content: data.content,
          isRead: false,
          sendDate: new Date(),
        },
        include: {
          sender: { select: { id: true, fullName: true, avatarUrl: true } },
          chat: { select: { userId: true } },
        },
      })

      await tx.chat.update({
        where: { id: data.chatId },
        data: { updatedAt: new Date() },
      })

      return message
    })
  }

  async findConversation(chatId: number, cursor: number | null, take: number) {
    const where = {
      chatId,
      ...(cursor ? { id: { lt: cursor } } : {}),
    }

    const messages = await prisma.message.findMany({
      where,
      orderBy: { id: 'desc' },
      take: take + 1,
      include: {
        sender: { select: { id: true, fullName: true, avatarUrl: true } },
      },
    })

    const hasMore = messages.length > take
    const data = hasMore ? messages.slice(0, take) : messages
    const nextCursor = hasMore && data.length > 0 ? data[data.length - 1].id : null

    return {
      data: data.reverse(),
      nextCursor,
      hasMore,
    }
  }

  async markMessagesAsRead(chatId: number, currentUserId: number) {
    const chat = await prisma.chat.findUnique({ where: { id: chatId }})
    if (!chat) return { count: 0 }

    // Nếu currentUserId là chủ chat -> mark read tin nhắn của shop (senderId != currentUserId)
    // Cần tinh chỉnh logic này tùy thuộc vào việc bạn gán senderId vào Message ntn.
    return prisma.message.updateMany({
      where: { chatId, isRead: false, senderId: { not: currentUserId } },
      data: { isRead: true },
    })
  }

  async findConversationList(userId?: number) {
    return prisma.chat.findMany({
      where: {
        status: { not: ChatStatus.CLOSED },
        ...(userId ? { userId } : {}),
      },
      include: {
        user: { select: { id: true, fullName: true, avatarUrl: true } },
        messages: {
          take: 1,
          orderBy: { sendDate: 'desc' },
          include: { sender: { select: { id: true, fullName: true } } },
        }
      },
      orderBy: { updatedAt: 'desc' }
    })
  }

  /** Đếm số tin nhắn chưa đọc của user */
  async countUnread(userId: number) {
    // Đếm những tin nhắn chưa đọc thuộc phiên chat của user (nhưng do người khác gửi, VD: Admin gửi cho user)
    return prisma.message.count({ 
      where: { 
        chat: { userId },
        senderId: { not: userId }, // Đảm bảo đếm tin nhắn không phải của chính mình
        isRead: false 
      } 
    })
  }



  // ─────────────── WebSocket Session Management (Redis Only) ───────────────

  /**
   * Lưu hoặc cập nhật socket session khi user kết nối.
   *
   * OOM & GHOST SESSION FIX:
   *   - Zero PostgreSQL interaction (eliminates DB connection exhaustion & table bloat).
   *   - Redis Hash per user: `ws:sessions:user:{userId}` -> `{ [socketId]: connectedAt }`.
   *   - Strict TTL (60s) on both Hash and Reverse-lookup keys.
   *   - If Node.js crashes or client disconnects unexpectedly, Redis expires ghost sessions within 60s.
   */
  async upsertSocketSession(socketId: string, userId: number) {
    const userKey = `${WS_SESSION_PREFIX}${userId}`
    const socketKey = `${WS_SOCKET_PREFIX}${socketId}`
    const connectedAt = Date.now().toString()

    const pipeline = redisClient.pipeline()
    pipeline.hset(userKey, socketId, connectedAt)
    pipeline.expire(userKey, WS_SESSION_TTL_SECONDS)
    pipeline.set(socketKey, userId.toString(), 'EX', WS_SESSION_TTL_SECONDS)

    const results = await pipeline.exec()
    if (results) {
      for (const [err] of results) {
        if (err) {
          logger.error({ err, socketId, userId }, 'upsertSocketSession: Redis pipeline error')
          throw err
        }
      }
    }

    logger.info(
      { socketId, userId, ttl: WS_SESSION_TTL_SECONDS },
      'upsertSocketSession: Redis session persisted with strict 60s TTL',
    )

    return { socketId, userId, connectedAt: new Date(parseInt(connectedAt, 10)) }
  }

  /**
   * Gia hạn thời gian sống (TTL) của socket session khi nhận heartbeat/ping từ client.
   *
   * REAL-TIME OFFLINE DETECTION FIX:
   *   - Resets TTL of reverse-lookup key (`ws:sessions:socket:{socketId}`) to 60 seconds.
   *   - Resets TTL of user session hash (`ws:sessions:user:{userId}`) to 60 seconds.
   *   - Updates last heartbeat timestamp in user hash.
   *   - If heartbeat pings cease (client disconnect, crash, tab close), keys automatically
   *     expire within 60s, preventing 24-hour ghost sessions.
   *
   * @param socketId - ID của WebSocket socket session
   */
  async extendSocketSession(socketId: string) {
    const socketKey = `${WS_SOCKET_PREFIX}${socketId}`

    const userIdStr = await redisClient.get(socketKey)
    if (!userIdStr) {
      logger.debug(
        { socketId },
        'extendSocketSession: socket key not found in Redis (already expired or disconnected)',
      )
      return null
    }

    const userId = parseInt(userIdStr, 10)
    const userKey = `${WS_SESSION_PREFIX}${userId}`
    const lastHeartbeatAt = Date.now().toString()

    const pipeline = redisClient.pipeline()
    pipeline.expire(socketKey, WS_SESSION_TTL_SECONDS)
    pipeline.expire(userKey, WS_SESSION_TTL_SECONDS)
    pipeline.hset(userKey, socketId, lastHeartbeatAt)

    const results = await pipeline.exec()
    if (results) {
      for (const [err] of results) {
        if (err) {
          logger.error({ err, socketId, userId }, 'extendSocketSession: Redis pipeline error')
          throw err
        }
      }
    }

    logger.info(
      { socketId, userId, ttl: WS_SESSION_TTL_SECONDS },
      'extendSocketSession: session TTL extended to 60 seconds via heartbeat',
    )

    return { socketId, userId, extended: true }
  }

  /**
   * Xoá socket session khi user ngắt kết nối.
   *
   * OOM & GHOST SESSION FIX:
   *   - Atomic cleanup in Redis using pipeline.
   *   - Deletes field from user hash and removes reverse lookup.
   */
  async removeSocketSession(socketId: string) {
    const socketKey = `${WS_SOCKET_PREFIX}${socketId}`

    const userIdStr = await redisClient.get(socketKey)
    if (!userIdStr) {
      logger.debug(
        { socketId },
        'removeSocketSession: socket key not found in Redis (already expired or removed)',
      )
      return null
    }

    const userId = parseInt(userIdStr, 10)
    const userKey = `${WS_SESSION_PREFIX}${userId}`

    const pipeline = redisClient.pipeline()
    pipeline.hdel(userKey, socketId)
    pipeline.del(socketKey)
    const results = await pipeline.exec()

    if (results) {
      for (const [err] of results) {
        if (err) {
          logger.error({ err, socketId, userId }, 'removeSocketSession: Redis pipeline error')
          throw err
        }
      }
    }

    logger.info({ socketId, userId }, 'removeSocketSession: Redis session removed cleanly')

    return { socketId, userId }
  }

  /**
   * Lấy tất cả socket sessions của một user (hỗ trợ multi-device/multi-tab).
   */
  async findSocketSessionsByUserId(userId: number) {
    const userKey = `${WS_SESSION_PREFIX}${userId}`
    const sessions = await redisClient.hgetall(userKey)

    return Object.entries(sessions).map(([socketId, connectedAt]) => ({
      socketId,
      userId,
      connectedAt: new Date(parseInt(connectedAt, 10)),
    }))
  }

  /**
   * Lấy socket session theo socketId.
   */
  async findSocketSessionBySocketId(socketId: string) {
    const socketKey = `${WS_SOCKET_PREFIX}${socketId}`
    const userIdStr = await redisClient.get(socketKey)

    if (!userIdStr) return null

    const userId = parseInt(userIdStr, 10)
    const userKey = `${WS_SESSION_PREFIX}${userId}`
    const connectedAt = await redisClient.hget(userKey, socketId)

    return {
      socketId,
      userId,
      connectedAt: connectedAt ? new Date(parseInt(connectedAt, 10)) : new Date(),
    }
  }

  /**
   * Kiểm tra user có đang online không (HLEN trên Hash).
   */
  async isUserOnline(userId: number): Promise<boolean> {
    const userKey = `${WS_SESSION_PREFIX}${userId}`
    const sessionCount = await redisClient.hlen(userKey)
    return sessionCount > 0
  }
}

```

# modules\loyalty-engage\chat\chat.routes.ts

| Property | Value |
|----------|-------|
| Path | `modules\loyalty-engage\chat\chat.routes.ts` |
| Size | 3,745 bytes |
| Extension | `.ts` |
| Modified | 2026-10-11 16:52:36.702598 |

```typescript
// src/modules/loyalty-engage/chat/chat.routes.ts
import { Router } from 'express'
import { requireAuth } from '@/middlewares/guards/auth.guard'
import { requireAdmin } from '@/middlewares/guards/role.guard'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import { ChatController } from './chat.controller'
import {
  extendSocketSessionBodySchema,
  getChatHistoryQuerySchema,
  markReadBodySchema,
  removeSocketSessionBodySchema,
  sendMessageBodySchema,
  upsertSocketSessionBodySchema,
} from './chat.schema'
import { z } from 'zod'

export const chatRouter = Router()
const controller = new ChatController()

// ─── Message routes (yêu cầu đăng nhập) ──────────────────────────────────────

/**
 * GET /chat/messages/unread – Số tin nhắn chưa đọc
 * PHẢI đăng ký TRƯỚC /messages để tránh Express match 'unread' như query param
 */
chatRouter.get('/messages/unread', requireAuth, controller.getUnreadCount)
chatRouter.get('/messages/active', requireAuth, controller.getActiveChat)

/** GET /chat/messages?withUserId=&page=&limit= – Lịch sử hội thoại */
chatRouter.get(
  '/messages',
  requireAuth,
  validateRequest({ query: getChatHistoryQuerySchema }),
  controller.getChatHistory,
)

/** POST /chat/messages – Gửi tin nhắn */
chatRouter.post(
  '/messages',
  requireAuth,
  validateRequest({ body: sendMessageBodySchema }),
  controller.sendMessage,
)

/** POST /chat/messages/read – Đánh dấu đã đọc */
chatRouter.post(
  '/messages/read',
  requireAuth,
  validateRequest({ body: markReadBodySchema }),
  controller.markAsRead,
)

/** Shop inbox */
chatRouter.get('/conversations', requireAuth, controller.getShopConversationList)
chatRouter.post(
  '/conversations/:chatId/close',
  requireAuth,
  validateRequest({
    params: z.object({
      chatId: z.string().regex(/^\d+$/, 'chatId phải là số nguyên').transform(Number),
    }),
  }),
  controller.closeConversation,
)

// ─── WebSocket Session routes (dùng cho Socket.IO / Gateway / Client heartbeat) ──

/**
 * GET /chat/sessions/:userId/online phải đứng TRƯỚC GET /sessions/:userId
 * để tránh Express match 'online' như :userId param
 */
chatRouter.get(
  '/sessions/:userId/online',
  requireAdmin,
  validateRequest({
    params: z.object({
      userId: z.string().regex(/^\d+$/, 'userId phải là số nguyên').transform(Number),
    }),
  }),
  controller.checkUserOnline,
)

/** GET /chat/sessions/:userId – Lấy danh sách sessions của một user (chỉ Admin) */
chatRouter.get(
  '/sessions/:userId',
  requireAdmin,
  validateRequest({
    params: z.object({
      userId: z.string().regex(/^\d+$/, 'userId phải là số nguyên').transform(Number),
    }),
  }),
  controller.getSocketSessionsByUser,
)

/** POST /chat/sessions – Lưu socket session (gọi khi user kết nối WS) (Admin/nội bộ) */
chatRouter.post(
  '/sessions',
  requireAdmin,
  validateRequest({ body: upsertSocketSessionBodySchema }),
  controller.upsertSocketSession,
)

/** POST /chat/sessions/heartbeat – Gia hạn socket session (Heartbeat ping) (nội bộ / client) */
chatRouter.post(
  '/sessions/heartbeat',
  validateRequest({ body: extendSocketSessionBodySchema }),
  controller.extendSocketSession,
)

/** DELETE /chat/sessions – Xóa socket session (gọi khi user ngắt kết nối) (Admin/nội bộ) */
chatRouter.delete(
  '/sessions',
  requireAdmin,
  validateRequest({ body: removeSocketSessionBodySchema }),
  controller.removeSocketSession,
)

```

# modules\loyalty-engage\chat\chat.schema.ts

| Property | Value |
|----------|-------|
| Path | `modules\loyalty-engage\chat\chat.schema.ts` |
| Size | 1,576 bytes |
| Extension | `.ts` |
| Modified | 2026-10-09 10:38:13.319591 |

```typescript
import { z } from 'zod'

export const sendMessageBodySchema = z.object({
  chatId: z.number().int().positive('chatId phải là số nguyên dương'),
  content: z.string().trim().min(1, 'Nội dung tin nhắn không được để trống').max(5000),
})

export const getChatHistoryQuerySchema = z.object({
  chatId: z.coerce.number().int().positive('chatId phải là số nguyên dương'), 
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  cursor: z.coerce.number().int().positive().optional(),
})

export const markReadBodySchema = z.object({
  chatId: z.number().int().positive('chatId phải là số nguyên dương'),
})

export const upsertSocketSessionBodySchema = z.object({
  socketId: z.string().trim().min(1).max(255),
  userId: z.number().int().positive(),
})

export const extendSocketSessionBodySchema = z.object({
  socketId: z.string().trim().min(1).max(255),
})

export const removeSocketSessionBodySchema = z.object({
  socketId: z.string().trim().min(1).max(255),
})

export type SendMessageBodyType = z.infer<typeof sendMessageBodySchema>
export type GetChatHistoryQueryType = z.infer<typeof getChatHistoryQuerySchema>
export type UpsertSocketSessionBodyType = z.infer<typeof upsertSocketSessionBodySchema>
export type ExtendSocketSessionBodyType = z.infer<typeof extendSocketSessionBodySchema>
export type RemoveSocketSessionBodyType = z.infer<typeof removeSocketSessionBodySchema>
export type MarkReadBodyType = z.infer<typeof markReadBodySchema>
```

# modules\loyalty-engage\chat\chat.service.ts

| Property | Value |
|----------|-------|
| Path | `modules\loyalty-engage\chat\chat.service.ts` |
| Size | 7,224 bytes |
| Extension | `.ts` |
| Modified | 2026-10-11 16:52:36.704595 |

```typescript
// src/modules/loyalty-engage/chat/chat.service.ts
import { BadRequestError, ForbiddenError, NotFoundError } from '@/common/errors'
import { createLogger } from '@/common/logger'
import { ChatRepo } from './chat.repo'
import { ChatStatus } from '@prisma/client'
import { getIO } from '@/common/websocket'
import {
  GetChatHistoryQueryType,
  MarkReadBodyType,
  RemoveSocketSessionBodyType,
  SendMessageBodyType,
  UpsertSocketSessionBodyType,
} from './chat.schema'

const logger = createLogger('ChatService')

export class ChatService {
  constructor(private chatRepo = new ChatRepo()) {}

  // ─────────────── Message APIs ───────────────

  async getOrCreateActiveChat(userId: number) {
    let chat = await this.chatRepo.findActiveChatByUserId(userId)
    if (!chat) chat = await this.chatRepo.createChat(userId)
    return { data: chat }
  }

  private async authorizeChatAccess(userId: number, chatId: number) {
    const chat = await this.chatRepo.findChatById(chatId)
    if (!chat) throw new NotFoundError('Cuộc trò chuyện không tồn tại')
    if (chat.userId === userId) return chat

    const roleCode = await this.chatRepo.findUserRoleCode(userId)
    if (roleCode !== 'ADMIN' && roleCode !== 'STAFF') {
      throw new ForbiddenError('Bạn không có quyền truy cập cuộc trò chuyện này')
    }

    return chat
  }

  private async authorizeShopStaff(userId: number) {
    const roleCode = await this.chatRepo.findUserRoleCode(userId)
    if (roleCode !== 'ADMIN' && roleCode !== 'STAFF') {
      throw new ForbiddenError('Chỉ nhân viên cửa hàng mới được thực hiện thao tác này')
    }
  }

  /**
   * Lưu tin nhắn mới vào bảng Message.
   */
  async sendMessage(senderId: number, body: SendMessageBodyType) {
    const chatAccess = await this.authorizeChatAccess(senderId, body.chatId)
    if (chatAccess.status === ChatStatus.CLOSED) {
      throw new BadRequestError('Cuộc trò chuyện đã kết thúc')
    }

    const message = await this.chatRepo.createMessage({
      chatId: body.chatId,
      senderId,
      content: body.content,
    })
    const eventPayload = {
      id: message.id,
      chatId: body.chatId,
      senderId: message.senderId,
      content: message.content,
      isRead: message.isRead,
      sendDate: message.sendDate,
      sender: message.sender,
    }
    const recipientRoom = senderId === chatAccess.userId ? 'shop' : `user:${chatAccess.userId}`
    getIO().to(recipientRoom).emit('new_message', eventPayload)
    return { message: 'Tin nhắn đã được gửi', data: message }
  }

  /**
   * Lấy lịch sử hội thoại giữa 2 user sử dụng Cursor-based Pagination.
   *
   * PERFORMANCE BENEFIT:
   *   - O(take) seek time via indexed primary key.
   *   - Eliminates database IO degradation caused by high-offset skips.
   */
  async getChatHistory(userId: number, query: GetChatHistoryQueryType) {
    await this.authorizeChatAccess(userId, query.chatId)
    const { chatId, limit, cursor, page } = query
    const { data, nextCursor, hasMore } = await this.chatRepo.findConversation(chatId, cursor ?? null, limit)
    return { data, pagination: { page, limit, nextCursor, hasMore } }
  }

  /** Đánh dấu đã đọc tất cả tin nhắn trong chat */
  async markAsRead(receiverId: number, body: MarkReadBodyType) {
    await this.authorizeChatAccess(receiverId, body.chatId)
    const result = await this.chatRepo.markMessagesAsRead(body.chatId, receiverId)

    logger.info(
      { receiverId, chatId: body.chatId, updatedCount: result.count },
      'markAsRead: messages marked as read',
    )

    return {
      message: `Đã đọc ${result.count} tin nhắn`,
      updatedCount: result.count,
    }
  }

  /** Đếm tin nhắn chưa đọc */
  async getUnreadCount(userId: number) {
    const count = await this.chatRepo.countUnread(userId)
    return { unreadCount: count }
  }

  /**
   * Lấy danh sách cuộc trò chuyện của user.
   * Offloads deduplication and ordering to the PostgreSQL query engine.
   */
  async getConversationList(userId: number) {
    logger.debug({ userId }, 'getConversationList: retrieving partner list')

    const partners = await this.chatRepo.findConversationList(userId)
    return { data: partners }
  }

  async getShopConversationList(userId: number) {
    await this.authorizeShopStaff(userId)
    const conversations = await this.chatRepo.findConversationList()
    return { data: conversations }
  }

  async closeConversation(userId: number, chatId: number) {
    await this.authorizeShopStaff(userId)
    const chat = await this.chatRepo.findChatById(chatId)
    if (!chat) throw new NotFoundError('Cuộc trò chuyện không tồn tại')
    if (chat.status === ChatStatus.CLOSED) {
      throw new BadRequestError('Cuộc trò chuyện đã kết thúc')
    }

    return { data: await this.chatRepo.closeChat(chatId) }
  }

  // ─────────────── WebSocket Session APIs (Redis-backed) ───────────────

  /**
   * Lưu hoặc cập nhật socket session khi user kết nối.
   * Uses Redis hash maps with strict 60s TTL to prevent ghost sessions on crash.
   */
  async upsertSocketSession(body: UpsertSocketSessionBodyType) {
    logger.info({ socketId: body.socketId, userId: body.userId }, 'upsertSocketSession: updating Redis session')

    const session = await this.chatRepo.upsertSocketSession(body.socketId, body.userId)
    return { message: 'Socket session đã được lưu', data: session }
  }

  /**
   * Gia hạn socket session khi nhận heartbeat/ping từ client.
   * Resets TTL của user hash và socket key về 60 giây.
   */
  async extendSocketSession(socketId: string) {
    if (!socketId) {
      throw new BadRequestError('socketId không được để trống')
    }

    logger.debug({ socketId }, 'extendSocketSession: handling heartbeat ping')

    const result = await this.chatRepo.extendSocketSession(socketId)
    if (!result) {
      throw new NotFoundError('Socket session không tồn tại hoặc đã hết hạn')
    }

    return { message: 'Gia hạn socket session thành công', data: result }
  }

  /**
   * Xoá socket session khi user ngắt kết nối.
   */
  async removeSocketSession(body: RemoveSocketSessionBodyType) {
    logger.info({ socketId: body.socketId }, 'removeSocketSession: clearing Redis session')

    await this.chatRepo.removeSocketSession(body.socketId)
    return { message: 'Socket session đã được xoá' }
  }

  /** Lấy tất cả socket sessions của một user */
  async getSocketSessionsByUser(userId: number) {
    const sessions = await this.chatRepo.findSocketSessionsByUserId(userId)
    return { data: sessions }
  }

  /** Kiểm tra user có đang online không */
  async checkUserOnline(userId: number) {
    const isOnline = await this.chatRepo.isUserOnline(userId)
    return { userId, isOnline }
  }
}

```

# modules\loyalty-engage\loyalty-engage.routes.ts

| Property | Value |
|----------|-------|
| Path | `modules\loyalty-engage\loyalty-engage.routes.ts` |
| Size | 552 bytes |
| Extension | `.ts` |
| Modified | 2026-09-30 08:12:15.068162 |

```typescript
// src/modules/loyalty-engage/loyalty-engage.routes.ts
import { Router } from 'express'
import { pointRouter } from './point/point.routes'
import { voucherRouter } from './voucher/voucher.routes'
import { reviewRouter } from './review/review.routes'
import { chatRouter } from './chat/chat.routes'

export const loyaltyEngageRouter = Router()

loyaltyEngageRouter.use('/points', pointRouter)
loyaltyEngageRouter.use('/vouchers', voucherRouter)
loyaltyEngageRouter.use('/reviews', reviewRouter)
loyaltyEngageRouter.use('/chat', chatRouter)

```

# modules\loyalty-engage\point\point.controller.ts

| Property | Value |
|----------|-------|
| Path | `modules\loyalty-engage\point\point.controller.ts` |
| Size | 1,459 bytes |
| Extension | `.ts` |
| Modified | 2026-10-09 18:28:46.400465 |

```typescript
import { NextFunction, Request, Response } from 'express'
import { PointService } from './point.service'

export class PointController {
  constructor(private pointService = new PointService()) {}

  earnPoints = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.pointService.earnPoints(req.user!.userId, req.body)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  redeemPoints = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const data = await this.pointService.redeemPoints(userId, req.body)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  getHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const data = await this.pointService.getHistory(userId, req.query as any)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  getBalance = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const data = await this.pointService.getBalance(userId)
      return res.status(200).json({ statusCode: 200, data })
    } catch (error) {
      next(error)
    }
  }
}

```

# modules\loyalty-engage\point\point.repo.ts

| Property | Value |
|----------|-------|
| Path | `modules\loyalty-engage\point\point.repo.ts` |
| Size | 10,528 bytes |
| Extension | `.ts` |
| Modified | 2026-10-09 18:28:46.402451 |

```typescript
import { prisma } from '@/database/prisma'
import { createLogger } from '@/common/logger'
import { NotFoundError } from '@/common/errors'

const logger = createLogger('PointRepo')

interface LockedUserRow {
  id: number
  rewardPoints: number
}

export type AtomicEarnResult =
  | { isIdempotent: true; transaction: any; currentPoint: number }
  | { isIdempotent: false; transaction: any; currentPoint: number; pointChange: number }

export type AtomicRedeemResult =
  | { isIdempotent: true; transaction: any; currentPoint: number; discountAmount: number }
  | { isIdempotent: false; transaction: any; currentPoint: number; discountAmount: number }
  | { error: 'USER_NOT_FOUND' }
  | { error: 'INSUFFICIENT_POINTS'; currentPoint: number; required: number }
  | { error: 'EXCEEDS_ORDER_TOTAL'; orderTotal: number }

export class PointRepo {
  async findUserById(userId: number) {
    return prisma.user.findUnique({
      where: { id: userId, deletedAt: null },
      select: { id: true, rewardPoints: true },
    })
  }

  async findTransactionsByUserId(userId: number, skip: number, take: number) {
    const [data, total] = await prisma.$transaction([
      prisma.pointTransaction.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      }),
      prisma.pointTransaction.count({ where: { userId } }),
    ])
    return { data, total }
  }

  async findOrderById(orderId: number) {
    return prisma.order.findUnique({
      where: { id: orderId },
      select: { id: true, userId: true, status: true, totalAmount: true, pointUsed: true },
    })
  }

  async atomicEarnPoints(
    userId: number,
    orderId: number,
    pointChange: number,
    description: string,
  ): Promise<AtomicEarnResult | null> {
    logger.info({ userId, orderId, pointChange }, 'atomicEarnPoints: entering transaction')

    return prisma.$transaction(
      async (tx: any): Promise<AtomicEarnResult | null> => {
        const lockedRows: LockedUserRow[] = await tx.$queryRaw`
          SELECT id, "rewardPoints"
          FROM "User"
          WHERE id = ${userId} AND "deletedAt" IS NULL
          FOR UPDATE
        `

        if (lockedRows.length === 0) {
          logger.warn({ userId }, 'atomicEarnPoints: user not found or deleted inside tx')
          return null
        }
        const lockedUser = lockedRows[0]

        const existingEarn = await tx.pointTransaction.findFirst({
          where: { orderId, transactionType: 'EARN' },
        })

        if (existingEarn) {
          logger.info(
            { userId, orderId, existingTransactionId: existingEarn.id },
            'atomicEarnPoints: duplicate request detected — returning idempotent response',
          )
          return {
            isIdempotent: true,
            transaction: existingEarn,
            currentPoint: lockedUser.rewardPoints,
          }
        }

        const newPoints = lockedUser.rewardPoints + pointChange

        await tx.user.update({
          where: { id: userId },
          data: { rewardPoints: newPoints },
        })

        const transaction = await tx.pointTransaction.create({
          data: {
            userId,
            orderId,
            pointChange,
            currentPoint: newPoints,
            transactionType: 'EARN',
            description,
          },
        })

        logger.info(
          { userId, orderId, pointChange, newPoints, transactionId: transaction.id },
          'atomicEarnPoints: EARN transaction committed successfully',
        )

        return {
          isIdempotent: false,
          transaction,
          currentPoint: newPoints,
          pointChange,
        }
      },
      {
        isolationLevel: 'ReadCommitted',
        timeout: 10000,
      },
    )
  }

  async atomicRedeemPoints(
    userId: number,
    orderId: number,
    pointsToRedeem: number,
    orderTotal: number,
    description: string,
  ): Promise<AtomicRedeemResult> {
    logger.info({ userId, orderId, pointsToRedeem }, 'atomicRedeemPoints: entering transaction')

    return prisma.$transaction(
      async (tx: any): Promise<AtomicRedeemResult> => {
        const lockedRows: LockedUserRow[] = await tx.$queryRaw`
          SELECT id, "rewardPoints"
          FROM "User"
          WHERE id = ${userId} AND "deletedAt" IS NULL
          FOR UPDATE
        `

        if (lockedRows.length === 0) {
          logger.warn({ userId }, 'atomicRedeemPoints: user not found inside tx')
          return { error: 'USER_NOT_FOUND' }
        }
        const lockedUser = lockedRows[0]

        const existingRedeem = await tx.pointTransaction.findFirst({
          where: { orderId, transactionType: 'REDEEM' },
        })

        if (existingRedeem) {
          logger.info(
            { userId, orderId, existingTransactionId: existingRedeem.id },
            'atomicRedeemPoints: duplicate redemption request detected — returning idempotent response',
          )
          return {
            isIdempotent: true,
            transaction: existingRedeem,
            currentPoint: lockedUser.rewardPoints,
            discountAmount: Math.abs(existingRedeem.pointChange),
          }
        }

        if (lockedUser.rewardPoints < pointsToRedeem) {
          logger.warn(
            { userId, currentPoints: lockedUser.rewardPoints, pointsToRedeem },
            'atomicRedeemPoints: insufficient reward points balance',
          )
          return {
            error: 'INSUFFICIENT_POINTS',
            currentPoint: lockedUser.rewardPoints,
            required: pointsToRedeem,
          }
        }

        if (pointsToRedeem > orderTotal) {
          logger.warn(
            { userId, pointsToRedeem, orderTotal },
            'atomicRedeemPoints: points exceed order total amount',
          )
          return {
            error: 'EXCEEDS_ORDER_TOTAL',
            orderTotal,
          }
        }

        const newPoints = lockedUser.rewardPoints - pointsToRedeem

        await tx.user.update({
          where: { id: userId },
          data: { rewardPoints: newPoints },
        })

        const transaction = await tx.pointTransaction.create({
          data: {
            userId,
            orderId,
            pointChange: -pointsToRedeem,
            currentPoint: newPoints,
            transactionType: 'REDEEM',
            description: description,
          },
        })

        logger.info(
          { userId, orderId, pointsToRedeem, newPoints, transactionId: transaction.id },
          'atomicRedeemPoints: REDEEM transaction committed successfully',
        )

        return {
          isIdempotent: false,
          transaction,
          currentPoint: newPoints,
          discountAmount: pointsToRedeem,
        }
      },
      {
        isolationLevel: 'ReadCommitted',
        timeout: 10000,
      },
    )
  }

  async compensatePointsForCancelledOrder(orderId: number, tx?: any) {
    const executeLogic = async (client: any) => {
      const order = await client.order.findUnique({
        where: { id: orderId },
        select: { id: true, userId: true, orderCode: true, pointUsed: true, pointEarned: true, status: true },
      })
      if (!order) {
        throw new NotFoundError(`Đơn hàng #${orderId} không tồn tại`)
      }

      const userId = order.userId

      const lockedRows: LockedUserRow[] = await client.$queryRaw`
        SELECT id, "rewardPoints"
        FROM "User"
        WHERE id = ${userId} AND "deletedAt" IS NULL
        FOR UPDATE
      `
      if (lockedRows.length === 0) {
        throw new NotFoundError(`Người dùng #${userId} không tồn tại`)
      }

      let currentPoints = lockedRows[0].rewardPoints
      let refundedPoints = 0
      let revokedPoints = 0

      if (order.pointUsed > 0) {
        const existingRefund = await client.pointTransaction.findFirst({
          where: { orderId: order.id, transactionType: 'REFUND' },
        })
        if (!existingRefund) {
          currentPoints += order.pointUsed
          refundedPoints = order.pointUsed
          await client.user.update({
            where: { id: userId },
            data: { rewardPoints: currentPoints },
          })
          await client.pointTransaction.create({
            data: {
              userId,
              orderId: order.id,
              pointChange: order.pointUsed,
              currentPoint: currentPoints,
              transactionType: 'REFUND',
              description: `Hoàn ${order.pointUsed} điểm do hủy/hoàn đơn hàng #${order.orderCode}`,
            },
          })
        }
      }

      if (order.pointEarned > 0) {
        const existingEarn = await client.pointTransaction.findFirst({
          where: { orderId: order.id, transactionType: 'EARN' },
        })
        if (existingEarn) {
          const existingRevoke = await client.pointTransaction.findFirst({
            where: {
              orderId: order.id,
              transactionType: 'REDEEM',
              description: { contains: 'Thu hồi' },
            },
          })
          if (!existingRevoke) {
            const pointsToDeduct = Math.min(currentPoints, order.pointEarned)
            currentPoints -= pointsToDeduct
            revokedPoints = pointsToDeduct
            await client.user.update({
              where: { id: userId },
              data: { rewardPoints: currentPoints },
            })
            await client.pointTransaction.create({
              data: {
                userId,
                orderId: order.id,
                pointChange: -pointsToDeduct,
                currentPoint: currentPoints,
                transactionType: 'REDEEM',
                description: `Thu hồi ${pointsToDeduct} điểm thưởng do hủy/hoàn đơn hàng #${order.orderCode}`,
              },
            })
          }
        }
      }

      return {
        userId,
        orderId: order.id,
        refundedPoints,
        revokedPoints,
        finalBalance: currentPoints,
      }
    }

    if (tx) {
      return executeLogic(tx)
    }
    return prisma.$transaction(executeLogic, {
      isolationLevel: 'ReadCommitted',
      timeout: 10000,
    })
  }
}

```

# modules\loyalty-engage\point\point.routes.ts

| Property | Value |
|----------|-------|
| Path | `modules\loyalty-engage\point\point.routes.ts` |
| Size | 872 bytes |
| Extension | `.ts` |
| Modified | 2026-10-09 18:28:46.404485 |

```typescript
import { Router } from 'express'
import { requireAuth } from '@/middlewares/guards/auth.guard'
import { requireAdmin } from '@/middlewares/guards/role.guard'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import { PointController } from './point.controller'
import { earnPointsBodySchema, getHistoryQuerySchema, redeemPointsBodySchema } from './point.schema'

export const pointRouter = Router()
const controller = new PointController()

pointRouter.use(requireAuth)

pointRouter.get('/balance', controller.getBalance)
pointRouter.get('/history', validateRequest({ query: getHistoryQuerySchema }), controller.getHistory)
pointRouter.post('/earn', requireAdmin, validateRequest({ body: earnPointsBodySchema }), controller.earnPoints)
pointRouter.post('/redeem', validateRequest({ body: redeemPointsBodySchema }), controller.redeemPoints)
```

# modules\loyalty-engage\point\point.schema.ts

| Property | Value |
|----------|-------|
| Path | `modules\loyalty-engage\point\point.schema.ts` |
| Size | 1,039 bytes |
| Extension | `.ts` |
| Modified | 2026-10-09 18:28:46.406448 |

```typescript
import { z } from 'zod'

export const earnPointsBodySchema = z.object({
  orderId: z.number().int().positive('orderId phải là số nguyên dương'),
  description: z.string().trim().min(1).max(255).optional().default('Cộng điểm từ đơn hàng'),
})

export const redeemPointsBodySchema = z.object({
  orderId: z.number().int().positive('orderId phải là số nguyên dương'),
  pointsToRedeem: z.number().int().positive('Số điểm dùng phải lớn hơn 0'),
})

export const getHistoryQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((v) => (v ? parseInt(v, 10) : 1))
    .pipe(z.number().int().min(1)),
  limit: z
    .string()
    .optional()
    .transform((v) => (v ? parseInt(v, 10) : 10))
    .pipe(z.number().int().min(1).max(100)),
})

export type EarnPointsBodyType = z.infer<typeof earnPointsBodySchema>
export type RedeemPointsBodyType = z.infer<typeof redeemPointsBodySchema>
export type GetHistoryQueryType = z.infer<typeof getHistoryQuerySchema>

```

# modules\loyalty-engage\point\point.service.ts

| Property | Value |
|----------|-------|
| Path | `modules\loyalty-engage\point\point.service.ts` |
| Size | 7,099 bytes |
| Extension | `.ts` |
| Modified | 2026-10-09 18:28:46.408450 |

```typescript
import { BadRequestError, NotFoundError } from '@/common/errors'
import { createLogger } from '@/common/logger'
import { PointRepo } from './point.repo'
import { EarnPointsBodyType, GetHistoryQueryType, RedeemPointsBodyType } from './point.schema'

const logger = createLogger('PointService')

export class PointService {
  constructor(private pointRepo = new PointRepo()) {}

  async earnPoints(userId: number, body: EarnPointsBodyType) {
    logger.info({ adminId: userId, orderId: body.orderId }, 'earnPoints: initiated')

    const order = await this.pointRepo.findOrderById(body.orderId)
    if (!order) {
      logger.warn({ orderId: body.orderId }, 'earnPoints: order not found')
      throw new NotFoundError('Đơn hàng không tồn tại')
    }

    if (order.status !== 'DELIVERED') {
      logger.warn({ orderId: body.orderId, status: order.status }, 'earnPoints: order not DELIVERED')
      throw new BadRequestError('Chỉ cộng điểm khi đơn hàng đã giao thành công (DELIVERED)')
    }

    const targetUserId = order.userId

    const pointChange = Math.floor(Number(order.totalAmount) * 0.01)
    if (pointChange <= 0) {
      logger.warn({ orderId: body.orderId, totalAmount: order.totalAmount }, 'earnPoints: calculated point change is 0')
      throw new BadRequestError('Giá trị đơn hàng quá nhỏ, không đủ điều kiện cộng điểm')
    }

    const result = await this.pointRepo.atomicEarnPoints(
      targetUserId,
      body.orderId,
      pointChange,
      body.description || `Cộng điểm từ đơn hàng #${order.id}`,
    )

    if (!result) {
      logger.error({ targetUserId, orderId: body.orderId }, 'earnPoints: user not found in locked transaction')
      throw new NotFoundError('Người dùng không tồn tại')
    }

    if (result.isIdempotent) {
      logger.info(
        { targetUserId, orderId: body.orderId, currentPoint: result.currentPoint },
        'earnPoints: duplicate request resolved via idempotency check',
      )
      return {
        message: `Đơn hàng #${body.orderId} đã được cộng điểm trước đó (idempotent)`,
        currentPoint: result.currentPoint,
        transaction: result.transaction,
      }
    }

    logger.info(
      { targetUserId, orderId: body.orderId, pointChange, newPoints: result.currentPoint },
      'earnPoints: committed successfully',
    )

    return {
      message: `Cộng ${pointChange} điểm thành công cho user #${targetUserId}`,
      currentPoint: result.currentPoint,
      transaction: result.transaction,
    }
  }

  async redeemPoints(userId: number, body: RedeemPointsBodyType) {
    logger.info({ userId, orderId: body.orderId, pointsToRedeem: body.pointsToRedeem }, 'redeemPoints: initiated')

    const order = await this.pointRepo.findOrderById(body.orderId)
    if (!order) {
      logger.warn({ orderId: body.orderId }, 'redeemPoints: order not found')
      throw new NotFoundError('Đơn hàng không tồn tại')
    }

    if (order.userId !== userId) {
      logger.warn(
        { orderId: body.orderId, orderUserId: order.userId, requestUserId: userId },
        'redeemPoints: order does not belong to user',
      )
      throw new BadRequestError('Đơn hàng không thuộc về người dùng này')
    }

    const orderTotal = Number(order.totalAmount)

    const result = await this.pointRepo.atomicRedeemPoints(
      userId,
      body.orderId,
      body.pointsToRedeem,
      orderTotal,
      `Dùng ${body.pointsToRedeem} điểm (tương đương ${body.pointsToRedeem} VNĐ) thanh toán đơn hàng #${order.id}`,
    )

    if ('error' in result) {
      if (result.error === 'USER_NOT_FOUND') {
        logger.error({ userId }, 'redeemPoints: user not found')
        throw new NotFoundError('Người dùng không tồn tại')
      }

      if (result.error === 'INSUFFICIENT_POINTS') {
        logger.warn(
          { userId, currentPoint: result.currentPoint, required: result.required },
          'redeemPoints: insufficient points balance',
        )
        throw new BadRequestError(
          `Số điểm không đủ. Bạn đang có ${result.currentPoint} điểm, cần ${result.required} điểm`,
        )
      }

      if (result.error === 'EXCEEDS_ORDER_TOTAL') {
        logger.warn(
          { userId, pointsToRedeem: body.pointsToRedeem, orderTotal: result.orderTotal },
          'redeemPoints: redemption points exceed order total',
        )
        throw new BadRequestError(
          `Số điểm sử dụng (${body.pointsToRedeem} điểm = ${body.pointsToRedeem} VNĐ) vượt quá giá trị đơn hàng (${result.orderTotal} VNĐ)`,
        )
      }

      throw new BadRequestError('Không thể thực hiện trừ điểm')
    }

    if (result.isIdempotent) {
      logger.info(
        { userId, orderId: body.orderId, currentPoint: result.currentPoint },
        'redeemPoints: duplicate redemption resolved via idempotency check',
      )
      return {
        message: `Điểm đã được áp dụng cho đơn hàng #${body.orderId} trước đó (idempotent)`,
        discountAmount: result.discountAmount,
        currentPoint: result.currentPoint,
        transaction: result.transaction,
      }
    }

    logger.info(
      { userId, orderId: body.orderId, pointsToRedeem: body.pointsToRedeem, newPoints: result.currentPoint },
      'redeemPoints: committed successfully',
    )

    return {
      message: `Đã dùng ${body.pointsToRedeem} điểm (tương đương ${body.pointsToRedeem} VNĐ)`,
      discountAmount: result.discountAmount,
      currentPoint: result.currentPoint,
      transaction: result.transaction,
    }
  }

  async getHistory(userId: number, query: GetHistoryQueryType) {
    const { page, limit } = query
    const skip = (page - 1) * limit

    const { data, total } = await this.pointRepo.findTransactionsByUserId(userId, skip, limit)

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    }
  }

  async getBalance(userId: number) {
    const user = await this.pointRepo.findUserById(userId)
    if (!user) throw new NotFoundError('Người dùng không tồn tại')
    return { rewardPoints: user.rewardPoints }
  }

  /**
   * =========================================================================================
   * @WARNING CONTRACT RULES: CROSS-MODULE DEFENSIVE INTERFACE FOR CART-ORDER & FULFILLMENT
   * 
   * KHI HỦY ĐƠN HOẶC HOÀN TIỀN (RETURN/REFUND):
   * BẮT BUỘC GỌI HÀM NÀY QUA TRANSACTION: `compensatePointsForCancelledOrder(orderId, tx)`
   * =========================================================================================
   */
  async compensatePointsForCancelledOrder(orderId: number, tx?: any) {
    return this.pointRepo.compensatePointsForCancelledOrder(orderId, tx)
  }
}

```

# modules\loyalty-engage\review\review.controller.ts

| Property | Value |
|----------|-------|
| Path | `modules\loyalty-engage\review\review.controller.ts` |
| Size | 1,868 bytes |
| Extension | `.ts` |
| Modified | 2026-10-09 18:28:46.410021 |

```typescript
import { NextFunction, Request, Response } from 'express'
import { ReviewService } from './review.service'

export class ReviewController {
  constructor(private reviewService = new ReviewService()) {}

  getReviewsByProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.reviewService.getReviewsByProduct(req.query as any)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  getReviewById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id)
      const data = await this.reviewService.getReviewById(id)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  createReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const data = await this.reviewService.createReview(userId, req.body)
      return res.status(201).json({ statusCode: 201, ...data })
    } catch (error) {
      next(error)
    }
  }

  replyToReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id)
      const data = await this.reviewService.replyToReview(id, req.body)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  toggleHideReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id)
      const isHidden: boolean = req.body.isHidden === true
      const data = await this.reviewService.toggleHideReview(id, isHidden)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }
}

```

# modules\loyalty-engage\review\review.repo.ts

| Property | Value |
|----------|-------|
| Path | `modules\loyalty-engage\review\review.repo.ts` |
| Size | 4,593 bytes |
| Extension | `.ts` |
| Modified | 2026-10-11 17:23:08.206607 |

```typescript
import { prisma } from '@/database/prisma'
import { redisClient } from '@/database/redis'
import { createLogger } from '@/common/logger'

const logger = createLogger('ReviewRepo')

export class ReviewRepo {
  async findProductById(productId: number) {
    return prisma.product.findFirst({
      where: { id: productId, deletedAt: null },
      select: { id: true, defaultName: true },
    })
  }

  async verifyDeliveredOrderProduct(userId: number, orderId: number, productId: number) {
    return prisma.order.findFirst({
      where: {
        id: orderId,
        userId,
        status: 'DELIVERED',
        deletedAt: null,
        orderItems: {
          some: {
            deletedAt: null,
            variant: {
              productId,
            },
          },
        },
      },
      select: { id: true },
    })
  }

  async createReview(data: {
    userId: number
    productId: number
    orderId?: number
    rating: number
    content: string
    mediaUrls: Array<{ url: string; type: string }>
  }) {
    logger.info(
      { userId: data.userId, productId: data.productId, orderId: data.orderId },
      'createReview: executing atomic insert',
    )

    const review = await prisma.productReview.create({
      data: {
        userId: data.userId,
        productId: data.productId,
        orderId: data.orderId,
        rating: data.rating,
        content: data.content,
        medias: {
          create: data.mediaUrls.map((m) => ({
            mediaUrl: m.url,
            mediaType: m.type,
          })),
        },
      },
      include: {
        medias: true,
        user: { select: { id: true, fullName: true, avatarUrl: true } },
      },
    })

    logger.info(
      { reviewId: review.id, userId: data.userId, productId: data.productId },
      'createReview: review created successfully in DB',
    )

    return review
  }

  async findReviewsByProductId(productId: number, skip: number, take: number, rating?: number) {
    const where = {
      productId,
      isHidden: false,
      deletedAt: null,
      ...(rating !== undefined ? { rating } : {}),
    }

    const [data, total] = await prisma.$transaction([
      prisma.productReview.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take,
        include: {
          medias: true,
          user: { select: { id: true, fullName: true, avatarUrl: true } },
        },
      }),
      prisma.productReview.count({ where }),
    ])

    return { data, total }
  }

  async getAverageRating(productId: number) {
    const result = await prisma.productReview.aggregate({
      where: { productId, isHidden: false, deletedAt: null },
      _avg: { rating: true },
      _count: { rating: true },
    })

    const totalReviews = result._count.rating
    const rawAvg = result._avg.rating
    const averageRating =
      rawAvg !== null && totalReviews > 0
        ? Math.round(rawAvg * 10) / 10
        : 0

    return { averageRating, totalReviews }
  }

  async findReviewById(id: number) {
    return prisma.productReview.findUnique({
      where: { id },
      include: {
        medias: true,
        user: { select: { id: true, fullName: true, avatarUrl: true } },
      },
    })
  }

  async updateShopReply(id: number, shopReply: string) {
    return prisma.productReview.update({ where: { id }, data: { shopReply } })
  }

  async toggleHideReview(id: number, isHidden: boolean) {
    return prisma.productReview.update({ where: { id }, data: { isHidden } })
  }

  async syncProductRatingHook(productId: number, tx?: any) {
    const client = tx || prisma
    const result = await client.productReview.aggregate({
      where: { productId, isHidden: false, deletedAt: null },
      _avg: { rating: true },
      _count: { rating: true },
    })

    const totalReviews = result._count.rating || 0
    const rawAvg = result._avg.rating
    const averageRating = rawAvg !== null && totalReviews > 0 ? Math.round(rawAvg * 10) / 10 : 0

    try {
      const cacheKey = `catalog:product:${productId}:rating`
      await redisClient.set(
        cacheKey,
        JSON.stringify({ productId, averageRating, totalReviews, updatedAt: new Date().toISOString() }),
        'EX',
        86400,
      )
    } catch (cacheErr) {
      logger.warn({ productId, cacheErr }, 'syncProductRatingHook: Redis cache sync warning')
    }

    return { productId, averageRating, totalReviews }
  }
}

```

# modules\loyalty-engage\review\review.routes.ts

| Property | Value |
|----------|-------|
| Path | `modules\loyalty-engage\review\review.routes.ts` |
| Size | 1,366 bytes |
| Extension | `.ts` |
| Modified | 2026-10-09 18:28:46.413685 |

```typescript
import { Router } from 'express'
import { requireAuth } from '@/middlewares/guards/auth.guard'
import { requireAdmin } from '@/middlewares/guards/role.guard'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import { ReviewController } from './review.controller'
import {
  createReviewBodySchema,
  getReviewsQuerySchema,
  replyReviewBodySchema,
  reviewIdParamSchema,
} from './review.schema'
import { z } from 'zod'

export const reviewRouter = Router()
const controller = new ReviewController()

reviewRouter.get(
  '/',
  validateRequest({ query: getReviewsQuerySchema }),
  controller.getReviewsByProduct,
)

reviewRouter.get(
  '/:id',
  validateRequest({ params: reviewIdParamSchema }),
  controller.getReviewById,
)

reviewRouter.post(
  '/',
  requireAuth,
  validateRequest({ body: createReviewBodySchema }),
  controller.createReview,
)

reviewRouter.post(
  '/:id/reply',
  requireAuth,
  requireAdmin,
  validateRequest({
    params: reviewIdParamSchema,
    body: replyReviewBodySchema,
  }),
  controller.replyToReview,
)

reviewRouter.patch(
  '/:id/hide',
  requireAuth,
  requireAdmin,
  validateRequest({
    params: reviewIdParamSchema,
    body: z.object({ isHidden: z.boolean({ required_error: 'isHidden là bắt buộc' }) }),
  }),
  controller.toggleHideReview,
)

```

# modules\loyalty-engage\review\review.schema.ts

| Property | Value |
|----------|-------|
| Path | `modules\loyalty-engage\review\review.schema.ts` |
| Size | 2,025 bytes |
| Extension | `.ts` |
| Modified | 2026-10-09 18:28:46.415476 |

```typescript
import { z } from 'zod'

export const createReviewBodySchema = z.object({
  productId: z.number().int().positive('productId phải là số nguyên dương'),
  orderId: z.number().int().positive('orderId phải là số nguyên dương').optional(),
  rating: z
    .number()
    .int('Số sao phải là số nguyên')
    .min(1, 'Số sao tối thiểu là 1')
    .max(5, 'Số sao tối đa là 5'),
  content: z.string().trim().min(1, 'Nội dung đánh giá không được để trống').max(2000),
  mediaUrls: z
    .array(
      z.object({
        url: z.string().url('URL media không hợp lệ').max(1000),
        type: z.string().trim().min(1).max(50).default('image'),
      }),
    )
    .max(10, 'Tối đa 10 file media')
    .optional()
    .default([]),
})

export const replyReviewBodySchema = z.object({
  shopReply: z.string().trim().min(1, 'Nội dung phản hồi không được để trống').max(1000),
})

export const reviewIdParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, 'id phải là số nguyên dương')
    .transform(Number),
})

export const getReviewsQuerySchema = z.object({
  productId: z
    .string()
    .regex(/^\d+$/, 'productId phải là số nguyên dương')
    .transform(Number),
  page: z
    .string()
    .optional()
    .transform((v) => (v ? parseInt(v, 10) : 1))
    .pipe(z.number().int().min(1)),
  limit: z
    .string()
    .optional()
    .transform((v) => (v ? parseInt(v, 10) : 10))
    .pipe(z.number().int().min(1).max(100)),
  rating: z
    .string()
    .optional()
    .transform((v) => (v ? parseInt(v, 10) : undefined))
    .pipe(z.number().int().min(1).max(5).optional()),
})

export type CreateReviewBodyType = z.infer<typeof createReviewBodySchema>
export type ReplyReviewBodyType = z.infer<typeof replyReviewBodySchema>
export type ReviewIdParamType = z.infer<typeof reviewIdParamSchema>
export type GetReviewsQueryType = z.infer<typeof getReviewsQuerySchema>

```

# modules\loyalty-engage\review\review.service.ts

| Property | Value |
|----------|-------|
| Path | `modules\loyalty-engage\review\review.service.ts` |
| Size | 5,485 bytes |
| Extension | `.ts` |
| Modified | 2026-10-09 18:28:46.417457 |

```typescript
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  isUniqueConstraintPrismaError,
} from '@/common/errors'
import { createLogger } from '@/common/logger'
import { ReviewRepo } from './review.repo'
import {
  CreateReviewBodyType,
  GetReviewsQueryType,
  ReplyReviewBodyType,
} from './review.schema'

const logger = createLogger('ReviewService')

export class ReviewService {
  constructor(private reviewRepo = new ReviewRepo()) {}

  async createReview(userId: number, body: CreateReviewBodyType) {
    logger.info({ userId, productId: body.productId, orderId: body.orderId }, 'createReview: initiated')

    if (!body.orderId) {
      throw new BadRequestError('Bạn chỉ có thể đánh giá sản phẩm từ đơn hàng đã giao thành công')
    }

    const product = await this.reviewRepo.findProductById(body.productId)
    if (!product) {
      throw new NotFoundError('Sản phẩm không tồn tại')
    }

    const validOrder = await this.reviewRepo.verifyDeliveredOrderProduct(
      userId,
      body.orderId,
      body.productId,
    )
    if (!validOrder) {
      throw new BadRequestError(
        'Bạn chỉ có thể đánh giá sản phẩm đã mua từ đơn hàng đã giao thành công (DELIVERED)',
      )
    }

    try {
      const review = await this.reviewRepo.createReview({
        userId,
        productId: body.productId,
        orderId: body.orderId,
        rating: body.rating,
        content: body.content,
        mediaUrls: body.mediaUrls,
      })

      logger.info(
        { reviewId: review.id, userId, productId: body.productId, orderId: body.orderId },
        'createReview: review created successfully',
      )

      await this.reviewRepo.syncProductRatingHook(body.productId).catch((hookErr) => {
        logger.warn({ productId: body.productId, hookErr }, 'createReview: rating sync hook warning')
      })

      return { message: 'Đánh giá sản phẩm thành công', data: review }
    } catch (error: any) {
      if (isUniqueConstraintPrismaError(error)) {
        logger.warn(
          { userId, productId: body.productId, orderId: body.orderId },
          'createReview: duplicate review rejected via database unique constraint (P2002)',
        )
        throw new ConflictError('Bạn đã đánh giá sản phẩm này trong đơn hàng này rồi')
      }

      if (error?.code === 'P2003') {
        logger.warn(
          { userId, productId: body.productId, orderId: body.orderId },
          'createReview: foreign key constraint failed (P2003)',
        )
        throw new NotFoundError('Sản phẩm hoặc đơn hàng không tồn tại')
      }

      throw error
    }
  }

  async getReviewsByProduct(query: GetReviewsQueryType) {
    const { productId, page, limit, rating } = query
    const skip = (page - 1) * limit

    const product = await this.reviewRepo.findProductById(productId)
    if (!product) {
      throw new NotFoundError('Sản phẩm không tồn tại')
    }

    const [{ data, total }, ratingStats] = await Promise.all([
      this.reviewRepo.findReviewsByProductId(productId, skip, limit, rating),
      this.reviewRepo.getAverageRating(productId),
    ])

    return {
      data,
      ratingStats,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    }
  }

  async getReviewById(id: number) {
    const review = await this.reviewRepo.findReviewById(id)
    if (!review) throw new NotFoundError('Đánh giá không tồn tại')
    return { data: review }
  }

  async replyToReview(id: number, body: ReplyReviewBodyType) {
    const review = await this.reviewRepo.findReviewById(id)
    if (!review) throw new NotFoundError('Đánh giá không tồn tại')

    const updated = await this.reviewRepo.updateShopReply(id, body.shopReply)

    logger.info({ reviewId: id }, 'replyToReview: shop reply saved')

    return { message: 'Đã gửi phản hồi thành công', data: updated }
  }

  async toggleHideReview(id: number, isHidden: boolean) {
    const review = await this.reviewRepo.findReviewById(id)
    if (!review) throw new NotFoundError('Đánh giá không tồn tại')

    const updated = await this.reviewRepo.toggleHideReview(id, isHidden)

    logger.info({ reviewId: id, isHidden }, 'toggleHideReview: visibility changed')

    await this.reviewRepo.syncProductRatingHook(review.productId).catch((hookErr) => {
      logger.warn({ productId: review.productId, hookErr }, 'toggleHideReview: rating sync hook warning')
    })

    return {
      message: isHidden ? 'Đã ẩn đánh giá' : 'Đã hiện đánh giá',
      data: updated,
    }
  }

  /**
   * =========================================================================================
   * @WARNING CONTRACT RULES: CROSS-MODULE HOOK FOR CATALOG & PRODUCT AGGREGATION
   * 
   * GỬI TEAM CATALOG & SEARCH:
   * BẮT BUỘC GỌI HOOK NÀY: `syncProductRatingHook(productId, tx)` ĐỂ ĐỒNG BỘ RATING SNAPSHOT
   * VÀO REDIS CACHE, TRÁNH GÂY NGHẼN TỔNG HỢP REVIEW TRÊN POSTGRESQL!
   * =========================================================================================
   */
  async syncProductRatingHook(productId: number, tx?: any) {
    return this.reviewRepo.syncProductRatingHook(productId, tx)
  }
}

```

# modules\loyalty-engage\voucher\voucher.controller.ts

| Property | Value |
|----------|-------|
| Path | `modules\loyalty-engage\voucher\voucher.controller.ts` |
| Size | 2,415 bytes |
| Extension | `.ts` |
| Modified | 2026-10-11 17:23:08.207610 |

```typescript
import { NextFunction, Request, Response } from 'express'
import { VoucherService } from './voucher.service'

export class VoucherController {
  constructor(private voucherService = new VoucherService()) {}

  listVouchers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.voucherService.listVouchers(req.query as any)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  getVoucherById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id)
      const data = await this.voucherService.getVoucherById(id)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  createVoucher = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.voucherService.createVoucher(req.body)
      return res.status(201).json({ statusCode: 201, ...data })
    } catch (error) {
      next(error)
    }
  }

  updateVoucher = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id)
      const data = await this.voucherService.updateVoucher(id, req.body)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  deleteVoucher = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id)
      const data = await this.voucherService.deleteVoucher(id)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  validateVoucher = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const data = await this.voucherService.validateAndCalculate(req.body, userId)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  applyVoucher = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const data = await this.voucherService.applyVoucher(req.body.code, userId)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }
}

```

# modules\loyalty-engage\voucher\voucher.repo.ts

| Property | Value |
|----------|-------|
| Path | `modules\loyalty-engage\voucher\voucher.repo.ts` |
| Size | 25,532 bytes |
| Extension | `.ts` |
| Modified | 2026-10-11 17:23:08.210646 |

```typescript
import Redis from 'ioredis'
import { prisma } from '@/database/prisma'
import { redisClient, redlock } from '@/database/redis'
import { createLogger } from '@/common/logger'
import { BadRequestError, NotFoundError } from '@/common/errors'
import { CreateVoucherBodyType, UpdateVoucherBodyType } from './voucher.schema'

const logger = createLogger('VoucherRepo')

const COLD_START_LOCK_TTL_MS = 3_000

export type VoucherFailureReason =
  | 'VOUCHER_NOT_FOUND'
  | 'VOUCHER_INACTIVE'
  | 'VOUCHER_NOT_STARTED'
  | 'VOUCHER_EXPIRED'
  | 'VOUCHER_USAGE_LIMIT_REACHED'
  | 'USER_USAGE_LIMIT_REACHED'

export type AtomicApplyVoucherResult =
  | { success: true; voucherId: number; code: string }
  | { success: false; reason: VoucherFailureReason }

export const VOUCHER_TOTAL_KEY_PREFIX = 'voucher:total:'
export const VOUCHER_USAGE_KEY_PREFIX = 'voucher:usage:'
export const VOUCHER_META_KEY_PREFIX = 'voucher:meta:'
const VOUCHER_META_CACHE_TTL_SECONDS = 30

export class VoucherRepo {
  constructor(private readonly redis: Redis = redisClient) {}

  async findAll(skip: number, take: number, isActive?: boolean) {
    const where = {
      deletedAt: null,
      ...(isActive !== undefined ? { isActive } : {}),
    }
    const [data, total] = await prisma.$transaction([
      prisma.voucher.findMany({ where, orderBy: { createdAt: 'desc' }, skip, take }),
      prisma.voucher.count({ where }),
    ])
    return { data, total }
  }

  async findById(id: number) {
    return prisma.voucher.findFirst({ where: { id, deletedAt: null } })
  }

  async findByCode(code: string) {
    const normalized = code.trim().toUpperCase()
    return prisma.voucher.findFirst({ where: { code: normalized, deletedAt: null } })
  }

  async findByCodeIncludingDeleted(code: string) {
    const normalized = code.trim().toUpperCase()
    return prisma.voucher.findFirst({ where: { code: normalized } })
  }

  async countUserVoucherUsage(userId: number, voucherCode: string): Promise<number> {
    const normalized = voucherCode.trim().toUpperCase()
    const usageKey = `${VOUCHER_USAGE_KEY_PREFIX}${normalized}`

    try {
      const countStr = await this.redis.hget(usageKey, userId.toString())
      if (countStr !== null) {
        return parseInt(countStr, 10)
      }
    } catch (err) {
      logger.warn({ voucherCode: normalized, userId, err }, 'countUserVoucherUsage: Redis error, falling back to DB')
    }

    return prisma.order.count({
      where: { userId, voucherCode: normalized, deletedAt: null },
    })
  }

  async getVoucherMetadata(code: string) {
    const normalized = code.trim().toUpperCase()
    const metaKey = `${VOUCHER_META_KEY_PREFIX}${normalized}`

    try {
      const cached = await this.redis.get(metaKey)
      if (cached) {
        logger.debug({ code: normalized }, 'getVoucherMetadata: cache hit from Redis')
        return JSON.parse(cached)
      }
    } catch (err) {
      logger.warn({ code: normalized, err }, 'getVoucherMetadata: Redis read error, falling back to database')
    }

    const voucher = await prisma.voucher.findFirst({
      where: { code: normalized, deletedAt: null },
    })

    if (voucher) {
      try {
        await this.redis.set(
          metaKey,
          JSON.stringify(voucher),
          'EX',
          VOUCHER_META_CACHE_TTL_SECONDS,
        )
        logger.debug({ code: normalized, voucherId: voucher.id }, 'getVoucherMetadata: cached metadata to Redis')
      } catch (err) {
        logger.warn({ code: normalized, err }, 'getVoucherMetadata: failed to write metadata cache to Redis')
      }
    }

    return voucher
  }

  async invalidateVoucherCache(code: string) {
    const normalized = code.trim().toUpperCase()
    const metaKey = `${VOUCHER_META_KEY_PREFIX}${normalized}`
    try {
      await this.redis.del(metaKey)
      logger.info({ code: normalized }, 'invalidateVoucherCache: evicted voucher cache from Redis')
    } catch (err) {
      logger.warn({ code: normalized, err }, 'invalidateVoucherCache: failed to evict cache from Redis')
    }
  }

  async create(data: CreateVoucherBodyType) {
    return prisma.voucher.create({
      data: {
        code: data.code,
        discountType: data.discountType,
        discountValue: data.discountValue,
        minOrderValue: data.minOrderValue,
        maxDiscountAmt: data.maxDiscountAmt,
        totalUsageLimit: data.totalUsageLimit,
        userUsageLimit: data.userUsageLimit,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        isActive: data.isActive,
      },
    })
  }

  async update(id: number, data: UpdateVoucherBodyType) {
    const updated = await prisma.voucher.update({
      where: { id },
      data: {
        ...(data.code !== undefined && { code: data.code }),
        ...(data.discountType !== undefined && { discountType: data.discountType }),
        ...(data.discountValue !== undefined && { discountValue: data.discountValue }),
        ...(data.minOrderValue !== undefined && { minOrderValue: data.minOrderValue }),
        ...(data.maxDiscountAmt !== undefined && { maxDiscountAmt: data.maxDiscountAmt }),
        ...(data.totalUsageLimit !== undefined && { totalUsageLimit: data.totalUsageLimit }),
        ...(data.userUsageLimit !== undefined && { userUsageLimit: data.userUsageLimit }),
        ...(data.startDate !== undefined && { startDate: new Date(data.startDate) }),
        ...(data.endDate !== undefined && { endDate: new Date(data.endDate) }),
        ...(data.isActive !== undefined && { isActive: data.isActive }),
      },
    })

    await this.invalidateVoucherCache(updated.code)
    return updated
  }

  async softDelete(id: number) {
    const deleted = await prisma.voucher.update({ where: { id }, data: { deletedAt: new Date() } })
    await this.invalidateVoucherCache(deleted.code)
    return deleted
  }

  async atomicApplyVoucher(
    code: string,
    userId: number,
  ): Promise<AtomicApplyVoucherResult> {
    const normalizedCode = code.trim().toUpperCase()
    logger.info(
      { code: normalizedCode, userId },
      'atomicApplyVoucher: initiating high-concurrency voucher application',
    )

    const voucher = await this.getVoucherMetadata(normalizedCode)

    if (!voucher) {
      logger.warn({ code: normalizedCode, userId }, 'atomicApplyVoucher: voucher not found')
      return { success: false, reason: 'VOUCHER_NOT_FOUND' }
    }

    if (!voucher.isActive) {
      logger.warn(
        { code: normalizedCode, userId, voucherId: voucher.id },
        'atomicApplyVoucher: voucher is inactive',
      )
      return { success: false, reason: 'VOUCHER_INACTIVE' }
    }

    const now = new Date()
    const startDate = new Date(voucher.startDate)
    const endDate = new Date(voucher.endDate)

    if (now < startDate) {
      logger.warn(
        { code: normalizedCode, userId, voucherId: voucher.id, startDate },
        'atomicApplyVoucher: voucher not started yet',
      )
      return { success: false, reason: 'VOUCHER_NOT_STARTED' }
    }

    if (now > endDate) {
      logger.warn(
        { code: normalizedCode, userId, voucherId: voucher.id, endDate },
        'atomicApplyVoucher: voucher expired',
      )
      return { success: false, reason: 'VOUCHER_EXPIRED' }
    }

    const ttlSeconds = Math.max(
      Math.ceil((endDate.getTime() - now.getTime()) / 1000) + 86400,
      3600,
    )

    const totalUsageKey = `${VOUCHER_TOTAL_KEY_PREFIX}${normalizedCode}`
    const userUsageKey = `${VOUCHER_USAGE_KEY_PREFIX}${normalizedCode}`
    const userIdStr = userId.toString()

    try {
      await this.redis.set(
        totalUsageKey,
        voucher.usedCount.toString(),
        'EX',
        ttlSeconds,
        'NX',
      )

      if (voucher.userUsageLimit > 0) {
        const userFieldExists = await this.redis.hexists(userUsageKey, userIdStr)
        if (!userFieldExists) {
          const lockKey = `lock:voucher:seed:${normalizedCode}:${userIdStr}`
          let lock: Awaited<ReturnType<typeof redlock.acquire>> | null = null
          try {
            lock = await redlock.acquire([lockKey], COLD_START_LOCK_TTL_MS)

            const fieldExistsAfterLock = await this.redis.hexists(userUsageKey, userIdStr)
            if (!fieldExistsAfterLock) {
              const priorUsage = await prisma.order.count({
                where: { userId, voucherCode: normalizedCode, deletedAt: null },
              })
              await this.redis.hsetnx(userUsageKey, userIdStr, priorUsage.toString())
              await this.redis.expire(userUsageKey, ttlSeconds)
              logger.debug(
                { code: normalizedCode, userId, priorUsage },
                'atomicApplyVoucher: cold-start seed completed under distributed lock',
              )
            } else {
              logger.debug(
                { code: normalizedCode, userId },
                'atomicApplyVoucher: field already seeded by concurrent winner, skipping DB read',
              )
            }
          } catch (lockErr: unknown) {
            logger.warn(
              { code: normalizedCode, userId, err: lockErr },
              'atomicApplyVoucher: could not acquire cold-start seed lock — skipping DB seed to prevent stampede',
            )
          } finally {
            if (lock) {
              await lock.release().catch((releaseErr: unknown) => {
                logger.warn(
                  { code: normalizedCode, userId, err: releaseErr },
                  'atomicApplyVoucher: failed to release cold-start seed lock',
                )
              })
            }
          }
        }
      }
    } catch (seedErr) {
      logger.warn(
        { code: normalizedCode, userId, err: seedErr },
        'atomicApplyVoucher: Redis cold-start seed warning (proceeding to atomic phase)',
      )
    }

    const multi = this.redis.multi()
    multi.hincrby(userUsageKey, userIdStr, 1)
    multi.incr(totalUsageKey)
    multi.expire(userUsageKey, ttlSeconds)
    multi.expire(totalUsageKey, ttlSeconds)

    const execResults = await multi.exec()

    if (!execResults || execResults.length < 2) {
      logger.error(
        { code: normalizedCode, userId },
        'atomicApplyVoucher: Redis multi transaction returned empty results',
      )
      throw new Error('Lỗi giao dịch phân tán Redis khi áp dụng voucher')
    }

    const [userIncrErr, rawUserUsage] = execResults[0]
    const [totalIncrErr, rawTotalUsage] = execResults[1]

    if (userIncrErr || totalIncrErr) {
      logger.error(
        { code: normalizedCode, userId, userIncrErr, totalIncrErr },
        'atomicApplyVoucher: Redis atomic increment failed',
      )
      throw (userIncrErr || totalIncrErr)
    }

    const newUserUsage = Number(rawUserUsage)
    const newTotalUsage = Number(rawTotalUsage)

    logger.debug(
      {
        code: normalizedCode,
        userId,
        newUserUsage,
        newTotalUsage,
        totalUsageLimit: voucher.totalUsageLimit,
        userUsageLimit: voucher.userUsageLimit,
      },
      'atomicApplyVoucher: Redis atomic counters incremented',
    )

    if (voucher.totalUsageLimit > 0 && newTotalUsage > voucher.totalUsageLimit) {
      logger.warn(
        {
          code: normalizedCode,
          userId,
          newTotalUsage,
          totalUsageLimit: voucher.totalUsageLimit,
        },
        'atomicApplyVoucher: total usage limit reached, rolling back Redis counters',
      )

      const rollbackMulti = this.redis.multi()
      rollbackMulti.hincrby(userUsageKey, userIdStr, -1)
      rollbackMulti.decr(totalUsageKey)
      await rollbackMulti.exec()

      return { success: false, reason: 'VOUCHER_USAGE_LIMIT_REACHED' }
    }

    if (voucher.userUsageLimit > 0 && newUserUsage > voucher.userUsageLimit) {
      logger.warn(
        {
          code: normalizedCode,
          userId,
          newUserUsage,
          userUsageLimit: voucher.userUsageLimit,
        },
        'atomicApplyVoucher: user usage limit reached, rolling back Redis counters',
      )

      const rollbackMulti = this.redis.multi()
      rollbackMulti.hincrby(userUsageKey, userIdStr, -1)
      rollbackMulti.decr(totalUsageKey)
      await rollbackMulti.exec()

      return { success: false, reason: 'USER_USAGE_LIMIT_REACHED' }
    }

    try {
      await prisma.voucher.update({
        where: { id: voucher.id },
        data: { usedCount: { increment: 1 } },
      })

      logger.info(
        {
          voucherId: voucher.id,
          code: normalizedCode,
          userId,
          newTotalUsage,
          newUserUsage,
        },
        'atomicApplyVoucher: voucher applied successfully and DB synchronized',
      )

      return { success: true, voucherId: voucher.id, code: voucher.code }
    } catch (dbError) {
      logger.error(
        { err: dbError, voucherId: voucher.id, code: normalizedCode, userId },
        'atomicApplyVoucher: DB update failed after Redis commit, executing compensating rollback',
      )

      const rollbackMulti = this.redis.multi()
      rollbackMulti.hincrby(userUsageKey, userIdStr, -1)
      rollbackMulti.decr(totalUsageKey)
      await rollbackMulti.exec()

      throw dbError
    }
  }

  async releaseVoucher(code: string, userId: number) {
    const normalizedCode = code.trim().toUpperCase()
    const totalUsageKey = `${VOUCHER_TOTAL_KEY_PREFIX}${normalizedCode}`
    const userUsageKey = `${VOUCHER_USAGE_KEY_PREFIX}${normalizedCode}`
    const userIdStr = userId.toString()

    logger.info({ code: normalizedCode, userId }, 'releaseVoucher: releasing voucher allocation')

    const rollbackMulti = this.redis.multi()
    rollbackMulti.hincrby(userUsageKey, userIdStr, -1)
    rollbackMulti.decr(totalUsageKey)
    await rollbackMulti.exec()

    await prisma.voucher.updateMany({
      where: { code: normalizedCode, usedCount: { gt: 0 } },
      data: { usedCount: { decrement: 1 } },
    })
  }

  /**
   * =========================================================================================
   * @WARNING CONTRACT RULES: CROSS-MODULE DEFENSIVE INTERFACE FOR CART-ORDER
   * 
   *  ██╗    ██╗ █████╗ ██████╗ ███╗   ██╗██╗███╗   ██╗ ██████╗ 
   *  ██║    ██║██╔══██╗██╔══██╗████╗  ██║██║████╗  ██║██╔════╝ 
   *  ██║ █╗ ██║███████║██████╔╝██╔██╗ ██║██║██╔██╗ ██║██║  ███╗
   *  ██║███╗██║██╔══██║██╔══██╗██║╚██╗██║██║██║╚██╗██║██║   ██║
   *  ╚███╔███╔╝██║  ██║██║  ██║██║ ╚████║██║██║ ╚████║╚██████╔╝
   *   ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝╚═╝  ╚═══╝ ╚═════╝ 
   * =========================================================================================
   * GỬI TEAM CART-ORDER (CHECKOUT MODULE):
   * 
   * TUYỆT ĐỐI KHÔNG GỌI TRỰC TIẾP `increment` VÀO DB (PostgreSQL) KHI CREATE ORDER!
   * Việc tự ý cập nhật DB mà không qua Redis sẽ gây ra lỗi SPLIT-BRAIN cực kỳ nguy hiểm:
   *   - Redis Atomic Counter bị lệch pha hoàn toàn với PostgreSQL.
   *   - Gây lỗi OVERSELL (bán vượt số lượng voucher) trong các đợt Flash Sale / Traffic cao.
   * 
   * BẮT BUỘC PHẢI GỌI HÀM NÀY: `applyVoucherSafely(voucherCode, userId, prismaTx)`
   * và truyền Prisma Interactive Transaction Client (`tx`) vào để bảo đảm:
   *   1. Tăng/Trừ Redis Atomic Counter trước (ioredis).
   *   2. Báo lỗi ngay lập tức nếu Redis báo hết lượt (Oversell Protection).
   *   3. Cập nhật biến động vào bảng Voucher thông qua `prismaTx` (Transaction chung).
   *   4. Tự động Rollback bộ đếm Redis nếu cập nhật DB thất bại.
   * =========================================================================================
   */
  async applyVoucherSafely(voucherCode: string, userId: number, prismaTx: any) {
    const normalizedCode = voucherCode.trim().toUpperCase()
    logger.info({ voucherCode: normalizedCode, userId }, 'applyVoucherSafely: cross-module application initiated')

    const voucher = await this.getVoucherMetadata(normalizedCode)
    if (!voucher) {
      throw new NotFoundError('Mã voucher không tồn tại')
    }

    if (!voucher.isActive) {
      throw new BadRequestError('Voucher đã bị vô hiệu hóa')
    }

    const now = new Date()
    const startDate = new Date(voucher.startDate)
    const endDate = new Date(voucher.endDate)

    if (now < startDate) {
      throw new BadRequestError('Voucher chưa đến thời gian áp dụng')
    }
    if (now > endDate) {
      throw new BadRequestError('Voucher đã hết hạn sử dụng')
    }

    const ttlSeconds = Math.max(
      Math.ceil((endDate.getTime() - now.getTime()) / 1000) + 86400,
      3600,
    )
    const totalUsageKey = `${VOUCHER_TOTAL_KEY_PREFIX}${normalizedCode}`
    const userUsageKey = `${VOUCHER_USAGE_KEY_PREFIX}${normalizedCode}`
    const userIdStr = userId.toString()

    try {
      await this.redis.set(totalUsageKey, voucher.usedCount.toString(), 'EX', ttlSeconds, 'NX')
      if (voucher.userUsageLimit > 0) {
        const userFieldExists = await this.redis.hexists(userUsageKey, userIdStr)
        if (!userFieldExists) {
          const lockKey = `lock:voucher:seed:${normalizedCode}:${userIdStr}`
          let lock: Awaited<ReturnType<typeof redlock.acquire>> | null = null
          try {
            lock = await redlock.acquire([lockKey], COLD_START_LOCK_TTL_MS)
            const fieldExistsAfterLock = await this.redis.hexists(userUsageKey, userIdStr)
            if (!fieldExistsAfterLock) {
              const priorUsage = await prisma.order.count({
                where: { userId, voucherCode: normalizedCode, deletedAt: null },
              })
              await this.redis.hsetnx(userUsageKey, userIdStr, priorUsage.toString())
              await this.redis.expire(userUsageKey, ttlSeconds)
            }
          } catch (lockErr) {
            logger.warn({ code: normalizedCode, userId, lockErr }, 'applyVoucherSafely: seed lock failed, continuing')
          } finally {
            if (lock) await lock.release().catch(() => {})
          }
        }
      }
    } catch (seedErr) {
      logger.warn({ code: normalizedCode, userId, seedErr }, 'applyVoucherSafely: seed warning')
    }

    const multi = this.redis.multi()
    multi.hincrby(userUsageKey, userIdStr, 1)
    multi.incr(totalUsageKey)
    multi.expire(userUsageKey, ttlSeconds)
    multi.expire(totalUsageKey, ttlSeconds)

    const execResults = await multi.exec()
    if (!execResults || execResults.length < 2) {
      throw new Error('Lỗi giao dịch phân tán Redis khi áp dụng voucher')
    }

    const [userIncrErr, rawUserUsage] = execResults[0]
    const [totalIncrErr, rawTotalUsage] = execResults[1]

    if (userIncrErr || totalIncrErr) {
      throw (userIncrErr || totalIncrErr)
    }

    const newUserUsage = Number(rawUserUsage)
    const newTotalUsage = Number(rawTotalUsage)

    if (voucher.totalUsageLimit > 0 && newTotalUsage > voucher.totalUsageLimit) {
      const rollbackMulti = this.redis.multi()
      rollbackMulti.hincrby(userUsageKey, userIdStr, -1)
      rollbackMulti.decr(totalUsageKey)
      await rollbackMulti.exec()

      throw new BadRequestError('Mã giảm giá đã hết lượt sử dụng toàn hệ thống')
    }

    if (voucher.userUsageLimit > 0 && newUserUsage > voucher.userUsageLimit) {
      const rollbackMulti = this.redis.multi()
      rollbackMulti.hincrby(userUsageKey, userIdStr, -1)
      rollbackMulti.decr(totalUsageKey)
      await rollbackMulti.exec()

      throw new BadRequestError(`Bạn đã dùng hết ${voucher.userUsageLimit} lượt sử dụng mã voucher này`)
    }

    const client = prismaTx || prisma
    try {
      const updatedVoucher = await client.voucher.update({
        where: { id: voucher.id },
        data: { usedCount: { increment: 1 } },
      })

      logger.info(
        { voucherId: voucher.id, code: normalizedCode, userId, newTotalUsage, newUserUsage },
        'applyVoucherSafely: synchronized across Redis and PostgreSQL transaction successfully',
      )

      return updatedVoucher
    } catch (dbError) {
      const rollbackMulti = this.redis.multi()
      rollbackMulti.hincrby(userUsageKey, userIdStr, -1)
      rollbackMulti.decr(totalUsageKey)
      await rollbackMulti.exec()

      logger.error(
        { err: dbError, voucherId: voucher.id, code: normalizedCode, userId },
        'applyVoucherSafely: DB update failed within transaction, rolled back Redis counter',
      )

      throw dbError
    }
  }

  /**
   * =========================================================================================
   * @WARNING CONTRACT RULES: CROSS-MODULE DEFENSIVE INTERFACE FOR ORDER CANCELLATION / ROLLBACK
   * 
   *  ██╗    ██╗ █████╗ ██████╗ ███╗   ██╗██╗███╗   ██╗ ██████╗ 
   *  ██║    ██║██╔══██╗██╔══██╗████╗  ██║██║████╗  ██║██╔════╝ 
   *  ██║ █╗ ██║███████║██████╔╝██╔██╗ ██║██║██╔██╗ ██║██║  ███╗
   *  ██║███╗██║██╔══██║██╔══██╗██║╚██╗██║██║██║╚██╗██║██║   ██║
   *  ╚███╔███╔╝██║  ██║██║  ██║██║ ╚████║██║██║ ╚████║╚██████╔╝
   *   ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝╚═╝  ╚═══╝ ╚═════╝ 
   * =========================================================================================
   * GỬI TEAM CART-ORDER & PAYMENT/CHECKOUT:
   * 
   * KHI HỦY ĐƠN HÀNG (CANCEL), HOÀN TIỀN (REFUND), HOẶC CHECKOUT TRANSACTION THẤT BẠI:
   * TUYỆT ĐỐI KHÔNG TỰ Ý SỬA DB HOẶC BỎ QUA REDIS COUNTER!
   * Nếu không gọi qua Voucher Service:
   *   - Bộ đếm Redis (`voucher:used:{code}` và `voucher:users:{code}`) KHÔNG được hoàn lại.
   *   - Khách hàng bị mất vĩnh viễn lượt dùng mã dù đơn hàng đã hủy!
   *   - Hiện tại hàm `orderRepo.refundVoucherUsage()` KHÔNG TỒN TẠI trong Order Module!
   * 
   * BẮT BUỘC GỌI HÀM NÀY: `releaseVoucherSafely(voucherCode, userId, prismaTx)`
   * và truyền Prisma Transaction Client (`tx`) vào:
   *   1. Giảm bộ đếm Redis tổng và Redis per-user (`hincrby -1`, `decr`).
   *   2. Giảm `usedCount` trong bảng Voucher thông qua `prismaTx` (không âm).
   *   3. Đảm bảo toàn vẹn tính nhất quán giữa Redis và PostgreSQL.
   * =========================================================================================
   */
  async releaseVoucherSafely(voucherCode: string, userId: number, prismaTx?: any) {
    const normalizedCode = voucherCode.trim().toUpperCase()
    const voucher = await this.getVoucherMetadata(normalizedCode)
    if (!voucher) {
      logger.warn({ voucherCode: normalizedCode }, 'releaseVoucherSafely: voucher not found')
      return null
    }

    const totalUsageKey = `${VOUCHER_TOTAL_KEY_PREFIX}${normalizedCode}`
    const userUsageKey = `${VOUCHER_USAGE_KEY_PREFIX}${normalizedCode}`
    const userIdStr = userId.toString()

    try {
      const multi = this.redis.multi()
      multi.hincrby(userUsageKey, userIdStr, -1)
      multi.decr(totalUsageKey)
      await multi.exec()
    } catch (redisErr) {
      logger.error({ err: redisErr, code: normalizedCode, userId }, 'releaseVoucherSafely: redis decrement error')
    }

    const client = prismaTx || prisma
    try {
      const updated = await client.voucher.updateMany({
        where: { id: voucher.id, usedCount: { gt: 0 } },
        data: {
          usedCount: {
            decrement: 1,
          },
        },
      })
      logger.info(
        { voucherId: voucher.id, code: normalizedCode, userId },
        'releaseVoucherSafely: voucher quota released successfully',
      )
      return updated
    } catch (dbErr) {
      logger.error({ err: dbErr, voucherId: voucher.id, code: normalizedCode }, 'releaseVoucherSafely: db update error')
      throw dbErr
    }
  }
}

```

# modules\loyalty-engage\voucher\voucher.routes.ts

| Property | Value |
|----------|-------|
| Path | `modules\loyalty-engage\voucher\voucher.routes.ts` |
| Size | 1,587 bytes |
| Extension | `.ts` |
| Modified | 2026-10-09 18:28:46.423451 |

```typescript
import { Router } from 'express'
import { requireAuth } from '@/middlewares/guards/auth.guard'
import { requireAdmin } from '@/middlewares/guards/role.guard'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import { VoucherController } from './voucher.controller'
import {
  createVoucherBodySchema,
  listVoucherQuerySchema,
  updateVoucherBodySchema,
  validateVoucherBodySchema,
  voucherIdParamSchema,
} from './voucher.schema'

export const voucherRouter = Router()
const controller = new VoucherController()

voucherRouter.post(
  '/validate',
  requireAuth,
  validateRequest({ body: validateVoucherBodySchema }),
  controller.validateVoucher,
)

voucherRouter.post(
  '/apply',
  requireAuth,
  requireAdmin,
  controller.applyVoucher,
)

voucherRouter.get(
  '/',
  requireAuth,
  requireAdmin,
  validateRequest({ query: listVoucherQuerySchema }),
  controller.listVouchers,
)

voucherRouter.post(
  '/',
  requireAuth,
  requireAdmin,
  validateRequest({ body: createVoucherBodySchema }),
  controller.createVoucher,
)

voucherRouter.get(
  '/:id',
  requireAuth,
  requireAdmin,
  validateRequest({ params: voucherIdParamSchema }),
  controller.getVoucherById,
)

voucherRouter.patch(
  '/:id',
  requireAuth,
  requireAdmin,
  validateRequest({ params: voucherIdParamSchema, body: updateVoucherBodySchema }),
  controller.updateVoucher,
)

voucherRouter.delete(
  '/:id',
  requireAuth,
  requireAdmin,
  validateRequest({ params: voucherIdParamSchema }),
  controller.deleteVoucher,
)

```

# modules\loyalty-engage\voucher\voucher.schema.ts

| Property | Value |
|----------|-------|
| Path | `modules\loyalty-engage\voucher\voucher.schema.ts` |
| Size | 3,336 bytes |
| Extension | `.ts` |
| Modified | 2026-10-09 18:28:46.425790 |

```typescript
import { z } from 'zod'

const voucherBaseSchema = z.object({
  code: z
    .string()
    .trim()
    .min(3, 'Mã voucher tối thiểu 3 ký tự')
    .max(100, 'Mã voucher tối đa 100 ký tự')
    .toUpperCase(),
  discountType: z.enum(['PERCENTAGE', 'FIXED_AMOUNT'], {
    errorMap: () => ({ message: 'discountType phải là PERCENTAGE hoặc FIXED_AMOUNT' }),
  }),
  discountValue: z.number().positive('Giá trị giảm phải lớn hơn 0'),
  minOrderValue: z.number().min(0, 'Giá trị đơn tối thiểu không được âm').default(0),
  maxDiscountAmt: z.number().positive('Giảm tối đa phải lớn hơn 0').optional(),
  totalUsageLimit: z.number().int().min(0).default(0),
  userUsageLimit: z.number().int().min(1).default(1),
  startDate: z.string().datetime({ message: 'startDate phải đúng định dạng ISO 8601' }),
  endDate: z.string().datetime({ message: 'endDate phải đúng định dạng ISO 8601' }),
  isActive: z.boolean().default(true),
})

export const createVoucherBodySchema = voucherBaseSchema
  .refine(
    (data) => new Date(data.endDate) > new Date(data.startDate),
    { message: 'endDate phải sau startDate', path: ['endDate'] },
  )
  .refine(
    (data) => data.discountType !== 'PERCENTAGE' || (data.discountValue > 0 && data.discountValue <= 100),
    { message: 'Phần trăm giảm phải từ 1 đến 100', path: ['discountValue'] },
  )

export const updateVoucherBodySchema = voucherBaseSchema
  .partial()
  .refine(
    (data) => {
      if (data.endDate && data.startDate) {
        return new Date(data.endDate) > new Date(data.startDate)
      }
      return true
    },
    { message: 'endDate phải sau startDate', path: ['endDate'] },
  )
  .refine(
    (data) =>
      data.discountType !== 'PERCENTAGE' ||
      data.discountValue === undefined ||
      (data.discountValue > 0 && data.discountValue <= 100),
    { message: 'Phần trăm giảm phải từ 1 đến 100', path: ['discountValue'] },
  )

export const voucherIdParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, 'id phải là số nguyên dương')
    .transform(Number),
})

export const validateVoucherBodySchema = z.object({
  code: z.string().trim().min(1, 'Mã voucher là bắt buộc').toUpperCase(),
  orderTotal: z.number().positive('Tổng tiền đơn hàng phải lớn hơn 0'),
})

export const listVoucherQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((v) => (v ? parseInt(v, 10) : 1))
    .pipe(z.number().int().min(1)),
  limit: z
    .string()
    .optional()
    .transform((v) => (v ? parseInt(v, 10) : 10))
    .pipe(z.number().int().min(1).max(100)),
  isActive: z
    .string()
    .optional()
    .transform((v): boolean | undefined => {
      if (v === 'true') return true
      if (v === 'false') return false
      return undefined
    }),
})

export type CreateVoucherBodyType = z.infer<typeof createVoucherBodySchema>
export type UpdateVoucherBodyType = z.infer<typeof updateVoucherBodySchema>
export type VoucherIdParamType = z.infer<typeof voucherIdParamSchema>
export type ValidateVoucherBodyType = z.infer<typeof validateVoucherBodySchema>
export type ListVoucherQueryType = z.infer<typeof listVoucherQuerySchema>

```

# modules\loyalty-engage\voucher\voucher.service.ts

| Property | Value |
|----------|-------|
| Path | `modules\loyalty-engage\voucher\voucher.service.ts` |
| Size | 8,297 bytes |
| Extension | `.ts` |
| Modified | 2026-10-11 17:23:08.213610 |

```typescript
import { BadRequestError, ConflictError, NotFoundError, isUniqueConstraintPrismaError } from '@/common/errors'
import { createLogger } from '@/common/logger'
import { VoucherRepo, VoucherFailureReason } from './voucher.repo'
import {
  CreateVoucherBodyType,
  ListVoucherQueryType,
  UpdateVoucherBodyType,
  ValidateVoucherBodyType,
} from './voucher.schema'

const logger = createLogger('VoucherService')

export class VoucherService {
  constructor(private voucherRepo = new VoucherRepo()) {}

  async listVouchers(query: ListVoucherQueryType) {
    const { page, limit, isActive } = query
    const skip = (page - 1) * limit
    const { data, total } = await this.voucherRepo.findAll(skip, limit, isActive)
    return {
      data,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    }
  }

  async getVoucherById(id: number) {
    const voucher = await this.voucherRepo.findById(id)
    if (!voucher) throw new NotFoundError('Voucher không tồn tại')
    return { data: voucher }
  }

  async createVoucher(body: CreateVoucherBodyType) {
    logger.info({ code: body.code }, 'createVoucher: initiated')

    try {
      const voucher = await this.voucherRepo.create(body)
      logger.info({ voucherId: voucher.id, code: body.code }, 'createVoucher: created successfully')
      return { message: 'Tạo voucher thành công', data: voucher }
    } catch (error: any) {
      if (isUniqueConstraintPrismaError(error)) {
        logger.warn({ code: body.code }, 'createVoucher: code collision detected')
        throw new ConflictError(`Mã voucher "${body.code}" đã tồn tại trong hệ thống`)
      }
      throw error
    }
  }

  async updateVoucher(id: number, body: UpdateVoucherBodyType) {
    const voucher = await this.voucherRepo.findById(id)
    if (!voucher) throw new NotFoundError('Voucher không tồn tại')

    try {
      const updated = await this.voucherRepo.update(id, body)
      logger.info({ voucherId: id }, 'updateVoucher: updated successfully')
      return { message: 'Cập nhật voucher thành công', data: updated }
    } catch (error: any) {
      if (isUniqueConstraintPrismaError(error)) {
        logger.warn({ voucherId: id, code: body.code }, 'updateVoucher: duplicate code')
        throw new ConflictError(`Mã voucher "${body.code}" đã tồn tại trong hệ thống`)
      }
      throw error
    }
  }

  async deleteVoucher(id: number) {
    const voucher = await this.voucherRepo.findById(id)
    if (!voucher) throw new NotFoundError('Voucher không tồn tại')

    await this.voucherRepo.softDelete(id)
    logger.info({ voucherId: id }, 'deleteVoucher: soft-deleted')

    return { message: 'Xoá voucher thành công' }
  }

  async validateAndCalculate(body: ValidateVoucherBodyType, userId: number) {
    logger.info({ code: body.code, userId, orderTotal: body.orderTotal }, 'validateAndCalculate: initiated')

    const voucher = await this.voucherRepo.findByCode(body.code)
    if (!voucher) throw new NotFoundError('Mã voucher không hợp lệ hoặc không tồn tại')
    if (!voucher.isActive) throw new BadRequestError('Voucher đã bị vô hiệu hóa')

    const now = new Date()
    if (now < voucher.startDate) {
      throw new BadRequestError(
        `Voucher chưa có hiệu lực. Hiệu lực từ ${voucher.startDate.toLocaleDateString('vi-VN')}`,
      )
    }
    if (now > voucher.endDate) {
      throw new BadRequestError('Voucher đã hết hạn sử dụng')
    }

    if (voucher.totalUsageLimit > 0 && voucher.usedCount >= voucher.totalUsageLimit) {
      throw new BadRequestError('Voucher đã hết lượt sử dụng')
    }

    if (voucher.userUsageLimit > 0) {
      const userUsageCount = await this.voucherRepo.countUserVoucherUsage(userId, voucher.code)
      if (userUsageCount >= voucher.userUsageLimit) {
        throw new BadRequestError(
          `Bạn đã sử dụng mã voucher này ${userUsageCount} lần (tối đa ${voucher.userUsageLimit} lần/người)`,
        )
      }
    }

    const minOrderValue = Number(voucher.minOrderValue)
    if (body.orderTotal < minOrderValue) {
      throw new BadRequestError(
        `Đơn hàng tối thiểu ${minOrderValue.toLocaleString('vi-VN')} VNĐ để áp dụng voucher này`,
      )
    }

    let discountAmount: number
    if (voucher.discountType === 'PERCENTAGE') {
      discountAmount = (body.orderTotal * Number(voucher.discountValue)) / 100
      if (voucher.maxDiscountAmt) {
        discountAmount = Math.min(discountAmount, Number(voucher.maxDiscountAmt))
      }
    } else {
      discountAmount = Number(voucher.discountValue)
    }

    discountAmount = Math.min(discountAmount, body.orderTotal)

    logger.info(
      { code: body.code, userId, discountAmount: Math.round(discountAmount) },
      'validateAndCalculate: voucher valid',
    )

    return {
      message: 'Voucher hợp lệ',
      data: {
        code: voucher.code,
        discountType: voucher.discountType,
        discountAmount: Math.round(discountAmount),
        finalTotal: Math.round(body.orderTotal - discountAmount),
        voucher,
      },
    }
  }

  async applyVoucher(code: string, userId: number) {
    logger.info({ code, userId }, 'applyVoucher: initiating atomic voucher application')

    const result = await this.voucherRepo.atomicApplyVoucher(code, userId)

    if (!result.success) {
      logger.warn({ code, userId, reason: result.reason }, 'applyVoucher: atomic application rejected')

      const errorMap: Record<VoucherFailureReason, () => never> = {
        VOUCHER_NOT_FOUND: () => {
          throw new NotFoundError('Voucher không tồn tại')
        },
        VOUCHER_INACTIVE: () => {
          throw new BadRequestError('Voucher đã bị vô hiệu hóa')
        },
        VOUCHER_NOT_STARTED: () => {
          throw new BadRequestError('Voucher chưa có hiệu lực')
        },
        VOUCHER_EXPIRED: () => {
          throw new BadRequestError('Voucher đã hết hạn sử dụng')
        },
        VOUCHER_USAGE_LIMIT_REACHED: () => {
          throw new BadRequestError('Voucher đã hết lượt sử dụng')
        },
        USER_USAGE_LIMIT_REACHED: () => {
          throw new BadRequestError('Bạn đã dùng hết lượt sử dụng mã voucher này')
        },
      }

      const handler = errorMap[result.reason]
      if (handler) {
        handler()
      }

      throw new BadRequestError('Không thể áp dụng voucher')
    }

    logger.info({ code, userId, voucherId: result.voucherId }, 'applyVoucher: atomic apply succeeded')

    return { message: 'Đã áp dụng voucher thành công' }
  }

  /**
   * =========================================================================================
   * @WARNING CONTRACT RULES: CROSS-MODULE DEFENSIVE INTERFACE FOR CART-ORDER CHECKOUT
   * 
   * GỬI TEAM CART-ORDER:
   * BẮT BUỘC GỌI QUA INTERACTIVE TRANSACTION: `applyVoucherSafely(voucherCode, userId, prismaTx)`
   * ĐỂ BẢO ĐẢM TÍNH TOÀN VẸN ATOMIC TRÊN REDIS VÀ POSTGRESQL, CHỐNG OVERSELL VÀ SPLIT-BRAIN!
   * =========================================================================================
   */
  async applyVoucherSafely(voucherCode: string, userId: number, prismaTx: any) {
    return this.voucherRepo.applyVoucherSafely(voucherCode, userId, prismaTx)
  }

  /**
   * =========================================================================================
   * @WARNING CONTRACT RULES: CROSS-MODULE DEFENSIVE INTERFACE FOR CART-ORDER ROLLBACK/CANCEL
   * 
   * GỬI TEAM CART-ORDER & PAYMENT:
   * BẮT BUỘC GỌI QUA TRANSACTION: `releaseVoucherSafely(voucherCode, userId, prismaTx)`
   * ĐỂ HOÀN LẠI ATOMIC COUNTER TRÊN REDIS VÀ POSTGRESQL KHI ĐƠN BỊ HỦY!
   * =========================================================================================
   */
  async releaseVoucherSafely(voucherCode: string, userId: number, prismaTx?: any) {
    return this.voucherRepo.releaseVoucherSafely(voucherCode, userId, prismaTx)
  }
}

```

# modules\loyalty-engage\voucher\voucher.worker.ts

| Property | Value |
|----------|-------|
| Path | `modules\loyalty-engage\voucher\voucher.worker.ts` |
| Size | 4,716 bytes |
| Extension | `.ts` |
| Modified | 2026-10-09 18:28:46.429558 |

```typescript
import cron from 'node-cron'
import { prisma } from '@/database/prisma'
import { redisClient } from '@/database/redis'
import { createLogger } from '@/common/logger'
import { VOUCHER_TOTAL_KEY_PREFIX } from './voucher.repo'

const logger = createLogger('VoucherReconciliationWorker')

export interface ReconciliationReport {
  scannedCount: number
  reconciledCount: number
  discrepancies: Array<{
    voucherId: number
    code: string
    dbCount: number
    redisCount: number
    delta: number
  }>
  errors: Array<{
    code: string
    error: string
  }>
}

export async function reconcileVouchers(): Promise<ReconciliationReport> {
  logger.info('Starting nightly voucher reconciliation job...')

  const report: ReconciliationReport = {
    scannedCount: 0,
    reconciledCount: 0,
    discrepancies: [],
    errors: [],
  }

  try {
    const activeVouchers = await prisma.voucher.findMany({
      where: {
        deletedAt: null,
        isActive: true,
      },
      select: {
        id: true,
        code: true,
        usedCount: true,
        totalUsageLimit: true,
        endDate: true,
      },
    })

    report.scannedCount = activeVouchers.length
    logger.info({ count: activeVouchers.length }, 'Vouchers fetched for reconciliation')

    for (const voucher of activeVouchers) {
      try {
        const totalKey = `${VOUCHER_TOTAL_KEY_PREFIX}${voucher.code}`
        const redisCountStr = await redisClient.get(totalKey)

        if (redisCountStr === null) {
          const now = Date.now()
          const endTimestamp = new Date(voucher.endDate).getTime()
          const ttlSeconds = Math.max(Math.ceil((endTimestamp - now) / 1000) + 86400, 3600)

          await redisClient.set(totalKey, voucher.usedCount.toString(), 'EX', ttlSeconds, 'NX')
          logger.debug(
            { voucherId: voucher.id, code: voucher.code, seededCount: voucher.usedCount },
            'Voucher key seeded in Redis during reconciliation (cold-start recovery)',
          )
          continue
        }

        const redisCount = parseInt(redisCountStr, 10)
        const dbCount = voucher.usedCount

        if (redisCount !== dbCount) {
          const delta = redisCount - dbCount

          logger.warn(
            {
              voucherId: voucher.id,
              code: voucher.code,
              dbCount,
              redisCount,
              delta,
            },
            'Reconciliation discrepancy detected: Redis count differs from PostgreSQL count',
          )

          await prisma.voucher.update({
            where: { id: voucher.id },
            data: { usedCount: redisCount },
          })

          report.reconciledCount++
          report.discrepancies.push({
            voucherId: voucher.id,
            code: voucher.code,
            dbCount,
            redisCount,
            delta,
          })

          logger.info(
            {
              voucherId: voucher.id,
              code: voucher.code,
              previousDbCount: dbCount,
              syncedCount: redisCount,
            },
            'Voucher reconciliation completed: PostgreSQL synchronized with Redis authoritative count',
          )
        }
      } catch (itemError: unknown) {
        const errorMsg = itemError instanceof Error ? itemError.message : String(itemError)
        logger.error(
          { voucherId: voucher.id, code: voucher.code, err: itemError },
          'Error reconciling individual voucher, skipping to next item (fault-tolerant)',
        )
        report.errors.push({
          code: voucher.code,
          error: errorMsg,
        })
      }
    }

    logger.info(
      {
        scanned: report.scannedCount,
        reconciled: report.reconciledCount,
        discrepancyCount: report.discrepancies.length,
        errorCount: report.errors.length,
      },
      'Nightly voucher reconciliation job finished successfully',
    )
  } catch (batchError) {
    logger.error({ err: batchError }, 'Fatal error during voucher reconciliation batch process')
    throw batchError
  }

  return report
}

export function startVoucherReconciliationCron(cronExpression = '0 2 * * *') {
  logger.info({ schedule: cronExpression }, 'Registering voucher reconciliation cron job')

  const task = cron.schedule(cronExpression, async () => {
    logger.info('Scheduled cron trigger: initiating voucher reconciliation')
    try {
      await reconcileVouchers()
    } catch (err) {
      logger.error({ err }, 'Unhandled exception in scheduled voucher reconciliation')
    }
  })

  return task
}

```

# modules\upload\upload.routes.ts

| Property | Value |
|----------|-------|
| Path | `modules\upload\upload.routes.ts` |
| Size | 1,204 bytes |
| Extension | `.ts` |
| Modified | 2026-10-13 01:34:21.617690 |

```typescript
// src/modules/upload/upload.routes.ts
import { Router, Request, Response, NextFunction } from 'express';
import { storageService } from '@/common/service/storage.service';
import { requireAuth } from '@/middlewares/guards/auth.guard';
import { z } from 'zod';
import { validateRequest } from '@/middlewares/pipes/validate.pipe';

const uploadBodySchema = z.object({
  fileName: z.string().trim().min(1, 'Tên file không được để trống'),
  fileType: z.string().trim().optional().default('image/jpeg'),
  base64: z.string().min(1, 'Nội dung file không được để trống'),
  folder: z.enum(['avatars', 'products', 'reviews', 'chats', 'general']).optional().default('general'),
});

export const uploadRouter = Router();

uploadRouter.post(
  '/',
  requireAuth,
  validateRequest({ body: uploadBodySchema }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await storageService.uploadBase64(req.body);
      return res.status(200).json({
        statusCode: 200,
        message: 'Tải lên tập tin lên cloud thành công',
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }
);
```

# queues\payment.queue.ts

| Property | Value |
|----------|-------|
| Path | `queues\payment.queue.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-09-23 09:04:57.911701 |

```typescript

```

# queues\payment.worker.ts

| Property | Value |
|----------|-------|
| Path | `queues\payment.worker.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-09-23 09:04:57.930704 |

```typescript

```

# server.ts

| Property | Value |
|----------|-------|
| Path | `server.ts` |
| Size | 1,626 bytes |
| Extension | `.ts` |
| Modified | 2026-10-11 16:52:36.724387 |

```typescript
import { createServer } from "http";
import { createApp } from "./app";
import { envConfig } from "./config/env.config";
import { redisClient } from "./database/redis";
import { prisma } from './database/prisma'
import { initWebSocket, closeWebSocket } from "./common/websocket";
import { startVoucherReconciliationCron } from "./modules/loyalty-engage/voucher/voucher.worker";

async function bootstrap() {
  const app = createApp();
  const httpServer = createServer(app);

  // Kết nối Socket.io với Redis Pub/Sub adapter (Multi-Node K8s Scaling)
  initWebSocket(httpServer);

  // Khởi chạy cronjob đồng bộ hóa voucher định kỳ hàng đêm lúc 2:00 AM
  startVoucherReconciliationCron();

   const server = httpServer.listen(envConfig.PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${envConfig.PORT}`)
  })

  // Xử lý Graceful Shutdown
  const handleShutdown = async (signal: string) => {
    console.log(`\nNhận tín hiệu ${signal}. Đang đóng server...`);

    server.close(async () => {
      console.log("HTTP Server đã đóng.");
      await closeWebSocket();
      await prisma.$disconnect();
      console.log("Prisma đã ngắt kết nối.");
      redisClient.disconnect();
      console.log("Redis đã ngắt kết nối.");
      process.exit(0);
    });
  };

  process.on("SIGINT", () => handleShutdown("SIGINT"));
  process.on("SIGTERM", () => handleShutdown("SIGTERM"));
}

bootstrap().catch((err) => {
  console.error("Không thể khởi động ứng dụng:", err);
  process.exit(1);
});

```

# sockets\socket.server.ts

| Property | Value |
|----------|-------|
| Path | `sockets\socket.server.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-09-23 09:04:57.951704 |

```typescript

```

# types\express.d.ts

| Property | Value |
|----------|-------|
| Path | `types\express.d.ts` |
| Size | 223 bytes |
| Extension | `.ts` |
| Modified | 2026-10-01 17:02:23.020301 |

```typescript
export interface AccessTokenPayload {
  userId: number
  roleId: number
  email?: string
}

declare global {
  namespace Express {
    interface Request {
      user?: AccessTokenPayload
    }
  }
}

export {}
```

# types\redlock.d.ts

| Property | Value |
|----------|-------|
| Path | `types\redlock.d.ts` |
| Size | 27 bytes |
| Extension | `.ts` |
| Modified | 2026-10-06 21:26:08.041984 |

```typescript
declare module 'redlock';

```

