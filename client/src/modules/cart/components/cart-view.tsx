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
