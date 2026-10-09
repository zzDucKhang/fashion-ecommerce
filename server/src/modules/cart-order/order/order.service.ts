import { randomBytes } from "node:crypto";
import {
  OrderStatus,
  PaymentStatus,
  Prisma,
  ProductStatus,
} from "@prisma/client";
import { prisma } from "@/database/prisma";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "@/common/errors";
import { CartRepo } from "../cart/cart.repo";
import {
  CalculatedFlashSaleItem,
  CalculatedOrder,
  CalculatedOrderItem,
  CartWithRelations,
  CreateOrderInput,
  ListOrderInput,
  UpdateOrderStatusInput,
} from "./order.schema";
import { OrderRepo } from "./order.repo";
import { logger } from "@/common/logger";

export class OrderService {
  constructor(
    private readonly orderRepo = new OrderRepo(),
    private readonly cartRepo = new CartRepo(),
  ) {}

  /**
   * Helper tạo mã đơn hàng ngẫu nhiên độ dài an toàn chống trùng lặp (Collision-safe)
   * randomBytes(4) sinh ra 8 ký tự hex (~4.29 tỷ khả năng/ngày)
   */
  private generateOrderCode(): string {
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomStr = randomBytes(4).toString("hex").toUpperCase();
    return `ORD-${dateStr}-${randomStr}`;
  }

  /**
   * Tính phí vận chuyển dựa trên tổng giá trị đơn hàng, hình thức giao hàng và khối lượng hàng
   */
  private calculateShippingFee(
    subTotal: number,
    shippingMethod: string = "STANDARD",
    totalWeightGram: number = 0,
  ): number {
    // Miễn phí vận chuyển cho đơn hàng từ 500,000đ trở lên (trừ đơn hàng EXPRESS) hoặc khi chọn FREE
    if (
      shippingMethod === "FREE" ||
      (subTotal >= 500_000 && shippingMethod !== "EXPRESS")
    ) {
      return 0;
    }

    if (shippingMethod === "EXPRESS") {
      const baseExpressFee = 50_000;
      const extraWeightKg = Math.max(
        0,
        Math.ceil((totalWeightGram - 2000) / 1000),
      );
      return baseExpressFee + extraWeightKg * 10_000;
    }

    // Mặc định STANDARD
    const baseStandardFee = 30_000;
    const extraWeightKg = Math.max(
      0,
      Math.ceil((totalWeightGram - 2000) / 1000),
    );
    return baseStandardFee + extraWeightKg * 5_000;
  }

  async list(userId: number, query: ListOrderInput, isAdmin: boolean = false) {
    return this.orderRepo.list(userId, query, isAdmin);
  }

  async getDashboardStats() {
    return this.orderRepo.getDashboardStats();
  }

  async findById(userId: number, orderId: number) {
    const order = await this.orderRepo.findById(orderId, userId);
    if (!order) throw new NotFoundError("Đơn hàng không tồn tại");
    return order;
  }

  /**
   * Tạo đơn hàng mới (Checkout)
   */

  async create(userId: number, input: CreateOrderInput) {
  return prisma.$transaction(
    async (tx) => {
      // 1. Get everything needed
      const cartWithRelation = await this.orderRepo.getOrderCreationData(
        userId,
        input,
        tx,
      );

      console.log("Cart: ", cartWithRelation)
  if (!cartWithRelation || cartWithRelation.cartItems.length === 0) {
    throw new BadRequestError('Cart is empty');
  }


      // 2. Calculate everything
      const calculated = this.calculateOrder(
        cartWithRelation,
        input,
      );

      // 3. ONE DB round trip
      const counts = await this.orderRepo.processOrderCreation(
        userId,
        calculated,
        tx,
      );

      // 4. Validate DB results

      // Stock
      if (counts.stockUpdated !== calculated.items.length) {
        throw new BadRequestError('Not enough stock');
      }

      // Flash sale
      if (
        counts.flashSaleUpdated !==
        calculated.flashSaleItems.length
      ) {
        throw new BadRequestError(
          'Flash sale quantity unavailable',
        );
      }

      // Voucher
      if (
        calculated.voucherCode &&
        counts.voucherUpdated !== 1
      ) {
        throw new BadRequestError('Voucher unavailable');
      }

      // Points
      if (
        calculated.pointUsed > 0 &&
        counts.pointsUpdated !== 1
      ) {
        throw new BadRequestError(
          'Not enough reward points',
        );
      }

      // 5. Create order + items + cleanup cart
      return this.orderRepo.finalizeOrder(
        userId,
        input,
        calculated,
        tx,
      );
    },
    {
      maxWait: 5000,
      timeout: 15000,
    },
  );
}
 
