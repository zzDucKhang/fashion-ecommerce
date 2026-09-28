import { Prisma } from '@prisma/client'
import { prisma } from '@/database/prisma'
import { ListOrderInput } from './order.schema'

// Cấu hình include sẵn thông tin sản phẩm/biến thể cho OrderItem
const orderItemInclude = {
  orderItems: {
    include: {
      variant: {
        include: {
          product: {
            select: { id: true, name: true, thumbnail: true }
          },
          attributeValues: {
            include: { attribute: true }
          }
        }
      }
    }
  },
  shipment: true,
  paymentTransactions: true
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
   * BỔ SUNG: Cập nhật trạng thái đơn hàng
   */
  async updateStatus(
    id: number,
    status: string,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.order.update({
      where: { id },
      data: { status },
      include: orderItemInclude,
    })
  }

  /**
   * BỔ SUNG: Cập nhật thông tin đơn hàng tổng quát (Hủy đơn, cập nhật thanh toán...)
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
}