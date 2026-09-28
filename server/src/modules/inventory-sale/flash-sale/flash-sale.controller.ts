import { Request, Response, NextFunction } from 'express'
import { FlashSaleService } from './flash-sale.service'
import {
    CreateFlashSaleBodyType, GetFlashSaleParamsType, GetFlashSaleQueryType, UpdateFlashSaleBodyType,
} from './flash-sale.schema'

export class FlashSaleController {
    constructor(private flashSaleService = new FlashSaleService()) { }

    list = async (req: Request<unknown, unknown, unknown, GetFlashSaleQueryType>, res: Response, next: NextFunction) => {
        try {
            const query = req.query as unknown as GetFlashSaleQueryType
            const result = await this.flashSaleService.list(query)
            return res.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }

    findActive = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await this.flashSaleService.findActiveCampaigns()
            return res.status(200).json({ statusCode: 200, data })
        } catch (err) {
            next(err)
        }
    }

    findById = async (req: Request<GetFlashSaleParamsType, unknown, unknown, unknown>, res: Response, next: NextFunction) => {
        try {
            const campaignId = Number(req.params.campaignId)
            const data = await this.flashSaleService.findById(campaignId)
            return res.status(200).json({ statusCode: 200, data })
        } catch (err) {
            next(err)
        }
    }

    create = async (
        req: Request<unknown, unknown, CreateFlashSaleBodyType, unknown>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const body = req.body as CreateFlashSaleBodyType
            const data = await this.flashSaleService.create(body)
            return res.status(201).json({
                statusCode: 201,
                message: 'Tạo chiến dịch Flash Sale thành công',
                data,
            })
        } catch (err) {
            next(err)
        }
    }

    update = async (
        req: Request<GetFlashSaleParamsType, unknown, UpdateFlashSaleBodyType, unknown>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const campaignId = Number(req.params.campaignId)
            const body = req.body as UpdateFlashSaleBodyType
            const data = await this.flashSaleService.update(campaignId, body)
            return res.status(200).json({
                statusCode: 200,
                message: 'Cập nhật chiến dịch Flash Sale thành công',
                data,
            })
        } catch (err) {
            next(err)
        }
    }

    delete = async (
        req: Request<GetFlashSaleParamsType, unknown, unknown, unknown>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const campaignId = Number(req.params.campaignId)
            const result = await this.flashSaleService.delete(campaignId)
            return res.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }
}