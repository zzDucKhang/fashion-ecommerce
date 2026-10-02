import { PaymentStatus } from '@prisma/client'
import { z } from 'zod'

export const getAllPaymentsQuerySchema = z.object({
  status: z.nativeEnum(PaymentStatus).optional(),
  orderId: z.coerce.number().int().positive().optional(),
})

export const paymentIdParamsSchema = z.object({
  paymentId: z.coerce.number().int().positive('paymentId phải là số nguyên dương'),
})

export const createPaymentSchema = z.object({ orderId: z.number().int().positive() }).strict()
export type CreatePaymentInput = z.infer<typeof createPaymentSchema>

export type GetAllPaymentsQueryType = z.infer<typeof getAllPaymentsQuerySchema>

export interface SePayWebhookPayload {
  id: number
  gateway: string
  transactionDate: string
  accountNumber: string
  subAccount: string | null
  code: string | null
  content: string
  transferType: 'in' | 'out'
  description: string
  transferAmount: number
  accumulated: number
  referenceCode: string
}
