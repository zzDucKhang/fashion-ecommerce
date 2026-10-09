import Redis from 'ioredis'
import { prisma } from '@/database/prisma'
import { redisClient, redlock } from '@/database/redis'
import { createLogger } from '@/common/logger'
import { BadRequestError, NotFoundError } from '@/common/errors'
import { CreateVoucherBodyType, UpdateVoucherBodyType } from './voucher.schema'

const logger = createLogger('VoucherRepo')

const COLD_START_LOCK_TTL_MS = 3_000

export type VoucherFailureReason =
  | 'VOUCHER_NOT_FOUND'
  | 'VOUCHER_INACTIVE'
  | 'VOUCHER_NOT_STARTED'
  | 'VOUCHER_EXPIRED'
  | 'VOUCHER_USAGE_LIMIT_REACHED'
  | 'USER_USAGE_LIMIT_REACHED'

export type AtomicApplyVoucherResult =
  | { success: true; voucherId: number; code: string }
  | { success: false; reason: VoucherFailureReason }

export const VOUCHER_TOTAL_KEY_PREFIX = 'voucher:total:'
export const VOUCHER_USAGE_KEY_PREFIX = 'voucher:usage:'
export const VOUCHER_META_KEY_PREFIX = 'voucher:meta:'
const VOUCHER_META_CACHE_TTL_SECONDS = 30

export class VoucherRepo {
  constructor(private readonly redis: Redis = redisClient) {}

  async findAll(skip: number, take: number, isActive?: boolean) {
    const where = {
      deletedAt: null,
      ...(isActive !== undefined ? { isActive } : {}),
    }
    const [data, total] = await prisma.$transaction([
      prisma.voucher.findMany({ where, orderBy: { createdAt: 'desc' }, skip, take }),
      prisma.voucher.count({ where }),
    ])
    return { data, total }
  }

  async findById(id: number) {
    return prisma.voucher.findFirst({ where: { id, deletedAt: null } })
  }

  async findByCode(code: string) {
    const normalized = code.trim().toUpperCase()
    return prisma.voucher.findFirst({ where: { code: normalized, deletedAt: null } })
  }

  async findByCodeIncludingDeleted(code: string) {
    const normalized = code.trim().toUpperCase()
    return prisma.voucher.findFirst({ where: { code: normalized } })
  }

  async countUserVoucherUsage(userId: number, voucherCode: string): Promise<number> {
    const normalized = voucherCode.trim().toUpperCase()
    const usageKey = `${VOUCHER_USAGE_KEY_PREFIX}${normalized}`

    try {
      const countStr = await this.redis.hget(usageKey, userId.toString())
      if (countStr !== null) {
        return parseInt(countStr, 10)
      }
    } catch (err) {
      logger.warn({ voucherCode: normalized, userId, err }, 'countUserVoucherUsage: Redis error, falling back to DB')
    }

    return prisma.order.count({
      where: { userId, voucherCode: normalized, deletedAt: null },
    })
  }

  async getVoucherMetadata(code: string) {
    const normalized = code.trim().toUpperCase()
    const metaKey = `${VOUCHER_META_KEY_PREFIX}${normalized}`

    try {
      const cached = await this.redis.get(metaKey)
      if (cached) {
        logger.debug({ code: normalized }, 'getVoucherMetadata: cache hit from Redis')
        return JSON.parse(cached)
      }
    } catch (err) {
      logger.warn({ code: normalized, err }, 'getVoucherMetadata: Redis read error, falling back to database')
    }

    const voucher = await prisma.voucher.findFirst({
      where: { code: normalized, deletedAt: null },
    })

    if (voucher) {
      try {
        await this.redis.set(
          metaKey,
          JSON.stringify(voucher),
          'EX',
          VOUCHER_META_CACHE_TTL_SECONDS,
        )
        logger.debug({ code: normalized, voucherId: voucher.id }, 'getVoucherMetadata: cached metadata to Redis')
      } catch (err) {
        logger.warn({ code: normalized, err }, 'getVoucherMetadata: failed to write metadata cache to Redis')
      }
    }

    return voucher
  }

  async invalidateVoucherCache(code: string) {
    const normalized = code.trim().toUpperCase()
    const metaKey = `${VOUCHER_META_KEY_PREFIX}${normalized}`
    try {
      await this.redis.del(metaKey)
      logger.info({ code: normalized }, 'invalidateVoucherCache: evicted voucher cache from Redis')
    } catch (err) {
      logger.warn({ code: normalized, err }, 'invalidateVoucherCache: failed to evict cache from Redis')
    }
  }

