import { Router } from 'express'
import { CartController } from './cart.controller'
import { optionalAuth } from '@/middlewares/guards/auth.guard'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import { addCartItemSchema, updateCartItemSchema } from './cart.schema'
import { z } from 'zod'

const cartItemIdParamSchema = z.object({
  itemId: z.coerce.number().int().positive('itemId phải là số nguyên dương'),
})

export const cartRouter = Router()
const controller = new CartController()

cartRouter.use(optionalAuth)

cartRouter.get('/', controller.get)
cartRouter.post('/items', validateRequest({ body: addCartItemSchema }), controller.add)
cartRouter.post('/merge', controller.merge)
cartRouter.patch(
  '/items/:itemId',
  validateRequest({ params: cartItemIdParamSchema, body: updateCartItemSchema }),
  controller.update,
)
cartRouter.delete(
  '/items/:itemId',
  validateRequest({ params: cartItemIdParamSchema }),
  controller.remove,
)
cartRouter.delete('/', controller.clear)