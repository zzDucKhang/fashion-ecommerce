import { Request, Response, NextFunction } from 'express'
import { AppError } from '@/common/errors'
import { RolePermissionService } from './role-permission.service'

 type UserRequest = Request & { user?: { id: number; roleId: number } }

export class RolePermissionController {
  constructor(private service = new RolePermissionService()) {}

  private getActorId(req: UserRequest) {
    const id = req.user?.id
    if (!id) throw new AppError('Chưa xác thực người dùng', 401)
    return id
  }

  listRoles = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({ statusCode: 200, data: await this.service.listRoles(req.query as any) })
    } catch (error) {
      next(error)
    }
  }

  getRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({ statusCode: 200, data: await this.service.getRole(Number(req.params.roleId)) })
    } catch (error) {
      next(error)
    }
  }

  createRole = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.createRole(req.body, this.getActorId(req))
      return res.status(201).json({ statusCode: 201, message: 'Tạo vai trò thành công', data })
    } catch (error) {
      next(error)
    }
  }

  updateRole = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.updateRole(Number(req.params.roleId), req.body, this.getActorId(req))
      return res.status(200).json({ statusCode: 200, message: 'Cập nhật vai trò thành công', data })
    } catch (error) {
      next(error)
    }
  }

  deleteRole = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({ statusCode: 200, ...(await this.service.deleteRole(Number(req.params.roleId), this.getActorId(req))) })
    } catch (error) {
      next(error)
    }
  }

  listPermissions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({ statusCode: 200, data: await this.service.listPermissions(req.query as any) })
    } catch (error) {
      next(error)
    }
  }

  getPermission = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({ statusCode: 200, data: await this.service.getPermission(Number(req.params.permissionId)) })
    } catch (error) {
      next(error)
    }
  }

  createPermission = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.createPermission(req.body, this.getActorId(req))
      return res.status(201).json({ statusCode: 201, message: 'Tạo permission thành công', data })
    } catch (error) {
      next(error)
    }
  }

  updatePermission = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.updatePermission(Number(req.params.permissionId), req.body, this.getActorId(req))
      return res.status(200).json({ statusCode: 200, message: 'Cập nhật permission thành công', data })
    } catch (error) {
      next(error)
    }
  }

  deletePermission = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({ statusCode: 200, ...(await this.service.deletePermission(Number(req.params.permissionId), this.getActorId(req))) })
    } catch (error) {
      next(error)
    }
  }
}
