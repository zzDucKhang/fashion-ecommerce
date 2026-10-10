import { ProductRepo } from './product.repo'
import {
  CreateProductBodyType,
  GetProductQueryType,
  UpdateProductBodyType,
} from './product.schema'
import { AppError, isNotFoundPrismaError, isUniqueConstraintPrismaError } from '@/common/errors'
import { cacheService } from '@/common/cache/cache.service'

export class ProductService {
  constructor(private productRepo = new ProductRepo()) {}

  async list(query: GetProductQueryType, languageId: string) {
    const cacheKey = `products:list:${JSON.stringify(query)}:lang:${languageId}`
    const cached = await cacheService.get<any>(cacheKey)
    if (cached) return cached

    const data = await this.productRepo.list(query, languageId)
    await cacheService.set(cacheKey, data, 300) // 5 minutes TTL
    return data
  }

  async findById(productId: number, languageId?: string) {
    const cacheKey = `products:${productId}:lang:${languageId || 'default'}`
    const cached = await cacheService.get<any>(cacheKey)
    if (cached) return cached

    const product = await this.productRepo.findById(productId, languageId)
    if (!product) {
      throw new AppError('Sản phẩm không tồn tại hoặc đã bị xóa', 404)
    }

    await cacheService.set(cacheKey, product, 3600) // 1 hour TTL
    return product
  }

  async create(createdById: number, data: CreateProductBodyType) {
    try {
      const result = await this.productRepo.create({ createdById, data })
      await cacheService.invalidate('products:list:*')
      return result
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw new AppError('Tên sản phẩm bị trùng lặp', 422)
      }
      throw error
    }
  }

  async update({
    id,
    updatedById,
    data,
  }: {
    id: number
    updatedById: number
    data: UpdateProductBodyType
  }) {
    try {
      await this.findById(id)
      const result = await this.productRepo.update({ id, updatedById, data })
      await cacheService.invalidate(`products:${id}:*`)
      await cacheService.invalidate('products:list:*')
      return result
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw new AppError('Bản ghi không tồn tại để cập nhật', 404)
      }
      throw error
    }
  }

  async delete(deletedById: number, id: number) {
    try {
      await this.findById(id)
      await this.productRepo.delete({ id, deletedById })
      await cacheService.invalidate(`products:${id}:*`)
      await cacheService.invalidate('products:list:*')
      return { message: 'Xóa sản phẩm thành công' }
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw new AppError('Bản ghi không tồn tại để xóa', 404)
      }
      throw error
    }
  }
}