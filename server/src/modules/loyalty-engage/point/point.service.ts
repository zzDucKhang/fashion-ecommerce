// src/modules/loyalty-engage/point/point.service.ts
import { BadRequestError, NotFoundError } from '@/common/errors'
import { PointRepo } from './point.repo'
import { EarnPointsBodyType, GetHistoryQueryType, RedeemPointsBodyType } from './point.schema'

export class PointService {
  constructor(private pointRepo = new PointRepo()) {}

  /**
   * Admin cộng điểm cho user khi đơn hàng hoàn thành (DELIVERED).
   * Điểm được tính tự động: 1% của totalAmount, làm tròn xuống số nguyên.
   * Admin gọi endpoint này – nhưng userId lấy từ đơn hàng (order.userId), không phải ID của admin.
   * Sử dụng atomic transaction để tránh race condition.
   */
  async earnPoints(_adminId: number, body: EarnPointsBodyType) {
    const order = await this.pointRepo.findOrderById(body.orderId)
    if (!order) throw new NotFoundError('Đơn hàng không tồn tại')
    if (order.status !== 'DELIVERED') {
      throw new BadRequestError('Chỉ cộng điểm khi đơn hàng đã giao thành công (DELIVERED)')
    }

    // Dùng userId từ đơn hàng, không phải userId của admin gọi API
    const userId = order.userId
    const user = await this.pointRepo.findUserById(userId)
    if (!user) throw new NotFoundError('Người dùng của đơn hàng không tồn tại')

    const existing = await this.pointRepo.findEarnTransactionByOrderId(body.orderId)
    if (existing) throw new BadRequestError('Đơn hàng này đã được cộng điểm trước đó')

    // Tính điểm tự động: 1% tổng giá trị đơn hàng, làm tròn xuống
    const pointChange = Math.floor(Number(order.totalAmount) * 0.01)
    if (pointChange <= 0) {
      throw new BadRequestError('Giá trị đơn hàng quá nhỏ, không đủ điểu kiện cộng điểm')
    }

    const newPoints = user.rewardPoints + pointChange

    const transaction = await this.pointRepo.updatePointsAndCreateTransaction(userId, newPoints, {
      orderId: body.orderId,
      pointChange,
      currentPoint: newPoints,
      transactionType: 'EARN',
      description: body.description,
    })

    return {
      message: `Cộng ${pointChange} điểm thành công cho user #${userId}`,
      currentPoint: newPoints,
      transaction,
    }
  }

  /**
   * Trừ điểm khi user dùng điểm để thanh toán.
   * Sử dụng atomic decrement có điều kiện để ngăn race condition: nếu 2 request
   * đồng thời cùng đọc số điểm và trừ, chỉ 1 request thành công (do WHERE gte).
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

    // Atomic decrement có điều kiện: chỉ trừ nếu rewardPoints >= pointsToRedeem tại thời điểm UPDATE
    // Ngăn double-spend khi 2 request cùng lúc (race condition)
    const updatedResult = await this.pointRepo.atomicDecrementPoints(userId, body.pointsToRedeem)
    if (!updatedResult) {
      throw new BadRequestError('Số điểm khả dụng không đủ (có thể đã bị dùng từ một tab khác)')
    }

    const newPoints = user.rewardPoints - body.pointsToRedeem

    // Tạo bản ghi giao dịch sau khi decrement thành công
    const transaction = await this.pointRepo.createTransaction({
      userId,
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
