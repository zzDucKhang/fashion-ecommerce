// src/modules/loyalty-engage/chat/chat.schema.ts
import { z } from 'zod'

// ───────────────────────────────────────────
// Request Schemas
// ───────────────────────────────────────────

/** Gửi tin nhắn mới */
export const sendMessageBodySchema = z.object({
  receiverId: z.number().int().positive('receiverId phải là số nguyên dương'),
  content: z.string().trim().min(1, 'Nội dung tin nhắn không được để trống').max(5000),
  attachmentUrl: z
    .string()
    .url('URL attachment không hợp lệ')
    .max(1000)
    .optional()
    .nullable(),
})

/** Lấy lịch sử hội thoại với một user — supports cursor-based pagination */
export const getChatHistoryQuerySchema = z.object({
  withUserId: z
    .string()
    .regex(/^\d+$/, 'withUserId phải là số nguyên dương')
    .transform(Number),
  page: z
    .string()
    .optional()
    .transform((v) => (v ? parseInt(v, 10) : 1))
    .pipe(z.number().int().min(1)),
  limit: z
    .string()
    .optional()
    .transform((v) => (v ? parseInt(v, 10) : 20))
    .pipe(z.number().int().min(1).max(100)),
  /** Cursor-based pagination: message ID to start from (exclusive). Omit for first page. */
  cursor: z
    .string()
    .optional()
    .transform((v) => (v ? parseInt(v, 10) : undefined))
    .pipe(z.number().int().positive().optional()),
})

/** Lưu/cập nhật WebSocket session */
export const upsertSocketSessionBodySchema = z.object({
  socketId: z.string().trim().min(1, 'socketId không được để trống').max(255),
  userId: z.number().int().positive('userId phải là số nguyên dương'),
})

/** Gia hạn WebSocket session (Heartbeat ping) */
export const extendSocketSessionBodySchema = z.object({
  socketId: z.string().trim().min(1, 'socketId không được để trống').max(255),
})

/** Xóa WebSocket session khi disconnect */
export const removeSocketSessionBodySchema = z.object({
  socketId: z.string().trim().min(1, 'socketId không được để trống').max(255),
})

/** Đánh dấu tin nhắn đã đọc */
export const markReadBodySchema = z.object({
  senderId: z.number().int().positive('senderId phải là số nguyên dương'),
})

// ───────────────────────────────────────────
// Inferred Types
// ───────────────────────────────────────────
export type SendMessageBodyType = z.infer<typeof sendMessageBodySchema>
export type GetChatHistoryQueryType = z.infer<typeof getChatHistoryQuerySchema>
export type UpsertSocketSessionBodyType = z.infer<typeof upsertSocketSessionBodySchema>
export type ExtendSocketSessionBodyType = z.infer<typeof extendSocketSessionBodySchema>
export type RemoveSocketSessionBodyType = z.infer<typeof removeSocketSessionBodySchema>
export type MarkReadBodyType = z.infer<typeof markReadBodySchema>
