import { prisma } from '@/database/prisma'
import { SyncProductVariantsBodyType } from './variant-attribute.schema'
import { Decimal } from '@prisma/client/runtime/library'
import { Prisma } from '@prisma/client'
import { AppError } from '@/common/errors'

export class VariantAttributeRepo {
  async getByProductId(productId: number) {
    return prisma.productVariant.findMany({
      where: {
        productId,
        deletedAt: null,
      },
      include: {
        attributeValues: {
          include: {
            attribute: true,
          },
        },
      },
      orderBy: { id: 'asc' },
    })
  }

  async findById(variantId: number) {
    return prisma.productVariant.findFirst({
      where: { id: variantId, deletedAt: null },
      include: {
        attributeValues: {
          include: {
            attribute: true,
          },
        },
        product: true,
      },
    })
  }

  /**
   * Đồng bộ toàn bộ Ma trận Biến thể với PESSIMISTIC LOCK. như thêm/bớt màu sắc, size, đổi giá, đổi số lượng tồn kho
   */
  async syncVariants(data: SyncProductVariantsBodyType, updatedById: number) {
    const { productId, attributes, variants } = data

    return prisma.$transaction(async (tx) => {
      // 1. KHÓA BI QUAN (PESSIMISTIC LOCK): Khóa dòng Product để ngăn tiến trình khác cùng lúc sửa variant của Product này
      await tx.$queryRaw`SELECT id FROM "Product" WHERE id = ${productId} FOR UPDATE`

      // 2. Tạo hoặc lấy Attribute và AttributeValue
      const attrValueIdMap = new Map<string, number>()

      for (const attr of attributes) {
        const attributeRecord = await tx.attribute.upsert({
          where: { name: attr.name },
          update: {},
          create: { name: attr.name },
        })

        for (const opt of attr.options) {
          const valRecord = await tx.attributeValue.upsert({
            where: {
              attributeId_value: {
                attributeId: attributeRecord.id,
                value: opt,
              },
            },
            update: {},
            create: {
              attributeId: attributeRecord.id,
              value: opt,
            },
          })
          attrValueIdMap.set(`${attr.name}:${opt}`, valRecord.id)
        }
      }

      // 3. Khóa và lấy danh sách SKU hiện có trong Database
      const existingVariants = await tx.productVariant.findMany({
        where: { productId, deletedAt: null },
        include: { attributeValues: true },
      })

      const existingVariantIds = existingVariants.map((v) => v.id)
      if (existingVariantIds.length > 0) {
        // Khóa tất cả các dòng Variant hiện tại của sản phẩm này
        await tx.$queryRaw`SELECT id FROM "ProductVariant" WHERE id IN (${Prisma.join(existingVariantIds)}) FOR UPDATE`
      }

      // 4. Phân loại: Xóa mềm SKU bị loại bỏ khỏi ma trận
      const payloadSkus = new Set(variants.map((v) => v.sku))
      const variantsToSoftDelete = existingVariants.filter((ev) => !payloadSkus.has(ev.sku))
      const idsToDelete = variantsToSoftDelete.map((v) => v.id)

      if (idsToDelete.length > 0) {
        await tx.productVariant.updateMany({
          where: { id: { in: idsToDelete } },
          data: {
            deletedAt: new Date(),
          },
        })
      }

      // 5. Cập nhật SKU cũ hoặc Tạo mới SKU
      const finalVariants = []

      for (const item of variants) {
        const matchedExisting = existingVariants.find((ev) => ev.sku === item.sku)

        const connectAttrValueIds: { id: number }[] = []
        if (item.attributeValues && item.attributeValues.length > 0) {
          for (const av of item.attributeValues) {
            const id = attrValueIdMap.get(`${av.attributeName}:${av.value}`)
            if (id) connectAttrValueIds.push({ id })
          }
        }

        if (matchedExisting) {
          const updated = await tx.productVariant.update({
            where: { id: matchedExisting.id },
            data: {
              originalPrice: new Decimal(item.originalPrice),
              sellingPrice: new Decimal(item.sellingPrice),
              stockQuantity: item.stockQuantity,
              weightGram: item.weightGram,
              imageUrl: item.imageUrl,
              ...(connectAttrValueIds.length > 0 && {
                attributeValues: {
                  set: connectAttrValueIds,
                },
              }),
            },
          })
          finalVariants.push(updated)
        } else {
          const created = await tx.productVariant.create({
            data: {
              productId,
              sku: item.sku,
              originalPrice: new Decimal(item.originalPrice),
              sellingPrice: new Decimal(item.sellingPrice),
              stockQuantity: item.stockQuantity,
              weightGram: item.weightGram,
              imageUrl: item.imageUrl,
              attributeValues: {
                connect: connectAttrValueIds,
              },
            },
          })
          finalVariants.push(created)
        }
      }

      return finalVariants
    })
  }

  /**
   * Khấu trừ / Cộng kho dùng OPTIMISTIC LOCK (Khóa lạc quan) giống file order.repo.ts mẫu
   */
  async updateStockWithOptimistic(variantId: number, quantityChange: number) {
    return prisma.$transaction(async (tx) => {
      // 1. Đọc dữ liệu hiện tại
      const current = await tx.productVariant.findUnique({
        where: { id: variantId, deletedAt: null },
      })

      if (!current) {
        throw new AppError('Biến thể không tồn tại', 404)
      }

      // 2. Kiểm tra nếu là trừ kho thì số lượng còn đủ không
      if (quantityChange < 0 && current.stockQuantity < Math.abs(quantityChange)) {
        throw new AppError('Số lượng tồn kho không đủ để khấu trừ', 400)
      }

      // 3. Khóa lạc quan qua điều kiện updatedAt và stockQuantity
      try {
        return await tx.productVariant.update({
          where: {
            id: variantId,
            updatedAt: current.updatedAt, // Đảm bảo không bị sửa đổi giữa chừng
            ...(quantityChange < 0 && {
              stockQuantity: { gte: Math.abs(quantityChange) },
            }),
          },
          data: {
            stockQuantity: {
              increment: quantityChange,
            },
          },
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