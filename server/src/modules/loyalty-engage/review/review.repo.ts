// src/modules/loyalty-engage/review/review.repo.ts
import { prisma } from '@/database/prisma'

export class ReviewRepo {
  /** Kiểm tra product tồn tại */
  async findProductById(productId: number) {
    return prisma.product.findFirst({
      where: { id: productId, deletedAt: null },
      select: { id: true, defaultName: true },
    })
  }

  /**
   * Kiểm tra user đã review sản phẩm trong đơn này chưa.
   * Unique constraint trong schema: @@unique([orderId, productId])
   * - Nếu có orderId: kiểm tra theo orderId + productId (1 đơn hàng chỉ review 1 lần)
   * - Nếu không có orderId: kiểm tra theo userId + productId
   */
  async findExistingReview(userId: number, productId: number, orderId?: number) {
    if (orderId) {
      return prisma.productReview.findFirst({
        where: { orderId, productId },
      })
    }
    return prisma.productReview.findFirst({ where: { userId, productId } })
  }

  /** Tạo review mới kèm media (dùng nested create cho ReviewMedia) */
  async createReview(data: {
    userId: number
    productId: number
    orderId?: number
    rating: number
    content: string
    mediaUrls: Array<{ url: string; type: string }>
  }) {
    return prisma.productReview.create({
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
   * FIX: Dùng .toNumber() thay vì Number(x.toFixed(1)) để xử lý Prisma.Decimal đúng cách.
   * Bảo vệ chia cho 0: trả về 0 nếu không có review nào.
   */
  async getAverageRating(productId: number) {
    const result = await prisma.productReview.aggregate({
      where: { productId, isHidden: false },
      _avg: { rating: true },
      _count: { rating: true },
    })

    const totalReviews = result._count.rating

    // Prisma aggregate trả về Decimal | null — bảo vệ trường hợp không có review
    const rawAvg = result._avg.rating
    const averageRating =
      rawAvg !== null && totalReviews > 0
        ? Math.round(rawAvg * 10) / 10 // làm tròn 1 chữ số thập phân
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
