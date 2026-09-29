import { Request, Response, NextFunction } from 'express'
import { prisma } from '@/database/prisma'
import { ForbiddenError, UnauthorizedError } from '@/common/errors'

export const roleGuard = (...allowedCodes: string[]) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.roleId) {
        throw new UnauthorizedError('Chưa xác thực người dùng')
      }

      const role = await prisma.role.findFirst({
        where: { id: req.user.roleId, isActive: true, deletedAt: null },
      })

      if (!role || !allowedCodes.includes(role.code)) {
        throw new ForbiddenError('Bạn không có quyền thực hiện hành động này')
      }

      next()
    } catch (error) {
      next(error)
    }
  }
}

export const requireRole = roleGuard
export const requireAdmin = roleGuard('ADMIN')