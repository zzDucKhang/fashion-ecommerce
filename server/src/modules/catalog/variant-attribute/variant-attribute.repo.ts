import { prisma } from '@/database/prisma'
import { SyncProductVariantsBodyType } from './variant-attribute.schema'
import { Decimal } from '@prisma/client/runtime/library'
import { Prisma } from '@prisma/client'
import { AppError } from '@/common/errors'

export class VariantAttributeRepo {
  async getByProductId(productId: number) {
    return prisma.productVariant.findMany({
      where: { productId, deletedAt: null },
      orderBy: { id: 'asc' },
    })
  }

  async findById(variantId: number) {
    return prisma.productVariant.findFirst({
      where: { id: variantId, deletedAt: null },
      include: { product: true },
    })
  }

  async syncVariants(data: SyncProductVariantsBodyType, updatedById: number) {
    const { productId, variants } = data

    return prisma.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT id FROM "Product" WHERE id = ${productId} FOR UPDATE`

      const existingVariants = await tx.productVariant.findMany({
        where: { productId, deletedAt: null },
      })

      const existingVariantIds = existingVariants.map((v) => v.id)
      if (existingVariantIds.length > 0) {
        await tx.$queryRaw`SELECT id FROM "ProductVariant" WHERE id IN (${Prisma.join(existingVariantIds)}) FOR UPDATE`
      }

      const payloadSkus = new Set(variants.map((v) => v.sku))
      const variantsToSoftDelete = existingVariants.filter((ev) => !payloadSkus.has(ev.sku))
      const idsToDelete = variantsToSoftDelete.map((v) => v.id)

      if (idsToDelete.length > 0) {
        await tx.productVariant.updateMany({
          where: { id: { in: idsToDelete } },
          data: { deletedAt: new Date() },
        })
      }

      const finalVariants = await Promise.all(
        variants.map(async (item) => {
          const matchedExisting = existingVariants.find((ev) => ev.sku === item.sku)

          if (matchedExisting) {
            return tx.productVariant.update({
              where: { id: matchedExisting.id },
              data: {
                originalPrice: new Decimal(item.originalPrice),
                sellingPrice: new Decimal(item.sellingPrice),
                stockQuantity: item.stockQuantity,
                weightGram: item.weightGram,
                imageUrl: item.imageUrl,
                variant: item.variant,
                variantValue: item.variantValue,
              },
            })
          } else {
            return tx.productVariant.create({
              data: {
                productId,
                sku: item.sku,
                originalPrice: new Decimal(item.originalPrice),
                sellingPrice: new Decimal(item.sellingPrice),
                stockQuantity: item.stockQuantity,
                weightGram: item.weightGram,
                imageUrl: item.imageUrl,
                variant: item.variant,
                variantValue: item.variantValue,
              },
            })
          }
        })
      );

      return finalVariants
    })
  }

  async updateStockWithOptimistic(variantId: number, quantityChange: number) {
    return prisma.$transaction(async (tx) => {
      const current = await tx.productVariant.findUnique({
        where: { id: variantId, deletedAt: null },
      })

      if (!current) throw new AppError('Biến thể không tồn tại', 404)
      if (quantityChange < 0 && current.stockQuantity < Math.abs(quantityChange)) {
        throw new AppError('Số lượng tồn kho không đủ để khấu trừ', 400)
      }

      try {
        return await tx.productVariant.update({
          where: {
            id: variantId,
            updatedAt: current.updatedAt,
            ...(quantityChange < 0 && { stockQuantity: { gte: Math.abs(quantityChange) } }),
          },
          data: { stockQuantity: { increment: quantityChange } },
        })
      } catch (err: any) {
        if (err.code === 'P2025') {
          throw new AppError('Xung đột phiên bản dữ liệu (Version Conflict). Vui lòng thử lại!', 409)
        }
        throw err
      }
    })
  }
}