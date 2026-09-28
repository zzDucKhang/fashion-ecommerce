import { z } from 'zod'

export const cartOwnerSchema = z.object({ sessionId: z.string().trim().min(1).max(255).optional() })
export const addCartItemSchema = z.object({ variantId: z.coerce.number().int().positive(), quantity: z.coerce.number().int().positive().max(999) })
export const updateCartItemSchema = z.object({ quantity: z.coerce.number().int().min(0).max(999) })

export type CartOwner = z.infer<typeof cartOwnerSchema>
export type AddCartItemInput = z.infer<typeof addCartItemSchema>
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>
