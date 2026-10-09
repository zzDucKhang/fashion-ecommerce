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
