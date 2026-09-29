import { randomBytes } from 'node:crypto'
import { OrderStatus, PaymentStatus, Prisma, ProductStatus } from '@prisma/client'
import { prisma } from '@/database/prisma'
import { BadRequestError, ForbiddenError, NotFoundError } from '@/common/errors'
import { CartRepo } from '../cart/cart.repo'
import { CreateOrderInput, ListOrderInput, UpdateOrderStatusInput } from './order.schema'
import { OrderRepo } from './order.repo'

export class OrderService {
  constructor(
    private readonly orderRepo = new OrderRepo(),
    private readonly cartRepo = new CartRepo()
  ) {}

  /**
   * Helper tạo mã đơn hàng ngẫu nhiên độ dài an toàn chống trùng lặp (Collision-safe)
   * randomBytes(4) sinh ra 8 ký tự hex (~4.29 tỷ khả năng/ngày)
   */
  private generateOrderCode(): string {
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '')
    const randomStr = randomBytes(4).toString('hex').toUpperCase()
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

      // 2. Lấy thông tin địa chỉ giao hàng và xác thực an toàn sở hữu / bắt buộc
      const address = input.shippingAddressId
        ? await this.orderRepo.findShippingAddress(input.shippingAddressId, userId, tx)
        : input.shippingAddress

      if (!address) {
        throw new BadRequestError('Địa chỉ giao hàng không hợp lệ')
      }

      const receiverName = address.receiverName?.trim()
      const receiverPhone = ('phoneNumber' in address ? address.phoneNumber : address.receiverPhone)?.trim()
      const province = address.province?.trim()
      const district = address.district?.trim()
      const ward = address.ward?.trim()
      const detailAddress = address.detailAddress?.trim()

      if (!receiverName || !receiverPhone || !province || !district || !ward || !detailAddress) {
        throw new BadRequestError(
          'Thông tin địa chỉ giao hàng không hợp lệ hoặc thiếu trường bắt buộc (họ tên, SĐT, tỉnh/thành, quận/huyện, phường/xã, địa chỉ chi tiết)'
        )
      }

      // 3. Tính toán tổng tiền & Kiểm tra tồn kho & Validate trạng thái Sản phẩm cha
      let subTotal = 0
      const orderItems: Prisma.OrderItemCreateWithoutOrderInput[] = []

      for (const item of items) {
        const variant = await this.orderRepo.findVariantForOrder(item.variantId, tx)

        // Kiểm tra tồn tại, xóa mềm và trạng thái sản phẩm cha (Product.status)
        const isProductActive =
          variant &&
          variant.product &&
          variant.product.deletedAt === null &&
          (variant.product.status === ProductStatus.PUBLISHED || (variant.product.status as string) === 'ACTIVE')

        if (!variant || !isProductActive) {
          throw new BadRequestError(`Sản phẩm "${variant?.product?.defaultName ?? ''}" hiện không còn mở bán`)
        }

        // Tối ưu trừ tồn kho chống Race Condition qua OrderRepo
        const updatedCount = await this.orderRepo.decrementStock(variant.id, item.quantity, tx)
        if (!updatedCount) {
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

        // Ghi log xuất kho qua OrderRepo
        await this.orderRepo.createInventoryLog(
          {
            variantId: variant.id,
            transType: 'EXPORT_ORDER',
            quantityChange: -item.quantity,
            note: 'Xuất kho khi tạo đơn hàng',
          },
          tx
        )
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
          receiverName,
          receiverPhone,
          province,
          district,
          ward,
          detailAddress,
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

      // 6. Xóa các món đã checkout khỏi giỏ hàng qua CartRepo
      await this.cartRepo.deleteCartItemsByIds(items.map((i) => i.id), tx)

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

      return this.orderRepo.updateStatus(orderId, input.status, updatedById, tx)
    })
  }

  /**
   * Khách hàng tự hủy đơn hàng
   */
  async cancel(userId: number, orderId: number) {
    return prisma.$transaction(async (tx) => {
      const order = await this.orderRepo.findById(orderId, userId, tx)

      if (!order) throw new NotFoundError('Đơn hàng không tồn tại')

      // Khách hàng chỉ được phép hủy khi đơn chưa đi vào giai đoạn đóng gói / giao hàng
      if (!['PENDING_PAYMENT', 'CONFIRMED'].includes(order.status)) {
        throw new ForbiddenError('Đơn hàng đã được xử lý hoặc đang giao, bạn không thể tự hủy')
      }

      return this.processOrderCancellation(order, userId, tx)
    })
  }

  /**
   * Helper chuẩn hóa logic hoàn kho, hoàn điểm, hoàn voucher và đồng bộ paymentStatus khi Hủy đơn
   */
  private async processOrderCancellation(
    order: any,
    updatedById: number | undefined,
    tx: Prisma.TransactionClient
  ) {
    // 1. Hoàn lại tồn kho và ghi log qua OrderRepo
    for (const item of order.orderItems) {
      if (!item.variantId) continue

      await this.orderRepo.incrementStock(item.variantId, item.quantity, tx)

      await this.orderRepo.createInventoryLog(
        {
          variantId: item.variantId,
          transType: 'RETURN_INBOUND',
          quantityChange: item.quantity,
          note: `Hoàn kho do hủy đơn ${order.orderCode}`,
        },
        tx
      )
    }

    // 2. Hoàn lại Điểm thưởng nếu khách đã dùng
    if (order.pointUsed && order.pointUsed > 0) {
      await this.orderRepo.refundUserPoints(order.userId, order.id, order.pointUsed, order.orderCode, tx)
    }

    // 3. Hoàn lại lượt dùng Voucher nếu có
    if (order.voucherCode) {
      await this.orderRepo.refundVoucherUsage(order.voucherCode, tx)
    }

    // 4. Cập nhật trạng thái đơn và đồng bộ paymentStatus
    const isPaid = order.paymentStatus === 'PAID' || order.paymentStatus === PaymentStatus.SUCCESS
    const paymentStatus = isPaid ? PaymentStatus.REFUNDED : (order.paymentStatus as PaymentStatus)

    return this.orderRepo.cancelOrder(order.id, paymentStatus, updatedById, tx)
  }
}