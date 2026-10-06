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
