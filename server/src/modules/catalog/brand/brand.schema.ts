import { z } from 'zod'

export const brandSchema = z.object({
  id: z.number(),
  name: z.string().max(500),
  logo: z.string().max(1000),
  createdById: z.number().nullable(),
  updatedById: z.number().nullable(),
  deletedById: z.number().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
})

export const brandTranslationSchema = z.object({
  id: z.number(),
  brandId: z.number(),
  languageId: z.string().max(10),
  name: z.string().max(500),
  description: z.string().nullable().optional(),
  createdById: z.number().nullable(),
  updatedById: z.number().nullable(),
  deletedById: z.number().nullable(),
})

// Query phân trang & ngôn ngữ chuẩn từ project gốc
export const getBrandQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(10),
  lang: z.string().optional().default('all'),
})

export const getBrandParamsSchema = z.object({
  brandId: z.coerce.number().int().positive('brandId phải là số nguyên dương'),
})

export const createBrandBodySchema = z.object({
  defaultName: z.string().min(1, 'Tên thương hiệu không được để trống').max(500),
  logo: z.string().min(1, 'Logo URL không được để trống').max(1000).optional()
})

export const updateBrandBodySchema = createBrandBodySchema.partial()

// Schema cập nhật Translation
export const upsertBrandTranslationSchema = z.object({
  name: z.string().min(1, 'Tên bản dịch không được để trống').max(500),
  description: z.string().optional(),
})

export type BrandType = z.infer<typeof brandSchema>
export type GetBrandQueryType = z.infer<typeof getBrandQuerySchema>
export type CreateBrandBodyType = z.infer<typeof createBrandBodySchema>
export type UpdateBrandBodyType = z.infer<typeof updateBrandBodySchema>
export type UpsertBrandTranslationType = z.infer<typeof upsertBrandTranslationSchema>