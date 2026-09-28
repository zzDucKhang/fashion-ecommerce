import { Router } from 'express'
import { CartController } from './cart.controller'
export const cartRouter = Router()
const controller = new CartController()

cartRouter.get('/', controller.get)
cartRouter.post('/items', controller.add)
cartRouter.patch('/items/:itemId', controller.update)
cartRouter.delete('/items/:itemId', controller.remove)
