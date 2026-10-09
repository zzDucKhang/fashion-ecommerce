'use client';

import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, Edit3, Trash2, Layers, EyeOff, CheckCircle2 } from 'lucide-react';
import { catalogApi } from '@/api/catalog.api';
import { DataTable, type Column } from '@/modules/admin/components/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Category } from '@/types';

export default function AdminCategoriesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: () => catalogApi.getCategories(),
  });

  const columns: Column<Category>[] = [
    {
      header: 'ID',
      className: 'w-16 text-xs text-neutral-400 font-mono',
      cell: (cat) => `#${cat.id}`,
    },
    {
      header: 'Tên danh mục',
      cell: (cat) => (
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-lg bg-neutral-100 flex items-center justify-center text-lg">
            {cat.iconUrl || '📁'}
          </div>
          <span className="font-semibold text-sm text-neutral-900">{cat.defaultName}</span>
        </div>
      ),
    },
    {
      header: 'Trạng thái hiển thị',
      cell: (cat) => (
        <Badge variant={cat.isVisible ? 'success' : 'secondary'} className="text-[10px]">
          {cat.isVisible ? <CheckCircle2 className="size-3 mr-1" /> : <EyeOff className="size-3 mr-1" />}
          {cat.isVisible ? 'Hiển thị' : 'Đang ẩn'}
        </Badge>
      ),
    },
    {
      header: 'Danh mục cha',
      cell: (cat) => <span className="text-xs text-neutral-500">{cat.parentId ? `ID: #${cat.parentId}` : 'Gốc (Root)'}</span>,
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
          <h1 className="font-display text-3xl sm:text-4xl text-[#1D1F20] tracking-tight">Danh mục</h1>
          <p className="text-xs text-neutral-500 mt-1">Cấu trúc phân loại sản phẩm hiển thị trên Website.</p>
        </div>
        <Button className="h-10 px-4 rounded-xl bg-[#1D1F20] hover:bg-neutral-800 text-white font-medium flex items-center gap-2">
          <Plus className="size-4" /> Thêm Danh mục
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={(data?.data as any) || []}
        isLoading={isLoading}
        emptyMessage="Không có danh mục nào."
      />
    </div>
  );
}