import { prisma } from '@/database/prisma'
import {
  CreateBrandBodyType,
  GetBrandQueryType,
  UpdateBrandBodyType,
  UpsertBrandTranslationType,
} from './brand.schema'
import { ALL_LANGUAGE_CODE } from '@/common/helpers/prisma-error'

export class BrandRepo {
  async list(pagination: GetBrandQueryType, languageId?: string) {
    const skip = (pagination.page - 1) * pagination.limit
    const take = pagination.limit

    const [totalItems, data] = await Promise.all([
      prisma.brand.count({
        where: { deletedAt: null },
      }),
      prisma.brand.findMany({
        where: { deletedAt: null },
        skip,
        take,
        include: {
          brandTranslations: {
            where:
              languageId === ALL_LANGUAGE_CODE
                ? { deletedAt: null }
                : { deletedAt: null, languageId },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
    ])

    return {
      data,
      totalItems,
      page: pagination.page,
      limit: pagination.limit,
      totalPages: Math.ceil(totalItems / pagination.limit),
    }
  }

  async findById(brandId: number, languageId?: string) {
    return prisma.brand.findUnique({
      where: { id: brandId, deletedAt: null },
      include: {
        brandTranslations: {
          where:
            languageId === ALL_LANGUAGE_CODE
              ? { deletedAt: null }
              : { deletedAt: null, languageId },
          include: { language: true },
        },
      },
    })
  }

  async create({ createdById, data }: { createdById: number; data: CreateBrandBodyType }) {
    return prisma.brand.create({
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
    id: number
    data: UpdateBrandBodyType
  }) {
    return prisma.brand.update({
      where: { id, deletedAt: null },
      data: {
        ...data,
        updatedById: updateById,
      },
    })
  }

  // Xóa mềm chuẩn lưu vết deletedById và cờ isHard từ project mẫu
  async delete({
    deleteById,
    id,
    isHard = false,
  }: {
    deleteById: number
    id: number
    isHard?: boolean
  }) {
    return isHard
      ? prisma.brand.delete({
          where: { id },
        })
      : prisma.brand.update({
          where: { id, deletedAt: null },
          data: {
            deletedById: deleteById,
            deletedAt: new Date(),
          },
        })
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
    const existing = await prisma.brandTranslation.findFirst({
      where: { brandId, languageId, deletedAt: null },
    })

    if (existing) {
      return prisma.brandTranslation.update({
        where: { id: existing.id },
        data: {
          ...data,
          updatedById: userId,
        },
      })
    }

    return prisma.brandTranslation.create({
      data: {
        ...data,
        brandId,
        languageId,
        createdById: userId,
      },
    })
  }
}