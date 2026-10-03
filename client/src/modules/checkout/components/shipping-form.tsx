'use client';

import { useFormContext } from 'react-hook-form';
import { CheckoutFormValues } from '../schemas';

interface ShippingFormProps {
  onNext: () => void;
}

export function ShippingForm({ onNext }: ShippingFormProps) {
  const { register, trigger, formState: { errors } } = useFormContext<CheckoutFormValues>();

  const handleContinue = async () => {
    // Validate only shipping fields before moving to payment step
    const isStepValid = await trigger('shippingAddress');
    if (isStepValid) {
      onNext();
    }
  };

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      <div>
        <input
          {...register('shippingAddress.receiverName')}
          placeholder="Họ và tên người nhận"
          className="w-full rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
        />
        {errors.shippingAddress?.receiverName && (
          <p className="mt-1 text-xs text-red-500">{errors.shippingAddress.receiverName.message}</p>
        )}
      </div>

      <div>
        <input
          {...register('shippingAddress.receiverPhone')}
          placeholder="Số điện thoại"
          className="w-full rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
        />
        {errors.shippingAddress?.receiverPhone && (
          <p className="mt-1 text-xs text-red-500">{errors.shippingAddress.receiverPhone.message}</p>
        )}
      </div>

      <div>
        <input
          {...register('shippingAddress.province')}
          placeholder="Tỉnh/Thành phố"
          className="w-full rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
        />
        {errors.shippingAddress?.province && (
          <p className="mt-1 text-xs text-red-500">{errors.shippingAddress.province.message}</p>
        )}
      </div>

      <div>
        <input
          {...register('shippingAddress.district')}
          placeholder="Quận/Huyện"
          className="w-full rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
        />
        {errors.shippingAddress?.district && (
          <p className="mt-1 text-xs text-red-500">{errors.shippingAddress.district.message}</p>
        )}
      </div>

      <div>
        <input
          {...register('shippingAddress.ward')}
          placeholder="Phường/Xã"
          className="w-full rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
        />
        {errors.shippingAddress?.ward && (
          <p className="mt-1 text-xs text-red-500">{errors.shippingAddress.ward.message}</p>
        )}
      </div>

      <div className="sm:col-span-2">
        <input
          {...register('shippingAddress.detailAddress')}
          placeholder="Địa chỉ chi tiết (Số nhà, đường...)"
          className="w-full rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
        />
        {errors.shippingAddress?.detailAddress && (
          <p className="mt-1 text-xs text-red-500">{errors.shippingAddress.detailAddress.message}</p>
        )}
      </div>

      <div className="sm:col-span-2">
        <textarea
          {...register('customerNote')}
          placeholder="Ghi chú đơn hàng (Tùy chọn)"
          rows={3}
          className="w-full rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53] resize-none"
        />
      </div>

      <button
        type="button"
        onClick={handleContinue}
        className="rounded-xl bg-[#1D1F20] py-3 text-sm font-bold text-white sm:col-span-2 transition-transform hover:scale-[1.01] active:scale-[0.99]"
      >
        Continue to payment
      </button>
    </div>
  );
}
