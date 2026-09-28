import { PointTransType } from '@prisma/client'
import * as repo from './loyalty-engage.repo'
// =====================================================
// HTTP ERROR CLASSES
// =====================================================

export class HttpError extends Error {
  statusCode: number
  constructor(message: string, statusCode: number) {
    super(message)
    this.name = 'HttpError'
    this.statusCode = statusCode
  }
}

export class BadRequestError extends HttpError {
  constructor(message = 'Bad Request') {
    super(message, 400)
    this.name = 'BadRequestError'
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = 'Unauthorized') {
    super(message, 401)
    this.name = 'UnauthorizedError'
  }
}

export class ForbiddenError extends HttpError {
  constructor(message = 'Forbidden') {
    super(message, 403)
    this.name = 'ForbiddenError'
  }
}

export class NotFoundError extends HttpError {
  constructor(message = 'Not Found') {
    super(message, 404)
    this.name = 'NotFoundError'
  }
}

export class ConflictError extends HttpError {
  constructor(message = 'Conflict') {
    super(message, 409)
    this.name = 'ConflictError'
  }
}

import type {
  CreateVoucherDto,
  ApplyVoucherDto,
  CreateReviewDto,
  ReplyReviewDto,
  SendMessageDto,
  GetPointHistoryDto,
  ListVouchersDto,
  GetProductReviewsDto,
  GetChatHistoryDto,
  AdjustPointsDto,
  UpsertWebsocketSessionDto,
} from './loyalty-engage.schema'
import type { PaginatedResult } from './loyalty-engage.repo'

// =====================================================
// TỶ LỆ ĐIỂM THƯỞNG: 1 ĐIỂM = 1 VNĐ
// =====================================================
const POINT_TO_VND_RATE = 1 // 1 điểm = 1 VNĐ
const EARN_RATE = 0.01 // 1% giá trị đơn hàng = số điểm tích được (ví dụ: 100,000 VNĐ -> 1,000 điểm)

// =====================================================
// POINT SERVICE
// =====================================================

/**
 * Lấy lịch sử giao dịch điểm của user.
 */
export async function getPointHistory(userId: number, dto: GetPointHistoryDto) {
  return repo.findPointTransactions(userId, dto)
}

/**
 * Lấy số dư điểm hiện tại của user.
 */
export async function getMyPointBalance(userId: number): Promise<{ balance: number }> {
  const balance = await repo.getUserPointBalance(userId)
  return { balance }
}

/**
 * Cộng điểm thưởng khi user hoàn tất đơn hàng (DELIVERED).
 * Tỷ lệ: orderAmount * EARN_RATE điểm (làm tròn xuống).
 * @param userId - ID người dùng
 * @param orderId - ID đơn hàng
 * @param orderAmountVnd - Tổng tiền đơn hàng (VNĐ)
 */
export async function earnPointsForOrder(
  userId: number,
  orderId: number,
  orderAmountVnd: number
): Promise<{ pointsEarned: number; newBalance: number }> {
  const pointsEarned = Math.floor(orderAmountVnd * EARN_RATE)

  if (pointsEarned <= 0) {
    return { pointsEarned: 0, newBalance: await repo.getUserPointBalance(userId) }
  }

  const { newBalance } = await repo.createPointTransaction({
    userId,
    pointChange: pointsEarned,
    transactionType: PointTransType.EARN,
    description: `Tích điểm từ đơn hàng #${orderId}`,
    orderId,
  })

  return { pointsEarned, newBalance }
}

/**
 * Trừ điểm khi user dùng điểm để thanh toán.
 * Tỷ lệ: 1 điểm = 1 VNĐ.
 * @param userId - ID người dùng
 * @param pointsToRedeem - Số điểm muốn dùng
 * @param orderId - ID đơn hàng
 * @returns Số tiền được giảm (VNĐ)
 */
export async function redeemPointsForPayment(
  userId: number,
  pointsToRedeem: number,
  orderId: number
): Promise<{ discountAmount: number; newBalance: number }> {
  if (pointsToRedeem <= 0) {
    throw new BadRequestError('Số điểm muốn sử dụng phải lớn hơn 0.')
  }

  const currentBalance = await repo.getUserPointBalance(userId)

  if (currentBalance < pointsToRedeem) {
    throw new BadRequestError(
      `Số điểm không đủ. Số dư hiện tại: ${currentBalance} điểm, yêu cầu: ${pointsToRedeem} điểm.`
    )
  }

  const discountAmount = pointsToRedeem * POINT_TO_VND_RATE

  const { newBalance } = await repo.createPointTransaction({
    userId,
    pointChange: -pointsToRedeem,
    transactionType: PointTransType.REDEEM,
    description: `Dùng ${pointsToRedeem} điểm thanh toán đơn hàng #${orderId} (-${discountAmount.toLocaleString('vi-VN')} VNĐ)`,
    orderId,
  })

  return { discountAmount, newBalance }
}

