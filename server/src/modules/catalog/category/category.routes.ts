import { Router } from 'express'
import { CategoryController } from './category.controller'


export const categoryRouter = Router()
const controller = new CategoryController()

categoryRouter.get('/', controller.findAll)
categoryRouter.get('/:categoryId', controller.findById)
categoryRouter.post('/',  controller.create)
categoryRouter.put(
  '/:categoryId',
  controller.update,
)
categoryRouter.delete('/:categoryId', controller.delete)

categoryRouter.put(
  '/:categoryId/translations/:languageId',
  
  controller.upsertTranslation,
)