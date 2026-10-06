'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, CheckCircle2 } from 'lucide-react';
import { registerSchema, verifyCodeSchema, type RegisterFormData, type VerifyCodeFormData } from '../schemas';
import { useAuth } from '../hooks/use-auth';
import { FormField } from '@/components/ui/form-field';
import { Button } from '@/components/ui/button';

export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [step, setStep] = React.useState<'form' | 'verify'>('form');
  const [registeredEmail, setRegisteredEmail] = React.useState('');

  const { registerMutation, verifyCodeMutation } = useAuth();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
  });

  const verifyForm = useForm<VerifyCodeFormData>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      email: '',
      type: 'REGISTER',
      code: '',
    },
  });

  const onRegisterSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(
      {
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber || undefined,
        password: data.password,
      },
      {
        onSuccess: () => {
          setRegisteredEmail(data.email);
          verifyForm.setValue('email', data.email);
          setStep('verify');
        },
      }
    );
  };

  const onVerifySubmit = (data: VerifyCodeFormData) => {
    verifyCodeMutation.mutate(data, {
      onSuccess: () => {
        router.push('/login');
      },
    });
  };

  if (step === 'verify') {
    return (
      <div className="space-y-5">
        <div className="text-center space-y-2">
          <div className="mx-auto size-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="size-6" />
          </div>
          <h2 className="text-lg font-semibold text-neutral-900">Xác thực tài khoản</h2>
          <p className="text-xs text-neutral-500">
            Chúng tôi đã gửi mã xác thực 6 số đến email{' '}
            <strong className="text-neutral-800">{registeredEmail}</strong>. Vui lòng kiểm tra và nhập vào bên dưới.
          </p>
        </div>

        <form onSubmit={verifyForm.handleSubmit(onVerifySubmit)} className="space-y-4">
          <FormField
            control={verifyForm.control}
            name="code"
            label="Mã xác thực (OTP)"
            placeholder="123456"
            error={verifyForm.formState.errors.code?.message}
          />

          <Button
            type="submit"
            disabled={verifyCodeMutation.isPending}
            className="w-full h-11 rounded-xl bg-[#1D1F20] hover:bg-neutral-800 text-white font-medium"
          >
            {verifyCodeMutation.isPending ? (
              <>
                <Loader2 className="size-4 animate-spin mr-2" />
                Đang xác thực...
              </>
            ) : (
              'Hoàn tất kích hoạt'
            )}
          </Button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setStep('form')}
              className="text-xs text-neutral-500 hover:text-neutral-900 underline underline-offset-4"
            >
              ← Thay đổi email đăng ký
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onRegisterSubmit)} className="space-y-4">
      <FormField
        control={form.control}
        name="fullName"
        label="Họ và tên"
        placeholder="Nguyễn Văn A"
        error={form.formState.errors.fullName?.message}
      />

      <FormField
        control={form.control}
        name="email"
        label="Địa chỉ Email"
        type="email"
        placeholder="example@domain.com"
        error={form.formState.errors.email?.message}
      />

      <FormField
        control={form.control}
        name="phoneNumber"
        label="Số điện thoại (tùy chọn)"
        placeholder="0912345678"
        error={form.formState.errors.phoneNumber?.message}
      />

      <div className="relative">
        <FormField
          control={form.control}
          name="password"
          label="Mật khẩu"
          type={showPassword ? 'text' : 'password'}
          placeholder="Tối thiểu 8 ký tự (hoa, thường, số, ký tự)"
          error={form.formState.errors.password?.message}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3.5 top-[34px] text-neutral-400 hover:text-neutral-700 transition"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>

      <div className="relative">
        <FormField
          control={form.control}
          name="confirmPassword"
          label="Xác nhận mật khẩu"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Nhập lại mật khẩu"
          error={form.formState.errors.confirmPassword?.message}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3.5 top-[34px] text-neutral-400 hover:text-neutral-700 transition"
          tabIndex={-1}
        >
          {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>

      <Button
        type="submit"
        disabled={registerMutation.isPending}
        className="w-full h-11 rounded-xl bg-[#1D1F20] hover:bg-neutral-800 text-white font-medium shadow-sm transition active:scale-[0.99] mt-2"
      >
        {registerMutation.isPending ? (
          <>
            <Loader2 className="size-4 animate-spin mr-2" />
                Đang tạo tài khoản...
          </>
        ) : (
          'Tạo tài khoản'
        )}
      </Button>

      <div className="text-center pt-2">
        <p className="text-xs text-neutral-500">
          Đã có tài khoản?{' '}
          <Link
            href="/login"
            className="font-semibold text-neutral-900 hover:underline underline-offset-4"
          >
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </form>
  );
}

