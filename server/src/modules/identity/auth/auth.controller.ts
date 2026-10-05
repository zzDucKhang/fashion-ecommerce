import { NextFunction, Request, Response } from 'express'
import { AppError } from '@/common/errors'
import { AuthService } from './auth.service'

export class AuthController {
  constructor(private authService = new AuthService()) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(201).json({ statusCode: 201, data: await this.authService.register(req.body) })
    } catch (error) { next(error) }
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({ statusCode: 200, data: await this.authService.login(req.body, req.ip || '') })
    } catch (error) { next(error) }
  }

  refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({ statusCode: 200, data: await this.authService.refresh(req.body.refreshToken, req.ip || '') })
    } catch (error) { next(error) }
  }

  forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({ statusCode: 200, data: await this.authService.forgotPassword(req.body.email) })
    } catch (error) { next(error) }
  }

  resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({ statusCode: 200, data: await this.authService.resetPassword(req.body) })
    } catch (error) { next(error) }
  }

  changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as any).user
      const userId = user?.userId ?? user?.id
      if (!userId) throw new AppError('Chưa xác thực người dùng', 401)
      return res.status(200).json({ statusCode: 200, data: await this.authService.changePassword(Number(userId), req.body) })
    } catch (error) { next(error) }
  }

  verifyCode = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({ statusCode: 200, data: await this.authService.verifyCode(req.body) })
    } catch (error) { next(error) }
  }

  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({ statusCode: 200, data: await this.authService.logout(req.body.refreshToken) })
    } catch (error) { next(error) }
  }
}
