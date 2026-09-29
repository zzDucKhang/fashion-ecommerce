import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { cartRouter } from './cart/cart.routes'
import { orderRouter } from './order/order.routes'

export const cartOrderRouter = Router()

// Giới hạn 300 requests mỗi 15 phút cho cụm Cart (thao tác duyệt, thêm, sửa, xóa giỏ hàng thường xuyên)
const cartLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: { statusCode: 429, message: 'Bạn đã gửi quá nhiều yêu cầu đến giỏ hàng, vui lòng thử lại sau.' },
})

// Giới hạn 50 requests mỗi 15 phút cho cụm Order (đặt hàng, thanh toán, hủy đơn)
const orderLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { statusCode: 429, message: 'Bạn đã gửi quá nhiều yêu cầu đặt hàng, vui lòng thử lại sau.' },
})

cartOrderRouter.use('/cart', cartLimiter, cartRouter)
cartOrderRouter.use('/orders', orderLimiter, orderRouter)