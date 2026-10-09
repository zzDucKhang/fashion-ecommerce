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
  async create(
    data: {
    orderId: number
    amount: number
  }) {
    return prisma.paymentTransaction.create({
      data: {
        orderId: data.orderId,
        amount: data.amount,
        provider: 'SEPAY',
        status: 'PENDING',
        
      },
    })
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

  async findByPaymentCode(paymentCode: string) {
    // Trích xuất số orderId từ nội dung chuyển khoản (VD: "DH15" -> 15)
    // SePay có thể nhét thêm nội dung rác, nên ta dùng regex lấy số sau chữ DH
    const match = paymentCode.toUpperCase().match(/DH(\d+)/);
    if (!match) return null;

    const orderId = parseInt(match[1], 10);
    if (isNaN(orderId)) return null;

    // Tìm giao dịch thanh toán PENDING đang gắn với Order này
    return prisma.paymentTransaction.findFirst({
      where: {
        orderId: orderId,
        status: 'PENDING',
        provider: 'SEPAY'
      },
      include: paymentInclude,
      orderBy: { createdAt: 'desc' }
    });
  }


  async markSuccess(paymentId: number, providerTransId: string) {
    return prisma.$transaction(async (tx) => {
      const payment = await tx.paymentTransaction.update({
        where: {
          id: paymentId,
        },
        data: {
          status: 'SUCCESS',
          providerTransId,
        },
      })

      await tx.order.update({
        where: {
          id: payment.orderId,
        },
        data: {
          paymentStatus: 'SUCCESS',
          status: 'CONFIRMED',
        },
      })

      return payment
    })
  }
}
