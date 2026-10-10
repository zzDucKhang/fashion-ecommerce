'use client';

import * as React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { RotateCcw, CheckCircle, XCircle, AlertCircle, Eye } from 'lucide-react';
import { apiClient } from '@/api/client';
import { API_ENDPOINTS } from '@/api/endpoints';
import { DataTable, type Column } from '@/modules/admin/components/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils/format-date';
import type { ReturnRequest, ReturnStatus } from '@/types';

const returnStatusMeta: Record<ReturnStatus, { label: string; variant: 'warning' | 'lime' | 'destructive' | 'success' }> = {
  PENDING: { label: 'Chờ duyệt', variant: 'warning' },
  APPROVED: { label: 'Đã chấp thuận', variant: 'lime' },
  REJECTED: { label: 'Đã từ chối', variant: 'destructive' },
  COMPLETED: { label: 'Đã hoàn tất', variant: 'success' },
};

export default function AdminReturnsPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = React.useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-returns', page],
    queryFn: async () => {
      const res = await apiClient.get<any>(API_ENDPOINTS.FULFILLMENT.RETURNS, {
        params: { page, limit: 10 },
      });
      return res.data;
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: ReturnStatus }) =>
      apiClient.patch(`${API_ENDPOINTS.FULFILLMENT.RETURNS}/${id}/status`, { status }),
    onSuccess: () => {
      toast.success('Cập nhật trạng thái yêu cầu đổi trả thành công!');
      queryClient.invalidateQueries({ queryKey: ['admin-returns'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Cập nhật thất bại');
    },
  });

  const returns: ReturnRequest[] = (data?.data as any) || [];

  const columns: Column<ReturnRequest>[] = [
    {
      header: 'Mã yêu cầu',
      className: 'w-24 text-xs font-mono font-bold',
      cell: (r) => `#RET-${r.id}`,
    },
    {
      header: 'Sản phẩm hoàn trả',
      cell: (r) => (
        <div>
          <p className="font-semibold text-xs text-neutral-900">{r.orderItem?.productName || 'Sản phẩm'}</p>
          <p className="text-[11px] text-neutral-500">Số lượng: {r.quantity}</p>
        </div>
      ),
    },
    {
      header: 'Lý do khiếu nại',
      cell: (r) => (
        <div className="max-w-xs">
          <p className="text-xs font-medium text-neutral-800">{r.reason}</p>
          {r.description && <p className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">{r.description}</p>}
        </div>
      ),
    },
    {
      header: 'Trạng thái',
      cell: (r) => {
        const meta = returnStatusMeta[r.status] || { label: r.status, variant: 'warning' as const };
        return <Badge variant={meta.variant} className="text-[10px]">{meta.label}</Badge>;
      },
    },
    {
      header: 'Ngày gửi',
      cell: (r) => <span className="text-xs text-neutral-400">{formatDate(r.createdAt)}</span>,
    },
    {
      header: 'Kiểm duyệt',
      className: 'text-right',
      cell: (r) => (
        r.status === 'PENDING' ? (
          <div className="flex justify-end gap-1.5">
            <Button
              size="sm"
              onClick={() => updateStatusMutation.mutate({ id: r.id, status: 'APPROVED' })}
              className="h-7 px-2.5 text-xs bg-emerald-600 hover:bg-emerald-700 !text-white [&_*]:!text-white rounded-lg"
            >
              Chấp thuận
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => updateStatusMutation.mutate({ id: r.id, status: 'REJECTED' })}
              className="h-7 px-2.5 text-xs text-rose-600 border-rose-200 hover:bg-rose-50 rounded-lg"
            >
              Từ chối
            </Button>
          </div>
        ) : (
          <span className="text-[11px] text-neutral-400 italic">Đã xử lý</span>
        )
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <span className="eyebrow block mb-1">VẬN HÀNH</span>
        <h1 className="font-display text-3xl sm:text-4xl text-[#1D1F20] tracking-tight">Yêu cầu Đổi / Trả hàng</h1>
        <p className="text-xs text-neutral-500 mt-1">Xử lý các khiếu nại sản phẩm lỗi, hoàn tiền hoặc đổi size cho khách.</p>
      </div>

      <DataTable
        columns={columns}
        data={returns}
        isLoading={isLoading}
        page={page}
        totalPages={data?.totalPages || 1}
        totalItems={data?.totalItems || 0}
        onPageChange={setPage}
        emptyMessage="Chưa có yêu cầu trả hàng nào."
      />
    </div>
  );
}