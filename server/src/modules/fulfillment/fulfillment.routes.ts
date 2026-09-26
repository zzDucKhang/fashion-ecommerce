import { Router } from 'express'
import { shipmentRouter } from './shipment/shipment.routes'
import { paymentRouter } from './payment/payment.routes'
import { returnRouter } from './return/return.routes'

export const fulfillmentRouter = Router()

fulfillmentRouter.use('/shipments', shipmentRouter)
fulfillmentRouter.use('/payments', paymentRouter)
fulfillmentRouter.use('/returns', returnRouter)
