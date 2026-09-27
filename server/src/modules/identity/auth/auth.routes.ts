import { Router } from 'express'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import { AuthController } from './auth.controller'
import {
  changePasswordBodySchema,
  forgotPasswordBodySchema,
  loginUserBodySchema,
  refreshTokenBodySchema,
  registerUserBodySchema,
  resetPasswordBodySchema,
} from './auth.schema'

export const authRouter = Router()
const controller = new AuthController()

authRouter.post('/register', validateRequest({ body: registerUserBodySchema }), controller.register)
authRouter.post('/login', validateRequest({ body: loginUserBodySchema }), controller.login)
authRouter.post('/refresh', validateRequest({ body: refreshTokenBodySchema }), controller.refresh)
authRouter.post('/forgot-password', validateRequest({ body: forgotPasswordBodySchema }), controller.forgotPassword)
authRouter.post('/reset-password', validateRequest({ body: resetPasswordBodySchema }), controller.resetPassword)
authRouter.post('/change-password', validateRequest({ body: changePasswordBodySchema }), controller.changePassword)
