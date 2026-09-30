// src/modules/loyalty-engage/review/review.routes.ts
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

// ─── Public routes ────────────────────────────────────────────────────────────

/** GET /reviews – Danh sách review theo productId (công khai) */
reviewRouter.get(
  '/',
  validateRequest({ query: getReviewsQuerySchema }),
  controller.getReviewsByProduct,
)

/** GET /reviews/:id – Chi tiết một review (công khai) */
reviewRouter.get(
  '/:id',
  validateRequest({ params: reviewIdParamSchema }),
  controller.getReviewById,
)

// ─── User routes (phải đăng nhập) ────────────────────────────────────────────

/** POST /reviews – Tạo đánh giá */
reviewRouter.post(
  '/',
  requireAuth,
  validateRequest({ body: createReviewBodySchema }),
  controller.createReview,
)

// ─── Admin routes ─────────────────────────────────────────────────────────────

/** POST /reviews/:id/reply – Shop phản hồi đánh giá */
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

/** PATCH /reviews/:id/hide – Ẩn/hiện đánh giá */
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
