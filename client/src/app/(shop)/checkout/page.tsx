import { Metadata } from 'next';
import { CheckoutView } from '@/modules/checkout/components/checkout-view';

export const metadata: Metadata = {
  title: 'Thanh toán đơn hàng — Fashion Store',
  description: 'Xác nhận thông tin giao nhận và thanh toán đơn hàng an toàn.',
};

export default function CheckoutPage() {
  return <CheckoutView />;
}