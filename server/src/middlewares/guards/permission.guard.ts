import { Request, Response, NextFunction } from 'express'
import { prisma } from '@/database/prisma'
import { ForbiddenError, UnauthorizedError } from '@/common/errors'

export const permissionGuard = (...requiredPermissions: string[]) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.roleId) {
        throw new UnauthorizedError('Chưa xác thực người dùng')
      }

      // Tìm role cùng với các permission còn hiệu lực (chưa bị xóa mềm)
      const role = await prisma.role.findFirst({
        where: {
          id: req.user.roleId,
          isActive: true,
          deletedAt: null,
        },
        include: {
          permissions: {
            where: { deletedAt: null },
            select: { code: true },
          },
        },
      })

      if (!role) {
        throw new ForbiddenError('Vai trò người dùng không hợp lệ hoặc đã bị vô hiệu hóa')
      }

      // ADMIN tối cao tự động pass mọi quyền
      if (role.code === 'ADMIN') {
        return next()
      }

      const assignedPermissionCodes = role.permissions.map((p) => p.code)
      const hasAllPermissions = requiredPermissions.every((code) =>
        assignedPermissionCodes.includes(code)
      )

      if (!hasAllPermissions) {
        throw new ForbiddenError('Bạn không có quyền thực hiện hành động này')
      }

      next()
    } catch (error) {
      next(error)
    }
  }
}

export const requirePermission = permissionGuard