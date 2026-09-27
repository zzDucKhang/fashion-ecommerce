import { prisma } from '@/database/prisma'
import {
    CreatePermissionBodyType,
    CreateRoleBodyType,
    GetPermissionQueryType,
    GetRolePermissionQueryType,
    UpdatePermissionBodyType,
    UpdateRoleBodyType,
} from './role-permission.schema'

const permissionSelect = { id: true, code: true, module: true, description: true } as const
const roleInclude = {
    permissions: { where: { deletedAt: null }, select: permissionSelect },
    _count: { select: { users: true } },
} as const

export class RolePermissionRepo {
    async listRoles(query: GetRolePermissionQueryType) {
        const skip = (query.page - 1) * query.limit
        const where = {
            deletedAt: null,
            ...(query.search
                ? { OR: [{ name: { contains: query.search, mode: 'insensitive' as const } }, { code: { contains: query.search, mode: 'insensitive' as const } }] }
                : {}),
        }
        const [totalItems, data] = await Promise.all([
            prisma.role.count({ where }),
            prisma.role.findMany({ where, skip, take: query.limit, include: roleInclude, orderBy: { createdAt: 'desc' } }),
        ])
        return { data, totalItems, page: query.page, limit: query.limit, totalPages: Math.ceil(totalItems / query.limit) }
    }

    async findRoleById(id: number) {
        return prisma.role.findFirst({ where: { id, deletedAt: null }, include: roleInclude })
    }

    async findRoleByCode(code: string) {
        return prisma.role.findFirst({ where: { code, deletedAt: null }, include: roleInclude })
    }

    async createRole(data: CreateRoleBodyType, createdById: number) {
        const { permissionIds = [], ...roleData } = data
        return prisma.role.create({ data: { ...roleData, createdById, permissions: { connect: permissionIds.map((id) => ({ id })) } }, include: roleInclude })
    }

    async updateRole(id: number, data: UpdateRoleBodyType, updatedById: number) {
        const { permissionIds, ...roleData } = data
        return prisma.role.update({
            where: { id },
            data: { ...roleData, updatedById, ...(permissionIds !== undefined && { permissions: { set: permissionIds.map((permissionId) => ({ id: permissionId })) } }) },
            include: roleInclude,
        })
    }

    async softDeleteRole(id: number, deletedById: number) {
        return prisma.role.update({ where: { id }, data: { deletedAt: new Date(), deletedById, isActive: false } })
    }

    async listPermissions(query: GetPermissionQueryType) {
        const skip = (query.page - 1) * query.limit
        const where = {
            deletedAt: null,
            ...(query.module ? { module: query.module } : {}),
            ...(query.search
                ? { OR: [{ code: { contains: query.search, mode: 'insensitive' as const } }, { module: { contains: query.search, mode: 'insensitive' as const } }, { description: { contains: query.search, mode: 'insensitive' as const } }] }
                : {}),
        }
        const [totalItems, data] = await Promise.all([
            prisma.permission.count({ where }),
            prisma.permission.findMany({ where, skip, take: query.limit, select: { ...permissionSelect, _count: { select: { roles: true } } }, orderBy: [{ module: 'asc' }, { code: 'asc' }] }),
        ])
        return { data, totalItems, page: query.page, limit: query.limit, totalPages: Math.ceil(totalItems / query.limit) }
    }

    async findPermissionById(id: number) {
        return prisma.permission.findFirst({ where: { id, deletedAt: null }, select: { ...permissionSelect, roles: { where: { deletedAt: null }, select: { id: true, code: true, name: true } } } })
    }

    async findPermissionByCode(code: string) {
        return prisma.permission.findFirst({ where: { code, deletedAt: null }, select: permissionSelect })
    }

    async createPermission(data: CreatePermissionBodyType, createdById: number) {
        return prisma.permission.create({ data: { ...data, createdById }, select: permissionSelect })
    }

    async updatePermission(id: number, data: UpdatePermissionBodyType, updatedById: number) {
        return prisma.permission.update({ where: { id }, data: { ...data, updatedById }, select: permissionSelect })
    }

    async softDeletePermission(id: number, deletedById: number) {
        return prisma.permission.update({ where: { id }, data: { deletedAt: new Date(), deletedById }, select: permissionSelect })
    }
}

