import { Router } from 'express'
import { categoryRouter } from './category/category.routes'
import { brandRouter } from './brand/brand.routes'
import { productRouter } from './product/product.routes'
import { variantAttributeRouter } from './variant-attribute/variant-attribute.routes'

import { globalApiLimiter } from '@/middlewares/rate-limit.middleware'

export const catalogRouter = Router()

catalogRouter.use(globalApiLimiter)

catalogRouter.use('/categories', categoryRouter)
catalogRouter.use('/brands', brandRouter)
catalogRouter.use('/products', productRouter)
catalogRouter.use('/variants', variantAttributeRouter)
