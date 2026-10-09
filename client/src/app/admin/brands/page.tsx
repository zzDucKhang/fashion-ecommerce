'use client';

import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, Edit3, Trash2, Sparkles, Image as ImageIcon } from 'lucide-react';
import { catalogApi } from '@/api/catalog.api';
import { DataTable, type Column } from '@/modules/admin/components/data-table';
import { SearchInput } from '@/components/ui/search-input';
import { Button } from '@/components/ui/button';
import type { Brand } from '@/types';

export default function AdminBrandsPage() {
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['admin-brands', page, search],
    queryFn: () => catalogApi.getBrands({ page, limit: 10, search: search || undefined }),
  });

  const columns: Column<Brand>[] = [
    {
      header: 'ID',
      className: 'w-16 text-xs text-neutral-400 font-mono',
      cell: (brand) => `#${brand.id}`,
    },
    {
      header: 'Thương hiệu',
      cell: (brand) => (
        <div className="flex items-center gap-3">
          {brand.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={brand.logoUrl} alt={brand.defaultName} className="size-10 rounded-lg object-contain border border-[#EAE6DF] bg-white p-1" />
          ) : (
            <div className="size-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-400">
              <ImageIcon className="size-4" />
            </div>
          )}
          <span className="font-semibold text-sm text-neutral-900">{brand.defaultName}</span>
        </div>
      ),
    },
    {
      header: 'Hành động',
      className: 'text-right',
      cell: () => (
        <div className="flex justify-end gap-1">
          <button className="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition" title="Sửa">
            <Edit3 className="size-4" />
          </button>
          <button className="p-1.5 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition" title="Xóa">
            <Trash2 className="size-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="eyebrow block mb-1">CATALOG</span>
          <h1 className="font-display text-3xl sm:text-4xl text-[#1D1F20] tracking-tight">Thương hiệu</h1>
          <p className="text-xs text-neutral-500 mt-1">Quản lý danh sách các thương hiệu sản phẩm đang kinh doanh.</p>
        </div>
        <Button className="h-10 px-4 rounded-xl bg-[#1D1F20] hover:bg-neutral-800 text-white font-medium flex items-center gap-2">
          <Plus className="size-4" /> Thêm Thương hiệu
        </Button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-[#EAE6DF] shadow-xs flex justify-between items-center">
        <SearchInput 
          value={search} 
          onChange={(val) => { setSearch(val); setPage(1); }} 
          placeholder="Tìm kiếm thương hiệu..." 
          className="max-w-md"
        />
      </div>

      <DataTable
        columns={columns}
        data={(data?.data as any) || []}
        isLoading={isLoading}
        page={page}
        totalPages={data?.totalPages || 1}
        totalItems={data?.totalItems || 0}
        onPageChange={setPage}
        emptyMessage="Không tìm thấy thương hiệu nào."
      />
    </div>
  );
}