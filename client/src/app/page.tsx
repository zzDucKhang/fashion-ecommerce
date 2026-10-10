'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ChevronRight, Star, ShoppingBag } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { catalogApi } from '@/api/catalog.api';
import { ProductCard } from '@/modules/catalog/components/product-card';
import { Skeleton } from '@/components/ui/skeleton';
import type { Product } from '@/modules/catalog/mock';
import { SiteHeader } from '@/components/layouts/site-header';
// Danh sách ảnh fallback minh họa chất lượng cao khi danh mục chưa cấu hình iconUrl
const CATEGORY_IMAGES = [
  'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1506629905607-d9b1f1f3d7a8?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
];

export default function Home() {
  // 1. Fetch danh mục từ server
  const { data: categoryResponse, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['home-categories'],
    queryFn: () => catalogApi.getCategories(),
  });

  // 2. Fetch danh sách sản phẩm từ server
  const { data: productResponse, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['home-products'],
    queryFn: () => catalogApi.getProducts({ limit: 8, status: 'PUBLISHED' }),
  });

  const categories = categoryResponse?.data || [];
  const apiProducts = productResponse?.data || [];

  // Map dữ liệu sản phẩm từ Server API sang model hiển thị của ProductCard
  const products: Product[] = apiProducts.map((p: any) => {
    const firstVariant = p.variants?.[0];
    const originalPrice = firstVariant?.originalPrice ? Number(firstVariant.originalPrice) : 350000;
    const sellingPrice = firstVariant?.sellingPrice ? Number(firstVariant.sellingPrice) : undefined;
    const images =
      p.images && p.images.length > 0
        ? p.images.map((img: any) => img.imageUrl)
        : [p.thumbnailUrl || 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80'];

    return {
      slug: String(p.id),
      name: p.defaultName, 
      brand: p.brand?.defaultName || 'Fashion Studio',
      category: p.category?.defaultName || 'Thời trang',
      price: sellingPrice || originalPrice,
      originalPrice: sellingPrice && sellingPrice < originalPrice ? originalPrice : undefined,
      flashSalePrice: undefined,
      rating: 5.0,
      reviews: 12,
      tag: p.tags?.[0]?.name || undefined,
      images,
      colors: ['#1D1F20', '#EAE6DF', '#a38a75'],
      sizes: ['S', 'M', 'L', 'XL'],
      description: p.defaultName, // <--- SỬA: Xóa translations, tạm dùng defaultName hoặc field mô tả mới
    };
  });

  return (
    <main>
      <SiteHeader />
      {/* Danh mục nổi bật (Categories) */}
      <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-8 lg:px-12 lg:py-20">
        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="eyebrow">Browse the edit</p>
            <h2 className="section-title mt-2">Shop by feeling</h2>
          </div>
          <Link
            href="/products"
            className="hidden items-center gap-1 text-sm font-semibold sm:flex hover:text-[#84EA53] transition-colors"
          >
            View all <ChevronRight size={16} />
          </Link>
        </div>

        {isLoadingCategories ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="min-h-[220px] rounded-xl sm:min-h-[300px]" />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="rounded-xl border border-dashed border-neutral-300 p-8 text-center text-sm text-neutral-500">
            Chưa có danh mục nào từ máy chủ.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {categories.slice(0, 4).map((category, index) => {
              const name = category.defaultName;
              const image = category.iconUrl || CATEGORY_IMAGES[index % CATEGORY_IMAGES.length];

              return (
                <Link
                  key={category.id}
                  href={`/products?categoryId=${category.id}`}
                  className="group relative min-h-[220px] overflow-hidden rounded-xl bg-white sm:min-h-[300px]"
                >
                  <Image
                    src={image}
                    alt={name}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                  <div className="absolute bottom-5 left-5 !text-white [&_*]:!text-white">
                    <p className="font-display text-2xl sm:text-3xl">{name}</p>
                    <p className="mt-1 text-xs !text-white [&_*]:!text-white/70">Khám phá ngay</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Sản phẩm nổi bật (Products) */}
      <section className="mx-auto max-w-[1440px] px-4 pb-20 sm:px-8 lg:px-12">
        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="eyebrow">Picked for you</p>
            <h2 className="section-title mt-2">The good stuff</h2>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-1 text-sm font-semibold hover:text-[#84EA53] transition-colors"
          >
            Explore edit <ChevronRight size={16} />
          </Link>
        </div>

        {isLoadingProducts ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-[.88] w-full rounded-xl" />
                <Skeleton className="h-4 w-3/4 rounded" />
                <Skeleton className="h-4 w-1/2 rounded" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="py-16 text-center">
            <ShoppingBag className="mx-auto size-10 text-neutral-300 mb-3" />
            <p className="text-sm font-medium text-neutral-700">Chưa có sản phẩm nào từ máy chủ.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
