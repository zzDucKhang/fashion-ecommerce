import { BadRequestError, NotFoundError } from '@/common/errors'
import { createLogger } from '@/common/logger'
import { PointRepo } from './point.repo'
import { EarnPointsBodyType, GetHistoryQueryType, RedeemPointsBodyType } from './point.schema'

const logger = createLogger('PointService')

export class PointService {
  constructor(private pointRepo = new PointRepo()) {}

  async earnPoints(userId: number, body: EarnPointsBodyType) {
    logger.info({ adminId: userId, orderId: body.orderId }, 'earnPoints: initiated')

    const order = await this.pointRepo.findOrderById(body.orderId)
    if (!order) {
      logger.warn({ orderId: body.orderId }, 'earnPoints: order not found')
      throw new NotFoundError('Đơn hàng không tồn tại')
    }

    if (order.status !== 'DELIVERED') {
      logger.warn({ orderId: body.orderId, status: order.status }, 'earnPoints: order not DELIVERED')
      throw new BadRequestError('Chỉ cộng điểm khi đơn hàng đã giao thành công (DELIVERED)')
    }

    const targetUserId = order.userId

    const pointChange = Math.floor(Number(order.totalAmount) * 0.01)
    if (pointChange <= 0) {
      logger.warn({ orderId: body.orderId, totalAmount: order.totalAmount }, 'earnPoints: calculated point change is 0')
      throw new BadRequestError('Giá trị đơn hàng quá nhỏ, không đủ điều kiện cộng điểm')
    }

    const result = await this.pointRepo.atomicEarnPoints(
      targetUserId,
      body.orderId,
      pointChange,
      body.description || `Cộng điểm từ đơn hàng #${order.id}`,
    )

    if (!result) {
      logger.error({ targetUserId, orderId: body.orderId }, 'earnPoints: user not found in locked transaction')
      throw new NotFoundError('Người dùng không tồn tại')
    }

    if (result.isIdempotent) {
      logger.info(
        { targetUserId, orderId: body.orderId, currentPoint: result.currentPoint },
        'earnPoints: duplicate request resolved via idempotency check',
      )
      return {
        message: `Đơn hàng #${body.orderId} đã được cộng điểm trước đó (idempotent)`,
        currentPoint: result.currentPoint,
        transaction: result.transaction,
      }
    }

    logger.info(
      { targetUserId, orderId: body.orderId, pointChange, newPoints: result.currentPoint },
      'earnPoints: committed successfully',
    )

    return {
      message: `Cộng ${pointChange} điểm thành công cho user #${targetUserId}`,
      currentPoint: result.currentPoint,
      transaction: result.transaction,
    }
  }

  async redeemPoints(userId: number, body: RedeemPointsBodyType) {
    logger.info({ userId, orderId: body.orderId, pointsToRedeem: body.pointsToRedeem }, 'redeemPoints: initiated')

    const order = await this.pointRepo.findOrderById(body.orderId)
    if (!order) {
      logger.warn({ orderId: body.orderId }, 'redeemPoints: order not found')
      throw new NotFoundError('Đơn hàng không tồn tại')
    }

    if (order.userId !== userId) {
      logger.warn(
        { orderId: body.orderId, orderUserId: order.userId, requestUserId: userId },
        'redeemPoints: order does not belong to user',
      )
      throw new BadRequestError('Đơn hàng không thuộc về người dùng này')
    }

    const orderTotal = Number(order.totalAmount)

    const result = await this.pointRepo.atomicRedeemPoints(
      userId,
      body.orderId,
      body.pointsToRedeem,
      orderTotal,
      `Dùng ${body.pointsToRedeem} điểm (tương đương ${body.pointsToRedeem} VNĐ) thanh toán đơn hàng #${order.id}`,
    )

    if ('error' in result) {
      if (result.error === 'USER_NOT_FOUND') {
        logger.error({ userId }, 'redeemPoints: user not found')
        throw new NotFoundError('Người dùng không tồn tại')
      }

      if (result.error === 'INSUFFICIENT_POINTS') {
        logger.warn(
          { userId, currentPoint: result.currentPoint, required: result.required },
          'redeemPoints: insufficient points balance',
        )
        throw new BadRequestError(
          `Số điểm không đủ. Bạn đang có ${result.currentPoint} điểm, cần ${result.required} điểm`,
        )
      }

      if (result.error === 'EXCEEDS_ORDER_TOTAL') {
        logger.warn(
          { userId, pointsToRedeem: body.pointsToRedeem, orderTotal: result.orderTotal },
          'redeemPoints: redemption points exceed order total',
        )
        throw new BadRequestError(
          `Số điểm sử dụng (${body.pointsToRedeem} điểm = ${body.pointsToRedeem} VNĐ) vượt quá giá trị đơn hàng (${result.orderTotal} VNĐ)`,
        )
      }

      throw new BadRequestError('Không thể thực hiện trừ điểm')
    }

    if (result.isIdempotent) {
      logger.info(
        { userId, orderId: body.orderId, currentPoint: result.currentPoint },
        'redeemPoints: duplicate redemption resolved via idempotency check',
      )
      return {
        message: `Điểm đã được áp dụng cho đơn hàng #${body.orderId} trước đó (idempotent)`,
        discountAmount: result.discountAmount,
        currentPoint: result.currentPoint,
        transaction: result.transaction,
      }
    }

    logger.info(
      { userId, orderId: body.orderId, pointsToRedeem: body.pointsToRedeem, newPoints: result.currentPoint },
      'redeemPoints: committed successfully',
    )

    return {
      message: `Đã dùng ${body.pointsToRedeem} điểm (tương đương ${body.pointsToRedeem} VNĐ)`,
      discountAmount: result.discountAmount,
      currentPoint: result.currentPoint,
      transaction: result.transaction,
    }
  }

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

  async getBalance(userId: number) {
    const user = await this.pointRepo.findUserById(userId)
    if (!user) throw new NotFoundError('Người dùng không tồn tại')
    return { rewardPoints: user.rewardPoints }
  }

  /**
   * =========================================================================================
   * @WARNING CONTRACT RULES: CROSS-MODULE DEFENSIVE INTERFACE FOR CART-ORDER & FULFILLMENT
   * 
   * KHI HỦY ĐƠN HOẶC HOÀN TIỀN (RETURN/REFUND):
   * BẮT BUỘC GỌI HÀM NÀY QUA TRANSACTION: `compensatePointsForCancelledOrder(orderId, tx)`
   * =========================================================================================
   */
  async compensatePointsForCancelledOrder(orderId: number, tx?: any) {
    return this.pointRepo.compensatePointsForCancelledOrder(orderId, tx)
  }
}
