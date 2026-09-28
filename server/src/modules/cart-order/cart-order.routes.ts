import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { cartRouter } from './cart/cart.routes'
import { orderRouter } from './order/order.routes'

export const cartOrderRouter = Router()

// Giới hạn 100 requests mỗi 15 phút cho cụm Cart-Order
const checkoutLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { statusCode: 429, message: 'Bạn đã gửi quá nhiều yêu cầu, vui lòng thử lại sau.' },
})

cartOrderRouter.use(checkoutLimiter)
cartOrderRouter.use('/cart', cartRouter)
cartOrderRouter.use('/orders', orderRouter)