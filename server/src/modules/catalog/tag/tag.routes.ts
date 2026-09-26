import { Router } from 'express'
import { TagController } from './tag.controller'
import { validateRequest } from "@/middlewares/pipes/validate.pipe";
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
tagRouter.post('/', validateRequest({ body: createTagBodySchema }), controller.create)
tagRouter.put(
  '/:tagId',
  validateRequest({ params: tagParamsSchema, body: updateTagBodySchema }),
  controller.update,
)
tagRouter.delete('/:tagId', validateRequest({ params: tagParamsSchema }), controller.delete)