import { prisma } from '@/database/prisma'
import { CreateAddressBodyType, GetAddressQueryType, UpdateAddressBodyType } from './address.schema'

export class AddressRepo {
  async listAddresses(userId: number, query: GetAddressQueryType) {
    const skip = (query.page - 1) * query.limit
    const where = {
      userId,
      ...(query.search
        ? {
            OR: [
              { receiverName: { contains: query.search, mode: 'insensitive' as const } },
              { phoneNumber: { contains: query.search, mode: 'insensitive' as const } },
              { detailAddress: { contains: query.search, mode: 'insensitive' as const } },
            ],
          }
        : {}),
    }
    const [totalItems, data] = await Promise.all([
      prisma.shippingAddress.count({ where }),
      prisma.shippingAddress.findMany({ where, skip, take: query.limit, orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }] }),
    ])
    return { data, totalItems, page: query.page, limit: query.limit, totalPages: Math.ceil(totalItems / query.limit) }
  }

  async findAddressById(id: number, userId: number) {
    return prisma.shippingAddress.findFirst({ where: { id, userId } })
  }

  async createAddress(userId: number, data: CreateAddressBodyType) {
    return prisma.$transaction(async (transaction) => {
      if (data.isDefault) {
        await transaction.shippingAddress.updateMany({ where: { userId }, data: { isDefault: false } })
      }
      return transaction.shippingAddress.create({ data: { ...data, userId } })
    })
  }

  async updateAddress(id: number, userId: number, data: UpdateAddressBodyType) {
    return prisma.$transaction(async (transaction) => {
      if (data.isDefault) {
        await transaction.shippingAddress.updateMany({ where: { userId }, data: { isDefault: false } })
      }
      return transaction.shippingAddress.update({ where: { id }, data })
    })
  }

  async deleteAddress(id: number, userId: number) {
    return prisma.shippingAddress.delete({ where: { id } })
  }
}
