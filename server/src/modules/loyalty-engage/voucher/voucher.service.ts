// src/modules/loyalty-engage/voucher/voucher.service.ts
import { Prisma } from '@prisma/client'
import { BadRequestError, ConflictError, NotFoundError, isUniqueConstraintPrismaError } from '@/common/errors'
import { createLogger } from '@/common/logger'
import { VoucherRepo, VoucherFailureReason } from './voucher.repo'
import {
  CreateVoucherBodyType,
  ListVoucherQueryType,
  UpdateVoucherBodyType,
  ValidateVoucherBodyType,
} from './voucher.schema'

const logger = createLogger('VoucherService')

export class VoucherService {
  constructor(private voucherRepo = new VoucherRepo()) {}

  // ─────────────── Admin APIs ───────────────

  /** Lấy danh sách voucher */
  async listVouchers(query: ListVoucherQueryType) {
    const { page, limit, isActive } = query
    const skip = (page - 1) * limit
    const { data, total } = await this.voucherRepo.findAll(skip, limit, isActive)
    return {
      data,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    }
  }

  /** Lấy chi tiết một voucher */
  async getVoucherById(id: number) {
    const voucher = await this.voucherRepo.findById(id)
    if (!voucher) throw new NotFoundError('Voucher không tồn tại')
    return { data: voucher }
  }

  /**
   * Admin tạo voucher mới.
   * Ngăn chặn trùng lặp code bằng cách bắt lỗi P2002 Unique Constraint từ PostgreSQL.
   */
  async createVoucher(body: CreateVoucherBodyType) {
    logger.info({ code: body.code }, 'createVoucher: initiated')

    try {
      const voucher = await this.voucherRepo.create(body)
      logger.info({ voucherId: voucher.id, code: body.code }, 'createVoucher: created successfully')
      return { message: 'Tạo voucher thành công', data: voucher }
    } catch (error: any) {
      if (isUniqueConstraintPrismaError(error)) {
        logger.warn({ code: body.code }, 'createVoucher: code collision detected')
        throw new ConflictError(`Mã voucher "${body.code}" đã tồn tại trong hệ thống`)
      }
      throw error
    }
  }

  /**
   * Admin cập nhật voucher.
   */
  async updateVoucher(id: number, body: UpdateVoucherBodyType) {
    const voucher = await this.voucherRepo.findById(id)
    if (!voucher) throw new NotFoundError('Voucher không tồn tại')

    try {
      const updated = await this.voucherRepo.update(id, body)
      logger.info({ voucherId: id }, 'updateVoucher: updated successfully')
      return { message: 'Cập nhật voucher thành công', data: updated }
    } catch (error: any) {
      if (isUniqueConstraintPrismaError(error)) {
        logger.warn({ voucherId: id, code: body.code }, 'updateVoucher: duplicate code')
        throw new ConflictError(`Mã voucher "${body.code}" đã tồn tại trong hệ thống`)
      }
      throw error
    }
  }

  /** Admin xoá mềm voucher */
  async deleteVoucher(id: number) {
    const voucher = await this.voucherRepo.findById(id)
    if (!voucher) throw new NotFoundError('Voucher không tồn tại')

    await this.voucherRepo.softDelete(id)
    logger.info({ voucherId: id }, 'deleteVoucher: soft-deleted')

    return { message: 'Xoá voucher thành công' }
  }

  // ─────────────── User APIs ───────────────

