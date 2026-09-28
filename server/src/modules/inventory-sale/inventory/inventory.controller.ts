import { Request, Response, NextFunction } from 'express'
import { InventoryService } from './inventory.service'
import {
    AdjustStockBodyType,
    GetInventoryLogsQueryType,
    GetInventoryParamsType
} from './inventory.schema'

export class InventoryController {
    constructor(private inventoryService = new InventoryService()) { }

    getStock = async (
        req: Request<GetInventoryParamsType, unknown, unknown, unknown>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const variantId = Number(req.params.variantId)
            const data = await this.inventoryService.getStock(variantId)
            return res.status(200).json({ statusCode: 200, data })
        } catch (err) {
            next(err)
        }
    }

    listLogs = async (
        req: Request<unknown, unknown, unknown, GetInventoryLogsQueryType>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const query = req.query as unknown as GetInventoryLogsQueryType
            const result = await this.inventoryService.listLogs(query)
            return res.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }

    adjustStock = async (
        req: Request<unknown, unknown, AdjustStockBodyType, unknown>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const body = req.body as AdjustStockBodyType
            const data = await this.inventoryService.adjustStock(body)
            return res.status(200).json({
                statusCode: 200,
                message: 'Điều chỉnh tồn kho thành công',
                data,
            })
        } catch (err) {
            next(err)
        }
    }
}