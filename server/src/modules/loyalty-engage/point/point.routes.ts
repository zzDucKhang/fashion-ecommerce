import { Router } from 'express'
import { requireAuth } from '@/middlewares/guards/auth.guard'
import { requireAdmin } from '@/middlewares/guards/role.guard'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import { PointController } from './point.controller'
import { earnPointsBodySchema, getHistoryQuerySchema, redeemPointsBodySchema } from './point.schema'

export const pointRouter = Router()
const controller = new PointController()

// Tất cả routes điểm đều yêu cầu đăng nhập
pointRouter.use(requireAuth)

/** GET /points/balance – Xem số điểm hiện tại */
pointRouter.get('/balance', controller.getBalance)

/** GET /points/history – Lịch sử giao dịch điểm (có phân trang) */
pointRouter.get('/history', validateRequest({ query: getHistoryQuerySchema }), controller.getHistory)

/** POST /points/earn – CHỈ ADMIN hoặc hệ thống xử lý nội bộ mới được cộng điểm */
pointRouter.post('/earn', requireAdmin, validateRequest({ body: earnPointsBodySchema }), controller.earnPoints)

/** POST /points/redeem – Dùng điểm để thanh toán */
pointRouter.post('/redeem', validateRequest({ body: redeemPointsBodySchema }), controller.redeemPoints)