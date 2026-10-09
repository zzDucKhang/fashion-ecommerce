import { prisma } from '@/database/prisma'
import { createLogger } from '@/common/logger'
import { NotFoundError } from '@/common/errors'

const logger = createLogger('PointRepo')

interface LockedUserRow {
  id: number
  rewardPoints: number
}

export type AtomicEarnResult =
  | { isIdempotent: true; transaction: any; currentPoint: number }
  | { isIdempotent: false; transaction: any; currentPoint: number; pointChange: number }

export type AtomicRedeemResult =
  | { isIdempotent: true; transaction: any; currentPoint: number; discountAmount: number }
  | { isIdempotent: false; transaction: any; currentPoint: number; discountAmount: number }
  | { error: 'USER_NOT_FOUND' }
  | { error: 'INSUFFICIENT_POINTS'; currentPoint: number; required: number }
  | { error: 'EXCEEDS_ORDER_TOTAL'; orderTotal: number }

export class PointRepo {
  async findUserById(userId: number) {
    return prisma.user.findUnique({
      where: { id: userId, deletedAt: null },
      select: { id: true, rewardPoints: true },
    })
  }

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

  async findOrderById(orderId: number) {
    return prisma.order.findUnique({
      where: { id: orderId },
      select: { id: true, userId: true, status: true, totalAmount: true, pointUsed: true },
    })
  }

  async atomicEarnPoints(
    userId: number,
    orderId: number,
    pointChange: number,
    description: string,
  ): Promise<AtomicEarnResult | null> {
    logger.info({ userId, orderId, pointChange }, 'atomicEarnPoints: entering transaction')

    return prisma.$transaction(
      async (tx: any): Promise<AtomicEarnResult | null> => {
        const lockedRows: LockedUserRow[] = await tx.$queryRaw`
          SELECT id, "rewardPoints"
          FROM "User"
          WHERE id = ${userId} AND "deletedAt" IS NULL
          FOR UPDATE
        `

        if (lockedRows.length === 0) {
          logger.warn({ userId }, 'atomicEarnPoints: user not found or deleted inside tx')
          return null
        }
        const lockedUser = lockedRows[0]

        const existingEarn = await tx.pointTransaction.findFirst({
          where: { orderId, transactionType: 'EARN' },
        })

        if (existingEarn) {
          logger.info(
            { userId, orderId, existingTransactionId: existingEarn.id },
            'atomicEarnPoints: duplicate request detected — returning idempotent response',
          )
          return {
            isIdempotent: true,
            transaction: existingEarn,
            currentPoint: lockedUser.rewardPoints,
          }
        }

        const newPoints = lockedUser.rewardPoints + pointChange

        await tx.user.update({
          where: { id: userId },
          data: { rewardPoints: newPoints },
        })

        const transaction = await tx.pointTransaction.create({
          data: {
            userId,
            orderId,
            pointChange,
            currentPoint: newPoints,
            transactionType: 'EARN',
            description,
          },
        })

        logger.info(
          { userId, orderId, pointChange, newPoints, transactionId: transaction.id },
          'atomicEarnPoints: EARN transaction committed successfully',
        )

        return {
          isIdempotent: false,
          transaction,
          currentPoint: newPoints,
          pointChange,
        }
      },
      {
        isolationLevel: 'ReadCommitted',
        timeout: 10000,
      },
    )
  }

