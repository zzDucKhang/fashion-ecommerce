# Project Dump

**Root:** `C:\Programing\cnpm\fashion-ecom\server\src\modules\loyalty-engage`

**Generated:** 2026-10-09 08:14:04.732420

**Files:** 22 | **Total size:** 106,401 bytes

---

# chat\chat.controller.ts

| Property | Value |
|----------|-------|
| Path | `chat\chat.controller.ts` |
| Size | 4,479 bytes |
| Extension | `.ts` |
| Modified | 2026-10-08 18:47:35.495177 |

```typescript
// src/modules/loyalty-engage/chat/chat.controller.ts
import { NextFunction, Request, Response } from 'express'
import { ChatService } from './chat.service'

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

  /** GET /chat/messages?withUserId=&page=&limit= – Lịch sử hội thoại */
  getChatHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const data = await this.chatService.getChatHistory(userId, req.query as any)
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

# chat\chat.repo.ts

| Property | Value |
|----------|-------|
| Path | `chat\chat.repo.ts` |
| Size | 9,309 bytes |
| Extension | `.ts` |
| Modified | 2026-10-08 18:47:35.495177 |

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

```

# chat\chat.routes.ts

| Property | Value |
|----------|-------|
| Path | `chat\chat.routes.ts` |
| Size | 3,455 bytes |
| Extension | `.ts` |
| Modified | 2026-10-06 21:26:08.003567 |

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

/** GET /chat/conversations – Danh sách cuộc trò chuyện */
chatRouter.get('/conversations', requireAuth, controller.getConversationList)

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

# chat\chat.schema.ts

| Property | Value |
|----------|-------|
| Path | `chat\chat.schema.ts` |
| Size | 1,576 bytes |
| Extension | `.ts` |
| Modified | 2026-10-08 18:43:06.017340 |

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

# chat\chat.service.ts

| Property | Value |
|----------|-------|
| Path | `chat\chat.service.ts` |
| Size | 4,907 bytes |
| Extension | `.ts` |
| Modified | 2026-10-08 17:34:23.625851 |

```typescript
// src/modules/loyalty-engage/chat/chat.service.ts
import { BadRequestError, NotFoundError } from '@/common/errors'
import { createLogger } from '@/common/logger'
import { ChatRepo } from './chat.repo'
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

  /**
   * Lưu tin nhắn mới vào bảng Message.
   */
  async sendMessage(senderId: number, body: SendMessageBodyType) {
    const message = await this.chatRepo.createMessage({
      chatId: body.chatId,
      senderId,
      content: body.content,
    })
    return { message: 'Tin nhắn đã được gửi', data: message }
  }

  /**
   * Lấy lịch sử hội thoại giữa 2 user sử dụng Cursor-based Pagination.
   *
   * PERFORMANCE BENEFIT:
   *   - O(take) seek time via indexed primary key.
   *   - Eliminates database IO degradation caused by high-offset skips.
   */
  async getChatHistory(query: GetChatHistoryQueryType) {
    const { chatId, limit, cursor, page } = query
    const { data, nextCursor, hasMore } = await this.chatRepo.findConversation(chatId, cursor ?? null, limit)
    return { data, pagination: { page, limit, nextCursor, hasMore } }
  }

  /** Đánh dấu đã đọc tất cả tin nhắn từ một sender */
  async markAsRead(receiverId: number, body: MarkReadBodyType) {
    const result = await this.chatRepo.markMessagesAsRead(receiverId, body.senderId)

    logger.info(
      { receiverId, senderId: body.senderId, updatedCount: result.count },
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

# loyalty-engage.routes.ts

| Property | Value |
|----------|-------|
| Path | `loyalty-engage.routes.ts` |
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

# point\point.controller.ts

| Property | Value |
|----------|-------|
| Path | `point\point.controller.ts` |
| Size | 1,903 bytes |
| Extension | `.ts` |
| Modified | 2026-10-01 17:02:23.000304 |

```typescript
// src/modules/loyalty-engage/point/point.controller.ts
import { NextFunction, Request, Response } from "express";
import { PointService } from "./point.service";

export class PointController {
  constructor(private pointService = new PointService()) {}

  /** POST /points/earn – Admin/Service cộng điểm sau khi đơn giao thành công */
  earnPoints = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Bỏ việc truyền req.user!.userId, service sẽ tự lấy userId từ chính orderId
      const data = await this.pointService.earnPoints(req.body);
      return res.status(200).json({ statusCode: 200, ...data });
    } catch (error) {
      next(error);
    }
  };

  /** POST /points/redeem – User dùng điểm thanh toán */
  redeemPoints = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId;
      const data = await this.pointService.redeemPoints(userId, req.body);
      return res.status(200).json({ statusCode: 200, ...data });
    } catch (error) {
      next(error);
    }
  };

  /** GET /points/history – Lịch sử giao dịch điểm */
  getHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId;
      const data = await this.pointService.getHistory(userId, req.query as any);
      return res.status(200).json({ statusCode: 200, ...data });
    } catch (error) {
      next(error);
    }
  };

  /** GET /points/balance – Số điểm hiện tại */
  getBalance = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId;
      const data = await this.pointService.getBalance(userId);
      return res.status(200).json({ statusCode: 200, data });
    } catch (error) {
      next(error);
    }
  };
}

```

# point\point.repo.ts

| Property | Value |
|----------|-------|
| Path | `point\point.repo.ts` |
| Size | 9,566 bytes |
| Extension | `.ts` |
| Modified | 2026-10-08 19:02:05.250451 |

```typescript
// src/modules/loyalty-engage/point/point.repo.ts
import { prisma } from '@/database/prisma'
import { createLogger } from '@/common/logger'

