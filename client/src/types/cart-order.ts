import { OrderStatus, PaymentMethod, PaymentStatus } from './enums'; //[cite: 1, 2]
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
}

export interface Order {
  id: number;
  orderCode: string;
  userId: number;
  receiverName: string;
  receiverPhone: string;
  province: string;
  district: string;
  ward: string;
  detailAddress: string;
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
  paymentMethod: PaymentMethod; //[cite: 1, 2]
  paymentStatus: PaymentStatus; //[cite: 1, 2]
  status: OrderStatus; //[cite: 1, 2]
  customerNote?: string | null;
  orderDate: string;
  orderItems: OrderItem[];
  shipment?: any;
  paymentTransactions?: any[];
}

// Payload Thêm vào giỏ
export interface AddToCartPayload {
  variantId: number;
  quantity: number;
}

// Payload Cập nhật số lượng giỏ
export interface UpdateCartItemPayload {
  quantity: number;
}

// Payload Đặt hàng (Checkout)
export interface CreateOrderPayload {
  cartItemIds?: number[];
  shippingAddressId?: number;
  shippingAddress?: {
    receiverName: string;
    receiverPhone: string;
    province: string;
    district: string;
    ward: string;
    detailAddress: string;
  };
  paymentMethod: PaymentMethod; //[cite: 1, 2]
  shippingMethod?: string;
  customerNote?: string;
  voucherCode?: string;
  pointUsed?: number;
}

// Payload Admin đổi trạng thái đơn
export interface UpdateOrderStatusPayload {
  status: OrderStatus; //[cite: 1, 2]
}