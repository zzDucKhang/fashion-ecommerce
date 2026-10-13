import { envConfig } from '@/config/env.config'

export const sendVerificationEmail = async (to: string, code: string) => {
  const apiKey = envConfig.BREVO_API_KEY
  const senderEmail = envConfig.BREVO_SENDER_EMAIL || envConfig.MAIL_USER

  if (!senderEmail) {
    throw new Error('Chưa cấu hình email người gửi (BREVO_SENDER_EMAIL)')
  }

  const payload = {
    sender: {
      name: 'Fashion Store',
      email: senderEmail,
    },
    to: [{ email: to }],
    subject: 'Mã xác thực OTP – Fashion Store',
    htmlContent: `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:8px">
        <h2 style="color:#111827">Mã xác thực của bạn</h2>
        <p style="color:#374151">Sử dụng mã OTP dưới đây để xác thực tài khoản:</p>
        <div style="font-size:36px;font-weight:bold;letter-spacing:8px;text-align:center;color:#4f46e5;padding:16px 0">${code}</div>
        <p style="color:#6b7280;font-size:14px">⏱ Mã có hiệu lực trong <strong>15 phút</strong> kể từ khi nhận được email này.</p>
        <p style="color:#6b7280;font-size:13px">⚠️ Không chia sẻ mã này với bất kỳ ai. Fashion Store sẽ không bao giờ hỏi mã OTP của bạn.</p>
      </div>
    `,
  }

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'api-key': apiKey,
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`Brevo send failed (${response.status}): ${errorBody}`)
  }

  return response.json()
}