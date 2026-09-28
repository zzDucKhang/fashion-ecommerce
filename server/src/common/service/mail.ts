import { mailTransporter } from '@/config/mail';
import { envConfig } from '@/config/env.config';

export const sendVerificationEmail = (to: string, code: string) => {
  return mailTransporter.sendMail({
    from: `"Fashion Store" <${envConfig.MAIL_USER}>`,
    to,
    subject: 'Mã xác thực OTP – Fashion Store',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:8px">
        <h2 style="color:#111827">Mã xác thực của bạn</h2>
        <p style="color:#374151">Sử dụng mã OTP dưới đây để xác thực tài khoản:</p>
        <div style="font-size:36px;font-weight:bold;letter-spacing:8px;text-align:center;color:#4f46e5;padding:16px 0">${code}</div>
        <p style="color:#6b7280;font-size:14px">⏱ Mã có hiệu lực trong <strong>15 phút</strong> kể từ khi nhận được email này.</p>
        <p style="color:#6b7280;font-size:13px">⚠️ Không chia sẻ mã này với bất kỳ ai. Fashion Store sẽ không bao giờ hỏi mã OTP của bạn.</p>
      </div>
    `,
  });
};