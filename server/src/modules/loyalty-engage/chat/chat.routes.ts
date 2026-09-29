// src/modules/loyalty-engage/chat/chat.routes.ts
import { Router } from 'express'
import { requireAuth } from '@/middlewares/guards/auth.guard'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import { ChatController } from './chat.controller'
import {
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

// ─── WebSocket Session routes (nội bộ, dùng cho Socket.IO server) ────────────

/**
 * GET /chat/sessions/:userId/online phải đứng TRƯỚC GET /sessions/:userId
 * để tránh Express match 'online' như :userId param
 */
chatRouter.get(
  '/sessions/:userId/online',
  validateRequest({
    params: z.object({
      userId: z.string().regex(/^\d+$/, 'userId phải là số nguyên').transform(Number),
    }),
  }),
  controller.checkUserOnline,
)

/** GET /chat/sessions/:userId – Lấy danh sách sessions của một user */
chatRouter.get(
  '/sessions/:userId',
  validateRequest({
    params: z.object({
      userId: z.string().regex(/^\d+$/, 'userId phải là số nguyên').transform(Number),
    }),
  }),
  controller.getSocketSessionsByUser,
)

/** POST /chat/sessions – Lưu socket session (gọi khi user kết nối WS) */
chatRouter.post(
  '/sessions',
  validateRequest({ body: upsertSocketSessionBodySchema }),
  controller.upsertSocketSession,
)

/** DELETE /chat/sessions – Xóa socket session (gọi khi user ngắt kết nối) */
chatRouter.delete(
  '/sessions',
  validateRequest({ body: removeSocketSessionBodySchema }),
  controller.removeSocketSession,
)
