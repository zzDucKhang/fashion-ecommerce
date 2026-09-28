import { InventoryRepo } from './inventory.repo'
import {
    AdjustStockBodyType,
    GetInventoryLogsQueryType,
} from './inventory.schema'
import { AppError } from '@/common/errors'

export class InventoryService {
    constructor(private inventoryRepo = new InventoryRepo()) { }

    async getStock(variantId: number) {
        const variant = await this.inventoryRepo.getVariantStock(variantId)

        if (!variant) {
            throw new AppError(
                'Biến thể sản phẩm không tồn tại hoặc đã bị xóa',
                404
            )
        }

        return variant
    }

    async listLogs(query: GetInventoryLogsQueryType) {
        if (query.variantId !== undefined) {
            await this.getStock(query.variantId)
        }

        return this.inventoryRepo.listLogs(query)
    }

    async adjustStock(data: AdjustStockBodyType) {
        const result = await this.inventoryRepo.adjustStock(data)

        if (result) {
            return result
        }


        const variant = await this.inventoryRepo.getVariantStock(
            data.variantId
        )

        if (!variant) {
            throw new AppError(
                'Biến thể sản phẩm không tồn tại hoặc đã bị xóa',
                404
            )
        }

        if (data.quantityChange < 0) {
            throw new AppError(
                `Số lượng tồn kho không đủ. Tồn hiện tại: ${variant.stockQuantity}, yêu cầu trừ: ${Math.abs(data.quantityChange)}`,
                422
            )
        }

        throw new AppError(
            'Không thể điều chỉnh tồn kho',
            422
        )
    }
}