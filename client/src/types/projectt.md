# Project Dump

**Root:** `C:\Programing\cnpm\fashion-ecom\client\src\types`

**Generated:** 2026-10-13 17:21:22.463490

**Files:** 10 | **Total size:** 13,721 bytes

---

# api.ts

| Property | Value |
|----------|-------|
| Path | `api.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.167167 |

```typescript

```

# auth.ts

| Property | Value |
|----------|-------|
| Path | `auth.ts` |
| Size | 1,872 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 13:50:18.218645 |

```typescript
import { UserStatus } from './enums'; //[cite: 1, 2]

export interface Permission {
  id: number;
  code: string;
  module: string;
  description?: string | null;
}

export interface Role {
  id: number;
  code: 'ADMIN' | 'STAFF' | 'CUSTOMER' | string; //[cite: 1, 2]
  name: string;
  isActive: boolean;
  permissions?: Permission[];
}

export interface UserProfile {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  avatarUrl?: string | null;
  rewardPoints: number;
  status: UserStatus; //[cite: 1, 2]
  roleId: number;
  role?: Role;
  createdAt: string;
}

export interface ShippingAddress {
  id: number;
  userId: number;
  receiverName: string;
  phoneNumber: string;
  province: string;
  district: string;
  ward: string;
  detailAddress: string;
  isDefault: boolean;
  createdAt?: string;
}

export interface DeviceSession {
  id: number;
  userId: number;
  refreshToken: string;
  ipAddress: string;
  isActive: boolean;
  expiresAt: string;
  createdAt: string;
}

