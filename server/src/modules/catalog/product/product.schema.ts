import { z } from 'zod'

export const productParamsSchema = z.object({
  productId: z.coerce.number().int().positive('productId phải là số nguyên dương'),
})

export const getProductQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(10),
  search: z.string().optional(),
  categoryId: z.coerce.number().int().positive().optional(),
  brandId: z.coerce.number().int().positive().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'OUT_OF_STOCK', 'ARCHIVED']).optional(),
  lang: z.string().optional().default('vi'),
})

export const createProductBodySchema = z.object({
  defaultName: z.string().min(1, 'Tên sản phẩm không được để trống').max(255),
  thumbnailUrl: z.string().url('Thumbnail URL không hợp lệ').optional().nullable(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'OUT_OF_STOCK', 'ARCHIVED']).default('DRAFT'),
  categoryId: z.number().int().positive('Danh mục là bắt buộc'),
  brandId: z.number().int().positive().optional().nullable(),
  images: z.array(z.string().url()).optional(),
  tagIds: z.array(z.number().int().positive()).optional(),
  translations: z
    .array(
      z.object({
        languageId: z.string().min(2),
        name: z.string().min(1),
        shortDesc: z.string().optional(),
        detailDesc: z.string().optional(),
      }),
    )
    .optional(),
})

export const updateProductBodySchema = createProductBodySchema.partial()

export const upsertProductTranslationSchema = z.object({
  name: z.string().min(1, 'Tên bản dịch không được để trống').max(255),
  shortDesc: z.string().optional(),
  detailDesc: z.string().optional(),
})

export type ProductParamsType = z.infer<typeof productParamsSchema>
export type GetProductQueryType = z.infer<typeof getProductQuerySchema>
export type CreateProductBodyType = z.infer<typeof createProductBodySchema>
export type UpdateProductBodyType = z.infer<typeof updateProductBodySchema>
export type UpsertProductTranslationType = z.infer<typeof upsertProductTranslationSchema>