import { NextFunction, Request, Response } from 'express'
import { AppError } from '@/common/errors'
import { AddressService } from './address.service'
import { CreateAddressBodyType, GetAddressQueryType, UpdateAddressBodyType } from './address.schema'

export class AddressController {
  constructor(private addressService = new AddressService()) {}

  private getUserId(req: Request) {
    const user = (req as any).user
    const userId = user?.userId ?? user?.id
    if (!userId) throw new AppError('Chưa xác thực người dùng', 401)
    return Number(userId)
  }

  getListAddresses = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query as unknown as GetAddressQueryType
      return res.status(200).json({ statusCode: 200, data: await this.addressService.listAddresses(this.getUserId(req), query) })
    } catch (error) {
      next(error)
    }
  }

  getAddressById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.addressService.getAddress(Number(req.params.addressId), this.getUserId(req))
      return res.status(200).json({ statusCode: 200, data })
    } catch (error) {
      next(error)
    }
  }

  createAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.addressService.createAddress(this.getUserId(req), req.body as CreateAddressBodyType)
      return res.status(201).json({ statusCode: 201, message: 'Tạo địa chỉ thành công', data })
    } catch (error) {
      next(error)
    }
  }

  updateAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.addressService.updateAddress(Number(req.params.addressId), this.getUserId(req), req.body as UpdateAddressBodyType)
      return res.status(200).json({ statusCode: 200, message: 'Cập nhật địa chỉ thành công', data })
    } catch (error) {
      next(error)
    }
  }

  deleteAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.addressService.deleteAddress(Number(req.params.addressId), this.getUserId(req))
      return res.status(200).json({ statusCode: 200, message: 'Xóa địa chỉ thành công' })
    } catch (error) {
      next(error)
    }
  }
}
