import { NextFunction, Request, Response } from 'express'
import { BadRequestError, UnauthorizedError } from '@/common/errors'
import { createOrderSchema, listOrderSchema, updateOrderStatusSchema } from './order.schema'
import { OrderService } from './order.service'

const requiredUserId = (req: Request) => {
  const value = (req as any).user?.userId ?? req.headers['x-user-id']
  const userId = Number(value)
  if (!Number.isInteger(userId) || userId < 1) throw new UnauthorizedError('Cần đăng nhập để thực hiện thao tác đơn hàng')
  return userId
}

export class OrderController {
  constructor(private readonly service = new OrderService()) {}
  list = async (req: Request, res: Response, next: NextFunction) => { try { const parsed = listOrderSchema.safeParse(req.query); if (!parsed.success) throw new BadRequestError(parsed.error.issues[0]?.message); return res.json({ statusCode: 200, data: await this.service.list(requiredUserId(req), parsed.data) }) } catch (error) { next(error) } }
  findById = async (req: Request, res: Response, next: NextFunction) => { try { return res.json({ statusCode: 200, data: await this.service.findById(requiredUserId(req), Number(req.params.orderId)) }) } catch (error) { next(error) } }
  create = async (req: Request, res: Response, next: NextFunction) => { try { const parsed = createOrderSchema.safeParse(req.body); if (!parsed.success) throw new BadRequestError(parsed.error.issues[0]?.message); return res.status(201).json({ statusCode: 201, data: await this.service.create(requiredUserId(req), parsed.data) }) } catch (error) { next(error) } }
  cancel = async (req: Request, res: Response, next: NextFunction) => { try { return res.json({ statusCode: 200, data: await this.service.cancel(requiredUserId(req), Number(req.params.orderId)) }) } catch (error) { next(error) } }
  updateStatus = async (req: Request, res: Response, next: NextFunction) => { try { const parsed = updateOrderStatusSchema.safeParse(req.body); if (!parsed.success) throw new BadRequestError(parsed.error.issues[0]?.message); return res.json({ statusCode: 200, data: await this.service.updateStatus(Number(req.params.orderId), parsed.data, requiredUserId(req)) }) } catch (error) { next(error) } }
}