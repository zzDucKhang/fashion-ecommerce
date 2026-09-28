import { z } from 'zod'

// =====================================================
// POINT SCHEMAS
// =====================================================

/**
 * Schema để lấy lịch sử giao dịch điểm của user.
 * Hỗ trợ phân trang và lọc theo loại giao dịch.
 */
export const getPointHistorySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  type: z.enum(['EARN', 'REDEEM', 'REFUND', 'EXPIRE']).optional(),
})

export type GetPointHistoryDto = z.infer<typeof getPointHistorySchema>

/**
 * Schema tích điểm cho đơn hàng hoàn tất.
 */
export const earnPointsSchema = z.object({
  orderId: z.number().int().positive({ message: 'orderId phải là số nguyên dương.' }),
  orderAmountVnd: z.number().positive({ message: 'orderAmountVnd phải là số dương.' }),
})

export type EarnPointsDto = z.infer<typeof earnPointsSchema>

/**
 * Schema tiêu điểm thanh toán đơn hàng.
 */
export const redeemPointsSchema = z.object({
  orderId: z.number().int().positive({ message: 'orderId phải là số nguyên dương.' }),
  pointsToRedeem: z.number().int().positive({ message: 'pointsToRedeem phải là số nguyên dương.' }),
})

export type RedeemPointsDto = z.infer<typeof redeemPointsSchema>

/**
 * Schema để admin cộng/trừ điểm thủ công cho user.
 */
export const adjustPointsSchema = z.object({
  userId: z.number().int().positive({ message: 'userId phải là số nguyên dương.' }),
  points: z.number().int({ message: 'Điểm phải là số nguyên.' }).refine((p) => p !== 0, {
    message: 'Số điểm điều chỉnh phải khác 0.',
  }),
  description: z.string().min(5, { message: 'Mô tả phải có ít nhất 5 ký tự.' }).max(255),
})

export type AdjustPointsDto = z.infer<typeof adjustPointsSchema>

// =====================================================
// VOUCHER SCHEMAS
// =====================================================

/**
 * Schema để Admin tạo mã giảm giá mới.
 */
export const createVoucherSchema = z.object({
  code: z
    .string()
    .min(4, { message: 'Mã voucher phải có ít nhất 4 ký tự.' })
    .max(100)
    .regex(/^[A-Z0-9_-]+$/, { message: 'Mã voucher chỉ được chứa chữ in hoa, số, dấu gạch dưới và gạch ngang.' }),
  discountType: z.enum(['PERCENTAGE', 'FIXED_AMOUNT'], {
    errorMap: () => ({ message: 'discountType phải là PERCENTAGE hoặc FIXED_AMOUNT.' }),
  }),
  discountValue: z.number().positive({ message: 'Giá trị giảm phải là số dương.' }),
  minOrderValue: z.number().nonnegative({ message: 'Giá trị đơn tối thiểu không được âm.' }).default(0),
  maxDiscountAmt: z.number().positive({ message: 'Số tiền giảm tối đa phải là số dương.' }).optional(),
  totalUsageLimit: z.number().int().nonnegative().default(0),
  userUsageLimit: z.number().int().positive().default(1),
  startDate: z.string().datetime({ message: 'startDate phải là chuỗi ISO 8601.' }),
  endDate: z.string().datetime({ message: 'endDate phải là chuỗi ISO 8601.' }),
  isActive: z.boolean().default(true),
}).refine(
  (data) => new Date(data.endDate) > new Date(data.startDate),
  { message: 'endDate phải sau startDate.', path: ['endDate'] }
).refine(
  (data) => {
    if (data.discountType === 'PERCENTAGE') {
      return data.discountValue > 0 && data.discountValue <= 100
    }
    return true
  },
  { message: 'Phần trăm giảm giá phải nằm trong khoảng 1-100.', path: ['discountValue'] }
)

export type CreateVoucherDto = z.infer<typeof createVoucherSchema>

/**
 * Schema để User áp dụng/kiểm tra tính hợp lệ của voucher khi thanh toán.
 */
export const applyVoucherSchema = z.object({
  code: z.string().min(1, { message: 'Mã voucher không được để trống.' }),
  orderValue: z.number().positive({ message: 'Giá trị đơn hàng phải là số dương.' }),
})

export type ApplyVoucherDto = z.infer<typeof applyVoucherSchema>

/**
 * Schema lấy danh sách voucher (admin).
 */
export const listVouchersSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  isActive: z.coerce.boolean().optional(),
})

export type ListVouchersDto = z.infer<typeof listVouchersSchema>

// =====================================================
// REVIEW SCHEMAS
// =====================================================

/**
 * Schema để User tạo đánh giá sản phẩm.
 */
export const createReviewSchema = z.object({
  productId: z.number().int().positive({ message: 'productId phải là số nguyên dương.' }),
  rating: z
    .number()
    .int({ message: 'Rating phải là số nguyên.' })
    .min(1, { message: 'Rating tối thiểu là 1.' })
    .max(5, { message: 'Rating tối đa là 5.' }),
  content: z
    .string()
    .min(10, { message: 'Nội dung đánh giá phải có ít nhất 10 ký tự.' })
    .max(2000, { message: 'Nội dung đánh giá không được vượt quá 2000 ký tự.' }),
  mediaUrls: z
    .array(z.string().url({ message: 'Mỗi URL media phải là URL hợp lệ.' }))
    .max(10, { message: 'Chỉ được đính kèm tối đa 10 media.' })
    .optional()
    .default([]),
  mediaType: z.enum(['IMAGE', 'VIDEO']).default('IMAGE'),
})

export type CreateReviewDto = z.infer<typeof createReviewSchema>

/**
 * Schema để Admin trả lời đánh giá.
 */
export const replyReviewSchema = z.object({
  shopReply: z.string().min(5, { message: 'Nội dung trả lời phải có ít nhất 5 ký tự.' }).max(1000),
})

export type ReplyReviewDto = z.infer<typeof replyReviewSchema>

/**
 * Schema lấy danh sách review của sản phẩm.
 */
export const getProductReviewsSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  rating: z.coerce.number().int().min(1).max(5).optional(),
})

export type GetProductReviewsDto = z.infer<typeof getProductReviewsSchema>

// =====================================================
// MESSAGE / CHAT SCHEMAS
// =====================================================

/**
 * Schema để User gửi tin nhắn mới.
 */
export const sendMessageSchema = z.object({
  receiverId: z.number().int().positive({ message: 'receiverId phải là số nguyên dương.' }),
  content: z
    .string()
    .min(1, { message: 'Nội dung tin nhắn không được để trống.' })
    .max(5000, { message: 'Nội dung tin nhắn không được vượt quá 5000 ký tự.' }),
  attachmentUrl: z.string().url({ message: 'URL đính kèm phải là URL hợp lệ.' }).optional(),
})

export type SendMessageDto = z.infer<typeof sendMessageSchema>

/**
 * Schema để lấy lịch sử chat giữa 2 user.
 */
export const getChatHistorySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
})

export type GetChatHistoryDto = z.infer<typeof getChatHistorySchema>

/**
 * Schema để cập nhật WebSocket Session khi user kết nối.
 */
export const upsertWebsocketSessionSchema = z.object({
  socketId: z.string().min(1, { message: 'socketId không được để trống.' }).max(255),
})

export type UpsertWebsocketSessionDto = z.infer<typeof upsertWebsocketSessionSchema>