  /**
   * Cập nhật trạng thái đơn hàng (Dành cho Admin)
   */
  async updateStatus(
    orderId: number,
    input: UpdateOrderStatusInput,
    updatedById?: number,
  ) {
    return prisma.$transaction(async (tx) => {
      const order = await this.orderRepo.findById(orderId, undefined, tx);
      if (!order) throw new NotFoundError("Đơn hàng không tồn tại");

      if (
        order.status === OrderStatus.CANCELLED ||
        order.status === OrderStatus.DELIVERED
      ) {
        throw new BadRequestError(
          "Không thể thay đổi trạng thái đơn hàng đã kết thúc",
        );
      }

      // Nếu Admin chọn hủy đơn -> Thực hiện hoàn kho mà không bị giới hạn trạng thái như Khách hàng
      if (input.status === OrderStatus.CANCELLED) {
        // Kiểm tra an toàn vận chuyển: Không thể hủy đơn nếu hàng đang trên đường giao
        if (
          order.status === OrderStatus.SHIPPED ||
          (order.shipment &&
            ["PICKED_UP", "IN_TRANSIT"].includes(order.shipment.status))
        ) {
          throw new BadRequestError(
            "Đơn hàng đang trong quá trình vận chuyển, không thể hủy trực tiếp. Vui lòng xử lý qua quy trình giao hàng thất bại hoặc hoàn hàng",
          );
        }
        return this.processOrderCancellation(order, updatedById, tx);
      }

      // Xử lý các nghiệp vụ đi kèm khi hoàn thành giao hàng (DELIVERED)
      let newPaymentStatus: PaymentStatus | undefined = undefined;
      if (input.status === OrderStatus.DELIVERED) {
        // 1. Tự động đồng bộ paymentStatus = SUCCESS cho đơn hàng COD
        if (
          order.paymentMethod === "COD" &&
          order.paymentStatus === PaymentStatus.PENDING
        ) {
          newPaymentStatus = PaymentStatus.SUCCESS;
        }

        // 2. Tự động tích lũy điểm thưởng (order.pointEarned) cho khách hàng nếu chưa nhận
        if (order.pointEarned > 0) {
          const existingEarn =
            await this.orderRepo.findEarnTransactionByOrderId(order.id, tx);
          if (!existingEarn) {
            await this.orderRepo.awardUserPoints(
              order.userId,
              order.id,
              order.pointEarned,
              order.orderCode,
              tx,
            );
          }
        }
      }

      return this.orderRepo.updateStatus(
        orderId,
        input.status,
        updatedById,
        newPaymentStatus,
        tx,
      );
    });
  }

  /**
   * Khách hàng tự hủy đơn hàng
   */
  async cancel(userId: number, orderId: number) {
    return prisma.$transaction(async (tx) => {
      const order = await this.orderRepo.findById(orderId, userId, tx);

      if (!order) throw new NotFoundError("Đơn hàng không tồn tại");

      // Khách hàng chỉ được phép hủy khi đơn chưa đi vào giai đoạn đóng gói / giao hàng
      if (!["PENDING_PAYMENT", "CONFIRMED"].includes(order.status)) {
        throw new ForbiddenError(
          "Đơn hàng đã được xử lý hoặc đang giao, bạn không thể tự hủy",
        );
      }

      return this.processOrderCancellation(order, userId, tx);
    });
  }

