import Redis from 'ioredis'
import { envConfig } from '@/config/env.config'
import { logger } from '@/common/logger'

class CacheService {
  private client: Redis | null = null

  constructor() {
    this.init()
  }

  private init() {
    try {
      this.client = new Redis(envConfig.REDIS_URL, {
        maxRetriesPerRequest: 3,
        enableReadyCheck: false,
        retryStrategy(times) {
          if (times > 5) {
            logger.error('Redis connection retries exhausted.')
            return null
          }
          return Math.min(times * 100, 3000)
        },
      })

      this.client.on('error', (err) => {
        logger.error({ err }, 'Redis Client Error')
      })

      this.client.on('connect', () => {
        logger.info('✅ Redis Connected')
      })
    } catch (error) {
      logger.error({ error }, 'Failed to initialize Redis')
    }
  }

  /**
   * Set cache with TTL (Time To Live in seconds)
   */
  async set(key: string, value: any, ttlSeconds = 3600): Promise<void> {
    if (!this.client) return
    try {
      const payload = JSON.stringify(value)
      await this.client.set(key, payload, 'EX', ttlSeconds)
    } catch (err) {
      logger.error({ err, key }, 'Redis SET error')
    }
  }

  /**
   * Get cached object
   */
  async get<T>(key: string): Promise<T | null> {
    if (!this.client) return null
    try {
      const data = await this.client.get(key)
      if (!data) return null
      return JSON.parse(data) as T
    } catch (err) {
      logger.error({ err, key }, 'Redis GET error')
      return null
    }
  }

  /**
   * Invalidate specific key(s)
   */
  async invalidate(pattern: string): Promise<void> {
    if (!this.client) return
    try {
      if (pattern.includes('*')) {
        let cursor = '0'
        do {
          const res = await this.client.scan(cursor, 'MATCH', pattern, 'COUNT', 100)
          cursor = res[0]
          if (res[1].length > 0) {
            await this.client.del(...res[1])
          }
        } while (cursor !== '0')
      } else {
        await this.client.del(pattern)
      }
    } catch (err) {
      logger.error({ err, pattern }, 'Redis INVALIDATE error')
    }
  }
}

export const cacheService = new CacheService()
