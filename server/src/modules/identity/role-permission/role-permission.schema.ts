import { z } from 'zod'

export const roleParamsSchema = z.object({
  roleId: z.coerce.number().int().positive('roleId phải là số nguyên dương'),
})

export const getRolePermissionQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().trim().optional(),
})

export const createRoleBodySchema = z.object({
  name: z.string().trim().min(1, 'Tên vai trò không được để trống').max(100),
  code: z
    .string()
    .trim()
    .min(1, 'Mã vai trò không được để trống')
    .max(50)
    .toUpperCase(),
  permissionIds: z.array(z.number().int().positive()).max(100).optional().default([]),
})

export const updateRoleBodySchema = z.object({
  name: z.string().trim().min(1).max(100).optional(),
  isActive: z.boolean().optional(),
  permissionIds: z.array(z.number().int().positive()).max(100).optional(),
})

export const createPermissionBodySchema = z.object({
  code: z.string().trim().min(1).max(150).toUpperCase(),
  module: z.string().trim().min(1).max(100),
  description: z.string().trim().max(1000).nullable().optional(),
})

export const updatePermissionBodySchema = z.object({
  module: z.string().trim().min(1).max(100).optional(),
  description: z.string().trim().max(1000).nullable().optional(),
})

export const permissionParamsSchema = z.object({
  permissionId: z.coerce.number().int().positive('permissionId phải là số nguyên dương'),
})

export const getPermissionQuerySchema = z.object({
  page: z.coerce.number().int().positive().max(100).default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().trim().optional(),
  module: z.string().trim().optional(),
})

export type RoleParamsType = z.infer<typeof roleParamsSchema>
export type CreateRoleBodyType = z.infer<typeof createRoleBodySchema>
export type UpdateRoleBodyType = z.infer<typeof updateRoleBodySchema>
export type GetRolePermissionQueryType = z.infer<typeof getRolePermissionQuerySchema>
export type CreatePermissionBodyType = z.infer<typeof createPermissionBodySchema>
export type UpdatePermissionBodyType = z.infer<typeof updatePermissionBodySchema>
export type PermissionParamsType = z.infer<typeof permissionParamsSchema>
export type GetPermissionQueryType = z.infer<typeof getPermissionQuerySchema>
