import { Request, Response, NextFunction } from 'express'
import { cacheService } from '@/common/cache/cache.service'
import { AppError } from '@/common/errors'
import { logger } from '@/common/logger'

/**
 * Middleware đảm bảo tính lũy đẳng (Idempotency) cho các API thay đổi trạng thái.
 * Dùng cho AI Agents / Client retry an toàn.
 * Lưu response status và body vào Redis với Idempotency-Key.
 */
export const idempotencyMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Chỉ áp dụng cho POST, PUT, PATCH, DELETE
    if (['GET', 'OPTIONS', 'HEAD'].includes(req.method)) {
      return next()
    }

    const idempotencyKey = req.headers['idempotency-key'] as string
    if (!idempotencyKey) {
      // Nếu không bắt buộc thì cho qua, nhưng nếu hệ thống AI gọi thì nên bắt buộc.
      // Tạm thời cho qua để không break app cũ. 
      return next()
    }

    const cacheKey = `idempotency:${req.method}:${req.originalUrl}:${idempotencyKey}`
    
    try {
      // Kiểm tra cache
      const cachedResponse = await cacheService.get<any>(cacheKey)
      
      if (cachedResponse) {
        logger.info({ idempotencyKey, method: req.method, url: req.originalUrl }, 'Idempotency hit - returning cached response')
        return res.status(cachedResponse.statusCode).json(cachedResponse.body)
      }

      // Chưa có trong cache, can thiệp vào res.json để lưu cache khi request thành công
      const originalJson = res.json.bind(res)
      
      res.json = (body: any) => {
        // Chỉ lưu cache nếu request thành công (2xx)
        if (res.statusCode >= 200 && res.statusCode < 300) {
          cacheService.set(cacheKey, {
            statusCode: res.statusCode,
            body: body
          }, 86400) // Lưu 24h
        }
        return originalJson(body)
      }

      next()
    } catch (error) {
      logger.error({ error }, 'Idempotency middleware error')
      next()
    }
  }
}
