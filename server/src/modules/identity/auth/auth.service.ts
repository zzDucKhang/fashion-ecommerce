import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { randomInt, randomUUID } from 'crypto'
import ms from 'ms'
import { envConfig } from '@/config/env.config'
import { AppError } from '@/common/errors'
import { AuthRepo } from './auth.repo'
import {
    ChangePasswordBodyType,
    LoginUserBodyType,
    RegisterUserBodyType,
    ResetPasswordBodyType,
    VerificationCodeParamsType,
} from './auth.schema'
import { sendVerificationEmail } from '@/common/service/mail'

type TokenUser = { userId: number; roleId: number }

export class AuthService {
    constructor(private authRepo = new AuthRepo()) {}

    // ==========================================
    // 1. TOKEN & UTILS HELPERS
    // ==========================================

    private createAccessToken(user: TokenUser) {
        return jwt.sign(user, envConfig.ACCESS_TOKEN_SECRET, {
            expiresIn: envConfig.ACCESS_TOKEN_EXPIRES_IN as ms.StringValue,
        })
    }

    private createRefreshToken(user: TokenUser) {
        return jwt.sign({ ...user, tokenId: randomUUID() }, envConfig.REFRESH_TOKEN_SECRET, {
            expiresIn: envConfig.REFRESH_TOKEN_EXPIRES_IN as ms.StringValue,
        })
    }

    private createResetPasswordToken(verificationId: number, email: string) {
        return jwt.sign(
            { verificationId, email, purpose: 'RESET_PASSWORD' },
            envConfig.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' },
        )
    }

    private verifyResetPasswordToken(token: string): JwtPayload {
        try {
            const payload = jwt.verify(token, envConfig.ACCESS_TOKEN_SECRET) as JwtPayload
            if (payload.purpose !== 'RESET_PASSWORD') {
                throw new AppError('Token không hợp lệ', 401)
            }
            return payload
        } catch (error) {
            if (error instanceof AppError) throw error
            throw new AppError('Token đặt lại mật khẩu không hợp lệ hoặc đã hết hạn', 401)
        }
    }

    private getExpiryDate(value: string) {
        const duration = ms(value as ms.StringValue)
        if (typeof duration !== 'number') throw new AppError('Thời gian token không hợp lệ', 500)
        return new Date(Date.now() + duration)
    }

    private sanitizeUser(user: any) {
        const { passwordHash, ...safeUser } = user
        return safeUser
    }

    // ==========================================
    // 2. OTP & VERIFICATION HELPERS
    // ==========================================

    private async createVerificationCode(email: string, type: 'REGISTER' | 'FORGOT_PASSWORD') {
        const COOLDOWN_SECONDS = 60
        const existing = await this.authRepo.findValidVerificationCodeByEmail(email, type)

        if (existing) {
            const elapsedMs = Date.now() - existing.createdAt.getTime()
            if (elapsedMs < COOLDOWN_SECONDS * 1000) {
                const remainingSec = Math.ceil((COOLDOWN_SECONDS * 1000 - elapsedMs) / 1000)
                throw new AppError(`Vui lòng chờ ${remainingSec} giây trước khi yêu cầu mã mới`, 429)
            }
            // Hết cooldown -> vô hiệu hóa OTP cũ trước khi tạo mới
            await this.authRepo.markVerificationCodeUsed(existing.id)
        }

        const code = randomInt(100000, 1000000).toString()
        await this.authRepo.createVerificationCode({
            email,
            code,
            type,
            expiresAt: new Date(Date.now() + 15 * 60 * 1000),
        })
        return code
    }

    private async verifyVerificationCode(email: string, code: string, type: 'REGISTER' | 'FORGOT_PASSWORD') {
        const verification = await this.authRepo.findValidVerificationCode(email, code, type)
        if (!verification) throw new AppError('Mã xác thực không hợp lệ hoặc đã hết hạn', 401)
        return verification
    }

    // ==========================================
    // 3. AUTHENTICATION FLOW
    // ==========================================

    async register(data: RegisterUserBodyType) {
        const email = data.email.toLowerCase()
        const existingUser = await this.authRepo.findUserByEmail(email)

        if (existingUser) {
            if (existingUser.status === 'ACTIVE' || existingUser.status === 'BLOCKED') {
                throw new AppError('Email đã được sử dụng', 409)
            }

            // User tồn tại nhưng INACTIVE (đăng ký dở dang hoặc chưa kích hoạt)
            await this.authRepo.deactivateAllVerificationCodes(email, 'REGISTER')
            const updatedUser = await this.authRepo.updateInactiveUser(existingUser.id, {
                fullName: data.fullName,
                phoneNumber: data.phoneNumber,
                passwordHash: await bcrypt.hash(data.password, 10),
            })

            const code = await this.createVerificationCode(email, 'REGISTER')
            await sendVerificationEmail(email, code)
            return {
                user: this.sanitizeUser(updatedUser),
                message: 'Mã xác thực mới đã được gửi tới email của bạn',
            }
        }

        const role = await this.authRepo.findRoleByCode('CUSTOMER')
        if (!role) throw new AppError('Chưa cấu hình role CUSTOMER', 500)

        try {
            const user = await this.authRepo.createUser({
                data: { ...data, email },
                roleId: role.id,
                passwordHash: await bcrypt.hash(data.password, 10),
                status: 'INACTIVE',
            })

            await this.authRepo.deactivateAllVerificationCodes(email, 'REGISTER')
            const code = await this.createVerificationCode(email, 'REGISTER')
            await sendVerificationEmail(email, code)
            return { user: this.sanitizeUser(user) }
        } catch (error: any) {
            if (error?.code === 'P2002') throw new AppError('Email đã được sử dụng', 409)
            throw error
        }
    }