const logger = createLogger('PointRepo')

/**
 * Row shape returned by `SELECT ... FOR UPDATE` on the User table.
 * Used for pessimistic row-level locking inside interactive transactions.
 */
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
  // ─────────────── Read-Only Queries (outside transaction) ───────────────

  /** Lấy thông tin user (cần rewardPoints hiện tại) — read-only, no lock */
  async findUserById(userId: number) {
    return prisma.user.findUnique({
      where: { id: userId, deletedAt: null },
      select: { id: true, rewardPoints: true },
    })
  }

  /** Lấy lịch sử giao dịch điểm của user có phân trang */
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

  /** Kiểm tra đơn hàng tồn tại, lấy thông tin cần thiết */
  async findOrderById(orderId: number) {
    return prisma.order.findUnique({
      where: { id: orderId },
      select: { id: true, userId: true, status: true, totalAmount: true, pointUsed: true },
    })
  }

  // ─────────────── ACID Transaction Methods (Pessimistic Locking & Idempotency) ───────────────

  /**
   * Atomic EARN flow with row-level pessimistic locking and strict idempotency.
   *
   * Wraps the ENTIRE sequence inside a single `prisma.$transaction`:
   *   1. Acquires Row-Level Lock on User row: `SELECT ... FOR UPDATE`
   *   2. Enforces Idempotency: checks for pre-existing EARN transaction for this orderId
   *   3. Updates user rewardPoints
   *   4. Records PointTransaction audit log
   */
  async atomicEarnPoints(
    userId: number,
    orderId: number,
    pointChange: number,
    description: string,
  ): Promise<AtomicEarnResult | null> {
    logger.info({ userId, orderId, pointChange }, 'atomicEarnPoints: entering transaction')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return prisma.$transaction(
      async (tx: any): Promise<AtomicEarnResult | null> => {
        // Step 1: Enforce Row-Level Pessimistic Locking on User table
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

        // Step 2: Strict Idempotency check inside the locked critical section
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

        // Step 3: Compute new balance and persist atomically
        const newPoints = lockedUser.rewardPoints + pointChange

        await tx.user.update({
          where: { id: userId },
          data: { rewardPoints: newPoints },
        })

        // Step 4: Persist audit log
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

  /**
   * Atomic REDEEM flow with row-level pessimistic locking and strict idempotency.
   *
   * Wraps the ENTIRE sequence inside a single `prisma.$transaction`:
   *   1. Acquires Row-Level Lock on User row: `SELECT ... FOR UPDATE`
   *   2. Enforces Idempotency: checks for pre-existing REDEEM transaction for this orderId
   *   3. Checks balance sufficiency against true locked balance (eliminates Check-Then-Act race condition)
   *   4. Enforces redemption cap against order total
   *   5. Decrements user rewardPoints
   *   6. Records PointTransaction audit log
   */
  async atomicRedeemPoints(
    userId: number,
    orderId: number,
    pointsToRedeem: number,
    orderTotal: number,
    description: string
  ): Promise<AtomicRedeemResult> {
    logger.info({ userId, orderId, pointsToRedeem }, 'atomicRedeemPoints: entering transaction')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return prisma.$transaction(
      async (tx: any): Promise<AtomicRedeemResult> => {
        // Step 1: Enforce Row-Level Pessimistic Locking on User table
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

        // Step 2: Strict Idempotency check inside the locked critical section
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

        // Step 3: Atomic balance sufficiency verification (NO Check-Then-Act gap)
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

        // Step 4: Cap check against order total (1 point = 1 VND)
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

        // Step 5: Atomic decrement
        const newPoints = lockedUser.rewardPoints - pointsToRedeem

        await tx.user.update({
          where: { id: userId },
          data: { rewardPoints: newPoints },
        })

        // Step 6: Persist audit log
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
}

```

# point\point.routes.ts

| Property | Value |
|----------|-------|
| Path | `point\point.routes.ts` |
| Size | 1,236 bytes |
| Extension | `.ts` |
| Modified | 2026-10-01 18:15:26.705851 |

```typescript
import { Router } from 'express'
import { requireAuth } from '@/middlewares/guards/auth.guard'
import { requireAdmin } from '@/middlewares/guards/role.guard'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import { PointController } from './point.controller'
import { earnPointsBodySchema, getHistoryQuerySchema, redeemPointsBodySchema } from './point.schema'

export const pointRouter = Router()
const controller = new PointController()

// Tất cả routes điểm đều yêu cầu đăng nhập
pointRouter.use(requireAuth)

/** GET /points/balance – Xem số điểm hiện tại */
pointRouter.get('/balance', controller.getBalance)

/** GET /points/history – Lịch sử giao dịch điểm (có phân trang) */
pointRouter.get('/history', validateRequest({ query: getHistoryQuerySchema }), controller.getHistory)

/** POST /points/earn – Cộng điểm khi đơn hàng hoàn thành (chỉ Admin) */
pointRouter.post('/earn', requireAdmin, validateRequest({ body: earnPointsBodySchema }), controller.earnPoints)

/** POST /points/redeem – Dùng điểm để thanh toán */
pointRouter.post('/redeem', validateRequest({ body: redeemPointsBodySchema }), controller.redeemPoints)
```

# point\point.schema.ts

| Property | Value |
|----------|-------|
| Path | `point\point.schema.ts` |
| Size | 1,877 bytes |
| Extension | `.ts` |
| Modified | 2026-10-01 18:15:26.707852 |

```typescript
// src/modules/loyalty-engage/point/point.schema.ts
import { z } from 'zod'

// ───────────────────────────────────────────
// Request Schemas
// ───────────────────────────────────────────

/** Admin cộng điểm khi đơn hoàn thành – điểm được tính tự động từ tổng đơn */
export const earnPointsBodySchema = z.object({
  orderId: z.number().int().positive('orderId phải là số nguyên dương'),
  description: z.string().trim().min(1).max(255).optional().default('Cộng điểm từ đơn hàng'),
})

/** User dùng điểm để thanh toán */
export const redeemPointsBodySchema = z.object({
  orderId: z.number().int().positive('orderId phải là số nguyên dương'),
  pointsToRedeem: z.number().int().positive('Số điểm dùng phải lớn hơn 0'),
})

/** Lấy lịch sử – hỗ trợ phân trang */
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

// ───────────────────────────────────────────
// Inferred Types
// ───────────────────────────────────────────
export type EarnPointsBodyType = z.infer<typeof earnPointsBodySchema>
export type RedeemPointsBodyType = z.infer<typeof redeemPointsBodySchema>
export type GetHistoryQueryType = z.infer<typeof getHistoryQuerySchema>

```

# point\point.service.ts

| Property | Value |
|----------|-------|
| Path | `point\point.service.ts` |
| Size | 7,886 bytes |
| Extension | `.ts` |
| Modified | 2026-10-08 19:02:45.021620 |

```typescript
// src/modules/loyalty-engage/point/point.service.ts
import { BadRequestError, NotFoundError } from '@/common/errors'
import { createLogger } from '@/common/logger'
import { PointRepo } from './point.repo'
import { EarnPointsBodyType, GetHistoryQueryType, RedeemPointsBodyType } from './point.schema'

const logger = createLogger('PointService')

export class PointService {
  constructor(private pointRepo = new PointRepo()) {}

  /**
   * Admin cộng điểm cho user khi đơn hàng hoàn thành (DELIVERED).
   * Điểm được tính tự động: 1% của totalAmount, làm tròn xuống số nguyên.
   *
   * ACID Guarantees:
   *   - Single `prisma.$transaction` wraps row-level pessimistic locking (`SELECT ... FOR UPDATE`)
   *   - Strict Idempotency check: duplicate calls/webhooks return existing transaction without modifying points
   *   - Eliminates Check-Then-Act TOCTOU race conditions
   */
  async earnPoints(_adminId: number, body: EarnPointsBodyType) {
    logger.info({ adminId: _adminId, orderId: body.orderId }, 'earnPoints: initiated')

    // Pre-validation: Verify order integrity
    const order = await this.pointRepo.findOrderById(body.orderId)
    if (!order) {
      logger.warn({ orderId: body.orderId }, 'earnPoints: order not found')
      throw new NotFoundError('Đơn hàng không tồn tại')
    }

    if (order.status !== 'DELIVERED') {
      logger.warn({ orderId: body.orderId, status: order.status }, 'earnPoints: order not DELIVERED')
      throw new BadRequestError('Chỉ cộng điểm khi đơn hàng đã giao thành công (DELIVERED)')
    }

    // Dùng userId từ đơn hàng
    const userId = order.userId

    // Tính điểm tự động: 1% tổng giá trị đơn hàng, làm tròn xuống số nguyên
    const pointChange = Math.floor(Number(order.totalAmount) * 0.01)
    if (pointChange <= 0) {
      logger.warn({ orderId: body.orderId, totalAmount: order.totalAmount }, 'earnPoints: calculated point change is 0')
      throw new BadRequestError('Giá trị đơn hàng quá nhỏ, không đủ điều kiện cộng điểm')
    }

    // Atomic transaction execution with pessimistic locking & idempotency
    const result = await this.pointRepo.atomicEarnPoints(
      userId,
      body.orderId,
      pointChange,
      body.description || `Cộng điểm từ đơn hàng #${order.id}`, 
    )

    if (!result) {
      logger.error({ userId, orderId: body.orderId }, 'earnPoints: user not found in locked transaction')
      throw new NotFoundError('Người dùng không tồn tại')
    }

    // Idempotent duplicate check
    if (result.isIdempotent) {
      logger.info(
        { userId, orderId: body.orderId, currentPoint: result.currentPoint },
        'earnPoints: duplicate request resolved via idempotency check',
      )
      return {
        message: `Đơn hàng #${body.orderId} đã được cộng điểm trước đó (idempotent)`,
        currentPoint: result.currentPoint,
        transaction: result.transaction,
      }
    }

    logger.info(
      { userId, orderId: body.orderId, pointChange, newPoints: result.currentPoint },
      'earnPoints: committed successfully',
    )

    return {
      message: `Cộng ${pointChange} điểm thành công cho user #${userId}`,
      currentPoint: result.currentPoint,
      transaction: result.transaction,
    }
  }

  /**
   * Trừ điểm khi user dùng điểm để thanh toán đơn hàng.
   *
   * ACID Guarantees:
   *   - Pessimistic Row Lock (`SELECT ... FOR UPDATE`) prevents concurrent double-spending
   *   - Balance check against true locked row eliminates Check-Then-Act vulnerability
   *   - Strict Idempotency check prevents duplicate webhook/request re-spends
   */
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

    // Atomic transaction execution with pessimistic locking & idempotency
    const result = await this.pointRepo.atomicRedeemPoints(
      userId,
      body.orderId,
      body.pointsToRedeem,
      orderTotal,
      `Dùng ${body.pointsToRedeem} điểm (tương đương ${body.pointsToRedeem} VNĐ) thanh toán đơn hàng #${order.id}`
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

  /** Lấy lịch sử giao dịch điểm của user (hỗ trợ phân trang) */
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

  /** Lấy tổng điểm hiện tại của user */
  async getBalance(userId: number) {
    const user = await this.pointRepo.findUserById(userId)
    if (!user) throw new NotFoundError('Người dùng không tồn tại')
    return { rewardPoints: user.rewardPoints }
  }
}

```

# review\review.controller.ts

| Property | Value |
|----------|-------|
| Path | `review\review.controller.ts` |
| Size | 2,295 bytes |
| Extension | `.ts` |
| Modified | 2026-09-30 08:12:15.091491 |

```typescript
// src/modules/loyalty-engage/review/review.controller.ts
import { NextFunction, Request, Response } from 'express'
import { ReviewService } from './review.service'

export class ReviewController {
  constructor(private reviewService = new ReviewService()) {}

  /** GET /reviews?productId=&page=&limit=&rating= – Danh sách review theo sản phẩm */
  getReviewsByProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.reviewService.getReviewsByProduct(req.query as any)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  /** GET /reviews/:id – Chi tiết một review */
  getReviewById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id)
      const data = await this.reviewService.getReviewById(id)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  /** POST /reviews – Tạo đánh giá mới (User đã đăng nhập) */
  createReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const data = await this.reviewService.createReview(userId, req.body)
      return res.status(201).json({ statusCode: 201, ...data })
    } catch (error) {
      next(error)
    }
  }

  /** POST /reviews/:id/reply – Shop trả lời đánh giá (Admin) */
  replyToReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id)
      const data = await this.reviewService.replyToReview(id, req.body)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  /** PATCH /reviews/:id/hide – Ẩn/hiện review (Admin) */
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

# review\review.repo.ts

| Property | Value |
|----------|-------|
| Path | `review\review.repo.ts` |
| Size | 3,940 bytes |
| Extension | `.ts` |
| Modified | 2026-10-06 21:26:08.024750 |

```typescript
// src/modules/loyalty-engage/review/review.repo.ts
import { prisma } from '@/database/prisma'
import { createLogger } from '@/common/logger'

const logger = createLogger('ReviewRepo')

export class ReviewRepo {
  /** Kiểm tra product tồn tại (dùng cho read query / catalog metadata) */
  async findProductById(productId: number) {
    return prisma.product.findFirst({
      where: { id: productId, deletedAt: null },
      select: { id: true, defaultName: true },
    })
  }

  /**
   * Tạo review mới kèm media (sử dụng nested create cho ReviewMedia).
   *
   * RACE-CONDITION FIX:
   * Rely on the database-level @@unique([orderId, productId]) constraint.
   * If two concurrent requests try to insert a review for the same order and product,
   * PostgreSQL enforces uniqueness at the storage engine level and throws P2002.
   */
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

  /** Lấy danh sách review theo productId (có phân trang, lọc theo rating) */
  async findReviewsByProductId(productId: number, skip: number, take: number, rating?: number) {
    const where = {
      productId,
      isHidden: false,
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

  /**
   * Tính rating trung bình của product.
   * Bảo vệ chia cho 0: trả về 0 nếu không có review nào.
   */
  async getAverageRating(productId: number) {
    const result = await prisma.productReview.aggregate({
      where: { productId, isHidden: false },
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

  /** Lấy một review theo id */
  async findReviewById(id: number) {
    return prisma.productReview.findUnique({
      where: { id },
      include: {
        medias: true,
        user: { select: { id: true, fullName: true, avatarUrl: true } },
      },
    })
  }

  /** Admin trả lời review */
  async updateShopReply(id: number, shopReply: string) {
    return prisma.productReview.update({ where: { id }, data: { shopReply } })
  }

  /** Admin ẩn/hiện review */
  async toggleHideReview(id: number, isHidden: boolean) {
    return prisma.productReview.update({ where: { id }, data: { isHidden } })
  }
}

```

# review\review.routes.ts

| Property | Value |
|----------|-------|
| Path | `review\review.routes.ts` |
| Size | 2,336 bytes |
| Extension | `.ts` |
| Modified | 2026-10-01 17:02:23.009303 |

```typescript
// src/modules/loyalty-engage/review/review.routes.ts
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

// ─── Public routes ────────────────────────────────────────────────────────────

/** GET /reviews – Danh sách review theo productId (công khai) */
reviewRouter.get(
  '/',
  validateRequest({ query: getReviewsQuerySchema }),
  controller.getReviewsByProduct,
)

/** GET /reviews/:id – Chi tiết một review (công khai) */
reviewRouter.get(
  '/:id',
  validateRequest({ params: reviewIdParamSchema }),
  controller.getReviewById,
)

// ─── User routes (phải đăng nhập) ────────────────────────────────────────────

/** POST /reviews – Tạo đánh giá */
reviewRouter.post(
  '/',
  requireAuth,
  validateRequest({ body: createReviewBodySchema }),
  controller.createReview,
)

// ─── Admin routes ─────────────────────────────────────────────────────────────

/** POST /reviews/:id/reply – Shop phản hồi đánh giá */
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

/** PATCH /reviews/:id/hide – Ẩn/hiện đánh giá */
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

# review\review.schema.ts

| Property | Value |
|----------|-------|
| Path | `review\review.schema.ts` |
| Size | 2,815 bytes |
| Extension | `.ts` |
| Modified | 2026-09-30 08:12:15.096071 |

```typescript
// src/modules/loyalty-engage/review/review.schema.ts
import { z } from 'zod'

// ───────────────────────────────────────────
// Request Schemas
// ───────────────────────────────────────────

/** Tạo bài đánh giá mới */
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

/** Admin/Shop trả lời đánh giá */
export const replyReviewBodySchema = z.object({
  shopReply: z.string().trim().min(1, 'Nội dung phản hồi không được để trống').max(1000),
})

/** Params review id */
export const reviewIdParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, 'id phải là số nguyên dương')
    .transform(Number),
})

