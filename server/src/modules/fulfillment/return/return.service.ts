import { ReturnRepo } from './return.repo'
import {
  CreateReturnBodyType,
  GetAllReturnsQueryType,
  UpdateReturnBodyType,
} from './return.schema'
import { AppError, isNotFoundPrismaError } from '@/common/errors'
import { prisma } from '@/database/prisma'

export class ReturnService {
  constructor(private returnRepo = new ReturnRepo()) {}

  async findAll(query: GetAllReturnsQueryType) {
    return this.returnRepo.findAll(query)
  }

  async findById(id: number) {
    const returnRequest = await this.returnRepo.findById(id)
    if (!returnRequest) {
      throw new AppError('Yêu cầu trả hàng không tồn tại', 404)
    }
    return returnRequest
  }

  async create(data: CreateReturnBodyType) {
    const orderItem = await prisma.orderItem.findUnique({
      where: { id: data.orderItemId },
    })
    if (!orderItem) {
      throw new AppError('Dòng đơn hàng không tồn tại', 404)
    }
    if (data.quantity > orderItem.quantity) {
      throw new AppError('Số lượng trả không được vượt quá số lượng đã mua', 422)
    }
    return this.returnRepo.create(data)
  }

  async update(id: number, data: UpdateReturnBodyType) {
    try {
      const existing = await this.findById(id)
      if (data.quantity !== undefined && data.quantity > existing.orderItem.quantity) {
        throw new AppError('Số lượng trả không được vượt quá số lượng đã mua', 422)
      }
      return await this.returnRepo.update(id, data)
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw new AppError('Yêu cầu trả hàng không tồn tại để cập nhật', 404)
      }
      throw error
    }
  }

  async delete(id: number) {
    try {
      const existing = await this.findById(id)
      if (existing.status !== 'PENDING') {
        throw new AppError('Chỉ có thể xóa yêu cầu trả hàng đang chờ xử lý', 422)
      }
      await this.returnRepo.delete(id)
      return { message: 'Xóa yêu cầu trả hàng thành công' }
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw new AppError('Yêu cầu trả hàng không tồn tại để xóa', 404)
      }
      throw error
    }
  }
}
