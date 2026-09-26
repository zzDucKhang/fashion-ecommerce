import { Router } from 'express'
import { VariantAttributeController } from './variant-attribute.controller'
import { validateRequest } from "@/middlewares/pipes/validate.pipe";
import {
  syncProductVariantsBodySchema,
  variantIdParamSchema,
  getVariantsByProductParamSchema,
} from './variant-attribute.schema'
import { z } from 'zod'

export const variantAttributeRouter = Router()
const controller = new VariantAttributeController()

// GET /api/v1/catalog/variants/products/:productId -> Lấy danh sách variant theo Product
variantAttributeRouter.get(
  '/products/:productId',
  validateRequest({ params: getVariantsByProductParamSchema }),
  controller.getByProduct,
)

// GET /api/v1/catalog/variants/:variantId -> Lấy chi tiết 1 variant
variantAttributeRouter.get(
  '/:variantId',
  validateRequest({ params: variantIdParamSchema }),
  controller.getOne,
)

// POST /api/v1/catalog/variants/sync -> Đồng bộ ma trận biến thể
variantAttributeRouter.post(
  '/sync',
  validateRequest({ body: syncProductVariantsBodySchema }),
  controller.syncVariants,
)

// PATCH /api/v1/catalog/variants/:variantId/stock -> Cập nhật tồn kho nhanh
variantAttributeRouter.patch(
  '/:variantId/stock',
  validateRequest({
    params: variantIdParamSchema,
    body: z.object({ quantityChange: z.coerce.number().int() }),
  }),
  controller.updateStock,
)