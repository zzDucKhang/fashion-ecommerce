import { Router } from 'express'
import { requireAuth } from '@/middlewares/guards/auth.guard'
import { requireAdmin } from '@/middlewares/guards/role.guard'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import { PointController } from './point.controller'
import { earnPointsBodySchema, getHistoryQuerySchema, redeemPointsBodySchema } from './point.schema'

export const pointRouter = Router()
const controller = new PointController()

pointRouter.use(requireAuth)

pointRouter.get('/balance', controller.getBalance)
pointRouter.get('/history', validateRequest({ query: getHistoryQuerySchema }), controller.getHistory)
pointRouter.post('/earn', requireAdmin, validateRequest({ body: earnPointsBodySchema }), controller.earnPoints)
pointRouter.post('/redeem', validateRequest({ body: redeemPointsBodySchema }), controller.redeemPoints)