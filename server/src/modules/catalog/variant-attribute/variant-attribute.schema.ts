import { z } from 'zod'

// Định dạng cấu trúc thuộc tính đầu vào để sinh biến thể
export const attributeOptionSchema = z.object({
  name: z.string().min(1, 'Tên thuộc tính không được để trống'), // ví dụ: "Màu sắc", "Kích cỡ"
  options: z.array(z.string().min(1)).min(1, 'Mỗi thuộc tính phải có ít nhất 1 giá trị lựa chọn'), // ví dụ: ["Đỏ", "Xanh"]
})



/**
 * Thuật toán sinh tổ hợp Cartesian (Được kế thừa từ file mẫu NestJS)
 */
export function generateVariantCombinations(attributes: AttributeOptionInput[]): string[] {
  if (!attributes || attributes.length === 0) return []
  return attributes
    .map((attr) => attr.options)
    .reduce((acc, curr) => acc.flatMap((x) => curr.map((y) => (x ? `${x}-${y}` : y))), [''])
}

// Schema chi tiết cho từng SKU biến thể
export const upsertVariantItemSchema = z.object({
  id: z.number().int().positive().optional().nullable(), // ID hiện tại nếu là cập nhật
  sku: z.string().min(1, 'Mã SKU không được để trống'),
  originalPrice: z.coerce.number().positive('Giá gốc phải lớn hơn 0'),
  sellingPrice: z.coerce.number().positive('Giá bán phải lớn hơn 0'),
  stockQuantity: z.coerce.number().int().nonnegative('Số lượng tồn kho không được âm').default(0),
  weightGram: z.coerce.number().int().nonnegative().default(0),
  imageUrl: z.string().url().optional().nullable(),
  attributeValues: z.array(
    z.object({
      attributeName: z.string().min(1),
      value: z.string().min(1),
    }),
  ).optional(),
})

// Body DTO cho việc đồng bộ và cập nhật biến thể sản phẩm
export const syncProductVariantsBodySchema = z
  .object({
    productId: z.coerce.number().int().positive('productId phải là số nguyên dương'),
    attributes: z.array(attributeOptionSchema).min(1, 'Cần ít nhất 1 thuộc tính để tạo biến thể'),
    variants: z.array(upsertVariantItemSchema).min(1, 'Danh sách biến thể không được để trống'),
  })
  .superRefine(({ attributes, variants }, ctx) => {
    // 1. Kiểm tra tính toàn vẹn số lượng tổ hợp
    const combinations = generateVariantCombinations(attributes)
    if (variants.length !== combinations.length) {
      return ctx.addIssue({
        code: 'custom',
        path: ['variants'],
        message: `Số lượng biến thể không hợp lệ. Kỳ vọng chính xác ${combinations.length} biến thể dựa trên tổ hợp thuộc tính.`,
      })
    }

    // 2. Kiểm tra giá bán không được vượt quá giá gốc
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

export type AttributeOptionInput = z.infer<typeof attributeOptionSchema>
export type SyncProductVariantsBodyType = z.infer<typeof syncProductVariantsBodySchema>
export type UpsertVariantItemType = z.infer<typeof upsertVariantItemSchema>