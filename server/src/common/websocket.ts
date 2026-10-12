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
