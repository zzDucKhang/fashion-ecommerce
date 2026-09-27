import nodemailer from 'nodemailer';
import { envConfig } from '@/config/env.config';

export const mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: envConfig.MAIL_USER,
    pass: envConfig.MAIL_PASS,
  },
});