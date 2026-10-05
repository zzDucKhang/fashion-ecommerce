// src/modules/loyalty-engage/voucher/voucher.controller.ts
import { NextFunction, Request, Response } from 'express'
import { VoucherService } from './voucher.service'

export class VoucherController {
  constructor(private voucherService = new VoucherService()) {}

  /** GET /vouchers – Danh sách voucher (Admin) */
  listVouchers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.voucherService.listVouchers(req.query as any)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  /** GET /vouchers/:id – Chi tiết voucher (Admin) */
  getVoucherById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id)
      const data = await this.voucherService.getVoucherById(id)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  /** POST /vouchers – Tạo voucher mới (Admin) */
  createVoucher = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.voucherService.createVoucher(req.body)
      return res.status(201).json({ statusCode: 201, ...data })
    } catch (error) {
      next(error)
    }
  }

  /** PATCH /vouchers/:id – Cập nhật voucher (Admin) */
  updateVoucher = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id)
      const data = await this.voucherService.updateVoucher(id, req.body)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  /** DELETE /vouchers/:id – Xóa mềm voucher (Admin) */
  deleteVoucher = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id)
      const data = await this.voucherService.deleteVoucher(id)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  /** POST /vouchers/validate – Kiểm tra & tính tiền giảm (User) */
  validateVoucher = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const data = await this.voucherService.validateAndCalculate(req.body, userId)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }

  /** POST /vouchers/apply – Áp dụng voucher (tăng usedCount) */
  applyVoucher = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const data = await this.voucherService.applyVoucher(req.body.code, userId)
      return res.status(200).json({ statusCode: 200, ...data })
    } catch (error) {
      next(error)
    }
  }
}
