import { z } from 'zod'

export const tagParamsSchema = z.object({
  tagId: z.coerce.number().int().positive('tagId phải là số nguyên dương'),
})

export const getTagQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(20),
  search: z.string().optional(),
})

export const createTagBodySchema = z.object({
  name: z.string().min(1, 'Tên tag không được để trống').max(100),
})

export const updateTagBodySchema = createTagBodySchema

export type TagParamsType = z.infer<typeof tagParamsSchema>
export type GetTagQueryType = z.infer<typeof getTagQuerySchema>
export type CreateTagBodyType = z.infer<typeof createTagBodySchema>
export type UpdateTagBodyType = z.infer<typeof updateTagBodySchema>