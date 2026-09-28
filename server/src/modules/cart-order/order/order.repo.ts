import { Prisma } from '@prisma/client'
import { prisma } from '@/database/prisma'
import { ListOrderInput } from './order.schema'

export class OrderRepo {
	async list(userId: number, query: ListOrderInput) {
		const where = { userId, deletedAt: null }
		const [totalItems, data] = await Promise.all([
			prisma.order.count({ where }),
			prisma.order.findMany({ where, orderBy: { orderDate: 'desc' }, skip: (query.page - 1) * query.limit, take: query.limit, include: { orderItems: true, shipment: true } }),
		])
		return { data, totalItems, page: query.page, limit: query.limit, totalPages: Math.ceil(totalItems / query.limit) }
	}

	async findById(id: number, userId?: number) {
		return prisma.order.findFirst({ where: { id, deletedAt: null, ...(userId ? { userId } : {}) }, include: { orderItems: true, shipment: true, paymentTransactions: true } })
	}

	async create(data: Prisma.OrderCreateInput, tx: Prisma.TransactionClient) {
		return tx.order.create({ data, include: { orderItems: true } })
	}
}
