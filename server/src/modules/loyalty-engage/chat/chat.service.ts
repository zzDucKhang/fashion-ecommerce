// src/modules/loyalty-engage/chat/chat.service.ts
import { BadRequestError, ForbiddenError, NotFoundError } from '@/common/errors'
import { createLogger } from '@/common/logger'
import { ChatRepo } from './chat.repo'
import { ChatStatus } from '@prisma/client'
import { getIO } from '@/common/websocket'
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

  private async authorizeChatAccess(userId: number, chatId: number) {
    const chat = await this.chatRepo.findChatById(chatId)
    if (!chat) throw new NotFoundError('Cuộc trò chuyện không tồn tại')
    if (chat.userId === userId) return chat

    const roleCode = await this.chatRepo.findUserRoleCode(userId)
    if (roleCode !== 'ADMIN' && roleCode !== 'STAFF') {
      throw new ForbiddenError('Bạn không có quyền truy cập cuộc trò chuyện này')
    }

    return chat
  }

  private async authorizeShopStaff(userId: number) {
    const roleCode = await this.chatRepo.findUserRoleCode(userId)
    if (roleCode !== 'ADMIN' && roleCode !== 'STAFF') {
      throw new ForbiddenError('Chỉ nhân viên cửa hàng mới được thực hiện thao tác này')
    }
  }

  /**
   * Lưu tin nhắn mới vào bảng Message.
   */
  async sendMessage(senderId: number, body: SendMessageBodyType) {
    const chatAccess = await this.authorizeChatAccess(senderId, body.chatId)
    if (chatAccess.status === ChatStatus.CLOSED) {
      throw new BadRequestError('Cuộc trò chuyện đã kết thúc')
    }

    const message = await this.chatRepo.createMessage({
      chatId: body.chatId,
      senderId,
      content: body.content,
    })
    const eventPayload = {
      id: message.id,
      chatId: body.chatId,
      senderId: message.senderId,
      content: message.content,
      isRead: message.isRead,
      sendDate: message.sendDate,
      sender: message.sender,
    }
    const recipientRoom = senderId === chatAccess.userId ? 'shop' : `user:${chatAccess.userId}`
    getIO().to(recipientRoom).emit('new_message', eventPayload)
    return { message: 'Tin nhắn đã được gửi', data: message }
  }

  /**
   * Lấy lịch sử hội thoại giữa 2 user sử dụng Cursor-based Pagination.
   *
   * PERFORMANCE BENEFIT:
   *   - O(take) seek time via indexed primary key.
   *   - Eliminates database IO degradation caused by high-offset skips.
   */
  async getChatHistory(userId: number, query: GetChatHistoryQueryType) {
    await this.authorizeChatAccess(userId, query.chatId)
    const { chatId, limit, cursor, page } = query
    const { data, nextCursor, hasMore } = await this.chatRepo.findConversation(chatId, cursor ?? null, limit)
    return { data, pagination: { page, limit, nextCursor, hasMore } }
  }

  /** Đánh dấu đã đọc tất cả tin nhắn trong chat */
  async markAsRead(receiverId: number, body: MarkReadBodyType) {
    await this.authorizeChatAccess(receiverId, body.chatId)
    const result = await this.chatRepo.markMessagesAsRead(body.chatId, receiverId)

    logger.info(
      { receiverId, chatId: body.chatId, updatedCount: result.count },
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

  async getShopConversationList(userId: number) {
    await this.authorizeShopStaff(userId)
    const conversations = await this.chatRepo.findConversationList()
    return { data: conversations }
  }

  async closeConversation(userId: number, chatId: number) {
    await this.authorizeShopStaff(userId)
    const chat = await this.chatRepo.findChatById(chatId)
    if (!chat) throw new NotFoundError('Cuộc trò chuyện không tồn tại')
    if (chat.status === ChatStatus.CLOSED) {
      throw new BadRequestError('Cuộc trò chuyện đã kết thúc')
    }

    return { data: await this.chatRepo.closeChat(chatId) }
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
