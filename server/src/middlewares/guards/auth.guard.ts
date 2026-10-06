import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { envConfig } from '@/config/env.config'
import { UnauthorizedError } from '@/common/errors'


const extractBearerToken = (req: Request): string | null => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  return authHeader.slice(7).trim()
}

export const requireAuth = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token = extractBearerToken(req)
    if (!token) {
      throw new UnauthorizedError('Vui lòng đăng nhập để thực hiện thao tác này')
    }

    const payload = jwt.verify(token, envConfig.ACCESS_TOKEN_SECRET) as JwtPayload

    if (typeof payload.userId !== 'number' || typeof payload.roleId !== 'number') {
      throw new UnauthorizedError('Access token không đúng định dạng')
    }

    req.user = {
      userId: payload.userId,
      roleId: payload.roleId,
      email: payload.email,
    }

    next()
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return next(error)
    }
    return next(new UnauthorizedError('Access token không hợp lệ hoặc đã hết hạn'))
  }
}

export const authGuard = requireAuth

export const optionalAuth = (req: Request, _res: Response, next: NextFunction) => {
  const token = extractBearerToken(req)
  if (!token) {
    return next()
  }

  try {
    const payload = jwt.verify(token, envConfig.ACCESS_TOKEN_SECRET) as JwtPayload
    if (typeof payload.userId === 'number' && typeof payload.roleId === 'number') {
      req.user = {
        userId: payload.userId,
        roleId: payload.roleId,
        email: payload.email,
      }
    }
  } catch {
    // Guest truy cập vãng lai, không chặn lỗi
  }

  next()
}