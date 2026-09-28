import { Router } from 'express'
import { UserController } from './user.controller'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import { authGuard } from '@/middlewares/guards/auth.guard'
import { roleGuard } from '@/middlewares/guards/role.guard'
import { getUserQuerySchema, updateUserBodySchema, updateUserStatusBodySchema, userParamsSchema } from './user.schema'

export const userRouter = Router()
const controller = new UserController()

userRouter.use(authGuard)

// Danh sách user: chỉ ADMIN / STAFF xem được
userRouter.get('/', roleGuard('ADMIN'), validateRequest({ query: getUserQuerySchema }), controller.getListUsers)

// Xem chi tiết user
userRouter.get('/:userId', validateRequest({ params: userParamsSchema }), controller.getUserById)

// Cập nhật thông tin user
userRouter.put('/:userId', validateRequest({ params: userParamsSchema, body: updateUserBodySchema }), controller.updateUser)

// Cập nhật trạng thái (ACTIVE, BLOCKED, INACTIVE): chỉ ADMIN
userRouter.patch('/:userId/status', roleGuard('ADMIN'), validateRequest({ params: userParamsSchema, body: updateUserStatusBodySchema }), controller.updateStatus)

// Xóa user: chỉ ADMIN
userRouter.delete('/:userId', roleGuard('ADMIN'), validateRequest({ params: userParamsSchema }), controller.deleteUser)

