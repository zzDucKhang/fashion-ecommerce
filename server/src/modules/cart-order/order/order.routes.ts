import { Router } from 'express'
import { OrderController } from './order.controller'
export const orderRouter = Router()
const controller = new OrderController()

orderRouter.get('/', controller.list)
orderRouter.get('/:orderId', controller.findById)
orderRouter.post('/', controller.create)
orderRouter.post('/:orderId/cancel', controller.cancel)
orderRouter.patch('/:orderId/status', controller.updateStatus)
