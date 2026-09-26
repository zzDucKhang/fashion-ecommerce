import { Router } from 'express'
import { TagController } from './tag.controller'

export const tagRouter = Router()
const controller = new TagController()

tagRouter.get('/', controller.getAll)
tagRouter.get('/:id', controller.getOne)
tagRouter.post('/', controller.create)
tagRouter.put('/:id', controller.update)
tagRouter.delete('/:id', controller.delete)