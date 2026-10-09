import { Request, Response, NextFunction } from 'express'
import { CategoryService } from './category.service'

export class CategoryController {
  constructor(private categoryService = new CategoryService()) {}

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.categoryService.findAll(req.query as any)
      return res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryId = Number(req.params.categoryId)
      const rawLang = String(req.query.lang || req.headers['accept-language'] || 'vi')
      const lang = rawLang.split(',')[0].split('-')[0].trim()
      const data = await this.categoryService.findById(categoryId, lang)
      return res.status(200).json({ statusCode: 200, data })
    } catch (err) {
      next(err)
    }
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const data = await this.categoryService.create({ data: req.body, createdById: userId })
      return res.status(201).json({ statusCode: 201, message: 'Tạo danh mục thành công', data })
    } catch (err) {
      next(err)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const categoryId = Number(req.params.categoryId)
      const data = await this.categoryService.update({ id: categoryId, data: req.body, updatedById: userId })
      return res.status(200).json({ statusCode: 200, message: 'Cập nhật danh mục thành công', data })
    } catch (err) {
      next(err)
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const categoryId = Number(req.params.categoryId)
      const result = await this.categoryService.delete({ id: categoryId, deletedById: userId })
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  
}