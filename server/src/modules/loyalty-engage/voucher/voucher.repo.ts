// src/modules/loyalty-engage/voucher/voucher.repo.ts
import { prisma } from '@/database/prisma'
import { CreateVoucherBodyType, UpdateVoucherBodyType } from './voucher.schema'

export class VoucherRepo {
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
    return prisma.voucher.findFirst({ where: { code, deletedAt: null } })
  }

  /**
   * FIX 2.3: Tìm voucher theo code kể cả đã xóa mềm.
   * Dùng để kiểm tra trùng code trước khi tạo/sửa, ngăn lỗi P2002 Unique Constraint.
   */
  async findByCodeIncludingDeleted(code: string) {
    return prisma.voucher.findFirst({ where: { code } })
  }

  /**
   * FIX 2.1: Đếm số lần user đã sử dụng mã voucher này trong bảng Order (voucherCode).
   * Dùng để enforce userUsageLimit.
   */
  async countUserVoucherUsage(userId: number, voucherCode: string): Promise<number> {
    return prisma.order.count({
      where: { userId, voucherCode, deletedAt: null },
    })
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

  /** Cập nhật voucher */
  async update(id: number, data: UpdateVoucherBodyType) {
    return prisma.voucher.update({
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
  }

  /** Soft-delete voucher */
  async softDelete(id: number) {
    return prisma.voucher.update({ where: { id }, data: { deletedAt: new Date() } })
  }

  /** Tăng số lần đã sử dụng */
  async incrementUsedCount(id: number) {
    return prisma.voucher.update({ where: { id }, data: { usedCount: { increment: 1 } } })
  }
}
