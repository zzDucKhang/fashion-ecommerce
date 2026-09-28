import { ShipmentStatus } from '@prisma/client'
import { z } from 'zod'

export const getAllShipmentsQuerySchema = z.object({
  status: z.nativeEnum(ShipmentStatus).optional(),
  orderId: z.coerce.number().int().positive().optional(),
})

export const shipmentIdParamsSchema = z.object({
  shipmentId: z.coerce.number().int().positive('shipmentId phải là số nguyên dương'),
})

export const orderIdParamsSchema = z.object({
  orderId: z.coerce.number().int().positive('orderId phải là số nguyên dương'),
})

export const createShipmentBodySchema = z.object({
  orderId: z.coerce.number().int().positive(),
  carrier: z.string().min(1).max(100),
  trackingCode: z.string().min(1).max(150),
  actualShippingFee: z.coerce.number().nonnegative(),
  status: z.nativeEnum(ShipmentStatus).optional(),
  estimatedDelivery: z.coerce.date().optional().nullable(),
})

export const updateShipmentBodySchema = createShipmentBodySchema
  .omit({ orderId: true })
  .partial()

export type GetAllShipmentsQueryType = z.infer<typeof getAllShipmentsQuerySchema>
export type CreateShipmentBodyType = z.infer<typeof createShipmentBodySchema>
export type UpdateShipmentBodyType = z.infer<typeof updateShipmentBodySchema>