/** Query lấy danh sách review theo productId */
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

// ───────────────────────────────────────────
// Inferred Types
// ───────────────────────────────────────────
export type CreateReviewBodyType = z.infer<typeof createReviewBodySchema>
export type ReplyReviewBodyType = z.infer<typeof replyReviewBodySchema>
export type ReviewIdParamType = z.infer<typeof reviewIdParamSchema>
export type GetReviewsQueryType = z.infer<typeof getReviewsQuerySchema>

```

# review\review.service.ts

| Property | Value |
|----------|-------|
| Path | `review\review.service.ts` |
| Size | 4,402 bytes |
| Extension | `.ts` |
| Modified | 2026-10-06 21:26:08.027550 |

```typescript
// src/modules/loyalty-engage/review/review.service.ts
import { Prisma } from '@prisma/client'
import { BadRequestError, ConflictError, NotFoundError, isUniqueConstraintPrismaError } from '@/common/errors'
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

      return { message: 'Đánh giá sản phẩm thành công', data: review }
    } catch (error: any) {
      // Prisma P2002: Unique constraint failed on @@unique([orderId, productId])
      if (isUniqueConstraintPrismaError(error)) {
        logger.warn(
          { userId, productId: body.productId, orderId: body.orderId },
          'createReview: duplicate review rejected via database unique constraint (P2002)',
        )
        throw new ConflictError('Bạn đã đánh giá sản phẩm này trong đơn hàng này rồi')
      }

      // Prisma P2003: Foreign key constraint failed
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
        logger.warn(
          { userId, productId: body.productId, orderId: body.orderId },
          'createReview: foreign key constraint failed (P2003)',
        )
        throw new NotFoundError('Sản phẩm hoặc đơn hàng không tồn tại')
      }

      throw error
    }
  }

  /**
   * Lấy danh sách review theo productId kèm điểm rating trung bình.
   */
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

  /** Lấy chi tiết một review */
  async getReviewById(id: number) {
    const review = await this.reviewRepo.findReviewById(id)
    if (!review) throw new NotFoundError('Đánh giá không tồn tại')
    return { data: review }
  }

  /** Admin/Shop trả lời đánh giá */
  async replyToReview(id: number, body: ReplyReviewBodyType) {
    const review = await this.reviewRepo.findReviewById(id)
    if (!review) throw new NotFoundError('Đánh giá không tồn tại')

    const updated = await this.reviewRepo.updateShopReply(id, body.shopReply)

    logger.info({ reviewId: id }, 'replyToReview: shop reply saved')

    return { message: 'Đã gửi phản hồi thành công', data: updated }
  }

  /** Admin ẩn/hiện review */
  async toggleHideReview(id: number, isHidden: boolean) {
    const review = await this.reviewRepo.findReviewById(id)
    if (!review) throw new NotFoundError('Đánh giá không tồn tại')

    const updated = await this.reviewRepo.toggleHideReview(id, isHidden)

    logger.info({ reviewId: id, isHidden }, 'toggleHideReview: visibility changed')

    return {
      message: isHidden ? 'Đã ẩn đánh giá' : 'Đã hiện đánh giá',
      data: updated,
    }
  }
}

