// src/modules/loyalty-engage/review/review.repo.ts
import { prisma } from '@/database/prisma'
import { createLogger } from '@/common/logger'

const logger = createLogger('ReviewRepo')

export class ReviewRepo {
  /** Kiểm tra product tồn tại (dùng cho read query / catalog metadata) */
  async findProductById(productId: number) {
    return prisma.product.findFirst({
      where: { id: productId, deletedAt: null },
      select: { id: true, defaultName: true },
    })
  }

  /**
   * Tạo review mới kèm media (sử dụng nested create cho ReviewMedia).
   *
   * RACE-CONDITION FIX:
   * Rely on the database-level @@unique([orderId, productId]) constraint.
   * If two concurrent requests try to insert a review for the same order and product,
   * PostgreSQL enforces uniqueness at the storage engine level and throws P2002.
   */
  async createReview(data: {
    userId: number
    productId: number
    orderId?: number
    rating: number
    content: string
    mediaUrls: Array<{ url: string; type: string }>
  }) {
    logger.info(
      { userId: data.userId, productId: data.productId, orderId: data.orderId },
      'createReview: executing atomic insert',
    )

    const review = await prisma.productReview.create({
      data: {
        userId: data.userId,
        productId: data.productId,
        orderId: data.orderId,
        rating: data.rating,
        content: data.content,
        medias: {
          create: data.mediaUrls.map((m) => ({
            mediaUrl: m.url,
            mediaType: m.type,
          })),
        },
      },
      include: {
        medias: true,
        user: { select: { id: true, fullName: true, avatarUrl: true } },
      },
    })

    logger.info(
      { reviewId: review.id, userId: data.userId, productId: data.productId },
      'createReview: review created successfully in DB',
    )

    return review
  }

  /** Lấy danh sách review theo productId (có phân trang, lọc theo rating) */
  async findReviewsByProductId(productId: number, skip: number, take: number, rating?: number) {
    const where = {
      productId,
      isHidden: false,
      ...(rating !== undefined ? { rating } : {}),
    }

    const [data, total] = await prisma.$transaction([
      prisma.productReview.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take,
        include: {
          medias: true,
          user: { select: { id: true, fullName: true, avatarUrl: true } },
        },
      }),
      prisma.productReview.count({ where }),
    ])

    return { data, total }
  }

  /**
   * Tính rating trung bình của product.
   * Bảo vệ chia cho 0: trả về 0 nếu không có review nào.
   */
  async getAverageRating(productId: number) {
    const result = await prisma.productReview.aggregate({
      where: { productId, isHidden: false },
      _avg: { rating: true },
      _count: { rating: true },
    })

    const totalReviews = result._count.rating
    const rawAvg = result._avg.rating
    const averageRating =
      rawAvg !== null && totalReviews > 0
        ? Math.round(rawAvg * 10) / 10
        : 0

    return { averageRating, totalReviews }
  }

  /** Lấy một review theo id */
  async findReviewById(id: number) {
    return prisma.productReview.findUnique({
      where: { id },
      include: {
        medias: true,
        user: { select: { id: true, fullName: true, avatarUrl: true } },
      },
    })
  }

  /** Admin trả lời review */
  async updateShopReply(id: number, shopReply: string) {
    return prisma.productReview.update({ where: { id }, data: { shopReply } })
  }

  /** Admin ẩn/hiện review */
  async toggleHideReview(id: number, isHidden: boolean) {
    return prisma.productReview.update({ where: { id }, data: { isHidden } })
  }
}