/**
 * Admin cộng/trừ điểm thủ công cho user.
 */
export async function adminAdjustPoints(dto: AdjustPointsDto) {
  if (dto.points === 0) {
    throw new BadRequestError('Số điểm điều chỉnh phải khác 0.')
  }

  const transactionType =
    dto.points > 0 ? PointTransType.EARN : PointTransType.EXPIRE

  if (dto.points < 0) {
    const balance = await repo.getUserPointBalance(dto.userId)
    if (balance < Math.abs(dto.points)) {
      throw new BadRequestError(
        `Không thể trừ điểm. Số dư user là ${balance}, yêu cầu trừ ${Math.abs(dto.points)}.`
      )
    }
  }

  return repo.createPointTransaction({
    userId: dto.userId,
    pointChange: dto.points,
    transactionType,
    description: dto.description,
  })
}

// =====================================================
// VOUCHER SERVICE
// =====================================================

/**
 * Admin tạo mã giảm giá mới.
 * Kiểm tra trùng code trước khi tạo.
 */
export async function createVoucher(dto: CreateVoucherDto) {
  const existing = await repo.findVoucherByCode(dto.code)
  if (existing) {
    throw new ConflictError(`Mã voucher "${dto.code}" đã tồn tại.`)
  }

  return repo.createVoucher(dto)
}

/**
 * Lấy danh sách voucher (admin).
 */
export async function listVouchers(dto: ListVouchersDto): Promise<PaginatedResult<unknown>> {
  return repo.findAllVouchers(dto) as Promise<PaginatedResult<unknown>>
}

/**
 * Kiểm tra tính hợp lệ của voucher và tính số tiền được giảm.
 * Logic kiểm tra:
 * 1. Voucher phải tồn tại
 * 2. Voucher phải đang active
 * 3. Thời gian hiện tại phải trong khoảng startDate - endDate
 * 4. totalUsageLimit: 0 = không giới hạn, >0 = có giới hạn
 * 5. orderValue phải >= minOrderValue
 */
export async function applyVoucher(dto: ApplyVoucherDto): Promise<{
  voucher: {
    code: string
    discountType: string
    discountValue: number
    maxDiscountAmt: number | null
  }
  discountAmount: number
  finalOrderValue: number
}> {
  const voucher = await repo.findVoucherByCode(dto.code)

  if (!voucher) {
    throw new NotFoundError(`Voucher "${dto.code}" không tồn tại.`)
  }

  if (!voucher.isActive) {
    throw new BadRequestError('Voucher này hiện không hoạt động.')
  }

  const now = new Date()
  if (now < voucher.startDate) {
    throw new BadRequestError(
      `Voucher chưa đến ngày kích hoạt. Ngày bắt đầu: ${voucher.startDate.toLocaleDateString('vi-VN')}.`
    )
  }

  if (now > voucher.endDate) {
    throw new BadRequestError(
      `Voucher đã hết hạn vào ngày ${voucher.endDate.toLocaleDateString('vi-VN')}.`
    )
  }

  if (voucher.totalUsageLimit > 0 && voucher.usedCount >= voucher.totalUsageLimit) {
    throw new BadRequestError('Voucher đã đạt giới hạn số lần sử dụng.')
  }

  const minOrderValue = Number(voucher.minOrderValue)
  if (dto.orderValue < minOrderValue) {
    throw new BadRequestError(
      `Đơn hàng tối thiểu phải đạt ${minOrderValue.toLocaleString('vi-VN')} VNĐ để áp dụng voucher này.`
    )
  }

  // Tính số tiền giảm
  let discountAmount: number
  const discountValue = Number(voucher.discountValue)
  const maxDiscountAmt = voucher.maxDiscountAmt ? Number(voucher.maxDiscountAmt) : null

  if (voucher.discountType === 'PERCENTAGE') {
    discountAmount = Math.round((dto.orderValue * discountValue) / 100)
    if (maxDiscountAmt !== null && discountAmount > maxDiscountAmt) {
      discountAmount = maxDiscountAmt
    }
  } else {
    // FIXED_AMOUNT
    discountAmount = Math.round(Math.min(discountValue, dto.orderValue))
  }

  const finalOrderValue = Math.max(0, dto.orderValue - discountAmount)

  return {
    voucher: {
      code: voucher.code,
      discountType: voucher.discountType,
      discountValue: Number(voucher.discountValue),
      maxDiscountAmt,
    },
    discountAmount,
    finalOrderValue,
  }
}

