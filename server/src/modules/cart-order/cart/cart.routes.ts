import { Router } from 'express'
import { CartController } from './cart.controller'
import { optionalAuth } from '@/middlewares/guards/auth.guard'


export const cartRouter = Router()
const controller = new CartController()

// Áp dụng Auth Middleware cho toàn bộ các route giỏ hàng
// (Giúp tự động gắn thông tin user vào req.user nếu client gửi Token)
cartRouter.use(optionalAuth)

// 1. Lấy thông tin giỏ hàng
cartRouter.get('/', controller.get)

// 2. Thêm sản phẩm vào giỏ
cartRouter.post('/items', controller.add)

// 3. Gộp giỏ hàng từ Guest sang User khi vừa Login xong
cartRouter.post('/merge', controller.merge)

// 4. Cập nhật số lượng/thông tin của 1 món trong giỏ
cartRouter.patch('/items/:itemId', controller.update)

// 5. Xóa 1 món khỏi giỏ hàng
cartRouter.delete('/items/:itemId', controller.remove)

// 6. Xóa toàn bộ giỏ hàng (Dùng khi Clear Cart hoặc sau Checkout)
cartRouter.delete('/', controller.clear)