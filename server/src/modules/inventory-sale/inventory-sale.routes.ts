import { Router } from 'express'
import { inventoryRouter } from './inventory/inventory.routes'
import { flashSaleRouter } from './flash-sale/flash-sale.routes'

export const inventorySaleRouter = Router()

inventorySaleRouter.use('/inventories', inventoryRouter)
inventorySaleRouter.use('/flash-sales', flashSaleRouter)