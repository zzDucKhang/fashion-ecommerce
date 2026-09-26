import { VariantAttributeRepo } from './variant-attribute.repo'
import { SyncProductVariantsBodyType } from './variant-attribute.schema'
import { AppError, isUniqueConstraintPrismaError } from '@/common/errors'
import { prisma } from '@/database/prisma'

export class VariantAttributeService {
  constructor(private variantRepo = new VariantAttributeRepo()) {}

  async getVariantsByProductId(productId: number) {
    const product = await prisma.product.findFirst({
      where: { id: productId, deletedAt: null },
    })
    if (!product) {
      throw new AppError('Sản phẩm không tồn tại hoặc đã bị xóa', 404)
    }
    return this.variantRepo.getByProductId(productId)
  }

  async getVariantById(variantId: number) {
    const variant = await this.variantRepo.findById(variantId)
    if (!variant) {
      throw new AppError('Biến thể không tồn tại hoặc đã bị vô hiệu hóa', 404)
    }
    return variant
  }

  async syncProductVariants(data: SyncProductVariantsBodyType, userId: number) {
    try {
      const product = await prisma.product.findFirst({
        where: { id: data.productId, deletedAt: null },
      })
      if (!product) {
        throw new AppError('Không tìm thấy sản phẩm tương ứng để đồng bộ biến thể', 404)
      }

      return await this.variantRepo.syncVariants(data, userId)
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw new AppError('Mã SKU bị trùng lặp trong hệ thống', 422)
      }
      throw error
    }
  }

  async updateStock(variantId: number, delta: number) {
    const variant = await this.getVariantById(variantId)
    if (variant.stockQuantity + delta < 0) {
      throw new AppError('Số lượng tồn kho không đủ để thực hiện khấu trừ', 400)
    }
    return this.variantRepo.updateStockWithOptimistic(variantId, delta)
  }
}