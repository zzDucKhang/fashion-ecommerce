import { ShipmentRepo } from './shipment.repo'
import {
  CreateShipmentBodyType,
  GetAllShipmentsQueryType,
  UpdateShipmentBodyType,
} from './shipment.schema'
import { AppError, isNotFoundPrismaError, isUniqueConstraintPrismaError } from '@/common/errors'

export class ShipmentService {
  constructor(private shipmentRepo = new ShipmentRepo()) {}

  async findAll(query: GetAllShipmentsQueryType) {
    return this.shipmentRepo.findAll(query)
  }

  async findById(id: number) {
    const shipment = await this.shipmentRepo.findById(id)
    if (!shipment) {
      throw new AppError('Lô hàng không tồn tại', 404)
    }
    return shipment
  }

  async findByOrderId(orderId: number) {
    const shipment = await this.shipmentRepo.findByOrderId(orderId)
    if (!shipment) {
      throw new AppError('Không tìm thấy lô hàng cho đơn hàng này', 404)
    }
    return shipment
  }

  async create(data: CreateShipmentBodyType) {
    try {
      return await this.shipmentRepo.create(data)
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw new AppError('Đơn hàng đã có lô hàng hoặc mã vận đơn đã tồn tại', 422)
      }
      throw error
    }
  }

  async update(id: number, data: UpdateShipmentBodyType) {
    try {
      await this.findById(id)
      return await this.shipmentRepo.update(id, data)
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw new AppError('Lô hàng không tồn tại để cập nhật', 404)
      }
      if (isUniqueConstraintPrismaError(error)) {
        throw new AppError('Mã vận đơn đã tồn tại', 422)
      }
      throw error
    }
  }

  async delete(id: number) {
    try {
      await this.findById(id)
      await this.shipmentRepo.delete(id)
      return { message: 'Xóa lô hàng thành công' }
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw new AppError('Lô hàng không tồn tại để xóa', 404)
      }
      throw error
    }
  }
}
