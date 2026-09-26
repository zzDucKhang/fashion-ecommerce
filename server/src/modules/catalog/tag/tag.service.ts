import { TagRepo } from './tag.repo'
import { CreateTagBodyType, GetTagQueryType, UpdateTagBodyType } from './tag.schema'
import { AppError, isNotFoundPrismaError, isUniqueConstraintPrismaError } from '@/common/errors'


export class TagService {
  constructor(private tagRepo = new TagRepo()) {}

  async list(query: GetTagQueryType) {
    return this.tagRepo.list(query)
  }

  async findById(id: number) {
    const tag = await this.tagRepo.findById(id)
    if (!tag) {
      throw new AppError('Thẻ Tag không tồn tại hoặc đã bị xóa', 404)
    }
    return tag
  }

  async create(createdById: number, data: CreateTagBodyType) {
    try {
      return await this.tagRepo.create({ createdById, data })
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw new AppError('Tên thẻ Tag đã tồn tại', 422)
      }
      throw error
    }
  }

  async update({ id, updatedById, data }: { id: number; updatedById: number; data: UpdateTagBodyType }) {
    try {
      await this.findById(id)
      return await this.tagRepo.update({ id, updatedById, data })
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw new AppError('Tên thẻ Tag đã tồn tại', 422)
      }
      if (isNotFoundPrismaError(error)) {
        throw new AppError('Bản ghi không tồn tại để cập nhật', 404)
      }
      throw error
    }
  }

  async delete(deletedById: number, id: number) {
    try {
      await this.findById(id)
      await this.tagRepo.delete({ id, deletedById })
      return { message: 'Xóa thẻ Tag thành công' }
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw new AppError('Bản ghi không tồn tại để xóa', 404)
      }
      throw error
    }
  }
}