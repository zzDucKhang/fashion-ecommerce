import { Router } from 'express'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import { generalAuthLimiter, otpLimiter, strictAuthLimiter } from '@/middlewares/rate-limit.middleware'
import { authGuard } from '@/middlewares/guards/auth.guard'
import { AuthController } from './auth.controller'
import {
  changePasswordBodySchema,
  forgotPasswordBodySchema,
  loginUserBodySchema,
  refreshTokenBodySchema,
  registerUserBodySchema,
  resetPasswordBodySchema,
  verificationCodeParamsSchema,
} from './auth.schema'

export const authRouter = Router()
const controller = new AuthController()

// Rate limit chung cho toàn bộ auth routes
authRouter.use(generalAuthLimiter)

authRouter.post('/register', otpLimiter, validateRequest({ body: registerUserBodySchema }), controller.register)
authRouter.post('/login', strictAuthLimiter, validateRequest({ body: loginUserBodySchema }), controller.login)
authRouter.post('/refresh', validateRequest({ body: refreshTokenBodySchema }), controller.refresh)
authRouter.post('/forgot-password', otpLimiter, validateRequest({ body: forgotPasswordBodySchema }), controller.forgotPassword)
authRouter.post('/reset-password', strictAuthLimiter, validateRequest({ body: resetPasswordBodySchema }), controller.resetPassword)
authRouter.post('/change-password', authGuard, validateRequest({ body: changePasswordBodySchema }), controller.changePassword)
authRouter.post('/verify-code', strictAuthLimiter, validateRequest({ body: verificationCodeParamsSchema }), controller.verifyCode)
authRouter.post('/logout', validateRequest({ body: refreshTokenBodySchema }), controller.logout)
