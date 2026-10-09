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

export const voucherRouter = Router()
const controller = new VoucherController()

voucherRouter.post(
  '/validate',
  requireAuth,
  validateRequest({ body: validateVoucherBodySchema }),
  controller.validateVoucher,
)

voucherRouter.post(
  '/apply',
  requireAuth,
  requireAdmin,
  controller.applyVoucher,
)

voucherRouter.get(
  '/',
  requireAuth,
  requireAdmin,
  validateRequest({ query: listVoucherQuerySchema }),
  controller.listVouchers,
)

voucherRouter.post(
  '/',
  requireAuth,
  requireAdmin,
  validateRequest({ body: createVoucherBodySchema }),
  controller.createVoucher,
)

voucherRouter.get(
  '/:id',
  requireAuth,
  requireAdmin,
  validateRequest({ params: voucherIdParamSchema }),
  controller.getVoucherById,
)

voucherRouter.patch(
  '/:id',
  requireAuth,
  requireAdmin,
  validateRequest({ params: voucherIdParamSchema, body: updateVoucherBodySchema }),
  controller.updateVoucher,
)

voucherRouter.delete(
  '/:id',
  requireAuth,
  requireAdmin,
  validateRequest({ params: voucherIdParamSchema }),
  controller.deleteVoucher,
)
