import { z } from 'zod'

// 1. Schema xác thực chủ sở hữu giỏ hàng
export const cartOwnerSchema = z.object({
  sessionId: z
    .string({ invalid_type_error: 'Session ID phải là chuỗi ký tự' })
    .trim()
    .min(1, 'Session ID không được để trống')
    .max(255, 'Session ID quá dài')
    .optional(),
})

// 2. Schema thêm sản phẩm vào giỏ hàng
export const addCartItemSchema = z.object({
  variantId: z.coerce
    .number({ invalid_type_error: 'Mã biến thể sản phẩm phải là số' })
    .int('Mã biến thể phải là số nguyên')
    .positive('Mã biến thể sản phẩm không hợp lệ'),
  quantity: z.coerce
    .number({ invalid_type_error: 'Số lượng phải là số' })
    .int('Số lượng phải là số nguyên')
    .positive('Số lượng thêm vào phải lớn hơn 0')
    .max(999, 'Số lượng tối đa cho mỗi sản phẩm là 999'),
})

// 3. Schema cập nhật số lượng sản phẩm trong giỏ
export const updateCartItemSchema = z.object({
  quantity: z.coerce
    .number({ invalid_type_error: 'Số lượng phải là số' })
    .int('Số lượng phải là số nguyên')
    .min(0, 'Số lượng không được nhỏ hơn 0')
    .max(999, 'Số lượng tối đa cho mỗi sản phẩm là 999'),
})

// 4. BỔ SUNG: Schema Tạo đơn hàng (Checkout / Create Order)
export const createOrderSchema = z.object({
  customerName: z
    .string({ required_error: 'Vui lòng nhập họ tên người nhận' })
    .trim()
    .min(2, 'Họ tên phải có ít nhất 2 ký tự')
    .max(100, 'Họ tên không được vượt quá 100 ký tự'),
  customerPhone: z
    .string({ required_error: 'Vui lòng nhập số điện thoại' })
    .trim()
    .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Số điện thoại không đúng định dạng Việt Nam'),
  customerEmail: z
    .string()
    .trim()
    .email('Email không đúng định dạng')
    .optional()
    .or(z.literal('')),
  shippingAddress: z
    .string({ required_error: 'Vui lòng nhập địa chỉ giao hàng' })
    .trim()
    .min(5, 'Địa chỉ giao hàng quá ngắn')
    .max(500, 'Địa chỉ không được vượt quá 500 ký tự'),
  note: z.string().trim().max(1000, 'Ghi chú tối đa 1000 ký tự').optional(),
  paymentMethod: z.enum(['COD', 'BANK_TRANSFER', 'MOMO', 'VNPAY'], {
    errorMap: () => ({ message: 'Phương thức thanh toán không hợp lệ' }),
  }),
})

// Infer các Type cho TypeScript
export type CartOwner = z.infer<typeof cartOwnerSchema>
export type AddCartItemInput = z.infer<typeof addCartItemSchema>
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>
export type CreateOrderInput = z.infer<typeof createOrderSchema>