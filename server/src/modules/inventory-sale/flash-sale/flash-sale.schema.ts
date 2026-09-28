import { z } from 'zod'

export const flashSaleItemPayloadSchema = z.object({
    variantId: z
        .number()
        .int()
        .positive('variantId phải là số nguyên dương'),

    flashSalePrice: z
        .number()
        .positive('Giá flash sale phải lớn hơn 0'),

    promoQuantity: z
        .number()
        .int()
        .positive('Số lượng khuyến mãi phải lớn hơn 0'),
})

const flashSaleItemsSchema = z
    .array(flashSaleItemPayloadSchema)
    .min(1, 'Phải có ít nhất 1 sản phẩm trong Flash Sale')
    .refine(
        (items) => {
            const variantIds = items.map((item) => item.variantId)

            return new Set(variantIds).size === variantIds.length
        },
        {
            message: 'Không được có sản phẩm trùng trong Flash Sale',
        }
    )

export const getFlashSaleQuerySchema = z.object({
    page: z.coerce
        .number()
        .int()
        .positive()
        .default(1),

    limit: z.coerce
        .number()
        .int()
        .positive()
        .default(10),

    isActive: z
        .enum(['true', 'false'])
        .transform((value) => value === 'true')
        .optional(),
})

export const getFlashSaleParamsSchema = z.object({
    campaignId: z.coerce
        .number()
        .int()
        .positive('campaignId phải là số nguyên dương'),
})

export const createFlashSaleBodySchema = z
    .object({
        name: z
            .string()
            .min(1, 'Tên chiến dịch không được để trống')
            .max(255),

        bannerUrl: z
            .string()
            .max(1000)
            .optional(),

        startTime: z.coerce.date({
            required_error: 'Thời gian bắt đầu là bắt buộc',
        }),

        endTime: z.coerce.date({
            required_error: 'Thời gian kết thúc là bắt buộc',
        }),

        isActive: z
            .boolean()
            .optional()
            .default(true),

        items: flashSaleItemsSchema,
    })
    .refine(
        (data) => data.startTime < data.endTime,
        {
            message: 'Thời gian kết thúc phải sau thời gian bắt đầu',
            path: ['endTime'],
        }
    )

export const updateFlashSaleBodySchema = z
    .object({
        name: z
            .string()
            .min(1, 'Tên chiến dịch không được để trống')
            .max(255)
            .optional(),

        bannerUrl: z
            .string()
            .max(1000)
            .optional(),

        startTime: z.coerce
            .date()
            .optional(),

        endTime: z.coerce
            .date()
            .optional(),

        isActive: z
            .boolean()
            .optional(),

        items: flashSaleItemsSchema.optional(),
    })

export type FlashSaleItemPayloadType =
    z.infer<typeof flashSaleItemPayloadSchema>

export type GetFlashSaleQueryType =
    z.infer<typeof getFlashSaleQuerySchema>

export type GetFlashSaleParamsType =
    z.infer<typeof getFlashSaleParamsSchema>

export type CreateFlashSaleBodyType =
    z.infer<typeof createFlashSaleBodySchema>

export type UpdateFlashSaleBodyType =
    z.infer<typeof updateFlashSaleBodySchema>