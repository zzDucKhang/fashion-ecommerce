import { NextFunction, Request, Response } from 'express'
import { BadRequestError } from '@/common/errors'
import { addCartItemSchema, cartOwnerSchema, updateCartItemSchema } from './cart.schema'
import { CartService } from './cart.service'

const userIdOf = (req: Request) => {
  const value = (req as any).user?.userId ?? req.headers['x-user-id']
  return value ? Number(value) : undefined
}

const ownerOf = (req: Request) => {
  const result = cartOwnerSchema.safeParse({ sessionId: req.headers['x-session-id'] ?? req.body?.sessionId ?? req.query.sessionId })
  if (!result.success) throw new BadRequestError('sessionId không hợp lệ')
  return result.data
}

export class CartController {
  constructor(private readonly service = new CartService()) {}
  get = async (req: Request, res: Response, next: NextFunction) => { try { return res.json({ statusCode: 200, data: await this.service.get(userIdOf(req), ownerOf(req)) }) } catch (error) { next(error) } }
  add = async (req: Request, res: Response, next: NextFunction) => { try { const input = addCartItemSchema.safeParse(req.body); if (!input.success) throw new BadRequestError(input.error.issues[0]?.message); return res.status(201).json({ statusCode: 201, data: await this.service.add(userIdOf(req), ownerOf(req), input.data) }) } catch (error) { next(error) } }
  update = async (req: Request, res: Response, next: NextFunction) => { try { const input = updateCartItemSchema.safeParse(req.body); if (!input.success) throw new BadRequestError(input.error.issues[0]?.message); return res.json({ statusCode: 200, data: await this.service.update(userIdOf(req), ownerOf(req), Number(req.params.itemId), input.data) }) } catch (error) { next(error) } }
  remove = async (req: Request, res: Response, next: NextFunction) => { try { return res.json({ statusCode: 200, data: await this.service.remove(userIdOf(req), ownerOf(req), Number(req.params.itemId)) }) } catch (error) { next(error) } }
}