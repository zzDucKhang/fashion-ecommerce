import { z } from 'zod'

export const languageParamsSchema = z.object({
  languageId: z.string().max(10, 'Mã ngôn ngữ tối đa 10 ký tự'),
})

export const createLanguageBodySchema = z.object({
  id: z.string().min(2).max(10),
  name: z.string().min(1).max(500),
})

export const updateLanguageBodySchema = z.object({
  name: z.string().min(1).max(500),
})

export type CreateLanguageBodyType = z.infer<typeof createLanguageBodySchema>
export type UpdateLanguageBodyType = z.infer<typeof updateLanguageBodySchema>