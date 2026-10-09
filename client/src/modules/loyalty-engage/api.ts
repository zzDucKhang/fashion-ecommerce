import { apiClient } from "@/api/client";
import { API_ENDPOINTS } from "@/api/endpoints";

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

export async function validateVoucher(
  code: string,
  orderTotal: number
): Promise<VoucherValidationResponse> {
  const res = await apiClient.post<VoucherValidationResponse>(`${API_ENDPOINTS.LOYALTY_ENGAGE.VOUCHERS}/validate`, {
    code: code.trim().toUpperCase(),
    orderTotal,
  });
  return res.data;
}

export async function getPointBalance(): Promise<PointBalanceResponse> {
  const res = await apiClient.get<PointBalanceResponse>(`${API_ENDPOINTS.LOYALTY_ENGAGE.POINTS}/balance`);
  return res.data;
}

export async function redeemPoints(
  orderId: number,
  pointsToRedeem: number
): Promise<RedeemPointsResponse> {
  const res = await apiClient.post<RedeemPointsResponse>(`${API_ENDPOINTS.LOYALTY_ENGAGE.POINTS}/redeem`, {
    orderId,
    pointsToRedeem,
  });
  return res.data;
}

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

  const res = await apiClient.get<ProductReviewsResponse>(`${API_ENDPOINTS.LOYALTY_ENGAGE.REVIEWS}?${query.toString()}`);
  return res.data;
}

export async function createReview(
  payload: CreateReviewPayload
): Promise<CreateReviewResponse> {
  const res = await apiClient.post<CreateReviewResponse>(API_ENDPOINTS.LOYALTY_ENGAGE.REVIEWS, payload);
  return res.data;
}

export async function sendSocketHeartbeat(
  socketId: string
): Promise<SocketHeartbeatResponse> {
  const res = await apiClient.post<SocketHeartbeatResponse>("/loyalty-engage/chat/sessions/heartbeat", {
    socketId,
  });
  return res.data;
}