```

# voucher\voucher.controller.ts

| Property | Value |
|----------|-------|
| Path | `voucher\voucher.controller.ts` |
| Size | 2,922 bytes |
| Extension | `.ts` |
| Modified | 2026-10-06 21:26:08.030130 |

```typescript
// src/modules/loyalty-engage/voucher/voucher.controller.ts
import { NextFunction, Request, Response } from 'express'
import { VoucherService } from './voucher.service'

export class VoucherController {
  constructor(private voucherService = new VoucherService()) {}

  /** GET /vouchers – Danh sách voucher (Admin) */
  listVouchers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.voucherService.listVouchers(req.query as any)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  /** GET /vouchers/:id – Chi tiết voucher (Admin) */
  getVoucherById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id)
      const data = await this.voucherService.getVoucherById(id)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  /** POST /vouchers – Tạo voucher mới (Admin) */
  createVoucher = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.voucherService.createVoucher(req.body)
      return res.status(201).json({ statusCode: 201, ...data })
    } catch (error) {
      next(error)
    }
  }

  /** PATCH /vouchers/:id – Cập nhật voucher (Admin) */
  updateVoucher = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id)
      const data = await this.voucherService.updateVoucher(id, req.body)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  /** DELETE /vouchers/:id – Xóa mềm voucher (Admin) */
  deleteVoucher = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id)
      const data = await this.voucherService.deleteVoucher(id)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  /** POST /vouchers/validate – Kiểm tra & tính tiền giảm (User) */
  validateVoucher = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const data = await this.voucherService.validateAndCalculate(req.body, userId)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  /** POST /vouchers/apply – Áp dụng voucher (tăng usedCount) */
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

