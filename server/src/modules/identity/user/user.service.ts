import { UserRepo } from './user.repo'
import { GetUserQueryType, UpdateUserBodyType, UpdateUserStatusBodyType } from './user.schema'
import { AppError, ForbiddenError, NotFoundError } from '@/common/errors'
import { prisma } from '@/database/prisma'

export class UserService {
    private userRepo = new UserRepo()

    private async isAdmin(roleId: number) {
        if (!roleId) return false
        const role = await prisma.role.findFirst({ where: { id: roleId, isActive: true, deletedAt: null } })
        return role?.code === 'ADMIN'
    }

    async listUsers(query: GetUserQueryType) {
        return this.userRepo.list(query)
    }

    async getUserById(userId: number, currentUser: { userId: number; roleId: number }) {
        if (currentUser.userId !== userId && !(await this.isAdmin(currentUser.roleId))) {
            throw new ForbiddenError('Bạn không có quyền xem thông tin người dùng này')
        }
        const user = await this.userRepo.findById(userId)
        if (!user) {
            throw new NotFoundError('Người dùng không tồn tại')
        }
        return user
    }

    async updateUser(userId: number, currentUser: { userId: number; roleId: number }, data: UpdateUserBodyType) {
        if (currentUser.userId !== userId && !(await this.isAdmin(currentUser.roleId))) {
            throw new ForbiddenError('Bạn không có quyền cập nhật thông tin người dùng này')
        }
        const user = await this.userRepo.findById(userId)
        if (!user) {
            throw new NotFoundError('Người dùng không tồn tại')
        }
        return this.userRepo.updateUser({ id: userId, updatedById: currentUser.userId, data })
    }
    async updateStatus(userId: number, CurrentUserId: number, data: UpdateUserStatusBodyType) {
        const user = await this.userRepo.findById(userId)
        if (!user) throw new NotFoundError('Người dùng không tồn tại')
        return this.userRepo.updateStatus({ id: userId, updatedById: CurrentUserId, data })
    }
    async deleteUser(userId: number, CurrentUserId: number) {
        if (userId === CurrentUserId) {
            throw new AppError('Bạn không thể tự xóa tài khoản của chính mình', 400)
        }
        const user = await this.userRepo.findById(userId)
        if (!user) throw new NotFoundError('Người dùng không tồn tại')
        return this.userRepo.deleteUser({ id: userId, deletedById: CurrentUserId })
    }   
}
