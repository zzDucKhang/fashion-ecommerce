import { OrderStatus, PaymentStatus, PointTransType, Prisma } from '@prisma/client'
import { prisma } from '@/database/prisma'
import { CalculatedOrder, CartWithRelations, CreateOrderInput, ListOrderInput, OrderCreationCounts } from './order.schema'

export const orderItemInclude = {
  orderItems: {
    include: {
      variant: {
        include: {
          product: {
            select: { id: true, defaultName: true, thumbnailUrl: true },
          },
         
        },
      },
    },
  },
  shipment: true,
  paymentTransactions: true,
  pointTransactions: true,
} satisfies Prisma.OrderInclude

export class OrderRepo {
  /**
   * PESSIMISTIC LOCK: Khóa phiên giỏ hàng của User chống spam click / double-submit
   */
  async lockCartByUserId(userId: number, tx: Prisma.TransactionClient) {
    const carts = await tx.$queryRaw<Array<{ id: number }>>`
      SELECT id FROM "Cart" WHERE "userId" = ${userId} FOR UPDATE
    `
    return carts[0]
  }

  async list(userId: number, query: ListOrderInput, isAdmin: boolean = false) {
    const { page = 1, limit = 10, status, all } = query

    const where: Prisma.OrderWhereInput = {
      ...(isAdmin && all ? {} : { userId }),
      deletedAt: null,
      ...(status ? { status } : {}),
    }

    const [totalItems, data] = await Promise.all([
      prisma.order.count({ where }),
      prisma.order.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: orderItemInclude,
      }),
    ])

    return {
      data,
      totalItems,
      page,
      limit,
      totalPages: Math.ceil(totalItems / limit) || 1,
    }
  }

  async findById(
    id: number,
    userId?: number,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.order.findFirst({
      where: {
        id,
        deletedAt: null,
        ...(userId ? { userId } : {}),
      },
      include: orderItemInclude,
    })
  }

  async create(data: Prisma.OrderCreateInput, tx: Prisma.TransactionClient) {
    return tx.order.create({
      data,
      include: orderItemInclude,
    })
  }

  async updateStatus(
    id: number,
    status: OrderStatus,
    updatedById?: number,
    paymentStatus?: PaymentStatus,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.order.update({
      where: { id },
      data: {
        status,
        updatedById,
        ...(paymentStatus ? { paymentStatus } : {}),
      },
      include: orderItemInclude,
    })
  }

  async update(
    id: number,
    data: Prisma.OrderUpdateInput,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.order.update({
      where: { id },
      data,
      include: orderItemInclude,
    })
  }

  async findShippingAddress(
    id: number,
    userId: number,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.shippingAddress.findFirst({
      where: { id, userId },
    })
  }

  async findVariantForOrder(
    variantId: number,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    const now = new Date()
    return db.productVariant.findFirst({
      where: { id: variantId, deletedAt: null },
      include: {
        product: true,
       
        flashSaleItems: {
          where: {
            campaign: {
              isActive: true,
              deletedAt: null,
              startTime: { lte: now },
              endTime: { gte: now },
            },
          },
          include: {
            campaign: true,
          },
        },
      },
    })
  }

  async findVariantsForOrderList(
    variantIds: number[],
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    const now = new Date()
    return db.productVariant.findMany({
      where: { 
        id: { in: variantIds }, 
        deletedAt: null 
      },
      include: {
        product: true,
        flashSaleItems: {
          where: {
            campaign: {
              isActive: true,
              deletedAt: null,
              startTime: { lte: now },
              endTime: { gte: now },
            },
          },
          include: {
            campaign: true,
          },
        },
      },
    })
  }

  /**
   * OPTIMISTIC LOCK: Trừ tồn kho kiểm tra cả updatedAt lẫn stockQuantity
   */
  async decrementStockOptimistic(
    variantId: number,
    quantity: number,
    expectedUpdatedAt: Date,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    const updated = await db.productVariant.updateMany({
      where: {
        id: variantId,
        updatedAt: expectedUpdatedAt,
        stockQuantity: { gte: quantity },
      },
      data: { stockQuantity: { decrement: quantity } },
    })
    return updated.count
  }

  async incrementStock(
    variantId: number,
    quantity: number,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.productVariant.update({
      where: { id: variantId },
      data: { stockQuantity: { increment: quantity } },
    })
  }

  async getOrderCreationData(
  userId: number,
  input: CreateOrderInput,
  tx: Prisma.TransactionClient,
): Promise<CartWithRelations | null> {
  return tx.cart.findUnique({
    where: {
      userId,
    },

    include: {
      user: {
        include: {
          shippingAddresses: {
            where: {
              isDefault: true,
            },
          },
        },
      },

      cartItems: {
        where: {
          deletedAt: null,

          ...(input.cartItemIds
            ? {
                id: {
                  in: input.cartItemIds,
                },
              }
            : {}),
        },

        include: {
          variant: {
            include: {
              product: true,
              flashSaleItems: {
                where: {
                  campaign: {
                    isActive: true,
                    deletedAt: null,
                  },
                },

                include: {
                  campaign: true,
                },
              },
            },
          },
        },
      },
    },
  });
}
 async processOrderCreation(
  userId: number,
  calculated: CalculatedOrder,
  tx: Prisma.TransactionClient,
): Promise<OrderCreationCounts> {
  const result = await tx.$queryRaw<OrderCreationCounts[]>`
    WITH stock_update AS (
      UPDATE "ProductVariant" AS pv
      SET
        "stockQuantity" =
          pv."stockQuantity" - data.quantity,
        "updatedAt" = NOW()
      FROM (
        VALUES
          ${Prisma.join(
            calculated.items.map(
              (item) =>
                Prisma.sql`(
                  ${item.variantId},
                  ${item.quantity},
                  ${item.updatedAt}
                )`,
            ),
          )}
      ) AS data(
        id,
        quantity,
        updated_at
      )
      WHERE pv.id = data.id
        AND pv."updatedAt" = data.updated_at
        AND pv."stockQuantity" >= data.quantity
      RETURNING pv.id
    ),

    flash_sale_update AS (
      UPDATE "FlashSaleItem" AS fsi
      SET
        "soldQuantity" =
          fsi."soldQuantity" + data.quantity
      FROM (
        VALUES
          ${
            calculated.flashSaleItems.length > 0
              ? Prisma.join(
                  calculated.flashSaleItems.map(
                    (item) =>
                      Prisma.sql`(
                        ${item.id},
                        ${item.quantity}
                      )`,
                  ),
                )
              : Prisma.sql`(
                  NULL::integer,
                  0
                )`
          }
      ) AS data(
        id,
        quantity
      )
      WHERE fsi.id = data.id
        AND fsi."promoQuantity" -
            fsi."soldQuantity" >= data.quantity
      RETURNING fsi.id
    ),

    voucher_update AS (
      UPDATE "Voucher"
      SET
        "usedCount" = "usedCount" + 1
      WHERE
        ${
          calculated.voucherCode
            ? Prisma.sql`
                code = ${calculated.voucherCode}
                AND (
                  "totalUsageLimit" IS NULL
                  OR "usedCount" < "totalUsageLimit"
                )
              `
            : Prisma.sql`FALSE`
        }
      RETURNING id
    ),

    points_update AS (
      UPDATE "User"
      SET
        "rewardPoints" =
          "rewardPoints" - ${calculated.pointUsed}
      WHERE id = ${userId}
        AND "rewardPoints" >= ${calculated.pointUsed}
      RETURNING id
    )

    SELECT
      (
        SELECT COUNT(*)
        FROM stock_update
      )::int AS "stockUpdated",

      (
        SELECT COUNT(*)
        FROM flash_sale_update
      )::int AS "flashSaleUpdated",

      (
        SELECT COUNT(*)
        FROM voucher_update
      )::int AS "voucherUpdated",

      (
        SELECT COUNT(*)
        FROM points_update
      )::int AS "pointsUpdated";
  `;

  return result[0];
}

