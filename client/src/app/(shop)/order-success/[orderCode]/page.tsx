import Link from 'next/link';
import { CheckCircle2, ArrowRight, ShoppingBag } from 'lucide-react';

// Vì sử dụng App Router nên params được truyền tự động vào page component
export default function OrderSuccessPage({ params }: { params: { orderCode: string } }) {
  return (
    <main className="min-h-[75vh] flex items-center justify-center p-4 bg-[#FBF9F4]">
      <div className="max-w-md w-full bg-white rounded-3xl border border-[#EAE6DF] p-8 sm:p-10 text-center shadow-xs">
        <div className="mx-auto size-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6 ring-8 ring-emerald-50/50">
          <CheckCircle2 size={32} />
        </div>
        
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Đặt hàng thành công!</h1>
        <p className="text-sm text-neutral-500 mb-6">
          Cảm ơn bạn đã mua sắm. Đơn hàng của bạn đang được xử lý. Mã đơn hàng là:
        </p>
        
        <div className="inline-block bg-[#FBF9F4] border border-[#EAE6DF] rounded-xl px-6 py-3 mb-8">
          <span className="font-mono font-bold text-xl tracking-wider text-neutral-900">
            {params.orderCode}
          </span>
        </div>
        
        <div className="flex flex-col gap-3">
          <Link 
            href={`/account/orders`} 
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#1D1F20] text-white px-4 py-3.5 text-sm font-semibold hover:bg-neutral-800 transition active:scale-[0.99]"
          >
            <ShoppingBag size={16} /> Theo dõi đơn hàng
          </Link>
          <Link 
            href="/products" 
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#EAE6DF] text-neutral-700 px-4 py-3.5 text-sm font-semibold hover:bg-neutral-50 transition active:scale-[0.99]"
          >
            Tiếp tục mua sắm <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}