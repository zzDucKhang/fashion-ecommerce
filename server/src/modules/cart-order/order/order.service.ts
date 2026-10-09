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
  CreateOrderInput,
  ListOrderInput,
  UpdateOrderStatusInput,
} from "./order.schema";
import { OrderRepo } from "./order.repo";

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
        // =====================================================================
        // 1. KHÓA GIỎ HÀNG (PESSIMISTIC LOCK) & KIỂM TRA ĐẦU VÀO
        // =====================================================================
        const initialCart = await this.cartRepo.findOrCreateOwner(userId, undefined, tx);

        // Chống Double-Submit: Khóa dòng Cart này lại cho đến khi Transaction kết thúc
        await tx.$queryRaw`SELECT id FROM "Cart" WHERE id = ${initialCart.id} FOR UPDATE`;

        const cart = await this.cartRepo.findByOwner(userId, undefined, tx);
        if (!cart || !cart.cartItems.length) {
          throw new BadRequestError("Giỏ hàng của bạn đang trống");
        }

        const items = cart.cartItems.filter(
          (item) => !input.cartItemIds || input.cartItemIds.includes(item.id),
        );
        if (!items.length) {
          throw new BadRequestError("Không có sản phẩm nào được chọn để đặt hàng");
        }

        // =====================================================================
        // 2. CHUẨN HÓA ĐỊA CHỈ GIAO HÀNG (SNAPSHOT STRING)
        // =====================================================================
        const address = input.shippingAddressId
          ? await this.orderRepo.findShippingAddress(input.shippingAddressId, userId, tx)
          : input.shippingAddress;

        if (!address) {
          throw new BadRequestError("Địa chỉ giao hàng không hợp lệ");
        }

        const receiverName = address.receiverName?.trim();
        const receiverPhone = ("phoneNumber" in address ? address.phoneNumber : address.receiverPhone)?.trim();
        const province = address.province?.trim();
        const district = address.district?.trim();
        const ward = address.ward?.trim();
        const detailAddress = address.detailAddress?.trim();

        if (!receiverName || !receiverPhone || !province || !district || !ward || !detailAddress) {
          throw new BadRequestError("Thông tin địa chỉ giao hàng không hợp lệ");
        }

        // Tạo chuỗi snapshot lưu thẳng vào Order
        const shippingAddressSnapshot = `${receiverName} - ${receiverPhone} | ${detailAddress}, ${ward}, ${district}, ${province}`;

        // =====================================================================
        // 3. TÍNH TỔNG TIỀN, KIỂM TRA TỒN KHO & FLASH SALE (OPTIMIZED)
        // =====================================================================
        let subTotal = 0;
        let totalWeightGram = 0;
        const now = new Date();

        // [OPTIMIZE 1 - BATCH QUERY O(1)]: Lấy toàn bộ biến thể trong 1 lần query
        const variantIdsInCart = items.map(item => item.variantId);
        const variantsData = await this.orderRepo.findVariantsForOrderList(variantIdsInCart, tx);
        const variantMap = new Map(variantsData.map(v => [v.id, v]));

        // [OPTIMIZE 2 - PARALLEL MUTATION]: Update tồn kho song song
        const processedItems = await Promise.all(
          items.map(async (item) => {
            const variant = variantMap.get(item.variantId);

            const isProductActive =
              variant &&
              variant.product &&
              variant.product.deletedAt === null &&
              (variant.product.status === ProductStatus.PUBLISHED || (variant.product.status as string) === "ACTIVE");

            if (!variant || !isProductActive) {
              throw new BadRequestError(
                `Sản phẩm "${variant?.product?.defaultName ?? "Không xác định"}" hiện không còn mở bán`
              );
            }

            // OPTIMISTIC LOCK: Trừ tồn kho an toàn bằng version control (updatedAt)
            const updatedCount = await this.orderRepo.decrementStockOptimistic(
              variant.id,
              item.quantity,
              variant.updatedAt, 
              tx,
            );

            if (!updatedCount) {
              throw new BadRequestError(
                `Sản phẩm "${variant.product.defaultName}" vừa có thay đổi hoặc không đủ tồn kho để đặt hàng. Vui lòng thử lại.`
              );
            }

            const currentWeight = (variant.weightGram ?? 0) * item.quantity;
            let unitPrice = Number(variant.sellingPrice);
            
            // Xử lý Logic Flash Sale
            const activeFlashSale = variant.flashSaleItems?.find(
              (fsi) =>
                fsi.campaign &&
                fsi.campaign.isActive &&
                fsi.campaign.deletedAt === null &&
                fsi.campaign.startTime <= now &&
                fsi.campaign.endTime >= now &&
                (fsi.promoQuantity - fsi.soldQuantity) >= item.quantity 
            );

            if (activeFlashSale) {
              unitPrice = Number(activeFlashSale.flashSalePrice);
              await this.orderRepo.incrementFlashSaleSoldQuantity(activeFlashSale.id, item.quantity, tx);
            }

            return {
              calculatedSubTotal: unitPrice * item.quantity,
              calculatedWeight: currentWeight,
              orderItemData: {
                productName: variant.product.defaultName,
                skuCode: variant.sku,
                variantValue: variant.variantValue ?? "Tiêu chuẩn",
                productImageUrl: variant.imageUrl ?? variant.product.thumbnailUrl,
                unitPrice,
                quantity: item.quantity,
                variant: { connect: { id: variant.id } },
              },
            };
          })
        );

        // Tổng hợp Data sau Promise.all
        const orderItems: Prisma.OrderItemCreateWithoutOrderInput[] = [];
        for (const p of processedItems) {
          subTotal += p.calculatedSubTotal;
          totalWeightGram += p.calculatedWeight;
          orderItems.push(p.orderItemData);
        }

        // =====================================================================
        // 4. ÁP DỤNG VOUCHER & ĐIỂM THƯỞNG
        // =====================================================================
        const shippingFee = this.calculateShippingFee(subTotal, input.shippingMethod, totalWeightGram);
        let voucherDiscount = 0;

        if (input.voucherCode) {
          const voucher = await this.orderRepo.findVoucherByCode(input.voucherCode, tx);
          if (!voucher || !voucher.isActive) throw new BadRequestError("Mã giảm giá không tồn tại hoặc vô hiệu hóa");
          if (now < voucher.startDate) throw new BadRequestError("Mã giảm giá chưa đến thời gian áp dụng");
          if (now > voucher.endDate) throw new BadRequestError("Mã giảm giá đã hết hạn sử dụng");
          if (voucher.totalUsageLimit > 0 && voucher.usedCount >= voucher.totalUsageLimit) throw new BadRequestError("Mã giảm giá đã hết lượt sử dụng");

          const userUsageCount = await this.orderRepo.countUserVoucherOrders(userId, input.voucherCode, tx);
          if (userUsageCount >= voucher.userUsageLimit) throw new BadRequestError("Bạn đã dùng hết lượt áp dụng");
          if (subTotal < Number(voucher.minOrderValue)) throw new BadRequestError(`Đơn hàng tối thiểu ${Number(voucher.minOrderValue).toLocaleString("vi-VN")}đ`);

          if (voucher.discountType === "PERCENTAGE") {
            voucherDiscount = Math.round((subTotal * Number(voucher.discountValue)) / 100);
            if (voucher.maxDiscountAmt && Number(voucher.maxDiscountAmt) > 0) {
              voucherDiscount = Math.min(voucherDiscount, Number(voucher.maxDiscountAmt));
            }
          } else {
            voucherDiscount = Number(voucher.discountValue);
          }

          voucherDiscount = Math.min(voucherDiscount, subTotal);
          await this.orderRepo.incrementVoucherUsage(input.voucherCode, tx);
        }

        let pointUsed = 0;
        let pointDiscount = 0;

        if (input.pointUsed && input.pointUsed > 0) {
          const userPoints = await this.orderRepo.getUserRewardPoints(userId, tx);
          if (input.pointUsed > userPoints) throw new BadRequestError(`Bạn chỉ có ${userPoints} điểm`);

          const remainingPayable = Math.max(0, subTotal + shippingFee - voucherDiscount);
          pointDiscount = Math.min(input.pointUsed, remainingPayable);
          pointUsed = pointDiscount;
        }

        const totalAmount = Math.max(0, subTotal + shippingFee - voucherDiscount - pointDiscount);
        const pointEarned = Math.floor(totalAmount * 0.01);

        // =====================================================================
        // 5. LƯU DATABASE & DỌN DẸP GIỎ HÀNG
        // =====================================================================
        const orderCode = this.generateOrderCode();
        const customerNote = input.customerNote?.trim() ? input.customerNote.trim() : undefined;

        const order = await this.orderRepo.create(
          {
            orderCode,
            user: { connect: { id: userId } },
            shippingAddress: shippingAddressSnapshot, 
            subTotal,
            shippingFee,
            shippingMethod: input.shippingMethod || 'STANDARD',
            shippingDiscount: 0,
            voucherCode: input.voucherCode,
            voucherDiscount,
            pointUsed,
            pointDiscount,
            pointEarned,
            totalAmount,
            paymentMethod: input.paymentMethod,
            customerNote: customerNote,
            orderItems: { create: orderItems },
          },
          tx,
        );

        if (pointUsed > 0) {
          await this.orderRepo.deductUserPoints(userId, order.id, pointUsed, orderCode, tx);
        }

        await this.cartRepo.deleteCartItemsByIds(items.map((i) => i.id), tx);

        return order;
      },
      {
        // [OPTIMIZE 3 - THỜI GIAN CHỜ DB]: Giảm Timeout
        // Trước đây timeout = 150000 (150s) rất nguy hiểm làm treo DB Pool. 
        // Sau khi loại bỏ lỗi N+1 Query, toàn bộ logic này chạy trong < 50ms. 
        // Set timeout tối đa 15s là an toàn và lý tưởng cho CSDL.
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
}
