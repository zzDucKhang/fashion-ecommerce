import { prisma } from '@/database/prisma'
import {
  CreateProductBodyType,
  GetProductQueryType,
  UpdateProductBodyType,
  UpsertProductTranslationType,
} from './product.schema'
import { ALL_LANGUAGE_CODE } from '@/common/helpers'


export class ProductRepo {
  async list(query: GetProductQueryType, languageId: string) {
    const skip = (query.page - 1) * query.limit
    const take = query.limit

    const where: any = { deletedAt: null }
    if (query.status) where.status = query.status
    if (query.categoryId) where.categoryId = query.categoryId
    if (query.brandId) where.brandId = query.brandId
    if (query.search) {
      where.defaultName = { contains: query.search, mode: 'insensitive' }
    }

    const [totalItems, data] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        skip,
        take,
        include: {
          category: { select: { id: true, defaultName: true } },
          brand: { select: { id: true, defaultName: true, logoUrl: true } },
          tags: { select: { id: true, name: true } },
          images: { orderBy: { displayOrder: 'asc' } },
          variants: {
            where: { deletedAt: null },
            select: { id: true, sku: true, originalPrice: true, sellingPrice: true, stockQuantity: true },
          },
         
        },
        orderBy: { createdAt: 'desc' },
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

  async findById(productId: number, languageId?: string) {
    return prisma.product.findFirst({
      where: { id: productId, deletedAt: null },
      include: {
        category: true,
        brand: true,
        tags: true,
        images: { orderBy: { displayOrder: 'asc' } },
        variants: { where: { deletedAt: null } },
       
      },
    })
  }

  async create({ createdById, data }: { createdById: number; data: CreateProductBodyType }) {
    const { images, tagIds, translations, ...rest } = data

    return prisma.product.create({
      data: {
        ...rest,
        createdById,
        images: images
          ? {
              create: images.map((url, index) => ({
                imageUrl: url,
                displayOrder: index,
              })),
            }
          : undefined,
        tags: tagIds
          ? {
              connect: tagIds.map((id) => ({ id })),
            }
          : undefined,
        translations: translations
          ? {
              create: translations.map((t) => ({
                ...t,
                createdById,
              })),
            }
          : undefined,
      },
      include: {
        images: true,
        tags: true,
        
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
    data: UpdateProductBodyType
  }) {
    const { images, tagIds, translations, ...rest } = data

    return prisma.product.update({
      where: { id, deletedAt: null },
      data: {
        ...rest,
        updatedById,
        ...(tagIds && {
          tags: {
            set: tagIds.map((tagId) => ({ id: tagId })),
          },
        }),
        ...(images && {
          images: {
            deleteMany: {},
            create: images.map((url, index) => ({
              imageUrl: url,
              displayOrder: index,
            })),
          },
        }),
      },
      include: {
        images: true,
        tags: true,
        translations: true,
      },
    })
  }

  async delete({ id, deletedById }: { id: number; deletedById: number }) {
    return prisma.product.update({
      where: { id, deletedAt: null },
      data: {
        deletedAt: new Date(),
        deletedById,
      },
    })
  }

  
}