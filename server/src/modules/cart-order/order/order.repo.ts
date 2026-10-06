import { OrderStatus, PaymentStatus, PointTransType, Prisma } from '@prisma/client'
import { prisma } from '@/database/prisma'
import { ListOrderInput } from './order.schema'

export const orderItemInclude = {
  orderItems: {
    include: {
      variant: {
        include: {
          product: {
            select: { id: true, defaultName: true, thumbnailUrl: true },
          },
          attributeValues: {
            include: { attribute: true },
          },
        },
      },
    },
  },
  shipment: true,
  paymentTransactions: true,
  pointTransactions: true,
} satisfies Prisma.OrderInclude

export class OrderRepo {
  /**
   * PESSIMISTIC LOCK: Khóa phiên giỏ hàng của User chống spam click / double-submit
   */
  async lockCartByUserId(userId: number, tx: Prisma.TransactionClient) {
    const carts = await tx.$queryRaw<Array<{ id: number }>>`
      SELECT id FROM "Cart" WHERE "userId" = ${userId} FOR UPDATE
    `
    return carts[0]
  }

  async list(userId: number, query: ListOrderInput, isAdmin: boolean = false) {
    const { page = 1, limit = 10, status, all } = query

    const where: Prisma.OrderWhereInput = {
      ...(isAdmin && all ? {} : { userId }),
      deletedAt: null,
      ...(status ? { status } : {}),
    }

    const [totalItems, data] = await Promise.all([
      prisma.order.count({ where }),
      prisma.order.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: orderItemInclude,
      }),
    ])

    return {
      data,
      totalItems,
      page,
      limit,
      totalPages: Math.ceil(totalItems / limit) || 1,
    }
  }

  async findById(
    id: number,
    userId?: number,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.order.findFirst({
      where: {
        id,
        deletedAt: null,
        ...(userId ? { userId } : {}),
      },
      include: orderItemInclude,
    })
  }

  async create(data: Prisma.OrderCreateInput, tx: Prisma.TransactionClient) {
    return tx.order.create({
      data,
      include: orderItemInclude,
    })
  }

  async updateStatus(
    id: number,
    status: OrderStatus,
    updatedById?: number,
    paymentStatus?: PaymentStatus,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.order.update({
      where: { id },
      data: {
        status,
        updatedById,
        ...(paymentStatus ? { paymentStatus } : {}),
      },
      include: orderItemInclude,
    })
  }

  async update(
    id: number,
    data: Prisma.OrderUpdateInput,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.order.update({
      where: { id },
      data,
      include: orderItemInclude,
    })
  }

  async findShippingAddress(
    id: number,
    userId: number,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.shippingAddress.findFirst({
      where: { id, userId },
    })
  }

  async findVariantForOrder(
    variantId: number,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    const now = new Date()
    return db.productVariant.findFirst({
      where: { id: variantId, deletedAt: null },
      include: {
        product: true,
        attributeValues: {
          include: { attribute: true },
        },
        flashSaleItems: {
          where: {
            campaign: {
              isActive: true,
              deletedAt: null,
              startTime: { lte: now },
              endTime: { gte: now },
            },
          },
          include: {
            campaign: true,
          },
        },
      },
    })
  }

  /**
   * OPTIMISTIC LOCK: Trừ tồn kho kiểm tra cả updatedAt lẫn stockQuantity
   */
  async decrementStockOptimistic(
    variantId: number,
    quantity: number,
    expectedUpdatedAt: Date,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    const updated = await db.productVariant.updateMany({
      where: {
        id: variantId,
        updatedAt: expectedUpdatedAt,
        stockQuantity: { gte: quantity },
      },
      data: { stockQuantity: { decrement: quantity } },
    })
    return updated.count
  }

  async incrementStock(
    variantId: number,
    quantity: number,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.productVariant.update({
      where: { id: variantId },
      data: { stockQuantity: { increment: quantity } },
    })
  }

  async createInventoryLog(
    data: Prisma.InventoryLogUncheckedCreateInput,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.inventoryLog.create({ data })
  }

  async refundUserPoints(
    userId: number,
    orderId: number,
    pointUsed: number,
    orderCode: string,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: { rewardPoints: { increment: pointUsed } },
      select: { rewardPoints: true },
    })

    return db.pointTransaction.create({
      data: {
        userId,
        orderId,
        pointChange: pointUsed,
        currentPoint: updatedUser.rewardPoints,
        transactionType: PointTransType.REFUND,
        description: `Hoàn điểm do hủy đơn hàng ${orderCode}`,
      },
    })
  }

  async refundVoucherUsage(
    voucherCode: string,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.voucher.updateMany({
      where: { code: voucherCode, usedCount: { gt: 0 } },
      data: { usedCount: { decrement: 1 } },
    })
  }

  async cancelOrder(
    orderId: number,
    paymentStatus: PaymentStatus,
    updatedById?: number,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.order.update({
      where: { id: orderId },
      data: {
        status: OrderStatus.CANCELLED,
        paymentStatus,
        updatedById,
      },
      include: orderItemInclude,
    })
  }

  async incrementFlashSaleSoldQuantity(
    flashSaleItemId: number,
    quantity: number,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.flashSaleItem.update({
      where: { id: flashSaleItemId },
      data: { soldQuantity: { increment: quantity } },
    })
  }

  async findVoucherByCode(
    code: string,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.voucher.findFirst({
      where: { code, deletedAt: null },
    })
  }

  async countUserVoucherOrders(
    userId: number,
    voucherCode: string,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.order.count({
      where: {
        userId,
        voucherCode,
        status: { not: OrderStatus.CANCELLED },
      },
    })
  }

  async incrementVoucherUsage(
    voucherCode: string,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.voucher.updateMany({
      where: { code: voucherCode },
      data: { usedCount: { increment: 1 } },
    })
  }

  async getUserRewardPoints(
    userId: number,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { rewardPoints: true },
    })
    return user?.rewardPoints ?? 0
  }

  /**
   * ATOMIC UPDATE: Trừ điểm thưởng có điều kiện chống trừ âm điểm khi chạy song song
   */
  async deductUserPoints(
    userId: number,
    orderId: number,
    pointUsed: number,
    orderCode: string,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    const updated = await db.user.updateMany({
      where: { id: userId, rewardPoints: { gte: pointUsed } },
      data: { rewardPoints: { decrement: pointUsed } },
    })

    if (updated.count === 0) {
      throw new Error('Số điểm thưởng không đủ hoặc đã bị trừ bởi giao dịch song song')
    }

    const user = await db.user.findUnique({
      where: { id: userId },
      select: { rewardPoints: true },
    })

    return db.pointTransaction.create({
      data: {
        userId,
        orderId,
        pointChange: -pointUsed,
        currentPoint: user?.rewardPoints ?? 0,
        transactionType: PointTransType.REDEEM,
        description: `Dùng ${pointUsed} điểm thanh toán đơn hàng ${orderCode}`,
      },
    })
  }

  async decrementFlashSaleSoldQuantity(
    variantId: number,
    quantity: number,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    const now = new Date()
    const activeItem = await db.flashSaleItem.findFirst({
      where: {
        variantId,
        soldQuantity: { gte: quantity },
        campaign: {
          isActive: true,
          deletedAt: null,
          startTime: { lte: now },
          endTime: { gte: now },
        },
      },
    })

    if (activeItem) {
      await db.flashSaleItem.update({
        where: { id: activeItem.id },
        data: { soldQuantity: { decrement: quantity } },
      })
    }
  }

  async findEarnTransactionByOrderId(
    orderId: number,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.pointTransaction.findFirst({
      where: {
        orderId,
        transactionType: PointTransType.EARN,
      },
    })
  }

  async awardUserPoints(
    userId: number,
    orderId: number,
    pointEarned: number,
    orderCode: string,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: { rewardPoints: { increment: pointEarned } },
      select: { rewardPoints: true },
    })

    return db.pointTransaction.create({
      data: {
        userId,
        orderId,
        pointChange: pointEarned,
        currentPoint: updatedUser.rewardPoints,
        transactionType: PointTransType.EARN,
        description: `Tích lũy điểm thưởng từ đơn hàng ${orderCode}`,
      },
    })
  }

  async getDashboardStats() {
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)

    const [totalUsers, totalOrders, totalProducts, revenueResult, newUsersThisMonth, ordersPending] = await Promise.all([
      prisma.user.count({ where: { deletedAt: null } }),
      prisma.order.count({ where: { deletedAt: null } }),
      prisma.product.count({ where: { deletedAt: null } }),
      prisma.order.aggregate({
        _sum: { totalAmount: true },
        where: { deletedAt: null, status: { notIn: ['CANCELLED', 'RETURNED'] } },
      }),
      prisma.user.count({
        where: {
          deletedAt: null,
          createdAt: { gte: startOfMonth },
        },
      }),
      prisma.order.count({
        where: { deletedAt: null, status: { in: ['PENDING_PAYMENT', 'PROCESSING', 'CONFIRMED'] } },
      }),
    ])

    return {
      totalUsers,
      totalOrders,
      totalProducts,
      totalRevenue: Number(revenueResult._sum.totalAmount || 0),
      newUsersThisMonth,
      ordersPending,
    }
  }
}