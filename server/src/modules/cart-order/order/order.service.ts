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

  /**
   * Tính phí vận chuyển dựa trên tổng giá trị đơn hàng, hình thức giao hàng và khối lượng hàng
   */
  private calculateShippingFee(
    subTotal: number,
    shippingMethod: string = 'STANDARD',
    totalWeightGram: number = 0
  ): number {
    // Miễn phí vận chuyển cho đơn hàng từ 500,000đ trở lên (trừ đơn hàng EXPRESS) hoặc khi chọn FREE
    if (shippingMethod === 'FREE' || (subTotal >= 500_000 && shippingMethod !== 'EXPRESS')) {
      return 0
    }

    if (shippingMethod === 'EXPRESS') {
      const baseExpressFee = 50_000
      const extraWeightKg = Math.max(0, Math.ceil((totalWeightGram - 2000) / 1000))
      return baseExpressFee + extraWeightKg * 10_000
    }

    // Mặc định STANDARD
    const baseStandardFee = 30_000
    const extraWeightKg = Math.max(0, Math.ceil((totalWeightGram - 2000) / 1000))
    return baseStandardFee + extraWeightKg * 5_000
  }

  async list(userId: number, query: ListOrderInput, isAdmin: boolean = false) {
    return this.orderRepo.list(userId, query, isAdmin)
  }

  async getDashboardStats() {
    return this.orderRepo.getDashboardStats()
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
      // 0. Đảm bảo chắc chắn giỏ hàng tồn tại trong DB trước khi khóa
      const initialCart = await this.cartRepo.findOrCreateOwner(userId, undefined, tx)

      // PESSIMISTIC LOCK: Khóa đúng dòng Cart đó lại (chắc chắn lock thành công vì dòng đã có)
      await tx.$queryRaw`
        SELECT id FROM "Cart" WHERE id = ${initialCart.id} FOR UPDATE
      `

      // 1. Kiểm tra giỏ hàng sau khi đã giữ khóa thành công
      const cart = await this.cartRepo.findByOwner(userId, undefined, tx)
      if (!cart || !cart.cartItems.length) {
        throw new BadRequestError('Giỏ hàng của bạn đang trống')
      }

      const items = cart.cartItems.filter(
        (item) => !input.cartItemIds || input.cartItemIds.includes(item.id)
      )
      if (!items.length) {
        throw new BadRequestError('Không có sản phẩm nào được chọn để đặt hàng')
      }

      // 2. Lấy thông tin địa chỉ giao hàng
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

      // 3. Tính toán tổng tiền, Kiểm tra tồn kho (OPTIMISTIC LOCK) & Flash Sale
      let subTotal = 0
      let totalWeightGram = 0
      const orderItems: Prisma.OrderItemCreateWithoutOrderInput[] = []
      const now = new Date()

      for (const item of items) {
        const variant = await this.orderRepo.findVariantForOrder(item.variantId, tx)

        const isProductActive =
          variant &&
          variant.product &&
          variant.product.deletedAt === null &&
          (variant.product.status === ProductStatus.PUBLISHED || (variant.product.status as string) === 'ACTIVE')

        if (!variant || !isProductActive) {
          throw new BadRequestError(`Sản phẩm "${variant?.product?.defaultName ?? ''}" hiện không còn mở bán`)
        }

        // OPTIMISTIC LOCK: Trừ tồn kho kiểm tra updatedAt và stockQuantity
        const updatedCount = await this.orderRepo.decrementStockOptimistic(
          variant.id,
          item.quantity,
          variant.updatedAt,
          tx
        )
        if (!updatedCount) {
          throw new BadRequestError(
            `Sản phẩm "${variant.product.defaultName}" vừa có thay đổi hoặc không đủ tồn kho để đặt hàng`
          )
        }

        totalWeightGram += (variant.weightGram ?? 0) * item.quantity

        let unitPrice = Number(variant.sellingPrice)
        const activeFlashSale = variant.flashSaleItems?.find(
          (fsi) =>
            fsi.campaign &&
            fsi.campaign.isActive &&
            fsi.campaign.deletedAt === null &&
            fsi.campaign.startTime <= now &&
            fsi.campaign.endTime >= now &&
            fsi.promoQuantity - fsi.soldQuantity >= item.quantity
        )

        if (activeFlashSale) {
          unitPrice = Number(activeFlashSale.flashSalePrice)
          await this.orderRepo.incrementFlashSaleSoldQuantity(activeFlashSale.id, item.quantity, tx)
        }

        subTotal += unitPrice * item.quantity

        orderItems.push({
          productName: variant.product.defaultName,
          skuCode: variant.sku,
          variantValue: variant.attributeValues.map((v) => v.value).join(', '),
          productImageUrl: variant.imageUrl ?? variant.product.thumbnailUrl,
          unitPrice,
          quantity: item.quantity,
          variant: { connect: { id: variant.id } },
        })

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

      // 4. Tính phí vận chuyển
      const shippingFee = this.calculateShippingFee(subTotal, input.shippingMethod, totalWeightGram)

      // 5. Kiểm tra và áp dụng Voucher
      let voucherDiscount = 0
      if (input.voucherCode) {
        const voucher = await this.orderRepo.findVoucherByCode(input.voucherCode, tx)
        if (!voucher || !voucher.isActive) {
          throw new BadRequestError('Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa')
        }

        if (now < voucher.startDate) {
          throw new BadRequestError('Mã giảm giá chưa đến thời gian áp dụng')
        }
        if (now > voucher.endDate) {
          throw new BadRequestError('Mã giảm giá đã hết hạn sử dụng')
        }

        if (voucher.totalUsageLimit > 0 && voucher.usedCount >= voucher.totalUsageLimit) {
          throw new BadRequestError('Mã giảm giá đã hết lượt sử dụng')
        }

        const userUsageCount = await this.orderRepo.countUserVoucherOrders(userId, input.voucherCode, tx)
        if (userUsageCount >= voucher.userUsageLimit) {
          throw new BadRequestError('Bạn đã dùng hết lượt áp dụng cho mã giảm giá này')
        }

        if (subTotal < Number(voucher.minOrderValue)) {
          throw new BadRequestError(
            `Đơn hàng chưa đạt giá trị tối thiểu (${Number(voucher.minOrderValue).toLocaleString('vi-VN')}đ) để áp dụng mã giảm giá`
          )
        }

        if (voucher.discountType === 'PERCENTAGE') {
          voucherDiscount = Math.round((subTotal * Number(voucher.discountValue)) / 100)
          if (voucher.maxDiscountAmt && Number(voucher.maxDiscountAmt) > 0) {
            voucherDiscount = Math.min(voucherDiscount, Number(voucher.maxDiscountAmt))
          }
        } else {
          voucherDiscount = Number(voucher.discountValue)
        }

        voucherDiscount = Math.min(voucherDiscount, subTotal)
        await this.orderRepo.incrementVoucherUsage(input.voucherCode, tx)
      }

      // 6. Kiểm tra Điểm thưởng
      let pointUsed = 0
      let pointDiscount = 0

      if (input.pointUsed && input.pointUsed > 0) {
        const userPoints = await this.orderRepo.getUserRewardPoints(userId, tx)
        if (input.pointUsed > userPoints) {
          throw new BadRequestError(
            `Bạn đang có ${userPoints} điểm thưởng, không đủ ${input.pointUsed} điểm để sử dụng`
          )
        }

        const remainingPayable = Math.max(0, subTotal + shippingFee - voucherDiscount)
        pointDiscount = Math.min(input.pointUsed, remainingPayable)
        pointUsed = pointDiscount
      }

      const totalAmount = Math.max(0, subTotal + shippingFee - voucherDiscount - pointDiscount)
      const pointEarned = Math.floor(totalAmount * 0.01)

      // 7. Tạo Đơn hàng
      const orderCode = this.generateOrderCode()
      const order = await this.orderRepo.create(
        {
          orderCode,
          user: { connect: { id: userId } },
          receiverName,
          receiverPhone,
          province,
          district,
          ward,
          detailAddress,
          subTotal,
          shippingFee,
          shippingMethod: input.shippingMethod,
          shippingDiscount: 0,
          voucherCode: input.voucherCode,
          voucherDiscount,
          pointUsed,
          pointDiscount,
          pointEarned,
          totalAmount,
          paymentMethod: input.paymentMethod,
          customerNote: input.customerNote,
          orderItems: { create: orderItems },
        },
        tx
      )

      // Trừ điểm thưởng theo cơ chế Atomic (bảo đảm không bị trừ âm điểm)
      if (pointUsed > 0) {
        await this.orderRepo.deductUserPoints(userId, order.id, pointUsed, orderCode, tx)
      }

      // 8. Xóa giỏ hàng
      // Sau khi transaction này commit, request thứ hai thoát khỏi PESSIMISTIC LOCK
      // bước vào kiểm tra sẽ thấy giỏ trống và bị văng ra an toàn
      await this.cartRepo.deleteCartItemsByIds(items.map((i) => i.id), tx)

      return order
    }, {
    maxWait: 5000,  // Thời gian tối đa chờ lấy connection từ pool (mặc định 2000)
    timeout: 150000  // Tăng thời gian chờ của transaction lên 150 giây (mặc định 5000)
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
        // Kiểm tra an toàn vận chuyển: Không thể hủy đơn nếu hàng đang trên đường giao
        if (
          order.status === OrderStatus.SHIPPED ||
          (order.shipment && ['PICKED_UP', 'IN_TRANSIT'].includes(order.shipment.status))
        ) {
          throw new BadRequestError(
            'Đơn hàng đang trong quá trình vận chuyển, không thể hủy trực tiếp. Vui lòng xử lý qua quy trình giao hàng thất bại hoặc hoàn hàng'
          )
        }
        return this.processOrderCancellation(order, updatedById, tx)
      }

      // Xử lý các nghiệp vụ đi kèm khi hoàn thành giao hàng (DELIVERED)
      let newPaymentStatus: PaymentStatus | undefined = undefined
      if (input.status === OrderStatus.DELIVERED) {
        // 1. Tự động đồng bộ paymentStatus = SUCCESS cho đơn hàng COD
        if (order.paymentMethod === 'COD' && order.paymentStatus === PaymentStatus.PENDING) {
          newPaymentStatus = PaymentStatus.SUCCESS
        }

        // 2. Tự động tích lũy điểm thưởng (order.pointEarned) cho khách hàng nếu chưa nhận
        if (order.pointEarned > 0) {
          const existingEarn = await this.orderRepo.findEarnTransactionByOrderId(order.id, tx)
          if (!existingEarn) {
            await this.orderRepo.awardUserPoints(order.userId, order.id, order.pointEarned, order.orderCode, tx)
          }
        }
      }

      return this.orderRepo.updateStatus(orderId, input.status, updatedById, newPaymentStatus, tx)
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
    // 1. Hoàn lại tồn kho và ghi log qua OrderRepo + Hoàn quota Flash Sale nếu có
    for (const item of order.orderItems) {
      if (!item.variantId) continue

      await this.orderRepo.incrementStock(item.variantId, item.quantity, tx)

      // Hoàn lại hạn mức khuyến mãi Flash Sale nếu chiến dịch vẫn còn đang diễn ra
      await this.orderRepo.decrementFlashSaleSoldQuantity(item.variantId, item.quantity, tx)

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

    // 3. Hoàn lại lượt dùng Voucher nếu đơn hàng có áp dụng giảm giá
    if (order.voucherCode && Number(order.voucherDiscount) > 0) {
      await this.orderRepo.refundVoucherUsage(order.voucherCode, tx)
    }

    // 4. Cập nhật trạng thái đơn và đồng bộ paymentStatus
    const isPaid = order.paymentStatus === 'PAID' || order.paymentStatus === PaymentStatus.SUCCESS
    const paymentStatus = isPaid ? PaymentStatus.REFUNDED : (order.paymentStatus as PaymentStatus)

    return this.orderRepo.cancelOrder(order.id, paymentStatus, updatedById, tx)
  }
}