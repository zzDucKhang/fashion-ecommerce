import { NextFunction, Request, Response } from 'express'
import { BadRequestError, UnauthorizedError } from '@/common/errors'
import { createOrderSchema, listOrderSchema, updateOrderStatusSchema } from './order.schema'
import { OrderService } from './order.service'

/**
 * Lấy userId BẮT BUỘC từ Middleware Xác thực (Auth Middleware)
 */
const getRequiredUserId = (req: Request): number => {
  const userId = (req as any).user?.userId
  
  if (!userId || isNaN(Number(userId))) {
    throw new UnauthorizedError('Bạn cần đăng nhập để thực hiện thao tác này')
  }
  
  return Number(userId)
}

/**
 * Helper kiểm tra và ép kiểu orderId từ URL params
 */
const parseOrderId = (param: string): number => {
  const orderId = Number(param)
  if (isNaN(orderId) || orderId <= 0) {
    throw new BadRequestError('Mã đơn hàng (orderId) không hợp lệ')
  }
  return orderId
}

export class OrderController {
  constructor(private readonly service = new OrderService()) {}

  // Lấy danh sách đơn hàng của User
  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = getRequiredUserId(req)
      const parsed = listOrderSchema.safeParse(req.query)
      
      if (!parsed.success) {
        throw new BadRequestError(parsed.error.issues[0]?.message ?? 'Tham số truy vấn không hợp lệ')
      }

      const data = await this.service.list(userId, parsed.data)
      return res.status(200).json({ statusCode: 200, data })
    } catch (error) {
      next(error)
    }
  }

  // Xem chi tiết một đơn hàng
  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = getRequiredUserId(req)
      const orderId = parseOrderId(req.params.orderId)

      const data = await this.service.findById(userId, orderId)
      return res.status(200).json({ statusCode: 200, data })
    } catch (error) {
      next(error)
    }
  }

  // Tạo đơn hàng mới (Checkout)
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = getRequiredUserId(req)
      const parsed = createOrderSchema.safeParse(req.body)

      if (!parsed.success) {
        throw new BadRequestError(parsed.error.issues[0]?.message ?? 'Dữ liệu đặt hàng không hợp lệ')
      }

      const data = await this.service.create(userId, parsed.data)
      return res.status(201).json({ statusCode: 201, data })
    } catch (error) {
      next(error)
    }
  }

  // Khách hàng hủy đơn hàng
  cancel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = getRequiredUserId(req)
      const orderId = parseOrderId(req.params.orderId)

      const data = await this.service.cancel(userId, orderId)
      return res.status(200).json({ statusCode: 200, data })
    } catch (error) {
      next(error)
    }
  }

  // Cập nhật trạng thái đơn hàng (Dành cho Admin / System Manager)
  updateStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const adminId = getRequiredUserId(req)
      const orderId = parseOrderId(req.params.orderId)
      
      const parsed = updateOrderStatusSchema.safeParse(req.body)
      if (!parsed.success) {
        throw new BadRequestError(parsed.error.issues[0]?.message ?? 'Trạng thái đơn hàng không hợp lệ')
      }

      const data = await this.service.updateStatus(orderId, parsed.data, adminId)
      return res.status(200).json({ statusCode: 200, data })
    } catch (error) {
      next(error)
    }
  }
}