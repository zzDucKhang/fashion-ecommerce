# Project Dump

**Root:** `C:\Programing\cnpm\fashion-ecom\client\src\api`

**Generated:** 2026-10-11 18:03:52.799898

**Files:** 8 | **Total size:** 15,837 bytes

---

# auth.api.ts

| Property | Value |
|----------|-------|
| Path | `auth.api.ts` |
| Size | 2,847 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 13:58:39.077677 |

```typescript
import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';
import {
  ApiResponse,
  LoginPayload,
  RegisterPayload,
  VerifyCodePayload,
  ResetPasswordPayload,
  ChangePasswordPayload,
  CreateAddressPayload,
  ShippingAddress,
  UserProfile,
} from '@/types';

export const authApi = {
  login: async (payload: LoginPayload) => {
    const res = await apiClient.post<ApiResponse<{ accessToken: string; refreshToken: string; user: UserProfile }>>(
      API_ENDPOINTS.IDENTITY.LOGIN,
      payload
    );
    return res.data;
  },

  register: async (payload: RegisterPayload) => {
    const res = await apiClient.post<ApiResponse<{ message: string }>>(
      API_ENDPOINTS.IDENTITY.REGISTER,
      payload
    );
    return res.data;
  },

  verifyCode: async (payload: VerifyCodePayload) => {
    const res = await apiClient.post<ApiResponse<{ message: string }>>(
      API_ENDPOINTS.IDENTITY.VERIFY_CODE,
      payload
    );
    return res.data;
  },

  forgotPassword: async (email: string) => {
    const res = await apiClient.post<ApiResponse<{ message: string }>>(
      API_ENDPOINTS.IDENTITY.FORGOT_PASSWORD,
      { email }
    );
    return res.data;
  },

  resetPassword: async (payload: ResetPasswordPayload) => {
    const res = await apiClient.post<ApiResponse<{ message: string }>>(
      API_ENDPOINTS.IDENTITY.RESET_PASSWORD,
      payload
    );
    return res.data;
  },

  changePassword: async (payload: ChangePasswordPayload) => {
    const res = await apiClient.post<ApiResponse<{ message: string }>>(
      API_ENDPOINTS.IDENTITY.CHANGE_PASSWORD,
      payload
    );
    return res.data;
  },

  logout: async (refreshToken: string) => {
    const res = await apiClient.post<ApiResponse<{ message: string }>>(
      API_ENDPOINTS.IDENTITY.LOGOUT,
      { refreshToken }
    );
    return res.data;
  },

  // Sổ địa chỉ
  getAddresses: async () => {
    const res = await apiClient.get<ApiResponse<ShippingAddress[]>>(
      API_ENDPOINTS.IDENTITY.ADDRESSES
    );
    return res.data;
  },

  createAddress: async (payload: CreateAddressPayload) => {
    const res = await apiClient.post<ApiResponse<ShippingAddress>>(
      API_ENDPOINTS.IDENTITY.ADDRESSES,
      payload
    );
    return res.data;
  },

  updateAddress: async (addressId: number, payload: Partial<CreateAddressPayload>) => {
    const res = await apiClient.put<ApiResponse<ShippingAddress>>(
      `${API_ENDPOINTS.IDENTITY.ADDRESSES}/${addressId}`,
      payload
    );
    return res.data;
  },

  deleteAddress: async (addressId: number) => {
    const res = await apiClient.delete<ApiResponse<{ message: string }>>(
      `${API_ENDPOINTS.IDENTITY.ADDRESSES}/${addressId}`
    );
    return res.data;
  },
};
```

# cart.api.ts

| Property | Value |
|----------|-------|
| Path | `cart.api.ts` |
| Size | 1,307 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 13:57:29.118371 |

