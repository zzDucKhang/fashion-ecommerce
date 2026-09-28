import { prisma } from '@/database/prisma'
import type { Prisma } from '@prisma/client'
import type {
  CreateVoucherDto,
  CreateReviewDto,
  SendMessageDto,
  GetPointHistoryDto,
  ListVouchersDto,
  GetProductReviewsDto,
  GetChatHistoryDto,
} from './loyalty-engage.schema'

// =====================================================
// KIỂU DỮ LIỆU TRẢ VỀ (Return Types)
// =====================================================

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface PaginatedResult<T> {
  data: T[]
  meta: PaginationMeta
}

// =====================================================
// POINT REPOSITORY
// =====================================================

/**
 * Lấy lịch sử giao dịch điểm của một user với phân trang.
 */
export async function findPointTransactions(
  userId: number,
  dto: GetPointHistoryDto
): Promise<PaginatedResult<Record<string, unknown>>> {
  const { page, limit, type } = dto
  const skip = (page - 1) * limit
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {
    userId,
    ...(type ? { transactionType: type } : {}),
  }

  const [data, total] = await prisma.$transaction([
    prisma.pointTransaction.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.pointTransaction.count({ where }),
  ])

  return {
    data: data as unknown as Record<string, unknown>[],
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
  }
}

/**
 * Tạo một giao dịch điểm mới và cập nhật rewardPoints của user trong một transaction Prisma.
 * @param userId - ID của user
 * @param pointChange - Số điểm thay đổi (dương: tích, âm: tiêu)
 * @param transactionType - Loại giao dịch
 * @param description - Mô tả
 * @param orderId - ID đơn hàng liên quan (tuỳ chọn)
 */
export async function createPointTransaction(params: {
  userId: number
  pointChange: number
  transactionType: 'EARN' | 'REDEEM' | 'REFUND' | 'EXPIRE'
  description: string
  orderId?: number
}): Promise<{ newBalance: number; transaction: Record<string, unknown> }> {
  const { userId, pointChange, transactionType, description, orderId } = params

  return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    // Cập nhật số dư điểm và lấy user mới nhất
    const updatedUser = await tx.user.update({
      where: { id: userId },
      data: { rewardPoints: { increment: pointChange } },
      select: { rewardPoints: true },
    })

    const newBalance = updatedUser.rewardPoints

    // Tạo bản ghi giao dịch
    const transaction = await tx.pointTransaction.create({
      data: {
        userId,
        pointChange,
        currentPoint: newBalance,
        transactionType,
        description,
        ...(orderId ? { orderId } : {}),
      },
    })

    return { newBalance, transaction: transaction as unknown as Record<string, unknown> }
  })
}

/**
 * Lấy số dư điểm hiện tại của user.
 */
export async function getUserPointBalance(userId: number): Promise<number> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { rewardPoints: true },
  })
  return user?.rewardPoints ?? 0
}

// =====================================================
// VOUCHER REPOSITORY
// =====================================================

/**
 * Tạo voucher mới.
 */
export async function createVoucher(dto: CreateVoucherDto): Promise<Record<string, unknown>> {
  const result = await prisma.voucher.create({
    data: {
      code: dto.code,
      discountType: dto.discountType,
      discountValue: dto.discountValue,
      minOrderValue: dto.minOrderValue,
      maxDiscountAmt: dto.maxDiscountAmt ?? null,
      totalUsageLimit: dto.totalUsageLimit,
      userUsageLimit: dto.userUsageLimit,
      startDate: new Date(dto.startDate),
      endDate: new Date(dto.endDate),
      isActive: dto.isActive,
    },
  })
  return result as unknown as Record<string, unknown>
}

/**
 * Tìm voucher theo mã code.
 */
export async function findVoucherByCode(code: string): Promise<{
  id: number
  code: string
  discountType: string
  discountValue: number | { toNumber(): number }
  minOrderValue: number | { toNumber(): number }
  maxDiscountAmt: number | { toNumber(): number } | null
  totalUsageLimit: number
  usedCount: number
  userUsageLimit: number
  startDate: Date
  endDate: Date
  isActive: boolean
  createdAt: Date
  updatedAt: Date
} | null> {
  const result = await prisma.voucher.findUnique({ where: { code } })
  return result as typeof result & { discountType: string } | null
}

/**
 * Tăng usedCount của voucher lên 1 (dùng khi áp dụng voucher vào đơn hàng).
 */
export async function incrementVoucherUsedCount(code: string): Promise<Record<string, unknown>> {
  const result = await prisma.voucher.update({
    where: { code },
    data: { usedCount: { increment: 1 } },
  })
  return result as unknown as Record<string, unknown>
}

