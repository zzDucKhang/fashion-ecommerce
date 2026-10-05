// src/common/websocket.ts
import { Server as HttpServer } from 'http'
import { Server as SocketIOServer, Socket } from 'socket.io'
import { createAdapter } from '@socket.io/redis-adapter'
import Redis from 'ioredis'
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

  // 1. Separate Redis instances for publishing and subscribing
  pubClient = new Redis(envConfig.REDIS_URL, {
    maxRetriesPerRequest: null,
    enableReadyCheck: true,
  })

  subClient = new Redis(envConfig.REDIS_URL, {
    maxRetriesPerRequest: null,
    enableReadyCheck: true,
  })

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

  // 3. Socket event handlers
  io.on('connection', (socket: Socket) => {
    const rawUserId = socket.handshake.query.userId
    const userId = rawUserId ? Number(rawUserId) : undefined

    logger.info({ socketId: socket.id, userId }, 'New WebSocket client connected')

    if (userId && !isNaN(userId)) {
      const userRoom = `user:${userId}`
      socket.join(userRoom)
      logger.debug({ socketId: socket.id, userRoom }, 'Socket joined user room')
    }

    // Handle incoming chat messages
    socket.on('send_message', (payload: ChatMessagePayload) => {
      logger.debug({ socketId: socket.id, payload }, 'Received send_message event')

      const messageData = {
        id: Date.now(),
        content: payload.content,
        senderId: payload.senderId ?? userId,
        receiverId: payload.receiverId,
        createdAt: new Date().toISOString(),
      }

      // If directed to a specific recipient, deliver to their user room
      if (payload.receiverId) {
        io?.to(`user:${payload.receiverId}`).emit('receive_message', messageData)
        io?.to(`user:${payload.receiverId}`).emit('message', messageData)
      }

      // Also echo back to the sender
      socket.emit('receive_message', { ...messageData, isSelf: true })
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
