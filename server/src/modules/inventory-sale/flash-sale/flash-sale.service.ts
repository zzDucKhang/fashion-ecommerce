import { FlashSaleRepo } from './flash-sale.repo'
import {
    CreateFlashSaleBodyType,
    GetFlashSaleQueryType,
    UpdateFlashSaleBodyType,
} from './flash-sale.schema'
import { AppError } from '@/common/errors'

export class FlashSaleService {
    constructor(
        private flashSaleRepo = new FlashSaleRepo()
    ) {}

    async list(query: GetFlashSaleQueryType) {
        return this.flashSaleRepo.list(query)
    }

    async findActiveCampaigns() {
        return this.flashSaleRepo.findActiveCampaigns()
    }

    async findById(campaignId: number) {
        const campaign =
            await this.flashSaleRepo.findById(campaignId)

        if (!campaign) {
            throw new AppError(
                'Chiến dịch Flash Sale không tồn tại hoặc đã bị xóa',
                404
            )
        }

        return campaign
    }

    private validateUniqueVariantIds(
        items: {
            variantId: number
        }[]
    ) {
        const variantIds =
            items.map((item) => item.variantId)

        if (
            new Set(variantIds).size !==
            variantIds.length
        ) {
            throw new AppError(
                'Không được có sản phẩm trùng trong Flash Sale',
                422
            )
        }
    }

    private async validateVariants(
        items: {
            variantId: number
            promoQuantity: number
            flashSalePrice: number
        }[]
    ) {
        this.validateUniqueVariantIds(items)

        const variantIds =
            items.map((item) => item.variantId)

        const variants =
            await this.flashSaleRepo.findVariantsForFlashSale(
                variantIds
            )

        const variantMap = new Map(
            variants.map((variant) => [
                variant.id,
                variant,
            ])
        )

        for (const item of items) {
            const variant =
                variantMap.get(item.variantId)

            if (!variant) {
                throw new AppError(
                    `Biến thể SKU ID ${item.variantId} không tồn tại`,
                    404
                )
            }

            if (
                variant.stockQuantity <
                item.promoQuantity
            ) {
                throw new AppError(
                    `Tồn kho SKU ${variant.sku} không đủ. Tồn kho hiện có: ${variant.stockQuantity}, cấu hình sale: ${item.promoQuantity}`,
                    422
                )
            }

            if (
                item.flashSalePrice >=
                Number(variant.sellingPrice)
            ) {
                throw new AppError(
                    `Giá Flash Sale của SKU ${variant.sku} phải thấp hơn giá bán hiện tại`,
                    422
                )
            }
        }
    }

    async create(
        data: CreateFlashSaleBodyType
    ) {
        await this.validateVariants(data.items)

        return this.flashSaleRepo.create(data)
    }

    async update(
        campaignId: number,
        data: UpdateFlashSaleBodyType
    ) {
        const campaign =
            await this.findById(campaignId)


        const startTime =
            data.startTime ??
            campaign.startTime

        const endTime =
            data.endTime ??
            campaign.endTime

        if (startTime >= endTime) {
            throw new AppError(
                'Thời gian kết thúc phải sau thời gian bắt đầu',
                422
            )
        }

        if (data.items !== undefined) {
            await this.validateVariants(
                data.items
            )

            const existingItemMap =
                new Map(
                    campaign.items.map((item) => [
                        item.variantId,
                        item,
                    ])
                )

            for (const item of data.items) {
                const existingItem =
                    existingItemMap.get(
                        item.variantId
                    )

                if (
                    existingItem &&
                    item.promoQuantity <
                        existingItem.soldQuantity
                ) {
                    throw new AppError(
                        `Không thể giảm số lượng khuyến mãi của variant ${item.variantId} xuống ${item.promoQuantity} vì đã bán ${existingItem.soldQuantity}`,
                        422
                    )
                }
            }
        }

        return this.flashSaleRepo.update(
            campaignId,
            data
        )
    }

    async delete(campaignId: number) {
        await this.findById(campaignId)

        await this.flashSaleRepo.delete(
            campaignId
        )

        return {
            message:
                'Xóa chiến dịch Flash Sale thành công',
        }
    }
}