import type { Request, Response, NextFunction } from 'express'
import * as service from './loyalty-engage.service'
import {
  getPointHistorySchema,
  earnPointsSchema,
  redeemPointsSchema,
  adjustPointsSchema,
  createVoucherSchema,
  applyVoucherSchema,
  listVouchersSchema,
  createReviewSchema,
  replyReviewSchema,
  getProductReviewsSchema,
  sendMessageSchema,
  getChatHistorySchema,
  upsertWebsocketSessionSchema,
} from './loyalty-engage.schema'
import { z, ZodError } from 'zod'

interface AuthRequest extends Request {
  user?: {
    id: number
    [key: string]: unknown
  }
}

/**
 * Lấy ID của user từ token xác thực trong request.
 */
function getAuthUserId(req: Request): number {
  const user = (req as AuthRequest).user
  if (!user || typeof user.id !== 'number') {
    throw new service.UnauthorizedError('Chưa xác thực người dùng.')
  }
  return user.id
}

// =====================================================
// HELPER: Validate request body/query với Zod schema
// =====================================================

/**
 * Parse và validate dữ liệu với Zod schema.
 * Throw BadRequestError nếu không hợp lệ.
 */
function validate<T extends z.ZodTypeAny>(schema: T, data: unknown): z.infer<T> {
  try {
    return schema.parse(data)
  } catch (err) {
    if (err instanceof ZodError) {
      const messages = err.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join('; ')
      throw new service.BadRequestError(`Dữ liệu không hợp lệ. ${messages}`)
    }
    throw err
  }
}

// =====================================================
// HELPER: Standard response format
// =====================================================

/**
 * Trả về response thành công theo định dạng chuẩn.
 * { success: true, message: string, data: T }
 */
function sendSuccess<T>(res: Response, data: T, message = 'Thành công.', statusCode = 200): void {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  })
}

// =====================================================
// POINT CONTROLLERS
// =====================================================

/**
 * GET /api/v1/loyalty/points/history
 * Lấy lịch sử giao dịch điểm của user hiện tại.
 */
export async function getMyPointHistory(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = getAuthUserId(req)
    const dto = validate(getPointHistorySchema, req.query)
    const result = await service.getPointHistory(userId, dto)
    sendSuccess(res, result, 'Lấy lịch sử điểm thành công.')
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/v1/loyalty/points/balance
 * Lấy số dư điểm hiện tại của user.
 */
export async function getMyPointBalance(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = getAuthUserId(req)
    const result = await service.getMyPointBalance(userId)
    sendSuccess(res, result, 'Lấy số dư điểm thành công.')
  } catch (err) {
    next(err)
  }
}

/**
 * POST /api/v1/loyalty/points/earn
 * Cộng điểm khi hoàn tất đơn hàng.
 * Body: { orderId, orderAmountVnd }
 */
export async function earnPoints(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = getAuthUserId(req)
    const dto = validate(earnPointsSchema, req.body)
    const result = await service.earnPointsForOrder(userId, dto.orderId, dto.orderAmountVnd)
    sendSuccess(res, result, `Đã tích ${result.pointsEarned} điểm thành công.`, 201)
  } catch (err) {
    next(err)
  }
}

/**
 * POST /api/v1/loyalty/points/redeem
 * Dùng điểm để thanh toán.
 * Body: { pointsToRedeem, orderId }
 */
export async function redeemPoints(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = getAuthUserId(req)
    const dto = validate(redeemPointsSchema, req.body)
    const result = await service.redeemPointsForPayment(userId, dto.pointsToRedeem, dto.orderId)
    sendSuccess(res, result, `Đã sử dụng ${dto.pointsToRedeem} điểm, giảm ${result.discountAmount.toLocaleString('vi-VN')} VNĐ.`)
  } catch (err) {
    next(err)
  }
}

/**
 * POST /api/v1/loyalty/points/adjust  [ADMIN]
 * Admin cộng/trừ điểm thủ công cho user.
 */
export async function adminAdjustPoints(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = validate(adjustPointsSchema, req.body)
    const result = await service.adminAdjustPoints(dto)
    sendSuccess(res, result, 'Điều chỉnh điểm thành công.', 201)
  } catch (err) {
    next(err)
  }
}

// =====================================================
// VOUCHER CONTROLLERS
// =====================================================

/**
 * POST /api/v1/loyalty/vouchers  [ADMIN]
 * Admin tạo mã giảm giá mới.
 */
export async function createVoucher(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = validate(createVoucherSchema, req.body)
    const voucher = await service.createVoucher(dto)
    sendSuccess(res, voucher, `Tạo voucher "${voucher.code}" thành công.`, 201)
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/v1/loyalty/vouchers  [ADMIN]
 * Lấy danh sách voucher.
 */
export async function listVouchers(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = validate(listVouchersSchema, req.query)
    const result = await service.listVouchers(dto)
    sendSuccess(res, result, 'Lấy danh sách voucher thành công.')
  } catch (err) {
    next(err)
  }
}

/**
 * POST /api/v1/loyalty/vouchers/apply
 * User kiểm tra và áp dụng voucher vào đơn hàng.
 * Body: { code, orderValue }
 */
export async function applyVoucher(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = validate(applyVoucherSchema, req.body)
    const result = await service.applyVoucher(dto)
    sendSuccess(res, result, 'Voucher hợp lệ. Đã tính toán số tiền được giảm.')
  } catch (err) {
    next(err)
  }
}

