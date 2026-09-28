import { randomUUID } from 'node:crypto'
import { OrderStatus, Prisma } from '@prisma/client'
import { prisma } from '@/database/prisma'
import { BadRequestError, ForbiddenError, NotFoundError } from '@/common/errors'
import { CartRepo } from '../cart/cart.repo'
import { CreateOrderInput, ListOrderInput, UpdateOrderStatusInput } from './order.schema'
import { OrderRepo } from './order.repo'

const orderInclude = { orderItems: true, shipment: true, paymentTransactions: true } satisfies Prisma.OrderInclude

export class OrderService {
	constructor(private readonly orderRepo = new OrderRepo(), private readonly cartRepo = new CartRepo()) {}

	async list(userId: number, query: ListOrderInput) { return this.orderRepo.list(userId, query) }

	async findById(userId: number, orderId: number) {
		const order = await this.orderRepo.findById(orderId, userId)
		if (!order) throw new NotFoundError('Đơn hàng không tồn tại')
		return order
	}

	async create(userId: number, input: CreateOrderInput) {
		return prisma.$transaction(async (tx) => {
			const cart = await this.cartRepo.findByOwner(userId, undefined, tx)
			if (!cart) throw new BadRequestError('Giỏ hàng đang trống')
			const items = cart.cartItems.filter((item) => !input.cartItemIds || input.cartItemIds.includes(item.id))
			if (!items.length) throw new BadRequestError('Không có sản phẩm nào được chọn để đặt hàng')

			const address = input.shippingAddressId
				? await tx.shippingAddress.findFirst({ where: { id: input.shippingAddressId, userId } })
				: input.shippingAddress
			if (!address) throw new BadRequestError('Địa chỉ giao hàng không hợp lệ')
			const receiverPhone = 'phoneNumber' in address ? address.phoneNumber : address.receiverPhone

			let subTotal = 0
			const orderItems: Prisma.OrderItemCreateWithoutOrderInput[] = []
			for (const item of items) {
				const variant = await tx.productVariant.findFirst({ where: { id: item.variantId, deletedAt: null }, include: { product: true, attributeValues: true } })
				if (!variant) throw new NotFoundError(`Sản phẩm trong giỏ hàng không còn tồn tại: ${item.id}`)
				const updated = await tx.productVariant.updateMany({ where: { id: variant.id, stockQuantity: { gte: item.quantity } }, data: { stockQuantity: { decrement: item.quantity } } })
				if (!updated.count) throw new BadRequestError(`Sản phẩm ${variant.sku} không đủ tồn kho`)
				const unitPrice = Number(variant.sellingPrice)
				subTotal += unitPrice * item.quantity
				orderItems.push({ productName: variant.product.defaultName, skuCode: variant.sku, variantValue: variant.attributeValues.map((value) => value.value).join(', '), productImageUrl: variant.imageUrl ?? variant.product.thumbnailUrl, unitPrice, quantity: item.quantity, variant: { connect: { id: variant.id } } })
				await tx.inventoryLog.create({ data: { variantId: variant.id, transType: 'EXPORT_ORDER', quantityChange: -item.quantity, note: 'Xuất kho khi tạo đơn hàng' } })
			}

			const shippingFee = input.shippingFee
			const order = await this.orderRepo.create({
				orderCode: `ORD-${randomUUID()}`,
				user: { connect: { id: userId } }, receiverName: address.receiverName, receiverPhone,
				province: address.province, district: address.district, ward: address.ward, detailAddress: address.detailAddress,
				subTotal, shippingFee, shippingMethod: input.shippingMethod, totalAmount: subTotal + shippingFee,
				voucherCode: input.voucherCode, paymentMethod: input.paymentMethod, customerNote: input.customerNote,
				orderItems: { create: orderItems },
			}, tx)
			await tx.cartItem.deleteMany({ where: { id: { in: items.map((item) => item.id) } } })
			return order
		})
	}

	async updateStatus(orderId: number, input: UpdateOrderStatusInput, updatedById?: number) {
		const order = await this.orderRepo.findById(orderId)
		if (!order) throw new NotFoundError('Đơn hàng không tồn tại')
		if (order.status === 'CANCELLED' || order.status === 'DELIVERED') throw new BadRequestError('Không thể thay đổi trạng thái đơn hàng đã kết thúc')
		if (input.status === 'CANCELLED') return this.cancel(order.userId, orderId, updatedById)
		return prisma.order.update({ where: { id: orderId }, data: { status: input.status, updatedById }, include: orderInclude })
	}

	async cancel(userId: number, orderId: number, updatedById = userId) {
		return prisma.$transaction(async (tx) => {
			const order = await tx.order.findFirst({ where: { id: orderId, userId, deletedAt: null }, include: { orderItems: true } })
			if (!order) throw new NotFoundError('Đơn hàng không tồn tại')
			if (!['PENDING_PAYMENT', 'CONFIRMED'].includes(order.status)) throw new ForbiddenError('Đơn hàng đã được chuẩn bị hoặc giao, không thể hủy')
			for (const item of order.orderItems) {
				if (!item.variantId) continue
				await tx.productVariant.update({ where: { id: item.variantId }, data: { stockQuantity: { increment: item.quantity } } })
				await tx.inventoryLog.create({ data: { variantId: item.variantId, transType: 'RETURN_INBOUND', quantityChange: item.quantity, note: `Hoàn kho do hủy đơn ${order.orderCode}` } })
			}
			return tx.order.update({ where: { id: orderId }, data: { status: OrderStatus.CANCELLED, updatedById }, include: orderInclude })
		})
	}
}
