import { Request, Response, NextFunction } from 'express'
import { ShipmentService } from './shipment.service'

export class ShipmentController {
  constructor(private shipmentService = new ShipmentService()) {}

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.shipmentService.findAll(req.query as any)
      return res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shipmentId = Number(req.params.shipmentId)
      const data = await this.shipmentService.findById(shipmentId)
      return res.status(200).json({ statusCode: 200, data })
    } catch (err) {
      next(err)
    }
  }

  findByOrderId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderId = Number(req.params.orderId)
      const data = await this.shipmentService.findByOrderId(orderId)
      return res.status(200).json({ statusCode: 200, data })
    } catch (err) {
      next(err)
    }
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.shipmentService.create(req.body)
      return res.status(201).json({ statusCode: 201, message: 'Tạo lô hàng thành công', data })
    } catch (err) {
      next(err)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shipmentId = Number(req.params.shipmentId)
      const data = await this.shipmentService.update(shipmentId, req.body)
      return res.status(200).json({ statusCode: 200, message: 'Cập nhật lô hàng thành công', data })
    } catch (err) {
      next(err)
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shipmentId = Number(req.params.shipmentId)
      const result = await this.shipmentService.delete(shipmentId)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }
}
