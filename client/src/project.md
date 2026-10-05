# Project Dump

**Root:** `C:\Programing\cnpm\fashion-ecom\client\src`

**Generated:** 2026-10-05 21:42:45.066325

**Files:** 161 | **Total size:** 362,401 bytes

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
| Size | 2,884 bytes |
| Extension | `.ts` |
| Modified | 2026-10-05 20:42:08.849983 |

```typescript
// src/api/client.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_ENDPOINTS } from './endpoints';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  adapter: 'fetch',
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
| Size | 1,366 bytes |
| Extension | `.ts` |
| Modified | 2026-10-05 20:42:08.851981 |

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
} as const;
```

# api\flash-sale.api.ts

| Property | Value |
|----------|-------|
| Path | `api\flash-sale.api.ts` |
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

# api\index.ts

| Property | Value |
|----------|-------|
| Path | `api\index.ts` |
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
| Size | 463 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.856354 |

```tsx
import { Metadata } from 'next';
import { AddressList } from '@/modules/user/components/address-list';

export const metadata: Metadata = {
  title: 'Sổ địa chỉ — Fashion Store',
  description: 'Quản lý các địa chỉ nhận hàng của bạn.',
};

export default function AddressesPage() {
  return (
    <div className="bg-white rounded-2xl border border-[#EAE6DF] p-6 sm:p-8 shadow-xs">
      <AddressList />
    </div>
  );
}


```

# app\(account)\layout.tsx

| Property | Value |
|----------|-------|
| Path | `app\(account)\layout.tsx` |
| Size | 4,944 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.857351 |

```tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Shield, MapPin, Package, LogOut, LayoutDashboard } from 'lucide-react';
import { SiteHeader } from '@/components/layouts/site-header';
import { SiteFooter } from '@/components/layouts/site-footer';
import { useAuth } from '@/components/providers/auth-provider';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/profile', label: 'Thông tin cá nhân', icon: User },
  { href: '/addresses', label: 'Sổ địa chỉ', icon: MapPin },
  { href: '/security', label: 'Bảo mật & Mật khẩu', icon: Shield },
  { href: '/orders', label: 'Đơn mua', icon: Package },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, isAdmin, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F4]">
      <SiteHeader />

      <main className="flex-1 mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 py-8 sm:py-12">
        <div className="mb-8">
          <span className="eyebrow block mb-2">QUẢN LÝ TÀI KHOẢN</span>
          <h1 className="font-display text-3xl sm:text-4xl text-[#1D1F20] tracking-tight">
            Tài khoản của tôi
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-[#EAE6DF] p-6 shadow-xs sticky top-28 space-y-6">
              {/* User overview */}
              <div className="flex items-center gap-3.5 pb-6 border-b border-[#EAE6DF]">
                <Avatar
                  src={user?.avatarUrl}
                  alt={user?.fullName || 'User'}
                  size="lg"
                  className="size-12 ring-2 ring-[#84EA53]/30"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-neutral-900 truncate">
                    {user?.fullName || 'Người dùng'}
                  </h3>
                  <p className="text-xs text-neutral-500 truncate">{user?.email}</p>
                  <div className="mt-1">
                    <Badge variant={isAdmin ? 'lime' : 'secondary'} className="text-[10px] py-0 px-2">
                      {user?.role?.name || (isAdmin ? 'Admin' : 'Khách hàng')}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition',
                        isActive
                          ? 'bg-[#1D1F20] text-white shadow-xs'
                          : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                      )}
                    >
                      <Icon className="size-4 shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}

                {isAdmin && (
                  <Link
                    href="/admin/dashboard"
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition mt-2"
                  >
                    <LayoutDashboard className="size-4 shrink-0 text-emerald-700" />
                    <span>Trang quản trị (Admin)</span>
                  </Link>
                )}
              </nav>

              {/* Logout Button */}
              <div className="pt-4 border-t border-[#EAE6DF]">
                <button
                  type="button"
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50 transition"
                >
                  <LogOut className="size-4 shrink-0" />
                  <span>Đăng xuất</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Content Area */}
          <section className="lg:col-span-3">
            {children}
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}


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
| Size | 848 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.858479 |

```tsx
import { Metadata } from 'next';
import { ProfileForm } from '@/modules/user/components/profile-form';

export const metadata: Metadata = {
  title: 'Hồ sơ cá nhân — Fashion Store',
  description: 'Quản lý thông tin cá nhân và điểm thưởng tài khoản của bạn.',
};

export default function ProfilePage() {
  return (
    <div className="bg-white rounded-2xl border border-[#EAE6DF] p-6 sm:p-8 shadow-xs">
      <div className="pb-6 border-b border-[#EAE6DF] mb-6">
        <h2 className="text-xl font-semibold text-neutral-900">
          Thông tin cá nhân
        </h2>
        <p className="text-xs text-neutral-500 mt-1">
          Cập nhật thông tin chi tiết để hỗ trợ giao hàng và liên hệ nhanh chóng.
        </p>
      </div>

      <ProfileForm />
    </div>
  );
}


```

# app\(account)\security\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\(account)\security\page.tsx` |
| Size | 4,812 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.860386 |

```tsx
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, ShieldCheck } from 'lucide-react';
import { changePasswordSchema, type ChangePasswordFormData } from '@/modules/auth/schemas';
import { useAuth } from '@/modules/auth/hooks/use-auth';
import { FormField } from '@/components/ui/form-field';
import { Button } from '@/components/ui/button';

export default function SecurityPage() {
  const [showOld, setShowOld] = React.useState(false);
  const [showNew, setShowNew] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const { changePasswordMutation } = useAuth();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: ChangePasswordFormData) => {
    changePasswordMutation.mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-[#EAE6DF] p-6 sm:p-8 shadow-xs">
      <div className="pb-6 border-b border-[#EAE6DF] mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900">
            Bảo mật & Đổi mật khẩu
          </h2>
          <p className="text-xs text-neutral-500 mt-1">
            Định kỳ thay đổi mật khẩu để bảo vệ an toàn cho tài khoản và thông tin mua hàng.
          </p>
        </div>
        <div className="p-2.5 rounded-xl bg-neutral-100 text-neutral-800 hidden sm:block">
          <ShieldCheck className="size-5" />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-lg">
        <div className="relative">
          <FormField
            control={control}
            name="oldPassword"
            label="Mật khẩu hiện tại"
            type={showOld ? 'text' : 'password'}
            placeholder="••••••••"
            error={errors.oldPassword?.message}
          />
          <button
            type="button"
            onClick={() => setShowOld(!showOld)}
            className="absolute right-3.5 top-[34px] text-neutral-400 hover:text-neutral-700 transition"
            tabIndex={-1}
          >
            {showOld ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>

        <div className="relative">
          <FormField
            control={control}
            name="newPassword"
            label="Mật khẩu mới"
            type={showNew ? 'text' : 'password'}
            placeholder="Tối thiểu 8 ký tự (hoa, thường, số, ký tự)"
            error={errors.newPassword?.message}
          />
          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute right-3.5 top-[34px] text-neutral-400 hover:text-neutral-700 transition"
            tabIndex={-1}
          >
            {showNew ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>

        <div className="relative">
          <FormField
            control={control}
            name="confirmPassword"
            label="Xác nhận mật khẩu mới"
            type={showConfirm ? 'text' : 'password'}
            placeholder="Nhập lại mật khẩu mới"
            error={errors.confirmPassword?.message}
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3.5 top-[34px] text-neutral-400 hover:text-neutral-700 transition"
            tabIndex={-1}
          >
            {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            disabled={changePasswordMutation.isPending}
            className="h-11 px-8 rounded-xl bg-[#1D1F20] hover:bg-neutral-800 text-white font-medium shadow-sm transition active:scale-[0.99]"
          >
            {changePasswordMutation.isPending ? (
              <>
                <Loader2 className="size-4 animate-spin mr-2" />
                Đang cập nhật mật khẩu...
              </>
            ) : (
              'Cập nhật mật khẩu'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}


```

# app\(auth)\forgot-password\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\(auth)\forgot-password\page.tsx` |
| Size | 1,567 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.862351 |

```tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { ForgotPasswordForm } from '@/modules/auth/components/forgot-password-form';

export const metadata: Metadata = {
  title: 'Quên mật khẩu — Fashion Store',
  description: 'Khôi phục mật khẩu tài khoản của bạn thông qua mã xác thực gửi về email.',
};

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen w-full flex flex-col justify-center items-center p-4 sm:p-6 bg-[#FBF9F4]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="eyebrow block mb-2 text-[#74736E]">FASHION STUDIO</span>
            <h1 className="font-display text-4xl text-[#1D1F20] tracking-tight">
              Quên mật khẩu
            </h1>
          </Link>
          <p className="text-xs text-neutral-500 mt-2">
            Nhập email của bạn để nhận mã xác thực khôi phục mật khẩu.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#EAE6DF] p-6 sm:p-8 shadow-xs">
          <ForgotPasswordForm />
        </div>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs text-neutral-500 hover:text-neutral-900 transition underline-offset-4 hover:underline"
          >
            ← Quay lại trang chủ
          </Link>
        </div>
      </div>
    </main>
  );
}


```

# app\(auth)\login\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\(auth)\login\page.tsx` |
| Size | 1,528 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.865370 |

```tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { LoginForm } from '@/modules/auth/components/login-form';

export const metadata: Metadata = {
  title: 'Đăng nhập — Fashion Store',
  description: 'Đăng nhập vào tài khoản của bạn để trải nghiệm mua sắm và quản lý đơn hàng.',
};

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full flex flex-col justify-center items-center p-4 sm:p-6 bg-[#FBF9F4]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="eyebrow block mb-2 text-[#74736E]">FASHION STUDIO</span>
            <h1 className="font-display text-4xl text-[#1D1F20] tracking-tight">
              Đăng nhập
            </h1>
          </Link>
          <p className="text-xs text-neutral-500 mt-2">
            Chào mừng bạn quay trở lại. Hãy điền thông tin để tiếp tục.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#EAE6DF] p-6 sm:p-8 shadow-xs">
          <LoginForm />
        </div>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs text-neutral-500 hover:text-neutral-900 transition underline-offset-4 hover:underline"
          >
            ← Quay lại trang chủ
          </Link>
        </div>
      </div>
    </main>
  );
}


```

# app\(auth)\register\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\(auth)\register\page.tsx` |
| Size | 1,553 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.867354 |

```tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { RegisterForm } from '@/modules/auth/components/register-form';

export const metadata: Metadata = {
  title: 'Đăng ký tài khoản — Fashion Store',
  description: 'Tạo tài khoản mới để nhận ưu đãi thành viên và theo dõi đơn hàng tiện lợi.',
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen w-full flex flex-col justify-center items-center p-4 sm:p-6 bg-[#FBF9F4]">
      <div className="w-full max-w-md my-8">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="eyebrow block mb-2 text-[#74736E]">FASHION STUDIO</span>
            <h1 className="font-display text-4xl text-[#1D1F20] tracking-tight">
              Đăng ký
            </h1>
          </Link>
          <p className="text-xs text-neutral-500 mt-2">
            Đăng ký tài khoản để bắt đầu trải nghiệm mua sắm độc quyền.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#EAE6DF] p-6 sm:p-8 shadow-xs">
          <RegisterForm />
        </div>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs text-neutral-500 hover:text-neutral-900 transition underline-offset-4 hover:underline"
          >
            ← Quay lại trang chủ
          </Link>
        </div>
      </div>
    </main>
  );
}


```

# app\(auth)\reset-password\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\(auth)\reset-password\page.tsx` |
| Size | 5,399 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.868351 |

```tsx
'use client';

import * as React from 'react';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { resetPasswordSchema, type ResetPasswordFormData } from '@/modules/auth/schemas';
import { useAuth } from '@/modules/auth/hooks/use-auth';
import { FormField } from '@/components/ui/form-field';
import { Button } from '@/components/ui/button';

function ResetPasswordFormContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const { resetPasswordMutation } = useAuth();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token,
      newPassword: '',
      confirmPassword: '',
    },
  });

  React.useEffect(() => {
    if (token) {
      form.setValue('token', token);
    }
  }, [token, form]);

  const onSubmit = (data: ResetPasswordFormData) => {
    resetPasswordMutation.mutate(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <input type="hidden" {...form.register('token')} />

      {!token && (
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs">
          Không tìm thấy mã xác thực khôi phục mật khẩu. Vui lòng bắt đầu lại từ bước Quên mật khẩu.
        </div>
      )}

      <div className="relative">
        <FormField
          control={form.control}
          name="newPassword"
          label="Mật khẩu mới"
          type={showPassword ? 'text' : 'password'}
          placeholder="Tối thiểu 8 ký tự (hoa, thường, số, ký tự)"
          error={form.formState.errors.newPassword?.message}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3.5 top-[34px] text-neutral-400 hover:text-neutral-700 transition"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>

      <div className="relative">
        <FormField
          control={form.control}
          name="confirmPassword"
          label="Xác nhận mật khẩu mới"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Nhập lại mật khẩu mới"
          error={form.formState.errors.confirmPassword?.message}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3.5 top-[34px] text-neutral-400 hover:text-neutral-700 transition"
          tabIndex={-1}
        >
          {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>

      <Button
        type="submit"
        disabled={resetPasswordMutation.isPending || !token}
        className="w-full h-11 rounded-xl bg-[#1D1F20] hover:bg-neutral-800 text-white font-medium shadow-sm transition active:scale-[0.99] mt-2"
      >
        {resetPasswordMutation.isPending ? (
          <>
            <Loader2 className="size-4 animate-spin mr-2" />
            Đang cập nhật mật khẩu...
          </>
        ) : (
          'Lưu mật khẩu mới'
        )}
      </Button>

      <div className="text-center pt-2">
        <Link
          href="/login"
          className="text-xs text-neutral-500 hover:text-neutral-900 transition underline underline-offset-4"
        >
          ← Quay về đăng nhập
        </Link>
      </div>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen w-full flex flex-col justify-center items-center p-4 sm:p-6 bg-[#FBF9F4]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="eyebrow block mb-2 text-[#74736E]">FASHION STUDIO</span>
            <h1 className="font-display text-4xl text-[#1D1F20] tracking-tight">
              Đặt lại mật khẩu
            </h1>
          </Link>
          <p className="text-xs text-neutral-500 mt-2">
            Nhập mật khẩu mới an toàn cho tài khoản của bạn.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#EAE6DF] p-6 sm:p-8 shadow-xs">
          <Suspense fallback={<div className="text-center py-6 text-sm text-neutral-500">Đang tải...</div>}>
            <ResetPasswordFormContent />
          </Suspense>
        </div>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs text-neutral-500 hover:text-neutral-900 transition underline-offset-4 hover:underline"
          >
            ← Quay lại trang chủ
          </Link>
        </div>
      </div>
    </main>
  );
}


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
| Size | 9,206 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.870390 |

```tsx
'use client';

import { useEffect, useState } from 'react';
import { Flame, ShieldCheck, Zap, RefreshCw, ShoppingBag, Clock } from 'lucide-react';
import { FlashSaleCampaign, FlashSaleItem } from '@/types/inventory-sale';
import { flashSaleApi } from '@/api/flash-sale.api';
import { FlashSaleCountdown } from '@/modules/flash-sale/components/countdown';
import { FlashSaleCard } from '@/modules/flash-sale/components/flash-sale-card';
import { Button } from '@/components/ui/button';

