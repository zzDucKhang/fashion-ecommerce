import { prisma } from '@/database/prisma'
import { CreateTagBodyType, GetTagQueryType, UpdateTagBodyType } from './tag.schema'

export class TagRepo {
  async list(query: GetTagQueryType) {
    const skip = (query.page - 1) * query.limit
    const take = query.limit

    const where: any = { deletedAt: null }
    if (query.search) {
      where.name = { contains: query.search, mode: 'insensitive' }
    }

    const [totalItems, data] = await Promise.all([
      prisma.tag.count({ where }),
      prisma.tag.findMany({
        where,
        skip,
        take,
        orderBy: { id: 'desc' },
      }),
    ])

    return {
      data,
      totalItems,
      page: query.page,
      limit: query.limit,
      totalPages: Math.ceil(totalItems / query.limit),
    }
  }

  async findById(id: number) {
    return prisma.tag.findFirst({
      where: { id, deletedAt: null },
    })
  }

  async create({ createdById, data }: { createdById: number; data: CreateTagBodyType }) {
    return prisma.tag.create({
      data: {
        ...data,
        createdById,
      },
    })
  }

  async update({
    id,
    updatedById,
    data,
  }: {
    id: number
    updatedById: number
    data: UpdateTagBodyType
  }) {
    return prisma.tag.update({
      where: { id, deletedAt: null },
      data: {
        ...data,
        updatedById,
      },
    })
  }

  async delete({ id, deletedById }: { id: number; deletedById: number }) {
    return prisma.tag.update({
      where: { id, deletedAt: null },
      data: {
        deletedAt: new Date(),
        deletedById,
      },
    })
  }
}