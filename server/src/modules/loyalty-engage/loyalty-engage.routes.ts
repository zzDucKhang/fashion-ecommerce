import { Router } from 'express'
import { voucherRouter } from './voucher/voucher.routes'
import { reviewRouter } from './review/review.routes'
import { chatRouter } from './chat/chat.routes'

export const loyaltyEngageRouter = Router()

loyaltyEngageRouter.use('/vouchers', voucherRouter)
loyaltyEngageRouter.use('/reviews', reviewRouter)
loyaltyEngageRouter.use('/chat', chatRouter)
