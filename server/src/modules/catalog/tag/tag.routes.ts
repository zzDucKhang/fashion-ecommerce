import { Router } from 'express'
import { TagController } from './tag.controller'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import { authGuard } from '@/middlewares/guards/auth.guard'
import { requireAdmin } from '@/middlewares/guards/role.guard'
import {
  tagParamsSchema,
  getTagQuerySchema,
  createTagBodySchema,
  updateTagBodySchema,
} from './tag.schema'

export const tagRouter = Router()
const controller = new TagController()

tagRouter.get('/', validateRequest({ query: getTagQuerySchema }), controller.list)
tagRouter.get('/:tagId', validateRequest({ params: tagParamsSchema }), controller.findById)

// Áp dụng auth & role guard cho các tác vụ thay đổi
tagRouter.post(
  '/',
  authGuard,
  requireAdmin,
  validateRequest({ body: createTagBodySchema }),
  controller.create,
)
tagRouter.put(
  '/:tagId',
  authGuard,
  requireAdmin,
  validateRequest({ params: tagParamsSchema, body: updateTagBodySchema }),
  controller.update,
)
tagRouter.delete(
  '/:tagId',
  authGuard,
  requireAdmin,
  validateRequest({ params: tagParamsSchema }),
  controller.delete,
)