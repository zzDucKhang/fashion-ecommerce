import { NextFunction, Request, Response } from 'express'
import { ReviewService } from './review.service'

export class ReviewController {
  constructor(private reviewService = new ReviewService()) {}

  getReviewsByProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.reviewService.getReviewsByProduct(req.query as any)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  getReviewById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id)
      const data = await this.reviewService.getReviewById(id)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  createReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const data = await this.reviewService.createReview(userId, req.body)
      return res.status(201).json({ statusCode: 201, ...data })
    } catch (error) {
      next(error)
    }
  }

  replyToReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id)
      const data = await this.reviewService.replyToReview(id, req.body)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

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
