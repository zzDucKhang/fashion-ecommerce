import { PaymentRepo } from './payment.repo'
import { GetAllPaymentsQueryType } from './payment.schema'
import { AppError } from '@/common/errors'
import { OrderService } from '@/modules/cart-order/order/order.service'
import { randomBytes } from 'node:crypto'

export class PaymentService {
  constructor(private paymentRepo = new PaymentRepo(), private orderService = new OrderService()) {}

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
