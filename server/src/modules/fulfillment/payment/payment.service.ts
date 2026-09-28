import { PaymentRepo } from './payment.repo'
import { GetAllPaymentsQueryType } from './payment.schema'
import { AppError } from '@/common/errors'

export class PaymentService {
  constructor(private paymentRepo = new PaymentRepo()) {}

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
