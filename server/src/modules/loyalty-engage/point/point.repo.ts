// src/modules/loyalty-engage/point/point.repo.ts
import { prisma } from '@/database/prisma'
import { createLogger } from '@/common/logger'

const logger = createLogger('PointRepo')

/**
 * Row shape returned by `SELECT ... FOR UPDATE` on the User table.
 * Used for pessimistic row-level locking inside interactive transactions.
 */
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
  // ─────────────── Read-Only Queries (outside transaction) ───────────────

  /** Lấy thông tin user (cần rewardPoints hiện tại) — read-only, no lock */
  async findUserById(userId: number) {
    return prisma.user.findUnique({
      where: { id: userId, deletedAt: null },
      select: { id: true, rewardPoints: true },
    })
  }

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

  // ─────────────── ACID Transaction Methods (Pessimistic Locking & Idempotency) ───────────────

  /**
   * Atomic EARN flow with row-level pessimistic locking and strict idempotency.
   *
   * Wraps the ENTIRE sequence inside a single `prisma.$transaction`:
   *   1. Acquires Row-Level Lock on User row: `SELECT ... FOR UPDATE`
   *   2. Enforces Idempotency: checks for pre-existing EARN transaction for this orderId
   *   3. Updates user rewardPoints
   *   4. Records PointTransaction audit log
   */
  async atomicEarnPoints(
    userId: number,
    orderId: number,
    pointChange: number,
    description: string,
  ): Promise<AtomicEarnResult | null> {
    logger.info({ userId, orderId, pointChange }, 'atomicEarnPoints: entering transaction')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return prisma.$transaction(
      async (tx: any): Promise<AtomicEarnResult | null> => {
        // Step 1: Enforce Row-Level Pessimistic Locking on User table
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

        // Step 2: Strict Idempotency check inside the locked critical section
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

        // Step 3: Compute new balance and persist atomically
        const newPoints = lockedUser.rewardPoints + pointChange

        await tx.user.update({
          where: { id: userId },
          data: { rewardPoints: newPoints },
        })

        // Step 4: Persist audit log
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

  /**
   * Atomic REDEEM flow with row-level pessimistic locking and strict idempotency.
   *
   * Wraps the ENTIRE sequence inside a single `prisma.$transaction`:
   *   1. Acquires Row-Level Lock on User row: `SELECT ... FOR UPDATE`
   *   2. Enforces Idempotency: checks for pre-existing REDEEM transaction for this orderId
   *   3. Checks balance sufficiency against true locked balance (eliminates Check-Then-Act race condition)
   *   4. Enforces redemption cap against order total
   *   5. Decrements user rewardPoints
   *   6. Records PointTransaction audit log
   */
  async atomicRedeemPoints(
    userId: number,
    orderId: number,
    pointsToRedeem: number,
    orderTotal: number,
  ): Promise<AtomicRedeemResult> {
    logger.info({ userId, orderId, pointsToRedeem }, 'atomicRedeemPoints: entering transaction')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return prisma.$transaction(
      async (tx: any): Promise<AtomicRedeemResult> => {
        // Step 1: Enforce Row-Level Pessimistic Locking on User table
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

        // Step 2: Strict Idempotency check inside the locked critical section
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

        // Step 3: Atomic balance sufficiency verification (NO Check-Then-Act gap)
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

        // Step 4: Cap check against order total (1 point = 1 VND)
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

        // Step 5: Atomic decrement
        const newPoints = lockedUser.rewardPoints - pointsToRedeem

        await tx.user.update({
          where: { id: userId },
          data: { rewardPoints: newPoints },
        })

        // Step 6: Persist audit log
        const transaction = await tx.pointTransaction.create({
          data: {
            userId,
            orderId,
            pointChange: -pointsToRedeem,
            currentPoint: newPoints,
            transactionType: 'REDEEM',
            description: `Dùng ${pointsToRedeem} điểm (tương đương ${pointsToRedeem} VNĐ) thanh toán đơn hàng #${orderId}`,
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
}
