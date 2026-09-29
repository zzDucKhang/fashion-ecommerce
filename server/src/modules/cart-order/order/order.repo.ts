import { OrderStatus, PaymentStatus, PointTransType, Prisma } from '@prisma/client'
import { prisma } from '@/database/prisma'
import { ListOrderInput } from './order.schema'

// Cấu hình include sẵn thông tin sản phẩm/biến thể cho OrderItem
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
} satisfies Prisma.OrderInclude

export class OrderRepo {
  /**
   * Lấy danh sách đơn hàng phân trang + lọc theo trạng thái
   */
  async list(userId: number, query: ListOrderInput) {
    const { page = 1, limit = 10, status } = query

    // Dựng điều kiện lọc động
    const where: Prisma.OrderWhereInput = {
      userId,
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

  /**
   * Tìm đơn hàng theo ID (Cho phép truyền Transaction Client nếu nằm trong Transaction)
   */
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

  /**
   * Tạo đơn hàng mới trong Transaction
   */
  async create(data: Prisma.OrderCreateInput, tx: Prisma.TransactionClient) {
    return tx.order.create({
      data,
      include: orderItemInclude,
    })
  }

  /**
   * Cập nhật trạng thái đơn hàng
   */
  async updateStatus(
    id: number,
    status: OrderStatus,
    updatedById?: number,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.order.update({
      where: { id },
      data: { status, updatedById },
      include: orderItemInclude,
    })
  }

  /**
   * Cập nhật thông tin đơn hàng tổng quát
   */
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

  /**
   * Tìm địa chỉ giao hàng của User
   */
  async findShippingAddress(
    id: number,
    userId: number,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.shippingAddress.findFirst({
      where: { id, userId },
    })
  }

  /**
   * Tìm biến thể sản phẩm phục vụ tạo đơn
   */
  async findVariantForOrder(
    variantId: number,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.productVariant.findFirst({
      where: { id: variantId, deletedAt: null },
      include: { product: true, attributeValues: true },
    })
  }

  /**
   * Trừ tồn kho biến thể sản phẩm (Atomic Decrement chống Race Condition)
   */
  async decrementStock(
    variantId: number,
    quantity: number,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    const updated = await db.productVariant.updateMany({
      where: { id: variantId, stockQuantity: { gte: quantity } },
      data: { stockQuantity: { decrement: quantity } },
    })
    return updated.count
  }

  /**
   * Hoàn lại tồn kho cho biến thể sản phẩm khi hủy đơn
   */
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

  /**
   * Ghi log kho (InventoryLog)
   */
  async createInventoryLog(
    data: Prisma.InventoryLogUncheckedCreateInput,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.inventoryLog.create({ data })
  }

  /**
   * Hoàn lại Điểm thưởng cho User và ghi PointTransaction
   */
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

  /**
   * Hoàn lại lượt dùng Voucher nếu có
   */
  async refundVoucherUsage(
    voucherCode: string,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.voucher.updateMany({
      where: { code: voucherCode, usedCount: { gt: 0 } },
      data: { usedCount: { decrement: 1 } },
    })
  }

  /**
   * Cập nhật trạng thái hủy đơn và đồng bộ paymentStatus
   */
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
}