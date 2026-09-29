// src/modules/loyalty-engage/chat/chat.service.ts
import { BadRequestError, NotFoundError } from '@/common/errors'
import { ChatRepo } from './chat.repo'
import {
  GetChatHistoryQueryType,
  MarkReadBodyType,
  RemoveSocketSessionBodyType,
  SendMessageBodyType,
  UpsertSocketSessionBodyType,
} from './chat.schema'

export class ChatService {
  constructor(private chatRepo = new ChatRepo()) {}

  // ─────────────── Message APIs ───────────────

  /**
   * Lưu tin nhắn mới vào bảng Message.
   * Không setup Socket.IO ở đây – chỉ lưu DB.
   */
  async sendMessage(senderId: number, body: SendMessageBodyType) {
    if (senderId === body.receiverId) {
      throw new BadRequestError('Không thể gửi tin nhắn cho chính mình')
    }

    const message = await this.chatRepo.createMessage({
      senderId,
      receiverId: body.receiverId,
      content: body.content,
      attachmentUrl: body.attachmentUrl,
    })

    return { message: 'Tin nhắn đã được gửi', data: message }
  }

  /**
   * Lấy lịch sử hội thoại giữa 2 user.
   * Kết quả phân trang, sắp xếp cũ → mới.
   */
  async getChatHistory(userId: number, query: GetChatHistoryQueryType) {
    const { withUserId, page, limit } = query

    if (userId === withUserId) {
      throw new BadRequestError('Không thể xem lịch sử chat với chính mình')
    }

    const skip = (page - 1) * limit
    const { data, total } = await this.chatRepo.findConversation(userId, withUserId, skip, limit)

    return {
      data,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    }
  }

  /** Đánh dấu đã đọc tất cả tin nhắn từ một sender */
  async markAsRead(receiverId: number, body: MarkReadBodyType) {
    const result = await this.chatRepo.markMessagesAsRead(receiverId, body.senderId)
    return {
      message: `Đã đọc ${result.count} tin nhắn`,
      updatedCount: result.count,
    }
  }

  /** Đếm tin nhắn chưa đọc */
  async getUnreadCount(userId: number) {
    const count = await this.chatRepo.countUnread(userId)
    return { unreadCount: count }
  }

  /** Lấy danh sách cuộc trò chuyện của user */
  async getConversationList(userId: number) {
    const partnerIds = await this.chatRepo.findConversationList(userId)
    return { data: partnerIds }
  }

  // ─────────────── WebSocket Session APIs ───────────────

  /**
   * Lưu hoặc cập nhật socket session khi user kết nối.
   * Được gọi từ Socket.IO server khi có sự kiện 'connection'.
   */
  async upsertSocketSession(body: UpsertSocketSessionBodyType) {
    const session = await this.chatRepo.upsertSocketSession(body.socketId, body.userId)
    return { message: 'Socket session đã được lưu', data: session }
  }

  /**
   * Xoá socket session khi user ngắt kết nối.
   * Được gọi từ Socket.IO server khi có sự kiện 'disconnect'.
   */
  async removeSocketSession(body: RemoveSocketSessionBodyType) {
    await this.chatRepo.removeSocketSession(body.socketId)
    return { message: 'Socket session đã được xoá' }
  }

  /** Lấy tất cả socket sessions của một user (để emit tới đúng socket) */
  async getSocketSessionsByUser(userId: number) {
    const sessions = await this.chatRepo.findSocketSessionsByUserId(userId)
    return { data: sessions }
  }

  /** Kiểm tra user có đang online không */
  async checkUserOnline(userId: number) {
    const isOnline = await this.chatRepo.isUserOnline(userId)
    return { userId, isOnline }
  }
}
