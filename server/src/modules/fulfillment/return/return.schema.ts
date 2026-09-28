import { ReturnStatus } from '@prisma/client'
import { z } from 'zod'

export const returnMediaSchema = z.object({
  mediaUrl: z.string().min(1).max(1000),
  mediaType: z.string().min(1).max(50),
})

export const getAllReturnsQuerySchema = z.object({
  status: z.nativeEnum(ReturnStatus).optional(),
  orderItemId: z.coerce.number().int().positive().optional(),
})

export const returnIdParamsSchema = z.object({
  returnId: z.coerce.number().int().positive('returnId phải là số nguyên dương'),
})

export const createReturnBodySchema = z.object({
  orderItemId: z.coerce.number().int().positive(),
  quantity: z.coerce.number().int().positive(),
  reason: z.string().min(1).max(255),
  description: z.string().optional().nullable(),
  medias: z.array(returnMediaSchema).optional(),
})

export const updateReturnBodySchema = z.object({
  quantity: z.coerce.number().int().positive().optional(),
  reason: z.string().min(1).max(255).optional(),
  description: z.string().optional().nullable(),
  status: z.nativeEnum(ReturnStatus).optional(),
})

export type GetAllReturnsQueryType = z.infer<typeof getAllReturnsQuerySchema>
export type CreateReturnBodyType = z.infer<typeof createReturnBodySchema>
export type UpdateReturnBodyType = z.infer<typeof updateReturnBodySchema>
export type ReturnMediaInput = z.infer<typeof returnMediaSchema>
