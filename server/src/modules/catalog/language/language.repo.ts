import { prisma } from '@/database/prisma'
import { CreateLanguageBodyType, UpdateLanguageBodyType } from './language.schema'

export class LanguageRepo {
  async findAll() {
    const data = await prisma.language.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'asc' },
    })
    return { data, totalItems: data.length }
  }

  async findById(id: string) {
    return prisma.language.findUnique({
      where: { id, deletedAt: null },
    })
  }

  async create({ createdById, data }: { createdById: number; data: CreateLanguageBodyType }) {
    return prisma.language.create({
      data: {
        ...data,
        createdById,
      },
    })
  }

  async update({
    updateById,
    id,
    data,
  }: {
    updateById: number
    id: string
    data: UpdateLanguageBodyType
  }) {
    return prisma.language.update({
      where: { id, deletedAt: null },
      data: {
        ...data,
        updatedById,
      },
    })
  }

  async delete({
    deleteById,
    id,
    isHard = true, // Vì mã string dùng làm FK nên dự án gốc cho phép xóa cứng nếu cần
  }: {
    deleteById: number
    id: string
    isHard?: boolean
  }) {
    return isHard
      ? prisma.language.delete({ where: { id } })
      : prisma.language.update({
          where: { id, deletedAt: null },
          data: {
            deletedById,
            deletedAt: new Date(),
          },
        })
  }
}