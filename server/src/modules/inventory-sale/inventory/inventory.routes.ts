import { Router } from 'express'
import { InventoryController } from './inventory.controller'

export const inventoryRouter = Router()
const controller = new InventoryController()

inventoryRouter.get('/logs', controller.listLogs)
inventoryRouter.get('/:variantId', controller.getStock)
inventoryRouter.post('/adjust', controller.adjustStock)