import { AddressRepo } from './address.repo'
import { CreateAddressBodyType, GetAddressQueryType, UpdateAddressBodyType } from './address.schema'
import { AppError } from '@/common/errors'

export class AddressService {
    constructor(private repo = new AddressRepo()) {}
    async listAddresses(userId: number, query: GetAddressQueryType) {
        return this.repo.listAddresses(userId, query)
    }
    async getAddress(id: number, userId: number) {
        const address = await this.repo.findAddressById(id, userId)
        if (!address) throw new AppError('Địa chỉ không tồn tại', 404)
        return address
    }
    async createAddress(userId: number, data: CreateAddressBodyType) {
        return this.repo.createAddress(userId, data)
    }
    async updateAddress(id: number, userId: number, data: UpdateAddressBodyType) {
        await this.getAddress(id, userId)
        return this.repo.updateAddress(id, userId, data)
    }
    async deleteAddress(id: number, userId: number) {
        await this.getAddress(id, userId)
        return this.repo.deleteAddress(id, userId)
    }
}