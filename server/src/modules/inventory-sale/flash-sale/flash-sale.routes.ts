import { Router } from 'express'
import { FlashSaleController } from './flash-sale.controller'

export const flashSaleRouter = Router()
const controller = new FlashSaleController()

flashSaleRouter.get('/active', controller.findActive)
flashSaleRouter.get('/', controller.list)
flashSaleRouter.get('/:campaignId', controller.findById)
flashSaleRouter.post('/', controller.create)
flashSaleRouter.put('/:campaignId', controller.update)
flashSaleRouter.delete('/:campaignId', controller.delete)