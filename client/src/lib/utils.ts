import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value?: number | string | null): string {
  const numeric = typeof value === 'number' ? value : Number(value || 0);
  return `${numeric.toLocaleString('vi-VN')} ₫`;
}

export function formatDate(value?: string | Date | null): string {
  if (!value) return '';
  return new Date(value).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}