  async atomicRedeemPoints(
    userId: number,
    orderId: number,
    pointsToRedeem: number,
    orderTotal: number,
    description: string,
  ): Promise<AtomicRedeemResult> {
    logger.info({ userId, orderId, pointsToRedeem }, 'atomicRedeemPoints: entering transaction')

    return prisma.$transaction(
      async (tx: any): Promise<AtomicRedeemResult> => {
        const lockedRows: LockedUserRow[] = await tx.$queryRaw`
          SELECT id, "rewardPoints"
          FROM "User"
          WHERE id = ${userId} AND "deletedAt" IS NULL
          FOR UPDATE
        `

        if (lockedRows.length === 0) {
          logger.warn({ userId }, 'atomicRedeemPoints: user not found inside tx')
          return { error: 'USER_NOT_FOUND' }
        }
        const lockedUser = lockedRows[0]

        const existingRedeem = await tx.pointTransaction.findFirst({
          where: { orderId, transactionType: 'REDEEM' },
        })

        if (existingRedeem) {
          logger.info(
            { userId, orderId, existingTransactionId: existingRedeem.id },
            'atomicRedeemPoints: duplicate redemption request detected — returning idempotent response',
          )
          return {
            isIdempotent: true,
            transaction: existingRedeem,
            currentPoint: lockedUser.rewardPoints,
            discountAmount: Math.abs(existingRedeem.pointChange),
          }
        }

        if (lockedUser.rewardPoints < pointsToRedeem) {
          logger.warn(
            { userId, currentPoints: lockedUser.rewardPoints, pointsToRedeem },
            'atomicRedeemPoints: insufficient reward points balance',
          )
          return {
            error: 'INSUFFICIENT_POINTS',
            currentPoint: lockedUser.rewardPoints,
            required: pointsToRedeem,
          }
        }

        if (pointsToRedeem > orderTotal) {
          logger.warn(
            { userId, pointsToRedeem, orderTotal },
            'atomicRedeemPoints: points exceed order total amount',
          )
          return {
            error: 'EXCEEDS_ORDER_TOTAL',
            orderTotal,
          }
        }

        const newPoints = lockedUser.rewardPoints - pointsToRedeem

        await tx.user.update({
          where: { id: userId },
          data: { rewardPoints: newPoints },
        })

        const transaction = await tx.pointTransaction.create({
          data: {
            userId,
            orderId,
            pointChange: -pointsToRedeem,
            currentPoint: newPoints,
            transactionType: 'REDEEM',
            description: description,
          },
        })

        logger.info(
          { userId, orderId, pointsToRedeem, newPoints, transactionId: transaction.id },
          'atomicRedeemPoints: REDEEM transaction committed successfully',
        )

        return {
          isIdempotent: false,
          transaction,
          currentPoint: newPoints,
          discountAmount: pointsToRedeem,
        }
      },
      {
        isolationLevel: 'ReadCommitted',
        timeout: 10000,
      },
    )
  }

  async compensatePointsForCancelledOrder(orderId: number, tx?: any) {
    const executeLogic = async (client: any) => {
      const order = await client.order.findUnique({
        where: { id: orderId },
        select: { id: true, userId: true, orderCode: true, pointUsed: true, pointEarned: true, status: true },
      })
      if (!order) {
        throw new NotFoundError(`Đơn hàng #${orderId} không tồn tại`)
      }

      const userId = order.userId

      const lockedRows: LockedUserRow[] = await client.$queryRaw`
        SELECT id, "rewardPoints"
        FROM "User"
        WHERE id = ${userId} AND "deletedAt" IS NULL
        FOR UPDATE
      `
      if (lockedRows.length === 0) {
        throw new NotFoundError(`Người dùng #${userId} không tồn tại`)
      }

      let currentPoints = lockedRows[0].rewardPoints
      let refundedPoints = 0
      let revokedPoints = 0

      if (order.pointUsed > 0) {
        const existingRefund = await client.pointTransaction.findFirst({
          where: { orderId: order.id, transactionType: 'REFUND' },
        })
        if (!existingRefund) {
          currentPoints += order.pointUsed
          refundedPoints = order.pointUsed
          await client.user.update({
            where: { id: userId },
            data: { rewardPoints: currentPoints },
          })
          await client.pointTransaction.create({
            data: {
              userId,
              orderId: order.id,
              pointChange: order.pointUsed,
              currentPoint: currentPoints,
              transactionType: 'REFUND',
              description: `Hoàn ${order.pointUsed} điểm do hủy/hoàn đơn hàng #${order.orderCode}`,
            },
          })
        }
      }

      if (order.pointEarned > 0) {
        const existingEarn = await client.pointTransaction.findFirst({
          where: { orderId: order.id, transactionType: 'EARN' },
        })
        if (existingEarn) {
          const existingRevoke = await client.pointTransaction.findFirst({
            where: {
              orderId: order.id,
              transactionType: 'REDEEM',
              description: { contains: 'Thu hồi' },
            },
          })
          if (!existingRevoke) {
            const pointsToDeduct = Math.min(currentPoints, order.pointEarned)
            currentPoints -= pointsToDeduct
            revokedPoints = pointsToDeduct
            await client.user.update({
              where: { id: userId },
              data: { rewardPoints: currentPoints },
            })
            await client.pointTransaction.create({
              data: {
                userId,
                orderId: order.id,
                pointChange: -pointsToDeduct,
                currentPoint: currentPoints,
                transactionType: 'REDEEM',
                description: `Thu hồi ${pointsToDeduct} điểm thưởng do hủy/hoàn đơn hàng #${order.orderCode}`,
              },
            })
          }
        }
      }

      return {
        userId,
        orderId: order.id,
        refundedPoints,
        revokedPoints,
        finalBalance: currentPoints,
      }
    }

    if (tx) {
      return executeLogic(tx)
    }
    return prisma.$transaction(executeLogic, {
      isolationLevel: 'ReadCommitted',
      timeout: 10000,
    })
  }
}
