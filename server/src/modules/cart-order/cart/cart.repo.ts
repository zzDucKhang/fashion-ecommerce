import { Prisma } from '@prisma/client'
import { prisma } from '@/database/prisma'

const cartInclude = {
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
    return (await this.findByOwner(userId, sessionId, db)) ?? this.createOwner(userId, sessionId, db)
  }

  /**
   * Gộp giỏ hàng Guest vào giỏ User (Tối ưu Query - Tránh lỗi N+1)
   */
  async mergeGuestCart(userId: number, sessionId: string, db: Prisma.TransactionClient) {
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
    return this.get(userCart.id, db)
  }

  async get(cartId: number, db: Prisma.TransactionClient | typeof prisma = prisma) {
    return db.cart.findUnique({ where: { id: cartId }, include: cartInclude })
  }
}