'use client';

import * as React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Ticket, Plus, CheckCircle2, XCircle, Trash2, Loader2 } from 'lucide-react';
import { apiClient } from '@/api/client';
import { API_ENDPOINTS } from '@/api/endpoints';
import { DataTable, type Column } from '@/modules/admin/components/data-table';
import { SearchInput } from '@/components/ui/search-input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { formatCurrency } from '@/lib/utils/format-currency';
import type { Voucher } from '@/types';

export default function AdminVouchersPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState('');
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-vouchers', page, search],
    queryFn: async () => {
      const res = await apiClient.get<any>(API_ENDPOINTS.LOYALTY_ENGAGE.VOUCHERS, {
        params: { page, limit: 10, search: search || undefined },
      });
      return res.data;
    },
  });

  // Khởi tạo các giá trị chứa hàm impure (Date.now) an toàn thông qua useMemo
  const defaultFormValues = React.useMemo(() => {
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 86400000);
    
    return {
      code: '',
      discountType: 'FIXED_AMOUNT',
      discountValue: 50000,
      minOrderValue: 200000,
      totalUsageLimit: 100,
      userUsageLimit: 1,
      startDate: now.toISOString().slice(0, 16),
      endDate: nextWeek.toISOString().slice(0, 16),
    };
  }, []);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: defaultFormValues,
  });

  const createMutation = useMutation({
    mutationFn: (values: any) => apiClient.post(API_ENDPOINTS.LOYALTY_ENGAGE.VOUCHERS, {
      ...values,
      discountValue: Number(values.discountValue),
      minOrderValue: Number(values.minOrderValue),
      totalUsageLimit: Number(values.totalUsageLimit),
      userUsageLimit: Number(values.userUsageLimit),
    }),
    onSuccess: () => {
      toast.success('Tạo Voucher mới thành công!');
      queryClient.invalidateQueries({ queryKey: ['admin-vouchers'] });
      setIsDialogOpen(false);
      reset();
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Tạo Voucher thất bại');
    },
  });

  const vouchers: Voucher[] = (data?.data as any) || [];

  const columns: Column<Voucher>[] = [
    {
      header: 'Mã Voucher',
      cell: (v) => (
        <div className="flex items-center gap-2">
          <Ticket className="size-4 text-amber-500" />
          <span className="font-mono font-bold text-xs text-neutral-900 bg-neutral-100 px-2.5 py-1 rounded-md">
            {v.code}
          </span>
        </div>
      ),
    },
    {
      header: 'Loại giảm giá',
      cell: (v) => (
        <span className="text-xs font-medium text-neutral-700">
          {v.discountType === 'PERCENTAGE' ? `${v.discountValue}%` : formatCurrency(v.discountValue)}
        </span>
      ),
    },
    {
      header: 'Đơn tối thiểu',
      cell: (v) => <span className="text-xs text-neutral-500">{formatCurrency(v.minOrderValue)}</span>,
    },
    {
      header: 'Lượt sử dụng',
      cell: (v) => (
        <span className="text-xs font-mono">
          {v.usedCount} / {v.totalUsageLimit}
        </span>
      ),
    },
    {
      header: 'Trạng thái',
      cell: (v) => (
        <Badge variant={v.isActive ? 'success' : 'outline'} className="text-[10px]">
          {v.isActive ? 'Đang bật' : 'Đã tắt'}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="eyebrow block mb-1">MARKETING</span>
          <h1 className="font-display text-3xl sm:text-4xl text-[#1D1F20] tracking-tight">Voucher & Khuyến mãi</h1>
          <p className="text-xs text-neutral-500 mt-1">Cấu hình mã giảm giá theo chiến dịch bán hàng.</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)} className="h-10 px-4 rounded-xl bg-[#1D1F20] !text-white [&_*]:!text-white">
          <Plus className="size-4 mr-2" /> Tạo Voucher mới
        </Button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-[#EAE6DF] shadow-xs">
        <SearchInput value={search} onChange={(val) => { setSearch(val); setPage(1); }} placeholder="Tìm theo mã Voucher..." className="max-w-md" />
      </div>

      <DataTable
        columns={columns}
        data={vouchers}
        isLoading={isLoading}
        page={page}
        totalPages={data?.totalPages || 1}
        totalItems={data?.totalItems || 0}
        onPageChange={setPage}
        emptyMessage="Chưa có mã giảm giá nào."
      />

      {/* Modal Tạo Voucher */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg bg-white border border-[#EAE6DF] rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-neutral-900">Tạo mã Voucher mới</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit((d) => createMutation.mutate(d))} className="space-y-4 mt-2">
            <div>
              <label className="text-xs font-bold text-neutral-600 uppercase block mb-1">Mã Code *</label>
              <input {...register('code', { required: true })} placeholder="VD: SALE50K" className="w-full rounded-xl border border-[#EAE6DF] px-4 py-2 font-mono uppercase text-sm" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-neutral-600 uppercase block mb-1">Loại giảm *</label>
                <select {...register('discountType')} className="w-full rounded-xl border border-[#EAE6DF] px-3 py-2 text-xs">
                  <option value="FIXED_AMOUNT">Số tiền cố định (VNĐ)</option>
                  <option value="PERCENTAGE">Phần trăm (%)</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-neutral-600 uppercase block mb-1">Giá trị giảm *</label>
                <input type="number" {...register('discountValue', { required: true })} className="w-full rounded-xl border border-[#EAE6DF] px-3 py-2 text-xs" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-neutral-600 uppercase block mb-1">Đơn tối thiểu (VNĐ)</label>
                <input type="number" {...register('minOrderValue')} className="w-full rounded-xl border border-[#EAE6DF] px-3 py-2 text-xs" />
              </div>
              <div>
                <label className="text-xs font-bold text-neutral-600 uppercase block mb-1">Giới hạn số lượt</label>
                <input type="number" {...register('totalUsageLimit')} className="w-full rounded-xl border border-[#EAE6DF] px-3 py-2 text-xs" />
              </div>
            </div>

            <DialogFooter className="mt-6 flex justify-end gap-2 pt-2 border-t border-[#EAE6DF]">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="rounded-xl border-[#EAE6DF]">Hủy</Button>
              <Button type="submit" disabled={createMutation.isPending} className="rounded-xl bg-[#1D1F20] !text-white [&_*]:!text-white">
                {createMutation.isPending ? 'Đang lưu...' : 'Tạo Voucher'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}