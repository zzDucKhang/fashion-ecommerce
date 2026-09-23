import express, { Express } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import pinoHttp from 'pino-http'
import { errorFilter } from '@/middlewares/filters/error.filter'

export const createApp = (): Express => {
  const app = express()

  // 1. Security & Common Middlewares
  app.use(helmet())
  app.use(cors())
  app.use(express.json({ limit: '10mb' }))
  app.use(express.urlencoded({ extended: true }))
  app.use(pinoHttp())

  // 2. Health check route
  app.get('/health', (_, res) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime() })
  })

  // 3. Mount module routes ở đây (Thành viên sẽ đăng ký router vào đây)
  // app.use('/api/v1/auth', authRouter)
  // app.use('/api/v1/products', productRouter)

  // 4. Global Exception Handler (Luôn đặt ở cuối cùng)
  app.use(errorFilter)

  return app
}