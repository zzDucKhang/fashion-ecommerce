import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { randomInt, randomUUID } from 'crypto'
import ms from 'ms'
import { envConfig } from '@/config/env.config'
import { AppError } from '@/common/errors'
import { AuthRepo } from './auth.repo'
import { ChangePasswordBodyType, LoginUserBodyType, RegisterUserBodyType, ResetPasswordBodyType, VerificationCodeParamsType } from './auth.schema'

type TokenUser = { userId: number; roleId: number }

export class AuthService {
    constructor(private authRepo = new AuthRepo()) { }

    private createAccessToken(user: TokenUser) {
        return jwt.sign(user, envConfig.ACCESS_TOKEN_SECRET, { expiresIn: envConfig.ACCESS_TOKEN_EXPIRES_IN as ms.StringValue })
    }

    private createRefreshToken(user: TokenUser) {
        return jwt.sign({ ...user, tokenId: randomUUID() }, envConfig.REFRESH_TOKEN_SECRET, {
            expiresIn: envConfig.REFRESH_TOKEN_EXPIRES_IN as ms.StringValue,
        })
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
    private async CreateVerificationCode(email: string, type: 'REGISTER' | 'FORGOT_PASSWORD') {
        const code = randomInt(100000, 1000000).toString()
        await this.authRepo.createVerificationCode({
            email,
            code,
            type,
            expiresAt: new Date(Date.now() + 15 * 60 * 1000),
        })
        return code
    }
    private async verifyVerificationCode(code: string, type: 'REGISTER' | 'FORGOT_PASSWORD') {
        const verification = await this.authRepo.findValidVerificationCode(code, type)
        if (!verification) throw new AppError('Mã xác thực không hợp lệ hoặc đã hết hạn', 401)
        return verification
    }

    async register(data: RegisterUserBodyType) {
        const email = data.email.toLowerCase()
        if (await this.authRepo.findUserByEmail(email)) throw new AppError('Email đã được sử dụng', 409)
        const role = await this.authRepo.findRoleByCode('CUSTOMER')
        if (!role) throw new AppError('Chưa cấu hình role CUSTOMER', 500)
        try {
            const user = await this.authRepo.createUser({
                data: { ...data, email },
                roleId: role.id,
                passwordHash: await bcrypt.hash(data.password, 12),
                status: 'INACTIVE',
            })
            await this.CreateVerificationCode(email, 'REGISTER')
            return { user: this.sanitizeUser(user)}
        } catch (error: any) {
            if (error?.code === 'P2002') throw new AppError('Email đã được sử dụng', 409)
            throw error
        }
    }
    async verifyVerificationCodeAndContinue(data: VerificationCodeParamsType) {
        const verification = await this.verifyVerificationCode(data.code, data.type)

        if (data.type === 'REGISTER') {
            const user = await this.authRepo.findUserByEmail(verification.email)
            if (!user) throw new AppError('Tài khoản không tồn tại', 404)
            await this.authRepo.activateUser(user.id)
            await this.authRepo.markVerificationCodeUsed(verification.id)
            return { message: 'Xác thực email thành công' }
        }

        const resetToken = jwt.sign(
            { verificationId: verification.id, email: verification.email, purpose: 'RESET_PASSWORD' },
            envConfig.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' },
        )
        return { message: 'Mã xác thực hợp lệ', resetToken }
    }
    async login(data: LoginUserBodyType, ipAddress: string) {
        const user = await this.authRepo.findUserByEmail(data.email.toLowerCase())
        if (!user || !(await bcrypt.compare(data.password, user.passwordHash))) throw new AppError('Email hoặc mật khẩu không đúng', 401)
        if (user.status !== 'ACTIVE') throw new AppError('Tài khoản không hoạt động', 403)

        const tokenUser = { userId: user.id, roleId: user.roleId }
        const refreshToken = this.createRefreshToken(tokenUser)
        await this.authRepo.createDeviceSession({
            userId: user.id,
            refreshToken,
            ipAddress: ipAddress || 'unknown',
            expiresAt: this.getExpiryDate(envConfig.REFRESH_TOKEN_EXPIRES_IN),
        })
        return { accessToken: this.createAccessToken(tokenUser), refreshToken, user: this.sanitizeUser(user) }
    }

    async refresh(refreshToken: string, ipAddress: string) {
        let payload: JwtPayload
        try {
            payload = jwt.verify(refreshToken, envConfig.REFRESH_TOKEN_SECRET) as JwtPayload
        } catch {
            throw new AppError('Refresh token không hợp lệ hoặc đã hết hạn', 401)
        }
        const session = await this.authRepo.findDeviceSession(refreshToken)
        if (!session || session.expiresAt <= new Date() || payload.userId !== session.userId) throw new AppError('Refresh token không hợp lệ hoặc đã hết hạn', 401)

        await this.authRepo.deactivateDeviceSession(session.id)
        const tokenUser = { userId: session.user.id, roleId: session.user.roleId }
        const newRefreshToken = this.createRefreshToken(tokenUser)
        await this.authRepo.createDeviceSession({
            userId: session.user.id,
            refreshToken: newRefreshToken,
            ipAddress: ipAddress || 'unknown',
            expiresAt: this.getExpiryDate(envConfig.REFRESH_TOKEN_EXPIRES_IN),
        })
        return { accessToken: this.createAccessToken(tokenUser), refreshToken: newRefreshToken }
    }

    async forgotPassword(email: string) {
        const user = await this.authRepo.findUserByEmail(email.toLowerCase())
        if (!user) return { message: 'Nếu email tồn tại, mã đặt lại mật khẩu đã được tạo' }
        const code = await this.CreateVerificationCode(user.email, 'FORGOT_PASSWORD')
        return { message: 'Mã đặt lại mật khẩu đã được tạo' }
    }

    async resetPassword(data: ResetPasswordBodyType) {
        const verification = await this.authRepo.findValidVerificationCode(data.token, 'FORGOT_PASSWORD')
        if (!verification) throw new AppError('Mã đặt lại mật khẩu không hợp lệ hoặc đã hết hạn', 401)
        const user = await this.authRepo.findUserByEmail(verification.email)
        if (!user) throw new AppError('Tài khoản không tồn tại', 404)
        await this.authRepo.updatePassword(user.id, await bcrypt.hash(data.newPassword, 12))
        await this.authRepo.markVerificationCodeUsed(verification.id)
        return { message: 'Đặt lại mật khẩu thành công' }
    }

    async changePassword(accessToken: string, data: ChangePasswordBodyType) {
        let payload: JwtPayload
        try {
            payload = jwt.verify(accessToken, envConfig.ACCESS_TOKEN_SECRET) as JwtPayload
        } catch {
            throw new AppError('Access token không hợp lệ hoặc đã hết hạn', 401)
        }
        const user = await this.authRepo.findUserById(Number(payload.userId))
        if (!user || !(await bcrypt.compare(data.oldPassword, user.passwordHash))) throw new AppError('Mật khẩu cũ không đúng', 401)
        await this.authRepo.updatePassword(user.id, await bcrypt.hash(data.newPassword, 12))
        return { message: 'Đổi mật khẩu thành công' }
    }

    async logout(refreshToken: string) {
        const session = await this.authRepo.findDeviceSession(refreshToken)
        if (!session) throw new AppError('Refresh token không hợp lệ', 401)
        await this.authRepo.deactivateDeviceSession(session.id)
        return { message: 'Đăng xuất thành công' }
    }
}
