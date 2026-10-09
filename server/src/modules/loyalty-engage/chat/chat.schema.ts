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