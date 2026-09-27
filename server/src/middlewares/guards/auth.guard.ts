import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { envConfig } from '@/config/env.config'
import { UnauthorizedError } from '@/common/errors'

type AuthenticatedRequest = Request & { user?: { id: number; roleId: number } }

export const authGuard = (req: Request, _res: Response, next: NextFunction) => {
	try {
		const authorization = req.headers.authorization
		const token = authorization?.startsWith('Bearer ') ? authorization.slice(7) : undefined
		if (!token) throw new UnauthorizedError('Thiếu access token')

		const payload = jwt.verify(token, envConfig.ACCESS_TOKEN_SECRET) as JwtPayload
		if (typeof payload.id !== 'number' || typeof payload.roleId !== 'number') {
			throw new UnauthorizedError('Access token không hợp lệ')
		}

		;(req as AuthenticatedRequest).user = { id: payload.id, roleId: payload.roleId }
		next()
	} catch (error) {
		next(error instanceof UnauthorizedError ? error : new UnauthorizedError('Access token không hợp lệ hoặc đã hết hạn'))
	}
}
