import { Router } from 'express'
import { ShipmentController } from './shipment.controller'

export const shipmentRouter = Router()
const controller = new ShipmentController()

shipmentRouter.get('/', controller.findAll)
shipmentRouter.get('/by-order/:orderId', controller.findByOrderId)
shipmentRouter.get('/:shipmentId', controller.findById)
shipmentRouter.post('/', controller.create)
shipmentRouter.put('/:shipmentId', controller.update)
shipmentRouter.delete('/:shipmentId', controller.delete)
