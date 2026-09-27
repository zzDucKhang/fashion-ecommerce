import { query, Router } from 'express' 


import { UserController } from './user.controller'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import { getUserQuerySchema, updateUserBodySchema, userParamsSchema } from './user.schema'

export const userRouter = Router()
const controller = new UserController()

userRouter.get('/', validateRequest({ query: getUserQuerySchema }), controller.getListUsers)
userRouter.get('/:userId', validateRequest({ params: userParamsSchema }), controller.getUserById)
userRouter.put('/:userId', validateRequest({ params: userParamsSchema }), validateRequest({ body: updateUserBodySchema }), controller.updateUser)
userRouter.patch('/:userId/status', controller.updateStatus)
userRouter.delete('/:userId', controller.deleteUser)

