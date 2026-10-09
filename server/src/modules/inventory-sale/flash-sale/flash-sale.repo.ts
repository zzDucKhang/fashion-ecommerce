import { prisma } from '@/database/prisma'
import {CreateFlashSaleBodyType,GetFlashSaleQueryType,UpdateFlashSaleBodyType,} from './flash-sale.schema'

const flashSaleItemsInclude = {
    items: {
        include: {
            variant: {
                select: {
                    sku: true,
                    stockQuantity: true,
                    originalPrice: true,
                    sellingPrice: true,
                    product: {
                        select: {
                            defaultName: true,
                        },
                    },
                },
            },
        },
    },
} as const

export class FlashSaleRepo {
    async list(query: GetFlashSaleQueryType) {
        const skip = (query.page - 1) * query.limit
        const take = query.limit

        const where = {
            deletedAt: null,
            ...(query.isActive !== undefined
                ? { isActive: query.isActive }
                : {}),
        }

        const [totalItems, data] = await Promise.all([
            prisma.flashSaleCampaign.count({
                where,
            }),

            prisma.flashSaleCampaign.findMany({
                where,
                skip,
                take,
                include: flashSaleItemsInclude,
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
            totalPages: Math.ceil(
                totalItems / query.limit
            ),
        }
    }

    async findActiveCampaigns() {
        const now = new Date()

        return prisma.flashSaleCampaign.findMany({
            where: {
                deletedAt: null,
                isActive: true,
                startTime: {
                    lte: now,
                },
                endTime: {
                    gte: now,
                },
            },

            include: flashSaleItemsInclude,

            orderBy: {
                endTime: 'asc',
            },
        })
    }

    async findById(campaignId: number) {
        return prisma.flashSaleCampaign.findFirst({
            where: {
                id: campaignId,
                deletedAt: null,
            },

            include: flashSaleItemsInclude,
        })
    }

    async findVariantsForFlashSale(
        variantIds: number[]
    ) {
        return prisma.productVariant.findMany({
            where: {
                id: {
                    in: variantIds,
                },
                deletedAt: null,
            },

            select: {
                id: true,
                sku: true,
                stockQuantity: true,
                sellingPrice: true,
            },
        })
    }

    async create(data: CreateFlashSaleBodyType) {
        const { items, ...campaignData } = data

        return prisma.flashSaleCampaign.create({
            data: {
                ...campaignData,

                items: {
                    create: items.map((item) => ({
                        variantId: item.variantId,
                        flashSalePrice: item.flashSalePrice,
                        promoQuantity: item.promoQuantity,
                        soldQuantity: 0,
                    })),
                },
            },

            include: flashSaleItemsInclude,
        })
    }

    async update(
        campaignId: number,
        data: UpdateFlashSaleBodyType
    ) {
        const { items, ...campaignData } = data

        return prisma.$transaction(async (tx) => {
            if (items !== undefined) {

                const existingItems =
                    await tx.flashSaleItem.findMany({
                        where: {
                            campaignId,
                        },

                        select: {
                            variantId: true,
                            soldQuantity: true,
                        },
                    })

                const soldQuantityMap = new Map(
                    existingItems.map((item) => [
                        item.variantId,
                        item.soldQuantity,
                    ])
                )

                const incomingVariantIds =
                    items.map((item) => item.variantId)

                await tx.flashSaleItem.deleteMany({
                    where: {
                        campaignId,

                        variantId: {
                            notIn: incomingVariantIds,
                        },
                    },
                })


                await Promise.all(
                    items.map((item) => {
                        const soldQuantity = soldQuantityMap.get(item.variantId) ?? 0;

                        return tx.flashSaleItem.upsert({
                            where: {
                                campaignId_variantId: { campaignId, variantId: item.variantId },
                            },
                            update: {
                                flashSalePrice: item.flashSalePrice,
                                promoQuantity: item.promoQuantity,
                                soldQuantity,
                            },
                            create: {
                                campaignId,
                                variantId: item.variantId,
                                flashSalePrice: item.flashSalePrice,
                                promoQuantity: item.promoQuantity,
                                soldQuantity: 0,
                            },
                        });
                    })
                );
            }

            return tx.flashSaleCampaign.update({
                where: {
                    id: campaignId,
                },

                data: campaignData,

                include: flashSaleItemsInclude,
            })
        })
    }

    async delete(
        campaignId: number,
        isHard = false
    ) {
        if (isHard) {
            return prisma.flashSaleCampaign.delete({
                where: {
                    id: campaignId,
                },
            })
        }

        return prisma.flashSaleCampaign.update({
            where: {
                id: campaignId,
            },

            data: {
                deletedAt: new Date(),
            },
        })
    }
}