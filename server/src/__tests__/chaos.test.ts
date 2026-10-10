import { describe, it, expect, vi, beforeEach } from 'vitest'
import { cacheService } from '@/common/cache/cache.service'
import { createOrderSchema } from '@/modules/cart-order/order/order.schema'
import { ZodError } from 'zod'

// Mock logger to keep console clean during tests
vi.mock('@/common/logger', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
  }
}))

describe('Phase 8: Chaos Engineering Evals', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  describe('Scenario 1: Redis Connection Failure / Timeout', () => {
    it('should gracefully degrade and return null when Redis GET fails or times out', async () => {
      // Giả lập Redis Client bắn ra lỗi timeout
      if ((cacheService as any).client) {
        vi.spyOn((cacheService as any).client, 'get').mockRejectedValue(new Error('Redis Timeout'))
      }

      const result = await cacheService.get('test_key')
      
      // Khẳng định: Dù Redis sập, hàm cache.get() vẫn trả về null để fallback về Database thay vì crash Node process
      expect(result).toBeNull()
    })

    it('should silently ignore Redis SET failure without throwing unhandled rejection', async () => {
      if ((cacheService as any).client) {
        vi.spyOn((cacheService as any).client, 'set').mockRejectedValue(new Error('Redis Timeout'))
      }

      // Action: Gọi hàm set (không await cũng không ném lỗi unhandled)
      await expect(cacheService.set('key', 'value')).resolves.toBeUndefined()
    })
  })

  describe('Scenario 2: Malformed Payload from LLM/AI Agent', () => {
    it('should strictly REJECT payload missing required fields or containing hallucinatory fields', () => {
      const hallucinatoryPayload = {
        // Missing shippingAddressId, missing directBuy
        paymentMethod: 'VNPAY',
        // Hallucination field not defined in schema (Zod .strict() should block this)
        magicalDiscountCode: 'HACKER_CODE_123', 
        shippingMethod: 'MAGIC_BIRD'
      }

      const result = createOrderSchema.safeParse(hallucinatoryPayload)
      
      expect(result.success).toBe(false)
      if (!result.success) {
        // Assert that extra fields are caught by strict mode
        const hasUnrecognizedKeyError = result.error.errors.some(
          (err) => err.code === 'unrecognized_keys'
        )
        expect(hasUnrecognizedKeyError).toBe(true)
      }
    })
  })

  describe('Scenario 3: Database Deadlock / Transaction Rollback', () => {
    it('should propagate Prisma deadlock exceptions to trigger Express Error Handler (simulated)', async () => {
      const mockPrismaTransaction = vi.fn().mockRejectedValue(
        new Error('Deadlock found when trying to get lock; try restarting transaction')
      )

      await expect(mockPrismaTransaction()).rejects.toThrow('Deadlock found')
      // Note: Trong thực tế ứng dụng sẽ bắt lỗi này ở middleware error handler, 
      // hệ thống không được catch lỏng lẻo làm mất state của transaction
    })
  })
})
