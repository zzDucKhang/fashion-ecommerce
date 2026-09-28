import { randomBytes } from 'node:crypto'
import { OrderStatus, Prisma } from '@prisma/client'
import { prisma } from '@/database/prisma'
import { BadRequestError, ForbiddenError, NotFoundError } from '@/common/errors'
import { CartRepo } from '../cart/cart.repo'
import { CreateOrderInput, ListOrderInput, UpdateOrderStatusInput } from './order.schema'
import { OrderRepo } from './order.repo'

const orderInclude = { 
  orderItems: true, 
  shipment: true, 
  paymentTransactions: true 
} satisfies Prisma.OrderInclude

export class OrderService {
  constructor(
    private readonly orderRepo = new OrderRepo(), 
    private readonly cartRepo = new CartRepo()
  ) {}

  /**
   * Helper tạo mã đơn hàng ngắn gọn (Ví dụ: ORD-20260928-A1B2)
   */
  private generateOrderCode(): string {
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '')
    const randomStr = randomBytes(2).toString('hex').toUpperCase()
    return `ORD-${dateStr}-${randomStr}`
  }

  async list(userId: number, query: ListOrderInput) { 
    return this.orderRepo.list(userId, query) 
  }

  async findById(userId: number, orderId: number) {
    const order = await this.orderRepo.findById(orderId, userId)
    if (!order) throw new NotFoundError('Đơn hàng không tồn tại')
    return order
  }

  /**
   * Tạo đơn hàng mới (Checkout)
   */
  async create(userId: number, input: CreateOrderInput) {
    return prisma.$transaction(async (tx) => {
      // 1. Kiểm tra giỏ hàng
      const cart = await this.cartRepo.findByOwner(userId, undefined, tx)
      if (!cart || !cart.cartItems.length) {
        throw new BadRequestError('Giỏ hàng của bạn đang trống')
      }

      // Lọc các item được chọn thanh toán
      const items = cart.cartItems.filter(
        (item) => !input.cartItemIds || input.cartItemIds.includes(item.id)
      )
      if (!items.length) {
        throw new BadRequestError('Không có sản phẩm nào được chọn để đặt hàng')
      }

      // 2. Lấy thông tin địa chỉ giao hàng
      const address = input.shippingAddressId
        ? await tx.shippingAddress.findFirst({ where: { id: input.shippingAddressId, userId } })
        : input.shippingAddress

      if (!address) throw new BadRequestError('Địa chỉ giao hàng không hợp lệ')
      
      const receiverPhone = 'phoneNumber' in address ? address.phoneNumber : address.receiverPhone

      // 3. Tính toán tổng tiền & Kiểm tra tồn kho
      let subTotal = 0
      const orderItems: Prisma.OrderItemCreateWithoutOrderInput[] = []

      for (const item of items) {
        const variant = await tx.productVariant.findFirst({
          where: { id: item.variantId, deletedAt: null },
          include: { product: true, attributeValues: true },
        })

        if (!variant) {
          throw new NotFoundError(`Sản phẩm trong giỏ không còn tồn tại hoặc đã bị gỡ`)
        }

        // Tối ưu trừ tồn kho chống Race Condition
        const updated = await tx.productVariant.updateMany({
          where: { id: variant.id, stockQuantity: { gte: item.quantity } },
          data: { stockQuantity: { decrement: item.quantity } },
        })

        if (!updated.count) {
          throw new BadRequestError(`Sản phẩm "${variant.product.defaultName}" không đủ tồn kho`)
        }

        const unitPrice = Number(variant.sellingPrice)
        subTotal += unitPrice * item.quantity

        // Snapshot thông tin sản phẩm tại thời điểm mua
        orderItems.push({
          productName: variant.product.defaultName,
          skuCode: variant.sku,
          variantValue: variant.attributeValues.map((v) => v.value).join(', '),
          productImageUrl: variant.imageUrl ?? variant.product.thumbnailUrl,
          unitPrice,
          quantity: item.quantity,
          variant: { connect: { id: variant.id } },
        })

        // Ghi log xuất kho
        await tx.inventoryLog.create({
          data: {
            variantId: variant.id,
            transType: 'EXPORT_ORDER',
            quantityChange: -item.quantity,
            note: 'Xuất kho khi tạo đơn hàng',
          },
        })
      }

      // 4. Tính toán Phí ship & Khuyến mãi (Tạm thời để 0đ nếu chưa tích hợp đơn vị vận chuyển/voucher)
      const shippingFee = 0 
      const discountAmount = 0 
      const totalAmount = subTotal + shippingFee - discountAmount

      // 5. Tạo Đơn hàng
      const order = await this.orderRepo.create(
        {
          orderCode: this.generateOrderCode(),
          user: { connect: { id: userId } },
          receiverName: address.receiverName,
          receiverPhone,
          province: address.province,
          district: address.district,
          ward: address.ward,
          detailAddress: address.detailAddress,
          subTotal,
          shippingFee,
          totalAmount,
          voucherCode: input.voucherCode,
          paymentMethod: input.paymentMethod,
          shippingMethod: input.shippingMethod,
          customerNote: input.customerNote,
          orderItems: { create: orderItems },
        },
        tx
      )

      // 6. Xóa các món đã checkout khỏi giỏ hàng
      await tx.cartItem.deleteMany({
        where: { id: { in: items.map((i) => i.id) } },
      })

      return order
    })
  }

  /**
   * Cập nhật trạng thái đơn hàng (Dành cho Admin)
   */
  async updateStatus(orderId: number, input: UpdateOrderStatusInput, updatedById?: number) {
    return prisma.$transaction(async (tx) => {
      const order = await this.orderRepo.findById(orderId, undefined, tx)
      if (!order) throw new NotFoundError('Đơn hàng không tồn tại')

      if (order.status === OrderStatus.CANCELLED || order.status === OrderStatus.DELIVERED) {
        throw new BadRequestError('Không thể thay đổi trạng thái đơn hàng đã kết thúc')
      }

      // Nếu Admin chọn hủy đơn -> Thực hiện hoàn kho mà không bị giới hạn trạng thái như Khách hàng
      if (input.status === OrderStatus.CANCELLED) {
        return this.processOrderCancellation(order, updatedById, tx)
      }

      return tx.order.update({
        where: { id: orderId },
        data: { status: input.status, updatedById },
        include: orderInclude,
      })
    })
  }

  /**
   * Khách hàng tự hủy đơn hàng
   */
  async cancel(userId: number, orderId: number) {
    return prisma.$transaction(async (tx) => {
      const order = await tx.order.findFirst({
        where: { id: orderId, userId, deletedAt: null },
        include: { orderItems: true },
      })

      if (!order) throw new NotFoundError('Đơn hàng không tồn tại')

      // Khách hàng chỉ được phép hủy khi đơn chưa đi vào giai đoạn đóng gói / giao hàng
      if (!['PENDING_PAYMENT', 'CONFIRMED'].includes(order.status)) {
        throw new ForbiddenError('Đơn hàng đã được xử lý hoặc đang giao, bạn không thể tự hủy')
      }

      return this.processOrderCancellation(order, userId, tx)
    })
  }

  /**
   * Helper dùng chung cho logic Hoàn kho khi Hủy đơn
   */
  private async processOrderCancellation(
    order: any, 
    updatedById: number | undefined, 
    tx: Prisma.TransactionClient
  ) {
    for (const item of order.orderItems) {
      if (!item.variantId) continue

      // Hoàn lại số lượng tồn kho
      await tx.productVariant.update({
        where: { id: item.variantId },
        data: { stockQuantity: { increment: item.quantity } },
      })

      // Ghi log nhập kho lại
      await tx.inventoryLog.create({
        data: {
          variantId: item.variantId,
          transType: 'RETURN_INBOUND',
          quantityChange: item.quantity,
          note: `Hoàn kho do hủy đơn ${order.orderCode}`,
        },
      })
    }

    return tx.order.update({
      where: { id: order.id },
      data: { status: OrderStatus.CANCELLED, updatedById },
      include: orderInclude,
    })
  }
}