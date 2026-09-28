import Redis from 'ioredis'
import { default as Redlock } from 'redlock'
import { envConfig } from '@/config/env.config'

export const redisClient = new Redis(envConfig.REDIS_URL, {
  maxRetriesPerRequest: null, // Bắt buộc cho BullMQ
})

redisClient.on('connect', () => {
  console.log('✅ Kết nối Redis thành công')
})

redisClient.on('error', (err) => {
  console.error('❌ Lỗi kết nối Redis:', err)
})

export const redlock = new Redlock([redisClient], {
  driftFactor: 0.01,
  retryCount: 3,
  retryDelay: 200,
  retryJitter: 200,
  automaticExtensionThreshold: 500,
})