    async verifyCode(data: VerificationCodeParamsType) {
        const email = data.email.toLowerCase()
        const verification = await this.verifyVerificationCode(email, data.code, data.type)

        if (data.type === 'REGISTER') {
            const user = await this.authRepo.findUserByEmail(verification.email)
            if (!user) throw new AppError('Tài khoản không tồn tại', 404)

            await this.authRepo.activateUser(user.id)
            await this.authRepo.markVerificationCodeUsed(verification.id)
            return { message: 'Xác thực email thành công' }
        }

        const resetToken = this.createResetPasswordToken(verification.id, verification.email)
        return { message: 'Mã xác thực hợp lệ', resetToken }
    }

    async login(data: LoginUserBodyType, ipAddress: string) {
        const user = await this.authRepo.findUserByEmail(data.email.toLowerCase())
        if (!user || !(await bcrypt.compare(data.password, user.passwordHash))) {
            throw new AppError('Email hoặc mật khẩu không đúng', 401)
        }
        if (user.status !== 'ACTIVE') throw new AppError('Tài khoản không hoạt động', 403)

        const tokenUser = { userId: user.id, roleId: user.roleId }
        const refreshToken = this.createRefreshToken(tokenUser)

        await this.authRepo.createDeviceSession({
            userId: user.id,
            refreshToken,
            ipAddress: ipAddress || 'unknown',
            expiresAt: this.getExpiryDate(envConfig.REFRESH_TOKEN_EXPIRES_IN),
        })

        return {
            accessToken: this.createAccessToken(tokenUser),
            refreshToken,
            user: this.sanitizeUser(user),
        }
    }

    async refresh(refreshToken: string, ipAddress: string) {
        let payload: JwtPayload
        try {
            payload = jwt.verify(refreshToken, envConfig.REFRESH_TOKEN_SECRET) as JwtPayload
        } catch {
            throw new AppError('Refresh token không hợp lệ hoặc đã hết hạn', 401)
        }

        const session = await this.authRepo.findDeviceSession(refreshToken)
        if (!session || session.expiresAt <= new Date() || payload.userId !== session.userId) {
            throw new AppError('Refresh token không hợp lệ hoặc đã hết hạn', 401)
        }
        if (session.user.status !== 'ACTIVE' || session.user.deletedAt) {
            throw new AppError('Tài khoản đã bị khóa hoặc không hoạt động', 403)
        }

        await this.authRepo.deactivateDeviceSession(session.id)
        const tokenUser = { userId: session.user.id, roleId: session.user.roleId }
        const newRefreshToken = this.createRefreshToken(tokenUser)

        await this.authRepo.createDeviceSession({
            userId: session.user.id,
            refreshToken: newRefreshToken,
            ipAddress: ipAddress || 'unknown',
            expiresAt: this.getExpiryDate(envConfig.REFRESH_TOKEN_EXPIRES_IN),
        })

        return {
            accessToken: this.createAccessToken(tokenUser),
            refreshToken: newRefreshToken,
        }
    }

    async logout(refreshToken: string) {
        const session = await this.authRepo.findDeviceSession(refreshToken)
        if (!session) throw new AppError('Refresh token không hợp lệ', 401)
        await this.authRepo.deactivateDeviceSession(session.id)
        return { message: 'Đăng xuất thành công' }
    }

    // ==========================================
    // 4. PASSWORD MANAGEMENT
    // ==========================================

    async forgotPassword(email: string) {
        const user = await this.authRepo.findUserByEmail(email.toLowerCase())
        const genericMessage = { message: 'Nếu email tồn tại trong hệ thống, mã xác thực đã được gửi tới hộp thư của bạn' }
        if (!user) return genericMessage

        try {
            const code = await this.createVerificationCode(user.email, 'FORGOT_PASSWORD')
            await sendVerificationEmail(user.email, code)
        } catch (error) {
            // Nuốt lỗi 429 để không lộ email tồn tại trong hệ thống
            if (error instanceof AppError && error.statusCode === 429) return genericMessage
            throw error
        }
        return genericMessage
    }

    async resetPassword(data: ResetPasswordBodyType) {
        const tokenPayload = this.verifyResetPasswordToken(data.token)

        const verification = await this.authRepo.findVerificationCodeById(Number(tokenPayload.verificationId))
        if (!verification || verification.isUsed) {
            throw new AppError('Token đặt lại mật khẩu đã được sử dụng hoặc không hợp lệ', 401)
        }

        const user = await this.authRepo.findUserByEmail(verification.email)
        if (!user) throw new AppError('Tài khoản không tồn tại', 404)

        await this.authRepo.updatePassword(user.id, await bcrypt.hash(data.newPassword, 10))
        await this.authRepo.markVerificationCodeUsed(verification.id)
        await this.authRepo.deactivateAllUserSessions(user.id)

        return { message: 'Đặt lại mật khẩu thành công' }
    }

    async changePassword(userId: number, data: ChangePasswordBodyType) {
        const user = await this.authRepo.findUserById(userId)
        if (!user || user.status !== 'ACTIVE') {
            throw new AppError('Tài khoản không tồn tại hoặc đã bị khóa', 403)
        }
        if (!(await bcrypt.compare(data.oldPassword, user.passwordHash))) {
            throw new AppError('Mật khẩu cũ không đúng', 401)
        }
        if (data.newPassword === data.oldPassword) {
            throw new AppError('Mật khẩu mới không được trùng với mật khẩu cũ', 400)
        }

        await this.authRepo.updatePassword(user.id, await bcrypt.hash(data.newPassword, 10))
        await this.authRepo.deactivateAllUserSessions(user.id)

        return { message: 'Đổi mật khẩu thành công. Vui lòng đăng nhập lại.' }
    }
}