# voucher\voucher.repo.ts

| Property | Value |
|----------|-------|
| Path | `voucher\voucher.repo.ts` |
| Size | 19,275 bytes |
| Extension | `.ts` |
| Modified | 2026-10-06 21:26:08.032133 |

```typescript
// src/modules/loyalty-engage/voucher/voucher.repo.ts
import Redis from 'ioredis'
import { prisma } from '@/database/prisma'
import { redisClient, redlock } from '@/database/redis'
import { createLogger } from '@/common/logger'
import { CreateVoucherBodyType, UpdateVoucherBodyType } from './voucher.schema'

const logger = createLogger('VoucherRepo')

/**
 * TTL for the Distributed Lock used during cold-start seed.
 * Short enough to not block concurrent requests, long enough for the DB query to finish.
 * 3 000 ms is well above the p99 latency of a COUNT query on an indexed column.
 */
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
const VOUCHER_META_CACHE_TTL_SECONDS = 30 // Cache metadata 30s to withstand 10k+ req/sec flash sales

export class VoucherRepo {
  /**
   * Injectable Redis client instance (defaults to global redisClient).
   */
  constructor(private readonly redis: Redis = redisClient) {}

  /** Lấy danh sách voucher (phân trang, lọc trạng thái) */
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

  /** Tìm voucher theo id */
  async findById(id: number) {
    return prisma.voucher.findFirst({ where: { id, deletedAt: null } })
  }

  /** Tìm voucher theo code (không phân biệt hoa thường, đã uppercase ở schema) */
  async findByCode(code: string) {
    const normalized = code.trim().toUpperCase()
    return prisma.voucher.findFirst({ where: { code: normalized, deletedAt: null } })
  }

  /**
   * Tìm voucher theo code kể cả đã xóa mềm.
   * Dùng để kiểm tra trùng code trước khi tạo/sửa, ngăn lỗi P2002 Unique Constraint.
   */
  async findByCodeIncludingDeleted(code: string) {
    const normalized = code.trim().toUpperCase()
    return prisma.voucher.findFirst({ where: { code: normalized } })
  }

  /**
   * Đếm số lần user đã sử dụng mã voucher này.
   * Ưu tiên đọc từ Redis Hash `voucher:usage:{code}`, fallback về bảng Order trong PostgreSQL.
   */
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

  /**
   * Lấy metadata voucher được cache trong Redis để chịu tải 10k+ req/sec.
   */
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

  /**
   * Xoá cache metadata voucher khỏi Redis khi Admin cập nhật hoặc xoá.
   */
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

  /** Tạo voucher mới */
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

  /** Cập nhật voucher và xóa cache Redis */
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

  /** Soft-delete voucher và xóa cache Redis */
  async softDelete(id: number) {
    const deleted = await prisma.voucher.update({ where: { id }, data: { deletedAt: new Date() } })
    await this.invalidateVoucherCache(deleted.code)
    return deleted
  }

  /**
   * Áp dụng voucher nguyên tử chịu tải cao (High Concurrency 10k+ req/sec).
   *
   * HIGH-CONCURRENCY ARCHITECTURE:
   *   1. LOẠI BỎ TOÀN BỘ `SELECT ... FOR UPDATE` row-level lock trên PostgreSQL:
   *      Ngăn chặn triệt để tình trạng lock contention, table bloat và cạn kiệt connection pool.
   *   2. Atomic Counters trên Redis:
   *      - Tracking tổng lượt dùng toàn hệ thống qua Redis String: `INCR voucher:total:{code}`
   *      - Tracking lượt dùng theo từng user qua Redis Hash: `HINCRBY voucher:usage:{code} {userId} 1`
   *      - Thực thi nguyên tử bằng `ioredis` multi/exec pipeline.
   *   3. Strict Limit Enforcement:
   *      - Kiểm tra cả `totalUsageLimit` (toàn cục) và `userUsageLimit` (theo từng user).
   *      - Nếu bất kỳ giới hạn nào bị vượt quá, lập tức rollback nguyên tử bằng decrement (`hincrby -1` & `decr`)
   *        và trả về mã lỗi thích hợp (`VOUCHER_USAGE_LIMIT_REACHED` hoặc `USER_USAGE_LIMIT_REACHED`).
   *   4. Eventual Consistency fallback:
   *      - Sau khi atomic check trên Redis vượt qua an toàn, ghi nhận vào PostgreSQL bằng `prisma.voucher.update`
   *        không khoá hàng (non-blocking atomic increment).
   *
   * @param code - Voucher code to apply
   * @param userId - ID of the user applying the voucher
   */
  async atomicApplyVoucher(
    code: string,
    userId: number,
  ): Promise<AtomicApplyVoucherResult> {
    const normalizedCode = code.trim().toUpperCase()
    logger.info(
      { code: normalizedCode, userId },
      'atomicApplyVoucher: initiating high-concurrency voucher application',
    )

    // Bước 1: Lấy metadata voucher (có cache Redis 30s để chịu tải 10k+ req/s)
    const voucher = await this.getVoucherMetadata(normalizedCode)

    if (!voucher) {
      logger.warn({ code: normalizedCode, userId }, 'atomicApplyVoucher: voucher not found')
      return { success: false, reason: 'VOUCHER_NOT_FOUND' }
    }

    // Bước 2: Kiểm tra trạng thái hoạt động & thời gian hiệu lực
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

    // Tính toán TTL cho Redis keys (hạn voucher + 24h buffer, tối thiểu 3600s)
    const ttlSeconds = Math.max(
      Math.ceil((endDate.getTime() - now.getTime()) / 1000) + 86400,
      3600,
    )

    const totalUsageKey = `${VOUCHER_TOTAL_KEY_PREFIX}${normalizedCode}`
    const userUsageKey = `${VOUCHER_USAGE_KEY_PREFIX}${normalizedCode}`
    const userIdStr = userId.toString()

    // Bước 3: Cold-start Seed (nếu Redis chưa có dữ liệu, seed an toàn không ghi đè với NX)
    //
    // STAMPEDE GUARD: Seed tổng lượt dùng không cần lock vì `SET NX` đảm bảo chỉ một request
    // ghi được. Nhưng seed lượt dùng theo user yêu cầu một lần đọc DB (COUNT) trước khi ghi —
    // đây chính là điểm gây Cache Stampede khi N request đồng thời phát hiện field chưa tồn tại
    // và tất cả cùng lao vào DB.
    //
    // Giải pháp: bọc đoạn read-DB bằng Distributed Lock (Redlock) với key per-(code, userId).
    //   - Chỉ 1 request thắng lock → đọc DB → ghi Redis bằng HSETNX.
    //   - Các request thua lock → skip DB (HSETNX ở vòng lặp sau sẽ thấy key đã tồn tại).
    //   - Nếu Redis đang down → lock.acquire() ném exception → rơi vào catch → tiếp tục mà
    //     không cần seed, đảm bảo availability > perfect accuracy.
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
          // ── Distributed Lock: chặn Thundering Herd trước khi đọc DB ──
          const lockKey = `lock:voucher:seed:${normalizedCode}:${userIdStr}`
          let lock: Awaited<ReturnType<typeof redlock.acquire>> | null = null
          try {
            lock = await redlock.acquire([lockKey], COLD_START_LOCK_TTL_MS)

            // Re-check sau khi thắng lock: request trước có thể đã seed xong
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
            // Lock không thể acquire (Redis down hoặc tranh chấp vượt retryCount).
            // Chấp nhận skip seed thay vì bão-truy-vấn DB.
            // Worst-case: user có thể dùng lố 1 lần trong khoảng thời gian Redis degraded.
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

    // Bước 4: Nguyên tử tăng bộ đếm trên Redis bằng multi/exec pipeline
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

    // Bước 5: Kiểm tra Total Usage Limit toàn cục
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

    // Bước 6: Kiểm tra User Usage Limit theo từng user
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

    // Bước 7: Cập nhật PostgreSQL usedCount (Eventual Consistency fallback)
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

      // Compensating transaction: hoàn trả bộ đếm Redis khi DB ghi nhận thất bại
      const rollbackMulti = this.redis.multi()
      rollbackMulti.hincrby(userUsageKey, userIdStr, -1)
      rollbackMulti.decr(totalUsageKey)
      await rollbackMulti.exec()

      throw dbError
    }
  }

  /**
   * Hoàn trả lượt voucher khi huỷ đơn hàng hoặc thanh toán thất bại (Compensating Transaction).
   */
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
}

```

