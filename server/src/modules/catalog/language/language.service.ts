import { Router } from 'express'
import { LanguageController } from './language.controller'
import { validateRequest } from '@/middlewares/validate.pipe'
import {
  languageParamsSchema,
  createLanguageBodySchema,
  updateLanguageBodySchema,
} from './language.schema'

export const languageRouter = Router()
const controller = new LanguageController()

languageRouter.get('/', controller.findAll)
languageRouter.get('/:languageId', validateRequest({ params: languageParamsSchema }), controller.findById)
languageRouter.post('/', validateRequest({ body: createLanguageBodySchema }), controller.create)
languageRouter.put(
  '/:languageId',
  validateRequest({ params: languageParamsSchema, body: updateLanguageBodySchema }),
  controller.update,
)
languageRouter.delete('/:languageId', validateRequest({ params: languageParamsSchema }), controller.delete)