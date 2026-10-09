'use client';

import * as React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Star, EyeOff, CheckCircle2, MessageSquare, CornerDownRight } from 'lucide-react';
import { apiClient } from '@/api/client';
import { API_ENDPOINTS } from '@/api/endpoints';
import { DataTable, type Column } from '@/modules/admin/components/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils/format-date';
import type { ProductReview } from '@/types';

export default function AdminReviewsPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = React.useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-reviews', page],
    queryFn: async () => {
      const res = await apiClient.get<any>(API_ENDPOINTS.LOYALTY_ENGAGE.REVIEWS, {
        params: { page, limit: 10 },
      });
      return res.data;
    },
  });

  const reviews: ProductReview[] = (data?.data as any) || [];

  const columns: Column<ProductReview>[] = [
    {
      header: 'Khách hàng',
      cell: (r) => (
        <div>
          <p className="font-semibold text-xs text-neutral-900">{r.user?.fullName || 'Khách hàng'}</p>
          <p className="text-[10px] text-neutral-400">{r.user?.email}</p>
        </div>
      ),
    },
    {
      header: 'Đánh giá',
      cell: (r) => (
        <div className="flex items-center gap-1">
          <Star className="size-3.5 fill-amber-400 text-amber-400" />
          <span className="font-bold text-xs text-neutral-800">{r.rating}/5</span>
        </div>
      ),
    },
    {
      header: 'Nội dung nhận xét',
      cell: (r) => (
        <div className="max-w-md">
          <p className="text-xs text-neutral-700 line-clamp-2">{r.content}</p>
          {r.shopReply && (
            <p className="text-[11px] text-emerald-700 flex items-center gap-1 mt-1 font-medium">
              <CornerDownRight className="size-3" /> {r.shopReply}
            </p>
          )}
        </div>
      ),
    },
    {
      header: 'Thời gian',
      cell: (r) => <span className="text-xs text-neutral-400">{formatDate(r.createdAt)}</span>,
    },
    {
      header: 'Trạng thái',
      cell: (r) => (
        <Badge variant={r.isHidden ? 'secondary' : 'success'} className="text-[10px]">
          {r.isHidden ? 'Đã ẩn' : 'Hiển thị'}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <span className="eyebrow block mb-1">CSKH & UY TÍN</span>
        <h1 className="font-display text-3xl sm:text-4xl text-[#1D1F20] tracking-tight">Đánh giá sản phẩm</h1>
        <p className="text-xs text-neutral-500 mt-1">Quản lý các phản hồi và nhận xét thực tế từ người mua hàng.</p>
      </div>

      <DataTable
        columns={columns}
        data={reviews}
        isLoading={isLoading}
        page={page}
        totalPages={data?.totalPages || 1}
        totalItems={data?.totalItems || 0}
        onPageChange={setPage}
        emptyMessage="Chưa có đánh giá nào."
      />
    </div>
  );
}