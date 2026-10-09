import { z } from 'zod'

export const upsertVariantItemSchema = z.object({
  id: z.number().int().positive().optional().nullable(),
  sku: z.string().min(1, 'Mã SKU không được để trống'),
  originalPrice: z.coerce.number().positive('Giá gốc phải lớn hơn 0'),
  sellingPrice: z.coerce.number().positive('Giá bán phải lớn hơn 0'),
  stockQuantity: z.coerce.number().int().nonnegative('Số lượng tồn kho không được âm').default(0),
  weightGram: z.coerce.number().int().nonnegative().default(0),
  imageUrl: z.string().url().optional().nullable(),
  variant: z.string().max(100).optional().nullable(),
  variantValue: z.string().max(150).optional().nullable(),
})

export const syncProductVariantsBodySchema = z
  .object({
    productId: z.coerce.number().int().positive('productId phải là số nguyên dương'),
    variants: z.array(upsertVariantItemSchema).min(1, 'Danh sách biến thể không được để trống'),
  })
  .superRefine(({ variants }, ctx) => {
    variants.forEach((v, index) => {
      if (v.sellingPrice > v.originalPrice) {
        ctx.addIssue({
          code: 'custom',
          path: ['variants', index, 'sellingPrice'],
          message: `Giá bán (${v.sellingPrice}) không được lớn hơn giá gốc (${v.originalPrice})`,
        })
      }
    })
  })

export const variantIdParamSchema = z.object({
  variantId: z.coerce.number().int().positive(),
})

export const getVariantsByProductParamSchema = z.object({
  productId: z.coerce.number().int().positive(),
})

export type SyncProductVariantsBodyType = z.infer<typeof syncProductVariantsBodySchema>
export type UpsertVariantItemType = z.infer<typeof upsertVariantItemSchema>