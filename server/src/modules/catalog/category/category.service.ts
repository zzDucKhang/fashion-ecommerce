import { CategoryRepo } from './category.repo'
import {
  CreateCategoryBodyType,
  GetAllCategoriesQueryType,
  UpdateCategoryBodyType,
  UpsertCategoryTranslationType,
} from './category.schema'
import { AppError } from '@/common/errors'
import { isNotFoundPrismaError, isUniqueConstraintPrismaError } from '@/common/helpers/prisma-error'

export class CategoryService {
  constructor(private categoryRepo = new CategoryRepo()) {}

  async findAll(query: GetAllCategoriesQueryType) {
    return this.categoryRepo.findAll({
      parentCategoryId: query.parentCategoryId,
      languageId: query.lang,
    })
  }

  async findById(id: number, languageId?: string) {
    const category = await this.categoryRepo.findById({ id, languageId })
    if (!category) {
      throw new AppError('Danh mục không tồn tại hoặc đã bị xóa', 404)
    }
    return category
  }

  async create({ data, createdById }: { data: CreateCategoryBodyType; createdById: number }) {
    try {
      return await this.categoryRepo.create({ createdById, data })
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw new AppError('Danh mục đã tồn tại', 422)
      }
      throw error
    }
  }

  async update({
    id,
    data,
    updatedById,
  }: {
    id: number
    data: UpdateCategoryBodyType
    updatedById: number
  }) {
    try {
      await this.findById(id)
      return await this.categoryRepo.update({ id, updatedById, data })
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw new AppError('Bản ghi không tồn tại để cập nhật', 404)
      }
      throw error
    }
  }

  async delete({ id, deletedById }: { id: number; deletedById: number }) {
    try {
      await this.findById(id)
      await this.categoryRepo.delete({ id, deletedById, isHard: false })
      return { message: 'Xóa danh mục thành công' }
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw new AppError('Bản ghi không tồn tại để xóa', 404)
      }
      throw error
    }
  }

  async upsertTranslation({
    categoryId,
    languageId,
    userId,
    data,
  }: {
    categoryId: number
    languageId: string
    userId: number
    data: UpsertCategoryTranslationType
  }) {
    await this.findById(categoryId, languageId)
    return this.categoryRepo.upsertTranslation({ categoryId, languageId, userId, data })
  }
}