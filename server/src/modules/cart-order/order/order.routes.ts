import { Router } from 'express'
import { OrderController } from './order.controller'
import { requireAuth } from '@/middlewares/guards/auth.guard'
import { requireAdmin } from '@/middlewares/guards/role.guard'


export const orderRouter = Router()
const controller = new OrderController()

// Tất cả các API Đơn hàng đều bắt buộc người dùng phải đăng nhập
orderRouter.use(requireAuth)

// 1. Lấy danh sách đơn hàng của người dùng hiện tại
orderRouter.get('/', controller.list)

// 2. Tạo đơn hàng mới (Checkout)
orderRouter.post('/', controller.create)

// 3. Xem chi tiết 1 đơn hàng
orderRouter.get('/:orderId', controller.findById)

// 4. Khách hàng tự hủy đơn hàng (khi đơn còn ở trạng thái Chờ xử lý)
orderRouter.post('/:orderId/cancel', controller.cancel)

// 5. Cập nhật trạng thái đơn hàng (CHỈ DÀNH CHO ADMIN)
orderRouter.patch('/:orderId/status', requireAdmin, controller.updateStatus)