// src/modules/loyalty-engage/voucher/voucher.service.ts
import { BadRequestError, ConflictError, NotFoundError } from '@/common/errors'
import { VoucherRepo } from './voucher.repo'
import {
  CreateVoucherBodyType,
  ListVoucherQueryType,
  UpdateVoucherBodyType,
  ValidateVoucherBodyType,
} from './voucher.schema'

export class VoucherService {
  constructor(private voucherRepo = new VoucherRepo()) {}

  // ─────────────────── Admin APIs ───────────────────

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
   * FIX 2.3: Kiểm tra trùng mã kể cả voucher đã xóa mềm (deletedAt != null)
   * để tránh lỗi P2002 Unique Constraint từ Postgres.
   */
  async createVoucher(body: CreateVoucherBodyType) {
    const anyExisting = await this.voucherRepo.findByCodeIncludingDeleted(body.code)
    if (anyExisting) {
      if (anyExisting.deletedAt) {
        // Mã từng tồn tại nhưng đã xóa mềm → thông báo rõ
        throw new ConflictError(
          `Mã voucher "${body.code}" đã từng tồn tại trong hệ thống (đã xóa). Vui lòng dùng mã khác.`,
        )
      }
      throw new ConflictError(`Mã voucher "${body.code}" đã tồn tại`)
    }

    const voucher = await this.voucherRepo.create(body)
    return { message: 'Tạo voucher thành công', data: voucher }
  }

  /**
   * Admin cập nhật voucher.
   * FIX 2.3: Kiểm tra trùng mã kể cả voucher đã xóa mềm khi đổi code.
   */
  async updateVoucher(id: number, body: UpdateVoucherBodyType) {
    const voucher = await this.voucherRepo.findById(id)
    if (!voucher) throw new NotFoundError('Voucher không tồn tại')

    // Nếu thay đổi code, kiểm tra trùng với voucher khác (kể cả đã xóa mềm)
    if (body.code && body.code !== voucher.code) {
      const duplicate = await this.voucherRepo.findByCodeIncludingDeleted(body.code)
      if (duplicate) {
        if (duplicate.deletedAt) {
          throw new ConflictError(
            `Mã voucher "${body.code}" đã từng tồn tại trong hệ thống (đã xóa). Vui lòng dùng mã khác.`,
          )
        }
        throw new ConflictError(`Mã voucher "${body.code}" đã tồn tại`)
      }
    }

    const updated = await this.voucherRepo.update(id, body)
    return { message: 'Cập nhật voucher thành công', data: updated }
  }

  /** Admin xoá mềm voucher */
  async deleteVoucher(id: number) {
    const voucher = await this.voucherRepo.findById(id)
    if (!voucher) throw new NotFoundError('Voucher không tồn tại')

    await this.voucherRepo.softDelete(id)
    return { message: 'Xoá voucher thành công' }
  }

  // ─────────────────── User APIs ───────────────────

  /**
   * User kiểm tra & tính toán số tiền được giảm từ voucher.
   * Các điều kiện kiểm tra:
   *  1. Voucher tồn tại và chưa bị xoá
   *  2. Voucher đang active
   *  3. Trong hạn sử dụng
   *  4. Chưa hết lượt dùng tổng (totalUsageLimit = 0 nghĩa là không giới hạn)
   *  5. Tổng đơn hàng >= minOrderValue
   *  6. FIX 2.1: User chưa dùng vượt quá userUsageLimit lần
   */
  async validateAndCalculate(body: ValidateVoucherBodyType, userId: number) {
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

    const minOrderValue = Number(voucher.minOrderValue)
    if (body.orderTotal < minOrderValue) {
      throw new BadRequestError(
        `Đơn hàng tối thiểu ${minOrderValue.toLocaleString('vi-VN')} VNĐ để áp dụng voucher này`,
      )
    }

    // FIX 2.1: Kiểm tra giới hạn sử dụng theo từng user (userUsageLimit)
    if (voucher.userUsageLimit > 0) {
      const userUsageCount = await this.voucherRepo.countUserVoucherUsage(userId, voucher.code)
      if (userUsageCount >= voucher.userUsageLimit) {
        throw new BadRequestError(
          `Bạn đã sử dụng mã voucher này ${userUsageCount} lần (tối đa ${voucher.userUsageLimit} lần/người)`,
        )
      }
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

    // Không giảm vượt quá tổng đơn
    discountAmount = Math.min(discountAmount, body.orderTotal)

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

  /** Tăng usedCount sau khi voucher được áp dụng vào đơn hàng (gọi nội bộ từ OrderService) */
  async applyVoucher(code: string) {
    const voucher = await this.voucherRepo.findByCode(code)
    if (!voucher) throw new NotFoundError('Voucher không tồn tại')
    await this.voucherRepo.incrementUsedCount(voucher.id)
    return { message: 'Đã áp dụng voucher thành công' }
  }
}
