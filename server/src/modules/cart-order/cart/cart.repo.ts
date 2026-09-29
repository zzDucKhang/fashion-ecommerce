import { Prisma, ProductStatus } from '@prisma/client'
import { prisma } from '@/database/prisma'

export const cartInclude = {
  cartItems: {
    include: { 
      variant: { 
        include: { 
          product: true, 
          attributeValues: { include: { attribute: true } } 
        } 
      } 
    },
    orderBy: { createdAt: 'asc' as const },
  },
} satisfies Prisma.CartInclude

export class CartRepo {
  /**
   * Tìm giỏ hàng theo Owner. Ưu tiên tìm theo userId trước, nếu không có mới tìm theo sessionId.
   */
  async findByOwner(userId?: number, sessionId?: string, db: Prisma.TransactionClient | typeof prisma = prisma) {
    if (!userId && !sessionId) return null

    if (userId) {
      const userCart = await db.cart.findFirst({ where: { userId }, include: cartInclude })
      if (userCart) return userCart
    }

    if (sessionId) {
      return db.cart.findFirst({ where: { sessionId }, include: cartInclude })
    }

    return null
  }

  async createOwner(userId?: number, sessionId?: string, db: Prisma.TransactionClient | typeof prisma = prisma) {
    return db.cart.create({ data: { userId, sessionId }, include: cartInclude })
  }

  async findOrCreateOwner(userId?: number, sessionId?: string, db: Prisma.TransactionClient | typeof prisma = prisma) {
    const existing = await this.findByOwner(userId, sessionId, db)
    if (existing) return existing
    return this.createOwner(userId, sessionId, db)
  }

  /**
   * Gộp giỏ hàng Guest vào giỏ User (Tối ưu Query - Tránh lỗi N+1)
   */
  async mergeGuestCart(userId: number, sessionId: string, db: Prisma.TransactionClient | typeof prisma = prisma) {
    // 1. Tìm giỏ hàng guest và giỏ hàng user
    const guestCart = await this.findByOwner(undefined, sessionId, db)
    const userCart = await this.findOrCreateOwner(userId, undefined, db)

    // Nếu không có giỏ guest hoặc giỏ guest chính là giỏ user thì trả về giỏ user
    if (!guestCart || guestCart.id === userCart.id || guestCart.cartItems.length === 0) {
      return userCart
    }

    // 2. Tạo Map chứa danh sách item hiện có của User cart để tra cứu nhanh (O(1))
    const userItemMap = new Map(userCart.cartItems.map((item) => [item.variantId, item]))

    const updatePromises: Promise<any>[] = []
    const itemsToMoveIds: number[] = []

    // 3. Phân loại item cần cộng dồn số lượng hoặc chuyển chủ sở hữu
    for (const guestItem of guestCart.cartItems) {
      const existingUserItem = userItemMap.get(guestItem.variantId)

      if (existingUserItem) {
        // Nếu đã có trong giỏ User -> Cộng dồn số lượng
        updatePromises.push(
          db.cartItem.update({
            where: { id: existingUserItem.id },
            data: { quantity: existingUserItem.quantity + guestItem.quantity },
          })
        )
      } else {
        // Nếu chưa có -> Gom ID lại để update hàng loạt (Bulk Update)
        itemsToMoveIds.push(guestItem.id)
      }
    }

    // 4. Thực thi các query cập nhật song song (Parallel execution)
    if (itemsToMoveIds.length > 0) {
      updatePromises.push(
        db.cartItem.updateMany({
          where: { id: { in: itemsToMoveIds } },
          data: { cartId: userCart.id },
        })
      )
    }

    await Promise.all(updatePromises)

    // 5. Xóa giỏ hàng Guest
    await db.cart.delete({ where: { id: guestCart.id } })

    // 6. Lấy lại dữ liệu giỏ hàng hoàn chỉnh cuối cùng
    return (await this.get(userCart.id, db)) ?? userCart
  }

  async get(cartId: number, db: Prisma.TransactionClient | typeof prisma = prisma) {
    return db.cart.findUnique({ where: { id: cartId }, include: cartInclude })
  }

  /**
   * Tìm biến thể sản phẩm đang active (chưa bị xóa mềm và sản phẩm cha đang mở bán PUBLISHED)
   */
  async findActiveVariantById(variantId: number, db: Prisma.TransactionClient | typeof prisma = prisma) {
    return db.productVariant.findFirst({
      where: {
        id: variantId,
        deletedAt: null,
        product: {
          status: ProductStatus.PUBLISHED,
          deletedAt: null,
        },
      },
      include: {
        product: true,
      },
    })
  }

  /**
   * Tìm cart item theo cartId và variantId
   */
  async findCartItem(cartId: number, variantId: number, db: Prisma.TransactionClient | typeof prisma = prisma) {
    return db.cartItem.findUnique({
      where: { cartId_variantId: { cartId, variantId } },
    })
  }

  /**
   * Tìm cart item theo id và cartId kèm thông tin biến thể và sản phẩm cha
   */
  async findCartItemById(itemId: number, cartId: number, db: Prisma.TransactionClient | typeof prisma = prisma) {
    return db.cartItem.findFirst({
      where: { id: itemId, cartId },
      include: {
        variant: {
          include: {
            product: true,
          },
        },
      },
    })
  }

  /**
   * Thêm mới hoặc cập nhật số lượng item trong giỏ
   */
  async upsertCartItem(
    cartId: number,
    variantId: number,
    quantity: number,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.cartItem.upsert({
      where: { cartId_variantId: { cartId, variantId } },
      update: { quantity },
      create: { cartId, variantId, quantity },
    })
  }

  /**
   * Cập nhật số lượng của cart item theo id
   */
  async updateCartItemQuantity(
    itemId: number,
    quantity: number,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    })
  }

  /**
   * Xóa 1 cart item theo id
   */
  async deleteCartItem(itemId: number, db: Prisma.TransactionClient | typeof prisma = prisma) {
    return db.cartItem.delete({
      where: { id: itemId },
    })
  }

  /**
   * Xóa cart item theo itemId và cartId (bảo đảm item thuộc đúng giỏ)
   */
  async deleteCartItemByIdAndCartId(
    itemId: number,
    cartId: number,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    const result = await db.cartItem.deleteMany({
      where: { id: itemId, cartId },
    })
    return result.count > 0
  }

  /**
   * Xóa danh sách cart items theo danh sách ID
   */
  async deleteCartItemsByIds(
    itemIds: number[],
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.cartItem.deleteMany({
      where: { id: { in: itemIds } },
    })
  }
}