/**
 * Lấy danh sách voucher với phân trang (admin).
 */
export async function findAllVouchers(
  dto: ListVouchersDto
): Promise<PaginatedResult<Record<string, unknown>>> {
  const { page, limit, isActive } = dto
  const skip = (page - 1) * limit
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {
    ...(isActive !== undefined ? { isActive } : {}),
  }

  const [data, total] = await prisma.$transaction([
    prisma.voucher.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.voucher.count({ where }),
  ])

  return {
    data: data as unknown as Record<string, unknown>[],
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
  }
}

/**
 * Cập nhật trạng thái active của voucher.
 */
export async function updateVoucherStatus(
  id: number,
  isActive: boolean
): Promise<Record<string, unknown>> {
  const result = await prisma.voucher.update({
    where: { id },
    data: { isActive },
  })
  return result as unknown as Record<string, unknown>
}

// =====================================================
// REVIEW REPOSITORY
// =====================================================

/**
 * Tạo đánh giá sản phẩm kèm theo danh sách media.
 */
export async function createReview(
  userId: number,
  dto: CreateReviewDto
): Promise<Record<string, unknown>> {
  const result = await prisma.productReview.create({
    data: {
      productId: dto.productId,
      userId,
      rating: dto.rating,
      content: dto.content,
      medias: {
        create: dto.mediaUrls.map((url) => ({
          mediaUrl: url,
          mediaType: dto.mediaType,
        })),
      },
    },
    include: {
      medias: true,
      user: { select: { id: true, fullName: true, avatarUrl: true } },
    },
  })
  return result as unknown as Record<string, unknown>
}

/**
 * Kiểm tra xem user đã review sản phẩm này chưa.
 */
export async function findReviewByUserAndProduct(
  userId: number,
  productId: number
): Promise<Record<string, unknown> | null> {
  const result = await prisma.productReview.findUnique({
    where: { productId_userId: { productId, userId } },
  })
  return result as unknown as Record<string, unknown> | null
}

/**
 * Lấy danh sách review của sản phẩm với phân trang và filter theo rating.
 */
export async function findReviewsByProduct(
  productId: number,
  dto: GetProductReviewsDto
): Promise<PaginatedResult<Record<string, unknown>>> {
  const { page, limit, rating } = dto
  const skip = (page - 1) * limit
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {
    productId,
    isHidden: false,
    ...(rating ? { rating } : {}),
  }

  const [data, total] = await prisma.$transaction([
    prisma.productReview.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      include: {
        medias: true,
        user: { select: { id: true, fullName: true, avatarUrl: true } },
      },
    }),
    prisma.productReview.count({ where }),
  ])

  return {
    data: data as unknown as Record<string, unknown>[],
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
  }
}

/**
 * Tính điểm rating trung bình của sản phẩm.
 */
export async function computeProductAverageRating(
  productId: number
): Promise<{ averageRating: number; reviewCount: number }> {
  const result = await prisma.productReview.aggregate({
    where: { productId, isHidden: false },
    _avg: { rating: true },
    _count: { rating: true },
  })

  return {
    averageRating: result._avg.rating ?? 0,
    reviewCount: result._count.rating,
  }
}

/**
 * Thêm phản hồi của shop cho một đánh giá.
 */
export async function addShopReplyToReview(
  reviewId: number,
  shopReply: string
): Promise<Record<string, unknown>> {
  const result = await prisma.productReview.update({
    where: { id: reviewId },
    data: { shopReply },
  })
  return result as unknown as Record<string, unknown>
}

/**
 * Ẩn hoặc hiện một đánh giá (Admin moderation).
 */
export async function toggleReviewVisibility(
  reviewId: number,
  isHidden: boolean
): Promise<Record<string, unknown>> {
  const result = await prisma.productReview.update({
    where: { id: reviewId },
    data: { isHidden },
  })
  return result as unknown as Record<string, unknown>
}

/**
 * Tìm review theo ID.
 */
export async function findReviewById(
  reviewId: number
): Promise<Record<string, unknown> | null> {
  const result = await prisma.productReview.findUnique({ where: { id: reviewId } })
  return result as unknown as Record<string, unknown> | null
}

// =====================================================
// MESSAGE REPOSITORY
// =====================================================

/**
 * Lưu tin nhắn mới vào database.
 */
export async function createMessage(
  senderId: number,
  dto: SendMessageDto
): Promise<Record<string, unknown>> {
  const result = await prisma.message.create({
    data: {
      senderId,
      receiverId: dto.receiverId,
      content: dto.content,
      attachmentUrl: dto.attachmentUrl ?? null,
    },
    include: {
      sender: { select: { id: true, fullName: true, avatarUrl: true } },
      receiver: { select: { id: true, fullName: true, avatarUrl: true } },
    },
  })
  return result as unknown as Record<string, unknown>
}

