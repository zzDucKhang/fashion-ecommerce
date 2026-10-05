// src/modules/loyalty-engage/api.ts
import { api } from "@/lib/api/client";

// ==========================================
// 1. Voucher Types & Interfaces
// ==========================================

export type DiscountType = "PERCENTAGE" | "FIXED_AMOUNT";

export interface VoucherEntity {
  id: number;
  code: string;
  discountType: DiscountType;
  discountValue: number | string;
  minOrderValue: number | string;
  maxDiscountAmt?: number | string | null;
  totalUsageLimit: number;
  usedCount: number;
  userUsageLimit: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface VoucherValidationData {
  code: string;
  discountType: DiscountType;
  discountAmount: number;
  finalTotal: number;
  voucher: VoucherEntity;
}

export interface VoucherValidationResponse {
  statusCode: number;
  message: string;
  data: VoucherValidationData;
}

// ==========================================
// 2. Point Types & Interfaces
// ==========================================

export interface PointBalanceData {
  rewardPoints: number;
}

export interface PointBalanceResponse {
  statusCode: number;
  data: PointBalanceData;
}

export interface RedeemPointsPayload {
  orderId: number;
  pointsToRedeem: number;
}

export interface RedeemPointsResponse {
  statusCode: number;
  message: string;
  discountAmount: number;
  currentPoint: number;
  transaction?: unknown;
}

// ==========================================
// 3. Review Types & Interfaces
// ==========================================

export interface ReviewAuthor {
  id: number;
  fullName: string;
  avatarUrl: string | null;
}

export interface ReviewMediaItem {
  id?: number;
  url: string;
  type: string;
}

export interface ProductReviewItem {
  id: number;
  productId: number;
  orderId?: number | null;
  rating: number;
  content: string;
  shopReply: string | null;
  isHidden?: boolean;
  createdAt: string;
  updatedAt?: string;
  user: ReviewAuthor;
  medias: ReviewMediaItem[];
}

export interface RatingStats {
  averageRating: number;
  totalReviews: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ProductReviewsResponse {
  statusCode: number;
  data: ProductReviewItem[];
  ratingStats: RatingStats;
  pagination: PaginationMeta;
}

export interface CreateReviewPayload {
  productId: number;
  orderId?: number;
  rating: number;
  content: string;
  mediaUrls?: ReviewMediaItem[];
}

export interface CreateReviewResponse {
  statusCode: number;
  message: string;
  data: ProductReviewItem;
}

// ==========================================
// 4. Socket Session & Heartbeat Types
// ==========================================

export interface SocketHeartbeatResponse {
  statusCode: number;
  message: string;
  data?: {
    socketId: string;
    userId: number;
    extended: boolean;
  };
}

export interface ChatMessageItem {
  id?: number;
  senderId?: number;
  receiverId?: number;
  content: string;
  attachmentUrl?: string | null;
  createdAt?: string;
  sender?: {
    id: number;
    fullName: string;
    avatarUrl?: string | null;
  };
  isSelf?: boolean;
}

// ==========================================
// 5. API Client Methods
// ==========================================

/**
 * Kiểm tra tính hợp lệ của Voucher và tính toán số tiền giảm.
 * @param code - Mã Voucher người dùng nhập
 * @param orderTotal - Tổng giá trị đơn hàng trước giảm giá
 */
export async function validateVoucher(
  code: string,
  orderTotal: number
): Promise<VoucherValidationResponse> {
  return api.post<VoucherValidationResponse>("/vouchers/validate", {
    code: code.trim().toUpperCase(),
    orderTotal,
  });
}

/**
 * Lấy số điểm thưởng tích lũy hiện tại của người dùng.
 */
export async function getPointBalance(): Promise<PointBalanceResponse> {
  return api.get<PointBalanceResponse>("/points/balance");
}

/**
 * Dùng điểm thưởng tích lũy để thanh toán đơn hàng.
 * @param orderId - ID đơn hàng cần áp dụng điểm
 * @param pointsToRedeem - Số điểm muốn sử dụng
 */
export async function redeemPoints(
  orderId: number,
  pointsToRedeem: number
): Promise<RedeemPointsResponse> {
  return api.post<RedeemPointsResponse>("/points/redeem", {
    orderId,
    pointsToRedeem,
  });
}

/**
 * Lấy danh sách đánh giá của sản phẩm theo productId kèm thống kê điểm số và phân trang.
 */
export async function getReviewsByProduct(params: {
  productId: number;
  page?: number;
  limit?: number;
  rating?: number;
}): Promise<ProductReviewsResponse> {
  const query = new URLSearchParams();
  query.append("productId", params.productId.toString());
  if (params.page) query.append("page", params.page.toString());
  if (params.limit) query.append("limit", params.limit.toString());
  if (params.rating) query.append("rating", params.rating.toString());

  return api.get<ProductReviewsResponse>(`/reviews?${query.toString()}`);
}

/**
 * Tạo bài đánh giá sản phẩm từ đơn hàng đã nhận.
 */
export async function createReview(
  payload: CreateReviewPayload
): Promise<CreateReviewResponse> {
  return api.post<CreateReviewResponse>("/reviews", payload);
}

/**
 * Gửi heartbeat ping lên server để gia hạn TTL của WebSocket session (chống ghost sessions).
 * @param socketId - Socket ID nhận được từ kết nối socket.io
 */
export async function sendSocketHeartbeat(
  socketId: string
): Promise<SocketHeartbeatResponse> {
  return api.post<SocketHeartbeatResponse>("/chat/sessions/heartbeat", {
    socketId,
  });
}
