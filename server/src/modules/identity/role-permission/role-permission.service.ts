import { AppError } from '@/common/errors'
import { RolePermissionRepo } from './role-permission.repo'
import {
  CreatePermissionBodyType,
  CreateRoleBodyType,
  GetPermissionQueryType,
  GetRolePermissionQueryType,
  UpdatePermissionBodyType,
  UpdateRoleBodyType,
} from './role-permission.schema'

export class RolePermissionService {
  constructor(private repo = new RolePermissionRepo()) {}

  listRoles(query: GetRolePermissionQueryType) {
    return this.repo.listRoles(query)
  }

  async getRole(id: number) {
    const role = await this.repo.findRoleById(id)
    if (!role) throw new AppError('Vai trò không tồn tại', 404)
    return role
  }

  async createRole(data: CreateRoleBodyType, actorId: number) {
    if (await this.repo.findRoleByCode(data.code)) throw new AppError('Mã vai trò đã tồn tại', 409)
    return this.repo.createRole(data, actorId)
  }

  async updateRole(id: number, data: UpdateRoleBodyType, actorId: number) {
    await this.getRole(id)
    return this.repo.updateRole(id, data, actorId)
  }

  async deleteRole(id: number, actorId: number) {
    const role = await this.getRole(id)
    if (role.code === 'CUSTOMER' || role.code === 'ADMIN') throw new AppError('Không được xóa role hệ thống', 400)
    await this.repo.softDeleteRole(id, actorId)
    return { message: 'Xóa vai trò thành công' }
  }

  listPermissions(query: GetPermissionQueryType) {
    return this.repo.listPermissions(query)
  }

  async getPermission(id: number) {
    const permission = await this.repo.findPermissionById(id)
    if (!permission) throw new AppError('Permission không tồn tại', 404)
    return permission
  }

  async createPermission(data: CreatePermissionBodyType, actorId: number) {
    if (await this.repo.findPermissionByCode(data.code)) throw new AppError('Mã permission đã tồn tại', 409)
    return this.repo.createPermission(data, actorId)
  }

  async updatePermission(id: number, data: UpdatePermissionBodyType, actorId: number) {
    await this.getPermission(id)
    return this.repo.updatePermission(id, data, actorId)
  }

  async deletePermission(id: number, actorId: number) {
    await this.getPermission(id)
    await this.repo.softDeletePermission(id, actorId)
    return { message: 'Xóa permission thành công' }
  }
}
