'use client';

import Image from 'next/image';
import { Flame, ShoppingCart, Check, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { FlashSaleItem } from '@/types/inventory-sale';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { cartApi } from '@/api/cart.api';

interface FlashSaleCardProps {
  item: FlashSaleItem;
  className?: string;
}

export function FlashSaleCard({ item, className }: FlashSaleCardProps) {
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const productName = item.variant?.product?.defaultName || `Biến thể #${item.variantId}`;
  const sku = item.variant?.sku || `SKU-${item.variantId}`;
  
  const flashPrice = Number(item.flashSalePrice);
  const originalPrice = Number(item.variant?.sellingPrice || item.variant?.originalPrice || flashPrice * 1.3);
  
  const discountPercent = originalPrice > flashPrice 
    ? Math.round(((originalPrice - flashPrice) / originalPrice) * 100) 
    : 0;

  const soldCount = item.soldQuantity || 0;
  const totalCount = item.promoQuantity || 1;
  const progressPercent = Math.min(Math.round((soldCount / totalCount) * 100), 100);
  const isSoldOut = soldCount >= totalCount;

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  const handleAddToCart = async () => {
    if (isSoldOut || adding) return;
    setAdding(true);
    try {
      await cartApi.addToCart({
        variantId: item.variantId,
        quantity: 1,
      });
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      console.error('Không thể thêm sản phẩm vào giỏ hàng:', err);
    } finally {
      setAdding(false);
    }
  };

  return (
    <article
      className={cn(
        'group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-3 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-950',
        className
      )}
    >
      <div>
        {/* Image & Discount Badge Container */}
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900">
          <Image
            src="/images/product-placeholder.jpg"
            alt={productName}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Flash Sale Tag */}
          <div className="absolute left-2.5 top-2.5 flex items-center gap-1 rounded-full bg-red-600 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider !text-white [&_*]:!text-white shadow-md shadow-red-600/30">
            <Flame className="size-3.5 fill-amber-300 text-amber-300 animate-pulse" />
            <span>Flash Sale</span>
          </div>

          {/* Discount Percentage Badge */}
          {discountPercent > 0 && (
            <div className="absolute right-2.5 top-2.5 rounded-full bg-amber-400 px-2 py-0.5 text-xs font-black text-zinc-950 shadow-sm">
              -{discountPercent}%
            </div>
          )}

          {/* Sold Out Overlay */}
          {isSoldOut && (
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/70 backdrop-blur-[2px]">
              <span className="rounded-full bg-red-600/90 px-4 py-1.5 text-xs font-bold uppercase tracking-widest !text-white [&_*]:!text-white shadow-lg">
                Đã hết hàng
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="mt-3 flex flex-col gap-1.5">
          <div className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500">
            SKU: {sku}
          </div>
          <h3 className="line-clamp-2 text-sm font-semibold text-zinc-900 transition-colors group-hover:text-red-600 dark:text-zinc-100 dark:group-hover:text-red-400">
            {productName}
          </h3>

          {/* Pricing */}
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-red-600 dark:text-red-500">
              {formatPrice(flashPrice)}
            </span>
            {originalPrice > flashPrice && (
              <span className="text-xs font-medium text-zinc-400 line-through dark:text-zinc-500">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Progress & Cart Action */}
      <div className="mt-4 flex flex-col gap-2.5">
        {/* Quantity Sold Progress Bar */}
        <div className="relative overflow-hidden rounded-full bg-zinc-100 p-1 dark:bg-zinc-800">
          <div
            className="h-3.5 rounded-full bg-gradient-to-r from-amber-500 to-red-600 transition-all duration-500"
            style={{ width: `${Math.max(progressPercent, 5)}%` }}
          />
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
            {isSoldOut ? 'Đã bán hết' : `Đã bán ${soldCount}/${totalCount}`}
          </span>
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={isSoldOut || adding}
          variant={added ? 'secondary' : 'default'}
          className={cn(
            'w-full font-bold transition-all shadow-sm',
            !isSoldOut && !added && 'bg-red-600 !text-white [&_*]:!text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700'
          )}
        >
          {adding ? (
            <>
              <Loader2 className="mr-1.5 size-4 animate-spin" />
              Đang xử lý...
            </>
          ) : added ? (
            <>
              <Check className="mr-1.5 size-4 text-green-600" />
              Đã thêm vào giỏ
            </>
          ) : isSoldOut ? (
            'Tạm hết hàng'
          ) : (
            <>
              <ShoppingCart className="mr-1.5 size-4" />
              Mua ngay
            </>
          )}
        </Button>
      </div>
    </article>
  );
}
