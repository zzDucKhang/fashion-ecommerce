import { NextFunction, Request, Response } from 'express'
import { BadRequestError } from '@/common/errors'
import { addCartItemSchema, cartOwnerSchema, updateCartItemSchema } from './cart.schema'
import { CartService } from './cart.service'

/**
 * Lấy userId an toàn từ Middleware xác thực (Auth Middleware)
 */
const userIdOf = (req: Request): number | undefined => {
  const userId = (req as any).user?.userId
  return userId ? Number(userId) : undefined
}

/**
 * Xác định SessionID cho giỏ hàng vãng lai (Guest)
 * Ưu tiên lấy từ Header hoặc Cookie, tránh lấy từ URL Query String
 */
const ownerOf = (req: Request) => {
  const raw = req.headers['x-session-id'] ?? req.body?.sessionId
  const sessionId = typeof raw === 'string' && raw.trim().length > 0 ? raw.trim() : undefined
  const result = cartOwnerSchema.safeParse({ sessionId })
  
  if (!result.success) {
    throw new BadRequestError('Session ID không hợp lệ hoặc không tồn tại')
  }
  
  return result.data
}

/**
 * Helper ép kiểu và kiểm tra itemId từ req.params
 */
const parseItemId = (param: string): number => {
  const itemId = Number(param)
  if (isNaN(itemId) || itemId <= 0) {
    throw new BadRequestError('Mã sản phẩm trong giỏ hàng (itemId) không hợp lệ')
  }
  return itemId
}

export class CartController {
  constructor(private readonly service = new CartService()) {}

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.get(userIdOf(req), ownerOf(req))
      return res.status(200).json({ statusCode: 200, data })
    } catch (error) {
      next(error)
    }
  }

  add = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = addCartItemSchema.safeParse(req.body)
      if (!input.success) {
        throw new BadRequestError(input.error.issues[0]?.message ?? 'Dữ liệu không hợp lệ')
      }

      const data = await this.service.add(userIdOf(req), ownerOf(req), input.data)
      return res.status(201).json({ statusCode: 201, data })
    } catch (error) {
      next(error)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const itemId = parseItemId(req.params.itemId)
      const input = updateCartItemSchema.safeParse(req.body)
      
      if (!input.success) {
        throw new BadRequestError(input.error.issues[0]?.message ?? 'Dữ liệu không hợp lệ')
      }

      const data = await this.service.update(userIdOf(req), ownerOf(req), itemId, input.data)
      return res.status(200).json({ statusCode: 200, data })
    } catch (error) {
      next(error)
    }
  }

  remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const itemId = parseItemId(req.params.itemId)
      const data = await this.service.remove(userIdOf(req), ownerOf(req), itemId)
      
      return res.status(200).json({ statusCode: 200, data })
    } catch (error) {
      next(error)
    }
  }

  clear = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.clear(userIdOf(req), ownerOf(req))
      return res.status(200).json({ statusCode: 200, data })
    } catch (error) {
      next(error)
    }
  }

  merge = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = userIdOf(req)
      if (!userId) {
        throw new BadRequestError('Bạn cần đăng nhập để thực hiện gộp giỏ hàng')
      }
      const data = await this.service.merge(userId, ownerOf(req))
      return res.status(200).json({ statusCode: 200, data })
    } catch (error) {
      next(error)
    }
  }
}