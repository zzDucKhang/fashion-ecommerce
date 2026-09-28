import { Request, Response, NextFunction } from 'express'
import { ReturnService } from './return.service'

export class ReturnController {
  constructor(private returnService = new ReturnService()) {}

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.returnService.findAll(req.query as any)
      return res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const returnId = Number(req.params.returnId)
      const data = await this.returnService.findById(returnId)
      return res.status(200).json({ statusCode: 200, data })
    } catch (err) {
      next(err)
    }
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.returnService.create(req.body)
      return res.status(201).json({ statusCode: 201, message: 'Tạo yêu cầu trả hàng thành công', data })
    } catch (err) {
      next(err)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const returnId = Number(req.params.returnId)
      const data = await this.returnService.update(returnId, req.body)
      return res.status(200).json({ statusCode: 200, message: 'Cập nhật yêu cầu trả hàng thành công', data })
    } catch (err) {
      next(err)
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const returnId = Number(req.params.returnId)
      const result = await this.returnService.delete(returnId)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }
}
