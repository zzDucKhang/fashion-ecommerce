'use client';

import Link from 'next/link';
import { ArrowLeft, Check, Lock } from 'lucide-react';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutSchema, CheckoutFormValues } from '../schemas';
import { useCart } from '@/modules/cart/hooks/use-cart';
import { useCreateOrder } from '@/modules/order/hooks/use-orders';
import { ShippingForm } from './shipping-form';
import { PaymentMethodComponent } from './payment-method';

export function CheckoutView() {
  const [step, setStep] = useState(1);
  const { data: cartResponse } = useCart();
  const createOrderMutation = useCreateOrder();

  const methods = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      shippingMethod: 'STANDARD',
      paymentMethod: 'COD',
    },
    mode: 'onTouched', // Validate as user interacts
  });

  const cartItems = cartResponse?.data?.cartItems || [];
  
  // Tính tổng tiền giỏ hàng hiện tại (chưa tính phí ship - có thể tính sau)
  const totalAmount = cartItems.reduce((sum, item) => {
    const price = Number(item.variant.sellingPrice || item.variant.originalPrice || 0);
    return sum + price * item.quantity;
  }, 0);

  const onSubmit = (data: CheckoutFormValues) => {
    createOrderMutation.mutate({
      shippingAddress: data.shippingAddress,
      paymentMethod: data.paymentMethod,
      shippingMethod: data.shippingMethod,
      customerNote: data.customerNote,
      voucherCode: data.voucherCode,
      pointUsed: data.pointUsed,
    });
  };

  if (cartItems.length === 0) {
    return (
      <main className="mx-auto max-w-[1180px] px-4 py-20 sm:px-8 text-center">
        <h1 className="font-display text-3xl mb-4">Your bag is empty</h1>
        <Link href="/shop" className="text-[#84EA53] underline">Go shopping</Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1180px] px-4 py-10 sm:px-8 lg:py-16">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="eyebrow">Almost yours</p>
          <h1 className="section-title mt-2">Checkout</h1>
        </div>
        <Link
          href="/cart"
          className="flex items-center gap-1 text-xs text-[#74736e]"
        >
          <ArrowLeft size={14} /> Back to bag
        </Link>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            {/* Step 1: Shipping */}
            <section
              className={`rounded-2xl bg-white p-6 transition-all ${step === 1 ? 'ring-1 ring-[#84EA53]' : ''}`}
            >
              <div className="flex items-center justify-between cursor-pointer" onClick={() => setStep(1)}>
                <h2 className="font-display text-3xl">01 · Shipping</h2>
                {step > 1 && <Check size={18} color="#61bc39" />}
              </div>
              {step === 1 && <ShippingForm onNext={() => setStep(2)} />}
            </section>

            {/* Step 2: Payment */}
            <section
              className={`rounded-2xl bg-white p-6 transition-all ${step === 2 ? 'ring-1 ring-[#84EA53]' : 'opacity-60 pointer-events-none'}`}
            >
              <h2 className="font-display text-3xl">02 · Payment</h2>
              {step === 2 && (
                <PaymentMethodComponent 
                  isSubmitting={createOrderMutation.isPending} 
                  totalAmount={totalAmount} 
                />
              )}
            </section>
          </div>

          {/* Order Summary Sidebar */}
          <aside className="h-fit rounded-2xl bg-[#1D1F20] p-6 text-white lg:sticky lg:top-36">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Lock size={15} color="#84EA53" /> Secure checkout
            </div>
            
            <div className="mt-6 divide-y divide-white/10">
              {cartItems.map((item) => (
                <div key={item.id} className="py-3 flex justify-between text-sm">
                  <span className="text-white/70 line-clamp-1 w-2/3">
                    {item.quantity}x {item.variant.product.defaultName}
                  </span>
                  <span>
                    ${(Number(item.variant.sellingPrice || 0) * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between border-t border-white/15 pt-5 text-sm">
              <span className="text-white/55">Total</span>
              <strong className="text-lg text-[#84EA53]">${totalAmount.toLocaleString()}</strong>
            </div>
          </aside>
        </form>
      </FormProvider>
    </main>
  );
}
