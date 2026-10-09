'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ArrowLeft, PackageCheck, Truck, XCircle, RotateCcw, Star } from 'lucide-react';
import { orderApi } from '@/api/order.api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Order } from '@/types';

const statusMeta: Record<string, { label: string; variant: 'success' | 'lime' | 'secondary' | 'warning' | 'outline' }> = {
  PENDING_PAYMENT: { label: 'Chờ thanh toán', variant: 'warning' },
  CONFIRMED: { label: 'Đã xác nhận', variant: 'lime' },
  PROCESSING: { label: 'Đang xử lý', variant: 'lime' },
  SHIPPED: { label: 'Đang giao', variant: 'secondary' },
  DELIVERED: { label: 'Đã giao', variant: 'success' },
  CANCELLED: { label: 'Đã hủy', variant: 'outline' },
  RETURNED: { label: 'Đã trả hàng', variant: 'outline' },
};

function formatCurrency(value: number | string) {
  const numeric = typeof value === 'number' ? value : Number(value || 0);
  return `${numeric.toLocaleString('vi-VN')} ₫`;
}

export default function OrderDetailPage() {
  const params = useParams<{ orderId: string }>();
  const router = useRouter();
  const orderId = Number(params.orderId);

  const { data, isLoading } = useQuery({
    queryKey: ['order-detail', orderId],
    queryFn: () => orderApi.getOrderById(orderId),
    enabled: !!orderId,
  });

  const order = (data?.data ?? null) as Order | null;

  const cancelMutation = useMutation({
    mutationFn: () => orderApi.cancelOrder(orderId),
    onSuccess: () => {
      router.refresh();
    },
  });

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-[#EAE6DF] p-6 sm:p-8 shadow-xs">
        <div className="h-10 w-40 rounded-xl bg-neutral-100 animate-pulse" />
        <div className="mt-6 h-52 rounded-2xl bg-neutral-100 animate-pulse" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="bg-white rounded-2xl border border-[#EAE6DF] p-6 sm:p-8 shadow-xs text-center">
        <p className="text-sm text-neutral-600">Không tìm thấy đơn hàng.</p>
        <Link href="/account/orders" className="mt-4 inline-block">
          <Button variant="outline" className="rounded-xl border-[#EAE6DF]">Quay lại đơn mua</Button>
        </Link>
      </div>
    );
  }

  const meta = statusMeta[order.status] ?? { label: order.status, variant: 'outline' as const };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-[#EAE6DF] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col gap-4 border-b border-[#EAE6DF] pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Link href="/account/orders" className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#EAE6DF] text-neutral-600 hover:bg-neutral-50">
              <ArrowLeft className="size-4" />
            </Link>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">Chi tiết đơn hàng</p>
              <h2 className="mt-1 text-xl font-semibold text-neutral-900">{order.orderCode}</h2>
            </div>
          </div>

          <Badge variant={meta.variant}>{meta.label}</Badge>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-[#EAE6DF] bg-neutral-50/30 p-4">
            <p className="text-[11px] uppercase tracking-[0.15em] text-neutral-400">Ngày đặt</p>
            <p className="mt-2 text-sm font-medium text-neutral-900">
              {order.orderDate ? new Date(order.orderDate).toLocaleDateString('vi-VN') : '—'}
            </p>
          </div>
          <div className="rounded-xl border border-[#EAE6DF] bg-neutral-50/30 p-4">
            <p className="text-[11px] uppercase tracking-[0.15em] text-neutral-400">Phương thức</p>
            <p className="mt-2 text-sm font-medium text-neutral-900">{order.paymentMethod}</p>
          </div>
          <div className="rounded-xl border border-[#EAE6DF] bg-neutral-50/30 p-4">
            <p className="text-[11px] uppercase tracking-[0.15em] text-neutral-400">Thanh toán</p>
            <p className="mt-2 text-sm font-medium text-neutral-900">{order.paymentStatus}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="bg-white rounded-2xl border border-[#EAE6DF] p-6 shadow-xs">
          <div className="flex items-center gap-2 pb-4 border-b border-[#EAE6DF]">
            <PackageCheck className="size-4 text-neutral-700" />
            <h3 className="text-sm font-semibold text-neutral-900">Sản phẩm trong đơn</h3>
          </div>

          <div className="mt-4 space-y-4">
            {order.orderItems.map((item) => (
              <div key={item.id} className="flex flex-col gap-3 rounded-2xl border border-[#EAE6DF] bg-neutral-50/40 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-neutral-900">{item.productName}</p>
                  <p className="mt-1 text-xs text-neutral-500">
                    {item.variantValue || 'Phân loại: Chung'} • Số lượng: {item.quantity}
                  </p>
                </div>

                <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                  <p className="text-sm font-semibold text-neutral-900">{formatCurrency(item.unitPrice)}</p>
                  {order.status === 'DELIVERED' && (
                    <Link href={`/account/orders/${order.id}/review/${item.variantId ?? item.id}`}>
                      <Button variant="outline" size="sm" className="rounded-xl border-[#EAE6DF] text-xs">
                        <Star className="mr-1.5 size-3.5" />
                        Đánh giá
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#EAE6DF] p-6 shadow-xs">
            <div className="flex items-center gap-2 pb-4 border-b border-[#EAE6DF]">
              <Truck className="size-4 text-neutral-700" />
              <h3 className="text-sm font-semibold text-neutral-900">Thông tin giao hàng</h3>
            </div>

            <div className="mt-4 space-y-2 text-sm text-neutral-700">
              <p>
                <span className="font-medium text-neutral-900">Người nhận:</span> {order.receiverName}
              </p>
              <p>
                <span className="font-medium text-neutral-900">Số điện thoại:</span> {order.receiverPhone}
              </p>
              <p>
                <span className="font-medium text-neutral-900">Địa chỉ:</span> {order.detailAddress}, {order.ward}, {order.district}, {order.province}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#EAE6DF] p-6 shadow-xs">
            <h3 className="text-sm font-semibold text-neutral-900">Tổng tiền</h3>
            <div className="mt-4 space-y-2 text-sm text-neutral-600">
              <div className="flex items-center justify-between">
                <span>Tạm tính</span>
                <span>{formatCurrency(order.subTotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Phí vận chuyển</span>
                <span>{formatCurrency(order.shippingFee)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Giảm giá</span>
                <span>- {formatCurrency(Number(order.voucherDiscount || 0) + Number(order.pointDiscount || 0))}</span>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-[#EAE6DF] pt-3 text-base font-semibold text-neutral-900">
                <span>Tổng cộng</span>
                <span>{formatCurrency(order.totalAmount)}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {order.status === 'PENDING_PAYMENT' && (
              <Button
                onClick={() => cancelMutation.mutate()}
                variant="destructive"
                className="rounded-xl"
                disabled={cancelMutation.isPending}
              >
                <XCircle className="mr-2 size-4" />
                {cancelMutation.isPending ? 'Đang hủy...' : 'Hủy đơn hàng'}
              </Button>
            )}

            {order.status === 'DELIVERED' && (
              <Link href={`/account/orders/${order.id}/return`}>
                <Button variant="outline" className="w-full rounded-xl border-[#EAE6DF]">
                  <RotateCcw className="mr-2 size-4" />
                  Yêu cầu trả hàng
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
