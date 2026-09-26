import { Request, Response, NextFunction } from 'express'
import { TagService } from './tag.service'

export class TagController {
  constructor(private tagService = new TagService()) {}

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.tagService.list(req.query as any)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tagId = Number(req.params.tagId)
      const data = await this.tagService.findById(tagId)
      return res.status(200).json({ statusCode: 200, data })
    } catch (err) {
      next(err)
    }
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.userId ?? 1
      const data = await this.tagService.create(userId, req.body)
      return res.status(201).json({ statusCode: 201, message: 'Tạo thẻ tag thành công', data })
    } catch (err) {
      next(err)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.userId ?? 1
      const tagId = Number(req.params.tagId)
      const data = await this.tagService.update({ id: tagId, updatedById: userId, data: req.body })
      return res.status(200).json({ statusCode: 200, message: 'Cập nhật thẻ tag thành công', data })
    } catch (err) {
      next(err)
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.userId ?? 1
      const tagId = Number(req.params.tagId)
      const result = await this.tagService.delete(userId, tagId)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }
}