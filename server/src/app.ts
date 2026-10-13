import express, { Express } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import pinoHttp from 'pino-http'
import { errorFilter } from '@/middlewares/filters/error.filter'

// Import 6 router tổng của 6 phân hệ
import { identityRouter } from '@/modules/identity/identity.routes'
import { catalogRouter } from '@/modules/catalog/catalog.routes'
import { cartOrderRouter } from '@/modules/cart-order/cart-order.routes'
import { inventorySaleRouter } from '@/modules/inventory-sale/inventory-sale.routes'
import { fulfillmentRouter } from '@/modules/fulfillment/fulfillment.routes'
import { loyaltyEngageRouter } from '@/modules/loyalty-engage/loyalty-engage.routes'
import { sepayWebhookRouter } from '@/modules/fulfillment/payment/payment.routes'
import { uploadRouter } from './modules/upload/upload.routes'

export const createApp = (): Express => {
  const app = express()

  app.use(helmet())
  app.use(cors())

  // QUAN TRONG QUAN TRONG QUAN TRONG. 
  // SePay webhook khong dung express.json()
  app.use('/api/v1/fulfillment/payments/webhook', sepayWebhookRouter)

  app.use(express.json({ limit: '10mb' }))
  app.use(express.urlencoded({ extended: true }))
  app.use(pinoHttp({ autoLogging: false }))

  // Health check
  app.get('/health', (_, res) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime() })
  })

  // Đăng ký 6 Route tổng
  app.use('/api/v1/identity', identityRouter)
  app.use('/api/v1/catalog', catalogRouter)
  app.use('/api/v1/cart-order', cartOrderRouter)
  app.use('/api/v1/inventory-sale', inventorySaleRouter)
  app.use('/api/v1/fulfillment', fulfillmentRouter)
  app.use('/api/v1/loyalty-engage', loyaltyEngageRouter)
  app.use('/api/v1/common/upload', uploadRouter)

  // Global Error Handler
  app.use(errorFilter)

  return app
}