/**
 * POST /api/v1/loyalty/vouchers/:code/confirm-usage  [ADMIN / Internal]
 * Ghi nhận việc dùng voucher sau khi đơn hàng được xác nhận.
 */
export async function confirmVoucherUsage(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { code } = req.params
    if (!code) throw new service.BadRequestError('code là bắt buộc.')
    const result = await service.confirmVoucherUsage(code)
    sendSuccess(res, result, 'Đã ghi nhận sử dụng voucher.')
  } catch (err) {
    next(err)
  }
}

// =====================================================
// REVIEW CONTROLLERS
// =====================================================

/**
 * POST /api/v1/loyalty/reviews
 * User tạo đánh giá sản phẩm.
 */
export async function createReview(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = getAuthUserId(req)
    const dto = validate(createReviewSchema, req.body)
    const review = await service.createProductReview(userId, dto)
    sendSuccess(res, review, 'Đánh giá của bạn đã được ghi nhận. Cảm ơn!', 201)
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/v1/loyalty/reviews/product/:productId
 * Lấy danh sách đánh giá của sản phẩm (public).
 */
export async function getProductReviews(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const productId = Number(req.params.productId)
    if (isNaN(productId) || productId <= 0) throw new service.BadRequestError('productId không hợp lệ.')
    const dto = validate(getProductReviewsSchema, req.query)
    const result = await service.getProductReviews(productId, dto)
    sendSuccess(res, result, 'Lấy danh sách đánh giá thành công.')
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/v1/loyalty/reviews/product/:productId/rating
 * Lấy thống kê rating của sản phẩm.
 */
export async function getProductRatingSummary(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const productId = Number(req.params.productId)
    if (isNaN(productId) || productId <= 0) throw new service.BadRequestError('productId không hợp lệ.')
    const result = await service.getProductRatingSummary(productId)
    sendSuccess(res, result, 'Lấy thống kê rating thành công.')
  } catch (err) {
    next(err)
  }
}

/**
 * PATCH /api/v1/loyalty/reviews/:reviewId/reply  [ADMIN]
 * Admin trả lời đánh giá.
 */
export async function replyToReview(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const reviewId = Number(req.params.reviewId)
    if (isNaN(reviewId) || reviewId <= 0) throw new service.BadRequestError('reviewId không hợp lệ.')
    const dto = validate(replyReviewSchema, req.body)
    const result = await service.replyToReview(reviewId, dto)
    sendSuccess(res, result, 'Đã thêm phản hồi của shop thành công.')
  } catch (err) {
    next(err)
  }
}

/**
 * PATCH /api/v1/loyalty/reviews/:reviewId/moderate  [ADMIN]
 * Admin ẩn/hiện đánh giá.
 * Body: { isHidden: boolean }
 */
export async function moderateReview(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const reviewId = Number(req.params.reviewId)
    if (isNaN(reviewId) || reviewId <= 0) throw new service.BadRequestError('reviewId không hợp lệ.')
    const { isHidden } = req.body as { isHidden: boolean }
    if (typeof isHidden !== 'boolean') throw new service.BadRequestError('isHidden phải là boolean.')
    const result = await service.moderateReview(reviewId, isHidden)
    sendSuccess(res, result, isHidden ? 'Đã ẩn đánh giá.' : 'Đã hiển thị đánh giá.')
  } catch (err) {
    next(err)
  }
}

// =====================================================
// CHAT CONTROLLERS
// =====================================================

/**
 * POST /api/v1/loyalty/chat/messages
 * User gửi tin nhắn.
 */
export async function sendMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const senderId = getAuthUserId(req)
    const dto = validate(sendMessageSchema, req.body)
    const message = await service.sendMessage(senderId, dto)
    sendSuccess(res, message, 'Tin nhắn đã được gửi.', 201)
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/v1/loyalty/chat/messages/:partnerId
 * Lấy lịch sử chat với một user cụ thể.
 */
export async function getChatHistory(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const currentUserId = getAuthUserId(req)
    const partnerUserId = Number(req.params.partnerId)
    if (isNaN(partnerUserId) || partnerUserId <= 0) throw new service.BadRequestError('partnerId không hợp lệ.')
    const dto = validate(getChatHistorySchema, req.query)
    const result = await service.getChatHistory(currentUserId, partnerUserId, dto)
    sendSuccess(res, result, 'Lấy lịch sử chat thành công.')
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/v1/loyalty/chat/conversations
 * Lấy danh sách hội thoại của user.
 */
export async function getConversationList(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = getAuthUserId(req)
    const result = await service.getConversationList(userId)
    sendSuccess(res, result, 'Lấy danh sách hội thoại thành công.')
  } catch (err) {
    next(err)
  }
}

/**
 * PUT /api/v1/loyalty/chat/ws-session
 * Cập nhật WebSocket Session khi user kết nối.
 */
export async function upsertWsSession(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = getAuthUserId(req)
    const dto = validate(upsertWebsocketSessionSchema, req.body)
    const result = await service.upsertWebsocketSession(userId, dto)
    sendSuccess(res, result, 'Phiên WebSocket đã được cập nhật.')
  } catch (err) {
    next(err)
  }
}

/**
 * DELETE /api/v1/loyalty/chat/ws-session/:socketId
 * Xoá WebSocket Session khi user ngắt kết nối.
 */
export async function deleteWsSession(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { socketId } = req.params
    if (!socketId) throw new service.BadRequestError('socketId là bắt buộc.')
    const result = await service.removeWebsocketSession(socketId)
    sendSuccess(res, result, 'Phiên WebSocket đã được xoá.')
  } catch (err) {
    next(err)
  }
}
