import { randomInt } from 'node:crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthRepo } from './auth.repo';
import { AppError } from '@/common/errors';
import { envConfig } from '@/config/env.config';
import { sendVerificationEmail } from '@/common/service/mail';
import { redisClient } from '@/database/redis';
import {
  ChangePasswordBodyType,
  LoginUserBodyType,
  RegisterUserBodyType,
  ResetPasswordBodyType,
  VerificationCodeParamsType
} from './auth.schema';
import Redis from 'ioredis';

export class AuthService {
  constructor(
    private readonly authRepo: AuthRepo = new AuthRepo(),
    private readonly redis: Redis = redisClient
  ) {}

  // =========================================================================
  // 1. CÁC HÀM TIỆN ÍCH RIÊNG TƯ (PRIVATE HELPERS VỚI REDIS)
  // =========================================================================

  /**
   * Tạo mã OTP ngẫu nhiên 6 chữ số và lưu vào Redis kèm Cooldown chống spam
   */
  private async createVerificationCode(
    emailRaw: string,
    type: 'REGISTER' | 'FORGOT_PASSWORD'
  ): Promise<string> {
    const email = emailRaw.trim().toLowerCase();
    const otpKey = `otp:${type}:${email}`;
    const cooldownKey = `otp_cooldown:${type}:${email}`;

    // 1. Kiểm tra Cooldown 60s
    const cooldownRemaining = await this.redis.ttl(cooldownKey);
    if (cooldownRemaining > 0) {
      throw new AppError(
        `Vui lòng chờ ${cooldownRemaining} giây trước khi yêu cầu gửi lại mã`,
        429
      );
    }

    // 2. Sinh mã ngẫu nhiên 6 chữ số (100000 -> 999999)
    const code = randomInt(100000, 1000000).toString();

    // 3. Lưu vào Redis:
    // - OTP tồn tại trong 600 giây (10 phút)
    // - Cooldown tồn tại trong 60 giây
    await this.redis.set(otpKey, code, 'EX', 600);
    await this.redis.set(cooldownKey, '1', 'EX', 60);

    return code;
  }

  /**
   * So khớp OTP từ Redis và xóa ngay lập tức nếu chính xác (Chống Replay Attack)
   */
  private async verifyVerificationCode(
    emailRaw: string,
    codeRaw: string,
    type: 'REGISTER' | 'FORGOT_PASSWORD'
  ): Promise<void> {
    const email = emailRaw.trim().toLowerCase();
    const code = codeRaw.trim();
    const otpKey = `otp:${type}:${email}`;

    const storedCode = await this.redis.get(otpKey);

    if (!storedCode) {
      throw new AppError(
        'Mã xác thực đã hết hạn hoặc không tồn tại. Vui lòng gửi lại mã mới.',
        410
      );
    }

    if (storedCode !== code) {
      throw new AppError('Mã xác thực không chính xác', 400);
    }

    // Xóa mã khỏi Redis ngay sau khi xác thực thành công
    await this.redis.del(otpKey);
  }

  /**
   * Tạo JWT Token ngắn hạn (15 phút) dùng cho luồng Reset Password
   */
  private createResetPasswordToken(email: string): string {
    return jwt.sign(
      { email: email.trim().toLowerCase(), purpose: 'RESET_PASSWORD' },
      process.env.JWT_RESET_SECRET || 'super_secret_reset_key_123',
      { expiresIn: '15m' }
    );
  }

  /**
   * Sinh Access Token (1 giờ) & Refresh Token (7 ngày)
   */
  private generateTokens(user: any) {
    const payload = {
      sub: user.id,
      userId: user.id,
      roleId: user.roleId ?? user.role?.id ?? 3,
      email: user.email,
      role: user.role?.code || 'CUSTOMER',
    };

    const accessToken = jwt.sign(
      payload,
      envConfig.ACCESS_TOKEN_SECRET,
      { expiresIn: envConfig.ACCESS_TOKEN_EXPIRES_IN as any }
    );

    const refreshToken = jwt.sign(
      payload,
      envConfig.REFRESH_TOKEN_SECRET,
      { expiresIn: envConfig.REFRESH_TOKEN_EXPIRES_IN as any }
    );

    return { accessToken, refreshToken };
  }

  /**
   * Ẩn thông tin nhạy cảm (passwordHash) trước khi gửi về Client
   */
  private sanitizeUser(user: any) {
    if (!user) return null;
    const { passwordHash, ...safeUser } = user;
    return safeUser;
  }

