import { mailTransporter } from '@/config/mail';
import { envConfig } from '@/config/env.config';

export const sendVerificationEmail = (to: string, code: string) => {
  return mailTransporter.sendMail({
    from: `"Fashion Store" <${envConfig.MAIL_USER}>`,
    to,
    subject: 'Mã xác thực OTP',
    html: `<h3>Mã OTP của bạn là: <b>${code}</b></h3>`,
  });
};