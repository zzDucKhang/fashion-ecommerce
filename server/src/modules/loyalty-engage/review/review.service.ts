// src/modules/loyalty-engage/review/review.service.ts
import { BadRequestError, NotFoundError } from '@/common/errors'
import { ReviewRepo } from './review.repo'
import {
  CreateReviewBodyType,
  GetReviewsQueryType,
  ReplyReviewBodyType,
} from './review.schema'

export class ReviewService {
  constructor(private reviewRepo = new ReviewRepo()) {}

  /**
   * Tạo bài đánh giá mới.
   * - Bắt buộc phải có orderId – chỉ review sản phẩm từ đơn hàng đã giao (DELIVERED).
   * - Kiểm tra đơn thuộc user, trạng thái DELIVERED, và product có trong đơn.
   * - Mỗi user chỉ đánh giá 1 product trong 1 order 1 lần (unique orderId+productId).
   */
  async createReview(userId: number, body: CreateReviewBodyType) {
    // Kiểm tra sản phẩm tồn tại
    const product = await this.reviewRepo.findProductById(body.productId)
    if (!product) throw new NotFoundError('Sản phẩm không tồn tại')

    // Bắt buộc kiểm tra đơn hàng hợp lệ: thuộc user, DELIVERED, và chứa productId này
    if (!body.orderId) {
      throw new BadRequestError('Bạn chỉ có thể đánh giá sản phẩm từ đơn hàng đã giao thành công')
    }

    const orderItem = await this.reviewRepo.findValidOrderItem(body.orderId, userId, body.productId)
    if (!orderItem) {
      throw new BadRequestError(
        'Bạn chỉ có thể đánh giá sản phẩm từ đơn hàng đã giao thành công của bạn',
      )
    }

    // Kiểm tra đã review chưa
    const existing = await this.reviewRepo.findExistingReview(userId, body.productId, body.orderId)
    if (existing) {
      throw new BadRequestError('Bạn đã đánh giá sản phẩm này rồi')
    }

    const review = await this.reviewRepo.createReview({
      userId,
      productId: body.productId,
      orderId: body.orderId,
      rating: body.rating,
      content: body.content,
      mediaUrls: body.mediaUrls,
    })

    return { message: 'Đánh giá sản phẩm thành công', data: review }
  }

  /**
   * Lấy danh sách review theo productId.
   * Tính kèm điểm rating trung bình.
   */
  async getReviewsByProduct(query: GetReviewsQueryType) {
    const { productId, page, limit, rating } = query
    const skip = (page - 1) * limit

    const product = await this.reviewRepo.findProductById(productId)
    if (!product) throw new NotFoundError('Sản phẩm không tồn tại')

    const [{ data, total }, ratingStats] = await Promise.all([
      this.reviewRepo.findReviewsByProductId(productId, skip, limit, rating),
      this.reviewRepo.getAverageRating(productId),
    ])

    return {
      data,
      ratingStats,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
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
    return { message: 'Đã gửi phản hồi thành công', data: updated }
  }

  /** Admin ẩn/hiện review */
  async toggleHideReview(id: number, isHidden: boolean) {
    const review = await this.reviewRepo.findReviewById(id)
    if (!review) throw new NotFoundError('Đánh giá không tồn tại')

    const updated = await this.reviewRepo.toggleHideReview(id, isHidden)
    return {
      message: isHidden ? 'Đã ẩn đánh giá' : 'Đã hiện đánh giá',
      data: updated,
    }
  }
}
