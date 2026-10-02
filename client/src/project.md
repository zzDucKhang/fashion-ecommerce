# Project Dump

**Root:** `C:\Programing\cnpm\fashion-ecom\client\src`

**Generated:** 2026-10-02 15:19:35.033685

**Files:** 153 | **Total size:** 142,616 bytes

---

# api\auth.api.ts

| Property | Value |
|----------|-------|
| Path | `api\auth.api.ts` |
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

# api\cart.api.ts

| Property | Value |
|----------|-------|
| Path | `api\cart.api.ts` |
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

# api\catalog.api.ts

| Property | Value |
|----------|-------|
| Path | `api\catalog.api.ts` |
| Size | 2,920 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 13:57:12.065782 |

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

  getProductById: async (productId: number, lang = 'vi') => {
    const res = await apiClient.get<ApiResponse<Product>>(
      `${API_ENDPOINTS.CATALOG.PRODUCTS}/${productId}`,
      { params: { lang } }
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
  getCategories: async (lang = 'vi') => {
    const res = await apiClient.get<{ data: Category[]; totalItems: number }>(
      API_ENDPOINTS.CATALOG.CATEGORIES,
      { params: { lang } }
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

# api\client.ts

| Property | Value |
|----------|-------|
| Path | `api\client.ts` |
| Size | 2,863 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 14:53:37.623419 |

```typescript
// src/api/client.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_ENDPOINTS } from './endpoints';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
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

# api\endpoints.ts

| Property | Value |
|----------|-------|
| Path | `api\endpoints.ts` |
| Size | 1,255 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 13:56:34.436060 |

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
} as const;
```

# api\index.ts

| Property | Value |
|----------|-------|
| Path | `api\index.ts` |
| Size | 175 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 13:57:57.282498 |

```typescript
export * from './endpoints';
export * from './client';
export * from './auth.api';
export * from './catalog.api';
export * from './cart.api';
export * from './order.api';
```

# api\order.api.ts

| Property | Value |
|----------|-------|
| Path | `api\order.api.ts` |
| Size | 1,454 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 14:03:05.883730 |

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
    const res = await apiClient.get<PaginatedResult<Order>>(
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

  // Dành riêng cho Admin
  updateOrderStatus: async (orderId: number, payload: UpdateOrderStatusPayload) => {
    const res = await apiClient.patch<ApiResponse<Order>>(
      `${API_ENDPOINTS.CART_ORDER.ORDERS}/${orderId}/status`,
      payload
    );
    return res.data;
  },
};
```

# app\(account)\addresses\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\(account)\addresses\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:34.992925 |

```tsx

```

# app\(account)\layout.tsx

| Property | Value |
|----------|-------|
| Path | `app\(account)\layout.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:32.877043 |

```tsx

```

# app\(account)\orders\[orderId]\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\(account)\orders\[orderId]\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:35.673574 |

```tsx

```

# app\(account)\orders\[orderId]\return\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\(account)\orders\[orderId]\return\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:35.705497 |

```tsx

```

# app\(account)\orders\[orderId]\review\[productId]\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\(account)\orders\[orderId]\review\[productId]\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:35.707495 |

```tsx

```

# app\(account)\orders\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\(account)\orders\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:35.427431 |

```tsx

```

# app\(account)\profile\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\(account)\profile\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:34.326909 |

```tsx

```

# app\(account)\security\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\(account)\security\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:35.761057 |

```tsx

```

# app\(auth)\forgot-password\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\(auth)\forgot-password\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:29.710050 |

```tsx

```

# app\(auth)\login\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\(auth)\login\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:29.672049 |

```tsx

```

# app\(auth)\register\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\(auth)\register\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:29.690479 |

```tsx

```

# app\(auth)\reset-password\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\(auth)\reset-password\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:29.717047 |

```tsx

```

# app\(shop)\cart\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\(shop)\cart\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:31.084895 |

```tsx

```

# app\(shop)\checkout\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\(shop)\checkout\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:31.490579 |

```tsx

```

# app\(shop)\flash-sale\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\(shop)\flash-sale\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:31.733702 |

```tsx

```

# app\(shop)\layout.tsx

| Property | Value |
|----------|-------|
| Path | `app\(shop)\layout.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:30.809399 |

```tsx

```

# app\(shop)\order-success\[orderCode]\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\(shop)\order-success\[orderCode]\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:31.618409 |

```tsx

```

# app\(shop)\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\(shop)\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:30.861115 |

```tsx

```

# app\(shop)\products\[productId]\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\(shop)\products\[productId]\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:30.940195 |

```tsx

```

# app\(shop)\products\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\(shop)\products\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:30.937019 |

```tsx

```

# app\admin\brands\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\admin\brands\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:37.288294 |

```tsx

```

# app\admin\categories\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\admin\categories\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:37.286297 |

```tsx

```

# app\admin\chat\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\admin\chat\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:43.847033 |

```tsx

```

# app\admin\dashboard\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\admin\dashboard\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:37.078335 |

```tsx

```

# app\admin\flash-sales\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\admin\flash-sales\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:37.804524 |

```tsx

```

# app\admin\inventory\import\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\admin\inventory\import\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:37.375046 |

```tsx

```

# app\admin\inventory\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\admin\inventory\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:37.337399 |

```tsx

```

# app\admin\layout.tsx

| Property | Value |
|----------|-------|
| Path | `app\admin\layout.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:37.075349 |

```tsx

```

# app\admin\orders\[orderId]\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\admin\orders\[orderId]\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:37.143519 |

```tsx

```

# app\admin\orders\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\admin\orders\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:37.128379 |

```tsx

```

# app\admin\payments\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\admin\payments\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:37.742314 |

```tsx

```

# app\admin\products\[productId]\edit\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\admin\products\[productId]\edit\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:37.226997 |

```tsx

```

# app\admin\products\[productId]\variants\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\admin\products\[productId]\variants\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:37.262203 |

```tsx

```

# app\admin\products\new\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\admin\products\new\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:37.224997 |

```tsx

```

# app\admin\products\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\admin\products\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:37.151522 |

```tsx

```

# app\admin\returns\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\admin\returns\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:37.711116 |

```tsx

```

# app\admin\reviews\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\admin\reviews\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:37.834844 |

```tsx

```

# app\admin\roles\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\admin\roles\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:37.825674 |

```tsx

```

# app\admin\shipments\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\admin\shipments\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:37.377678 |

```tsx

```

# app\admin\users\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\admin\users\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:37.819521 |

```tsx

```

# app\admin\vouchers\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\admin\vouchers\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:37.807409 |

```tsx

```

# app\favicon.ico

| Property | Value |
|----------|-------|
| Path | `app\favicon.ico` |
| Size | 25,931 bytes |
| Extension | `.ico` |
| Modified | 2026-09-29 13:25:28.291414 |

> **File nhị phân** (đã bỏ qua nội dung)

# app\globals.css

| Property | Value |
|----------|-------|
| Path | `app\globals.css` |
| Size | 948 bytes |
| Extension | `.css` |
| Modified | 2026-10-01 17:02:22.908285 |

```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');
@import 'tailwindcss';
@import 'tw-animate-css';
:root {
  --cream: #fbf9f4;
  --ink: #1d1f20;
  --lime: #84ea53;
  --line: #eae6df;
}
* {
  box-sizing: border-box;
}
html {
  background: var(--cream);
}
body {
  margin: 0;
  background: var(--cream);
  color: var(--ink);
  font-family: 'Inter', Arial, sans-serif;
}
a {
  color: inherit;
  text-decoration: none;
}
button,
input {
  font: inherit;
}
.font-display {
  font-family: 'Cormorant Garamond', Georgia, serif;
}
.eyebrow {
  color: #74736e;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}
.section-title {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  line-height: 0.9;
  letter-spacing: -0.035em;
}

```

# app\layout.tsx

| Property | Value |
|----------|-------|
| Path | `app\layout.tsx` |
| Size | 819 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:12:38.528389 |

```tsx
import type { Metadata } from 'next';
import { QueryProvider } from '@/components/providers/query-provider';
import { AuthProvider } from '@/components/providers/auth-provider';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fashion Store — Considered Goods',
  description: 'A curated edit of fashion and everyday objects.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body className="bg-[#FBF9F4] text-[#1D1F20] antialiased">
        <QueryProvider>
          <AuthProvider>
            {children}
            <Toaster position="top-right" richColors />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
```

# app\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\page.tsx` |
| Size | 4,570 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:12:52.431988 |

```tsx
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ChevronRight, Star } from 'lucide-react';
import { categories, products } from '@/modules/catalog/mock';
import { ProductCard } from '@/modules/catalog/components/product-card';

export default function Home() {
  return (
    <main>
      <section className="mx-auto max-w-[1440px] px-4 pb-6 pt-4 sm:px-8 lg:px-12">
        <div className="relative min-h-[500px] overflow-hidden rounded-2xl bg-[#1D1F20] px-7 py-10 text-white sm:px-12 sm:py-16 lg:px-20">
          <div className="absolute -right-10 top-0 h-full w-3/5 bg-[radial-gradient(circle_at_70%_35%,rgba(132,234,83,.5),transparent_34%),linear-gradient(120deg,transparent_10%,rgba(255,255,255,.05)_90%)] opacity-90" />
          <div className="relative z-10 max-w-xl">
            <p className="mb-6 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.23em] text-[#84EA53]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#84EA53]" /> The new
              essentials
            </p>
            <h1 className="font-display text-6xl leading-[.9] tracking-[-.04em] sm:text-8xl">
              Objects with a point of view.
            </h1>
            <p className="mt-7 max-w-md text-sm leading-6 text-white/65 sm:text-base">
              Thoughtful fashion and everyday pieces, chosen for the way they
              make a room, an outfit, or a day feel.
            </p>
            <Link
              href="/search"
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#84EA53] px-6 py-3.5 text-sm font-bold text-[#1D1F20] transition-transform hover:-translate-y-0.5"
            >
              Shop new arrivals <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="absolute bottom-8 right-8 hidden max-w-[190px] border-l border-white/20 pl-5 text-xs leading-5 text-white/55 lg:block">
            <Star size={15} fill="#84EA53" color="#84EA53" className="mb-3" />
            Curated goods for a considered life.
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-8 lg:px-12 lg:py-20">
        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="eyebrow">Browse the edit</p>
            <h2 className="section-title mt-2">Shop by feeling</h2>
          </div>
          <Link
            href="/search"
            className="hidden items-center gap-1 text-sm font-semibold sm:flex"
          >
            View all <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {categories.slice(0, 4).map((category) => (
            <Link
              key={category.name}
              href={`/search?category=${category.name}`}
              className="group relative min-h-[220px] overflow-hidden rounded-xl bg-white sm:min-h-[300px]"
            >
              <Image
                src={category.image}
                alt=""
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
              <div className="absolute bottom-5 left-5 text-white">
                <p className="font-display text-3xl">{category.name}</p>
                <p className="mt-1 text-xs text-white/70">
                  {category.count} pieces
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-[1440px] px-4 pb-20 sm:px-8 lg:px-12">
        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="eyebrow">Picked for you</p>
            <h2 className="section-title mt-2">The good stuff</h2>
          </div>
          <Link
            href="/search"
            className="flex items-center gap-1 text-sm font-semibold"
          >
            Explore edit <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}

```

# components\layouts\admin-sidebar.tsx

| Property | Value |
|----------|-------|
| Path | `components\layouts\admin-sidebar.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.089881 |

```tsx

```

# components\layouts\mobile-nav.tsx

| Property | Value |
|----------|-------|
| Path | `components\layouts\mobile-nav.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.090879 |

```tsx

```

# components\layouts\site-footer.tsx

| Property | Value |
|----------|-------|
| Path | `components\layouts\site-footer.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.091872 |

```tsx

```

# components\layouts\site-header.tsx

| Property | Value |
|----------|-------|
| Path | `components\layouts\site-header.tsx` |
| Size | 2,609 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.092869 |

```tsx
'use client';
import Link from 'next/link';
import { Search, ShoppingBag } from 'lucide-react';
import { categories } from '@/modules/catalog/mock';
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#EAE6DF] bg-[#FBF9F4]/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center gap-5 px-4 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="shrink-0 font-display text-3xl font-semibold tracking-[-.06em]"
        >
          common<span className="text-[#84EA53]">.</span>
        </Link>
        <div className="hidden h-11 max-w-[430px] flex-1 items-center rounded-full border border-[#EAE6DF] bg-white px-4 shadow-[0_5px_20px_rgba(29,31,32,.04)] sm:flex">
          <Search size={17} className="mr-3 text-[#74736e]" />
          <input
            aria-label="Search products"
            placeholder="Search for an object, a feeling..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-[#9b9991]"
          />
          <kbd className="rounded bg-[#FBF9F4] px-2 py-1 text-[10px] text-[#74736e]">
            ⌘ K
          </kbd>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/search"
            className="rounded-full p-2.5 hover:bg-white sm:hidden"
          >
            <Search size={20} />
          </Link>
          <Link
            href="/cart"
            className="relative rounded-full p-2.5 hover:bg-white"
          >
            <ShoppingBag size={20} />
            <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#84EA53] text-[9px] font-bold">
              2
            </span>
          </Link>
        </div>
      </div>
      <nav className="scrollbar-none mx-auto flex max-w-[1440px] gap-7 overflow-x-auto px-4 pb-3 sm:px-8 lg:px-12">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/search?category=${category.name}`}
            className="group flex min-w-fit flex-col items-center gap-1 text-[#74736e] transition-colors hover:text-[#1D1F20]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#EAE6DF] bg-white text-base group-hover:border-[#84EA53]">
              {category.icon}
            </span>
            <span className="text-[10px] font-medium">{category.name}</span>
          </Link>
        ))}
      </nav>
    </header>
  );
}

```

# components\providers\auth-provider.tsx

| Property | Value |
|----------|-------|
| Path | `components\providers\auth-provider.tsx` |
| Size | 2,838 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:08:10.767791 |

```tsx
'use client';

import React, { createContext, useContext, useSyncExternalStore } from 'react';
import { UserProfile } from '@/types';
import { cartApi } from '@/api/cart.api';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (accessToken: string, refreshToken: string, user: UserProfile) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Helper quản lý việc lắng nghe thay đổi của localStorage
function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('local-storage-change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('local-storage-change', callback);
  };
}

function getStoredUserSnapshot(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('user');
}

function getStoredUserServerSnapshot(): string | null {
  return null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Lấy dữ liệu user an toàn không qua useEffect đồng bộ
  const userString = useSyncExternalStore(
    subscribe,
    getStoredUserSnapshot,
    getStoredUserServerSnapshot
  );

  const user: UserProfile | null = React.useMemo(() => {
    if (!userString) return null;
    try {
      return JSON.parse(userString);
    } catch {
      return null;
    }
  }, [userString]);

  const login = async (accessToken: string, refreshToken: string, newUser: UserProfile) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    document.cookie = `accessToken=${accessToken}; path=/; max-age=3600`;

    // Thông báo cho useSyncExternalStore cập nhật tức thì
    window.dispatchEvent(new Event('local-storage-change'));

    try {
      await cartApi.mergeCart();
    } catch (err) {
      console.error('Merge cart failed:', err);
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    document.cookie = 'accessToken=; path=/; max-age=0';

    window.dispatchEvent(new Event('local-storage-change'));
    window.location.href = '/login';
  };

  const value = React.useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isAdmin: user?.role?.code === 'ADMIN',
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
```

# components\providers\query-provider.tsx

| Property | Value |
|----------|-------|
| Path | `components\providers\query-provider.tsx` |
| Size | 623 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 14:53:18.462067 |

```tsx
// src/components/providers/query-provider.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // Cache 1 phút
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
```

# components\providers\socket-provider.tsx

| Property | Value |
|----------|-------|
| Path | `components\providers\socket-provider.tsx` |
| Size | 1,619 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:08:20.910211 |

```tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    
    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000', {
      auth: { token },
      autoConnect: !!token,
    });

    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);

    socketInstance.on('connect', onConnect);
    socketInstance.on('disconnect', onDisconnect);

    // Gán socket qua callback bất đồng bộ để không kích hoạt cascading render warning
    const timer = setTimeout(() => {
      setSocket(socketInstance);
    }, 0);

    return () => {
      clearTimeout(timer);
      socketInstance.off('connect', onConnect);
      socketInstance.off('disconnect', onDisconnect);
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);
```

# components\ui\button.tsx

| Property | Value |
|----------|-------|
| Path | `components\ui\button.tsx` |
| Size | 3,294 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-01 17:02:22.915288 |

```tsx
import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/80',
        outline:
          'border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
        ghost:
          'hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50',
        destructive:
          'bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default:
          'h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: 'h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        icon: 'size-8',
        'icon-xs':
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        'icon-sm':
          'size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg',
        'icon-lg': 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };

```

# components\ui\card.tsx

| Property | Value |
|----------|-------|
| Path | `components\ui\card.tsx` |
| Size | 2,737 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-01 17:02:22.916285 |

```tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

function Card({
  className,
  size = 'default',
  ...props
}: React.ComponentProps<'div'> & { size?: 'default' | 'sm' }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        'group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl',
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        'group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)',
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        'font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm',
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('px-(--card-spacing)', className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        'flex items-center rounded-b-xl border-t bg-muted/50 p-(--card-spacing)',
        className,
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};

```

# components\ui\dialog.tsx

| Property | Value |
|----------|-------|
| Path | `components\ui\dialog.tsx` |
| Size | 4,237 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-01 17:02:22.918283 |

```tsx
'use client';

import * as React from 'react';
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        'fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0',
        className,
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean;
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          'fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <Button
                variant="ghost"
                className="absolute top-2 right-2"
                size="icon-sm"
              />
            }
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  );
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  showCloseButton?: boolean;
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        '-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end',
        className,
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close render={<Button variant="outline" />}>
          Close
        </DialogPrimitive.Close>
      )}
    </div>
  );
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        'font-heading text-base leading-none font-medium',
        className,
      )}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        'text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground',
        className,
      )}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};

```

# components\ui\dropdown-menu.tsx

| Property | Value |
|----------|-------|
| Path | `components\ui\dropdown-menu.tsx` |
| Size | 9,070 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-01 17:02:22.919284 |

```tsx
'use client';

import * as React from 'react';
import { Menu as MenuPrimitive } from '@base-ui/react/menu';
import { cn } from '@/lib/utils';
import { ChevronRightIcon, CheckIcon } from 'lucide-react';

function DropdownMenu({ ...props }: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuPortal({ ...props }: MenuPrimitive.Portal.Props) {
  return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />;
}

function DropdownMenuTrigger({ ...props }: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

function DropdownMenuContent({
  align = 'start',
  alignOffset = 0,
  side = 'bottom',
  sideOffset = 4,
  className,
  ...props
}: MenuPrimitive.Popup.Props &
  Pick<
    MenuPrimitive.Positioner.Props,
    'align' | 'alignOffset' | 'side' | 'sideOffset'
  >) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className="isolate z-50 outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={cn(
            'z-50 max-h-(--available-height) w-(--anchor-width) min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95',
            className,
          )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

function DropdownMenuGroup({ ...props }: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />;
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: MenuPrimitive.GroupLabel.Props & {
  inset?: boolean;
}) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        'px-1.5 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7',
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuItem({
  className,
  inset,
  variant = 'default',
  ...props
}: MenuPrimitive.Item.Props & {
  inset?: boolean;
  variant?: 'default' | 'destructive';
}) {
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "group/dropdown-menu-item relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuSub({ ...props }: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />;
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: MenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean;
}) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-popup-open:bg-accent data-popup-open:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto" />
    </MenuPrimitive.SubmenuTrigger>
  );
}

function DropdownMenuSubContent({
  align = 'start',
  alignOffset = -3,
  side = 'right',
  sideOffset = 0,
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
  return (
    <DropdownMenuContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        'w-auto min-w-[96px] rounded-lg bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/10 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
        className,
      )}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  );
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: MenuPrimitive.CheckboxItem.Props & {
  inset?: boolean;
}) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      checked={checked}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
        <MenuPrimitive.CheckboxItemIndicator>
          <CheckIcon />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  );
}

function DropdownMenuRadioGroup({ ...props }: MenuPrimitive.RadioGroup.Props) {
  return (
    <MenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  );
}

function DropdownMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: MenuPrimitive.RadioItem.Props & {
  inset?: boolean;
}) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-radio-item-indicator"
      >
        <MenuPrimitive.RadioItemIndicator>
          <CheckIcon />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn('-mx-1 my-1 h-px bg-border', className)}
      {...props}
    />
  );
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        'ml-auto text-xs tracking-widest text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground',
        className,
      )}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};

```

# components\ui\form-field.tsx

| Property | Value |
|----------|-------|
| Path | `components\ui\form-field.tsx` |
| Size | 1,191 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 14:54:46.911571 |

```tsx
// src/components/ui/form-field.tsx
import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
}

export function FormField<T extends FieldValues>({
  control,
  name,
  label,
  type = 'text',
  placeholder,
  error,
}: FormFieldProps<T>) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type={type}
            placeholder={placeholder}
            className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition focus:border-neutral-900 ${
              error ? 'border-red-500 bg-red-50/20' : 'border-[#EAE6DF] bg-white'
            }`}
          />
        )}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
```

# components\ui\input.tsx

| Property | Value |
|----------|-------|
| Path | `components\ui\input.tsx` |
| Size | 1,055 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-01 17:02:22.920283 |

```tsx
import * as React from 'react';
import { Input as InputPrimitive } from '@base-ui/react/input';
import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        'h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
        className,
      )}
      {...props}
    />
  );
}

