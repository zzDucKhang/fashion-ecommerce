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
    return prisma.message.create({
      data: {
        chatId: data.chatId,
        content: data.content,
        isRead: false,
        sendDate: new Date(),
      },
      include: {
        chat: { select: { userId: true } }
      }
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
      where: { chatId, isRead: false },
      data: { isRead: true },
    })
  }

  async findConversationList() {
    return prisma.chat.findMany({
      where: { status: { not: ChatStatus.CLOSED } },
      include: {
        user: { select: { fullName: true, avatarUrl: true } },
        messages: { take: 1, orderBy: { sendDate: 'desc' } }
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
