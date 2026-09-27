import { Router } from 'express'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import { authGuard } from '@/middlewares/guards/auth.guard'
import { roleGuard } from '@/middlewares/guards/role.guard'
import { RolePermissionController } from './role-permission.controller'
import {
	createPermissionBodySchema,
	createRoleBodySchema,
	getPermissionQuerySchema,
	getRolePermissionQuerySchema,
	permissionParamsSchema,
	roleParamsSchema,
	updatePermissionBodySchema,
	updateRoleBodySchema,
} from './role-permission.schema'

export const rolePermissionRouter = Router()
const controller = new RolePermissionController()

rolePermissionRouter.use(authGuard, roleGuard('ADMIN'))

rolePermissionRouter.get('/', validateRequest({ query: getRolePermissionQuerySchema }), controller.listRoles)
rolePermissionRouter.get('/permissions', validateRequest({ query: getPermissionQuerySchema }), controller.listPermissions)
rolePermissionRouter.get('/permissions/:permissionId', validateRequest({ params: permissionParamsSchema }), controller.getPermission)
rolePermissionRouter.post('/permissions', validateRequest({ body: createPermissionBodySchema }), controller.createPermission)
rolePermissionRouter.put('/permissions/:permissionId', validateRequest({ params: permissionParamsSchema, body: updatePermissionBodySchema }), controller.updatePermission)
rolePermissionRouter.delete('/permissions/:permissionId', validateRequest({ params: permissionParamsSchema }), controller.deletePermission)
rolePermissionRouter.get('/:roleId', validateRequest({ params: roleParamsSchema }), controller.getRole)
rolePermissionRouter.post('/', validateRequest({ body: createRoleBodySchema }), controller.createRole)
rolePermissionRouter.put('/:roleId', validateRequest({ params: roleParamsSchema, body: updateRoleBodySchema }), controller.updateRole)
rolePermissionRouter.delete('/:roleId', validateRequest({ params: roleParamsSchema }), controller.deleteRole)
