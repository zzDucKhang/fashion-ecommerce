import { Router } from 'express'
import { z } from 'zod'
import { VariantAttributeController } from './variant-attribute.controller'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import { requireAuth } from '@/middlewares/guards/auth.guard'
import { requireAdmin } from '@/middlewares/guards/role.guard'
import {
  syncProductVariantsBodySchema,
  variantIdParamSchema,
  getVariantsByProductParamSchema,
} from './variant-attribute.schema'

export const variantAttributeRouter = Router()
const controller = new VariantAttributeController()

variantAttributeRouter.get(
  '/products/:productId',
  validateRequest({ params: getVariantsByProductParamSchema }),
  controller.getByProduct,
)

variantAttributeRouter.get(
  '/:variantId',
  validateRequest({ params: variantIdParamSchema }),
  controller.getOne,
)

variantAttributeRouter.post(
  '/sync',
  requireAuth,
  requireAdmin,
  validateRequest({ body: syncProductVariantsBodySchema }),
  controller.syncVariants,
)

variantAttributeRouter.patch(
  '/:variantId/stock',
  requireAuth,
  requireAdmin,
  validateRequest({
    params: variantIdParamSchema,
    body: z.object({ quantityChange: z.coerce.number().int() }),
  }),
  controller.updateStock,
)