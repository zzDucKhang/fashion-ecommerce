import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem } from '@/types';
import { useUpdateCartItem, useRemoveCartItem } from '../hooks/use-cart';

interface CartItemProps {
  item: CartItem;
}

export function CartItemComponent({ item }: CartItemProps) {
  const updateMutation = useUpdateCartItem();
  const removeMutation = useRemoveCartItem();

  const handleUpdate = (delta: number) => {
    const newQuantity = Math.max(1, item.quantity + delta);
    if (newQuantity !== item.quantity) {
      updateMutation.mutate({ itemId: item.id, payload: { quantity: newQuantity } });
    }
  };

  const handleRemove = () => {
    removeMutation.mutate(item.id);
  };

  // Convert prices that might be strings to numbers
  const price = Number(item.variant.sellingPrice || item.variant.originalPrice || 0);
  const totalItemPrice = price * item.quantity;
  const imageUrl = item.variant.imageUrl || item.variant.product.thumbnailUrl || '/placeholder.png';
  
  // Format variant attributes (e.g. Color / Size)
  const variantDisplay = item.variant.attributeValues
    ? item.variant.attributeValues.map((av: any) => av.value).join(' / ')
    : 'Default';

  return (
    <div className="flex gap-4 py-5">
      <div className="relative h-32 w-28 shrink-0 overflow-hidden rounded-xl bg-[#e9e5dc]">
        <Image
          src={imageUrl}
          alt={item.variant.product.defaultName || 'Product'}
          fill
          sizes="112px"
          className="object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex justify-between gap-3">
          <div>
            <p className="text-sm font-semibold line-clamp-2">
              {item.variant.product.defaultName}
            </p>
            <p className="mt-2 text-xs text-[#74736e]">{variantDisplay}</p>
          </div>
          <button
            onClick={handleRemove}
            disabled={removeMutation.isPending}
            aria-label="Remove item"
            className="h-fit text-[#9b9991] hover:text-red-500 disabled:opacity-50 transition-colors"
          >
            <Trash2 size={15} />
          </button>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center rounded-lg border border-[#EAE6DF]">
            <button
              onClick={() => handleUpdate(-1)}
              disabled={updateMutation.isPending || item.quantity <= 1}
              className="p-2 disabled:opacity-50"
              aria-label="Decrease quantity"
            >
              <Minus size={12} />
            </button>
            <span className="w-5 text-center text-xs">
              {updateMutation.isPending ? '...' : item.quantity}
            </span>
            <button
              onClick={() => handleUpdate(1)}
              disabled={updateMutation.isPending}
              className="p-2 disabled:opacity-50"
              aria-label="Increase quantity"
            >
              <Plus size={12} />
            </button>
          </div>
          <span className="text-sm font-bold">
            ${totalItemPrice.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
