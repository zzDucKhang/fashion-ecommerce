import { BrandRepo } from './brand.repo'
import {
  CreateBrandBodyType,
  GetBrandQueryType,
  UpdateBrandBodyType,
  UpsertBrandTranslationType,
} from './brand.schema'

import { AppError } from '@/common/errors'

export class BrandService {
  constructor(private brandRepo = new BrandRepo()) {}

  async list(query: GetBrandQueryType, languageId: string) {
    return this.brandRepo.list(query, languageId)
  }

  async findById(id: number, languageId: string) {
    const brand = await this.brandRepo.findById(id, languageId)
    if (!brand) {
      throw new AppError('Thương hiệu không tồn tại hoặc đã bị xóa', 404)
    }
    return brand
  }

  async create(createdById: number, data: CreateBrandBodyType) {
    try {
      return await this.brandRepo.create({ createdById, data })
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw new AppError('Tên thương hiệu đã tồn tại', 422)
      }
      throw error
    }
  }

  async update({
    updateById,
    id,
    data,
  }: {
    updateById: number
    id: number
    data: UpdateBrandBodyType
  }) {
    try {
      const brand = await this.brandRepo.findById(id)
      if (!brand) {
        throw new AppError('Bản ghi không tồn tại để cập nhật', 404)
      }
      return await this.brandRepo.update({ updateById, id, data })
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw new AppError('Tên thương hiệu đã tồn tại', 422)
      }
      if (isNotFoundPrismaError(error)) {
        throw new AppError('Bản ghi không tồn tại', 404)
      }
      throw error
    }
  }

  // Soft delete lưu vết deletedById như dự án gốc
  async delete(deleteById: number, id: number) {
    try {
      const brand = await this.brandRepo.findById(id)
      if (!brand) {
        throw new AppError('Bản ghi không tồn tại để xóa', 404)
      }
      await this.brandRepo.delete({ deleteById, id, isHard: false })
      return { message: 'Xóa thương hiệu thành công' }
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw new AppError('Bản ghi không tồn tại', 404)
      }
      throw error
    }
  }

  async upsertTranslation({
    brandId,
    languageId,
    userId,
    data,
  }: {
    brandId: number
    languageId: string
    userId: number
    data: UpsertBrandTranslationType
  }) {
    await this.findById(brandId, languageId)
    return this.brandRepo.upsertTranslation({ brandId, languageId, userId, data })
  }
}