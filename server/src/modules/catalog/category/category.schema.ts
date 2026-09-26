import { z } from 'zod'

export const getAllCategoriesQuerySchema = z.object({
  parentCategoryId: z.coerce.number().int().positive().optional(),
  lang: z.string().optional().default('vi'),
})

export const getCategoryParamsSchema = z.object({
  categoryId: z.coerce.number().int().positive('categoryId phải là số nguyên dương'),
})

export const createCategoryBodySchema = z.object({
  defaultName: z.string().min(1, 'Tên danh mục không được để trống').max(500),
  logo: z.string().max(1000).optional().nullable(),
  parentCategoryId: z.coerce.number().int().positive().optional().nullable(),
})

export const updateCategoryBodySchema = createCategoryBodySchema.partial()

export const upsertCategoryTranslationSchema = z.object({
  name: z.string().min(1, 'Tên bản dịch không được để trống').max(500),
  description: z.string().optional(),
})

export type GetAllCategoriesQueryType = z.infer<typeof getAllCategoriesQuerySchema>
export type CreateCategoryBodyType = z.infer<typeof createCategoryBodySchema>
export type UpdateCategoryBodyType = z.infer<typeof updateCategoryBodySchema>
export type UpsertCategoryTranslationType = z.infer<typeof upsertCategoryTranslationSchema>