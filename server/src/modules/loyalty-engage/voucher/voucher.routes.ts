// src/modules/loyalty-engage/voucher/voucher.routes.ts
import { Router } from 'express'
import { requireAuth } from '@/middlewares/guards/auth.guard'
import { requireAdmin } from '@/middlewares/guards/role.guard'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import { VoucherController } from './voucher.controller'
import {
  createVoucherBodySchema,
  listVoucherQuerySchema,
  updateVoucherBodySchema,
  validateVoucherBodySchema,
  voucherIdParamSchema,
} from './voucher.schema'
import { z } from 'zod'

export const voucherRouter = Router()
const controller = new VoucherController()

// ─── User routes đặt TRƯỚC `/:id` để tránh Express match literal paths thành params ─

/**
 * POST /vouchers/validate – Kiểm tra voucher & tính tiền giảm (User)
 * Đặt TRƯỚC POST /:id để Express không nhầm 'validate' thành một :id param
 */
voucherRouter.post(
  '/validate',
  requireAuth,
  validateRequest({ body: validateVoucherBodySchema }),
  controller.validateVoucher,
)

/** POST /vouchers/apply – Áp dụng voucher (sau khi đặt hàng) */
voucherRouter.post(
  '/apply',
  requireAuth,
  validateRequest({ body: z.object({ code: z.string().trim().min(1, 'Mã voucher là bắt buộc').toUpperCase() }) }),
  controller.applyVoucher,
)

// ─── Admin routes (yêu cầu đăng nhập + role ADMIN) ───────────────────────────

/** GET /vouchers – Danh sách tất cả voucher */
voucherRouter.get(
  '/',
  requireAuth,
  requireAdmin,
  validateRequest({ query: listVoucherQuerySchema }),
  controller.listVouchers,
)

/** POST /vouchers – Tạo voucher mới */
voucherRouter.post(
  '/',
  requireAuth,
  requireAdmin,
  validateRequest({ body: createVoucherBodySchema }),
  controller.createVoucher,
)

/** GET /vouchers/:id – Chi tiết voucher */
voucherRouter.get(
  '/:id',
  requireAuth,
  requireAdmin,
  validateRequest({ params: voucherIdParamSchema }),
  controller.getVoucherById,
)

/** PATCH /vouchers/:id – Cập nhật voucher */
voucherRouter.patch(
  '/:id',
  requireAuth,
  requireAdmin,
  validateRequest({ params: voucherIdParamSchema, body: updateVoucherBodySchema }),
  controller.updateVoucher,
)

/** DELETE /vouchers/:id – Xoá mềm voucher */
voucherRouter.delete(
  '/:id',
  requireAuth,
  requireAdmin,
  validateRequest({ params: voucherIdParamSchema }),
  controller.deleteVoucher,
)
