import { prisma } from '@/database/prisma'
import {
  CreateCategoryBodyType,
  GetAllCategoriesQueryType,
  UpdateCategoryBodyType,
  UpsertCategoryTranslationType,
} from './category.schema'
import { ALL_LANGUAGE_CODE } from '@/common/helpers'

export class CategoryRepo {
  async findAll({
    parentCategoryId,
    languageId,
  }: {
    parentCategoryId?: number | null
    languageId?: string
  }) {
    const categories = await prisma.category.findMany({
      where: {
        deletedAt: null,
        parentCategoryId: parentCategoryId ?? null,
      },
      include: {
        categoryTranslations: {
          where:
            languageId === ALL_LANGUAGE_CODE
              ? { deletedAt: null }
              : { deletedAt: null, languageId },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return {
      data: categories,
      totalItems: categories.length,
    }
  }

  async findById({ id, languageId }: { id: number; languageId?: string }) {
    return prisma.category.findUnique({
      where: { id, deletedAt: null },
      include: {
        categoryTranslations: {
          where:
            languageId === ALL_LANGUAGE_CODE
              ? { deletedAt: null }
              : { deletedAt: null, languageId },
        },
      },
    })
  }

  async create({
    createdById,
    data,
  }: {
    createdById: number
    data: CreateCategoryBodyType
  }) {
    return prisma.category.create({
      data: {
        ...data,
        createdById,
      },
      include: {
        categoryTranslations: { where: { deletedAt: null } },
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
    data: UpdateCategoryBodyType
  }) {
    return prisma.category.update({
      where: { id, deletedAt: null },
      data: {
        ...data,
        updatedById,
      },
      include: {
        categoryTranslations: { where: { deletedAt: null } },
      },
    })
  }

  // Soft delete lưu vết deletedById
  async delete({
    id,
    deletedById,
    isHard = false,
  }: {
    id: number
    deletedById: number
    isHard?: boolean
  }) {
    return isHard
      ? prisma.category.delete({
          where: { id },
        })
      : prisma.category.update({
          where: { id, deletedAt: null },
          data: {
            deletedAt: new Date(),
            deletedById,
          },
        })
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
    const existing = await prisma.categoryTranslation.findFirst({
      where: { categoryId, languageId, deletedAt: null },
    })

    if (existing) {
      return prisma.categoryTranslation.update({
        where: { id: existing.id },
        data: {
          ...data,
          updatedById: userId,
        },
      })
    }

    return prisma.categoryTranslation.create({
      data: {
        ...data,
        categoryId,
        languageId,
        createdById: userId,
      },
    })
  }
}