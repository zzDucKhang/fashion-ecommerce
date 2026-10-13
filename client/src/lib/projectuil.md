# Project Dump

**Root:** `C:\Programing\cnpm\fashion-ecom\client\src\lib`

**Generated:** 2026-10-13 17:20:55.562100

**Files:** 4 | **Total size:** 1,683 bytes

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

# utils\image-url.ts

| Property | Value |
|----------|-------|
| Path | `utils\image-url.ts` |
| Size | 903 bytes |
| Extension | `.ts` |
| Modified | 2026-10-11 16:52:36.533891 |

```typescript
export const DEFAULT_IMAGE_URL =
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80';

export function normalizeImageUrl(imageUrl?: string | null, fallback = DEFAULT_IMAGE_URL) {
  if (!imageUrl) return fallback;

  const trimmedUrl = imageUrl.trim();
  if (!trimmedUrl) return fallback;

  try {
    const parsedUrl = new URL(trimmedUrl);

    if (
      (parsedUrl.hostname === 'www.google.com' || parsedUrl.hostname === 'google.com') &&
      parsedUrl.pathname.includes('/imgres')
    ) {
      const extractedImageUrl = parsedUrl.searchParams.get('imgurl');
      if (extractedImageUrl) {
        return decodeURIComponent(extractedImageUrl);
      }
    }

    return trimmedUrl;
  } catch {
    if (trimmedUrl.startsWith('/') || trimmedUrl.startsWith('data:')) {
      return trimmedUrl;
    }

    return fallback;
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

