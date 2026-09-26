

import { Router } from 'express'
import { LanguageController } from './language.controller'

export const languageRouter = Router()
const controller = new LanguageController()

languageRouter.get('/', controller.findAll)
languageRouter.get('/:languageId', controller.findById)
languageRouter.post('/', controller.create)
languageRouter.put(
  '/:languageId',
  controller.update,
)
languageRouter.delete('/:languageId', controller.delete)