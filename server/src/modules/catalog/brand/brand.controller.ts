import { Request, Response, NextFunction } from 'express'
import { BrandService } from './brand.service'

export class BrandController {
  constructor(private brandService = new BrandService()) {}

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rawLang = String(req.query.lang || req.headers['accept-language'] || 'vi')
      const lang = rawLang.split(',')[0].split('-')[0].trim()
      const result = await this.brandService.list(req.query as any, lang)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const brandId = Number(req.params.brandId)
      const rawLang = String(req.query.lang || req.headers['accept-language'] || 'vi')
      const lang = rawLang.split(',')[0].split('-')[0].trim()
      const data = await this.brandService.findById(brandId, lang)
      return res.status(200).json({ statusCode: 200, data })
    } catch (err) {
      next(err)
    }
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const data = await this.brandService.create(userId, req.body)
      return res.status(201).json({ statusCode: 201, message: 'Tạo thương hiệu thành công', data })
    } catch (err) {
      next(err)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const brandId = Number(req.params.brandId)
      const data = await this.brandService.update({ updateById: userId, id: brandId, data: req.body })
      return res.status(200).json({ statusCode: 200, message: 'Cập nhật thành công', data })
    } catch (err) {
      next(err)
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const brandId = Number(req.params.brandId)
      const result = await this.brandService.delete(userId, brandId)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  
}