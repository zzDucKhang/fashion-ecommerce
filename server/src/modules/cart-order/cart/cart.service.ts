import { prisma } from '@/database/prisma'
import { BadRequestError, NotFoundError } from '@/common/errors'
import { AddCartItemInput, CartOwner, UpdateCartItemInput } from './cart.schema'
import { CartRepo } from './cart.repo'

export class CartService {
  constructor(private readonly cartRepo = new CartRepo()) {}

  /**
   * Helper tìm hoặc tạo mới giỏ hàng theo Owner
   */
  private async ownerCart(userId?: number, sessionId?: string, tx = prisma) {
    if (!userId && !sessionId) {
      throw new BadRequestError('Cần userId hoặc sessionId để xác định giỏ hàng')
    }
    return this.cartRepo.findOrCreateOwner(userId, sessionId, tx)
  }

  /**
   * Lấy thông tin giỏ hàng (Tự động gộp giỏ nếu user vừa đăng nhập)
   */
  async get(userId?: number, owner?: CartOwner) {
    const sessionId = owner?.sessionId

    // Nếu vừa có userId (đã login) vừa có sessionId (guest cũ), tiến hành gộp giỏ hàng
    if (userId && sessionId) {
      return prisma.$transaction(async (tx) => {
        return this.cartRepo.mergeGuestCart(userId, sessionId, tx)
      })
    }

    return this.ownerCart(userId, sessionId)
  }

  /**
   * Thêm sản phẩm vào giỏ hàng
   */
  async add(userId: number | undefined, owner: CartOwner, input: AddCartItemInput) {
    return prisma.$transaction(async (tx) => {
      // 1. Tải giỏ hàng (gộp giỏ nếu cần)
      const cart = userId && owner.sessionId
        ? await this.cartRepo.mergeGuestCart(userId, owner.sessionId, tx)
        : await this.cartRepo.findOrCreateOwner(userId, owner.sessionId, tx)

      // 2. Kiểm tra sự tồn tại và trạng thái của Biến thể sản phẩm
      const variant = await tx.productVariant.findFirst({
        where: { id: input.variantId, deletedAt: null },
        select: { id: true, stockQuantity: true },
      })

      if (!variant) {
        throw new NotFoundError('Sản phẩm không tồn tại hoặc đã ngừng kinh doanh')
      }

      // 3. Kiểm tra sản phẩm đã có trong giỏ chưa
      const existing = await tx.cartItem.findUnique({
        where: { cartId_variantId: { cartId: cart.id, variantId: input.variantId } },
      })

      const newQuantity = (existing?.quantity ?? 0) + input.quantity

      // 4. Kiểm tra tồn kho
      if (newQuantity > variant.stockQuantity) {
        throw new BadRequestError(`Số lượng yêu cầu vượt quá tồn kho hiện có (${variant.stockQuantity})`)
      }

      // 5. Cập nhật hoặc Thêm mới
      if (existing) {
        await tx.cartItem.update({
          where: { id: existing.id },
          data: { quantity: newQuantity },
        })
      } else {
        await tx.cartItem.create({
          data: { cartId: cart.id, variantId: input.variantId, quantity: input.quantity },
        })
      }

      return this.cartRepo.get(cart.id, tx)
    })
  }

  /**
   * Cập nhật số lượng sản phẩm trong giỏ
   */
  async update(userId: number | undefined, owner: CartOwner, itemId: number, input: UpdateCartItemInput) {
    return prisma.$transaction(async (tx) => {
      const cart = await this.ownerCart(userId, owner.sessionId, tx)

      // Tìm món hàng trong giỏ kèm kiểm tra biến thể còn hiệu lực hay không
      const item = await tx.cartItem.findFirst({
        where: { id: itemId, cartId: cart.id },
        include: { variant: true },
      })

      if (!item || item.variant.deletedAt !== null) {
        throw new NotFoundError('Mục sản phẩm không tồn tại hoặc đã bị gỡ khỏi hệ thống')
      }

      // Kiểm tra tồn kho
      if (input.quantity > item.variant.stockQuantity) {
        throw new BadRequestError(`Số lượng vượt quá tồn kho hiện có (${item.variant.stockQuantity})`)
      }

      // Nếu số lượng = 0 thì xóa khỏi giỏ
      if (input.quantity === 0) {
        await tx.cartItem.delete({ where: { id: itemId } })
      } else {
        await tx.cartItem.update({
          where: { id: itemId },
          data: { quantity: input.quantity },
        })
      }

      return this.cartRepo.get(cart.id, tx)
    })
  }

  /**
   * Xóa sản phẩm khỏi giỏ hàng
   */
  async remove(userId: number | undefined, owner: CartOwner, itemId: number) {
    const cart = await this.ownerCart(userId, owner.sessionId)

    const result = await prisma.cartItem.deleteMany({
      where: { id: itemId, cartId: cart.id },
    })

    if (!result.count) {
      throw new NotFoundError('Mục sản phẩm không tồn tại trong giỏ hàng')
    }

    return this.cartRepo.get(cart.id)
  }
}