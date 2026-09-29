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
