import { prisma } from '@/database/prisma'
import { RegisterUserBodyType } from './auth.schema'
import { UserStatus, VerificationCodeType } from '@prisma/client';

export class AuthRepo {
  async findUserByEmail(email: string) {
    return prisma.user.findFirst({ where: { email, deletedAt: null }, include: { role: true } })
  }

  async findUserById(id: number) {
    return prisma.user.findFirst({ where: { id, deletedAt: null }, include: { role: true } })
  }

  async findRoleByCode(code: string) {
    return prisma.role.findFirst({ where: { code, isActive: true, deletedAt: null } })
  }

  async createUser({ data, roleId, passwordHash, status }: { data: RegisterUserBodyType; roleId: number; passwordHash: string; status: UserStatus }) {
    return prisma.user.create({
      data: {
        email: data.email,
        fullName: data.fullName,
        phoneNumber: data.phoneNumber ?? '',
        passwordHash,
        roleId,
        status,
      },
      include: { role: true },
    })
  }

  async createDeviceSession(data: { userId: number; refreshToken: string; ipAddress: string; expiresAt: Date }) {
    return prisma.deviceSession.create({ data })
  }

  async findDeviceSession(refreshToken: string) {
    return prisma.deviceSession.findFirst({
      where: { refreshToken, isActive: true },
      include: { user: { include: { role: true } } },
    })
  }

  async deactivateDeviceSession(id: number) {
    return prisma.deviceSession.update({ where: { id }, data: { isActive: false } })
  }

  async updatePassword(userId: number, passwordHash: string) {
    return prisma.user.update({ where: { id: userId }, data: { passwordHash } })
  }

  async createVerificationCode(data: { email: string; code: string; type: VerificationCodeType; expiresAt: Date }) {
    return prisma.verificationCode.create({ data })
  }

  async findValidVerificationCode(code: string, type: VerificationCodeType) {
    return prisma.verificationCode.findFirst({
      where: { code, type, isUsed: false, expiresAt: { gt: new Date() } },
      orderBy: { createdAt: 'desc' },
    })
  }

  async markVerificationCodeUsed(id: number) {
    return prisma.verificationCode.update({ where: { id }, data: { isUsed: true } })
  }

  async activateUser(userId: number) {
    return prisma.user.update({ where: { id: userId }, data: { status: 'ACTIVE' } })
  }
}