/**
 * Ghi nhận việc dùng voucher (tăng usedCount).
 * Gọi sau khi đơn hàng được xác nhận thanh toán thành công.
 */
export async function confirmVoucherUsage(code: string) {
  const voucher = await repo.findVoucherByCode(code)
  if (!voucher) throw new NotFoundError(`Voucher "${code}" không tồn tại.`)
  return repo.incrementVoucherUsedCount(code)
}

// =====================================================
// REVIEW SERVICE
// =====================================================

/**
 * Tạo đánh giá sản phẩm mới.
 * Mỗi user chỉ được review một sản phẩm một lần (unique: productId + userId).
 */
export async function createProductReview(userId: number, dto: CreateReviewDto) {
  const existing = await repo.findReviewByUserAndProduct(userId, dto.productId)
  if (existing) {
    throw new ConflictError('Bạn đã đánh giá sản phẩm này rồi. Mỗi sản phẩm chỉ được đánh giá một lần.')
  }

  return repo.createReview(userId, dto)
}

/**
 * Lấy danh sách đánh giá của sản phẩm (public).
 */
export async function getProductReviews(productId: number, dto: GetProductReviewsDto) {
  return repo.findReviewsByProduct(productId, dto)
}

/**
 * Tính và trả về rating trung bình của sản phẩm.
 */
export async function getProductRatingSummary(productId: number) {
  const summary = await repo.computeProductAverageRating(productId)
  return {
    productId,
    averageRating: summary.reviewCount === 0 ? 0 : Math.round((summary.averageRating || 0) * 10) / 10,
    reviewCount: summary.reviewCount,
  }
}

/**
 * Admin trả lời đánh giá của khách hàng.
 */
export async function replyToReview(reviewId: number, dto: ReplyReviewDto) {
  const review = await repo.findReviewById(reviewId)
  if (!review) {
    throw new NotFoundError(`Đánh giá với id=${reviewId} không tồn tại.`)
  }

  return repo.addShopReplyToReview(reviewId, dto.shopReply)
}

/**
 * Admin ẩn/hiện đánh giá (kiểm duyệt nội dung).
 */
export async function moderateReview(reviewId: number, isHidden: boolean) {
  const review = await repo.findReviewById(reviewId)
  if (!review) {
    throw new NotFoundError(`Đánh giá với id=${reviewId} không tồn tại.`)
  }

  return repo.toggleReviewVisibility(reviewId, isHidden)
}

// =====================================================
// CHAT SERVICE
// =====================================================

/**
 * Gửi tin nhắn mới.
 * Kiểm tra user không tự gửi cho chính mình.
 */
export async function sendMessage(senderId: number, dto: SendMessageDto) {
  if (senderId === dto.receiverId) {
    throw new BadRequestError('Không thể gửi tin nhắn cho chính mình.')
  }

  return repo.createMessage(senderId, dto)
}

/**
 * Lấy lịch sử chat giữa 2 user.
 * Đồng thời đánh dấu tin nhắn từ đối phương là đã đọc.
 */
export async function getChatHistory(
  currentUserId: number,
  partnerUserId: number,
  dto: GetChatHistoryDto
) {
  if (currentUserId === partnerUserId) {
    throw new BadRequestError('Không thể xem lịch sử chat với chính mình.')
  }

  // Đánh dấu tin nhắn từ partner đã đọc
  await repo.markMessagesAsRead(currentUserId, partnerUserId)

  return repo.findChatHistory(currentUserId, partnerUserId, dto)
}

/**
 * Lấy danh sách hội thoại của user (tất cả conversation threads).
 */
export async function getConversationList(userId: number) {
  return repo.findConversationList(userId)
}

/**
 * Cập nhật (upsert) WebSocket Session - lưu socketId khi user connect.
 */
export async function upsertWebsocketSession(userId: number, dto: UpsertWebsocketSessionDto) {
  return repo.upsertWebsocketSession(userId, dto.socketId)
}

/**
 * Xoá WebSocket Session khi user ngắt kết nối.
 */
export async function removeWebsocketSession(socketId: string) {
  await repo.deleteWebsocketSession(socketId)
  return { message: 'Phiên WebSocket đã được xoá.' }
}

/**
 * Lấy tất cả socketId của user (để emit sự kiện).
 */
export async function getUserSocketIds(userId: number): Promise<string[]> {
  return repo.findSocketIdsByUserId(userId)
}
