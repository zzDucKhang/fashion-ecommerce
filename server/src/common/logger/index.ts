// src/common/logger/index.ts
import pino from 'pino'
import { envConfig } from '@/config/env.config'

/**
 * Enterprise-grade structured logger using pino.
 * Creates child loggers for each module to enable structured log filtering
 * in K8s/ELK/Datadog environments via the `module` field.
 *
 * Usage:
 *   import { createLogger } from '@/common/logger'
 *   const logger = createLogger('PointService')
 *   logger.info({ userId, orderId }, 'Points earned successfully')
 */
const rootLogger = pino({
  level: envConfig.NODE_ENV === 'production' ? 'info' : 'debug',
  transport:
    envConfig.NODE_ENV === 'development'
      ? { target: 'pino-pretty', options: { colorize: true, translateTime: 'SYS:standard' } }
      : undefined,
  serializers: pino.stdSerializers,
  base: { pid: process.pid, env: envConfig.NODE_ENV },
})

/**
 * Creates a child logger scoped to a specific module name.
 * All log entries from this child logger will include `{ module: name }`.
 */
export function createLogger(module: string) {
  return rootLogger.child({ module })
}

export { rootLogger as logger }
