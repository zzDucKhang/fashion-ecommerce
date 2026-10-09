'use client';

import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Truck, Search, ExternalLink } from 'lucide-react';
import { apiClient } from '@/api/client';
import { API_ENDPOINTS } from '@/api/endpoints';
import { DataTable, type Column } from '@/modules/admin/components/data-table';
import { SearchInput } from '@/components/ui/search-input';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils/format-currency';
import { formatDate } from '@/lib/utils/format-date';
import type { Shipment, ShipmentStatus } from '@/types';

const shipmentStatusMeta: Record<ShipmentStatus, { label: string; variant: 'warning' | 'lime' | 'secondary' | 'success' | 'destructive' }> = {
  PENDING: { label: 'Chờ lấy hàng', variant: 'warning' },
  PICKED_UP: { label: 'Đã lấy hàng', variant: 'lime' },
  IN_TRANSIT: { label: 'Đang vận chuyển', variant: 'secondary' },
  DELIVERED: { label: 'Giao thành công', variant: 'success' },
  FAILED: { label: 'Giao thất bại', variant: 'destructive' },
};

export default function AdminShipmentsPage() {
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['admin-shipments', page, search],
    queryFn: async () => {
      const res = await apiClient.get<any>(API_ENDPOINTS.FULFILLMENT.SHIPMENTS, {
        params: { page, limit: 10, search: search || undefined },
      });
      return res.data;
    },
  });

  const shipments: Shipment[] = (data?.data as any) || [];

  const columns: Column<Shipment>[] = [
    {
      header: 'Mã vận đơn',
      cell: (s) => (
        <div className="flex items-center gap-2">
          <Truck className="size-4 text-neutral-500" />
          <span className="font-mono font-bold text-xs text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded">
            {s.trackingCode}
          </span>
        </div>
      ),
    },
    {
      header: 'Đơn vị vận chuyển',
      cell: (s) => <span className="font-semibold text-xs text-neutral-800">{s.carrier}</span>,
    },
    {
      header: 'Người nhận',
      cell: (s) => (
        <div>
          <p className="text-xs font-semibold text-neutral-900">{s.order?.receiverName || 'Khách hàng'}</p>
          <p className="text-[11px] text-neutral-500 font-mono">{s.order?.receiverPhone}</p>
        </div>
      ),
    },
    {
      header: 'Cước vận chuyển',
      cell: (s) => <span className="text-xs font-semibold text-neutral-900">{formatCurrency(s.actualShippingFee)}</span>,
    },
    {
      header: 'Trạng thái',
      cell: (s) => {
        const meta = shipmentStatusMeta[s.status] || { label: s.status, variant: 'secondary' as const };
        return <Badge variant={meta.variant} className="text-[10px]">{meta.label}</Badge>;
      },
    },
    {
      header: 'Thời gian tạo',
      cell: (s) => <span className="text-xs text-neutral-400">{formatDate(s.createdAt)}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="eyebrow block mb-1">VẬN HÀNH</span>
          <h1 className="font-display text-3xl sm:text-4xl text-[#1D1F20] tracking-tight">Vận đơn & Giao hàng</h1>
          <p className="text-xs text-neutral-500 mt-1">Theo dõi các kiện hàng đang lưu kho và bàn giao cho đối tác vận chuyển.</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-[#EAE6DF] shadow-xs">
        <SearchInput
          value={search}
          onChange={(val) => { setSearch(val); setPage(1); }}
          placeholder="Tìm theo mã vận đơn hoặc số điện thoại..."
          className="max-w-md"
        />
      </div>

      <DataTable
        columns={columns}
        data={shipments}
        isLoading={isLoading}
        page={page}
        totalPages={data?.totalPages || 1}
        totalItems={data?.totalItems || 0}
        onPageChange={setPage}
        emptyMessage="Chưa có vận đơn nào."
      />
    </div>
  );
}