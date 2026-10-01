// src/modules/loyalty-engage/chat/chat.routes.ts
import { Router } from 'express'
import { requireAuth } from '@/middlewares/guards/auth.guard'
<<<<<<< HEAD
import { requireAdmin } from '@/middlewares/guards/role.guard'
=======
>>>>>>> origin/feature/inventory-sale
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
<<<<<<< HEAD
  requireAdmin,
=======
  requireAuth,
>>>>>>> origin/feature/inventory-sale
  validateRequest({
    params: z.object({
      userId: z.string().regex(/^\d+$/, 'userId phải là số nguyên').transform(Number),
    }),
  }),
  controller.checkUserOnline,
)

<<<<<<< HEAD
/** GET /chat/sessions/:userId – Lấy danh sách sessions của một user (chỉ Admin) */
chatRouter.get(
  '/sessions/:userId',
  requireAdmin,
=======
chatRouter.get(
  '/sessions/:userId',
  requireAuth,
>>>>>>> origin/feature/inventory-sale
  validateRequest({
    params: z.object({
      userId: z.string().regex(/^\d+$/, 'userId phải là số nguyên').transform(Number),
    }),
  }),
  controller.getSocketSessionsByUser,
)

<<<<<<< HEAD
/** POST /chat/sessions – Lưu socket session (gọi khi user kết nối WS) (chỉ Admin/nội bộ) */
chatRouter.post(
  '/sessions',
  requireAdmin,
=======
chatRouter.post(
  '/sessions',
  requireAuth,
>>>>>>> origin/feature/inventory-sale
  validateRequest({ body: upsertSocketSessionBodySchema }),
  controller.upsertSocketSession,
)

<<<<<<< HEAD
/** DELETE /chat/sessions – Xóa socket session (gọi khi user ngắt kết nối) (chỉ Admin/nội bộ) */
chatRouter.delete(
  '/sessions',
  requireAdmin,
=======
chatRouter.delete(
  '/sessions',
  requireAuth,
>>>>>>> origin/feature/inventory-sale
  validateRequest({ body: removeSocketSessionBodySchema }),
  controller.removeSocketSession,
)
