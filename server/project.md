# Project Dump

**Root:** `C:\Programing\cnpm\fashion-ecom\server`

**Generated:** 2026-09-28 23:44:12.393009

**Files:** 143 | **Total size:** 401,437 bytes

---

# .env.example

| Property | Value |
|----------|-------|
| Path | `.env.example` |
| Size | 655 bytes |
| Extension | `.example` |
| Modified | 2026-09-28 23:31:07.372598 |

```example
# App
NODE_ENV=dev
PORT=3000

# PostgreSQL
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/fashion_ecommerce?schema=public"

# Redis
REDIS_URL="redis://localhost:6379"

# JWT - thay bằng chuỗi bí mật đủ dài, không dùng giá trị mẫu ở production
ACCESS_TOKEN_SECRET="change-this-access-secret"
ACCESS_TOKEN_EXPIRES_IN="1h"
REFRESH_TOKEN_SECRET="change-this-refresh-secret"
REFRESH_TOKEN_EXPIRES_IN="1d"

# Payment
PAYMENT_API_KEY="your-payment-api-key"

# S3 (optional)
S3_ENDPOINT=
S3_REGION=
S3_ACCESS_KEY=
S3_SECRET_KEY=
S3_BUCKET_NAME=


# Gmail
MAIL_USER=your_email@gmail.com
MAIL_PASS=
```

# package-lock.json

| Property | Value |
|----------|-------|
| Path | `package-lock.json` |
| Size | 116,264 bytes |
| Extension | `.json` |
| Modified | 2026-09-28 23:40:36.702621 |

```json
{
  "name": "node-ecommerce-backend",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "node-ecommerce-backend",
      "version": "1.0.0",
      "dependencies": {
        "@aws-sdk/client-s3": "^3.873.0",
        "@aws-sdk/s3-request-presigner": "^3.873.0",
        "@prisma/client": "^6.14.0",
        "@socket.io/redis-adapter": "^8.3.0",
        "bcrypt": "^6.0.0",
        "bullmq": "^5.58.0",
        "cors": "^2.8.5",
        "date-fns": "^4.1.0",
        "dotenv": "^17.2.1",
        "express": "^4.21.2",
        "express-rate-limit": "^7.5.0",
        "helmet": "^8.1.0",
        "ioredis": "^5.7.0",
        "jsonwebtoken": "^9.0.2",
        "ms": "^2.1.3",
        "nodemailer": "^10.0.11",
        "otpauth": "^9.4.1",
        "pino": "^9.6.0",
        "pino-http": "^10.4.0",
        "redlock": "^5.0.0-beta.2",
        "resend": "^6.0.1",
        "socket.io": "^4.8.1",
        "uuid": "^11.1.0",
        "zod": "^3.24.2"
      },
      "devDependencies": {
        "@types/bcrypt": "^6.0.0",
        "@types/cors": "^2.8.17",
        "@types/express": "^4.17.21",
        "@types/jsonwebtoken": "^9.0.8",
        "@types/ms": "^2.1.0",
        "@types/node": "^24.3.0",
        "@types/nodemailer": "^8.0.2",
        "@types/uuid": "^10.0.0",
        "prisma": "^6.12.0",
        "tsx": "^4.19.3",
        "typescript": "^5.9.2"
      }
    },
    "node_modules/@aws-sdk/checksums": {
      "version": "3.1001.1",
      "resolved": "https://registry.npmjs.org/@aws-sdk/checksums/-/checksums-3.1001.1.tgz",
      "integrity": "sha512-x12Q17KYlJAd3nKf8LV5LV0vt8sh8/6YfQLGPtrGnQf/tW4jqxPGq5GPpuVitpQYM3eUR4XB7CbxZf751NMbLw==",
      "license": "Apache-2.0",
      "dependencies": {
        "@aws-sdk/core": "^3.978.1",
        "@aws-sdk/types": "^3.974.6",
        "@smithy/core": "^3.35.0",
        "@smithy/types": "^4.19.0",
        "tslib": "^2.6.2"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@aws-sdk/client-s3": {
      "version": "3.1141.0",
      "resolved": "https://registry.npmjs.org/@aws-sdk/client-s3/-/client-s3-3.1141.0.tgz",
      "integrity": "sha512-uOVH37xGLenAdJkCPCin/JJG2PgWrFcSsDnQ9+C9Zq8N9Oalo5ol4xmn5fG28iWAlA/b/9boQZgHbMh+UsIhcg==",
      "license": "Apache-2.0",
      "dependencies": {
        "@aws-sdk/checksums": "^3.1001.1",
        "@aws-sdk/core": "^3.978.1",
        "@aws-sdk/credential-provider-node": "^3.972.84",
        "@aws-sdk/middleware-sdk-s3": "^3.972.77",
        "@aws-sdk/signature-v4-multi-region": "^3.996.47",
        "@aws-sdk/types": "^3.974.6",
        "@smithy/core": "^3.35.0",
        "@smithy/fetch-http-handler": "^5.8.0",
        "@smithy/node-http-handler": "^4.12.1",
        "@smithy/types": "^4.19.0",
        "tslib": "^2.6.2"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@aws-sdk/core": {
      "version": "3.978.1",
      "resolved": "https://registry.npmjs.org/@aws-sdk/core/-/core-3.978.1.tgz",
      "integrity": "sha512-LbY9aGsEiznDWmUc30Nwv3aIX/+dbwTx8KfS0yOC3NPYMO+O91e6jkT1azf34FwjOndq8/Q+RcVVZz5xnerwdg==",
      "license": "Apache-2.0",
      "dependencies": {
        "@aws-sdk/types": "^3.974.6",
        "@aws-sdk/xml-builder": "^3.972.41",
        "@aws/lambda-invoke-store": "^0.3.0",
        "@smithy/core": "^3.35.0",
        "@smithy/signature-v4": "^5.7.3",
        "@smithy/types": "^4.19.0",
        "bowser": "^2.11.0",
        "tslib": "^2.6.2"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@aws-sdk/credential-provider-env": {
      "version": "3.972.72",
      "resolved": "https://registry.npmjs.org/@aws-sdk/credential-provider-env/-/credential-provider-env-3.972.72.tgz",
      "integrity": "sha512-xTKO/FWJPozTIXbozVnVGoNBhaGba8TBcx+KyUjRVeOlXE+dUc7GTR1cLvu0uTdIdmemzaFbqqCshXeZA1fZew==",
      "license": "Apache-2.0",
      "dependencies": {
        "@aws-sdk/core": "^3.978.1",
        "@aws-sdk/types": "^3.974.6",
        "@smithy/core": "^3.35.0",
        "@smithy/types": "^4.19.0",
        "tslib": "^2.6.2"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@aws-sdk/credential-provider-http": {
      "version": "3.972.74",
      "resolved": "https://registry.npmjs.org/@aws-sdk/credential-provider-http/-/credential-provider-http-3.972.74.tgz",
      "integrity": "sha512-u91E/hT8f4d1xy0Jl7VG4nVKJ3lxbrZkoBTeSVoJdWBiSEUMwMS/9+e0H/aJVQV//Lt5wuzP+E69v4aRSsNTmw==",
      "license": "Apache-2.0",
      "dependencies": {
        "@aws-sdk/core": "^3.978.1",
        "@aws-sdk/types": "^3.974.6",
        "@smithy/core": "^3.35.0",
        "@smithy/fetch-http-handler": "^5.8.0",
        "@smithy/node-http-handler": "^4.12.1",
        "@smithy/types": "^4.19.0",
        "tslib": "^2.6.2"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@aws-sdk/credential-provider-ini": {
      "version": "3.973.17",
      "resolved": "https://registry.npmjs.org/@aws-sdk/credential-provider-ini/-/credential-provider-ini-3.973.17.tgz",
      "integrity": "sha512-ged4KXdBkvIC81bLvNHHuQKdKak/VXhQTR1NWYTTqW0474nlmsxy9O/vlgTIohDDWH3xpBdtVMZRyjb+DnocDA==",
      "license": "Apache-2.0",
      "dependencies": {
        "@aws-sdk/core": "^3.978.1",
        "@aws-sdk/credential-provider-env": "^3.972.72",
        "@aws-sdk/credential-provider-http": "^3.972.74",
        "@aws-sdk/credential-provider-login": "^3.972.79",
        "@aws-sdk/credential-provider-process": "^3.972.72",
        "@aws-sdk/credential-provider-sso": "^3.973.16",
        "@aws-sdk/credential-provider-web-identity": "^3.972.78",
        "@aws-sdk/nested-clients": "^3.997.46",
        "@aws-sdk/types": "^3.974.6",
        "@smithy/core": "^3.35.0",
        "@smithy/credential-provider-imds": "^4.5.2",
        "@smithy/types": "^4.19.0",
        "tslib": "^2.6.2"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@aws-sdk/credential-provider-login": {
      "version": "3.972.79",
      "resolved": "https://registry.npmjs.org/@aws-sdk/credential-provider-login/-/credential-provider-login-3.972.79.tgz",
      "integrity": "sha512-L+Z85anONJd8MaiuraO4wRxATCdEejBZ3K3eymzWI5JPXa9sOS9CkIm72PBKqXKX+Z9p9NGMX5AIMXm0LEflgw==",
      "license": "Apache-2.0",
      "dependencies": {
        "@aws-sdk/core": "^3.978.1",
        "@aws-sdk/nested-clients": "^3.997.46",
        "@aws-sdk/types": "^3.974.6",
        "@smithy/core": "^3.35.0",
        "@smithy/types": "^4.19.0",
        "tslib": "^2.6.2"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@aws-sdk/credential-provider-node": {
      "version": "3.972.84",
      "resolved": "https://registry.npmjs.org/@aws-sdk/credential-provider-node/-/credential-provider-node-3.972.84.tgz",
      "integrity": "sha512-oHt854odINVwzwsh+c5x69j0ajm4DbqqqVJ+O1ECsCIZeMDAbzFpXItaqP7UZstJj/ATdTk/KFSH0LaNAgV+kA==",
      "license": "Apache-2.0",
      "dependencies": {
        "@aws-sdk/credential-provider-env": "^3.972.72",
        "@aws-sdk/credential-provider-http": "^3.972.74",
        "@aws-sdk/credential-provider-ini": "^3.973.17",
        "@aws-sdk/credential-provider-process": "^3.972.72",
        "@aws-sdk/credential-provider-sso": "^3.973.16",
        "@aws-sdk/credential-provider-web-identity": "^3.972.78",
        "@aws-sdk/types": "^3.974.6",
        "@smithy/core": "^3.35.0",
        "@smithy/credential-provider-imds": "^4.5.2",
        "@smithy/types": "^4.19.0",
        "tslib": "^2.6.2"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@aws-sdk/credential-provider-process": {
      "version": "3.972.72",
      "resolved": "https://registry.npmjs.org/@aws-sdk/credential-provider-process/-/credential-provider-process-3.972.72.tgz",
      "integrity": "sha512-rLIp2xbMjX/k9/od7APpqq1ZgXXnV0pOL1Th3ZsL8Wu0TRtBsDTVS8iPqcfRFcHakFxPvR04OSTv2ka2qOb/2A==",
      "license": "Apache-2.0",
      "dependencies": {
        "@aws-sdk/core": "^3.978.1",
        "@aws-sdk/types": "^3.974.6",
        "@smithy/core": "^3.35.0",
        "@smithy/types": "^4.19.0",
        "tslib": "^2.6.2"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@aws-sdk/credential-provider-sso": {
      "version": "3.973.16",
      "resolved": "https://registry.npmjs.org/@aws-sdk/credential-provider-sso/-/credential-provider-sso-3.973.16.tgz",
      "integrity": "sha512-IGihaJfFZYacJJr/odqILCoK7W/mvrZ7cuK7ECn3sAu4vLC6u0V8bS7mCGbdugJ8Aum2tnvqmx0F2MRFp2rn9g==",
      "license": "Apache-2.0",
      "dependencies": {
        "@aws-sdk/core": "^3.978.1",
        "@aws-sdk/nested-clients": "^3.997.46",
        "@aws-sdk/token-providers": "3.1138.0",
        "@aws-sdk/types": "^3.974.6",
        "@smithy/core": "^3.35.0",
        "@smithy/types": "^4.19.0",
        "tslib": "^2.6.2"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@aws-sdk/credential-provider-web-identity": {
      "version": "3.972.78",
      "resolved": "https://registry.npmjs.org/@aws-sdk/credential-provider-web-identity/-/credential-provider-web-identity-3.972.78.tgz",
      "integrity": "sha512-/y9WvNtlcPBGLR0qc1a+9J/xtYZfVczvLUOuXaVWylzttH7ewsxwHtjmiJSolNrVSDorIxHGHMU61CbonRkmwA==",
      "license": "Apache-2.0",
      "dependencies": {
        "@aws-sdk/core": "^3.978.1",
        "@aws-sdk/nested-clients": "^3.997.46",
        "@aws-sdk/types": "^3.974.6",
        "@smithy/core": "^3.35.0",
        "@smithy/types": "^4.19.0",
        "tslib": "^2.6.2"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@aws-sdk/middleware-sdk-s3": {
      "version": "3.972.77",
      "resolved": "https://registry.npmjs.org/@aws-sdk/middleware-sdk-s3/-/middleware-sdk-s3-3.972.77.tgz",
      "integrity": "sha512-E7W2UOeUoc+lg3uIfR/dM7ZwusHwhBQrKMnlkRv4EXRR+C0YtV1pg25xC7GdZIhXH+NAMgZPCbE7o5to2cjFiw==",
      "license": "Apache-2.0",
      "dependencies": {
        "@aws-sdk/core": "^3.978.1",
        "@aws-sdk/signature-v4-multi-region": "^3.996.47",
        "@aws-sdk/types": "^3.974.6",
        "@smithy/core": "^3.35.0",
        "@smithy/types": "^4.19.0",
        "tslib": "^2.6.2"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@aws-sdk/nested-clients": {
      "version": "3.997.46",
      "resolved": "https://registry.npmjs.org/@aws-sdk/nested-clients/-/nested-clients-3.997.46.tgz",
      "integrity": "sha512-oRxtBcka/JGHGs9l9p9IVajGoTP8vTPmoAzdHGy4Qcy9P5vPnDf6nhIeM/COQNY9k/OahImTRaLkHftoXvfcmQ==",
      "license": "Apache-2.0",
      "dependencies": {
        "@aws-sdk/core": "^3.978.1",
        "@aws-sdk/signature-v4-multi-region": "^3.996.47",
        "@aws-sdk/types": "^3.974.6",
        "@smithy/core": "^3.35.0",
        "@smithy/fetch-http-handler": "^5.8.0",
        "@smithy/node-http-handler": "^4.12.1",
        "@smithy/types": "^4.19.0",
        "tslib": "^2.6.2"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@aws-sdk/s3-request-presigner": {
      "version": "3.1141.0",
      "resolved": "https://registry.npmjs.org/@aws-sdk/s3-request-presigner/-/s3-request-presigner-3.1141.0.tgz",
      "integrity": "sha512-HHHcP3gvLqeY9GPptpxLvA6VwDu+MWKCoaGGm0UtSUBh1hC7xJ9nNHoybgFfstC4lrj+k8oD6a1rWbGBWKYdag==",
      "license": "Apache-2.0",
      "dependencies": {
        "@aws-sdk/core": "^3.978.1",
        "@aws-sdk/signature-v4-multi-region": "^3.996.47",
        "@aws-sdk/types": "^3.974.6",
        "@smithy/core": "^3.35.0",
        "@smithy/types": "^4.19.0",
        "tslib": "^2.6.2"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@aws-sdk/signature-v4-multi-region": {
      "version": "3.996.47",
      "resolved": "https://registry.npmjs.org/@aws-sdk/signature-v4-multi-region/-/signature-v4-multi-region-3.996.47.tgz",
      "integrity": "sha512-Zk08macMvQTHzQJCLJVkOlviVoqwYMrpXv4lmLN7b7sAbiMoOK7Go0NYdR5UeF+MW8LIbRmwrNy9u/5VvX1U5g==",
      "license": "Apache-2.0",
      "dependencies": {
        "@aws-sdk/types": "^3.974.6",
        "@smithy/signature-v4": "^5.7.3",
        "@smithy/types": "^4.19.0",
        "tslib": "^2.6.2"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@aws-sdk/token-providers": {
      "version": "3.1138.0",
      "resolved": "https://registry.npmjs.org/@aws-sdk/token-providers/-/token-providers-3.1138.0.tgz",
      "integrity": "sha512-GpyAr0DD63YOEmYFM6Df+gJuIgC92MMTiBK4FTKfxii5MJ9ge20epR7LyroulscYlG89J+ZB2ivFDPjvfQhzdw==",
      "license": "Apache-2.0",
      "dependencies": {
        "@aws-sdk/core": "^3.978.1",
        "@aws-sdk/nested-clients": "^3.997.46",
        "@aws-sdk/types": "^3.974.6",
        "@smithy/core": "^3.35.0",
        "@smithy/types": "^4.19.0",
        "tslib": "^2.6.2"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@aws-sdk/types": {
      "version": "3.974.6",
      "resolved": "https://registry.npmjs.org/@aws-sdk/types/-/types-3.974.6.tgz",
      "integrity": "sha512-v/clNZzZnDxGyvpHMOGpJKVXFAExJzUNAAjaWGdcx8QAcXLGwTaOkw33p5SHAi0YAioK32xB3hWwOekRVfmfKg==",
      "license": "Apache-2.0",
      "dependencies": {
        "@smithy/types": "^4.19.0",
        "tslib": "^2.6.2"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@aws-sdk/xml-builder": {
      "version": "3.972.41",
      "resolved": "https://registry.npmjs.org/@aws-sdk/xml-builder/-/xml-builder-3.972.41.tgz",
      "integrity": "sha512-ctjVSyCMegrWfXlx6VqzSBFI6UqmQ5ZlnfMhdLIiWmhoH8UAQxSCP5N3OpG7X3k4LnS7ou74C4mt20+bfTW2aQ==",
      "license": "Apache-2.0",
      "dependencies": {
        "@smithy/types": "^4.19.0",
        "tslib": "^2.6.2"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@aws/lambda-invoke-store": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/@aws/lambda-invoke-store/-/lambda-invoke-store-0.3.0.tgz",
      "integrity": "sha512-sl4Bm6yiMNYrZKkqqDFWN0UfnWhlS8ivKxrYl+6t0gCLrqr8y3B2IqZZbFRkfaVVp7C/baApyh71P+LeE1A2sQ==",
      "license": "Apache-2.0",
      "engines": {
        "node": ">=18.0.0"
      }
    },
    "node_modules/@esbuild/aix-ppc64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/aix-ppc64/-/aix-ppc64-0.28.2.tgz",
      "integrity": "sha512-XExcO+dvLKvVtNTibSTBej1NCAbaGhWn9Ww1ZPx80qsahhPFe/8jgWP0IchNe0F3HwkU7n8ejhH8bjonqht8mQ==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "aix"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-arm": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm/-/android-arm-0.28.2.tgz",
      "integrity": "sha512-kXXoiPVVGQcnIYGOeaovwOURpniDBpSq4A03qkQ+BMQqtGG6HYap3xne9C1O1yo4TR3qxlCX5IqqmX6fFo2Lqg==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-arm64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm64/-/android-arm64-0.28.2.tgz",
      "integrity": "sha512-5YfKeeI8qWfBZIX+u2xZC3Zlb3Os/gLS2sbEKM+I4ZOcsWmHS2WLysCcQZDAFRslDUU5Oiq44gf6PYN1vGwG5A==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-x64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/android-x64/-/android-x64-0.28.2.tgz",
      "integrity": "sha512-O387ite7SzUyCcy3JQX4P4bLtEA7bLLkx+esve5JHnyYfNTxcVpXZo9jhdB0lTKN44gztELTdU7nS8Nr16Fs1Q==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/darwin-arm64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-arm64/-/darwin-arm64-0.28.2.tgz",
      "integrity": "sha512-n4KqkOQrraxHJcgjM1RvwbigfQKIKJVpM7xp+KsxiyUSrRdIXnt73VhrPAx0fV44hgfmIVKjxMN9J1t5jySVkw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/darwin-x64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-x64/-/darwin-x64-0.28.2.tgz",
      "integrity": "sha512-uq6suIWYP37qzGddBKPw5QEQPi6HiLGsO7UmkpfyaYNQ3D+rN6w6WfwH+nuqcGXWvawGwxOEroO4YGnFh95azw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/freebsd-arm64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-arm64/-/freebsd-arm64-0.28.2.tgz",
      "integrity": "sha512-n+I0BTSRIoy+d6RPKnEVwql5UwBJolytvY4mAOIEJorKlqgPII8ix6slVVrfZ5Tnj7glIZvloylbB/EJPMWEXw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/freebsd-x64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-x64/-/freebsd-x64-0.28.2.tgz",
      "integrity": "sha512-78XJTJkvPs0kz2w61301PJjXl4g7q3JqiYMZ/M/yVI73EHBrCRTgkhu9oqG7vPqq+a/yadEW8aD+agKlk5xrmg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-arm": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm/-/linux-arm-0.28.2.tgz",
      "integrity": "sha512-XlDnu2q5yoqems+xay6wSAcg9DDD7K9RLKZEBOMZm3ckNpJBvOX20tSfby8KfrrhINDyv9V2YVZKY/SpoGJI8w==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-arm64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm64/-/linux-arm64-0.28.2.tgz",
      "integrity": "sha512-pW4AC0P3it8c7do9MVM4p51FzHzdM/TZrerurgRcHJ2WTa1VQ1CIq18xncfpBJw4ojkiZZrKW2yIBWBP92j6Ug==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-ia32": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ia32/-/linux-ia32-0.28.2.tgz",
      "integrity": "sha512-CYbnj78HsIeA+DhgUKgFCfvNsTHFhMMrinUrMZpDXJXKN8T3XViTZ/+wtHeVxEWY8ewSzTFN+nRmSwO2tZaLUQ==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-loong64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-loong64/-/linux-loong64-0.28.2.tgz",
      "integrity": "sha512-buwkd8nsph4R+ajRvw0qM5Hja/TXQow3ptzWO2EbG/cqcIkHloRrdlBtQlshyYGTNFvfkfJ5tpPLVkY4DtsPfQ==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-mips64el": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-mips64el/-/linux-mips64el-0.28.2.tgz",
      "integrity": "sha512-ZVykbDyk7519VwiNb9Lcj9m8XM6v5V9uKPvrEMkkEedVewf+0itkhahp4HDpgERXhwLRpWFypsGbG/J8s0QjJA==",
      "cpu": [
        "mips64el"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-ppc64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ppc64/-/linux-ppc64-0.28.2.tgz",
      "integrity": "sha512-CAXl+Dtd9UUuJd8pKKdwh6MLm3MUMiqMPmhZ3tTSXPqfyQ3vDl6R5hZdZ/kYojK4ofXtdfSv1tFq8XzWx3heNQ==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-riscv64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-riscv64/-/linux-riscv64-0.28.2.tgz",
      "integrity": "sha512-GeXCej4IQtU1B+QlDV8W/RRvbzI3O/Stss+/bCXv4lZls5WGRtu2a+3JkA3i4qIUlMXpcHebWpF8AkJhATowuA==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-s390x": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-s390x/-/linux-s390x-0.28.2.tgz",
      "integrity": "sha512-3H1weTYZPxt/WOhByszQZybS9w5lKzUn1FDMsgEChbHWQwHYQQRfBxgCcZvPhjHfKyJjIievvMmEUawJrdY9Dg==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-x64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-x64/-/linux-x64-0.28.2.tgz",
      "integrity": "sha512-4xTZr1FUmSoQW4XIWmit3tzQrUTZM+N3P0XV8xROKYF50XfI7xeO90+1bZvNwxIufQ9hDQVRJH5YhgPVF8A/HQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/netbsd-arm64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-arm64/-/netbsd-arm64-0.28.2.tgz",
      "integrity": "sha512-sSATRjPeDBg3pdgHoQfoYBob11Kk1FGa9lui5RIHZCoCkJa9QKlvl3/vKz2usCmYYjs7ymJR/2Nnsqe+Hjt5nw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/netbsd-x64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-x64/-/netbsd-x64-0.28.2.tgz",
      "integrity": "sha512-lqnzCV+mM0gIADaKihiCg6ifgfU2L3h5E33rNQBN1Y4MaVGnzryzmvvf7UHxprpQdE8hpqLolJ9Rl+SkIRDpyw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openbsd-arm64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-arm64/-/openbsd-arm64-0.28.2.tgz",
      "integrity": "sha512-AL2qJILH7lNjrDmCQDvdxMfAUIv8KMNZOvrwAQ8i8//ntL9FflhOyMJ8OZSMBb8/AWXe3/5v5S20y3zCoZWKoQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openbsd-x64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-x64/-/openbsd-x64-0.28.2.tgz",
      "integrity": "sha512-QtiuPytchRyC4rwUKhexJdQKvDuZ6hWloi3igqPQNUJCS1/v9EiO3UTOXR6A3FoMo4fnAKbWJdqaIwhOzh8qEw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openharmony-arm64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/openharmony-arm64/-/openharmony-arm64-0.28.2.tgz",
      "integrity": "sha512-WkhYDmpTjLvGlScA1rwjRUmhl4k8oXR3cIbtqWmELgU/dFeHHlEllxDvdWcNJV9rbzCexB5vz8gtNewWLgCT7Q==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/sunos-x64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/sunos-x64/-/sunos-x64-0.28.2.tgz",
      "integrity": "sha512-GPMSkTOtMnv2U2F8gxe4Io6qmVs+YKyp832Etqqxr0hFngmXQ3rzwytelm3GIn7T4VviRUlf3sOgBOiTdvaf7g==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "sunos"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-arm64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-arm64/-/win32-arm64-0.28.2.tgz",
      "integrity": "sha512-PIhhEkE9uPBleRBrQEJpUn7MBnibZzbGzYWPmY3x+YoVg/95zbjB4CxPPOQ8l5tYYM4mMaCthF8/1DIfBQQyWQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-ia32": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-ia32/-/win32-ia32-0.28.2.tgz",
      "integrity": "sha512-YmJbfTlvU7Sdn9BB+4PRES4oB6pxgS37MAONj+hBr/cpXS1aBPKXxNnDbu+QCWPj0o9dgyxeq79g6c5P8KeuYA==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-x64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-x64/-/win32-x64-0.28.2.tgz",
      "integrity": "sha512-5ebpxr3nWMzrL/rnUI755Jkuee0bHL/Gq0WTF9lvcpv73wAp5eu8MfBUgWK9bhWvZjj7yX8etf/8tI8Ney695g==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@ioredis/commands": {
      "version": "1.10.0",
      "resolved": "https://registry.npmjs.org/@ioredis/commands/-/commands-1.10.0.tgz",
      "integrity": "sha512-UmeW7z4LfctwoQ5wkhVzgq8tXkreED2xZGpX+Bg+zA+WJFZCT6c062AfCK/Dfk81xZnnwdhJCUMkitihRaoC2Q==",
      "license": "MIT"
    },
    "node_modules/@msgpackr-extract/msgpackr-extract-darwin-arm64": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/@msgpackr-extract/msgpackr-extract-darwin-arm64/-/msgpackr-extract-darwin-arm64-3.0.4.tgz",
      "integrity": "sha512-LCkGo6JDfaBhgST7UpPWgNgLINpcpabaHfyz5OBx75nUYxBsaEPxjnyNjWpeb/xBup/682QnBfRBy2/LvPutZQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@msgpackr-extract/msgpackr-extract-darwin-x64": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/@msgpackr-extract/msgpackr-extract-darwin-x64/-/msgpackr-extract-darwin-x64-3.0.4.tgz",
      "integrity": "sha512-zExlW9zUJKZH/tOtVMttwjKa4Xm/3KcNjnE3dPN92uCktwavMxpgCA3MoJK/DOnTWsQgo224OaST27/mPNAf+w==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@msgpackr-extract/msgpackr-extract-linux-arm": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/@msgpackr-extract/msgpackr-extract-linux-arm/-/msgpackr-extract-linux-arm-3.0.4.tgz",
      "integrity": "sha512-Tg3yX65f5GbtXLkrYEHE5oibZG9epyYWas7FogTTEJeDEF9JlXJzKgXaNhT3UXlTOeA+AfZpYZYZ0uPj7Cfquw==",
      "cpu": [
        "arm"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@msgpackr-extract/msgpackr-extract-linux-arm64": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/@msgpackr-extract/msgpackr-extract-linux-arm64/-/msgpackr-extract-linux-arm64-3.0.4.tgz",
      "integrity": "sha512-dgX0P/9wGPJeHFBG+ZmhgE6bmtMt7NP5CRBGyyktpopdk/mW4POnrpQsSLtKI1dwpc+pPLuXHDh6vvskyQE/sw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@msgpackr-extract/msgpackr-extract-linux-x64": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/@msgpackr-extract/msgpackr-extract-linux-x64/-/msgpackr-extract-linux-x64-3.0.4.tgz",
      "integrity": "sha512-8TNXMEjJc3QEy7R/x1INhgiU+XakDAFUzBhaz7+Rbrs8NH5UQeHQxxmzsSBJGyV6I1jW79undiQm8tOI+D+8FQ==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@msgpackr-extract/msgpackr-extract-win32-x64": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/@msgpackr-extract/msgpackr-extract-win32-x64/-/msgpackr-extract-win32-x64-3.0.4.tgz",
      "integrity": "sha512-CmCXPQrkbwExx3j946/PtHWHbYJiCRBRDl4BlkRQcJB/YOwQxJRTpoo7aTsortjgoJ1x7opzTSxn7C+ASSLVjQ==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@noble/hashes": {
      "version": "2.4.0",
      "resolved": "https://registry.npmjs.org/@noble/hashes/-/hashes-2.4.0.tgz",
      "integrity": "sha512-X5XaVWZIBCT7HHZGm5I7ZQXDwLG+bGXuSrMQAW+7Zvl87h1kmc1ZB1VSRJcpUfoUrGQp4Fkoxm5kZ+Ms+aW+eA==",
      "license": "MIT",
      "engines": {
        "node": ">= 20.19.0"
      },
      "funding": {
        "url": "https://paulmillr.com/funding/"
      }
    },
    "node_modules/@pinojs/redact": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/@pinojs/redact/-/redact-0.4.0.tgz",
      "integrity": "sha512-k2ENnmBugE/rzQfEcdWHcCY+/FM3VLzH9cYEsbdsoqrvzAKRhUZeRNhAZvB8OitQJ1TBed3yqWtdjzS6wJKBwg==",
      "license": "MIT"
    },
    "node_modules/@prisma/client": {
      "version": "6.19.3",
      "resolved": "https://registry.npmjs.org/@prisma/client/-/client-6.19.3.tgz",
      "integrity": "sha512-mKq3jQFhjvko5LTJFHGilsuQs+W+T3Gm451NzuTDGQxwCzwXHYnIu2zGkRoW+Exq3Rob7yp2MfzSrdIiZVhrBg==",
      "hasInstallScript": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=18.18"
      },
      "peerDependencies": {
        "prisma": "*",
        "typescript": ">=5.1.0"
      },
      "peerDependenciesMeta": {
        "prisma": {
          "optional": true
        },
        "typescript": {
          "optional": true
        }
      }
    },
    "node_modules/@prisma/config": {
      "version": "6.12.0",
      "resolved": "https://registry.npmjs.org/@prisma/config/-/config-6.12.0.tgz",
      "integrity": "sha512-HovZWzhWEMedHxmjefQBRZa40P81N7/+74khKFz9e1AFjakcIQdXgMWKgt20HaACzY+d1LRBC+L4tiz71t9fkg==",
      "devOptional": true,
      "license": "Apache-2.0",
      "dependencies": {
        "jiti": "2.4.2"
      }
    },
    "node_modules/@prisma/debug": {
      "version": "6.12.0",
      "resolved": "https://registry.npmjs.org/@prisma/debug/-/debug-6.12.0.tgz",
      "integrity": "sha512-plbz6z72orcqr0eeio7zgUrZj5EudZUpAeWkFTA/DDdXEj28YHDXuiakvR6S7sD6tZi+jiwQEJAPeV6J6m/tEQ==",
      "devOptional": true,
      "license": "Apache-2.0"
    },
    "node_modules/@prisma/engines": {
      "version": "6.12.0",
      "resolved": "https://registry.npmjs.org/@prisma/engines/-/engines-6.12.0.tgz",
      "integrity": "sha512-4BRZZUaAuB4p0XhTauxelvFs7IllhPmNLvmla0bO1nkECs8n/o1pUvAVbQ/VOrZR5DnF4HED0PrGai+rIOVePA==",
      "devOptional": true,
      "hasInstallScript": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@prisma/debug": "6.12.0",
        "@prisma/engines-version": "6.12.0-15.8047c96bbd92db98a2abc7c9323ce77c02c89dbc",
        "@prisma/fetch-engine": "6.12.0",
        "@prisma/get-platform": "6.12.0"
      }
    },
    "node_modules/@prisma/engines-version": {
      "version": "6.12.0-15.8047c96bbd92db98a2abc7c9323ce77c02c89dbc",
      "resolved": "https://registry.npmjs.org/@prisma/engines-version/-/engines-version-6.12.0-15.8047c96bbd92db98a2abc7c9323ce77c02c89dbc.tgz",
      "integrity": "sha512-70vhecxBJlRr06VfahDzk9ow4k1HIaSfVUT3X0/kZoHCMl9zbabut4gEXAyzJZxaCGi5igAA7SyyfBI//mmkbQ==",
      "devOptional": true,
      "license": "Apache-2.0"
    },
    "node_modules/@prisma/fetch-engine": {
      "version": "6.12.0",
      "resolved": "https://registry.npmjs.org/@prisma/fetch-engine/-/fetch-engine-6.12.0.tgz",
      "integrity": "sha512-EamoiwrK46rpWaEbLX9aqKDPOd8IyLnZAkiYXFNuq0YsU0Z8K09/rH8S7feOWAVJ3xzeSgcEJtBlVDrajM9Sag==",
      "devOptional": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@prisma/debug": "6.12.0",
        "@prisma/engines-version": "6.12.0-15.8047c96bbd92db98a2abc7c9323ce77c02c89dbc",
        "@prisma/get-platform": "6.12.0"
      }
    },
    "node_modules/@prisma/get-platform": {
      "version": "6.12.0",
      "resolved": "https://registry.npmjs.org/@prisma/get-platform/-/get-platform-6.12.0.tgz",
      "integrity": "sha512-nRerTGhTlgyvcBlyWgt8OLNIV7QgJS2XYXMJD1hysorMCuLAjuDDuoxmVt7C2nLxbuxbWPp7OuFRHC23HqD9dA==",
      "devOptional": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@prisma/debug": "6.12.0"
      }
    },
    "node_modules/@smithy/core": {
      "version": "3.35.0",
      "resolved": "https://registry.npmjs.org/@smithy/core/-/core-3.35.0.tgz",
      "integrity": "sha512-zRMhfkByhT2snNdr1si24vJitU6Cr9ix2MikUfWmkAgp4jrNP0GcKSP5YvwQ+TlI8AZXER5QOGJn3JsVtSD9/A==",
      "license": "Apache-2.0",
      "dependencies": {
        "@smithy/types": "^4.19.0",
        "tslib": "^2.6.2"
      },
      "engines": {
        "node": ">=18.0.0"
      }
    },
    "node_modules/@smithy/credential-provider-imds": {
      "version": "4.5.2",
      "resolved": "https://registry.npmjs.org/@smithy/credential-provider-imds/-/credential-provider-imds-4.5.2.tgz",
      "integrity": "sha512-A9uSdn72ozbRUSit0eib0TW7nXuNPlaeM0zcGkJ+nE6tFcSDbnmtwoxbTCFBukVQcszDAyvsd7+rTduPTXpygg==",
      "license": "Apache-2.0",
      "dependencies": {
        "@smithy/core": "^3.33.2",
        "@smithy/types": "^4.17.2",
        "tslib": "^2.6.2"
      },
      "engines": {
        "node": ">=18.0.0"
      }
    },
    "node_modules/@smithy/fetch-http-handler": {
      "version": "5.8.0",
      "resolved": "https://registry.npmjs.org/@smithy/fetch-http-handler/-/fetch-http-handler-5.8.0.tgz",
      "integrity": "sha512-ycSJu3tFAQ4v04CBB0agqFMVsSQ1iG3yw+SpgxRqKfaURpQD4CZ8Wn0zPMmSnOuTpTh65Vz+EA0rMrw089wvkA==",
      "license": "Apache-2.0",
      "dependencies": {
        "@smithy/core": "^3.33.3",
        "@smithy/types": "^4.18.0",
        "tslib": "^2.6.2"
      },
      "engines": {
        "node": ">=18.0.0"
      }
    },
    "node_modules/@smithy/node-http-handler": {
      "version": "4.12.1",
      "resolved": "https://registry.npmjs.org/@smithy/node-http-handler/-/node-http-handler-4.12.1.tgz",
      "integrity": "sha512-ThMkboGeONWXAelq9FvGsuJC4rOi+qyC4/zhUF58xYpxUg5sQKx2VXZYJmtNjr4dSuBJ1HeJXETQILCz3wOHvw==",
      "license": "Apache-2.0",
      "dependencies": {
        "@smithy/core": "^3.33.3",
        "@smithy/types": "^4.18.0",
        "tslib": "^2.6.2"
      },
      "engines": {
        "node": ">=18.0.0"
      }
    },
    "node_modules/@smithy/signature-v4": {
      "version": "5.7.4",
      "resolved": "https://registry.npmjs.org/@smithy/signature-v4/-/signature-v4-5.7.4.tgz",
      "integrity": "sha512-tHy0K0VtqNd5Y7Y41h0a0Lhh0L1GzC08dTWg0F7vRJWFtTENg7IZikf3wQkanYIRdb7ngoIPMTmqgUi401fEeQ==",
      "license": "Apache-2.0",
      "dependencies": {
        "@smithy/core": "^3.35.0",
        "@smithy/types": "^4.19.0",
        "tslib": "^2.6.2"
      },
      "engines": {
        "node": ">=18.0.0"
      }
    },
    "node_modules/@smithy/types": {
      "version": "4.19.0",
      "resolved": "https://registry.npmjs.org/@smithy/types/-/types-4.19.0.tgz",
      "integrity": "sha512-r7jh49VJxGerfAcTQA6gXcKc+98zOp/tqRwzYjgOE+iSQsP6cEU1hq2QzbuipmP68QtYdY9wKEhiCQZIzHgZ4Q==",
      "license": "Apache-2.0",
      "dependencies": {
        "tslib": "^2.6.2"
      },
      "engines": {
        "node": ">=18.0.0"
      }
    },
    "node_modules/@socket.io/component-emitter": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/@socket.io/component-emitter/-/component-emitter-3.1.2.tgz",
      "integrity": "sha512-9BCxFwvbGg/RsZK9tjXd8s4UcwR0MWeFQ1XEKIQVVvAGJyINdrqKMcTRyLoK8Rse1GjzLV9cwjWV1olXRWEXVA==",
      "license": "MIT"
    },
    "node_modules/@socket.io/redis-adapter": {
      "version": "8.3.0",
      "resolved": "https://registry.npmjs.org/@socket.io/redis-adapter/-/redis-adapter-8.3.0.tgz",
      "integrity": "sha512-ly0cra+48hDmChxmIpnESKrc94LjRL80TEmZVscuQ/WWkRP81nNj8W8cCGMqbI4L6NCuAaPRSzZF1a9GlAxxnA==",
      "license": "MIT",
      "dependencies": {
        "debug": "~4.3.1",
        "notepack.io": "~3.0.1",
        "uid2": "1.0.0"
      },
      "engines": {
        "node": ">=10.0.0"
      },
      "peerDependencies": {
        "socket.io-adapter": "^2.5.4"
      }
    },
    "node_modules/@stablelib/base64": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/@stablelib/base64/-/base64-1.0.1.tgz",
      "integrity": "sha512-1bnPQqSxSuc3Ii6MhBysoWCg58j97aUjuCSZrGSmDxNqtytIi0k8utUenAwTZN4V5mXXYGsVUI9zeBqy+jBOSQ==",
      "license": "MIT"
    },
    "node_modules/@types/bcrypt": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/@types/bcrypt/-/bcrypt-6.0.0.tgz",
      "integrity": "sha512-/oJGukuH3D2+D+3H4JWLaAsJ/ji86dhRidzZ/Od7H/i8g+aCmvkeCc6Ni/f9uxGLSQVCRZkX2/lqEFG2BvWtlQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/node": "*"
      }
    },
    "node_modules/@types/body-parser": {
      "version": "1.19.6",
      "resolved": "https://registry.npmjs.org/@types/body-parser/-/body-parser-1.19.6.tgz",
      "integrity": "sha512-HLFeCYgz89uk22N5Qg3dvGvsv46B8GLvKKo1zKG4NybA8U2DiEO3w9lqGg29t/tfLRJpJ6iQxnVw4OnB7MoM9g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/connect": "*",
        "@types/node": "*"
      }
    },
    "node_modules/@types/connect": {
      "version": "3.4.38",
      "resolved": "https://registry.npmjs.org/@types/connect/-/connect-3.4.38.tgz",
      "integrity": "sha512-K6uROf1LD88uDQqJCktA4yzL1YYAK6NgfsI0v/mTgyPKWsX1CnJ0XPSDhViejru1GcRkLWb8RlzFYJRqGUbaug==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/node": "*"
      }
    },
    "node_modules/@types/cors": {
      "version": "2.8.19",
      "resolved": "https://registry.npmjs.org/@types/cors/-/cors-2.8.19.tgz",
      "integrity": "sha512-mFNylyeyqN93lfe/9CSxOGREz8cpzAhH+E93xJ4xWQf62V8sQ/24reV2nyzUWM6H6Xji+GGHpkbLe7pVoUEskg==",
      "license": "MIT",
      "dependencies": {
        "@types/node": "*"
      }
    },
    "node_modules/@types/express": {
      "version": "4.17.25",
      "resolved": "https://registry.npmjs.org/@types/express/-/express-4.17.25.tgz",
      "integrity": "sha512-dVd04UKsfpINUnK0yBoYHDF3xu7xVH4BuDotC/xGuycx4CgbP48X/KF/586bcObxT0HENHXEU8Nqtu6NR+eKhw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/body-parser": "*",
        "@types/express-serve-static-core": "^4.17.33",
        "@types/qs": "*",
        "@types/serve-static": "^1"
      }
    },
    "node_modules/@types/express-serve-static-core": {
      "version": "4.19.9",
      "resolved": "https://registry.npmjs.org/@types/express-serve-static-core/-/express-serve-static-core-4.19.9.tgz",
      "integrity": "sha512-QP2ESEe/ImWY0HDwNAnK9PvEffUyhLTnWkk7KXzHfyeWAnlrDe1fN77bXl6ia8KT3wPlmA7t9/VPRpnf4Ex9sg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/node": "*",
        "@types/qs": "*",
        "@types/range-parser": "*",
        "@types/send": "*"
      }
    },
    "node_modules/@types/http-errors": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/@types/http-errors/-/http-errors-2.0.5.tgz",
      "integrity": "sha512-r8Tayk8HJnX0FztbZN7oVqGccWgw98T/0neJphO91KkmOzug1KkofZURD4UaD5uH8AqcFLfdPErnBod0u71/qg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/jsonwebtoken": {
      "version": "9.0.10",
      "resolved": "https://registry.npmjs.org/@types/jsonwebtoken/-/jsonwebtoken-9.0.10.tgz",
      "integrity": "sha512-asx5hIG9Qmf/1oStypjanR7iKTv0gXQ1Ov/jfrX6kS/EO0OFni8orbmGCn0672NHR3kXHwpAwR+B368ZGN/2rA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/ms": "*",
        "@types/node": "*"
      }
    },
    "node_modules/@types/mime": {
      "version": "1.3.5",
      "resolved": "https://registry.npmjs.org/@types/mime/-/mime-1.3.5.tgz",
      "integrity": "sha512-/pyBZWSLD2n0dcHE3hq8s8ZvcETHtEuF+3E7XVt0Ig2nvsVQXdghHVcEkIWjy9A0wKfTn97a/PSDYohKIlnP/w==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/ms": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/@types/ms/-/ms-2.1.0.tgz",
      "integrity": "sha512-GsCCIZDE/p3i96vtEqx+7dBUGXrc7zeSK3wwPHIaRThS+9OhWIXRqzs4d6k1SVU8g91DrNRWxWUGhp5KXQb2VA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/node": {
      "version": "24.19.0",
      "resolved": "https://registry.npmjs.org/@types/node/-/node-24.19.0.tgz",
      "integrity": "sha512-zY+5tKxXdhGh1PYI0ac+7juvEu4OI6vWtVVoj5i2m42jxAY1U+zHGt6QCyOFwykdP62sM3MJ9stoYYUw5aCWew==",
      "license": "MIT",
      "dependencies": {
        "undici-types": ">=7.24.0 <7.24.7"
      }
    },
    "node_modules/@types/nodemailer": {
      "version": "8.0.2",
      "resolved": "https://registry.npmjs.org/@types/nodemailer/-/nodemailer-8.0.2.tgz",
      "integrity": "sha512-c7M5ox8p0nEOfbJ2E9Qcmt8/QCu/VzsiAhzBiZbvky2PhKZDHpKB3sQHBM5MEZNkCfBOaS6S9//AGPRTNB7IaA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/node": "*"
      }
    },
    "node_modules/@types/qs": {
      "version": "6.15.1",
      "resolved": "https://registry.npmjs.org/@types/qs/-/qs-6.15.1.tgz",
      "integrity": "sha512-GZHUBZR9hckSUhrxmp1nG6NwdpM9fCunJwyThLW1X3AyHgd9IlHb6VANpQQqDr2o/qQp6McZ3y/IA2rVzKzSbw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/range-parser": {
      "version": "1.2.7",
      "resolved": "https://registry.npmjs.org/@types/range-parser/-/range-parser-1.2.7.tgz",
      "integrity": "sha512-hKormJbkJqzQGhziax5PItDUTMAM9uE2XXQmM37dyd4hVM+5aVl7oVxMVUiVQn2oCQFN/LKCZdvSM0pFRqbSmQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/send": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/@types/send/-/send-1.2.1.tgz",
      "integrity": "sha512-arsCikDvlU99zl1g69TcAB3mzZPpxgw0UQnaHeC1Nwb015xp8bknZv5rIfri9xTOcMuaVgvabfIRA7PSZVuZIQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/node": "*"
      }
    },
    "node_modules/@types/serve-static": {
      "version": "1.15.10",
      "resolved": "https://registry.npmjs.org/@types/serve-static/-/serve-static-1.15.10.tgz",
      "integrity": "sha512-tRs1dB+g8Itk72rlSI2ZrW6vZg0YrLI81iQSTkMmOqnqCaNr/8Ek4VwWcN5vZgCYWbg/JJSGBlUaYGAOP73qBw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/http-errors": "*",
        "@types/node": "*",
        "@types/send": "<1"
      }
    },
    "node_modules/@types/serve-static/node_modules/@types/send": {
      "version": "0.17.6",
      "resolved": "https://registry.npmjs.org/@types/send/-/send-0.17.6.tgz",
      "integrity": "sha512-Uqt8rPBE8SY0RK8JB1EzVOIZ32uqy8HwdxCnoCOsYrvnswqmFZ/k+9Ikidlk/ImhsdvBsloHbAlewb2IEBV/Og==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/mime": "^1",
        "@types/node": "*"
      }
    },
    "node_modules/@types/uuid": {
      "version": "10.0.0",
      "resolved": "https://registry.npmjs.org/@types/uuid/-/uuid-10.0.0.tgz",
      "integrity": "sha512-7gqG38EyHgyP1S+7+xomFtL+ZNHcKv6DwNaCZmJmo1vgMugyF3TCnXVg4t1uk89mLNwnLtnY3TpOpCOyp1/xHQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/ws": {
      "version": "8.18.1",
      "resolved": "https://registry.npmjs.org/@types/ws/-/ws-8.18.1.tgz",
      "integrity": "sha512-ThVF6DCVhA8kUGy+aazFQ4kXQ7E1Ty7A3ypFOe0IcJV8O/M511G99AW24irKrW56Wt44yG9+ij8FaqoBGkuBXg==",
      "license": "MIT",
      "dependencies": {
        "@types/node": "*"
      }
    },
    "node_modules/accepts": {
      "version": "1.3.8",
      "resolved": "https://registry.npmjs.org/accepts/-/accepts-1.3.8.tgz",
      "integrity": "sha512-PYAthTa2m2VKxuvSD3DPC/Gy+U+sOA1LAuT8mkmRuvw+NACSaeXEQ+NHcVF7rONl6qcaxV3Uuemwawk+7+SJLw==",
      "license": "MIT",
      "dependencies": {
        "mime-types": "~2.1.34",
        "negotiator": "0.6.3"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/array-flatten": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/array-flatten/-/array-flatten-1.1.1.tgz",
      "integrity": "sha512-PCVAQswWemu6UdxsDFFX/+gVeYqKAod3D3UVm91jHwynguOwAvYPhx8nNlM++NqRcK6CxxpUafjmhIdKiHibqg==",
      "license": "MIT"
    },
    "node_modules/atomic-sleep": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/atomic-sleep/-/atomic-sleep-1.0.0.tgz",
      "integrity": "sha512-kNOjDqAh7px0XWNI+4QbzoiR/nTkHAWNud2uvnJquD1/x5a7EQZMJT0AczqK0Qn67oY/TTQ1LbUKajZpp3I9tQ==",
      "license": "MIT",
      "engines": {
        "node": ">=8.0.0"
      }
    },
    "node_modules/bcrypt": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/bcrypt/-/bcrypt-6.0.0.tgz",
      "integrity": "sha512-cU8v/EGSrnH+HnxV2z0J7/blxH8gq7Xh2JFT6Aroax7UohdmiJJlxApMxtKfuI7z68NvvVcmR78k2LbT6efhRg==",
      "hasInstallScript": true,
      "license": "MIT",
      "dependencies": {
        "node-addon-api": "^8.3.0",
        "node-gyp-build": "^4.8.4"
      },
      "engines": {
        "node": ">= 18"
      }
    },
    "node_modules/body-parser": {
      "version": "1.20.8",
      "resolved": "https://registry.npmjs.org/body-parser/-/body-parser-1.20.8.tgz",
      "integrity": "sha512-JNcyFQ64OiijEkPzUBTCe+hyPXUD/3LEldGQ6iF5LR1w00mx9o7xtDWHXBY2iItjdCFGoilOLNQbH943ut7pHA==",
      "license": "MIT",
      "dependencies": {
        "bytes": "~3.1.2",
        "content-type": "~1.0.5",
        "debug": "2.6.9",
        "depd": "2.0.0",
        "destroy": "~1.2.0",
        "http-errors": "~2.0.1",
        "iconv-lite": "~0.4.24",
        "on-finished": "~2.4.1",
        "qs": "~6.16.0",
        "raw-body": "~2.5.3",
        "type-is": "~1.6.18",
        "unpipe": "~1.0.0"
      },
      "engines": {
        "node": ">= 0.8",
        "npm": "1.2.8000 || >= 1.4.16"
      }
    },
    "node_modules/body-parser/node_modules/debug": {
      "version": "2.6.9",
      "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
      "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
      "license": "MIT",
      "dependencies": {
        "ms": "2.0.0"
      }
    },
    "node_modules/body-parser/node_modules/ms": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
      "integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A==",
      "license": "MIT"
    },
    "node_modules/bowser": {
      "version": "2.14.1",
      "resolved": "https://registry.npmjs.org/bowser/-/bowser-2.14.1.tgz",
      "integrity": "sha512-tzPjzCxygAKWFOJP011oxFHs57HzIhOEracIgAePE4pqB3LikALKnSzUyU4MGs9/iCEUuHlAJTjTc5M+u7YEGg==",
      "license": "MIT"
    },
    "node_modules/buffer-equal-constant-time": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/buffer-equal-constant-time/-/buffer-equal-constant-time-1.0.1.tgz",
      "integrity": "sha512-zRpUiDwd/xk6ADqPMATG8vc9VPrkck7T07OIx0gnjmJAnHnTVXNQG3vfvWNuiZIkwu9KrKdA1iJKfsfTVxE6NA==",
      "license": "BSD-3-Clause"
    },
    "node_modules/bullmq": {
      "version": "5.81.5",
      "resolved": "https://registry.npmjs.org/bullmq/-/bullmq-5.81.5.tgz",
      "integrity": "sha512-pW7pFc/X+9AEIx91TWTdIpZ1icfbJnA0unsyzD7VICjCUw8a3qedSjej5dxxn6LjfM1kr2jvalOCGbCmoA5Kxg==",
      "license": "MIT",
      "dependencies": {
        "cron-parser": "4.9.0",
        "ioredis": "5.11.1",
        "msgpackr": "2.0.5",
        "node-abort-controller": "3.1.1",
        "semver": "7.8.5",
        "tslib": "2.8.1"
      },
      "engines": {
        "node": ">=12.22.0"
      },
      "peerDependencies": {
        "redis": ">=5.0.0"
      },
      "peerDependenciesMeta": {
        "redis": {
          "optional": true
        }
      }
    },
    "node_modules/bytes": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/bytes/-/bytes-3.1.2.tgz",
      "integrity": "sha512-/Nf7TyzTx6S3yRJObOAV7956r8cr2+Oj8AC5dt8wSP3BQAoeX58NoHyCU8P8zGkNXStjTSi6fzO6F0pBdcYbEg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/call-bind-apply-helpers": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/call-bind-apply-helpers/-/call-bind-apply-helpers-1.0.2.tgz",
      "integrity": "sha512-Sp1ablJ0ivDkSzjcaJdxEunN5/XvksFJ2sMBFfq6x0ryhQV/2b/KwFe21cMpmHtPOSij8K99/wSfoEuTObmuMQ==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/call-bound": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/call-bound/-/call-bound-1.0.4.tgz",
      "integrity": "sha512-+ys997U96po4Kx/ABpBCqhA9EuxJaQWDQg7295H4hBphv3IZg0boBKuwYpt4YXp6MZ5AmZQnU/tyMTlRpaSejg==",
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.2",
        "get-intrinsic": "^1.3.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/cluster-key-slot": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/cluster-key-slot/-/cluster-key-slot-1.1.1.tgz",
      "integrity": "sha512-rwHwUfXL40Chm1r08yrhU3qpUvdVlgkKNeyeGPOxnW8/SyVDvgRaed/Uz54AqWNaTCAThlj6QAs3TZcKI0xDEw==",
      "license": "Apache-2.0",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/content-disposition": {
      "version": "0.5.4",
      "resolved": "https://registry.npmjs.org/content-disposition/-/content-disposition-0.5.4.tgz",
      "integrity": "sha512-FveZTNuGw04cxlAiWbzi6zTAL/lhehaWbTtgluJh4/E95DqMwTmha3KZN1aAWA8cFIhHzMZUvLevkw5Rqk+tSQ==",
      "license": "MIT",
      "dependencies": {
        "safe-buffer": "5.2.1"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/content-type": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/content-type/-/content-type-1.0.5.tgz",
      "integrity": "sha512-nTjqfcBFEipKdXCv4YDQWCfmcLZKm81ldF0pAopTvyrFGVbcR6P/VAAd5G7N+0tTr8QqiU0tFadD6FK4NtJwOA==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/cookie": {
      "version": "0.7.2",
      "resolved": "https://registry.npmjs.org/cookie/-/cookie-0.7.2.tgz",
      "integrity": "sha512-yki5XnKuf750l50uGTllt6kKILY4nQ1eNIQatoXEByZ5dWgnKqbnqmTrBE5B4N7lrMJKQ2ytWMiTO2o0v6Ew/w==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/cookie-signature": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/cookie-signature/-/cookie-signature-1.0.7.tgz",
      "integrity": "sha512-NXdYc3dLr47pBkpUCHtKSwIOQXLVn8dZEuywboCOJY/osA0wFSLlSawr3KN8qXJEyX66FcONTH8EIlVuK0yyFA==",
      "license": "MIT"
    },
    "node_modules/cors": {
      "version": "2.8.6",
      "resolved": "https://registry.npmjs.org/cors/-/cors-2.8.6.tgz",
      "integrity": "sha512-tJtZBBHA6vjIAaF6EnIaq6laBBP9aq/Y3ouVJjEfoHbRBcHBAHYcMh/w8LDrk2PvIMMq8gmopa5D4V8RmbrxGw==",
      "license": "MIT",
      "dependencies": {
        "object-assign": "^4",
        "vary": "^1"
      },
      "engines": {
        "node": ">= 0.10"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/cron-parser": {
      "version": "4.9.0",
      "resolved": "https://registry.npmjs.org/cron-parser/-/cron-parser-4.9.0.tgz",
      "integrity": "sha512-p0SaNjrHOnQeR8/VnfGbmg9te2kfyYSQ7Sc/j/6DtPL3JQvKxmjO9TSjNFpujqV3vEYYBvNNvXSxzyksBWAx1Q==",
      "deprecated": "v4 is no longer maintained, upgrade to v5",
      "license": "MIT",
      "dependencies": {
        "luxon": "^3.2.1"
      },
      "engines": {
        "node": ">=12.0.0"
      }
    },
    "node_modules/date-fns": {
      "version": "4.4.0",
      "resolved": "https://registry.npmjs.org/date-fns/-/date-fns-4.4.0.tgz",
      "integrity": "sha512-+1UMbeh68lH1SegH83CGWwpb6OHHbpSgr3+s5Eww5M4CAgswBpoWS0AjTOfEJ33HiYKz1hdj/KTFprzXHmq/6w==",
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/kossnocorp"
      }
    },
    "node_modules/debug": {
      "version": "4.3.7",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.3.7.tgz",
      "integrity": "sha512-Er2nc/H7RrMXZBFCEim6TCmMk02Z8vLC2Rbi1KEBggpo0fS6l0S1nnapwmIi3yW/+GOJap1Krg4w0Hg80oCqgQ==",
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/denque": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/denque/-/denque-2.1.0.tgz",
      "integrity": "sha512-HVQE3AAb/pxF8fQAoiqpvg9i3evqug3hoiwakOyZAwJm+6vZehbkYXZ0l4JxS+I3QxM97v5aaRNhj8v5oBhekw==",
      "license": "Apache-2.0",
      "engines": {
        "node": ">=0.10"
      }
    },
    "node_modules/depd": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/depd/-/depd-2.0.0.tgz",
      "integrity": "sha512-g7nH6P6dyDioJogAAGprGpCtVImJhpPk/roCzdb3fIh61/s/nPsfR6onyMwkCAR/OlC3yBC0lESvUoQEAssIrw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/destroy": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/destroy/-/destroy-1.2.0.tgz",
      "integrity": "sha512-2sJGJTaXIIaR1w4iJSNoN0hnMY7Gpc/n8D4qSCJw8QqFWXf7cuAgnEHxBpweaVcPevC2l3KpjYCx3NypQQgaJg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8",
        "npm": "1.2.8000 || >= 1.4.16"
      }
    },
    "node_modules/detect-libc": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/detect-libc/-/detect-libc-2.1.2.tgz",
      "integrity": "sha512-Btj2BOOO83o3WyH59e8MgXsxEQVcarkUOpEYrubB0urwnN10yQ364rsiByU11nZlqWYZm05i/of7io4mzihBtQ==",
      "license": "Apache-2.0",
      "optional": true,
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/dotenv": {
      "version": "17.4.2",
      "resolved": "https://registry.npmjs.org/dotenv/-/dotenv-17.4.2.tgz",
      "integrity": "sha512-nI4U3TottKAcAD9LLud4Cb7b2QztQMUEfHbvhTH09bqXTxnSie8WnjPALV/WMCrJZ6UV/qHJ6L03OqO3LcdYZw==",
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://dotenvx.com"
      }
    },
    "node_modules/dunder-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/dunder-proto/-/dunder-proto-1.0.1.tgz",
      "integrity": "sha512-KIN/nDJBQRcXw0MLVhZE9iQHmG68qAVIBg9CqmUYjmQIhgij9U5MFvrqkUL5FbtyyzZuOeOt0zdeRe4UY7ct+A==",
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.1",
        "es-errors": "^1.3.0",
        "gopd": "^1.2.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/ecdsa-sig-formatter": {
      "version": "1.0.11",
      "resolved": "https://registry.npmjs.org/ecdsa-sig-formatter/-/ecdsa-sig-formatter-1.0.11.tgz",
      "integrity": "sha512-nagl3RYrbNv6kQkeJIpt6NJZy8twLB/2vtz6yN9Z4vRKHN4/QZJIEbqohALSgwKdnksuY3k5Addp5lg8sVoVcQ==",
      "license": "Apache-2.0",
      "dependencies": {
        "safe-buffer": "^5.0.1"
      }
    },
    "node_modules/ee-first": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/ee-first/-/ee-first-1.1.1.tgz",
      "integrity": "sha512-WMwm9LhRUo+WUaRN+vRuETqG89IgZphVSNkdFgeb6sS/E4OrDIN7t48CAewSHXc6C8lefD8KKfr5vY61brQlow==",
      "license": "MIT"
    },
    "node_modules/encodeurl": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/encodeurl/-/encodeurl-2.0.0.tgz",
      "integrity": "sha512-Q0n9HRi4m6JuGIV1eFlmvJB7ZEVxu93IrMyiMsGC0lrMJMWzRgx6WGquyfQgZVb31vhGgXnfmPNNXmxnOkRBrg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/engine.io": {
      "version": "6.6.11",
      "resolved": "https://registry.npmjs.org/engine.io/-/engine.io-6.6.11.tgz",
      "integrity": "sha512-z34mGpLoY/82ZbkX1LqGMIaf3wjVMPL6gVC681QDqnmzJ26synI8qAE32P+a7UazmpJZ8UGrFIeAavgRfXzYrg==",
      "license": "MIT",
      "dependencies": {
        "@types/cors": "^2.8.12",
        "@types/node": ">=10.0.0",
        "@types/ws": "^8.5.12",
        "accepts": "~1.3.4",
        "cookie": "~0.7.2",
        "cors": "~2.8.5",
        "debug": "~4.4.1",
        "engine.io-parser": "~5.2.1",
        "ws": "~8.21.0"
      },
      "engines": {
        "node": ">=10.2.0"
      }
    },
    "node_modules/engine.io-parser": {
      "version": "5.2.3",
      "resolved": "https://registry.npmjs.org/engine.io-parser/-/engine.io-parser-5.2.3.tgz",
      "integrity": "sha512-HqD3yTBfnBxIrbnM1DoD6Pcq8NECnh8d4As1Qgh0z5Gg3jRRIqijury0CL3ghu/edArpUYiYqQiDUQBIs4np3Q==",
      "license": "MIT",
      "engines": {
        "node": ">=10.0.0"
      }
    },
    "node_modules/engine.io/node_modules/debug": {
      "version": "4.4.3",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.3.tgz",
      "integrity": "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA==",
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/es-define-property": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/es-define-property/-/es-define-property-1.0.1.tgz",
      "integrity": "sha512-e3nRfgfUZ4rNGL232gUgX06QNyyez04KdjFrF+LTRoOXmrOgFKDg4BCdsjW8EnT69eqdYGmRpJwiPVYNrCaW3g==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-errors": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/es-errors/-/es-errors-1.3.0.tgz",
      "integrity": "sha512-Zf5H2Kxt2xjTvbJvP2ZWLEICxA6j+hAmMzIlypy4xcBg1vKVnx89Wy0GbS+kf5cwCVFFzdCFh2XSCFNULS6csw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-object-atoms": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/es-object-atoms/-/es-object-atoms-1.1.2.tgz",
      "integrity": "sha512-HWcBoN6NileqtSydK2FqHbS/LoDd2pqrnQHLyJzBj4kOp/ky2MWMN694xOfkK8/SnUsW2DH7EfyVlydKCsm1Zw==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/esbuild": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/esbuild/-/esbuild-0.28.2.tgz",
      "integrity": "sha512-HKVLS8dvII+xoKW9kmqxbRKrnWEXfJJr/FZhhJmiqIB0e053QNYFqOBouTMO/k5sID4MvCiUCvv8b9M4h32wIA==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "bin": {
        "esbuild": "bin/esbuild"
      },
      "engines": {
        "node": ">=18"
      },
      "optionalDependencies": {
        "@esbuild/aix-ppc64": "0.28.2",
        "@esbuild/android-arm": "0.28.2",
        "@esbuild/android-arm64": "0.28.2",
        "@esbuild/android-x64": "0.28.2",
        "@esbuild/darwin-arm64": "0.28.2",
        "@esbuild/darwin-x64": "0.28.2",
        "@esbuild/freebsd-arm64": "0.28.2",
        "@esbuild/freebsd-x64": "0.28.2",
        "@esbuild/linux-arm": "0.28.2",
        "@esbuild/linux-arm64": "0.28.2",
        "@esbuild/linux-ia32": "0.28.2",
        "@esbuild/linux-loong64": "0.28.2",
        "@esbuild/linux-mips64el": "0.28.2",
        "@esbuild/linux-ppc64": "0.28.2",
        "@esbuild/linux-riscv64": "0.28.2",
        "@esbuild/linux-s390x": "0.28.2",
        "@esbuild/linux-x64": "0.28.2",
        "@esbuild/netbsd-arm64": "0.28.2",
        "@esbuild/netbsd-x64": "0.28.2",
        "@esbuild/openbsd-arm64": "0.28.2",
        "@esbuild/openbsd-x64": "0.28.2",
        "@esbuild/openharmony-arm64": "0.28.2",
        "@esbuild/sunos-x64": "0.28.2",
        "@esbuild/win32-arm64": "0.28.2",
        "@esbuild/win32-ia32": "0.28.2",
        "@esbuild/win32-x64": "0.28.2"
      }
    },
    "node_modules/escape-html": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/escape-html/-/escape-html-1.0.3.tgz",
      "integrity": "sha512-NiSupZ4OeuGwr68lGIeym/ksIZMJodUGOSCZ/FSnTxcrekbvqrgdUxlJOMpijaKZVjAJrWrGs/6Jy8OMuyj9ow==",
      "license": "MIT"
    },
    "node_modules/etag": {
      "version": "1.8.1",
      "resolved": "https://registry.npmjs.org/etag/-/etag-1.8.1.tgz",
      "integrity": "sha512-aIL5Fx7mawVa300al2BnEE4iNvo1qETxLrPI/o05L7z6go7fCw1J6EQmbK4FmJ2AS7kgVF/KEZWufBfdClMcPg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/express": {
      "version": "4.22.3",
      "resolved": "https://registry.npmjs.org/express/-/express-4.22.3.tgz",
      "integrity": "sha512-Bdcs4+3qlpVlx2NRn6fgX2Ue2/gGRaPeawebgclM0ERSCqDpA+owF1fdPwjJUTAJWMTuAaxjDf+hzb0/4eKvvw==",
      "license": "MIT",
      "dependencies": {
        "accepts": "~1.3.8",
        "array-flatten": "1.1.1",
        "body-parser": "~1.20.5",
        "content-disposition": "~0.5.4",
        "content-type": "~1.0.4",
        "cookie": "~0.7.1",
        "cookie-signature": "~1.0.6",
        "debug": "2.6.9",
        "depd": "2.0.0",
        "encodeurl": "~2.0.0",
        "escape-html": "~1.0.3",
        "etag": "~1.8.1",
        "finalhandler": "~1.3.1",
        "fresh": "~0.5.2",
        "http-errors": "~2.0.0",
        "merge-descriptors": "1.0.3",
        "methods": "~1.1.2",
        "on-finished": "~2.4.1",
        "parseurl": "~1.3.3",
        "path-to-regexp": "~0.1.13",
        "proxy-addr": "~2.0.7",
        "qs": "~6.16.0",
        "range-parser": "~1.2.1",
        "safe-buffer": "5.2.1",
        "send": "~0.19.0",
        "serve-static": "~1.16.2",
        "setprototypeof": "1.2.0",
        "statuses": "~2.0.1",
        "type-is": "~1.6.18",
        "utils-merge": "1.0.1",
        "vary": "~1.1.2"
      },
      "engines": {
        "node": ">= 0.10.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/express-rate-limit": {
      "version": "7.5.1",
      "resolved": "https://registry.npmjs.org/express-rate-limit/-/express-rate-limit-7.5.1.tgz",
      "integrity": "sha512-7iN8iPMDzOMHPUYllBEsQdWVB6fPDMPqwjBaFrgr4Jgr/+okjvzAy+UHlYYL/Vs0OsOrMkwS6PJDkFlJwoxUnw==",
      "license": "MIT",
      "engines": {
        "node": ">= 16"
      },
      "funding": {
        "url": "https://github.com/sponsors/express-rate-limit"
      },
      "peerDependencies": {
        "express": ">= 4.11"
      }
    },
    "node_modules/express/node_modules/debug": {
      "version": "2.6.9",
      "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
      "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
      "license": "MIT",
      "dependencies": {
        "ms": "2.0.0"
      }
    },
    "node_modules/express/node_modules/ms": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
      "integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A==",
      "license": "MIT"
    },
    "node_modules/fast-sha256": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/fast-sha256/-/fast-sha256-1.3.0.tgz",
      "integrity": "sha512-n11RGP/lrWEFI/bWdygLxhI+pVeo1ZYIVwvvPkW7azl/rOy+F3HYRZ2K5zeE9mmkhQppyv9sQFx0JM9UabnpPQ==",
      "license": "Unlicense"
    },
    "node_modules/finalhandler": {
      "version": "1.3.2",
      "resolved": "https://registry.npmjs.org/finalhandler/-/finalhandler-1.3.2.tgz",
      "integrity": "sha512-aA4RyPcd3badbdABGDuTXCMTtOneUCAYH/gxoYRTZlIJdF0YPWuGqiAsIrhNnnqdXGswYk6dGujem4w80UJFhg==",
      "license": "MIT",
      "dependencies": {
        "debug": "2.6.9",
        "encodeurl": "~2.0.0",
        "escape-html": "~1.0.3",
        "on-finished": "~2.4.1",
        "parseurl": "~1.3.3",
        "statuses": "~2.0.2",
        "unpipe": "~1.0.0"
      },
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/finalhandler/node_modules/debug": {
      "version": "2.6.9",
      "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
      "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
      "license": "MIT",
      "dependencies": {
        "ms": "2.0.0"
      }
    },
    "node_modules/finalhandler/node_modules/ms": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
      "integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A==",
      "license": "MIT"
    },
    "node_modules/forwarded": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/forwarded/-/forwarded-0.2.0.tgz",
      "integrity": "sha512-buRG0fpBtRHSTCOASe6hD258tEubFoRLb4ZNA6NxMVHNw2gOcwHo9wyablzMzOA5z9xA9L1KNjk/Nt6MT9aYow==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/fresh": {
      "version": "0.5.2",
      "resolved": "https://registry.npmjs.org/fresh/-/fresh-0.5.2.tgz",
      "integrity": "sha512-zJ2mQYM18rEFOudeV4GShTGIQ7RbzA7ozbU9I/XBpm7kqgMywgmylMwXHxZJmkVoYkna9d2pVXVXPdYTP9ej8Q==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/fsevents": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz",
      "integrity": "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
      }
    },
    "node_modules/function-bind": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.2.tgz",
      "integrity": "sha512-7XHNxH7qX9xG5mIwxkhumTox/MIRNcOgDrxWsMt2pAr23WHp6MrRlN7FBSFpCpr+oVO0F744iUgR82nJMfG2SA==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/get-caller-file": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/get-caller-file/-/get-caller-file-2.0.5.tgz",
      "integrity": "sha512-DyFP3BM/3YHTQOCUL/w0OZHR0lpKeGrxotcHWcqNEdnltqFwXVfhEBQ94eIo34AfQpo0rGki4cyIiftY06h2Fg==",
      "license": "ISC",
      "engines": {
        "node": "6.* || 8.* || >= 10.*"
      }
    },
    "node_modules/get-intrinsic": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/get-intrinsic/-/get-intrinsic-1.3.0.tgz",
      "integrity": "sha512-9fSjSaos/fRIVIp+xSJlE6lfwhES7LNtKaCBIamHsjr2na1BiABJPo0mOjjz8GJDURarmCPGqaiVg5mfjb98CQ==",
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.2",
        "es-define-property": "^1.0.1",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.1.1",
        "function-bind": "^1.1.2",
        "get-proto": "^1.0.1",
        "gopd": "^1.2.0",
        "has-symbols": "^1.1.0",
        "hasown": "^2.0.2",
        "math-intrinsics": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/get-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/get-proto/-/get-proto-1.0.1.tgz",
      "integrity": "sha512-sTSfBjoXBp89JvIKIefqw7U2CCebsc74kiY6awiGogKtoSGbgjYE/G/+l9sF3MWFPNc9IcoOC4ODfKHfxFmp0g==",
      "license": "MIT",
      "dependencies": {
        "dunder-proto": "^1.0.1",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/gopd": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/gopd/-/gopd-1.2.0.tgz",
      "integrity": "sha512-ZUKRh6/kUFoAiTAtTYPZJ3hw9wNxx+BIBOijnlG9PnrJsCcSjs1wyyD6vJpaYtgnzDrKYRSqf3OO6Rfa93xsRg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/has-symbols": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.1.0.tgz",
      "integrity": "sha512-1cDNdwJ2Jaohmb3sg4OmKaMBwuC48sYni5HUw2DvsC8LjGTLK9h+eb1X6RyuOHe4hT0ULCW68iomhjUoKUqlPQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/hasown": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/hasown/-/hasown-2.0.4.tgz",
      "integrity": "sha512-T2UbfbBEF32wiepXIsMlTW9+dDYC6wMh/t/vYA4tuOMKqWz/n3vr1NFSxQiyP+zk2mXsoMA/i/7qV6LKut1t1A==",
      "license": "MIT",
      "dependencies": {
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/helmet": {
      "version": "8.3.0",
      "resolved": "https://registry.npmjs.org/helmet/-/helmet-8.3.0.tgz",
      "integrity": "sha512-Qgpiaws3Sm30Av8Eah6sjMCZZwjlBu+E68rhpCWBshY1lb09HtLwj5GviX0OyQIn+ulUS0iX0AxN5n3tLZzz1w==",
      "license": "MIT",
      "engines": {
        "node": ">=18.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/EvanHahn"
      }
    },
    "node_modules/http-errors": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/http-errors/-/http-errors-2.0.1.tgz",
      "integrity": "sha512-4FbRdAX+bSdmo4AUFuS0WNiPz8NgFt+r8ThgNWmlrjQjt1Q7ZR9+zTlce2859x4KSXrwIsaeTqDoKQmtP8pLmQ==",
      "license": "MIT",
      "dependencies": {
        "depd": "~2.0.0",
        "inherits": "~2.0.4",
        "setprototypeof": "~1.2.0",
        "statuses": "~2.0.2",
        "toidentifier": "~1.0.1"
      },
      "engines": {
        "node": ">= 0.8"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/iconv-lite": {
      "version": "0.4.24",
      "resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.4.24.tgz",
      "integrity": "sha512-v3MXnZAcvnywkTUEZomIActle7RXXeedOR31wwl7VlyoXO4Qi9arvSenNQWne1TcRwhCL1HwLI21bEqdpj8/rA==",
      "license": "MIT",
      "dependencies": {
        "safer-buffer": ">= 2.1.2 < 3"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/inherits": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.4.tgz",
      "integrity": "sha512-k/vGaX4/Yla3WzyMCvTQOXYeIHvqOKtnqBduzTHpzpQZzAskKMhZ2K+EnBiSM9zGSoIFeMpXKxa4dYeZIQqewQ==",
      "license": "ISC"
    },
    "node_modules/ioredis": {
      "version": "5.11.1",
      "resolved": "https://registry.npmjs.org/ioredis/-/ioredis-5.11.1.tgz",
      "integrity": "sha512-ehuGcf94bQXhfagULNXrJdfnWO38v070jxSx/qE87Kjzmu2fU7ro5EFAb+OPituLqgfyuQaym5DlrNydW2sJ9A==",
      "license": "MIT",
      "dependencies": {
        "@ioredis/commands": "1.10.0",
        "cluster-key-slot": "1.1.1",
        "debug": "4.4.3",
        "denque": "2.1.0",
        "redis-errors": "1.2.0",
        "redis-parser": "3.0.0",
        "standard-as-callback": "2.1.0"
      },
      "engines": {
        "node": ">=12.22.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/ioredis"
      }
    },
    "node_modules/ioredis/node_modules/debug": {
      "version": "4.4.3",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.3.tgz",
      "integrity": "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA==",
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/ipaddr.js": {
      "version": "1.9.1",
      "resolved": "https://registry.npmjs.org/ipaddr.js/-/ipaddr.js-1.9.1.tgz",
      "integrity": "sha512-0KI/607xoxSToH7GjN1FfSbLoU0+btTicjsQSWQlh/hZykN8KpmMf7uYwPW3R+akZ6R/w18ZlXSHBYXiYUPO3g==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.10"
      }
    },
    "node_modules/jiti": {
      "version": "2.4.2",
      "resolved": "https://registry.npmjs.org/jiti/-/jiti-2.4.2.tgz",
      "integrity": "sha512-rg9zJN+G4n2nfJl5MW3BMygZX56zKPNVEYYqq7adpmMh4Jn2QNEwhvQlFy6jPVdcod7txZtKHWnyZiA3a0zP7A==",
      "devOptional": true,
      "license": "MIT",
      "bin": {
        "jiti": "lib/jiti-cli.mjs"
      }
    },
    "node_modules/jsonwebtoken": {
      "version": "9.0.3",
      "resolved": "https://registry.npmjs.org/jsonwebtoken/-/jsonwebtoken-9.0.3.tgz",
      "integrity": "sha512-MT/xP0CrubFRNLNKvxJ2BYfy53Zkm++5bX9dtuPbqAeQpTVe0MQTFhao8+Cp//EmJp244xt6Drw/GVEGCUj40g==",
      "license": "MIT",
      "dependencies": {
        "jws": "^4.0.1",
        "lodash.includes": "^4.3.0",
        "lodash.isboolean": "^3.0.3",
        "lodash.isinteger": "^4.0.4",
        "lodash.isnumber": "^3.0.3",
        "lodash.isplainobject": "^4.0.6",
        "lodash.isstring": "^4.0.1",
        "lodash.once": "^4.0.0",
        "ms": "^2.1.1",
        "semver": "^7.5.4"
      },
      "engines": {
        "node": ">=12",
        "npm": ">=6"
      }
    },
    "node_modules/jwa": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/jwa/-/jwa-2.0.1.tgz",
      "integrity": "sha512-hRF04fqJIP8Abbkq5NKGN0Bbr3JxlQ+qhZufXVr0DvujKy93ZCbXZMHDL4EOtodSbCWxOqR8MS1tXA5hwqCXDg==",
      "license": "MIT",
      "dependencies": {
        "buffer-equal-constant-time": "^1.0.1",
        "ecdsa-sig-formatter": "1.0.11",
        "safe-buffer": "^5.0.1"
      }
    },
    "node_modules/jws": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/jws/-/jws-4.0.1.tgz",
      "integrity": "sha512-EKI/M/yqPncGUUh44xz0PxSidXFr/+r0pA70+gIYhjv+et7yxM+s29Y+VGDkovRofQem0fs7Uvf4+YmAdyRduA==",
      "license": "MIT",
      "dependencies": {
        "jwa": "^2.0.1",
        "safe-buffer": "^5.0.1"
      }
    },
    "node_modules/lodash.includes": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/lodash.includes/-/lodash.includes-4.3.0.tgz",
      "integrity": "sha512-W3Bx6mdkRTGtlJISOvVD/lbqjTlPPUDTMnlXZFnVwi9NKJ6tiAk6LVdlhZMm17VZisqhKcgzpO5Wz91PCt5b0w==",
      "license": "MIT"
    },
    "node_modules/lodash.isboolean": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/lodash.isboolean/-/lodash.isboolean-3.0.3.tgz",
      "integrity": "sha512-Bz5mupy2SVbPHURB98VAcw+aHh4vRV5IPNhILUCsOzRmsTmSQ17jIuqopAentWoehktxGd9e/hbIXq980/1QJg==",
      "license": "MIT"
    },
    "node_modules/lodash.isinteger": {
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/lodash.isinteger/-/lodash.isinteger-4.0.4.tgz",
      "integrity": "sha512-DBwtEWN2caHQ9/imiNeEA5ys1JoRtRfY3d7V9wkqtbycnAmTvRRmbHKDV4a0EYc678/dia0jrte4tjYwVBaZUA==",
      "license": "MIT"
    },
    "node_modules/lodash.isnumber": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/lodash.isnumber/-/lodash.isnumber-3.0.3.tgz",
      "integrity": "sha512-QYqzpfwO3/CWf3XP+Z+tkQsfaLL/EnUlXWVkIk5FUPc4sBdTehEqZONuyRt2P67PXAk+NXmTBcc97zw9t1FQrw==",
      "license": "MIT"
    },
    "node_modules/lodash.isplainobject": {
      "version": "4.0.6",
      "resolved": "https://registry.npmjs.org/lodash.isplainobject/-/lodash.isplainobject-4.0.6.tgz",
      "integrity": "sha512-oSXzaWypCMHkPC3NvBEaPHf0KsA5mvPrOPgQWDsbg8n7orZ290M0BmC/jgRZ4vcJ6DTAhjrsSYgdsW/F+MFOBA==",
      "license": "MIT"
    },
    "node_modules/lodash.isstring": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/lodash.isstring/-/lodash.isstring-4.0.1.tgz",
      "integrity": "sha512-0wJxfxH1wgO3GrbuP+dTTk7op+6L41QCXbGINEmD+ny/G/eCqGzxyCsh7159S+mgDDcoarnBw6PC1PS5+wUGgw==",
      "license": "MIT"
    },
    "node_modules/lodash.once": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/lodash.once/-/lodash.once-4.1.1.tgz",
      "integrity": "sha512-Sb487aTOCr9drQVL8pIxOzVhafOjZN9UU54hiN8PU3uAiSV7lx1yYNpbNmex2PK6dSJoNTSJUUswT651yww3Mg==",
      "license": "MIT"
    },
    "node_modules/luxon": {
      "version": "3.7.2",
      "resolved": "https://registry.npmjs.org/luxon/-/luxon-3.7.2.tgz",
      "integrity": "sha512-vtEhXh/gNjI9Yg1u4jX/0YVPMvxzHuGgCm6tC5kZyb08yjGWGnqAjGJvcXbqQR2P3MyMEFnRbpcdFS6PBcLqew==",
      "license": "MIT",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/math-intrinsics": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/math-intrinsics/-/math-intrinsics-1.1.0.tgz",
      "integrity": "sha512-/IXtbwEk5HTPyEwyKX6hGkYXxM9nbj64B+ilVJnC/R6B0pH5G4V3b0pVbL7DBj4tkhBAppbQUlf6F6Xl9LHu1g==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/media-typer": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/media-typer/-/media-typer-0.3.0.tgz",
      "integrity": "sha512-dq+qelQ9akHpcOl/gUVRTxVIOkAJ1wR3QAvb4RsVjS8oVoFjDGTc679wJYmUmknUF5HwMLOgb5O+a3KxfWapPQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/merge-descriptors": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/merge-descriptors/-/merge-descriptors-1.0.3.tgz",
      "integrity": "sha512-gaNvAS7TZ897/rVaZ0nMtAyxNyi/pdbjbAwUpFQpN70GqnVfOiXpeUUMKRBmzXaSQ8DdTX4/0ms62r2K+hE6mQ==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/methods": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/methods/-/methods-1.1.2.tgz",
      "integrity": "sha512-iclAHeNqNm68zFtnZ0e+1L2yUIdvzNoauKU4WBA3VvH/vPFieF7qfRlwUZU+DA9P9bPXIS90ulxoUoCH23sV2w==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/mime": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/mime/-/mime-1.6.0.tgz",
      "integrity": "sha512-x0Vn8spI+wuJ1O6S7gnbaQg8Pxh4NNHb7KSINmEWKiPE4RKOplvijn+NkmYmmRgP68mc70j2EbeTFRsrswaQeg==",
      "license": "MIT",
      "bin": {
        "mime": "cli.js"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/mime-db": {
      "version": "1.52.0",
      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.52.0.tgz",
      "integrity": "sha512-sPU4uV7dYlvtWJxwwxHD0PuihVNiE7TyAbQ5SWxDCB9mUYvOgroQOwYQQOKPJ8CIbE+1ETVlOoK1UC2nU3gYvg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/mime-types": {
      "version": "2.1.35",
      "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-2.1.35.tgz",
      "integrity": "sha512-ZDY+bPm5zTTF+YpCrAU9nK0UgICYPT0QtT1NZWFv4s++TNkcgVaT0g6+4R2uI4MjQjzysHB1zxuWL50hzaeXiw==",
      "license": "MIT",
      "dependencies": {
        "mime-db": "1.52.0"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
      "license": "MIT"
    },
    "node_modules/msgpackr": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/msgpackr/-/msgpackr-2.0.5.tgz",
      "integrity": "sha512-cef05H/dSYpLpqp3sj/qyZh5vhUYCalnaLO7j1yOmpsR0y/XwLVtK7r5gn+U/F7CTEfMowcGhlUQJDLcLf7jcA==",
      "license": "MIT",
      "optionalDependencies": {
        "msgpackr-extract": "^3.0.4"
      }
    },
    "node_modules/msgpackr-extract": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/msgpackr-extract/-/msgpackr-extract-3.0.4.tgz",
      "integrity": "sha512-4kmO/MdyUIkLIvTPr8VHLil4AtoKIoniWPIEk5+CDy0xnWC84azhSFmuJ7PxZdsYtiP5kEeQsORAVIeMgxT+Hw==",
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "node-gyp-build-optional-packages": "5.2.2"
      },
      "bin": {
        "download-msgpackr-prebuilds": "bin/download-prebuilds.js"
      },
      "optionalDependencies": {
        "@msgpackr-extract/msgpackr-extract-darwin-arm64": "3.0.4",
        "@msgpackr-extract/msgpackr-extract-darwin-x64": "3.0.4",
        "@msgpackr-extract/msgpackr-extract-linux-arm": "3.0.4",
        "@msgpackr-extract/msgpackr-extract-linux-arm64": "3.0.4",
        "@msgpackr-extract/msgpackr-extract-linux-x64": "3.0.4",
        "@msgpackr-extract/msgpackr-extract-win32-x64": "3.0.4"
      }
    },
    "node_modules/negotiator": {
      "version": "0.6.3",
      "resolved": "https://registry.npmjs.org/negotiator/-/negotiator-0.6.3.tgz",
      "integrity": "sha512-+EUsqGPLsM+j/zdChZjsnX51g4XrHFOIXwfnCVPGlQk/k5giakcKsuxCObBRu6DSm9opw/O6slWbJdghQM4bBg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/node-abort-controller": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/node-abort-controller/-/node-abort-controller-3.1.1.tgz",
      "integrity": "sha512-AGK2yQKIjRuqnc6VkX2Xj5d+QW8xZ87pa1UK6yA6ouUyuxfHuMP6umE5QK7UmTeOAymo+Zx1Fxiuw9rVx8taHQ==",
      "license": "MIT"
    },
    "node_modules/node-addon-api": {
      "version": "8.9.2",
      "resolved": "https://registry.npmjs.org/node-addon-api/-/node-addon-api-8.9.2.tgz",
      "integrity": "sha512-VijLXbi3UACN69I0JVXJsX4tjACjNoQDgv2gTF6sx2wWEi8tkSg2eX8p5gSIFi8z2+DL3oHmY6OyKce38SDolg==",
      "license": "MIT",
      "engines": {
        "node": "^18 || ^20 || >= 21"
      }
    },
    "node_modules/node-gyp-build": {
      "version": "4.8.4",
      "resolved": "https://registry.npmjs.org/node-gyp-build/-/node-gyp-build-4.8.4.tgz",
      "integrity": "sha512-LA4ZjwlnUblHVgq0oBF3Jl/6h/Nvs5fzBLwdEF4nuxnFdsfajde4WfxtJr3CaiH+F6ewcIB/q4jQ4UzPyid+CQ==",
      "license": "MIT",
      "bin": {
        "node-gyp-build": "bin.js",
        "node-gyp-build-optional": "optional.js",
        "node-gyp-build-test": "build-test.js"
      }
    },
    "node_modules/node-gyp-build-optional-packages": {
      "version": "5.2.2",
      "resolved": "https://registry.npmjs.org/node-gyp-build-optional-packages/-/node-gyp-build-optional-packages-5.2.2.tgz",
      "integrity": "sha512-s+w+rBWnpTMwSFbaE0UXsRlg7hU4FjekKU4eyAih5T8nJuNZT1nNsskXpxmeqSK9UzkBl6UgRlnKc8hz8IEqOw==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "detect-libc": "^2.0.1"
      },
      "bin": {
        "node-gyp-build-optional-packages": "bin.js",
        "node-gyp-build-optional-packages-optional": "optional.js",
        "node-gyp-build-optional-packages-test": "build-test.js"
      }
    },
    "node_modules/nodemailer": {
      "version": "10.0.11",
      "resolved": "https://registry.npmjs.org/nodemailer/-/nodemailer-10.0.11.tgz",
      "integrity": "sha512-/c4P7U7aGpiNu2Rl08q525q2zECkUpSaf2zQPgIStCcAjHAkkQQKwD4sTyi3l91mGcLQrKzL1syXPHymo+Ogtw==",
      "license": "MIT-0",
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/notepack.io": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/notepack.io/-/notepack.io-3.0.1.tgz",
      "integrity": "sha512-TKC/8zH5pXIAMVQio2TvVDTtPRX+DJPHDqjRbxogtFiByHyzKmy96RA0JtCQJ+WouyyL4A10xomQzgbUT+1jCg==",
      "license": "MIT"
    },
    "node_modules/object-assign": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",
      "integrity": "sha512-rJgTQnkUnH1sFw8yT6VSU3zD3sWmu6sZhIseY8VX+GRu3P6F7Fu+JNDoXfklElbLJSnc3FUQHVe4cU5hj+BcUg==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/object-inspect": {
      "version": "1.13.4",
      "resolved": "https://registry.npmjs.org/object-inspect/-/object-inspect-1.13.4.tgz",
      "integrity": "sha512-W67iLl4J2EXEGTbfeHCffrjDfitvLANg0UlX3wFUUSTx92KXRFegMHUVgSqE+wvhAbi4WqjGg9czysTV2Epbew==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/on-exit-leak-free": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/on-exit-leak-free/-/on-exit-leak-free-2.1.2.tgz",
      "integrity": "sha512-0eJJY6hXLGf1udHwfNftBqH+g73EU4B504nZeKpz1sYRKafAghwxEJunB2O7rDZkL4PGfsMVnTXZ2EjibbqcsA==",
      "license": "MIT",
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/on-finished": {
      "version": "2.4.1",
      "resolved": "https://registry.npmjs.org/on-finished/-/on-finished-2.4.1.tgz",
      "integrity": "sha512-oVlzkg3ENAhCk2zdv7IJwd/QUD4z2RxRwpkcGY8psCVcCYZNq4wYnVWALHM+brtuJjePWiYF/ClmuDr8Ch5+kg==",
      "license": "MIT",
      "dependencies": {
        "ee-first": "1.1.1"
      },
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/otpauth": {
      "version": "9.5.2",
      "resolved": "https://registry.npmjs.org/otpauth/-/otpauth-9.5.2.tgz",
      "integrity": "sha512-GQ5emWR/x1tcExT62IBT0UfO95wZzJZyxYOJOGVeQF47SYEN9vmh0vISvDZaNMuFJRG+IaWCKtfm+t9Bfoal6w==",
      "license": "MIT",
      "dependencies": {
        "@noble/hashes": "2.4.0"
      },
      "funding": {
        "url": "https://github.com/hectorm/otpauth?sponsor=1"
      }
    },
    "node_modules/parseurl": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/parseurl/-/parseurl-1.3.3.tgz",
      "integrity": "sha512-CiyeOxFT/JZyN5m0z9PfXw4SCBJ6Sygz1Dpl0wqjlhDEGGBP1GnsUVEL0p63hoG1fcj3fHynXi9NYO4nWOL+qQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/path-to-regexp": {
      "version": "0.1.13",
      "resolved": "https://registry.npmjs.org/path-to-regexp/-/path-to-regexp-0.1.13.tgz",
      "integrity": "sha512-A/AGNMFN3c8bOlvV9RreMdrv7jsmF9XIfDeCd87+I8RNg6s78BhJxMu69NEMHBSJFxKidViTEdruRwEk/WIKqA==",
      "license": "MIT"
    },
    "node_modules/pino": {
      "version": "9.14.0",
      "resolved": "https://registry.npmjs.org/pino/-/pino-9.14.0.tgz",
      "integrity": "sha512-8OEwKp5juEvb/MjpIc4hjqfgCNysrS94RIOMXYvpYCdm/jglrKEiAYmiumbmGhCvs+IcInsphYDFwqrjr7398w==",
      "license": "MIT",
      "dependencies": {
        "@pinojs/redact": "^0.4.0",
        "atomic-sleep": "^1.0.0",
        "on-exit-leak-free": "^2.1.0",
        "pino-abstract-transport": "^2.0.0",
        "pino-std-serializers": "^7.0.0",
        "process-warning": "^5.0.0",
        "quick-format-unescaped": "^4.0.3",
        "real-require": "^0.2.0",
        "safe-stable-stringify": "^2.3.1",
        "sonic-boom": "^4.0.1",
        "thread-stream": "^3.0.0"
      },
      "bin": {
        "pino": "bin.js"
      }
    },
    "node_modules/pino-abstract-transport": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/pino-abstract-transport/-/pino-abstract-transport-2.0.0.tgz",
      "integrity": "sha512-F63x5tizV6WCh4R6RHyi2Ml+M70DNRXt/+HANowMflpgGFMAym/VKm6G7ZOQRjqN7XbGxK1Lg9t6ZrtzOaivMw==",
      "license": "MIT",
      "dependencies": {
        "split2": "^4.0.0"
      }
    },
    "node_modules/pino-http": {
      "version": "10.5.0",
      "resolved": "https://registry.npmjs.org/pino-http/-/pino-http-10.5.0.tgz",
      "integrity": "sha512-hD91XjgaKkSsdn8P7LaebrNzhGTdB086W3pyPihX0EzGPjq5uBJBXo4N5guqNaK6mUjg9aubMF7wDViYek9dRA==",
      "license": "MIT",
      "dependencies": {
        "get-caller-file": "^2.0.5",
        "pino": "^9.0.0",
        "pino-std-serializers": "^7.0.0",
        "process-warning": "^5.0.0"
      }
    },
    "node_modules/pino-std-serializers": {
      "version": "7.1.0",
      "resolved": "https://registry.npmjs.org/pino-std-serializers/-/pino-std-serializers-7.1.0.tgz",
      "integrity": "sha512-BndPH67/JxGExRgiX1dX0w1FvZck5Wa4aal9198SrRhZjH3GxKQUKIBnYJTdj2HDN3UQAS06HlfcSbQj2OHmaw==",
      "license": "MIT"
    },
    "node_modules/postal-mime": {
      "version": "2.7.6",
      "resolved": "https://registry.npmjs.org/postal-mime/-/postal-mime-2.7.6.tgz",
      "integrity": "sha512-UUlyE2KlxmvwMGq060onF/VWU3zD6dVW31FwokQ5v26jWd35fbs2MoTFzh+jXnPwAyV2MULMKXcBInGOl5TO6Q==",
      "license": "MIT-0"
    },
    "node_modules/prisma": {
      "version": "6.12.0",
      "resolved": "https://registry.npmjs.org/prisma/-/prisma-6.12.0.tgz",
      "integrity": "sha512-pmV7NEqQej9WjizN6RSNIwf7Y+jeh9mY1JEX2WjGxJi4YZWexClhde1yz/FuvAM+cTwzchcMytu2m4I6wPkIzg==",
      "devOptional": true,
      "hasInstallScript": true,
      "license": "Apache-2.0",
      "peer": true,
      "dependencies": {
        "@prisma/config": "6.12.0",
        "@prisma/engines": "6.12.0"
      },
      "bin": {
        "prisma": "build/index.js"
      },
      "engines": {
        "node": ">=18.18"
      },
      "peerDependencies": {
        "typescript": ">=5.1.0"
      },
      "peerDependenciesMeta": {
        "typescript": {
          "optional": true
        }
      }
    },
    "node_modules/process-warning": {
      "version": "5.1.0",
      "resolved": "https://registry.npmjs.org/process-warning/-/process-warning-5.1.0.tgz",
      "integrity": "sha512-jQSaVHsPgtyw60e1rQ/A+/ArPEj/S8pS/vFnyGa/gYFXrKk/6RuDkoqVDQ5NI5MmS01698ltlAk0NoDBNLujRw==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/fastify"
        },
        {
          "type": "opencollective",
          "url": "https://opencollective.com/fastify"
        }
      ],
      "license": "MIT"
    },
    "node_modules/proxy-addr": {
      "version": "2.0.8",
      "resolved": "https://registry.npmjs.org/proxy-addr/-/proxy-addr-2.0.8.tgz",
      "integrity": "sha512-5nnx0yGyVUcY6t9RnWcARWtwT9F1D8O9rt08htPvnd49W1IgZtmLkhu9WfMzQj1cFxjHIO6connUNVW5k7AVyQ==",
      "license": "MIT",
      "dependencies": {
        "forwarded": "0.2.0",
        "ipaddr.js": "1.9.1"
      },
      "engines": {
        "node": ">= 0.10"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/qs": {
      "version": "6.16.0",
      "resolved": "https://registry.npmjs.org/qs/-/qs-6.16.0.tgz",
      "integrity": "sha512-h6fhOIaRrID2CbEY2fqs+7t+UXZo+MLAnU5gRIq85uFtdiUPCdsApMlHhXogKVM4HM2DVbIjGNTTYH2OcmP1vA==",
      "license": "BSD-3-Clause",
      "dependencies": {
        "es-define-property": "^1.0.1",
        "side-channel": "^1.1.1"
      },
      "engines": {
        "node": ">=0.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/quick-format-unescaped": {
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/quick-format-unescaped/-/quick-format-unescaped-4.0.4.tgz",
      "integrity": "sha512-tYC1Q1hgyRuHgloV/YXs2w15unPVh8qfu/qCTfhTYamaw7fyhumKa2yGpdSo87vY32rIclj+4fWYQXUMs9EHvg==",
      "license": "MIT"
    },
    "node_modules/range-parser": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/range-parser/-/range-parser-1.2.1.tgz",
      "integrity": "sha512-Hrgsx+orqoygnmhFbKaHE6c296J+HTAQXoxEF6gNupROmmGJRoyzfG3ccAveqCBrwr/2yxQ5BVd/GTl5agOwSg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/raw-body": {
      "version": "2.5.3",
      "resolved": "https://registry.npmjs.org/raw-body/-/raw-body-2.5.3.tgz",
      "integrity": "sha512-s4VSOf6yN0rvbRZGxs8Om5CWj6seneMwK3oDb4lWDH0UPhWcxwOWw5+qk24bxq87szX1ydrwylIOp2uG1ojUpA==",
      "license": "MIT",
      "dependencies": {
        "bytes": "~3.1.2",
        "http-errors": "~2.0.1",
        "iconv-lite": "~0.4.24",
        "unpipe": "~1.0.0"
      },
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/real-require": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/real-require/-/real-require-0.2.0.tgz",
      "integrity": "sha512-57frrGM/OCTLqLOAh0mhVA9VBMHd+9U7Zb2THMGdBUoZVOtGbJzjxsYGDJ3A9AYYCP4hn6y1TVbaOfzWtm5GFg==",
      "license": "MIT",
      "engines": {
        "node": ">= 12.13.0"
      }
    },
    "node_modules/redis-errors": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/redis-errors/-/redis-errors-1.2.0.tgz",
      "integrity": "sha512-1qny3OExCf0UvUV/5wpYKf2YwPcOqXzkwKKSmKHiE6ZMQs5heeE/c8eXK+PNllPvmjgAbfnsbpkGZWy8cBpn9w==",
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/redis-parser": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/redis-parser/-/redis-parser-3.0.0.tgz",
      "integrity": "sha512-DJnGAeenTdpMEH6uAJRK/uiyEIH9WVsUmoLwzudwGJUwZPp80PDBWPHXSAGNPwNvIXAbe7MSUB1zQFugFml66A==",
      "license": "MIT",
      "dependencies": {
        "redis-errors": "^1.0.0"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/redlock": {
      "version": "5.0.0-beta.2",
      "resolved": "https://registry.npmjs.org/redlock/-/redlock-5.0.0-beta.2.tgz",
      "integrity": "sha512-2RDWXg5jgRptDrB1w9O/JgSZC0j7y4SlaXnor93H/UJm/QyDiFgBKNtrh0TI6oCXqYSaSoXxFh6Sd3VtYfhRXw==",
      "license": "MIT",
      "dependencies": {
        "node-abort-controller": "^3.0.1"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/resend": {
      "version": "6.30.0",
      "resolved": "https://registry.npmjs.org/resend/-/resend-6.30.0.tgz",
      "integrity": "sha512-rED9rVw8N6cUvjmpYQwfZKBzd/cgWT+jURekVxtjFV2+YyK2/Tu2JOnE68sgqXlMBSYRoWgI6R0xlx3ANc/xeA==",
      "license": "MIT",
      "dependencies": {
        "postal-mime": "2.7.6",
        "standardwebhooks": "1.1.1"
      },
      "engines": {
        "node": ">=20"
      },
      "peerDependencies": {
        "@react-email/render": "*"
      },
      "peerDependenciesMeta": {
        "@react-email/render": {
          "optional": true
        }
      }
    },
    "node_modules/safe-buffer": {
      "version": "5.2.1",
      "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.2.1.tgz",
      "integrity": "sha512-rp3So07KcdmmKbGvgaNxQSJr7bGVSVk5S9Eq1F+ppbRo70+YeaDxkw5Dd8NPN+GD6bjnYm2VuPuCXmpuYvmCXQ==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT"
    },
    "node_modules/safe-stable-stringify": {
      "version": "2.5.0",
      "resolved": "https://registry.npmjs.org/safe-stable-stringify/-/safe-stable-stringify-2.5.0.tgz",
      "integrity": "sha512-b3rppTKm9T+PsVCBEOUR46GWI7fdOs00VKZ1+9c1EWDaDMvjQc6tUwuFyIprgGgTcWoVHSKrU8H31ZHA2e0RHA==",
      "license": "MIT",
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/safer-buffer": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/safer-buffer/-/safer-buffer-2.1.2.tgz",
      "integrity": "sha512-YZo3K82SD7Riyi0E1EQPojLz7kpepnSQI9IyPbHHg1XXXevb5dJI7tpyN2ADxGcQbHG7vcyRHk0cbwqcQriUtg==",
      "license": "MIT"
    },
    "node_modules/semver": {
      "version": "7.8.5",
      "resolved": "https://registry.npmjs.org/semver/-/semver-7.8.5.tgz",
      "integrity": "sha512-Y7/KDsb8LjooZpwaqGyulO6DQlksgCncchHGk+sZIY4SBvUocMBEFH5Ur1fI4dV+Jvl0w6cjvucaIi40puRioA==",
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/send": {
      "version": "0.19.2",
      "resolved": "https://registry.npmjs.org/send/-/send-0.19.2.tgz",
      "integrity": "sha512-VMbMxbDeehAxpOtWJXlcUS5E8iXh6QmN+BkRX1GARS3wRaXEEgzCcB10gTQazO42tpNIya8xIyNx8fll1OFPrg==",
      "license": "MIT",
      "dependencies": {
        "debug": "2.6.9",
        "depd": "2.0.0",
        "destroy": "1.2.0",
        "encodeurl": "~2.0.0",
        "escape-html": "~1.0.3",
        "etag": "~1.8.1",
        "fresh": "~0.5.2",
        "http-errors": "~2.0.1",
        "mime": "1.6.0",
        "ms": "2.1.3",
        "on-finished": "~2.4.1",
        "range-parser": "~1.2.1",
        "statuses": "~2.0.2"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/send/node_modules/debug": {
      "version": "2.6.9",
      "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
      "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
      "license": "MIT",
      "dependencies": {
        "ms": "2.0.0"
      }
    },
    "node_modules/send/node_modules/debug/node_modules/ms": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
      "integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A==",
      "license": "MIT"
    },
    "node_modules/serve-static": {
      "version": "1.16.3",
      "resolved": "https://registry.npmjs.org/serve-static/-/serve-static-1.16.3.tgz",
      "integrity": "sha512-x0RTqQel6g5SY7Lg6ZreMmsOzncHFU7nhnRWkKgWuMTu5NN0DR5oruckMqRvacAN9d5w6ARnRBXl9xhDCgfMeA==",
      "license": "MIT",
      "dependencies": {
        "encodeurl": "~2.0.0",
        "escape-html": "~1.0.3",
        "parseurl": "~1.3.3",
        "send": "~0.19.1"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/setprototypeof": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/setprototypeof/-/setprototypeof-1.2.0.tgz",
      "integrity": "sha512-E5LDX7Wrp85Kil5bhZv46j8jOeboKq5JMmYM3gVGdGH8xFpPWXUMsNrlODCrkoxMEeNi/XZIwuRvY4XNwYMJpw==",
      "license": "ISC"
    },
    "node_modules/side-channel": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/side-channel/-/side-channel-1.1.1.tgz",
      "integrity": "sha512-6x6dK6zJdpTzF4sQeNYxwtvBzf6Eg4GtlesS94HOvTudUeyK2WXAaIfmDgsyslYrRBeFIlsi54AYsFGUuhmvrQ==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "object-inspect": "^1.13.4",
        "side-channel-list": "^1.0.1",
        "side-channel-map": "^1.0.1",
        "side-channel-weakmap": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-list": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/side-channel-list/-/side-channel-list-1.0.1.tgz",
      "integrity": "sha512-mjn/0bi/oUURjc5Xl7IaWi/OJJJumuoJFQJfDDyO46+hBWsfaVM65TBHq2eoZBhzl9EchxOijpkbRC8SVBQU0w==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "object-inspect": "^1.13.4"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-map": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/side-channel-map/-/side-channel-map-1.0.1.tgz",
      "integrity": "sha512-VCjCNfgMsby3tTdo02nbjtM/ewra6jPHmpThenkTYh8pG9ucZ/1P8So4u4FGBek/BjpOVsDCMoLA/iuBKIFXRA==",
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.5",
        "object-inspect": "^1.13.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-weakmap": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/side-channel-weakmap/-/side-channel-weakmap-1.0.2.tgz",
      "integrity": "sha512-WPS/HvHQTYnHisLo9McqBHOJk2FkHO/tlpvldyrnem4aeQp4hai3gythswg6p01oSoTl58rcpiFAjF2br2Ak2A==",
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.5",
        "object-inspect": "^1.13.3",
        "side-channel-map": "^1.0.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/socket.io": {
      "version": "4.8.4",
      "resolved": "https://registry.npmjs.org/socket.io/-/socket.io-4.8.4.tgz",
      "integrity": "sha512-9ZV9zg8vN8hO3Y25DhR7nUkJ1VDnBhq5O/JrXhFT9s6+F0gqytSASTHVfCFc2mJXaTfARroErplXlzFWwETZqQ==",
      "license": "MIT",
      "dependencies": {
        "accepts": "~1.3.4",
        "cors": "~2.8.5",
        "debug": "~4.4.1",
        "engine.io": "~6.6.0",
        "socket.io-adapter": "~2.5.2",
        "socket.io-parser": "~4.2.4"
      },
      "engines": {
        "node": ">=10.2.0"
      }
    },
    "node_modules/socket.io-adapter": {
      "version": "2.5.8",
      "resolved": "https://registry.npmjs.org/socket.io-adapter/-/socket.io-adapter-2.5.8.tgz",
      "integrity": "sha512-6Oy52pbg+kvdCVvjcN+FnY7BvxZ7cIHNScbvztT/It5d0vbwoJoVZmF2gjJmnV0/4WlXRfG15zc45ySk9Ah8bw==",
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "debug": "~4.4.1",
        "ws": "~8.21.0"
      }
    },
    "node_modules/socket.io-adapter/node_modules/debug": {
      "version": "4.4.3",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.3.tgz",
      "integrity": "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA==",
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/socket.io-parser": {
      "version": "4.2.7",
      "resolved": "https://registry.npmjs.org/socket.io-parser/-/socket.io-parser-4.2.7.tgz",
      "integrity": "sha512-IH/iSeO9T6gz1KkFleGDWkG9N3dl4jXVYUtMhIqH10Md0ttMer8nUNWiP1DKuNrybD2xBrixLJdCC9J6ECoYkg==",
      "license": "MIT",
      "dependencies": {
        "@socket.io/component-emitter": "~3.1.0",
        "debug": "~4.4.1"
      },
      "engines": {
        "node": ">=10.0.0"
      }
    },
    "node_modules/socket.io-parser/node_modules/debug": {
      "version": "4.4.3",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.3.tgz",
      "integrity": "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA==",
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/socket.io/node_modules/debug": {
      "version": "4.4.3",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.3.tgz",
      "integrity": "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA==",
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/sonic-boom": {
      "version": "4.2.1",
      "resolved": "https://registry.npmjs.org/sonic-boom/-/sonic-boom-4.2.1.tgz",
      "integrity": "sha512-w6AxtubXa2wTXAUsZMMWERrsIRAdrK0Sc+FUytWvYAhBJLyuI4llrMIC1DtlNSdI99EI86KZum2MMq3EAZlF9Q==",
      "license": "MIT",
      "dependencies": {
        "atomic-sleep": "^1.0.0"
      }
    },
    "node_modules/split2": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/split2/-/split2-4.2.0.tgz",
      "integrity": "sha512-UcjcJOWknrNkF6PLX83qcHM6KHgVKNkV62Y8a5uYDVv9ydGQVwAHMKqHdJje1VTWpljG0WYpCDhrCdAOYH4TWg==",
      "license": "ISC",
      "engines": {
        "node": ">= 10.x"
      }
    },
    "node_modules/standard-as-callback": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/standard-as-callback/-/standard-as-callback-2.1.0.tgz",
      "integrity": "sha512-qoRRSyROncaz1z0mvYqIE4lCd9p2R90i6GxW3uZv5ucSu8tU7B5HXUP1gG8pVZsYNVaXjk8ClXHPttLyxAL48A==",
      "license": "MIT"
    },
    "node_modules/standardwebhooks": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/standardwebhooks/-/standardwebhooks-1.1.1.tgz",
      "integrity": "sha512-bCbX9ZEyFkWPsRz7Bl3NuQUJohmwGSev/yhr7vhaGPlc4AfIrspIRa6cPTBuI1ItmrTDJ4d/S2hCsfe4+vQGnQ==",
      "license": "MIT",
      "dependencies": {
        "@stablelib/base64": "^1.0.0",
        "fast-sha256": "^1.3.0"
      }
    },
    "node_modules/statuses": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/statuses/-/statuses-2.0.2.tgz",
      "integrity": "sha512-DvEy55V3DB7uknRo+4iOGT5fP1slR8wQohVdknigZPMpMstaKJQWhwiYBACJE3Ul2pTnATihhBYnRhZQHGBiRw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/thread-stream": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/thread-stream/-/thread-stream-3.2.0.tgz",
      "integrity": "sha512-zLBvqpwr4Esa0kRjcrzGU6zL25lePWaCLMx0RQFrmteozIfeNdaMLpG5U7PeHzvlFkAWaRKA9/KVW4F60iB+qw==",
      "license": "MIT",
      "dependencies": {
        "real-require": "^0.2.0"
      }
    },
    "node_modules/toidentifier": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/toidentifier/-/toidentifier-1.0.1.tgz",
      "integrity": "sha512-o5sSPKEkg/DIQNmH43V0/uerLrpzVedkUh8tGNvaeXpfpuwjKenlSox/2O/BTlZUtEe+JG7s5YhEz608PlAHRA==",
      "license": "MIT",
      "engines": {
        "node": ">=0.6"
      }
    },
    "node_modules/tslib": {
      "version": "2.8.1",
      "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.8.1.tgz",
      "integrity": "sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w==",
      "license": "0BSD"
    },
    "node_modules/tsx": {
      "version": "4.23.15",
      "resolved": "https://registry.npmjs.org/tsx/-/tsx-4.23.15.tgz",
      "integrity": "sha512-Yiex1Ovn8z2xPpOWckIiysV1SSyRMY9BkLF++q0yKiDxCqRhosKfMg3janKkiLBwZ5c/YryloKwGZcrEmtwxKw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "esbuild": "~0.28.0"
      },
      "bin": {
        "tsx": "dist/cli.mjs"
      },
      "engines": {
        "node": ">=18.0.0"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.3"
      }
    },
    "node_modules/type-is": {
      "version": "1.6.18",
      "resolved": "https://registry.npmjs.org/type-is/-/type-is-1.6.18.tgz",
      "integrity": "sha512-TkRKr9sUTxEH8MdfuCSP7VizJyzRNMjj2J2do2Jr3Kym598JVdEksuzPQCnlFPW4ky9Q+iA+ma9BGm06XQBy8g==",
      "license": "MIT",
      "dependencies": {
        "media-typer": "0.3.0",
        "mime-types": "~2.1.24"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/typescript": {
      "version": "5.9.3",
      "resolved": "https://registry.npmjs.org/typescript/-/typescript-5.9.3.tgz",
      "integrity": "sha512-jl1vZzPDinLr9eUt3J/t7V6FgNEw9QjvBPdysz9KfQDD41fQrC2Y4vKQdiaUpFT4bXlb1RHhLpp8wtm6M5TgSw==",
      "devOptional": true,
      "license": "Apache-2.0",
      "peer": true,
      "bin": {
        "tsc": "bin/tsc",
        "tsserver": "bin/tsserver"
      },
      "engines": {
        "node": ">=14.17"
      }
    },
    "node_modules/uid2": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/uid2/-/uid2-1.0.0.tgz",
      "integrity": "sha512-+I6aJUv63YAcY9n4mQreLUt0d4lvwkkopDNmpomkAUz0fAkEMV9pRWxN0EjhW1YfRhcuyHg2v3mwddCDW1+LFQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 4.0.0"
      }
    },
    "node_modules/undici-types": {
      "version": "7.24.6",
      "resolved": "https://registry.npmjs.org/undici-types/-/undici-types-7.24.6.tgz",
      "integrity": "sha512-WRNW+sJgj5OBN4/0JpHFqtqzhpbnV0GuB+OozA9gCL7a993SmU+1JBZCzLNxYsbMfIeDL+lTsphD5jN5N+n0zg==",
      "license": "MIT"
    },
    "node_modules/unpipe": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/unpipe/-/unpipe-1.0.0.tgz",
      "integrity": "sha512-pjy2bYhSsufwWlKwPc+l3cN7+wuJlK6uz0YdJEOlQDbl6jo/YlPi4mb8agUkVC8BF7V8NuzeyPNqRksA3hztKQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/utils-merge": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/utils-merge/-/utils-merge-1.0.1.tgz",
      "integrity": "sha512-pMZTvIkT1d+TFGvDOqodOclx0QWkkgi6Tdoa8gC8ffGAAqz9pzPTZWAybbsHHoED/ztMtkv/VoYTYyShUn81hA==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4.0"
      }
    },
    "node_modules/uuid": {
      "version": "11.1.1",
      "resolved": "https://registry.npmjs.org/uuid/-/uuid-11.1.1.tgz",
      "integrity": "sha512-vIYxrBCC/N/K+Js3qSN88go7kIfNPssr/hHCesKCQNAjmgvYS2oqr69kIufEG+O4+PfezOH4EbIeHCfFov8ZgQ==",
      "funding": [
        "https://github.com/sponsors/broofa",
        "https://github.com/sponsors/ctavan"
      ],
      "license": "MIT",
      "bin": {
        "uuid": "dist/esm/bin/uuid"
      }
    },
    "node_modules/vary": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/vary/-/vary-1.1.2.tgz",
      "integrity": "sha512-BNGbWLfd0eUPabhkXUVm0j8uuvREyTh5ovRa/dyow/BqAbZJyC+5fU+IzQOzmAKzYqYRAISoRhdQr3eIZ/PXqg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/ws": {
      "version": "8.21.3",
      "resolved": "https://registry.npmjs.org/ws/-/ws-8.21.3.tgz",
      "integrity": "sha512-201TZ/kPWxoPr/OKWjquZR1SWKXcvxdH+e1xrx89b3YbmzLMFCLfnaG1HFIgWzJOEWZ7MvpK++odZufgYR50Rw==",
      "license": "MIT",
      "engines": {
        "node": ">=10.0.0"
      },
      "peerDependencies": {
        "bufferutil": "^4.0.1",
        "utf-8-validate": ">=5.0.2"
      },
      "peerDependenciesMeta": {
        "bufferutil": {
          "optional": true
        },
        "utf-8-validate": {
          "optional": true
        }
      }
    },
    "node_modules/zod": {
      "version": "3.25.76",
      "resolved": "https://registry.npmjs.org/zod/-/zod-3.25.76.tgz",
      "integrity": "sha512-gzUt/qt81nXsFGKIFcC3YnfEAx5NkunCfnDlvuBSSFS02bcXu4Lmea0AFIUwbLWxWPx3d9p8S5QoaujKcNQxcQ==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/colinhacks"
      }
    }
  }
}

```

# package.json

| Property | Value |
|----------|-------|
| Path | `package.json` |
| Size | 1,483 bytes |
| Extension | `.json` |
| Modified | 2026-09-28 23:31:07.386965 |

```json
{
  "name": "node-ecommerce-backend",
  "version": "1.0.0",
  "description": "E-commerce Backend with Node.js, Express, TypeScript, and Prisma",
  "main": "dist/server.js",
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev"
  },
  "dependencies": {
    "@aws-sdk/client-s3": "^3.873.0",
    "@aws-sdk/s3-request-presigner": "^3.873.0",
    "@prisma/client": "^6.14.0",
    "@socket.io/redis-adapter": "^8.3.0",
    "bcrypt": "^6.0.0",
    "bullmq": "^5.58.0",
    "cors": "^2.8.5",
    "date-fns": "^4.1.0",
    "dotenv": "^17.2.1",
    "express": "^4.21.2",
    "express-rate-limit": "^7.5.0",
    "helmet": "^8.1.0",
    "ioredis": "^5.7.0",
    "jsonwebtoken": "^9.0.2",
    "ms": "^2.1.3",
    "nodemailer": "^10.0.11",
    "otpauth": "^9.4.1",
    "pino": "^9.6.0",
    "pino-http": "^10.4.0",
    "redlock": "^5.0.0-beta.2",
    "resend": "^6.0.1",
    "socket.io": "^4.8.1",
    "uuid": "^11.1.0",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@types/bcrypt": "^6.0.0",
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "@types/jsonwebtoken": "^9.0.8",
    "@types/ms": "^2.1.0",
    "@types/node": "^24.3.0",
    "@types/nodemailer": "^8.0.2",
    "@types/uuid": "^10.0.0",
    "prisma": "^6.12.0",
    "tsx": "^4.19.3",
    "typescript": "^5.9.2"
  }
}

```

# prisma\migrations\20260926094016_init\migration.sql

| Property | Value |
|----------|-------|
| Path | `prisma\migrations\20260926094016_init\migration.sql` |
| Size | 25,563 bytes |
| Extension | `.sql` |
| Modified | 2026-09-28 23:09:17.222574 |

```sql
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'BLOCKED');

-- CreateEnum
CREATE TYPE "VerificationCodeType" AS ENUM ('REGISTER', 'FORGOT_PASSWORD', 'LOGIN', 'DISABLE_2FA');

-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'OUT_OF_STOCK', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "InventoryTransType" AS ENUM ('IMPORT', 'EXPORT_ORDER', 'RETURN_INBOUND', 'ADJUSTMENT');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('COD', 'VNPAY', 'MOMO', 'BANK_TRANSFER');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING_PAYMENT', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'RETURNED');

-- CreateEnum
CREATE TYPE "ShipmentStatus" AS ENUM ('PENDING', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED', 'FAILED');

-- CreateEnum
CREATE TYPE "ReturnStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "DiscountType" AS ENUM ('PERCENTAGE', 'FIXED_AMOUNT');

-- CreateEnum
CREATE TYPE "PointTransType" AS ENUM ('EARN', 'REDEEM', 'REFUND', 'EXPIRE');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "fullName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phoneNumber" VARCHAR(50) NOT NULL,
    "passwordHash" VARCHAR(255) NOT NULL,
    "avatarUrl" VARCHAR(1000),
    "rewardPoints" INTEGER NOT NULL DEFAULT 0,
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "roleId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(100) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(150) NOT NULL,
    "module" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShippingAddress" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "receiverName" VARCHAR(255) NOT NULL,
    "phoneNumber" VARCHAR(50) NOT NULL,
    "province" VARCHAR(150) NOT NULL,
    "district" VARCHAR(150) NOT NULL,
    "ward" VARCHAR(150) NOT NULL,
    "detailAddress" VARCHAR(500) NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShippingAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeviceSession" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "refreshToken" VARCHAR(1000) NOT NULL,
    "ipAddress" VARCHAR(100) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeviceSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationCode" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "type" "VerificationCodeType" NOT NULL,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VerificationCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Language" (
    "id" VARCHAR(10) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "defaultName" VARCHAR(255) NOT NULL,
    "iconUrl" VARCHAR(1000),
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "parentId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryTranslation" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "languageId" VARCHAR(10) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,

    CONSTRAINT "CategoryTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" SERIAL NOT NULL,
    "defaultName" VARCHAR(255) NOT NULL,
    "logoUrl" VARCHAR(1000),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BrandTranslation" (
    "id" SERIAL NOT NULL,
    "brandId" INTEGER NOT NULL,
    "languageId" VARCHAR(10) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,

    CONSTRAINT "BrandTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "defaultName" VARCHAR(255) NOT NULL,
    "thumbnailUrl" VARCHAR(1000),
    "status" "ProductStatus" NOT NULL DEFAULT 'DRAFT',
    "categoryId" INTEGER NOT NULL,
    "brandId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductTranslation" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "languageId" VARCHAR(10) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "shortDesc" VARCHAR(500),
    "detailDesc" TEXT,

    CONSTRAINT "ProductTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductImage" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "imageUrl" VARCHAR(1000) NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ProductImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attribute" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "Attribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttributeValue" (
    "id" SERIAL NOT NULL,
    "attributeId" INTEGER NOT NULL,
    "value" VARCHAR(150) NOT NULL,

    CONSTRAINT "AttributeValue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductVariant" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "sku" VARCHAR(150) NOT NULL,
    "stockQuantity" INTEGER NOT NULL DEFAULT 0,
    "originalPrice" DECIMAL(12,2) NOT NULL,
    "sellingPrice" DECIMAL(12,2) NOT NULL,
    "weightGram" INTEGER NOT NULL DEFAULT 0,
    "imageUrl" VARCHAR(1000),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductVariant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryLog" (
    "id" SERIAL NOT NULL,
    "variantId" INTEGER NOT NULL,
    "transType" "InventoryTransType" NOT NULL,
    "quantityChange" INTEGER NOT NULL,
    "note" VARCHAR(500),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InventoryLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlashSaleCampaign" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "bannerUrl" VARCHAR(1000),
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FlashSaleCampaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlashSaleItem" (
    "id" SERIAL NOT NULL,
    "campaignId" INTEGER NOT NULL,
    "variantId" INTEGER NOT NULL,
    "flashSalePrice" DECIMAL(12,2) NOT NULL,
    "promoQuantity" INTEGER NOT NULL,
    "soldQuantity" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "FlashSaleItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "sessionId" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartItem" (
    "id" SERIAL NOT NULL,
    "cartId" INTEGER NOT NULL,
    "variantId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "orderCode" VARCHAR(100) NOT NULL,
    "userId" INTEGER NOT NULL,
    "receiverName" VARCHAR(255) NOT NULL,
    "receiverPhone" VARCHAR(50) NOT NULL,
    "province" VARCHAR(150) NOT NULL,
    "district" VARCHAR(150) NOT NULL,
    "ward" VARCHAR(150) NOT NULL,
    "detailAddress" VARCHAR(500) NOT NULL,
    "subTotal" DECIMAL(12,2) NOT NULL,
    "shippingFee" DECIMAL(12,2) NOT NULL,
    "shippingDiscount" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "voucherCode" VARCHAR(100),
    "voucherDiscount" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "pointUsed" INTEGER NOT NULL DEFAULT 0,
    "pointDiscount" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "pointEarned" INTEGER NOT NULL DEFAULT 0,
    "totalAmount" DECIMAL(12,2) NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING_PAYMENT',
    "customerNote" TEXT,
    "orderDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "variantId" INTEGER,
    "productName" VARCHAR(255) NOT NULL,
    "skuCode" VARCHAR(150) NOT NULL,
    "variantValue" VARCHAR(255) NOT NULL,
    "productImageUrl" VARCHAR(1000),
    "unitPrice" DECIMAL(12,2) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shipment" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "carrier" VARCHAR(100) NOT NULL,
    "trackingCode" VARCHAR(150) NOT NULL,
    "actualShippingFee" DECIMAL(12,2) NOT NULL,
    "status" "ShipmentStatus" NOT NULL DEFAULT 'PENDING',
    "estimatedDelivery" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Shipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReturnRequest" (
    "id" SERIAL NOT NULL,
    "orderItemId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "reason" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "status" "ReturnStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReturnRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReturnMedia" (
    "id" SERIAL NOT NULL,
    "returnRequestId" INTEGER NOT NULL,
    "mediaUrl" VARCHAR(1000) NOT NULL,
    "mediaType" VARCHAR(50) NOT NULL,

    CONSTRAINT "ReturnMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentTransaction" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "provider" VARCHAR(100) NOT NULL,
    "providerTransId" VARCHAR(255) NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PointTransaction" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "orderId" INTEGER,
    "pointChange" INTEGER NOT NULL,
    "currentPoint" INTEGER NOT NULL,
    "transactionType" "PointTransType" NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PointTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Voucher" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(100) NOT NULL,
    "discountType" "DiscountType" NOT NULL,
    "discountValue" DECIMAL(12,2) NOT NULL,
    "minOrderValue" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "maxDiscountAmt" DECIMAL(12,2),
    "totalUsageLimit" INTEGER NOT NULL DEFAULT 0,
    "usedCount" INTEGER NOT NULL DEFAULT 0,
    "userUsageLimit" INTEGER NOT NULL DEFAULT 1,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Voucher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductReview" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "rating" SMALLINT NOT NULL,
    "content" TEXT NOT NULL,
    "shopReply" TEXT,
    "isHidden" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewMedia" (
    "id" SERIAL NOT NULL,
    "reviewId" INTEGER NOT NULL,
    "mediaUrl" VARCHAR(1000) NOT NULL,
    "mediaType" VARCHAR(50) NOT NULL,

    CONSTRAINT "ReviewMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "attachmentUrl" VARCHAR(1000),
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebsocketSession" (
    "socketId" VARCHAR(255) NOT NULL,
    "userId" INTEGER NOT NULL,
    "connectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WebsocketSession_pkey" PRIMARY KEY ("socketId")
);

-- CreateTable
CREATE TABLE "_RolePermissions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_RolePermissions_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ProductTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ProductTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_VariantAttributeValues" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_VariantAttributeValues_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Role_code_key" ON "Role"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_code_key" ON "Permission"("code");

-- CreateIndex
CREATE UNIQUE INDEX "DeviceSession_refreshToken_key" ON "DeviceSession"("refreshToken");

-- CreateIndex
CREATE INDEX "VerificationCode_email_type_idx" ON "VerificationCode"("email", "type");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryTranslation_categoryId_languageId_key" ON "CategoryTranslation"("categoryId", "languageId");

-- CreateIndex
CREATE UNIQUE INDEX "BrandTranslation_brandId_languageId_key" ON "BrandTranslation"("brandId", "languageId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProductTranslation_productId_languageId_key" ON "ProductTranslation"("productId", "languageId");

-- CreateIndex
CREATE UNIQUE INDEX "Attribute_name_key" ON "Attribute"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AttributeValue_attributeId_value_key" ON "AttributeValue"("attributeId", "value");

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariant_sku_key" ON "ProductVariant"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "FlashSaleItem_campaignId_variantId_key" ON "FlashSaleItem"("campaignId", "variantId");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_userId_key" ON "Cart"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_cartId_variantId_key" ON "CartItem"("cartId", "variantId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderCode_key" ON "Order"("orderCode");

-- CreateIndex
CREATE UNIQUE INDEX "Shipment_orderId_key" ON "Shipment"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Shipment_trackingCode_key" ON "Shipment"("trackingCode");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentTransaction_providerTransId_key" ON "PaymentTransaction"("providerTransId");

-- CreateIndex
CREATE UNIQUE INDEX "Voucher_code_key" ON "Voucher"("code");

-- CreateIndex
CREATE UNIQUE INDEX "ProductReview_productId_userId_key" ON "ProductReview"("productId", "userId");

-- CreateIndex
CREATE INDEX "_RolePermissions_B_index" ON "_RolePermissions"("B");

-- CreateIndex
CREATE INDEX "_ProductTags_B_index" ON "_ProductTags"("B");

-- CreateIndex
CREATE INDEX "_VariantAttributeValues_B_index" ON "_VariantAttributeValues"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShippingAddress" ADD CONSTRAINT "ShippingAddress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceSession" ADD CONSTRAINT "DeviceSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryTranslation" ADD CONSTRAINT "CategoryTranslation_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryTranslation" ADD CONSTRAINT "CategoryTranslation_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BrandTranslation" ADD CONSTRAINT "BrandTranslation_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BrandTranslation" ADD CONSTRAINT "BrandTranslation_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductTranslation" ADD CONSTRAINT "ProductTranslation_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductTranslation" ADD CONSTRAINT "ProductTranslation_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttributeValue" ADD CONSTRAINT "AttributeValue_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariant" ADD CONSTRAINT "ProductVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryLog" ADD CONSTRAINT "InventoryLog_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ProductVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlashSaleItem" ADD CONSTRAINT "FlashSaleItem_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "FlashSaleCampaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlashSaleItem" ADD CONSTRAINT "FlashSaleItem_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ProductVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ProductVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ProductVariant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shipment" ADD CONSTRAINT "Shipment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReturnRequest" ADD CONSTRAINT "ReturnRequest_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "OrderItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReturnMedia" ADD CONSTRAINT "ReturnMedia_returnRequestId_fkey" FOREIGN KEY ("returnRequestId") REFERENCES "ReturnRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentTransaction" ADD CONSTRAINT "PaymentTransaction_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointTransaction" ADD CONSTRAINT "PointTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointTransaction" ADD CONSTRAINT "PointTransaction_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductReview" ADD CONSTRAINT "ProductReview_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductReview" ADD CONSTRAINT "ProductReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewMedia" ADD CONSTRAINT "ReviewMedia_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "ProductReview"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebsocketSession" ADD CONSTRAINT "WebsocketSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RolePermissions" ADD CONSTRAINT "_RolePermissions_A_fkey" FOREIGN KEY ("A") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RolePermissions" ADD CONSTRAINT "_RolePermissions_B_fkey" FOREIGN KEY ("B") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductTags" ADD CONSTRAINT "_ProductTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductTags" ADD CONSTRAINT "_ProductTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VariantAttributeValues" ADD CONSTRAINT "_VariantAttributeValues_A_fkey" FOREIGN KEY ("A") REFERENCES "AttributeValue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VariantAttributeValues" ADD CONSTRAINT "_VariantAttributeValues_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

```

# prisma\migrations\20260926133205_init\migration.sql

| Property | Value |
|----------|-------|
| Path | `prisma\migrations\20260926133205_init\migration.sql` |
| Size | 10,199 bytes |
| Extension | `.sql` |
| Modified | 2026-09-28 23:09:17.224574 |

```sql
/*
  Warnings:

  - A unique constraint covering the columns `[orderId,productId]` on the table `ProductReview` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Attribute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `BrandTranslation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `CategoryTranslation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Language` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ProductTranslation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_brandId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_roleId_fkey";

-- DropIndex
DROP INDEX "ProductReview_productId_userId_key";

-- AlterTable
ALTER TABLE "Attribute" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Brand" ADD COLUMN     "createdById" INTEGER,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "deletedById" INTEGER,
ADD COLUMN     "updatedById" INTEGER;

-- AlterTable
ALTER TABLE "BrandTranslation" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdById" INTEGER,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "deletedById" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedById" INTEGER;

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "createdById" INTEGER,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "deletedById" INTEGER,
ADD COLUMN     "updatedById" INTEGER;

-- AlterTable
ALTER TABLE "CategoryTranslation" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdById" INTEGER,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "deletedById" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedById" INTEGER;

-- AlterTable
ALTER TABLE "FlashSaleCampaign" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Language" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdById" INTEGER,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "deletedById" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedById" INTEGER;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "createdById" INTEGER,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "deletedById" INTEGER,
ADD COLUMN     "updatedById" INTEGER;

-- AlterTable
ALTER TABLE "Permission" ADD COLUMN     "createdById" INTEGER,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "deletedById" INTEGER,
ADD COLUMN     "updatedById" INTEGER;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "createdById" INTEGER,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "deletedById" INTEGER,
ADD COLUMN     "updatedById" INTEGER;

-- AlterTable
ALTER TABLE "ProductImage" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "ProductReview" ADD COLUMN     "orderId" INTEGER,
ADD COLUMN     "updateCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "ProductTranslation" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdById" INTEGER,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "deletedById" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedById" INTEGER;

-- AlterTable
ALTER TABLE "ProductVariant" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "createdById" INTEGER,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "deletedById" INTEGER,
ADD COLUMN     "updatedById" INTEGER;

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdById" INTEGER,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "deletedById" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedById" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdById" INTEGER,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "deletedById" INTEGER,
ADD COLUMN     "updatedById" INTEGER;

-- AlterTable
ALTER TABLE "Voucher" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "AttributeValue_attributeId_idx" ON "AttributeValue"("attributeId");

-- CreateIndex
CREATE INDEX "Brand_deletedAt_idx" ON "Brand"("deletedAt");

-- CreateIndex
CREATE INDEX "BrandTranslation_deletedAt_idx" ON "BrandTranslation"("deletedAt");

-- CreateIndex
CREATE INDEX "CartItem_cartId_idx" ON "CartItem"("cartId");

-- CreateIndex
CREATE INDEX "Category_deletedAt_idx" ON "Category"("deletedAt");

-- CreateIndex
CREATE INDEX "Category_parentId_idx" ON "Category"("parentId");

-- CreateIndex
CREATE INDEX "CategoryTranslation_deletedAt_idx" ON "CategoryTranslation"("deletedAt");

-- CreateIndex
CREATE INDEX "DeviceSession_userId_idx" ON "DeviceSession"("userId");

-- CreateIndex
CREATE INDEX "DeviceSession_expiresAt_idx" ON "DeviceSession"("expiresAt");

-- CreateIndex
CREATE INDEX "FlashSaleCampaign_startTime_endTime_idx" ON "FlashSaleCampaign"("startTime", "endTime");

-- CreateIndex
CREATE INDEX "FlashSaleCampaign_isActive_idx" ON "FlashSaleCampaign"("isActive");

-- CreateIndex
CREATE INDEX "FlashSaleItem_campaignId_idx" ON "FlashSaleItem"("campaignId");

-- CreateIndex
CREATE INDEX "InventoryLog_variantId_idx" ON "InventoryLog"("variantId");

-- CreateIndex
CREATE INDEX "Language_deletedAt_idx" ON "Language"("deletedAt");

-- CreateIndex
CREATE INDEX "Message_senderId_idx" ON "Message"("senderId");

-- CreateIndex
CREATE INDEX "Message_receiverId_idx" ON "Message"("receiverId");

-- CreateIndex
CREATE INDEX "Order_userId_idx" ON "Order"("userId");

-- CreateIndex
CREATE INDEX "Order_status_deletedAt_idx" ON "Order"("status", "deletedAt");

-- CreateIndex
CREATE INDEX "Order_deletedAt_idx" ON "Order"("deletedAt");

-- CreateIndex
CREATE INDEX "OrderItem_orderId_idx" ON "OrderItem"("orderId");

-- CreateIndex
CREATE INDEX "OrderItem_variantId_idx" ON "OrderItem"("variantId");

-- CreateIndex
CREATE INDEX "PaymentTransaction_orderId_idx" ON "PaymentTransaction"("orderId");

-- CreateIndex
CREATE INDEX "Permission_deletedAt_idx" ON "Permission"("deletedAt");

-- CreateIndex
CREATE INDEX "PointTransaction_userId_idx" ON "PointTransaction"("userId");

-- CreateIndex
CREATE INDEX "Product_deletedAt_idx" ON "Product"("deletedAt");

-- CreateIndex
CREATE INDEX "Product_categoryId_idx" ON "Product"("categoryId");

-- CreateIndex
CREATE INDEX "Product_brandId_idx" ON "Product"("brandId");

-- CreateIndex
CREATE INDEX "Product_status_idx" ON "Product"("status");

-- CreateIndex
CREATE INDEX "ProductImage_productId_idx" ON "ProductImage"("productId");

-- CreateIndex
CREATE INDEX "ProductReview_productId_idx" ON "ProductReview"("productId");

-- CreateIndex
CREATE INDEX "ProductReview_userId_idx" ON "ProductReview"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductReview_orderId_productId_key" ON "ProductReview"("orderId", "productId");

-- CreateIndex
CREATE INDEX "ProductTranslation_deletedAt_idx" ON "ProductTranslation"("deletedAt");

-- CreateIndex
CREATE INDEX "ProductVariant_productId_idx" ON "ProductVariant"("productId");

-- CreateIndex
CREATE INDEX "ProductVariant_deletedAt_idx" ON "ProductVariant"("deletedAt");

-- CreateIndex
CREATE INDEX "ReturnRequest_orderItemId_idx" ON "ReturnRequest"("orderItemId");

-- CreateIndex
CREATE INDEX "Role_deletedAt_idx" ON "Role"("deletedAt");

-- CreateIndex
CREATE INDEX "Shipment_status_idx" ON "Shipment"("status");

-- CreateIndex
CREATE INDEX "ShippingAddress_userId_idx" ON "ShippingAddress"("userId");

-- CreateIndex
CREATE INDEX "Tag_deletedAt_idx" ON "Tag"("deletedAt");

-- CreateIndex
CREATE INDEX "User_deletedAt_idx" ON "User"("deletedAt");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "VerificationCode_expiresAt_idx" ON "VerificationCode"("expiresAt");

-- CreateIndex
CREATE INDEX "Voucher_code_idx" ON "Voucher"("code");

-- CreateIndex
CREATE INDEX "Voucher_deletedAt_idx" ON "Voucher"("deletedAt");

-- CreateIndex
CREATE INDEX "WebsocketSession_userId_idx" ON "WebsocketSession"("userId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProductReview" ADD CONSTRAINT "ProductReview_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

```

# prisma\migrations\20260928150000_cart_order_guest_checkout\migration.sql

| Property | Value |
|----------|-------|
| Path | `prisma\migrations\20260928150000_cart_order_guest_checkout\migration.sql` |
| Size | 382 bytes |
| Extension | `.sql` |
| Modified | 2026-09-28 23:34:37.019410 |

```sql
-- Allow carts to belong to a browser session without a registered user.
ALTER TABLE "Cart" ALTER COLUMN "userId" DROP NOT NULL;
DROP INDEX IF EXISTS "Cart_userId_key";
CREATE UNIQUE INDEX "Cart_sessionId_key" ON "Cart"("sessionId");

-- Keep the selected delivery method with the order.
ALTER TABLE "Order" ADD COLUMN "shippingMethod" VARCHAR(50) NOT NULL DEFAULT 'STANDARD';
```

# prisma\migrations\migration_lock.toml

| Property | Value |
|----------|-------|
| Path | `prisma\migrations\migration_lock.toml` |
| Size | 131 bytes |
| Extension | `.toml` |
| Modified | 2026-09-28 23:09:17.226571 |

```toml
# Please do not edit this file manually
# It should be added in your version-control system (e.g., Git)
provider = "postgresql"

```

# prisma\schema.prisma

| Property | Value |
|----------|-------|
| Path | `prisma\schema.prisma` |
| Size | 21,583 bytes |
| Extension | `.prisma` |
| Modified | 2026-09-28 23:34:37.022408 |

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ==========================================
// 1. ENUMS
// ==========================================

enum UserStatus {
  ACTIVE
  INACTIVE
  BLOCKED
}

enum VerificationCodeType {
  REGISTER
  FORGOT_PASSWORD
  LOGIN
  DISABLE_2FA
}

enum ProductStatus {
  DRAFT
  PUBLISHED
  OUT_OF_STOCK
  ARCHIVED
}

enum InventoryTransType {
  IMPORT
  EXPORT_ORDER
  RETURN_INBOUND
  ADJUSTMENT
}

enum PaymentMethod {
  COD
  VNPAY
  MOMO
  BANK_TRANSFER
}

enum PaymentStatus {
  PENDING
  SUCCESS
  FAILED
  REFUNDED
}

enum OrderStatus {
  PENDING_PAYMENT
  CONFIRMED
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
  RETURNED
}

enum ShipmentStatus {
  PENDING
  PICKED_UP
  IN_TRANSIT
  DELIVERED
  FAILED
}

enum ReturnStatus {
  PENDING
  APPROVED
  REJECTED
  COMPLETED
}

enum DiscountType {
  PERCENTAGE
  FIXED_AMOUNT
}

enum PointTransType {
  EARN
  REDEEM
  REFUND
  EXPIRE
}

// ==========================================
// 2. IDENTITY & ACCESS MANAGEMENT
// ==========================================

model User {
  id           Int        @id @default(autoincrement())
  fullName     String     @db.VarChar(255)
  email        String     @unique @db.VarChar(255)
  phoneNumber  String     @db.VarChar(50)
  passwordHash String     @db.VarChar(255)
  avatarUrl    String?    @db.VarChar(1000)
  rewardPoints Int        @default(0)
  status       UserStatus @default(ACTIVE)
  roleId       Int
  role         Role       @relation(fields: [roleId], references: [id], onUpdate: NoAction)

  shippingAddresses ShippingAddress[]
  deviceSessions    DeviceSession[]
  cart              Cart?
  orders            Order[]
  pointTransactions PointTransaction[]
  reviews           ProductReview[]
  sentMessages      Message[]          @relation("SenderMessages")
  receivedMessages  Message[]          @relation("ReceiverMessages")
  websocketSessions WebsocketSession[]

  // Audit trail & Soft delete
  createdById Int?
  updatedById Int?
  deletedById Int?
  deletedAt   DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([deletedAt])
  @@index([email])
}

model Role {
  id       Int     @id @default(autoincrement())
  code     String  @unique @db.VarChar(100)
  name     String  @db.VarChar(255)
  isActive Boolean @default(true)

  users       User[]
  permissions Permission[] @relation("RolePermissions")

  createdById Int?
  updatedById Int?
  deletedById Int?
  deletedAt   DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([deletedAt])
}

model Permission {
  id          Int     @id @default(autoincrement())
  code        String  @unique @db.VarChar(150)
  module      String  @db.VarChar(100)
  description String? @db.Text

  roles Role[] @relation("RolePermissions")

  createdById Int?
  updatedById Int?
  deletedById Int?
  deletedAt   DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([deletedAt])
}

model ShippingAddress {
  id            Int     @id @default(autoincrement())
  userId        Int
  user          User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  receiverName  String  @db.VarChar(255)
  phoneNumber   String  @db.VarChar(50)
  province      String  @db.VarChar(150)
  district      String  @db.VarChar(150)
  ward          String  @db.VarChar(150)
  detailAddress String  @db.VarChar(500)
  isDefault     Boolean @default(false)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([userId])
}

model DeviceSession {
  id           Int      @id @default(autoincrement())
  userId       Int
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  refreshToken String   @unique @db.VarChar(1000)
  ipAddress    String   @db.VarChar(100)
  isActive     Boolean  @default(true)
  expiresAt    DateTime

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([userId])
  @@index([expiresAt])
}

model VerificationCode {
  id        Int                  @id @default(autoincrement())
  email     String               @db.VarChar(255)
  code      String               @db.VarChar(50)
  type      VerificationCodeType
  isUsed    Boolean              @default(false)
  expiresAt DateTime

  createdAt DateTime @default(now())

  @@index([email, type])
  @@index([expiresAt])
}

// ==========================================
// 3. PRODUCT CATALOG & LOCALIZATION
// ==========================================

model Language {
  id        String  @id @db.VarChar(10) // 'vi', 'en'
  name      String  @db.VarChar(100)
  isDefault Boolean @default(false)

  categoryTranslations CategoryTranslation[]
  brandTranslations    BrandTranslation[]
  productTranslations  ProductTranslation[]

  createdById Int?
  updatedById Int?
  deletedById Int?
  deletedAt   DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([deletedAt])
}

model Category {
  id          Int        @id @default(autoincrement())
  defaultName String     @db.VarChar(255)
  iconUrl     String?    @db.VarChar(1000)
  isVisible   Boolean    @default(true)
  parentId    Int?
  parent      Category?  @relation("CategoryHierarchy", fields: [parentId], references: [id], onDelete: SetNull)
  children    Category[] @relation("CategoryHierarchy")

  translations CategoryTranslation[]
  products     Product[]

  createdById Int?
  updatedById Int?
  deletedById Int?
  deletedAt   DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([deletedAt])
  @@index([parentId])
}

model CategoryTranslation {
  id          Int      @id @default(autoincrement())
  categoryId  Int
  category    Category @relation(fields: [categoryId], references: [id], onDelete: Cascade)
  languageId  String   @db.VarChar(10)
  language    Language @relation(fields: [languageId], references: [id], onDelete: Cascade)
  name        String   @db.VarChar(255)
  description String?  @db.Text

  createdById Int?
  updatedById Int?
  deletedById Int?
  deletedAt   DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@unique([categoryId, languageId])
  @@index([deletedAt])
}

model Brand {
  id          Int     @id @default(autoincrement())
  defaultName String  @db.VarChar(255)
  logoUrl     String? @db.VarChar(1000)

  translations BrandTranslation[]
  products     Product[]

  createdById Int?
  updatedById Int?
  deletedById Int?
  deletedAt   DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([deletedAt])
}

model BrandTranslation {
  id          Int      @id @default(autoincrement())
  brandId     Int
  brand       Brand    @relation(fields: [brandId], references: [id], onDelete: Cascade)
  languageId  String   @db.VarChar(10)
  language    Language @relation(fields: [languageId], references: [id], onDelete: Cascade)
  name        String   @db.VarChar(255)
  description String?  @db.Text

  createdById Int?
  updatedById Int?
  deletedById Int?
  deletedAt   DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@unique([brandId, languageId])
  @@index([deletedAt])
}

model Tag {
  id       Int       @id @default(autoincrement())
  name     String    @unique @db.VarChar(100)
  products Product[] @relation("ProductTags")

  createdById Int?
  updatedById Int?
  deletedById Int?
  deletedAt   DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([deletedAt])
}

model Product {
  id           Int           @id @default(autoincrement())
  defaultName  String        @db.VarChar(255)
  thumbnailUrl String?       @db.VarChar(1000)
  status       ProductStatus @default(DRAFT)

  categoryId Int
  category   Category @relation(fields: [categoryId], references: [id], onUpdate: NoAction)
  brandId    Int?
  brand      Brand?   @relation(fields: [brandId], references: [id], onDelete: SetNull, onUpdate: NoAction)

  images       ProductImage[]
  translations ProductTranslation[]
  variants     ProductVariant[]
  tags         Tag[]                @relation("ProductTags")
  reviews      ProductReview[]

  createdById Int?
  updatedById Int?
  deletedById Int?
  deletedAt   DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([deletedAt])
  @@index([categoryId])
  @@index([brandId])
  @@index([status])
}

model ProductTranslation {
  id         Int      @id @default(autoincrement())
  productId  Int
  product    Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  languageId String   @db.VarChar(10)
  language   Language @relation(fields: [languageId], references: [id], onDelete: Cascade)
  name       String   @db.VarChar(255)
  shortDesc  String?  @db.VarChar(500)
  detailDesc String?  @db.Text

  createdById Int?
  updatedById Int?
  deletedById Int?
  deletedAt   DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@unique([productId, languageId])
  @@index([deletedAt])
}

model ProductImage {
  id           Int     @id @default(autoincrement())
  productId    Int
  product      Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  imageUrl     String  @db.VarChar(1000)
  displayOrder Int     @default(0)

  createdAt DateTime @default(now())

  @@index([productId])
}

model Attribute {
  id     Int              @id @default(autoincrement())
  name   String           @unique @db.VarChar(100) // Màu sắc, Size
  values AttributeValue[]

  deletedAt DateTime?
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model AttributeValue {
  id          Int       @id @default(autoincrement())
  attributeId Int
  attribute   Attribute @relation(fields: [attributeId], references: [id], onDelete: Cascade)
  value       String    @db.VarChar(150) // Đen, Trắng, XL

  variants ProductVariant[] @relation("VariantAttributeValues")

  @@unique([attributeId, value])
  @@index([attributeId])
}

model ProductVariant {
  id            Int     @id @default(autoincrement())
  productId     Int
  product       Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  sku           String  @unique @db.VarChar(150)
  stockQuantity Int     @default(0)
  originalPrice Decimal @db.Decimal(12, 2)
  sellingPrice  Decimal @db.Decimal(12, 2)
  weightGram    Int     @default(0)
  imageUrl      String? @db.VarChar(1000)

  attributeValues AttributeValue[] @relation("VariantAttributeValues")
  inventoryLogs   InventoryLog[]
  flashSaleItems  FlashSaleItem[]
  cartItems       CartItem[]
  orderItems      OrderItem[]

  deletedAt DateTime?
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  @@index([productId])
  @@index([deletedAt])
}

// ==========================================
// 4. INVENTORY & FLASH SALE
// ==========================================

model InventoryLog {
  id             Int                @id @default(autoincrement())
  variantId      Int
  variant        ProductVariant     @relation(fields: [variantId], references: [id], onDelete: Cascade)
  transType      InventoryTransType
  quantityChange Int
  note           String?            @db.VarChar(500)

  createdAt DateTime @default(now())

  @@index([variantId])
}

model FlashSaleCampaign {
  id        Int      @id @default(autoincrement())
  name      String   @db.VarChar(255)
  bannerUrl String?  @db.VarChar(1000)
  startTime DateTime
  endTime   DateTime
  isActive  Boolean  @default(true)

  items FlashSaleItem[]

  deletedAt DateTime?
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  @@index([startTime, endTime])
  @@index([isActive])
}

model FlashSaleItem {
  id             Int               @id @default(autoincrement())
  campaignId     Int
  campaign       FlashSaleCampaign @relation(fields: [campaignId], references: [id], onDelete: Cascade)
  variantId      Int
  variant        ProductVariant    @relation(fields: [variantId], references: [id], onDelete: Cascade)
  flashSalePrice Decimal           @db.Decimal(12, 2)
  promoQuantity  Int
  soldQuantity   Int               @default(0)

  @@unique([campaignId, variantId])
  @@index([campaignId])
}

// ==========================================
// 5. CART & ORDER PROCESSING
// ==========================================

model Cart {
  id        Int     @id @default(autoincrement())
  userId    Int?    @unique
  user      User?   @relation(fields: [userId], references: [id], onDelete: Cascade)
  sessionId String? @db.VarChar(255)

  cartItems CartItem[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([sessionId])
}

model CartItem {
  id        Int            @id @default(autoincrement())
  cartId    Int
  cart      Cart           @relation(fields: [cartId], references: [id], onDelete: Cascade)
  variantId Int
  variant   ProductVariant @relation(fields: [variantId], references: [id], onDelete: Cascade)
  quantity  Int            @default(1)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([cartId, variantId])
  @@index([cartId])
}

model Order {
  id        Int    @id @default(autoincrement())
  orderCode String @unique @db.VarChar(100)
  userId    Int
  user      User   @relation(fields: [userId], references: [id], onUpdate: NoAction)

  // Snapshot Address
  receiverName  String @db.VarChar(255)
  receiverPhone String @db.VarChar(50)
  province      String @db.VarChar(150)
  district      String @db.VarChar(150)
  ward          String @db.VarChar(150)
  detailAddress String @db.VarChar(500)

  // Financial Calculations
  subTotal         Decimal @db.Decimal(12, 2)
  shippingFee      Decimal @db.Decimal(12, 2)
  shippingMethod   String  @default("STANDARD") @db.VarChar(50)
  shippingDiscount Decimal @default(0) @db.Decimal(12, 2)
  voucherCode      String? @db.VarChar(100)
  voucherDiscount  Decimal @default(0) @db.Decimal(12, 2)
  pointUsed        Int     @default(0)
  pointDiscount    Decimal @default(0) @db.Decimal(12, 2)
  pointEarned      Int     @default(0)
  totalAmount      Decimal @db.Decimal(12, 2)

  paymentMethod PaymentMethod
  paymentStatus PaymentStatus @default(PENDING)
  status        OrderStatus   @default(PENDING_PAYMENT)
  customerNote  String?       @db.Text
  orderDate     DateTime      @default(now())

  orderItems          OrderItem[]
  shipment            Shipment?
  paymentTransactions PaymentTransaction[]
  pointTransactions   PointTransaction[]
  reviews             ProductReview[]

  createdById Int?
  updatedById Int?
  deletedById Int?
  deletedAt   DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([userId])
  @@index([status, deletedAt])
  @@index([deletedAt])
}

model OrderItem {
  id        Int             @id @default(autoincrement())
  orderId   Int
  order     Order           @relation(fields: [orderId], references: [id], onDelete: Cascade)
  variantId Int?
  variant   ProductVariant? @relation(fields: [variantId], references: [id], onDelete: SetNull)

  // Frozen Snapshot
  productName     String  @db.VarChar(255)
  skuCode         String  @db.VarChar(150)
  variantValue    String  @db.VarChar(255)
  productImageUrl String? @db.VarChar(1000)
  unitPrice       Decimal @db.Decimal(12, 2)
  quantity        Int

  returnRequests ReturnRequest[]

  createdAt DateTime @default(now())

  @@index([orderId])
  @@index([variantId])
}

// ==========================================
// 6. FULFILLMENT & PAYMENT
// ==========================================

model Shipment {
  id                Int            @id @default(autoincrement())
  orderId           Int            @unique
  order             Order          @relation(fields: [orderId], references: [id], onDelete: Cascade)
  carrier           String         @db.VarChar(100)
  trackingCode      String         @unique @db.VarChar(150)
  actualShippingFee Decimal        @db.Decimal(12, 2)
  status            ShipmentStatus @default(PENDING)
  estimatedDelivery DateTime?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([status])
}

model ReturnRequest {
  id          Int          @id @default(autoincrement())
  orderItemId Int
  orderItem   OrderItem    @relation(fields: [orderItemId], references: [id], onDelete: Cascade)
  quantity    Int
  reason      String       @db.VarChar(255)
  description String?      @db.Text
  status      ReturnStatus @default(PENDING)

  medias ReturnMedia[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([orderItemId])
}

model ReturnMedia {
  id              Int           @id @default(autoincrement())
  returnRequestId Int
  returnRequest   ReturnRequest @relation(fields: [returnRequestId], references: [id], onDelete: Cascade)
  mediaUrl        String        @db.VarChar(1000)
  mediaType       String        @db.VarChar(50)
}

model PaymentTransaction {
  id              Int           @id @default(autoincrement())
  orderId         Int
  order           Order         @relation(fields: [orderId], references: [id], onDelete: Cascade)
  provider        String        @db.VarChar(100)
  providerTransId String        @unique @db.VarChar(255)
  amount          Decimal       @db.Decimal(12, 2)
  status          PaymentStatus @default(PENDING)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([orderId])
}

// ==========================================
// 7. LOYALTY, ENGAGE & REAL-TIME
// ==========================================

model PointTransaction {
  id              Int            @id @default(autoincrement())
  userId          Int
  user            User           @relation(fields: [userId], references: [id], onDelete: Cascade)
  orderId         Int?
  order           Order?         @relation(fields: [orderId], references: [id], onDelete: SetNull)
  pointChange     Int
  currentPoint    Int
  transactionType PointTransType
  description     String         @db.VarChar(255)

  createdAt DateTime @default(now())

  @@index([userId])
}

model Voucher {
  id              Int          @id @default(autoincrement())
  code            String       @unique @db.VarChar(100)
  discountType    DiscountType
  discountValue   Decimal      @db.Decimal(12, 2)
  minOrderValue   Decimal      @default(0) @db.Decimal(12, 2)
  maxDiscountAmt  Decimal?     @db.Decimal(12, 2)
  totalUsageLimit Int          @default(0)
  usedCount       Int          @default(0)
  userUsageLimit  Int          @default(1)
  startDate       DateTime
  endDate         DateTime
  isActive        Boolean      @default(true)

  deletedAt DateTime?
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  @@index([code])
  @@index([deletedAt])
}

model ProductReview {
  id        Int     @id @default(autoincrement())
  productId Int
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  userId    Int
  user      User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  orderId   Int?
  order     Order?  @relation(fields: [orderId], references: [id], onDelete: SetNull)

  rating      Int     @db.SmallInt
  content     String  @db.Text
  shopReply   String? @db.Text
  updateCount Int     @default(0)
  isHidden    Boolean @default(false)

  medias ReviewMedia[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Đảm bảo mỗi đơn hàng người dùng chỉ đánh giá sản phẩm đó 1 lần
  @@unique([orderId, productId])
  @@index([productId])
  @@index([userId])
}

model ReviewMedia {
  id        Int           @id @default(autoincrement())
  reviewId  Int
  review    ProductReview @relation(fields: [reviewId], references: [id], onDelete: Cascade)
  mediaUrl  String        @db.VarChar(1000)
  mediaType String        @db.VarChar(50)
}

model Message {
  id            Int       @id @default(autoincrement())
  senderId      Int
  sender        User      @relation("SenderMessages", fields: [senderId], references: [id], onDelete: Cascade)
  receiverId    Int
  receiver      User      @relation("ReceiverMessages", fields: [receiverId], references: [id], onDelete: Cascade)
  content       String    @db.Text
  attachmentUrl String?   @db.VarChar(1000)
  readAt        DateTime?

  createdAt DateTime @default(now())

  @@index([senderId])
  @@index([receiverId])
}

model WebsocketSession {
  socketId    String   @id @db.VarChar(255)
  userId      Int
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  connectedAt DateTime @default(now())

  @@index([userId])
}

```

# src\app.ts

| Property | Value |
|----------|-------|
| Path | `src\app.ts` |
| Size | 1,505 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:09:17.229576 |

```typescript
import express, { Express } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import pinoHttp from 'pino-http'
import { errorFilter } from '@/middlewares/filters/error.filter'

// Import 6 router tổng của 6 phân hệ
import { identityRouter } from '@/modules/identity/identity.routes'
import { catalogRouter } from '@/modules/catalog/catalog.routes'
import { cartOrderRouter } from '@/modules/cart-order/cart-order.routes'
import { inventorySaleRouter } from '@/modules/inventory-sale/inventory-sale.routes'
import { fulfillmentRouter } from '@/modules/fulfillment/fulfillment.routes'
import { loyaltyEngageRouter } from '@/modules/loyalty-engage/loyalty-engage.routes'

export const createApp = (): Express => {
  const app = express()

  app.use(helmet())
  app.use(cors())
  app.use(express.json({ limit: '10mb' }))
  app.use(express.urlencoded({ extended: true }))
  app.use(pinoHttp({ autoLogging: false }))

  // Health check
  app.get('/health', (_, res) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime() })
  })

  // Đăng ký 6 Route tổng
  app.use('/api/v1/identity', identityRouter)
  app.use('/api/v1/catalog', catalogRouter)
  app.use('/api/v1/cart-order', cartOrderRouter)
  app.use('/api/v1/inventory-sale', inventorySaleRouter)
  app.use('/api/v1/fulfillment', fulfillmentRouter)
  app.use('/api/v1/loyalty-engage', loyaltyEngageRouter)

  // Global Error Handler
  app.use(errorFilter)

  return app
}
```

# src\common\constants\index.ts

| Property | Value |
|----------|-------|
| Path | `src\common\constants\index.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-09-23 09:04:55.515028 |

```typescript

```

# src\common\errors\index.ts

| Property | Value |
|----------|-------|
| Path | `src\common\errors\index.ts` |
| Size | 1,844 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:09:17.231574 |

```typescript
import { Prisma } from '@prisma/client'

export const isUniqueConstraintPrismaError = (
  error: any,
): error is Prisma.PrismaClientKnownRequestError => {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002'
}

export const isNotFoundPrismaError = (
  error: any,
): error is Prisma.PrismaClientKnownRequestError => {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025'
}

export class AppError extends Error {
  public readonly statusCode: number
  public readonly isOperational: boolean

  constructor(message: string, statusCode = 500, isOperational = true) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational

    // Giữ nguyên stack trace sạch
    Error.captureStackTrace(this, this.constructor)
  }
}

// Các class lỗi kế thừa tiện dùng theo chuẩn HTTP Status Code
export class NotFoundError extends AppError {
  constructor(message = 'Bản ghi không tồn tại') {
    super(message, 404)
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Dữ liệu không hợp lệ') {
    super(message, 400)
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Chưa xác thực danh tính') {
    super(message, 401)
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Bạn không có quyền thực hiện hành động này') {
    super(message, 403)
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Dữ liệu đã tồn tại') {
    super(message, 409)
  }
}

export class UnprocessableEntityError extends AppError {
  constructor(message = 'Dữ liệu thực thể không thể xử lý') {
    super(message, 422)
  }
}


```

# src\common\helpers\index.ts

| Property | Value |
|----------|-------|
| Path | `src\common\helpers\index.ts` |
| Size | 38 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:09:17.232574 |

```typescript
export const ALL_LANGUAGE_CODE = 'all'
```

# src\common\service\mail.ts

| Property | Value |
|----------|-------|
| Path | `src\common\service\mail.ts` |
| Size | 1,134 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:07.564654 |

```typescript
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
```

# src\config\env.config.ts

| Property | Value |
|----------|-------|
| Path | `src\config\env.config.ts` |
| Size | 1,246 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:07.402963 |

```typescript
import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  
  ACCESS_TOKEN_SECRET: z.string().min(1),
  ACCESS_TOKEN_EXPIRES_IN: z.string().default('1h'),
  REFRESH_TOKEN_SECRET: z.string().min(1),
  REFRESH_TOKEN_EXPIRES_IN: z.string().default('1d'),
  
  PAYMENT_API_KEY: z.string().min(1),
  
  S3_ENDPOINT: z.string().optional(),
  S3_REGION: z.string().optional(),
  S3_ACCESS_KEY: z.string().optional(),
  S3_SECRET_KEY: z.string().optional(),
  S3_BUCKET_NAME: z.string().optional(),

  MAIL_USER: z.string().email(),
  MAIL_PASS: z.string().min(1),
})

const parseResult = envSchema.safeParse(process.env)

if (!parseResult.success) {
  console.error('❌ Các biến môi trường khai báo trong .env không hợp lệ: (tự tạo file env theo hàm envSchema trên trong file env.config.ts)')
  console.error(parseResult.error.flatten().fieldErrors)
  process.exit(1)
}

export const envConfig = parseResult.data
export type EnvConfigType = z.infer<typeof envSchema>
```

# src\config\mail.ts

| Property | Value |
|----------|-------|
| Path | `src\config\mail.ts` |
| Size | 256 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:07.403964 |

```typescript
import nodemailer from 'nodemailer';
import { envConfig } from '@/config/env.config';

export const mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: envConfig.MAIL_USER,
    pass: envConfig.MAIL_PASS,
  },
});
```

# src\database\prisma.ts

| Property | Value |
|----------|-------|
| Path | `src\database\prisma.ts` |
| Size | 438 bytes |
| Extension | `.ts` |
| Modified | 2026-09-23 09:07:49.603536 |

```typescript
import { PrismaClient } from '@prisma/client'
import { envConfig } from '@/config/env.config'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: envConfig.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (envConfig.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
```

# src\database\redis.ts

| Property | Value |
|----------|-------|
| Path | `src\database\redis.ts` |
| Size | 606 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:05.493370 |

```typescript
import Redis from 'ioredis'
import { envConfig } from '@/config/env.config'

const Redlock = require('redlock')

export const redisClient = new Redis(envConfig.REDIS_URL, {
  maxRetriesPerRequest: null, // Bắt buộc cho BullMQ
})

redisClient.on('connect', () => {
  console.log('✅ Kết nối Redis thành công')
})

redisClient.on('error', (err) => {
  console.error('❌ Lỗi kết nối Redis:', err)
})

export const redlock = new Redlock([redisClient], {
  driftFactor: 0.01,
  retryCount: 3,
  retryDelay: 200,
  retryJitter: 200,
  automaticExtensionThreshold: 500,
})
```

# src\middlewares\filters\error.filter.ts

| Property | Value |
|----------|-------|
| Path | `src\middlewares\filters\error.filter.ts` |
| Size | 1,131 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:09:17.235574 |

```typescript
import { Request, Response, NextFunction } from 'express'
import { Prisma } from '@prisma/client'
import { envConfig } from '@/config/env.config'

export const errorFilter = (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  let statusCode = err.statusCode || 500
  let message = err.message || 'Internal Server Error'

  // Xử lý lỗi trùng lặp dữ liệu từ Prisma
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      statusCode = 409
      message = `Dữ liệu đã tồn tại trên trường: ${(err.meta?.target as string[])?.join(', ')}`
    } else if (err.code === 'P2025') {
      statusCode = 404
      message = 'Bản ghi không tồn tại hoặc đã bị xóa'
    }
  }

  if (envConfig.NODE_ENV === 'development') {
    console.error('🔥 [ERROR LOG]:', err)
  }

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    ...(envConfig.NODE_ENV === 'development' && { stack: err.stack }),
  })
}
```

# src\middlewares\guards\auth.guard.ts

| Property | Value |
|----------|-------|
| Path | `src\middlewares\guards\auth.guard.ts` |
| Size | 1,100 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:07.567652 |

```typescript
import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { envConfig } from '@/config/env.config'
import { UnauthorizedError } from '@/common/errors'

type AuthenticatedRequest = Request & { user?: { userId: number; roleId: number } }

export const authGuard = (req: Request, _res: Response, next: NextFunction) => {
	try {
		const authorization = req.headers.authorization
		const token = authorization?.startsWith('Bearer ') ? authorization.slice(7) : undefined
		if (!token) throw new UnauthorizedError('Thiếu access token')

		const payload = jwt.verify(token, envConfig.ACCESS_TOKEN_SECRET) as JwtPayload
		if (typeof payload.userId !== 'number' || typeof payload.roleId !== 'number') {
			throw new UnauthorizedError('Access token không hợp lệ')
		}

		;(req as AuthenticatedRequest).user = { userId: payload.userId, roleId: payload.roleId }
		next()
	} catch (error) {
		next(error instanceof UnauthorizedError ? error : new UnauthorizedError('Access token không hợp lệ hoặc đã hết hạn'))
	}
}

```

# src\middlewares\guards\permission.guard.ts

| Property | Value |
|----------|-------|
| Path | `src\middlewares\guards\permission.guard.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-09-23 09:04:55.616112 |

```typescript

```

# src\middlewares\guards\role.guard.ts

| Property | Value |
|----------|-------|
| Path | `src\middlewares\guards\role.guard.ts` |
| Size | 636 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:07.568653 |

```typescript
import { Request, Response, NextFunction } from 'express'
import { prisma } from '@/database/prisma'
import { ForbiddenError, UnauthorizedError } from '@/common/errors'

export const roleGuard = (...allowedCodes: string[]) => async (req: Request, _res: Response, next: NextFunction) => {
	try {
		const user = (req as any).user
		if (!user || !user.roleId) throw new UnauthorizedError()

		const role = await prisma.role.findFirst({ where: { id: user.roleId, isActive: true, deletedAt: null } })
		if (!role || !allowedCodes.includes(role.code)) throw new ForbiddenError()
		next()
	} catch (error) {
		next(error)
	}
}

```

# src\middlewares\interceptors\logger.interceptor.ts

| Property | Value |
|----------|-------|
| Path | `src\middlewares\interceptors\logger.interceptor.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-09-23 09:04:55.688701 |

```typescript

```

# src\middlewares\interceptors\transform.interceptor.ts

| Property | Value |
|----------|-------|
| Path | `src\middlewares\interceptors\transform.interceptor.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-09-23 09:04:55.700702 |

```typescript

```

# src\middlewares\pipes\parse-int.pipe.ts

| Property | Value |
|----------|-------|
| Path | `src\middlewares\pipes\parse-int.pipe.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-09-23 09:04:55.657700 |

```typescript

```

# src\middlewares\pipes\validate.pipe.ts

| Property | Value |
|----------|-------|
| Path | `src\middlewares\pipes\validate.pipe.ts` |
| Size | 1,428 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:03.968560 |

```typescript
import { Request, Response, NextFunction } from 'express'
import { ZodTypeAny, ZodError } from 'zod'

interface RequestValidators {
  params?: ZodTypeAny
  query?: ZodTypeAny
  body?: ZodTypeAny
}

export const validateRequest = (validators: RequestValidators) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 1. Validate & Transform Params
      if (validators.params) {
        const parsedParams = await validators.params.parseAsync(req.params)
        req.params = parsedParams as any
      }

      // 2. Validate & Transform Query
      if (validators.query) {
        const parsedQuery = await validators.query.parseAsync(req.query)
        for (const key of Object.keys(req.query)) {
          delete (req.query as any)[key]
        }
        Object.assign(req.query, parsedQuery)
      }

      // 3. Validate & Transform Body (Chấp nhận cả ZodEffects từ .superRefine)
      if (validators.body) {
        const parsedBody = await validators.body.parseAsync(req.body)
        req.body = parsedBody
      }

      return next()
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(422).json({
          statusCode: 422,
          message: 'Dữ liệu đầu vào không hợp lệ',
          errors: error.flatten().fieldErrors,
        })
      }

      return next(error)
    }
  }
}
```

# src\middlewares\rate-limit.middleware.ts

| Property | Value |
|----------|-------|
| Path | `src\middlewares\rate-limit.middleware.ts` |
| Size | 1,193 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:07.570652 |

```typescript
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


```

# src\modules\cart-order\cart\cart.controller.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\cart-order\cart\cart.controller.ts` |
| Size | 3,032 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:34:37.026409 |

```typescript
import { NextFunction, Request, Response } from 'express'
import { BadRequestError } from '@/common/errors'
import { addCartItemSchema, cartOwnerSchema, updateCartItemSchema } from './cart.schema'
import { CartService } from './cart.service'

/**
 * Lấy userId an toàn từ Middleware xác thực (Auth Middleware)
 */
const userIdOf = (req: Request): number | undefined => {
  const userId = (req as any).user?.userId
  return userId ? Number(userId) : undefined
}

/**
 * Xác định SessionID cho giỏ hàng vãng lai (Guest)
 * Ưu tiên lấy từ Header hoặc Cookie, tránh lấy từ URL Query String
 */
const ownerOf = (req: Request) => {
  const sessionId = req.headers['x-session-id'] ?? req.body?.sessionId
  const result = cartOwnerSchema.safeParse({ sessionId })
  
  if (!result.success) {
    throw new BadRequestError('Session ID không hợp lệ hoặc không tồn tại')
  }
  
  return result.data
}

/**
 * Helper ép kiểu và kiểm tra itemId từ req.params
 */
const parseItemId = (param: string): number => {
  const itemId = Number(param)
  if (isNaN(itemId) || itemId <= 0) {
    throw new BadRequestError('Mã sản phẩm trong giỏ hàng (itemId) không hợp lệ')
  }
  return itemId
}

export class CartController {
  constructor(private readonly service = new CartService()) {}

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.get(userIdOf(req), ownerOf(req))
      return res.status(200).json({ statusCode: 200, data })
    } catch (error) {
      next(error)
    }
  }

  add = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = addCartItemSchema.safeParse(req.body)
      if (!input.success) {
        throw new BadRequestError(input.error.issues[0]?.message ?? 'Dữ liệu không hợp lệ')
      }

      const data = await this.service.add(userIdOf(req), ownerOf(req), input.data)
      return res.status(201).json({ statusCode: 201, data })
    } catch (error) {
      next(error)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const itemId = parseItemId(req.params.itemId)
      const input = updateCartItemSchema.safeParse(req.body)
      
      if (!input.success) {
        throw new BadRequestError(input.error.issues[0]?.message ?? 'Dữ liệu không hợp lệ')
      }

      const data = await this.service.update(userIdOf(req), ownerOf(req), itemId, input.data)
      return res.status(200).json({ statusCode: 200, data })
    } catch (error) {
      next(error)
    }
  }

  remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const itemId = parseItemId(req.params.itemId)
      const data = await this.service.remove(userIdOf(req), ownerOf(req), itemId)
      
      return res.status(200).json({ statusCode: 200, data })
    } catch (error) {
      next(error)
    }
  }
}
```

# src\modules\cart-order\cart\cart.repo.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\cart-order\cart\cart.repo.ts` |
| Size | 3,760 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:34:37.028408 |

```typescript
import { Prisma } from '@prisma/client'
import { prisma } from '@/database/prisma'

const cartInclude = {
  cartItems: {
    include: { 
      variant: { 
        include: { 
          product: true, 
          attributeValues: { include: { attribute: true } } 
        } 
      } 
    },
    orderBy: { createdAt: 'asc' as const },
  },
} satisfies Prisma.CartInclude

export class CartRepo {
  /**
   * Tìm giỏ hàng theo Owner. Ưu tiên tìm theo userId trước, nếu không có mới tìm theo sessionId.
   */
  async findByOwner(userId?: number, sessionId?: string, db: Prisma.TransactionClient | typeof prisma = prisma) {
    if (!userId && !sessionId) return null

    if (userId) {
      const userCart = await db.cart.findFirst({ where: { userId }, include: cartInclude })
      if (userCart) return userCart
    }

    if (sessionId) {
      return db.cart.findFirst({ where: { sessionId }, include: cartInclude })
    }

    return null
  }

  async createOwner(userId?: number, sessionId?: string, db: Prisma.TransactionClient | typeof prisma = prisma) {
    return db.cart.create({ data: { userId, sessionId }, include: cartInclude })
  }

  async findOrCreateOwner(userId?: number, sessionId?: string, db: Prisma.TransactionClient | typeof prisma = prisma) {
    return (await this.findByOwner(userId, sessionId, db)) ?? this.createOwner(userId, sessionId, db)
  }

  /**
   * Gộp giỏ hàng Guest vào giỏ User (Tối ưu Query - Tránh lỗi N+1)
   */
  async mergeGuestCart(userId: number, sessionId: string, db: Prisma.TransactionClient) {
    // 1. Tìm giỏ hàng guest và giỏ hàng user
    const guestCart = await this.findByOwner(undefined, sessionId, db)
    const userCart = await this.findOrCreateOwner(userId, undefined, db)

    // Nếu không có giỏ guest hoặc giỏ guest chính là giỏ user thì trả về giỏ user
    if (!guestCart || guestCart.id === userCart.id || guestCart.cartItems.length === 0) {
      return userCart
    }

    // 2. Tạo Map chứa danh sách item hiện có của User cart để tra cứu nhanh (O(1))
    const userItemMap = new Map(userCart.cartItems.map((item) => [item.variantId, item]))

    const updatePromises: Promise<any>[] = []
    const itemsToMoveIds: number[] = []

    // 3. Phân loại item cần cộng dồn số lượng hoặc chuyển chủ sở hữu
    for (const guestItem of guestCart.cartItems) {
      const existingUserItem = userItemMap.get(guestItem.variantId)

      if (existingUserItem) {
        // Nếu đã có trong giỏ User -> Cộng dồn số lượng
        updatePromises.push(
          db.cartItem.update({
            where: { id: existingUserItem.id },
            data: { quantity: existingUserItem.quantity + guestItem.quantity },
          })
        )
      } else {
        // Nếu chưa có -> Gom ID lại để update hàng loạt (Bulk Update)
        itemsToMoveIds.push(guestItem.id)
      }
    }

    // 4. Thực thi các query cập nhật song song (Parallel execution)
    if (itemsToMoveIds.length > 0) {
      updatePromises.push(
        db.cartItem.updateMany({
          where: { id: { in: itemsToMoveIds } },
          data: { cartId: userCart.id },
        })
      )
    }

    await Promise.all(updatePromises)

    // 5. Xóa giỏ hàng Guest
    await db.cart.delete({ where: { id: guestCart.id } })

    // 6. Lấy lại dữ liệu giỏ hàng hoàn chỉnh cuối cùng
    return this.get(userCart.id, db)
  }

  async get(cartId: number, db: Prisma.TransactionClient | typeof prisma = prisma) {
    return db.cart.findUnique({ where: { id: cartId }, include: cartInclude })
  }
}
```

# src\modules\cart-order\cart\cart.routes.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\cart-order\cart\cart.routes.ts` |
| Size | 1,176 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:34:37.029410 |

```typescript
import { Router } from 'express'
import { CartController } from './cart.controller'
import { optionalAuth } from '@/common/middlewares/auth.middleware' // Middleware giải mã Token nếu có

export const cartRouter = Router()
const controller = new CartController()

// Áp dụng Auth Middleware cho toàn bộ các route giỏ hàng
// (Giúp tự động gắn thông tin user vào req.user nếu client gửi Token)
cartRouter.use(optionalAuth)

// 1. Lấy thông tin giỏ hàng
cartRouter.get('/', controller.get)

// 2. Thêm sản phẩm vào giỏ
cartRouter.post('/items', controller.add)

// 3. Gộp giỏ hàng từ Guest sang User khi vừa Login xong
cartRouter.post('/merge', controller.merge) // Cần bổ sung hàm merge vào CartController

// 4. Cập nhật số lượng/thông tin của 1 món trong giỏ
cartRouter.patch('/items/:itemId', controller.update)

// 5. Xóa 1 món khỏi giỏ hàng
cartRouter.delete('/items/:itemId', controller.remove)

// 6. Xóa toàn bộ giỏ hàng (Dùng khi Clear Cart hoặc sau Checkout)
cartRouter.delete('/', controller.clear) // Cần bổ sung hàm clear vào CartController
```

# src\modules\cart-order\cart\cart.schema.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\cart-order\cart\cart.schema.ts` |
| Size | 2,858 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:34:37.031409 |

```typescript
import { z } from 'zod'

// 1. Schema xác thực chủ sở hữu giỏ hàng
export const cartOwnerSchema = z.object({
  sessionId: z
    .string({ invalid_type_error: 'Session ID phải là chuỗi ký tự' })
    .trim()
    .min(1, 'Session ID không được để trống')
    .max(255, 'Session ID quá dài')
    .optional(),
})

// 2. Schema thêm sản phẩm vào giỏ hàng
export const addCartItemSchema = z.object({
  variantId: z.coerce
    .number({ invalid_type_error: 'Mã biến thể sản phẩm phải là số' })
    .int('Mã biến thể phải là số nguyên')
    .positive('Mã biến thể sản phẩm không hợp lệ'),
  quantity: z.coerce
    .number({ invalid_type_error: 'Số lượng phải là số' })
    .int('Số lượng phải là số nguyên')
    .positive('Số lượng thêm vào phải lớn hơn 0')
    .max(999, 'Số lượng tối đa cho mỗi sản phẩm là 999'),
})

// 3. Schema cập nhật số lượng sản phẩm trong giỏ
export const updateCartItemSchema = z.object({
  quantity: z.coerce
    .number({ invalid_type_error: 'Số lượng phải là số' })
    .int('Số lượng phải là số nguyên')
    .min(0, 'Số lượng không được nhỏ hơn 0')
    .max(999, 'Số lượng tối đa cho mỗi sản phẩm là 999'),
})

// 4. BỔ SUNG: Schema Tạo đơn hàng (Checkout / Create Order)
export const createOrderSchema = z.object({
  customerName: z
    .string({ required_error: 'Vui lòng nhập họ tên người nhận' })
    .trim()
    .min(2, 'Họ tên phải có ít nhất 2 ký tự')
    .max(100, 'Họ tên không được vượt quá 100 ký tự'),
  customerPhone: z
    .string({ required_error: 'Vui lòng nhập số điện thoại' })
    .trim()
    .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Số điện thoại không đúng định dạng Việt Nam'),
  customerEmail: z
    .string()
    .trim()
    .email('Email không đúng định dạng')
    .optional()
    .or(z.literal('')),
  shippingAddress: z
    .string({ required_error: 'Vui lòng nhập địa chỉ giao hàng' })
    .trim()
    .min(5, 'Địa chỉ giao hàng quá ngắn')
    .max(500, 'Địa chỉ không được vượt quá 500 ký tự'),
  note: z.string().trim().max(1000, 'Ghi chú tối đa 1000 ký tự').optional(),
  paymentMethod: z.enum(['COD', 'BANK_TRANSFER', 'MOMO', 'VNPAY'], {
    errorMap: () => ({ message: 'Phương thức thanh toán không hợp lệ' }),
  }),
})

// Infer các Type cho TypeScript
export type CartOwner = z.infer<typeof cartOwnerSchema>
export type AddCartItemInput = z.infer<typeof addCartItemSchema>
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>
export type CreateOrderInput = z.infer<typeof createOrderSchema>
```

# src\modules\cart-order\cart\cart.service.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\cart-order\cart\cart.service.ts` |
| Size | 4,807 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:34:37.033411 |

```typescript
import { prisma } from '@/database/prisma'
import { BadRequestError, NotFoundError } from '@/common/errors'
import { AddCartItemInput, CartOwner, UpdateCartItemInput } from './cart.schema'
import { CartRepo } from './cart.repo'

export class CartService {
  constructor(private readonly cartRepo = new CartRepo()) {}

  /**
   * Helper tìm hoặc tạo mới giỏ hàng theo Owner
   */
  private async ownerCart(userId?: number, sessionId?: string, tx = prisma) {
    if (!userId && !sessionId) {
      throw new BadRequestError('Cần userId hoặc sessionId để xác định giỏ hàng')
    }
    return this.cartRepo.findOrCreateOwner(userId, sessionId, tx)
  }

  /**
   * Lấy thông tin giỏ hàng (Tự động gộp giỏ nếu user vừa đăng nhập)
   */
  async get(userId?: number, owner?: CartOwner) {
    const sessionId = owner?.sessionId

    // Nếu vừa có userId (đã login) vừa có sessionId (guest cũ), tiến hành gộp giỏ hàng
    if (userId && sessionId) {
      return prisma.$transaction(async (tx) => {
        return this.cartRepo.mergeGuestCart(userId, sessionId, tx)
      })
    }

    return this.ownerCart(userId, sessionId)
  }

  /**
   * Thêm sản phẩm vào giỏ hàng
   */
  async add(userId: number | undefined, owner: CartOwner, input: AddCartItemInput) {
    return prisma.$transaction(async (tx) => {
      // 1. Tải giỏ hàng (gộp giỏ nếu cần)
      const cart = userId && owner.sessionId
        ? await this.cartRepo.mergeGuestCart(userId, owner.sessionId, tx)
        : await this.cartRepo.findOrCreateOwner(userId, owner.sessionId, tx)

      // 2. Kiểm tra sự tồn tại và trạng thái của Biến thể sản phẩm
      const variant = await tx.productVariant.findFirst({
        where: { id: input.variantId, deletedAt: null },
        select: { id: true, stockQuantity: true },
      })

      if (!variant) {
        throw new NotFoundError('Sản phẩm không tồn tại hoặc đã ngừng kinh doanh')
      }

      // 3. Kiểm tra sản phẩm đã có trong giỏ chưa
      const existing = await tx.cartItem.findUnique({
        where: { cartId_variantId: { cartId: cart.id, variantId: input.variantId } },
      })

      const newQuantity = (existing?.quantity ?? 0) + input.quantity

      // 4. Kiểm tra tồn kho
      if (newQuantity > variant.stockQuantity) {
        throw new BadRequestError(`Số lượng yêu cầu vượt quá tồn kho hiện có (${variant.stockQuantity})`)
      }

      // 5. Cập nhật hoặc Thêm mới
      if (existing) {
        await tx.cartItem.update({
          where: { id: existing.id },
          data: { quantity: newQuantity },
        })
      } else {
        await tx.cartItem.create({
          data: { cartId: cart.id, variantId: input.variantId, quantity: input.quantity },
        })
      }

      return this.cartRepo.get(cart.id, tx)
    })
  }

  /**
   * Cập nhật số lượng sản phẩm trong giỏ
   */
  async update(userId: number | undefined, owner: CartOwner, itemId: number, input: UpdateCartItemInput) {
    return prisma.$transaction(async (tx) => {
      const cart = await this.ownerCart(userId, owner.sessionId, tx)

      // Tìm món hàng trong giỏ kèm kiểm tra biến thể còn hiệu lực hay không
      const item = await tx.cartItem.findFirst({
        where: { id: itemId, cartId: cart.id },
        include: { variant: true },
      })

      if (!item || item.variant.deletedAt !== null) {
        throw new NotFoundError('Mục sản phẩm không tồn tại hoặc đã bị gỡ khỏi hệ thống')
      }

      // Kiểm tra tồn kho
      if (input.quantity > item.variant.stockQuantity) {
        throw new BadRequestError(`Số lượng vượt quá tồn kho hiện có (${item.variant.stockQuantity})`)
      }

      // Nếu số lượng = 0 thì xóa khỏi giỏ
      if (input.quantity === 0) {
        await tx.cartItem.delete({ where: { id: itemId } })
      } else {
        await tx.cartItem.update({
          where: { id: itemId },
          data: { quantity: input.quantity },
        })
      }

      return this.cartRepo.get(cart.id, tx)
    })
  }

  /**
   * Xóa sản phẩm khỏi giỏ hàng
   */
  async remove(userId: number | undefined, owner: CartOwner, itemId: number) {
    const cart = await this.ownerCart(userId, owner.sessionId)

    const result = await prisma.cartItem.deleteMany({
      where: { id: itemId, cartId: cart.id },
    })

    if (!result.count) {
      throw new NotFoundError('Mục sản phẩm không tồn tại trong giỏ hàng')
    }

    return this.cartRepo.get(cart.id)
  }
}
```

# src\modules\cart-order\cart-order.routes.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\cart-order\cart-order.routes.ts` |
| Size | 612 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:34:37.024409 |

```typescript
import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { cartRouter } from './cart/cart.routes'
import { orderRouter } from './order/order.routes'

export const cartOrderRouter = Router()

// Giới hạn 100 requests mỗi 15 phút cho cụm Cart-Order
const checkoutLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { statusCode: 429, message: 'Bạn đã gửi quá nhiều yêu cầu, vui lòng thử lại sau.' },
})

cartOrderRouter.use(checkoutLimiter)
cartOrderRouter.use('/cart', cartRouter)
cartOrderRouter.use('/orders', orderRouter)
```

# src\modules\cart-order\order\order.controller.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\cart-order\order\order.controller.ts` |
| Size | 3,712 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:34:37.035408 |

```typescript
import { NextFunction, Request, Response } from 'express'
import { BadRequestError, UnauthorizedError } from '@/common/errors'
import { createOrderSchema, listOrderSchema, updateOrderStatusSchema } from './order.schema'
import { OrderService } from './order.service'

/**
 * Lấy userId BẮT BUỘC từ Middleware Xác thực (Auth Middleware)
 */
const getRequiredUserId = (req: Request): number => {
  const userId = (req as any).user?.userId
  
  if (!userId || isNaN(Number(userId))) {
    throw new UnauthorizedError('Bạn cần đăng nhập để thực hiện thao tác này')
  }
  
  return Number(userId)
}

/**
 * Helper kiểm tra và ép kiểu orderId từ URL params
 */
const parseOrderId = (param: string): number => {
  const orderId = Number(param)
  if (isNaN(orderId) || orderId <= 0) {
    throw new BadRequestError('Mã đơn hàng (orderId) không hợp lệ')
  }
  return orderId
}

export class OrderController {
  constructor(private readonly service = new OrderService()) {}

  // Lấy danh sách đơn hàng của User
  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = getRequiredUserId(req)
      const parsed = listOrderSchema.safeParse(req.query)
      
      if (!parsed.success) {
        throw new BadRequestError(parsed.error.issues[0]?.message ?? 'Tham số truy vấn không hợp lệ')
      }

      const data = await this.service.list(userId, parsed.data)
      return res.status(200).json({ statusCode: 200, data })
    } catch (error) {
      next(error)
    }
  }

  // Xem chi tiết một đơn hàng
  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = getRequiredUserId(req)
      const orderId = parseOrderId(req.params.orderId)

      const data = await this.service.findById(userId, orderId)
      return res.status(200).json({ statusCode: 200, data })
    } catch (error) {
      next(error)
    }
  }

  // Tạo đơn hàng mới (Checkout)
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = getRequiredUserId(req)
      const parsed = createOrderSchema.safeParse(req.body)

      if (!parsed.success) {
        throw new BadRequestError(parsed.error.issues[0]?.message ?? 'Dữ liệu đặt hàng không hợp lệ')
      }

      const data = await this.service.create(userId, parsed.data)
      return res.status(201).json({ statusCode: 201, data })
    } catch (error) {
      next(error)
    }
  }

  // Khách hàng hủy đơn hàng
  cancel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = getRequiredUserId(req)
      const orderId = parseOrderId(req.params.orderId)

      const data = await this.service.cancel(userId, orderId)
      return res.status(200).json({ statusCode: 200, data })
    } catch (error) {
      next(error)
    }
  }

  // Cập nhật trạng thái đơn hàng (Dành cho Admin / System Manager)
  updateStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const adminId = getRequiredUserId(req)
      const orderId = parseOrderId(req.params.orderId)
      
      const parsed = updateOrderStatusSchema.safeParse(req.body)
      if (!parsed.success) {
        throw new BadRequestError(parsed.error.issues[0]?.message ?? 'Trạng thái đơn hàng không hợp lệ')
      }

      const data = await this.service.updateStatus(orderId, parsed.data, adminId)
      return res.status(200).json({ statusCode: 200, data })
    } catch (error) {
      next(error)
    }
  }
}
```

# src\modules\cart-order\order\order.repo.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\cart-order\order\order.repo.ts` |
| Size | 2,802 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:34:37.036411 |

```typescript
import { Prisma } from '@prisma/client'
import { prisma } from '@/database/prisma'
import { ListOrderInput } from './order.schema'

// Cấu hình include sẵn thông tin sản phẩm/biến thể cho OrderItem
const orderItemInclude = {
  orderItems: {
    include: {
      variant: {
        include: {
          product: {
            select: { id: true, name: true, thumbnail: true }
          },
          attributeValues: {
            include: { attribute: true }
          }
        }
      }
    }
  },
  shipment: true,
  paymentTransactions: true
} satisfies Prisma.OrderInclude

export class OrderRepo {
  /**
   * Lấy danh sách đơn hàng phân trang + lọc theo trạng thái
   */
  async list(userId: number, query: ListOrderInput) {
    const { page = 1, limit = 10, status } = query

    // Dựng điều kiện lọc động
    const where: Prisma.OrderWhereInput = {
      userId,
      deletedAt: null,
      ...(status ? { status } : {}),
    }

    const [totalItems, data] = await Promise.all([
      prisma.order.count({ where }),
      prisma.order.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: orderItemInclude,
      }),
    ])

    return {
      data,
      totalItems,
      page,
      limit,
      totalPages: Math.ceil(totalItems / limit) || 1,
    }
  }

  /**
   * Tìm đơn hàng theo ID (Cho phép truyền Transaction Client nếu nằm trong Transaction)
   */
  async findById(
    id: number,
    userId?: number,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.order.findFirst({
      where: {
        id,
        deletedAt: null,
        ...(userId ? { userId } : {}),
      },
      include: orderItemInclude,
    })
  }

  /**
   * Tạo đơn hàng mới trong Transaction
   */
  async create(data: Prisma.OrderCreateInput, tx: Prisma.TransactionClient) {
    return tx.order.create({
      data,
      include: orderItemInclude,
    })
  }

  /**
   * BỔ SUNG: Cập nhật trạng thái đơn hàng
   */
  async updateStatus(
    id: number,
    status: string,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.order.update({
      where: { id },
      data: { status },
      include: orderItemInclude,
    })
  }

  /**
   * BỔ SUNG: Cập nhật thông tin đơn hàng tổng quát (Hủy đơn, cập nhật thanh toán...)
   */
  async update(
    id: number,
    data: Prisma.OrderUpdateInput,
    db: Prisma.TransactionClient | typeof prisma = prisma
  ) {
    return db.order.update({
      where: { id },
      data,
      include: orderItemInclude,
    })
  }
}
```

# src\modules\cart-order\order\order.routes.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\cart-order\order\order.routes.ts` |
| Size | 961 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:34:37.038413 |

```typescript
import { Router } from 'express'
import { OrderController } from './order.controller'
import { requireAuth, requireAdmin } from '@/common/middlewares/auth.middleware'

export const orderRouter = Router()
const controller = new OrderController()

// Tất cả các API Đơn hàng đều bắt buộc người dùng phải đăng nhập
orderRouter.use(requireAuth)

// 1. Lấy danh sách đơn hàng của người dùng hiện tại
orderRouter.get('/', controller.list)

// 2. Tạo đơn hàng mới (Checkout)
orderRouter.post('/', controller.create)

// 3. Xem chi tiết 1 đơn hàng
orderRouter.get('/:orderId', controller.findById)

// 4. Khách hàng tự hủy đơn hàng (khi đơn còn ở trạng thái Chờ xử lý)
orderRouter.post('/:orderId/cancel', controller.cancel)

// 5. Cập nhật trạng thái đơn hàng (CHỈ DÀNH CHO ADMIN)
orderRouter.patch('/:orderId/status', requireAdmin, controller.updateStatus)
```

# src\modules\cart-order\order\order.schema.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\cart-order\order\order.schema.ts` |
| Size | 3,319 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:34:37.040409 |

```typescript
import { z } from 'zod'

// Schema kiểm tra địa chỉ người nhận
const addressSchema = z.object({
  receiverName: z
    .string({ required_error: 'Vui lòng nhập tên người nhận' })
    .trim()
    .min(1, 'Tên người nhận không được để trống')
    .max(255, 'Tên người nhận quá dài'),
  receiverPhone: z
    .string({ required_error: 'Vui lòng nhập số điện thoại' })
    .trim()
    .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Số điện thoại không đúng định dạng Việt Nam'),
  province: z.string().trim().min(1, 'Vui lòng chọn Tỉnh/Thành phố').max(150),
  district: z.string().trim().min(1, 'Vui lòng chọn Quận/Huyện').max(150),
  ward: z.string().trim().min(1, 'Vui lòng chọn Phường/Xã').max(150),
  detailAddress: z.string().trim().min(1, 'Vui lòng nhập địa chỉ chi tiết').max(500),
})

// Các trạng thái đơn hàng hợp lệ
export const ORDER_STATUS = [
  'PENDING_PAYMENT',
  'CONFIRMED',
  'PROCESSING',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED',
  'RETURNED',
] as const

// 1. Schema Tạo đơn hàng (Checkout)
export const createOrderSchema = z
  .object({
    // Danh sách ID các sản phẩm trong giỏ muốn thanh toán (Nếu rỗng thì checkout toàn bộ giỏ)
    cartItemIds: z.array(z.coerce.number().int().positive()).min(1, 'Danh sách chọn thanh toán không hợp lệ').optional(),
    
    // Địa chỉ giao hàng (Chọn ID có sẵn HOẶC nhập địa chỉ mới)
    shippingAddressId: z.coerce.number().int().positive().optional(),
    shippingAddress: addressSchema.optional(),

    paymentMethod: z.enum(['COD', 'VNPAY', 'MOMO', 'BANK_TRANSFER'], {
      errorMap: () => ({ message: 'Phương thức thanh toán không hợp lệ' }),
    }),
    shippingMethod: z.string().trim().min(1).max(50).default('STANDARD'),
    customerNote: z.string().trim().max(5000, 'Ghi chú không được quá 5000 ký tự').optional(),
    voucherCode: z.string().trim().max(100).optional(),
    
    // LƯU Ý: Đã LOẠI BỎ shippingFee khỏi Schema để tránh việc Client tự gửi giá ship lên.
  })
  .refine((data) => data.shippingAddressId || data.shippingAddress, {
    message: 'Vui lòng chọn địa chỉ có sẵn hoặc nhập địa chỉ giao hàng mới',
    path: ['shippingAddress'], // Chỉ định hiển thị lỗi tại vị trí trường shippingAddress
  })

// 2. Schema Lấy danh sách đơn hàng (Đã BỔ SUNG lọc theo status)
export const listOrderSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  status: z.enum(ORDER_STATUS).optional(), // Bổ sung bộ lọc trạng thái đơn
})

// 3. Schema Cập nhật trạng thái đơn hàng (Dành cho Admin)
export const updateOrderStatusSchema = z.object({
  status: z.enum(ORDER_STATUS, {
    errorMap: () => ({ message: 'Trạng thái đơn hàng không hợp lệ' }),
  }),
})

// Infer các Types cho TypeScript
export type CreateOrderInput = z.infer<typeof createOrderSchema>
export type ListOrderInput = z.infer<typeof listOrderSchema>
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>
```

# src\modules\cart-order\order\order.service.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\cart-order\order\order.service.ts` |
| Size | 8,364 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:34:37.041409 |

```typescript
import { randomBytes } from 'node:crypto'
import { OrderStatus, Prisma } from '@prisma/client'
import { prisma } from '@/database/prisma'
import { BadRequestError, ForbiddenError, NotFoundError } from '@/common/errors'
import { CartRepo } from '../cart/cart.repo'
import { CreateOrderInput, ListOrderInput, UpdateOrderStatusInput } from './order.schema'
import { OrderRepo } from './order.repo'

const orderInclude = { 
  orderItems: true, 
  shipment: true, 
  paymentTransactions: true 
} satisfies Prisma.OrderInclude

export class OrderService {
  constructor(
    private readonly orderRepo = new OrderRepo(), 
    private readonly cartRepo = new CartRepo()
  ) {}

  /**
   * Helper tạo mã đơn hàng ngắn gọn (Ví dụ: ORD-20260928-A1B2)
   */
  private generateOrderCode(): string {
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '')
    const randomStr = randomBytes(2).toString('hex').toUpperCase()
    return `ORD-${dateStr}-${randomStr}`
  }

  async list(userId: number, query: ListOrderInput) { 
    return this.orderRepo.list(userId, query) 
  }

  async findById(userId: number, orderId: number) {
    const order = await this.orderRepo.findById(orderId, userId)
    if (!order) throw new NotFoundError('Đơn hàng không tồn tại')
    return order
  }

  /**
   * Tạo đơn hàng mới (Checkout)
   */
  async create(userId: number, input: CreateOrderInput) {
    return prisma.$transaction(async (tx) => {
      // 1. Kiểm tra giỏ hàng
      const cart = await this.cartRepo.findByOwner(userId, undefined, tx)
      if (!cart || !cart.cartItems.length) {
        throw new BadRequestError('Giỏ hàng của bạn đang trống')
      }

      // Lọc các item được chọn thanh toán
      const items = cart.cartItems.filter(
        (item) => !input.cartItemIds || input.cartItemIds.includes(item.id)
      )
      if (!items.length) {
        throw new BadRequestError('Không có sản phẩm nào được chọn để đặt hàng')
      }

      // 2. Lấy thông tin địa chỉ giao hàng
      const address = input.shippingAddressId
        ? await tx.shippingAddress.findFirst({ where: { id: input.shippingAddressId, userId } })
        : input.shippingAddress

      if (!address) throw new BadRequestError('Địa chỉ giao hàng không hợp lệ')
      
      const receiverPhone = 'phoneNumber' in address ? address.phoneNumber : address.receiverPhone

      // 3. Tính toán tổng tiền & Kiểm tra tồn kho
      let subTotal = 0
      const orderItems: Prisma.OrderItemCreateWithoutOrderInput[] = []

      for (const item of items) {
        const variant = await tx.productVariant.findFirst({
          where: { id: item.variantId, deletedAt: null },
          include: { product: true, attributeValues: true },
        })

        if (!variant) {
          throw new NotFoundError(`Sản phẩm trong giỏ không còn tồn tại hoặc đã bị gỡ`)
        }

        // Tối ưu trừ tồn kho chống Race Condition
        const updated = await tx.productVariant.updateMany({
          where: { id: variant.id, stockQuantity: { gte: item.quantity } },
          data: { stockQuantity: { decrement: item.quantity } },
        })

        if (!updated.count) {
          throw new BadRequestError(`Sản phẩm "${variant.product.defaultName}" không đủ tồn kho`)
        }

        const unitPrice = Number(variant.sellingPrice)
        subTotal += unitPrice * item.quantity

        // Snapshot thông tin sản phẩm tại thời điểm mua
        orderItems.push({
          productName: variant.product.defaultName,
          skuCode: variant.sku,
          variantValue: variant.attributeValues.map((v) => v.value).join(', '),
          productImageUrl: variant.imageUrl ?? variant.product.thumbnailUrl,
          unitPrice,
          quantity: item.quantity,
          variant: { connect: { id: variant.id } },
        })

        // Ghi log xuất kho
        await tx.inventoryLog.create({
          data: {
            variantId: variant.id,
            transType: 'EXPORT_ORDER',
            quantityChange: -item.quantity,
            note: 'Xuất kho khi tạo đơn hàng',
          },
        })
      }

      // 4. Tính toán Phí ship & Khuyến mãi (Tạm thời để 0đ nếu chưa tích hợp đơn vị vận chuyển/voucher)
      const shippingFee = 0 
      const discountAmount = 0 
      const totalAmount = subTotal + shippingFee - discountAmount

      // 5. Tạo Đơn hàng
      const order = await this.orderRepo.create(
        {
          orderCode: this.generateOrderCode(),
          user: { connect: { id: userId } },
          receiverName: address.receiverName,
          receiverPhone,
          province: address.province,
          district: address.district,
          ward: address.ward,
          detailAddress: address.detailAddress,
          subTotal,
          shippingFee,
          totalAmount,
          voucherCode: input.voucherCode,
          paymentMethod: input.paymentMethod,
          shippingMethod: input.shippingMethod,
          customerNote: input.customerNote,
          orderItems: { create: orderItems },
        },
        tx
      )

      // 6. Xóa các món đã checkout khỏi giỏ hàng
      await tx.cartItem.deleteMany({
        where: { id: { in: items.map((i) => i.id) } },
      })

      return order
    })
  }

  /**
   * Cập nhật trạng thái đơn hàng (Dành cho Admin)
   */
  async updateStatus(orderId: number, input: UpdateOrderStatusInput, updatedById?: number) {
    return prisma.$transaction(async (tx) => {
      const order = await this.orderRepo.findById(orderId, undefined, tx)
      if (!order) throw new NotFoundError('Đơn hàng không tồn tại')

      if (order.status === OrderStatus.CANCELLED || order.status === OrderStatus.DELIVERED) {
        throw new BadRequestError('Không thể thay đổi trạng thái đơn hàng đã kết thúc')
      }

      // Nếu Admin chọn hủy đơn -> Thực hiện hoàn kho mà không bị giới hạn trạng thái như Khách hàng
      if (input.status === OrderStatus.CANCELLED) {
        return this.processOrderCancellation(order, updatedById, tx)
      }

      return tx.order.update({
        where: { id: orderId },
        data: { status: input.status, updatedById },
        include: orderInclude,
      })
    })
  }

  /**
   * Khách hàng tự hủy đơn hàng
   */
  async cancel(userId: number, orderId: number) {
    return prisma.$transaction(async (tx) => {
      const order = await tx.order.findFirst({
        where: { id: orderId, userId, deletedAt: null },
        include: { orderItems: true },
      })

      if (!order) throw new NotFoundError('Đơn hàng không tồn tại')

      // Khách hàng chỉ được phép hủy khi đơn chưa đi vào giai đoạn đóng gói / giao hàng
      if (!['PENDING_PAYMENT', 'CONFIRMED'].includes(order.status)) {
        throw new ForbiddenError('Đơn hàng đã được xử lý hoặc đang giao, bạn không thể tự hủy')
      }

      return this.processOrderCancellation(order, userId, tx)
    })
  }

  /**
   * Helper dùng chung cho logic Hoàn kho khi Hủy đơn
   */
  private async processOrderCancellation(
    order: any, 
    updatedById: number | undefined, 
    tx: Prisma.TransactionClient
  ) {
    for (const item of order.orderItems) {
      if (!item.variantId) continue

      // Hoàn lại số lượng tồn kho
      await tx.productVariant.update({
        where: { id: item.variantId },
        data: { stockQuantity: { increment: item.quantity } },
      })

      // Ghi log nhập kho lại
      await tx.inventoryLog.create({
        data: {
          variantId: item.variantId,
          transType: 'RETURN_INBOUND',
          quantityChange: item.quantity,
          note: `Hoàn kho do hủy đơn ${order.orderCode}`,
        },
      })
    }

    return tx.order.update({
      where: { id: order.id },
      data: { status: OrderStatus.CANCELLED, updatedById },
      include: orderInclude,
    })
  }
}
```

# src\modules\catalog\brand\brand.controller.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\catalog\brand\brand.controller.ts` |
| Size | 2,671 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:09:17.249573 |

```typescript
import { Request, Response, NextFunction } from 'express'
import { BrandService } from './brand.service'

export class BrandController {
  constructor(private brandService = new BrandService()) {}

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const lang = String(req.query.lang || req.headers['accept-language'] || 'vi')
      const result = await this.brandService.list(req.query as any, lang)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const brandId = Number(req.params.brandId)
      const lang = String(req.query.lang || req.headers['accept-language'] || 'vi')
      const data = await this.brandService.findById(brandId, lang)
      return res.status(200).json({ statusCode: 200, data })
    } catch (err) {
      next(err)
    }
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.userId ?? 1
      const data = await this.brandService.create(userId, req.body)
      return res.status(201).json({ statusCode: 201, message: 'Tạo thương hiệu thành công', data })
    } catch (err) {
      next(err)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.userId ?? 1
      const brandId = Number(req.params.brandId)
      const data = await this.brandService.update({ updateById: userId, id: brandId, data: req.body })
      return res.status(200).json({ statusCode: 200, message: 'Cập nhật thành công', data })
    } catch (err) {
      next(err)
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.userId ?? 1
      const brandId = Number(req.params.brandId)
      const result = await this.brandService.delete(userId, brandId)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  upsertTranslation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.userId ?? 1
      const brandId = Number(req.params.brandId)
      const languageId = req.params.languageId
      const data = await this.brandService.upsertTranslation({
        brandId,
        languageId,
        userId,
        data: req.body,
      })
      return res.status(200).json({ statusCode: 200, message: 'Cập nhật bản dịch thành công', data })
    } catch (err) {
      next(err)
    }
  }
}
```

# src\modules\catalog\brand\brand.repo.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\catalog\brand\brand.repo.ts` |
| Size | 3,283 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:09:17.250573 |

```typescript
import { prisma } from '@/database/prisma'
import {
  CreateBrandBodyType,
  GetBrandQueryType,
  UpdateBrandBodyType,
  UpsertBrandTranslationType,
} from './brand.schema'
import { ALL_LANGUAGE_CODE } from '@/common/helpers'


export class BrandRepo {
  async list(pagination: GetBrandQueryType, languageId?: string) {
    const skip = (pagination.page - 1) * pagination.limit
    const take = pagination.limit

    const [totalItems, data] = await Promise.all([
      prisma.brand.count({
        where: { deletedAt: null },
      }),
      prisma.brand.findMany({
        where: { deletedAt: null },
        skip,
        take,
        include: {
          translations: {
            where:
              languageId === ALL_LANGUAGE_CODE
                ? { deletedAt: null }
                : { deletedAt: null, languageId },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
    ])

    return {
      data,
      totalItems,
      page: pagination.page,
      limit: pagination.limit,
      totalPages: Math.ceil(totalItems / pagination.limit),
    }
  }

  async findById(brandId: number, languageId?: string) {
    return prisma.brand.findUnique({
      where: { id: brandId, deletedAt: null },
      include: {
        translations: {
          where:
            languageId === ALL_LANGUAGE_CODE
              ? { deletedAt: null }
              : { deletedAt: null, languageId },
          include: { language: true },
        },
      },
    })
  }

  async create({ createdById, data }: { createdById: number; data: CreateBrandBodyType }) {
    return prisma.brand.create({
      data: {
        ...data,
        createdById,
      },
    })
  }

  async update({
    updateById,
    id,
    data,
  }: {
    updateById: number
    id: number
    data: UpdateBrandBodyType
  }) {
    return prisma.brand.update({
      where: { id, deletedAt: null },
      data: {
        ...data,
        updatedById: updateById,
      },
    })
  }

  // Xóa mềm chuẩn lưu vết deletedById và cờ isHard từ project mẫu
  async delete({
    deleteById,
    id,
    isHard = false,
  }: {
    deleteById: number
    id: number
    isHard?: boolean
  }) {
    return isHard
      ? prisma.brand.delete({
          where: { id },
        })
      : prisma.brand.update({
          where: { id, deletedAt: null },
          data: {
            deletedById: deleteById,
            deletedAt: new Date(),
          },
        })
  }

  async upsertTranslation({
    brandId,
    languageId,
    userId,
    data,
  }: {
    brandId: number
    languageId: string
    userId: number
    data: UpsertBrandTranslationType
  }) {
    const existing = await prisma.brandTranslation.findFirst({
      where: { brandId, languageId, deletedAt: null },
    })

    if (existing) {
      return prisma.brandTranslation.update({
        where: { id: existing.id },
        data: {
          ...data,
          updatedById: userId,
        },
      })
    }

    return prisma.brandTranslation.create({
      data: {
        ...data,
        brandId,
        languageId,
        createdById: userId,
      },
    })
  }
}
```

# src\modules\catalog\brand\brand.routes.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\catalog\brand\brand.routes.ts` |
| Size | 1,351 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:03.969589 |

```typescript
import { Router } from "express";
import { BrandController } from "./brand.controller";

import {
  getBrandQuerySchema,
  getBrandParamsSchema,
  createBrandBodySchema,
  updateBrandBodySchema,
  upsertBrandTranslationSchema,
} from "./brand.schema";
import { z } from "zod";
import { validateRequest } from "@/middlewares/pipes/validate.pipe";

export const brandRouter = Router();
const controller = new BrandController();

// Gắn validator để Zod tự điền page=1, limit=10
brandRouter.get(
  "/",
  validateRequest({ query: getBrandQuerySchema }),
  controller.list,
);

brandRouter.get(
  "/:brandId",
  validateRequest({ params: getBrandParamsSchema }),
  controller.findById,
);

brandRouter.post(
  "/",
  validateRequest({ body: createBrandBodySchema }),
  controller.create,
);

brandRouter.put(
  "/:brandId",
  validateRequest({
    params: getBrandParamsSchema,
    body: updateBrandBodySchema,
  }),
  controller.update,
);

brandRouter.delete(
  "/:brandId",
  validateRequest({ params: getBrandParamsSchema }),
  controller.delete,
);

brandRouter.put(
  "/:brandId/translations/:languageId",
  validateRequest({
    params: getBrandParamsSchema.extend({ languageId: z.string().min(2) }),
    body: upsertBrandTranslationSchema,
  }),
  controller.upsertTranslation,
);
```

# src\modules\catalog\brand\brand.schema.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\catalog\brand\brand.schema.ts` |
| Size | 1,995 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:03.971574 |

```typescript
import { z } from 'zod'

export const brandSchema = z.object({
  id: z.number(),
  name: z.string().max(500),
  logo: z.string().max(1000),
  createdById: z.number().nullable(),
  updatedById: z.number().nullable(),
  deletedById: z.number().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
})

export const brandTranslationSchema = z.object({
  id: z.number(),
  brandId: z.number(),
  languageId: z.string().max(10),
  name: z.string().max(500),
  description: z.string().nullable().optional(),
  createdById: z.number().nullable(),
  updatedById: z.number().nullable(),
  deletedById: z.number().nullable(),
})

// Query phân trang & ngôn ngữ chuẩn từ project gốc
export const getBrandQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(10),
  lang: z.string().optional().default('vi'),
})

export const getBrandParamsSchema = z.object({
  brandId: z.coerce.number().int().positive('brandId phải là số nguyên dương'),
})

export const createBrandBodySchema = z.object({
  defaultName: z.string().min(1, 'Tên thương hiệu không được để trống').max(500),
  logo: z.string().min(1, 'Logo URL không được để trống').max(1000).optional()
})

export const updateBrandBodySchema = createBrandBodySchema.partial()

// Schema cập nhật Translation
export const upsertBrandTranslationSchema = z.object({
  name: z.string().min(1, 'Tên bản dịch không được để trống').max(500),
  description: z.string().optional(),
})

export type BrandType = z.infer<typeof brandSchema>
export type GetBrandQueryType = z.infer<typeof getBrandQuerySchema>
export type CreateBrandBodyType = z.infer<typeof createBrandBodySchema>
export type UpdateBrandBodyType = z.infer<typeof updateBrandBodySchema>
export type UpsertBrandTranslationType = z.infer<typeof upsertBrandTranslationSchema>
```

# src\modules\catalog\brand\brand.service.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\catalog\brand\brand.service.ts` |
| Size | 2,702 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:09:17.253572 |

```typescript
import { BrandRepo } from './brand.repo'
import {
  CreateBrandBodyType,
  GetBrandQueryType,
  UpdateBrandBodyType,
  UpsertBrandTranslationType,
} from './brand.schema'

import { AppError, isNotFoundPrismaError, isUniqueConstraintPrismaError } from '@/common/errors'

export class BrandService {
  constructor(private brandRepo = new BrandRepo()) {}

  async list(query: GetBrandQueryType, languageId: string) {
    return this.brandRepo.list(query, languageId)
  }

  async findById(id: number, languageId: string) {
    const brand = await this.brandRepo.findById(id, languageId)
    if (!brand) {
      throw new AppError('Thương hiệu không tồn tại hoặc đã bị xóa', 404)
    }
    return brand
  }

  async create(createdById: number, data: CreateBrandBodyType) {
    try {
      return await this.brandRepo.create({ createdById, data })
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw new AppError('Tên thương hiệu đã tồn tại', 422)
      }
      throw error
    }
  }

  async update({
    updateById,
    id,
    data,
  }: {
    updateById: number
    id: number
    data: UpdateBrandBodyType
  }) {
    try {
      const brand = await this.brandRepo.findById(id)
      if (!brand) {
        throw new AppError('Bản ghi không tồn tại để cập nhật', 404)
      }
      return await this.brandRepo.update({ updateById, id, data })
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw new AppError('Tên thương hiệu đã tồn tại', 422)
      }
      if (isNotFoundPrismaError(error)) {
        throw new AppError('Bản ghi không tồn tại', 404)
      }
      throw error
    }
  }

  // Soft delete lưu vết deletedById như dự án gốc
  async delete(deleteById: number, id: number) {
    try {
      const brand = await this.brandRepo.findById(id)
      if (!brand) {
        throw new AppError('Bản ghi không tồn tại để xóa', 404)
      }
      await this.brandRepo.delete({ deleteById, id, isHard: false })
      return { message: 'Xóa thương hiệu thành công' }
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw new AppError('Bản ghi không tồn tại', 404)
      }
      throw error
    }
  }

  async upsertTranslation({
    brandId,
    languageId,
    userId,
    data,
  }: {
    brandId: number
    languageId: string
    userId: number
    data: UpsertBrandTranslationType
  }) {
    await this.findById(brandId, languageId)
    return this.brandRepo.upsertTranslation({ brandId, languageId, userId, data })
  }
}
```

# src\modules\catalog\catalog.routes.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\catalog\catalog.routes.ts` |
| Size | 531 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:09:17.255574 |

```typescript
import { Router } from 'express'
import { categoryRouter } from './category/category.routes'
import { brandRouter } from './brand/brand.routes'
import { productRouter } from './product/product.routes'
import { variantAttributeRouter } from './variant-attribute/variant-attribute.routes'

export const catalogRouter = Router()

catalogRouter.use('/categories', categoryRouter)
catalogRouter.use('/brands', brandRouter)
catalogRouter.use('/products', productRouter)
catalogRouter.use('/variants', variantAttributeRouter)

```

# src\modules\catalog\category\category.controller.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\catalog\category\category.controller.ts` |
| Size | 2,702 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:09:17.256575 |

```typescript
import { Request, Response, NextFunction } from 'express'
import { CategoryService } from './category.service'

export class CategoryController {
  constructor(private categoryService = new CategoryService()) {}

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.categoryService.findAll(req.query as any)
      return res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryId = Number(req.params.categoryId)
      const lang = String(req.query.lang || req.headers['accept-language'] || 'vi')
      const data = await this.categoryService.findById(categoryId, lang)
      return res.status(200).json({ statusCode: 200, data })
    } catch (err) {
      next(err)
    }
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.userId ?? 1
      const data = await this.categoryService.create({ data: req.body, createdById: userId })
      return res.status(201).json({ statusCode: 201, message: 'Tạo danh mục thành công', data })
    } catch (err) {
      next(err)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.userId ?? 1
      const categoryId = Number(req.params.categoryId)
      const data = await this.categoryService.update({ id: categoryId, data: req.body, updatedById: userId })
      return res.status(200).json({ statusCode: 200, message: 'Cập nhật danh mục thành công', data })
    } catch (err) {
      next(err)
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.userId ?? 1
      const categoryId = Number(req.params.categoryId)
      const result = await this.categoryService.delete({ id: categoryId, deletedById: userId })
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  upsertTranslation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.userId ?? 1
      const categoryId = Number(req.params.categoryId)
      const languageId = req.params.languageId
      const data = await this.categoryService.upsertTranslation({
        categoryId,
        languageId,
        userId,
        data: req.body,
      })
      return res.status(200).json({ statusCode: 200, message: 'Cập nhật bản dịch thành công', data })
    } catch (err) {
      next(err)
    }
  }
}
```

# src\modules\catalog\category\category.repo.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\catalog\category\category.repo.ts` |
| Size | 3,230 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:09:17.258573 |

```typescript
import { prisma } from '@/database/prisma'
import {
  CreateCategoryBodyType,
  GetAllCategoriesQueryType,
  UpdateCategoryBodyType,
  UpsertCategoryTranslationType,
} from './category.schema'
import { ALL_LANGUAGE_CODE } from '@/common/helpers'

export class CategoryRepo {
  async findAll({
    parentCategoryId,
    languageId,
  }: {
    parentCategoryId?: number | null
    languageId?: string
  }) {
    const categories = await prisma.category.findMany({
      where: {
        deletedAt: null,
        parentId: parentCategoryId ?? null,
      },
      include: {
        translations: {
          where:
            languageId === ALL_LANGUAGE_CODE
              ? { deletedAt: null }
              : { deletedAt: null, languageId },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return {
      data: categories,
      totalItems: categories.length,
    }
  }

  async findById({ id, languageId }: { id: number; languageId?: string }) {
    return prisma.category.findUnique({
      where: { id, deletedAt: null },
      include: {
        translations: {
          where:
            languageId === ALL_LANGUAGE_CODE
              ? { deletedAt: null }
              : { deletedAt: null, languageId },
        },
      },
    })
  }

  async create({
    createdById,
    data,
  }: {
    createdById: number
    data: CreateCategoryBodyType
  }) {
    return prisma.category.create({
      data: {
        ...data,
        createdById,
      },
      include: {
        translations: { where: { deletedAt: null } },
      },
    })
  }

  async update({
    id,
    updatedById,
    data,
  }: {
    id: number
    updatedById: number
    data: UpdateCategoryBodyType
  }) {
    return prisma.category.update({
      where: { id, deletedAt: null },
      data: {
        ...data,
        updatedById,
      },
      include: {
        translations: { where: { deletedAt: null } },
      },
    })
  }

  // Soft delete lưu vết deletedById
  async delete({
    id,
    deletedById,
    isHard = false,
  }: {
    id: number
    deletedById: number
    isHard?: boolean
  }) {
    return isHard
      ? prisma.category.delete({
          where: { id },
        })
      : prisma.category.update({
          where: { id, deletedAt: null },
          data: {
            deletedAt: new Date(),
            deletedById,
          },
        })
  }

  async upsertTranslation({
    categoryId,
    languageId,
    userId,
    data,
  }: {
    categoryId: number
    languageId: string
    userId: number
    data: UpsertCategoryTranslationType
  }) {
    const existing = await prisma.categoryTranslation.findFirst({
      where: { categoryId, languageId, deletedAt: null },
    })

    if (existing) {
      return prisma.categoryTranslation.update({
        where: { id: existing.id },
        data: {
          ...data,
          updatedById: userId,
        },
      })
    }

    return prisma.categoryTranslation.create({
      data: {
        ...data,
        categoryId,
        languageId,
        createdById: userId,
      },
    })
  }
}
```

# src\modules\catalog\category\category.routes.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\catalog\category\category.routes.ts` |
| Size | 1,300 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:03.972565 |

```typescript
import { Router } from 'express'
import { CategoryController } from './category.controller'
import { validateRequest } from "@/middlewares/pipes/validate.pipe";
import {
  getAllCategoriesQuerySchema,
  getCategoryParamsSchema,
  createCategoryBodySchema,
  updateCategoryBodySchema,
  upsertCategoryTranslationSchema,
} from './category.schema'
import { z } from 'zod'

export const categoryRouter = Router()
const controller = new CategoryController()

categoryRouter.get('/', validateRequest({ query: getAllCategoriesQuerySchema }), controller.findAll)
categoryRouter.get('/:categoryId', validateRequest({ params: getCategoryParamsSchema }), controller.findById)
categoryRouter.post('/', validateRequest({ body: createCategoryBodySchema }), controller.create)
categoryRouter.put(
  '/:categoryId',
  validateRequest({ params: getCategoryParamsSchema, body: updateCategoryBodySchema }),
  controller.update,
)
categoryRouter.delete('/:categoryId', validateRequest({ params: getCategoryParamsSchema }), controller.delete)

categoryRouter.put(
  '/:categoryId/translations/:languageId',
  validateRequest({
    params: getCategoryParamsSchema.extend({ languageId: z.string().min(2) }),
    body: upsertCategoryTranslationSchema,
  }),
  controller.upsertTranslation,
)
```

# src\modules\catalog\category\category.schema.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\catalog\category\category.schema.ts` |
| Size | 1,241 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:09:17.260573 |

```typescript
import { z } from 'zod'

export const getAllCategoriesQuerySchema = z.object({
  parentCategoryId: z.coerce.number().int().positive().optional(),
  lang: z.string().optional().default('vi'),
})

export const getCategoryParamsSchema = z.object({
  categoryId: z.coerce.number().int().positive('categoryId phải là số nguyên dương'),
})

export const createCategoryBodySchema = z.object({
  defaultName: z.string().min(1, 'Tên danh mục không được để trống').max(500),
  logo: z.string().max(1000).optional().nullable(),
  parentCategoryId: z.coerce.number().int().positive().optional().nullable(),
})

export const updateCategoryBodySchema = createCategoryBodySchema.partial()

export const upsertCategoryTranslationSchema = z.object({
  name: z.string().min(1, 'Tên bản dịch không được để trống').max(500),
  description: z.string().optional(),
})

export type GetAllCategoriesQueryType = z.infer<typeof getAllCategoriesQuerySchema>
export type CreateCategoryBodyType = z.infer<typeof createCategoryBodySchema>
export type UpdateCategoryBodyType = z.infer<typeof updateCategoryBodySchema>
export type UpsertCategoryTranslationType = z.infer<typeof upsertCategoryTranslationSchema>
```

# src\modules\catalog\category\category.service.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\catalog\category\category.service.ts` |
| Size | 2,457 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:09:17.261574 |

```typescript
import { CategoryRepo } from './category.repo'
import {
  CreateCategoryBodyType,
  GetAllCategoriesQueryType,
  UpdateCategoryBodyType,
  UpsertCategoryTranslationType,
} from './category.schema'
import { AppError, isNotFoundPrismaError, isUniqueConstraintPrismaError } from '@/common/errors'

export class CategoryService {
  constructor(private categoryRepo = new CategoryRepo()) {}

  async findAll(query: GetAllCategoriesQueryType) {
    return this.categoryRepo.findAll({
      parentCategoryId: query.parentCategoryId,
      languageId: query.lang,
    })
  }

  async findById(id: number, languageId?: string) {
    const category = await this.categoryRepo.findById({ id, languageId })
    if (!category) {
      throw new AppError('Danh mục không tồn tại hoặc đã bị xóa', 404)
    }
    return category
  }

  async create({ data, createdById }: { data: CreateCategoryBodyType; createdById: number }) {
    try {
      return await this.categoryRepo.create({ createdById, data })
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw new AppError('Danh mục đã tồn tại', 422)
      }
      throw error
    }
  }

  async update({
    id,
    data,
    updatedById,
  }: {
    id: number
    data: UpdateCategoryBodyType
    updatedById: number
  }) {
    try {
      await this.findById(id)
      return await this.categoryRepo.update({ id, updatedById, data })
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw new AppError('Bản ghi không tồn tại để cập nhật', 404)
      }
      throw error
    }
  }

  async delete({ id, deletedById }: { id: number; deletedById: number }) {
    try {
      await this.findById(id)
      await this.categoryRepo.delete({ id, deletedById, isHard: false })
      return { message: 'Xóa danh mục thành công' }
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw new AppError('Bản ghi không tồn tại để xóa', 404)
      }
      throw error
    }
  }

  async upsertTranslation({
    categoryId,
    languageId,
    userId,
    data,
  }: {
    categoryId: number
    languageId: string
    userId: number
    data: UpsertCategoryTranslationType
  }) {
    await this.findById(categoryId, languageId)
    return this.categoryRepo.upsertTranslation({ categoryId, languageId, userId, data })
  }
}
```

# src\modules\catalog\language\language.controller.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\catalog\language\language.controller.ts` |
| Size | 1,874 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:09:17.262575 |

```typescript
import { Request, Response, NextFunction } from 'express'
import { LanguageService } from './language.service'

export class LanguageController {
  constructor(private languageService = new LanguageService()) {}

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.languageService.findAll()
      return res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.languageService.findById(req.params.languageId)
      return res.status(200).json({ statusCode: 200, data })
    } catch (err) {
      next(err)
    }
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.userId ?? 1
      const data = await this.languageService.create(userId, req.body)
      return res.status(201).json({ statusCode: 201, message: 'Tạo ngôn ngữ thành công', data })
    } catch (err) {
      next(err)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.userId ?? 1
      const data = await this.languageService.update({
        updateById: userId,
        id: req.params.languageId,
        data: req.body,
      })
      return res.status(200).json({ statusCode: 200, message: 'Cập nhật ngôn ngữ thành công', data })
    } catch (err) {
      next(err)
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.userId ?? 1
      const result = await this.languageService.delete(userId, req.params.languageId)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }
}
```

# src\modules\catalog\language\language.repo.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\catalog\language\language.repo.ts` |
| Size | 1,443 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:09:17.263575 |

```typescript
import { prisma } from '@/database/prisma'
import { CreateLanguageBodyType, UpdateLanguageBodyType } from './language.schema'

export class LanguageRepo {
  async findAll() {
    const data = await prisma.language.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'asc' },
    })
    return { data, totalItems: data.length }
  }

  async findById(id: string) {
    return prisma.language.findUnique({
      where: { id, deletedAt: null },
    })
  }

  async create({ createdById, data }: { createdById: number; data: CreateLanguageBodyType }) {
    return prisma.language.create({
      data: {
        ...data,
        createdById,
      },
    })
  }

  async update({
 
    id,
    data,
  }: {
    updateById: number
    id: string
    data: UpdateLanguageBodyType
  }) {
    return prisma.language.update({
      where: { id, deletedAt: null },
      data: {
        ...data
        
      },
    })
  }

  async delete({
   
    id,
    isHard = true, // Vì mã string dùng làm FK nên dự án gốc cho phép xóa cứng nếu cần
  }: {
    deleteById: number
    id: string
    isHard?: boolean
  }) {
    return isHard
      ? prisma.language.delete({ where: { id } })
      : prisma.language.update({
          where: { id, deletedAt: null },
          data: {
            
            deletedAt: new Date(),
          },
        })
  }
}
```

# src\modules\catalog\language\language.routes.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\catalog\language\language.routes.ts` |
| Size | 887 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:03.974564 |

```typescript


import { Router } from 'express'
import { LanguageController } from './language.controller'
import { validateRequest } from "@/middlewares/pipes/validate.pipe";
import {
  languageParamsSchema,
  createLanguageBodySchema,
  updateLanguageBodySchema,
} from './language.schema'

export const languageRouter = Router()
const controller = new LanguageController()

languageRouter.get('/', controller.findAll)
languageRouter.get('/:languageId', validateRequest({ params: languageParamsSchema }), controller.findById)
languageRouter.post('/', validateRequest({ body: createLanguageBodySchema }), controller.create)
languageRouter.put(
  '/:languageId',
  validateRequest({ params: languageParamsSchema, body: updateLanguageBodySchema }),
  controller.update,
)
languageRouter.delete('/:languageId', validateRequest({ params: languageParamsSchema }), controller.delete)
```

# src\modules\catalog\language\language.schema.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\catalog\language\language.schema.ts` |
| Size | 537 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:09:17.266577 |

```typescript
import { z } from 'zod'

export const languageParamsSchema = z.object({
  languageId: z.string().max(10, 'Mã ngôn ngữ tối đa 10 ký tự'),
})

export const createLanguageBodySchema = z.object({
  id: z.string().min(2).max(10),
  name: z.string().min(1).max(500),
})

export const updateLanguageBodySchema = z.object({
  name: z.string().min(1).max(500),
})

export type CreateLanguageBodyType = z.infer<typeof createLanguageBodySchema>
export type UpdateLanguageBodyType = z.infer<typeof updateLanguageBodySchema>
```

# src\modules\catalog\language\language.service.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\catalog\language\language.service.ts` |
| Size | 1,341 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:09:17.267576 |

```typescript
import { LanguageRepo } from './language.repo'
import { CreateLanguageBodyType, UpdateLanguageBodyType } from './language.schema'
import { AppError, isUniqueConstraintPrismaError } from '@/common/errors'


export class LanguageService {
  constructor(private languageRepo = new LanguageRepo()) {}

  async findAll() {
    return this.languageRepo.findAll()
  }

  async findById(id: string) {
    const language = await this.languageRepo.findById(id)
    if (!language) {
      throw new AppError('Ngôn ngữ không tồn tại', 404)
    }
    return language
  }

  async create(createdById: number, data: CreateLanguageBodyType) {
    try {
      return await this.languageRepo.create({ createdById, data })
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw new AppError('Mã ngôn ngữ đã tồn tại', 422)
      }
      throw error
    }
  }

  async update({ updateById, id, data }: { updateById: number; id: string; data: UpdateLanguageBodyType }) {
    await this.findById(id)
    return this.languageRepo.update({ updateById, id, data })
  }

  async delete(deleteById: number, id: string) {
    await this.findById(id)
    await this.languageRepo.delete({ deleteById, id, isHard: true })
    return { message: 'Xóa ngôn ngữ thành công' }
  }
}
```

# src\modules\catalog\product\product.controller.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\catalog\product\product.controller.ts` |
| Size | 2,776 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:03.975565 |

```typescript
import { Request, Response, NextFunction } from 'express'
import { ProductService } from './product.service'

export class ProductController {
  constructor(private productService = new ProductService()) {}

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const lang = String(req.query.lang || req.headers['accept-language'] || 'vi')
      const result = await this.productService.list(req.query as any, lang)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId = Number(req.params.productId)
      const lang = String(req.query.lang || req.headers['accept-language'] || 'vi')
      const data = await this.productService.findById(productId, lang)
      return res.status(200).json({ statusCode: 200, data })
    } catch (err) {
      next(err)
    }
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.userId ?? 1
      const data = await this.productService.create(userId, req.body)
      return res.status(201).json({ statusCode: 201, message: 'Tạo sản phẩm thành công', data })
    } catch (err) {
      next(err)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.userId ?? 1
      const productId = Number(req.params.productId)
      const data = await this.productService.update({
        id: productId,
        updatedById: userId,
        data: req.body,
      })
      return res.status(200).json({ statusCode: 200, message: 'Cập nhật sản phẩm thành công', data })
    } catch (err) {
      next(err)
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.userId ?? 1
      const productId = Number(req.params.productId)
      const result = await this.productService.delete(userId, productId)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  upsertTranslation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.userId ?? 1
      const productId = Number(req.params.productId)
      const languageId = req.params.languageId
      const data = await this.productService.upsertTranslation({
        productId,
        languageId,
        userId,
        data: req.body,
      })
      return res.status(200).json({ statusCode: 200, message: 'Cập nhật bản dịch sản phẩm thành công', data })
    } catch (err) {
      next(err)
    }
  }
}
```

# src\modules\catalog\product\product.repo.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\catalog\product\product.repo.ts` |
| Size | 4,923 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:03.976561 |

```typescript
import { prisma } from '@/database/prisma'
import {
  CreateProductBodyType,
  GetProductQueryType,
  UpdateProductBodyType,
  UpsertProductTranslationType,
} from './product.schema'
import { ALL_LANGUAGE_CODE } from '@/common/helpers'


export class ProductRepo {
  async list(query: GetProductQueryType, languageId: string) {
    const skip = (query.page - 1) * query.limit
    const take = query.limit

    const where: any = { deletedAt: null }
    if (query.status) where.status = query.status
    if (query.categoryId) where.categoryId = query.categoryId
    if (query.brandId) where.brandId = query.brandId
    if (query.search) {
      where.defaultName = { contains: query.search, mode: 'insensitive' }
    }

    const [totalItems, data] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        skip,
        take,
        include: {
          category: { select: { id: true, defaultName: true } },
          brand: { select: { id: true, defaultName: true, logoUrl: true } },
          tags: { select: { id: true, name: true } },
          images: { orderBy: { displayOrder: 'asc' } },
          translations: {
            where:
              languageId === ALL_LANGUAGE_CODE
                ? { deletedAt: null }
                : { deletedAt: null, languageId },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
    ])

    return {
      data,
      totalItems,
      page: query.page,
      limit: query.limit,
      totalPages: Math.ceil(totalItems / query.limit),
    }
  }

  async findById(productId: number, languageId?: string) {
    return prisma.product.findFirst({
      where: { id: productId, deletedAt: null },
      include: {
        category: true,
        brand: true,
        tags: true,
        images: { orderBy: { displayOrder: 'asc' } },
        variants: { where: { deletedAt: null } },
        translations: {
          where:
            languageId === ALL_LANGUAGE_CODE
              ? { deletedAt: null }
              : { deletedAt: null, languageId },
        },
      },
    })
  }

  async create({ createdById, data }: { createdById: number; data: CreateProductBodyType }) {
    const { images, tagIds, translations, ...rest } = data

    return prisma.product.create({
      data: {
        ...rest,
        createdById,
        images: images
          ? {
              create: images.map((url, index) => ({
                imageUrl: url,
                displayOrder: index,
              })),
            }
          : undefined,
        tags: tagIds
          ? {
              connect: tagIds.map((id) => ({ id })),
            }
          : undefined,
        translations: translations
          ? {
              create: translations.map((t) => ({
                ...t,
                createdById,
              })),
            }
          : undefined,
      },
      include: {
        images: true,
        tags: true,
        translations: true,
      },
    })
  }

  async update({
    id,
    updatedById,
    data,
  }: {
    id: number
    updatedById: number
    data: UpdateProductBodyType
  }) {
    const { images, tagIds, translations, ...rest } = data

    return prisma.product.update({
      where: { id, deletedAt: null },
      data: {
        ...rest,
        updatedById,
        ...(tagIds && {
          tags: {
            set: tagIds.map((tagId) => ({ id: tagId })),
          },
        }),
        ...(images && {
          images: {
            deleteMany: {},
            create: images.map((url, index) => ({
              imageUrl: url,
              displayOrder: index,
            })),
          },
        }),
      },
      include: {
        images: true,
        tags: true,
        translations: true,
      },
    })
  }

  async delete({ id, deletedById }: { id: number; deletedById: number }) {
    return prisma.product.update({
      where: { id, deletedAt: null },
      data: {
        deletedAt: new Date(),
        deletedById,
      },
    })
  }

  async upsertTranslation({
    productId,
    languageId,
    userId,
    data,
  }: {
    productId: number
    languageId: string
    userId: number
    data: UpsertProductTranslationType
  }) {
    const existing = await prisma.productTranslation.findFirst({
      where: { productId, languageId, deletedAt: null },
    })

    if (existing) {
      return prisma.productTranslation.update({
        where: { id: existing.id },
        data: {
          ...data,
          updatedById: userId,
        },
      })
    }

    return prisma.productTranslation.create({
      data: {
        ...data,
        productId,
        languageId,
        createdById: userId,
      },
    })
  }
}
```

# src\modules\catalog\product\product.routes.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\catalog\product\product.routes.ts` |
| Size | 1,244 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:03.978561 |

```typescript
import { Router } from 'express'
import { ProductController } from './product.controller'
import { validateRequest } from "@/middlewares/pipes/validate.pipe";
import {
  productParamsSchema,
  getProductQuerySchema,
  createProductBodySchema,
  updateProductBodySchema,
  upsertProductTranslationSchema,
} from './product.schema'
import { z } from 'zod'

export const productRouter = Router()
const controller = new ProductController()

productRouter.get('/', validateRequest({ query: getProductQuerySchema }), controller.list)
productRouter.get('/:productId', validateRequest({ params: productParamsSchema }), controller.findById)
productRouter.post('/', validateRequest({ body: createProductBodySchema }), controller.create)
productRouter.put(
  '/:productId',
  validateRequest({ params: productParamsSchema, body: updateProductBodySchema }),
  controller.update,
)
productRouter.delete('/:productId', validateRequest({ params: productParamsSchema }), controller.delete)

productRouter.put(
  '/:productId/translations/:languageId',
  validateRequest({
    params: productParamsSchema.extend({ languageId: z.string().min(2) }),
    body: upsertProductTranslationSchema,
  }),
  controller.upsertTranslation,
)
```

# src\modules\catalog\product\product.schema.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\catalog\product\product.schema.ts` |
| Size | 2,135 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:03.979562 |

```typescript
import { z } from 'zod'

export const productParamsSchema = z.object({
  productId: z.coerce.number().int().positive('productId phải là số nguyên dương'),
})

export const getProductQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(10),
  search: z.string().optional(),
  categoryId: z.coerce.number().int().positive().optional(),
  brandId: z.coerce.number().int().positive().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'OUT_OF_STOCK', 'ARCHIVED']).optional(),
  lang: z.string().optional().default('vi'),
})

export const createProductBodySchema = z.object({
  defaultName: z.string().min(1, 'Tên sản phẩm không được để trống').max(255),
  thumbnailUrl: z.string().url('Thumbnail URL không hợp lệ').optional().nullable(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'OUT_OF_STOCK', 'ARCHIVED']).default('DRAFT'),
  categoryId: z.number().int().positive('Danh mục là bắt buộc'),
  brandId: z.number().int().positive().optional().nullable(),
  images: z.array(z.string().url()).optional(),
  tagIds: z.array(z.number().int().positive()).optional(),
  translations: z
    .array(
      z.object({
        languageId: z.string().min(2),
        name: z.string().min(1),
        shortDesc: z.string().optional(),
        detailDesc: z.string().optional(),
      }),
    )
    .optional(),
})

export const updateProductBodySchema = createProductBodySchema.partial()

export const upsertProductTranslationSchema = z.object({
  name: z.string().min(1, 'Tên bản dịch không được để trống').max(255),
  shortDesc: z.string().optional(),
  detailDesc: z.string().optional(),
})

export type ProductParamsType = z.infer<typeof productParamsSchema>
export type GetProductQueryType = z.infer<typeof getProductQuerySchema>
export type CreateProductBodyType = z.infer<typeof createProductBodySchema>
export type UpdateProductBodyType = z.infer<typeof updateProductBodySchema>
export type UpsertProductTranslationType = z.infer<typeof upsertProductTranslationSchema>
```

# src\modules\catalog\product\product.service.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\catalog\product\product.service.ts` |
| Size | 2,318 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:03.980562 |

```typescript
import { ProductRepo } from './product.repo'
import {
  CreateProductBodyType,
  GetProductQueryType,
  UpdateProductBodyType,
  UpsertProductTranslationType,
} from './product.schema'
import { AppError, isNotFoundPrismaError, isUniqueConstraintPrismaError } from '@/common/errors'

export class ProductService {
  constructor(private productRepo = new ProductRepo()) {}

  async list(query: GetProductQueryType, languageId: string) {
    return this.productRepo.list(query, languageId)
  }

  async findById(productId: number, languageId?: string) {
    const product = await this.productRepo.findById(productId, languageId)
    if (!product) {
      throw new AppError('Sản phẩm không tồn tại hoặc đã bị xóa', 404)
    }
    return product
  }

  async create(createdById: number, data: CreateProductBodyType) {
    try {
      return await this.productRepo.create({ createdById, data })
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw new AppError('Tên sản phẩm bị trùng lặp', 422)
      }
      throw error
    }
  }

  async update({
    id,
    updatedById,
    data,
  }: {
    id: number
    updatedById: number
    data: UpdateProductBodyType
  }) {
    try {
      await this.findById(id)
      return await this.productRepo.update({ id, updatedById, data })
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw new AppError('Bản ghi không tồn tại để cập nhật', 404)
      }
      throw error
    }
  }

  async delete(deletedById: number, id: number) {
    try {
      await this.findById(id)
      await this.productRepo.delete({ id, deletedById })
      return { message: 'Xóa sản phẩm thành công' }
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw new AppError('Bản ghi không tồn tại để xóa', 404)
      }
      throw error
    }
  }

  async upsertTranslation({
    productId,
    languageId,
    userId,
    data,
  }: {
    productId: number
    languageId: string
    userId: number
    data: UpsertProductTranslationType
  }) {
    await this.findById(productId, languageId)
    return this.productRepo.upsertTranslation({ productId, languageId, userId, data })
  }
}
```

# src\modules\catalog\tag\tag.controller.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\catalog\tag\tag.controller.ts` |
| Size | 1,890 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:03.982566 |

```typescript
import { Request, Response, NextFunction } from 'express'
import { TagService } from './tag.service'

export class TagController {
  constructor(private tagService = new TagService()) {}

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.tagService.list(req.query as any)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tagId = Number(req.params.tagId)
      const data = await this.tagService.findById(tagId)
      return res.status(200).json({ statusCode: 200, data })
    } catch (err) {
      next(err)
    }
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.userId ?? 1
      const data = await this.tagService.create(userId, req.body)
      return res.status(201).json({ statusCode: 201, message: 'Tạo thẻ tag thành công', data })
    } catch (err) {
      next(err)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.userId ?? 1
      const tagId = Number(req.params.tagId)
      const data = await this.tagService.update({ id: tagId, updatedById: userId, data: req.body })
      return res.status(200).json({ statusCode: 200, message: 'Cập nhật thẻ tag thành công', data })
    } catch (err) {
      next(err)
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.userId ?? 1
      const tagId = Number(req.params.tagId)
      const result = await this.tagService.delete(userId, tagId)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }
}
```

# src\modules\catalog\tag\tag.repo.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\catalog\tag\tag.repo.ts` |
| Size | 1,666 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:03.983562 |

```typescript
import { prisma } from '@/database/prisma'
import { CreateTagBodyType, GetTagQueryType, UpdateTagBodyType } from './tag.schema'

export class TagRepo {
  async list(query: GetTagQueryType) {
    const skip = (query.page - 1) * query.limit
    const take = query.limit

    const where: any = { deletedAt: null }
    if (query.search) {
      where.name = { contains: query.search, mode: 'insensitive' }
    }

    const [totalItems, data] = await Promise.all([
      prisma.tag.count({ where }),
      prisma.tag.findMany({
        where,
        skip,
        take,
        orderBy: { id: 'desc' },
      }),
    ])

    return {
      data,
      totalItems,
      page: query.page,
      limit: query.limit,
      totalPages: Math.ceil(totalItems / query.limit),
    }
  }

  async findById(id: number) {
    return prisma.tag.findFirst({
      where: { id, deletedAt: null },
    })
  }

  async create({ createdById, data }: { createdById: number; data: CreateTagBodyType }) {
    return prisma.tag.create({
      data: {
        ...data,
        createdById,
      },
    })
  }

  async update({
    id,
    updatedById,
    data,
  }: {
    id: number
    updatedById: number
    data: UpdateTagBodyType
  }) {
    return prisma.tag.update({
      where: { id, deletedAt: null },
      data: {
        ...data,
        updatedById,
      },
    })
  }

  async delete({ id, deletedById }: { id: number; deletedById: number }) {
    return prisma.tag.update({
      where: { id, deletedAt: null },
      data: {
        deletedAt: new Date(),
        deletedById,
      },
    })
  }
}
```

# src\modules\catalog\tag\tag.routes.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\catalog\tag\tag.routes.ts` |
| Size | 844 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:03.985563 |

```typescript
import { Router } from 'express'
import { TagController } from './tag.controller'
import { validateRequest } from "@/middlewares/pipes/validate.pipe";
import {
  tagParamsSchema,
  getTagQuerySchema,
  createTagBodySchema,
  updateTagBodySchema,
} from './tag.schema'

export const tagRouter = Router()
const controller = new TagController()

tagRouter.get('/', validateRequest({ query: getTagQuerySchema }), controller.list)
tagRouter.get('/:tagId', validateRequest({ params: tagParamsSchema }), controller.findById)
tagRouter.post('/', validateRequest({ body: createTagBodySchema }), controller.create)
tagRouter.put(
  '/:tagId',
  validateRequest({ params: tagParamsSchema, body: updateTagBodySchema }),
  controller.update,
)
tagRouter.delete('/:tagId', validateRequest({ params: tagParamsSchema }), controller.delete)
```

# src\modules\catalog\tag\tag.schema.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\catalog\tag\tag.schema.ts` |
| Size | 812 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:03.986562 |

```typescript
import { z } from 'zod'

export const tagParamsSchema = z.object({
  tagId: z.coerce.number().int().positive('tagId phải là số nguyên dương'),
})

export const getTagQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(20),
  search: z.string().optional(),
})

export const createTagBodySchema = z.object({
  name: z.string().min(1, 'Tên tag không được để trống').max(100),
})

export const updateTagBodySchema = createTagBodySchema

export type TagParamsType = z.infer<typeof tagParamsSchema>
export type GetTagQueryType = z.infer<typeof getTagQuerySchema>
export type CreateTagBodyType = z.infer<typeof createTagBodySchema>
export type UpdateTagBodyType = z.infer<typeof updateTagBodySchema>
```

# src\modules\catalog\tag\tag.service.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\catalog\tag\tag.service.ts` |
| Size | 1,848 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:03.987561 |

```typescript
import { TagRepo } from './tag.repo'
import { CreateTagBodyType, GetTagQueryType, UpdateTagBodyType } from './tag.schema'
import { AppError, isNotFoundPrismaError, isUniqueConstraintPrismaError } from '@/common/errors'


export class TagService {
  constructor(private tagRepo = new TagRepo()) {}

  async list(query: GetTagQueryType) {
    return this.tagRepo.list(query)
  }

  async findById(id: number) {
    const tag = await this.tagRepo.findById(id)
    if (!tag) {
      throw new AppError('Thẻ Tag không tồn tại hoặc đã bị xóa', 404)
    }
    return tag
  }

  async create(createdById: number, data: CreateTagBodyType) {
    try {
      return await this.tagRepo.create({ createdById, data })
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw new AppError('Tên thẻ Tag đã tồn tại', 422)
      }
      throw error
    }
  }

  async update({ id, updatedById, data }: { id: number; updatedById: number; data: UpdateTagBodyType }) {
    try {
      await this.findById(id)
      return await this.tagRepo.update({ id, updatedById, data })
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw new AppError('Tên thẻ Tag đã tồn tại', 422)
      }
      if (isNotFoundPrismaError(error)) {
        throw new AppError('Bản ghi không tồn tại để cập nhật', 404)
      }
      throw error
    }
  }

  async delete(deletedById: number, id: number) {
    try {
      await this.findById(id)
      await this.tagRepo.delete({ id, deletedById })
      return { message: 'Xóa thẻ Tag thành công' }
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw new AppError('Bản ghi không tồn tại để xóa', 404)
      }
      throw error
    }
  }
}
```

# src\modules\catalog\variant-attribute\variant-attribute.controller.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\catalog\variant-attribute\variant-attribute.controller.ts` |
| Size | 1,986 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:03.989561 |

```typescript
import { Request, Response, NextFunction } from 'express'
import { VariantAttributeService } from './variant-attribute.service'

export class VariantAttributeController {
  constructor(private variantService = new VariantAttributeService()) {}

  getByProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId = Number(req.params.productId)
      const data = await this.variantService.getVariantsByProductId(productId)
      return res.status(200).json({
        statusCode: 200,
        message: 'Lấy danh sách biến thể sản phẩm thành công',
        data,
      })
    } catch (err) {
      next(err)
    }
  }

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const variantId = Number(req.params.variantId)
      const data = await this.variantService.getVariantById(variantId)
      return res.status(200).json({
        statusCode: 200,
        data,
      })
    } catch (err) {
      next(err)
    }
  }

  syncVariants = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.userId ?? 1
      const data = await this.variantService.syncProductVariants(req.body, userId)
      return res.status(200).json({
        statusCode: 200,
        message: 'Đồng bộ biến thể và ma trận thuộc tính thành công',
        data,
      })
    } catch (err) {
      next(err)
    }
  }

  updateStock = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const variantId = Number(req.params.variantId)
      const { quantityChange } = req.body
      const data = await this.variantService.updateStock(variantId, Number(quantityChange))
      return res.status(200).json({
        statusCode: 200,
        message: 'Cập nhật số lượng tồn kho thành công',
        data,
      })
    } catch (err) {
      next(err)
    }
  }
}
```

# src\modules\catalog\variant-attribute\variant-attribute.repo.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\catalog\variant-attribute\variant-attribute.repo.ts` |
| Size | 6,927 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:03.991562 |

```typescript
import { prisma } from '@/database/prisma'
import { SyncProductVariantsBodyType } from './variant-attribute.schema'
import { Decimal } from '@prisma/client/runtime/library'
import { Prisma } from '@prisma/client'
import { AppError } from '@/common/errors'

export class VariantAttributeRepo {
  async getByProductId(productId: number) {
    return prisma.productVariant.findMany({
      where: {
        productId,
        deletedAt: null,
      },
      include: {
        attributeValues: {
          include: {
            attribute: true,
          },
        },
      },
      orderBy: { id: 'asc' },
    })
  }

  async findById(variantId: number) {
    return prisma.productVariant.findFirst({
      where: { id: variantId, deletedAt: null },
      include: {
        attributeValues: {
          include: {
            attribute: true,
          },
        },
        product: true,
      },
    })
  }

  /**
   * Đồng bộ toàn bộ Ma trận Biến thể với PESSIMISTIC LOCK. như thêm/bớt màu sắc, size, đổi giá, đổi số lượng tồn kho
   */
  async syncVariants(data: SyncProductVariantsBodyType, updatedById: number) {
    const { productId, attributes, variants } = data

    return prisma.$transaction(async (tx) => {
      // 1. KHÓA BI QUAN (PESSIMISTIC LOCK): Khóa dòng Product để ngăn tiến trình khác cùng lúc sửa variant của Product này
      await tx.$queryRaw`SELECT id FROM "Product" WHERE id = ${productId} FOR UPDATE`

      // 2. Tạo hoặc lấy Attribute và AttributeValue
      const attrValueIdMap = new Map<string, number>()

      for (const attr of attributes) {
        const attributeRecord = await tx.attribute.upsert({
          where: { name: attr.name },
          update: {},
          create: { name: attr.name },
        })

        for (const opt of attr.options) {
          const valRecord = await tx.attributeValue.upsert({
            where: {
              attributeId_value: {
                attributeId: attributeRecord.id,
                value: opt,
              },
            },
            update: {},
            create: {
              attributeId: attributeRecord.id,
              value: opt,
            },
          })
          attrValueIdMap.set(`${attr.name}:${opt}`, valRecord.id)
        }
      }

      // 3. Khóa và lấy danh sách SKU hiện có trong Database
      const existingVariants = await tx.productVariant.findMany({
        where: { productId, deletedAt: null },
        include: { attributeValues: true },
      })

      const existingVariantIds = existingVariants.map((v) => v.id)
      if (existingVariantIds.length > 0) {
        // Khóa tất cả các dòng Variant hiện tại của sản phẩm này
        await tx.$queryRaw`SELECT id FROM "ProductVariant" WHERE id IN (${Prisma.join(existingVariantIds)}) FOR UPDATE`
      }

      // 4. Phân loại: Xóa mềm SKU bị loại bỏ khỏi ma trận
      const payloadSkus = new Set(variants.map((v) => v.sku))
      const variantsToSoftDelete = existingVariants.filter((ev) => !payloadSkus.has(ev.sku))
      const idsToDelete = variantsToSoftDelete.map((v) => v.id)

      if (idsToDelete.length > 0) {
        await tx.productVariant.updateMany({
          where: { id: { in: idsToDelete } },
          data: {
            deletedAt: new Date(),
          },
        })
      }

      // 5. Cập nhật SKU cũ hoặc Tạo mới SKU
      const finalVariants = []

      for (const item of variants) {
        const matchedExisting = existingVariants.find((ev) => ev.sku === item.sku)

        const connectAttrValueIds: { id: number }[] = []
        if (item.attributeValues && item.attributeValues.length > 0) {
          for (const av of item.attributeValues) {
            const id = attrValueIdMap.get(`${av.attributeName}:${av.value}`)
            if (id) connectAttrValueIds.push({ id })
          }
        }

        if (matchedExisting) {
          const updated = await tx.productVariant.update({
            where: { id: matchedExisting.id },
            data: {
              originalPrice: new Decimal(item.originalPrice),
              sellingPrice: new Decimal(item.sellingPrice),
              stockQuantity: item.stockQuantity,
              weightGram: item.weightGram,
              imageUrl: item.imageUrl,
              ...(connectAttrValueIds.length > 0 && {
                attributeValues: {
                  set: connectAttrValueIds,
                },
              }),
            },
          })
          finalVariants.push(updated)
        } else {
          const created = await tx.productVariant.create({
            data: {
              productId,
              sku: item.sku,
              originalPrice: new Decimal(item.originalPrice),
              sellingPrice: new Decimal(item.sellingPrice),
              stockQuantity: item.stockQuantity,
              weightGram: item.weightGram,
              imageUrl: item.imageUrl,
              attributeValues: {
                connect: connectAttrValueIds,
              },
            },
          })
          finalVariants.push(created)
        }
      }

      return finalVariants
    })
  }

  /**
   * Khấu trừ / Cộng kho dùng OPTIMISTIC LOCK (Khóa lạc quan) giống file order.repo.ts mẫu
   */
  async updateStockWithOptimistic(variantId: number, quantityChange: number) {
    return prisma.$transaction(async (tx) => {
      // 1. Đọc dữ liệu hiện tại
      const current = await tx.productVariant.findUnique({
        where: { id: variantId, deletedAt: null },
      })

      if (!current) {
        throw new AppError('Biến thể không tồn tại', 404)
      }

      // 2. Kiểm tra nếu là trừ kho thì số lượng còn đủ không
      if (quantityChange < 0 && current.stockQuantity < Math.abs(quantityChange)) {
        throw new AppError('Số lượng tồn kho không đủ để khấu trừ', 400)
      }

      // 3. Khóa lạc quan qua điều kiện updatedAt và stockQuantity
      try {
        return await tx.productVariant.update({
          where: {
            id: variantId,
            updatedAt: current.updatedAt, // Đảm bảo không bị sửa đổi giữa chừng
            ...(quantityChange < 0 && {
              stockQuantity: { gte: Math.abs(quantityChange) },
            }),
          },
          data: {
            stockQuantity: {
              increment: quantityChange,
            },
          },
        })
      } catch (err: any) {
        if (err.code === 'P2025') {
          throw new AppError('Xung đột phiên bản dữ liệu (Version Conflict). Vui lòng thử lại!', 409)
        }
        throw err
      }
    })
  }
}
```

# src\modules\catalog\variant-attribute\variant-attribute.routes.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\catalog\variant-attribute\variant-attribute.routes.ts` |
| Size | 1,413 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:03.992563 |

```typescript
import { Router } from 'express'
import { VariantAttributeController } from './variant-attribute.controller'
import { validateRequest } from "@/middlewares/pipes/validate.pipe";
import {
  syncProductVariantsBodySchema,
  variantIdParamSchema,
  getVariantsByProductParamSchema,
} from './variant-attribute.schema'
import { z } from 'zod'

export const variantAttributeRouter = Router()
const controller = new VariantAttributeController()

// GET /api/v1/catalog/variants/products/:productId -> Lấy danh sách variant theo Product
variantAttributeRouter.get(
  '/products/:productId',
  validateRequest({ params: getVariantsByProductParamSchema }),
  controller.getByProduct,
)

// GET /api/v1/catalog/variants/:variantId -> Lấy chi tiết 1 variant
variantAttributeRouter.get(
  '/:variantId',
  validateRequest({ params: variantIdParamSchema }),
  controller.getOne,
)

// POST /api/v1/catalog/variants/sync -> Đồng bộ ma trận biến thể
variantAttributeRouter.post(
  '/sync',
  validateRequest({ body: syncProductVariantsBodySchema }),
  controller.syncVariants,
)

// PATCH /api/v1/catalog/variants/:variantId/stock -> Cập nhật tồn kho nhanh
variantAttributeRouter.patch(
  '/:variantId/stock',
  validateRequest({
    params: variantIdParamSchema,
    body: z.object({ quantityChange: z.coerce.number().int() }),
  }),
  controller.updateStock,
)
```

# src\modules\catalog\variant-attribute\variant-attribute.schema.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\catalog\variant-attribute\variant-attribute.schema.ts` |
| Size | 3,492 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:03.994564 |

```typescript
import { z } from 'zod'

// Định dạng cấu trúc thuộc tính đầu vào để sinh biến thể
export const attributeOptionSchema = z.object({
  name: z.string().min(1, 'Tên thuộc tính không được để trống'), // ví dụ: "Màu sắc", "Kích cỡ"
  options: z.array(z.string().min(1)).min(1, 'Mỗi thuộc tính phải có ít nhất 1 giá trị lựa chọn'), // ví dụ: ["Đỏ", "Xanh"]
})



/**
 * Thuật toán sinh tổ hợp Cartesian (Được kế thừa từ file mẫu NestJS)
 */
export function generateVariantCombinations(attributes: AttributeOptionInput[]): string[] {
  if (!attributes || attributes.length === 0) return []
  return attributes
    .map((attr) => attr.options)
    .reduce((acc, curr) => acc.flatMap((x) => curr.map((y) => (x ? `${x}-${y}` : y))), [''])
}

// Schema chi tiết cho từng SKU biến thể
export const upsertVariantItemSchema = z.object({
  id: z.number().int().positive().optional().nullable(), // ID hiện tại nếu là cập nhật
  sku: z.string().min(1, 'Mã SKU không được để trống'),
  originalPrice: z.coerce.number().positive('Giá gốc phải lớn hơn 0'),
  sellingPrice: z.coerce.number().positive('Giá bán phải lớn hơn 0'),
  stockQuantity: z.coerce.number().int().nonnegative('Số lượng tồn kho không được âm').default(0),
  weightGram: z.coerce.number().int().nonnegative().default(0),
  imageUrl: z.string().url().optional().nullable(),
  attributeValues: z.array(
    z.object({
      attributeName: z.string().min(1),
      value: z.string().min(1),
    }),
  ).optional(),
})

// Body DTO cho việc đồng bộ và cập nhật biến thể sản phẩm
export const syncProductVariantsBodySchema = z
  .object({
    productId: z.coerce.number().int().positive('productId phải là số nguyên dương'),
    attributes: z.array(attributeOptionSchema).min(1, 'Cần ít nhất 1 thuộc tính để tạo biến thể'),
    variants: z.array(upsertVariantItemSchema).min(1, 'Danh sách biến thể không được để trống'),
  })
  .superRefine(({ attributes, variants }, ctx) => {
    // 1. Kiểm tra tính toàn vẹn số lượng tổ hợp
    const combinations = generateVariantCombinations(attributes)
    if (variants.length !== combinations.length) {
      return ctx.addIssue({
        code: 'custom',
        path: ['variants'],
        message: `Số lượng biến thể không hợp lệ. Kỳ vọng chính xác ${combinations.length} biến thể dựa trên tổ hợp thuộc tính.`,
      })
    }

    // 2. Kiểm tra giá bán không được vượt quá giá gốc
    variants.forEach((v, index) => {
      if (v.sellingPrice > v.originalPrice) {
        ctx.addIssue({
          code: 'custom',
          path: ['variants', index, 'sellingPrice'],
          message: `Giá bán (${v.sellingPrice}) không được lớn hơn giá gốc (${v.originalPrice})`,
        })
      }
    })
  })

export const variantIdParamSchema = z.object({
  variantId: z.coerce.number().int().positive(),
})

export const getVariantsByProductParamSchema = z.object({
  productId: z.coerce.number().int().positive(),
})

export type AttributeOptionInput = z.infer<typeof attributeOptionSchema>
export type SyncProductVariantsBodyType = z.infer<typeof syncProductVariantsBodySchema>
export type UpsertVariantItemType = z.infer<typeof upsertVariantItemSchema>
```

# src\modules\catalog\variant-attribute\variant-attribute.service.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\catalog\variant-attribute\variant-attribute.service.ts` |
| Size | 1,952 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:03.995563 |

```typescript
import { VariantAttributeRepo } from './variant-attribute.repo'
import { SyncProductVariantsBodyType } from './variant-attribute.schema'
import { AppError, isUniqueConstraintPrismaError } from '@/common/errors'
import { prisma } from '@/database/prisma'

export class VariantAttributeService {
  constructor(private variantRepo = new VariantAttributeRepo()) {}

  async getVariantsByProductId(productId: number) {
    const product = await prisma.product.findFirst({
      where: { id: productId, deletedAt: null },
    })
    if (!product) {
      throw new AppError('Sản phẩm không tồn tại hoặc đã bị xóa', 404)
    }
    return this.variantRepo.getByProductId(productId)
  }

  async getVariantById(variantId: number) {
    const variant = await this.variantRepo.findById(variantId)
    if (!variant) {
      throw new AppError('Biến thể không tồn tại hoặc đã bị vô hiệu hóa', 404)
    }
    return variant
  }

  async syncProductVariants(data: SyncProductVariantsBodyType, userId: number) {
    try {
      const product = await prisma.product.findFirst({
        where: { id: data.productId, deletedAt: null },
      })
      if (!product) {
        throw new AppError('Không tìm thấy sản phẩm tương ứng để đồng bộ biến thể', 404)
      }

      return await this.variantRepo.syncVariants(data, userId)
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw new AppError('Mã SKU bị trùng lặp trong hệ thống', 422)
      }
      throw error
    }
  }

  async updateStock(variantId: number, delta: number) {
    const variant = await this.getVariantById(variantId)
    if (variant.stockQuantity + delta < 0) {
      throw new AppError('Số lượng tồn kho không đủ để thực hiện khấu trừ', 400)
    }
    return this.variantRepo.updateStockWithOptimistic(variantId, delta)
  }
}
```

# src\modules\fulfillment\fulfillment.routes.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\fulfillment\fulfillment.routes.ts` |
| Size | 408 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:09:17.277788 |

```typescript
import { Router } from 'express'
import { shipmentRouter } from './shipment/shipment.routes'
import { paymentRouter } from './payment/payment.routes'
import { returnRouter } from './return/return.routes'

export const fulfillmentRouter = Router()

fulfillmentRouter.use('/shipments', shipmentRouter)
fulfillmentRouter.use('/payments', paymentRouter)
fulfillmentRouter.use('/returns', returnRouter)

```

# src\modules\fulfillment\payment\payment.controller.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\fulfillment\payment\payment.controller.ts` |
| Size | 785 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:23.286821 |

```typescript
import { Request, Response, NextFunction } from 'express'
import { PaymentService } from './payment.service'

export class PaymentController {
  constructor(private paymentService = new PaymentService()) {}

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.paymentService.findAll(req.query as any)
      return res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const paymentId = Number(req.params.paymentId)
      const data = await this.paymentService.findById(paymentId)
      return res.status(200).json({ statusCode: 200, data })
    } catch (err) {
      next(err)
    }
  }
}

```

# src\modules\fulfillment\payment\payment.repo.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\fulfillment\payment\payment.repo.ts` |
| Size | 938 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:23.288887 |

```typescript
import { prisma } from '@/database/prisma'
import { GetAllPaymentsQueryType } from './payment.schema'

const paymentInclude = {
  order: {
    select: {
      id: true,
      orderCode: true,
      paymentMethod: true,
      paymentStatus: true,
      totalAmount: true,
    },
  },
} as const

export class PaymentRepo {
  async findAll(query: GetAllPaymentsQueryType) {
    const where = {
      ...(query.status ? { status: query.status } : {}),
      ...(query.orderId ? { orderId: query.orderId } : {}),
    }

    const payments = await prisma.paymentTransaction.findMany({
      where,
      include: paymentInclude,
      orderBy: { createdAt: 'desc' },
    })

    return {
      data: payments,
      totalItems: payments.length,
    }
  }

  async findById(id: number) {
    return prisma.paymentTransaction.findUnique({
      where: { id },
      include: paymentInclude,
    })
  }
}

```

# src\modules\fulfillment\payment\payment.routes.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\fulfillment\payment\payment.routes.ts` |
| Size | 278 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:23.290605 |

```typescript
import { Router } from 'express'
import { PaymentController } from './payment.controller'

export const paymentRouter = Router()
const controller = new PaymentController()

paymentRouter.get('/', controller.findAll)
paymentRouter.get('/:paymentId', controller.findById)

```

# src\modules\fulfillment\payment\payment.schema.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\fulfillment\payment\payment.schema.ts` |
| Size | 473 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:23.292028 |

```typescript
import { PaymentStatus } from '@prisma/client'
import { z } from 'zod'

export const getAllPaymentsQuerySchema = z.object({
  status: z.nativeEnum(PaymentStatus).optional(),
  orderId: z.coerce.number().int().positive().optional(),
})

export const paymentIdParamsSchema = z.object({
  paymentId: z.coerce.number().int().positive('paymentId phải là số nguyên dương'),
})

export type GetAllPaymentsQueryType = z.infer<typeof getAllPaymentsQuerySchema>

```

# src\modules\fulfillment\payment\payment.service.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\fulfillment\payment\payment.service.ts` |
| Size | 568 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:23.292549 |

```typescript
import { PaymentRepo } from './payment.repo'
import { GetAllPaymentsQueryType } from './payment.schema'
import { AppError } from '@/common/errors'

export class PaymentService {
  constructor(private paymentRepo = new PaymentRepo()) {}

  async findAll(query: GetAllPaymentsQueryType) {
    return this.paymentRepo.findAll(query)
  }

  async findById(id: number) {
    const payment = await this.paymentRepo.findById(id)
    if (!payment) {
      throw new AppError('Giao dịch thanh toán không tồn tại', 404)
    }
    return payment
  }
}

```

# src\modules\fulfillment\return\return.controller.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\fulfillment\return\return.controller.ts` |
| Size | 1,767 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:23.294582 |

```typescript
import { Request, Response, NextFunction } from 'express'
import { ReturnService } from './return.service'

export class ReturnController {
  constructor(private returnService = new ReturnService()) {}

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.returnService.findAll(req.query as any)
      return res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const returnId = Number(req.params.returnId)
      const data = await this.returnService.findById(returnId)
      return res.status(200).json({ statusCode: 200, data })
    } catch (err) {
      next(err)
    }
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.returnService.create(req.body)
      return res.status(201).json({ statusCode: 201, message: 'Tạo yêu cầu trả hàng thành công', data })
    } catch (err) {
      next(err)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const returnId = Number(req.params.returnId)
      const data = await this.returnService.update(returnId, req.body)
      return res.status(200).json({ statusCode: 200, message: 'Cập nhật yêu cầu trả hàng thành công', data })
    } catch (err) {
      next(err)
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const returnId = Number(req.params.returnId)
      const result = await this.returnService.delete(returnId)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }
}

```

# src\modules\fulfillment\return\return.repo.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\fulfillment\return\return.repo.ts` |
| Size | 2,016 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:23.296103 |

```typescript
import { prisma } from '@/database/prisma'
import {
  CreateReturnBodyType,
  GetAllReturnsQueryType,
  UpdateReturnBodyType,
} from './return.schema'

const returnInclude = {
  medias: true,
  orderItem: {
    select: {
      id: true,
      orderId: true,
      productName: true,
      skuCode: true,
      variantValue: true,
      quantity: true,
    },
  },
} as const

export class ReturnRepo {
  async findAll(query: GetAllReturnsQueryType) {
    const where = {
      ...(query.status ? { status: query.status } : {}),
      ...(query.orderItemId ? { orderItemId: query.orderItemId } : {}),
    }

    const returns = await prisma.returnRequest.findMany({
      where,
      include: returnInclude,
      orderBy: { createdAt: 'desc' },
    })

    return {
      data: returns,
      totalItems: returns.length,
    }
  }

  async findById(id: number) {
    return prisma.returnRequest.findUnique({
      where: { id },
      include: returnInclude,
    })
  }

  async create(data: CreateReturnBodyType) {
    const { medias, ...rest } = data
    return prisma.returnRequest.create({
      data: {
        ...rest,
        description: rest.description ?? undefined,
        medias: medias?.length
          ? {
              create: medias,
            }
          : undefined,
      },
      include: returnInclude,
    })
  }

  async update(id: number, data: UpdateReturnBodyType) {
    return prisma.returnRequest.update({
      where: { id },
      data: {
        ...(data.quantity !== undefined ? { quantity: data.quantity } : {}),
        ...(data.reason !== undefined ? { reason: data.reason } : {}),
        ...(data.description !== undefined ? { description: data.description } : {}),
        ...(data.status !== undefined ? { status: data.status } : {}),
      },
      include: returnInclude,
    })
  }

  async delete(id: number) {
    return prisma.returnRequest.delete({
      where: { id },
    })
  }
}

```

# src\modules\fulfillment\return\return.routes.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\fulfillment\return\return.routes.ts` |
| Size | 419 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:23.298102 |

```typescript
import { Router } from 'express'
import { ReturnController } from './return.controller'

export const returnRouter = Router()
const controller = new ReturnController()

returnRouter.get('/', controller.findAll)
returnRouter.get('/:returnId', controller.findById)
returnRouter.post('/', controller.create)
returnRouter.put('/:returnId', controller.update)
returnRouter.delete('/:returnId', controller.delete)

```

# src\modules\fulfillment\return\return.schema.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\fulfillment\return\return.schema.ts` |
| Size | 1,381 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:23.299102 |

```typescript
import { ReturnStatus } from '@prisma/client'
import { z } from 'zod'

export const returnMediaSchema = z.object({
  mediaUrl: z.string().min(1).max(1000),
  mediaType: z.string().min(1).max(50),
})

export const getAllReturnsQuerySchema = z.object({
  status: z.nativeEnum(ReturnStatus).optional(),
  orderItemId: z.coerce.number().int().positive().optional(),
})

export const returnIdParamsSchema = z.object({
  returnId: z.coerce.number().int().positive('returnId phải là số nguyên dương'),
})

export const createReturnBodySchema = z.object({
  orderItemId: z.coerce.number().int().positive(),
  quantity: z.coerce.number().int().positive(),
  reason: z.string().min(1).max(255),
  description: z.string().optional().nullable(),
  medias: z.array(returnMediaSchema).optional(),
})

export const updateReturnBodySchema = z.object({
  quantity: z.coerce.number().int().positive().optional(),
  reason: z.string().min(1).max(255).optional(),
  description: z.string().optional().nullable(),
  status: z.nativeEnum(ReturnStatus).optional(),
})

export type GetAllReturnsQueryType = z.infer<typeof getAllReturnsQuerySchema>
export type CreateReturnBodyType = z.infer<typeof createReturnBodySchema>
export type UpdateReturnBodyType = z.infer<typeof updateReturnBodySchema>
export type ReturnMediaInput = z.infer<typeof returnMediaSchema>

```

# src\modules\fulfillment\return\return.service.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\fulfillment\return\return.service.ts` |
| Size | 2,290 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:23.302103 |

```typescript
import { ReturnRepo } from './return.repo'
import {
  CreateReturnBodyType,
  GetAllReturnsQueryType,
  UpdateReturnBodyType,
} from './return.schema'
import { AppError, isNotFoundPrismaError } from '@/common/errors'
import { prisma } from '@/database/prisma'

export class ReturnService {
  constructor(private returnRepo = new ReturnRepo()) {}

  async findAll(query: GetAllReturnsQueryType) {
    return this.returnRepo.findAll(query)
  }

  async findById(id: number) {
    const returnRequest = await this.returnRepo.findById(id)
    if (!returnRequest) {
      throw new AppError('Yêu cầu trả hàng không tồn tại', 404)
    }
    return returnRequest
  }

  async create(data: CreateReturnBodyType) {
    const orderItem = await prisma.orderItem.findUnique({
      where: { id: data.orderItemId },
    })
    if (!orderItem) {
      throw new AppError('Dòng đơn hàng không tồn tại', 404)
    }
    if (data.quantity > orderItem.quantity) {
      throw new AppError('Số lượng trả không được vượt quá số lượng đã mua', 422)
    }
    return this.returnRepo.create(data)
  }

  async update(id: number, data: UpdateReturnBodyType) {
    try {
      const existing = await this.findById(id)
      if (data.quantity !== undefined && data.quantity > existing.orderItem.quantity) {
        throw new AppError('Số lượng trả không được vượt quá số lượng đã mua', 422)
      }
      return await this.returnRepo.update(id, data)
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw new AppError('Yêu cầu trả hàng không tồn tại để cập nhật', 404)
      }
      throw error
    }
  }

  async delete(id: number) {
    try {
      const existing = await this.findById(id)
      if (existing.status !== 'PENDING') {
        throw new AppError('Chỉ có thể xóa yêu cầu trả hàng đang chờ xử lý', 422)
      }
      await this.returnRepo.delete(id)
      return { message: 'Xóa yêu cầu trả hàng thành công' }
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw new AppError('Yêu cầu trả hàng không tồn tại để xóa', 404)
      }
      throw error
    }
  }
}

```

# src\modules\fulfillment\shipment\shipment.controller.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\fulfillment\shipment\shipment.controller.ts` |
| Size | 2,104 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:23.304104 |

```typescript
import { Request, Response, NextFunction } from 'express'
import { ShipmentService } from './shipment.service'

export class ShipmentController {
  constructor(private shipmentService = new ShipmentService()) {}

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.shipmentService.findAll(req.query as any)
      return res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shipmentId = Number(req.params.shipmentId)
      const data = await this.shipmentService.findById(shipmentId)
      return res.status(200).json({ statusCode: 200, data })
    } catch (err) {
      next(err)
    }
  }

  findByOrderId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderId = Number(req.params.orderId)
      const data = await this.shipmentService.findByOrderId(orderId)
      return res.status(200).json({ statusCode: 200, data })
    } catch (err) {
      next(err)
    }
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.shipmentService.create(req.body)
      return res.status(201).json({ statusCode: 201, message: 'Tạo lô hàng thành công', data })
    } catch (err) {
      next(err)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shipmentId = Number(req.params.shipmentId)
      const data = await this.shipmentService.update(shipmentId, req.body)
      return res.status(200).json({ statusCode: 200, message: 'Cập nhật lô hàng thành công', data })
    } catch (err) {
      next(err)
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shipmentId = Number(req.params.shipmentId)
      const result = await this.shipmentService.delete(shipmentId)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }
}

```

# src\modules\fulfillment\shipment\shipment.repo.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\fulfillment\shipment\shipment.repo.ts` |
| Size | 2,337 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:23.305935 |

```typescript
import { prisma } from '@/database/prisma'
import {
  CreateShipmentBodyType,
  GetAllShipmentsQueryType,
  UpdateShipmentBodyType,
} from './shipment.schema'

const shipmentInclude = {
  order: {
    select: {
      id: true,
      orderCode: true,
      status: true,
      receiverName: true,
      receiverPhone: true,
    },
  },
} as const

export class ShipmentRepo {
  async findAll(query: GetAllShipmentsQueryType) {
    const where = {
      ...(query.status ? { status: query.status } : {}),
      ...(query.orderId ? { orderId: query.orderId } : {}),
    }

    const shipments = await prisma.shipment.findMany({
      where,
      include: shipmentInclude,
      orderBy: { createdAt: 'desc' },
    })

    return {
      data: shipments,
      totalItems: shipments.length,
    }
  }

  async findById(id: number) {
    return prisma.shipment.findUnique({
      where: { id },
      include: shipmentInclude,
    })
  }

  async findByOrderId(orderId: number) {
    return prisma.shipment.findUnique({
      where: { orderId },
      include: shipmentInclude,
    })
  }

  async create(data: CreateShipmentBodyType) {
    return prisma.shipment.create({
      data: {
        orderId: data.orderId,
        carrier: data.carrier,
        trackingCode: data.trackingCode,
        actualShippingFee: data.actualShippingFee,
        status: data.status,
        estimatedDelivery: data.estimatedDelivery ?? undefined,
      },
      include: shipmentInclude,
    })
  }

  async update(id: number, data: UpdateShipmentBodyType) {
    return prisma.shipment.update({
      where: { id },
      data: {
        ...(data.carrier !== undefined ? { carrier: data.carrier } : {}),
        ...(data.trackingCode !== undefined ? { trackingCode: data.trackingCode } : {}),
        ...(data.actualShippingFee !== undefined
          ? { actualShippingFee: data.actualShippingFee }
          : {}),
        ...(data.status !== undefined ? { status: data.status } : {}),
        ...(data.estimatedDelivery !== undefined
          ? { estimatedDelivery: data.estimatedDelivery }
          : {}),
      },
      include: shipmentInclude,
    })
  }

  async delete(id: number) {
    return prisma.shipment.delete({
      where: { id },
    })
  }
}

```

# src\modules\fulfillment\shipment\shipment.routes.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\fulfillment\shipment\shipment.routes.ts` |
| Size | 511 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:23.306979 |

```typescript
import { Router } from 'express'
import { ShipmentController } from './shipment.controller'

export const shipmentRouter = Router()
const controller = new ShipmentController()

shipmentRouter.get('/', controller.findAll)
shipmentRouter.get('/by-order/:orderId', controller.findByOrderId)
shipmentRouter.get('/:shipmentId', controller.findById)
shipmentRouter.post('/', controller.create)
shipmentRouter.put('/:shipmentId', controller.update)
shipmentRouter.delete('/:shipmentId', controller.delete)

```

# src\modules\fulfillment\shipment\shipment.schema.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\fulfillment\shipment\shipment.schema.ts` |
| Size | 1,250 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:23.310211 |

```typescript
import { ShipmentStatus } from '@prisma/client'
import { z } from 'zod'

export const getAllShipmentsQuerySchema = z.object({
  status: z.nativeEnum(ShipmentStatus).optional(),
  orderId: z.coerce.number().int().positive().optional(),
})

export const shipmentIdParamsSchema = z.object({
  shipmentId: z.coerce.number().int().positive('shipmentId phải là số nguyên dương'),
})

export const orderIdParamsSchema = z.object({
  orderId: z.coerce.number().int().positive('orderId phải là số nguyên dương'),
})

export const createShipmentBodySchema = z.object({
  orderId: z.coerce.number().int().positive(),
  carrier: z.string().min(1).max(100),
  trackingCode: z.string().min(1).max(150),
  actualShippingFee: z.coerce.number().nonnegative(),
  status: z.nativeEnum(ShipmentStatus).optional(),
  estimatedDelivery: z.coerce.date().optional().nullable(),
})

export const updateShipmentBodySchema = createShipmentBodySchema
  .omit({ orderId: true })
  .partial()

export type GetAllShipmentsQueryType = z.infer<typeof getAllShipmentsQuerySchema>
export type CreateShipmentBodyType = z.infer<typeof createShipmentBodySchema>
export type UpdateShipmentBodyType = z.infer<typeof updateShipmentBodySchema>

```

# src\modules\fulfillment\shipment\shipment.service.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\fulfillment\shipment\shipment.service.ts` |
| Size | 2,098 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:23.311211 |

```typescript
import { ShipmentRepo } from './shipment.repo'
import {
  CreateShipmentBodyType,
  GetAllShipmentsQueryType,
  UpdateShipmentBodyType,
} from './shipment.schema'
import { AppError, isNotFoundPrismaError, isUniqueConstraintPrismaError } from '@/common/errors'

export class ShipmentService {
  constructor(private shipmentRepo = new ShipmentRepo()) {}

  async findAll(query: GetAllShipmentsQueryType) {
    return this.shipmentRepo.findAll(query)
  }

  async findById(id: number) {
    const shipment = await this.shipmentRepo.findById(id)
    if (!shipment) {
      throw new AppError('Lô hàng không tồn tại', 404)
    }
    return shipment
  }

  async findByOrderId(orderId: number) {
    const shipment = await this.shipmentRepo.findByOrderId(orderId)
    if (!shipment) {
      throw new AppError('Không tìm thấy lô hàng cho đơn hàng này', 404)
    }
    return shipment
  }

  async create(data: CreateShipmentBodyType) {
    try {
      return await this.shipmentRepo.create(data)
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw new AppError('Đơn hàng đã có lô hàng hoặc mã vận đơn đã tồn tại', 422)
      }
      throw error
    }
  }

  async update(id: number, data: UpdateShipmentBodyType) {
    try {
      await this.findById(id)
      return await this.shipmentRepo.update(id, data)
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw new AppError('Lô hàng không tồn tại để cập nhật', 404)
      }
      if (isUniqueConstraintPrismaError(error)) {
        throw new AppError('Mã vận đơn đã tồn tại', 422)
      }
      throw error
    }
  }

  async delete(id: number) {
    try {
      await this.findById(id)
      await this.shipmentRepo.delete(id)
      return { message: 'Xóa lô hàng thành công' }
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw new AppError('Lô hàng không tồn tại để xóa', 404)
      }
      throw error
    }
  }
}

```

# src\modules\identity\address\address.controller.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\identity\address\address.controller.ts` |
| Size | 2,374 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:07.571652 |

```typescript
import { NextFunction, Request, Response } from 'express'
import { AppError } from '@/common/errors'
import { AddressService } from './address.service'
import { CreateAddressBodyType, GetAddressQueryType, UpdateAddressBodyType } from './address.schema'

export class AddressController {
  constructor(private addressService = new AddressService()) {}

  private getUserId(req: Request) {
    const user = (req as any).user
    const userId = user?.userId ?? user?.id
    if (!userId) throw new AppError('Chưa xác thực người dùng', 401)
    return Number(userId)
  }

  getListAddresses = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query as unknown as GetAddressQueryType
      return res.status(200).json({ statusCode: 200, data: await this.addressService.listAddresses(this.getUserId(req), query) })
    } catch (error) {
      next(error)
    }
  }

  getAddressById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.addressService.getAddress(Number(req.params.addressId), this.getUserId(req))
      return res.status(200).json({ statusCode: 200, data })
    } catch (error) {
      next(error)
    }
  }

  createAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.addressService.createAddress(this.getUserId(req), req.body as CreateAddressBodyType)
      return res.status(201).json({ statusCode: 201, message: 'Tạo địa chỉ thành công', data })
    } catch (error) {
      next(error)
    }
  }

  updateAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.addressService.updateAddress(Number(req.params.addressId), this.getUserId(req), req.body as UpdateAddressBodyType)
      return res.status(200).json({ statusCode: 200, message: 'Cập nhật địa chỉ thành công', data })
    } catch (error) {
      next(error)
    }
  }

  deleteAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.addressService.deleteAddress(Number(req.params.addressId), this.getUserId(req))
      return res.status(200).json({ statusCode: 200, message: 'Xóa địa chỉ thành công' })
    } catch (error) {
      next(error)
    }
  }
}

```

# src\modules\identity\address\address.repo.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\identity\address\address.repo.ts` |
| Size | 2,091 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:07.573652 |

```typescript
import { prisma } from '@/database/prisma'
import { CreateAddressBodyType, GetAddressQueryType, UpdateAddressBodyType } from './address.schema'

export class AddressRepo {
  async listAddresses(userId: number, query: GetAddressQueryType) {
    const skip = (query.page - 1) * query.limit
    const where = {
      userId,
      ...(query.search
        ? {
            OR: [
              { receiverName: { contains: query.search, mode: 'insensitive' as const } },
              { phoneNumber: { contains: query.search, mode: 'insensitive' as const } },
              { detailAddress: { contains: query.search, mode: 'insensitive' as const } },
            ],
          }
        : {}),
    }
    const [totalItems, data] = await Promise.all([
      prisma.shippingAddress.count({ where }),
      prisma.shippingAddress.findMany({ where, skip, take: query.limit, orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }] }),
    ])
    return { data, totalItems, page: query.page, limit: query.limit, totalPages: Math.ceil(totalItems / query.limit) }
  }

  async findAddressById(id: number, userId: number) {
    return prisma.shippingAddress.findFirst({ where: { id, userId } })
  }

  async createAddress(userId: number, data: CreateAddressBodyType) {
    return prisma.$transaction(async (transaction) => {
      if (data.isDefault) {
        await transaction.shippingAddress.updateMany({ where: { userId }, data: { isDefault: false } })
      }
      return transaction.shippingAddress.create({ data: { ...data, userId } })
    })
  }

  async updateAddress(id: number, userId: number, data: UpdateAddressBodyType) {
    return prisma.$transaction(async (transaction) => {
      if (data.isDefault) {
        await transaction.shippingAddress.updateMany({ where: { userId }, data: { isDefault: false } })
      }
      return transaction.shippingAddress.update({ where: { id, userId }, data })
    })
  }

  async deleteAddress(id: number, userId: number) {
    return prisma.shippingAddress.deleteMany({ where: { id, userId } })
  }
}

```

# src\modules\identity\address\address.routes.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\identity\address\address.routes.ts` |
| Size | 1,050 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:06.843074 |

```typescript
import { Router } from 'express'
import { authGuard } from '@/middlewares/guards/auth.guard'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import { AddressController } from './address.controller'
import {
	addressParamsSchema,
	createAddressBodySchema,
	getAddressQuerySchema,
	updateAddressBodySchema,
} from './address.schema'

export const addressRouter = Router()
const controller = new AddressController()

addressRouter.use(authGuard)
addressRouter.get('/', validateRequest({ query: getAddressQuerySchema }), controller.getListAddresses)
addressRouter.get('/:addressId', validateRequest({ params: addressParamsSchema }), controller.getAddressById)
addressRouter.post('/', validateRequest({ body: createAddressBodySchema }), controller.createAddress)
addressRouter.put('/:addressId', validateRequest({ params: addressParamsSchema, body: updateAddressBodySchema }), controller.updateAddress)
addressRouter.delete('/:addressId', validateRequest({ params: addressParamsSchema }), controller.deleteAddress)

```

# src\modules\identity\address\address.schema.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\identity\address\address.schema.ts` |
| Size | 2,290 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:07.574651 |

```typescript
import { z } from 'zod'

export const addressParamsSchema = z.object({
  addressId: z.coerce.number().int().positive('addressId phải là số nguyên dương'),
})

export const getAddressQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().optional(),
  userId: z.coerce.number().int().positive().optional(),
})

export const getAddressByUserIdQuerySchema = z.object({
  userId: z.coerce.number().int().positive('userId phải là số nguyên dương'),
})

export const createAddressBodySchema = z.object({
  receiverName: z.string().trim().min(1, 'Tên người nhận là bắt buộc').max(255),
    phoneNumber: z.string().trim().min(1, 'Số điện thoại là bắt buộc').max(50),
  province: z.string().trim().min(1, 'Tỉnh/Thành phố là bắt buộc').max(150),
  district: z.string().trim().min(1, 'Quận/Huyện là bắt buộc').max(150),
  ward: z.string().trim().min(1, 'Phường/Xã là bắt buộc').max(150),
  detailAddress: z.string().trim().min(1, 'Địa chỉ là bắt buộc').max(500),
    isDefault: z.boolean().optional(),
})

export const updateAddressBodySchema = z.object({
    receiverName: z.string().trim().min(1, 'Tên người nhận là bắt buộc').max(255).optional(),
    phoneNumber: z.string().trim().min(1, 'Số điện thoại là bắt buộc').max(50).optional(),
    province: z.string().trim().min(1, 'Tỉnh/Thành phố là bắt buộc').max(150).optional(),
    district: z.string().trim().min(1, 'Quận/Huyện là bắt buộc').max(150).optional(),
    ward: z.string().trim().min(1, 'Phường/Xã là bắt buộc').max(150).optional(),
    detailAddress: z.string().trim().min(1, 'Địa chỉ là bắt buộc').max(500).optional(),
    isDefault: z.boolean().optional(),
})

export type AddressParamsType = z.infer<typeof addressParamsSchema>
export type GetAddressQueryType = z.infer<typeof getAddressQuerySchema>
export type GetAddressByUserIdQueryType = z.infer<typeof getAddressByUserIdQuerySchema>
export type CreateAddressBodyType = z.infer<typeof createAddressBodySchema>
export type UpdateAddressBodyType = z.infer<typeof updateAddressBodySchema>

```

# src\modules\identity\address\address.service.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\identity\address\address.service.ts` |
| Size | 1,129 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:06.845074 |

```typescript
import { AddressRepo } from './address.repo'
import { CreateAddressBodyType, GetAddressQueryType, UpdateAddressBodyType } from './address.schema'
import { AppError } from '@/common/errors'

export class AddressService {
    constructor(private repo = new AddressRepo()) {}
    async listAddresses(userId: number, query: GetAddressQueryType) {
        return this.repo.listAddresses(userId, query)
    }
    async getAddress(id: number, userId: number) {
        const address = await this.repo.findAddressById(id, userId)
        if (!address) throw new AppError('Địa chỉ không tồn tại', 404)
        return address
    }
    async createAddress(userId: number, data: CreateAddressBodyType) {
        return this.repo.createAddress(userId, data)
    }
    async updateAddress(id: number, userId: number, data: UpdateAddressBodyType) {
        await this.getAddress(id, userId)
        return this.repo.updateAddress(id, userId, data)
    }
    async deleteAddress(id: number, userId: number) {
        await this.getAddress(id, userId)
        return this.repo.deleteAddress(id, userId)
    }
}
```

# src\modules\identity\auth\auth.controller.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\identity\auth\auth.controller.ts` |
| Size | 2,385 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:07.575651 |

```typescript
import { NextFunction, Request, Response } from 'express'
import { AppError } from '@/common/errors'
import { AuthService } from './auth.service'

export class AuthController {
  constructor(private authService = new AuthService()) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(201).json({ statusCode: 201, ...await this.authService.register(req.body) })
    } catch (error) { next(error) }
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({ statusCode: 200, ...await this.authService.login(req.body, req.ip || '') })
    } catch (error) { next(error) }
  }

  refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({ statusCode: 200, data: await this.authService.refresh(req.body.refreshToken, req.ip || '') })
    } catch (error) { next(error) }
  }

  forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({ statusCode: 200, data: await this.authService.forgotPassword(req.body.email) })
    } catch (error) { next(error) }
  }

  resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({ statusCode: 200, data: await this.authService.resetPassword(req.body) })
    } catch (error) { next(error) }
  }

  changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as any).user
      const userId = user?.userId ?? user?.id
      if (!userId) throw new AppError('Chưa xác thực người dùng', 401)
      return res.status(200).json({ statusCode: 200, data: await this.authService.changePassword(Number(userId), req.body) })
    } catch (error) { next(error) }
  }

  verifyCode = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({ statusCode: 200, data: await this.authService.verifyCode(req.body) })
    } catch (error) { next(error) }
  }

  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({ statusCode: 200, data: await this.authService.logout(req.body.refreshToken) })
    } catch (error) { next(error) }
  }
}

```

# src\modules\identity\auth\auth.repo.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\identity\auth\auth.repo.ts` |
| Size | 3,604 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:07.577650 |

```typescript
import { prisma } from '@/database/prisma'
import { RegisterUserBodyType } from './auth.schema'
import { UserStatus, VerificationCodeType } from '@prisma/client';

export class AuthRepo {
  async findUserByEmail(email: string) {
    return prisma.user.findFirst({ where: { email, deletedAt: null }, include: { role: true } })
  }

  async findUserById(id: number) {
    return prisma.user.findFirst({ where: { id, deletedAt: null }, include: { role: true } })
  }

  async findRoleByCode(code: string) {
    return prisma.role.findFirst({ where: { code, isActive: true, deletedAt: null } })
  }

  async createUser({ data, roleId, passwordHash, status }: { data: RegisterUserBodyType; roleId: number; passwordHash: string; status: UserStatus }) {
    return prisma.user.create({
      data: {
        email: data.email,
        fullName: data.fullName,
        phoneNumber: data.phoneNumber ?? '',
        passwordHash,
        roleId,
        status,
      },
      include: { role: true },
    })
  }

  async createDeviceSession(data: { userId: number; refreshToken: string; ipAddress: string; expiresAt: Date }) {
    return prisma.deviceSession.create({ data })
  }

  async findDeviceSession(refreshToken: string) {
    return prisma.deviceSession.findFirst({
      where: { refreshToken, isActive: true },
      include: { user: { include: { role: true } } },
    })
  }

  async deactivateDeviceSession(id: number) {
    return prisma.deviceSession.update({ where: { id }, data: { isActive: false } })
  }

  async updatePassword(userId: number, passwordHash: string) {
    return prisma.user.update({ where: { id: userId }, data: { passwordHash } })
  }

  async updateInactiveUser(userId: number, data: { fullName: string; phoneNumber?: string; passwordHash: string }) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        fullName: data.fullName,
        phoneNumber: data.phoneNumber ?? '',
        passwordHash: data.passwordHash,
      },
      include: { role: true },
    })
  }

  async createVerificationCode(data: { email: string; code: string; type: VerificationCodeType; expiresAt: Date }) {
    return prisma.verificationCode.create({ data })
  }

  async findValidVerificationCode(email: string, code: string, type: VerificationCodeType) {
    return prisma.verificationCode.findFirst({
      where: { email, code, type, isUsed: false, expiresAt: { gt: new Date() } },
      orderBy: { createdAt: 'desc' },
    })
  }

  async markVerificationCodeUsed(id: number) {
    return prisma.verificationCode.update({ where: { id }, data: { isUsed: true } })
  }

  async deactivateAllVerificationCodes(email: string, type: VerificationCodeType) {
    return prisma.verificationCode.updateMany({
      where: { email, type, isUsed: false },
      data: { isUsed: true },
    })
  }

  async activateUser(userId: number) {
    return prisma.user.update({ where: { id: userId }, data: { status: 'ACTIVE' } })
  }

  async deactivateAllUserSessions(userId: number) {
    return prisma.deviceSession.updateMany({ where: { userId, isActive: true }, data: { isActive: false } })
  }

  async findVerificationCodeById(id: number) {
    return prisma.verificationCode.findUnique({ where: { id } })
  }

  async findValidVerificationCodeByEmail(email: string, type: VerificationCodeType) {
    return prisma.verificationCode.findFirst({
      where: { email, type, isUsed: false, expiresAt: { gt: new Date() } },
      orderBy: { createdAt: 'desc' },
    })
  }
}

```

# src\modules\identity\auth\auth.routes.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\identity\auth\auth.routes.ts` |
| Size | 1,665 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:07.578651 |

```typescript
import { Router } from 'express'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import { generalAuthLimiter, otpLimiter, strictAuthLimiter } from '@/middlewares/rate-limit.middleware'
import { authGuard } from '@/middlewares/guards/auth.guard'
import { AuthController } from './auth.controller'
import {
  changePasswordBodySchema,
  forgotPasswordBodySchema,
  loginUserBodySchema,
  refreshTokenBodySchema,
  registerUserBodySchema,
  resetPasswordBodySchema,
  verificationCodeParamsSchema,
} from './auth.schema'

export const authRouter = Router()
const controller = new AuthController()

// Rate limit chung cho toàn bộ auth routes
authRouter.use(generalAuthLimiter)

authRouter.post('/register', otpLimiter, validateRequest({ body: registerUserBodySchema }), controller.register)
authRouter.post('/login', strictAuthLimiter, validateRequest({ body: loginUserBodySchema }), controller.login)
authRouter.post('/refresh', validateRequest({ body: refreshTokenBodySchema }), controller.refresh)
authRouter.post('/forgot-password', otpLimiter, validateRequest({ body: forgotPasswordBodySchema }), controller.forgotPassword)
authRouter.post('/reset-password', strictAuthLimiter, validateRequest({ body: resetPasswordBodySchema }), controller.resetPassword)
authRouter.post('/change-password', authGuard, validateRequest({ body: changePasswordBodySchema }), controller.changePassword)
authRouter.post('/verify-code', strictAuthLimiter, validateRequest({ body: verificationCodeParamsSchema }), controller.verifyCode)
authRouter.post('/logout', validateRequest({ body: refreshTokenBodySchema }), controller.logout)

```

# src\modules\identity\auth\auth.schema.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\identity\auth\auth.schema.ts` |
| Size | 3,706 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:07.579651 |

```typescript
import { z } from 'zod';

export const registerUserBodySchema = z.object({
    email: z.string().trim().email('Email không đúng định dạng').max(255),
    password: z
        .string()
        .min(8, 'Mật khẩu tối thiểu 8 ký tự')
        .max(72, 'Mật khẩu tối đa 72 ký tự') 
        .regex(/[A-Z]/, 'Mật khẩu cần ít nhất 1 chữ in hoa')
        .regex(/[a-z]/, 'Mật khẩu cần ít nhất 1 chữ in thường')
        .regex(/[0-9]/, 'Mật khẩu cần ít nhất 1 chữ số')
        .regex(/[^A-Za-z0-9]/, 'Mật khẩu cần ít nhất 1 ký tự đặc biệt'),
    fullName: z.string().trim().min(1).max(100),
    phoneNumber: z.string().trim().optional(),
})

export const loginUserBodySchema = z.object({
    email: z.string().trim().email('Email không đúng định dạng').max(255),
    password: z.string().min(8, 'Mật khẩu tối thiểu 8 ký tự').max(72, 'Mật khẩu tối đa 72 ký tự'),
})

export const refreshTokenBodySchema = z.object({
    refreshToken: z.string().min(1, 'Refresh token là bắt buộc'),
})

export const forgotPasswordBodySchema = z.object({
    email: z.string().trim().email('Email không đúng định dạng').max(255),
})

export const verificationCodeParamsSchema = z.object({
    email: z.string().trim().email('Email không đúng định dạng').max(255),
    type: z.enum(['REGISTER', 'FORGOT_PASSWORD']),
    code: z.string().trim().length(6, 'Mã xác thực phải là 6 chữ số').regex(/^\d+$/, 'Mã xác thực chỉ gồm chữ số'),
})

export const resetPasswordBodySchema = z.object({
    token: z.string().min(1, 'Token xác thực là bắt buộc'),
    newPassword: z
      .string()
      .min(8, 'Mật khẩu mới tối thiểu 8 ký tự')
      .max(72, 'Mật khẩu tối đa 72 ký tự')
      .regex(/[A-Z]/, 'Cần ít nhất 1 chữ hoa')
      .regex(/[a-z]/, 'Cần ít nhất 1 chữ thường')
      .regex(/[0-9]/, 'Cần ít nhất 1 chữ số')
      .regex(/[^A-Za-z0-9]/, 'Cần ít nhất 1 ký tự đặc biệt'),
    confirmPassword: z.string().min(1, 'Xác nhận mật khẩu là bắt buộc'),
  })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: 'Mật khẩu xác nhận không khớp',
        path: ['confirmPassword'],
    })

export const changePasswordBodySchema = z.object({
    oldPassword: z.string().min(1, 'Mật khẩu cũ là bắt buộc'),
    newPassword: z
      .string()
      .min(8, 'Mật khẩu mới tối thiểu 8 ký tự')
      .max(72, 'Mật khẩu tối đa 72 ký tự')
      .regex(/[A-Z]/, 'Cần ít nhất 1 chữ hoa')
      .regex(/[a-z]/, 'Cần ít nhất 1 chữ thường')
      .regex(/[0-9]/, 'Cần ít nhất 1 chữ số')
      .regex(/[^A-Za-z0-9]/, 'Cần ít nhất 1 ký tự đặc biệt'),
    confirmPassword: z.string().min(1, 'Xác nhận mật khẩu là bắt buộc'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
    })

export type RegisterUserBodyType = z.infer<typeof registerUserBodySchema>
export type LoginUserBodyType = z.infer<typeof loginUserBodySchema>
export type RefreshTokenBodyType = z.infer<typeof refreshTokenBodySchema>
export type ForgotPasswordBodyType = z.infer<typeof forgotPasswordBodySchema>
export type VerificationCodeParamsType = z.infer<typeof verificationCodeParamsSchema>
export type ResetPasswordBodyType = z.input<typeof resetPasswordBodySchema>
export type ChangePasswordBodyType = z.input<typeof changePasswordBodySchema>
```

# src\modules\identity\auth\auth.service.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\identity\auth\auth.service.ts` |
| Size | 12,284 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:07.581653 |

```typescript
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { randomInt, randomUUID } from 'crypto'
import ms from 'ms'
import { envConfig } from '@/config/env.config'
import { AppError } from '@/common/errors'
import { AuthRepo } from './auth.repo'
import {
    ChangePasswordBodyType,
    LoginUserBodyType,
    RegisterUserBodyType,
    ResetPasswordBodyType,
    VerificationCodeParamsType,
} from './auth.schema'
import { sendVerificationEmail } from '@/common/service/mail'

type TokenUser = { userId: number; roleId: number }

export class AuthService {
    constructor(private authRepo = new AuthRepo()) {}

    // ==========================================
    // 1. TOKEN & UTILS HELPERS
    // ==========================================

    private createAccessToken(user: TokenUser) {
        return jwt.sign(user, envConfig.ACCESS_TOKEN_SECRET, {
            expiresIn: envConfig.ACCESS_TOKEN_EXPIRES_IN as ms.StringValue,
        })
    }

    private createRefreshToken(user: TokenUser) {
        return jwt.sign({ ...user, tokenId: randomUUID() }, envConfig.REFRESH_TOKEN_SECRET, {
            expiresIn: envConfig.REFRESH_TOKEN_EXPIRES_IN as ms.StringValue,
        })
    }

    private createResetPasswordToken(verificationId: number, email: string) {
        return jwt.sign(
            { verificationId, email, purpose: 'RESET_PASSWORD' },
            envConfig.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' },
        )
    }

    private verifyResetPasswordToken(token: string): JwtPayload {
        try {
            const payload = jwt.verify(token, envConfig.ACCESS_TOKEN_SECRET) as JwtPayload
            if (payload.purpose !== 'RESET_PASSWORD') {
                throw new AppError('Token không hợp lệ', 401)
            }
            return payload
        } catch (error) {
            if (error instanceof AppError) throw error
            throw new AppError('Token đặt lại mật khẩu không hợp lệ hoặc đã hết hạn', 401)
        }
    }

    private getExpiryDate(value: string) {
        const duration = ms(value as ms.StringValue)
        if (typeof duration !== 'number') throw new AppError('Thời gian token không hợp lệ', 500)
        return new Date(Date.now() + duration)
    }

    private sanitizeUser(user: any) {
        const { passwordHash, ...safeUser } = user
        return safeUser
    }

    // ==========================================
    // 2. OTP & VERIFICATION HELPERS
    // ==========================================

    private async createVerificationCode(email: string, type: 'REGISTER' | 'FORGOT_PASSWORD') {
        const COOLDOWN_SECONDS = 60
        const existing = await this.authRepo.findValidVerificationCodeByEmail(email, type)

        if (existing) {
            const elapsedMs = Date.now() - existing.createdAt.getTime()
            if (elapsedMs < COOLDOWN_SECONDS * 1000) {
                const remainingSec = Math.ceil((COOLDOWN_SECONDS * 1000 - elapsedMs) / 1000)
                throw new AppError(`Vui lòng chờ ${remainingSec} giây trước khi yêu cầu mã mới`, 429)
            }
            // Hết cooldown -> vô hiệu hóa OTP cũ trước khi tạo mới
            await this.authRepo.markVerificationCodeUsed(existing.id)
        }

        const code = randomInt(100000, 1000000).toString()
        await this.authRepo.createVerificationCode({
            email,
            code,
            type,
            expiresAt: new Date(Date.now() + 15 * 60 * 1000),
        })
        return code
    }

    private async verifyVerificationCode(email: string, code: string, type: 'REGISTER' | 'FORGOT_PASSWORD') {
        const verification = await this.authRepo.findValidVerificationCode(email, code, type)
        if (!verification) throw new AppError('Mã xác thực không hợp lệ hoặc đã hết hạn', 401)
        return verification
    }

    // ==========================================
    // 3. AUTHENTICATION FLOW
    // ==========================================

    async register(data: RegisterUserBodyType) {
        const email = data.email.toLowerCase()
        const existingUser = await this.authRepo.findUserByEmail(email)

        if (existingUser) {
            if (existingUser.status === 'ACTIVE' || existingUser.status === 'BLOCKED') {
                throw new AppError('Email đã được sử dụng', 409)
            }

            // User tồn tại nhưng INACTIVE (đăng ký dở dang hoặc chưa kích hoạt)
            await this.authRepo.deactivateAllVerificationCodes(email, 'REGISTER')
            const updatedUser = await this.authRepo.updateInactiveUser(existingUser.id, {
                fullName: data.fullName,
                phoneNumber: data.phoneNumber,
                passwordHash: await bcrypt.hash(data.password, 10),
            })

            const code = await this.createVerificationCode(email, 'REGISTER')
            await sendVerificationEmail(email, code)
            return {
                user: this.sanitizeUser(updatedUser),
                message: 'Mã xác thực mới đã được gửi tới email của bạn',
            }
        }

        const role = await this.authRepo.findRoleByCode('CUSTOMER')
        if (!role) throw new AppError('Chưa cấu hình role CUSTOMER', 500)

        try {
            const user = await this.authRepo.createUser({
                data: { ...data, email },
                roleId: role.id,
                passwordHash: await bcrypt.hash(data.password, 10),
                status: 'INACTIVE',
            })

            await this.authRepo.deactivateAllVerificationCodes(email, 'REGISTER')
            const code = await this.createVerificationCode(email, 'REGISTER')
            await sendVerificationEmail(email, code)
            return { user: this.sanitizeUser(user) }
        } catch (error: any) {
            if (error?.code === 'P2002') throw new AppError('Email đã được sử dụng', 409)
            throw error
        }
    }

    async verifyCode(data: VerificationCodeParamsType) {
        const email = data.email.toLowerCase()
        const verification = await this.verifyVerificationCode(email, data.code, data.type)

        if (data.type === 'REGISTER') {
            const user = await this.authRepo.findUserByEmail(verification.email)
            if (!user) throw new AppError('Tài khoản không tồn tại', 404)

            await this.authRepo.activateUser(user.id)
            await this.authRepo.markVerificationCodeUsed(verification.id)
            return { message: 'Xác thực email thành công' }
        }

        const resetToken = this.createResetPasswordToken(verification.id, verification.email)
        return { message: 'Mã xác thực hợp lệ', resetToken }
    }

    async login(data: LoginUserBodyType, ipAddress: string) {
        const user = await this.authRepo.findUserByEmail(data.email.toLowerCase())
        if (!user || !(await bcrypt.compare(data.password, user.passwordHash))) {
            throw new AppError('Email hoặc mật khẩu không đúng', 401)
        }
        if (user.status !== 'ACTIVE') throw new AppError('Tài khoản không hoạt động', 403)

        const tokenUser = { userId: user.id, roleId: user.roleId }
        const refreshToken = this.createRefreshToken(tokenUser)

        await this.authRepo.createDeviceSession({
            userId: user.id,
            refreshToken,
            ipAddress: ipAddress || 'unknown',
            expiresAt: this.getExpiryDate(envConfig.REFRESH_TOKEN_EXPIRES_IN),
        })

        return {
            accessToken: this.createAccessToken(tokenUser),
            refreshToken,
            user: this.sanitizeUser(user),
        }
    }

    async refresh(refreshToken: string, ipAddress: string) {
        let payload: JwtPayload
        try {
            payload = jwt.verify(refreshToken, envConfig.REFRESH_TOKEN_SECRET) as JwtPayload
        } catch {
            throw new AppError('Refresh token không hợp lệ hoặc đã hết hạn', 401)
        }

        const session = await this.authRepo.findDeviceSession(refreshToken)
        if (!session || session.expiresAt <= new Date() || payload.userId !== session.userId) {
            throw new AppError('Refresh token không hợp lệ hoặc đã hết hạn', 401)
        }
        if (session.user.status !== 'ACTIVE' || session.user.deletedAt) {
            throw new AppError('Tài khoản đã bị khóa hoặc không hoạt động', 403)
        }

        await this.authRepo.deactivateDeviceSession(session.id)
        const tokenUser = { userId: session.user.id, roleId: session.user.roleId }
        const newRefreshToken = this.createRefreshToken(tokenUser)

        await this.authRepo.createDeviceSession({
            userId: session.user.id,
            refreshToken: newRefreshToken,
            ipAddress: ipAddress || 'unknown',
            expiresAt: this.getExpiryDate(envConfig.REFRESH_TOKEN_EXPIRES_IN),
        })

        return {
            accessToken: this.createAccessToken(tokenUser),
            refreshToken: newRefreshToken,
        }
    }

    async logout(refreshToken: string) {
        const session = await this.authRepo.findDeviceSession(refreshToken)
        if (!session) throw new AppError('Refresh token không hợp lệ', 401)
        await this.authRepo.deactivateDeviceSession(session.id)
        return { message: 'Đăng xuất thành công' }
    }

    // ==========================================
    // 4. PASSWORD MANAGEMENT
    // ==========================================

    async forgotPassword(email: string) {
        const user = await this.authRepo.findUserByEmail(email.toLowerCase())
        const genericMessage = { message: 'Nếu email tồn tại trong hệ thống, mã xác thực đã được gửi tới hộp thư của bạn' }
        if (!user) return genericMessage

        try {
            const code = await this.createVerificationCode(user.email, 'FORGOT_PASSWORD')
            await sendVerificationEmail(user.email, code)
        } catch (error) {
            // Nuốt lỗi 429 để không lộ email tồn tại trong hệ thống
            if (error instanceof AppError && error.statusCode === 429) return genericMessage
            throw error
        }
        return genericMessage
    }

    async resetPassword(data: ResetPasswordBodyType) {
        const tokenPayload = this.verifyResetPasswordToken(data.token)

        const verification = await this.authRepo.findVerificationCodeById(Number(tokenPayload.verificationId))
        if (!verification || verification.isUsed) {
            throw new AppError('Token đặt lại mật khẩu đã được sử dụng hoặc không hợp lệ', 401)
        }

        const user = await this.authRepo.findUserByEmail(verification.email)
        if (!user) throw new AppError('Tài khoản không tồn tại', 404)

        await this.authRepo.updatePassword(user.id, await bcrypt.hash(data.newPassword, 10))
        await this.authRepo.markVerificationCodeUsed(verification.id)
        await this.authRepo.deactivateAllUserSessions(user.id)

        return { message: 'Đặt lại mật khẩu thành công' }
    }

    async changePassword(userId: number, data: ChangePasswordBodyType) {
        const user = await this.authRepo.findUserById(userId)
        if (!user || !(await bcrypt.compare(data.oldPassword, user.passwordHash))) {
            throw new AppError('Mật khẩu cũ không đúng', 401)
        }
        if (data.newPassword === data.oldPassword) {
            throw new AppError('Mật khẩu mới không được trùng với mật khẩu cũ', 400)
        }

        await this.authRepo.updatePassword(user.id, await bcrypt.hash(data.newPassword, 10))
        await this.authRepo.deactivateAllUserSessions(user.id)

        return { message: 'Đổi mật khẩu thành công. Vui lòng đăng nhập lại.' }
    }
}

```

# src\modules\identity\identity.routes.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\identity\identity.routes.ts` |
| Size | 499 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:09:17.293412 |

```typescript
import { Router } from 'express'
import { authRouter } from './auth/auth.routes'
import { userRouter } from './user/user.routes'
import { rolePermissionRouter } from './role-permission/role-permission.routes'
import { addressRouter } from './address/address.routes'

export const identityRouter = Router()

identityRouter.use('/auth', authRouter)
identityRouter.use('/users', userRouter)
identityRouter.use('/roles', rolePermissionRouter)
identityRouter.use('/addresses', addressRouter)

```

# src\modules\identity\role-permission\role-permission.controller.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\identity\role-permission\role-permission.controller.ts` |
| Size | 3,554 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:07.582656 |

```typescript
import { Request, Response, NextFunction } from 'express'
import { AppError } from '@/common/errors'
import { RolePermissionService } from './role-permission.service'

export class RolePermissionController {
  constructor(private service = new RolePermissionService()) {}

  private getActorId(req: Request) {
    const user = (req as any).user
    const id = user?.userId ?? user?.id
    if (!id) throw new AppError('Chưa xác thực người dùng', 401)
    return Number(id)
  }

  listRoles = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({ statusCode: 200, data: await this.service.listRoles(req.query as any) })
    } catch (error) {
      next(error)
    }
  }

  getRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({ statusCode: 200, data: await this.service.getRole(Number(req.params.roleId)) })
    } catch (error) {
      next(error)
    }
  }

  createRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.createRole(req.body, this.getActorId(req))
      return res.status(201).json({ statusCode: 201, message: 'Tạo vai trò thành công', data })
    } catch (error) {
      next(error)
    }
  }

  updateRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.updateRole(Number(req.params.roleId), req.body, this.getActorId(req))
      return res.status(200).json({ statusCode: 200, message: 'Cập nhật vai trò thành công', data })
    } catch (error) {
      next(error)
    }
  }

  deleteRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({ statusCode: 200, ...(await this.service.deleteRole(Number(req.params.roleId), this.getActorId(req))) })
    } catch (error) {
      next(error)
    }
  }

  listPermissions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({ statusCode: 200, data: await this.service.listPermissions(req.query as any) })
    } catch (error) {
      next(error)
    }
  }

  getPermission = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({ statusCode: 200, data: await this.service.getPermission(Number(req.params.permissionId)) })
    } catch (error) {
      next(error)
    }
  }

  createPermission = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.createPermission(req.body, this.getActorId(req))
      return res.status(201).json({ statusCode: 201, message: 'Tạo permission thành công', data })
    } catch (error) {
      next(error)
    }
  }

  updatePermission = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.updatePermission(Number(req.params.permissionId), req.body, this.getActorId(req))
      return res.status(200).json({ statusCode: 200, message: 'Cập nhật permission thành công', data })
    } catch (error) {
      next(error)
    }
  }

  deletePermission = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({ statusCode: 200, ...(await this.service.deletePermission(Number(req.params.permissionId), this.getActorId(req))) })
    } catch (error) {
      next(error)
    }
  }
}

```

# src\modules\identity\role-permission\role-permission.repo.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\identity\role-permission\role-permission.repo.ts` |
| Size | 4,544 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:06.431311 |

```typescript
import { prisma } from '@/database/prisma'
import {
    CreatePermissionBodyType,
    CreateRoleBodyType,
    GetPermissionQueryType,
    GetRolePermissionQueryType,
    UpdatePermissionBodyType,
    UpdateRoleBodyType,
} from './role-permission.schema'

const permissionSelect = { id: true, code: true, module: true, description: true } as const
const roleInclude = {
    permissions: { where: { deletedAt: null }, select: permissionSelect },
    _count: { select: { users: true } },
} as const

export class RolePermissionRepo {
    async listRoles(query: GetRolePermissionQueryType) {
        const skip = (query.page - 1) * query.limit
        const where = {
            deletedAt: null,
            ...(query.search
                ? { OR: [{ name: { contains: query.search, mode: 'insensitive' as const } }, { code: { contains: query.search, mode: 'insensitive' as const } }] }
                : {}),
        }
        const [totalItems, data] = await Promise.all([
            prisma.role.count({ where }),
            prisma.role.findMany({ where, skip, take: query.limit, include: roleInclude, orderBy: { createdAt: 'desc' } }),
        ])
        return { data, totalItems, page: query.page, limit: query.limit, totalPages: Math.ceil(totalItems / query.limit) }
    }

    async findRoleById(id: number) {
        return prisma.role.findFirst({ where: { id, deletedAt: null }, include: roleInclude })
    }

    async findRoleByCode(code: string) {
        return prisma.role.findFirst({ where: { code, deletedAt: null }, include: roleInclude })
    }

    async createRole(data: CreateRoleBodyType, createdById: number) {
        const { permissionIds = [], ...roleData } = data
        return prisma.role.create({ data: { ...roleData, createdById, permissions: { connect: permissionIds.map((id) => ({ id })) } }, include: roleInclude })
    }

    async updateRole(id: number, data: UpdateRoleBodyType, updatedById: number) {
        const { permissionIds, ...roleData } = data
        return prisma.role.update({
            where: { id },
            data: { ...roleData, updatedById, ...(permissionIds !== undefined && { permissions: { set: permissionIds.map((permissionId) => ({ id: permissionId })) } }) },
            include: roleInclude,
        })
    }

    async softDeleteRole(id: number, deletedById: number) {
        return prisma.role.update({ where: { id }, data: { deletedAt: new Date(), deletedById, isActive: false } })
    }

    async listPermissions(query: GetPermissionQueryType) {
        const skip = (query.page - 1) * query.limit
        const where = {
            deletedAt: null,
            ...(query.module ? { module: query.module } : {}),
            ...(query.search
                ? { OR: [{ code: { contains: query.search, mode: 'insensitive' as const } }, { module: { contains: query.search, mode: 'insensitive' as const } }, { description: { contains: query.search, mode: 'insensitive' as const } }] }
                : {}),
        }
        const [totalItems, data] = await Promise.all([
            prisma.permission.count({ where }),
            prisma.permission.findMany({ where, skip, take: query.limit, select: { ...permissionSelect, _count: { select: { roles: true } } }, orderBy: [{ module: 'asc' }, { code: 'asc' }] }),
        ])
        return { data, totalItems, page: query.page, limit: query.limit, totalPages: Math.ceil(totalItems / query.limit) }
    }

    async findPermissionById(id: number) {
        return prisma.permission.findFirst({ where: { id, deletedAt: null }, select: { ...permissionSelect, roles: { where: { deletedAt: null }, select: { id: true, code: true, name: true } } } })
    }

    async findPermissionByCode(code: string) {
        return prisma.permission.findFirst({ where: { code, deletedAt: null }, select: permissionSelect })
    }

    async createPermission(data: CreatePermissionBodyType, createdById: number) {
        return prisma.permission.create({ data: { ...data, createdById }, select: permissionSelect })
    }

    async updatePermission(id: number, data: UpdatePermissionBodyType, updatedById: number) {
        return prisma.permission.update({ where: { id }, data: { ...data, updatedById }, select: permissionSelect })
    }

    async softDeletePermission(id: number, deletedById: number) {
        return prisma.permission.update({ where: { id }, data: { deletedAt: new Date(), deletedById }, select: permissionSelect })
    }
}


```

# src\modules\identity\role-permission\role-permission.routes.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\identity\role-permission\role-permission.routes.ts` |
| Size | 1,983 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:06.432310 |

```typescript
import { Router } from 'express'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import { authGuard } from '@/middlewares/guards/auth.guard'
import { roleGuard } from '@/middlewares/guards/role.guard'
import { RolePermissionController } from './role-permission.controller'
import {
	createPermissionBodySchema,
	createRoleBodySchema,
	getPermissionQuerySchema,
	getRolePermissionQuerySchema,
	permissionParamsSchema,
	roleParamsSchema,
	updatePermissionBodySchema,
	updateRoleBodySchema,
} from './role-permission.schema'

export const rolePermissionRouter = Router()
const controller = new RolePermissionController()

rolePermissionRouter.use(authGuard, roleGuard('ADMIN'))

rolePermissionRouter.get('/', validateRequest({ query: getRolePermissionQuerySchema }), controller.listRoles)
rolePermissionRouter.get('/permissions', validateRequest({ query: getPermissionQuerySchema }), controller.listPermissions)
rolePermissionRouter.get('/permissions/:permissionId', validateRequest({ params: permissionParamsSchema }), controller.getPermission)
rolePermissionRouter.post('/permissions', validateRequest({ body: createPermissionBodySchema }), controller.createPermission)
rolePermissionRouter.put('/permissions/:permissionId', validateRequest({ params: permissionParamsSchema, body: updatePermissionBodySchema }), controller.updatePermission)
rolePermissionRouter.delete('/permissions/:permissionId', validateRequest({ params: permissionParamsSchema }), controller.deletePermission)
rolePermissionRouter.get('/:roleId', validateRequest({ params: roleParamsSchema }), controller.getRole)
rolePermissionRouter.post('/', validateRequest({ body: createRoleBodySchema }), controller.createRole)
rolePermissionRouter.put('/:roleId', validateRequest({ params: roleParamsSchema, body: updateRoleBodySchema }), controller.updateRole)
rolePermissionRouter.delete('/:roleId', validateRequest({ params: roleParamsSchema }), controller.deleteRole)

```

# src\modules\identity\role-permission\role-permission.schema.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\identity\role-permission\role-permission.schema.ts` |
| Size | 2,432 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:06.433312 |

```typescript
import { z } from 'zod'

export const roleParamsSchema = z.object({
  roleId: z.coerce.number().int().positive('roleId phải là số nguyên dương'),
})

export const getRolePermissionQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().trim().optional(),
})

export const createRoleBodySchema = z.object({
  name: z.string().trim().min(1, 'Tên vai trò không được để trống').max(100),
  code: z
    .string()
    .trim()
    .min(1, 'Mã vai trò không được để trống')
    .max(50)
    .toUpperCase(),
  permissionIds: z.array(z.number().int().positive()).max(100).optional().default([]),
})

export const updateRoleBodySchema = z.object({
  name: z.string().trim().min(1).max(100).optional(),
  isActive: z.boolean().optional(),
  permissionIds: z.array(z.number().int().positive()).max(100).optional(),
})

export const createPermissionBodySchema = z.object({
  code: z.string().trim().min(1).max(150).toUpperCase(),
  module: z.string().trim().min(1).max(100),
  description: z.string().trim().max(1000).nullable().optional(),
})

export const updatePermissionBodySchema = z.object({
  module: z.string().trim().min(1).max(100).optional(),
  description: z.string().trim().max(1000).nullable().optional(),
})

export const permissionParamsSchema = z.object({
  permissionId: z.coerce.number().int().positive('permissionId phải là số nguyên dương'),
})

export const getPermissionQuerySchema = z.object({
  page: z.coerce.number().int().positive().max(100).default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().trim().optional(),
  module: z.string().trim().optional(),
})

export type RoleParamsType = z.infer<typeof roleParamsSchema>
export type CreateRoleBodyType = z.infer<typeof createRoleBodySchema>
export type UpdateRoleBodyType = z.infer<typeof updateRoleBodySchema>
export type GetRolePermissionQueryType = z.infer<typeof getRolePermissionQuerySchema>
export type CreatePermissionBodyType = z.infer<typeof createPermissionBodySchema>
export type UpdatePermissionBodyType = z.infer<typeof updatePermissionBodySchema>
export type PermissionParamsType = z.infer<typeof permissionParamsSchema>
export type GetPermissionQueryType = z.infer<typeof getPermissionQuerySchema>

```

# src\modules\identity\role-permission\role-permission.service.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\identity\role-permission\role-permission.service.ts` |
| Size | 2,513 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:07.583652 |

```typescript
import { AppError } from '@/common/errors'
import { RolePermissionRepo } from './role-permission.repo'
import {
  CreatePermissionBodyType,
  CreateRoleBodyType,
  GetPermissionQueryType,
  GetRolePermissionQueryType,
  UpdatePermissionBodyType,
  UpdateRoleBodyType,
} from './role-permission.schema'

export class RolePermissionService {
  constructor(private repo = new RolePermissionRepo()) {}

  listRoles(query: GetRolePermissionQueryType) {
    return this.repo.listRoles(query)
  }

  async getRole(id: number) {
    const role = await this.repo.findRoleById(id)
    if (!role) throw new AppError('Vai trò không tồn tại', 404)
    return role
  }

  async createRole(data: CreateRoleBodyType, actorId: number) {
    if (await this.repo.findRoleByCode(data.code)) throw new AppError('Mã vai trò đã tồn tại', 409)
    return this.repo.createRole(data, actorId)
  }

  async updateRole(id: number, data: UpdateRoleBodyType, actorId: number) {
    await this.getRole(id)
    return this.repo.updateRole(id, data, actorId)
  }

  async deleteRole(id: number, actorId: number) {
    const role = await this.getRole(id)
    if (role.code === 'CUSTOMER' || role.code === 'ADMIN') throw new AppError('Không được xóa role hệ thống', 400)
    if (role._count?.users > 0) {
      throw new AppError('Không thể xóa vai trò đang có người dùng sử dụng', 400)
    }
    await this.repo.softDeleteRole(id, actorId)
    return { message: 'Xóa vai trò thành công' }
  }

  listPermissions(query: GetPermissionQueryType) {
    return this.repo.listPermissions(query)
  }

  async getPermission(id: number) {
    const permission = await this.repo.findPermissionById(id)
    if (!permission) throw new AppError('Permission không tồn tại', 404)
    return permission
  }

  async createPermission(data: CreatePermissionBodyType, actorId: number) {
    if (await this.repo.findPermissionByCode(data.code)) throw new AppError('Mã permission đã tồn tại', 409)
    return this.repo.createPermission(data, actorId)
  }

  async updatePermission(id: number, data: UpdatePermissionBodyType, actorId: number) {
    await this.getPermission(id)
    return this.repo.updatePermission(id, data, actorId)
  }

  async deletePermission(id: number, actorId: number) {
    await this.getPermission(id)
    await this.repo.softDeletePermission(id, actorId)
    return { message: 'Xóa permission thành công' }
  }
}

```

# src\modules\identity\user\user.controller.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\identity\user\user.controller.ts` |
| Size | 3,358 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:07.604839 |

```typescript
import { Request, Response, NextFunction } from 'express'
import { UserService } from './user.service'
import { GetUserQueryType, UpdateUserBodyType, UpdateUserStatusBodyType } from './user.schema'
import { AppError } from '@/common/errors'

export class UserController {
    constructor(private userService = new UserService()) { }

    private getCurrentUser(req: Request) {
        const user = (req as any).user
        const userId = user?.userId ?? user?.id
        if (!userId) throw new AppError('Chưa xác thực người dùng', 401)
        return { userId: Number(userId), roleId: Number(user?.roleId) }
    }

    getListUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const query = req.query as unknown as GetUserQueryType
            const result = await this.userService.listUsers(query)
            return res.status(200).json({
                statusCode: 200,
                data: result,
            })
        }
        catch (error) {
            next(error)
        }
    }

    getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = parseInt(req.params.userId)
            const currentUser = this.getCurrentUser(req)
            const result = await this.userService.getUserById(userId, currentUser)
            return res.status(200).json({
                statusCode: 200,
                data: result,
            })
        }
        catch (error) {
            next(error)
        }
    }

    updateUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = parseInt(req.params.userId)
            const currentUser = this.getCurrentUser(req)
            const data: UpdateUserBodyType = req.body
            const result = await this.userService.updateUser(userId, currentUser, data)
            return res.status(200).json({
                statusCode: 200,
                message: 'Cập nhật thông tin thành công',
                data: result,
            })
        }
        catch (error) {
            next(error)
        }
    }

    updateStatus = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = parseInt(req.params.userId)
            const currentUser = this.getCurrentUser(req)
            const data: UpdateUserStatusBodyType = req.body
            const result = await this.userService.updateStatus(userId, currentUser.userId, data)
            return res.status(200).json({
                statusCode: 200,
                message: 'Cập nhật trạng thái thành công',
                data: result,
            })
        }
        catch (error) {
            next(error)
        }
    }

    deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = parseInt(req.params.userId)
            const currentUser = this.getCurrentUser(req)
            await this.userService.deleteUser(userId, currentUser.userId)
            return res.status(200).json({
                statusCode: 200,
                message: 'Xóa người dùng thành công',
            })
        }
        catch (error) {
            next(error)
        }
    }
}
```

# src\modules\identity\user\user.repo.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\identity\user\user.repo.ts` |
| Size | 4,289 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:07.605838 |

```typescript
import { prisma } from '@/database/prisma'
import { GetUserQueryType, UpdateUserBodyType, UpdateUserStatusBodyType} from './user.schema'

export class UserRepo {
    async list(query: GetUserQueryType) {
        const skip = (query.page - 1) * query.limit
        const take = query.limit

        const where: any = { deletedAt: null }
        if (query.status) where.status = query.status
        if (query.roleId) where.roleId = query.roleId
        if (query.search) {
            where.OR = [
                { email: { contains: query.search, mode: 'insensitive' } },
                { fullName: { contains: query.search, mode: 'insensitive' } },
            ]
        }

        const [totalItems, data] = await Promise.all([
            prisma.user.count({ where }),
            prisma.user.findMany({
                where,
                skip,
                take,
                select: {
                    id: true,
                    email: true,
                    fullName: true,
                    phoneNumber: true,
                    avatarUrl: true,
                    status: true,
                    role: { select: { id: true, name: true, code: true } },
                    createdAt: true,
                },
                orderBy: { createdAt: 'desc' },
            }),
        ])

        return {
            data,
            totalItems,
            page: query.page,
            limit: query.limit,
            totalPages: Math.ceil(totalItems / query.limit),
        }
    }

    //Lấy chi tiết 1 User
    async findById(id: number) {
        return prisma.user.findFirst({
            where: { id, deletedAt: null },
            select: {
                id: true,
                email: true,
                fullName: true,
                phoneNumber: true,
                avatarUrl: true,
                status: true,
                role: { select: { id: true, name: true, code: true } },
                shippingAddresses: true,
                createdAt: true,
                updatedAt: true,
            },
        })
    }

    // 3. Tìm user bằng email
    async findByEmail(email: string) {
        return prisma.user.findFirst({
            where: { email, deletedAt: null },
        })
    }

    // 4. Cập nhật hồ sơ
    async updateUser({
        id,
        updatedById,
        data,
    }: {
        id: number
        updatedById: number
        data: UpdateUserBodyType
    }) {
        return prisma.user.update({
            where: { id },
            data: {
                ...data,
                updatedById,
            },
            select: {
                id: true,
                email: true,
                fullName: true,
                phoneNumber: true,
                avatarUrl: true,
                status: true,
            },
        })
    }

    // 5. Cập nhật trạng thái
    async updateStatus({
        id,
        updatedById,
        data,
    }: {
        id: number
        updatedById: number
        data: UpdateUserStatusBodyType
    }) {
        return prisma.$transaction(async (tx) => {
            if (data.status === 'BLOCKED' || data.status === 'INACTIVE') {
                await tx.deviceSession.updateMany({
                    where: { userId: id, isActive: true },
                    data: { isActive: false },
                })
            }
            return tx.user.update({
                where: { id },
                data: {
                    status: data.status,
                    updatedById,
                },
            })
        })
    }

    // 6. Xóa mềm (Soft Delete)
    async deleteUser({ id, deletedById }: { id: number; deletedById: number }) {
        return prisma.$transaction(async (tx) => {
            await tx.deviceSession.updateMany({
                where: { userId: id, isActive: true },
                data: { isActive: false },
            })
            return tx.user.update({
                where: { id },
                data: {
                    deletedAt: new Date(),
                    deletedById,
                },
            })
        })
    }
}
```

# src\modules\identity\user\user.routes.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\identity\user\user.routes.ts` |
| Size | 1,350 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:07.607841 |

```typescript
import { Router } from 'express'
import { UserController } from './user.controller'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import { authGuard } from '@/middlewares/guards/auth.guard'
import { roleGuard } from '@/middlewares/guards/role.guard'
import { getUserQuerySchema, updateUserBodySchema, updateUserStatusBodySchema, userParamsSchema } from './user.schema'

export const userRouter = Router()
const controller = new UserController()

userRouter.use(authGuard)

// Danh sách user: chỉ ADMIN / STAFF xem được
userRouter.get('/', roleGuard('ADMIN'), validateRequest({ query: getUserQuerySchema }), controller.getListUsers)

// Xem chi tiết user
userRouter.get('/:userId', validateRequest({ params: userParamsSchema }), controller.getUserById)

// Cập nhật thông tin user
userRouter.put('/:userId', validateRequest({ params: userParamsSchema, body: updateUserBodySchema }), controller.updateUser)

// Cập nhật trạng thái (ACTIVE, BLOCKED, INACTIVE): chỉ ADMIN
userRouter.patch('/:userId/status', roleGuard('ADMIN'), validateRequest({ params: userParamsSchema, body: updateUserStatusBodySchema }), controller.updateStatus)

// Xóa user: chỉ ADMIN
userRouter.delete('/:userId', roleGuard('ADMIN'), validateRequest({ params: userParamsSchema }), controller.deleteUser)


```

# src\modules\identity\user\user.schema.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\identity\user\user.schema.ts` |
| Size | 1,204 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:07.608881 |

```typescript
import { z } from 'zod'

export const userParamsSchema = z.object({
    userId: z.coerce.number().int().positive('userId phải là số nguyên dương'),
})

export const getUserQuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().default(10),
    search: z.string().optional(),
    status: z.enum(['ACTIVE', 'INACTIVE', 'BLOCKED']).optional(),
    roleId: z.coerce.number().int().positive().optional(),
})

export const updateUserBodySchema = z.object({
    fullName: z.string().trim().min(1).max(100).optional(),
    phoneNumber: z.string().trim().min(1, 'Số điện thoại là bắt buộc').max(50).optional(),
    avatarUrl: z.string().url('Avatar không hợp lệ').optional().nullable(),
})

export const updateUserStatusBodySchema = z.object({
    status: z.enum(['ACTIVE', 'INACTIVE', 'BLOCKED']),
})      

export type UserParamsType = z.infer<typeof userParamsSchema>
export type GetUserQueryType = z.infer<typeof getUserQuerySchema>
export type UpdateUserBodyType = z.infer<typeof updateUserBodySchema>
export type UpdateUserStatusBodyType = z.infer<typeof updateUserStatusBodySchema>
```

# src\modules\identity\user\user.service.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\identity\user\user.service.ts` |
| Size | 2,539 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:07.610838 |

```typescript
import { UserRepo } from './user.repo'
import { GetUserQueryType, UpdateUserBodyType, UpdateUserStatusBodyType } from './user.schema'
import { AppError, ForbiddenError, NotFoundError } from '@/common/errors'
import { prisma } from '@/database/prisma'

export class UserService {
    private userRepo = new UserRepo()

    private async isAdmin(roleId: number) {
        if (!roleId) return false
        const role = await prisma.role.findFirst({ where: { id: roleId, isActive: true, deletedAt: null } })
        return role?.code === 'ADMIN'
    }

    async listUsers(query: GetUserQueryType) {
        return this.userRepo.list(query)
    }

    async getUserById(userId: number, currentUser: { userId: number; roleId: number }) {
        if (currentUser.userId !== userId && !(await this.isAdmin(currentUser.roleId))) {
            throw new ForbiddenError('Bạn không có quyền xem thông tin người dùng này')
        }
        const user = await this.userRepo.findById(userId)
        if (!user) {
            throw new NotFoundError('Người dùng không tồn tại')
        }
        return user
    }

    async updateUser(userId: number, currentUser: { userId: number; roleId: number }, data: UpdateUserBodyType) {
        if (currentUser.userId !== userId && !(await this.isAdmin(currentUser.roleId))) {
            throw new ForbiddenError('Bạn không có quyền cập nhật thông tin người dùng này')
        }
        const user = await this.userRepo.findById(userId)
        if (!user) {
            throw new NotFoundError('Người dùng không tồn tại')
        }
        return this.userRepo.updateUser({ id: userId, updatedById: currentUser.userId, data })
    }
    async updateStatus(userId: number, CurrentUserId: number, data: UpdateUserStatusBodyType) {
        const user = await this.userRepo.findById(userId)
        if (!user) throw new NotFoundError('Người dùng không tồn tại')
        return this.userRepo.updateStatus({ id: userId, updatedById: CurrentUserId, data })
    }
    async deleteUser(userId: number, CurrentUserId: number) {
        if (userId === CurrentUserId) {
            throw new AppError('Bạn không thể tự xóa tài khoản của chính mình', 400)
        }
        const user = await this.userRepo.findById(userId)
        if (!user) throw new NotFoundError('Người dùng không tồn tại')
        return this.userRepo.deleteUser({ id: userId, deletedById: CurrentUserId })
    }   
}

```

# src\modules\inventory-sale\flash-sale\flash-sale.controller.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\inventory-sale\flash-sale\flash-sale.controller.ts` |
| Size | 3,138 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:34:07.892946 |

```typescript
import { Request, Response, NextFunction } from 'express'
import { FlashSaleService } from './flash-sale.service'
import {
    CreateFlashSaleBodyType, GetFlashSaleParamsType, GetFlashSaleQueryType, UpdateFlashSaleBodyType,
} from './flash-sale.schema'

export class FlashSaleController {
    constructor(private flashSaleService = new FlashSaleService()) { }

    list = async (req: Request<unknown, unknown, unknown, GetFlashSaleQueryType>, res: Response, next: NextFunction) => {
        try {
            const query = req.query as unknown as GetFlashSaleQueryType
            const result = await this.flashSaleService.list(query)
            return res.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }

    findActive = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await this.flashSaleService.findActiveCampaigns()
            return res.status(200).json({ statusCode: 200, data })
        } catch (err) {
            next(err)
        }
    }

    findById = async (req: Request<GetFlashSaleParamsType, unknown, unknown, unknown>, res: Response, next: NextFunction) => {
        try {
            const campaignId = Number(req.params.campaignId)
            const data = await this.flashSaleService.findById(campaignId)
            return res.status(200).json({ statusCode: 200, data })
        } catch (err) {
            next(err)
        }
    }

    create = async (
        req: Request<unknown, unknown, CreateFlashSaleBodyType, unknown>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const body = req.body as CreateFlashSaleBodyType
            const data = await this.flashSaleService.create(body)
            return res.status(201).json({
                statusCode: 201,
                message: 'Tạo chiến dịch Flash Sale thành công',
                data,
            })
        } catch (err) {
            next(err)
        }
    }

    update = async (
        req: Request<GetFlashSaleParamsType, unknown, UpdateFlashSaleBodyType, unknown>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const campaignId = Number(req.params.campaignId)
            const body = req.body as UpdateFlashSaleBodyType
            const data = await this.flashSaleService.update(campaignId, body)
            return res.status(200).json({
                statusCode: 200,
                message: 'Cập nhật chiến dịch Flash Sale thành công',
                data,
            })
        } catch (err) {
            next(err)
        }
    }

    delete = async (
        req: Request<GetFlashSaleParamsType, unknown, unknown, unknown>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const campaignId = Number(req.params.campaignId)
            const result = await this.flashSaleService.delete(campaignId)
            return res.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }
}
```

# src\modules\inventory-sale\flash-sale\flash-sale.repo.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\inventory-sale\flash-sale\flash-sale.repo.ts` |
| Size | 6,863 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:34:07.894956 |

```typescript
import { prisma } from '@/database/prisma'
import {CreateFlashSaleBodyType,GetFlashSaleQueryType,UpdateFlashSaleBodyType,} from './flash-sale.schema'

const flashSaleItemsInclude = {
    items: {
        include: {
            variant: {
                select: {
                    sku: true,
                    stockQuantity: true,
                    originalPrice: true,
                    sellingPrice: true,
                    product: {
                        select: {
                            defaultName: true,
                        },
                    },
                },
            },
        },
    },
} as const

export class FlashSaleRepo {
    async list(query: GetFlashSaleQueryType) {
        const skip = (query.page - 1) * query.limit
        const take = query.limit

        const where = {
            deletedAt: null,
            ...(query.isActive !== undefined
                ? { isActive: query.isActive }
                : {}),
        }

        const [totalItems, data] = await Promise.all([
            prisma.flashSaleCampaign.count({
                where,
            }),

            prisma.flashSaleCampaign.findMany({
                where,
                skip,
                take,
                include: flashSaleItemsInclude,
                orderBy: {
                    createdAt: 'desc',
                },
            }),
        ])

        return {
            data,
            totalItems,
            page: query.page,
            limit: query.limit,
            totalPages: Math.ceil(
                totalItems / query.limit
            ),
        }
    }

    async findActiveCampaigns() {
        const now = new Date()

        return prisma.flashSaleCampaign.findMany({
            where: {
                deletedAt: null,
                isActive: true,
                startTime: {
                    lte: now,
                },
                endTime: {
                    gte: now,
                },
            },

            include: flashSaleItemsInclude,

            orderBy: {
                endTime: 'asc',
            },
        })
    }

    async findById(campaignId: number) {
        return prisma.flashSaleCampaign.findFirst({
            where: {
                id: campaignId,
                deletedAt: null,
            },

            include: flashSaleItemsInclude,
        })
    }

    async findVariantsForFlashSale(
        variantIds: number[]
    ) {
        return prisma.productVariant.findMany({
            where: {
                id: {
                    in: variantIds,
                },
                deletedAt: null,
            },

            select: {
                id: true,
                sku: true,
                stockQuantity: true,
                sellingPrice: true,
            },
        })
    }

    async create(data: CreateFlashSaleBodyType) {
        const { items, ...campaignData } = data

        return prisma.flashSaleCampaign.create({
            data: {
                ...campaignData,

                items: {
                    create: items.map((item) => ({
                        variantId: item.variantId,
                        flashSalePrice: item.flashSalePrice,
                        promoQuantity: item.promoQuantity,
                        soldQuantity: 0,
                    })),
                },
            },

            include: flashSaleItemsInclude,
        })
    }

    async update(
        campaignId: number,
        data: UpdateFlashSaleBodyType
    ) {
        const { items, ...campaignData } = data

        return prisma.$transaction(async (tx) => {
            if (items !== undefined) {

                const existingItems =
                    await tx.flashSaleItem.findMany({
                        where: {
                            campaignId,
                        },

                        select: {
                            variantId: true,
                            soldQuantity: true,
                        },
                    })

                const soldQuantityMap = new Map(
                    existingItems.map((item) => [
                        item.variantId,
                        item.soldQuantity,
                    ])
                )

                const incomingVariantIds =
                    items.map((item) => item.variantId)

                await tx.flashSaleItem.deleteMany({
                    where: {
                        campaignId,

                        variantId: {
                            notIn: incomingVariantIds,
                        },
                    },
                })


                for (const item of items) {
                    const soldQuantity =
                        soldQuantityMap.get(item.variantId) ?? 0

                    await tx.flashSaleItem.upsert({
                        where: {
                            campaignId_variantId: {
                                campaignId,
                                variantId: item.variantId,
                            },
                        },

                        update: {
                            flashSalePrice:
                                item.flashSalePrice,

                            promoQuantity:
                                item.promoQuantity,

                            soldQuantity,
                        },

                        create: {
                            campaignId,

                            variantId:
                                item.variantId,

                            flashSalePrice:
                                item.flashSalePrice,

                            promoQuantity:
                                item.promoQuantity,

                            soldQuantity: 0,
                        },
                    })
                }
            }

            return tx.flashSaleCampaign.update({
                where: {
                    id: campaignId,
                },

                data: campaignData,

                include: flashSaleItemsInclude,
            })
        })
    }

    async delete(
        campaignId: number,
        isHard = false
    ) {
        if (isHard) {
            return prisma.flashSaleCampaign.delete({
                where: {
                    id: campaignId,
                },
            })
        }

        return prisma.flashSaleCampaign.update({
            where: {
                id: campaignId,
            },

            data: {
                deletedAt: new Date(),
            },
        })
    }
}
```

# src\modules\inventory-sale\flash-sale\flash-sale.routes.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\inventory-sale\flash-sale\flash-sale.routes.ts` |
| Size | 503 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:34:07.896949 |

```typescript
import { Router } from 'express'
import { FlashSaleController } from './flash-sale.controller'

export const flashSaleRouter = Router()
const controller = new FlashSaleController()

flashSaleRouter.get('/active', controller.findActive)
flashSaleRouter.get('/', controller.list)
flashSaleRouter.get('/:campaignId', controller.findById)
flashSaleRouter.post('/', controller.create)
flashSaleRouter.put('/:campaignId', controller.update)
flashSaleRouter.delete('/:campaignId', controller.delete)
```

# src\modules\inventory-sale\flash-sale\flash-sale.schema.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\inventory-sale\flash-sale\flash-sale.schema.ts` |
| Size | 3,385 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:34:07.897945 |

```typescript
import { z } from 'zod'

export const flashSaleItemPayloadSchema = z.object({
    variantId: z
        .number()
        .int()
        .positive('variantId phải là số nguyên dương'),

    flashSalePrice: z
        .number()
        .positive('Giá flash sale phải lớn hơn 0'),

    promoQuantity: z
        .number()
        .int()
        .positive('Số lượng khuyến mãi phải lớn hơn 0'),
})

const flashSaleItemsSchema = z
    .array(flashSaleItemPayloadSchema)
    .min(1, 'Phải có ít nhất 1 sản phẩm trong Flash Sale')
    .refine(
        (items) => {
            const variantIds = items.map((item) => item.variantId)

            return new Set(variantIds).size === variantIds.length
        },
        {
            message: 'Không được có sản phẩm trùng trong Flash Sale',
        }
    )

export const getFlashSaleQuerySchema = z.object({
    page: z.coerce
        .number()
        .int()
        .positive()
        .default(1),

    limit: z.coerce
        .number()
        .int()
        .positive()
        .default(10),

    isActive: z
        .enum(['true', 'false'])
        .transform((value) => value === 'true')
        .optional(),
})

export const getFlashSaleParamsSchema = z.object({
    campaignId: z.coerce
        .number()
        .int()
        .positive('campaignId phải là số nguyên dương'),
})

export const createFlashSaleBodySchema = z
    .object({
        name: z
            .string()
            .min(1, 'Tên chiến dịch không được để trống')
            .max(255),

        bannerUrl: z
            .string()
            .max(1000)
            .optional(),

        startTime: z.coerce.date({
            required_error: 'Thời gian bắt đầu là bắt buộc',
        }),

        endTime: z.coerce.date({
            required_error: 'Thời gian kết thúc là bắt buộc',
        }),

        isActive: z
            .boolean()
            .optional()
            .default(true),

        items: flashSaleItemsSchema,
    })
    .refine(
        (data) => data.startTime < data.endTime,
        {
            message: 'Thời gian kết thúc phải sau thời gian bắt đầu',
            path: ['endTime'],
        }
    )

export const updateFlashSaleBodySchema = z
    .object({
        name: z
            .string()
            .min(1, 'Tên chiến dịch không được để trống')
            .max(255)
            .optional(),

        bannerUrl: z
            .string()
            .max(1000)
            .optional(),

        startTime: z.coerce
            .date()
            .optional(),

        endTime: z.coerce
            .date()
            .optional(),

        isActive: z
            .boolean()
            .optional(),

        items: flashSaleItemsSchema.optional(),
    })

export type FlashSaleItemPayloadType =
    z.infer<typeof flashSaleItemPayloadSchema>

export type GetFlashSaleQueryType =
    z.infer<typeof getFlashSaleQuerySchema>

export type GetFlashSaleParamsType =
    z.infer<typeof getFlashSaleParamsSchema>

export type CreateFlashSaleBodyType =
    z.infer<typeof createFlashSaleBodySchema>

export type UpdateFlashSaleBodyType =
    z.infer<typeof updateFlashSaleBodySchema>
```

# src\modules\inventory-sale\flash-sale\flash-sale.service.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\inventory-sale\flash-sale\flash-sale.service.ts` |
| Size | 5,154 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:34:07.899944 |

```typescript
import { FlashSaleRepo } from './flash-sale.repo'
import {
    CreateFlashSaleBodyType,
    GetFlashSaleQueryType,
    UpdateFlashSaleBodyType,
} from './flash-sale.schema'
import { AppError } from '@/common/errors'

export class FlashSaleService {
    constructor(
        private flashSaleRepo = new FlashSaleRepo()
    ) {}

    async list(query: GetFlashSaleQueryType) {
        return this.flashSaleRepo.list(query)
    }

    async findActiveCampaigns() {
        return this.flashSaleRepo.findActiveCampaigns()
    }

    async findById(campaignId: number) {
        const campaign =
            await this.flashSaleRepo.findById(campaignId)

        if (!campaign) {
            throw new AppError(
                'Chiến dịch Flash Sale không tồn tại hoặc đã bị xóa',
                404
            )
        }

        return campaign
    }

    private validateUniqueVariantIds(
        items: {
            variantId: number
        }[]
    ) {
        const variantIds =
            items.map((item) => item.variantId)

        if (
            new Set(variantIds).size !==
            variantIds.length
        ) {
            throw new AppError(
                'Không được có sản phẩm trùng trong Flash Sale',
                422
            )
        }
    }

    private async validateVariants(
        items: {
            variantId: number
            promoQuantity: number
            flashSalePrice: number
        }[]
    ) {
        this.validateUniqueVariantIds(items)

        const variantIds =
            items.map((item) => item.variantId)

        const variants =
            await this.flashSaleRepo.findVariantsForFlashSale(
                variantIds
            )

        const variantMap = new Map(
            variants.map((variant) => [
                variant.id,
                variant,
            ])
        )

        for (const item of items) {
            const variant =
                variantMap.get(item.variantId)

            if (!variant) {
                throw new AppError(
                    `Biến thể SKU ID ${item.variantId} không tồn tại`,
                    404
                )
            }

            if (
                variant.stockQuantity <
                item.promoQuantity
            ) {
                throw new AppError(
                    `Tồn kho SKU ${variant.sku} không đủ. Tồn kho hiện có: ${variant.stockQuantity}, cấu hình sale: ${item.promoQuantity}`,
                    422
                )
            }

            if (
                item.flashSalePrice >=
                Number(variant.sellingPrice)
            ) {
                throw new AppError(
                    `Giá Flash Sale của SKU ${variant.sku} phải thấp hơn giá bán hiện tại`,
                    422
                )
            }
        }
    }

    async create(
        data: CreateFlashSaleBodyType
    ) {
        await this.validateVariants(data.items)

        return this.flashSaleRepo.create(data)
    }

    async update(
        campaignId: number,
        data: UpdateFlashSaleBodyType
    ) {
        const campaign =
            await this.findById(campaignId)


        const startTime =
            data.startTime ??
            campaign.startTime

        const endTime =
            data.endTime ??
            campaign.endTime

        if (startTime >= endTime) {
            throw new AppError(
                'Thời gian kết thúc phải sau thời gian bắt đầu',
                422
            )
        }

        if (data.items !== undefined) {
            await this.validateVariants(
                data.items
            )

            const existingItemMap =
                new Map(
                    campaign.items.map((item) => [
                        item.variantId,
                        item,
                    ])
                )

            for (const item of data.items) {
                const existingItem =
                    existingItemMap.get(
                        item.variantId
                    )

                if (
                    existingItem &&
                    item.promoQuantity <
                        existingItem.soldQuantity
                ) {
                    throw new AppError(
                        `Không thể giảm số lượng khuyến mãi của variant ${item.variantId} xuống ${item.promoQuantity} vì đã bán ${existingItem.soldQuantity}`,
                        422
                    )
                }
            }
        }

        return this.flashSaleRepo.update(
            campaignId,
            data
        )
    }

    async delete(campaignId: number) {
        await this.findById(campaignId)

        await this.flashSaleRepo.delete(
            campaignId
        )

        return {
            message:
                'Xóa chiến dịch Flash Sale thành công',
        }
    }
}
```

# src\modules\inventory-sale\inventory\inventory.controller.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\inventory-sale\inventory\inventory.controller.ts` |
| Size | 1,803 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:34:07.902946 |

```typescript
import { Request, Response, NextFunction } from 'express'
import { InventoryService } from './inventory.service'
import {
    AdjustStockBodyType,
    GetInventoryLogsQueryType,
    GetInventoryParamsType
} from './inventory.schema'

export class InventoryController {
    constructor(private inventoryService = new InventoryService()) { }

    getStock = async (
        req: Request<GetInventoryParamsType, unknown, unknown, unknown>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const variantId = Number(req.params.variantId)
            const data = await this.inventoryService.getStock(variantId)
            return res.status(200).json({ statusCode: 200, data })
        } catch (err) {
            next(err)
        }
    }

    listLogs = async (
        req: Request<unknown, unknown, unknown, GetInventoryLogsQueryType>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const query = req.query as unknown as GetInventoryLogsQueryType
            const result = await this.inventoryService.listLogs(query)
            return res.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }

    adjustStock = async (
        req: Request<unknown, unknown, AdjustStockBodyType, unknown>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const body = req.body as AdjustStockBodyType
            const data = await this.inventoryService.adjustStock(body)
            return res.status(200).json({
                statusCode: 200,
                message: 'Điều chỉnh tồn kho thành công',
                data,
            })
        } catch (err) {
            next(err)
        }
    }
}
```

# src\modules\inventory-sale\inventory\inventory.repo.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\inventory-sale\inventory\inventory.repo.ts` |
| Size | 3,466 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:34:07.903950 |

```typescript
import { prisma } from '@/database/prisma'
import { AdjustStockBodyType, GetInventoryLogsQueryType } from './inventory.schema'
import type { Prisma } from '@prisma/client'

export class InventoryRepo {
    async getVariantStock(variantId: number) {
        return prisma.productVariant.findUnique({
            where: { id: variantId, deletedAt: null },
            select: { id: true, sku: true, stockQuantity: true, productId: true },
        })
    }

    async listLogs(query: GetInventoryLogsQueryType) {
        const skip = (query.page - 1) * query.limit
        const take = query.limit

        const where: Prisma.InventoryLogWhereInput = {}

        if (query.variantId !== undefined) {
            where.variantId = query.variantId
        }

        if (query.transType !== undefined) {
            where.transType = query.transType
        }

        const [totalItems, data] = await Promise.all([
            prisma.inventoryLog.count({ where }),

            prisma.inventoryLog.findMany({
                where,
                skip,
                take,
                include: {
                    variant: {
                        select: {
                            sku: true,
                            product: {
                                select: {
                                    defaultName: true,
                                },
                            },
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
            }),
        ])

        return {
            data,
            totalItems,
            page: query.page,
            limit: query.limit,
            totalPages: Math.ceil(totalItems / query.limit),
        }
    }

    async adjustStock(data: AdjustStockBodyType) {
        return prisma.$transaction(async (tx) => {
            const minimumStock = Math.max(0, -data.quantityChange)

            const result = await tx.productVariant.updateMany({
                where: {
                    id: data.variantId,
                    deletedAt: null,
                    stockQuantity: {
                        gte: minimumStock,
                    },
                },
                data: {
                    stockQuantity: {
                        increment: data.quantityChange,
                    },
                },
            })

            if (result.count === 0) {
                return null
            }

            const updatedVariant = await tx.productVariant.findUnique({
                where: {
                    id: data.variantId,
                },
                select: {
                    id: true,
                    sku: true,
                    stockQuantity: true,
                    productId: true,
                },
            })

            if (!updatedVariant) {
                return null
            }

            const log = await tx.inventoryLog.create({
                data: {
                    variantId: data.variantId,
                    transType: data.transType,
                    quantityChange: data.quantityChange,
                    note: data.note,
                },
            })

            return {
                variant: updatedVariant,
                log,
            }
        })
    }
}
```

# src\modules\inventory-sale\inventory\inventory.routes.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\inventory-sale\inventory\inventory.routes.ts` |
| Size | 350 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:34:07.905979 |

```typescript
import { Router } from 'express'
import { InventoryController } from './inventory.controller'

export const inventoryRouter = Router()
const controller = new InventoryController()

inventoryRouter.get('/logs', controller.listLogs)
inventoryRouter.get('/:variantId', controller.getStock)
inventoryRouter.post('/adjust', controller.adjustStock)
```

# src\modules\inventory-sale\inventory\inventory.schema.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\inventory-sale\inventory\inventory.schema.ts` |
| Size | 1,757 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:34:07.906944 |

```typescript
import { z } from 'zod'
import { InventoryTransType } from '@prisma/client'

export const InventoryTransTypeEnum = z.nativeEnum(InventoryTransType)

export const inventoryLogSchema = z.object({
    id: z.number(),
    variantId: z.number(),
    transType: InventoryTransTypeEnum,
    quantityChange: z.number(),
    note: z.string().max(500).nullable(),
    createdAt: z.date(),
})

export const getInventoryLogsQuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce.number().int().positive().default(10),

    variantId: z.coerce
        .number()
        .int()
        .positive()
        .optional(),

    transType: InventoryTransTypeEnum.optional(),
})

export const getInventoryParamsSchema = z.object({
    variantId: z.coerce
        .number()
        .int()
        .positive('variantId phải là số nguyên dương'),
})

export const adjustStockBodySchema = z.object({
    variantId: z.number()
        .int()
        .positive('variantId phải là số nguyên dương'),

    transType: InventoryTransTypeEnum,

    quantityChange: z.number()
        .int('Số lượng biến động phải là số nguyên')
        .refine(
            (value) => value !== 0,
            'Số lượng biến động không được bằng 0'
        ),

    note: z.string()
        .max(500)
        .optional(),
})

export type InventoryLogType =
    z.infer<typeof inventoryLogSchema>

export type GetInventoryLogsQueryType =
    z.infer<typeof getInventoryLogsQuerySchema>

export type GetInventoryParamsType =
    z.infer<typeof getInventoryParamsSchema>

export type AdjustStockBodyType =
    z.infer<typeof adjustStockBodySchema>
```

# src\modules\inventory-sale\inventory\inventory.service.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\inventory-sale\inventory\inventory.service.ts` |
| Size | 1,751 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:34:07.908946 |

```typescript
import { InventoryRepo } from './inventory.repo'
import {
    AdjustStockBodyType,
    GetInventoryLogsQueryType,
} from './inventory.schema'
import { AppError } from '@/common/errors'

export class InventoryService {
    constructor(private inventoryRepo = new InventoryRepo()) { }

    async getStock(variantId: number) {
        const variant = await this.inventoryRepo.getVariantStock(variantId)

        if (!variant) {
            throw new AppError(
                'Biến thể sản phẩm không tồn tại hoặc đã bị xóa',
                404
            )
        }

        return variant
    }

    async listLogs(query: GetInventoryLogsQueryType) {
        if (query.variantId !== undefined) {
            await this.getStock(query.variantId)
        }

        return this.inventoryRepo.listLogs(query)
    }

    async adjustStock(data: AdjustStockBodyType) {
        const result = await this.inventoryRepo.adjustStock(data)

        if (result) {
            return result
        }


        const variant = await this.inventoryRepo.getVariantStock(
            data.variantId
        )

        if (!variant) {
            throw new AppError(
                'Biến thể sản phẩm không tồn tại hoặc đã bị xóa',
                404
            )
        }

        if (data.quantityChange < 0) {
            throw new AppError(
                `Số lượng tồn kho không đủ. Tồn hiện tại: ${variant.stockQuantity}, yêu cầu trừ: ${Math.abs(data.quantityChange)}`,
                422
            )
        }

        throw new AppError(
            'Không thể điều chỉnh tồn kho',
            422
        )
    }
}
```

# src\modules\inventory-sale\inventory-sale.routes.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\inventory-sale\inventory-sale.routes.ts` |
| Size | 327 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:34:07.900944 |

```typescript
import { Router } from 'express'
import { inventoryRouter } from './inventory/inventory.routes'
import { flashSaleRouter } from './flash-sale/flash-sale.routes'

export const inventorySaleRouter = Router()

inventorySaleRouter.use('/inventories', inventoryRouter)
inventorySaleRouter.use('/flash-sales', flashSaleRouter)
```

# src\modules\loyalty-engage\chat\chat.controller.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\loyalty-engage\chat\chat.controller.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:09:17.324368 |

```typescript

```

# src\modules\loyalty-engage\chat\chat.repo.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\loyalty-engage\chat\chat.repo.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:09:17.325369 |

```typescript

```

# src\modules\loyalty-engage\chat\chat.routes.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\loyalty-engage\chat\chat.routes.ts` |
| Size | 71 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:09:17.326367 |

```typescript
import { Router } from 'express' 
export const chatRouter = Router()

```

# src\modules\loyalty-engage\chat\chat.schema.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\loyalty-engage\chat\chat.schema.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:09:17.326367 |

```typescript

```

# src\modules\loyalty-engage\chat\chat.service.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\loyalty-engage\chat\chat.service.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:09:17.327986 |

```typescript

```

# src\modules\loyalty-engage\loyalty-engage.routes.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\loyalty-engage\loyalty-engage.routes.ts` |
| Size | 395 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:09:17.327986 |

```typescript
import { Router } from 'express'
import { voucherRouter } from './voucher/voucher.routes'
import { reviewRouter } from './review/review.routes'
import { chatRouter } from './chat/chat.routes'

export const loyaltyEngageRouter = Router()

loyaltyEngageRouter.use('/vouchers', voucherRouter)
loyaltyEngageRouter.use('/reviews', reviewRouter)
loyaltyEngageRouter.use('/chat', chatRouter)

```

# src\modules\loyalty-engage\point\point.controller.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\loyalty-engage\point\point.controller.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:09:17.327986 |

```typescript

```

# src\modules\loyalty-engage\point\point.repo.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\loyalty-engage\point\point.repo.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:09:17.327986 |

```typescript

```

# src\modules\loyalty-engage\point\point.routes.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\loyalty-engage\point\point.routes.ts` |
| Size | 72 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:09:17.327986 |

```typescript
import { Router } from 'express' 
export const pointRouter = Router()

```

# src\modules\loyalty-engage\point\point.schema.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\loyalty-engage\point\point.schema.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:09:17.327986 |

```typescript

```

# src\modules\loyalty-engage\point\point.service.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\loyalty-engage\point\point.service.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:09:17.327986 |

```typescript

```

# src\modules\loyalty-engage\review\review.controller.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\loyalty-engage\review\review.controller.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:09:17.327986 |

```typescript

```

# src\modules\loyalty-engage\review\review.repo.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\loyalty-engage\review\review.repo.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:09:17.327986 |

```typescript

```

# src\modules\loyalty-engage\review\review.routes.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\loyalty-engage\review\review.routes.ts` |
| Size | 73 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:09:17.327986 |

```typescript
import { Router } from 'express' 
export const reviewRouter = Router()

```

# src\modules\loyalty-engage\review\review.schema.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\loyalty-engage\review\review.schema.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:09:17.327986 |

```typescript

```

# src\modules\loyalty-engage\review\review.service.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\loyalty-engage\review\review.service.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:09:17.327986 |

```typescript

```

# src\modules\loyalty-engage\voucher\voucher.controller.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\loyalty-engage\voucher\voucher.controller.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:09:17.327986 |

```typescript

```

# src\modules\loyalty-engage\voucher\voucher.repo.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\loyalty-engage\voucher\voucher.repo.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:09:17.327986 |

```typescript

```

# src\modules\loyalty-engage\voucher\voucher.routes.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\loyalty-engage\voucher\voucher.routes.ts` |
| Size | 74 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:09:17.327986 |

```typescript
import { Router } from 'express' 
export const voucherRouter = Router()

```

# src\modules\loyalty-engage\voucher\voucher.schema.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\loyalty-engage\voucher\voucher.schema.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:09:17.327986 |

```typescript

```

# src\modules\loyalty-engage\voucher\voucher.service.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\loyalty-engage\voucher\voucher.service.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:09:17.327986 |

```typescript

```

# src\queues\payment.queue.ts

| Property | Value |
|----------|-------|
| Path | `src\queues\payment.queue.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-09-23 09:04:57.911701 |

```typescript

```

# src\queues\payment.worker.ts

| Property | Value |
|----------|-------|
| Path | `src\queues\payment.worker.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-09-23 09:04:57.930704 |

```typescript

```

# src\server.ts

| Property | Value |
|----------|-------|
| Path | `src\server.ts` |
| Size | 1,233 bytes |
| Extension | `.ts` |
| Modified | 2026-09-23 09:08:14.342259 |

```typescript
import { createServer } from 'http'
import { createApp } from './app'
import { envConfig } from './config/env.config'
import { prisma } from './database/prisma'
import { redisClient } from './database/redis'

async function bootstrap() {
  const app = createApp()
  const httpServer = createServer(app)

  // Kết nối Socket.io ở đây nếu có (socket.server.ts)

  const server = httpServer.listen(envConfig.PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${envConfig.PORT}`)
  })

  // Xử lý Graceful Shutdown
  const handleShutdown = async (signal: string) => {
    console.log(`\nNhận tín hiệu ${signal}. Đang đóng server...`)
    
    server.close(async () => {
      console.log('HTTP Server đã đóng.')
      await prisma.$disconnect()
      console.log('Prisma đã ngắt kết nối.')
      redisClient.disconnect()
      console.log('Redis đã ngắt kết nối.')
      process.exit(0)
    })
  }

  process.on('SIGINT', () => handleShutdown('SIGINT'))
  process.on('SIGTERM', () => handleShutdown('SIGTERM'))
}

bootstrap().catch((err) => {
  console.error('Không thể khởi động ứng dụng:', err)
  process.exit(1)
})
```

# src\sockets\socket.server.ts

| Property | Value |
|----------|-------|
| Path | `src\sockets\socket.server.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-09-23 09:04:57.951704 |

```typescript

```

# src\types\express.d.ts

| Property | Value |
|----------|-------|
| Path | `src\types\express.d.ts` |
| Size | 109 bytes |
| Extension | `.ts` |
| Modified | 2026-09-28 23:31:07.611836 |

```typescript
declare namespace Express {
  interface Request {
    user?: { userId: number; roleId: number }
  }
}


```

# tsconfig.json

| Property | Value |
|----------|-------|
| Path | `tsconfig.json` |
| Size | 458 bytes |
| Extension | `.json` |
| Modified | 2026-09-23 09:05:28.278660 |

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

