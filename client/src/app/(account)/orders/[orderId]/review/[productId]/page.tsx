'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ArrowLeft, Loader2, Send, Star } from 'lucide-react';
import { toast } from 'sonner';
import { apiClient } from '@/api/client';
import { API_ENDPOINTS } from '@/api/endpoints';
import { orderApi } from '@/api/order.api';
import { Button } from '@/components/ui/button';
import type { Order } from '@/types';

export default function ProductReviewPage() {
  const params = useParams<{ orderId: string; productId: string }>();
  const router = useRouter();
  const orderId = Number(params.orderId);
  const productId = Number(params.productId);

  const { data, isLoading } = useQuery({
    queryKey: ['order-review', orderId],
    queryFn: () => orderApi.getOrderById(orderId),
    enabled: !!orderId,
  });

  const order = (data?.data ?? null) as Order | null;
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');

  const reviewMutation = useMutation({
    mutationFn: async () => {
      if (!orderId || !productId) {
        throw new Error('Thiếu thông tin đơn hàng hoặc sản phẩm');
      }

      const payload = {
        productId,
        orderId,
        rating,
        content: content.trim(),
        mediaUrls: [],
      };

      const res = await apiClient.post(API_ENDPOINTS.LOYALTY_ENGAGE.REVIEWS, payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Cảm ơn bạn đã đánh giá sản phẩm!');
      router.push(`/account/orders/${orderId}`);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Không thể gửi đánh giá');
    },
  });

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-[#EAE6DF] p-6 sm:p-8 shadow-xs">
        <div className="h-10 w-48 rounded-xl bg-neutral-100 animate-pulse" />
        <div className="mt-6 h-52 rounded-2xl bg-neutral-100 animate-pulse" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="bg-white rounded-2xl border border-[#EAE6DF] p-6 sm:p-8 shadow-xs text-center">
        <p className="text-sm text-neutral-600">Không tìm thấy đơn hàng để đánh giá.</p>
        <Link href="/account/orders" className="mt-4 inline-block">
          <Button variant="outline" className="rounded-xl border-[#EAE6DF]">Quay lại</Button>
        </Link>
      </div>
    );
  }

  const productName = order.orderItems.find((item) => Number(item.variantId ?? item.id) === productId)?.productName || 'Sản phẩm';

  return (
    <div className="bg-white rounded-2xl border border-[#EAE6DF] p-6 sm:p-8 shadow-xs">
      <div className="flex items-center gap-3 border-b border-[#EAE6DF] pb-6">
        <Link href={`/account/orders/${orderId}`} className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#EAE6DF] text-neutral-600 hover:bg-neutral-50">
          <ArrowLeft className="size-4" />
        </Link>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">Đánh giá sản phẩm</p>
          <h2 className="mt-1 text-xl font-semibold text-neutral-900">{productName}</h2>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600">Đánh giá của bạn</label>
          <div className="mt-3 flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                className="transition"
                aria-label={`Rating ${value}`}
              >
                <Star
                  className={`size-8 ${value <= rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-300'}`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600">Nội dung đánh giá</label>
          <textarea
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Chia sẻ cảm nhận của bạn về chất lượng, kiểu dáng, độ bền và trải nghiệm mua hàng..."
            className="w-full rounded-xl border border-[#EAE6DF] bg-white px-4 py-3 text-sm outline-none focus:border-neutral-900"
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Link href={`/account/orders/${orderId}`}>
            <Button variant="outline" className="rounded-xl border-[#EAE6DF]">Hủy</Button>
          </Link>

          <Button
            onClick={() => reviewMutation.mutate()}
            disabled={reviewMutation.isPending || !content.trim()}
            className="rounded-xl bg-[#1D1F20] text-white"
          >
            {reviewMutation.isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Đang gửi...
              </>
            ) : (
              <>
                <Send className="mr-2 size-4" />
                Gửi đánh giá
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
