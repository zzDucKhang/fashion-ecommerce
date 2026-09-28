import { z } from 'zod'

// Schema kiểm tra địa chỉ người nhận
const addressSchema = z.object({
  receiverName: z
    .string({ required_error: 'Vui lòng nhập tên người nhận' })
    .trim()
    .min(1, 'Tên người nhận không được để trống')
    .max(255, 'Tên người nhận quá dài'),
  receiverPhone: z
    .string({ required_error: 'Vui lòng nhập số điện thoại' })
    .trim()
    .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Số điện thoại không đúng định dạng Việt Nam'),
  province: z.string().trim().min(1, 'Vui lòng chọn Tỉnh/Thành phố').max(150),
  district: z.string().trim().min(1, 'Vui lòng chọn Quận/Huyện').max(150),
  ward: z.string().trim().min(1, 'Vui lòng chọn Phường/Xã').max(150),
  detailAddress: z.string().trim().min(1, 'Vui lòng nhập địa chỉ chi tiết').max(500),
})

// Các trạng thái đơn hàng hợp lệ
export const ORDER_STATUS = [
  'PENDING_PAYMENT',
  'CONFIRMED',
  'PROCESSING',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED',
  'RETURNED',
] as const

// 1. Schema Tạo đơn hàng (Checkout)
export const createOrderSchema = z
  .object({
    // Danh sách ID các sản phẩm trong giỏ muốn thanh toán (Nếu rỗng thì checkout toàn bộ giỏ)
    cartItemIds: z.array(z.coerce.number().int().positive()).min(1, 'Danh sách chọn thanh toán không hợp lệ').optional(),
    
    // Địa chỉ giao hàng (Chọn ID có sẵn HOẶC nhập địa chỉ mới)
    shippingAddressId: z.coerce.number().int().positive().optional(),
    shippingAddress: addressSchema.optional(),

    paymentMethod: z.enum(['COD', 'VNPAY', 'MOMO', 'BANK_TRANSFER'], {
      errorMap: () => ({ message: 'Phương thức thanh toán không hợp lệ' }),
    }),
    shippingMethod: z.string().trim().min(1).max(50).default('STANDARD'),
    customerNote: z.string().trim().max(5000, 'Ghi chú không được quá 5000 ký tự').optional(),
    voucherCode: z.string().trim().max(100).optional(),
    
    // LƯU Ý: Đã LOẠI BỎ shippingFee khỏi Schema để tránh việc Client tự gửi giá ship lên.
  })
  .refine((data) => data.shippingAddressId || data.shippingAddress, {
    message: 'Vui lòng chọn địa chỉ có sẵn hoặc nhập địa chỉ giao hàng mới',
    path: ['shippingAddress'], // Chỉ định hiển thị lỗi tại vị trí trường shippingAddress
  })

// 2. Schema Lấy danh sách đơn hàng (Đã BỔ SUNG lọc theo status)
export const listOrderSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  status: z.enum(ORDER_STATUS).optional(), // Bổ sung bộ lọc trạng thái đơn
})

// 3. Schema Cập nhật trạng thái đơn hàng (Dành cho Admin)
export const updateOrderStatusSchema = z.object({
  status: z.enum(ORDER_STATUS, {
    errorMap: () => ({ message: 'Trạng thái đơn hàng không hợp lệ' }),
  }),
})

// Infer các Types cho TypeScript
export type CreateOrderInput = z.infer<typeof createOrderSchema>
export type ListOrderInput = z.infer<typeof listOrderSchema>
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>