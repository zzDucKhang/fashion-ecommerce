import { Router } from 'express'
import { OrderController } from './order.controller'
import { requireAuth } from '@/middlewares/guards/auth.guard'
import { requireAdmin } from '@/middlewares/guards/role.guard'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import { createOrderSchema, listOrderSchema, updateOrderStatusSchema } from './order.schema'
import { z } from 'zod'

const orderIdParamSchema = z.object({
  orderId: z.coerce.number().int().positive('orderId phải là số nguyên dương'),
})

export const orderRouter = Router()
const controller = new OrderController()

orderRouter.use(requireAuth)

orderRouter.get('/', validateRequest({ query: listOrderSchema }), controller.list)
orderRouter.post('/', validateRequest({ body: createOrderSchema }), controller.create)
orderRouter.get('/:orderId', validateRequest({ params: orderIdParamSchema }), controller.findById)
orderRouter.post('/:orderId/cancel', validateRequest({ params: orderIdParamSchema }), controller.cancel)

// Chỉ ADMIN mới có quyền đổi trạng thái đơn
orderRouter.patch(
  '/:orderId/status',
  requireAdmin,
  validateRequest({ params: orderIdParamSchema, body: updateOrderStatusSchema }),
  controller.updateStatus,
)