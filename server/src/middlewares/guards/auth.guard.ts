// src/middlewares/guards/auth.guard.ts
import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { envConfig } from '@/config/env.config'
import { UnauthorizedError } from '@/common/errors'

// Cấu trúc Payload chuẩn tương tự dự án tham khảo
export interface AccessTokenPayload {
  userId: number
  roleId: number
  email?: string
}

// 1. Mở rộng Express Request để dùng an toàn kiểu dữ liệu trên toàn bộ dự án
declare global {
  namespace Express {
    interface Request {
      user?: AccessTokenPayload
    }
  }
}

/**
 * Helper trích xuất Bearer Token từ Authorization Header
 */
const extractBearerToken = (req: Request): string | null => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  return authHeader.slice(7).trim()
}

/**
 * Middleware bắt buộc đăng nhập (Require Auth)
 * Áp dụng cho: Profile, Orders, Checkout, Address, Change Password...
 */
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

// Giữ lại alias authGuard để tương thích với các route cũ
export const authGuard = requireAuth

/**
 * Middleware tùy chọn đăng nhập (Optional Auth)
 * Dành riêng cho Giỏ hàng (Cart) và Xem sản phẩm:
 * - Có token hợp lệ -> Giải mã và gán req.user
 * - Không có token hoặc token hỏng -> Bỏ qua, coi là Guest truy cập bằng sessionId
 */
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
    // Không ném lỗi, tiếp tục luồng của khách vãng lai
  }

  next()
}