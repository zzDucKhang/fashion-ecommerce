import { useMutation } from '@tanstack/react-query';
import { orderApi } from '@/api/order.api';
import { CreateOrderPayload } from '@/types';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { CART_QUERY_KEYS } from '../cart/hooks/use-cart';

export const useCreateOrder = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateOrderPayload) => orderApi.createOrder(payload),
    onSuccess: (response) => {
      toast.success('Đặt hàng thành công!');
      // Clear cart cache since order is placed
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.cart });
      
      // Redirect based on payment method or to success page
      const orderData = response.data;
      if (orderData?.id) {
        // Mock redirection to an order confirmation page or list
        router.push(`/account/orders/${orderData.id}`);
      } else {
        router.push('/account/orders');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Có lỗi xảy ra khi đặt hàng');
    },
  });
};