  async create(data: CreateVoucherBodyType) {
    return prisma.voucher.create({
      data: {
        code: data.code,
        discountType: data.discountType,
        discountValue: data.discountValue,
        minOrderValue: data.minOrderValue,
        maxDiscountAmt: data.maxDiscountAmt,
        totalUsageLimit: data.totalUsageLimit,
        userUsageLimit: data.userUsageLimit,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        isActive: data.isActive,
      },
    })
  }

  async update(id: number, data: UpdateVoucherBodyType) {
    const updated = await prisma.voucher.update({
      where: { id },
      data: {
        ...(data.code !== undefined && { code: data.code }),
        ...(data.discountType !== undefined && { discountType: data.discountType }),
        ...(data.discountValue !== undefined && { discountValue: data.discountValue }),
        ...(data.minOrderValue !== undefined && { minOrderValue: data.minOrderValue }),
        ...(data.maxDiscountAmt !== undefined && { maxDiscountAmt: data.maxDiscountAmt }),
        ...(data.totalUsageLimit !== undefined && { totalUsageLimit: data.totalUsageLimit }),
        ...(data.userUsageLimit !== undefined && { userUsageLimit: data.userUsageLimit }),
        ...(data.startDate !== undefined && { startDate: new Date(data.startDate) }),
        ...(data.endDate !== undefined && { endDate: new Date(data.endDate) }),
        ...(data.isActive !== undefined && { isActive: data.isActive }),
      },
    })

    await this.invalidateVoucherCache(updated.code)
    return updated
  }

  async softDelete(id: number) {
    const deleted = await prisma.voucher.update({ where: { id }, data: { deletedAt: new Date() } })
    await this.invalidateVoucherCache(deleted.code)
    return deleted
  }

