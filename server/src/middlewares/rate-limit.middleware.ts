import rateLimit from 'express-rate-limit'


// Rate limit nghiêm ngặt cho các endpoint nhạy cảm:
export const strictAuthLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        statusCode: 429,
        message: 'Quá nhiều yêu cầu. Vui lòng thử lại sau 15 phút.',
    },
})


// Rate limit trung bình cho các endpoint gửi email/tạo OTP:
export const otpLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 3,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        statusCode: 429,
        message: 'Quá nhiều yêu cầu gửi mã xác thực. Vui lòng thử lại sau.',
    },
})

/**
 * Rate limit chung cho toàn bộ auth routes:
 * 30 request / 15 phút / IP
 */
export const generalAuthLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        statusCode: 429,
        message: 'Quá nhiều yêu cầu. Vui lòng thử lại sau.',
    },
})