```typescript
import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';
import { ApiResponse, Cart, AddToCartPayload, UpdateCartItemPayload } from '@/types';

export const cartApi = {
  getCart: async () => {
    const res = await apiClient.get<ApiResponse<Cart>>(API_ENDPOINTS.CART_ORDER.CART);
    return res.data;
  },

  addToCart: async (payload: AddToCartPayload) => {
    const res = await apiClient.post<ApiResponse<Cart>>(
      API_ENDPOINTS.CART_ORDER.CART_ITEMS,
      payload
    );
    return res.data;
  },

  updateCartItem: async (itemId: number, payload: UpdateCartItemPayload) => {
    const res = await apiClient.patch<ApiResponse<Cart>>(
      `${API_ENDPOINTS.CART_ORDER.CART_ITEMS}/${itemId}`,
      payload
    );
    return res.data;
  },

  removeCartItem: async (itemId: number) => {
    const res = await apiClient.delete<ApiResponse<Cart>>(
      `${API_ENDPOINTS.CART_ORDER.CART_ITEMS}/${itemId}`
    );
    return res.data;
  },

  clearCart: async () => {
    const res = await apiClient.delete<ApiResponse<Cart>>(API_ENDPOINTS.CART_ORDER.CART);
    return res.data;
  },

  mergeCart: async () => {
    const res = await apiClient.post<ApiResponse<Cart>>(API_ENDPOINTS.CART_ORDER.CART_MERGE);
    return res.data;
  },
};
```

# catalog.api.ts

| Property | Value |
|----------|-------|
| Path | `catalog.api.ts` |
| Size | 2,838 bytes |
| Extension | `.ts` |
| Modified | 2026-10-09 10:38:13.104371 |

```typescript
import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';
import {
  ApiResponse,
  PaginatedResult,
  Product,
  Category,
  Brand,
  Tag,
  ProductVariant,
  SyncVariantsPayload,
  BasePaginationQuery,
} from '@/types';

interface ProductQuery extends BasePaginationQuery {
  categoryId?: number;
  brandId?: number;
  status?: string;
}

export const catalogApi = {
  // Sản phẩm
  getProducts: async (query?: ProductQuery) => {
    const res = await apiClient.get<PaginatedResult<Product>>(API_ENDPOINTS.CATALOG.PRODUCTS, {
      params: query,
    });
    return res.data;
  },

  getProductById: async (productId: number) => {
    const res = await apiClient.get<ApiResponse<Product>>(
      `${API_ENDPOINTS.CATALOG.PRODUCTS}/${productId}`
    );
    return res.data;
  },

  createProduct: async (payload: any) => {
    const res = await apiClient.post<ApiResponse<Product>>(
      API_ENDPOINTS.CATALOG.PRODUCTS,
      payload
    );
    return res.data;
  },

  updateProduct: async (productId: number, payload: any) => {
    const res = await apiClient.put<ApiResponse<Product>>(
      `${API_ENDPOINTS.CATALOG.PRODUCTS}/${productId}`,
      payload
    );
    return res.data;
  },

  deleteProduct: async (productId: number) => {
    const res = await apiClient.delete<ApiResponse<{ message: string }>>(
      `${API_ENDPOINTS.CATALOG.PRODUCTS}/${productId}`
    );
    return res.data;
  },

  // Danh mục & Thương hiệu
  getCategories: async () => {
    const res = await apiClient.get<{ data: Category[]; totalItems: number }>(
      API_ENDPOINTS.CATALOG.CATEGORIES
    );
    return res.data;
  },

  getBrands: async (query?: BasePaginationQuery) => {
    const res = await apiClient.get<PaginatedResult<Brand>>(API_ENDPOINTS.CATALOG.BRANDS, {
      params: query,
    });
    return res.data;
  },

  getTags: async () => {
    const res = await apiClient.get<PaginatedResult<Tag>>(API_ENDPOINTS.CATALOG.TAGS);
    return res.data;
  },

  // Biến thể & Tồn kho
  getVariantsByProductId: async (productId: number) => {
    const res = await apiClient.get<ApiResponse<ProductVariant[]>>(
      `${API_ENDPOINTS.CATALOG.VARIANTS}/products/${productId}`
    );
    return res.data;
  },

  syncVariants: async (payload: SyncVariantsPayload) => {
    const res = await apiClient.post<ApiResponse<ProductVariant[]>>(
      `${API_ENDPOINTS.CATALOG.VARIANTS}/sync`,
      payload
    );
    return res.data;
  },

  updateVariantStock: async (variantId: number, quantityChange: number) => {
    const res = await apiClient.patch<ApiResponse<ProductVariant>>(
      `${API_ENDPOINTS.CATALOG.VARIANTS}/${variantId}/stock`,
      { quantityChange }
    );
    return res.data;
  },
};
```

# client.ts

| Property | Value |
|----------|-------|
| Path | `client.ts` |
| Size | 2,886 bytes |
| Extension | `.ts` |
| Modified | 2026-10-06 01:03:01.124523 |

