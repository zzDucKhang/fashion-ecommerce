import { z } from 'zod'

export const createTagSchema = z.object({
  name: z.string().min(1, 'Tên tag không được để trống'),
})

export const updateTagSchema = createTagSchema

export type CreateTagInput = z.infer<typeof createTagSchema>
export type UpdateTagInput = z.infer<typeof updateTagSchema>