'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ArrowLeft, Loader2, Save, Layers } from 'lucide-react';
import { catalogApi } from '@/api/catalog.api';
import { Button } from '@/components/ui/button';

interface EditProductFormValues {
  defaultName: string;
  categoryId: number;
  brandId?: number;
  thumbnailUrl?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'OUT_OF_STOCK' | 'ARCHIVED';
}

export default function AdminEditProductPage() {
  const params = useParams<{ productId: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const productId = Number(params.productId);

  const { data: prodRes, isLoading: isLoadingProd } = useQuery({
    queryKey: ['admin-product-edit', productId],
    queryFn: () => catalogApi.getProductById(productId),
    enabled: !!productId,
  });

  const { data: catRes } = useQuery({
    queryKey: ['admin-categories-select'],
    queryFn: () => catalogApi.getCategories(),
  });

  const { data: brandRes } = useQuery({
    queryKey: ['admin-brands-select'],
    queryFn: () => catalogApi.getBrands({ limit: 100 }),
  });

  const product = prodRes?.data;
  const categories = (catRes?.data as any) || [];
  const brands = (brandRes?.data as any) || [];

  const { register, handleSubmit, reset, formState: { errors } } = useForm<EditProductFormValues>();

  React.useEffect(() => {
    if (product) {
      reset({
        defaultName: product.defaultName,
        categoryId: product.categoryId,
        brandId: product.brandId || undefined,
        thumbnailUrl: product.thumbnailUrl || '',
        status: product.status as any,
      });
    }
  }, [product, reset]);

  const updateMutation = useMutation({
    mutationFn: (values: EditProductFormValues) =>
      catalogApi.updateProduct(productId, {
        ...values,
        categoryId: Number(values.categoryId),
        brandId: values.brandId ? Number(values.brandId) : undefined,
      }),
    onSuccess: () => {
      toast.success('Cập nhật thông tin sản phẩm thành công!');
      queryClient.invalidateQueries({ queryKey: ['admin-product-edit', productId] });
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      router.push('/admin/products');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Cập nhật sản phẩm thất bại');
    },
  });

  if (isLoadingProd) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="size-8 animate-spin text-neutral-400" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-[#EAE6DF] pb-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/products" className="p-2 border border-[#EAE6DF] rounded-xl hover:bg-neutral-50 transition">
            <ArrowLeft className="size-4 text-neutral-600" />
          </Link>
          <div>
            <span className="eyebrow block mb-0.5">CATALOG</span>
            <h1 className="font-display text-2xl text-[#1D1F20] tracking-tight">Chỉnh sửa sản phẩm #{productId}</h1>
          </div>
        </div>

        <Link href={`/admin/products/${productId}/variants`}>
          <Button variant="outline" className="rounded-xl border-[#EAE6DF] text-xs">
            <Layers className="size-4 mr-1.5 text-emerald-600" /> Quản lý SKU Biến thể
          </Button>
        </Link>
      </div>

      <form onSubmit={handleSubmit((d) => updateMutation.mutate(d))} className="space-y-6">
        <div className="bg-white rounded-2xl border border-[#EAE6DF] p-6 shadow-xs space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
              Tên sản phẩm *
            </label>
            <input
              {...register('defaultName', { required: 'Tên sản phẩm là bắt buộc' })}
              className="w-full rounded-xl border border-[#EAE6DF] bg-white px-4 py-2.5 text-sm outline-none focus:border-neutral-900 shadow-xs"
            />
            {errors.defaultName && <p className="text-xs text-rose-500 mt-1">{errors.defaultName.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
                Danh mục *
              </label>
              <select
                {...register('categoryId', { required: true })}
                className="w-full rounded-xl border border-[#EAE6DF] bg-white px-4 py-2.5 text-sm outline-none focus:border-neutral-900 shadow-xs"
              >
                {categories.map((c: any) => (
                  <option key={c.id} value={c.id}>{c.defaultName}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
                Thương hiệu
              </label>
              <select
                {...register('brandId')}
                className="w-full rounded-xl border border-[#EAE6DF] bg-white px-4 py-2.5 text-sm outline-none focus:border-neutral-900 shadow-xs"
              >
                <option value="">-- Không thương hiệu --</option>
                {brands.map((b: any) => (
                  <option key={b.id} value={b.id}>{b.defaultName}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
              Ảnh đại diện Thumbnail (URL)
            </label>
            <input
              {...register('thumbnailUrl')}
              className="w-full rounded-xl border border-[#EAE6DF] bg-white px-4 py-2.5 text-sm outline-none focus:border-neutral-900 shadow-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
              Trạng thái sản phẩm
            </label>
            <select
              {...register('status')}
              className="w-full sm:w-60 rounded-xl border border-[#EAE6DF] bg-white px-4 py-2.5 text-sm outline-none focus:border-neutral-900 shadow-xs"
            >
              <option value="PUBLISHED">Công khai (PUBLISHED)</option>
              <option value="DRAFT">Lưu nháp (DRAFT)</option>
              <option value="OUT_OF_STOCK">Hết hàng (OUT_OF_STOCK)</option>
              <option value="ARCHIVED">Lưu trữ (ARCHIVED)</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link href="/admin/products">
            <Button type="button" variant="outline" className="rounded-xl border-[#EAE6DF]">Hủy</Button>
          </Link>
          <Button
            type="submit"
            disabled={updateMutation.isPending}
            className="rounded-xl bg-[#1D1F20] text-white hover:bg-neutral-800"
          >
            {updateMutation.isPending ? (
              <>
                <Loader2 className="size-4 animate-spin mr-1.5" /> Đang cập nhật...
              </>
            ) : (
              <>
                <Save className="size-4 mr-1.5" /> Lưu thay đổi
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}