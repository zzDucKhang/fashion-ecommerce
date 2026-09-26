import { ProductRepo } from './product.repo'
import {
  CreateProductBodyType,
  GetProductQueryType,
  UpdateProductBodyType,
  UpsertProductTranslationType,
} from './product.schema'
import { AppError, isNotFoundPrismaError, isUniqueConstraintPrismaError } from '@/common/errors'

export class ProductService {
  constructor(private productRepo = new ProductRepo()) {}

  async list(query: GetProductQueryType, languageId: string) {
    return this.productRepo.list(query, languageId)
  }

  async findById(productId: number, languageId?: string) {
    const product = await this.productRepo.findById(productId, languageId)
    if (!product) {
      throw new AppError('Sản phẩm không tồn tại hoặc đã bị xóa', 404)
    }
    return product
  }

  async create(createdById: number, data: CreateProductBodyType) {
    try {
      return await this.productRepo.create({ createdById, data })
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
      return await this.productRepo.update({ id, updatedById, data })
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
      return { message: 'Xóa sản phẩm thành công' }
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw new AppError('Bản ghi không tồn tại để xóa', 404)
      }
      throw error
    }
  }

  async upsertTranslation({
    productId,
    languageId,
    userId,
    data,
  }: {
    productId: number
    languageId: string
    userId: number
    data: UpsertProductTranslationType
  }) {
    await this.findById(productId, languageId)
    return this.productRepo.upsertTranslation({ productId, languageId, userId, data })
  }
}