// Payload DTO gửi lên Backend
export interface RegisterPayload {
  fullName: string;
  email: string;
  phoneNumber?: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface VerifyCodePayload {
  email: string;
  type: 'REGISTER' | 'FORGOT_PASSWORD'; //[cite: 1, 2]
  code: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface CreateAddressPayload {
  receiverName: string;
  phoneNumber: string;
  province: string;
  district: string;
  ward: string;
  detailAddress: string;
  isDefault?: boolean;
}
```

# cart-order.ts

| Property | Value |
|----------|-------|
| Path | `cart-order.ts` |
| Size | 2,440 bytes |
| Extension | `.ts` |
| Modified | 2026-10-13 16:58:16.039598 |

```typescript
import { OrderStatus, PaymentMethod, PaymentStatus } from './enums';
import { ProductVariant, Product } from './catalog';

export interface CartItem {
  id: number;
  cartId: number;
  variantId: number;
  quantity: number;
  variant: ProductVariant & {
    product: Product;
  };
}

export interface Cart {
  id: number;
  userId?: number | null;
  sessionId?: string | null;
  cartItems: CartItem[];
}

export interface OrderItem {
  id: number;
  orderId: number;
  variantId?: number | null;
  productName: string;
  skuCode: string;
  variantValue: string;
  productImageUrl?: string | null;
  unitPrice: number | string;
  quantity: number;
  productId?: number | null;
  productSlug?: string | null;
}

export interface Order {
  id: number;
  orderCode: string;
  userId: number;
  // Chuỗi địa chỉ snapshot chuẩn Backend Prisma
  shippingAddress: string;
  
  // Các trường parse mềm phục vụ hiển thị UI
  receiverName?: string;
  receiverPhone?: string;
  province?: string;
  district?: string;
  ward?: string;
  detailAddress?: string;

  subTotal: number | string;
  shippingFee: number | string;
  shippingMethod: string;
  shippingDiscount: number | string;
  voucherCode?: string | null;
  voucherDiscount: number | string;
  pointUsed: number;
  pointDiscount: number | string;
  pointEarned: number;
  totalAmount: number | string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  customerNote?: string | null;
  orderDate?: string;
  createdAt?: string;
  orderItems: OrderItem[];
  shipment?: unknown;
  paymentTransactions?: unknown[];
}

export interface AddToCartPayload {
  variantId: number;
  quantity: number;
}

export interface UpdateCartItemPayload {
  quantity: number;
}

export interface CreateOrderPayload {
  cartItemIds?: number[];
  shippingAddressId?: number;
  // Nhận dạng Object để backend tạo snapshot hoặc truyền string trực tiếp
  shippingAddress?: string | {
    receiverName: string;
    receiverPhone: string;
    province: string;
    district: string;
    ward: string;
    detailAddress: string;
  };
  paymentMethod: PaymentMethod;
  shippingMethod?: string;
  customerNote?: string;
  voucherCode?: string | null;
  pointUsed?: number;
}

export interface UpdateOrderStatusPayload {
  status: OrderStatus;
}
```

# catalog.ts

| Property | Value |
|----------|-------|
| Path | `catalog.ts` |
| Size | 1,966 bytes |
| Extension | `.ts` |
| Modified | 2026-10-09 10:38:13.174252 |

```typescript
import { ProductStatus } from './enums';

export interface Category {
  id: number;
  defaultName: string;
  iconUrl?: string | null;
  isVisible: boolean;
  parentId?: number | null;
  parent?: Category | null;
  children?: Category[];
}

export interface Brand {
  id: number;
  defaultName: string;
  logoUrl?: string | null;
}

export interface Tag {
  id: number;
  name: string;
}

export interface ProductVariant {
  id: number;
  productId: number;
  sku: string;
  stockQuantity: number;
  originalPrice: number | string;
  sellingPrice: number | string;
  weightGram: number;
  imageUrl?: string | null;
  // Đã phẳng hóa chuẩn Class Diagram & Prisma
  variant?: string | null;          // Ví dụ: "Màu sắc - Kích cỡ"
  variantValue?: string | null;     // Ví dụ: "Đen - XL"
  flashSaleItems?: Array<{
    id: number;
    flashSalePrice: number | string;
    promoQuantity: number;
    soldQuantity: number;
    campaign: {
      id: number;
      name: string;
      isActive: boolean;
      startTime: string;
      endTime: string;
    };
  }>;
}

export interface ProductImage {
  id: number;
  productId: number;
  imageUrl: string;
  displayOrder: number;
}

export interface Product {
  id: number;
  defaultName: string;
  thumbnailUrl?: string | null;
  status: ProductStatus;
  categoryId: number;
  brandId?: number | null;
  category?: Category;
  brand?: Brand | null;
  images?: ProductImage[];
  variants?: ProductVariant[];
  tags?: Tag[];
  createdAt: string;
  updatedAt?: string;
}

// Payload đồng bộ biến thể
export interface SyncVariantsPayload {
  productId: number;
  variants: Array<{
    id?: number | null;
    sku: string;
    originalPrice: number;
    sellingPrice: number;
    stockQuantity: number;
    weightGram: number;
    imageUrl?: string | null;
    variant?: string;
    variantValue?: string;
  }>;
}
```

# common.ts

| Property | Value |
|----------|-------|
| Path | `common.ts` |
| Size | 751 bytes |
| Extension | `.ts` |
| Modified | 2026-10-11 17:23:08.158690 |

```typescript
// Khung phản hồi API chuẩn từ Express server
export interface ApiResponse<T = any> {
  statusCode: number;
  message?: string;
  data: T;
  success?: boolean;
}

// Khung phân trang chuẩn (Pagination metadata)
export interface PaginatedResult<T> {
  data: T[];
  totalItems: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Tham số Query phân trang cơ sở
export interface BasePaginationQuery {
  page?: number;
  limit?: number;
  search?: string;
  lang?: string;
}

// Cấu trúc lỗi trả về từ Validation Pipe (Zod / Express errorFilter)
export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  errors?: Record<string, string[]>;
  stack?: string;
}
```

# enums.ts

| Property | Value |
|----------|-------|
| Path | `enums.ts` |
| Size | 1,620 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 13:49:50.550717 |

```typescript
// Trạng thái người dùng
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'BLOCKED'; //[cite: 1, 2]

// Loại mã xác thực OTP
export type VerificationCodeType = 'REGISTER' | 'FORGOT_PASSWORD' | 'LOGIN' | 'DISABLE_2FA'; //[cite: 1, 2]

// Trạng thái mở bán của sản phẩm
export type ProductStatus = 'DRAFT' | 'PUBLISHED' | 'OUT_OF_STOCK' | 'ARCHIVED'; //[cite: 1, 2]

// Loại biến động kho hàng
export type InventoryTransType = 'IMPORT' | 'EXPORT_ORDER' | 'RETURN_INBOUND' | 'ADJUSTMENT'; //[cite: 1, 2]

// Phương thức thanh toán được hỗ trợ
export type PaymentMethod = 'COD' | 'VNPAY' | 'MOMO' | 'BANK_TRANSFER'; //[cite: 1, 2]

// Trạng thái thanh toán của hóa đơn
export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED'; //[cite: 1, 2]

// Vòng đời trạng thái đơn hàng
export type OrderStatus = 
  | 'PENDING_PAYMENT' 
  | 'CONFIRMED' 
  | 'PROCESSING' 
  | 'SHIPPED' 
  | 'DELIVERED' 
  | 'CANCELLED' 
  | 'RETURNED'; //[cite: 1, 2]

// Tiến trình vận đơn của đối tác giao hàng
export type ShipmentStatus = 'PENDING' | 'PICKED_UP' | 'IN_TRANSIT' | 'DELIVERED' | 'FAILED'; //[cite: 1, 2]

// Trạng thái duyệt khiếu nại đổi trả
export type ReturnStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED'; //[cite: 1, 2]

// Cách thức giảm giá của Voucher
export type DiscountType = 'PERCENTAGE' | 'FIXED_AMOUNT'; //[cite: 1, 2]

// Biến động điểm thưởng thành viên
export type PointTransType = 'EARN' | 'REDEEM' | 'REFUND' | 'EXPIRE'; //[cite: 1, 2]
```

# fulfillment.ts

| Property | Value |
|----------|-------|
| Path | `fulfillment.ts` |
| Size | 1,713 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 13:51:16.158673 |

```typescript
import { ShipmentStatus, PaymentStatus, ReturnStatus } from './enums'; //[cite: 1, 2]
import { OrderItem } from './cart-order';

export interface Shipment {
  id: number;
  orderId: number;
  carrier: string;
  trackingCode: string;
  actualShippingFee: number | string;
  status: ShipmentStatus; //[cite: 1, 2]
  estimatedDelivery?: string | null;
  createdAt: string;
  order?: {
    orderCode: string;
    receiverName: string;
    receiverPhone: string;
  };
}

export interface PaymentTransaction {
  id: number;
  orderId: number;
  provider: string;
  providerTransId: string;
  amount: number | string;
  status: PaymentStatus; //[cite: 1, 2]
  createdAt: string;
  order?: {
    orderCode: string;
    totalAmount: number | string;
    paymentMethod: string;
  };
}

export interface ReturnMedia {
  id: number;
  returnRequestId: number;
  mediaUrl: string;
  mediaType: string;
}

export interface ReturnRequest {
  id: number;
  orderItemId: number;
  quantity: number;
  reason: string;
  description?: string | null;
  status: ReturnStatus; //[cite: 1, 2]
  createdAt: string;
  orderItem?: OrderItem;
  medias?: ReturnMedia[];
}

// Payload tạo đơn vận chuyển (Admin)
export interface CreateShipmentPayload {
  orderId: number;
  carrier: string;
  trackingCode: string;
  actualShippingFee: number;
  status?: ShipmentStatus; //[cite: 1, 2]
  estimatedDelivery?: string;
}

// Payload khách gửi yêu cầu hoàn trả
export interface CreateReturnPayload {
  orderItemId: number;
  quantity: number;
  reason: string;
  description?: string;
  medias?: Array<{
    mediaUrl: string;
    mediaType: string;
  }>;
}
```

# index.ts

| Property | Value |
|----------|-------|
| Path | `index.ts` |
| Size | 237 bytes |
| Extension | `.ts` |
| Modified | 2026-10-05 20:42:08.954906 |

```typescript
export * from './enums';
export * from './common';
export * from './auth';
export * from './catalog';
export * from './cart-order';
export * from './fulfillment';
export * from './loyalty-engage';
export * from './inventory-sale';
```

# inventory-sale.ts

| Property | Value |
|----------|-------|
| Path | `inventory-sale.ts` |
| Size | 1,364 bytes |
| Extension | `.ts` |
| Modified | 2026-10-05 20:42:08.956148 |

```typescript
import { BasePaginationQuery } from './common';

export interface FlashSaleItemVariant {
  sku: string;
  stockQuantity: number;
  originalPrice: number | string;
  sellingPrice: number | string;
  product?: {
    defaultName: string;
  };
}

export interface FlashSaleItem {
  id: number;
  campaignId: number;
  variantId: number;
  flashSalePrice: number | string;
  promoQuantity: number;
  soldQuantity: number;
  variant?: FlashSaleItemVariant;
}

export interface FlashSaleCampaign {
  id: number;
  name: string;
  bannerUrl?: string | null;
  startTime: string;
  endTime: string;
  isActive: boolean;
  items?: FlashSaleItem[];
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export interface FlashSaleItemPayload {
  variantId: number;
  flashSalePrice: number;
  promoQuantity: number;
}

export interface CreateFlashSaleInput {
  name: string;
  bannerUrl?: string;
  startTime: string | Date;
  endTime: string | Date;
  isActive?: boolean;
  items: FlashSaleItemPayload[];
}

export interface UpdateFlashSaleInput {
  name?: string;
  bannerUrl?: string;
  startTime?: string | Date;
  endTime?: string | Date;
  isActive?: boolean;
  items?: FlashSaleItemPayload[];
}

export interface GetFlashSaleQuery extends BasePaginationQuery {
  isActive?: boolean;
}

```

# loyalty-engage.ts

| Property | Value |
|----------|-------|
| Path | `loyalty-engage.ts` |
| Size | 1,758 bytes |
| Extension | `.ts` |
| Modified | 2026-10-11 16:52:36.590923 |

```typescript
import { DiscountType, PointTransType } from './enums';
import { UserProfile } from './auth';
import { Product } from './catalog';

export type { FlashSaleItem, FlashSaleCampaign } from './inventory-sale';

export interface Voucher {
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

export interface PointTransaction {
  id: number;
  userId: number;
  orderId?: number | null;
  pointChange: number;
  currentPoint: number;
  transactionType: PointTransType;
  description: string;
  createdAt: string;
}

export interface ProductReview {
  id: number;
  productId: number;
  userId: number;
  orderId?: number | null;
  rating: number;
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

// Khớp chuẩn model Chat & Message trong Prisma
export interface ChatSession {
  id: number;
  userId: number;
  status: 'OPEN' | 'WAITING' | 'CLOSED';
  startedAt: string;
  endedAt: string | null;
  createdAt: string;
  updatedAt: string;
  user?: Pick<UserProfile, 'id' | 'fullName' | 'avatarUrl'>;
  messages?: ChatMessage[];
}

export interface ChatMessage {
  id: number;
  chatId: number;
  senderId: number;
  content: string;
  isRead: boolean;
  sendDate: string;
  sender?: Pick<UserProfile, 'id' | 'fullName' | 'avatarUrl'>;
}
```

