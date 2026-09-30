import { Router } from 'express'
import { LanguageController } from './language.controller'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import { authGuard } from '@/middlewares/guards/auth.guard'
import { requireAdmin } from '@/middlewares/guards/role.guard'
import {
  languageParamsSchema,
  createLanguageBodySchema,
  updateLanguageBodySchema,
} from './language.schema'

export const languageRouter = Router()
const controller = new LanguageController()

languageRouter.get('/', controller.findAll)
languageRouter.get('/:languageId', validateRequest({ params: languageParamsSchema }), controller.findById)

// Cần đăng nhập và quyền Admin để thay đổi ngôn ngữ hệ thống
languageRouter.post(
  '/',
  authGuard,
  requireAdmin,
  validateRequest({ body: createLanguageBodySchema }),
  controller.create,
)
languageRouter.put(
  '/:languageId',
  authGuard,
  requireAdmin,
  validateRequest({ params: languageParamsSchema, body: updateLanguageBodySchema }),
  controller.update,
)
languageRouter.delete(
  '/:languageId',
  authGuard,
  requireAdmin,
  validateRequest({ params: languageParamsSchema }),
  controller.delete,
)