import { Request, Response, NextFunction } from 'express'
import { UserService } from './user.service'
import { GetUserQueryType, UpdateUserBodyType, UpdateUserStatusBodyType } from './user.schema'
import { AppError } from '@/common/errors'

export class UserController {
    constructor(private userService = new UserService()) { }

    private getCurrentUser(req: Request) {
        const user = (req as any).user
        const userId = user?.userId ?? user?.id
        if (!userId) throw new AppError('Chưa xác thực người dùng', 401)
        return { userId: Number(userId), roleId: Number(user?.roleId) }
    }

    getListUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const query = req.query as unknown as GetUserQueryType
            const result = await this.userService.listUsers(query)
            return res.status(200).json({
                statusCode: 200,
                data: result,
            })
        }
        catch (error) {
            next(error)
        }
    }

    getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = parseInt(req.params.userId)
            const currentUser = this.getCurrentUser(req)
            const result = await this.userService.getUserById(userId, currentUser)
            return res.status(200).json({
                statusCode: 200,
                data: result,
            })
        }
        catch (error) {
            next(error)
        }
    }

    updateUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = parseInt(req.params.userId)
            const currentUser = this.getCurrentUser(req)
            const data: UpdateUserBodyType = req.body
            const result = await this.userService.updateUser(userId, currentUser, data)
            return res.status(200).json({
                statusCode: 200,
                message: 'Cập nhật thông tin thành công',
                data: result,
            })
        }
        catch (error) {
            next(error)
        }
    }

    updateStatus = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = parseInt(req.params.userId)
            const currentUser = this.getCurrentUser(req)
            const data: UpdateUserStatusBodyType = req.body
            const result = await this.userService.updateStatus(userId, currentUser.userId, data)
            return res.status(200).json({
                statusCode: 200,
                message: 'Cập nhật trạng thái thành công',
                data: result,
            })
        }
        catch (error) {
            next(error)
        }
    }

    deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = parseInt(req.params.userId)
            const currentUser = this.getCurrentUser(req)
            await this.userService.deleteUser(userId, currentUser.userId)
            return res.status(200).json({
                statusCode: 200,
                message: 'Xóa người dùng thành công',
            })
        }
        catch (error) {
            next(error)
        }
    }
}