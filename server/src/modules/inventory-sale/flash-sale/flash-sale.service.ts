import { FlashSaleRepo } from './flash-sale.repo'
import {
    CreateFlashSaleBodyType,
    GetFlashSaleQueryType,
    UpdateFlashSaleBodyType,
} from './flash-sale.schema'
import { AppError } from '@/common/errors'

export class FlashSaleService {
    constructor(private flashSaleRepo = new FlashSaleRepo()) { }

    async list(query: GetFlashSaleQueryType) {
        return this.flashSaleRepo.list(query)
    }

    async findActiveCampaigns() {
        return this.flashSaleRepo.findActiveCampaigns()
    }

    async findById(campaignId: number) {
        const campaign = await this.flashSaleRepo.findById(campaignId)
        if (!campaign) {
            throw new AppError('Chiến dịch Flash Sale không tồn tại hoặc đã bị xóa', 404)
        }
        return campaign
    }

    private validateUniqueVariantIds(items: { variantId: number }[]) {
        const variantIds = items.map((item) => item.variantId)
        if (new Set(variantIds).size !== variantIds.length) {
            throw new AppError('Không được có sản phẩm trùng trong cùng một Flash Sale', 422)
        }
    }

    private async validateVariants(
        items: { variantId: number; promoQuantity: number; flashSalePrice: number }[]
    ) {
        this.validateUniqueVariantIds(items)

        const variantIds = items.map((item) => item.variantId)
        const variants = await this.flashSaleRepo.findVariantsForFlashSale(variantIds)
        const variantMap = new Map(variants.map((v) => [v.id, v]))

        for (const item of items) {
            const variant = variantMap.get(item.variantId)
            if (!variant) {
                throw new AppError(`Biến thể SKU ID ${item.variantId} không tồn tại hoặc sản phẩm đã ngừng bán`, 404)
            }

            if (variant.stockQuantity < item.promoQuantity) {
                throw new AppError(
                    `Tồn kho SKU ${variant.sku} không đủ. Tồn kho: ${variant.stockQuantity}, yêu cầu: ${item.promoQuantity}`,
                    422
                )
            }

            if (item.flashSalePrice >= Number(variant.sellingPrice)) {
                throw new AppError(
                    `Giá Flash Sale của SKU ${variant.sku} phải nhỏ hơn giá niêm yết (${variant.sellingPrice})`,
                    422
                )
            }

            if (item.promoQuantity <= 0 || item.flashSalePrice <= 0) {
                throw new AppError('Số lượng và giá khuyến mãi phải lớn hơn 0', 422)
            }
        }
    }

    // Kiểm tra xung đột khung giờ Flash Sale với các campaign khác
    private async checkTimeOverlap(
        variantIds: number[],
        startTime: Date,
        endTime: Date,
        excludeCampaignId?: number
    ) {
        if (variantIds.length === 0) return

        const conflicts = await this.flashSaleRepo.findConflictingCampaigns(
            variantIds,
            startTime,
            endTime,
            excludeCampaignId
        )
        if (conflicts.length > 0) {
            throw new AppError(
                `Một số sản phẩm đã nằm trong chiến dịch khác ("${conflicts[0].name}") trong khung giờ này`,
                409
            )
        }
    }

    async create(data: CreateFlashSaleBodyType) {
        const start = new Date(data.startTime)
        const end = new Date(data.endTime)
        const now = new Date()

        if (start >= end) {
            throw new AppError('Thời gian kết thúc phải sau thời gian bắt đầu', 422)
        }
        if (start < now) {
            throw new AppError('Thời gian bắt đầu chiến dịch không được ở quá khứ', 422)
        }
        if (end <= now) {
            throw new AppError('Không thể tạo chiến dịch kết thúc trong quá khứ', 422)
        }

        await this.validateVariants(data.items)
        const variantIds = data.items.map((i) => i.variantId)
        await this.checkTimeOverlap(variantIds, start, end)

        return this.flashSaleRepo.create(data)
    }

