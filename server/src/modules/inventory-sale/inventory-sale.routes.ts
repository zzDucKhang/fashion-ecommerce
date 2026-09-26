import { Router } from 'express'
import { inventoryRouter } from './inventory/inventory.routes'
import { flashSaleRouter } from './flash-sale/flash-sale.routes'

export const inventorySaleRouter = Router()

inventorySaleRouter.use('/inventory', inventoryRouter)
inventorySaleRouter.use('/flash-sale', flashSaleRouter)
