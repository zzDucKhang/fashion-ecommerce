import { Router } from 'express'
import { PaymentController } from './payment.controller'
import { authGuard } from '@/middlewares/guards/auth.guard'
import { roleGuard } from '@/middlewares/guards/role.guard'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import { getAllPaymentsQuerySchema, paymentIdParamsSchema } from './payment.schema'

export const paymentRouter = Router()
const controller = new PaymentController()

// Toàn bộ API thanh toán bắt buộc đăng nhập và yêu cầu quyền ADMIN
paymentRouter.use(authGuard, roleGuard('ADMIN'))

paymentRouter.get('/', validateRequest({ query: getAllPaymentsQuerySchema }), controller.findAll)
paymentRouter.get('/:paymentId', validateRequest({ params: paymentIdParamsSchema }), controller.findById)