/**
 * Lấy lịch sử chat giữa 2 user với phân trang (tin mới nhất trước).
 */
export async function findChatHistory(
  userIdA: number,
  userIdB: number,
  dto: GetChatHistoryDto
): Promise<PaginatedResult<Record<string, unknown>>> {
  const { page, limit } = dto
  const skip = (page - 1) * limit
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {
    OR: [
      { senderId: userIdA, receiverId: userIdB },
      { senderId: userIdB, receiverId: userIdA },
    ],
  }

  const [data, total] = await prisma.$transaction([
    prisma.message.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      include: {
        sender: { select: { id: true, fullName: true, avatarUrl: true } },
        receiver: { select: { id: true, fullName: true, avatarUrl: true } },
      },
    }),
    prisma.message.count({ where }),
  ])

  return {
    data: data as unknown as Record<string, unknown>[],
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
  }
}

/**
 * Đánh dấu tin nhắn đã đọc (cập nhật readAt).
 */
export async function markMessagesAsRead(
  receiverId: number,
  senderId: number
): Promise<{ count: number }> {
  return prisma.message.updateMany({
    where: {
      senderId,
      receiverId,
      readAt: null,
    },
    data: { readAt: new Date() },
  })
}

/**
 * Lấy danh sách conversation (thread) của user - nhóm theo đối tác chat.
 */
export async function findConversationList(userId: number): Promise<
  {
    partnerId: number
    partnerName: string
    partnerAvatar: string | null
    lastMessage: string
    lastMessageAt: Date
    unreadCount: number
  }[]
> {
  // Lấy tất cả message liên quan đến user, nhóm theo đối tác
  const messages = await prisma.message.findMany({
    where: {
      OR: [{ senderId: userId }, { receiverId: userId }],
    },
    orderBy: { createdAt: 'desc' },
    include: {
      sender: { select: { id: true, fullName: true, avatarUrl: true } },
      receiver: { select: { id: true, fullName: true, avatarUrl: true } },
    },
  })

  // Group by partner
  const conversationMap = new Map<
    number,
    {
      partnerId: number
      partnerName: string
      partnerAvatar: string | null
      lastMessage: string
      lastMessageAt: Date
      unreadCount: number
    }
  >()

  for (const msg of messages) {
    const partner = msg.senderId === userId ? msg.receiver : msg.sender
    if (!conversationMap.has(partner.id)) {
      conversationMap.set(partner.id, {
        partnerId: partner.id,
        partnerName: partner.fullName,
        partnerAvatar: partner.avatarUrl ?? null,
        lastMessage: msg.content,
        lastMessageAt: msg.createdAt,
        unreadCount: 0,
      })
    }
    // Đếm tin chưa đọc (gửi bởi partner, chưa đọc)
    if (msg.senderId === partner.id && msg.readAt === null) {
      const conv = conversationMap.get(partner.id)!
      conv.unreadCount++
    }
  }

  return Array.from(conversationMap.values())
}

// =====================================================
// WEBSOCKET SESSION REPOSITORY
// =====================================================

/**
 * Upsert WebSocket session: tạo mới nếu chưa có socketId, hoặc cập nhật nếu đã tồn tại.
 * Mỗi user có thể có nhiều kết nối socket (nhiều tab/thiết bị).
 */
export async function upsertWebsocketSession(
  userId: number,
  socketId: string
): Promise<Record<string, unknown>> {
  const result = await prisma.websocketSession.upsert({
    where: { socketId },
    create: {
      socketId,
      userId,
      connectedAt: new Date(),
    },
    update: {
      userId,
      connectedAt: new Date(),
    },
  })
  return result as unknown as Record<string, unknown>
}

/**
 * Xoá WebSocket session khi user ngắt kết nối.
 */
export async function deleteWebsocketSession(socketId: string): Promise<void> {
  await prisma.websocketSession.deleteMany({ where: { socketId } })
}

/**
 * Lấy tất cả socketId đang active của một user (để emit event qua socket.io).
 */
export async function findSocketIdsByUserId(userId: number): Promise<string[]> {
  const sessions = await prisma.websocketSession.findMany({
    where: { userId },
    select: { socketId: true },
  })
  return sessions.map((s: { socketId: string }) => s.socketId)
}

/**
 * Lấy userId từ socketId (dùng khi socket ngắt kết nối).
 */
export async function findUserIdBySocketId(socketId: string): Promise<number | null> {
  const session = await prisma.websocketSession.findUnique({
    where: { socketId },
    select: { userId: true },
  })
  return session?.userId ?? null
}
