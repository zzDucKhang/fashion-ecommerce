import { z } from 'zod';

export const registerUserBodySchema = z.object({
    email: z.string().trim().email('Email không đúng định dạng').max(255),
    password: z
        .string()
        .min(8, 'Mật khẩu tối thiểu 8 ký tự')
        .max(72, 'Mật khẩu tối đa 72 ký tự') 
        .regex(/[A-Z]/, 'Mật khẩu cần ít nhất 1 chữ in hoa')
        .regex(/[a-z]/, 'Mật khẩu cần ít nhất 1 chữ in thường')
        .regex(/[0-9]/, 'Mật khẩu cần ít nhất 1 chữ số')
        .regex(/[^A-Za-z0-9]/, 'Mật khẩu cần ít nhất 1 ký tự đặc biệt'),
    fullName: z.string().trim().min(1).max(100),
    phoneNumber: z.string().trim().optional(),
})

export const loginUserBodySchema = z.object({
    email: z.string().trim().email('Email không đúng định dạng').max(255),
    password: z.string().min(8, 'Mật khẩu tối thiểu 8 ký tự').max(72, 'Mật khẩu tối đa 72 ký tự'),
})

export const refreshTokenBodySchema = z.object({
    refreshToken: z.string().min(1, 'Refresh token là bắt buộc'),
})

export const forgotPasswordBodySchema = z.object({
    email: z.string().trim().email('Email không đúng định dạng').max(255),
})

export const verificationCodeParamsSchema = z.object({
    type: z.enum(['REGISTER', 'FORGOT_PASSWORD']),
    code: z.string().trim().min(1, 'Mã xác thực là bắt buộc'),
})

export const resetPasswordBodySchema = z.object({
    token: z.string().min(1, 'Token xác thực là bắt buộc'),
    newPassword: z
      .string()
      .min(8, 'Mật khẩu mới tối thiểu 8 ký tự')
      .regex(/[A-Z]/, 'Cần ít nhất 1 chữ hoa')
      .regex(/[a-z]/, 'Cần ít nhất 1 chữ thường')
      .regex(/[0-9]/, 'Cần ít nhất 1 chữ số')
      .regex(/[^A-Za-z0-9]/, 'Cần ít nhất 1 ký tự đặc biệt'),
    confirmPassword: z.string().min(1, 'Xác nhận mật khẩu là bắt buộc'),
  })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: 'Mật khẩu xác nhận không khớp',
    })

export const changePasswordBodySchema = z.object({
    oldPassword: z.string().min(1, 'Mật khẩu cũ là bắt buộc'),
    newPassword: z
      .string()
      .min(8, 'Mật khẩu mới tối thiểu 8 ký tự')
      .regex(/[A-Z]/, 'Cần ít nhất 1 chữ hoa')
      .regex(/[a-z]/, 'Cần ít nhất 1 chữ thường')
      .regex(/[0-9]/, 'Cần ít nhất 1 chữ số')
      .regex(/[^A-Za-z0-9]/, 'Cần ít nhất 1 ký tự đặc biệt'),
    confirmPassword: z.string().min(1, 'Xác nhận mật khẩu là bắt buộc'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
    })

export type RegisterUserBodyType = z.infer<typeof registerUserBodySchema>
export type LoginUserBodyType = z.infer<typeof loginUserBodySchema>
export type RefreshTokenBodyType = z.infer<typeof refreshTokenBodySchema>
export type ForgotPasswordBodyType = z.infer<typeof forgotPasswordBodySchema>
export type VerificationCodeParamsType = z.infer<typeof verificationCodeParamsSchema>
export type ResetPasswordBodyType = z.input<typeof resetPasswordBodySchema>
export type ChangePasswordBodyType = z.input<typeof changePasswordBodySchema>