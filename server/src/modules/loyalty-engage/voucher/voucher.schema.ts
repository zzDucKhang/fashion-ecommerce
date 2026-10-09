import { z } from 'zod'

const voucherBaseSchema = z.object({
  code: z
    .string()
    .trim()
    .min(3, 'Mã voucher tối thiểu 3 ký tự')
    .max(100, 'Mã voucher tối đa 100 ký tự')
    .toUpperCase(),
  discountType: z.enum(['PERCENTAGE', 'FIXED_AMOUNT'], {
    errorMap: () => ({ message: 'discountType phải là PERCENTAGE hoặc FIXED_AMOUNT' }),
  }),
  discountValue: z.number().positive('Giá trị giảm phải lớn hơn 0'),
  minOrderValue: z.number().min(0, 'Giá trị đơn tối thiểu không được âm').default(0),
  maxDiscountAmt: z.number().positive('Giảm tối đa phải lớn hơn 0').optional(),
  totalUsageLimit: z.number().int().min(0).default(0),
  userUsageLimit: z.number().int().min(1).default(1),
  startDate: z.string().datetime({ message: 'startDate phải đúng định dạng ISO 8601' }),
  endDate: z.string().datetime({ message: 'endDate phải đúng định dạng ISO 8601' }),
  isActive: z.boolean().default(true),
})

export const createVoucherBodySchema = voucherBaseSchema
  .refine(
    (data) => new Date(data.endDate) > new Date(data.startDate),
    { message: 'endDate phải sau startDate', path: ['endDate'] },
  )
  .refine(
    (data) => data.discountType !== 'PERCENTAGE' || (data.discountValue > 0 && data.discountValue <= 100),
    { message: 'Phần trăm giảm phải từ 1 đến 100', path: ['discountValue'] },
  )

export const updateVoucherBodySchema = voucherBaseSchema
  .partial()
  .refine(
    (data) => {
      if (data.endDate && data.startDate) {
        return new Date(data.endDate) > new Date(data.startDate)
      }
      return true
    },
    { message: 'endDate phải sau startDate', path: ['endDate'] },
  )
  .refine(
    (data) =>
      data.discountType !== 'PERCENTAGE' ||
      data.discountValue === undefined ||
      (data.discountValue > 0 && data.discountValue <= 100),
    { message: 'Phần trăm giảm phải từ 1 đến 100', path: ['discountValue'] },
  )

export const voucherIdParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, 'id phải là số nguyên dương')
    .transform(Number),
})

export const validateVoucherBodySchema = z.object({
  code: z.string().trim().min(1, 'Mã voucher là bắt buộc').toUpperCase(),
  orderTotal: z.number().positive('Tổng tiền đơn hàng phải lớn hơn 0'),
})

export const listVoucherQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((v) => (v ? parseInt(v, 10) : 1))
    .pipe(z.number().int().min(1)),
  limit: z
    .string()
    .optional()
    .transform((v) => (v ? parseInt(v, 10) : 10))
    .pipe(z.number().int().min(1).max(100)),
  isActive: z
    .string()
    .optional()
    .transform((v): boolean | undefined => {
      if (v === 'true') return true
      if (v === 'false') return false
      return undefined
    }),
})

export type CreateVoucherBodyType = z.infer<typeof createVoucherBodySchema>
export type UpdateVoucherBodyType = z.infer<typeof updateVoucherBodySchema>
export type VoucherIdParamType = z.infer<typeof voucherIdParamSchema>
export type ValidateVoucherBodyType = z.infer<typeof validateVoucherBodySchema>
export type ListVoucherQueryType = z.infer<typeof listVoucherQuerySchema>
