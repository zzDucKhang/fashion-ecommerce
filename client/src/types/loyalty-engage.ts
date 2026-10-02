import { DiscountType, PointTransType } from './enums'; //[cite: 1, 2]
import { UserProfile } from './auth';
import { Product } from './catalog';

export interface FlashSaleItem {
  id: number;
  campaignId: number;
  variantId: number;
  flashSalePrice: number | string;
  promoQuantity: number;
  soldQuantity: number;
  variant?: any;
}

export interface FlashSaleCampaign {
  id: number;
  name: string;
  bannerUrl?: string | null;
  startTime: string;
  endTime: string;
  isActive: boolean;
  items?: FlashSaleItem[];
}

export interface Voucher {
  id: number;
  code: string;
  discountType: DiscountType; //[cite: 1, 2]
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

export interface PointTransaction {
  id: number;
  userId: number;
  orderId?: number | null;
  pointChange: number;
  currentPoint: number;
  transactionType: PointTransType; //[cite: 1, 2]
  description: string;
  createdAt: string;
}

export interface ProductReview {
  id: number;
  productId: number;
  userId: number;
  orderId?: number | null;
  rating: number; // 1-5
  content: string;
  shopReply?: string | null;
  updateCount: number;
  isHidden: boolean;
  createdAt: string;
  user?: UserProfile;
  product?: Product;
  medias?: Array<{
    id: number;
    mediaUrl: string;
    mediaType: string;
  }>;
}

export interface ChatMessage {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  attachmentUrl?: string | null;
  readAt?: string | null;
  createdAt: string;
}