  async atomicApplyVoucher(
    code: string,
    userId: number,
  ): Promise<AtomicApplyVoucherResult> {
    const normalizedCode = code.trim().toUpperCase()
    logger.info(
      { code: normalizedCode, userId },
      'atomicApplyVoucher: initiating high-concurrency voucher application',
    )

    const voucher = await this.getVoucherMetadata(normalizedCode)

    if (!voucher) {
      logger.warn({ code: normalizedCode, userId }, 'atomicApplyVoucher: voucher not found')
      return { success: false, reason: 'VOUCHER_NOT_FOUND' }
    }

    if (!voucher.isActive) {
      logger.warn(
        { code: normalizedCode, userId, voucherId: voucher.id },
        'atomicApplyVoucher: voucher is inactive',
      )
      return { success: false, reason: 'VOUCHER_INACTIVE' }
    }

    const now = new Date()
    const startDate = new Date(voucher.startDate)
    const endDate = new Date(voucher.endDate)

    if (now < startDate) {
      logger.warn(
        { code: normalizedCode, userId, voucherId: voucher.id, startDate },
        'atomicApplyVoucher: voucher not started yet',
      )
      return { success: false, reason: 'VOUCHER_NOT_STARTED' }
    }

    if (now > endDate) {
      logger.warn(
        { code: normalizedCode, userId, voucherId: voucher.id, endDate },
        'atomicApplyVoucher: voucher expired',
      )
      return { success: false, reason: 'VOUCHER_EXPIRED' }
    }

    const ttlSeconds = Math.max(
      Math.ceil((endDate.getTime() - now.getTime()) / 1000) + 86400,
      3600,
    )

    const totalUsageKey = `${VOUCHER_TOTAL_KEY_PREFIX}${normalizedCode}`
    const userUsageKey = `${VOUCHER_USAGE_KEY_PREFIX}${normalizedCode}`
    const userIdStr = userId.toString()

    try {
      await this.redis.set(
        totalUsageKey,
        voucher.usedCount.toString(),
        'EX',
        ttlSeconds,
        'NX',
      )

      if (voucher.userUsageLimit > 0) {
        const userFieldExists = await this.redis.hexists(userUsageKey, userIdStr)
        if (!userFieldExists) {
          const lockKey = `lock:voucher:seed:${normalizedCode}:${userIdStr}`
          let lock: Awaited<ReturnType<typeof redlock.acquire>> | null = null
          try {
            lock = await redlock.acquire([lockKey], COLD_START_LOCK_TTL_MS)

            const fieldExistsAfterLock = await this.redis.hexists(userUsageKey, userIdStr)
            if (!fieldExistsAfterLock) {
              const priorUsage = await prisma.order.count({
                where: { userId, voucherCode: normalizedCode, deletedAt: null },
              })
              await this.redis.hsetnx(userUsageKey, userIdStr, priorUsage.toString())
              await this.redis.expire(userUsageKey, ttlSeconds)
              logger.debug(
                { code: normalizedCode, userId, priorUsage },
                'atomicApplyVoucher: cold-start seed completed under distributed lock',
              )
            } else {
              logger.debug(
                { code: normalizedCode, userId },
                'atomicApplyVoucher: field already seeded by concurrent winner, skipping DB read',
              )
            }
          } catch (lockErr: unknown) {
            logger.warn(
              { code: normalizedCode, userId, err: lockErr },
              'atomicApplyVoucher: could not acquire cold-start seed lock — skipping DB seed to prevent stampede',
            )
          } finally {
            if (lock) {
              await lock.release().catch((releaseErr: unknown) => {
                logger.warn(
                  { code: normalizedCode, userId, err: releaseErr },
                  'atomicApplyVoucher: failed to release cold-start seed lock',
                )
              })
            }
          }
        }
      }
    } catch (seedErr) {
      logger.warn(
        { code: normalizedCode, userId, err: seedErr },
        'atomicApplyVoucher: Redis cold-start seed warning (proceeding to atomic phase)',
      )
    }

    const multi = this.redis.multi()
    multi.hincrby(userUsageKey, userIdStr, 1)
    multi.incr(totalUsageKey)
    multi.expire(userUsageKey, ttlSeconds)
    multi.expire(totalUsageKey, ttlSeconds)

    const execResults = await multi.exec()

    if (!execResults || execResults.length < 2) {
      logger.error(
        { code: normalizedCode, userId },
        'atomicApplyVoucher: Redis multi transaction returned empty results',
      )
      throw new Error('Lỗi giao dịch phân tán Redis khi áp dụng voucher')
    }

    const [userIncrErr, rawUserUsage] = execResults[0]
    const [totalIncrErr, rawTotalUsage] = execResults[1]

    if (userIncrErr || totalIncrErr) {
      logger.error(
        { code: normalizedCode, userId, userIncrErr, totalIncrErr },
        'atomicApplyVoucher: Redis atomic increment failed',
      )
      throw (userIncrErr || totalIncrErr)
    }

    const newUserUsage = Number(rawUserUsage)
    const newTotalUsage = Number(rawTotalUsage)

    logger.debug(
      {
        code: normalizedCode,
        userId,
        newUserUsage,
        newTotalUsage,
        totalUsageLimit: voucher.totalUsageLimit,
        userUsageLimit: voucher.userUsageLimit,
      },
      'atomicApplyVoucher: Redis atomic counters incremented',
    )

    if (voucher.totalUsageLimit > 0 && newTotalUsage > voucher.totalUsageLimit) {
      logger.warn(
        {
          code: normalizedCode,
          userId,
          newTotalUsage,
          totalUsageLimit: voucher.totalUsageLimit,
        },
        'atomicApplyVoucher: total usage limit reached, rolling back Redis counters',
      )

      const rollbackMulti = this.redis.multi()
      rollbackMulti.hincrby(userUsageKey, userIdStr, -1)
      rollbackMulti.decr(totalUsageKey)
      await rollbackMulti.exec()

      return { success: false, reason: 'VOUCHER_USAGE_LIMIT_REACHED' }
    }

    if (voucher.userUsageLimit > 0 && newUserUsage > voucher.userUsageLimit) {
      logger.warn(
        {
          code: normalizedCode,
          userId,
          newUserUsage,
          userUsageLimit: voucher.userUsageLimit,
        },
        'atomicApplyVoucher: user usage limit reached, rolling back Redis counters',
      )

      const rollbackMulti = this.redis.multi()
      rollbackMulti.hincrby(userUsageKey, userIdStr, -1)
      rollbackMulti.decr(totalUsageKey)
      await rollbackMulti.exec()

      return { success: false, reason: 'USER_USAGE_LIMIT_REACHED' }
    }

    try {
      await prisma.voucher.update({
        where: { id: voucher.id },
        data: { usedCount: { increment: 1 } },
      })

      logger.info(
        {
          voucherId: voucher.id,
          code: normalizedCode,
          userId,
          newTotalUsage,
          newUserUsage,
        },
        'atomicApplyVoucher: voucher applied successfully and DB synchronized',
      )

      return { success: true, voucherId: voucher.id, code: voucher.code }
    } catch (dbError) {
      logger.error(
        { err: dbError, voucherId: voucher.id, code: normalizedCode, userId },
        'atomicApplyVoucher: DB update failed after Redis commit, executing compensating rollback',
      )

      const rollbackMulti = this.redis.multi()
      rollbackMulti.hincrby(userUsageKey, userIdStr, -1)
      rollbackMulti.decr(totalUsageKey)
      await rollbackMulti.exec()

      throw dbError
    }
  }

