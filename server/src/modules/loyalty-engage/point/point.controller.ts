import { NextFunction, Request, Response } from 'express'
import { PointService } from './point.service'

export class PointController {
  constructor(private pointService = new PointService()) {}

  earnPoints = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.pointService.earnPoints(req.user!.userId, req.body)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  redeemPoints = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const data = await this.pointService.redeemPoints(userId, req.body)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  getHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const data = await this.pointService.getHistory(userId, req.query as any)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  getBalance = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const data = await this.pointService.getBalance(userId)
      return res.status(200).json({ statusCode: 200, data })
    } catch (error) {
      next(error)
    }
  }
}
