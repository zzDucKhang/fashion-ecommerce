'use client';
import Link from 'next/link';
import { ArrowLeft, Check, Lock } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api/v1';
export function CheckoutView() {
  const [step, setStep] = useState(1);
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCheckout = async () => {
    setLoading(true); setError(null);
    try {
      const mockOrderPayload = { cartItemIds: [1], shippingAddressId: 1, paymentMethod: 'BANK_TRANSFER', shippingMethod: 'STANDARD' };
      const orderResponse = await fetch(`${API_URL}/cart-order/orders`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify(mockOrderPayload) });
      const orderJson = await orderResponse.json(); if (!orderResponse.ok) throw new Error(orderJson.message ?? 'Could not create order');
      const paymentResponse = await fetch(`${API_URL}/fulfillment/payments`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ orderId: orderJson.data.id }) });
      const paymentJson = await paymentResponse.json(); if (!paymentResponse.ok) throw new Error(paymentJson.message ?? 'Could not create payment');
      setQrUrl(paymentJson.data.qrUrl); setStep(3);
    } catch (err) { setError(err instanceof Error ? err.message : 'Checkout failed'); } finally { setLoading(false); }
  };
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
      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <section
            className={`rounded-2xl bg-white p-6 ${step === 1 ? 'ring-1 ring-[#84EA53]' : ''}`}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-3xl">01 · Shipping</h2>
              {step > 1 && <Check size={18} color="#61bc39" />}
            </div>
            {step === 1 && (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <input
                  placeholder="First name"
                  className="rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
                />
                <input
                  placeholder="Last name"
                  className="rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
                />
                <input
                  placeholder="Address"
                  className="rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53] sm:col-span-2"
                />
                <input
                  placeholder="City"
                  className="rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
                />
                <input
                  placeholder="Postal code"
                  className="rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
                />
                <button
                  onClick={() => setStep(2)}
                  className="rounded-xl bg-[#1D1F20] py-3 text-sm font-bold text-white sm:col-span-2"
                >
                  Continue to payment
                </button>
              </div>
            )}
          </section>
          <section
            className={`rounded-2xl bg-white p-6 ${step === 2 ? 'ring-1 ring-[#84EA53]' : 'opacity-60'}`}
          >
            <h2 className="font-display text-3xl">02 · Payment</h2>
            {step === 2 && (
              <div className="mt-6 space-y-4">
                <input
                  placeholder="Card number"
                  className="w-full rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    placeholder="MM / YY"
                    className="rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
                  />
                  <input
                    placeholder="CVC"
                    className="rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
                  />
                </div>
                <button
                  onClick={startCheckout}
                  disabled={loading}
                  className="w-full rounded-xl bg-[#84EA53] py-3.5 text-sm font-bold"
                >
                  {loading ? 'Creating secure payment…' : 'Place order'}
                </button>
                {error && <p className="text-sm text-red-600">{error}</p>}
                {qrUrl && <div className="mt-4 rounded-xl bg-[#f7f5f0] p-4 text-center"><p className="mb-3 text-sm">Scan to pay with your banking app</p><Image src={qrUrl} alt="Payment QR code" width={280} height={280} className="mx-auto" unoptimized /></div>}
              </div>
            )}
          </section>
        </div>
        <aside className="h-fit rounded-2xl bg-[#1D1F20] p-6 text-white lg:sticky lg:top-36">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Lock size={15} color="#84EA53" /> Secure checkout
          </div>
          <p className="mt-6 text-xs leading-5 text-white/55">
            Your payment details are encrypted and never stored. This is a demo
            checkout with no backend connection.
          </p>
          <div className="mt-8 flex justify-between border-t border-white/15 pt-5 text-sm">
            <span className="text-white/55">Total</span>
            <strong>$260.00</strong>
          </div>
        </aside>
      </div>
    </main>
  );
}