  /**
   * Helper chuẩn hóa logic hoàn kho, hoàn điểm, hoàn voucher và đồng bộ paymentStatus khi Hủy đơn
   */
  private async processOrderCancellation(
    order: any,
    updatedById: number | undefined,
    tx: Prisma.TransactionClient,
  ) {
    const concurrentTasks: Promise<any>[] = [];

    // 1. Task: Hoàn lại tồn kho và hoàn quota Flash Sale
    for (const item of order.orderItems) {
      if (!item.variantId) continue;
      concurrentTasks.push(this.orderRepo.incrementStock(item.variantId, item.quantity, tx));
      concurrentTasks.push(this.orderRepo.decrementFlashSaleSoldQuantity(item.variantId, item.quantity, tx));
    }

    // 2. Task: Hoàn lại Điểm thưởng nếu khách đã dùng
    if (order.pointUsed && order.pointUsed > 0) {
      concurrentTasks.push(this.orderRepo.refundUserPoints(order.userId, order.id, order.pointUsed, order.orderCode, tx));
    }

    // 3. Task: Hoàn lại lượt dùng Voucher
    if (order.voucherCode && Number(order.voucherDiscount) > 0) {
      concurrentTasks.push(this.orderRepo.refundVoucherUsage(order.voucherCode, tx));
    }

    // Thực thi toàn bộ lệnh Update/Refund song song
    await Promise.all(concurrentTasks);

    // 4. Cập nhật trạng thái đơn và đồng bộ paymentStatus
    const isPaid = order.paymentStatus === "PAID" || order.paymentStatus === PaymentStatus.SUCCESS;
    const paymentStatus = isPaid ? PaymentStatus.REFUNDED : (order.paymentStatus as PaymentStatus);

    return this.orderRepo.cancelOrder(order.id, paymentStatus, updatedById, tx);
  }

  private calculateOrder(
  cart: CartWithRelations,
  input: CreateOrderInput,
): CalculatedOrder {
  const shippingAddress = input.shippingAddressId
    ? cart.user?.shippingAddresses.find(
        (address) =>
          address.id === input.shippingAddressId,
      )
    : cart.user?.shippingAddresses.find(
        (address) => address.isDefault,
      );

  if (!shippingAddress) {
    throw new BadRequestError(
      'Shipping address not found',
    );
  }

  const items: CalculatedOrderItem[] = [];
  const flashSaleItems: CalculatedFlashSaleItem[] = [];

  let subtotal = 0;

  for (const cartItem of cart.cartItems) {
    const variant = cartItem.variant;
    const product = variant.product;

    const unitPrice = Number(
      variant.sellingPrice,
    );

    items.push({
      cartItemId: cartItem.id,
      variantId: variant.id,
      quantity: cartItem.quantity,
      updatedAt: variant.updatedAt,

      productName: product.defaultName,
      skuCode: variant.sku,

      variantValue:
        variant.variantValue ?? '',

      productImageUrl:
        variant.imageUrl ??
        product.thumbnailUrl,

      unitPrice,
    });

    subtotal +=
      unitPrice * cartItem.quantity;

    const flashSale =
      variant.flashSaleItems[0];

    if (flashSale) {
      flashSaleItems.push({
        id: flashSale.id,
        quantity: cartItem.quantity,
      });
    }
  }

  const shippingFee = this.calculateShippingFee(
    subtotal,
    input.shippingMethod
  );

  const shippingDiscount = 0;

  const voucherCode = input.voucherCode;

  // TODO: calculate from Voucher data
  const voucherDiscount = 0;

  const pointUsed = input.pointUsed ?? 0;

  // TODO: calculate based on your point rule
  const pointDiscount = pointUsed;

  const totalAmount =
    subtotal +
    shippingFee -
    shippingDiscount -
    voucherDiscount -
    pointDiscount;

  const pointEarned = Math.floor(totalAmount / 10000);

  const address = input.shippingAddress;

  if (!address) {
    throw new BadRequestError(
      'Shipping address data is required',
    );
  }

  const shippingAddressText = [
  address.receiverName,
  address.receiverPhone,
  address.detailAddress,
  address.ward,
  address.district,
  address.province,
].join(', ');

  return {
    items,
    flashSaleItems,

    voucherCode,

    pointUsed,
    pointDiscount,

    subtotal,
    shippingFee,
    shippingDiscount,
    voucherDiscount,

    totalAmount,
    pointEarned,

    shippingAddress: shippingAddressText,

    shippingMethod: input.shippingMethod,
    paymentMethod: input.paymentMethod,
    customerNote: input.customerNote,
  };
}
 
}
