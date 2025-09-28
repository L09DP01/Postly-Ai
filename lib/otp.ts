import crypto from 'crypto';

const OTP_LENGTH = 6;
const OTP_TTL = 10 * 60 * 1000; // 10 minutes
const MAX_ATTEMPTS = 3;

export function generateOtp(): string {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < OTP_LENGTH; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }
  return otp;
}

export function hashOtp(otp: string): string {
  const salt = process.env.OTP_SALT || 'default-salt';
  return crypto
    .createHash('sha256')
    .update(otp + salt)
    .digest('hex');
}

export function getOtpTtl(): number {
  return OTP_TTL;
}

export function getMaxAttempts(): number {
  return MAX_ATTEMPTS;
}
