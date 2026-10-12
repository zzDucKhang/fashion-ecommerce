import { Router } from 'express'
import { categoryRouter } from './category/category.routes'
import { brandRouter } from './brand/brand.routes'
import { productRouter } from './product/product.routes'
import { variantAttributeRouter } from './variant-attribute/variant-attribute.routes'
import { tagRouter } from './tag/tag.routes'

export const catalogRouter = Router()

catalogRouter.use('/categories', categoryRouter)
catalogRouter.use('/brands', brandRouter)
catalogRouter.use('/products', productRouter)
catalogRouter.use('/variants', variantAttributeRouter)
catalogRouter.use('/tags', tagRouter)

