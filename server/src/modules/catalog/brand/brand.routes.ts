import { Router } from 'express'
import { z } from 'zod'
import { BrandController } from './brand.controller'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import { requireAuth } from '@/middlewares/guards/auth.guard'
import { requireAdmin } from '@/middlewares/guards/role.guard'
import {
  getBrandQuerySchema,
  getBrandParamsSchema,
  createBrandBodySchema,
  updateBrandBodySchema,
  upsertBrandTranslationSchema,
} from './brand.schema'

export const brandRouter = Router()
const controller = new BrandController()

brandRouter.get('/', validateRequest({ query: getBrandQuerySchema }), controller.list)
brandRouter.get('/:brandId', validateRequest({ params: getBrandParamsSchema }), controller.findById)

brandRouter.post(
  '/',
  requireAuth,
  requireAdmin,
  validateRequest({ body: createBrandBodySchema }),
  controller.create,
)

brandRouter.put(
  '/:brandId',
  requireAuth,
  requireAdmin,
  validateRequest({ params: getBrandParamsSchema, body: updateBrandBodySchema }),
  controller.update,
)

brandRouter.delete(
  '/:brandId',
  requireAuth,
  requireAdmin,
  validateRequest({ params: getBrandParamsSchema }),
  controller.delete,
)

brandRouter.put(
  '/:brandId/translations/:languageId',
  requireAuth,
  requireAdmin,
  validateRequest({
    params: getBrandParamsSchema.extend({ languageId: z.string().min(2) }),
    body: upsertBrandTranslationSchema,
  }),
  controller.upsertTranslation,
)