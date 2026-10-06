import { Request, Response, NextFunction } from 'express'
import { VariantAttributeService } from './variant-attribute.service'

export class VariantAttributeController {
  constructor(private variantService = new VariantAttributeService()) {}

  getByProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId = Number(req.params.productId)
      const data = await this.variantService.getVariantsByProductId(productId)
      return res.status(200).json({
        statusCode: 200,
        message: 'Lấy danh sách biến thể sản phẩm thành công',
        data,
      })
    } catch (err) {
      next(err)
    }
  }

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const variantId = Number(req.params.variantId)
      const data = await this.variantService.getVariantById(variantId)
      return res.status(200).json({ statusCode: 200, data })
    } catch (err) {
      next(err)
    }
  }

  syncVariants = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const data = await this.variantService.syncProductVariants(req.body, userId)
      return res.status(200).json({
        statusCode: 200,
        message: 'Đồng bộ biến thể và ma trận thuộc tính thành công',
        data,
      })
    } catch (err) {
      next(err)
    }
  }

  updateStock = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const variantId = Number(req.params.variantId)
      const { quantityChange } = req.body
      const data = await this.variantService.updateStock(variantId, Number(quantityChange))
      return res.status(200).json({
        statusCode: 200,
        message: 'Cập nhật số lượng tồn kho thành công',
        data,
      })
    } catch (err) {
      next(err)
    }
  }
}