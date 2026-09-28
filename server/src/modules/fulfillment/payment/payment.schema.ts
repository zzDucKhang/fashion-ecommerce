import { PaymentStatus } from '@prisma/client'
import { z } from 'zod'

export const getAllPaymentsQuerySchema = z.object({
  status: z.nativeEnum(PaymentStatus).optional(),
  orderId: z.coerce.number().int().positive().optional(),
})

export const paymentIdParamsSchema = z.object({
  paymentId: z.coerce.number().int().positive('paymentId phải là số nguyên dương'),
})

export type GetAllPaymentsQueryType = z.infer<typeof getAllPaymentsQuerySchema>
