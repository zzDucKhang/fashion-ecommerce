import { createServer } from 'http'
import { createApp } from './app'
import { envConfig } from './config/env.config'
import { prisma } from './database/prisma'
import { redisClient } from './database/redis'

async function bootstrap() {
  const app = createApp()
  const httpServer = createServer(app)

  // Kết nối Socket.io ở đây nếu có (socket.server.ts)

  const server = httpServer.listen(envConfig.PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${envConfig.PORT}`)
  })

  // Xử lý Graceful Shutdown
  const handleShutdown = async (signal: string) => {
    console.log(`\nNhận tín hiệu ${signal}. Đang đóng server...`)
    
    server.close(async () => {
      console.log('HTTP Server đã đóng.')
      await prisma.$disconnect()
      console.log('Prisma đã ngắt kết nối.')
      redisClient.disconnect()
      console.log('Redis đã ngắt kết nối.')
      process.exit(0)
    })
  }

  process.on('SIGINT', () => handleShutdown('SIGINT'))
  process.on('SIGTERM', () => handleShutdown('SIGTERM'))
}

bootstrap().catch((err) => {
  console.error('Không thể khởi động ứng dụng:', err)
  process.exit(1)
})