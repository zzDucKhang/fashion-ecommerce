import { Request, Response, NextFunction } from 'express'
import { TagService } from './tag.service'

export class TagController {
  constructor(private tagService = new TagService()) {}

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.tagService.getAllTags()
      res.status(200).json({ success: true, data })
    } catch (err) {
      next(err)
    }
  }

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.tagService.getTagById(Number(req.params.id))
      res.status(200).json({ success: true, data })
    } catch (err) {
      next(err)
    }
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.tagService.createTag(req.body)
      res.status(201).json({ success: true, data })
    } catch (err) {
      next(err)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.tagService.updateTag(Number(req.params.id), req.body)
      res.status(200).json({ success: true, data })
    } catch (err) {
      next(err)
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.tagService.deleteTag(Number(req.params.id))
      res.status(200).json({ success: true, message: 'Xóa thẻ tag thành công' })
    } catch (err) {
      next(err)
    }
  }
}