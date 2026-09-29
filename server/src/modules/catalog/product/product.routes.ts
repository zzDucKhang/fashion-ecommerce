import { Router } from 'express'
import { z } from 'zod'
import { ProductController } from './product.controller'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import { requireAuth } from '@/middlewares/guards/auth.guard'
import { requireAdmin } from '@/middlewares/guards/role.guard'
import {
  productParamsSchema,
  getProductQuerySchema,
  createProductBodySchema,
  updateProductBodySchema,
  upsertProductTranslationSchema,
} from './product.schema'

export const productRouter = Router()
const controller = new ProductController()

// Public routes
productRouter.get('/', validateRequest({ query: getProductQuerySchema }), controller.list)
productRouter.get('/:productId', validateRequest({ params: productParamsSchema }), controller.findById)

// Protected routes (Admin / Quản trị viên)
productRouter.post(
  '/',
  requireAuth,
  requireAdmin,
  validateRequest({ body: createProductBodySchema }),
  controller.create,
)

productRouter.put(
  '/:productId',
  requireAuth,
  requireAdmin,
  validateRequest({ params: productParamsSchema, body: updateProductBodySchema }),
  controller.update,
)

productRouter.delete(
  '/:productId',
  requireAuth,
  requireAdmin,
  validateRequest({ params: productParamsSchema }),
  controller.delete,
)

productRouter.put(
  '/:productId/translations/:languageId',
  requireAuth,
  requireAdmin,
  validateRequest({
    params: productParamsSchema.extend({ languageId: z.string().min(2) }),
    body: upsertProductTranslationSchema,
  }),
  controller.upsertTranslation,
)