  async releaseVoucher(code: string, userId: number) {
    const normalizedCode = code.trim().toUpperCase()
    const totalUsageKey = `${VOUCHER_TOTAL_KEY_PREFIX}${normalizedCode}`
    const userUsageKey = `${VOUCHER_USAGE_KEY_PREFIX}${normalizedCode}`
    const userIdStr = userId.toString()

    logger.info({ code: normalizedCode, userId }, 'releaseVoucher: releasing voucher allocation')

    const rollbackMulti = this.redis.multi()
    rollbackMulti.hincrby(userUsageKey, userIdStr, -1)
    rollbackMulti.decr(totalUsageKey)
    await rollbackMulti.exec()

    await prisma.voucher.updateMany({
      where: { code: normalizedCode, usedCount: { gt: 0 } },
      data: { usedCount: { decrement: 1 } },
    })
  }

  /**
   * =========================================================================================
   * @WARNING CONTRACT RULES: CROSS-MODULE DEFENSIVE INTERFACE FOR CART-ORDER
   * 
   *  ██╗    ██╗ █████╗ ██████╗ ███╗   ██╗██╗███╗   ██╗ ██████╗ 
   *  ██║    ██║██╔══██╗██╔══██╗████╗  ██║██║████╗  ██║██╔════╝ 
   *  ██║ █╗ ██║███████║██████╔╝██╔██╗ ██║██║██╔██╗ ██║██║  ███╗
   *  ██║███╗██║██╔══██║██╔══██╗██║╚██╗██║██║██║╚██╗██║██║   ██║
   *  ╚███╔███╔╝██║  ██║██║  ██║██║ ╚████║██║██║ ╚████║╚██████╔╝
   *   ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝╚═╝  ╚═══╝ ╚═════╝ 
   * =========================================================================================
   * GỬI TEAM CART-ORDER (CHECKOUT MODULE):
   * 
   * TUYỆT ĐỐI KHÔNG GỌI TRỰC TIẾP `increment` VÀO DB (PostgreSQL) KHI CREATE ORDER!
   * Việc tự ý cập nhật DB mà không qua Redis sẽ gây ra lỗi SPLIT-BRAIN cực kỳ nguy hiểm:
   *   - Redis Atomic Counter bị lệch pha hoàn toàn với PostgreSQL.
   *   - Gây lỗi OVERSELL (bán vượt số lượng voucher) trong các đợt Flash Sale / Traffic cao.
   * 
   * BẮT BUỘC PHẢI GỌI HÀM NÀY: `applyVoucherSafely(voucherCode, userId, prismaTx)`
   * và truyền Prisma Interactive Transaction Client (`tx`) vào để bảo đảm:
   *   1. Tăng/Trừ Redis Atomic Counter trước (ioredis).
   *   2. Báo lỗi ngay lập tức nếu Redis báo hết lượt (Oversell Protection).
   *   3. Cập nhật biến động vào bảng Voucher thông qua `prismaTx` (Transaction chung).
   *   4. Tự động Rollback bộ đếm Redis nếu cập nhật DB thất bại.
   * =========================================================================================
   */
  async applyVoucherSafely(voucherCode: string, userId: number, prismaTx: any) {
    const normalizedCode = voucherCode.trim().toUpperCase()
    logger.info({ voucherCode: normalizedCode, userId }, 'applyVoucherSafely: cross-module application initiated')

    const voucher = await this.getVoucherMetadata(normalizedCode)
    if (!voucher) {
      throw new NotFoundError('Mã voucher không tồn tại')
    }

    if (!voucher.isActive) {
      throw new BadRequestError('Voucher đã bị vô hiệu hóa')
    }

    const now = new Date()
    const startDate = new Date(voucher.startDate)
    const endDate = new Date(voucher.endDate)

    if (now < startDate) {
      throw new BadRequestError('Voucher chưa đến thời gian áp dụng')
    }
    if (now > endDate) {
      throw new BadRequestError('Voucher đã hết hạn sử dụng')
    }

    const ttlSeconds = Math.max(
      Math.ceil((endDate.getTime() - now.getTime()) / 1000) + 86400,
      3600,
    )
    const totalUsageKey = `${VOUCHER_TOTAL_KEY_PREFIX}${normalizedCode}`
    const userUsageKey = `${VOUCHER_USAGE_KEY_PREFIX}${normalizedCode}`
    const userIdStr = userId.toString()

    try {
      await this.redis.set(totalUsageKey, voucher.usedCount.toString(), 'EX', ttlSeconds, 'NX')
      if (voucher.userUsageLimit > 0) {
        const userFieldExists = await this.redis.hexists(userUsageKey, userIdStr)
        if (!userFieldExists) {
          const lockKey = `lock:voucher:seed:${normalizedCode}:${userIdStr}`
          let lock: Awaited<ReturnType<typeof redlock.acquire>> | null = null
          try {
            lock = await redlock.acquire([lockKey], COLD_START_LOCK_TTL_MS)
            const fieldExistsAfterLock = await this.redis.hexists(userUsageKey, userIdStr)
            if (!fieldExistsAfterLock) {
              const priorUsage = await prisma.order.count({
                where: { userId, voucherCode: normalizedCode, deletedAt: null },
              })
              await this.redis.hsetnx(userUsageKey, userIdStr, priorUsage.toString())
              await this.redis.expire(userUsageKey, ttlSeconds)
            }
          } catch (lockErr) {
            logger.warn({ code: normalizedCode, userId, lockErr }, 'applyVoucherSafely: seed lock failed, continuing')
          } finally {
            if (lock) await lock.release().catch(() => {})
          }
        }
      }
    } catch (seedErr) {
      logger.warn({ code: normalizedCode, userId, seedErr }, 'applyVoucherSafely: seed warning')
    }

    const multi = this.redis.multi()
    multi.hincrby(userUsageKey, userIdStr, 1)
    multi.incr(totalUsageKey)
    multi.expire(userUsageKey, ttlSeconds)
    multi.expire(totalUsageKey, ttlSeconds)

    const execResults = await multi.exec()
    if (!execResults || execResults.length < 2) {
      throw new Error('Lỗi giao dịch phân tán Redis khi áp dụng voucher')
    }

    const [userIncrErr, rawUserUsage] = execResults[0]
    const [totalIncrErr, rawTotalUsage] = execResults[1]

    if (userIncrErr || totalIncrErr) {
      throw (userIncrErr || totalIncrErr)
    }

    const newUserUsage = Number(rawUserUsage)
    const newTotalUsage = Number(rawTotalUsage)

    if (voucher.totalUsageLimit > 0 && newTotalUsage > voucher.totalUsageLimit) {
      const rollbackMulti = this.redis.multi()
      rollbackMulti.hincrby(userUsageKey, userIdStr, -1)
      rollbackMulti.decr(totalUsageKey)
      await rollbackMulti.exec()

      throw new BadRequestError('Mã giảm giá đã hết lượt sử dụng toàn hệ thống')
    }

    if (voucher.userUsageLimit > 0 && newUserUsage > voucher.userUsageLimit) {
      const rollbackMulti = this.redis.multi()
      rollbackMulti.hincrby(userUsageKey, userIdStr, -1)
      rollbackMulti.decr(totalUsageKey)
      await rollbackMulti.exec()

      throw new BadRequestError(`Bạn đã dùng hết ${voucher.userUsageLimit} lượt sử dụng mã voucher này`)
    }

    const client = prismaTx || prisma
    try {
      const updatedVoucher = await client.voucher.update({
        where: { id: voucher.id },
        data: { usedCount: { increment: 1 } },
      })

      logger.info(
        { voucherId: voucher.id, code: normalizedCode, userId, newTotalUsage, newUserUsage },
        'applyVoucherSafely: synchronized across Redis and PostgreSQL transaction successfully',
      )

      return updatedVoucher
    } catch (dbError) {
      const rollbackMulti = this.redis.multi()
      rollbackMulti.hincrby(userUsageKey, userIdStr, -1)
      rollbackMulti.decr(totalUsageKey)
      await rollbackMulti.exec()

      logger.error(
        { err: dbError, voucherId: voucher.id, code: normalizedCode, userId },
        'applyVoucherSafely: DB update failed within transaction, rolled back Redis counter',
      )

      throw dbError
    }
  }

