import { z } from 'zod'

export const addressParamsSchema = z.object({
  addressId: z.coerce.number().int().positive('addressId phải là số nguyên dương'),
})

export const getAddressQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().optional(),
  userId: z.coerce.number().int().positive().optional(),
})

export const getAddressByUserIdQuerySchema = z.object({
  userId: z.coerce.number().int().positive('userId phải là số nguyên dương'),
})

export const createAddressBodySchema = z.object({
  receiverName: z.string().trim().min(1, 'Tên người nhận là bắt buộc').max(255),
    phoneNumber: z.string().trim().min(1, 'Số điện thoại là bắt buộc').max(50),
  province: z.string().trim().min(1, 'Tỉnh/Thành phố là bắt buộc').max(150),
  district: z.string().trim().min(1, 'Quận/Huyện là bắt buộc').max(150),
  ward: z.string().trim().min(1, 'Phường/Xã là bắt buộc').max(150),
  detailAddress: z.string().trim().min(1, 'Địa chỉ là bắt buộc').max(500),
    isDefault: z.boolean().optional(),
})

export const updateAddressBodySchema = z.object({
    receiverName: z.string().trim().min(1, 'Tên người nhận là bắt buộc').max(100).optional(),
    phoneNumber: z.string().trim().min(1, 'Số điện thoại là bắt buộc').max(50).optional(),
    province: z.string().trim().min(1, 'Tỉnh/Thành phố là bắt buộc').max(100).optional(),
    district: z.string().trim().min(1, 'Quận/Huyện là bắt buộc').max(100).optional(),
    ward: z.string().trim().min(1, 'Phường/Xã là bắt buộc').max(100).optional(),
    detailAddress: z.string().trim().min(1, 'Địa chỉ là bắt buộc').max(255).optional(),
    isDefault: z.boolean().optional(),
})

export type AddressParamsType = z.infer<typeof addressParamsSchema>
export type GetAddressQueryType = z.infer<typeof getAddressQuerySchema>
export type GetAddressByUserIdQueryType = z.infer<typeof getAddressByUserIdQuerySchema>
export type CreateAddressBodyType = z.infer<typeof createAddressBodySchema>
export type UpdateAddressBodyType = z.infer<typeof updateAddressBodySchema>