export { Input };

```

# components\ui\pagination.tsx

| Property | Value |
|----------|-------|
| Path | `components\ui\pagination.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.097967 |

```tsx

```

# components\ui\select.tsx

| Property | Value |
|----------|-------|
| Path | `components\ui\select.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.098958 |

```tsx

```

# components\ui\table.tsx

| Property | Value |
|----------|-------|
| Path | `components\ui\table.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.099869 |

```tsx

```

# components\ui\textarea.tsx

| Property | Value |
|----------|-------|
| Path | `components\ui\textarea.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.100870 |

```tsx

```

# lib\api\client.ts

| Property | Value |
|----------|-------|
| Path | `lib\api\client.ts` |
| Size | 34 bytes |
| Extension | `.ts` |
| Modified | 2026-10-01 17:02:22.921283 |

```typescript
export { api } from './request';

```

# lib\api\request.ts

| Property | Value |
|----------|-------|
| Path | `lib\api\request.ts` |
| Size | 1,182 bytes |
| Extension | `.ts` |
| Modified | 2026-10-01 17:02:22.922283 |

```typescript
const API_URL = process.env.BACKEND_URL;

if (!API_URL) {
  throw new Error('BACKEND_URL is not defined');
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}

export const api = {
  get<T>(path: string, options?: RequestInit) {
    return request<T>(path, {
      ...options,
      method: 'GET',
    });
  },

  post<T>(path: string, body?: unknown, options?: RequestInit) {
    return request<T>(path, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  },

  put<T>(path: string, body?: unknown, options?: RequestInit) {
    return request<T>(path, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  },

  delete<T>(path: string, options?: RequestInit) {
    return request<T>(path, {
      ...options,
      method: 'DELETE',
    });
  },
};

```

# lib\auth\permissions.ts

| Property | Value |
|----------|-------|
| Path | `lib\auth\permissions.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.102878 |

```typescript

```

# lib\auth\session.ts

| Property | Value |
|----------|-------|
| Path | `lib\auth\session.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.103916 |

```typescript

```

# lib\constants\index.ts

| Property | Value |
|----------|-------|
| Path | `lib\constants\index.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.104867 |

```typescript

```

# lib\stores\ui.store.ts

| Property | Value |
|----------|-------|
| Path | `lib\stores\ui.store.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.106873 |

```typescript

```

# lib\utils\cn.ts

| Property | Value |
|----------|-------|
| Path | `lib\utils\cn.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.108042 |

```typescript

```

# lib\utils\format-currency.ts

| Property | Value |
|----------|-------|
| Path | `lib\utils\format-currency.ts` |
| Size | 318 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 14:57:53.835239 |

```typescript
export function formatCurrency(amount: number | string | undefined | null): string {
  if (amount === undefined || amount === null) return '0 ₫';
  const val = typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
}
```

# lib\utils\format-date.ts

| Property | Value |
|----------|-------|
| Path | `lib\utils\format-date.ts` |
| Size | 289 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 14:58:01.799987 |

```typescript
import { format, parseISO } from 'date-fns';

export function formatDate(dateString: string | undefined | null, pattern = 'dd/MM/yyyy HH:mm'): string {
  if (!dateString) return '';
  try {
    return format(parseISO(dateString), pattern);
  } catch {
    return dateString;
  }
}
```

# lib\utils.ts

| Property | Value |
|----------|-------|
| Path | `lib\utils.ts` |
| Size | 173 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 15:13:38.639202 |

```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

# middleware.ts

| Property | Value |
|----------|-------|
| Path | `middleware.ts` |
| Size | 1,101 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 14:57:30.080911 |

```typescript
// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value || request.headers.get('authorization');
  const { pathname } = request.nextUrl;

  // 1. Bảo vệ các trang yêu cầu đăng nhập (/checkout, /account/*)
  const isProtectedUserRoute = pathname.startsWith('/checkout') || pathname.startsWith('/account');
  if (isProtectedUserRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirectUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Bảo vệ khu vực Admin (/admin/*)
  if (pathname.startsWith('/admin')) {
    // Với Admin có thể giải mã token hoặc đối chiếu cookie role
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/checkout/:path*', '/account/:path*', '/admin/:path*'],
};
```

# modules\admin\api.ts

| Property | Value |
|----------|-------|
| Path | `modules\admin\api.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.110882 |

```typescript

```

# modules\admin\components\dashboard-card.tsx

| Property | Value |
|----------|-------|
| Path | `modules\admin\components\dashboard-card.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.112867 |

```tsx

```

# modules\admin\components\data-table.tsx

| Property | Value |
|----------|-------|
| Path | `modules\admin\components\data-table.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.113162 |

```tsx

```

# modules\admin\components\sidebar.tsx

| Property | Value |
|----------|-------|
| Path | `modules\admin\components\sidebar.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.113868 |

```tsx

```

# modules\admin\types.ts

| Property | Value |
|----------|-------|
| Path | `modules\admin\types.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.114872 |

```typescript

```

# modules\auth\api.ts

| Property | Value |
|----------|-------|
| Path | `modules\auth\api.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-09-29 13:25:28.315292 |

```typescript

```

# modules\auth\components\forgot-password-form.tsx

| Property | Value |
|----------|-------|
| Path | `modules\auth\components\forgot-password-form.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.116395 |

```tsx

```

# modules\auth\components\login-form.tsx

| Property | Value |
|----------|-------|
| Path | `modules\auth\components\login-form.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.116879 |

```tsx

```

# modules\auth\components\register-form.tsx

| Property | Value |
|----------|-------|
| Path | `modules\auth\components\register-form.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.117962 |

```tsx

```

# modules\auth\hooks\use-auth.ts

| Property | Value |
|----------|-------|
| Path | `modules\auth\hooks\use-auth.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.119870 |

```typescript

```

# modules\auth\schemas.ts

| Property | Value |
|----------|-------|
| Path | `modules\auth\schemas.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.120867 |

```typescript

```

# modules\auth\types.ts

| Property | Value |
|----------|-------|
| Path | `modules\auth\types.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-09-29 13:25:28.315292 |

```typescript

```

# modules\cart\api.ts

| Property | Value |
|----------|-------|
| Path | `modules\cart\api.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.121869 |

```typescript

```

# modules\cart\components\cart-item.tsx

| Property | Value |
|----------|-------|
| Path | `modules\cart\components\cart-item.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.123147 |

```tsx

```

# modules\cart\components\cart-summary.tsx

| Property | Value |
|----------|-------|
| Path | `modules\cart\components\cart-summary.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.123867 |

```tsx

```

# modules\cart\components\cart-view.tsx

| Property | Value |
|----------|-------|
| Path | `modules\cart\components\cart-view.tsx` |
| Size | 4,951 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.125284 |

```tsx
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { products } from '@/modules/catalog/mock';
const initial = [
  { product: products[0], quantity: 1, variant: 'M / Natural' },
  { product: products[3], quantity: 2, variant: 'One size / Sand' },
];
export function CartView() {
  const [items, setItems] = useState(initial);
  const update = (index: number, delta: number) =>
    setItems(
      items.map((item, i) =>
        i === index
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  return (
    <main className="mx-auto max-w-[1180px] px-4 py-10 sm:px-8 lg:py-16">
      <div className="mb-10">
        <p className="eyebrow">Your selection</p>
        <h1 className="section-title mt-2">The bag</h1>
        <p className="mt-3 text-sm text-[#74736e]">
          {items.length} items · Ready when you are.
        </p>
      </div>
      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="divide-y divide-[#EAE6DF] rounded-2xl bg-white px-5">
          {items.map((item, index) => (
            <div key={item.product.slug} className="flex gap-4 py-5">
              <div className="relative h-32 w-28 shrink-0 overflow-hidden rounded-xl bg-[#e9e5dc]">
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">{item.product.name}</p>
                    <p className="mt-1 text-xs text-[#74736e]">
                      {item.product.brand}
                    </p>
                    <p className="mt-2 text-xs text-[#74736e]">
                      {item.variant}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setItems(items.filter((_, i) => i !== index))
                    }
                    aria-label="Remove item"
                    className="h-fit text-[#9b9991]"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center rounded-lg border border-[#EAE6DF]">
                    <button
                      onClick={() => update(index, -1)}
                      className="p-2"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-5 text-center text-xs">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => update(index, 1)}
                      className="p-2"
                      aria-label="Increase quantity"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <span className="text-sm font-bold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <aside className="h-fit rounded-2xl bg-white p-6 lg:sticky lg:top-36">
          <h2 className="font-display text-3xl">Summary</h2>
          <div className="mt-7 space-y-3 border-b border-[#EAE6DF] pb-5 text-sm">
            <div className="flex justify-between">
              <span className="text-[#74736e]">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#74736e]">Shipping</span>
              <span>Free</span>
            </div>
          </div>
          <div className="flex justify-between py-5 text-base font-bold">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <Link
            href="/checkout"
            className="block rounded-xl bg-[#84EA53] py-3.5 text-center text-sm font-bold"
          >
            Continue to checkout
          </Link>
          <p className="mt-4 text-center text-[11px] text-[#74736e]">
            Free shipping on orders over $100
          </p>
        </aside>
      </div>
    </main>
  );
}

```

# modules\cart\hooks\use-cart.ts

| Property | Value |
|----------|-------|
| Path | `modules\cart\hooks\use-cart.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.126049 |

```typescript

```

# modules\cart\store.ts

| Property | Value |
|----------|-------|
| Path | `modules\cart\store.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.126868 |

```typescript

```

# modules\cart\types.ts

| Property | Value |
|----------|-------|
| Path | `modules\cart\types.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.126948 |

```typescript

```

# modules\catalog\api.ts

| Property | Value |
|----------|-------|
| Path | `modules\catalog\api.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.127867 |

```typescript

```

# modules\catalog\components\cart-view.tsx

| Property | Value |
|----------|-------|
| Path | `modules\catalog\components\cart-view.tsx` |
| Size | 4,951 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-01 17:02:22.924283 |

```tsx
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { products } from '@/modules/catalog/data';
const initial = [
  { product: products[0], quantity: 1, variant: 'M / Natural' },
  { product: products[3], quantity: 2, variant: 'One size / Sand' },
];
export function CartView() {
  const [items, setItems] = useState(initial);
  const update = (index: number, delta: number) =>
    setItems(
      items.map((item, i) =>
        i === index
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  return (
    <main className="mx-auto max-w-[1180px] px-4 py-10 sm:px-8 lg:py-16">
      <div className="mb-10">
        <p className="eyebrow">Your selection</p>
        <h1 className="section-title mt-2">The bag</h1>
        <p className="mt-3 text-sm text-[#74736e]">
          {items.length} items · Ready when you are.
        </p>
      </div>
      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="divide-y divide-[#EAE6DF] rounded-2xl bg-white px-5">
          {items.map((item, index) => (
            <div key={item.product.slug} className="flex gap-4 py-5">
              <div className="relative h-32 w-28 shrink-0 overflow-hidden rounded-xl bg-[#e9e5dc]">
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">{item.product.name}</p>
                    <p className="mt-1 text-xs text-[#74736e]">
                      {item.product.brand}
                    </p>
                    <p className="mt-2 text-xs text-[#74736e]">
                      {item.variant}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setItems(items.filter((_, i) => i !== index))
                    }
                    aria-label="Remove item"
                    className="h-fit text-[#9b9991]"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center rounded-lg border border-[#EAE6DF]">
                    <button
                      onClick={() => update(index, -1)}
                      className="p-2"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-5 text-center text-xs">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => update(index, 1)}
                      className="p-2"
                      aria-label="Increase quantity"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <span className="text-sm font-bold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <aside className="h-fit rounded-2xl bg-white p-6 lg:sticky lg:top-36">
          <h2 className="font-display text-3xl">Summary</h2>
          <div className="mt-7 space-y-3 border-b border-[#EAE6DF] pb-5 text-sm">
            <div className="flex justify-between">
              <span className="text-[#74736e]">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#74736e]">Shipping</span>
              <span>Free</span>
            </div>
          </div>
          <div className="flex justify-between py-5 text-base font-bold">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <Link
            href="/checkout"
            className="block rounded-xl bg-[#84EA53] py-3.5 text-center text-sm font-bold"
          >
            Continue to checkout
          </Link>
          <p className="mt-4 text-center text-[11px] text-[#74736e]">
            Free shipping on orders over $100
          </p>
        </aside>
      </div>
    </main>
  );
}

```

# modules\catalog\components\checkout-view.tsx

| Property | Value |
|----------|-------|
| Path | `modules\catalog\components\checkout-view.tsx` |
| Size | 4,664 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-01 17:02:22.925283 |

```tsx
'use client';
import Link from 'next/link';
import { ArrowLeft, Check, Lock } from 'lucide-react';
import { useState } from 'react';
export function CheckoutView() {
  const [step, setStep] = useState(1);
  return (
    <main className="mx-auto max-w-[1180px] px-4 py-10 sm:px-8 lg:py-16">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="eyebrow">Almost yours</p>
          <h1 className="section-title mt-2">Checkout</h1>
        </div>
        <Link
          href="/cart"
          className="flex items-center gap-1 text-xs text-[#74736e]"
        >
          <ArrowLeft size={14} /> Back to bag
        </Link>
      </div>
      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <section
            className={`rounded-2xl bg-white p-6 ${step === 1 ? 'ring-1 ring-[#84EA53]' : ''}`}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-3xl">01 · Shipping</h2>
              {step > 1 && <Check size={18} color="#61bc39" />}
            </div>
            {step === 1 && (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <input
                  placeholder="First name"
                  className="rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
                />
                <input
                  placeholder="Last name"
                  className="rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
                />
                <input
                  placeholder="Address"
                  className="rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53] sm:col-span-2"
                />
                <input
                  placeholder="City"
                  className="rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
                />
                <input
                  placeholder="Postal code"
                  className="rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
                />
                <button
                  onClick={() => setStep(2)}
                  className="rounded-xl bg-[#1D1F20] py-3 text-sm font-bold text-white sm:col-span-2"
                >
                  Continue to payment
                </button>
              </div>
            )}
          </section>
          <section
            className={`rounded-2xl bg-white p-6 ${step === 2 ? 'ring-1 ring-[#84EA53]' : 'opacity-60'}`}
          >
            <h2 className="font-display text-3xl">02 · Payment</h2>
            {step === 2 && (
              <div className="mt-6 space-y-4">
                <input
                  placeholder="Card number"
                  className="w-full rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    placeholder="MM / YY"
                    className="rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
                  />
                  <input
                    placeholder="CVC"
                    className="rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
                  />
                </div>
                <button
                  onClick={() => setStep(3)}
                  className="w-full rounded-xl bg-[#84EA53] py-3.5 text-sm font-bold"
                >
                  Place order · $260.00
                </button>
              </div>
            )}
          </section>
        </div>
        <aside className="h-fit rounded-2xl bg-[#1D1F20] p-6 text-white lg:sticky lg:top-36">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Lock size={15} color="#84EA53" /> Secure checkout
          </div>
          <p className="mt-6 text-xs leading-5 text-white/55">
            Your payment details are encrypted and never stored. This is a demo
            checkout with no backend connection.
          </p>
          <div className="mt-8 flex justify-between border-t border-white/15 pt-5 text-sm">
            <span className="text-white/55">Total</span>
            <strong>$260.00</strong>
          </div>
        </aside>
      </div>
    </main>
  );
}

```

# modules\catalog\components\filter-sidebar.tsx

| Property | Value |
|----------|-------|
| Path | `modules\catalog\components\filter-sidebar.tsx` |
| Size | 5,920 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-01 17:02:22.926284 |

```tsx
'use client';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';
export function FilterSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState('Category');
  return (
    <aside
      className={`${open ? 'translate-x-0 opacity-100' : 'pointer-events-none -translate-x-5 opacity-0'} fixed inset-y-0 left-0 z-50 w-[min(360px,88vw)] overflow-y-auto border-r border-[#EAE6DF] bg-white p-6 shadow-[10px_0_40px_rgba(29,31,32,.08)] transition-all duration-300 lg:absolute lg:top-0 lg:h-full lg:shadow-none`}
    >
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} />
          <h2 className="font-display text-3xl">Filters</h2>
        </div>
        <button
          onClick={onClose}
          aria-label="Close filters"
          className="rounded-full p-2 hover:bg-[#FBF9F4]"
        >
          <X size={18} />
        </button>
      </div>
      <div className="divide-y divide-[#EAE6DF]">
        {['Category', 'Brand', 'Size', 'Color'].map((name) => (
          <div key={name} className="py-5 first:pt-0">
            <button
              onClick={() => setExpanded(expanded === name ? '' : name)}
              className="flex w-full items-center justify-between text-sm font-bold"
            >
              {name}
              <ChevronDown
                size={16}
                className={
                  expanded === name ? 'rotate-180 transition' : 'transition'
                }
              />
            </button>
            {expanded === name && (
              <div className="mt-4 space-y-3 text-sm text-[#74736e]">
                {name === 'Category' && (
                  <>
                    <label className="flex justify-between">
                      <span>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="mr-3 accent-[#84EA53]"
                        />
                        All products
                      </span>
                      <span>160</span>
                    </label>
                    <label className="ml-4 flex justify-between">
                      <span>
                        <input
                          type="checkbox"
                          className="mr-3 accent-[#84EA53]"
                        />
                        Apparel
                      </span>
                      <span>48</span>
                    </label>
                    <label className="ml-4 flex justify-between">
                      <span>
                        <input
                          type="checkbox"
                          className="mr-3 accent-[#84EA53]"
                        />
                        Objects
                      </span>
                      <span>32</span>
                    </label>
                  </>
                )}
                {name === 'Brand' &&
                  [
                    'Morrow Studio',
                    'Form & Field',
                    'House of Common',
                    'Sunday Objects',
                  ].map((brand, i) => (
                    <label key={brand} className="flex justify-between">
                      <span>
                        <input
                          type="checkbox"
                          className="mr-3 accent-[#84EA53]"
                        />
                        {brand}
                      </span>
                      <span>{[14, 9, 12, 7][i]}</span>
                    </label>
                  ))}
                {name === 'Size' && (
                  <div className="flex flex-wrap gap-2">
                    {['XS', 'S', 'M', 'L', '28', '30', '32', 'One size'].map(
                      (size) => (
                        <button
                          key={size}
                          className="rounded-lg border border-[#EAE6DF] px-3 py-2 text-xs hover:border-[#84EA53]"
                        >
                          {size}
                        </button>
                      ),
                    )}
                  </div>
                )}
                {name === 'Color' && (
                  <div className="flex flex-wrap gap-4">
                    {[
                      '#1D1F20',
                      '#ded5c8',
                      '#b8794b',
                      '#8d9a87',
                      '#d8c5ac',
                      '#e1e1dc',
                    ].map((color) => (
                      <button
                        key={color}
                        aria-label={`Color ${color}`}
                        className="h-7 w-7 rounded-full border-2 border-white outline outline-1 outline-[#EAE6DF]"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        <div className="py-5">
          <p className="mb-5 text-sm font-bold">Price range</p>
          <input
            type="range"
            min="0"
            max="500"
            defaultValue="280"
            className="w-full accent-[#84EA53]"
          />
          <div className="mt-3 flex justify-between text-xs text-[#74736e]">
            <span>$0</span>
            <span>$500+</span>
          </div>
        </div>
      </div>
      <button
        onClick={onClose}
        className="mt-8 w-full rounded-xl bg-[#84EA53] py-3 text-sm font-bold"
      >
        Show 160 results
      </button>
    </aside>
  );
}

```

# modules\catalog\components\product-card.tsx

| Property | Value |
|----------|-------|
| Path | `modules\catalog\components\product-card.tsx` |
| Size | 3,429 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:16:30.941765 |

```tsx
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Heart, Star } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '@/modules/catalog/mock';

export function ProductCard({ product }: { product: Product }) {
  const [index, setIndex] = useState(0);
  return (
    <article className="group min-w-0">
      <div className="relative overflow-hidden rounded-xl bg-[#e9e5dc]">
        <Link href={`/products/${product.slug}`}>
          <div className="relative aspect-[.88] w-full">
            <Image
              src={product.images[index]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
        </Link>
        {product.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-[#84EA53] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#1D1F20]">
            {product.tag}
          </span>
        )}
        <button
          aria-label="Save product"
          className="absolute right-3 top-3 rounded-full bg-white/85 p-2 backdrop-blur transition hover:bg-white"
        >
          <Heart size={15} />
        </button>
        {product.images.length > 1 && (
          <>
            <button
              aria-label="Previous image"
              onClick={() =>
                setIndex(index === 0 ? product.images.length - 1 : index - 1)
              }
              className="absolute left-2 top-1/2 rounded-full bg-white/85 p-1.5 opacity-0 transition group-hover:opacity-100"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              aria-label="Next image"
              onClick={() => setIndex((index + 1) % product.images.length)}
              className="absolute right-2 top-1/2 rounded-full bg-white/85 p-1.5 opacity-0 transition group-hover:opacity-100"
            >
              <ChevronRight size={15} />
            </button>
          </>
        )}
      </div>
      <div className="px-0.5 pt-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate text-sm font-semibold">{product.name}</h3>
          <span className="flex shrink-0 items-center gap-1 text-xs">
            <Star size={11} fill="#1D1F20" /> {product.rating}
          </span>
        </div>
        <p className="mt-1 text-xs text-[#74736e]">
          {product.brand} · {product.reviews} reviews
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm font-bold">
            ${product.flashSalePrice ?? product.price}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-[#9b9991] line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
        <div className="mt-2 flex gap-1.5">
          {product.colors.map((color) => (
            <span
              key={color}
              className="h-3 w-3 rounded-full border border-black/10"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
```

# modules\catalog\components\product-detail.tsx

| Property | Value |
|----------|-------|
| Path | `modules\catalog\components\product-detail.tsx` |
| Size | 6,828 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:18:12.529617 |

```tsx
'use client';
import Image from 'next/image';
import Link from 'next/link';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  Star,
} from 'lucide-react';
import { useState } from 'react';
import type { Product } from '@/modules/catalog/mock';
export function ProductDetail({ product }: { product: Product }) {
  const [image, setImage] = useState(0);
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  return (
    <main className="mx-auto max-w-[1280px] px-4 py-6 sm:px-8 lg:py-12">
      <Link
        href="/search"
        className="mb-6 inline-flex items-center gap-1 text-xs text-[#74736e]"
      >
        <ChevronLeft size={14} /> Back to edit
      </Link>
      <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
        <div>
          <div className="relative aspect-[.95] overflow-hidden rounded-2xl bg-white">
            <Image
              src={product.images[image]}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
            <button
              onClick={() =>
                setImage(image === 0 ? product.images.length - 1 : image - 1)
              }
              aria-label="Previous product image"
              className="absolute left-4 top-1/2 rounded-full bg-white/90 p-2"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setImage((image + 1) % product.images.length)}
              aria-label="Next product image"
              className="absolute right-4 top-1/2 rounded-full bg-white/90 p-2"
            >
              <ChevronRight size={18} />
            </button>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {product.images.map((src, index) => (
              <button
                key={src}
                onClick={() => setImage(index)}
                className={`relative aspect-square overflow-hidden rounded-xl ${image === index ? 'ring-2 ring-[#84EA53]' : 'opacity-60'}`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        <div className="self-center rounded-2xl bg-white p-6 sm:p-10">
          <div className="mb-7 flex items-start justify-between">
            <div>
              <p className="eyebrow">
                {product.brand} · {product.category}
              </p>
              <h1 className="section-title mt-3">{product.name}</h1>
            </div>
            <button
              aria-label="Save product"
              className="rounded-full border border-[#EAE6DF] p-3"
            >
              <Heart size={18} />
            </button>
          </div>
          <div className="flex items-center gap-3 border-b border-[#EAE6DF] pb-7">
            <span className="text-xl font-bold">
              ${product.flashSalePrice ?? product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-[#9b9991] line-through">
                ${product.originalPrice}
              </span>
            )}
            <span className="ml-auto flex items-center gap-1 text-sm">
              <Star size={14} fill="#1D1F20" /> {product.rating}{' '}
              <span className="text-[#74736e]">({product.reviews})</span>
            </span>
          </div>
          <p className="py-7 text-sm leading-6 text-[#74736e]">
            {product.description}
          </p>
          <div className="space-y-6 border-t border-[#EAE6DF] pt-6">
            <div>
              <div className="mb-3 flex justify-between text-sm font-semibold">
                <span>Color</span>
                <span className="font-normal text-[#74736e]">Selected</span>
              </div>
              <div className="flex gap-3">
                {product.colors.map((item) => (
                  <button
                    key={item}
                    onClick={() => setColor(item)}
                    aria-label={`Select color ${item}`}
                    className={`h-8 w-8 rounded-full border-2 border-white outline outline-1 ${color === item ? 'outline-[#1D1F20]' : 'outline-[#EAE6DF]'}`}
                    style={{ backgroundColor: item }}
                  />
                ))}
              </div>
            </div>
            <div>
              <div className="mb-3 flex justify-between text-sm font-semibold">
                <span>Size</span>
                <button className="text-xs font-normal underline">
                  Size guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((item) => (
                  <button
                    key={item}
                    onClick={() => setSize(item)}
                    className={`rounded-lg border px-4 py-2.5 text-xs ${size === item ? 'border-[#1D1F20] bg-[#1D1F20] text-white' : 'border-[#EAE6DF]'}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center rounded-xl border border-[#EAE6DF]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="w-5 text-center text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>
              <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#84EA53] py-3.5 text-sm font-bold transition hover:brightness-95">
                Add to cart · $
                {((product.flashSalePrice ?? product.price) * quantity).toFixed(
                  2,
                )}{' '}
                <Check size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

```

# modules\catalog\components\search-shell.tsx

| Property | Value |
|----------|-------|
| Path | `modules\catalog\components\search-shell.tsx` |
| Size | 2,576 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:16:51.961932 |

```tsx
'use client';
import { SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { ProductCard } from '@/modules/catalog/components/product-card';
import { FilterSidebar } from '@/modules/catalog/components/filter-sidebar';
import type { Product } from '@/modules/catalog/mock';
export function SearchShell({
  products,
  category,
}: {
  products: Product[];
  category?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative mx-auto max-w-[1440px] px-4 pb-20 sm:px-8 lg:px-12">
      <div className="mb-7 flex items-center justify-between border-b border-[#EAE6DF] py-5">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-full border border-[#1D1F20] px-4 py-2 text-sm font-semibold transition hover:bg-[#1D1F20] hover:text-white"
        >
          <SlidersHorizontal size={16} /> Filters
        </button>
        <p className="hidden text-sm text-[#74736e] sm:block">
          {products.length * 20 + 4} pieces
        </p>
        <select className="rounded-full border border-[#EAE6DF] bg-transparent px-3 py-2 text-xs outline-none">
          <option>Sort: Recommended</option>
          <option>Price: low to high</option>
          <option>Newest first</option>
        </select>
      </div>
      <div className="flex gap-8">
        <FilterSidebar open={open} onClose={() => setOpen(false)} />
        {open && (
          <button
            aria-label="Close filter overlay"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-[#1D1F20]/20 lg:hidden"
          />
        )}
        {open && <div className="hidden w-[300px] shrink-0 lg:block" />}
        <div className="min-w-0 flex-1">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="eyebrow">{category ?? 'All pieces'}</p>
              <h1 className="section-title mt-2">
                {category ? `${category}, considered` : 'Find your everyday'}
              </h1>
            </div>
            <span className="text-xs text-[#74736e] sm:hidden">
              {products.length * 20 + 4} items
            </span>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

```

# modules\catalog\components\site-header.tsx

| Property | Value |
|----------|-------|
| Path | `modules\catalog\components\site-header.tsx` |
| Size | 2,609 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-01 17:02:22.930284 |

```tsx
'use client';
import Link from 'next/link';
import { Search, ShoppingBag } from 'lucide-react';
import { categories } from '@/modules/catalog/data';
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#EAE6DF] bg-[#FBF9F4]/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center gap-5 px-4 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="shrink-0 font-display text-3xl font-semibold tracking-[-.06em]"
        >
          common<span className="text-[#84EA53]">.</span>
        </Link>
        <div className="hidden h-11 max-w-[430px] flex-1 items-center rounded-full border border-[#EAE6DF] bg-white px-4 shadow-[0_5px_20px_rgba(29,31,32,.04)] sm:flex">
          <Search size={17} className="mr-3 text-[#74736e]" />
          <input
            aria-label="Search products"
            placeholder="Search for an object, a feeling..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-[#9b9991]"
          />
          <kbd className="rounded bg-[#FBF9F4] px-2 py-1 text-[10px] text-[#74736e]">
            ⌘ K
          </kbd>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/search"
            className="rounded-full p-2.5 hover:bg-white sm:hidden"
          >
            <Search size={20} />
          </Link>
          <Link
            href="/cart"
            className="relative rounded-full p-2.5 hover:bg-white"
          >
            <ShoppingBag size={20} />
            <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#84EA53] text-[9px] font-bold">
              2
            </span>
          </Link>
        </div>
      </div>
      <nav className="scrollbar-none mx-auto flex max-w-[1440px] gap-7 overflow-x-auto px-4 pb-3 sm:px-8 lg:px-12">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/search?category=${category.name}`}
            className="group flex min-w-fit flex-col items-center gap-1 text-[#74736e] transition-colors hover:text-[#1D1F20]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#EAE6DF] bg-white text-base group-hover:border-[#84EA53]">
              {category.icon}
            </span>
            <span className="text-[10px] font-medium">{category.name}</span>
          </Link>
        ))}
      </nav>
    </header>
  );
}

```

# modules\catalog\data.ts

| Property | Value |
|----------|-------|
| Path | `modules\catalog\data.ts` |
| Size | 5,580 bytes |
| Extension | `.ts` |
| Modified | 2026-10-01 17:02:22.931284 |

```typescript
export type Product = {
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  flashSalePrice?: number;
  rating: number;
  reviews: number;
  tag?: string;
  images: string[];
  colors: string[];
  sizes: string[];
  description: string;
};
const image = (id: string, w = 900, h = 1100) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;
export const categories = [
  {
    name: 'Apparel',
    count: 48,
    icon: '✦',
    image: image('photo-1496747611176-843222e1e57c'),
  },
  {
    name: 'Objects',
    count: 32,
    icon: '◒',
    image: image('photo-1494438639946-1ebd1d20bf85'),
  },
  {
    name: 'Accessories',
    count: 26,
    icon: '◇',
    image: image('photo-1525507119028-ed4c629a60a3'),
  },
  {
    name: 'Wellness',
    count: 18,
    icon: '⌁',
    image: image('photo-1608571423902-eed4a5ad8108'),
  },
  {
    name: 'Stationery',
    count: 14,
    icon: '▱',
    image: image('photo-1455390582262-044cdead277a'),
  },
  {
    name: 'Home',
    count: 22,
    icon: '⌂',
    image: image('photo-1618221195710-dd6b41faaea6'),
  },
];
export const products: Product[] = [
  {
    slug: 'linen-overshirt',
    name: 'Linen Overshirt',
    brand: 'Morrow Studio',
    category: 'Apparel',
    price: 168,
    originalPrice: 210,
    flashSalePrice: 168,
    rating: 4.9,
    reviews: 86,
    tag: 'Bestseller',
    images: [
      image('photo-1594633312681-425c7b97ccd1'),
      image('photo-1529139574466-a303027c1d8b'),
    ],
    colors: ['#ded5c8', '#1D1F20', '#bec9bf'],
    sizes: ['XS', 'S', 'M', 'L'],
    description:
      'An easy, everyday layer cut from breathable European linen. Relaxed through the body with a clean, considered finish.',
  },
  {
    slug: 'everyday-tote',
    name: 'Everyday Tote',
    brand: 'Form & Field',
    category: 'Accessories',
    price: 92,
    rating: 4.8,
    reviews: 42,
    tag: 'New',
    images: [
      image('photo-1548036328-c9fa89d128fa'),
      image('photo-1553062407-98eeb64c6a62'),
    ],
    colors: ['#b8794b', '#242424', '#ded5c8'],
    sizes: ['One size'],
    description:
      'A generous, structured canvas tote with vegetable-tanned leather handles and room for all your daily rituals.',
  },
  {
    slug: 'ribbed-knit-set',
    name: 'Ribbed Knit Set',
    brand: 'House of Common',
    category: 'Apparel',
    price: 144,
    originalPrice: 180,
    flashSalePrice: 144,
    rating: 4.7,
    reviews: 31,
    tag: '20% off',
    images: [
      image('photo-1483985988355-763728e1935b'),
      image('photo-1515886657613-9f3515b0c78f'),
    ],
    colors: ['#c8b8ad', '#5b6353'],
    sizes: ['XS', 'S', 'M', 'L'],
    description:
      'Soft, tactile knitwear made to move through the week. A matching set that does more with less.',
  },
  {
    slug: 'stoneware-mug',
    name: 'Stoneware Mug',
    brand: 'Kiln Notes',
    category: 'Objects',
    price: 34,
    rating: 4.9,
    reviews: 112,
    images: [
      image('photo-1514228742587-6b1558fcca3d'),
      image('photo-1577937927133-66ef06acdf18'),
    ],
    colors: ['#d8c5ac', '#b9c8c2', '#202121'],
    sizes: ['One size'],
    description:
      'Hand-finished stoneware with a generous handle and a quiet, matte glaze. Each one is subtly unique.',
  },
  {
    slug: 'pleated-trouser',
    name: 'Pleated Trouser',
    brand: 'Morrow Studio',
    category: 'Apparel',
    price: 128,
    rating: 4.6,
    reviews: 24,
    images: [
      image('photo-1506629905607-d9b1f1f3d7a8'),
      image('photo-1473966968600-fa801b869a1a'),
    ],
    colors: ['#282a2a', '#ded7c9'],
    sizes: ['28', '30', '32', '34'],
    description:
      'A high-waisted trouser with a softly tailored line, finished in a fluid, mid-weight cotton blend.',
  },
  {
    slug: 'daily-journal',
    name: 'Daily Journal',
    brand: 'Paper Sunday',
    category: 'Stationery',
    price: 28,
    rating: 4.8,
    reviews: 67,
    tag: 'Staff pick',
    images: [
      image('photo-1517842645767-c639042777db'),
      image('photo-1499951360447-b19be8fe80f5'),
    ],
    colors: ['#d8c9b8', '#8d9a87', '#2c3430'],
    sizes: ['A5'],
    description:
      'A calm place for plans, notes, and half-formed ideas. 160 pages of smooth, fountain-pen friendly paper.',
  },
  {
    slug: 'everyday-sandal',
    name: 'Everyday Sandal',
    brand: 'Lumen Goods',
    category: 'Accessories',
    price: 76,
    rating: 4.7,
    reviews: 18,
    images: [
      image('photo-1543163521-1bf539c55dd2'),
      image('photo-1560343090-f0409e92791a'),
    ],
    colors: ['#c8895b', '#1f2321'],
    sizes: ['36', '37', '38', '39', '40'],
    description:
      'A minimal leather sandal with a cushioned footbed, designed for long walks and slow afternoons.',
  },
  {
    slug: 'linen-candle',
    name: 'Linen + Cedar Candle',
    brand: 'Sunday Objects',
    category: 'Wellness',
    price: 42,
    rating: 4.9,
    reviews: 53,
    images: [
      image('photo-1603006905003-be475563bc59'),
      image('photo-1602523961358-f9f03dd557db'),
    ],
    colors: ['#e4dac8'],
    sizes: ['220g'],
    description:
      'A warm, grounding blend of washed linen, cedar, and a little smoke. Poured by hand in small batches.',
  },
];
export const getProduct = (slug: string) =>
  products.find((product) => product.slug === slug) ?? products[0];

```

# modules\catalog\hooks\use-products.ts

| Property | Value |
|----------|-------|
| Path | `modules\catalog\hooks\use-products.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.133006 |

```typescript

```

# modules\catalog\mock.ts

| Property | Value |
|----------|-------|
| Path | `modules\catalog\mock.ts` |
| Size | 5,580 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.134075 |

```typescript
export type Product = {
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  flashSalePrice?: number;
  rating: number;
  reviews: number;
  tag?: string;
  images: string[];
  colors: string[];
  sizes: string[];
  description: string;
};
const image = (id: string, w = 900, h = 1100) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;
export const categories = [
  {
    name: 'Apparel',
    count: 48,
    icon: '✦',
    image: image('photo-1496747611176-843222e1e57c'),
  },
  {
    name: 'Objects',
    count: 32,
    icon: '◒',
    image: image('photo-1494438639946-1ebd1d20bf85'),
  },
  {
    name: 'Accessories',
    count: 26,
    icon: '◇',
    image: image('photo-1525507119028-ed4c629a60a3'),
  },
  {
    name: 'Wellness',
    count: 18,
    icon: '⌁',
    image: image('photo-1608571423902-eed4a5ad8108'),
  },
  {
    name: 'Stationery',
    count: 14,
    icon: '▱',
    image: image('photo-1455390582262-044cdead277a'),
  },
  {
    name: 'Home',
    count: 22,
    icon: '⌂',
    image: image('photo-1618221195710-dd6b41faaea6'),
  },
];
export const products: Product[] = [
  {
    slug: 'linen-overshirt',
    name: 'Linen Overshirt',
    brand: 'Morrow Studio',
    category: 'Apparel',
    price: 168,
    originalPrice: 210,
    flashSalePrice: 168,
    rating: 4.9,
    reviews: 86,
    tag: 'Bestseller',
    images: [
      image('photo-1594633312681-425c7b97ccd1'),
      image('photo-1529139574466-a303027c1d8b'),
    ],
    colors: ['#ded5c8', '#1D1F20', '#bec9bf'],
    sizes: ['XS', 'S', 'M', 'L'],
    description:
      'An easy, everyday layer cut from breathable European linen. Relaxed through the body with a clean, considered finish.',
  },
  {
    slug: 'everyday-tote',
    name: 'Everyday Tote',
    brand: 'Form & Field',
    category: 'Accessories',
    price: 92,
    rating: 4.8,
    reviews: 42,
    tag: 'New',
    images: [
      image('photo-1548036328-c9fa89d128fa'),
      image('photo-1553062407-98eeb64c6a62'),
    ],
    colors: ['#b8794b', '#242424', '#ded5c8'],
    sizes: ['One size'],
    description:
      'A generous, structured canvas tote with vegetable-tanned leather handles and room for all your daily rituals.',
  },
  {
    slug: 'ribbed-knit-set',
    name: 'Ribbed Knit Set',
    brand: 'House of Common',
    category: 'Apparel',
    price: 144,
    originalPrice: 180,
    flashSalePrice: 144,
    rating: 4.7,
    reviews: 31,
    tag: '20% off',
    images: [
      image('photo-1483985988355-763728e1935b'),
      image('photo-1515886657613-9f3515b0c78f'),
    ],
    colors: ['#c8b8ad', '#5b6353'],
    sizes: ['XS', 'S', 'M', 'L'],
    description:
      'Soft, tactile knitwear made to move through the week. A matching set that does more with less.',
  },
  {
    slug: 'stoneware-mug',
    name: 'Stoneware Mug',
    brand: 'Kiln Notes',
    category: 'Objects',
    price: 34,
    rating: 4.9,
    reviews: 112,
    images: [
      image('photo-1514228742587-6b1558fcca3d'),
      image('photo-1577937927133-66ef06acdf18'),
    ],
    colors: ['#d8c5ac', '#b9c8c2', '#202121'],
    sizes: ['One size'],
    description:
      'Hand-finished stoneware with a generous handle and a quiet, matte glaze. Each one is subtly unique.',
  },
  {
    slug: 'pleated-trouser',
    name: 'Pleated Trouser',
    brand: 'Morrow Studio',
    category: 'Apparel',
    price: 128,
    rating: 4.6,
    reviews: 24,
    images: [
      image('photo-1506629905607-d9b1f1f3d7a8'),
      image('photo-1473966968600-fa801b869a1a'),
    ],
    colors: ['#282a2a', '#ded7c9'],
    sizes: ['28', '30', '32', '34'],
    description:
      'A high-waisted trouser with a softly tailored line, finished in a fluid, mid-weight cotton blend.',
  },
  {
    slug: 'daily-journal',
    name: 'Daily Journal',
    brand: 'Paper Sunday',
    category: 'Stationery',
    price: 28,
    rating: 4.8,
    reviews: 67,
    tag: 'Staff pick',
    images: [
      image('photo-1517842645767-c639042777db'),
      image('photo-1499951360447-b19be8fe80f5'),
    ],
    colors: ['#d8c9b8', '#8d9a87', '#2c3430'],
    sizes: ['A5'],
    description:
      'A calm place for plans, notes, and half-formed ideas. 160 pages of smooth, fountain-pen friendly paper.',
  },
  {
    slug: 'everyday-sandal',
    name: 'Everyday Sandal',
    brand: 'Lumen Goods',
    category: 'Accessories',
    price: 76,
    rating: 4.7,
    reviews: 18,
    images: [
      image('photo-1543163521-1bf539c55dd2'),
      image('photo-1560343090-f0409e92791a'),
    ],
    colors: ['#c8895b', '#1f2321'],
    sizes: ['36', '37', '38', '39', '40'],
    description:
      'A minimal leather sandal with a cushioned footbed, designed for long walks and slow afternoons.',
  },
  {
    slug: 'linen-candle',
    name: 'Linen + Cedar Candle',
    brand: 'Sunday Objects',
    category: 'Wellness',
    price: 42,
    rating: 4.9,
    reviews: 53,
    images: [
      image('photo-1603006905003-be475563bc59'),
      image('photo-1602523961358-f9f03dd557db'),
    ],
    colors: ['#e4dac8'],
    sizes: ['220g'],
    description:
      'A warm, grounding blend of washed linen, cedar, and a little smoke. Poured by hand in small batches.',
  },
];
export const getProduct = (slug: string) =>
  products.find((product) => product.slug === slug) ?? products[0];

```

# modules\catalog\types.ts

| Property | Value |
|----------|-------|
| Path | `modules\catalog\types.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.134872 |

```typescript

```

# modules\chat\api.ts

| Property | Value |
|----------|-------|
| Path | `modules\chat\api.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.136871 |

```typescript

```

# modules\chat\components\chat-box.tsx

| Property | Value |
|----------|-------|
| Path | `modules\chat\components\chat-box.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.137869 |

```tsx

```

# modules\chat\components\message-list.tsx

| Property | Value |
|----------|-------|
| Path | `modules\chat\components\message-list.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.138250 |

```tsx

```

# modules\chat\types.ts

| Property | Value |
|----------|-------|
| Path | `modules\chat\types.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.139206 |

```typescript

```

# modules\checkout\api.ts

| Property | Value |
|----------|-------|
| Path | `modules\checkout\api.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.140095 |

```typescript

```

# modules\checkout\components\checkout-view.tsx

| Property | Value |
|----------|-------|
| Path | `modules\checkout\components\checkout-view.tsx` |
| Size | 4,664 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.142033 |

```tsx
'use client';
import Link from 'next/link';
import { ArrowLeft, Check, Lock } from 'lucide-react';
import { useState } from 'react';
export function CheckoutView() {
  const [step, setStep] = useState(1);
  return (
    <main className="mx-auto max-w-[1180px] px-4 py-10 sm:px-8 lg:py-16">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="eyebrow">Almost yours</p>
          <h1 className="section-title mt-2">Checkout</h1>
        </div>
        <Link
          href="/cart"
          className="flex items-center gap-1 text-xs text-[#74736e]"
        >
          <ArrowLeft size={14} /> Back to bag
        </Link>
      </div>
      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <section
            className={`rounded-2xl bg-white p-6 ${step === 1 ? 'ring-1 ring-[#84EA53]' : ''}`}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-3xl">01 · Shipping</h2>
              {step > 1 && <Check size={18} color="#61bc39" />}
            </div>
            {step === 1 && (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <input
                  placeholder="First name"
                  className="rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
                />
                <input
                  placeholder="Last name"
                  className="rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
                />
                <input
                  placeholder="Address"
                  className="rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53] sm:col-span-2"
                />
                <input
                  placeholder="City"
                  className="rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
                />
                <input
                  placeholder="Postal code"
                  className="rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
                />
                <button
                  onClick={() => setStep(2)}
                  className="rounded-xl bg-[#1D1F20] py-3 text-sm font-bold text-white sm:col-span-2"
                >
                  Continue to payment
                </button>
              </div>
            )}
          </section>
          <section
            className={`rounded-2xl bg-white p-6 ${step === 2 ? 'ring-1 ring-[#84EA53]' : 'opacity-60'}`}
          >
            <h2 className="font-display text-3xl">02 · Payment</h2>
            {step === 2 && (
              <div className="mt-6 space-y-4">
                <input
                  placeholder="Card number"
                  className="w-full rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    placeholder="MM / YY"
                    className="rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
                  />
                  <input
                    placeholder="CVC"
                    className="rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
                  />
                </div>
                <button
                  onClick={() => setStep(3)}
                  className="w-full rounded-xl bg-[#84EA53] py-3.5 text-sm font-bold"
                >
                  Place order · $260.00
                </button>
              </div>
            )}
          </section>
        </div>
        <aside className="h-fit rounded-2xl bg-[#1D1F20] p-6 text-white lg:sticky lg:top-36">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Lock size={15} color="#84EA53" /> Secure checkout
          </div>
          <p className="mt-6 text-xs leading-5 text-white/55">
            Your payment details are encrypted and never stored. This is a demo
            checkout with no backend connection.
          </p>
          <div className="mt-8 flex justify-between border-t border-white/15 pt-5 text-sm">
            <span className="text-white/55">Total</span>
            <strong>$260.00</strong>
          </div>
        </aside>
      </div>
    </main>
  );
}

```

# modules\checkout\components\order-summary.tsx

| Property | Value |
|----------|-------|
| Path | `modules\checkout\components\order-summary.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.142881 |

```tsx

```

# modules\checkout\components\payment-method.tsx

| Property | Value |
|----------|-------|
| Path | `modules\checkout\components\payment-method.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.142881 |

```tsx

```

# modules\checkout\components\shipping-form.tsx

| Property | Value |
|----------|-------|
| Path | `modules\checkout\components\shipping-form.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.144008 |

```tsx

```

# modules\checkout\schemas.ts

| Property | Value |
|----------|-------|
| Path | `modules\checkout\schemas.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.144871 |

```typescript

```

# modules\checkout\types.ts

| Property | Value |
|----------|-------|
| Path | `modules\checkout\types.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.145868 |

```typescript

```

# modules\flash-sale\api.ts

| Property | Value |
|----------|-------|
| Path | `modules\flash-sale\api.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.146867 |

```typescript

```

# modules\flash-sale\components\countdown.tsx

| Property | Value |
|----------|-------|
| Path | `modules\flash-sale\components\countdown.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.147880 |

```tsx

```

# modules\flash-sale\components\flash-sale-card.tsx

| Property | Value |
|----------|-------|
| Path | `modules\flash-sale\components\flash-sale-card.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.148299 |

```tsx

```

# modules\flash-sale\types.ts

| Property | Value |
|----------|-------|
| Path | `modules\flash-sale\types.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.148920 |

```typescript

```

# modules\order\api.ts

| Property | Value |
|----------|-------|
| Path | `modules\order\api.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.150333 |

```typescript

```

# modules\order\components\order-detail.tsx

| Property | Value |
|----------|-------|
| Path | `modules\order\components\order-detail.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.151867 |

```tsx

```

# modules\order\components\order-list.tsx

| Property | Value |
|----------|-------|
| Path | `modules\order\components\order-list.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.152190 |

```tsx

```

# modules\order\components\order-status.tsx

| Property | Value |
|----------|-------|
| Path | `modules\order\components\order-status.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.152866 |

```tsx

```

# modules\order\hooks\use-orders.ts

| Property | Value |
|----------|-------|
| Path | `modules\order\hooks\use-orders.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.154868 |

```typescript

```

# modules\order\types.ts

| Property | Value |
|----------|-------|
| Path | `modules\order\types.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.155388 |

```typescript

```

# modules\review\api.ts

| Property | Value |
|----------|-------|
| Path | `modules\review\api.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.156878 |

```typescript

```

# modules\review\components\rating.tsx

| Property | Value |
|----------|-------|
| Path | `modules\review\components\rating.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.157868 |

```tsx

```

# modules\review\components\review-form.tsx

| Property | Value |
|----------|-------|
| Path | `modules\review\components\review-form.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.158204 |

```tsx

```

# modules\review\components\review-list.tsx

| Property | Value |
|----------|-------|
| Path | `modules\review\components\review-list.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.158870 |

```tsx

```

# modules\review\types.ts

| Property | Value |
|----------|-------|
| Path | `modules\review\types.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.159367 |

```typescript

```

# modules\user\api.ts

| Property | Value |
|----------|-------|
| Path | `modules\user\api.ts` |
| Size | 164 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.160868 |

```typescript
import { api } from '@/lib/api/client';
import type { User } from './types';

export function getUser(id: string) {
  return api.get<User>(`/users/${id}`);
}

```

# modules\user\components\address-list.tsx

| Property | Value |
|----------|-------|
| Path | `modules\user\components\address-list.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.161881 |

```tsx

```

# modules\user\components\profile-form.tsx

| Property | Value |
|----------|-------|
| Path | `modules\user\components\profile-form.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.162197 |

```tsx

```

# modules\user\types.ts

| Property | Value |
|----------|-------|
| Path | `modules\user\types.ts` |
| Size | 78 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.162979 |

```typescript
export interface User {
  id: string;
  name: string;
  email: string;
}

```

# modules\voucher\api.ts

| Property | Value |
|----------|-------|
| Path | `modules\voucher\api.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.163868 |

```typescript

```

# modules\voucher\components\voucher-input.tsx

| Property | Value |
|----------|-------|
| Path | `modules\voucher\components\voucher-input.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.165899 |

```tsx

```

# modules\voucher\types.ts

| Property | Value |
|----------|-------|
| Path | `modules\voucher\types.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.166045 |

```typescript

```

# types\api.ts

| Property | Value |
|----------|-------|
| Path | `types\api.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.167167 |

```typescript

```

# types\auth.ts

| Property | Value |
|----------|-------|
| Path | `types\auth.ts` |
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

# types\cart-order.ts

| Property | Value |
|----------|-------|
| Path | `types\cart-order.ts` |
| Size | 2,322 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 13:51:02.989577 |

```typescript
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
```

# types\catalog.ts

| Property | Value |
|----------|-------|
| Path | `types\catalog.ts` |
| Size | 2,917 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 13:50:40.716679 |

```typescript
import { ProductStatus } from './enums'; //[cite: 1, 2]

export interface Language {
  id: string; // 'vi' | 'en'
  name: string;
  isDefault: boolean;
}

export interface CategoryTranslation {
  id: number;
  categoryId: number;
  languageId: string;
  name: string;
  description?: string | null;
}

export interface Category {
  id: number;
  defaultName: string;
  iconUrl?: string | null;
  isVisible: boolean;
  parentId?: number | null;
  parent?: Category | null;
  children?: Category[];
  translations?: CategoryTranslation[];
}

export interface Brand {
  id: number;
  defaultName: string;
  logoUrl?: string | null;
  translations?: Array<{
    languageId: string;
    name: string;
    description?: string | null;
  }>;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Attribute {
  id: number;
  name: string; // Ví dụ: "Màu sắc", "Size"
  values?: AttributeValue[];
}

export interface AttributeValue {
  id: number;
  attributeId: number;
  value: string; // Ví dụ: "Đỏ", "XL"
  attribute?: Attribute;
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
  attributeValues: Array<{
    id: number;
    value: string;
    attribute: {
      id: number;
      name: string;
    };
  }>;
  flashSaleItems?: Array<{
    flashSalePrice: number | string;
    promoQuantity: number;
    soldQuantity: number;
    campaign: {
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

export interface ProductTranslation {
  id: number;
  productId: number;
  languageId: string;
  name: string;
  shortDesc?: string | null;
  detailDesc?: string | null;
}

export interface Product {
  id: number;
  defaultName: string;
  thumbnailUrl?: string | null;
  status: ProductStatus; //[cite: 1, 2]
  categoryId: number;
  brandId?: number | null;
  category?: Category;
  brand?: Brand | null;
  images?: ProductImage[];
  variants?: ProductVariant[];
  translations?: ProductTranslation[];
  tags?: Tag[];
  createdAt: string;
}

// Payload đồng bộ Ma trận Biến thể (Pessimistic Sync)
export interface SyncVariantsPayload {
  productId: number;
  attributes: Array<{
    name: string;
    options: string[];
  }>;
  variants: Array<{
    id?: number | null;
    sku: string;
    originalPrice: number;
    sellingPrice: number;
    stockQuantity: number;
    weightGram: number;
    imageUrl?: string | null;
    attributeValues: Array<{
      attributeName: string;
      value: string;
    }>;
  }>;
}
```

# types\common.ts

| Property | Value |
|----------|-------|
| Path | `types\common.ts` |
| Size | 751 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 13:50:02.904926 |

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

# types\enums.ts

| Property | Value |
|----------|-------|
| Path | `types\enums.ts` |
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

# types\fulfillment.ts

| Property | Value |
|----------|-------|
| Path | `types\fulfillment.ts` |
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

# types\index.ts

| Property | Value |
|----------|-------|
| Path | `types\index.ts` |
| Size | 202 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 14:06:45.452379 |

```typescript
export * from './enums';
export * from './common';
export * from './auth';
export * from './catalog';
export * from './cart-order';
export * from './fulfillment';
export * from './loyalty-engage';
```

# types\loyalty-engage.ts

| Property | Value |
|----------|-------|
| Path | `types\loyalty-engage.ts` |
| Size | 1,766 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 13:51:24.676506 |

```typescript
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
```

