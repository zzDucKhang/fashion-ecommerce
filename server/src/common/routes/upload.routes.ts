import { Router, Request, Response, NextFunction } from 'express';
import { storageService } from '@/common/service/storage.service';
import { authGuard } from '@/middlewares/guards/auth.guard';
import { z } from 'zod';
import { validateRequest } from '@/middlewares/pipes/validate.pipe';

const uploadBodySchema = z.object({
  fileName: z.string().trim().min(1, 'Tên file không được để trống'),
  fileType: z.string().trim().default('image/jpeg'),
  base64: z.string().min(1, 'Nội dung file không được để trống'),
});

export const uploadRouter = Router();

uploadRouter.post(
  '/',
  authGuard,
  validateRequest({ body: uploadBodySchema }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const host = req.get('host') || undefined;
      const protocol = req.protocol;
      const result = await storageService.uploadBase64(req.body, protocol, host);
      return res.status(200).json({
        statusCode: 200,
        message: 'Tải lên tập tin thành công',
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }
);
