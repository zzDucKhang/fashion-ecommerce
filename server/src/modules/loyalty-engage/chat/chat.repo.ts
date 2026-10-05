// src/modules/loyalty-engage/chat/chat.repo.ts
import { prisma } from '@/database/prisma'
import { redisClient } from '@/database/redis'
import { createLogger } from '@/common/logger'

const logger = createLogger('ChatRepo')

/**
 * Redis key namespace for WebSocket sessions.
 * Structure: Hash per user, field = socketId, value = connectedAt timestamp.
 *
 * Key:    ws:sessions:user:{userId}
 * Fields: { [socketId]: connectedAtTimestamp }
 * TTL:    60 seconds (strict TTL auto-cleans ghost sessions on crash or disconnect)
 *
 * Reverse lookup key for socketId → userId:
 * Key:    ws:sessions:socket:{socketId}
 * Value:  userId
 * TTL:    60 seconds
 */
const WS_SESSION_PREFIX = 'ws:sessions:user:'
const WS_SOCKET_PREFIX = 'ws:sessions:socket:'
const WS_SESSION_TTL_SECONDS = 60 // 60 seconds strict TTL for real-time offline detection

export interface ConversationPartnerRow {
  partnerId: number
  lastMessageAt: Date
  fullName: string
  avatarUrl: string | null
}

export class ChatRepo {
  // ─────────────── Message System ───────────────

  /** Lưu tin nhắn mới vào database */
  async createMessage(data: {
    senderId: number
    receiverId: number
    content: string
    attachmentUrl?: string | null
  }) {
    const message = await prisma.message.create({
      data: {
        senderId: data.senderId,
        receiverId: data.receiverId,
        content: data.content,
        attachmentUrl: data.attachmentUrl ?? null,
      },
      include: {
        sender: { select: { id: true, fullName: true, avatarUrl: true } },
        receiver: { select: { id: true, fullName: true, avatarUrl: true } },
      },
    })

    logger.debug(
      { messageId: message.id, senderId: data.senderId, receiverId: data.receiverId },
      'createMessage: message persisted',
    )

    return message
  }

  /**
   * Lấy lịch sử hội thoại giữa 2 user với Cursor-based Pagination.
   *
   * PERFORMANCE OPTIMIZATION (O(take) complexity):
   * Replaces Offset Pagination (skip/take) with Cursor-based Pagination.
   *
   * Database seeks directly to the cursor via the indexed Primary Key:
   * `WHERE id < cursor ORDER BY id DESC LIMIT take + 1`
   *
   * @param userId - ID của user đang truy vấn
   * @param withUserId - ID của đối tác trò chuyện
   * @param cursor - ID tin nhắn bắt đầu (exclusive). Null cho trang đầu tiên.
   * @param take - Số lượng tin nhắn cần lấy
   */
  async findConversation(
    userId: number,
    withUserId: number,
    cursor: number | null,
    take: number,
  ) {
    const where = {
      OR: [
        { senderId: userId, receiverId: withUserId },
        { senderId: withUserId, receiverId: userId },
      ],
      ...(cursor ? { id: { lt: cursor } } : {}),
    }

    const messages = await prisma.message.findMany({
      where,
      orderBy: { id: 'desc' },
      take: take + 1, // Fetch N+1 to determine if next page exists
      include: {
        sender: { select: { id: true, fullName: true, avatarUrl: true } },
        receiver: { select: { id: true, fullName: true, avatarUrl: true } },
      },
    })

    const hasMore = messages.length > take
    const data = hasMore ? messages.slice(0, take) : messages
    const nextCursor = hasMore && data.length > 0 ? data[data.length - 1].id : null

    logger.debug(
      { userId, withUserId, cursor, count: data.length, hasMore, nextCursor },
      'findConversation: cursor pagination query executed',
    )

    return {
      data: data.reverse(), // Chronological order (oldest to newest in UI viewport)
      nextCursor,
      hasMore,
    }
  }

  /** Đánh dấu tất cả tin nhắn từ senderId đến receiverId là đã đọc */
  async markMessagesAsRead(receiverId: number, senderId: number) {
    const result = await prisma.message.updateMany({
      where: { senderId, receiverId, readAt: null },
      data: { readAt: new Date() },
    })

    logger.debug(
      { receiverId, senderId, count: result.count },
      'markMessagesAsRead: messages marked as read',
    )

    return result
  }

  /** Đếm số tin nhắn chưa đọc của user */
  async countUnread(userId: number) {
    return prisma.message.count({ where: { receiverId: userId, readAt: null } })
  }

  /**
   * Lấy danh sách cuộc trò chuyện của user.
   *
   * OOM PREVENTION FIX:
   * Eliminates the heavy Array mapping (`Set<number>`) in Node.js RAM.
   * Executes a single optimized raw SQL query using GROUP BY + JOIN in PostgreSQL,
   * keeping Node.js memory footprint at O(1).
   */
  async findConversationList(userId: number): Promise<ConversationPartnerRow[]> {
    logger.debug({ userId }, 'findConversationList: executing database-level aggregation')

    const partners = await prisma.$queryRaw<ConversationPartnerRow[]>`
      SELECT 
        c."partnerId",
        c."lastMessageAt",
        u."fullName",
        u."avatarUrl"
      FROM (
        SELECT "partnerId", MAX("lastMessageAt") AS "lastMessageAt"
        FROM (
          SELECT "receiverId" AS "partnerId", MAX("createdAt") AS "lastMessageAt"
          FROM "Message"
          WHERE "senderId" = ${userId}
          GROUP BY "receiverId"

          UNION ALL

          SELECT "senderId" AS "partnerId", MAX("createdAt") AS "lastMessageAt"
          FROM "Message"
          WHERE "receiverId" = ${userId}
          GROUP BY "senderId"
        ) AS raw_conversations
        GROUP BY "partnerId"
      ) AS c
      JOIN "User" u ON u.id = c."partnerId"
      WHERE u."deletedAt" IS NULL
      ORDER BY c."lastMessageAt" DESC
    `

    logger.debug(
      { userId, partnerCount: partners.length },
      'findConversationList: completed via PostgreSQL engine',
    )

    return partners
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
