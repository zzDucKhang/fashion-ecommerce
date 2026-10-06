import { Router } from 'express'
import { ReturnController } from './return.controller'
import { authGuard } from '@/middlewares/guards/auth.guard'
import { roleGuard } from '@/middlewares/guards/role.guard'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import {
  createReturnBodySchema,
  getAllReturnsQuerySchema,
  returnIdParamsSchema,
  updateReturnBodySchema,
} from './return.schema'

export const returnRouter = Router()
const controller = new ReturnController()

returnRouter.use(authGuard)

returnRouter.get('/', roleGuard('ADMIN'), validateRequest({ query: getAllReturnsQuerySchema }), controller.findAll)
returnRouter.get('/:returnId', validateRequest({ params: returnIdParamsSchema }), controller.findById)
returnRouter.post('/', validateRequest({ body: createReturnBodySchema }), controller.create)
returnRouter.put('/:returnId', roleGuard('ADMIN'), validateRequest({ params: returnIdParamsSchema, body: updateReturnBodySchema }), controller.update)
returnRouter.delete('/:returnId', roleGuard('ADMIN'), validateRequest({ params: returnIdParamsSchema }), controller.delete)