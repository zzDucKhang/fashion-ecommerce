import { UserRepo } from './user.repo'
import { GetUserQueryType, UpdateUserBodyType, UpdateUserStatusBodyType } from './user.schema'

export class UserService {
    private userRepo = new UserRepo()

    async listUsers(query: GetUserQueryType) {
        return this.userRepo.list(query)
    }
    async getUserById(userId: number) {
        const user = await this.userRepo.findById(userId)
        if (!user) {
            throw new Error('User not found')
        }
        return user
    }
    async updateUser(userId: number, CurrentUserId: number, data: UpdateUserBodyType) {
        await this.getUserById(userId) // Kiểm tra xem user có tồn tại không
        return this.userRepo.updateUser({ id: userId, updatedById: CurrentUserId , data})
    }
    async updateStatus(userId: number, CurrentUserId: number, data: UpdateUserStatusBodyType) {
        await this.getUserById(userId)
        return this.userRepo.updateStatus({ id: userId, updatedById: CurrentUserId , data})
    }
    async deleteUser(userId: number, CurrentUserId: number) {
        await this.getUserById(userId)
        return this.userRepo.deleteUser({ id: userId, deletedById: CurrentUserId })
    }   
}
