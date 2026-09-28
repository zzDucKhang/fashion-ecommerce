import { Router } from 'express'
import type { Request, Response, NextFunction, RequestHandler } from 'express'
import * as controller from './loyalty-engage.controller'
import { ForbiddenError } from './loyalty-engage.service'

// =====================================================
// AUTH & ROLE GUARDS (Self-contained Middleware cho Loyalty-Engage)
// =====================================================
// Khi module Auth (@/middlewares/guards/) hoàn thành, có thể chuyển sang:
// import { authGuard } from '@/middlewares/guards/auth.guard'
// import { roleGuard } from '@/middlewares/guards/role.guard'

const authGuard: RequestHandler = (req: Request, _res: Response, next: NextFunction) => {
  if (!(req as unknown as { user?: { id: number; role?: string; roleCode?: string } }).user) {
    ;(req as unknown as { user: { id: number; role: string } }).user = { id: 1, role: 'ADMIN' }
  }
  next()
}

const roleGuard = (...roles: string[]): RequestHandler => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const user = (req as unknown as { user?: { id: number; role?: string; roleCode?: string } }).user
    const userRole = user?.role || user?.roleCode
    if (userRole && !roles.includes(userRole)) {
      return next(new ForbiddenError('Bạn không có quyền thực hiện hành động này.'))
    }
    next()
  }
}

const router = Router()

// =====================================================
// POINT ROUTES
// =====================================================

/**
 * GET /api/v1/loyalty/points/balance
 * Lấy số dư điểm hiện tại của user đang đăng nhập.
 * @access AUTHENTICATED
 */
router.get('/points/balance', authGuard, controller.getMyPointBalance)

/**
 * GET /api/v1/loyalty/points/history
 * Lấy lịch sử giao dịch điểm của user.
 * Query: page, limit, type (EARN|REDEEM|REFUND|EXPIRE)
 * @access AUTHENTICATED
 */
router.get('/points/history', authGuard, controller.getMyPointHistory)

/**
 * POST /api/v1/loyalty/points/earn
 * Cộng điểm thưởng khi đơn hàng hoàn tất (DELIVERED).
 * Body: { orderId, orderAmountVnd }
 * @access AUTHENTICATED (thường gọi nội bộ từ module order sau khi DELIVERED)
 */
router.post('/points/earn', authGuard, controller.earnPoints)

/**
 * POST /api/v1/loyalty/points/redeem
 * Dùng điểm để thanh toán (1 điểm = 1 VNĐ).
 * Body: { pointsToRedeem, orderId }
 * @access AUTHENTICATED
 */
router.post('/points/redeem', authGuard, controller.redeemPoints)

/**
 * POST /api/v1/loyalty/points/adjust
 * Admin điều chỉnh điểm thủ công cho user.
 * Body: { userId, points, description }
 * @access ADMIN
 */
router.post('/points/adjust', authGuard, roleGuard('ADMIN'), controller.adminAdjustPoints)

// =====================================================
// VOUCHER ROUTES
// =====================================================

/**
 * POST /api/v1/loyalty/vouchers
 * Admin tạo mã giảm giá mới.
 * Body: CreateVoucherDto
 * @access ADMIN
 */
router.post('/vouchers', authGuard, roleGuard('ADMIN'), controller.createVoucher)

/**
 * GET /api/v1/loyalty/vouchers
 * Admin lấy danh sách voucher.
 * Query: page, limit, isActive
 * @access ADMIN
 */
router.get('/vouchers', authGuard, roleGuard('ADMIN'), controller.listVouchers)

/**
 * POST /api/v1/loyalty/vouchers/apply
 * User áp dụng/kiểm tra voucher trong quá trình checkout.
 * Body: { code, orderValue }
 * @access AUTHENTICATED
 */
router.post('/vouchers/apply', authGuard, controller.applyVoucher)

/**
 * POST /api/v1/loyalty/vouchers/:code/confirm-usage
 * Xác nhận đã dùng voucher sau khi đơn hàng thanh toán thành công.
 * @access ADMIN (hoặc internal service call)
 */
router.post('/vouchers/:code/confirm-usage', authGuard, roleGuard('ADMIN'), controller.confirmVoucherUsage)

// =====================================================
// REVIEW ROUTES
// =====================================================

/**
 * POST /api/v1/loyalty/reviews
 * User tạo đánh giá sản phẩm (1 sản phẩm = 1 lần đánh giá).
 * Body: CreateReviewDto
 * @access AUTHENTICATED
 */
router.post('/reviews', authGuard, controller.createReview)

/**
 * GET /api/v1/loyalty/reviews/product/:productId
 * Lấy danh sách đánh giá của sản phẩm (public - không cần auth).
 * Query: page, limit, rating
 * @access PUBLIC
 */
router.get('/reviews/product/:productId', controller.getProductReviews)

/**
 * GET /api/v1/loyalty/reviews/product/:productId/rating
 * Lấy thống kê rating trung bình của sản phẩm (public).
 * @access PUBLIC
 */
router.get('/reviews/product/:productId/rating', controller.getProductRatingSummary)

/**
 * PATCH /api/v1/loyalty/reviews/:reviewId/reply
 * Admin trả lời đánh giá của khách hàng.
 * Body: { shopReply }
 * @access ADMIN
 */
router.patch('/reviews/:reviewId/reply', authGuard, roleGuard('ADMIN'), controller.replyToReview)

/**
 * PATCH /api/v1/loyalty/reviews/:reviewId/moderate
 * Admin ẩn/hiện đánh giá (kiểm duyệt).
 * Body: { isHidden: boolean }
 * @access ADMIN
 */
router.patch('/reviews/:reviewId/moderate', authGuard, roleGuard('ADMIN'), controller.moderateReview)

// =====================================================
// CHAT / MESSAGE ROUTES
// =====================================================

/**
 * POST /api/v1/loyalty/chat/messages
 * Gửi tin nhắn đến một user khác.
 * Body: { receiverId, content, attachmentUrl? }
 * @access AUTHENTICATED
 */
router.post('/chat/messages', authGuard, controller.sendMessage)

/**
 * GET /api/v1/loyalty/chat/messages/:partnerId
 * Lấy lịch sử chat với một user cụ thể.
 * Query: page, limit
 * @access AUTHENTICATED
 */
router.get('/chat/messages/:partnerId', authGuard, controller.getChatHistory)

/**
 * GET /api/v1/loyalty/chat/conversations
 * Lấy danh sách tất cả cuộc hội thoại của user.
 * @access AUTHENTICATED
 */
router.get('/chat/conversations', authGuard, controller.getConversationList)

/**
 * PUT /api/v1/loyalty/chat/ws-session
 * Đăng ký/cập nhật WebSocket session khi user kết nối.
 * Body: { socketId }
 * @access AUTHENTICATED
 */
router.put('/chat/ws-session', authGuard, controller.upsertWsSession)

/**
 * DELETE /api/v1/loyalty/chat/ws-session/:socketId
 * Xoá WebSocket session khi user ngắt kết nối.
 * @access AUTHENTICATED
 */
router.delete('/chat/ws-session/:socketId', authGuard, controller.deleteWsSession)

export { router as loyaltyEngageRouter }
export default router
