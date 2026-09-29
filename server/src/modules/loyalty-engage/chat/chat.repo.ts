// src/modules/loyalty-engage/chat/chat.repo.ts
import { prisma } from '@/database/prisma'

export class ChatRepo {
  // ─────────────── Message ───────────────

  /** Lưu tin nhắn mới vào database */
  async createMessage(data: {
    senderId: number
    receiverId: number
    content: string
    attachmentUrl?: string | null
  }) {
    return prisma.message.create({
      data: {
        senderId: data.senderId,
        receiverId: data.receiverId,
        content: data.content,
        attachmentUrl: data.attachmentUrl ?? null,
      },
      include: {
        sender: { select: { id: true, fullName: true, avatarUrl: true } },
        receiver: { select: { id: true, fullName: true, avatarUrl: true } },
      },
    })
  }

  /** Lấy lịch sử hội thoại giữa 2 user (có phân trang, sắp xếp cũ → mới) */
  async findConversation(userId: number, withUserId: number, skip: number, take: number) {
    const where = {
      OR: [
        { senderId: userId, receiverId: withUserId },
        { senderId: withUserId, receiverId: userId },
      ],
    }
    const [data, total] = await prisma.$transaction([
      prisma.message.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take,
        include: {
          sender: { select: { id: true, fullName: true, avatarUrl: true } },
          receiver: { select: { id: true, fullName: true, avatarUrl: true } },
        },
      }),
      prisma.message.count({ where }),
    ])
    // Đảo ngược để trả về theo thứ tự cũ→mới
    return { data: data.reverse(), total }
  }

  /** Đánh dấu tất cả tin nhắn từ senderId đến receiverId là đã đọc */
  async markMessagesAsRead(receiverId: number, senderId: number) {
    return prisma.message.updateMany({
      where: { senderId, receiverId, readAt: null },
      data: { readAt: new Date() },
    })
  }

  /** Đếm số tin nhắn chưa đọc của user */
  async countUnread(userId: number) {
    return prisma.message.count({ where: { receiverId: userId, readAt: null } })
  }

  /** Lấy danh sách hội thoại (các user đã chat với userId) */
  async findConversationList(userId: number) {
    // Lấy danh sách senderId/receiverId unique mà user đã chat
    const sentMessages = await prisma.message.findMany({
      where: { senderId: userId },
      distinct: ['receiverId'],
      select: { receiverId: true },
      orderBy: { createdAt: 'desc' },
    })
    const receivedMessages = await prisma.message.findMany({
      where: { receiverId: userId },
      distinct: ['senderId'],
      select: { senderId: true },
      orderBy: { createdAt: 'desc' },
    })

    // Tập hợp các user đã chat
    const partnerIds = new Set<number>([
      ...sentMessages.map((m: { receiverId: number }) => m.receiverId),
      ...receivedMessages.map((m: { senderId: number }) => m.senderId),
    ])

    return Array.from(partnerIds)
  }

  // ─────────────── WebSocket Session ───────────────

  /** Lưu hoặc cập nhật socket session khi user kết nối */
  async upsertSocketSession(socketId: string, userId: number) {
    return prisma.websocketSession.upsert({
      where: { socketId },
      update: { userId, connectedAt: new Date() },
      create: { socketId, userId, connectedAt: new Date() },
    })
  }

  /** Xoá socket session khi user ngắt kết nối */
  async removeSocketSession(socketId: string) {
    return prisma.websocketSession.delete({ where: { socketId } }).catch(() => null)
  }

  /** Lấy tất cả socket sessions của một user (user có thể mở nhiều tab) */
  async findSocketSessionsByUserId(userId: number) {
    return prisma.websocketSession.findMany({ where: { userId } })
  }

  /** Lấy socket session theo socketId */
  async findSocketSessionBySocketId(socketId: string) {
    return prisma.websocketSession.findUnique({ where: { socketId } })
  }

  /** Kiểm tra user có đang online không (có session hay không) */
  async isUserOnline(userId: number) {
    const count = await prisma.websocketSession.count({ where: { userId } })
    return count > 0
  }
}
