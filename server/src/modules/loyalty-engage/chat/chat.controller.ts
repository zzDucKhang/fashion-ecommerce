// src/modules/loyalty-engage/chat/chat.controller.ts
import { NextFunction, Request, Response } from 'express'
import { ChatService } from './chat.service'
import type { GetChatHistoryQueryType } from './chat.schema'

export class ChatController {
  constructor(private chatService = new ChatService()) {}

  /** POST /chat/messages – Gửi tin nhắn mới */
  sendMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const senderId = req.user!.userId
      const data = await this.chatService.sendMessage(senderId, req.body)
      return res.status(201).json({ statusCode: 201, ...data })
    } catch (error) {
      next(error)
    }
  }

  getActiveChat = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const data = await this.chatService.getOrCreateActiveChat(userId)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  getShopConversationList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.chatService.getShopConversationList(req.user!.userId)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  closeConversation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const chatId = Number(req.params.chatId)
      const data = await this.chatService.closeConversation(req.user!.userId, chatId)
      return res.status(200).json({ statusCode: 200, message: 'Đã đóng cuộc trò chuyện', ...data })
    } catch (error) {
      next(error)
    }
  }

  /** GET /chat/messages?chatId=&page=&limit=&cursor= – Lịch sử hội thoại */
  getChatHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.chatService.getChatHistory(
        req.user!.userId,
        req.query as unknown as GetChatHistoryQueryType,
      )
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  /** POST /chat/messages/read – Đánh dấu đã đọc */
  markAsRead = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const receiverId = req.user!.userId
      const data = await this.chatService.markAsRead(receiverId, req.body)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  /** GET /chat/messages/unread – Số tin nhắn chưa đọc */
  getUnreadCount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const data = await this.chatService.getUnreadCount(userId)
      return res.status(200).json({ statusCode: 200, data })
    } catch (error) {
      next(error)
    }
  }

  /** GET /chat/conversations – Danh sách cuộc trò chuyện */
  getConversationList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const data = await this.chatService.getConversationList(userId)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  /** POST /chat/sessions – Lưu/cập nhật socket session */
  upsertSocketSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.chatService.upsertSocketSession(req.body)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  /** POST /chat/sessions/heartbeat – Gia hạn socket session qua heartbeat ping */
  extendSocketSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.chatService.extendSocketSession(req.body.socketId)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  /** DELETE /chat/sessions – Xoá socket session khi disconnect */
  removeSocketSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.chatService.removeSocketSession(req.body)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  /** GET /chat/sessions/:userId – Lấy sessions của một user */
  getSocketSessionsByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.userId)
      const data = await this.chatService.getSocketSessionsByUser(userId)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  /** GET /chat/sessions/:userId/online – Kiểm tra user online */
  checkUserOnline = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.userId)
      const data = await this.chatService.checkUserOnline(userId)
      return res.status(200).json({ statusCode: 200, data })
    } catch (error) {
      next(error)
    }
  }
}
