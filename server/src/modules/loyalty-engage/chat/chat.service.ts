// src/modules/loyalty-engage/chat/chat.service.ts
import { BadRequestError, NotFoundError } from '@/common/errors'
import { createLogger } from '@/common/logger'
import { ChatRepo } from './chat.repo'
import {
  GetChatHistoryQueryType,
  MarkReadBodyType,
  RemoveSocketSessionBodyType,
  SendMessageBodyType,
  UpsertSocketSessionBodyType,
} from './chat.schema'

const logger = createLogger('ChatService')

export class ChatService {
  constructor(private chatRepo = new ChatRepo()) {}

  // ─────────────── Message APIs ───────────────

  async getOrCreateActiveChat(userId: number) {
    let chat = await this.chatRepo.findActiveChatByUserId(userId)
    if (!chat) chat = await this.chatRepo.createChat(userId)
    return { data: chat }
  }

  /**
   * Lưu tin nhắn mới vào bảng Message.
   */
  async sendMessage(senderId: number, body: SendMessageBodyType) {
    const message = await this.chatRepo.createMessage({
      chatId: body.chatId,
      senderId,
      content: body.content,
    })
    return { message: 'Tin nhắn đã được gửi', data: message }
  }

  /**
   * Lấy lịch sử hội thoại giữa 2 user sử dụng Cursor-based Pagination.
   *
   * PERFORMANCE BENEFIT:
   *   - O(take) seek time via indexed primary key.
   *   - Eliminates database IO degradation caused by high-offset skips.
   */
  async getChatHistory(query: GetChatHistoryQueryType) {
    const { chatId, limit, cursor, page } = query
    const { data, nextCursor, hasMore } = await this.chatRepo.findConversation(chatId, cursor ?? null, limit)
    return { data, pagination: { page, limit, nextCursor, hasMore } }
  }

  /** Đánh dấu đã đọc tất cả tin nhắn từ một sender */
  async markAsRead(receiverId: number, body: MarkReadBodyType) {
    const result = await this.chatRepo.markMessagesAsRead(receiverId, body.senderId)

    logger.info(
      { receiverId, senderId: body.senderId, updatedCount: result.count },
      'markAsRead: messages marked as read',
    )

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

  /**
   * Lấy danh sách cuộc trò chuyện của user.
   * Offloads deduplication and ordering to the PostgreSQL query engine.
   */
  async getConversationList(userId: number) {
    logger.debug({ userId }, 'getConversationList: retrieving partner list')

    const partners = await this.chatRepo.findConversationList(userId)
    return { data: partners }
  }

  // ─────────────── WebSocket Session APIs (Redis-backed) ───────────────

  /**
   * Lưu hoặc cập nhật socket session khi user kết nối.
   * Uses Redis hash maps with strict 60s TTL to prevent ghost sessions on crash.
   */
  async upsertSocketSession(body: UpsertSocketSessionBodyType) {
    logger.info({ socketId: body.socketId, userId: body.userId }, 'upsertSocketSession: updating Redis session')

    const session = await this.chatRepo.upsertSocketSession(body.socketId, body.userId)
    return { message: 'Socket session đã được lưu', data: session }
  }

  /**
   * Gia hạn socket session khi nhận heartbeat/ping từ client.
   * Resets TTL của user hash và socket key về 60 giây.
   */
  async extendSocketSession(socketId: string) {
    if (!socketId) {
      throw new BadRequestError('socketId không được để trống')
    }

    logger.debug({ socketId }, 'extendSocketSession: handling heartbeat ping')

    const result = await this.chatRepo.extendSocketSession(socketId)
    if (!result) {
      throw new NotFoundError('Socket session không tồn tại hoặc đã hết hạn')
    }

    return { message: 'Gia hạn socket session thành công', data: result }
  }

  /**
   * Xoá socket session khi user ngắt kết nối.
   */
  async removeSocketSession(body: RemoveSocketSessionBodyType) {
    logger.info({ socketId: body.socketId }, 'removeSocketSession: clearing Redis session')

    await this.chatRepo.removeSocketSession(body.socketId)
    return { message: 'Socket session đã được xoá' }
  }

  /** Lấy tất cả socket sessions của một user */
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
