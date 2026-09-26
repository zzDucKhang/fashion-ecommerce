import { Router } from 'express'
import { authRouter } from './auth/auth.routes'
import { userRouter } from './user/user.routes'
import { rolePermissionRouter } from './role-permission/role-permission.routes'
import { addressRouter } from './address/address.routes'

export const identityRouter = Router()

identityRouter.use('/auth', authRouter)
identityRouter.use('/users', userRouter)
identityRouter.use('/roles', rolePermissionRouter)
identityRouter.use('/addresses', addressRouter)
