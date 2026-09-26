import { Request, Response, NextFunction } from 'express'
import { Prisma } from '@prisma/client'
import { envConfig } from '@/config/env.config'

export const errorFilter = (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  let statusCode = err.statusCode || 500
  let message = err.message || 'Internal Server Error'

  // Xử lý lỗi trùng lặp dữ liệu từ Prisma
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      statusCode = 409
      message = `Dữ liệu đã tồn tại trên trường: ${(err.meta?.target as string[])?.join(', ')}`
    } else if (err.code === 'P2025') {
      statusCode = 404
      message = 'Bản ghi không tồn tại hoặc đã bị xóa'
    }
  }

  if (envConfig.NODE_ENV === 'development') {
    console.error('🔥 [ERROR LOG]:', err)
  }

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    ...(envConfig.NODE_ENV === 'development' && { stack: err.stack }),
  })
}