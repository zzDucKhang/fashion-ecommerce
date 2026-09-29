import { Prisma, ProductStatus } from '@prisma/client'
import { prisma } from '@/database/prisma'
import { BadRequestError, NotFoundError } from '@/common/errors'
import { AddCartItemInput, CartOwner, UpdateCartItemInput } from './cart.schema'
import { CartRepo } from './cart.repo'

export const MAX_CART_ITEM_QUANTITY = 100

export class CartService {
  constructor(private readonly cartRepo = new CartRepo()) {}

  /**
   * Helper thống nhất: Lấy hoặc tạo giỏ (tự động merge nếu có cả userId và sessionId)
   */
  private async resolveCart(userId?: number, sessionId?: string, tx: Prisma.TransactionClient | typeof prisma = prisma) {
    if (!userId && !sessionId) {
      throw new BadRequestError('Cần userId hoặc sessionId để xác định giỏ hàng')
    }
    if (userId && sessionId) {
      return this.cartRepo.mergeGuestCart(userId, sessionId, tx)
    }
    return this.cartRepo.findOrCreateOwner(userId, sessionId, tx)
  }

  /**
   * Lấy thông tin giỏ hàng (Tự động gộp giỏ nếu user vừa đăng nhập)
   */
  async get(userId?: number, owner?: CartOwner) {
    return prisma.$transaction(async (tx) => {
      return this.resolveCart(userId, owner?.sessionId, tx)
    })
  }

  /**
   * Thêm sản phẩm vào giỏ hàng
   */
  async add(userId: number | undefined, owner: CartOwner, input: AddCartItemInput) {
    if (input.quantity <= 0) {
      throw new BadRequestError('Số lượng sản phẩm thêm vào phải lớn hơn 0')
    }

    return prisma.$transaction(async (tx) => {
      const cart = await this.resolveCart(userId, owner?.sessionId, tx)

      // Kiểm tra variant thông qua Repo (đã kiểm tra Product.status & deletedAt)
      const variant = await this.cartRepo.findActiveVariantById(input.variantId, tx)
      if (!variant) {
        throw new NotFoundError('Sản phẩm không tồn tại hoặc đã ngừng kinh doanh')
      }

      const existing = await this.cartRepo.findCartItem(cart.id, input.variantId, tx)
      const newQuantity = (existing?.quantity ?? 0) + input.quantity

      // Kiểm tra giới hạn số lượng tối đa trên mỗi sản phẩm (Cart Limit)
      if (newQuantity > MAX_CART_ITEM_QUANTITY) {
        throw new BadRequestError(`Số lượng tối đa cho mỗi sản phẩm trong giỏ hàng là ${MAX_CART_ITEM_QUANTITY}`)
      }

      // Kiểm tra tồn kho
      if (newQuantity > variant.stockQuantity) {
        throw new BadRequestError(`Số lượng yêu cầu vượt quá tồn kho hiện có (${variant.stockQuantity})`)
      }

      await this.cartRepo.upsertCartItem(cart.id, input.variantId, newQuantity, tx)
      return this.cartRepo.get(cart.id, tx)
    })
  }

  /**
   * Cập nhật số lượng sản phẩm trong giỏ
   */
  async update(userId: number | undefined, owner: CartOwner, itemId: number, input: UpdateCartItemInput) {
    if (input.quantity < 0) {
      throw new BadRequestError('Số lượng sản phẩm không hợp lệ')
    }

    if (input.quantity > MAX_CART_ITEM_QUANTITY) {
      throw new BadRequestError(`Số lượng tối đa cho mỗi sản phẩm trong giỏ hàng là ${MAX_CART_ITEM_QUANTITY}`)
    }

    return prisma.$transaction(async (tx) => {
      const cart = await this.resolveCart(userId, owner?.sessionId, tx)

      const item = await this.cartRepo.findCartItemById(itemId, cart.id, tx)
      if (!item || !item.variant || item.variant.deletedAt !== null) {
        throw new NotFoundError('Mục sản phẩm không tồn tại trong giỏ hàng')
      }

      // Kiểm tra trạng thái sản phẩm cha (Product.status & deletedAt)
      const isProductActive =
        item.variant.product &&
        item.variant.product.deletedAt === null &&
        (item.variant.product.status === ProductStatus.PUBLISHED || (item.variant.product.status as string) === 'ACTIVE')

      if (!isProductActive) {
        throw new BadRequestError('Sản phẩm hiện không còn mở bán hoặc đã ngừng kinh doanh')
      }

      // Kiểm tra tồn kho
      if (input.quantity > item.variant.stockQuantity) {
        throw new BadRequestError(`Số lượng vượt quá tồn kho hiện có (${item.variant.stockQuantity})`)
      }

      if (input.quantity === 0) {
        await this.cartRepo.deleteCartItem(itemId, tx)
      } else {
        await this.cartRepo.updateCartItemQuantity(itemId, input.quantity, tx)
      }

      return this.cartRepo.get(cart.id, tx)
    })
  }

  /**
   * Xóa sản phẩm khỏi giỏ hàng
   */
  async remove(userId: number | undefined, owner: CartOwner, itemId: number) {
    return prisma.$transaction(async (tx) => {
      const cart = await this.resolveCart(userId, owner?.sessionId, tx)
      const deleted = await this.cartRepo.deleteCartItemByIdAndCartId(itemId, cart.id, tx)
      if (!deleted) {
        throw new NotFoundError('Mục sản phẩm không tồn tại trong giỏ hàng')
      }
      return this.cartRepo.get(cart.id, tx)
    })
  }
}