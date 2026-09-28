import { z } from 'zod'

export const userParamsSchema = z.object({
    userId: z.coerce.number().int().positive('userId phải là số nguyên dương'),
})

export const getUserQuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().default(10),
    search: z.string().optional(),
    status: z.enum(['ACTIVE', 'INACTIVE', 'BLOCKED']).optional(),
    roleId: z.coerce.number().int().positive().optional(),
})

export const updateUserBodySchema = z.object({
    fullName: z.string().trim().min(1).max(100).optional(),
    phoneNumber: z.string().trim().min(1, 'Số điện thoại là bắt buộc').max(50).optional(),
    avatarUrl: z.string().url('Avatar không hợp lệ').optional().nullable(),
})

export const updateUserStatusBodySchema = z.object({
    status: z.enum(['ACTIVE', 'INACTIVE', 'BLOCKED']),
})      

export type UserParamsType = z.infer<typeof userParamsSchema>
export type GetUserQueryType = z.infer<typeof getUserQuerySchema>
export type UpdateUserBodyType = z.infer<typeof updateUserBodySchema>
export type UpdateUserStatusBodyType = z.infer<typeof updateUserStatusBodySchema>