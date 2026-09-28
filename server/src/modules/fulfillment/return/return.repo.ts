import { prisma } from '@/database/prisma'
import {
  CreateReturnBodyType,
  GetAllReturnsQueryType,
  UpdateReturnBodyType,
} from './return.schema'

const returnInclude = {
  medias: true,
  orderItem: {
    select: {
      id: true,
      orderId: true,
      productName: true,
      skuCode: true,
      variantValue: true,
      quantity: true,
    },
  },
} as const

export class ReturnRepo {
  async findAll(query: GetAllReturnsQueryType) {
    const where = {
      ...(query.status ? { status: query.status } : {}),
      ...(query.orderItemId ? { orderItemId: query.orderItemId } : {}),
    }

    const returns = await prisma.returnRequest.findMany({
      where,
      include: returnInclude,
      orderBy: { createdAt: 'desc' },
    })

    return {
      data: returns,
      totalItems: returns.length,
    }
  }

  async findById(id: number) {
    return prisma.returnRequest.findUnique({
      where: { id },
      include: returnInclude,
    })
  }

  async create(data: CreateReturnBodyType) {
    const { medias, ...rest } = data
    return prisma.returnRequest.create({
      data: {
        ...rest,
        description: rest.description ?? undefined,
        medias: medias?.length
          ? {
              create: medias,
            }
          : undefined,
      },
      include: returnInclude,
    })
  }

  async update(id: number, data: UpdateReturnBodyType) {
    return prisma.returnRequest.update({
      where: { id },
      data: {
        ...(data.quantity !== undefined ? { quantity: data.quantity } : {}),
        ...(data.reason !== undefined ? { reason: data.reason } : {}),
        ...(data.description !== undefined ? { description: data.description } : {}),
        ...(data.status !== undefined ? { status: data.status } : {}),
      },
      include: returnInclude,
    })
  }

  async delete(id: number) {
    return prisma.returnRequest.delete({
      where: { id },
    })
  }
}
