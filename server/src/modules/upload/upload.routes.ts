// src/modules/upload/upload.routes.ts
import { Router, Request, Response, NextFunction } from 'express'
import { storageService } from '@/common/service/storage.service'
import { requireAuth } from '@/middlewares/guards/auth.guard'
import { z } from 'zod'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'

const uploadBodySchema = z.object({
  fileName: z.string().trim().min(1, 'Tên file không được để trống'),
  fileType: z.string().trim().optional().default('image/jpeg'),
  base64: z.string().min(1, 'Nội dung file không được để trống'),
  folder: z.enum(['avatars', 'products', 'reviews', 'chats', 'general']).optional().default('general'),
})

export const uploadRouter = Router()

uploadRouter.post(
  '/',
  requireAuth,
  validateRequest({ body: uploadBodySchema }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await storageService.uploadBase64(req.body)
      return res.status(200).json({
        statusCode: 200,
        message: 'Tải lên tập tin lên cloud thành công',
        data: result,
      })
    } catch (err) {
      next(err)
    }
  }
)