export default function FlashSaleShopPage() {
  const [campaigns, setCampaigns] = useState<FlashSaleCampaign[]>([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await flashSaleApi.getActiveCampaigns();
      if (res.data && res.data.length > 0) {
        setCampaigns(res.data);
        setSelectedCampaignId(res.data[0].id);
      } else {
        // If no active, try fetching all campaigns
        const allRes = await flashSaleApi.getCampaigns({ page: 1, limit: 10 });
        if (allRes.data && allRes.data.length > 0) {
          setCampaigns(allRes.data);
          setSelectedCampaignId(allRes.data[0].id);
        }
      }
    } catch (err) {
      console.error('Lỗi khi tải danh sách Flash Sale:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const activeCampaign = campaigns.find((c) => c.id === selectedCampaignId) || campaigns[0];

  const items: FlashSaleItem[] = (activeCampaign?.items || []).filter((item) => {
    if (!searchQuery) return true;
    const name = item.variant?.product?.defaultName?.toLowerCase() || '';
    const sku = item.variant?.sku?.toLowerCase() || '';
    const q = searchQuery.toLowerCase();
    return name.includes(q) || sku.includes(q);
  });

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-20">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-zinc-950 text-white py-12 px-4 sm:px-8 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(239,68,68,0.25),transparent_60%)]" />
        <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_80%_20%,rgba(245,158,11,0.2),transparent_50%)]" />

        <div className="relative z-10 mx-auto max-w-[1440px]">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3.5 py-1 text-xs font-bold text-red-400 backdrop-blur-md">
                <Flame className="size-4 fill-red-500 text-red-500 animate-pulse" />
                <span>CHƯƠNG TRÌNH KHUYẾN MÃI GIỜ VÀNG</span>
              </div>
              <h1 className="mt-4 font-display text-4xl font-black tracking-tight sm:text-6xl text-white">
                FLASH SALE SĂN DEAL KHỦNG
              </h1>
              <p className="mt-3 text-sm sm:text-base text-zinc-300">
                Sở hữu ngay những sản phẩm thời trang cao cấp với mức giá giảm tới 70%. Số lượng có hạn theo từng khung giờ vàng!
              </p>

              {/* Guarantees */}
              <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold text-zinc-300">
                <div className="flex items-center gap-1.5 rounded-lg bg-zinc-900/80 px-3 py-1.5 border border-zinc-800">
                  <ShieldCheck className="size-4 text-emerald-400" />
                  <span>Sản phẩm chính hãng 100%</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg bg-zinc-900/80 px-3 py-1.5 border border-zinc-800">
                  <Zap className="size-4 text-amber-400" />
                  <span>Giao hàng thần tốc</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg bg-zinc-900/80 px-3 py-1.5 border border-zinc-800">
                  <Clock className="size-4 text-red-400" />
                  <span>Cập nhật theo khung giờ</span>
                </div>
              </div>
            </div>

            {/* Countdown Box */}
            {activeCampaign && (
              <div className="flex flex-col items-start md:items-end rounded-2xl border border-red-500/20 bg-zinc-900/90 p-6 backdrop-blur-md shadow-2xl">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                  Thời gian diễn ra
                </span>
                <h3 className="mt-1 text-lg font-bold text-white mb-3">
                  {activeCampaign.name}
                </h3>
                <FlashSaleCountdown
                  targetTime={activeCampaign.endTime}
                  startTime={activeCampaign.startTime}
                  size="lg"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="mx-auto max-w-[1440px] px-4 pt-8 sm:px-8 lg:px-12">
        {/* Campaign Tabs */}
        {campaigns.length > 1 && (
          <div className="mb-8 flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {campaigns.map((c) => {
              const isSelected = c.id === activeCampaign?.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCampaignId(c.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-bold transition-all shadow-xs ${
                    isSelected
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 scale-105'
                      : 'bg-white text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800'
                  }`}
                >
                  <Flame className={`size-4 ${isSelected ? 'fill-amber-300 text-amber-300' : 'text-zinc-400'}`} />
                  <span>{c.name}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Toolbar & Filter */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-white p-4 shadow-xs dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <ShoppingBag className="size-5 text-red-600" />
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Sản phẩm Flash Sale ({items.length})
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm trong sale..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 rounded-xl border border-zinc-300 bg-zinc-50 px-3.5 py-1.5 text-sm focus:border-red-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800"
            />
            <Button
              onClick={loadData}
              variant="outline"
              size="sm"
              className="gap-1.5"
            >
              <RefreshCw className="size-3.5" />
              Làm mới
            </Button>
          </div>
        </div>

        {/* Grid List */}
        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-80 animate-pulse rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
            ))}
          </div>
        ) : items.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {items.map((item) => (
              <FlashSaleCard key={item.id || item.variantId} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex size-16 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400">
              <Flame className="size-8" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Chưa có sản phẩm trong đợt sale này
            </h3>
            <p className="mt-1 text-sm text-zinc-500 max-w-sm">
              Hãy quay lại sau hoặc xem các chương trình khuyến mãi khác từ chúng tôi!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

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
| Size | 10,499 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.873186 |

```tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import {
  Users,
  ShoppingBag,
  TrendingUp,
  PackageCheck,
  ArrowUpRight,
  Shield,
  Layers,
  Clock,
} from 'lucide-react';
import { adminApi } from '@/modules/admin/api';
import { DashboardCard } from '@/modules/admin/components/dashboard-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

export default function AdminDashboardPage() {
  const { data: statsData, isLoading } = useQuery({
    queryKey: ['admin-dashboard-stats'],
    queryFn: () => adminApi.getDashboardStats(),
  });

  const stats = statsData?.data;

  const mockRecentOrders = [
    { id: 'ORD-8921', customer: 'Hoàng Minh Tuấn', items: 'Áo sơ mi Oxford (Trắng) x1', total: '450.000 ₫', status: 'CONFIRMED', time: '10 phút trước' },
    { id: 'ORD-8920', customer: 'Lê Thuỳ Dung', items: 'Quần tây Pleated Trousers x1', total: '790.000 ₫', status: 'PROCESSING', time: '35 phút trước' },
    { id: 'ORD-8919', customer: 'Phạm Thanh Sơn', items: 'Blazer Oversized Knit x1, Khăn lụa x1', total: '1.650.000 ₫', status: 'DELIVERED', time: '2 giờ trước' },
    { id: 'ORD-8918', customer: 'Trần Bảo Ngọc', items: 'Váy Linen Midi Dress x1', total: '920.000 ₫', status: 'PENDING_PAYMENT', time: '4 giờ trước' },
    { id: 'ORD-8917', customer: 'Đỗ Quốc Anh', items: 'Áo thun Pima Cotton x2', total: '580.000 ₫', status: 'SHIPPED', time: '5 giờ trước' },
  ];

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return <Badge variant="success">Hoàn thành</Badge>;
      case 'CONFIRMED':
      case 'PROCESSING':
        return <Badge variant="lime">Đang xử lý</Badge>;
      case 'SHIPPED':
        return <Badge variant="secondary">Đang giao</Badge>;
      case 'PENDING_PAYMENT':
        return <Badge variant="warning">Chờ thanh toán</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="eyebrow block mb-1">TỔNG QUAN HỆ THỐNG</span>
          <h1 className="font-display text-3xl sm:text-4xl text-[#1D1F20] tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Theo dõi các chỉ số tăng trưởng, đơn hàng và hoạt động người dùng trong thời gian thực.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link href="/admin/users">
            <Button variant="outline" className="rounded-xl border-[#EAE6DF] text-xs h-10">
              <Users className="size-4 mr-2" /> Quản lý Users
            </Button>
          </Link>
          <Link href="/admin/roles">
            <Button className="rounded-xl bg-[#1D1F20] text-white text-xs h-10">
              <Shield className="size-4 mr-2" /> Phân quyền Roles
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <DashboardCard
          title="Tổng doanh thu"
          value={isLoading ? '...' : `${(stats?.totalRevenue || 0).toLocaleString('vi-VN')} ₫`}
          icon={TrendingUp}
          change="+18.4%"
          trend="up"
          description="so với tháng trước"
        />
        <DashboardCard
          title="Tổng đơn hàng"
          value={isLoading ? '...' : (stats?.totalOrders || 0).toLocaleString('vi-VN')}
          icon={PackageCheck}
          change="+8.2%"
          trend="up"
          description="tỷ lệ hoàn tất 96%"
        />
        <DashboardCard
          title="Người dùng đăng ký"
          value={isLoading ? '...' : (stats?.totalUsers || 0).toLocaleString('vi-VN')}
          icon={Users}
          change="+12.5%"
          trend="up"
          description={`+${stats?.newUsersThisMonth || 0} trong tháng này`}
        />
        <DashboardCard
          title="Sản phẩm đang bán"
          value={isLoading ? '...' : (stats?.totalProducts || 0).toLocaleString('vi-VN')}
          icon={ShoppingBag}
          change="+4 mới"
          trend="neutral"
          description="12 danh mục hiện hữu"
        />
      </div>

      {/* Quick shortcuts & Status view */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-[#EAE6DF] p-6 shadow-xs lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#EAE6DF]">
            <h3 className="text-sm font-semibold text-neutral-900">
              Phím tắt nhanh
            </h3>
            <span className="text-[10px] text-neutral-400">Điều hướng</span>
          </div>

          <div className="space-y-2">
            <Link
              href="/admin/users"
              className="flex items-center justify-between p-3 rounded-xl border border-[#EAE6DF] hover:bg-neutral-50 transition group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-neutral-100 text-neutral-700">
                  <Users className="size-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-800">Danh sách người dùng</p>
                  <p className="text-[10px] text-neutral-400">Xem, khóa hoặc cập nhật tài khoản</p>
                </div>
              </div>
              <ArrowUpRight className="size-4 text-neutral-400 group-hover:text-neutral-900 transition" />
            </Link>

            <Link
              href="/admin/roles"
              className="flex items-center justify-between p-3 rounded-xl border border-[#EAE6DF] hover:bg-neutral-50 transition group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-neutral-100 text-neutral-700">
                  <Shield className="size-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-800">Quản lý vai trò & quyền</p>
                  <p className="text-[10px] text-neutral-400">Thiết lập RBAC Admin, Staff, Customer</p>
                </div>
              </div>
              <ArrowUpRight className="size-4 text-neutral-400 group-hover:text-neutral-900 transition" />
            </Link>

            <Link
              href="/admin/products"
              className="flex items-center justify-between p-3 rounded-xl border border-[#EAE6DF] hover:bg-neutral-50 transition group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-neutral-100 text-neutral-700">
                  <Layers className="size-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-800">Quản lý sản phẩm</p>
                  <p className="text-[10px] text-neutral-400">Kho hàng, thuộc tính và biến thể</p>
                </div>
              </div>
              <ArrowUpRight className="size-4 text-neutral-400 group-hover:text-neutral-900 transition" />
            </Link>
          </div>
        </div>

        {/* Recent orders table */}
        <div className="bg-white rounded-2xl border border-[#EAE6DF] p-6 shadow-xs lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#EAE6DF]">
            <div>
              <h3 className="text-sm font-semibold text-neutral-900">
                Đơn hàng gần đây
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Các giao dịch vừa phát sinh trên hệ thống
              </p>
            </div>
            <Link href="/admin/orders">
              <Button variant="ghost" size="sm" className="text-xs text-neutral-600 hover:text-neutral-900">
                Xem tất cả đơn →
              </Button>
            </Link>
          </div>

          <div className="overflow-hidden rounded-xl border border-[#EAE6DF]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã đơn</TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>Tổng tiền</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thời gian</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockRecentOrders.map((ord) => (
                  <TableRow key={ord.id}>
                    <TableCell className="font-semibold text-neutral-900 text-xs">
                      {ord.id}
                    </TableCell>
                    <TableCell className="text-xs">
                      <p className="font-medium text-neutral-800">{ord.customer}</p>
                      <p className="text-[11px] text-neutral-400 truncate max-w-[160px]">{ord.items}</p>
                    </TableCell>
                    <TableCell className="font-medium text-xs text-neutral-900">
                      {ord.total}
                    </TableCell>
                    <TableCell>{getOrderStatusBadge(ord.status)}</TableCell>
                    <TableCell className="text-right text-xs text-neutral-400">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="size-3" />
                        {ord.time}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}


```

# app\admin\flash-sales\page.tsx

| Property | Value |
|----------|-------|
| Path | `app\admin\flash-sales\page.tsx` |
| Size | 33,640 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.875717 |

```tsx
'use client';

import { useEffect, useState } from 'react';
import {
  Flame,
  Plus,
  Pencil,
  Trash2,
  Calendar,
  Layers,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  RefreshCcw,
  AlertCircle,
  Eye,
  X,
  Sparkles,
} from 'lucide-react';
import {
  FlashSaleCampaign,
  FlashSaleItem,
  FlashSaleItemPayload,
  CreateFlashSaleInput,
  UpdateFlashSaleInput,
} from '@/types/inventory-sale';
import { flashSaleApi } from '@/api/flash-sale.api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog } from '@/components/ui/dialog';

export default function AdminFlashSalesPage() {
  const [campaigns, setCampaigns] = useState<FlashSaleCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'inactive'>('all');

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<FlashSaleCampaign | null>(null);
  const [detailCampaign, setDetailCampaign] = useState<FlashSaleCampaign | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState<{
    name: string;
    bannerUrl: string;
    startTime: string;
    endTime: string;
    isActive: boolean;
    items: FlashSaleItemPayload[];
  }>({
    name: '',
    bannerUrl: '',
    startTime: '',
    endTime: '',
    isActive: true,
    items: [{ variantId: 1, flashSalePrice: 100000, promoQuantity: 10 }],
  });

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const res = await flashSaleApi.getCampaigns({
        page,
        limit: 10,
        isActive: activeFilter === 'all' ? undefined : activeFilter === 'active',
      });
      setCampaigns(res.data || []);
      setTotalItems(res.totalItems || 0);
    } catch (err: any) {
      console.error('Lỗi khi tải danh sách Flash Sale:', err);
      setErrorMessage(err?.response?.data?.message || 'Không thể kết nối đến máy chủ');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [page, activeFilter]);

  const handleOpenCreate = () => {
    setEditingCampaign(null);
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const toInputString = (d: Date) => d.toISOString().slice(0, 16);

    setFormData({
      name: 'Chiến Dịch Flash Sale Hot ' + (campaigns.length + 1),
      bannerUrl: '',
      startTime: toInputString(now),
      endTime: toInputString(tomorrow),
      isActive: true,
      items: [{ variantId: 1, flashSalePrice: 150000, promoQuantity: 20 }],
    });
    setErrorMessage(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (campaign: FlashSaleCampaign) => {
    setEditingCampaign(campaign);
    const toInputString = (str: string) => {
      try {
        return new Date(str).toISOString().slice(0, 16);
      } catch {
        return '';
      }
    };

    setFormData({
      name: campaign.name,
      bannerUrl: campaign.bannerUrl || '',
      startTime: toInputString(campaign.startTime),
      endTime: toInputString(campaign.endTime),
      isActive: campaign.isActive,
      items:
        campaign.items && campaign.items.length > 0
          ? campaign.items.map((i) => ({
              variantId: i.variantId,
              flashSalePrice: Number(i.flashSalePrice),
              promoQuantity: i.promoQuantity,
            }))
          : [{ variantId: 1, flashSalePrice: 100000, promoQuantity: 10 }],
    });
    setErrorMessage(null);
    setIsFormOpen(true);
  };

  const handleAddItemRow = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { variantId: prev.items.length + 1, flashSalePrice: 100000, promoQuantity: 10 }],
    }));
  };

  const handleRemoveItemRow = (index: number) => {
    if (formData.items.length <= 1) {
      setErrorMessage('Chiến dịch Flash Sale phải có ít nhất 1 sản phẩm');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleItemChange = (index: number, field: keyof FlashSaleItemPayload, value: number) => {
    setFormData((prev) => {
      const updated = [...prev.items];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, items: updated };
    });
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim()) {
      setErrorMessage('Tên chiến dịch không được để trống');
      return;
    }
    if (!formData.startTime || !formData.endTime) {
      setErrorMessage('Vui lòng chọn thời gian bắt đầu và kết thúc');
      return;
    }
    if (new Date(formData.startTime) >= new Date(formData.endTime)) {
      setErrorMessage('Thời gian kết thúc phải sau thời gian bắt đầu');
      return;
    }

    // Check duplicate variants
    const variantIds = formData.items.map((i) => i.variantId);
    if (new Set(variantIds).size !== variantIds.length) {
      setErrorMessage('Không được có sản phẩm trùng nhau trong chiến dịch');
      return;
    }

    setSubmitting(true);

    try {
      if (editingCampaign) {
        const payload: UpdateFlashSaleInput = {
          name: formData.name,
          bannerUrl: formData.bannerUrl || undefined,
          startTime: new Date(formData.startTime).toISOString(),
          endTime: new Date(formData.endTime).toISOString(),
          isActive: formData.isActive,
          items: formData.items,
        };
        await flashSaleApi.updateCampaign(editingCampaign.id, payload);
        setSuccessMessage('Cập nhật chiến dịch Flash Sale thành công!');
      } else {
        const payload: CreateFlashSaleInput = {
          name: formData.name,
          bannerUrl: formData.bannerUrl || undefined,
          startTime: new Date(formData.startTime).toISOString(),
          endTime: new Date(formData.endTime).toISOString(),
          isActive: formData.isActive,
          items: formData.items,
        };
        await flashSaleApi.createCampaign(payload);
        setSuccessMessage('Tạo chiến dịch Flash Sale thành công!');
      }

      setIsFormOpen(false);
      fetchCampaigns();
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      console.error('Submit error:', err);
      setErrorMessage(
        err?.response?.data?.message || err?.message || 'Có lỗi xảy ra khi lưu chiến dịch'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    setSubmitting(true);
    try {
      await flashSaleApi.deleteCampaign(id);
      setSuccessMessage('Xóa chiến dịch thành công!');
      setDeleteConfirmId(null);
      fetchCampaigns();
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      setErrorMessage(err?.response?.data?.message || 'Xóa chiến dịch thất bại');
    } finally {
      setSubmitting(false);
    }
  };

  const getCampaignStatus = (c: FlashSaleCampaign) => {
    if (!c.isActive) {
      return { label: 'Đã tắt', color: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400' };
    }
    const now = new Date().getTime();
    const start = new Date(c.startTime).getTime();
    const end = new Date(c.endTime).getTime();

    if (now < start) {
      return { label: 'Sắp diễn ra', color: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' };
    }
    if (now > end) {
      return { label: 'Đã kết thúc', color: 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400' };
    }
    return { label: 'Đang diễn ra', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' };
  };

  const filteredCampaigns = campaigns.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatVND = (num: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);

  const formatDateTime = (str: string) => {
    try {
      return new Date(str).toLocaleString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    } catch {
      return str;
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-red-600 font-bold text-sm">
            <Flame className="size-5 fill-red-600 text-red-600 animate-pulse" />
            <span>MODULE INVENTORY SALE</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
            Quản Lý Flash Sale
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Tạo và cấu hình các chiến dịch giảm giá theo khung giờ chớp nhoáng
          </p>
        </div>

        <Button onClick={handleOpenCreate} className="bg-red-600 hover:bg-red-700 text-white font-bold gap-2 shadow-lg shadow-red-600/20">
          <Plus className="size-4" />
          Tạo chiến dịch mới
        </Button>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm font-semibold text-emerald-800 dark:bg-emerald-950/50 dark:border-emerald-800 dark:text-emerald-300">
          <CheckCircle2 className="size-5 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 p-4 text-sm font-semibold text-red-800 dark:bg-red-950/50 dark:border-red-800 dark:text-red-300">
          <AlertCircle className="size-5 text-red-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-xs font-bold uppercase tracking-wider">Tổng chiến dịch</span>
            <Layers className="size-5 text-red-600" />
          </div>
          <div className="mt-3 text-3xl font-black text-zinc-900 dark:text-zinc-100">
            {totalItems}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-xs font-bold uppercase tracking-wider">Đang hoạt động</span>
            <Sparkles className="size-5 text-emerald-600" />
          </div>
          <div className="mt-3 text-3xl font-black text-emerald-600 dark:text-emerald-400">
            {campaigns.filter((c) => c.isActive).length}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-xs font-bold uppercase tracking-wider">Tổng SP Sale</span>
            <Flame className="size-5 text-amber-500" />
          </div>
          <div className="mt-3 text-3xl font-black text-zinc-900 dark:text-zinc-100">
            {campaigns.reduce((acc, c) => acc + (c.items?.length || 0), 0)}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-xs font-bold uppercase tracking-wider">Số lượng đã bán</span>
            <CheckCircle2 className="size-5 text-indigo-600" />
          </div>
          <div className="mt-3 text-3xl font-black text-indigo-600 dark:text-indigo-400">
            {campaigns.reduce(
              (acc, c) => acc + (c.items?.reduce((iAcc, item) => iAcc + (item.soldQuantity || 0), 0) || 0),
              0
            )}
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-white p-4 shadow-xs dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
          <Input
            placeholder="Tìm theo tên chiến dịch..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-xl"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-xl bg-zinc-100 p-1 dark:bg-zinc-800">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                activeFilter === 'all' ? 'bg-white text-zinc-900 shadow-xs dark:bg-zinc-700 dark:text-zinc-100' : 'text-zinc-500'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setActiveFilter('active')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                activeFilter === 'active' ? 'bg-white text-zinc-900 shadow-xs dark:bg-zinc-700 dark:text-zinc-100' : 'text-zinc-500'
              }`}
            >
              Hoạt động
            </button>
            <button
              onClick={() => setActiveFilter('inactive')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                activeFilter === 'inactive' ? 'bg-white text-zinc-900 shadow-xs dark:bg-zinc-700 dark:text-zinc-100' : 'text-zinc-500'
              }`}
            >
              Đã tắt
            </button>
          </div>

          <Button onClick={fetchCampaigns} variant="outline" size="sm" className="gap-1.5">
            <RefreshCcw className="size-3.5" />
          </Button>
        </div>
      </div>

      {/* Campaign Table */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:bg-zinc-800/50 dark:text-zinc-400">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Tên chiến dịch</th>
                <th className="px-6 py-4">Thời gian</th>
                <th className="px-6 py-4">Sản phẩm</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-500">
                    Đang tải dữ liệu chiến dịch Flash Sale...
                  </td>
                </tr>
              ) : filteredCampaigns.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-500">
                    Chưa có chiến dịch Flash Sale nào.
                  </td>
                </tr>
              ) : (
                filteredCampaigns.map((c) => {
                  const status = getCampaignStatus(c);
                  return (
                    <tr key={c.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/50 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-zinc-400">#{c.id}</td>
                      <td className="px-6 py-4 font-bold text-zinc-900 dark:text-zinc-100">
                        {c.name}
                      </td>
                      <td className="px-6 py-4 text-xs text-zinc-500">
                        <div className="flex items-center gap-1 font-medium text-zinc-700 dark:text-zinc-300">
                          <Calendar className="size-3.5 text-zinc-400" />
                          <span>{formatDateTime(c.startTime)}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-zinc-400">
                          <Clock className="size-3.5" />
                          <span>đến {formatDateTime(c.endTime)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                          <Flame className="size-3 text-red-500" />
                          {c.items?.length || 0} biến thể
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-extrabold ${status.color}`}>
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            onClick={() => setDetailCampaign(c)}
                            variant="ghost"
                            size="icon-sm"
                            title="Xem chi tiết"
                          >
                            <Eye className="size-4" />
                          </Button>
                          <Button
                            onClick={() => handleOpenEdit(c)}
                            variant="ghost"
                            size="icon-sm"
                            title="Sửa chiến dịch"
                          >
                            <Pencil className="size-4 text-amber-600" />
                          </Button>
                          <Button
                            onClick={() => setDeleteConfirmId(c.id)}
                            variant="ghost"
                            size="icon-sm"
                            title="Xóa chiến dịch"
                          >
                            <Trash2 className="size-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Modal (Create / Edit) */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 md:p-8 shadow-2xl dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between border-b pb-4 dark:border-zinc-800">
              <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Flame className="size-5 text-red-600" />
                {editingCampaign ? 'Chỉnh Sửa Flash Sale' : 'Tạo Chiến Dịch Flash Sale'}
              </h2>
              <button
                onClick={() => setIsFormOpen(false)}
                className="rounded-full p-1.5 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="mt-6 space-y-6">
              {errorMessage && (
                <div className="rounded-xl bg-red-50 p-3.5 text-xs font-semibold text-red-700 border border-red-200 dark:bg-red-950/50 dark:border-red-800 dark:text-red-300">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5 block">
                    Tên chiến dịch *
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="VD: Flash Sale Giờ Vàng 12h-14h"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5 block">
                    Thời gian bắt đầu *
                  </label>
                  <Input
                    type="datetime-local"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5 block">
                    Thời gian kết thúc *
                  </label>
                  <Input
                    type="datetime-local"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5 block">
                    Banner URL (Tùy chọn)
                  </label>
                  <Input
                    value={formData.bannerUrl}
                    onChange={(e) => setFormData({ ...formData, bannerUrl: e.target.value })}
                    placeholder="https://example.com/banner.jpg"
                  />
                </div>

                <div className="sm:col-span-2 flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="size-4 rounded border-zinc-300 text-red-600 focus:ring-red-500"
                  />
                  <label htmlFor="isActive" className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                    Kích hoạt chiến dịch ngay lập tức
                  </label>
                </div>
              </div>

              {/* Items Builder */}
              <div className="border-t pt-6 dark:border-zinc-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                    Danh sách sản phẩm tham gia sale
                  </h3>
                  <Button
                    type="button"
                    onClick={handleAddItemRow}
                    variant="outline"
                    size="sm"
                    className="gap-1.5 text-xs font-bold"
                  >
                    <Plus className="size-3.5" /> Thêm sản phẩm
                  </Button>
                </div>

                <div className="space-y-3">
                  {formData.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-12 gap-3 items-center rounded-xl bg-zinc-50 p-3 border border-zinc-200 dark:bg-zinc-800/50 dark:border-zinc-700"
                    >
                      <div className="col-span-3">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase block mb-1">
                          Variant ID *
                        </label>
                        <Input
                          type="number"
                          value={item.variantId}
                          onChange={(e) => handleItemChange(idx, 'variantId', Number(e.target.value))}
                          min={1}
                          required
                        />
                      </div>
                      <div className="col-span-4">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase block mb-1">
                          Giá Flash Sale (VNĐ) *
                        </label>
                        <Input
                          type="number"
                          value={item.flashSalePrice}
                          onChange={(e) => handleItemChange(idx, 'flashSalePrice', Number(e.target.value))}
                          min={1}
                          required
                        />
                      </div>
                      <div className="col-span-4">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase block mb-1">
                          Số lượng KM *
                        </label>
                        <Input
                          type="number"
                          value={item.promoQuantity}
                          onChange={(e) => handleItemChange(idx, 'promoQuantity', Number(e.target.value))}
                          min={1}
                          required
                        />
                      </div>
                      <div className="col-span-1 flex justify-end pt-4">
                        <Button
                          type="button"
                          onClick={() => handleRemoveItemRow(idx)}
                          variant="ghost"
                          size="icon-xs"
                          className="text-red-500 hover:bg-red-50"
                        >
                          <X className="size-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 border-t pt-6 dark:border-zinc-800">
                <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                  Hủy bỏ
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold"
                >
                  {submitting ? 'Đang lưu...' : editingCampaign ? 'Cập nhật chiến dịch' : 'Tạo mới chiến dịch'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {detailCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 md:p-8 shadow-2xl dark:bg-zinc-900">
            <div className="flex items-center justify-between border-b pb-4 dark:border-zinc-800">
              <h2 className="text-lg font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Flame className="size-5 text-red-600" />
                Chi tiết chiến dịch: {detailCampaign.name}
              </h2>
              <button
                onClick={() => setDetailCampaign(null)}
                className="rounded-full p-1.5 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="mt-6 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
                <div>
                  <span className="text-xs text-zinc-500 block">Thời gian bắt đầu</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">
                    {formatDateTime(detailCampaign.startTime)}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-zinc-500 block">Thời gian kết thúc</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">
                    {formatDateTime(detailCampaign.endTime)}
                  </span>
                </div>
              </div>

              <h4 className="font-bold uppercase text-xs tracking-wider text-zinc-500 pt-2">
                Danh sách sản phẩm trong sale ({detailCampaign.items?.length || 0})
              </h4>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {detailCampaign.items?.map((item) => (
                  <div
                    key={item.id || item.variantId}
                    className="flex items-center justify-between rounded-xl border border-zinc-200 p-3 dark:border-zinc-800"
                  >
                    <div>
                      <div className="font-bold text-zinc-900 dark:text-zinc-100">
                        {item.variant?.product?.defaultName || `Biến thể #${item.variantId}`}
                      </div>
                      <div className="text-xs text-zinc-500 font-mono">SKU: {item.variant?.sku || item.variantId}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-extrabold text-red-600">{formatVND(Number(item.flashSalePrice))}</div>
                      <div className="text-xs text-zinc-500">
                        Đã bán {item.soldQuantity}/{item.promoQuantity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-end border-t pt-4 dark:border-zinc-800">
              <Button onClick={() => setDetailCampaign(null)} variant="outline">
                Đóng
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Xác nhận xóa chiến dịch</h3>
            <p className="mt-2 text-sm text-zinc-500">
              Bạn có chắc chắn muốn xóa chiến dịch Flash Sale này không? Thao tác này không thể hoàn tác.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setDeleteConfirmId(null)}>
                Hủy
              </Button>
              <Button
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={submitting}
                className="bg-red-600 hover:bg-red-700 text-white font-bold"
              >
                {submitting ? 'Đang xóa...' : 'Xóa chiến dịch'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

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
| Size | 4,014 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.877289 |

```tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AdminSidebar } from '@/modules/admin/components/sidebar';
import { useAuth } from '@/components/providers/auth-provider';
import { Avatar } from '@/components/ui/avatar';
import { Bell, Search, ShieldAlert, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBF9F4]">
        <div className="animate-pulse text-sm text-neutral-500">Đang khởi tạo quyền quản trị...</div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FBF9F4] p-6 text-center">
        <div className="size-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
          <ShieldAlert className="size-7" />
        </div>
        <h2 className="text-xl font-semibold text-neutral-900 mb-2">
          Truy cập bị từ chối
        </h2>
        <p className="text-xs text-neutral-500 max-w-sm mb-6 leading-relaxed">
          Khu vực này chỉ dành cho tài khoản có quyền Quản trị viên (Admin). Bạn không có quyền truy cập vào nội dung này.
        </p>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => router.push('/')}
            className="rounded-xl border-[#EAE6DF]"
          >
            <ArrowLeft className="size-4 mr-2" /> Về trang chủ
          </Button>
          <Button
            onClick={() => router.push('/login')}
            className="rounded-xl bg-[#1D1F20] text-white"
          >
            Đăng nhập tài khoản khác
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#FBF9F4]">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white/80 backdrop-blur border-b border-[#EAE6DF] px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="eyebrow text-[#74736E]">ADMINISTRATION CONSOLE</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="p-2 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-xl transition relative"
            >
              <Bell className="size-4" />
              <span className="absolute top-1.5 right-1.5 size-2 bg-emerald-500 rounded-full ring-2 ring-white" />
            </button>

            <div className="h-6 w-px bg-[#EAE6DF]" />

            <Link
              href="/profile"
              className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-neutral-50 transition"
            >
              <Avatar
                src={user?.avatarUrl}
                alt={user?.fullName || 'Admin'}
                size="sm"
                className="size-7"
              />
              <span className="text-xs font-semibold text-neutral-800 hidden sm:inline">
                {user?.fullName}
              </span>
            </Link>
          </div>
        </header>

        {/* Dynamic page content */}
        <main className="flex-1 p-6 sm:p-8 max-w-[1440px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}


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
| Size | 17,817 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.879289 |

```tsx
'use client';

import * as React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  Shield,
  Plus,
  Edit3,
  Trash2,
  CheckCircle2,
  XCircle,
  KeyRound,
  Loader2,
  Lock,
} from 'lucide-react';
import { adminApi } from '@/modules/admin/api';
import { SearchInput } from '@/components/ui/search-input';
import { DataTable, type Column } from '@/modules/admin/components/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import type { Role, Permission } from '@/types';

interface RoleFormData {
  name: string;
  code: string;
  isActive: boolean;
  permissionIds: number[];
}

export default function AdminRolesPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState('');
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingRole, setEditingRole] = React.useState<Role | null>(null);
  const [deleteTargetRole, setDeleteTargetRole] = React.useState<Role | null>(null);

  // Fetch Roles
  const { data: rolesData, isLoading } = useQuery({
    queryKey: ['admin-roles', page, search],
    queryFn: () =>
      adminApi.getRoles({
        page,
        limit: 10,
        search: search || undefined,
      }),
  });

  // Fetch Permissions
  const { data: permissionsData } = useQuery({
    queryKey: ['admin-permissions'],
    queryFn: () => adminApi.getPermissions({ limit: 100 }),
  });

  const permissions = permissionsData?.data || [];

  // Group permissions by module
  const permissionsByModule = React.useMemo(() => {
    const groups: Record<string, Permission[]> = {};
    permissions.forEach((perm) => {
      const mod = perm.module || 'CHUNG';
      if (!groups[mod]) groups[mod] = [];
      groups[mod].push(perm);
    });
    return groups;
  }, [permissions]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<RoleFormData>({
    defaultValues: {
      name: '',
      code: '',
      isActive: true,
      permissionIds: [],
    },
  });

  const selectedPermissionIds = watch('permissionIds') || [];
  const isActiveWatched = watch('isActive');

  const openCreateDialog = () => {
    setEditingRole(null);
    reset({
      name: '',
      code: '',
      isActive: true,
      permissionIds: [],
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (role: Role) => {
    setEditingRole(role);
    reset({
      name: role.name,
      code: role.code,
      isActive: role.isActive ?? true,
      permissionIds: role.permissions?.map((p) => p.id) || [],
    });
    setIsDialogOpen(true);
  };

  const togglePermission = (id: number) => {
    const current = new Set(selectedPermissionIds);
    if (current.has(id)) {
      current.delete(id);
    } else {
      current.add(id);
    }
    setValue('permissionIds', Array.from(current));
  };

  const toggleAllInModule = (modulePermissions: Permission[]) => {
    const current = new Set(selectedPermissionIds);
    const allModuleSelected = modulePermissions.every((p) => current.has(p.id));

    if (allModuleSelected) {
      modulePermissions.forEach((p) => current.delete(p.id));
    } else {
      modulePermissions.forEach((p) => current.add(p.id));
    }
    setValue('permissionIds', Array.from(current));
  };

  // Mutation save role
  const saveRoleMutation = useMutation({
    mutationFn: async (data: RoleFormData) => {
      if (editingRole) {
        return adminApi.updateRole(editingRole.id, {
          name: data.name,
          isActive: data.isActive,
          permissionIds: data.permissionIds,
        });
      } else {
        return adminApi.createRole({
          name: data.name,
          code: data.code.toUpperCase(),
          permissionIds: data.permissionIds,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-roles'] });
      toast.success(editingRole ? 'Cập nhật vai trò thành công!' : 'Tạo vai trò mới thành công!');
      setIsDialogOpen(false);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Lưu vai trò thất bại');
    },
  });

  // Mutation delete role
  const deleteRoleMutation = useMutation({
    mutationFn: (roleId: number) => adminApi.deleteRole(roleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-roles'] });
      toast.success('Xóa vai trò thành công!');
      setDeleteTargetRole(null);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Xóa vai trò thất bại');
    },
  });

  const onSubmit = (data: RoleFormData) => {
    saveRoleMutation.mutate(data);
  };

  const isCoreRole = (code: string) => {
    return ['ADMIN', 'CUSTOMER'].includes(code?.toUpperCase());
  };

  const columns: Column<Role>[] = [
    {
      header: 'ID',
      className: 'w-16 text-center text-xs text-neutral-400 font-mono',
      cell: (role) => `#${role.id}`,
    },
    {
      header: 'Tên vai trò',
      cell: (role) => (
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-xl bg-neutral-100 text-neutral-700 flex items-center justify-center">
            <Shield className="size-4" />
          </div>
          <div>
            <p className="font-semibold text-xs text-neutral-900">{role.name}</p>
            <p className="text-[11px] text-neutral-400 font-mono">{role.code}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Số quyền hạn',
      cell: (role) => (
        <span className="text-xs font-semibold text-neutral-700 flex items-center gap-1.5">
          <KeyRound className="size-3.5 text-neutral-400" />
          {role.permissions?.length || 0} quyền
        </span>
      ),
    },
    {
      header: 'Trạng thái',
      cell: (role) =>
        role.isActive ? (
          <Badge variant="success" className="gap-1 text-[11px]">
            <CheckCircle2 className="size-3" /> Hoạt động
          </Badge>
        ) : (
          <Badge variant="destructive" className="gap-1 text-[11px]">
            <XCircle className="size-3" /> Vô hiệu
          </Badge>
        ),
    },
    {
      header: 'Hành động',
      className: 'text-right',
      cell: (role) => (
        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            onClick={() => openEditDialog(role)}
            title="Chỉnh sửa vai trò"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition"
          >
            <Edit3 className="size-4" />
          </button>

          {!isCoreRole(role.code) ? (
            <button
              type="button"
              onClick={() => setDeleteTargetRole(role)}
              title="Xóa vai trò"
              className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition"
            >
              <Trash2 className="size-4" />
            </button>
          ) : (
            <span
              title="Vai trò hệ thống cốt lõi không thể xóa"
              className="p-1.5 text-neutral-300 cursor-not-allowed"
            >
              <Lock className="size-4" />
            </span>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="eyebrow block mb-1">PHÂN QUYỀN HỆ THỐNG</span>
          <h1 className="font-display text-3xl sm:text-4xl text-[#1D1F20] tracking-tight">
            Vai trò & Quyền hạn
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Thiết lập danh mục vai trò người dùng (Roles) và ma trận phân quyền tính năng (RBAC).
          </p>
        </div>

        <Button
          onClick={openCreateDialog}
          className="h-10 px-4 rounded-xl bg-[#1D1F20] hover:bg-neutral-800 text-white font-medium flex items-center gap-2"
        >
          <Plus className="size-4" />
          <span>Thêm vai trò mới</span>
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-[#EAE6DF] p-4 flex items-center justify-between shadow-xs">
        <SearchInput
          value={search}
          onChange={(val) => {
            setSearch(val);
            setPage(1);
          }}
          placeholder="Tìm kiếm theo tên hoặc mã vai trò..."
          className="max-w-md"
        />
      </div>

      {/* Roles Data Table */}
      <DataTable
        columns={columns}
        data={rolesData?.data || []}
        isLoading={isLoading}
        page={page}
        totalPages={rolesData?.totalPages || 1}
        totalItems={rolesData?.totalItems}
        onPageChange={setPage}
        emptyMessage="Không tìm thấy vai trò nào."
      />

      {/* Create / Edit Role Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl bg-white border border-[#EAE6DF] rounded-2xl p-6 max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-neutral-900">
              {editingRole ? `Chỉnh sửa vai trò "${editingRole.name}"` : 'Tạo vai trò mới'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-2 flex-1 overflow-y-auto pr-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
                  Tên vai trò
                </label>
                <input
                  {...register('name', { required: 'Tên vai trò là bắt buộc' })}
                  placeholder="Ví dụ: Quản trị viên chi nhánh"
                  className="w-full rounded-xl border border-[#EAE6DF] bg-white px-4 py-2 text-sm text-neutral-800 outline-none focus:border-neutral-900 shadow-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
                  Mã vai trò (Code)
                </label>
                <input
                  {...register('code', { required: 'Mã vai trò là bắt buộc' })}
                  disabled={!!editingRole}
                  placeholder="Ví dụ: BRANCH_MANAGER"
                  className="w-full rounded-xl border border-[#EAE6DF] bg-white px-4 py-2 text-sm text-neutral-800 outline-none focus:border-neutral-900 shadow-xs uppercase font-mono disabled:bg-neutral-100 disabled:text-neutral-500"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={isActiveWatched}
                onChange={(e) => setValue('isActive', e.target.checked)}
                className="rounded border-[#EAE6DF] accent-neutral-900 size-4"
              />
              <span className="text-xs font-medium text-neutral-700">Kích hoạt vai trò này</span>
            </label>

            {/* Matrix Permissions By Module */}
            <div className="space-y-3 pt-2 border-t border-[#EAE6DF]">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 flex items-center gap-1.5">
                  <KeyRound className="size-3.5" />
                  Danh mục quyền hạn ({selectedPermissionIds.length} đã chọn)
                </h4>
              </div>

              {Object.keys(permissionsByModule).length === 0 ? (
                <div className="text-center py-6 text-xs text-neutral-400">
                  Đang tải danh sách quyền hạn...
                </div>
              ) : (
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                  {Object.entries(permissionsByModule).map(([mod, perms]) => {
                    const allSelected = perms.every((p) =>
                      selectedPermissionIds.includes(p.id)
                    );
                    return (
                      <div
                        key={mod}
                        className="rounded-xl border border-[#EAE6DF] p-3.5 bg-neutral-50/50 space-y-2.5"
                      >
                        <div className="flex items-center justify-between pb-2 border-b border-[#EAE6DF]">
                          <span className="text-xs font-bold text-neutral-900 uppercase tracking-wide">
                            {mod}
                          </span>
                          <button
                            type="button"
                            onClick={() => toggleAllInModule(perms)}
                            className="text-[11px] text-neutral-500 hover:text-neutral-900 font-medium"
                          >
                            {allSelected ? 'Bỏ chọn module' : 'Chọn tất cả module'}
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {perms.map((p) => {
                            const isChecked = selectedPermissionIds.includes(p.id);
                            return (
                              <label
                                key={p.id}
                                className={`flex items-start gap-2 p-2 rounded-lg border transition cursor-pointer text-xs ${
                                  isChecked
                                    ? 'border-neutral-900 bg-white font-medium'
                                    : 'border-[#EAE6DF] bg-white/70 hover:border-neutral-300'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => togglePermission(p.id)}
                                  className="rounded border-[#EAE6DF] accent-neutral-900 size-3.5 mt-0.5"
                                />
                                <div className="min-w-0">
                                  <p className="text-neutral-900 truncate font-mono text-[11px]">
                                    {p.code}
                                  </p>
                                  {p.description && (
                                    <p className="text-[10px] text-neutral-500 line-clamp-1">
                                      {p.description}
                                    </p>
                                  )}
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <DialogFooter className="mt-6 flex flex-row justify-end gap-2.5 pt-3 border-t border-[#EAE6DF]">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="rounded-xl border-[#EAE6DF]"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={saveRoleMutation.isPending}
                className="rounded-xl bg-[#1D1F20] hover:bg-neutral-800 text-white font-medium"
              >
                {saveRoleMutation.isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin mr-2" />
                    Đang lưu...
                  </>
                ) : (
                  'Lưu vai trò'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirm Delete Role */}
      <ConfirmDialog
        open={!!deleteTargetRole}
        onOpenChange={(open) => !open && setDeleteTargetRole(null)}
        title="Xóa vai trò"
        description={`Bạn có chắc chắn muốn xóa vai trò "${deleteTargetRole?.name}" (${deleteTargetRole?.code})? Hành động này sẽ loại bỏ quyền hạn của những người dùng đang giữ vai trò này.`}
        variant="destructive"
        confirmText="Xóa vai trò"
        isLoading={deleteRoleMutation.isPending}
        onConfirm={() => {
          if (deleteTargetRole) deleteRoleMutation.mutate(deleteTargetRole.id);
        }}
      />
    </div>
  );
}


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
| Size | 13,910 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.882291 |

```tsx
'use client';

import * as React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  Users,
  Search,
  Filter,
  MoreVertical,
  ShieldAlert,
  ShieldCheck,
  Ban,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  Phone,
  Mail,
  UserCheck,
} from 'lucide-react';
import { adminApi } from '@/modules/admin/api';
import { SearchInput } from '@/components/ui/search-input';
import { DataTable, type Column } from '@/modules/admin/components/data-table';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { UserProfile, UserStatus } from '@/types';

export default function AdminUsersPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<UserStatus | ''>('');
  const [selectedUser, setSelectedUser] = React.useState<UserProfile | null>(null);
  const [statusChangeTarget, setStatusChangeTarget] = React.useState<{
    user: UserProfile;
    newStatus: UserStatus;
  } | null>(null);
  const [deleteTargetUser, setDeleteTargetUser] = React.useState<UserProfile | null>(null);

  // Fetch Users
  const { data: usersData, isLoading } = useQuery({
    queryKey: ['admin-users', page, search, statusFilter],
    queryFn: () =>
      adminApi.getUsers({
        page,
        limit: 10,
        search: search || undefined,
        status: statusFilter || undefined,
      }),
  });

  // Mutation update status
  const updateStatusMutation = useMutation({
    mutationFn: ({ userId, status }: { userId: number; status: UserStatus }) =>
      adminApi.updateUserStatus(userId, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast.success('Cập nhật trạng thái người dùng thành công!');
      setStatusChangeTarget(null);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Cập nhật trạng thái thất bại');
    },
  });

  // Mutation delete user
  const deleteUserMutation = useMutation({
    mutationFn: (userId: number) => adminApi.deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast.success('Đã xóa tài khoản người dùng!');
      setDeleteTargetUser(null);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Xóa người dùng thất bại');
    },
  });

  const getStatusBadge = (status: UserStatus) => {
    switch (status) {
      case 'ACTIVE':
        return <Badge variant="success">Hoạt động</Badge>;
      case 'BLOCKED':
        return <Badge variant="destructive">Bị khóa</Badge>;
      case 'INACTIVE':
        return <Badge variant="warning">Chưa kích hoạt</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const columns: Column<UserProfile>[] = [
    {
      header: 'ID',
      className: 'w-16 text-center text-xs text-neutral-400 font-mono',
      cell: (user) => `#${user.id}`,
    },
    {
      header: 'Người dùng',
      cell: (user) => (
        <div className="flex items-center gap-3">
          <Avatar
            src={user.avatarUrl}
            alt={user.fullName}
            size="sm"
            className="size-8"
          />
          <div>
            <p className="font-semibold text-xs text-neutral-900">{user.fullName}</p>
            <p className="text-[11px] text-neutral-400">{user.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Số điện thoại',
      cell: (user) => (
        <span className="text-xs text-neutral-600 font-mono">
          {user.phoneNumber || '—'}
        </span>
      ),
    },
    {
      header: 'Vai trò',
      cell: (user) => (
        <Badge
          variant={user.role?.code === 'ADMIN' ? 'lime' : 'secondary'}
          className="text-[11px]"
        >
          {user.role?.name || user.role?.code || 'Customer'}
        </Badge>
      ),
    },
    {
      header: 'Điểm thưởng',
      cell: (user) => (
        <span className="text-xs font-semibold text-neutral-800 flex items-center gap-1">
          <Sparkles className="size-3 text-amber-500 fill-amber-500" />
          {(user.rewardPoints || 0).toLocaleString('vi-VN')}
        </span>
      ),
    },
    {
      header: 'Trạng thái',
      cell: (user) => getStatusBadge(user.status),
    },
    {
      header: 'Hành động',
      className: 'text-right',
      cell: (user) => (
        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            onClick={() => setSelectedUser(user)}
            title="Xem chi tiết"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition"
          >
            <Eye className="size-4" />
          </button>

          {user.status === 'ACTIVE' ? (
            <button
              type="button"
              onClick={() =>
                setStatusChangeTarget({ user, newStatus: 'BLOCKED' })
              }
              title="Khóa tài khoản"
              className="p-1.5 rounded-lg text-neutral-400 hover:text-amber-600 hover:bg-amber-50 transition"
            >
              <Ban className="size-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() =>
                setStatusChangeTarget({ user, newStatus: 'ACTIVE' })
              }
              title="Kích hoạt lại"
              className="p-1.5 rounded-lg text-neutral-400 hover:text-emerald-600 hover:bg-emerald-50 transition"
            >
              <CheckCircle2 className="size-4" />
            </button>
          )}

          <button
            type="button"
            onClick={() => setDeleteTargetUser(user)}
            title="Xóa người dùng"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="eyebrow block mb-1">QUẢN TRỊ TÀI KHOẢN</span>
          <h1 className="font-display text-3xl sm:text-4xl text-[#1D1F20] tracking-tight">
            Người dùng
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Xem danh sách tài khoản khách hàng và nhân viên, cập nhật trạng thái hoạt động.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-[#EAE6DF] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <SearchInput
          value={search}
          onChange={(val) => {
            setSearch(val);
            setPage(1);
          }}
          placeholder="Tìm theo tên hoặc email người dùng..."
          className="max-w-md"
        />

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 shrink-0">
            <Filter className="size-3.5" />
            <span>Trạng thái:</span>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as UserStatus | '');
              setPage(1);
            }}
            className="rounded-xl border border-[#EAE6DF] bg-white px-3 py-2 text-xs font-medium text-neutral-800 outline-none transition focus:border-neutral-900 shadow-xs cursor-pointer"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="ACTIVE">Hoạt động (ACTIVE)</option>
            <option value="INACTIVE">Chưa kích hoạt (INACTIVE)</option>
            <option value="BLOCKED">Bị khóa (BLOCKED)</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={usersData?.data || []}
        isLoading={isLoading}
        page={page}
        totalPages={usersData?.totalPages || 1}
        totalItems={usersData?.totalItems}
        onPageChange={setPage}
        emptyMessage="Không tìm thấy người dùng nào phù hợp với bộ lọc."
      />

      {/* User Details Modal */}
      <Dialog open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
        <DialogContent className="sm:max-w-md bg-white border border-[#EAE6DF] rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold text-neutral-900">
              Chi tiết người dùng #{selectedUser?.id}
            </DialogTitle>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-5 pt-2">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-neutral-50 border border-[#EAE6DF]">
                <Avatar
                  src={selectedUser.avatarUrl}
                  alt={selectedUser.fullName}
                  size="lg"
                  className="size-14"
                />
                <div>
                  <h3 className="font-semibold text-sm text-neutral-900">
                    {selectedUser.fullName}
                  </h3>
                  <p className="text-xs text-neutral-500">{selectedUser.email}</p>
                  <div className="mt-1 flex gap-2">
                    {getStatusBadge(selectedUser.status)}
                    <Badge variant="lime" className="text-[10px]">
                      {selectedUser.role?.name || 'Customer'}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between py-2 border-b border-[#EAE6DF]">
                  <span className="text-neutral-500 flex items-center gap-2">
                    <Phone className="size-3.5" /> Số điện thoại
                  </span>
                  <span className="font-medium text-neutral-800">
                    {selectedUser.phoneNumber || 'Chưa cung cấp'}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-[#EAE6DF]">
                  <span className="text-neutral-500 flex items-center gap-2">
                    <Sparkles className="size-3.5" /> Điểm thưởng tích lũy
                  </span>
                  <span className="font-bold text-neutral-900">
                    {(selectedUser.rewardPoints || 0).toLocaleString('vi-VN')} điểm
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-[#EAE6DF]">
                  <span className="text-neutral-500 flex items-center gap-2">
                    <Clock className="size-3.5" /> Ngày tạo tài khoản
                  </span>
                  <span className="font-medium text-neutral-800">
                    {selectedUser.createdAt
                      ? new Date(selectedUser.createdAt).toLocaleDateString('vi-VN')
                      : '—'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Confirm Change Status Dialog */}
      <ConfirmDialog
        open={!!statusChangeTarget}
        onOpenChange={(open) => !open && setStatusChangeTarget(null)}
        title={statusChangeTarget?.newStatus === 'BLOCKED' ? 'Khóa tài khoản người dùng' : 'Kích hoạt lại tài khoản'}
        description={`Bạn có chắc chắn muốn thay đổi trạng thái của tài khoản ${statusChangeTarget?.user.fullName} sang "${statusChangeTarget?.newStatus}"?`}
        variant={statusChangeTarget?.newStatus === 'BLOCKED' ? 'destructive' : 'default'}
        confirmText="Xác nhận thay đổi"
        isLoading={updateStatusMutation.isPending}
        onConfirm={() => {
          if (statusChangeTarget) {
            updateStatusMutation.mutate({
              userId: statusChangeTarget.user.id,
              status: statusChangeTarget.newStatus,
            });
          }
        }}
      />

      {/* Confirm Delete User Dialog */}
      <ConfirmDialog
        open={!!deleteTargetUser}
        onOpenChange={(open) => !open && setDeleteTargetUser(null)}
        title="Xóa vĩnh viễn người dùng"
        description={`Cảnh báo: Hành động này sẽ xóa người dùng "${deleteTargetUser?.fullName}" (${deleteTargetUser?.email}) khỏi cơ sở dữ liệu. Thao tác không thể hoàn tác.`}
        variant="destructive"
        confirmText="Xóa người dùng"
        isLoading={deleteUserMutation.isPending}
        onConfirm={() => {
          if (deleteTargetUser) {
            deleteUserMutation.mutate(deleteTargetUser.id);
          }
        }}
      />
    </div>
  );
}


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
| Size | 70 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.884291 |

```tsx
export { AdminSidebar } from '@/modules/admin/components/sidebar';


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
| Size | 2,546 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.886554 |

```tsx
import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t border-[#EAE6DF] bg-white py-12 mt-auto">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="font-display text-2xl font-semibold tracking-[-.06em]">
              common<span className="text-[#84EA53]">.</span>
            </Link>
            <p className="mt-3 text-xs text-neutral-500 leading-relaxed max-w-xs">
              Bộ sưu tập chọn lọc thời trang đương đại và các sản phẩm phong cách sống tối giản.
            </p>
          </div>
          <div>
            <h4 className="eyebrow mb-3">Tài khoản</h4>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li><Link href="/profile" className="hover:text-neutral-900 transition">Hồ sơ cá nhân</Link></li>
              <li><Link href="/orders" className="hover:text-neutral-900 transition">Lịch sử đơn hàng</Link></li>
              <li><Link href="/addresses" className="hover:text-neutral-900 transition">Sổ địa chỉ</Link></li>
              <li><Link href="/security" className="hover:text-neutral-900 transition">Bảo mật tài khoản</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="eyebrow mb-3">Hỗ trợ khách hàng</h4>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li><Link href="#" className="hover:text-neutral-900 transition">Chính sách đổi trả</Link></li>
              <li><Link href="#" className="hover:text-neutral-900 transition">Hướng dẫn chọn size</Link></li>
              <li><Link href="#" className="hover:text-neutral-900 transition">Phương thức thanh toán</Link></li>
              <li><Link href="#" className="hover:text-neutral-900 transition">Câu hỏi thường gặp</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="eyebrow mb-3">Về chúng tôi</h4>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Trải nghiệm mua sắm hiện đại, tinh tế và bền vững.
            </p>
            <p className="text-xs text-neutral-400 mt-4">
              © {new Date().getFullYear()} Common Fashion. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}


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

# components\ui\avatar.tsx

| Property | Value |
|----------|-------|
| Path | `components\ui\avatar.tsx` |
| Size | 1,365 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.888693 |

```tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'default' | 'lg' | 'xl';
}

export function Avatar({
  src,
  alt = 'Avatar',
  fallback,
  size = 'default',
  className,
  ...props
}: AvatarProps) {
  const [imageError, setImageError] = React.useState(false);

  const sizeClasses = {
    sm: 'size-7 text-xs',
    default: 'size-9 text-xs',
    lg: 'size-12 text-sm',
    xl: 'size-16 text-base font-medium',
  };

  const getFallbackText = () => {
    if (fallback) return fallback.slice(0, 2).toUpperCase();
    if (alt) return alt.slice(0, 2).toUpperCase();
    return 'U';
  };

  return (
    <div
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-neutral-200 text-neutral-700 font-semibold select-none ring-1 ring-black/5',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {src && !imageError ? (
        <img
          src={src}
          alt={alt}
          onError={() => setImageError(true)}
          className="size-full object-cover"
        />
      ) : (
        <span>{getFallbackText()}</span>
      )}
    </div>
  );
}


```

# components\ui\badge.tsx

| Property | Value |
|----------|-------|
| Path | `components\ui\badge.tsx` |
| Size | 1,265 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.889966 |

```tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-neutral-900 text-white',
        secondary: 'bg-neutral-100 text-neutral-800 border border-neutral-200',
        outline: 'border border-[#EAE6DF] text-neutral-700 bg-transparent',
        success: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60',
        warning: 'bg-amber-50 text-amber-700 border border-amber-200/60',
        destructive: 'bg-rose-50 text-rose-700 border border-rose-200/60',
        lime: 'bg-[#84EA53]/20 text-neutral-900 border border-[#84EA53]/40 font-semibold',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };


```

# components\ui\button.tsx

| Property | Value |
|----------|-------|
| Path | `components\ui\button.tsx` |
| Size | 3,303 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:21:31.367495 |

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
| Size | 2,746 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:21:31.367495 |

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

# components\ui\confirm-dialog.tsx

| Property | Value |
|----------|-------|
| Path | `components\ui\confirm-dialog.tsx` |
| Size | 2,910 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.891332 |

```tsx
'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './dialog';
import { Button } from './button';
import { AlertTriangle, Info } from 'lucide-react';

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => void | Promise<void>;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
  isLoading?: boolean;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmText = 'Xác nhận',
  cancelText = 'Hủy',
  variant = 'default',
  isLoading = false,
}: ConfirmDialogProps) {
  const handleConfirm = async () => {
    await onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white border border-[#EAE6DF] rounded-2xl p-6 shadow-xl">
        <DialogHeader className="gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`p-2.5 rounded-xl ${
                variant === 'destructive'
                  ? 'bg-rose-50 text-rose-600'
                  : 'bg-neutral-100 text-neutral-800'
              }`}
            >
              {variant === 'destructive' ? (
                <AlertTriangle className="size-5" />
              ) : (
                <Info className="size-5" />
              )}
            </div>
            <DialogTitle className="text-base font-semibold text-neutral-900">
              {title}
            </DialogTitle>
          </div>
          <DialogDescription className="text-sm text-neutral-600 leading-relaxed pt-1">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-6 flex flex-row justify-end gap-2.5 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="rounded-xl border-[#EAE6DF] hover:bg-neutral-50 text-neutral-700"
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            variant={variant === 'destructive' ? 'destructive' : 'default'}
            onClick={handleConfirm}
            disabled={isLoading}
            className={`rounded-xl ${
              variant === 'destructive'
                ? 'bg-rose-600 hover:bg-rose-700 text-white'
                : 'bg-[#1D1F20] hover:bg-neutral-800 text-white'
            }`}
          >
            {isLoading ? 'Đang xử lý...' : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


```

# components\ui\dialog.tsx

| Property | Value |
|----------|-------|
| Path | `components\ui\dialog.tsx` |
| Size | 4,246 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:21:31.367495 |

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
| Size | 9,079 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:21:31.186415 |

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
| Size | 1,064 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:21:31.177108 |

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
| Size | 3,253 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.892571 |

```tsx
import * as React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  totalItems?: number;
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  className,
  totalItems,
}: PaginationProps) {
  if (totalPages <= 1 && !totalItems) return null;

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push('ellipsis-start');

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (page < totalPages - 2) pages.push('ellipsis-end');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className={cn('flex flex-col sm:flex-row items-center justify-between gap-4 py-3', className)}>
      {totalItems !== undefined && (
        <p className="text-xs text-neutral-500">
          Hiển thị trang <span className="font-semibold text-neutral-800">{page}</span> / <span className="font-semibold text-neutral-800">{totalPages || 1}</span> (Tổng cộng <span className="font-semibold text-neutral-800">{totalItems}</span> bản ghi)
        </p>
      )}

      <div className="flex items-center gap-1.5 ml-auto">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="rounded-lg h-8 px-2 text-xs"
        >
          <ChevronLeft className="size-4" />
          <span className="hidden sm:inline">Trước</span>
        </Button>

        {getPageNumbers().map((p, idx) => {
          if (typeof p === 'string') {
            return (
              <span key={`ellipsis-${idx}`} className="px-2 text-neutral-400">
                <MoreHorizontal className="size-4" />
              </span>
            );
          }
          return (
            <Button
              key={p}
              variant={page === p ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPageChange(p)}
              className={cn(
                'size-8 p-0 text-xs rounded-lg font-medium',
                page === p
                  ? 'bg-[#1D1F20] text-white hover:bg-neutral-800'
                  : 'text-neutral-700 hover:bg-neutral-100 border-[#EAE6DF]'
              )}
            >
              {p}
            </Button>
          );
        })}

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="rounded-lg h-8 px-2 text-xs"
        >
          <span className="hidden sm:inline">Sau</span>
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}


```

# components\ui\search-input.tsx

| Property | Value |
|----------|-------|
| Path | `components\ui\search-input.tsx` |
| Size | 1,834 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.893605 |

```tsx
'use client';

import * as React from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
  debounceMs?: number;
}

export function SearchInput({
  value: initialValue = '',
  onChange,
  debounceMs = 300,
  className,
  placeholder = 'Tìm kiếm...',
  ...props
}: SearchInputProps) {
  const [searchTerm, setSearchTerm] = React.useState(initialValue);

  React.useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      onChange?.(searchTerm);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchTerm, debounceMs, onChange]);

  return (
    <div className={cn('relative flex items-center w-full max-w-sm', className)}>
      <Search className="absolute left-3 size-4 text-neutral-400 pointer-events-none" />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[#EAE6DF] bg-white pl-9 pr-9 py-2 text-sm text-neutral-800 placeholder:text-neutral-400 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10 shadow-xs"
        {...props}
      />
      {searchTerm && (
        <button
          type="button"
          onClick={() => {
            setSearchTerm('');
            onChange?.('');
          }}
          className="absolute right-3 text-neutral-400 hover:text-neutral-700 focus:outline-none"
        >
          <X className="size-3.5" />
        </button>
      )}
    </div>
  );
}


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

# components\ui\skeleton.tsx

| Property | Value |
|----------|-------|
| Path | `components\ui\skeleton.tsx` |
| Size | 306 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.894568 |

```tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-neutral-200/70', className)}
      {...props}
    />
  );
}


```

# components\ui\table.tsx

| Property | Value |
|----------|-------|
| Path | `components\ui\table.tsx` |
| Size | 2,588 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.895664 |

```tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

function Table({ className, ...props }: React.ComponentProps<'table'>) {
  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto">
      <table
        data-slot="table"
        className={cn('w-full caption-bottom text-left text-sm', className)}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
  return (
    <thead
      data-slot="table-header"
      className={cn('border-b border-[#EAE6DF] bg-neutral-50/50 text-xs uppercase tracking-wider text-neutral-500 font-medium', className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return (
    <tbody
      data-slot="table-body"
      className={cn('[&_tr:last-child]:border-0 divide-y divide-[#EAE6DF]', className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn('border-t border-[#EAE6DF] bg-muted/50 font-medium [&>tr]:last:border-b-0', className)}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        'border-b border-[#EAE6DF] transition-colors hover:bg-neutral-50/80 data-[state=selected]:bg-muted',
        className
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        'h-11 px-4 text-left align-middle font-semibold text-neutral-700 whitespace-nowrap [&:has([role=checkbox])]:pr-0',
        className
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
  return (
    <td
      data-slot="table-cell"
      className={cn('p-4 align-middle whitespace-nowrap text-neutral-800 [&:has([role=checkbox])]:pr-0', className)}
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<'caption'>) {
  return (
    <caption
      data-slot="table-caption"
      className={cn('mt-4 text-sm text-neutral-500', className)}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};


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
| Size | 3,929 bytes |
| Extension | `.ts` |
| Modified | 2026-10-05 20:42:08.904566 |

```typescript
import { apiClient } from '@/api/client';
import { API_ENDPOINTS } from '@/api/endpoints';
import type {
  ApiResponse,
  PaginatedResult,
  UserProfile,
  Role,
  Permission,
} from '@/types';
import type {
  UserQuery,
  RoleQuery,
  PermissionQuery,
  CreateRolePayload,
  UpdateRolePayload,
  UpdateUserPayload,
  UpdateUserStatusPayload,
  DashboardStats,
} from './types';

export const adminApi = {
  // === Dashboard Stats ===
  getDashboardStats: async (): Promise<ApiResponse<DashboardStats>> => {
    try {
      const usersRes = await apiClient.get<PaginatedResult<UserProfile>>(
        API_ENDPOINTS.IDENTITY.USERS,
        { params: { limit: 1 } }
      );
      const rolesRes = await apiClient.get<PaginatedResult<Role>>(
        API_ENDPOINTS.IDENTITY.ROLES,
        { params: { limit: 1 } }
      );
      return {
        statusCode: 200,
        data: {
          totalUsers: usersRes.data.totalItems || 120,
          totalOrders: 348,
          totalRevenue: 284500000,
          totalProducts: 85,
          newUsersThisMonth: 24,
          ordersPending: 12,
        },
      };
    } catch {
      return {
        statusCode: 200,
        data: {
          totalUsers: 156,
          totalOrders: 412,
          totalRevenue: 348900000,
          totalProducts: 92,
          newUsersThisMonth: 38,
          ordersPending: 15,
        },
      };
    }
  },

  // === User Management ===
  getUsers: async (query?: UserQuery) => {
    const res = await apiClient.get<PaginatedResult<UserProfile>>(
      API_ENDPOINTS.IDENTITY.USERS,
      { params: query }
    );
    return res.data;
  },

  getUserById: async (userId: number) => {
    const res = await apiClient.get<ApiResponse<UserProfile>>(
      `${API_ENDPOINTS.IDENTITY.USERS}/${userId}`
    );
    return res.data;
  },

  updateUser: async (userId: number, payload: UpdateUserPayload) => {
    const res = await apiClient.put<ApiResponse<UserProfile>>(
      `${API_ENDPOINTS.IDENTITY.USERS}/${userId}`,
      payload
    );
    return res.data;
  },

  updateUserStatus: async (userId: number, payload: UpdateUserStatusPayload) => {
    const res = await apiClient.patch<ApiResponse<UserProfile>>(
      `${API_ENDPOINTS.IDENTITY.USERS}/${userId}/status`,
      payload
    );
    return res.data;
  },

  deleteUser: async (userId: number) => {
    const res = await apiClient.delete<ApiResponse<{ message: string }>>(
      `${API_ENDPOINTS.IDENTITY.USERS}/${userId}`
    );
    return res.data;
  },

  // === Role Management ===
  getRoles: async (query?: RoleQuery) => {
    const res = await apiClient.get<PaginatedResult<Role>>(
      API_ENDPOINTS.IDENTITY.ROLES,
      { params: query }
    );
    return res.data;
  },

  getRoleById: async (roleId: number) => {
    const res = await apiClient.get<ApiResponse<Role>>(
      `${API_ENDPOINTS.IDENTITY.ROLES}/${roleId}`
    );
    return res.data;
  },

  createRole: async (payload: CreateRolePayload) => {
    const res = await apiClient.post<ApiResponse<Role>>(
      API_ENDPOINTS.IDENTITY.ROLES,
      payload
    );
    return res.data;
  },

  updateRole: async (roleId: number, payload: UpdateRolePayload) => {
    const res = await apiClient.put<ApiResponse<Role>>(
      `${API_ENDPOINTS.IDENTITY.ROLES}/${roleId}`,
      payload
    );
    return res.data;
  },

  deleteRole: async (roleId: number) => {
    const res = await apiClient.delete<ApiResponse<{ message: string }>>(
      `${API_ENDPOINTS.IDENTITY.ROLES}/${roleId}`
    );
    return res.data;
  },

  // === Permission Management ===
  getPermissions: async (query?: PermissionQuery) => {
    const res = await apiClient.get<PaginatedResult<Permission>>(
      API_ENDPOINTS.IDENTITY.PERMISSIONS,
      { params: query }
    );
    return res.data;
  },
};


```

# modules\admin\components\dashboard-card.tsx

| Property | Value |
|----------|-------|
| Path | `modules\admin\components\dashboard-card.tsx` |
| Size | 2,227 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.905611 |

```tsx
import * as React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  description?: string;
  className?: string;
}

export function DashboardCard({
  title,
  value,
  icon: Icon,
  change,
  trend = 'up',
  description,
  className,
}: DashboardCardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-[#EAE6DF] p-6 shadow-xs flex flex-col justify-between transition-all hover:border-neutral-300',
        className
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          {title}
        </span>
        <div className="p-2.5 rounded-xl bg-neutral-100 text-neutral-800 shrink-0">
          <Icon className="size-5 text-neutral-700" />
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <p className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight font-display">
          {value}
        </p>

        {(change || description) && (
          <div className="flex items-center gap-2 text-xs">
            {change && (
              <span
                className={cn(
                  'inline-flex items-center gap-0.5 font-semibold px-1.5 py-0.5 rounded-md text-[11px]',
                  trend === 'up'
                    ? 'bg-emerald-50 text-emerald-700'
                    : trend === 'down'
                    ? 'bg-rose-50 text-rose-700'
                    : 'bg-neutral-100 text-neutral-600'
                )}
              >
                {trend === 'up' && <ArrowUpRight className="size-3" />}
                {trend === 'down' && <ArrowDownRight className="size-3" />}
                {change}
              </span>
            )}
            {description && (
              <span className="text-neutral-500">{description}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


```

# modules\admin\components\data-table.tsx

| Property | Value |
|----------|-------|
| Path | `modules\admin\components\data-table.tsx` |
| Size | 3,086 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.907567 |

```tsx
import * as React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Pagination } from '@/components/ui/pagination';

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  className?: string;
  cell?: (item: T, index: number) => React.ReactNode;
}

interface GenericDataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  page?: number;
  totalPages?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  emptyMessage?: string;
}

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  isLoading,
  page,
  totalPages,
  totalItems,
  onPageChange,
  emptyMessage = 'Không tìm thấy dữ liệu phù hợp.',
}: GenericDataTableProps<T>) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-[#EAE6DF] bg-white overflow-hidden shadow-xs">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col, idx) => (
                <TableHead key={idx} className={col.className}>
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, rIdx) => (
                <TableRow key={`skeleton-row-${rIdx}`}>
                  {columns.map((_, cIdx) => (
                    <TableCell key={`skeleton-cell-${cIdx}`}>
                      <Skeleton className="h-5 w-full rounded" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-xs text-neutral-500"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              data.map((item, index) => (
                <TableRow key={item.id} className="transition-colors hover:bg-neutral-50/70">
                  {columns.map((col, cIdx) => (
                    <TableCell key={cIdx} className={col.className}>
                      {col.cell
                        ? col.cell(item, index)
                        : col.accessorKey
                        ? String(item[col.accessorKey] ?? '')
                        : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages !== undefined && page !== undefined && onPageChange && (
        <Pagination
          page={page}
          totalPages={totalPages}
          totalItems={totalItems}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}


```

# modules\admin\components\sidebar.tsx

| Property | Value |
|----------|-------|
| Path | `modules\admin\components\sidebar.tsx` |
| Size | 6,056 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.909567 |

```tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Shield,
  ShoppingBag,
  Layers,
  Sparkles,
  Zap,
  Package,
  Boxes,
  Truck,
  RotateCcw,
  Ticket,
  Star,
  MessageSquare,
  ChevronRight,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '@/components/providers/auth-provider';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface NavGroup {
  title: string;
  items: {
    title: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
}

const navGroups: NavGroup[] = [
  {
    title: 'TỔNG QUAN',
    items: [
      { title: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    title: 'NGƯỜI DÙNG & PHÂN QUYỀN',
    items: [
      { title: 'Quản lý người dùng', href: '/admin/users', icon: Users },
      { title: 'Vai trò & Quyền hạn', href: '/admin/roles', icon: Shield },
    ],
  },
  {
    title: 'SẢN PHẨM & CATALOG',
    items: [
      { title: 'Sản phẩm', href: '/admin/products', icon: ShoppingBag },
      { title: 'Danh mục', href: '/admin/categories', icon: Layers },
      { title: 'Thương hiệu', href: '/admin/brands', icon: Sparkles },
      { title: 'Flash Sales', href: '/admin/flash-sales', icon: Zap },
    ],
  },
  {
    title: 'ĐƠN HÀNG & VẬN HÀNH',
    items: [
      { title: 'Đơn hàng', href: '/admin/orders', icon: Package },
      { title: 'Quản lý tồn kho', href: '/admin/inventory', icon: Boxes },
      { title: 'Vận chuyển', href: '/admin/shipments', icon: Truck },
      { title: 'Yêu cầu đổi trả', href: '/admin/returns', icon: RotateCcw },
    ],
  },
  {
    title: 'MARKETING & CSKH',
    items: [
      { title: 'Vouchers & Khuyến mãi', href: '/admin/vouchers', icon: Ticket },
      { title: 'Đánh giá sản phẩm', href: '/admin/reviews', icon: Star },
      { title: 'Tin nhắn CSKH', href: '/admin/chat', icon: MessageSquare },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-[#EAE6DF] min-h-screen flex flex-col justify-between sticky top-0 h-screen select-none">
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Brand header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-[#EAE6DF]">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <span className="font-display text-2xl font-semibold tracking-[-.06em]">
              common<span className="text-[#84EA53]">.</span>
            </span>
            <Badge variant="lime" className="text-[9px] uppercase px-1.5 py-0">
              Admin
            </Badge>
          </Link>
          <Link
            href="/"
            target="_blank"
            title="Xem cửa hàng"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition"
          >
            <ExternalLink className="size-4" />
          </Link>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          {navGroups.map((group) => (
            <div key={group.title} className="space-y-1">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-3 mb-2">
                {group.title}
              </h4>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition',
                      isActive
                        ? 'bg-[#1D1F20] text-white shadow-xs'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={cn('size-4', isActive ? 'text-[#84EA53]' : 'text-neutral-500')} />
                      <span>{item.title}</span>
                    </div>
                    {isActive && <ChevronRight className="size-3 text-neutral-400" />}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* User profile footer */}
      <div className="p-4 border-t border-[#EAE6DF] bg-neutral-50/50">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <Avatar
              src={user?.avatarUrl}
              alt={user?.fullName || 'Admin'}
              size="sm"
              className="size-8 ring-1 ring-black/5"
            />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-neutral-900 truncate">
                {user?.fullName || 'Quản trị viên'}
              </p>
              <p className="text-[10px] text-neutral-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={logout}
            title="Đăng xuất"
            className="p-1.5 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}


```

# modules\admin\types.ts

| Property | Value |
|----------|-------|
| Path | `modules\admin\types.ts` |
| Size | 960 bytes |
| Extension | `.ts` |
| Modified | 2026-10-05 20:42:08.910566 |

```typescript
import type { UserProfile, Role, Permission, UserStatus, BasePaginationQuery } from '@/types';

export interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  newUsersThisMonth: number;
  ordersPending: number;
}

export interface UserQuery extends BasePaginationQuery {
  status?: UserStatus;
  roleId?: number;
}

export interface RoleQuery extends BasePaginationQuery {}

export interface PermissionQuery extends BasePaginationQuery {
  module?: string;
}

export interface CreateRolePayload {
  name: string;
  code: string;
  permissionIds?: number[];
}

export interface UpdateRolePayload {
  name?: string;
  isActive?: boolean;
  permissionIds?: number[];
}

export interface UpdateUserPayload {
  fullName?: string;
  phoneNumber?: string;
  avatarUrl?: string | null;
}

export interface UpdateUserStatusPayload {
  status: UserStatus;
}


```

# modules\auth\api.ts

| Property | Value |
|----------|-------|
| Path | `modules\auth\api.ts` |
| Size | 93 bytes |
| Extension | `.ts` |
| Modified | 2026-10-05 20:42:08.912565 |

```typescript
import { authApi } from '@/api/auth.api';

export { authApi };
export default authApi;


```

# modules\auth\components\forgot-password-form.tsx

| Property | Value |
|----------|-------|
| Path | `modules\auth\components\forgot-password-form.tsx` |
| Size | 4,921 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.921568 |

```tsx
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader2, MailCheck } from 'lucide-react';
import {
  forgotPasswordSchema,
  verifyCodeSchema,
  type ForgotPasswordFormData,
  type VerifyCodeFormData,
} from '../schemas';
import { useAuth } from '../hooks/use-auth';
import { FormField } from '@/components/ui/form-field';
import { Button } from '@/components/ui/button';

export function ForgotPasswordForm() {
  const router = useRouter();
  const [step, setStep] = React.useState<'email' | 'verify'>('email');
  const [userEmail, setUserEmail] = React.useState('');
  const { forgotPasswordMutation, verifyCodeMutation } = useAuth();

  const emailForm = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const verifyForm = useForm<VerifyCodeFormData>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      email: '',
      type: 'FORGOT_PASSWORD',
      code: '',
    },
  });

  const onEmailSubmit = (data: ForgotPasswordFormData) => {
    forgotPasswordMutation.mutate(data.email, {
      onSuccess: () => {
        setUserEmail(data.email);
        verifyForm.setValue('email', data.email);
        setStep('verify');
      },
    });
  };

  const onVerifySubmit = (data: VerifyCodeFormData) => {
    verifyCodeMutation.mutate(data, {
      onSuccess: (res: any) => {
        const resetToken = res?.data?.resetToken || res?.resetToken;
        if (resetToken) {
          router.push(`/reset-password?token=${encodeURIComponent(resetToken)}`);
        } else {
          router.push('/login');
        }
      },
    });
  };

  if (step === 'verify') {
    return (
      <div className="space-y-5">
        <div className="text-center space-y-2">
          <div className="mx-auto size-12 rounded-full bg-neutral-100 text-neutral-800 flex items-center justify-center">
            <MailCheck className="size-6" />
          </div>
          <h2 className="text-lg font-semibold text-neutral-900">Nhập mã xác thực</h2>
          <p className="text-xs text-neutral-500">
            Mã OTP 6 số đã được gửi tới email <strong className="text-neutral-800">{userEmail}</strong>.
          </p>
        </div>

        <form onSubmit={verifyForm.handleSubmit(onVerifySubmit)} className="space-y-4">
          <FormField
            control={verifyForm.control}
            name="code"
            label="Mã xác thực (OTP)"
            placeholder="123456"
            error={verifyForm.formState.errors.code?.message}
          />

          <Button
            type="submit"
            disabled={verifyCodeMutation.isPending}
            className="w-full h-11 rounded-xl bg-[#1D1F20] hover:bg-neutral-800 text-white font-medium"
          >
            {verifyCodeMutation.isPending ? (
              <>
                <Loader2 className="size-4 animate-spin mr-2" />
                Đang xác thực...
              </>
            ) : (
              'Tiếp tục đặt lại mật khẩu'
            )}
          </Button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setStep('email')}
              className="text-xs text-neutral-500 hover:text-neutral-900 underline underline-offset-4"
            >
              ← Gửi lại mã hoặc đổi email
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
      <FormField
        control={emailForm.control}
        name="email"
        label="Địa chỉ Email"
        type="email"
        placeholder="example@domain.com"
        error={emailForm.formState.errors.email?.message}
      />

      <Button
        type="submit"
        disabled={forgotPasswordMutation.isPending}
        className="w-full h-11 rounded-xl bg-[#1D1F20] hover:bg-neutral-800 text-white font-medium shadow-sm transition active:scale-[0.99] mt-2"
      >
        {forgotPasswordMutation.isPending ? (
          <>
            <Loader2 className="size-4 animate-spin mr-2" />
            Đang gửi mã xác thực...
          </>
        ) : (
          'Gửi mã xác thực'
        )}
      </Button>

      <div className="text-center pt-2">
        <Link
          href="/login"
          className="text-xs text-neutral-500 hover:text-neutral-900 transition underline underline-offset-4"
        >
          ← Nhớ lại mật khẩu? Quay về đăng nhập
        </Link>
      </div>
    </form>
  );
}


```

# modules\auth\components\login-form.tsx

| Property | Value |
|----------|-------|
| Path | `modules\auth\components\login-form.tsx` |
| Size | 3,328 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.924566 |

```tsx
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { loginSchema, type LoginFormData } from '../schemas';
import { useAuth } from '../hooks/use-auth';
import { FormField } from '@/components/ui/form-field';
import { Button } from '@/components/ui/button';

export function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const { loginMutation } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField
        control={control}
        name="email"
        label="Địa chỉ Email"
        type="email"
        placeholder="example@domain.com"
        error={errors.email?.message}
      />

      <div className="relative">
        <FormField
          control={control}
          name="password"
          label="Mật khẩu"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          error={errors.password?.message}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3.5 top-[34px] text-neutral-400 hover:text-neutral-700 transition"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>

      <div className="flex items-center justify-between pt-1">
        <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-600">
          <input
            type="checkbox"
            className="rounded border-[#EAE6DF] accent-neutral-900 size-3.5"
          />
          Ghi nhớ đăng nhập
        </label>
        <Link
          href="/forgot-password"
          className="text-xs text-neutral-500 hover:text-neutral-900 transition underline-offset-4 hover:underline"
        >
          Quên mật khẩu?
        </Link>
      </div>

      <Button
        type="submit"
        disabled={loginMutation.isPending}
        className="w-full h-11 rounded-xl bg-[#1D1F20] hover:bg-neutral-800 text-white font-medium shadow-sm transition active:scale-[0.99] mt-2"
      >
        {loginMutation.isPending ? (
          <>
            <Loader2 className="size-4 animate-spin mr-2" />
            Đang đăng nhập...
          </>
        ) : (
          'Đăng nhập'
        )}
      </Button>

      <div className="text-center pt-2">
        <p className="text-xs text-neutral-500">
          Chưa có tài khoản?{' '}
          <Link
            href="/register"
            className="font-semibold text-neutral-900 hover:underline underline-offset-4"
          >
            Đăng ký tài khoản mới
          </Link>
        </p>
      </div>
    </form>
  );
}


```

# modules\auth\components\register-form.tsx

| Property | Value |
|----------|-------|
| Path | `modules\auth\components\register-form.tsx` |
| Size | 7,105 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.925568 |

```tsx
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, CheckCircle2 } from 'lucide-react';
import { registerSchema, verifyCodeSchema, type RegisterFormData, type VerifyCodeFormData } from '../schemas';
import { useAuth } from '../hooks/use-auth';
import { FormField } from '@/components/ui/form-field';
import { Button } from '@/components/ui/button';

export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [step, setStep] = React.useState<'form' | 'verify'>('form');
  const [registeredEmail, setRegisteredEmail] = React.useState('');

  const { registerMutation, verifyCodeMutation } = useAuth();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
  });

  const verifyForm = useForm<VerifyCodeFormData>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      email: '',
      type: 'REGISTER',
      code: '',
    },
  });

  const onRegisterSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(
      {
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber || undefined,
        password: data.password,
      },
      {
        onSuccess: () => {
          setRegisteredEmail(data.email);
          verifyForm.setValue('email', data.email);
          setStep('verify');
        },
      }
    );
  };

  const onVerifySubmit = (data: VerifyCodeFormData) => {
    verifyCodeMutation.mutate(data, {
      onSuccess: () => {
        router.push('/login');
      },
    });
  };

  if (step === 'verify') {
    return (
      <div className="space-y-5">
        <div className="text-center space-y-2">
          <div className="mx-auto size-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="size-6" />
          </div>
          <h2 className="text-lg font-semibold text-neutral-900">Xác thực tài khoản</h2>
          <p className="text-xs text-neutral-500">
            Chúng tôi đã gửi mã xác thực 6 số đến email{' '}
            <strong className="text-neutral-800">{registeredEmail}</strong>. Vui lòng kiểm tra và nhập vào bên dưới.
          </p>
        </div>

        <form onSubmit={verifyForm.handleSubmit(onVerifySubmit)} className="space-y-4">
          <FormField
            control={verifyForm.control}
            name="code"
            label="Mã xác thực (OTP)"
            placeholder="123456"
            error={verifyForm.formState.errors.code?.message}
          />

          <Button
            type="submit"
            disabled={verifyCodeMutation.isPending}
            className="w-full h-11 rounded-xl bg-[#1D1F20] hover:bg-neutral-800 text-white font-medium"
          >
            {verifyCodeMutation.isPending ? (
              <>
                <Loader2 className="size-4 animate-spin mr-2" />
                Đang xác thực...
              </>
            ) : (
              'Hoàn tất kích hoạt'
            )}
          </Button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setStep('form')}
              className="text-xs text-neutral-500 hover:text-neutral-900 underline underline-offset-4"
            >
              ← Thay đổi email đăng ký
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onRegisterSubmit)} className="space-y-4">
      <FormField
        control={form.control}
        name="fullName"
        label="Họ và tên"
        placeholder="Nguyễn Văn A"
        error={form.formState.errors.fullName?.message}
      />

      <FormField
        control={form.control}
        name="email"
        label="Địa chỉ Email"
        type="email"
        placeholder="example@domain.com"
        error={form.formState.errors.email?.message}
      />

      <FormField
        control={form.control}
        name="phoneNumber"
        label="Số điện thoại (tùy chọn)"
        placeholder="0912345678"
        error={form.formState.errors.phoneNumber?.message}
      />

      <div className="relative">
        <FormField
          control={form.control}
          name="password"
          label="Mật khẩu"
          type={showPassword ? 'text' : 'password'}
          placeholder="Tối thiểu 8 ký tự (hoa, thường, số, ký tự)"
          error={form.formState.errors.password?.message}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3.5 top-[34px] text-neutral-400 hover:text-neutral-700 transition"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>

      <div className="relative">
        <FormField
          control={form.control}
          name="confirmPassword"
          label="Xác nhận mật khẩu"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Nhập lại mật khẩu"
          error={form.formState.errors.confirmPassword?.message}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3.5 top-[34px] text-neutral-400 hover:text-neutral-700 transition"
          tabIndex={-1}
        >
          {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>

      <Button
        type="submit"
        disabled={registerMutation.isPending}
        className="w-full h-11 rounded-xl bg-[#1D1F20] hover:bg-neutral-800 text-white font-medium shadow-sm transition active:scale-[0.99] mt-2"
      >
        {registerMutation.isPending ? (
          <>
            <Loader2 className="size-4 animate-spin mr-2" />
                Đang tạo tài khoản...
          </>
        ) : (
          'Tạo tài khoản'
        )}
      </Button>

      <div className="text-center pt-2">
        <p className="text-xs text-neutral-500">
          Đã có tài khoản?{' '}
          <Link
            href="/login"
            className="font-semibold text-neutral-900 hover:underline underline-offset-4"
          >
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </form>
  );
}


```

# modules\auth\hooks\use-auth.ts

| Property | Value |
|----------|-------|
| Path | `modules\auth\hooks\use-auth.ts` |
| Size | 3,581 bytes |
| Extension | `.ts` |
| Modified | 2026-10-05 20:42:08.926568 |

```typescript
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { authApi } from '@/api/auth.api';
import { useAuth as useAuthContext } from '@/components/providers/auth-provider';
import type {
  LoginPayload,
  RegisterPayload,
  VerifyCodePayload,
  ResetPasswordPayload,
  ChangePasswordPayload,
} from '@/types';

export function useAuth() {
  const context = useAuthContext();
  const router = useRouter();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: async (res) => {
      if (res.data) {
        await context.login(res.data.accessToken, res.data.refreshToken, res.data.user);
        toast.success('Đăng nhập thành công!');
        if (res.data.user.role?.code === 'ADMIN') {
          router.push('/admin/dashboard');
        } else {
          router.push('/');
        }
      }
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || 'Đăng nhập không thành công, vui lòng kiểm tra lại thông tin!';
      toast.error(msg);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),
    onSuccess: () => {
      toast.success('Đăng ký thành công! Vui lòng kiểm tra email để lấy mã xác thực.');
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || 'Đăng ký thất bại, email có thể đã tồn tại!';
      toast.error(msg);
    },
  });

  const verifyCodeMutation = useMutation({
    mutationFn: (payload: VerifyCodePayload) => authApi.verifyCode(payload),
    onSuccess: () => {
      toast.success('Xác thực tài khoản thành công!');
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || 'Mã xác thực không chính xác hoặc đã hết hạn!';
      toast.error(msg);
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (email: string) => authApi.forgotPassword(email),
    onSuccess: () => {
      toast.success('Mã OTP xác thực đã được gửi về email của bạn.');
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || 'Gửi yêu cầu thất bại, vui lòng kiểm tra email!';
      toast.error(msg);
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (payload: ResetPasswordPayload) => authApi.resetPassword(payload),
    onSuccess: () => {
      toast.success('Đặt lại mật khẩu thành công! Vui lòng đăng nhập lại.');
      router.push('/login');
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || 'Đặt lại mật khẩu thất bại!';
      toast.error(msg);
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: (payload: ChangePasswordPayload) => authApi.changePassword(payload),
    onSuccess: () => {
      toast.success('Đổi mật khẩu thành công!');
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || 'Đổi mật khẩu không thành công!';
      toast.error(msg);
    },
  });

  return {
    ...context,
    loginMutation,
    registerMutation,
    verifyCodeMutation,
    forgotPasswordMutation,
    resetPasswordMutation,
    changePasswordMutation,
  };
}


```

# modules\auth\schemas.ts

| Property | Value |
|----------|-------|
| Path | `modules\auth\schemas.ts` |
| Size | 4,747 bytes |
| Extension | `.ts` |
| Modified | 2026-10-05 20:42:08.928568 |

```typescript
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().min(1, 'Email không được để trống').email('Email không đúng định dạng'),
  password: z.string().min(1, 'Mật khẩu không được để trống'),
});

export const registerSchema = z
  .object({
    fullName: z.string().trim().min(1, 'Họ và tên không được để trống').max(100),
    email: z.string().trim().min(1, 'Email không được để trống').email('Email không đúng định dạng'),
    phoneNumber: z.string().trim().optional(),
    password: z
      .string()
      .min(8, 'Mật khẩu tối thiểu 8 ký tự')
      .max(72, 'Mật khẩu tối đa 72 ký tự')
      .regex(/[A-Z]/, 'Cần ít nhất 1 chữ in hoa')
      .regex(/[a-z]/, 'Cần ít nhất 1 chữ in thường')
      .regex(/[0-9]/, 'Cần ít nhất 1 chữ số')
      .regex(/[^A-Za-z0-9]/, 'Cần ít nhất 1 ký tự đặc biệt'),
    confirmPassword: z.string().min(1, 'Xác nhận mật khẩu là bắt buộc'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  });

export const verifyCodeSchema = z.object({
  email: z.string().trim().email('Email không hợp lệ'),
  type: z.enum(['REGISTER', 'FORGOT_PASSWORD']),
  code: z
    .string()
    .trim()
    .length(6, 'Mã xác thực gồm 6 chữ số')
    .regex(/^\d+$/, 'Mã xác thực chỉ chứa số'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().min(1, 'Email không được để trống').email('Email không đúng định dạng'),
});

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, 'Token xác thực là bắt buộc'),
    newPassword: z
      .string()
      .min(8, 'Mật khẩu mới tối thiểu 8 ký tự')
      .max(72, 'Mật khẩu tối đa 72 ký tự')
      .regex(/[A-Z]/, 'Cần ít nhất 1 chữ hoa')
      .regex(/[a-z]/, 'Cần ít nhất 1 chữ thường')
      .regex(/[0-9]/, 'Cần ít nhất 1 chữ số')
      .regex(/[^A-Za-z0-9]/, 'Cần ít nhất 1 ký tự đặc biệt'),
    confirmPassword: z.string().min(1, 'Xác nhận mật khẩu là bắt buộc'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  });

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, 'Mật khẩu hiện tại là bắt buộc'),
    newPassword: z
      .string()
      .min(8, 'Mật khẩu mới tối thiểu 8 ký tự')
      .max(72, 'Mật khẩu tối đa 72 ký tự')
      .regex(/[A-Z]/, 'Cần ít nhất 1 chữ hoa')
      .regex(/[a-z]/, 'Cần ít nhất 1 chữ thường')
      .regex(/[0-9]/, 'Cần ít nhất 1 chữ số')
      .regex(/[^A-Za-z0-9]/, 'Cần ít nhất 1 ký tự đặc biệt'),
    confirmPassword: z.string().min(1, 'Xác nhận mật khẩu là bắt buộc'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  });

export const addressSchema = z.object({
  receiverName: z.string().trim().min(1, 'Họ tên người nhận không được để trống'),
  phoneNumber: z.string().trim().min(1, 'Số điện thoại không được để trống'),
  province: z.string().trim().min(1, 'Tỉnh/Thành phố không được để trống'),
  district: z.string().trim().min(1, 'Quận/Huyện không được để trống'),
  ward: z.string().trim().min(1, 'Phường/Xã không được để trống'),
  detailAddress: z.string().trim().min(1, 'Địa chỉ chi tiết không được để trống'),
  isDefault: z.boolean().optional(),
});

export const profileSchema = z.object({
  fullName: z.string().trim().min(1, 'Họ và tên không được để trống'),
  phoneNumber: z.string().trim().optional(),
  avatarUrl: z.string().url('URL ảnh không hợp lệ').optional().or(z.literal('')),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type VerifyCodeFormData = z.infer<typeof verifyCodeSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
export type AddressFormData = z.infer<typeof addressSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;


```

# modules\auth\types.ts

| Property | Value |
|----------|-------|
| Path | `modules\auth\types.ts` |
| Size | 116 bytes |
| Extension | `.ts` |
| Modified | 2026-10-05 20:42:08.938597 |

```typescript
export * from '@/types/auth';

export interface AuthState {
  isLoading: boolean;
  error: string | null;
}


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
| Size | 3,345 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 10:24:43.382071 |

```tsx
import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem } from '@/types';
import { useUpdateCartItem, useRemoveCartItem } from '../hooks/use-cart';

interface CartItemProps {
  item: CartItem;
}

export function CartItemComponent({ item }: CartItemProps) {
  const updateMutation = useUpdateCartItem();
  const removeMutation = useRemoveCartItem();

  const handleUpdate = (delta: number) => {
    const newQuantity = Math.max(1, item.quantity + delta);
    if (newQuantity !== item.quantity) {
      updateMutation.mutate({ itemId: item.id, payload: { quantity: newQuantity } });
    }
  };

  const handleRemove = () => {
    removeMutation.mutate(item.id);
  };

  // Convert prices that might be strings to numbers
  const price = Number(item.variant.sellingPrice || item.variant.originalPrice || 0);
  const totalItemPrice = price * item.quantity;
  const imageUrl = item.variant.imageUrl || item.variant.product.thumbnailUrl || '/placeholder.png';
  
  // Format variant attributes (e.g. Color / Size)
  const variantDisplay = item.variant.attributeValues
    ? item.variant.attributeValues.map((av: any) => av.value).join(' / ')
    : 'Default';

  return (
    <div className="flex gap-4 py-5">
      <div className="relative h-32 w-28 shrink-0 overflow-hidden rounded-xl bg-[#e9e5dc]">
        <Image
          src={imageUrl}
          alt={item.variant.product.defaultName || 'Product'}
          fill
          sizes="112px"
          className="object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex justify-between gap-3">
          <div>
            <p className="text-sm font-semibold line-clamp-2">
              {item.variant.product.defaultName}
            </p>
            <p className="mt-2 text-xs text-[#74736e]">{variantDisplay}</p>
          </div>
          <button
            onClick={handleRemove}
            disabled={removeMutation.isPending}
            aria-label="Remove item"
            className="h-fit text-[#9b9991] hover:text-red-500 disabled:opacity-50 transition-colors"
          >
            <Trash2 size={15} />
          </button>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center rounded-lg border border-[#EAE6DF]">
            <button
              onClick={() => handleUpdate(-1)}
              disabled={updateMutation.isPending || item.quantity <= 1}
              className="p-2 disabled:opacity-50"
              aria-label="Decrease quantity"
            >
              <Minus size={12} />
            </button>
            <span className="w-5 text-center text-xs">
              {updateMutation.isPending ? '...' : item.quantity}
            </span>
            <button
              onClick={() => handleUpdate(1)}
              disabled={updateMutation.isPending}
              className="p-2 disabled:opacity-50"
              aria-label="Increase quantity"
            >
              <Plus size={12} />
            </button>
          </div>
          <span className="text-sm font-bold">
            ${totalItemPrice.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

```

# modules\cart\components\cart-summary.tsx

| Property | Value |
|----------|-------|
| Path | `modules\cart\components\cart-summary.tsx` |
| Size | 1,519 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 10:24:43.385065 |

```tsx
import Link from 'next/link';
import { CartItem } from '@/types';

interface CartSummaryProps {
  items: CartItem[];
}

export function CartSummary({ items }: CartSummaryProps) {
  const subtotal = items.reduce((sum, item) => {
    const price = Number(item.variant.sellingPrice || item.variant.originalPrice || 0);
    return sum + price * item.quantity;
  }, 0);

  return (
    <aside className="h-fit rounded-2xl bg-white p-6 lg:sticky lg:top-36">
      <h2 className="font-display text-3xl">Summary</h2>
      <div className="mt-7 space-y-3 border-b border-[#EAE6DF] pb-5 text-sm">
        <div className="flex justify-between">
          <span className="text-[#74736e]">Subtotal</span>
          <span>${subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#74736e]">Shipping</span>
          <span>Calculated at checkout</span>
        </div>
      </div>
      <div className="flex justify-between py-5 text-base font-bold">
        <span>Total</span>
        <span>${subtotal.toLocaleString()}</span>
      </div>
      <Link
        href="/checkout"
        className="block rounded-xl bg-[#84EA53] py-3.5 text-center text-sm font-bold transition-transform hover:scale-[1.02] active:scale-[0.98]"
      >
        Continue to checkout
      </Link>
      <p className="mt-4 text-center text-[11px] text-[#74736e]">
        Free shipping on orders over $500.00
      </p>
    </aside>
  );
}

```

# modules\cart\components\cart-view.tsx

| Property | Value |
|----------|-------|
| Path | `modules\cart\components\cart-view.tsx` |
| Size | 2,253 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 10:24:43.387067 |

```tsx
'use client';

import Link from 'next/link';
import { useCart } from '../hooks/use-cart';
import { CartItemComponent } from './cart-item';
import { CartSummary } from './cart-summary';

export function CartView() {
  const { data: cartResponse, isLoading, isError } = useCart();

  if (isLoading) {
    return (
      <main className="mx-auto max-w-[1180px] px-4 py-10 sm:px-8 lg:py-16">
        <div className="animate-pulse space-y-8">
          <div className="h-8 w-48 rounded bg-gray-200"></div>
          <div className="h-64 rounded-2xl bg-gray-200"></div>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="mx-auto max-w-[1180px] px-4 py-10 sm:px-8 lg:py-16 text-center">
        <p className="text-red-500">Could not load cart data. Please try again later.</p>
      </main>
    );
  }

  // Handle case where cart might be null or empty
  const items = cartResponse?.data?.cartItems || [];

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-[1180px] px-4 py-20 sm:px-8 text-center">
        <h1 className="font-display text-4xl mb-4">Your bag is empty</h1>
        <p className="text-[#74736e] mb-8">Looks like you haven't made your choice yet.</p>
        <Link
          href="/shop"
          className="inline-block rounded-xl bg-black px-8 py-3.5 text-sm font-bold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Explore products
        </Link>
      </main>
    );
  }

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
          {items.map((item) => (
            <CartItemComponent key={item.id} item={item} />
          ))}
        </div>
        <CartSummary items={items} />
      </div>
    </main>
  );
}

```

# modules\cart\hooks\use-cart.ts

| Property | Value |
|----------|-------|
| Path | `modules\cart\hooks\use-cart.ts` |
| Size | 2,737 bytes |
| Extension | `.ts` |
| Modified | 2026-10-05 10:24:43.388458 |

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cartApi } from '@/api/cart.api';
import { AddToCartPayload, UpdateCartItemPayload } from '@/types';
import { toast } from 'sonner';

export const CART_QUERY_KEYS = {
  cart: ['cart'] as const,
};

// 1. Lấy thông tin giỏ hàng
export const useCart = () => {
  return useQuery({
    queryKey: CART_QUERY_KEYS.cart,
    queryFn: cartApi.getCart,
  });
};

// 2. Thêm sản phẩm vào giỏ
export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddToCartPayload) => cartApi.addToCart(payload),
    onSuccess: () => {
      toast.success('Đã thêm vào giỏ hàng');
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.cart });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Không thể thêm vào giỏ hàng');
    },
  });
};

// 3. Cập nhật số lượng sản phẩm trong giỏ
export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      itemId,
      payload,
    }: {
      itemId: number;
      payload: UpdateCartItemPayload;
    }) => cartApi.updateCartItem(itemId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.cart });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Lỗi khi cập nhật số lượng');
    },
  });
};

// 4. Xóa một sản phẩm khỏi giỏ
export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: number) => cartApi.removeCartItem(itemId),
    onSuccess: () => {
      toast.success('Đã xóa sản phẩm khỏi giỏ');
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.cart });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Lỗi khi xóa sản phẩm');
    },
  });
};

// 5. Xóa toàn bộ giỏ hàng
export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => cartApi.clearCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.cart });
    },
  });
};

// 6. Gộp giỏ hàng (Guest -> User khi đăng nhập)
export const useMergeCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => cartApi.mergeCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.cart });
    },
  });
};


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
| Size | 4,995 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 10:24:43.390070 |

```tsx
'use client';

import Link from 'next/link';
import { ArrowLeft, Check, Lock } from 'lucide-react';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutSchema, CheckoutFormValues } from '../schemas';
import { useCart } from '@/modules/cart/hooks/use-cart';
import { useCreateOrder } from '@/modules/order/hooks/use-orders';
import { ShippingForm } from './shipping-form';
import { PaymentMethodComponent } from './payment-method';

export function CheckoutView() {
  const [step, setStep] = useState(1);
  const { data: cartResponse } = useCart();
  const createOrderMutation = useCreateOrder();

  const methods = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      shippingMethod: 'STANDARD',
      paymentMethod: 'COD',
    },
    mode: 'onTouched', // Validate as user interacts
  });

  const cartItems = cartResponse?.data?.cartItems || [];
  
  // Tính tổng tiền giỏ hàng hiện tại (chưa tính phí ship - có thể tính sau)
  const totalAmount = cartItems.reduce((sum, item) => {
    const price = Number(item.variant.sellingPrice || item.variant.originalPrice || 0);
    return sum + price * item.quantity;
  }, 0);

  const onSubmit = (data: CheckoutFormValues) => {
    // Ép kiểu data theo CreateOrderPayload
    createOrderMutation.mutate({
      shippingAddress: data.shippingAddress,
      paymentMethod: data.paymentMethod as any,
      shippingMethod: data.shippingMethod,
      customerNote: data.customerNote,
    });
  };

  if (cartItems.length === 0) {
    return (
      <main className="mx-auto max-w-[1180px] px-4 py-20 sm:px-8 text-center">
        <h1 className="font-display text-3xl mb-4">Your bag is empty</h1>
        <Link href="/shop" className="text-[#84EA53] underline">Go shopping</Link>
      </main>
    );
  }

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

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            {/* Step 1: Shipping */}
            <section
              className={`rounded-2xl bg-white p-6 transition-all ${step === 1 ? 'ring-1 ring-[#84EA53]' : ''}`}
            >
              <div className="flex items-center justify-between cursor-pointer" onClick={() => setStep(1)}>
                <h2 className="font-display text-3xl">01 · Shipping</h2>
                {step > 1 && <Check size={18} color="#61bc39" />}
              </div>
              {step === 1 && <ShippingForm onNext={() => setStep(2)} />}
            </section>

            {/* Step 2: Payment */}
            <section
              className={`rounded-2xl bg-white p-6 transition-all ${step === 2 ? 'ring-1 ring-[#84EA53]' : 'opacity-60 pointer-events-none'}`}
            >
              <h2 className="font-display text-3xl">02 · Payment</h2>
              {step === 2 && (
                <PaymentMethodComponent 
                  isSubmitting={createOrderMutation.isPending} 
                  totalAmount={totalAmount} 
                />
              )}
            </section>
          </div>

          {/* Order Summary Sidebar */}
          <aside className="h-fit rounded-2xl bg-[#1D1F20] p-6 text-white lg:sticky lg:top-36">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Lock size={15} color="#84EA53" /> Secure checkout
            </div>
            
            <div className="mt-6 divide-y divide-white/10">
              {cartItems.map((item) => (
                <div key={item.id} className="py-3 flex justify-between text-sm">
                  <span className="text-white/70 line-clamp-1 w-2/3">
                    {item.quantity}x {item.variant.product.defaultName}
                  </span>
                  <span>
                    ${(Number(item.variant.sellingPrice || 0) * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between border-t border-white/15 pt-5 text-sm">
              <span className="text-white/55">Total</span>
              <strong className="text-lg text-[#84EA53]">${totalAmount.toLocaleString()}</strong>
            </div>
          </aside>
        </form>
      </FormProvider>
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
| Size | 1,886 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 10:24:43.392342 |

```tsx
'use client';

import { useFormContext } from 'react-hook-form';
import { CheckoutFormValues } from '../schemas';

interface PaymentMethodProps {
  isSubmitting: boolean;
  totalAmount: number;
}

const PAYMENT_OPTIONS = [
  { id: 'COD', label: 'Thanh toán khi nhận hàng (COD)' },
  { id: 'VNPAY', label: 'Thanh toán qua VNPAY' },
  { id: 'MOMO', label: 'Thanh toán qua ví MoMo' },
  { id: 'BANK_TRANSFER', label: 'Chuyển khoản ngân hàng' },
];

export function PaymentMethodComponent({ isSubmitting, totalAmount }: PaymentMethodProps) {
  const { register, formState: { errors } } = useFormContext<CheckoutFormValues>();

  return (
    <div className="mt-6 space-y-4">
      <div className="space-y-3">
        {PAYMENT_OPTIONS.map((option) => (
          <label
            key={option.id}
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#EAE6DF] p-4 transition-colors hover:bg-gray-50 has-[:checked]:border-[#84EA53] has-[:checked]:bg-[#84EA53]/10"
          >
            <input
              type="radio"
              value={option.id}
              {...register('paymentMethod')}
              className="h-4 w-4 text-[#84EA53] focus:ring-[#84EA53]"
            />
            <span className="text-sm font-medium">{option.label}</span>
          </label>
        ))}
        {errors.paymentMethod && (
          <p className="text-xs text-red-500">{errors.paymentMethod.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 w-full rounded-xl bg-[#84EA53] py-3.5 text-sm font-bold transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
      >
        {isSubmitting ? 'Processing...' : `Place order · $${totalAmount.toLocaleString()}`}
      </button>
    </div>
  );
}

```

# modules\checkout\components\shipping-form.tsx

| Property | Value |
|----------|-------|
| Path | `modules\checkout\components\shipping-form.tsx` |
| Size | 3,944 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 10:24:43.394068 |

```tsx
'use client';

import { useFormContext } from 'react-hook-form';
import { CheckoutFormValues } from '../schemas';

interface ShippingFormProps {
  onNext: () => void;
}

export function ShippingForm({ onNext }: ShippingFormProps) {
  const { register, trigger, formState: { errors } } = useFormContext<CheckoutFormValues>();

  const handleContinue = async () => {
    // Validate only shipping fields before moving to payment step
    const isStepValid = await trigger('shippingAddress');
    if (isStepValid) {
      onNext();
    }
  };

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      <div>
        <input
          {...register('shippingAddress.receiverName')}
          placeholder="Họ và tên người nhận"
          className="w-full rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
        />
        {errors.shippingAddress?.receiverName && (
          <p className="mt-1 text-xs text-red-500">{errors.shippingAddress.receiverName.message}</p>
        )}
      </div>

      <div>
        <input
          {...register('shippingAddress.receiverPhone')}
          placeholder="Số điện thoại"
          className="w-full rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
        />
        {errors.shippingAddress?.receiverPhone && (
          <p className="mt-1 text-xs text-red-500">{errors.shippingAddress.receiverPhone.message}</p>
        )}
      </div>

      <div>
        <input
          {...register('shippingAddress.province')}
          placeholder="Tỉnh/Thành phố"
          className="w-full rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
        />
        {errors.shippingAddress?.province && (
          <p className="mt-1 text-xs text-red-500">{errors.shippingAddress.province.message}</p>
        )}
      </div>

      <div>
        <input
          {...register('shippingAddress.district')}
          placeholder="Quận/Huyện"
          className="w-full rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
        />
        {errors.shippingAddress?.district && (
          <p className="mt-1 text-xs text-red-500">{errors.shippingAddress.district.message}</p>
        )}
      </div>

      <div>
        <input
          {...register('shippingAddress.ward')}
          placeholder="Phường/Xã"
          className="w-full rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
        />
        {errors.shippingAddress?.ward && (
          <p className="mt-1 text-xs text-red-500">{errors.shippingAddress.ward.message}</p>
        )}
      </div>

      <div className="sm:col-span-2">
        <input
          {...register('shippingAddress.detailAddress')}
          placeholder="Địa chỉ chi tiết (Số nhà, đường...)"
          className="w-full rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
        />
        {errors.shippingAddress?.detailAddress && (
          <p className="mt-1 text-xs text-red-500">{errors.shippingAddress.detailAddress.message}</p>
        )}
      </div>

      <div className="sm:col-span-2">
        <textarea
          {...register('customerNote')}
          placeholder="Ghi chú đơn hàng (Tùy chọn)"
          rows={3}
          className="w-full rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53] resize-none"
        />
      </div>

      <button
        type="button"
        onClick={handleContinue}
        className="rounded-xl bg-[#1D1F20] py-3 text-sm font-bold text-white sm:col-span-2 transition-transform hover:scale-[1.01] active:scale-[0.99]"
      >
        Continue to payment
      </button>
    </div>
  );
}

```

# modules\checkout\schemas.ts

| Property | Value |
|----------|-------|
| Path | `modules\checkout\schemas.ts` |
| Size | 2,171 bytes |
| Extension | `.ts` |
| Modified | 2026-10-05 10:24:43.395218 |

```typescript
import { z } from 'zod';
import { PaymentMethod } from '@/types';

// Regex kiểm tra số điện thoại chuẩn Việt Nam
const phoneRegex = /^(84|0)[35789]\d{8}$/;

export const shippingAddressSchema = z.object({
  receiverName: z
    .string()
    .trim()
    .min(2, 'Tên người nhận phải có ít nhất 2 ký tự')
    .max(100, 'Tên quá dài, tối đa 100 ký tự'),
  receiverPhone: z
    .string()
    .trim()
    .regex(phoneRegex, 'Số điện thoại không hợp lệ (VD: 0912345678)'),
  province: z.string().trim().min(1, 'Vui lòng chọn Tỉnh/Thành phố'),
  district: z.string().trim().min(1, 'Vui lòng chọn Quận/Huyện'),
  ward: z.string().trim().min(1, 'Vui lòng chọn Phường/Xã'),
  detailAddress: z
    .string()
    .trim()
    .min(5, 'Địa chỉ chi tiết phải có ít nhất 5 ký tự')
    .max(500, 'Địa chỉ quá dài'),
});

export const checkoutSchema = z
  .object({
    // Nếu truyền danh sách ID vào thì chỉ thanh toán những món đó, nếu không truyền sẽ thanh toán toàn bộ giỏ
    cartItemIds: z.array(z.number()).optional(),

    // Khách chọn địa chỉ đã lưu hoặc nhập địa chỉ mới
    shippingAddressId: z.number().optional(),
    shippingAddress: shippingAddressSchema.optional(),

    paymentMethod: z.enum(['COD', 'VNPAY', 'MOMO', 'BANK_TRANSFER'], {
      required_error: 'Vui lòng chọn phương thức thanh toán',
      invalid_type_error: 'Phương thức thanh toán không hợp lệ',
    }),
    
    shippingMethod: z.string().optional(),
    customerNote: z.string().max(1000, 'Ghi chú không được quá 1000 ký tự').optional(),
    voucherCode: z.string().optional(),
    pointUsed: z.number().min(0, 'Số điểm không hợp lệ').optional(),
  })
  .refine((data) => data.shippingAddressId || data.shippingAddress, {
    message: 'Vui lòng chọn địa chỉ đã lưu hoặc nhập địa chỉ giao hàng mới',
    path: ['shippingAddress'], // Báo lỗi tại field shippingAddress
  });

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

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
| Size | 39 bytes |
| Extension | `.ts` |
| Modified | 2026-10-05 20:42:08.940640 |

```typescript
export * from '@/api/flash-sale.api';

```

# modules\flash-sale\components\countdown.tsx

| Property | Value |
|----------|-------|
| Path | `modules\flash-sale\components\countdown.tsx` |
| Size | 5,324 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.943597 |

```tsx
'use client';

import { useEffect, useState } from 'react';
import { Clock, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CountdownProps {
  targetTime: string | Date;
  startTime?: string | Date;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  onEnd?: () => void;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isEnded: boolean;
  isUpcoming: boolean;
}

function calculateTimeRemaining(target: string | Date, start?: string | Date): TimeRemaining {
  const now = new Date().getTime();
  const startTime = start ? new Date(start).getTime() : 0;
  const targetTime = new Date(target).getTime();

  if (start && now < startTime) {
    const diff = startTime - now;
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      isEnded: false,
      isUpcoming: true,
    };
  }

  const diff = targetTime - now;

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isEnded: true,
      isUpcoming: false,
    };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isEnded: false,
    isUpcoming: false,
  };
}

export function FlashSaleCountdown({
  targetTime,
  startTime,
  className,
  size = 'md',
  showLabels = true,
  onEnd,
}: CountdownProps) {
  const [time, setTime] = useState<TimeRemaining>(() =>
    calculateTimeRemaining(targetTime, startTime)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const nextTime = calculateTimeRemaining(targetTime, startTime);
      setTime(nextTime);

      if (nextTime.isEnded) {
        clearInterval(timer);
        onEnd?.();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime, startTime, onEnd]);

  if (time.isEnded) {
    return (
      <div className={cn('inline-flex items-center gap-1.5 font-semibold text-muted-foreground', className)}>
        <Clock className="size-4" />
        <span>Chiến dịch đã kết thúc</span>
      </div>
    );
  }

  const pad = (n: number) => n.toString().padStart(2, '0');

  const sizeClasses = {
    sm: {
      box: 'px-1.5 py-0.5 text-xs font-mono font-bold rounded',
      colon: 'text-xs font-bold mx-0.5',
      label: 'text-[9px] uppercase tracking-wider',
    },
    md: {
      box: 'px-2.5 py-1 text-sm font-mono font-extrabold rounded-md',
      colon: 'text-sm font-bold mx-1',
      label: 'text-[10px] uppercase tracking-wider',
    },
    lg: {
      box: 'px-3.5 py-1.5 text-lg font-mono font-black rounded-lg',
      colon: 'text-base font-bold mx-1.5',
      label: 'text-xs uppercase tracking-wider',
    },
  }[size];

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex items-center text-red-500 font-bold animate-pulse">
        <Flame className={cn(size === 'lg' ? 'size-5' : size === 'sm' ? 'size-3.5' : 'size-4')} />
        <span className="text-xs uppercase ml-1 tracking-wider">
          {time.isUpcoming ? 'Bắt đầu sau' : 'Kết thúc sau'}
        </span>
      </div>

      <div className="flex items-center">
        {time.days > 0 && (
          <>
            <div className="flex flex-col items-center">
              <span className={cn('bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm', sizeClasses.box)}>
                {pad(time.days)}
              </span>
              {showLabels && <span className={cn('mt-0.5 text-zinc-500', sizeClasses.label)}>ngày</span>}
            </div>
            <span className={cn('text-zinc-400', sizeClasses.colon)}>:</span>
          </>
        )}

        <div className="flex flex-col items-center">
          <span className={cn('bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm', sizeClasses.box)}>
            {pad(time.hours)}
          </span>
          {showLabels && <span className={cn('mt-0.5 text-zinc-500', sizeClasses.label)}>giờ</span>}
        </div>

        <span className={cn('text-zinc-400', sizeClasses.colon)}>:</span>

        <div className="flex flex-col items-center">
          <span className={cn('bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm', sizeClasses.box)}>
            {pad(time.minutes)}
          </span>
          {showLabels && <span className={cn('mt-0.5 text-zinc-500', sizeClasses.label)}>phút</span>}
        </div>

        <span className={cn('text-zinc-400', sizeClasses.colon)}>:</span>

        <div className="flex flex-col items-center">
          <span className={cn('bg-red-600 text-white shadow-sm shadow-red-500/20', sizeClasses.box)}>
            {pad(time.seconds)}
          </span>
          {showLabels && <span className={cn('mt-0.5 text-red-500 font-semibold', sizeClasses.label)}>giây</span>}
        </div>
      </div>
    </div>
  );
}

```

# modules\flash-sale\components\flash-sale-card.tsx

| Property | Value |
|----------|-------|
| Path | `modules\flash-sale\components\flash-sale-card.tsx` |
| Size | 6,404 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.945601 |

```tsx
'use client';

import Image from 'next/image';
import { Flame, ShoppingCart, Check, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { FlashSaleItem } from '@/types/inventory-sale';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { cartApi } from '@/api/cart.api';

interface FlashSaleCardProps {
  item: FlashSaleItem;
  className?: string;
}

export function FlashSaleCard({ item, className }: FlashSaleCardProps) {
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const productName = item.variant?.product?.defaultName || `Biến thể #${item.variantId}`;
  const sku = item.variant?.sku || `SKU-${item.variantId}`;
  
  const flashPrice = Number(item.flashSalePrice);
  const originalPrice = Number(item.variant?.sellingPrice || item.variant?.originalPrice || flashPrice * 1.3);
  
  const discountPercent = originalPrice > flashPrice 
    ? Math.round(((originalPrice - flashPrice) / originalPrice) * 100) 
    : 0;

  const soldCount = item.soldQuantity || 0;
  const totalCount = item.promoQuantity || 1;
  const progressPercent = Math.min(Math.round((soldCount / totalCount) * 100), 100);
  const isSoldOut = soldCount >= totalCount;

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  const handleAddToCart = async () => {
    if (isSoldOut || adding) return;
    setAdding(true);
    try {
      await cartApi.addToCart({
        variantId: item.variantId,
        quantity: 1,
      });
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      console.error('Không thể thêm sản phẩm vào giỏ hàng:', err);
    } finally {
      setAdding(false);
    }
  };

  return (
    <article
      className={cn(
        'group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-3 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-950',
        className
      )}
    >
      <div>
        {/* Image & Discount Badge Container */}
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900">
          <Image
            src="/images/product-placeholder.jpg"
            alt={productName}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Flash Sale Tag */}
          <div className="absolute left-2.5 top-2.5 flex items-center gap-1 rounded-full bg-red-600 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-md shadow-red-600/30">
            <Flame className="size-3.5 fill-amber-300 text-amber-300 animate-pulse" />
            <span>Flash Sale</span>
          </div>

          {/* Discount Percentage Badge */}
          {discountPercent > 0 && (
            <div className="absolute right-2.5 top-2.5 rounded-full bg-amber-400 px-2 py-0.5 text-xs font-black text-zinc-950 shadow-sm">
              -{discountPercent}%
            </div>
          )}

          {/* Sold Out Overlay */}
          {isSoldOut && (
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/70 backdrop-blur-[2px]">
              <span className="rounded-full bg-red-600/90 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg">
                Đã hết hàng
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="mt-3 flex flex-col gap-1.5">
          <div className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500">
            SKU: {sku}
          </div>
          <h3 className="line-clamp-2 text-sm font-semibold text-zinc-900 transition-colors group-hover:text-red-600 dark:text-zinc-100 dark:group-hover:text-red-400">
            {productName}
          </h3>

          {/* Pricing */}
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-red-600 dark:text-red-500">
              {formatPrice(flashPrice)}
            </span>
            {originalPrice > flashPrice && (
              <span className="text-xs font-medium text-zinc-400 line-through dark:text-zinc-500">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Progress & Cart Action */}
      <div className="mt-4 flex flex-col gap-2.5">
        {/* Quantity Sold Progress Bar */}
        <div className="relative overflow-hidden rounded-full bg-zinc-100 p-1 dark:bg-zinc-800">
          <div
            className="h-3.5 rounded-full bg-gradient-to-r from-amber-500 to-red-600 transition-all duration-500"
            style={{ width: `${Math.max(progressPercent, 5)}%` }}
          />
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
            {isSoldOut ? 'Đã bán hết' : `Đã bán ${soldCount}/${totalCount}`}
          </span>
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={isSoldOut || adding}
          variant={added ? 'secondary' : 'default'}
          className={cn(
            'w-full font-bold transition-all shadow-sm',
            !isSoldOut && !added && 'bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700'
          )}
        >
          {adding ? (
            <>
              <Loader2 className="mr-1.5 size-4 animate-spin" />
              Đang xử lý...
            </>
          ) : added ? (
            <>
              <Check className="mr-1.5 size-4 text-green-600" />
              Đã thêm vào giỏ
            </>
          ) : isSoldOut ? (
            'Tạm hết hàng'
          ) : (
            <>
              <ShoppingCart className="mr-1.5 size-4" />
              Mua ngay
            </>
          )}
        </Button>
      </div>
    </article>
  );
}

```

# modules\flash-sale\components\flash-sale-section.tsx

| Property | Value |
|----------|-------|
| Path | `modules\flash-sale\components\flash-sale-section.tsx` |
| Size | 3,731 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.946734 |

```tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Flame, ArrowRight, Sparkles } from 'lucide-react';
import { FlashSaleCampaign } from '@/types/inventory-sale';
import { flashSaleApi } from '@/api/flash-sale.api';
import { FlashSaleCountdown } from './countdown';
import { FlashSaleCard } from './flash-sale-card';

export function FlashSaleSection() {
  const [campaigns, setCampaigns] = useState<FlashSaleCampaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActive() {
      try {
        const res = await flashSaleApi.getActiveCampaigns();
        if (res.data) {
          setCampaigns(res.data);
        }
      } catch (err) {
        console.error('Failed to fetch active flash sale campaigns:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchActive();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-8 lg:px-12">
        <div className="h-48 animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-800" />
      </div>
    );
  }

  if (!campaigns.length) return null;

  const currentCampaign = campaigns[0];
  const items = currentCampaign.items || [];

  return (
    <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-8 lg:px-12">
      <div className="overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-b from-red-950/10 via-background to-background p-6 shadow-xl dark:from-red-950/30 sm:p-8">
        {/* Header Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-red-500/10 pb-6">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg shadow-red-600/30">
              <Flame className="size-7 fill-amber-300 text-amber-300 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-widest text-red-600 dark:text-red-400">
                  Ưu đãi giới hạn
                </span>
                <span className="flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700 dark:bg-red-950 dark:text-red-300">
                  <Sparkles className="size-3" /> HOT SALE
                </span>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
                {currentCampaign.name}
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <FlashSaleCountdown
              targetTime={currentCampaign.endTime}
              startTime={currentCampaign.startTime}
              size="md"
            />
            <Link
              href="/flash-sale"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-red-600 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-red-600 dark:hover:text-white"
            >
              Xem tất cả <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        {/* Item Grid */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.slice(0, 4).map((item) => (
            <FlashSaleCard key={item.id || item.variantId} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

```

# modules\flash-sale\types.ts

| Property | Value |
|----------|-------|
| Path | `modules\flash-sale\types.ts` |
| Size | 200 bytes |
| Extension | `.ts` |
| Modified | 2026-10-05 20:42:08.949732 |

```typescript
export * from '@/types/inventory-sale';

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isEnded: boolean;
  isUpcoming: boolean;
}

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
| Size | 1,255 bytes |
| Extension | `.ts` |
| Modified | 2026-10-05 10:24:43.397176 |

```typescript
import { useMutation } from '@tanstack/react-query';
import { orderApi } from '@/api/order.api';
import { CreateOrderPayload } from '@/types';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { CART_QUERY_KEYS } from '@/modules/cart/hooks/use-cart';

export const useCreateOrder = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateOrderPayload) => orderApi.createOrder(payload),
    onSuccess: (response) => {
      toast.success('Đặt hàng thành công!');
      // Clear cart cache since order is placed
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.cart });
      
      // Redirect based on payment method or to success page
      const orderData = response.data;
      if (orderData?.id) {
        // Mock redirection to an order confirmation page or list
        router.push(`/account/orders/${orderData.id}`);
      } else {
        router.push('/account/orders');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Có lỗi xảy ra khi đặt hàng');
    },
  });
};

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
| Size | 12,998 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.951938 |

```tsx
'use client';

import * as React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Plus, MapPin, Trash2, Edit3, Check, Loader2 } from 'lucide-react';
import { authApi } from '@/api/auth.api';
import { addressSchema, type AddressFormData } from '@/modules/auth/schemas';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FormField } from '@/components/ui/form-field';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import type { ShippingAddress } from '@/types';

export function AddressList() {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingAddress, setEditingAddress] = React.useState<ShippingAddress | null>(null);
  const [deleteTargetId, setDeleteTargetId] = React.useState<number | null>(null);

  const { data: addressesData, isLoading } = useQuery({
    queryKey: ['addresses'],
    queryFn: async () => {
      const res = await authApi.getAddresses();
      return res.data || [];
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      receiverName: '',
      phoneNumber: '',
      province: '',
      district: '',
      ward: '',
      detailAddress: '',
      isDefault: false,
    },
  });

  const isDefaultWatched = watch('isDefault');

  const openCreateDialog = () => {
    setEditingAddress(null);
    reset({
      receiverName: '',
      phoneNumber: '',
      province: '',
      district: '',
      ward: '',
      detailAddress: '',
      isDefault: false,
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (addr: ShippingAddress) => {
    setEditingAddress(addr);
    reset({
      receiverName: addr.receiverName,
      phoneNumber: addr.phoneNumber,
      province: addr.province,
      district: addr.district,
      ward: addr.ward,
      detailAddress: addr.detailAddress,
      isDefault: addr.isDefault,
    });
    setIsDialogOpen(true);
  };

  const saveMutation = useMutation({
    mutationFn: async (data: AddressFormData) => {
      if (editingAddress) {
        return authApi.updateAddress(editingAddress.id, data);
      } else {
        return authApi.createAddress(data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      toast.success(editingAddress ? 'Cập nhật địa chỉ thành công!' : 'Thêm địa chỉ mới thành công!');
      setIsDialogOpen(false);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Thao tác thất bại, vui lòng thử lại');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return authApi.deleteAddress(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      toast.success('Xóa địa chỉ thành công!');
      setDeleteTargetId(null);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Xóa địa chỉ thất bại');
    },
  });

  const onSubmit = (data: AddressFormData) => {
    saveMutation.mutate(data);
  };

  const addresses = addressesData || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#EAE6DF]">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900">Sổ địa chỉ nhận hàng</h2>
          <p className="text-xs text-neutral-500 mt-1">
            Quản lý danh sách địa chỉ nhận hàng để tiện lợi khi thanh toán.
          </p>
        </div>
        <Button
          onClick={openCreateDialog}
          className="h-10 px-4 rounded-xl bg-[#1D1F20] hover:bg-neutral-800 text-white font-medium flex items-center gap-2 shrink-0"
        >
          <Plus className="size-4" />
          <span>Thêm địa chỉ mới</span>
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-44 rounded-2xl" />
          <Skeleton className="h-44 rounded-2xl" />
        </div>
      ) : addresses.length === 0 ? (
        <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-[#EAE6DF] bg-neutral-50/40">
          <MapPin className="size-8 mx-auto text-neutral-400 mb-2" />
          <h3 className="text-sm font-semibold text-neutral-800">Chưa có địa chỉ nào</h3>
          <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
            Bạn chưa lưu địa chỉ nhận hàng nào. Hãy thêm địa chỉ đầu tiên để bắt đầu đặt hàng.
          </p>
          <Button
            onClick={openCreateDialog}
            variant="outline"
            size="sm"
            className="mt-4 rounded-xl border-[#EAE6DF]"
          >
            Thêm ngay
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`p-5 rounded-2xl border transition relative flex flex-col justify-between ${
                addr.isDefault
                  ? 'border-neutral-900 bg-neutral-50/30'
                  : 'border-[#EAE6DF] bg-white hover:border-neutral-300'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-neutral-900">
                      {addr.receiverName}
                    </h4>
                    {addr.isDefault && (
                      <Badge variant="lime" className="text-[10px] py-0">
                        Mặc định
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => openEditDialog(addr)}
                      className="p-1.5 text-neutral-400 hover:text-neutral-700 transition rounded-lg hover:bg-neutral-100"
                    >
                      <Edit3 className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteTargetId(addr.id)}
                      className="p-1.5 text-neutral-400 hover:text-rose-600 transition rounded-lg hover:bg-rose-50"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-neutral-600">
                  <span className="text-neutral-400">Điện thoại: </span>
                  {addr.phoneNumber}
                </p>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  <span className="text-neutral-400">Địa chỉ: </span>
                  {addr.detailAddress}, {addr.ward}, {addr.district}, {addr.province}
                </p>
              </div>

              {!addr.isDefault && (
                <div className="pt-3 mt-3 border-t border-[#EAE6DF]/70">
                  <button
                    type="button"
                    onClick={() =>
                      saveMutation.mutate({
                        ...addr,
                        isDefault: true,
                      })
                    }
                    className="text-xs text-neutral-500 hover:text-neutral-900 font-medium transition flex items-center gap-1"
                  >
                    <Check className="size-3.5" />
                    Đặt làm mặc định
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg bg-white border border-[#EAE6DF] rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-neutral-900">
              {editingAddress ? 'Cập nhật địa chỉ' : 'Thêm địa chỉ nhận hàng'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={control}
                name="receiverName"
                label="Tên người nhận"
                placeholder="Nguyễn Văn A"
                error={errors.receiverName?.message}
              />
              <FormField
                control={control}
                name="phoneNumber"
                label="Số điện thoại"
                placeholder="0912345678"
                error={errors.phoneNumber?.message}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <FormField
                control={control}
                name="province"
                label="Tỉnh / Thành"
                placeholder="TP. Hồ Chí Minh"
                error={errors.province?.message}
              />
              <FormField
                control={control}
                name="district"
                label="Quận / Huyện"
                placeholder="Quận 1"
                error={errors.district?.message}
              />
              <FormField
                control={control}
                name="ward"
                label="Phường / Xã"
                placeholder="Bến Nghé"
                error={errors.ward?.message}
              />
            </div>

            <FormField
              control={control}
              name="detailAddress"
              label="Địa chỉ chi tiết (Số nhà, tên đường)"
              placeholder="123 Đường Lê Lợi"
              error={errors.detailAddress?.message}
            />

            <label className="flex items-center gap-2 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={isDefaultWatched}
                onChange={(e) => setValue('isDefault', e.target.checked)}
                className="rounded border-[#EAE6DF] accent-neutral-900 size-4"
              />
              <span className="text-xs text-neutral-700">Đặt làm địa chỉ giao hàng mặc định</span>
            </label>

            <DialogFooter className="mt-6 flex flex-row justify-end gap-2.5 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="rounded-xl border-[#EAE6DF]"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={saveMutation.isPending}
                className="rounded-xl bg-[#1D1F20] hover:bg-neutral-800 text-white font-medium"
              >
                {saveMutation.isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin mr-2" />
                    Đang lưu...
                  </>
                ) : (
                  'Lưu địa chỉ'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <ConfirmDialog
        open={deleteTargetId !== null}
        onOpenChange={(open) => !open && setDeleteTargetId(null)}
        title="Xóa địa chỉ"
        description="Bạn có chắc chắn muốn xóa địa chỉ nhận hàng này? Thao tác này không thể hoàn tác."
        variant="destructive"
        confirmText="Xóa vĩnh viễn"
        isLoading={deleteMutation.isPending}
        onConfirm={() => {
          if (deleteTargetId) deleteMutation.mutate(deleteTargetId);
        }}
      />
    </div>
  );
}


```

# modules\user\components\profile-form.tsx

| Property | Value |
|----------|-------|
| Path | `modules\user\components\profile-form.tsx` |
| Size | 6,764 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.952731 |

```tsx
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { profileSchema, type ProfileFormData } from '@/modules/auth/schemas';
import { useAuth } from '@/components/providers/auth-provider';
import { apiClient } from '@/api/client';
import { API_ENDPOINTS } from '@/api/endpoints';
import { FormField } from '@/components/ui/form-field';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import type { ApiResponse, UserProfile } from '@/types';

export function ProfileForm() {
  const { user } = useAuth();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.fullName || '',
      phoneNumber: user?.phoneNumber || '',
      avatarUrl: user?.avatarUrl || '',
    },
  });

  React.useEffect(() => {
    if (user) {
      setValue('fullName', user.fullName || '');
      setValue('phoneNumber', user.phoneNumber || '');
      setValue('avatarUrl', user.avatarUrl || '');
    }
  }, [user, setValue]);

  const currentAvatarUrl = watch('avatarUrl');

  const updateProfileMutation = useMutation({
    mutationFn: async (data: ProfileFormData) => {
      if (!user?.id) throw new Error('Không tìm thấy thông tin người dùng');
      const res = await apiClient.put<ApiResponse<UserProfile>>(
        `${API_ENDPOINTS.IDENTITY.USERS}/${user.id}`,
        {
          fullName: data.fullName,
          phoneNumber: data.phoneNumber || undefined,
          avatarUrl: data.avatarUrl || null,
        }
      );
      return res.data;
    },
    onSuccess: (res) => {
      if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data));
        window.dispatchEvent(new Event('local-storage-change'));
        toast.success('Cập nhật hồ sơ thành công!');
      }
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Cập nhật thất bại, vui lòng thử lại');
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    updateProfileMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Avatar Preview & URL */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-4 rounded-xl bg-neutral-50/80 border border-[#EAE6DF]">
        <Avatar
          src={currentAvatarUrl || user?.avatarUrl}
          alt={user?.fullName || 'User'}
          size="xl"
          className="size-20 ring-4 ring-white shadow-xs"
        />
        <div className="space-y-1.5 flex-1">
          <h4 className="text-sm font-semibold text-neutral-900">Ảnh đại diện</h4>
          <p className="text-xs text-neutral-500">
            Dán đường dẫn ảnh đại diện (URL) của bạn để cập nhật ảnh hiển thị.
          </p>
          <div className="max-w-md pt-1">
            <FormField
              control={control}
              name="avatarUrl"
              label=""
              placeholder="https://example.com/avatar.jpg"
              error={errors.avatarUrl?.message}
            />
          </div>
        </div>
      </div>

      {/* Rewards & Role Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border border-[#EAE6DF] bg-neutral-50/40 flex items-center justify-between">
          <div>
            <p className="text-xs text-neutral-500">Điểm thưởng thành viên</p>
            <p className="text-xl font-bold text-neutral-900 flex items-center gap-1.5 mt-0.5">
              <Sparkles className="size-4 text-amber-500 fill-amber-500" />
              {user?.rewardPoints?.toLocaleString('vi-VN') || 0} điểm
            </p>
          </div>
          <Badge variant="lime" className="text-[11px]">Hạng Bạc</Badge>
        </div>

        <div className="p-4 rounded-xl border border-[#EAE6DF] bg-neutral-50/40 flex items-center justify-between">
          <div>
            <p className="text-xs text-neutral-500">Trạng thái tài khoản</p>
            <p className="text-sm font-semibold text-emerald-600 flex items-center gap-1.5 mt-1">
              <CheckCircle2 className="size-4" />
              {user?.status === 'ACTIVE' ? 'Đang hoạt động' : user?.status}
            </p>
          </div>
          <Badge variant="success" className="text-[11px]">Đã kích hoạt</Badge>
        </div>
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          control={control}
          name="fullName"
          label="Họ và tên"
          placeholder="Nguyễn Văn A"
          error={errors.fullName?.message}
        />

        <FormField
          control={control}
          name="phoneNumber"
          label="Số điện thoại"
          placeholder="0912345678"
          error={errors.phoneNumber?.message}
        />
      </div>

      {/* Readonly Email */}
      <div className="space-y-1">
        <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
          Địa chỉ Email
        </label>
        <input
          type="email"
          value={user?.email || ''}
          disabled
          className="w-full rounded-xl border border-[#EAE6DF] bg-neutral-100/70 px-4 py-2.5 text-sm text-neutral-500 cursor-not-allowed outline-none"
        />
        <p className="text-[11px] text-neutral-400">
          Email đăng nhập được cố định để bảo vệ an toàn danh tính tài khoản của bạn.
        </p>
      </div>

      <div className="flex justify-end pt-4 border-t border-[#EAE6DF]">
        <Button
          type="submit"
          disabled={updateProfileMutation.isPending || !isDirty}
          className="h-11 px-8 rounded-xl bg-[#1D1F20] hover:bg-neutral-800 text-white font-medium transition active:scale-[0.99]"
        >
          {updateProfileMutation.isPending ? (
            <>
              <Loader2 className="size-4 animate-spin mr-2" />
              Đang lưu thay đổi...
            </>
          ) : (
            'Lưu thay đổi'
          )}
        </Button>
      </div>
    </form>
  );
}


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

# types\inventory-sale.ts

| Property | Value |
|----------|-------|
| Path | `types\inventory-sale.ts` |
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

# types\loyalty-engage.ts

| Property | Value |
|----------|-------|
| Path | `types\loyalty-engage.ts` |
| Size | 1,442 bytes |
| Extension | `.ts` |
| Modified | 2026-10-05 20:42:08.958901 |

```typescript
import { DiscountType, PointTransType } from './enums'; //[cite: 1, 2]
import { UserProfile } from './auth';
import { Product } from './catalog';

export type { FlashSaleItem, FlashSaleCampaign } from './inventory-sale';

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

