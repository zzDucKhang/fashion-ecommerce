// src/modules/loyalty-engage/voucher/voucher.repo.ts
import Redis from 'ioredis'
import { prisma } from '@/database/prisma'
import { redisClient } from '@/database/redis'
import { createLogger } from '@/common/logger'
import { CreateVoucherBodyType, UpdateVoucherBodyType } from './voucher.schema'

const logger = createLogger('VoucherRepo')

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
const VOUCHER_META_CACHE_TTL_SECONDS = 30 // Cache metadata 30s to withstand 10k+ req/sec flash sales

export class VoucherRepo {
  /**
   * Injectable Redis client instance (defaults to global redisClient).
   */
  constructor(private readonly redis: Redis = redisClient) {}

  /** Lấy danh sách voucher (phân trang, lọc trạng thái) */
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

  /** Tìm voucher theo id */
  async findById(id: number) {
    return prisma.voucher.findFirst({ where: { id, deletedAt: null } })
  }

  /** Tìm voucher theo code (không phân biệt hoa thường, đã uppercase ở schema) */
  async findByCode(code: string) {
    const normalized = code.trim().toUpperCase()
    return prisma.voucher.findFirst({ where: { code: normalized, deletedAt: null } })
  }

  /**
   * Tìm voucher theo code kể cả đã xóa mềm.
   * Dùng để kiểm tra trùng code trước khi tạo/sửa, ngăn lỗi P2002 Unique Constraint.
   */
  async findByCodeIncludingDeleted(code: string) {
    const normalized = code.trim().toUpperCase()
    return prisma.voucher.findFirst({ where: { code: normalized } })
  }

  /**
   * Đếm số lần user đã sử dụng mã voucher này.
   * Ưu tiên đọc từ Redis Hash `voucher:usage:{code}`, fallback về bảng Order trong PostgreSQL.
   */
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

  /**
   * Lấy metadata voucher được cache trong Redis để chịu tải 10k+ req/sec.
   */
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

  /**
   * Xoá cache metadata voucher khỏi Redis khi Admin cập nhật hoặc xoá.
   */
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

  /** Tạo voucher mới */
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

  /** Cập nhật voucher và xóa cache Redis */
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

  /** Soft-delete voucher và xóa cache Redis */
  async softDelete(id: number) {
    const deleted = await prisma.voucher.update({ where: { id }, data: { deletedAt: new Date() } })
    await this.invalidateVoucherCache(deleted.code)
    return deleted
  }

  /**
   * Áp dụng voucher nguyên tử chịu tải cao (High Concurrency 10k+ req/sec).
   *
   * HIGH-CONCURRENCY ARCHITECTURE:
   *   1. LOẠI BỎ TOÀN BỘ `SELECT ... FOR UPDATE` row-level lock trên PostgreSQL:
   *      Ngăn chặn triệt để tình trạng lock contention, table bloat và cạn kiệt connection pool.
   *   2. Atomic Counters trên Redis:
   *      - Tracking tổng lượt dùng toàn hệ thống qua Redis String: `INCR voucher:total:{code}`
   *      - Tracking lượt dùng theo từng user qua Redis Hash: `HINCRBY voucher:usage:{code} {userId} 1`
   *      - Thực thi nguyên tử bằng `ioredis` multi/exec pipeline.
   *   3. Strict Limit Enforcement:
   *      - Kiểm tra cả `totalUsageLimit` (toàn cục) và `userUsageLimit` (theo từng user).
   *      - Nếu bất kỳ giới hạn nào bị vượt quá, lập tức rollback nguyên tử bằng decrement (`hincrby -1` & `decr`)
   *        và trả về mã lỗi thích hợp (`VOUCHER_USAGE_LIMIT_REACHED` hoặc `USER_USAGE_LIMIT_REACHED`).
   *   4. Eventual Consistency fallback:
   *      - Sau khi atomic check trên Redis vượt qua an toàn, ghi nhận vào PostgreSQL bằng `prisma.voucher.update`
   *        không khoá hàng (non-blocking atomic increment).
   *
   * @param code - Voucher code to apply
   * @param userId - ID of the user applying the voucher
   */
  async atomicApplyVoucher(
    code: string,
    userId: number,
  ): Promise<AtomicApplyVoucherResult> {
    const normalizedCode = code.trim().toUpperCase()
    logger.info(
      { code: normalizedCode, userId },
      'atomicApplyVoucher: initiating high-concurrency voucher application',
    )

    // Bước 1: Lấy metadata voucher (có cache Redis 30s để chịu tải 10k+ req/s)
    const voucher = await this.getVoucherMetadata(normalizedCode)

    if (!voucher) {
      logger.warn({ code: normalizedCode, userId }, 'atomicApplyVoucher: voucher not found')
      return { success: false, reason: 'VOUCHER_NOT_FOUND' }
    }

    // Bước 2: Kiểm tra trạng thái hoạt động & thời gian hiệu lực
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

    // Tính toán TTL cho Redis keys (hạn voucher + 24h buffer, tối thiểu 3600s)
    const ttlSeconds = Math.max(
      Math.ceil((endDate.getTime() - now.getTime()) / 1000) + 86400,
      3600,
    )

    const totalUsageKey = `${VOUCHER_TOTAL_KEY_PREFIX}${normalizedCode}`
    const userUsageKey = `${VOUCHER_USAGE_KEY_PREFIX}${normalizedCode}`
    const userIdStr = userId.toString()

    // Bước 3: Cold-start Seed (nếu Redis chưa có dữ liệu, seed an toàn không ghi đè với NX)
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
          const priorUsage = await prisma.order.count({
            where: { userId, voucherCode: normalizedCode, deletedAt: null },
          })
          await this.redis.hsetnx(userUsageKey, userIdStr, priorUsage.toString())
          await this.redis.expire(userUsageKey, ttlSeconds)
        }
      }
    } catch (seedErr) {
      logger.warn(
        { code: normalizedCode, userId, err: seedErr },
        'atomicApplyVoucher: Redis cold-start seed warning (proceeding to atomic phase)',
      )
    }

    // Bước 4: Nguyên tử tăng bộ đếm trên Redis bằng multi/exec pipeline
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

    // Bước 5: Kiểm tra Total Usage Limit toàn cục
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

    // Bước 6: Kiểm tra User Usage Limit theo từng user
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

    // Bước 7: Cập nhật PostgreSQL usedCount (Eventual Consistency fallback)
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

      // Compensating transaction: hoàn trả bộ đếm Redis khi DB ghi nhận thất bại
      const rollbackMulti = this.redis.multi()
      rollbackMulti.hincrby(userUsageKey, userIdStr, -1)
      rollbackMulti.decr(totalUsageKey)
      await rollbackMulti.exec()

      throw dbError
    }
  }

  /**
   * Hoàn trả lượt voucher khi huỷ đơn hàng hoặc thanh toán thất bại (Compensating Transaction).
   */
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
}
