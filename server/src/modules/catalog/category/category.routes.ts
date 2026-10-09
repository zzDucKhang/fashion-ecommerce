import { Router } from 'express'
import { z } from 'zod'
import { CategoryController } from './category.controller'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import { requireAuth } from '@/middlewares/guards/auth.guard'
import { requireAdmin } from '@/middlewares/guards/role.guard'
import {
  getAllCategoriesQuerySchema,
  getCategoryParamsSchema,
  createCategoryBodySchema,
  updateCategoryBodySchema,

} from './category.schema'

export const categoryRouter = Router()
const controller = new CategoryController()

categoryRouter.get('/', validateRequest({ query: getAllCategoriesQuerySchema }), controller.findAll)
categoryRouter.get('/:categoryId', validateRequest({ params: getCategoryParamsSchema }), controller.findById)

categoryRouter.post(
  '/',
  requireAuth,
  requireAdmin,
  validateRequest({ body: createCategoryBodySchema }),
  controller.create,
)

categoryRouter.put(
  '/:categoryId',
  requireAuth,
  requireAdmin,
  validateRequest({ params: getCategoryParamsSchema, body: updateCategoryBodySchema }),
  controller.update,
)

categoryRouter.delete(
  '/:categoryId',
  requireAuth,
  requireAdmin,
  validateRequest({ params: getCategoryParamsSchema }),
  controller.delete,
)

