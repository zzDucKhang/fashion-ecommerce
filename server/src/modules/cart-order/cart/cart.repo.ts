import { Prisma } from '@prisma/client'
import { prisma } from '@/database/prisma'

const cartInclude = {
	cartItems: {
		include: { variant: { include: { product: true, attributeValues: { include: { attribute: true } } } } },
		orderBy: { createdAt: 'asc' as const },
	},
} satisfies Prisma.CartInclude

export class CartRepo {
	async findByOwner(userId?: number, sessionId?: string, db: Prisma.TransactionClient | typeof prisma = prisma) {
		if (!userId && !sessionId) return null
		return db.cart.findFirst({ where: { OR: [...(userId ? [{ userId }] : []), ...(sessionId ? [{ sessionId }] : [])] }, include: cartInclude })
	}

	async createOwner(userId?: number, sessionId?: string, db: Prisma.TransactionClient | typeof prisma = prisma) {
		return db.cart.create({ data: { userId, sessionId }, include: cartInclude })
	}

	async findOrCreateOwner(userId?: number, sessionId?: string, db: Prisma.TransactionClient | typeof prisma = prisma) {
		return (await this.findByOwner(userId, sessionId, db)) ?? this.createOwner(userId, sessionId, db)
	}

	async mergeGuestCart(userId: number, sessionId: string, db: Prisma.TransactionClient) {
		const guest = await this.findByOwner(undefined, sessionId, db)
		const userCart = await this.findOrCreateOwner(userId, undefined, db)
		if (!guest || guest.id === userCart.id) return userCart
		for (const item of guest.cartItems) {
			const existing = await db.cartItem.findUnique({ where: { cartId_variantId: { cartId: userCart.id, variantId: item.variantId } } })
			if (existing) await db.cartItem.update({ where: { id: existing.id }, data: { quantity: existing.quantity + item.quantity } })
			else await db.cartItem.update({ where: { id: item.id }, data: { cartId: userCart.id } })
		}
		await db.cart.delete({ where: { id: guest.id } })
		return this.findOrCreateOwner(userId, undefined, db)
	}

	async get(cartId: number, db: Prisma.TransactionClient | typeof prisma = prisma) {
		return db.cart.findUnique({ where: { id: cartId }, include: cartInclude })
	}
}
