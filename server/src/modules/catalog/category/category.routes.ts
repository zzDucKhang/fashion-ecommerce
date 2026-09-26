import { Router } from 'express'
import { CategoryController } from './category.controller'
import { validateRequest } from "@/middlewares/pipes/validate.pipe";
import {
  getAllCategoriesQuerySchema,
  getCategoryParamsSchema,
  createCategoryBodySchema,
  updateCategoryBodySchema,
  upsertCategoryTranslationSchema,
} from './category.schema'
import { z } from 'zod'

export const categoryRouter = Router()
const controller = new CategoryController()

categoryRouter.get('/', validateRequest({ query: getAllCategoriesQuerySchema }), controller.findAll)
categoryRouter.get('/:categoryId', validateRequest({ params: getCategoryParamsSchema }), controller.findById)
categoryRouter.post('/', validateRequest({ body: createCategoryBodySchema }), controller.create)
categoryRouter.put(
  '/:categoryId',
  validateRequest({ params: getCategoryParamsSchema, body: updateCategoryBodySchema }),
  controller.update,
)
categoryRouter.delete('/:categoryId', validateRequest({ params: getCategoryParamsSchema }), controller.delete)

categoryRouter.put(
  '/:categoryId/translations/:languageId',
  validateRequest({
    params: getCategoryParamsSchema.extend({ languageId: z.string().min(2) }),
    body: upsertCategoryTranslationSchema,
  }),
  controller.upsertTranslation,
)