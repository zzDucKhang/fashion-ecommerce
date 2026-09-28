import { prisma } from '@/database/prisma'
import { BadRequestError, NotFoundError } from '@/common/errors'
import { AddCartItemInput, CartOwner, UpdateCartItemInput } from './cart.schema'
import { CartRepo } from './cart.repo'

export class CartService {
	constructor(private readonly cartRepo = new CartRepo()) {}

	private async ownerCart(userId?: number, sessionId?: string) {
		if (!userId && !sessionId) throw new BadRequestError('Cần userId hoặc sessionId để xác định giỏ hàng')
		return this.cartRepo.findOrCreateOwner(userId, sessionId)
	}

	async get(userId?: number, owner?: CartOwner) { return this.ownerCart(userId, owner?.sessionId) }

	async add(userId: number | undefined, owner: CartOwner, input: AddCartItemInput) {
		return prisma.$transaction(async (tx) => {
			const cart = userId && owner.sessionId ? await this.cartRepo.mergeGuestCart(userId, owner.sessionId, tx) : await this.cartRepo.findOrCreateOwner(userId, owner.sessionId, tx)
			const variant = await tx.productVariant.findFirst({ where: { id: input.variantId, deletedAt: null }, select: { id: true, stockQuantity: true } })
			if (!variant) throw new NotFoundError('Sản phẩm không tồn tại')
			const existing = await tx.cartItem.findUnique({ where: { cartId_variantId: { cartId: cart.id, variantId: input.variantId } } })
			const quantity = (existing?.quantity ?? 0) + input.quantity
			if (quantity > variant.stockQuantity) throw new BadRequestError('Số lượng sản phẩm vượt quá tồn kho')
			if (existing) await tx.cartItem.update({ where: { id: existing.id }, data: { quantity } })
			else await tx.cartItem.create({ data: { cartId: cart.id, variantId: input.variantId, quantity } })
			return this.cartRepo.get(cart.id, tx)
		})
	}

	async update(userId: number | undefined, owner: CartOwner, itemId: number, input: UpdateCartItemInput) {
		const cart = await this.ownerCart(userId, owner.sessionId)
		const item = await prisma.cartItem.findFirst({ where: { id: itemId, cartId: cart.id }, include: { variant: true } })
		if (!item) throw new NotFoundError('Mục sản phẩm không tồn tại trong giỏ hàng')
		if (input.quantity > item.variant.stockQuantity) throw new BadRequestError('Số lượng sản phẩm vượt quá tồn kho')
		if (input.quantity === 0) await prisma.cartItem.delete({ where: { id: itemId } })
		else await prisma.cartItem.update({ where: { id: itemId }, data: { quantity: input.quantity } })
		return this.cartRepo.get(cart.id)
	}

	async remove(userId: number | undefined, owner: CartOwner, itemId: number) {
		const cart = await this.ownerCart(userId, owner.sessionId)
		const result = await prisma.cartItem.deleteMany({ where: { id: itemId, cartId: cart.id } })
		if (!result.count) throw new NotFoundError('Mục sản phẩm không tồn tại trong giỏ hàng')
		return this.cartRepo.get(cart.id)
	}
}