# voucher\voucher.routes.ts

| Property | Value |
|----------|-------|
| Path | `voucher\voucher.routes.ts` |
| Size | 2,641 bytes |
| Extension | `.ts` |
| Modified | 2026-10-05 10:29:10.313968 |

```typescript
// src/modules/loyalty-engage/voucher/voucher.routes.ts
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

// ─── User routes đặt TRƯỚC `/:id` để tránh Express match literal paths thành params ─

/**
 * POST /vouchers/validate – Kiểm tra voucher & tính tiền giảm (User)
 * Đặt TRƯỚC POST /:id để Express không nhầm 'validate' thành một :id param
 */
voucherRouter.post(
  '/validate',
  requireAuth,
  validateRequest({ body: validateVoucherBodySchema }),
  controller.validateVoucher,
)

/** POST /vouchers/apply – Áp dụng voucher (sau khi đặt hàng) */
voucherRouter.post(
  '/apply',
  requireAuth,
  requireAdmin, // Đảm bảo người dùng thông thường không thể tự gọi làm cạn quota voucher
  // validateRequest({ body: z.object({ code: z.string().trim().min(1, 'Mã voucher là bắt buộc').toUpperCase() }) }),
  controller.applyVoucher,
)

// ─── Admin routes (yêu cầu đăng nhập + role ADMIN) ───────────────────────────

/** GET /vouchers – Danh sách tất cả voucher */
voucherRouter.get(
  '/',
  requireAuth,
  requireAdmin,
  validateRequest({ query: listVoucherQuerySchema }),
  controller.listVouchers,
)

/** POST /vouchers – Tạo voucher mới */
voucherRouter.post(
  '/',
  requireAuth,
  requireAdmin,
  validateRequest({ body: createVoucherBodySchema }),
  controller.createVoucher,
)

/** GET /vouchers/:id – Chi tiết voucher */
voucherRouter.get(
  '/:id',
  requireAuth,
  requireAdmin,
  validateRequest({ params: voucherIdParamSchema }),
  controller.getVoucherById,
)

/** PATCH /vouchers/:id – Cập nhật voucher */
voucherRouter.patch(
  '/:id',
  requireAuth,
  requireAdmin,
  validateRequest({ params: voucherIdParamSchema, body: updateVoucherBodySchema }),
  controller.updateVoucher,
)

/** DELETE /vouchers/:id – Xoá mềm voucher */
voucherRouter.delete(
  '/:id',
  requireAuth,
  requireAdmin,
  validateRequest({ params: voucherIdParamSchema }),
  controller.deleteVoucher,
)

```

