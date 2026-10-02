import { PaymentRepo } from './payment.repo'
import { GetAllPaymentsQueryType } from './payment.schema'
import { AppError } from '@/common/errors'
import { OrderService } from '@/modules/cart-order/order/order.service'
import { randomBytes } from 'node:crypto'
import crypto from 'node:crypto'
import { SePayWebhookPayload } from './payment.schema'

export class PaymentService {
  constructor(private paymentRepo = new PaymentRepo(), private orderService = new OrderService()) {}

  verifySePaySignature(
    rawBody: Buffer,
    signature: string,
    timestamp: string,
  ) {
    const secret = process.env.SEPAY_WEBHOOK_SECRET

    if (!secret) {
      throw new Error('SEPAY_WEBHOOK_SECRET chưa được cấu hình')
    }

    const timestampNumber = Number(timestamp)

    if (!Number.isFinite(timestampNumber)) {
      return false
    }

    // Reject replayed requests older than 5 minutes
    if (Math.abs(Date.now() / 1000 - timestampNumber) > 300) {
      return false
    }

    const payload = `${timestamp}.${rawBody.toString('utf8')}`

    const expected =
      'sha256=' +
      crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('hex')

    const expectedBuffer = Buffer.from(expected)
    const actualBuffer = Buffer.from(signature)

    if (expectedBuffer.length !== actualBuffer.length) {
      return false
    }

    return crypto.timingSafeEqual(
      expectedBuffer,
      actualBuffer,
    )
  }
  async handleSePayWebhook(payload: SePayWebhookPayload) {
    if (payload.transferType !== 'in') {
      throw new AppError('Không phải giao dịch tiền vào', 400)
    }

    if (!payload.code) {
      throw new AppError('Không tìm thấy payment code', 400)
    }

    const payment = await this.paymentRepo.findByPaymentCode(payload.code)

    if (!payment) {
      throw new AppError('Payment không tồn tại', 404)
    }

    if (payment.status === 'SUCCESS') {
      return payment
    }

    if (Number(payment.amount) !== Number(payload.transferAmount)) {
      throw new AppError('Số tiền thanh toán không khớp', 400)
    }

    const expectedAccount = process.env.SEPAY_ACCOUNT_NUMBER

    if (
      expectedAccount &&
      payload.accountNumber !== expectedAccount &&
      payload.subAccount !== expectedAccount
    ) {
      throw new AppError('Tài khoản nhận tiền không hợp lệ', 400)
    }

    return this.paymentRepo.markSuccess(
      payment.id,
      String(payload.id),
    )
  }
  

  async create(orderId: number, userId: number) {
    const order = await this.orderService.findById(userId, orderId)
    if (order.status !== 'PENDING_PAYMENT') throw new AppError('Đơn hàng không còn chờ thanh toán', 409)
    const paymentCode = `SHOP-${randomBytes(3).toString('hex').toUpperCase()}`
    const amount = Number(order.totalAmount)
    const payment = await this.paymentRepo.create({ orderId, amount, paymentCode })
    const qrBaseUrl = process.env.SEPAY_QR_BASE_URL ?? 'https://qr.sepay.vn/img'
    const accountNumber = process.env.SEPAY_ACCOUNT_NUMBER
    const bankCode = process.env.SEPAY_BANK_CODE
    if (!accountNumber || !bankCode) throw new AppError('SePay chưa được cấu hình', 500)
    const qrUrl = new URL(qrBaseUrl)
    qrUrl.searchParams.set('acc', accountNumber); qrUrl.searchParams.set('bank', bankCode)
    qrUrl.searchParams.set('amount', String(amount)); qrUrl.searchParams.set('des', paymentCode)
    return { paymentId: String(payment.id), amount, paymentCode, qrUrl: qrUrl.toString() }
  }

  async findAll(query: GetAllPaymentsQueryType) {
    return this.paymentRepo.findAll(query)
  }

  async findById(id: number) {
    const payment = await this.paymentRepo.findById(id)
    if (!payment) {
      throw new AppError('Giao dịch thanh toán không tồn tại', 404)
    }
    return payment
  }
}
