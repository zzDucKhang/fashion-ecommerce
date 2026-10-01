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
