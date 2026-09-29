// src/modules/loyalty-engage/review/review.controller.ts
import { NextFunction, Request, Response } from 'express'
import { ReviewService } from './review.service'

export class ReviewController {
  constructor(private reviewService = new ReviewService()) {}

  /** GET /reviews?productId=&page=&limit=&rating= – Danh sách review theo sản phẩm */
  getReviewsByProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.reviewService.getReviewsByProduct(req.query as any)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  /** GET /reviews/:id – Chi tiết một review */
  getReviewById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id)
      const data = await this.reviewService.getReviewById(id)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  /** POST /reviews – Tạo đánh giá mới (User đã đăng nhập) */
  createReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const data = await this.reviewService.createReview(userId, req.body)
      return res.status(201).json({ statusCode: 201, ...data })
    } catch (error) {
      next(error)
    }
  }

  /** POST /reviews/:id/reply – Shop trả lời đánh giá (Admin) */
  replyToReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id)
      const data = await this.reviewService.replyToReview(id, req.body)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  /** PATCH /reviews/:id/hide – Ẩn/hiện review (Admin) */
  toggleHideReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id)
      const isHidden: boolean = req.body.isHidden === true
      const data = await this.reviewService.toggleHideReview(id, isHidden)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }
}
