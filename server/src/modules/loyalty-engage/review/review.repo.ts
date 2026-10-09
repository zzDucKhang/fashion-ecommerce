import { prisma } from '@/database/prisma'
import { redisClient } from '@/database/redis'
import { createLogger } from '@/common/logger'

const logger = createLogger('ReviewRepo')

export class ReviewRepo {
  async findProductById(productId: number) {
    return prisma.product.findFirst({
      where: { id: productId, deletedAt: null },
      select: { id: true, defaultName: true },
    })
  }

  async verifyDeliveredOrderProduct(userId: number, orderId: number, productId: number) {
    return prisma.order.findFirst({
      where: {
        id: orderId,
        userId,
        status: 'DELIVERED',
        deletedAt: null,
        orderItems: {
          some: {
            deletedAt: null,
            variant: {
              productId,
            },
          },
        },
      },
      select: { id: true },
    })
  }

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

  async findReviewsByProductId(productId: number, skip: number, take: number, rating?: number) {
    const where = {
      productId,
      isHidden: false,
      deletedAt: null,
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

  async getAverageRating(productId: number) {
    const result = await prisma.productReview.aggregate({
      where: { productId, isHidden: false, deletedAt: null },
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

  async findReviewById(id: number) {
    return prisma.productReview.findUnique({
      where: { id },
      include: {
        medias: true,
        user: { select: { id: true, fullName: true, avatarUrl: true } },
      },
    })
  }

  async updateShopReply(id: number, shopReply: string) {
    return prisma.productReview.update({ where: { id }, data: { shopReply } })
  }

  async toggleHideReview(id: number, isHidden: boolean) {
    return prisma.productReview.update({ where: { id }, data: { isHidden } })
  }

  async syncProductRatingHook(productId: number, tx?: any) {
    const client = tx || prisma
    const result = await client.productReview.aggregate({
      where: { productId, isHidden: false, deletedAt: null },
      _avg: { rating: true },
      _count: { rating: true },
    })

    const totalReviews = result._count.rating || 0
    const rawAvg = result._avg.rating
    const averageRating = rawAvg !== null && totalReviews > 0 ? Math.round(rawAvg * 10) / 10 : 0

    try {
      const cacheKey = `catalog:product:${productId}:rating`
      await redisClient.set(
        cacheKey,
        JSON.stringify({ productId, averageRating, totalReviews, updatedAt: new Date().toISOString() }),
        'EX',
        86400,
      )
    } catch (cacheErr) {
      logger.warn({ productId, cacheErr }, 'syncProductRatingHook: Redis cache sync warning')
    }

    return { productId, averageRating, totalReviews }
  }
}
