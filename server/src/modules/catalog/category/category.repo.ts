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
        parentId: parentCategoryId ?? null,
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

  
}