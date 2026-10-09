'use client';

import Link from 'next/link';
import { Search, ShoppingBag, User } from 'lucide-react';
import { useCart } from '@/modules/cart/hooks/use-cart'; // 1. Import hook useCart

export function SiteHeader() {
  // 2. Lấy dữ liệu giỏ hàng từ server
  const { data: cartResponse } = useCart();
  const cartItems = cartResponse?.data?.cartItems || [];

  // 3. Tính tổng số lượng sản phẩm (cộng dồn quantity của từng món)[cite: 8, 9]
  const totalQuantity = cartItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );
  // (Nếu bạn chỉ muốn đếm số loại mặt hàng thay vì cộng dồn số lượng, hãy dùng: const totalQuantity = cartItems.length;)

  return (
    <header className="sticky top-0 z-40 border-b border-[#EAE6DF] bg-[#FBF9F4]/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center gap-5 px-4 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="shrink-0 font-display text-3xl font-semibold tracking-[-.06em]"
        >
          common<span className="text-[#84EA53]">.</span>
        </Link>
        <div className="hidden h-11 max-w-[700px] flex-1 items-center rounded-full border border-[#EAE6DF] bg-white px-4 shadow-[0_5px_20px_rgba(29,31,32,.04)] sm:flex">
          <Search size={17} className="mr-3 text-[#74736e]" />
          <input
            aria-label="Search products"
            placeholder="Search for an object, a feeling..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-[#9b9991]"
          />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/search"
            className="rounded-full p-2.5 hover:bg-white sm:hidden"
          >
            <Search size={20} />
          </Link>
          <Link
            href="/orders"
            className="relative rounded-full p-2.5 hover:bg-white"
            title="Lịch sử đơn hàng"
          >
            <User size={20} />
          </Link>
          <Link href="/cart"
            className="relative rounded-full p-2.5 hover:bg-white"
          >
            <ShoppingBag size={20} />
            {/* 4. Chỉ hiển thị badge khi giỏ hàng có sản phẩm */}
            {totalQuantity > 0 && (
              <span className="absolute right-0 top-0 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-[#84EA53] text-[9px] font-bold text-[#1D1F20]">
                {totalQuantity > 99 ? '99+' : totalQuantity}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}