import { z } from 'zod'

export const earnPointsBodySchema = z.object({
  orderId: z.number().int().positive('orderId phải là số nguyên dương'),
  description: z.string().trim().min(1).max(255).optional().default('Cộng điểm từ đơn hàng'),
})

export const redeemPointsBodySchema = z.object({
  orderId: z.number().int().positive('orderId phải là số nguyên dương'),
  pointsToRedeem: z.number().int().positive('Số điểm dùng phải lớn hơn 0'),
})

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

export type EarnPointsBodyType = z.infer<typeof earnPointsBodySchema>
export type RedeemPointsBodyType = z.infer<typeof redeemPointsBodySchema>
export type GetHistoryQueryType = z.infer<typeof getHistoryQuerySchema>
