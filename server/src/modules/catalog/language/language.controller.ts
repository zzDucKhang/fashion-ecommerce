import { Request, Response, NextFunction } from 'express'
import { LanguageService } from './language.service'

export class LanguageController {
  constructor(private languageService = new LanguageService()) {}

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.languageService.findAll()
      return res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.languageService.findById(req.params.languageId)
      return res.status(200).json({ statusCode: 200, data })
    } catch (err) {
      next(err)
    }
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.userId ?? 1
      const data = await this.languageService.create(userId, req.body)
      return res.status(201).json({ statusCode: 201, message: 'Tạo ngôn ngữ thành công', data })
    } catch (err) {
      next(err)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.userId ?? 1
      const data = await this.languageService.update({
        updateById: userId,
        id: req.params.languageId,
        data: req.body,
      })
      return res.status(200).json({ statusCode: 200, message: 'Cập nhật ngôn ngữ thành công', data })
    } catch (err) {
      next(err)
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.userId ?? 1
      const result = await this.languageService.delete(userId, req.params.languageId)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }
}