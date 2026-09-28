import { z } from 'zod'
import { InventoryTransType } from '@prisma/client'

export const InventoryTransTypeEnum = z.nativeEnum(InventoryTransType)

export const inventoryLogSchema = z.object({
    id: z.number(),
    variantId: z.number(),
    transType: InventoryTransTypeEnum,
    quantityChange: z.number(),
    note: z.string().max(500).nullable(),
    createdAt: z.date(),
})

export const getInventoryLogsQuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce.number().int().positive().default(10),

    variantId: z.coerce
        .number()
        .int()
        .positive()
        .optional(),

    transType: InventoryTransTypeEnum.optional(),
})

export const getInventoryParamsSchema = z.object({
    variantId: z.coerce
        .number()
        .int()
        .positive('variantId phải là số nguyên dương'),
})

export const adjustStockBodySchema = z.object({
    variantId: z.number()
        .int()
        .positive('variantId phải là số nguyên dương'),

    transType: InventoryTransTypeEnum,

    quantityChange: z.number()
        .int('Số lượng biến động phải là số nguyên')
        .refine(
            (value) => value !== 0,
            'Số lượng biến động không được bằng 0'
        ),

    note: z.string()
        .max(500)
        .optional(),
})

export type InventoryLogType =
    z.infer<typeof inventoryLogSchema>

export type GetInventoryLogsQueryType =
    z.infer<typeof getInventoryLogsQuerySchema>

export type GetInventoryParamsType =
    z.infer<typeof getInventoryParamsSchema>

export type AdjustStockBodyType =
    z.infer<typeof adjustStockBodySchema>