  /**
   * User kiểm tra & tính toán số tiền được giảm từ voucher (Read-only UI preview).
   *
   * Race-free validation:
   *   - Read-only preview for the cart/checkout UI.
   *   - Enforces business rules: dates, minimum order value, global usage limit, and user usage limit.
   *   - Actual transactional enforcement is handled in `applyVoucher` with Redis atomic counters.
   */
  async validateAndCalculate(body: ValidateVoucherBodyType, userId: number) {
    logger.info({ code: body.code, userId, orderTotal: body.orderTotal }, 'validateAndCalculate: initiated')

    const voucher = await this.voucherRepo.findByCode(body.code)
    if (!voucher) throw new NotFoundError('Mã voucher không hợp lệ hoặc không tồn tại')
    if (!voucher.isActive) throw new BadRequestError('Voucher đã bị vô hiệu hóa')

    const now = new Date()
    if (now < voucher.startDate) {
      throw new BadRequestError(
        `Voucher chưa có hiệu lực. Hiệu lực từ ${voucher.startDate.toLocaleDateString('vi-VN')}`,
      )
    }
    if (now > voucher.endDate) {
      throw new BadRequestError('Voucher đã hết hạn sử dụng')
    }

    if (voucher.totalUsageLimit > 0 && voucher.usedCount >= voucher.totalUsageLimit) {
      throw new BadRequestError('Voucher đã hết lượt sử dụng')
    }

    // Kiểm tra giới hạn sử dụng theo từng user (userUsageLimit)
    if (voucher.userUsageLimit > 0) {
      const userUsageCount = await this.voucherRepo.countUserVoucherUsage(userId, voucher.code)
      if (userUsageCount >= voucher.userUsageLimit) {
        throw new BadRequestError(
          `Bạn đã sử dụng mã voucher này ${userUsageCount} lần (tối đa ${voucher.userUsageLimit} lần/người)`,
        )
      }
    }

    const minOrderValue = Number(voucher.minOrderValue)
    if (body.orderTotal < minOrderValue) {
      throw new BadRequestError(
        `Đơn hàng tối thiểu ${minOrderValue.toLocaleString('vi-VN')} VNĐ để áp dụng voucher này`,
      )
    }

    // Tính số tiền giảm
    let discountAmount: number
    if (voucher.discountType === 'PERCENTAGE') {
      discountAmount = (body.orderTotal * Number(voucher.discountValue)) / 100
      if (voucher.maxDiscountAmt) {
        discountAmount = Math.min(discountAmount, Number(voucher.maxDiscountAmt))
      }
    } else {
      discountAmount = Number(voucher.discountValue)
    }

    discountAmount = Math.min(discountAmount, body.orderTotal)

    logger.info(
      { code: body.code, userId, discountAmount: Math.round(discountAmount) },
      'validateAndCalculate: voucher valid',
    )

    return {
      message: 'Voucher hợp lệ',
      data: {
        code: voucher.code,
        discountType: voucher.discountType,
        discountAmount: Math.round(discountAmount),
        finalTotal: Math.round(body.orderTotal - discountAmount),
        voucher,
      },
    }
  }

  /**
   * Áp dụng voucher và tăng usedCount với High-Concurrency Redis Atomic Counters.
   *
   * HIGH-CONCURRENCY RACE-CONDITION FIX:
   *   - Delegates directly to `voucherRepo.atomicApplyVoucher`, which executes Redis atomic multi/exec
   *     and strictly validates both `totalUsageLimit` and `userUsageLimit`.
   *   - Eliminates `SELECT ... FOR UPDATE` row locks, preventing DB connection pool exhaustion.
   *   - Translates failure reasons to appropriate HTTP status codes.
   */
  async applyVoucher(code: string, userId: number) {
    logger.info({ code, userId }, 'applyVoucher: initiating atomic voucher application')

    // Direct atomic delegation — no manual existence pre-check in service layer
    const result = await this.voucherRepo.atomicApplyVoucher(code, userId)

    if (!result.success) {
      logger.warn({ code, userId, reason: result.reason }, 'applyVoucher: atomic application rejected')

      const errorMap: Record<VoucherFailureReason, () => never> = {
        VOUCHER_NOT_FOUND: () => {
          throw new NotFoundError('Voucher không tồn tại')
        },
        VOUCHER_INACTIVE: () => {
          throw new BadRequestError('Voucher đã bị vô hiệu hóa')
        },
        VOUCHER_NOT_STARTED: () => {
          throw new BadRequestError('Voucher chưa có hiệu lực')
        },
        VOUCHER_EXPIRED: () => {
          throw new BadRequestError('Voucher đã hết hạn sử dụng')
        },
        VOUCHER_USAGE_LIMIT_REACHED: () => {
          throw new BadRequestError('Voucher đã hết lượt sử dụng')
        },
        USER_USAGE_LIMIT_REACHED: () => {
          throw new BadRequestError('Bạn đã dùng hết lượt sử dụng voucher này')
        },
      }

      const handler = errorMap[result.reason]
      if (handler) {
        handler()
      }

      throw new BadRequestError('Không thể áp dụng voucher')
    }

    logger.info({ code, userId, voucherId: result.voucherId }, 'applyVoucher: atomic apply succeeded')

    return { message: 'Đã áp dụng voucher thành công' }
  }
}
