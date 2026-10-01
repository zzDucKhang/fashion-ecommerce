// src/modules/loyalty-engage/point/point.repo.ts
import { prisma } from '@/database/prisma'

// Định nghĩa local type thay vì import từ @prisma/client (tránh lỗi version)
type PointTransType = 'EARN' | 'REDEEM' | 'REFUND' | 'EXPIRE'

export class PointRepo {
  /** Lấy thông tin user (cần rewardPoints hiện tại) */
  async findUserById(userId: number) {
    return prisma.user.findUnique({
      where: { id: userId, deletedAt: null },
      select: { id: true, rewardPoints: true },
    })
  }

  /**
   * Cập nhật điểm và tạo transaction trong cùng một DB transaction.
   * Đảm bảo tính atomic: nếu tạo transaction thất bại, điểm không bị trừ/cộng.
   * Note: tx typed as any để tương thích với Prisma interactive transaction API
   * trên phiên bản hiện tại (tương tự pattern trong user.repo.ts, address.repo.ts).
   */
  async updatePointsAndCreateTransaction(
    userId: number,
    newPoints: number,
    txData: {
      orderId?: number
      pointChange: number
      currentPoint: number
      transactionType: PointTransType
      description: string
    },
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return prisma.$transaction(async (tx: any) => {
      await tx.user.update({
        where: { id: userId },
        data: { rewardPoints: newPoints },
      })
      return tx.pointTransaction.create({
        data: {
          userId,
          orderId: txData.orderId,
          pointChange: txData.pointChange,
          currentPoint: txData.currentPoint,
          transactionType: txData.transactionType,
          description: txData.description,
        },
      })
    })
  }

<<<<<<< HEAD
  /**
   * Atomic conditional decrement: chỉ trừ điểm nếu rewardPoints >= pointsToRedeem tại thời điểm UPDATE.
   * Trả về true nếu thành công, false nếu không đủ điểm (ngăn race condition double-spend).
   */
  async atomicDecrementPoints(userId: number, pointsToRedeem: number): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return prisma.$transaction(async (tx: any) => {
      const result = await tx.user.updateMany({
        where: { id: userId, rewardPoints: { gte: pointsToRedeem }, deletedAt: null },
        data: { rewardPoints: { decrement: pointsToRedeem } },
      })
      return result.count > 0
    })
  }

  /** Tạo bản ghi giao dịch điểm độc lập (dùng sau atomicDecrementPoints) */
  async createTransaction(txData: {
    userId: number
    orderId?: number
    pointChange: number
    currentPoint: number
    transactionType: PointTransType
    description: string
  }) {
    return prisma.pointTransaction.create({
      data: {
        userId: txData.userId,
        orderId: txData.orderId,
        pointChange: txData.pointChange,
        currentPoint: txData.currentPoint,
        transactionType: txData.transactionType,
        description: txData.description,
      },
    })
  }

=======
>>>>>>> origin/feature/inventory-sale
  /** Lấy lịch sử giao dịch điểm của user có phân trang */
  async findTransactionsByUserId(userId: number, skip: number, take: number) {
    const [data, total] = await prisma.$transaction([
      prisma.pointTransaction.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      }),
      prisma.pointTransaction.count({ where: { userId } }),
    ])
    return { data, total }
  }

  /** Kiểm tra đơn hàng tồn tại, lấy thông tin cần thiết */
  async findOrderById(orderId: number) {
    return prisma.order.findUnique({
      where: { id: orderId },
      select: { id: true, userId: true, status: true, totalAmount: true, pointUsed: true },
    })
  }

  /** Kiểm tra đã tồn tại giao dịch EARN cho đơn này chưa */
  async findEarnTransactionByOrderId(orderId: number) {
    return prisma.pointTransaction.findFirst({
      where: { orderId, transactionType: 'EARN' },
    })
  }

  /** Kiểm tra đã tồn tại giao dịch REDEEM cho đơn này chưa */
  async findRedeemTransactionByOrderId(orderId: number) {
    return prisma.pointTransaction.findFirst({
      where: { orderId, transactionType: 'REDEEM' },
    })
  }
}