# voucher\voucher.schema.ts

| Property | Value |
|----------|-------|
| Path | `voucher\voucher.schema.ts` |
| Size | 4,744 bytes |
| Extension | `.ts` |
| Modified | 2026-10-01 18:15:26.715850 |

```typescript
// src/modules/loyalty-engage/voucher/voucher.schema.ts
import { z } from 'zod'

// ───────────────────────────────────────────
// Base object (for partial reuse)
// ───────────────────────────────────────────

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

// ───────────────────────────────────────────
// Request Schemas
// ───────────────────────────────────────────

/** Admin tạo mới voucher */
export const createVoucherBodySchema = voucherBaseSchema
  .refine(
    (data) => new Date(data.endDate) > new Date(data.startDate),
    { message: 'endDate phải sau startDate', path: ['endDate'] },
  )
  .refine(
    (data) => data.discountType !== 'PERCENTAGE' || (data.discountValue > 0 && data.discountValue <= 100),
    { message: 'Phần trăm giảm phải từ 1 đến 100', path: ['discountValue'] },
  )

/**
 * Admin cập nhật voucher (partial) – giữ các luật validate khi trường được truyền vào.
 * FIX 2.4: Thêm .refine() để kiểm tra endDate > startDate và % giảm từ 1-100.
 */
export const updateVoucherBodySchema = voucherBaseSchema
  .partial()
  .refine(
    (data) => {
      // Chỉ kiểm tra khi CẢ HAI trường cùng được cung cấp
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

/** Params id voucher */
export const voucherIdParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, 'id phải là số nguyên dương')
    .transform(Number),
})

/** User validate voucher – check hạn sử dụng, giới hạn, điều kiện */
export const validateVoucherBodySchema = z.object({
  code: z.string().trim().min(1, 'Mã voucher là bắt buộc').toUpperCase(),
  orderTotal: z.number().positive('Tổng tiền đơn hàng phải lớn hơn 0'),
})

/** Query danh sách voucher */
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

// ───────────────────────────────────────────
// Inferred Types
// ───────────────────────────────────────────
export type CreateVoucherBodyType = z.infer<typeof createVoucherBodySchema>
export type UpdateVoucherBodyType = z.infer<typeof updateVoucherBodySchema>
export type VoucherIdParamType = z.infer<typeof voucherIdParamSchema>
export type ValidateVoucherBodyType = z.infer<typeof validateVoucherBodySchema>
export type ListVoucherQueryType = z.infer<typeof listVoucherQuerySchema>

```

