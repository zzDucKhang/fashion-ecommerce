import { prisma } from '@/database/prisma'
import { GetAllPaymentsQueryType } from './payment.schema'

const paymentInclude = {
  order: {
    select: {
      id: true,
      orderCode: true,
      paymentMethod: true,
      paymentStatus: true,
      totalAmount: true,
    },
  },
} as const

export class PaymentRepo {
  async create(data: { orderId: number; amount: number; paymentCode: string }) {
    return prisma.paymentTransaction.create({ data: { orderId: data.orderId, amount: data.amount, provider: 'SEPAY', providerTransId: data.paymentCode } })
  }
  async findAll(query: GetAllPaymentsQueryType) {
    const where = {
      ...(query.status ? { status: query.status } : {}),
      ...(query.orderId ? { orderId: query.orderId } : {}),
    }

    const payments = await prisma.paymentTransaction.findMany({
      where,
      include: paymentInclude,
      orderBy: { createdAt: 'desc' },
    })

    return {
      data: payments,
      totalItems: payments.length,
    }
  }

  async findById(id: number) {
    return prisma.paymentTransaction.findUnique({
      where: { id },
      include: paymentInclude,
    })
  }
}
