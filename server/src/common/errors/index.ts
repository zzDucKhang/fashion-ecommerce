import { Prisma } from '@prisma/client'

export const isUniqueConstraintPrismaError = (
  error: any,
): error is Prisma.PrismaClientKnownRequestError => {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002'
}

export const isNotFoundPrismaError = (
  error: any,
): error is Prisma.PrismaClientKnownRequestError => {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025'
}

export class AppError extends Error {
  public readonly statusCode: number
  public readonly isOperational: boolean

  constructor(message: string, statusCode = 500, isOperational = true) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational

    // Giữ nguyên stack trace sạch
    Error.captureStackTrace(this, this.constructor)
  }
}

// Các class lỗi kế thừa tiện dùng theo chuẩn HTTP Status Code
export class NotFoundError extends AppError {
  constructor(message = 'Bản ghi không tồn tại') {
    super(message, 404)
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Dữ liệu không hợp lệ') {
    super(message, 400)
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Chưa xác thực danh tính') {
    super(message, 401)
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Bạn không có quyền thực hiện hành động này') {
    super(message, 403)
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Dữ liệu đã tồn tại') {
    super(message, 409)
  }
}

export class UnprocessableEntityError extends AppError {
  constructor(message = 'Dữ liệu thực thể không thể xử lý') {
    super(message, 422)
  }
}

