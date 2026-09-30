// src/modules/loyalty-engage/point/point.service.ts
import { BadRequestError, NotFoundError } from '@/common/errors'
import { PointRepo } from './point.repo'
import { EarnPointsBodyType, GetHistoryQueryType, RedeemPointsBodyType } from './point.schema'

export class PointService {
  constructor(private pointRepo = new PointRepo()) {}

  /**
   * Cộng điểm cho user khi đơn hàng hoàn thành (DELIVERED).
   * Quy tắc: 1 điểm = 1 VNĐ.
   * Sử dụng atomic transaction để tránh race condition.
   */
  // Sửa signature của earnPoints trong src/modules/loyalty-engage/point/point.service.ts:
  async earnPoints(body: EarnPointsBodyType) {
    const order = await this.pointRepo.findOrderById(body.orderId)
    if (!order) throw new NotFoundError('Đơn hàng không tồn tại')
    if (order.status !== 'DELIVERED') {
      throw new BadRequestError('Chỉ cộng điểm khi đơn hàng đã giao thành công (DELIVERED)')
    }

    const userId = order.userId
    const user = await this.pointRepo.findUserById(userId)
    if (!user) throw new NotFoundError('Người dùng không tồn tại')

    const existing = await this.pointRepo.findEarnTransactionByOrderId(body.orderId)
    if (existing) throw new BadRequestError('Đơn hàng này đã được cộng điểm trước đó')

    const newPoints = user.rewardPoints + body.pointChange

    const transaction = await this.pointRepo.updatePointsAndCreateTransaction(userId, newPoints, {
      orderId: body.orderId,
      pointChange: body.pointChange,
      currentPoint: newPoints,
      transactionType: 'EARN',
      description: body.description,
    })

    return {
      message: `Cộng ${body.pointChange} điểm thành công`,
      currentPoint: newPoints,
      transaction,
    }
  }

  /**
   * Trừ điểm khi user dùng điểm để thanh toán.
   * Quy tắc: 1 điểm = 1 VNĐ.
   * Sử dụng atomic transaction để tránh race condition.
   */
  async redeemPoints(userId: number, body: RedeemPointsBodyType) {
    const user = await this.pointRepo.findUserById(userId)
    if (!user) throw new NotFoundError('Người dùng không tồn tại')

    if (user.rewardPoints < body.pointsToRedeem) {
      throw new BadRequestError(
        `Số điểm không đủ. Bạn đang có ${user.rewardPoints} điểm, cần ${body.pointsToRedeem} điểm`,
      )
    }

    const order = await this.pointRepo.findOrderById(body.orderId)
    if (!order) throw new NotFoundError('Đơn hàng không tồn tại')
    if (order.userId !== userId) {
      throw new BadRequestError('Đơn hàng không thuộc về người dùng này')
    }

    const existing = await this.pointRepo.findRedeemTransactionByOrderId(body.orderId)
    if (existing) throw new BadRequestError('Điểm đã được áp dụng cho đơn hàng này rồi')

    // Kiểm tra điểm dùng không vượt quá giá trị đơn hàng (1 điểm = 1 VNĐ)
    const orderTotal = Number(order.totalAmount)
    if (body.pointsToRedeem > orderTotal) {
      throw new BadRequestError(
        `Số điểm sử dụng (${body.pointsToRedeem} điểm = ${body.pointsToRedeem} VNĐ) vượt quá giá trị đơn hàng (${orderTotal} VNĐ)`,
      )
    }

    const newPoints = user.rewardPoints - body.pointsToRedeem

    // Atomic: cập nhật balance + tạo transaction record trong 1 DB transaction
    const transaction = await this.pointRepo.updatePointsAndCreateTransaction(userId, newPoints, {
      orderId: body.orderId,
      pointChange: -body.pointsToRedeem,
      currentPoint: newPoints,
      transactionType: 'REDEEM',
      description: `Dùng ${body.pointsToRedeem} điểm (tương đương ${body.pointsToRedeem} VNĐ) thanh toán đơn hàng #${body.orderId}`,
    })

    return {
      message: `Đã dùng ${body.pointsToRedeem} điểm (tương đương ${body.pointsToRedeem} VNĐ)`,
      discountAmount: body.pointsToRedeem,
      currentPoint: newPoints,
      transaction,
    }
  }

  /** Lấy lịch sử giao dịch điểm của user (có phân trang) */
  async getHistory(userId: number, query: GetHistoryQueryType) {
    const { page, limit } = query
    const skip = (page - 1) * limit

    const { data, total } = await this.pointRepo.findTransactionsByUserId(userId, skip, limit)

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    }
  }

  /** Lấy tổng điểm hiện tại của user */
  async getBalance(userId: number) {
    const user = await this.pointRepo.findUserById(userId)
    if (!user) throw new NotFoundError('Người dùng không tồn tại')
    return { rewardPoints: user.rewardPoints }
  }
}
