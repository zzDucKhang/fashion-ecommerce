import { NextFunction, Request, Response } from 'express'
import { AppError } from '@/common/errors'
import { AddressService } from './address.service'
import { CreateAddressBodyType, GetAddressQueryType, UpdateAddressBodyType } from './address.schema'

type UserRequest = Request & { user?: { id: number; roleId: number } }

export class AddressController {
  constructor(private addressService = new AddressService()) {}

  private getUserId(req: UserRequest) {
    const userId = req.user?.id
    if (!userId) throw new AppError('Chưa xác thực người dùng', 401)
    return userId
  }

  getListAddresses = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
      const query = req.query as unknown as GetAddressQueryType
      return res.status(200).json({ success: true, data: await this.addressService.listAddresses(this.getUserId(req), query) })
    } catch (error) {
      next(error)
    }
  }

  getAddressById = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
      const data = await this.addressService.getAddress(Number(req.params.addressId), this.getUserId(req))
      return res.status(200).json({ success: true, data })
    } catch (error) {
      next(error)
    }
  }

  createAddress = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
      const data = await this.addressService.createAddress(this.getUserId(req), req.body as CreateAddressBodyType)
      return res.status(201).json({ success: true, message: 'Tạo địa chỉ thành công', data })
    } catch (error) {
      next(error)
    }
  }

  updateAddress = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
      const data = await this.addressService.updateAddress(Number(req.params.addressId), this.getUserId(req), req.body as UpdateAddressBodyType)
      return res.status(200).json({ success: true, message: 'Cập nhật địa chỉ thành công', data })
    } catch (error) {
      next(error)
    }
  }

  deleteAddress = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
      await this.addressService.deleteAddress(Number(req.params.addressId), this.getUserId(req))
      return res.status(200).json({ success: true, message: 'Xóa địa chỉ thành công' })
    } catch (error) {
      next(error)
    }
  }
}