  // =========================================================================
  // 2. NGHIỆP VỤ XÁC THỰC (AUTHENTICATION BUSINESS FLOWS)
  // =========================================================================

  /**
   * Đăng ký tài khoản (Hỗ trợ khôi phục tài khoản INACTIVE)
   */
  async register(data: RegisterUserBodyType) {
    const email = data.email.trim().toLowerCase();
    const existingUser = await this.authRepo.findUserByEmail(email);

    // TRƯỜNG HỢP 1: Tài khoản đã tồn tại
    if (existingUser) {
      if (existingUser.status === 'ACTIVE' || existingUser.status === 'BLOCKED') {
        throw new AppError('Email đã được sử dụng', 409);
      }

      // Tài khoản đang INACTIVE: Cập nhật thông tin mới và gửi lại mã OTP qua Redis
      const updatedUser = await this.authRepo.updateInactiveUser(existingUser.id, {
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        passwordHash: await bcrypt.hash(data.password, 10),
      });

      const code = await this.createVerificationCode(email, 'REGISTER');
      try {
        await sendVerificationEmail(email, code);
      } catch (mailError: any) {
        console.warn(`[MAIL_WARNING] Không thể gửi email tới ${email}:`, mailError?.message || mailError);
        console.info(`[DEV_OTP] Mã OTP đăng ký cho ${email} là: ${code}`);
      }

      return {
        user: this.sanitizeUser(updatedUser),
        message: 'Mã xác thực mới đã được gửi tới email của bạn',
      };
    }

    // TRƯỜNG HỢP 2: Đăng ký tài khoản hoàn toàn mới
    const role = await this.authRepo.findRoleByCode('CUSTOMER');
    if (!role) throw new AppError('Hệ thống chưa cấu hình vai trò CUSTOMER', 500);

    try {
      const user = await this.authRepo.createUser({
        data: { ...data, email },
        roleId: role.id,
        passwordHash: await bcrypt.hash(data.password, 10),
        status: 'INACTIVE',
      });

      const code = await this.createVerificationCode(email, 'REGISTER');
      try {
        await sendVerificationEmail(email, code);
      } catch (mailError: any) {
        console.warn(`[MAIL_WARNING] Không thể gửi email tới ${email}:`, mailError?.message || mailError);
        console.info(`[DEV_OTP] Mã OTP đăng ký cho ${email} là: ${code}`);
      }

      return {
        user: this.sanitizeUser(user),
        message: 'Đăng ký thành công. Vui lòng kiểm tra email để lấy mã xác thực.',
      };
    } catch (error: any) {
      if (error?.code === 'P2002') {
        throw new AppError('Email đã được sử dụng', 409);
      }
      throw error;
    }
  }

  /**
   * Xác thực mã OTP (Áp dụng cho cả Đăng ký và Quên mật khẩu)
   */
  async verifyCode(data: VerificationCodeParamsType) {
    const email = data.email.trim().toLowerCase();
    const code = data.code.trim();

    // 1. Kiểm tra mã trên Redis (hàm sẽ tự throw lỗi nếu sai/hết hạn và tự xóa key nếu đúng)
    await this.verifyVerificationCode(email, code, data.type);

    // 2. Kích hoạt tài khoản khi Đăng ký
    if (data.type === 'REGISTER') {
      const user = await this.authRepo.findUserByEmail(email);
      if (!user) throw new AppError('Tài khoản không tồn tại', 404);

      if (user.status === 'ACTIVE') {
        return { message: 'Tài khoản của bạn đã được kích hoạt từ trước' };
      }

      await this.authRepo.activateUser(user.id);
      return { message: 'Xác thực tài khoản thành công! Bạn có thể đăng nhập.' };
    }

    // 3. Cấp Token đặt lại mật khẩu cho luồng Quên mật khẩu
    const resetToken = this.createResetPasswordToken(email);
    return {
      message: 'Mã xác thực hợp lệ',
      resetToken,
    };
  }

  /**
   * Đăng nhập hệ thống
   */
  async login(data: LoginUserBodyType, ip: string) {
    const email = data.email.trim().toLowerCase();
    const user = await this.authRepo.findUserByEmail(email);

    if (!user) {
      throw new AppError('Email hoặc mật khẩu không chính xác', 401);
    }

    if (user.status === 'INACTIVE') {
      throw new AppError('Tài khoản chưa được kích hoạt. Vui lòng xác thực mã OTP.', 403);
    }

    if (user.status === 'BLOCKED') {
      throw new AppError('Tài khoản của bạn đã bị khóa. Vui lòng liên hệ CSKH.', 403);
    }

    const isMatch = await bcrypt.compare(data.password, user.passwordHash);
    if (!isMatch) {
      throw new AppError('Email hoặc mật khẩu không chính xác', 401);
    }

    const tokens = this.generateTokens(user);
    
    // (Optional: Nếu bạn có luồng device session thì lưu thêm ở đây với ip)
    // await this.authRepo.createDeviceSession({ userId: user.id, refreshToken: tokens.refreshToken, ipAddress: ip, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });

    return {
      ...tokens,
      user: this.sanitizeUser(user),
    };
  }