  /**
   * =========================================================================================
   * @WARNING CONTRACT RULES: CROSS-MODULE DEFENSIVE INTERFACE FOR ORDER CANCELLATION / ROLLBACK
   * 
   *  ██╗    ██╗ █████╗ ██████╗ ███╗   ██╗██╗███╗   ██╗ ██████╗ 
   *  ██║    ██║██╔══██╗██╔══██╗████╗  ██║██║████╗  ██║██╔════╝ 
   *  ██║ █╗ ██║███████║██████╔╝██╔██╗ ██║██║██╔██╗ ██║██║  ███╗
   *  ██║███╗██║██╔══██║██╔══██╗██║╚██╗██║██║██║╚██╗██║██║   ██║
   *  ╚███╔███╔╝██║  ██║██║  ██║██║ ╚████║██║██║ ╚████║╚██████╔╝
   *   ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝╚═╝  ╚═══╝ ╚═════╝ 
   * =========================================================================================
   * GỬI TEAM CART-ORDER & PAYMENT/CHECKOUT:
   * 
   * KHI HỦY ĐƠN HÀNG (CANCEL), HOÀN TIỀN (REFUND), HOẶC CHECKOUT TRANSACTION THẤT BẠI:
   * TUYỆT ĐỐI KHÔNG TỰ Ý SỬA DB HOẶC BỎ QUA REDIS COUNTER!
   * Nếu không gọi qua Voucher Service:
   *   - Bộ đếm Redis (`voucher:used:{code}` và `voucher:users:{code}`) KHÔNG được hoàn lại.
   *   - Khách hàng bị mất vĩnh viễn lượt dùng mã dù đơn hàng đã hủy!
   *   - Hiện tại hàm `orderRepo.refundVoucherUsage()` KHÔNG TỒN TẠI trong Order Module!
   * 
   * BẮT BUỘC GỌI HÀM NÀY: `releaseVoucherSafely(voucherCode, userId, prismaTx)`
   * và truyền Prisma Transaction Client (`tx`) vào:
   *   1. Giảm bộ đếm Redis tổng và Redis per-user (`hincrby -1`, `decr`).
   *   2. Giảm `usedCount` trong bảng Voucher thông qua `prismaTx` (không âm).
   *   3. Đảm bảo toàn vẹn tính nhất quán giữa Redis và PostgreSQL.
   * =========================================================================================
   */
  async releaseVoucherSafely(voucherCode: string, userId: number, prismaTx?: any) {
    const normalizedCode = voucherCode.trim().toUpperCase()
    const voucher = await this.getVoucherMetadata(normalizedCode)
    if (!voucher) {
      logger.warn({ voucherCode: normalizedCode }, 'releaseVoucherSafely: voucher not found')
      return null
    }

    const totalUsageKey = `${VOUCHER_TOTAL_KEY_PREFIX}${normalizedCode}`
    const userUsageKey = `${VOUCHER_USAGE_KEY_PREFIX}${normalizedCode}`
    const userIdStr = userId.toString()

    try {
      const multi = this.redis.multi()
      multi.hincrby(userUsageKey, userIdStr, -1)
      multi.decr(totalUsageKey)
      await multi.exec()
    } catch (redisErr) {
      logger.error({ err: redisErr, code: normalizedCode, userId }, 'releaseVoucherSafely: redis decrement error')
    }

    const client = prismaTx || prisma
    try {
      const updated = await client.voucher.updateMany({
        where: { id: voucher.id, usedCount: { gt: 0 } },
        data: {
          usedCount: {
            decrement: 1,
          },
        },
      })
      logger.info(
        { voucherId: voucher.id, code: normalizedCode, userId },
        'releaseVoucherSafely: voucher quota released successfully',
      )
      return updated
    } catch (dbErr) {
      logger.error({ err: dbErr, voucherId: voucher.id, code: normalizedCode }, 'releaseVoucherSafely: db update error')
      throw dbErr
    }
  }
}
