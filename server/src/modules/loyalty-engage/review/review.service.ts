// src/modules/loyalty-engage/review/review.service.ts
import { Prisma } from '@prisma/client'
import { BadRequestError, ConflictError, NotFoundError, isUniqueConstraintPrismaError } from '@/common/errors'
import { createLogger } from '@/common/logger'
import { ReviewRepo } from './review.repo'
import {
  CreateReviewBodyType,
  GetReviewsQueryType,
  ReplyReviewBodyType,
} from './review.schema'

const logger = createLogger('ReviewService')

export class ReviewService {
  constructor(private reviewRepo = new ReviewRepo()) {}


  async createReview(userId: number, body: CreateReviewBodyType) {
    logger.info({ userId, productId: body.productId, orderId: body.orderId }, 'createReview: initiated')

    if (!body.orderId) {
      throw new BadRequestError('Bạn chỉ có thể đánh giá sản phẩm từ đơn hàng đã giao thành công')
    }

    try {
      const review = await this.reviewRepo.createReview({
        userId,
        productId: body.productId,
        orderId: body.orderId,
        rating: body.rating,
        content: body.content,
        mediaUrls: body.mediaUrls,
      })

      logger.info(
        { reviewId: review.id, userId, productId: body.productId, orderId: body.orderId },
        'createReview: review created successfully',
      )

      return { message: 'Đánh giá sản phẩm thành công', data: review }
    } catch (error: any) {
      // Prisma P2002: Unique constraint failed on @@unique([orderId, productId])
      if (isUniqueConstraintPrismaError(error)) {
        logger.warn(
          { userId, productId: body.productId, orderId: body.orderId },
          'createReview: duplicate review rejected via database unique constraint (P2002)',
        )
        throw new ConflictError('Bạn đã đánh giá sản phẩm này trong đơn hàng này rồi')
      }

      // Prisma P2003: Foreign key constraint failed
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
        logger.warn(
          { userId, productId: body.productId, orderId: body.orderId },
          'createReview: foreign key constraint failed (P2003)',
        )
        throw new NotFoundError('Sản phẩm hoặc đơn hàng không tồn tại')
      }

      throw error
    }
  }

  /**
   * Lấy danh sách review theo productId kèm điểm rating trung bình.
   */
  async getReviewsByProduct(query: GetReviewsQueryType) {
    const { productId, page, limit, rating } = query
    const skip = (page - 1) * limit

    const product = await this.reviewRepo.findProductById(productId)
    if (!product) {
      throw new NotFoundError('Sản phẩm không tồn tại')
    }

    const [{ data, total }, ratingStats] = await Promise.all([
      this.reviewRepo.findReviewsByProductId(productId, skip, limit, rating),
      this.reviewRepo.getAverageRating(productId),
    ])

    return {
      data,
      ratingStats,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    }
  }

  /** Lấy chi tiết một review */
  async getReviewById(id: number) {
    const review = await this.reviewRepo.findReviewById(id)
    if (!review) throw new NotFoundError('Đánh giá không tồn tại')
    return { data: review }
  }

  /** Admin/Shop trả lời đánh giá */
  async replyToReview(id: number, body: ReplyReviewBodyType) {
    const review = await this.reviewRepo.findReviewById(id)
    if (!review) throw new NotFoundError('Đánh giá không tồn tại')

    const updated = await this.reviewRepo.updateShopReply(id, body.shopReply)

    logger.info({ reviewId: id }, 'replyToReview: shop reply saved')

    return { message: 'Đã gửi phản hồi thành công', data: updated }
  }

  /** Admin ẩn/hiện review */
  async toggleHideReview(id: number, isHidden: boolean) {
    const review = await this.reviewRepo.findReviewById(id)
    if (!review) throw new NotFoundError('Đánh giá không tồn tại')

    const updated = await this.reviewRepo.toggleHideReview(id, isHidden)

    logger.info({ reviewId: id, isHidden }, 'toggleHideReview: visibility changed')

    return {
      message: isHidden ? 'Đã ẩn đánh giá' : 'Đã hiện đánh giá',
      data: updated,
    }
  }
}
