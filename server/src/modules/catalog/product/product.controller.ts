import { Request, Response, NextFunction } from 'express'
import { ProductService } from './product.service'

export class ProductController {
  constructor(private productService = new ProductService()) {}

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rawLang = String(req.query.lang || req.headers['accept-language'] || 'vi')
      const lang = rawLang.split(',')[0].split('-')[0].trim()
      const result = await this.productService.list(req.query as any, lang)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId = Number(req.params.productId)
      const rawLang = String(req.query.lang || req.headers['accept-language'] || 'vi')
      const lang = rawLang.split(',')[0].split('-')[0].trim()
      const data = await this.productService.findById(productId, lang)
      return res.status(200).json({ statusCode: 200, data })
    } catch (err) {
      next(err)
    }
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const data = await this.productService.create(userId, req.body)
      return res.status(201).json({ statusCode: 201, message: 'Tạo sản phẩm thành công', data })
    } catch (err) {
      next(err)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const productId = Number(req.params.productId)
      const data = await this.productService.update({
        id: productId,
        updatedById: userId,
        data: req.body,
      })
      return res.status(200).json({ statusCode: 200, message: 'Cập nhật sản phẩm thành công', data })
    } catch (err) {
      next(err)
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const productId = Number(req.params.productId)
      const result = await this.productService.delete(userId, productId)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  upsertTranslation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const productId = Number(req.params.productId)
      const languageId = req.params.languageId
      const data = await this.productService.upsertTranslation({
        productId,
        languageId,
        userId,
        data: req.body,
      })
      return res.status(200).json({ statusCode: 200, message: 'Cập nhật bản dịch sản phẩm thành công', data })
    } catch (err) {
      next(err)
    }
  }
}