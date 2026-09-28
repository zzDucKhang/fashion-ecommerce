import { prisma } from '@/database/prisma'
import { AdjustStockBodyType, GetInventoryLogsQueryType } from './inventory.schema'
import type { Prisma } from '@prisma/client'

export class InventoryRepo {
    async getVariantStock(variantId: number) {
        return prisma.productVariant.findUnique({
            where: { id: variantId, deletedAt: null },
            select: { id: true, sku: true, stockQuantity: true, productId: true },
        })
    }

    async listLogs(query: GetInventoryLogsQueryType) {
        const skip = (query.page - 1) * query.limit
        const take = query.limit

        const where: Prisma.InventoryLogWhereInput = {}

        if (query.variantId !== undefined) {
            where.variantId = query.variantId
        }

        if (query.transType !== undefined) {
            where.transType = query.transType
        }

        const [totalItems, data] = await Promise.all([
            prisma.inventoryLog.count({ where }),

            prisma.inventoryLog.findMany({
                where,
                skip,
                take,
                include: {
                    variant: {
                        select: {
                            sku: true,
                            product: {
                                select: {
                                    defaultName: true,
                                },
                            },
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
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

    async adjustStock(data: AdjustStockBodyType) {
        return prisma.$transaction(async (tx) => {
            const minimumStock = Math.max(0, -data.quantityChange)

            const result = await tx.productVariant.updateMany({
                where: {
                    id: data.variantId,
                    deletedAt: null,
                    stockQuantity: {
                        gte: minimumStock,
                    },
                },
                data: {
                    stockQuantity: {
                        increment: data.quantityChange,
                    },
                },
            })

            if (result.count === 0) {
                return null
            }

            const updatedVariant = await tx.productVariant.findUnique({
                where: {
                    id: data.variantId,
                },
                select: {
                    id: true,
                    sku: true,
                    stockQuantity: true,
                    productId: true,
                },
            })

            if (!updatedVariant) {
                return null
            }

            const log = await tx.inventoryLog.create({
                data: {
                    variantId: data.variantId,
                    transType: data.transType,
                    quantityChange: data.quantityChange,
                    note: data.note,
                },
            })

            return {
                variant: updatedVariant,
                log,
            }
        })
    }
}