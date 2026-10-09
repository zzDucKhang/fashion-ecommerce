# Project Dump

**Root:** `C:\Programing\cnpm\fashion-ecom\client\src\lib`

**Generated:** 2026-10-09 08:22:27.635523

**Files:** 3 | **Total size:** 780 bytes

---

# utils\format-currency.ts

| Property | Value |
|----------|-------|
| Path | `utils\format-currency.ts` |
| Size | 318 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 14:57:53.835239 |

```typescript
export function formatCurrency(amount: number | string | undefined | null): string {
  if (amount === undefined || amount === null) return '0 ₫';
  const val = typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
}
```

# utils\format-date.ts

| Property | Value |
|----------|-------|
| Path | `utils\format-date.ts` |
| Size | 289 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 14:58:01.799987 |

```typescript
import { format, parseISO } from 'date-fns';

export function formatDate(dateString: string | undefined | null, pattern = 'dd/MM/yyyy HH:mm'): string {
  if (!dateString) return '';
  try {
    return format(parseISO(dateString), pattern);
  } catch {
    return dateString;
  }
}
```

# utils.ts

| Property | Value |
|----------|-------|
| Path | `utils.ts` |
| Size | 173 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 15:13:38.639202 |

```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

