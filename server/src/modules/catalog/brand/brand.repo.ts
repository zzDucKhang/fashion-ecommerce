import { prisma } from '@/database/prisma'
import {
  CreateBrandBodyType,
  GetBrandQueryType,
  UpdateBrandBodyType,
  UpsertBrandTranslationType,
} from './brand.schema'
import { ALL_LANGUAGE_CODE } from '@/common/helpers'


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
     
    })
  }

  async create({ createdById, data }: { createdById: number; data: CreateBrandBodyType }) {
    const { logo, ...rest } = data;
    
    return prisma.brand.create({
      data: {
        ...rest,
        logoUrl: logo, // Mapping logo -> logoUrl
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
    const { logo, ...rest } = data;

    return prisma.brand.update({
      where: { id, deletedAt: null },
      data: {
        ...rest,
        ...(logo !== undefined && { logoUrl: logo }),
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

  
}