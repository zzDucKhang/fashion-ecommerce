import { Router } from 'express'

import { flashSaleRouter } from './flash-sale/flash-sale.routes'

export const inventorySaleRouter = Router()


inventorySaleRouter.use('/flash-sales', flashSaleRouter)