```typescript
// src/api/client.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_ENDPOINTS } from './endpoints';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  // adapter: 'fetch',
  headers: {
    'Content-Type': 'application/json',
  },
});

const getClientCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
};

// 1. Request Interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken') || getClientCookie('accessToken');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      let sessionId = localStorage.getItem('sessionId');
      if (!sessionId) {
        sessionId = crypto.randomUUID();
        localStorage.setItem('sessionId', sessionId);
      }
      if (config.headers) {
        config.headers['x-session-id'] = sessionId;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 2. Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;

      if (!refreshToken) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${BASE_URL}${API_ENDPOINTS.IDENTITY.REFRESH}`, {
          refreshToken,
        });
        const newAccessToken = response.data.data.accessToken;

        localStorage.setItem('accessToken', newAccessToken);
        document.cookie = `accessToken=${newAccessToken}; path=/; max-age=3600`;

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return apiClient(originalRequest);
      } catch (err) {
        if (typeof window !== 'undefined') {
          localStorage.clear();
          window.location.href = '/login';
        }
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);
```

# endpoints.ts

| Property | Value |
|----------|-------|
| Path | `endpoints.ts` |
| Size | 1,679 bytes |
| Extension | `.ts` |
| Modified | 2026-10-11 16:52:36.367464 |

```typescript
export const API_ENDPOINTS = {
  IDENTITY: {
    LOGIN: '/identity/auth/login',
    REGISTER: '/identity/auth/register',
    REFRESH: '/identity/auth/refresh',
    VERIFY_CODE: '/identity/auth/verify-code',
    FORGOT_PASSWORD: '/identity/auth/forgot-password',
    RESET_PASSWORD: '/identity/auth/reset-password',
    CHANGE_PASSWORD: '/identity/auth/change-password',
    LOGOUT: '/identity/auth/logout',
    ADDRESSES: '/identity/addresses',
    USERS: '/identity/users',
    ROLES: '/identity/roles',
    PERMISSIONS: '/identity/roles/permissions',
  },
  CATALOG: {
    PRODUCTS: '/catalog/products',
    CATEGORIES: '/catalog/categories',
    BRANDS: '/catalog/brands',
    TAGS: '/catalog/tags',
    VARIANTS: '/catalog/variants',
  },
  CART_ORDER: {
    CART: '/cart-order/cart',
    CART_ITEMS: '/cart-order/cart/items',
    CART_MERGE: '/cart-order/cart/merge',
    ORDERS: '/cart-order/orders',
  },
  FULFILLMENT: {
    SHIPMENTS: '/fulfillment/shipments',
    PAYMENTS: '/fulfillment/payments',
    RETURNS: '/fulfillment/returns',
  },
  INVENTORY_SALE: {
    INVENTORY: '/inventory-sale/inventory',
    FLASH_SALES: '/inventory-sale/flash-sales',
  },
  LOYALTY_ENGAGE: {
    VOUCHERS: '/loyalty-engage/vouchers',
    POINTS: '/loyalty-engage/points',
    REVIEWS: '/loyalty-engage/reviews',
  },
  CHAT: {
    ACTIVE: '/loyalty-engage/chat/messages',
    HISTORY: '/loyalty-engage/chat/messages',
    SEND: '/loyalty-engage/chat/messages',
    READ: '/loyalty-engage/chat/messages/read',
    UNREAD: '/loyalty-engage/chat/messages/unread',
    CONVERSATIONS: '/loyalty-engage/chat/conversations',
  }
} as const;
```

# flash-sale.api.ts

| Property | Value |
|----------|-------|
| Path | `flash-sale.api.ts` |
| Size | 2,062 bytes |
| Extension | `.ts` |
| Modified | 2026-10-05 20:42:08.852981 |

```typescript
import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';
import {
  ApiResponse,
  PaginatedResult,
  FlashSaleCampaign,
  CreateFlashSaleInput,
  UpdateFlashSaleInput,
  GetFlashSaleQuery,
} from '@/types';