  /**
   * Cấp lại Access Token mới từ Refresh Token
   */
  async refresh(token: string, ip: string) {
    if (!token) throw new AppError('Vui lòng cung cấp Refresh Token', 401);

    let decoded: any;
    try {
      decoded = jwt.verify(
        token,
        envConfig.REFRESH_TOKEN_SECRET
      );
    } catch {
      throw new AppError('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.', 401);
    }

    const email = decoded.email;
    const user = await this.authRepo.findUserByEmail(email);
    if (!user || user.status !== 'ACTIVE') {
      throw new AppError('Tài khoản không hợp lệ hoặc đã bị khóa', 403);
    }

    const tokens = this.generateTokens(user);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  /**
   * Yêu cầu quên mật khẩu (Gửi OTP qua email)
   */
  async forgotPassword(emailRaw: string) {
    const email = emailRaw.trim().toLowerCase();
    const user = await this.authRepo.findUserByEmail(email);

    if (!user) {
      throw new AppError('Không tìm thấy tài khoản với địa chỉ email này', 404);
    }

    if (user.status === 'BLOCKED') {
      throw new AppError('Tài khoản này đã bị khóa', 403);
    }

    const code = await this.createVerificationCode(email, 'FORGOT_PASSWORD');
    try {
      await sendVerificationEmail(email, code);
    } catch (mailError: any) {
      console.warn(`[MAIL_WARNING] Không thể gửi email tới ${email}:`, mailError?.message || mailError);
      console.info(`[DEV_OTP] Mã OTP đặt lại mật khẩu cho ${email} là: ${code}`);
    }

    return {
      message: 'Mã xác thực đặt lại mật khẩu đã được gửi tới email của bạn',
    };
  }

  /**
   * Đặt lại mật khẩu mới (Sử dụng resetToken lấy được từ verifyCode)
   */
  async resetPassword(data: ResetPasswordBodyType) {
    let decoded: any;
    try {
      decoded = jwt.verify(
        data.token,
        process.env.JWT_RESET_SECRET || 'super_secret_reset_key_123'
      );
    } catch {
      throw new AppError('Mã token đặt lại mật khẩu đã hết hạn hoặc không hợp lệ', 401);
    }

    if (decoded.purpose !== 'RESET_PASSWORD') {
      throw new AppError('Token không đúng mục đích', 400);
    }

    const user = await this.authRepo.findUserByEmail(decoded.email);
    if (!user) throw new AppError('Người dùng không tồn tại', 404);

    const newPasswordHash = await bcrypt.hash(data.newPassword, 10);
    await this.authRepo.updatePassword(user.id, newPasswordHash);

    // Thu hồi toàn bộ session đăng nhập cũ nếu cần (tùy nghiệp vụ)
    // await this.authRepo.deactivateAllUserSessions(user.id);

    return {
      message: 'Đặt lại mật khẩu thành công. Vui lòng đăng nhập bằng mật khẩu mới.',
    };
  }

  /**
   * Đổi mật khẩu cho người dùng đã đăng nhập
   */
  async changePassword(userId: number, data: ChangePasswordBodyType) {
    const user = await this.authRepo.findUserById(userId);
    if (!user) throw new AppError('Người dùng không tồn tại', 404);

    const isMatch = await bcrypt.compare(data.oldPassword, user.passwordHash);
    if (!isMatch) {
      throw new AppError('Mật khẩu hiện tại không chính xác', 400);
    }

    const newPasswordHash = await bcrypt.hash(data.newPassword, 10);
    await this.authRepo.updatePassword(userId, newPasswordHash);

    return {
      message: 'Đổi mật khẩu thành công',
    };
  }

  /**
   * Đăng xuất tài khoản
   */
  async logout(refreshToken?: string) {
    // Có thể bổ sung blacklist token vào Redis nếu muốn hủy token ngay lập tức
    // Nếu có dùng DeviceSession thì cập nhật isActive = false ở bảng DeviceSession bằng refreshToken
    return {
      message: 'Đăng xuất thành công',
    };
  }
}