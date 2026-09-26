import { Router } from 'express'
import { cartRouter } from './cart/cart.routes'
import { orderRouter } from './order/order.routes'

export const cartOrderRouter = Router()

cartOrderRouter.use('/cart', cartRouter)
cartOrderRouter.use('/orders', orderRouter)