export const flashSaleApi = {
  // Lấy danh sách các chiến dịch Flash Sale đang hoạt động (cho khách hàng)
  getActiveCampaigns: async () => {
    const res = await apiClient.get<ApiResponse<FlashSaleCampaign[]>>(
      `${API_ENDPOINTS.INVENTORY_SALE.FLASH_SALES}/active`
    );
    return res.data;
  },

  // Lấy danh sách chiến dịch Flash Sale có phân trang / lọc
  getCampaigns: async (query?: GetFlashSaleQuery) => {
    const res = await apiClient.get<PaginatedResult<FlashSaleCampaign>>(
      API_ENDPOINTS.INVENTORY_SALE.FLASH_SALES,
      { params: query }
    );
    return res.data;
  },

  // Chi tiết chiến dịch Flash Sale theo ID
  getCampaignById: async (campaignId: number) => {
    const res = await apiClient.get<ApiResponse<FlashSaleCampaign>>(
      `${API_ENDPOINTS.INVENTORY_SALE.FLASH_SALES}/${campaignId}`
    );
    return res.data;
  },

  // [ADMIN] Tạo chiến dịch Flash Sale mới
  createCampaign: async (payload: CreateFlashSaleInput) => {
    const res = await apiClient.post<ApiResponse<FlashSaleCampaign>>(
      API_ENDPOINTS.INVENTORY_SALE.FLASH_SALES,
      payload
    );
    return res.data;
  },

  // [ADMIN] Cập nhật chiến dịch Flash Sale
  updateCampaign: async (campaignId: number, payload: UpdateFlashSaleInput) => {
    const res = await apiClient.put<ApiResponse<FlashSaleCampaign>>(
      `${API_ENDPOINTS.INVENTORY_SALE.FLASH_SALES}/${campaignId}`,
      payload
    );
    return res.data;
  },

  // [ADMIN] Xóa chiến dịch Flash Sale
  deleteCampaign: async (campaignId: number) => {
    const res = await apiClient.delete<ApiResponse<{ message: string }>>(
      `${API_ENDPOINTS.INVENTORY_SALE.FLASH_SALES}/${campaignId}`
    );
    return res.data;
  },
};

```

# index.ts

| Property | Value |
|----------|-------|
| Path | `index.ts` |
| Size | 210 bytes |
| Extension | `.ts` |
| Modified | 2026-10-05 20:42:08.854136 |

```typescript
export * from './endpoints';
export * from './client';
export * from './auth.api';
export * from './catalog.api';
export * from './cart.api';
export * from './order.api';
export * from './flash-sale.api';
```

# order.api.ts

| Property | Value |
|----------|-------|
| Path | `order.api.ts` |
| Size | 2,008 bytes |
| Extension | `.ts` |
| Modified | 2026-10-10 15:03:16.226655 |

```typescript
import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';
import {
  ApiResponse,
  PaginatedResult,
  Order,
  CreateOrderPayload,
  UpdateOrderStatusPayload,
  BasePaginationQuery,
} from '@/types';

interface OrderQuery extends BasePaginationQuery {
  status?: string;
  all?: boolean;
}

export const orderApi = {
  createOrder: async (payload: CreateOrderPayload) => {
    const res = await apiClient.post<ApiResponse<Order>>(
      API_ENDPOINTS.CART_ORDER.ORDERS,
      payload
    );
    return res.data;
  },

  getOrders: async (query?: OrderQuery) => {
    const res = await apiClient.get<ApiResponse<PaginatedResult<Order>>>(
      API_ENDPOINTS.CART_ORDER.ORDERS,
      { params: query }
    );
    return res.data;
  },

  getOrderById: async (orderId: number) => {
    const res = await apiClient.get<ApiResponse<Order>>(
      `${API_ENDPOINTS.CART_ORDER.ORDERS}/${orderId}`
    );
    return res.data;
  },

  cancelOrder: async (orderId: number) => {
    const res = await apiClient.post<ApiResponse<Order>>(
      `${API_ENDPOINTS.CART_ORDER.ORDERS}/${orderId}/cancel`
    );
    return res.data;
  },

  updateOrderStatus: async (orderId: number, payload: UpdateOrderStatusPayload) => {
    const res = await apiClient.patch<ApiResponse<Order>>(
      `${API_ENDPOINTS.CART_ORDER.ORDERS}/${orderId}/status`,
      payload
    );
    return res.data;
  },

  // THÊM API TẠO THANH TOÁN (QR CODE)
  createPayment: async (orderId: number) => {
    const res = await apiClient.post<ApiResponse<{ qrUrl: string; amount: number; transferContent: string; paymentId: string }>>(
      API_ENDPOINTS.FULFILLMENT.PAYMENTS,
      { orderId }
    );
    return res.data;
  },

  getPaymentDetails: async (orderId: number) => {
    const res = await apiClient.get<ApiResponse<{ qrUrl: string }>>(
      `${API_ENDPOINTS.CART_ORDER.ORDERS}/${orderId}/payment-details`
    );
    return res.data;
  },
};
```

