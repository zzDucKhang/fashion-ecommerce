import { Router } from 'express'
import { ReturnController } from './return.controller'

export const returnRouter = Router()
const controller = new ReturnController()

returnRouter.get('/', controller.findAll)
returnRouter.get('/:returnId', controller.findById)
returnRouter.post('/', controller.create)
returnRouter.put('/:returnId', controller.update)
returnRouter.delete('/:returnId', controller.delete)
