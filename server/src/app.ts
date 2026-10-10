import express, { Express } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import pinoHttp from 'pino-http'
import crypto from 'node:crypto'
import { errorFilter } from '@/middlewares/filters/error.filter'
import { envConfig } from '@/config/env.config'
import { logger } from '@/common/logger'

// Import 6 router tổng của 6 phân hệ
import { identityRouter } from '@/modules/identity/identity.routes'
import { catalogRouter } from '@/modules/catalog/catalog.routes'
import { cartOrderRouter } from '@/modules/cart-order/cart-order.routes'
import { inventorySaleRouter } from '@/modules/inventory-sale/inventory-sale.routes'
import { fulfillmentRouter } from '@/modules/fulfillment/fulfillment.routes'
import { loyaltyEngageRouter } from '@/modules/loyalty-engage/loyalty-engage.routes'
import { sepayWebhookRouter } from '@/modules/fulfillment/payment/payment.routes'

export const createApp = (): Express => {
  const app = express()

  app.use(helmet())
  app.use(
    cors({
      origin: envConfig.CORS_ORIGIN || 'http://localhost:3000',
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'x-session-id'],
    })
  )

  // QUAN TRONG QUAN TRONG QUAN TRONG. 
  // SePay webhook khong dung express.json()
  app.use('/api/v1/fulfillment/payments/webhook', sepayWebhookRouter)

  app.use(express.json({ limit: '10mb' }))
  app.use(express.urlencoded({ extended: true }))
  app.use(pinoHttp({
    logger,
    genReqId: function (req, res) {
      const existingID = req.id ?? req.headers['x-trace-id']
      if (existingID) return existingID
      const id = crypto.randomUUID()
      res.setHeader('x-trace-id', id)
      return id
    },
    customProps: function (req, res) {
      return {
        traceId: req.id,
      }
    },
    autoLogging: false,
  }))

  // Health check
  app.get('/health', (_, res) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime() })
  })

  // Middleware bảo vệ cho AI Agents
  const { idempotencyMiddleware } = require('@/middlewares/idempotency.middleware')
  app.use(idempotencyMiddleware())

  // Đăng ký 6 Route tổng
  app.use('/api/v1/identity', identityRouter)
  app.use('/api/v1/catalog', catalogRouter)
  app.use('/api/v1/cart-order', cartOrderRouter)
  app.use('/api/v1/inventory-sale', inventorySaleRouter)
  app.use('/api/v1/fulfillment', fulfillmentRouter)
  app.use('/api/v1/loyalty-engage', loyaltyEngageRouter)

  // Global Error Handler
  app.use(errorFilter)

  return app
}