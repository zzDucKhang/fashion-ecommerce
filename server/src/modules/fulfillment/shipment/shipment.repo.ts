import { prisma } from '@/database/prisma'
import {
  CreateShipmentBodyType,
  GetAllShipmentsQueryType,
  UpdateShipmentBodyType,
} from './shipment.schema'

const shipmentInclude = {
  order: {
    select: {
      id: true,
      orderCode: true,
      status: true,
      receiverName: true,
      receiverPhone: true,
    },
  },
} as const

export class ShipmentRepo {
  async findAll(query: GetAllShipmentsQueryType) {
    const where = {
      ...(query.status ? { status: query.status } : {}),
      ...(query.orderId ? { orderId: query.orderId } : {}),
    }

    const shipments = await prisma.shipment.findMany({
      where,
      include: shipmentInclude,
      orderBy: { createdAt: 'desc' },
    })

    return {
      data: shipments,
      totalItems: shipments.length,
    }
  }

  async findById(id: number) {
    return prisma.shipment.findUnique({
      where: { id },
      include: shipmentInclude,
    })
  }

  async findByOrderId(orderId: number) {
    return prisma.shipment.findUnique({
      where: { orderId },
      include: shipmentInclude,
    })
  }

  async create(data: CreateShipmentBodyType) {
    return prisma.shipment.create({
      data: {
        orderId: data.orderId,
        carrier: data.carrier,
        trackingCode: data.trackingCode,
        actualShippingFee: data.actualShippingFee,
        status: data.status,
        estimatedDelivery: data.estimatedDelivery ?? undefined,
      },
      include: shipmentInclude,
    })
  }

  async update(id: number, data: UpdateShipmentBodyType) {
    return prisma.shipment.update({
      where: { id },
      data: {
        ...(data.carrier !== undefined ? { carrier: data.carrier } : {}),
        ...(data.trackingCode !== undefined ? { trackingCode: data.trackingCode } : {}),
        ...(data.actualShippingFee !== undefined
          ? { actualShippingFee: data.actualShippingFee }
          : {}),
        ...(data.status !== undefined ? { status: data.status } : {}),
        ...(data.estimatedDelivery !== undefined
          ? { estimatedDelivery: data.estimatedDelivery }
          : {}),
      },
      include: shipmentInclude,
    })
  }

  async delete(id: number) {
    return prisma.shipment.delete({
      where: { id },
    })
  }
}
