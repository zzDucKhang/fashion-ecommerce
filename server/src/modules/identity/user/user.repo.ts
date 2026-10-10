import { prisma } from '@/database/prisma'
import { GetUserQueryType, UpdateUserBodyType, UpdateUserStatusBodyType} from './user.schema'
// [Smoke Test] Cross-module WRITE access verified

export class UserRepo {
    async list(query: GetUserQueryType) {
        const skip = (query.page - 1) * query.limit
        const take = query.limit

        const where: any = { deletedAt: null }
        if (query.status) where.status = query.status
        if (query.roleId) where.roleId = query.roleId
        if (query.search) {
            where.OR = [
                { email: { contains: query.search, mode: 'insensitive' } },
                { fullName: { contains: query.search, mode: 'insensitive' } },
            ]
        }

        const [totalItems, data] = await Promise.all([
            prisma.user.count({ where }),
            prisma.user.findMany({
                where,
                skip,
                take,
                select: {
                    id: true,
                    email: true,
                    fullName: true,
                    phoneNumber: true,
                    avatarUrl: true,
                    status: true,
                    role: { select: { id: true, name: true, code: true } },
                    createdAt: true,
                },
                orderBy: { createdAt: 'desc' },
            }),
        ])

        return {
            data,
            totalItems,
            page: query.page,
            limit: query.limit,
            totalPages: Math.ceil(totalItems / query.limit),
        }
    }

    //Lấy chi tiết 1 User
    async findById(id: number) {
        return prisma.user.findFirst({
            where: { id, deletedAt: null },
            select: {
                id: true,
                email: true,
                fullName: true,
                phoneNumber: true,
                avatarUrl: true,
                status: true,
                role: { select: { id: true, name: true, code: true } },
                shippingAddresses: true,
                createdAt: true,
                updatedAt: true,
            },
        })
    }

    // 3. Tìm user bằng email
    async findByEmail(email: string) {
        return prisma.user.findFirst({
            where: { email, deletedAt: null },
        })
    }

    // 4. Cập nhật hồ sơ
    async updateUser({
        id,
        updatedById,
        data,
    }: {
        id: number
        updatedById: number
        data: UpdateUserBodyType
    }) {
        return prisma.user.update({
            where: { id },
            data: {
                ...data,
                updatedById,
            },
            select: {
                id: true,
                email: true,
                fullName: true,
                phoneNumber: true,
                avatarUrl: true,
                status: true,
                roleId: true,
                role: { select: { id: true, name: true, code: true } },
                rewardPoints: true,
                createdAt: true,
            },
        })
    }

    // 5. Cập nhật trạng thái
    async updateStatus({
        id,
        updatedById,
        data,
    }: {
        id: number
        updatedById: number
        data: UpdateUserStatusBodyType
    }) {
        return prisma.$transaction(async (tx) => {
            if (data.status === 'BLOCKED' || data.status === 'INACTIVE') {
                await tx.deviceSession.updateMany({
                    where: { userId: id, isActive: true },
                    data: { isActive: false },
                })
            }
            return tx.user.update({
                where: { id },
                data: {
                    status: data.status,
                    updatedById,
                },
            })
        })
    }

    // 6. Xóa mềm (Soft Delete)
    async deleteUser({ id, deletedById }: { id: number; deletedById: number }) {
        return prisma.$transaction(async (tx) => {
            await tx.deviceSession.updateMany({
                where: { userId: id, isActive: true },
                data: { isActive: false },
            })
            return tx.user.update({
                where: { id },
                data: {
                    deletedAt: new Date(),
                    deletedById,
                },
            })
        })
    }
}