import { Router } from 'express'
import { PaymentController } from './payment.controller'
import { authGuard } from '@/middlewares/guards/auth.guard'
import { roleGuard } from '@/middlewares/guards/role.guard'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import { getAllPaymentsQuerySchema, paymentIdParamsSchema, createPaymentSchema } from './payment.schema'
import express from 'express'

export const paymentRouter = Router()
const controller = new PaymentController()


export const sepayWebhookRouter = Router()
sepayWebhookRouter.post(
  '/sebay',
  express.raw({ type: 'application/json' }),
  controller.sepay,
)

// Toàn bộ API thanh toán bắt buộc đăng nhập và yêu cầu quyền ADMIN
paymentRouter.use(authGuard)

paymentRouter.post('/', validateRequest({ body: createPaymentSchema }), controller.create)
paymentRouter.get('/', roleGuard('ADMIN'), validateRequest({ query: getAllPaymentsQuerySchema }), controller.findAll)
paymentRouter.get('/:paymentId', roleGuard('ADMIN'), validateRequest({ params: paymentIdParamsSchema }), controller.findById)
