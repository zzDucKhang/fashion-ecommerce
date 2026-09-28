import { Router } from 'express'
import { PaymentController } from './payment.controller'

export const paymentRouter = Router()
const controller = new PaymentController()

paymentRouter.get('/', controller.findAll)
paymentRouter.get('/:paymentId', controller.findById)
