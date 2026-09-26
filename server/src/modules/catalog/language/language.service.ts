import { LanguageRepo } from './language.repo'
import { CreateLanguageBodyType, UpdateLanguageBodyType } from './language.schema'
import { AppError, isUniqueConstraintPrismaError } from '@/common/errors'


export class LanguageService {
  constructor(private languageRepo = new LanguageRepo()) {}

  async findAll() {
    return this.languageRepo.findAll()
  }

  async findById(id: string) {
    const language = await this.languageRepo.findById(id)
    if (!language) {
      throw new AppError('Ngôn ngữ không tồn tại', 404)
    }
    return language
  }

  async create(createdById: number, data: CreateLanguageBodyType) {
    try {
      return await this.languageRepo.create({ createdById, data })
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw new AppError('Mã ngôn ngữ đã tồn tại', 422)
      }
      throw error
    }
  }

  async update({ updateById, id, data }: { updateById: number; id: string; data: UpdateLanguageBodyType }) {
    await this.findById(id)
    return this.languageRepo.update({ updateById, id, data })
  }

  async delete(deleteById: number, id: string) {
    await this.findById(id)
    await this.languageRepo.delete({ deleteById, id, isHard: true })
    return { message: 'Xóa ngôn ngữ thành công' }
  }
}