    async update(campaignId: number, data: UpdateFlashSaleBodyType) {
        // 1. Tìm campaign
        const campaign = await this.findById(campaignId)
        const now = new Date()

        // 2. Xác định startTime / endTime mới
        const startTime = data.startTime ? new Date(data.startTime) : new Date(campaign.startTime)
        const endTime = data.endTime ? new Date(data.endTime) : new Date(campaign.endTime)

        // 3. Validate time
        if (startTime >= endTime) {
            throw new AppError('Thời gian kết thúc phải sau thời gian bắt đầu', 422)
        }

        // Chặn lùi startTime về quá khứ nếu truyền startTime mới
        if (data.startTime && startTime < now) {
            throw new AppError('Thời gian bắt đầu cập nhật không được nằm trong quá khứ', 422)
        }

        // Chặn sửa endTime về quá khứ
        if (data.endTime && endTime <= now) {
            throw new AppError('Thời gian kết thúc cập nhật không được nằm trong quá khứ', 422)
        }

        const isRunning = campaign.isActive && new Date(campaign.startTime) <= now && now <= new Date(campaign.endTime)

        // Nếu đang chạy: không cho phép thay đổi startTime
        if (isRunning && data.startTime && new Date(data.startTime).getTime() !== new Date(campaign.startTime).getTime()) {
            throw new AppError('Không thể sửa thời gian bắt đầu của chiến dịch đang diễn ra', 400)
        }

        // 4. Xác định variantIds áp dụng (nếu gửi items mới thì dùng items mới, ngược lại lấy items hiện có của campaign)
        const effectiveVariantIds = data.items !== undefined
            ? data.items.map((item) => item.variantId)
            : campaign.items.map((item) => item.variantId)

        // 5. Check overlap (LUÔN CHẠY: Dù chỉ update thời gian hay update items đều được kiểm tra)
        await this.checkTimeOverlap(effectiveVariantIds, startTime, endTime, campaignId)

        // 6. Nếu có cập nhật items → validate items & check soldQuantity
        if (data.items !== undefined) {
            if (isRunning) {
                const existingVariantIds = campaign.items.map((item) => item.variantId)
                const isSameItemsLength = existingVariantIds.length === effectiveVariantIds.length
                const hasAllExistingItems = existingVariantIds.every((id) => effectiveVariantIds.includes(id))

                if (!isSameItemsLength || !hasAllExistingItems) {
                    throw new AppError('Không thể thêm, bớt hoặc đổi sản phẩm khi chiến dịch đang diễn ra', 400)
                }
            }

            await this.validateVariants(data.items)

            const existingItemMap = new Map(campaign.items.map((item) => [item.variantId, item]))
            for (const item of data.items) {
                const existingItem = existingItemMap.get(item.variantId)
                if (existingItem && item.promoQuantity < existingItem.soldQuantity) {
                    throw new AppError(
                        `Không thể giảm số lượng sale của variant ${item.variantId} xuống ${item.promoQuantity} vì đã bán ${existingItem.soldQuantity}`,
                        422
                    )
                }
            }
        }

        // 7. Thực hiện cập nhật
        return this.flashSaleRepo.update(campaignId, data)
    }

    // Đóng chiến dịch ngay lập tức (Loại bỏ `as any` bằng cách định nghĩa trực tiếp vào Repo hoặc gọi hàm riêng)
    async endCampaign(campaignId: number) {
        await this.findById(campaignId)

        return this.flashSaleRepo.update(campaignId, {
            isActive: false,
            endTime: new Date(),
        })
    }

    async delete(campaignId: number) {
        const campaign = await this.findById(campaignId)
        const now = new Date()

        // Chặn xóa nếu đang chạy
        if (campaign.isActive && new Date(campaign.startTime) <= now && now <= new Date(campaign.endTime)) {
            throw new AppError('Không thể xóa chiến dịch đang diễn ra. Vui lòng dừng chiến dịch trước.', 400)
        }

        // Chặn xóa nếu đã có sản phẩm bán được để bảo toàn dữ liệu báo cáo
        const hasSoldItems = campaign.items.some((item) => item.soldQuantity > 0)
        if (hasSoldItems) {
            throw new AppError('Chiến dịch đã có đơn hàng được bán, chỉ có thể vô hiệu hóa chứ không thể xóa', 400)
        }

        await this.flashSaleRepo.delete(campaignId)
        return { message: 'Xóa chiến dịch Flash Sale thành công' }
    }
}