import { Request, Response, NextFunction } from 'express'
import { PaymentService } from './payment.service'

export class PaymentController {
  constructor(private paymentService = new PaymentService()) {}

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.paymentService.findAll(req.query as any)
      return res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const paymentId = Number(req.params.paymentId)
      const data = await this.paymentService.findById(paymentId)
      return res.status(200).json({ statusCode: 200, data })
    } catch (err) {
      next(err)
    }
  }
}
