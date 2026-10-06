import { Router } from 'express'
import { FlashSaleController } from './flash-sale.controller'
import { authGuard } from '@/middlewares/guards/auth.guard'
import { requireAdmin } from '@/middlewares/guards/role.guard'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import {
  createFlashSaleBodySchema,
  getFlashSaleParamsSchema,
  getFlashSaleQuerySchema,
  updateFlashSaleBodySchema,
} from './flash-sale.schema'

export const flashSaleRouter = Router()
const controller = new FlashSaleController()

// Public routes (Khách hàng & người dùng có thể xem chiến dịch đang mở và danh sách)
flashSaleRouter.get('/active', controller.findActive)
flashSaleRouter.get(
  '/',
  validateRequest({ query: getFlashSaleQuerySchema }),
  controller.list,
)
flashSaleRouter.get(
  '/:campaignId',
  validateRequest({ params: getFlashSaleParamsSchema }),
  controller.findById,
)

// Admin routes (Bắt buộc phải đăng nhập và có quyền ADMIN mới được tạo/sửa/xoá)
flashSaleRouter.post(
  '/',
  authGuard,
  requireAdmin,
  validateRequest({ body: createFlashSaleBodySchema }),
  controller.create,
)

flashSaleRouter.put(
  '/:campaignId',
  authGuard,
  requireAdmin,
  validateRequest({
    params: getFlashSaleParamsSchema,
    body: updateFlashSaleBodySchema,
  }),
  controller.update,
)

flashSaleRouter.delete(
  '/:campaignId',
  authGuard,
  requireAdmin,
  validateRequest({ params: getFlashSaleParamsSchema }),
  controller.delete,
)