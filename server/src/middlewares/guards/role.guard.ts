import { Request, Response, NextFunction } from 'express'
import { prisma } from '@/database/prisma'
import { ForbiddenError, UnauthorizedError } from '@/common/errors'

export const roleGuard = (...allowedCodes: string[]) => async (req: Request, _res: Response, next: NextFunction) => {
	try {
		const user = (req as any).user
		if (!user || !user.roleId) throw new UnauthorizedError()

		const role = await prisma.role.findFirst({ where: { id: user.roleId, isActive: true, deletedAt: null } })
		if (!role || !allowedCodes.includes(role.code)) throw new ForbiddenError()
		next()
	} catch (error) {
		next(error)
	}
}
