import { Router } from 'express'
import { ProductController } from './product.controller'
import { validateRequest } from "@/middlewares/pipes/validate.pipe";
import {
  productParamsSchema,
  getProductQuerySchema,
  createProductBodySchema,
  updateProductBodySchema,
  upsertProductTranslationSchema,
} from './product.schema'
import { z } from 'zod'

export const productRouter = Router()
const controller = new ProductController()

productRouter.get('/', validateRequest({ query: getProductQuerySchema }), controller.list)
productRouter.get('/:productId', validateRequest({ params: productParamsSchema }), controller.findById)
productRouter.post('/', validateRequest({ body: createProductBodySchema }), controller.create)
productRouter.put(
  '/:productId',
  validateRequest({ params: productParamsSchema, body: updateProductBodySchema }),
  controller.update,
)
productRouter.delete('/:productId', validateRequest({ params: productParamsSchema }), controller.delete)

productRouter.put(
  '/:productId/translations/:languageId',
  validateRequest({
    params: productParamsSchema.extend({ languageId: z.string().min(2) }),
    body: upsertProductTranslationSchema,
  }),
  controller.upsertTranslation,
)