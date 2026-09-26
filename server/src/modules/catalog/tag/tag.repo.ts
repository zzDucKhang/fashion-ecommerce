import { prisma } from '@/database/prisma'
import { CreateTagInput, UpdateTagInput } from './tag.schema'

export class TagRepo {
  async findAll() {
    return prisma.tag.findMany({
      orderBy: { id: 'desc' },
    })
  }

  async findById(id: number) {
    return prisma.tag.findUnique({
      where: { id },
    })
  }

  async create(data: CreateTagInput) {
    return prisma.tag.create({
      data,
    })
  }

  async update(id: number, data: UpdateTagInput) {
    return prisma.tag.update({
      where: { id },
      data,
    })
  }

  async delete(id: number) {
    return prisma.tag.delete({
      where: { id },
    })
  }
}