# voucher\voucher.service.ts

| Property | Value |
|----------|-------|
| Path | `voucher\voucher.service.ts` |
| Size | 8,611 bytes |
| Extension | `.ts` |
| Modified | 2026-10-06 21:26:08.035709 |

```typescript
// src/modules/loyalty-engage/voucher/voucher.service.ts
import { Prisma } from '@prisma/client'
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

  // ─────────────── Admin APIs ───────────────

  /** Lấy danh sách voucher */
  async listVouchers(query: ListVoucherQueryType) {
    const { page, limit, isActive } = query
    const skip = (page - 1) * limit
    const { data, total } = await this.voucherRepo.findAll(skip, limit, isActive)
    return {
      data,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    }
  }

  /** Lấy chi tiết một voucher */
  async getVoucherById(id: number) {
    const voucher = await this.voucherRepo.findById(id)
    if (!voucher) throw new NotFoundError('Voucher không tồn tại')
    return { data: voucher }
  }

  /**
   * Admin tạo voucher mới.
   * Ngăn chặn trùng lặp code bằng cách bắt lỗi P2002 Unique Constraint từ PostgreSQL.
   */
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

  /**
   * Admin cập nhật voucher.
   */
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

  /** Admin xoá mềm voucher */
  async deleteVoucher(id: number) {
    const voucher = await this.voucherRepo.findById(id)
    if (!voucher) throw new NotFoundError('Voucher không tồn tại')

    await this.voucherRepo.softDelete(id)
    logger.info({ voucherId: id }, 'deleteVoucher: soft-deleted')

    return { message: 'Xoá voucher thành công' }
  }

  // ─────────────── User APIs ───────────────

  /**
   * User kiểm tra & tính toán số tiền được giảm từ voucher (Read-only UI preview).
   *
   * Race-free validation:
   *   - Read-only preview for the cart/checkout UI.
   *   - Enforces business rules: dates, minimum order value, global usage limit, and user usage limit.
   *   - Actual transactional enforcement is handled in `applyVoucher` with Redis atomic counters.
   */
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

    // Kiểm tra giới hạn sử dụng theo từng user (userUsageLimit)
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

    // Tính số tiền giảm
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

  /**
   * Áp dụng voucher và tăng usedCount với High-Concurrency Redis Atomic Counters.
   *
   * HIGH-CONCURRENCY RACE-CONDITION FIX:
   *   - Delegates directly to `voucherRepo.atomicApplyVoucher`, which executes Redis atomic multi/exec
   *     and strictly validates both `totalUsageLimit` and `userUsageLimit`.
   *   - Eliminates `SELECT ... FOR UPDATE` row locks, preventing DB connection pool exhaustion.
   *   - Translates failure reasons to appropriate HTTP status codes.
   */
  async applyVoucher(code: string, userId: number) {
    logger.info({ code, userId }, 'applyVoucher: initiating atomic voucher application')

    // Direct atomic delegation — no manual existence pre-check in service layer
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
          throw new BadRequestError('Bạn đã dùng hết lượt sử dụng voucher này')
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
}

```

# voucher\voucher.worker.ts

| Property | Value |
|----------|-------|
| Path | `voucher\voucher.worker.ts` |
| Size | 5,674 bytes |
| Extension | `.ts` |
| Modified | 2026-10-06 21:26:08.037984 |

```typescript
// src/modules/loyalty-engage/voucher/voucher.worker.ts
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

/**
 * Reconciles voucher usage between Redis and PostgreSQL.
 *
 * EVENTUAL CONSISTENCY GUARANTEE:
 *   - During flash sales, Redis atomic counters serve as the real-time source-of-truth.
 *   - If network partitions, DB connection timeouts, or sudden pod crashes prevent
 *     PostgreSQL from recording usedCount, Redis maintains the authoritative count.
 *   - This reconciliation job scans all non-deleted, active vouchers, compares
 *     `voucher:total:{code}` in Redis against `usedCount` in PostgreSQL,
 *     and overwrites PostgreSQL with the Redis source-of-truth.
 */
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
          // Key doesn't exist in Redis yet: seed it with DB usedCount so subsequent concurrent redemptions start with valid base
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

          // Overwrite PostgreSQL with Redis source-of-truth
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

/**
 * Initializes the nightly reconciliation cron job.
 * Default schedule: `0 2 * * *` (Daily at 2:00 AM)
 */
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

