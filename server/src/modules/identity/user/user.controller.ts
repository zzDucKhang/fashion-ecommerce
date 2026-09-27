import { Request, Response, NextFunction } from 'express'
import { UserService } from './user.service'
import { GetUserQueryType, UpdateUserBodyType, UpdateUserStatusBodyType } from './user.schema'
import { AppError } from '@/common/errors'

const userService = new UserService()
type UserRequest = Request & { user?: { id: number; roleId: number } }

export class UserController {
    async getListUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const query = req.query as unknown as GetUserQueryType
            const result = await userService.listUsers(query)
            return res.status(200).json({
                success: true,
                data: result,
            })
        }
        catch (error) {
            next(error)
        }
    }
    async getUserById(req: Request<{ userId: string }>, res: Response, next: NextFunction) {
        try {
            const userId = parseInt(req.params.userId)
            const result = await userService.getUserById(userId)
            return res.status(200).json({
                success: true,
                data: result,
            })
        }
        catch (error) {
            next(error)
        }
    }
    async updateUser(req: UserRequest & Request<{ userId: string }, {}, UpdateUserBodyType>, res: Response, next: NextFunction) {
        try {
            const userId = parseInt(req.params.userId)
            const currentUserId = req.user?.id
            if (!currentUserId) throw new AppError('Chưa xác thực người dùng', 401)
            const data: UpdateUserBodyType = req.body
            const result = await userService.updateUser(userId, currentUserId, data)
            return res.status(200).json({
                success: true,
                data: result,
            })
        }
        catch (error) {
            next(error)
        }
    }
    async updateStatus(req: UserRequest & Request<{ userId: string }, {}, UpdateUserStatusBodyType>, res: Response, next: NextFunction) {
        try {
            const userId = parseInt(req.params.userId)
            const currentUserId = req.user?.id
            if (!currentUserId) throw new AppError('Chưa xác thực người dùng', 401)
            const data: UpdateUserStatusBodyType = req.body
            const result = await userService.updateStatus(userId, currentUserId, data)
            return res.status(200).json({
                success: true,
                data: result,
            })
        }
        catch (error) {
            next(error)
        }
    }
    async deleteUser(req: UserRequest & Request<{ userId: string }>, res: Response, next: NextFunction) {
        try {
            const userId = parseInt(req.params.userId)
            const currentUserId = req.user?.id
            if (!currentUserId) throw new AppError('Chưa xác thực người dùng', 401)
            await userService.deleteUser(userId, currentUserId)
            return res.status(200).json({
                success: true,
                message: 'User deleted successfully',
            })
        }
        catch (error) {
            next(error)
        }
    }
}