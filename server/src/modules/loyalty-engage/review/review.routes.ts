import { Router } from 'express'
import { requireAuth } from '@/middlewares/guards/auth.guard'
import { requireAdmin } from '@/middlewares/guards/role.guard'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import { ReviewController } from './review.controller'
import {
  createReviewBodySchema,
  getReviewsQuerySchema,
  replyReviewBodySchema,
  reviewIdParamSchema,
} from './review.schema'
import { z } from 'zod'

export const reviewRouter = Router()
const controller = new ReviewController()

reviewRouter.get(
  '/',
  validateRequest({ query: getReviewsQuerySchema }),
  controller.getReviewsByProduct,
)

reviewRouter.get(
  '/:id',
  validateRequest({ params: reviewIdParamSchema }),
  controller.getReviewById,
)

reviewRouter.post(
  '/',
  requireAuth,
  validateRequest({ body: createReviewBodySchema }),
  controller.createReview,
)

reviewRouter.post(
  '/:id/reply',
  requireAuth,
  requireAdmin,
  validateRequest({
    params: reviewIdParamSchema,
    body: replyReviewBodySchema,
  }),
  controller.replyToReview,
)

reviewRouter.patch(
  '/:id/hide',
  requireAuth,
  requireAdmin,
  validateRequest({
    params: reviewIdParamSchema,
    body: z.object({ isHidden: z.boolean({ required_error: 'isHidden là bắt buộc' }) }),
  }),
  controller.toggleHideReview,
)