private generateOrderCode(): string {
  const date = new Date()
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, '');

  const random = Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase();

  return `ORD-${date}-${random}`;
}
  
async finalizeOrder(
  userId: number,
  input: CreateOrderInput,
  calculated: CalculatedOrder,
  tx: Prisma.TransactionClient,
) {
  const orderCode = this.generateOrderCode();


  const order = await tx.order.create({
    data: {
      orderCode,

      user: {
        connect: {
          id: userId,
        },
      },

      shippingAddress: calculated.shippingAddress,

      subTotal: calculated.subtotal,

      shippingFee: calculated.shippingFee,

      shippingMethod: calculated.shippingMethod,

      shippingDiscount: calculated.shippingDiscount,

      voucherCode: calculated.voucherCode,

      voucherDiscount: calculated.voucherDiscount,

      pointUsed: calculated.pointUsed,

      pointDiscount: calculated.pointDiscount,

      pointEarned: calculated.pointEarned,

      totalAmount: calculated.totalAmount,

      paymentMethod: calculated.paymentMethod,

      customerNote: calculated.customerNote,

      orderItems: {
        create: calculated.items.map((item) => ({
          productName: item.productName,
          skuCode: item.skuCode,
          variantValue: item.variantValue,
          productImageUrl: item.productImageUrl,
          unitPrice: item.unitPrice,
          quantity: item.quantity,

          variant: {
            connect: {
              id: item.variantId,
            },
          },
        })),
      },
    },
  });

  await tx.cartItem.updateMany({
    where: {
      id: {
        in: calculated.items.map(
          (item) => item.cartItemId,
        ),
      },
    },

    data: {
      deletedAt: new Date(),
    },
  });

  return order;
}

  async refundUserPoints(
    userId: number,
    orderId: number,
    pointUsed: number,
    orderCode: string,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: { rewardPoints: { increment: pointUsed } },
      select: { rewardPoints: true },
    })

    return db.pointTransaction.create({
      data: {
        userId,
        orderId,
        pointChange: pointUsed,
        currentPoint: updatedUser.rewardPoints,
        transactionType: PointTransType.REFUND,
        description: `Hoàn điểm do hủy đơn hàng ${orderCode}`,
      },
    })
  }

  async refundVoucherUsage(
    voucherCode: string,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.voucher.updateMany({
      where: { code: voucherCode, usedCount: { gt: 0 } },
      data: { usedCount: { decrement: 1 } },
    })
  }

  async cancelOrder(
    orderId: number,
    paymentStatus: PaymentStatus,
    updatedById?: number,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.order.update({
      where: { id: orderId },
      data: {
        status: OrderStatus.CANCELLED,
        paymentStatus,
        updatedById,
      },
      include: orderItemInclude,
    })
  }

  async incrementFlashSaleSoldQuantity(
    flashSaleItemId: number,
    quantity: number,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.flashSaleItem.update({
      where: { id: flashSaleItemId },
      data: { soldQuantity: { increment: quantity } },
    })
  }

  async findVoucherByCode(
    code: string,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.voucher.findFirst({
      where: { code, deletedAt: null },
    })
  }

  async countUserVoucherOrders(
    userId: number,
    voucherCode: string,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.order.count({
      where: {
        userId,
        voucherCode,
        status: { not: OrderStatus.CANCELLED },
      },
    })
  }

  async incrementVoucherUsage(
    voucherCode: string,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.voucher.updateMany({
      where: { code: voucherCode },
      data: { usedCount: { increment: 1 } },
    })
  }

  async getUserRewardPoints(
    userId: number,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { rewardPoints: true },
    })
    return user?.rewardPoints ?? 0
  }

  /**
   * ATOMIC UPDATE: Trừ điểm thưởng có điều kiện chống trừ âm điểm khi chạy song song
   */
  async deductUserPoints(
    userId: number,
    orderId: number,
    pointUsed: number,
    orderCode: string,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    const updated = await db.user.updateMany({
      where: { id: userId, rewardPoints: { gte: pointUsed } },
      data: { rewardPoints: { decrement: pointUsed } },
    })

    if (updated.count === 0) {
      throw new Error('Số điểm thưởng không đủ hoặc đã bị trừ bởi giao dịch song song')
    }

    const user = await db.user.findUnique({
      where: { id: userId },
      select: { rewardPoints: true },
    })

    return db.pointTransaction.create({
      data: {
        userId,
        orderId,
        pointChange: -pointUsed,
        currentPoint: user?.rewardPoints ?? 0,
        transactionType: PointTransType.REDEEM,
        description: `Dùng ${pointUsed} điểm thanh toán đơn hàng ${orderCode}`,
      },
    })
  }

  async decrementFlashSaleSoldQuantity(
    variantId: number,
    quantity: number,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    const now = new Date()
    const activeItem = await db.flashSaleItem.findFirst({
      where: {
        variantId,
        soldQuantity: { gte: quantity },
        campaign: {
          isActive: true,
          deletedAt: null,
          startTime: { lte: now },
          endTime: { gte: now },
        },
      },
    })

    if (activeItem) {
      await db.flashSaleItem.update({
        where: { id: activeItem.id },
        data: { soldQuantity: { decrement: quantity } },
      })
    }
  }

  async findEarnTransactionByOrderId(
    orderId: number,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.pointTransaction.findFirst({
      where: {
        orderId,
        transactionType: PointTransType.EARN,
      },
    })
  }

  async awardUserPoints(
    userId: number,
    orderId: number,
    pointEarned: number,
    orderCode: string,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: { rewardPoints: { increment: pointEarned } },
      select: { rewardPoints: true },
    })

    return db.pointTransaction.create({
      data: {
        userId,
        orderId,
        pointChange: pointEarned,
        currentPoint: updatedUser.rewardPoints,
        transactionType: PointTransType.EARN,
        description: `Tích lũy điểm thưởng từ đơn hàng ${orderCode}`,
      },
    })
  }

  async getDashboardStats() {
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)

    const [totalUsers, totalOrders, totalProducts, revenueResult, newUsersThisMonth, ordersPending] = await Promise.all([
      prisma.user.count({ where: { deletedAt: null } }),
      prisma.order.count({ where: { deletedAt: null } }),
      prisma.product.count({ where: { deletedAt: null } }),
      prisma.order.aggregate({
        _sum: { totalAmount: true },
        where: { deletedAt: null, status: { notIn: ['CANCELLED', 'RETURNED'] } },
      }),
      prisma.user.count({
        where: {
          deletedAt: null,
          createdAt: { gte: startOfMonth },
        },
      }),
      prisma.order.count({
        where: { deletedAt: null, status: { in: ['PENDING_PAYMENT', 'PROCESSING', 'CONFIRMED'] } },
      }),
    ])

    return {
      totalUsers,
      totalOrders,
      totalProducts,
      totalRevenue: Number(revenueResult._sum.totalAmount || 0),
      newUsersThisMonth,
      ordersPending,
    }
  }
}