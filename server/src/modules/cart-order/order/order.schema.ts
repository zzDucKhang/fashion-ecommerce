import { z } from 'zod'

const addressSchema = z.object({
	receiverName: z.string().trim().min(1).max(255),
	receiverPhone: z.string().trim().min(5).max(50),
	province: z.string().trim().min(1).max(150),
	district: z.string().trim().min(1).max(150),
	ward: z.string().trim().min(1).max(150),
	detailAddress: z.string().trim().min(1).max(500),
})

export const createOrderSchema = z.object({
	cartItemIds: z.array(z.coerce.number().int().positive()).min(1).optional(),
	shippingAddressId: z.coerce.number().int().positive().optional(),
	shippingAddress: addressSchema.optional(),
	paymentMethod: z.enum(['COD', 'VNPAY', 'MOMO', 'BANK_TRANSFER']),
	shippingMethod: z.string().trim().min(1).max(50).default('STANDARD'),
	shippingFee: z.coerce.number().min(0).default(0),
	customerNote: z.string().max(5000).optional(),
	voucherCode: z.string().trim().max(100).optional(),
}).refine((value) => value.shippingAddressId || value.shippingAddress, { message: 'Cần cung cấp địa chỉ giao hàng' })

export const listOrderSchema = z.object({ page: z.coerce.number().int().positive().default(1), limit: z.coerce.number().int().positive().max(100).default(20) })
export const updateOrderStatusSchema = z.object({ status: z.enum(['PENDING_PAYMENT', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'RETURNED']) })

export type CreateOrderInput = z.infer<typeof createOrderSchema>
export type ListOrderInput = z.infer<typeof listOrderSchema>
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>
