# Project Dump

**Root:** `C:\Programing\cnpm\fashion-ecom\client`

**Generated:** 2026-10-06 00:12:27.255581

**Files:** 177 | **Total size:** 744,333 bytes

---

# .prettierignore

| Property | Value |
|----------|-------|
| Path | `.prettierignore` |
| Size | 42 bytes |
| Extension | `` |
| Modified | 2026-10-01 17:02:22.893283 |

```text
.next
node_modules
dist
build
coverage
```

# .prettierrc

| Property | Value |
|----------|-------|
| Path | `.prettierrc` |
| Size | 91 bytes |
| Extension | `` |
| Modified | 2026-10-01 17:02:22.893283 |

```text
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all"
}

```

# components.json

| Property | Value |
|----------|-------|
| Path | `components.json` |
| Size | 545 bytes |
| Extension | `.json` |
| Modified | 2026-09-29 13:25:28.276143 |

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "base-nova",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "rtl": false,
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "menuColor": "default",
  "menuAccent": "subtle",
  "registries": {}
}

```

# eslint.config.mjs

| Property | Value |
|----------|-------|
| Path | `eslint.config.mjs` |
| Size | 483 bytes |
| Extension | `.mjs` |
| Modified | 2026-10-01 17:02:22.896387 |

```mjs
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;

```

# next.config.ts

| Property | Value |
|----------|-------|
| Path | `next.config.ts` |
| Size | 265 bytes |
| Extension | `.ts` |
| Modified | 2026-10-01 17:02:22.897285 |

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
    ],
  },
};

export default nextConfig;

```

# package-lock.json

| Property | Value |
|----------|-------|
| Path | `package-lock.json` |
| Size | 371,233 bytes |
| Extension | `.json` |
| Modified | 2026-10-05 20:42:08.844981 |

```json
{
  "name": "client",
  "version": "0.1.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "client",
      "version": "0.1.0",
      "dependencies": {
        "@base-ui/react": "^1.8.0",
        "@hookform/resolvers": "^5.9.1",
        "@tanstack/react-query": "^5.104.0",
        "axios": "^1.20.0",
        "class-variance-authority": "^0.7.1",
        "clsx": "^2.1.1",
        "cookies-next": "^6.1.1",
        "date-fns": "^4.4.0",
        "lucide-react": "^1.49.0",
        "next": "16.3.6",
        "react": "19.2.8",
        "react-dom": "19.2.8",
        "react-hook-form": "^7.89.0",
        "shadcn": "^4.21.0",
        "socket.io-client": "^4.8.4",
        "sonner": "^2.0.8",
        "tailwind-merge": "^3.7.0",
        "tw-animate-css": "^1.4.0",
        "zod": "^3.25.76",
        "zustand": "^5.0.15"
      },
      "devDependencies": {
        "@tailwindcss/postcss": "^4",
        "@types/node": "^20",
        "@types/react": "^19",
        "@types/react-dom": "^19",
        "babel-plugin-react-compiler": "1.0.0",
        "eslint": "^9",
        "eslint-config-next": "16.3.6",
        "prettier": "^3.9.9",
        "tailwindcss": "^4",
        "typescript": "^5"
      }
    },
    "node_modules/@alloc/quick-lru": {
      "version": "5.3.0",
      "resolved": "https://registry.npmjs.org/@alloc/quick-lru/-/quick-lru-5.3.0.tgz",
      "integrity": "sha512-U4+70Pc5ZS9osnCBCE5Jha/ciHM+Yp+CNMNC/7HvYbNRk1Ldd+f7qO65W5qfhu/TCv+/ozljlXXe9Nj8419DMA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@babel/code-frame": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.29.7.tgz",
      "integrity": "sha512-Aup7aUOfpbAUg2ROOJN6Iw5f9DMBlzu0mIkm/malLQFN/YQgO48wCj0Kxa3sEHJvPVFg7siR+qRInwXd2qhQKw==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-validator-identifier": "^7.29.7",
        "js-tokens": "^4.0.0",
        "picocolors": "^1.1.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/compat-data": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/compat-data/-/compat-data-7.29.7.tgz",
      "integrity": "sha512-locTkQyKvwIEgBzVrn8693ebc97F2U8ZHjbXwDXJ5Fn2TCpNwTlKcaKLkdHop5c/icOFE7qt7Q9JC5hnKNa6Gg==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/core": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/core/-/core-7.29.7.tgz",
      "integrity": "sha512-RgHBCvtjbOK2gXSNBNIkNoEc9qoVEtau3hj8gEqKQuL3HZAibKarWFEI3Lfm6EYKkLalOh8eSrj9b+ch9H/VBA==",
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.7",
        "@babel/generator": "^7.29.7",
        "@babel/helper-compilation-targets": "^7.29.7",
        "@babel/helper-module-transforms": "^7.29.7",
        "@babel/helpers": "^7.29.7",
        "@babel/parser": "^7.29.7",
        "@babel/template": "^7.29.7",
        "@babel/traverse": "^7.29.7",
        "@babel/types": "^7.29.7",
        "@jridgewell/remapping": "^2.3.5",
        "convert-source-map": "^2.0.0",
        "debug": "^4.1.0",
        "gensync": "^1.0.0-beta.2",
        "json5": "^2.2.3",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/babel"
      }
    },
    "node_modules/@babel/generator": {
      "version": "7.29.8",
      "resolved": "https://registry.npmjs.org/@babel/generator/-/generator-7.29.8.tgz",
      "integrity": "sha512-gZbepsdh3WDtgZKWL+vTPh71LSBrm/Y4/QDZBVCcYfmeTEEuoOYwlSy+G1StfJg+/Zy550u/3TATbm7qDbbMtg==",
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.29.8",
        "@babel/types": "^7.29.8",
        "@jridgewell/gen-mapping": "^0.3.12",
        "@jridgewell/trace-mapping": "^0.3.28",
        "jsesc": "^3.0.2"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-annotate-as-pure": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-annotate-as-pure/-/helper-annotate-as-pure-7.29.7.tgz",
      "integrity": "sha512-OoK6239jHPuSQOoS0kfTVKn0b/rVTk0seKq4Gd2UMLtmOVLjDC0ki3e+c90Trqv2gMfvJFqkiljrr568+qddiw==",
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-compilation-targets": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-compilation-targets/-/helper-compilation-targets-7.29.7.tgz",
      "integrity": "sha512-wem6WaBj4NaVYVdNhLPPVacES6ZJ+KBBfSkTMD3YZxbP3rm3Di85tJU5ljaUNhaOynt+Aj0xruhYuzQBt8n71g==",
      "license": "MIT",
      "dependencies": {
        "@babel/compat-data": "^7.29.7",
        "@babel/helper-validator-option": "^7.29.7",
        "browserslist": "^4.24.0",
        "lru-cache": "^5.1.1",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-create-class-features-plugin": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-create-class-features-plugin/-/helper-create-class-features-plugin-7.29.7.tgz",
      "integrity": "sha512-IY3ZD9Tmooqr3TUhc3DUWxiuo8xx1DWLhd5M7hQ+ZWJamqM2BbalrBJb2MisSLoYorOj75U03qULCxQTY9r3hg==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-annotate-as-pure": "^7.29.7",
        "@babel/helper-member-expression-to-functions": "^7.29.7",
        "@babel/helper-optimise-call-expression": "^7.29.7",
        "@babel/helper-replace-supers": "^7.29.7",
        "@babel/helper-skip-transparent-expression-wrappers": "^7.29.7",
        "@babel/traverse": "^7.29.7",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/helper-globals": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-globals/-/helper-globals-7.29.7.tgz",
      "integrity": "sha512-3nQVUAtvkKH9zahfWgw96Jc/uFOmjACE1kQz82E2lqWmHBgjzbNlsC22nuQTfahmWeQtTq5nQ/4Nnd2A1wj4zA==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-member-expression-to-functions": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-member-expression-to-functions/-/helper-member-expression-to-functions-7.29.7.tgz",
      "integrity": "sha512-j+7JYmk1JYDtACIGj0QJqqWZjoUpMoEikQGADMaHgCMCSDqd2+P32rfcibUNrGOMWrlzK1WJBdxrB3JJQZwWtg==",
      "license": "MIT",
      "dependencies": {
        "@babel/traverse": "^7.29.7",
        "@babel/types": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-imports": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-imports/-/helper-module-imports-7.29.7.tgz",
      "integrity": "sha512-ejHwrQQYcm9xnTivShn2IDOlIzInN34AXskvq9QicvCtEzq1Vzclu/tKF8Jq1Cg8JG2GL6/EmjgsCT7lXepE3g==",
      "license": "MIT",
      "dependencies": {
        "@babel/traverse": "^7.29.7",
        "@babel/types": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-transforms": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-transforms/-/helper-module-transforms-7.29.7.tgz",
      "integrity": "sha512-UPUVSyXbOh627KiCIGQSgwWzGeBKLkaJ9PJEdrngIwMSzxLR4jS4+f1f1jb7VzBbg8nFLaYotvVPFCTqdrmTAg==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-module-imports": "^7.29.7",
        "@babel/helper-validator-identifier": "^7.29.7",
        "@babel/traverse": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/helper-optimise-call-expression": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-optimise-call-expression/-/helper-optimise-call-expression-7.29.7.tgz",
      "integrity": "sha512-+kmGVjcT9RGYzoDwdwEqEvGgKe3BYq+O1iGzjFubaNgZHwYHP6lsF2Yghf4kEuv9BV7tYDZ913aBW9am6YKong==",
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-plugin-utils": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-plugin-utils/-/helper-plugin-utils-7.29.7.tgz",
      "integrity": "sha512-G7sHYigPY17oO5SYWnfD/0MTBwVR781S/JI643e/JhUYgVgWE/61SoW3NH9KWUKyKq5LVh3npif99Wkt6j86Jw==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-replace-supers": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-replace-supers/-/helper-replace-supers-7.29.7.tgz",
      "integrity": "sha512-atfGXWSeCiF4DnKZIfmJfQRkSw9b9gNNXR1kqKjbhG4pGYCOnkp8OcTB8E3NXjBu8NpheSnOeNKz8KT7UNFTmQ==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-member-expression-to-functions": "^7.29.7",
        "@babel/helper-optimise-call-expression": "^7.29.7",
        "@babel/traverse": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/helper-skip-transparent-expression-wrappers": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-skip-transparent-expression-wrappers/-/helper-skip-transparent-expression-wrappers-7.29.7.tgz",
      "integrity": "sha512-brcMGQaVzIeUb+6/bs1Av0f8YuNNjKY2JyvfRCsFuFsdKccEQ5Ges2y74D74NZ1Rz8lKJ9ksJkfqwQFJ/iNEyQ==",
      "license": "MIT",
      "dependencies": {
        "@babel/traverse": "^7.29.7",
        "@babel/types": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-string-parser": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-string-parser/-/helper-string-parser-7.29.7.tgz",
      "integrity": "sha512-Pb5ijPrZ89GDH8223L4UP8i6QApWxs04RbPQJTeWDV0/keR2E36MeKnyr6LYmUUvqRRI+Iv87SuF1W6ErINzYw==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-identifier": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.29.7.tgz",
      "integrity": "sha512-qehxGkRj55h/ff8EMaJ+cYhyaKlHIxqYDn682wQD7RNp9UujOQsHog2uS0r2vzr4pW+sXf90NeeayjcNaX3fFg==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-option": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-option/-/helper-validator-option-7.29.7.tgz",
      "integrity": "sha512-N9ZErrD+yW5geCDtBqnOoxmR8+tNKiGuxKlDpuJxfsqpa2dFcexaziGAE/qoHLiDDreVNMupxGmSoNlyvsA3gw==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helpers": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helpers/-/helpers-7.29.7.tgz",
      "integrity": "sha512-1k2lAGRMfHTcwuNYcCNUmaUffmQv8KWMfh2iJUUeRlwlwH4FdNG7mfPI10NPfLHJFThE4Tyr4mv7kTNZOiPuBg==",
      "license": "MIT",
      "dependencies": {
        "@babel/template": "^7.29.7",
        "@babel/types": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/parser": {
      "version": "7.29.9",
      "resolved": "https://registry.npmjs.org/@babel/parser/-/parser-7.29.9.tgz",
      "integrity": "sha512-CjXrNHTnvqBVqHgdBysY3vk2T8tpJHb5/RMeHJBTyVa9xgugCB0CJTx/3oO8RV2QRQP391RWpB7D6hLjm8V9uA==",
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.29.8"
      },
      "bin": {
        "parser": "bin/babel-parser.js"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@babel/plugin-syntax-jsx": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-jsx/-/plugin-syntax-jsx-7.29.7.tgz",
      "integrity": "sha512-TSu8+mHCoEaaCDEZ0I3+6mvTBYR4PCxQwf2z9/r5Tbztv6NaLR3B9thGTTxX2WGuGHJqRiAbKPeGTJ5XWXVg6A==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-syntax-typescript": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-typescript/-/plugin-syntax-typescript-7.29.7.tgz",
      "integrity": "sha512-ngr+82Sh0xMz25TPCZi+nC2iTzjfCdWS2ONXTp/PtSCHCgaCNBpdMqgvJ2ccdLlClVZ7sisIgB914j/JFe+RZA==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-modules-commonjs": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-modules-commonjs/-/plugin-transform-modules-commonjs-7.29.7.tgz",
      "integrity": "sha512-j0vCldybPC5b5dwCQOJ21uKtHzt7hxLygJTg9eF1ScfaikEDNfzn94XoW5Fi+seBR0nCyL23xaBFFkq7dTM8XQ==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-module-transforms": "^7.29.7",
        "@babel/helper-plugin-utils": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-typescript": {
      "version": "7.29.9",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-typescript/-/plugin-transform-typescript-7.29.9.tgz",
      "integrity": "sha512-FFwIwzU+7SCOuxxV4YtJql6T9981ZVTm+FHO5GhVsRqCTdy0WwrEZh3l42ARpXruJUDGOptdduHW6Zr7pNPLNg==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-annotate-as-pure": "^7.29.7",
        "@babel/helper-create-class-features-plugin": "^7.29.7",
        "@babel/helper-plugin-utils": "^7.29.7",
        "@babel/helper-skip-transparent-expression-wrappers": "^7.29.7",
        "@babel/plugin-syntax-typescript": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/preset-typescript": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/preset-typescript/-/preset-typescript-7.29.7.tgz",
      "integrity": "sha512-/Foi8vKY2EVbed/1eZx0gJEEwHAIxogrySI7rULcRIvhZzbvoE/b5qG5Ghc0WKAFKOHA9SD1x7RsFlOYdutIiQ==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.29.7",
        "@babel/helper-validator-option": "^7.29.7",
        "@babel/plugin-syntax-jsx": "^7.29.7",
        "@babel/plugin-transform-modules-commonjs": "^7.29.7",
        "@babel/plugin-transform-typescript": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/runtime": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/runtime/-/runtime-7.29.7.tgz",
      "integrity": "sha512-Nq8OhGWiZIZGV6hLHoyAKLLcJihP/xFeBMGJoUrxTX2psI8dCifzLhZISFb+VWS3wFMRDmCGw5R+dOySCqPLhw==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/template": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/template/-/template-7.29.7.tgz",
      "integrity": "sha512-puq+Gf35oI24FeN11LkoUQFqv9uwNeWpxXZi/Ji3rRIoKAzKnxRaZ+Gkj0vKS9ZCiTESfng1N9LyOyXvo+m+Gg==",
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.7",
        "@babel/parser": "^7.29.7",
        "@babel/types": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/traverse": {
      "version": "7.29.8",
      "resolved": "https://registry.npmjs.org/@babel/traverse/-/traverse-7.29.8.tgz",
      "integrity": "sha512-I5z7H3bf/41ktsNVLtpN0wAa336HkqIHQ5BuPLEhTkt1jVSyZpeNKIzTgEWmlxjdg81R0IgUCcaE+Ok3NvrfZg==",
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.7",
        "@babel/generator": "^7.29.8",
        "@babel/helper-globals": "^7.29.7",
        "@babel/parser": "^7.29.8",
        "@babel/template": "^7.29.7",
        "@babel/types": "^7.29.8",
        "debug": "^4.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/types": {
      "version": "7.29.8",
      "resolved": "https://registry.npmjs.org/@babel/types/-/types-7.29.8.tgz",
      "integrity": "sha512-Vj1jF3cPfxg7OAfoI7QnVKLoILlm2JF9pnVHrX8qx7AHMiYWT+NDAA7jChlNgRS4WTLc/fD1lXLmPixluj+3Gg==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-string-parser": "^7.29.7",
        "@babel/helper-validator-identifier": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@base-ui/react": {
      "version": "1.8.0",
      "resolved": "https://registry.npmjs.org/@base-ui/react/-/react-1.8.0.tgz",
      "integrity": "sha512-P0/1sxo6SBVZOklKMIedvTWqw2s2IQzi9x5bIVsXu980cuSOD4NeuRSs+/L7LZQfDkZP/uRZyGPyfFl/B1oH+Q==",
      "license": "MIT",
      "dependencies": {
        "@babel/runtime": "^7.29.7",
        "@base-ui/utils": "0.4.0",
        "@floating-ui/react-dom": "^2.1.9",
        "@floating-ui/utils": "^0.2.12",
        "use-sync-external-store": "^1.6.0"
      },
      "engines": {
        "node": ">=14.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/mui-org"
      },
      "peerDependencies": {
        "@date-fns/tz": "^1.2.0",
        "@types/react": "^17 || ^18 || ^19",
        "date-fns": "^4.0.0",
        "react": "^17 || ^18 || ^19",
        "react-dom": "^17 || ^18 || ^19"
      },
      "peerDependenciesMeta": {
        "@date-fns/tz": {
          "optional": true
        },
        "@types/react": {
          "optional": true
        },
        "date-fns": {
          "optional": true
        }
      }
    },
    "node_modules/@base-ui/utils": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/@base-ui/utils/-/utils-0.4.0.tgz",
      "integrity": "sha512-bO9fz25kKtPf+aZVyfQrC0PDmJdmVni31W2hCS5/Owb+inwdIL3XU26pCPRPlt4LSxZrBgLwubXQXQlKaFEZzw==",
      "license": "MIT",
      "dependencies": {
        "@babel/runtime": "^7.29.7",
        "@floating-ui/utils": "^0.2.12",
        "reselect": "^5.2.0",
        "use-sync-external-store": "^1.6.0"
      },
      "peerDependencies": {
        "@types/react": "^17 || ^18 || ^19",
        "react": "^17 || ^18 || ^19",
        "react-dom": "^17 || ^18 || ^19"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@dotenvx/dotenvx": {
      "version": "1.75.1",
      "resolved": "https://registry.npmjs.org/@dotenvx/dotenvx/-/dotenvx-1.75.1.tgz",
      "integrity": "sha512-/BITOC9dmS/edY2zQwZNicQ059O6RKabtQfyEafV0nGtfYRNHYy1DIPiYVcov40+tob9hfmBnbR963dS+EQ1DQ==",
      "license": "BSD-3-Clause",
      "dependencies": {
        "@dotenvx/primitives": "^0.8.0",
        "commander": "^11.1.0",
        "conf": "^10.2.0",
        "dotenv": "^17.2.1",
        "enquirer": "^2.4.1",
        "env-paths": "^2.2.1",
        "execa": "^5.1.1",
        "fdir": "^6.2.0",
        "ignore": "^5.3.0",
        "object-treeify": "1.1.33",
        "open": "^8.4.2",
        "picomatch": "^4.0.4",
        "systeminformation": "^5.22.11",
        "undici": "^7.11.0",
        "which": "^4.0.0",
        "yocto-spinner": "^1.1.0"
      },
      "bin": {
        "dotenvx": "src/cli/dotenvx.js"
      },
      "funding": {
        "url": "https://dotenvx.com"
      }
    },
    "node_modules/@dotenvx/dotenvx/node_modules/commander": {
      "version": "11.1.0",
      "resolved": "https://registry.npmjs.org/commander/-/commander-11.1.0.tgz",
      "integrity": "sha512-yPVavfyCcRhmorC7rWlkHn15b4wDVgVmBA7kV4QVBsF7kv/9TKJAbAXVTxvTnwP8HHKjRCJDClKbciiYS7p0DQ==",
      "license": "MIT",
      "engines": {
        "node": ">=16"
      }
    },
    "node_modules/@dotenvx/dotenvx/node_modules/define-lazy-prop": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/define-lazy-prop/-/define-lazy-prop-2.0.0.tgz",
      "integrity": "sha512-Ds09qNh8yw3khSjiJjiUInaGX9xlqZDY7JVryGxdxV7NPeuqQfplOpQ66yJFZut3jLa5zOwkXw1g9EI2uKh4Og==",
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/@dotenvx/dotenvx/node_modules/execa": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/execa/-/execa-5.1.1.tgz",
      "integrity": "sha512-8uSpZZocAZRBAPIEINJj3Lo9HyGitllczc27Eh5YYojjMFMn8yHMDMaUHE2Jqfq05D/wucwI4JGURyXt1vchyg==",
      "license": "MIT",
      "dependencies": {
        "cross-spawn": "^7.0.3",
        "get-stream": "^6.0.0",
        "human-signals": "^2.1.0",
        "is-stream": "^2.0.0",
        "merge-stream": "^2.0.0",
        "npm-run-path": "^4.0.1",
        "onetime": "^5.1.2",
        "signal-exit": "^3.0.3",
        "strip-final-newline": "^2.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sindresorhus/execa?sponsor=1"
      }
    },
    "node_modules/@dotenvx/dotenvx/node_modules/fdir": {
      "version": "6.5.0",
      "resolved": "https://registry.npmjs.org/fdir/-/fdir-6.5.0.tgz",
      "integrity": "sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg==",
      "license": "MIT",
      "engines": {
        "node": ">=12.0.0"
      },
      "peerDependencies": {
        "picomatch": "^3 || ^4"
      },
      "peerDependenciesMeta": {
        "picomatch": {
          "optional": true
        }
      }
    },
    "node_modules/@dotenvx/dotenvx/node_modules/get-stream": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/get-stream/-/get-stream-6.0.1.tgz",
      "integrity": "sha512-ts6Wi+2j3jQjqi70w5AlN8DFnkSwC+MqmxEzdEALB2qXZYV3X/b1CTfgPLGJNMeAWxdPfU8FO1ms3NUfaHCPYg==",
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@dotenvx/dotenvx/node_modules/human-signals": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/human-signals/-/human-signals-2.1.0.tgz",
      "integrity": "sha512-B4FFZ6q/T2jhhksgkbEW3HBvWIfDW85snkQgawt07S7J5QXTk6BkNV+0yAeZrM5QpMAdYlocGoljn0sJ/WQkFw==",
      "license": "Apache-2.0",
      "engines": {
        "node": ">=10.17.0"
      }
    },
    "node_modules/@dotenvx/dotenvx/node_modules/is-docker": {
      "version": "2.2.1",
      "resolved": "https://registry.npmjs.org/is-docker/-/is-docker-2.2.1.tgz",
      "integrity": "sha512-F+i2BKsFrH66iaUFc0woD8sLy8getkwTwtOBjvs56Cx4CgJDeKQeqfz8wAYiSb8JOprWhHH5p77PbmYCvvUuXQ==",
      "license": "MIT",
      "bin": {
        "is-docker": "cli.js"
      },
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@dotenvx/dotenvx/node_modules/is-stream": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/is-stream/-/is-stream-2.0.1.tgz",
      "integrity": "sha512-hFoiJiTl63nn+kstHGBtewWSKnQLpyb155KHheA1l39uvtO9nWIop1p3udqPcUd/xbF1VLMO4n7OI6p7RbngDg==",
      "license": "MIT",
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@dotenvx/dotenvx/node_modules/is-wsl": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/is-wsl/-/is-wsl-2.2.0.tgz",
      "integrity": "sha512-fKzAra0rGJUUBwGBgNkHZuToZcn+TtXHpeCgmkMJMMYx1sQDYaCSyjJBSCa2nH1DGm7s3n1oBnohoVTBaN7Lww==",
      "license": "MIT",
      "dependencies": {
        "is-docker": "^2.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/@dotenvx/dotenvx/node_modules/isexe": {
      "version": "3.1.5",
      "resolved": "https://registry.npmjs.org/isexe/-/isexe-3.1.5.tgz",
      "integrity": "sha512-6B3tLtFqtQS4ekarvLVMZ+X+VlvQekbe4taUkf/rhVO3d/h0M2rfARm/pXLcPEsjjMsFgrFgSrhQIxcSVrBz8w==",
      "license": "BlueOak-1.0.0",
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@dotenvx/dotenvx/node_modules/npm-run-path": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/npm-run-path/-/npm-run-path-4.0.1.tgz",
      "integrity": "sha512-S48WzZW777zhNIrn7gxOlISNAqi9ZC/uQFnRdbeIHhZhCA6UqpkOT8T1G7BvfdgP4Er8gF4sUbaS0i7QvIfCWw==",
      "license": "MIT",
      "dependencies": {
        "path-key": "^3.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/@dotenvx/dotenvx/node_modules/open": {
      "version": "8.4.2",
      "resolved": "https://registry.npmjs.org/open/-/open-8.4.2.tgz",
      "integrity": "sha512-7x81NCL719oNbsq/3mh+hVrAWmFuEYUqrq/Iw3kUzH8ReypT9QQ0BLoJS7/G9k6N81XjW4qHWtjWwe/9eLy1EQ==",
      "license": "MIT",
      "dependencies": {
        "define-lazy-prop": "^2.0.0",
        "is-docker": "^2.1.1",
        "is-wsl": "^2.2.0"
      },
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@dotenvx/dotenvx/node_modules/picomatch": {
      "version": "4.0.7",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.7.tgz",
      "integrity": "sha512-qcJu88Q2IWqJsDD529JKMdwGm/dvInW4HvQnRwiH9JtihJvzGOscDtHE3x1pBKeUOTysQ8kVmLnJ2kJu7yhcGA==",
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/@dotenvx/dotenvx/node_modules/signal-exit": {
      "version": "3.0.7",
      "resolved": "https://registry.npmjs.org/signal-exit/-/signal-exit-3.0.7.tgz",
      "integrity": "sha512-wnD2ZE+l+SPC/uoS0vXeE9L1+0wuaMqKlfz9AMUo38JsyLSBWSFcHR1Rri62LZc12vLr1gb3jl7iwQhgwpAbGQ==",
      "license": "ISC"
    },
    "node_modules/@dotenvx/dotenvx/node_modules/strip-final-newline": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/strip-final-newline/-/strip-final-newline-2.0.0.tgz",
      "integrity": "sha512-BrpvfNAE3dcvq7ll3xVumzjKjZQ5tI1sEUIKr3Uoks0XUl45St3FlatVqef9prk4jRDzhW6WZg+3bk93y6pLjA==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/@dotenvx/dotenvx/node_modules/which": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/which/-/which-4.0.0.tgz",
      "integrity": "sha512-GlaYyEb07DPxYCKhKzplCWBJtvxZcZMrL+4UkrTSJHHPyZU4mYYTv3qaOe77H7EODLSSopAUFAc6W8U4yqvscg==",
      "license": "ISC",
      "dependencies": {
        "isexe": "^3.1.1"
      },
      "bin": {
        "node-which": "bin/which.js"
      },
      "engines": {
        "node": "^16.13.0 || >=18.0.0"
      }
    },
    "node_modules/@dotenvx/primitives": {
      "version": "0.8.0",
      "resolved": "https://registry.npmjs.org/@dotenvx/primitives/-/primitives-0.8.0.tgz",
      "integrity": "sha512-VYJy0uhFm9zTJ1TxBaW/pA8bjbOM/OttaNMwZ1RHG4JKyRG7DhSdiqD1ipQoAyoD22olUtxbP78W9xY3Wd11bg==",
      "license": "BSD-3-Clause"
    },
    "node_modules/@emnapi/core": {
      "version": "1.11.3",
      "resolved": "https://registry.npmjs.org/@emnapi/core/-/core-1.11.3.tgz",
      "integrity": "sha512-zLpS5asjEb7lq8jYLq37N6XKaE41DIexlY1rF/z4/tIl3wo13Sqm28fRyfIsKZD+NZ8mM5RoKkpW/rBcuoSZSg==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/wasi-threads": "1.2.3",
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@emnapi/runtime": {
      "version": "1.11.3",
      "resolved": "https://registry.npmjs.org/@emnapi/runtime/-/runtime-1.11.3.tgz",
      "integrity": "sha512-Xz4Tpyki7XyrpbUK1jR1AhdAdaXyhhY4lZ3neLodmhpuWfy2PAQN5B46sAiU4liOXGLkHypn/qU+jvfWSCYYLA==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@emnapi/wasi-threads": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/@emnapi/wasi-threads/-/wasi-threads-1.2.3.tgz",
      "integrity": "sha512-ELEBe8PsLvvJ6QMr0zLt8ffvOHW/dc1m3CEzNMg7aJUv3bMaoDtw2TXyDAwkYBuroxxuHEwhRTLJSe5sya547g==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@eslint-community/eslint-utils": {
      "version": "4.10.1",
      "resolved": "https://registry.npmjs.org/@eslint-community/eslint-utils/-/eslint-utils-4.10.1.tgz",
      "integrity": "sha512-cuadcxVFE8sDK6iWJbs8Sn0av2Nrh2QSGQhVlBW9AaAHqHwjWsZHT8LJ4hFGPh7ASBV2deFdM7H/DPjulmh8rg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "eslint-visitor-keys": "^3.4.3"
      },
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      },
      "peerDependencies": {
        "eslint": "^6.0.0 || ^7.0.0 || >=8.0.0"
      }
    },
    "node_modules/@eslint-community/eslint-utils/node_modules/eslint-visitor-keys": {
      "version": "3.4.3",
      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-3.4.3.tgz",
      "integrity": "sha512-wpc+LXeiyiisxPlEkUzU6svyS1frIO3Mgxj1fdy7Pm8Ygzguax2N3Fa/D/ag1WqbOprdI+uY6wMUl8/a2G+iag==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/@eslint-community/regexpp": {
      "version": "4.12.2",
      "resolved": "https://registry.npmjs.org/@eslint-community/regexpp/-/regexpp-4.12.2.tgz",
      "integrity": "sha512-EriSTlt5OC9/7SXkRSCAhfSxxoSUgBm33OH+IkwbdpgoqsSsUg7y3uh+IICI/Qg4BBWr3U2i39RpmycbxMq4ew==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^12.0.0 || ^14.0.0 || >=16.0.0"
      }
    },
    "node_modules/@eslint/config-array": {
      "version": "0.21.2",
      "resolved": "https://registry.npmjs.org/@eslint/config-array/-/config-array-0.21.2.tgz",
      "integrity": "sha512-nJl2KGTlrf9GjLimgIru+V/mzgSK0ABCDQRvxw5BjURL7WfH5uoWmizbH7QB6MmnMBd8cIC9uceWnezL1VZWWw==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@eslint/object-schema": "^2.1.7",
        "debug": "^4.3.1",
        "minimatch": "^3.1.5"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/config-helpers": {
      "version": "0.4.2",
      "resolved": "https://registry.npmjs.org/@eslint/config-helpers/-/config-helpers-0.4.2.tgz",
      "integrity": "sha512-gBrxN88gOIf3R7ja5K9slwNayVcZgK6SOUORm2uBzTeIEfeVaIhOpCtTox3P6R7o2jLFwLFTLnC7kU/RGcYEgw==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@eslint/core": "^0.17.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/core": {
      "version": "0.17.0",
      "resolved": "https://registry.npmjs.org/@eslint/core/-/core-0.17.0.tgz",
      "integrity": "sha512-yL/sLrpmtDaFEiUj1osRP4TI2MDz1AddJL+jZ7KSqvBuliN4xqYY54IfdN8qD8Toa6g1iloph1fxQNkjOxrrpQ==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@types/json-schema": "^7.0.15"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/eslintrc": {
      "version": "3.3.7",
      "resolved": "https://registry.npmjs.org/@eslint/eslintrc/-/eslintrc-3.3.7.tgz",
      "integrity": "sha512-F42g89Qd5oAWtp0k0nnSrjziAKza7w8SVT4mStc18LZMaRb4J1HQAHLCalEtDCxrTuksx7NU9qsmeLwpOfPqWw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ajv": "^6.14.0",
        "debug": "^4.3.2",
        "espree": "^10.0.1",
        "globals": "^14.0.0",
        "ignore": "^5.2.0",
        "import-fresh": "^3.2.1",
        "js-yaml": "^4.3.2",
        "minimatch": "^3.1.5",
        "strip-json-comments": "^3.1.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/@eslint/eslintrc/node_modules/ajv": {
      "version": "6.15.0",
      "resolved": "https://registry.npmjs.org/ajv/-/ajv-6.15.0.tgz",
      "integrity": "sha512-fgFx7Hfoq60ytK2c7DhnF8jIvzYgOMxfugjLOSMHjLIPgenqa7S7oaagATUq99mV6IYvN2tRmC0wnTYX6iPbMw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fast-deep-equal": "^3.1.1",
        "fast-json-stable-stringify": "^2.0.0",
        "json-schema-traverse": "^0.4.1",
        "uri-js": "^4.2.2"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/epoberezkin"
      }
    },
    "node_modules/@eslint/eslintrc/node_modules/json-schema-traverse": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/json-schema-traverse/-/json-schema-traverse-0.4.1.tgz",
      "integrity": "sha512-xbbCH5dCYU5T8LcEhhuh7HJ88HXuW3qsI3Y0zOZFKfZEHcpWiHU/Jxzk629Brsab/mMiHQti9wMP+845RPe3Vg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@eslint/js": {
      "version": "9.39.5",
      "resolved": "https://registry.npmjs.org/@eslint/js/-/js-9.39.5.tgz",
      "integrity": "sha512-QywQuszQh77pIXCsq998c8hbhSTI/azTty1Z6N53dmAudKHhy573j3yvRLsX2BSp8YpLtoCEG8E9DJe+8zUh4A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://eslint.org/donate"
      }
    },
    "node_modules/@eslint/object-schema": {
      "version": "2.1.7",
      "resolved": "https://registry.npmjs.org/@eslint/object-schema/-/object-schema-2.1.7.tgz",
      "integrity": "sha512-VtAOaymWVfZcmZbp6E2mympDIHvyjXs/12LqWYjVw6qjrfF+VK+fyG33kChz3nnK+SU5/NeHOqrTEHS8sXO3OA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/plugin-kit": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/@eslint/plugin-kit/-/plugin-kit-0.4.1.tgz",
      "integrity": "sha512-43/qtrDUokr7LJqoF2c3+RInu/t4zfrpYdoSDfYyhg52rwLV6TnOvdG4fXm7IkSB3wErkcmJS9iEhjVtOSEjjA==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@eslint/core": "^0.17.0",
        "levn": "^0.4.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@floating-ui/core": {
      "version": "1.8.0",
      "resolved": "https://registry.npmjs.org/@floating-ui/core/-/core-1.8.0.tgz",
      "integrity": "sha512-0CIZ5itps/8x7BG8dEIhs53BvCUH2PCoogtakwRTut+Arm58sJooJ0AuZhLw2HJYIR5cMLNPBSS728sPho2khQ==",
      "license": "MIT",
      "dependencies": {
        "@floating-ui/utils": "^0.2.12"
      }
    },
    "node_modules/@floating-ui/dom": {
      "version": "1.8.0",
      "resolved": "https://registry.npmjs.org/@floating-ui/dom/-/dom-1.8.0.tgz",
      "integrity": "sha512-yXSrzeHZBTZadLOlfyhCkJHNeLJnHRnRInwdZ40L7ZiaAtrBwoYlsDrX3v5zB1Utk7CLfzcOVnVVWoXEky7Ceg==",
      "license": "MIT",
      "dependencies": {
        "@floating-ui/core": "^1.8.0",
        "@floating-ui/utils": "^0.2.12"
      }
    },
    "node_modules/@floating-ui/react-dom": {
      "version": "2.1.9",
      "resolved": "https://registry.npmjs.org/@floating-ui/react-dom/-/react-dom-2.1.9.tgz",
      "integrity": "sha512-JDjEFGCpImxDCA7JJKviA0M9+RtmJdj0m/NVU5IMgBK+AmZouAQQ7/+2GLH0GXXY0YMw9oXPB8hKdbPYg5QLYg==",
      "license": "MIT",
      "dependencies": {
        "@floating-ui/dom": "^1.8.0"
      },
      "peerDependencies": {
        "react": ">=16.8.0",
        "react-dom": ">=16.8.0"
      }
    },
    "node_modules/@floating-ui/utils": {
      "version": "0.2.12",
      "resolved": "https://registry.npmjs.org/@floating-ui/utils/-/utils-0.2.12.tgz",
      "integrity": "sha512-HpCo8tmWzLVad5s2d19EhAz5zqrrQ6s69qd6moPMQvkOuSwDT1YgRfWSVuc4ennqrgv3OHppiOGMQ7oC13yIww==",
      "license": "MIT"
    },
    "node_modules/@hono/node-server": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/@hono/node-server/-/node-server-2.1.1.tgz",
      "integrity": "sha512-ELuehkj5VCBdgEw9zs+ivkKwyzzUCSQuE96YmiPvn1ECBoZCczbFXJLeEGMTYjphP6gydh4pHMqEYPVMYUVgQg==",
      "license": "MIT",
      "engines": {
        "node": ">=20"
      },
      "peerDependencies": {
        "hono": "^4"
      }
    },
    "node_modules/@hookform/resolvers": {
      "version": "5.9.1",
      "resolved": "https://registry.npmjs.org/@hookform/resolvers/-/resolvers-5.9.1.tgz",
      "integrity": "sha512-7b7vsbraJxKgjVSA1Nur9tLwj539WGJUBLA7QNvXnFoT2pM5Z7G+6rlukk4B2/QrTZy6huRtH6wKeESPKuIr6w==",
      "license": "MIT",
      "dependencies": {
        "@standard-schema/utils": "^0.3.0"
      },
      "peerDependencies": {
        "@sinclair/typebox": ">=0.25.24",
        "@standard-schema/spec": "^1.0.0",
        "@typeschema/main": ">=0.13.7",
        "@vinejs/vine": "^2.0.0 || ^3.0.0 || ^4.0.0",
        "ajv": "^8.12.0",
        "ajv-errors": "^3.0.0",
        "ajv-formats": "^2.1.1",
        "arktype": "^2.0.0",
        "ata-validator": "^1.2.0",
        "class-transformer": ">=0.4.0",
        "class-validator": ">=0.12.0",
        "computed-types": "^1.0.0",
        "effect": "^3.10.3",
        "fluentvalidation-ts": "^3.0.0",
        "fp-ts": "^2.7.0",
        "io-ts": "^2.0.0",
        "joi": "^17.0.0 || ^18.0.0",
        "nope-validator": ">=0.12.0",
        "react-hook-form": "^7.55.0",
        "superstruct": ">=0.12.0",
        "typanion": "^3.3.2",
        "valibot": ">=0.31.0 || ^1.0.0-beta.4 || ^1.0.0-rc",
        "vest": ">=6.0.0",
        "yup": "^1.0.0",
        "zod": "^3.25.0 || ^4.0.0"
      },
      "peerDependenciesMeta": {
        "@sinclair/typebox": {
          "optional": true
        },
        "@standard-schema/spec": {
          "optional": true
        },
        "@typeschema/main": {
          "optional": true
        },
        "@vinejs/vine": {
          "optional": true
        },
        "ajv": {
          "optional": true
        },
        "ajv-errors": {
          "optional": true
        },
        "ajv-formats": {
          "optional": true
        },
        "arktype": {
          "optional": true
        },
        "ata-validator": {
          "optional": true
        },
        "class-transformer": {
          "optional": true
        },
        "class-validator": {
          "optional": true
        },
        "computed-types": {
          "optional": true
        },
        "effect": {
          "optional": true
        },
        "fluentvalidation-ts": {
          "optional": true
        },
        "fp-ts": {
          "optional": true
        },
        "io-ts": {
          "optional": true
        },
        "joi": {
          "optional": true
        },
        "nope-validator": {
          "optional": true
        },
        "superstruct": {
          "optional": true
        },
        "typanion": {
          "optional": true
        },
        "valibot": {
          "optional": true
        },
        "vest": {
          "optional": true
        },
        "yup": {
          "optional": true
        },
        "zod": {
          "optional": true
        }
      }
    },
    "node_modules/@humanfs/core": {
      "version": "0.19.2",
      "resolved": "https://registry.npmjs.org/@humanfs/core/-/core-0.19.2.tgz",
      "integrity": "sha512-UhXNm+CFMWcbChXywFwkmhqjs3PRCmcSa/hfBgLIb7oQ5HNb1wS0icWsGtSAUNgefHeI+eBrA8I1fxmbHsGdvA==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@humanfs/types": "^0.15.0"
      },
      "engines": {
        "node": ">=18.18.0"
      }
    },
    "node_modules/@humanfs/node": {
      "version": "0.16.8",
      "resolved": "https://registry.npmjs.org/@humanfs/node/-/node-0.16.8.tgz",
      "integrity": "sha512-gE1eQNZ3R++kTzFUpdGlpmy8kDZD/MLyHqDwqjkVQI0JMdI1D51sy1H958PNXYkM2rAac7e5/CnIKZrHtPh3BQ==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@humanfs/core": "^0.19.2",
        "@humanfs/types": "^0.15.0",
        "@humanwhocodes/retry": "^0.4.0"
      },
      "engines": {
        "node": ">=18.18.0"
      }
    },
    "node_modules/@humanfs/types": {
      "version": "0.15.0",
      "resolved": "https://registry.npmjs.org/@humanfs/types/-/types-0.15.0.tgz",
      "integrity": "sha512-ZZ1w0aoQkwuUuC7Yf+7sdeaNfqQiiLcSRbfI08oAxqLtpXQr9AIVX7Ay7HLDuiLYAaFPu8oBYNq/QIi9URHJ3Q==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=18.18.0"
      }
    },
    "node_modules/@humanwhocodes/module-importer": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/@humanwhocodes/module-importer/-/module-importer-1.0.1.tgz",
      "integrity": "sha512-bxveV4V8v5Yb4ncFTT3rPSgZBOpCkjfK0y4oVVVJwIuDVBRMDXrPyXRL988i5ap9m9bnyEEjWfm5WkBmtffLfA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=12.22"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/nzakas"
      }
    },
    "node_modules/@humanwhocodes/retry": {
      "version": "0.4.3",
      "resolved": "https://registry.npmjs.org/@humanwhocodes/retry/-/retry-0.4.3.tgz",
      "integrity": "sha512-bV0Tgo9K4hfPCek+aMAn81RppFKv2ySDQeMoSZuvTASywNTnVJCArCZE2FWqpvIatKu7VMRLWlR1EazvVhDyhQ==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=18.18"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/nzakas"
      }
    },
    "node_modules/@img/colour": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@img/colour/-/colour-1.1.0.tgz",
      "integrity": "sha512-Td76q7j57o/tLVdgS746cYARfSyxk8iEfRxewL9h4OMzYhbW4TAcppl0mT4eyqXddh6L/jwoM75mo7ixa/pCeQ==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@img/sharp-darwin-arm64": {
      "version": "0.35.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-darwin-arm64/-/sharp-darwin-arm64-0.35.4.tgz",
      "integrity": "sha512-Uhfl4V4lhP2nbUVF9+hyH1+luj86f1gUFeo8ALYxFoULoU+G87D43BfeMP8XHsk9boxAnCY/bf2EHwhA7MuGsA==",
      "cpu": [
        "arm64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-darwin-arm64": "1.3.3"
      }
    },
    "node_modules/@img/sharp-darwin-x64": {
      "version": "0.35.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-darwin-x64/-/sharp-darwin-x64-0.35.4.tgz",
      "integrity": "sha512-hWniXY3bG5qKpkKrAwPe4y+VTPmf086YQAnkxWh7uA1YrlRouWGa0M0Mxj3ZjnXFkv7/TD1bTy9lGUK26vRvWw==",
      "cpu": [
        "x64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-darwin-x64": "1.3.3"
      }
    },
    "node_modules/@img/sharp-freebsd-wasm32": {
      "version": "0.35.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-freebsd-wasm32/-/sharp-freebsd-wasm32-0.35.4.tgz",
      "integrity": "sha512-lIsKw/BU+kjB4eZjxrYrZmwOJYi3Ajrv66iAlBmUPyKc3HpnloevB1g3wxGD9P/5BbQ1brBGl65VRRrCvQDEqA==",
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "dependencies": {
        "@img/sharp-wasm32": "0.35.4"
      },
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-darwin-arm64": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-darwin-arm64/-/sharp-libvips-darwin-arm64-1.3.3.tgz",
      "integrity": "sha512-suTBPTDGrI9WodccaDdwZItTSaBYASlBk1NSfElSHrUfzu3szG6lvIF58+WiFvnfzuK8ZBFS5zE00PxqxnRiPg==",
      "cpu": [
        "arm64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "darwin"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-darwin-x64": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-darwin-x64/-/sharp-libvips-darwin-x64-1.3.3.tgz",
      "integrity": "sha512-FVJZ5mITMobmXIz/hPDTw0EintTW5H3WfrxwLqEqjiIihlu+hVRyGrFQ60xl0Lxn7Bt3zdpevPaQi0HEzqz9fw==",
      "cpu": [
        "x64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "darwin"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-arm": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-arm/-/sharp-libvips-linux-arm-1.3.3.tgz",
      "integrity": "sha512-3rbU4vqXXc3hY/OiXdl52xZvT0F1yEngWfvqudtPJg/KkyiaQw2DRsFrNzpmLvfavbwOq3qXn36GP8obHRULQA==",
      "cpu": [
        "arm"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-arm64": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-arm64/-/sharp-libvips-linux-arm64-1.3.3.tgz",
      "integrity": "sha512-0DaL0A6Xu6sQSQFwe4iVCrKWU2cCTItnRsYsCdxAMm9NF6twAA9BKnoqy4hqz4+azQ0JHuA26qiUKsf1XJ/v5A==",
      "cpu": [
        "arm64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-ppc64": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-ppc64/-/sharp-libvips-linux-ppc64-1.3.3.tgz",
      "integrity": "sha512-cdn1OvUBwsXhbC0zSzJnNzf5MZ/mTrobawDvNXBTxe8VtqKAm0sRuEY2Evzovb/w9JMk4TvRxqt1mekSuJz64w==",
      "cpu": [
        "ppc64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-riscv64": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-riscv64/-/sharp-libvips-linux-riscv64-1.3.3.tgz",
      "integrity": "sha512-HjPVx7yKz+0lqdhDlTw1tt90wamBoxhiXpvl1XZpJLiHH4RCJ5yDTqH+VlYPv2fwFs89JFw4c1IexYOcQUi4IQ==",
      "cpu": [
        "riscv64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-s390x": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-s390x/-/sharp-libvips-linux-s390x-1.3.3.tgz",
      "integrity": "sha512-neWLh+3yCNThxnfy3c4BbVBeGgt9aftno+XbT56iK28RgeDs3UOFWviLWlUu0bArYVYJaFDK+RRohbicUNCm8Q==",
      "cpu": [
        "s390x"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-x64": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-x64/-/sharp-libvips-linux-x64-1.3.3.tgz",
      "integrity": "sha512-4vKmvAst9nrowcqquKFAyZJUDolUaIp8uRiN0mWFguJ1IplC9/pitXtlnnlU4aa/eJw3J7i67V+pwUL+wZGdsA==",
      "cpu": [
        "x64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linuxmusl-arm64": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linuxmusl-arm64/-/sharp-libvips-linuxmusl-arm64-1.3.3.tgz",
      "integrity": "sha512-Y9kQaLMuNoB0bPYOOdcZMaseNrFpPodIWWMrx+CZyydf2xn68j9WYc6sWWRrDwNkzCQjKYfc68L7jKjGlHMibw==",
      "cpu": [
        "arm64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linuxmusl-x64": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linuxmusl-x64/-/sharp-libvips-linuxmusl-x64-1.3.3.tgz",
      "integrity": "sha512-fj8Mv0HHfD1Rr+4I68+3agJynxDWtBFgicTbSOb9Bke6pIwzGcJ+RX/yHjmiEGFMCavY/dxvem7MyNaJF+wDiw==",
      "cpu": [
        "x64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-linux-arm": {
      "version": "0.35.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-arm/-/sharp-linux-arm-0.35.4.tgz",
      "integrity": "sha512-7OAS8gI0EReKGVN2HssHlM6umJgxF5VI3xN0p9FA91p/YO+ou5hiNghLdZ5BEHztwaaK5+bLKRf8x/o2L2nk9A==",
      "cpu": [
        "arm"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-arm": "1.3.3"
      }
    },
    "node_modules/@img/sharp-linux-arm64": {
      "version": "0.35.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-arm64/-/sharp-linux-arm64-0.35.4.tgz",
      "integrity": "sha512-De4jpEnAU8Hd5oT0j1G3uL4ZvTuipVMn7YC6vPaJhy6/7EwEae0SVAoBrUMYQbkLGDm85taVWwuPc1a44LTzCQ==",
      "cpu": [
        "arm64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-arm64": "1.3.3"
      }
    },
    "node_modules/@img/sharp-linux-ppc64": {
      "version": "0.35.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-ppc64/-/sharp-linux-ppc64-0.35.4.tgz",
      "integrity": "sha512-2oYZJeIl4kCcMGk4ouZVjnkCtFrpQFlNEtJ6GbxzhHQchwH0NH/qEb9ykmOl29dqwMq+JhFdZn+1ak2FKhI9fQ==",
      "cpu": [
        "ppc64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-ppc64": "1.3.3"
      }
    },
    "node_modules/@img/sharp-linux-riscv64": {
      "version": "0.35.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-riscv64/-/sharp-linux-riscv64-0.35.4.tgz",
      "integrity": "sha512-cPbNChoRURAWdebDIHSenxRpgEdy7JkPydSnUxRm9VvKD7m0/xVaR/8Fzlu81pk5nHEvHH87UZUA7cTtwnbJSA==",
      "cpu": [
        "riscv64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-riscv64": "1.3.3"
      }
    },
    "node_modules/@img/sharp-linux-s390x": {
      "version": "0.35.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-s390x/-/sharp-linux-s390x-0.35.4.tgz",
      "integrity": "sha512-RY0JFY8Fd6RonCBtHz+DvadaPkXDSI1AUn6yWL9TipqkZ1vY8w8evqdgyDFnkm4/K1ve1TvZiaePP5oSd4+WVQ==",
      "cpu": [
        "s390x"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-s390x": "1.3.3"
      }
    },
    "node_modules/@img/sharp-linux-x64": {
      "version": "0.35.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-x64/-/sharp-linux-x64-0.35.4.tgz",
      "integrity": "sha512-9qvvEAuk8k89TfWUoX2htWjbAMX8p+NxCppjpcg5k6xMsjhBQPTsoIh36h9Qde4WRuGpJeYnOjdosDn/cnv+OA==",
      "cpu": [
        "x64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-x64": "1.3.3"
      }
    },
    "node_modules/@img/sharp-linuxmusl-arm64": {
      "version": "0.35.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-linuxmusl-arm64/-/sharp-linuxmusl-arm64-0.35.4.tgz",
      "integrity": "sha512-KB5jxpfWQTr0nc3xdHtWChdbifHrBGsd2SM62Eyxrl8afikm+f5qGBU75SJIZBT/S1MC8XyacdlXBMSWq6OURA==",
      "cpu": [
        "arm64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linuxmusl-arm64": "1.3.3"
      }
    },
    "node_modules/@img/sharp-linuxmusl-x64": {
      "version": "0.35.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-linuxmusl-x64/-/sharp-linuxmusl-x64-0.35.4.tgz",
      "integrity": "sha512-f+eZJZIQNEEd26RPSW+76chwOf1XtA2Y/O+5ocVyLliHkeih3e+jhLVBdNTd2rS3IbNXK8+ug93Vf5ZXtF5Lxg==",
      "cpu": [
        "x64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linuxmusl-x64": "1.3.3"
      }
    },
    "node_modules/@img/sharp-wasm32": {
      "version": "0.35.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-wasm32/-/sharp-wasm32-0.35.4.tgz",
      "integrity": "sha512-zQnl4Kwp7Q6NHsENtU2T/00Zi+w3AQNwz3+UaTyVBy2FpXrzXzGjndpK61onhZjRtRpQXxCTeqw19bVyXOh7jA==",
      "license": "Apache-2.0 AND LGPL-3.0-or-later AND MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/runtime": "^1.11.3"
      },
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-webcontainers-wasm32": {
      "version": "0.35.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-webcontainers-wasm32/-/sharp-webcontainers-wasm32-0.35.4.tgz",
      "integrity": "sha512-ESfNkywmCfPNyaZjxooddJQiQ+l/nTpGEOGthxiLnIHXC/CmcBixnfwUleX9mCz9ovrUUvKMap/pm8RYbzfwaA==",
      "cpu": [
        "wasm32"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "dependencies": {
        "@img/sharp-wasm32": "0.35.4"
      },
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-win32-arm64": {
      "version": "0.35.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-win32-arm64/-/sharp-win32-arm64-0.35.4.tgz",
      "integrity": "sha512-iNdlBX9gLVvqe2I3uIJSIKTq6wckP/DYxZtcqxm09x5Gi24DnFBmPAWZmr60ZyYMG0xlzo6goG3670ar+RXvRw==",
      "cpu": [
        "arm64"
      ],
      "license": "Apache-2.0 AND LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-win32-ia32": {
      "version": "0.35.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-win32-ia32/-/sharp-win32-ia32-0.35.4.tgz",
      "integrity": "sha512-kqRsbaa5CS6KHlpxnN7WhE6vAAugXyZButpRdvDWetlv6Qv4N9WTcrWzF7tXfB9T7MsoadqdI8hmwLq6UlLvtw==",
      "cpu": [
        "ia32"
      ],
      "license": "Apache-2.0 AND LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-win32-x64": {
      "version": "0.35.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-win32-x64/-/sharp-win32-x64-0.35.4.tgz",
      "integrity": "sha512-XtmnYhBcrORsJ4XJngyzr/EWP0hRZLAZRFaApdKuviyqF78+ylxh2y06ZmtULAMOnObJ3ucpN0AcwSWnMowTRg==",
      "cpu": [
        "x64"
      ],
      "license": "Apache-2.0 AND LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@jridgewell/gen-mapping": {
      "version": "0.3.13",
      "resolved": "https://registry.npmjs.org/@jridgewell/gen-mapping/-/gen-mapping-0.3.13.tgz",
      "integrity": "sha512-2kkt/7niJ6MgEPxF0bYdQ6etZaA+fQvDcLKckhy1yIQOzaoKjBBjSj63/aLVjYE3qhRt5dvM+uUyfCg6UKCBbA==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.0",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/remapping": {
      "version": "2.3.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/remapping/-/remapping-2.3.5.tgz",
      "integrity": "sha512-LI9u/+laYG4Ds1TDKSJW2YPrIlcVYOwi2fUC6xB43lueCjgxV4lffOCZCtYFiH6TNOX+tQKXx97T4IKHbhyHEQ==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.5",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/resolve-uri": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz",
      "integrity": "sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw==",
      "license": "MIT",
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/sourcemap-codec": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.6.0.tgz",
      "integrity": "sha512-T7jf+5zgsZHwNJ4lvQ7/aezbyk0nNX+zJVWpmHA7VYsEx7a7qr5Rg5IbtJFqkgze5Y2sruq1RUY8Q837Od7iFw==",
      "license": "MIT"
    },
    "node_modules/@jridgewell/trace-mapping": {
      "version": "0.3.31",
      "resolved": "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.31.tgz",
      "integrity": "sha512-zzNR+SdQSDJzc8joaeP8QQoCQr8NuYx2dIIytl1QeBEZHJ9uW6hebsrYgbz8hJwUQao3TWCMtmfV8Nu1twOLAw==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/resolve-uri": "^3.1.0",
        "@jridgewell/sourcemap-codec": "^1.4.14"
      }
    },
    "node_modules/@modelcontextprotocol/sdk": {
      "version": "1.30.1",
      "resolved": "https://registry.npmjs.org/@modelcontextprotocol/sdk/-/sdk-1.30.1.tgz",
      "integrity": "sha512-H2HxLvC3HDNybePJaLdSrU1hhUK5iQw+WvV1b01myFyI7sdVGe1u/IPTE5D9fGCiJDVtgMV/lmFkQXLmQyIFYA==",
      "license": "MIT",
      "dependencies": {
        "@hono/node-server": "^1.19.9 || ^2.0.5",
        "ajv": "^8.17.1",
        "ajv-formats": "^3.0.1",
        "content-type": "^1.0.5",
        "cors": "^2.8.5",
        "cross-spawn": "^7.0.5",
        "eventsource": "^3.0.2",
        "eventsource-parser": "^3.0.0",
        "express": "^5.2.1",
        "express-rate-limit": "^8.2.1",
        "hono": "^4.11.4",
        "jose": "^6.1.3",
        "json-schema-typed": "^8.0.2",
        "pkce-challenge": "^5.0.0",
        "raw-body": "^3.0.0",
        "zod": "^3.25 || ^4.0",
        "zod-to-json-schema": "^3.25.1"
      },
      "engines": {
        "node": ">=18"
      },
      "peerDependencies": {
        "@cfworker/json-schema": "^4.1.1",
        "zod": "^3.25 || ^4.0"
      },
      "peerDependenciesMeta": {
        "@cfworker/json-schema": {
          "optional": true
        },
        "zod": {
          "optional": false
        }
      }
    },
    "node_modules/@modelcontextprotocol/sdk/node_modules/ajv-formats": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/ajv-formats/-/ajv-formats-3.0.1.tgz",
      "integrity": "sha512-8iUql50EUR+uUcdRQ3HDqa6EVyo3docL8g5WJ3FNcWmu62IbkGUue/pEyLBW8VGKKucTPgqeks4fIU1DA4yowQ==",
      "license": "MIT",
      "dependencies": {
        "ajv": "^8.0.0"
      },
      "peerDependencies": {
        "ajv": "^8.0.0"
      },
      "peerDependenciesMeta": {
        "ajv": {
          "optional": true
        }
      }
    },
    "node_modules/@napi-rs/wasm-runtime": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/@napi-rs/wasm-runtime/-/wasm-runtime-1.2.4.tgz",
      "integrity": "sha512-AJxoUD2/15ESHbvpcyjU274nsAPLuOtPHCk0vKJM5pj//Fg/B1FXNWjPnXTT9PymCYYiHo4zPj0ZomXBKhoy7g==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@tybys/wasm-util": "^0.10.3"
      },
      "engines": {
        "node": "^20.19.0 || ^22.13.0 || >=23.5.0"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/Brooooooklyn"
      },
      "peerDependencies": {
        "@emnapi/core": "^1.7.1 || ^2.0.0-alpha.4",
        "@emnapi/runtime": "^1.7.1 || ^2.0.0-alpha.4"
      }
    },
    "node_modules/@next/env": {
      "version": "16.3.6",
      "resolved": "https://registry.npmjs.org/@next/env/-/env-16.3.6.tgz",
      "integrity": "sha512-x9Vblze1EbtltQYnNH38xCPWU3TVfBd1eXqA3+w9+BTpedkkdNpAaltXlGQ/nsc1+E0mVTNrtcbX3GoO09zeLQ==",
      "license": "MIT"
    },
    "node_modules/@next/eslint-plugin-next": {
      "version": "16.3.6",
      "resolved": "https://registry.npmjs.org/@next/eslint-plugin-next/-/eslint-plugin-next-16.3.6.tgz",
      "integrity": "sha512-jowwDX+7DOlDIjJLgTMxudw+k37QnWu1JkZLkSi9MaJBfDYcfhAPMKBhXL0idYzFN/AGg//axnOR4cLkHX/Rng==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@eslint-community/eslint-utils": "4.9.1",
        "fast-glob": "3.3.1"
      }
    },
    "node_modules/@next/eslint-plugin-next/node_modules/@eslint-community/eslint-utils": {
      "version": "4.9.1",
      "resolved": "https://registry.npmjs.org/@eslint-community/eslint-utils/-/eslint-utils-4.9.1.tgz",
      "integrity": "sha512-phrYmNiYppR7znFEdqgfWHXR6NCkZEK7hwWDHZUjit/2/U0r6XvkDl0SYnoM51Hq7FhCGdLDT6zxCCOY1hexsQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "eslint-visitor-keys": "^3.4.3"
      },
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      },
      "peerDependencies": {
        "eslint": "^6.0.0 || ^7.0.0 || >=8.0.0"
      }
    },
    "node_modules/@next/eslint-plugin-next/node_modules/eslint-visitor-keys": {
      "version": "3.4.3",
      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-3.4.3.tgz",
      "integrity": "sha512-wpc+LXeiyiisxPlEkUzU6svyS1frIO3Mgxj1fdy7Pm8Ygzguax2N3Fa/D/ag1WqbOprdI+uY6wMUl8/a2G+iag==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/@next/swc-darwin-arm64": {
      "version": "16.3.6",
      "resolved": "https://registry.npmjs.org/@next/swc-darwin-arm64/-/swc-darwin-arm64-16.3.6.tgz",
      "integrity": "sha512-E/7GEqaUkt8mk/T8v9lAnrhzR06kdq1ZBkC12F8tAMkdIadwNp3H1KqHynDHrpcTlGCUdq/qu6vUL2aYVyYBdw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-darwin-x64": {
      "version": "16.3.6",
      "resolved": "https://registry.npmjs.org/@next/swc-darwin-x64/-/swc-darwin-x64-16.3.6.tgz",
      "integrity": "sha512-yBE893/nDWTlaiBD1p+qgt7NUen4U5R6FXyH0s67Npq1S3E0cVSef1WIXC2xBRgQvwAvJq6DnS6Y6PrY0cy4Ew==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-linux-arm64-gnu": {
      "version": "16.3.6",
      "resolved": "https://registry.npmjs.org/@next/swc-linux-arm64-gnu/-/swc-linux-arm64-gnu-16.3.6.tgz",
      "integrity": "sha512-KJDpjBqBPYlvkivmyrp+Qys6k/7ksbqGQvRVc6ZEGfR+cjQxx+nUkJaWmNZJsmoOrqYNbaXByF8wa0lBwDhB3Q==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-linux-arm64-musl": {
      "version": "16.3.6",
      "resolved": "https://registry.npmjs.org/@next/swc-linux-arm64-musl/-/swc-linux-arm64-musl-16.3.6.tgz",
      "integrity": "sha512-mqNg2K+hvWskSRb/QM+Ix412DvBsuSF0XV+frTSw5vmoucNnIlynFwKYew8D01bfATErMOM7Bujrf0BA5DRKFA==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-linux-x64-gnu": {
      "version": "16.3.6",
      "resolved": "https://registry.npmjs.org/@next/swc-linux-x64-gnu/-/swc-linux-x64-gnu-16.3.6.tgz",
      "integrity": "sha512-nFncBNGAYouRHjRVaITs9beZRfhX4ssVwpnvPIAbkZVH6LtGoAVlH4bJ8Cnf9SOo9bsXgPFer/GdHtEE3JNOkw==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-linux-x64-musl": {
      "version": "16.3.6",
      "resolved": "https://registry.npmjs.org/@next/swc-linux-x64-musl/-/swc-linux-x64-musl-16.3.6.tgz",
      "integrity": "sha512-5Mf3cHDGR/Iz0ng2Bj3zUR3p5QS9YK3Hn2QiAfavFmyF48zwThAjpFoiTKNIcOHLYS4zEk+gzyJ/9deQ2ZB8yQ==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-win32-arm64-msvc": {
      "version": "16.3.6",
      "resolved": "https://registry.npmjs.org/@next/swc-win32-arm64-msvc/-/swc-win32-arm64-msvc-16.3.6.tgz",
      "integrity": "sha512-0jkJy0C2kbrJWTk4YLa3xk80pVBpx8FCHJym7CnUfDAXe/FWv5qT7SQJbR0KuemyxaEDlEx5WT4VQJoTW+/9Qw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-win32-x64-msvc": {
      "version": "16.3.6",
      "resolved": "https://registry.npmjs.org/@next/swc-win32-x64-msvc/-/swc-win32-x64-msvc-16.3.6.tgz",
      "integrity": "sha512-/YXjI1e5OXcZ7YpxRwgP/1jAV/SBKTzeVKqN2mk7mLpcICsyn3Gl5+dIfDTJp70M0ccMhyMMRso4v6mPDCGepg==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@nodelib/fs.scandir": {
      "version": "2.1.5",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.scandir/-/fs.scandir-2.1.5.tgz",
      "integrity": "sha512-vq24Bq3ym5HEQm2NKCr3yXDwjc7vTsEThRDnkp2DK9p1uqLR+DHurm/NOTo0KG7HYHU7eppKZj3MyqYuMBf62g==",
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.stat": "2.0.5",
        "run-parallel": "^1.1.9"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nodelib/fs.stat": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.stat/-/fs.stat-2.0.5.tgz",
      "integrity": "sha512-RkhPPp2zrqDAQA/2jNhnztcPAlv64XdhIp7a7454A5ovI7Bukxgt7MX7udwAu3zg1DcpPU0rz3VV1SeaqvY4+A==",
      "license": "MIT",
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nodelib/fs.walk": {
      "version": "1.2.8",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.walk/-/fs.walk-1.2.8.tgz",
      "integrity": "sha512-oGB+UxlgWcgQkgwo8GcEGwemoTFt3FIO9ababBmaGwXIoBKZ+GTy0pP185beGg7Llih/NSHSV2XAs1lnznocSg==",
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.scandir": "2.1.5",
        "fastq": "^1.6.0"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nolyfill/is-core-module": {
      "version": "1.0.39",
      "resolved": "https://registry.npmjs.org/@nolyfill/is-core-module/-/is-core-module-1.0.39.tgz",
      "integrity": "sha512-nn5ozdjYQpUCZlWGuxcJY/KpxkWQs4DcbMCmKojjyrYDEAGy4Ce19NN4v5MduafTwJlbKc99UA8YhSVqq9yPZA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12.4.0"
      }
    },
    "node_modules/@rtsao/scc": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@rtsao/scc/-/scc-1.1.0.tgz",
      "integrity": "sha512-zt6OdqaDoOnJ1ZYsCYGt9YmWzDXl4vQdKTyJev62gFhRGKdx7mcT54V9KIjg+d2wi9EXsPvAPKe7i7WjfVWB8g==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@sec-ant/readable-stream": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/@sec-ant/readable-stream/-/readable-stream-0.4.1.tgz",
      "integrity": "sha512-831qok9r2t8AlxLko40y2ebgSDhenenCatLVeW/uBtnHPyhHOvG0C7TvfgecV+wHzIm5KUICgzmVpWS+IMEAeg==",
      "license": "MIT"
    },
    "node_modules/@sindresorhus/merge-streams": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/@sindresorhus/merge-streams/-/merge-streams-4.0.0.tgz",
      "integrity": "sha512-tlqY9xq5ukxTUZBmoOp+m61cqwQD5pHJtFY3Mn8CA8ps6yghLH/Hw8UPdqg4OLmFW3IFlcXnQNmo/dh8HzXYIQ==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@socket.io/component-emitter": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/@socket.io/component-emitter/-/component-emitter-3.1.2.tgz",
      "integrity": "sha512-9BCxFwvbGg/RsZK9tjXd8s4UcwR0MWeFQ1XEKIQVVvAGJyINdrqKMcTRyLoK8Rse1GjzLV9cwjWV1olXRWEXVA==",
      "license": "MIT"
    },
    "node_modules/@standard-schema/utils": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/@standard-schema/utils/-/utils-0.3.0.tgz",
      "integrity": "sha512-e7Mew686owMaPJVNNLs55PUvgz371nKgwsc4vxE49zsODpJEnxgxRo2y/OKrqueavXgZNMDVj3DdHFlaSAeU8g==",
      "license": "MIT"
    },
    "node_modules/@swc/helpers": {
      "version": "0.5.23",
      "resolved": "https://registry.npmjs.org/@swc/helpers/-/helpers-0.5.23.tgz",
      "integrity": "sha512-5lSsMOTXURePglDfvuAQUqkGek9Hg2kksOYay2m0+XR++b2NWYL/4sWyuvVBIs8oKnJaxkdi9whaL/sqN13afw==",
      "license": "Apache-2.0",
      "dependencies": {
        "tslib": "^2.8.0"
      }
    },
    "node_modules/@tailwindcss/node": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/node/-/node-4.3.3.tgz",
      "integrity": "sha512-/T8IKEsf9VTU6tLjgC7+sv2mOPtQxzE2jMw7u4Tt40Tx+QSZxpzh95/H6cMKoja9XuW7iMdLJYBB0o9G1CaAgg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/remapping": "^2.3.5",
        "enhanced-resolve": "^5.24.1",
        "jiti": "^2.7.0",
        "lightningcss": "1.32.0",
        "magic-string": "^0.30.21",
        "source-map-js": "^1.2.1",
        "tailwindcss": "4.3.3"
      }
    },
    "node_modules/@tailwindcss/oxide": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide/-/oxide-4.3.3.tgz",
      "integrity": "sha512-krXjAikiaFSPaK/FkAQT5UTx3VormQaiZ5hBFlJZ9UFQGB/rwg1MZIhHAG9smMQRTdyJxP6Qt5MwMtdyU5FWrA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 20"
      },
      "optionalDependencies": {
        "@tailwindcss/oxide-android-arm64": "4.3.3",
        "@tailwindcss/oxide-darwin-arm64": "4.3.3",
        "@tailwindcss/oxide-darwin-x64": "4.3.3",
        "@tailwindcss/oxide-freebsd-x64": "4.3.3",
        "@tailwindcss/oxide-linux-arm-gnueabihf": "4.3.3",
        "@tailwindcss/oxide-linux-arm64-gnu": "4.3.3",
        "@tailwindcss/oxide-linux-arm64-musl": "4.3.3",
        "@tailwindcss/oxide-linux-x64-gnu": "4.3.3",
        "@tailwindcss/oxide-linux-x64-musl": "4.3.3",
        "@tailwindcss/oxide-wasm32-wasi": "4.3.3",
        "@tailwindcss/oxide-win32-arm64-msvc": "4.3.3",
        "@tailwindcss/oxide-win32-x64-msvc": "4.3.3"
      }
    },
    "node_modules/@tailwindcss/oxide-android-arm64": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-android-arm64/-/oxide-android-arm64-4.3.3.tgz",
      "integrity": "sha512-Y85A2gmPSkl5Ve5qR86GL4HT509cFqQh1aes9p3sSkyTPwt0Pppf3GkwGe4JPACcRYjgJIEhQgM6dBClnr0NYw==",
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
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-darwin-arm64": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-darwin-arm64/-/oxide-darwin-arm64-4.3.3.tgz",
      "integrity": "sha512-BiaWatpBcERQFDlOjRDpIVXuFK5PJez5SA4JMg6VYZdBYU+qKfV/vqjcIs+IYmtitf1xYQZTwXvU/8y4lfZUGw==",
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
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-darwin-x64": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-darwin-x64/-/oxide-darwin-x64-4.3.3.tgz",
      "integrity": "sha512-fAeUqfV5ndhxRwai8cXGzdLvul9utWOmeTkv69unv4ZXixjn61Z+p9lCWdwOwA3TYboG3BwdVuN/RDjhBRl0mw==",
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
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-freebsd-x64": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-freebsd-x64/-/oxide-freebsd-x64-4.3.3.tgz",
      "integrity": "sha512-iyf5bV6+wnAlflVeEy7R25dupxTNECZN5QMI0qNT6eT+EgaGdZcKhGkr5SdoaWiLJ3spLqIY9VCeSGrwmtg4kw==",
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
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-arm-gnueabihf": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm-gnueabihf/-/oxide-linux-arm-gnueabihf-4.3.3.tgz",
      "integrity": "sha512-aAYUprJAJQWWbRrPvtjdroZ56Md+JM8pMiopS6xGEwDfLhqj+2ver2p4nU4Mb3CRqcMmNBjo8KkUgcxhkzVQGQ==",
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
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-arm64-gnu": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm64-gnu/-/oxide-linux-arm64-gnu-4.3.3.tgz",
      "integrity": "sha512-nDxldcEENOxZRzC2uu9jrutZdAAQtb+8WWDCSnWL1zvBk1+FN+x6MtDViPB5AJMfttVCUhehGWus3XBPgatM/w==",
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
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-arm64-musl": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm64-musl/-/oxide-linux-arm64-musl-4.3.3.tgz",
      "integrity": "sha512-Md44bD6veX/PC5iyF8cDVnw4HBIANZepRZZ7a8DQOvkfo5WUBwcp6iAuCUz23u+4SUkhJlD3eL7hNdW8ezd/kA==",
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
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-x64-gnu": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-x64-gnu/-/oxide-linux-x64-gnu-4.3.3.tgz",
      "integrity": "sha512-tx7us1muwOKAKWao2v/GaafFeQboE6aj88vC6ziN2NCGcRm8gWUhwjzg+YdVB1e4boAtdtma4L43onunI6NS4w==",
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
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-x64-musl": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-x64-musl/-/oxide-linux-x64-musl-4.3.3.tgz",
      "integrity": "sha512-SJxX60smvHgasZoBy11dX6YRjXJFovwWBoedhbQPOBzgFWBHGB+TVPWB9BxzR7TTxU8FQZAI2AyiNCMzFm8Img==",
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
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-wasm32-wasi": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-wasm32-wasi/-/oxide-wasm32-wasi-4.3.3.tgz",
      "integrity": "sha512-jx1+rPhY/5Ympkktd656HBWEBLxP7dH06losBLjjf5vgCODXvi9KhtftWcMIwTFIDqBr7cRnQkdLnAG+IOlGvQ==",
      "bundleDependencies": [
        "@napi-rs/wasm-runtime",
        "@emnapi/core",
        "@emnapi/runtime",
        "@tybys/wasm-util",
        "@emnapi/wasi-threads",
        "tslib"
      ],
      "cpu": [
        "wasm32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/core": "^1.11.1",
        "@emnapi/runtime": "^1.11.1",
        "@emnapi/wasi-threads": "^1.2.2",
        "@napi-rs/wasm-runtime": "^1.1.4",
        "@tybys/wasm-util": "^0.10.2",
        "tslib": "^2.8.1"
      },
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/@tailwindcss/oxide-win32-arm64-msvc": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-win32-arm64-msvc/-/oxide-win32-arm64-msvc-4.3.3.tgz",
      "integrity": "sha512-3rc292Ca2ceK6Ulcc/bAVnTs/3nDtoPhyEKlgPv+yQJQi/JS/AMJlqzxvlDacL1nekbrcf6bTqp/jV4qgnPxNQ==",
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
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-win32-x64-msvc": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-win32-x64-msvc/-/oxide-win32-x64-msvc-4.3.3.tgz",
      "integrity": "sha512-yJ0pwIVc/nYeGoV02WtsN8KYyLQv7kyI2wDnkezyJlGGjkd4QLwDGAwl47YpPJeuI0M0ObaXGSPjvWDPeTPggw==",
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
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/postcss": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/postcss/-/postcss-4.3.3.tgz",
      "integrity": "sha512-JTSZZGQi1AyKirbLN3azmjVzef92tcX7h+iSqPdaeStyFpGpDlKvvpxeOE8njhbUanbRwr3z8DyzhICWnMtQeg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@alloc/quick-lru": "^5.2.0",
        "@tailwindcss/node": "4.3.3",
        "@tailwindcss/oxide": "4.3.3",
        "postcss": "^8.5.16",
        "tailwindcss": "4.3.3"
      }
    },
    "node_modules/@tanstack/query-core": {
      "version": "5.104.0",
      "resolved": "https://registry.npmjs.org/@tanstack/query-core/-/query-core-5.104.0.tgz",
      "integrity": "sha512-JrC2r/JQlXt7khBSdUpsgxNvybzOg+aITa+ARRMlP2AFo93Y8vIqz077rp+e61mJetSZ0T6AJbwW1JHer1vrPQ==",
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/tannerlinsley"
      }
    },
    "node_modules/@tanstack/react-query": {
      "version": "5.104.0",
      "resolved": "https://registry.npmjs.org/@tanstack/react-query/-/react-query-5.104.0.tgz",
      "integrity": "sha512-e1TZmDCQnWIfiDVryIHeA6Idj+Lfx1hORLOhXS/l5wcgvtVD4yYqbTDl378sGQKIi2cSgb0TEMC9cKK8GGoJEw==",
      "license": "MIT",
      "dependencies": {
        "@tanstack/query-core": "5.104.0"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/tannerlinsley"
      },
      "peerDependencies": {
        "react": "^18 || ^19"
      }
    },
    "node_modules/@ts-morph/common": {
      "version": "0.27.0",
      "resolved": "https://registry.npmjs.org/@ts-morph/common/-/common-0.27.0.tgz",
      "integrity": "sha512-Wf29UqxWDpc+i61k3oIOzcUfQt79PIT9y/MWfAGlrkjg6lBC1hwDECLXPVJAhWjiGbfBCxZd65F/LIZF3+jeJQ==",
      "license": "MIT",
      "dependencies": {
        "fast-glob": "^3.3.3",
        "minimatch": "^10.0.1",
        "path-browserify": "^1.0.1"
      }
    },
    "node_modules/@ts-morph/common/node_modules/balanced-match": {
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-4.0.4.tgz",
      "integrity": "sha512-BLrgEcRTwX2o6gGxGOCNyMvGSp35YofuYzw9h1IMTRmKqttAZZVU67bdb9Pr2vUHA8+j3i2tJfjO6C6+4myGTA==",
      "license": "MIT",
      "engines": {
        "node": "18 || 20 || >=22"
      }
    },
    "node_modules/@ts-morph/common/node_modules/brace-expansion": {
      "version": "5.0.12",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-5.0.12.tgz",
      "integrity": "sha512-YovQ3rzhaLMIrDjNDMkNS01tea93qhEhG5xy8f6+R0l+dw3Ki+5sCoIoI942iuLZTHWogWktgwVDhU09iNEimQ==",
      "license": "MIT",
      "dependencies": {
        "balanced-match": "^4.0.2"
      },
      "engines": {
        "node": "20 || >=22"
      }
    },
    "node_modules/@ts-morph/common/node_modules/fast-glob": {
      "version": "3.3.3",
      "resolved": "https://registry.npmjs.org/fast-glob/-/fast-glob-3.3.3.tgz",
      "integrity": "sha512-7MptL8U0cqcFdzIzwOTHoilX9x5BrNqye7Z/LuC7kCMRio1EMSyqRK3BEAUD7sXRq4iT4AzTVuZdhgQ2TCvYLg==",
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.stat": "^2.0.2",
        "@nodelib/fs.walk": "^1.2.3",
        "glob-parent": "^5.1.2",
        "merge2": "^1.3.0",
        "micromatch": "^4.0.8"
      },
      "engines": {
        "node": ">=8.6.0"
      }
    },
    "node_modules/@ts-morph/common/node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/@ts-morph/common/node_modules/minimatch": {
      "version": "10.2.6",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-10.2.6.tgz",
      "integrity": "sha512-vpLQEs+VLCr1nU0BXS07maYoFwlDAH0gngQuuttxIwutDFEMHq2blX+8vpgxDdK3J1PwjCJiep77OitTZ4Ll1A==",
      "license": "BlueOak-1.0.0",
      "dependencies": {
        "brace-expansion": "^5.0.8"
      },
      "engines": {
        "node": "18 || 20 || >=22"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/@tybys/wasm-util": {
      "version": "0.10.4",
      "resolved": "https://registry.npmjs.org/@tybys/wasm-util/-/wasm-util-0.10.4.tgz",
      "integrity": "sha512-W3c4gRigFS0T/Ma4qIYF3GDAc5AQdHb1yL5znJT1Zv1YaD9Kitx656wBjvr19qbiosmZT8lWDM5BEMynUqX65A==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@types/estree": {
      "version": "1.0.9",
      "resolved": "https://registry.npmjs.org/@types/estree/-/estree-1.0.9.tgz",
      "integrity": "sha512-GhdPgy1el4/ImP05X05Uw4cw2/M93BCUmnEvWZNStlCzEKME4Fkk+YpoA5OiHNQmoS7Cafb8Xa3Pya8m1Qrzeg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/json-schema": {
      "version": "7.0.15",
      "resolved": "https://registry.npmjs.org/@types/json-schema/-/json-schema-7.0.15.tgz",
      "integrity": "sha512-5+fP8P8MFNC+AyZCDxrB2pkZFPGzqQWUzpSeuuVLvm8VMcorNYavBqoFcxK8bQz4Qsbn4oUEEem4wDLfcysGHA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/json5": {
      "version": "0.0.29",
      "resolved": "https://registry.npmjs.org/@types/json5/-/json5-0.0.29.tgz",
      "integrity": "sha512-dRLjCWHYg4oaA77cxO64oO+7JwCwnIzkZPdrrC71jQmQtlhM556pwKo5bUzqvZndkVbeFLIIi+9TC40JNF5hNQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/node": {
      "version": "20.19.43",
      "resolved": "https://registry.npmjs.org/@types/node/-/node-20.19.43.tgz",
      "integrity": "sha512-6oYBAi5ikg4Pl+kGsoYtawUMBT2zZMCvPNF7pVLnHZfd1zf38DRiWn/gT01RYCdUqkv7Fhr+C9ot4/tb+2sVvA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "undici-types": "~6.21.0"
      }
    },
    "node_modules/@types/react": {
      "version": "19.3.0",
      "resolved": "https://registry.npmjs.org/@types/react/-/react-19.3.0.tgz",
      "integrity": "sha512-N0rFCuH9YoxG9/m61l9MfpJKfmLOVU0em7ipIz6TRgSSkvReLB9vL85GB+yr8Bs5leqpvg96JSwF4ZS1s4viQg==",
      "devOptional": true,
      "license": "MIT",
      "dependencies": {
        "csstype": "^3.2.2"
      }
    },
    "node_modules/@types/react-dom": {
      "version": "19.3.0",
      "resolved": "https://registry.npmjs.org/@types/react-dom/-/react-dom-19.3.0.tgz",
      "integrity": "sha512-ZI7bU42mZXXKHn/qNLEw2IrbiINU7X5+vfgdixBHkCNpYWXjKgfQ/P+uyGb5CjOLB9UcnTeg3rylQtV2hym44Q==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "^19.3.0"
      }
    },
    "node_modules/@types/validate-npm-package-name": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/@types/validate-npm-package-name/-/validate-npm-package-name-4.0.2.tgz",
      "integrity": "sha512-lrpDziQipxCEeK5kWxvljWYhUvOiB2A9izZd9B2AFarYAkqZshb4lPbRs7zKEic6eGtH8V/2qJW+dPp9OtF6bw==",
      "license": "MIT"
    },
    "node_modules/@typescript-eslint/eslint-plugin": {
      "version": "8.70.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/eslint-plugin/-/eslint-plugin-8.70.1.tgz",
      "integrity": "sha512-nDNrUQ/4ruSNYbu749TRY7cfrzPtoLHEXSNBI8aaNY32LlZCajixqRf3FqcKC4p5Cam4VOHYx/t+i5+nKXvrqA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@eslint-community/regexpp": "^4.12.2",
        "@typescript-eslint/scope-manager": "8.70.1",
        "@typescript-eslint/type-utils": "8.70.1",
        "@typescript-eslint/utils": "8.70.1",
        "@typescript-eslint/visitor-keys": "8.70.1",
        "ignore": "^7.0.5",
        "natural-compare": "^1.4.0",
        "ts-api-utils": "^2.5.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "@typescript-eslint/parser": "^8.70.1",
        "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/@typescript-eslint/eslint-plugin/node_modules/ignore": {
      "version": "7.0.10",
      "resolved": "https://registry.npmjs.org/ignore/-/ignore-7.0.10.tgz",
      "integrity": "sha512-HpbUakT7xp5miBUywCHf36ZEuAJNklBJDDsGpUIjMzOSmM8ELSfA9Sa/QDPeNeqeoN31u+UTCkL4klCOVvRm4Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 4"
      }
    },
    "node_modules/@typescript-eslint/parser": {
      "version": "8.70.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/parser/-/parser-8.70.1.tgz",
      "integrity": "sha512-nO974WLllwhSFWQXnMLj6nDGa8f0khKEz1JzpPJ1u7Vm/4X1X6ZHajpoknU4bb41vJyMB0HHVyS2GqdhWfIXZw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/scope-manager": "8.70.1",
        "@typescript-eslint/types": "8.70.1",
        "@typescript-eslint/typescript-estree": "8.70.1",
        "@typescript-eslint/visitor-keys": "8.70.1",
        "debug": "^4.4.3"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/@typescript-eslint/project-service": {
      "version": "8.70.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/project-service/-/project-service-8.70.1.tgz",
      "integrity": "sha512-62xOgboPfwc3/IgPSX/W6oQR3ZbF04194FPGUGH8HL8iLFHbt/456/8Ph1wLNUgVF+s94FlHoipBsz+v7+LMnA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/tsconfig-utils": "^8.70.1",
        "@typescript-eslint/types": "^8.70.1",
        "debug": "^4.4.3"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/@typescript-eslint/scope-manager": {
      "version": "8.70.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/scope-manager/-/scope-manager-8.70.1.tgz",
      "integrity": "sha512-Pa0EeSeAusQc1WbjQMac+YfenewYTBu0KjgYvkUKwhXaHUKbFog23Dm/rp0DX/6tyYOQ3Xl1a+3EcFNZynGHCw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/types": "8.70.1",
        "@typescript-eslint/visitor-keys": "8.70.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      }
    },
    "node_modules/@typescript-eslint/tsconfig-utils": {
      "version": "8.70.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/tsconfig-utils/-/tsconfig-utils-8.70.1.tgz",
      "integrity": "sha512-jumze1fPI+sDOaM2TWGQdn39PDxTr7TZGeuyLkAbNyx2vtMT3uRnVKChN0hfht5V2TugphJzF6bYXvBcE09qqg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/@typescript-eslint/type-utils": {
      "version": "8.70.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/type-utils/-/type-utils-8.70.1.tgz",
      "integrity": "sha512-7zKTnyvaVWqzLZHPFQtX1hVHqgkMC+WebPWakNCSyrQVbIP1AM0L0TlBZtACldIRb6PptI8Odk+jyZ5kP3B1VA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/types": "8.70.1",
        "@typescript-eslint/typescript-estree": "8.70.1",
        "@typescript-eslint/utils": "8.70.1",
        "debug": "^4.4.3",
        "ts-api-utils": "^2.5.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/@typescript-eslint/types": {
      "version": "8.70.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/types/-/types-8.70.1.tgz",
      "integrity": "sha512-Dm1ypdhhrGCTyyehxElhgJ6kgk8MVCv5qXdoOVqPr1uqk42jX8KjrZqhROvdShczA8qrDoYiOWn1ykWlx2k81Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      }
    },
    "node_modules/@typescript-eslint/typescript-estree": {
      "version": "8.70.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/typescript-estree/-/typescript-estree-8.70.1.tgz",
      "integrity": "sha512-TU8PwyGN0PQJUcE96mw8eCQ44SmxGdQlJmlWakHaHQ15eIuuvye5yNtmh/i6oS88jzXVQB71xdNkbkB/fMwL0g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/project-service": "8.70.1",
        "@typescript-eslint/tsconfig-utils": "8.70.1",
        "@typescript-eslint/types": "8.70.1",
        "@typescript-eslint/visitor-keys": "8.70.1",
        "debug": "^4.4.3",
        "minimatch": "^10.2.2",
        "semver": "^7.7.3",
        "tinyglobby": "^0.2.15",
        "ts-api-utils": "^2.5.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/@typescript-eslint/typescript-estree/node_modules/balanced-match": {
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-4.0.4.tgz",
      "integrity": "sha512-BLrgEcRTwX2o6gGxGOCNyMvGSp35YofuYzw9h1IMTRmKqttAZZVU67bdb9Pr2vUHA8+j3i2tJfjO6C6+4myGTA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "18 || 20 || >=22"
      }
    },
    "node_modules/@typescript-eslint/typescript-estree/node_modules/brace-expansion": {
      "version": "5.0.12",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-5.0.12.tgz",
      "integrity": "sha512-YovQ3rzhaLMIrDjNDMkNS01tea93qhEhG5xy8f6+R0l+dw3Ki+5sCoIoI942iuLZTHWogWktgwVDhU09iNEimQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "balanced-match": "^4.0.2"
      },
      "engines": {
        "node": "20 || >=22"
      }
    },
    "node_modules/@typescript-eslint/typescript-estree/node_modules/minimatch": {
      "version": "10.2.6",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-10.2.6.tgz",
      "integrity": "sha512-vpLQEs+VLCr1nU0BXS07maYoFwlDAH0gngQuuttxIwutDFEMHq2blX+8vpgxDdK3J1PwjCJiep77OitTZ4Ll1A==",
      "dev": true,
      "license": "BlueOak-1.0.0",
      "dependencies": {
        "brace-expansion": "^5.0.8"
      },
      "engines": {
        "node": "18 || 20 || >=22"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/@typescript-eslint/typescript-estree/node_modules/semver": {
      "version": "7.8.5",
      "resolved": "https://registry.npmjs.org/semver/-/semver-7.8.5.tgz",
      "integrity": "sha512-Y7/KDsb8LjooZpwaqGyulO6DQlksgCncchHGk+sZIY4SBvUocMBEFH5Ur1fI4dV+Jvl0w6cjvucaIi40puRioA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/@typescript-eslint/utils": {
      "version": "8.70.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/utils/-/utils-8.70.1.tgz",
      "integrity": "sha512-Esgul8MsnKnRLdYU2Eb2cRV9bS5HJYtKj1ByJnOzzG2M58DGdSUQ1jUuILxipqcpB2h9WLrbD5GijIWUjX/Tqw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@eslint-community/eslint-utils": "^4.9.1",
        "@typescript-eslint/scope-manager": "8.70.1",
        "@typescript-eslint/types": "8.70.1",
        "@typescript-eslint/typescript-estree": "8.70.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/@typescript-eslint/visitor-keys": {
      "version": "8.70.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/visitor-keys/-/visitor-keys-8.70.1.tgz",
      "integrity": "sha512-Vwj9lUIW5Xq3wQ9w6gv3R86g1hMK8f2zNOdGTAgeXUMMXFK78G9ruCjjqutHMNJc0+CH7LYRnHeUB9IT8wFmcw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/types": "8.70.1",
        "eslint-visitor-keys": "^5.0.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      }
    },
    "node_modules/@typescript-eslint/visitor-keys/node_modules/eslint-visitor-keys": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-5.0.1.tgz",
      "integrity": "sha512-tD40eHxA35h0PEIZNeIjkHoDR4YjjJp34biM0mDvplBe//mB+IHCqHDGV7pxF+7MklTvighcCPPZC7ynWyjdTA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^20.19.0 || ^22.13.0 || >=24"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/@unrs/resolver-binding-android-arm-eabi": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-android-arm-eabi/-/resolver-binding-android-arm-eabi-1.12.2.tgz",
      "integrity": "sha512-g5T90pqg1bo/7mytQx6F4iBNC0Wsh9cu+z9veDbFjc7HjpesJFWD7QMS0NGStXM075+7dJPPVvBbpZlnrdpi/w==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@unrs/resolver-binding-android-arm64": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-android-arm64/-/resolver-binding-android-arm64-1.12.2.tgz",
      "integrity": "sha512-YGCRZv/9GLhwmz6mYDeTsm/92BAyR28l6c2ReweVW5pWgfsitWLY8upvfRlGdoyD8HjeTHSYJWyZGD4KJA/nFQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@unrs/resolver-binding-darwin-arm64": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-darwin-arm64/-/resolver-binding-darwin-arm64-1.12.2.tgz",
      "integrity": "sha512-u9DiNT1auQMO20A9SyTuG3wUgQWB9Z7KjAg0uFuCDR1FsAY8A0CG2S6JpHS1xwm/w1G08bjXZDcyOCjv1WAm2w==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@unrs/resolver-binding-darwin-x64": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-darwin-x64/-/resolver-binding-darwin-x64-1.12.2.tgz",
      "integrity": "sha512-f7rPLi/T1HVKZu/u6t87lroib16n8vrSzcyxI7lg4BGO9UF26KhQL44sd9eOUgrTYhvRXtWOIZT5PejdPyJfUA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@unrs/resolver-binding-freebsd-x64": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-freebsd-x64/-/resolver-binding-freebsd-x64-1.12.2.tgz",
      "integrity": "sha512-BpcOjWCJub6nRZUS2zA20pmLvjtqAtGejETaIyRLiZiQf++cbrjltLA5NN/xaXfqeOBOSlMFbemIl5/S5tljmg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-arm-gnueabihf": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-arm-gnueabihf/-/resolver-binding-linux-arm-gnueabihf-1.12.2.tgz",
      "integrity": "sha512-vZTDvdSISZjJx66OzJqtsOhzifbqRjbmI1Mnu49fQDwog5GtDI4QidRiEAYbZCRj9C8YZEW+3ZjqsyS9GR4k2A==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-arm-musleabihf": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-arm-musleabihf/-/resolver-binding-linux-arm-musleabihf-1.12.2.tgz",
      "integrity": "sha512-BiPI+IrIlwcW4nLLMM21+B1dFPzd55yAVgVGrdgDjNef+ch03GdxrcyaIz8X9SsQirh/kCQ7mviyWlMxdh2D7g==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-arm64-gnu": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-arm64-gnu/-/resolver-binding-linux-arm64-gnu-1.12.2.tgz",
      "integrity": "sha512-zJc0H99FEPoFfSrNpa91HYfxzfAJCr502oxNK1cfdC9hlaFI43RT+JFCann9JUgZmLzzntChHyn13Sgn9ljHNg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-arm64-musl": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-arm64-musl/-/resolver-binding-linux-arm64-musl-1.12.2.tgz",
      "integrity": "sha512-KQ3Lki6l+Pz1k/eBipN41ES+YUK30beLGb9YqcB1O542cyLCNE6GaxrfcY3T6EezmGGk84wb5XyO9loTM9tkcA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-loong64-gnu": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-loong64-gnu/-/resolver-binding-linux-loong64-gnu-1.12.2.tgz",
      "integrity": "sha512-3SJGEh1DborhG6pyxvhPzCT4bbSIVihsvgJc13P1bHG7KLdNDaF9T3gsTwFc7Jw/5Y5/iWOjkEx7Zy0NvCGX3Q==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-loong64-musl": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-loong64-musl/-/resolver-binding-linux-loong64-musl-1.12.2.tgz",
      "integrity": "sha512-jiuG/Obbel7uw1PwHNFfrkiKhLAF6mnyZ6aWlOAVN9WqKm8v0OFGnciJIHu8+CMvXLQ8AD51LPzAoUfT21D5Ew==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-ppc64-gnu": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-ppc64-gnu/-/resolver-binding-linux-ppc64-gnu-1.12.2.tgz",
      "integrity": "sha512-q7xRvVpmcfeL+LlZg8Pbbo6QaTZwDU5BaGZbwfhkEsXJn3Was8xYfE0RBH266xZt0rM6B7i8xAYIvjthuUIWHg==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-riscv64-gnu": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-riscv64-gnu/-/resolver-binding-linux-riscv64-gnu-1.12.2.tgz",
      "integrity": "sha512-0CVdx6lcnT3Q9inOH8tsMIOJ6ImndllMjqJHg8RLVdB7Vq4SfkEXl9mCSsVNuNA4MCYycRicCUxPCabVHJRr6A==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-riscv64-musl": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-riscv64-musl/-/resolver-binding-linux-riscv64-musl-1.12.2.tgz",
      "integrity": "sha512-iOwlRo9vnp6R6ohHQS11n0NnfdXx/omhkocmIfaPRpQhKZ+3BDMkkdRVh53qjkFkpPddf+FETA28NwGN7l5l+w==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-s390x-gnu": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-s390x-gnu/-/resolver-binding-linux-s390x-gnu-1.12.2.tgz",
      "integrity": "sha512-HYJtLfXq94q8iZNFT1lknx258wlkkWhZeUXJRqzKBBUJ00CvZ+N33zgbCqimLjsyw5Va6uUxhVa12mI+kaveEw==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-x64-gnu": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-x64-gnu/-/resolver-binding-linux-x64-gnu-1.12.2.tgz",
      "integrity": "sha512-mPsUhunKKDih5O96Y6enDQyHc1SqBPlY1E/SfMWDM3EdJ95Z9CArPeCVwCCqbP45ljvivdEk8Fxn+SIb1rDAJQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-x64-musl": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-x64-musl/-/resolver-binding-linux-x64-musl-1.12.2.tgz",
      "integrity": "sha512-azrt6+5ydLd8Vt210AAFis/lZevSfPw93EJRIJG+xPu4WCJ8K0kppCTpMyLPcKT7H15M4Jnt2tMp5bOvCkRC6A==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-openharmony-arm64": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-openharmony-arm64/-/resolver-binding-openharmony-arm64-1.12.2.tgz",
      "integrity": "sha512-YZ9hP4O0X9PQb8eO980qmLNGH4zT3I9+SZTdt0Pr0YyuGQhYKoOZkV02VzrzyOZJ5xIJ3UFIenKkUkGg8GjgWQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ]
    },
    "node_modules/@unrs/resolver-binding-wasm32-wasi": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-wasm32-wasi/-/resolver-binding-wasm32-wasi-1.12.2.tgz",
      "integrity": "sha512-tYFDIkMxSflfEc/h92ZWNsZlHSwgimbNHSO3PL2JWQHfCuC2q316jMyYU9TIWZsFK2bQwyK5VAdYgn8ygPj69A==",
      "cpu": [
        "wasm32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/core": "1.10.0",
        "@emnapi/runtime": "1.10.0",
        "@napi-rs/wasm-runtime": "^1.1.4"
      },
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/@unrs/resolver-binding-wasm32-wasi/node_modules/@emnapi/core": {
      "version": "1.10.0",
      "resolved": "https://registry.npmjs.org/@emnapi/core/-/core-1.10.0.tgz",
      "integrity": "sha512-yq6OkJ4p82CAfPl0u9mQebQHKPJkY7WrIuk205cTYnYe+k2Z8YBh11FrbRG/H6ihirqcacOgl2BIO8oyMQLeXw==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/wasi-threads": "1.2.1",
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@unrs/resolver-binding-wasm32-wasi/node_modules/@emnapi/runtime": {
      "version": "1.10.0",
      "resolved": "https://registry.npmjs.org/@emnapi/runtime/-/runtime-1.10.0.tgz",
      "integrity": "sha512-ewvYlk86xUoGI0zQRNq/mC+16R1QeDlKQy21Ki3oSYXNgLb45GV1P6A0M+/s6nyCuNDqe5VpaY84BzXGwVbwFA==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@unrs/resolver-binding-wasm32-wasi/node_modules/@emnapi/wasi-threads": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/@emnapi/wasi-threads/-/wasi-threads-1.2.1.tgz",
      "integrity": "sha512-uTII7OYF+/Mes/MrcIOYp5yOtSMLBWSIoLPpcgwipoiKbli6k322tcoFsxoIIxPDqW01SQGAgko4EzZi2BNv2w==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@unrs/resolver-binding-win32-arm64-msvc": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-win32-arm64-msvc/-/resolver-binding-win32-arm64-msvc-1.12.2.tgz",
      "integrity": "sha512-qzNyg3xL0VPQmCaUh+N5jSitce6k+uCBfMDesWRnlULOZaqUkaJ0ybdT+UqlAWJoQjuqfIU/0Ptx9bteN4D82g==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@unrs/resolver-binding-win32-ia32-msvc": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-win32-ia32-msvc/-/resolver-binding-win32-ia32-msvc-1.12.2.tgz",
      "integrity": "sha512-WD9sY00OfpHVGfsnHZoA8jVT+esS/Bg8z8jzxp5BnDCjjwsuKsPQrzswwpFy4J1AUJbXPRfkpcX0mXrzeXW79g==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@unrs/resolver-binding-win32-x64-msvc": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-win32-x64-msvc/-/resolver-binding-win32-x64-msvc-1.12.2.tgz",
      "integrity": "sha512-nAB74NfSNKknqQ1RrYj6uz8FcXEomu/MATJZxh/x+BArzN2U3JbOYC0APYzUIGhVY3m5hRxA8VPNdPBoG8txlA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/accepts": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/accepts/-/accepts-2.0.0.tgz",
      "integrity": "sha512-5cvg6CtKwfgdmVqY1WIiXKc3Q1bkRqGLi+2W/6ao+6Y7gu/RCwRuAhGEzh5B4KlszSuTLgZYuqFqo5bImjNKng==",
      "license": "MIT",
      "dependencies": {
        "mime-types": "^3.0.0",
        "negotiator": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/acorn": {
      "version": "8.18.0",
      "resolved": "https://registry.npmjs.org/acorn/-/acorn-8.18.0.tgz",
      "integrity": "sha512-lGq+9yr1/GuAWaVYIHRjvvySG5/4VfKIvC8EWxStPdcDh/Ka7FG3twP6v4d5BkravUilhIAsG4Qj83t02LWUPQ==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "acorn": "bin/acorn"
      },
      "engines": {
        "node": ">=0.4.0"
      }
    },
    "node_modules/acorn-jsx": {
      "version": "5.3.2",
      "resolved": "https://registry.npmjs.org/acorn-jsx/-/acorn-jsx-5.3.2.tgz",
      "integrity": "sha512-rq9s+JNhf0IChjtDXxllJ7g41oZk5SlXtp0LHwyA5cejwn7vKmKp4pPri6YEePv2PU65sAsegbXtIinmDFDXgQ==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "acorn": "^6.0.0 || ^7.0.0 || ^8.0.0"
      }
    },
    "node_modules/agent-base": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/agent-base/-/agent-base-6.0.2.tgz",
      "integrity": "sha512-RZNwNclF7+MS/8bDg70amg32dyeZGZxiDuQmZxKLAlQjr3jGyLx+4Kkk58UO7D2QdgFIQCovuSuZESne6RG6XQ==",
      "license": "MIT",
      "dependencies": {
        "debug": "4"
      },
      "engines": {
        "node": ">= 6.0.0"
      }
    },
    "node_modules/ajv": {
      "version": "8.20.0",
      "resolved": "https://registry.npmjs.org/ajv/-/ajv-8.20.0.tgz",
      "integrity": "sha512-Thbli+OlOj+iMPYFBVBfJ3OmCAnaSyNn4M1vz9T6Gka5Jt9ba/HIR56joy65tY6kx/FCF5VXNB819Y7/GUrBGA==",
      "license": "MIT",
      "dependencies": {
        "fast-deep-equal": "^3.1.3",
        "fast-uri": "^3.0.1",
        "json-schema-traverse": "^1.0.0",
        "require-from-string": "^2.0.2"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/epoberezkin"
      }
    },
    "node_modules/ajv-formats": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/ajv-formats/-/ajv-formats-2.1.1.tgz",
      "integrity": "sha512-Wx0Kx52hxE7C18hkMEggYlEifqWZtYaRgouJor+WMdPnQyEK13vgEWyVNup7SoeeoLMsr4kf5h6dOW11I15MUA==",
      "license": "MIT",
      "dependencies": {
        "ajv": "^8.0.0"
      },
      "peerDependencies": {
        "ajv": "^8.0.0"
      },
      "peerDependenciesMeta": {
        "ajv": {
          "optional": true
        }
      }
    },
    "node_modules/ansi-colors": {
      "version": "4.1.3",
      "resolved": "https://registry.npmjs.org/ansi-colors/-/ansi-colors-4.1.3.tgz",
      "integrity": "sha512-/6w/C21Pm1A7aZitlI5Ni/2J6FFQN8i1Cvz3kHABAAbw93v/NlvKdVOqz7CCWz/3iv/JplRSEEZ83XION15ovw==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/ansi-regex": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/ansi-styles": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
      "integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "color-convert": "^2.0.1"
      },
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-styles?sponsor=1"
      }
    },
    "node_modules/argparse": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/argparse/-/argparse-2.0.1.tgz",
      "integrity": "sha512-8+9WqebbFzpX9OR+Wa6O29asIogeRMzcGtAINdpMHHyAg10f05aSFVBbcEqGf/PXw1EjAZ+q2/bEBg3DvurK3Q==",
      "license": "Python-2.0"
    },
    "node_modules/aria-query": {
      "version": "5.3.2",
      "resolved": "https://registry.npmjs.org/aria-query/-/aria-query-5.3.2.tgz",
      "integrity": "sha512-COROpnaoap1E2F000S62r6A60uHZnmlvomhfyT2DlTcrY1OrBKn2UhH7qn5wTC9zMvD0AY7csdPSNwKP+7WiQw==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/array-buffer-byte-length": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/array-buffer-byte-length/-/array-buffer-byte-length-1.0.2.tgz",
      "integrity": "sha512-LHE+8BuR7RYGDKvnrmcuSq3tDcKv9OFEXQt/HpbZhY7V6h0zlUXutnAD82GiFx9rdieCMjkvtcsPqBwgUl1Iiw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "is-array-buffer": "^3.0.5"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/array-includes": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/array-includes/-/array-includes-3.2.0.tgz",
      "integrity": "sha512-VXY5eFRarnXcYxwBjJzPmEhH55+rmP79/+ueDhi0F+TuqfHCItagIHqxeUZrmgrOPa31QTh9H85DjX3FfJ0FTg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.9",
        "call-bound": "^1.0.4",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.24.2",
        "es-object-atoms": "^1.1.2",
        "es-shim-unscopables": "^1.1.0",
        "is-string": "^1.1.1",
        "math-intrinsics": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/array.prototype.findlast": {
      "version": "1.2.5",
      "resolved": "https://registry.npmjs.org/array.prototype.findlast/-/array.prototype.findlast-1.2.5.tgz",
      "integrity": "sha512-CVvd6FHg1Z3POpBLxO6E6zr+rSKEQ9L6rZHAaY7lLfhKsWYUBBOuMs0e9o24oopj6H+geRCX0YJ+TJLBK2eHyQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.7",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.2",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.0.0",
        "es-shim-unscopables": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/array.prototype.findlastindex": {
      "version": "1.2.6",
      "resolved": "https://registry.npmjs.org/array.prototype.findlastindex/-/array.prototype.findlastindex-1.2.6.tgz",
      "integrity": "sha512-F/TKATkzseUExPlfvmwQKGITM3DGTK+vkAsCZoDc5daVygbJBnjEUCbgkAvVFsgfXfX4YIqZ/27G3k3tdXrTxQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.4",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.9",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.1.1",
        "es-shim-unscopables": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/array.prototype.flat": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/array.prototype.flat/-/array.prototype.flat-1.3.3.tgz",
      "integrity": "sha512-rwG/ja1neyLqCuGZ5YYrznA62D4mZXg0i1cIskIUKSiqF3Cje9/wXAls9B9s1Wa2fomMsIv8czB8jZcPmxCXFg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.5",
        "es-shim-unscopables": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/array.prototype.flatmap": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/array.prototype.flatmap/-/array.prototype.flatmap-1.3.3.tgz",
      "integrity": "sha512-Y7Wt51eKJSyi80hFrJCePGGNo5ktJCslFuboqJsbf57CCPcm5zztluPlc4/aD8sWsKvlwatezpV4U1efk8kpjg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.5",
        "es-shim-unscopables": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/array.prototype.tosorted": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/array.prototype.tosorted/-/array.prototype.tosorted-1.1.4.tgz",
      "integrity": "sha512-p6Fx8B7b7ZhL/gmUsAy0D15WhvDccw3mnGNbZpi3pmeJdxtWsj2jEaI4Y6oo3XiHfzuSgPwKc04MYt6KgvC/wA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.7",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.3",
        "es-errors": "^1.3.0",
        "es-shim-unscopables": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/arraybuffer.prototype.slice": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/arraybuffer.prototype.slice/-/arraybuffer.prototype.slice-1.0.4.tgz",
      "integrity": "sha512-BNoCY6SXXPQ7gF2opIP4GBE+Xw7U+pHMYKuzjgCN3GwiaIR09UUeKfheyIry77QtrCBlC0KK0q5/TER/tYh3PQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "array-buffer-byte-length": "^1.0.1",
        "call-bind": "^1.0.8",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.5",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.6",
        "is-array-buffer": "^3.0.4"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/ast-types": {
      "version": "0.16.3",
      "resolved": "https://registry.npmjs.org/ast-types/-/ast-types-0.16.3.tgz",
      "integrity": "sha512-FvWoWYfSCM6kRxCSH+MGLHIKKGRL6A6AW7Zek2O32REPQRdg131428uRTKMBYAeRd3XXAaHDS60Wpri7CdKDrA==",
      "license": "MIT",
      "dependencies": {
        "tslib": "^2.0.1"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/ast-types-flow": {
      "version": "0.0.8",
      "resolved": "https://registry.npmjs.org/ast-types-flow/-/ast-types-flow-0.0.8.tgz",
      "integrity": "sha512-OH/2E5Fg20h2aPrbe+QL8JZQFko0YZaF+j4mnQ7BGhfavO7OpSLa8a0y9sBwomHdSbkhTS8TQNayBfnW5DwbvQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/async-function": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/async-function/-/async-function-1.0.0.tgz",
      "integrity": "sha512-hsU18Ae8CDTR6Kgu9DYf0EbCr/a5iGL0rytQDobUcdpYOKokk8LEjVphnXkDkgpi0wYVsqrXuP0bZxJaTqdgoA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/asynckit": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/asynckit/-/asynckit-0.4.0.tgz",
      "integrity": "sha512-Oei9OH4tRh0YqU3GxhX79dM/mwVgvbZJaSNaRk+bshkj0S5cfHcgYakreBjrHwatXKbz+IoIdYLxrKim2MjW0Q==",
      "license": "MIT"
    },
    "node_modules/atomically": {
      "version": "1.7.0",
      "resolved": "https://registry.npmjs.org/atomically/-/atomically-1.7.0.tgz",
      "integrity": "sha512-Xcz9l0z7y9yQ9rdDaxlmaI4uJHf/T8g9hOEzJcsEqX2SjCj4J20uK7+ldkDHMbpJDK76wF7xEIgxc/vSlsfw5w==",
      "license": "MIT",
      "engines": {
        "node": ">=10.12.0"
      }
    },
    "node_modules/available-typed-arrays": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/available-typed-arrays/-/available-typed-arrays-1.0.7.tgz",
      "integrity": "sha512-wvUjBtSGN7+7SjNpq/9M2Tg350UZD3q62IFZLbRAR1bSMlCo1ZaeW+BJ+D090e4hIIZLBcTDWe4Mh4jvUDajzQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "possible-typed-array-names": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/axe-core": {
      "version": "4.13.0",
      "resolved": "https://registry.npmjs.org/axe-core/-/axe-core-4.13.0.tgz",
      "integrity": "sha512-UzGt8zg7Ny8djbYMhxl2zuEevVa7r2gJjYY5Lwr1xM7+XU2nd6CkIWFTVcCIbAP63vSz71NaVyyuSk9lHKcy0A==",
      "dev": true,
      "license": "MPL-2.0",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/axios": {
      "version": "1.20.0",
      "resolved": "https://registry.npmjs.org/axios/-/axios-1.20.0.tgz",
      "integrity": "sha512-r8aOh8j9cGKpgQAqpzrUHnSIc6a59Y3Xf/cv8sy1DrHCkZHzQGEuoq1tARk6qSyDdtQGSDgpb9kFlruzPvrgwg==",
      "license": "MIT",
      "dependencies": {
        "follow-redirects": "^1.16.0",
        "form-data": "^4.0.6",
        "https-proxy-agent": "^5.0.1",
        "proxy-from-env": "^2.1.0"
      }
    },
    "node_modules/axobject-query": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/axobject-query/-/axobject-query-4.1.0.tgz",
      "integrity": "sha512-qIj0G9wZbMGNLjLmg1PT6v2mE9AH2zlnADJD/2tC6E00hgmhUOfEB6greHPAfLRSufHqROIUTkw6E+M3lH0PTQ==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/babel-plugin-react-compiler": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-react-compiler/-/babel-plugin-react-compiler-1.0.0.tgz",
      "integrity": "sha512-Ixm8tFfoKKIPYdCCKYTsqv+Fd4IJ0DQqMyEimo+pxUOMUR9cVPlwTrFt9Avu+3cb6Zp3mAzl+t1MrG2fxxKsxw==",
      "devOptional": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.26.0"
      }
    },
    "node_modules/balanced-match": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-1.0.2.tgz",
      "integrity": "sha512-3oSeUO0TMV67hN1AmbXsK4yaqU7tjiHlbxRDZOpH0KW9+CeX4bRAaX0Anxt0tx2MrpRpWwQaPwIlISEJhYU5Pw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/baseline-browser-mapping": {
      "version": "2.11.26",
      "resolved": "https://registry.npmjs.org/baseline-browser-mapping/-/baseline-browser-mapping-2.11.26.tgz",
      "integrity": "sha512-GLQdD3y6UF8iVuMJl5fHgE4jdn/ua7n+toKfLgNlg3BqQtOZjpy68T8Tup8/wGWZCDlm7KMg7tPb4MPn7oN0TQ==",
      "license": "Apache-2.0",
      "bin": {
        "baseline-browser-mapping": "dist/cli.cjs"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/body-parser": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/body-parser/-/body-parser-2.3.0.tgz",
      "integrity": "sha512-2cGmJupaNgg+QUwVLAucDuWuoMZ6EX9iHDRswZ5lsNYEmwPaRknMPCLZz07yTzVq/83p4o/wzbDZbBrTvGGTIw==",
      "license": "MIT",
      "dependencies": {
        "bytes": "^3.1.2",
        "content-type": "^2.0.0",
        "debug": "^4.4.3",
        "http-errors": "^2.0.1",
        "iconv-lite": "^0.7.2",
        "on-finished": "^2.4.1",
        "qs": "^6.15.2",
        "raw-body": "^3.0.2",
        "type-is": "^2.1.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/body-parser/node_modules/content-type": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/content-type/-/content-type-2.1.0.tgz",
      "integrity": "sha512-mj7UPXE0jaqaOsukNZRUEfEi2AcL7C/vwmwcHV0O97eO1E1pxBZuyjlZrx5seTaNBg1U6+o35wpa35Qfcc+7ag==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/brace-expansion": {
      "version": "1.1.21",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-1.1.21.tgz",
      "integrity": "sha512-9zeA+KLZNNzglF2TPKRQEDyx6Yby7daAkuy8MiPzpXPsYDWi/DRM8jmwUDxokQjYqBpv5DgPiwD4h4ZZSy1Ujw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "balanced-match": "^1.0.0",
        "concat-map": "0.0.1"
      }
    },
    "node_modules/braces": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/braces/-/braces-3.0.3.tgz",
      "integrity": "sha512-yQbXgO/OSZVD2IsiLlro+7Hf6Q18EJrKSEsdoMzKePKXct3gvD8oLcOQdIzGupr5Fj+EDe8gO/lxc1BzfMpxvA==",
      "license": "MIT",
      "dependencies": {
        "fill-range": "^7.1.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/browserslist": {
      "version": "4.29.1",
      "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.29.1.tgz",
      "integrity": "sha512-AUdjuRyCNGUYtqpqfTmWyM4fXay8yIQhmLnvYe/THMGfT9B/34X7xQd3ifKxwyNPPpowVBjLb+64BN9Rn1mizw==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "baseline-browser-mapping": "^2.11.25",
        "caniuse-lite": "^1.0.30001810",
        "electron-to-chromium": "^1.5.438",
        "node-releases": "^2.0.57",
        "update-browserslist-db": "^1.3.3"
      },
      "bin": {
        "browserslist": "cli.js"
      },
      "engines": {
        "node": "^6 || ^7 || ^8 || ^9 || ^10 || ^11 || ^12 || >=13.7"
      }
    },
    "node_modules/bundle-name": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/bundle-name/-/bundle-name-4.1.1.tgz",
      "integrity": "sha512-DdH81/zPLVS11EUgWq3tEu/xn+EzljlMYooDNdzWEnFha3R3NBMpMV1UqYIpjYHV/SgpFKMIX1Oh7o06SjM/oA==",
      "license": "MIT",
      "dependencies": {
        "run-applescript": "^7.0.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
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
    "node_modules/call-bind": {
      "version": "1.0.9",
      "resolved": "https://registry.npmjs.org/call-bind/-/call-bind-1.0.9.tgz",
      "integrity": "sha512-a/hy+pNsFUTR+Iz8TCJvXudKVLAnz/DyeSUo10I5yvFDQJBFU2s9uqQpoSrJlroHUKoKqzg+epxyP9lqFdzfBQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.2",
        "es-define-property": "^1.0.1",
        "get-intrinsic": "^1.3.0",
        "set-function-length": "^1.2.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
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
    "node_modules/callsites": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/callsites/-/callsites-3.1.0.tgz",
      "integrity": "sha512-P8BjAsXvZS+VIDUI11hHCQEv74YT67YUi5JJFNWIqL235sBmjX4+qx9Muvls5ivyNENctx46xQLQ3aTuE7ssaQ==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/caniuse-lite": {
      "version": "1.0.30001812",
      "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001812.tgz",
      "integrity": "sha512-qN+QNNBr93TCmFrmte0bBCjSDMuRvt78VlHT99qIGPszm4QsqCX8lnyWUFkHi8B7ZBAPq8SH+UqyXNy/odMdng==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/caniuse-lite"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "CC-BY-4.0"
    },
    "node_modules/chalk": {
      "version": "4.1.2",
      "resolved": "https://registry.npmjs.org/chalk/-/chalk-4.1.2.tgz",
      "integrity": "sha512-oKnbhFyRIXpUuez8iBMmyEa4nbj4IOQyuhc/wy9kY7/WVPcwIO9VA668Pu8RkO7+0G76SLROeyw9CpQ061i4mA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^4.1.0",
        "supports-color": "^7.1.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/chalk/chalk?sponsor=1"
      }
    },
    "node_modules/class-variance-authority": {
      "version": "0.7.1",
      "resolved": "https://registry.npmjs.org/class-variance-authority/-/class-variance-authority-0.7.1.tgz",
      "integrity": "sha512-Ka+9Trutv7G8M6WT6SeiRWz792K5qEqIGEGzXKhAE6xOWAY6pPH8U+9IY3oCMv6kqTmLsv7Xh/2w2RigkePMsg==",
      "license": "Apache-2.0",
      "dependencies": {
        "clsx": "^2.1.1"
      },
      "funding": {
        "url": "https://polar.sh/cva"
      }
    },
    "node_modules/cli-cursor": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/cli-cursor/-/cli-cursor-5.0.0.tgz",
      "integrity": "sha512-aCj4O5wKyszjMmDT4tZj93kxyydN/K5zPWSCe6/0AV/AA1pqe5ZBIw0a2ZfPQV7lL5/yb5HsUreJ6UFAF1tEQw==",
      "license": "MIT",
      "dependencies": {
        "restore-cursor": "^5.0.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/cli-spinners": {
      "version": "2.9.2",
      "resolved": "https://registry.npmjs.org/cli-spinners/-/cli-spinners-2.9.2.tgz",
      "integrity": "sha512-ywqV+5MmyL4E7ybXgKys4DugZbX0FC6LnwrhjuykIjnK9k8OQacQ7axGKnjDXWNhns0xot3bZI5h55H8yo9cJg==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/client-only": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/client-only/-/client-only-0.0.1.tgz",
      "integrity": "sha512-IV3Ou0jSMzZrd3pZ48nLkT9DA7Ag1pnPzaiQhpW7c3RbcqqzvzzVu+L8gfqMp/8IM2MQtSiqaCxrrcfu8I8rMA==",
      "license": "MIT"
    },
    "node_modules/clsx": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/clsx/-/clsx-2.1.1.tgz",
      "integrity": "sha512-eYm0QWBtUrBWZWG0d386OGAw16Z995PiOVo2B7bjWSbHedGl5e0ZWaq65kOGgUSNesEIDkB9ISbTg/JK9dhCZA==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/code-block-writer": {
      "version": "13.0.3",
      "resolved": "https://registry.npmjs.org/code-block-writer/-/code-block-writer-13.0.3.tgz",
      "integrity": "sha512-Oofo0pq3IKnsFtuHqSF7TqBfr71aeyZDVJ0HpmqB7FBM2qEigL0iPONSCZSO9pE9dZTAxANe5XHG9Uy0YMv8cg==",
      "license": "MIT"
    },
    "node_modules/color-convert": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
      "integrity": "sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "color-name": "~1.1.4"
      },
      "engines": {
        "node": ">=7.0.0"
      }
    },
    "node_modules/color-name": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.4.tgz",
      "integrity": "sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/combined-stream": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/combined-stream/-/combined-stream-1.0.8.tgz",
      "integrity": "sha512-FQN4MRfuJeHf7cBbBMJFXhKSDq+2kAArBlmRBvcvFE5BB1HZKXtSFASDhdlz9zOYwxh8lDdnvmMOe/+5cdoEdg==",
      "license": "MIT",
      "dependencies": {
        "delayed-stream": "~1.0.0"
      },
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/commander": {
      "version": "14.0.3",
      "resolved": "https://registry.npmjs.org/commander/-/commander-14.0.3.tgz",
      "integrity": "sha512-H+y0Jo/T1RZ9qPP4Eh1pkcQcLRglraJaSLoyOtHxu6AapkjWVCy2Sit1QQ4x3Dng8qDlSsZEet7g5Pq06MvTgw==",
      "license": "MIT",
      "engines": {
        "node": ">=20"
      }
    },
    "node_modules/concat-map": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/concat-map/-/concat-map-0.0.1.tgz",
      "integrity": "sha512-/Srv4dswyQNBfohGpz9o6Yb3Gz3SrUDqBH5rTuhGR7ahtlbYKnVxw2bCFMRljaA7EXHaXZ8wsHdodFvbkhKmqg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/conf": {
      "version": "10.2.0",
      "resolved": "https://registry.npmjs.org/conf/-/conf-10.2.0.tgz",
      "integrity": "sha512-8fLl9F04EJqjSqH+QjITQfJF8BrOVaYr1jewVgSRAEWePfxT0sku4w2hrGQ60BC/TNLGQ2pgxNlTbWQmMPFvXg==",
      "license": "MIT",
      "dependencies": {
        "ajv": "^8.6.3",
        "ajv-formats": "^2.1.1",
        "atomically": "^1.7.0",
        "debounce-fn": "^4.0.0",
        "dot-prop": "^6.0.1",
        "env-paths": "^2.2.1",
        "json-schema-typed": "^7.0.3",
        "onetime": "^5.1.2",
        "pkg-up": "^3.1.0",
        "semver": "^7.3.5"
      },
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/conf/node_modules/json-schema-typed": {
      "version": "7.0.3",
      "resolved": "https://registry.npmjs.org/json-schema-typed/-/json-schema-typed-7.0.3.tgz",
      "integrity": "sha512-7DE8mpG+/fVw+dTpjbxnx47TaMnDfOI1jwft9g1VybltZCduyRQPJPvc+zzKY9WPHxhPWczyFuYa6I8Mw4iU5A==",
      "license": "BSD-2-Clause"
    },
    "node_modules/conf/node_modules/semver": {
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
    "node_modules/content-disposition": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/content-disposition/-/content-disposition-1.1.0.tgz",
      "integrity": "sha512-5jRCH9Z/+DRP7rkvY83B+yGIGX96OYdJmzngqnw2SBSxqCFPd0w2km3s5iawpGX8krnwSGmF0FW5Nhr0Hfai3g==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
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
    "node_modules/convert-source-map": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/convert-source-map/-/convert-source-map-2.0.0.tgz",
      "integrity": "sha512-Kvp459HrV2FEJ1CAsi1Ku+MY3kasH19TFykTz2xWmMeq6bk2NU3XXvfJ+Q61m0xktWwt+1HSYf3JZsTms3aRJg==",
      "license": "MIT"
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
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/cookie-signature/-/cookie-signature-1.2.2.tgz",
      "integrity": "sha512-D76uU73ulSXrD1UXF4KE2TMxVVwhsnCgfAyTg9k8P6KGZjlXKrOLe4dJQKI3Bxi5wjesZoFXJWElNWBjPZMbhg==",
      "license": "MIT",
      "engines": {
        "node": ">=6.6.0"
      }
    },
    "node_modules/cookies-next": {
      "version": "6.1.1",
      "resolved": "https://registry.npmjs.org/cookies-next/-/cookies-next-6.1.1.tgz",
      "integrity": "sha512-8JZBc4IN2m8xqOXyG7uicth6yH3SvynAUGSeV/FQ5lcEclzNGoR0+YCjySdn8r6keZdRyGQr4YJ8qy8F+Jq5uw==",
      "license": "MIT",
      "dependencies": {
        "cookie": "^1.0.1"
      },
      "peerDependencies": {
        "next": ">=15.0.0",
        "react": ">= 16.8.0"
      }
    },
    "node_modules/cookies-next/node_modules/cookie": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/cookie/-/cookie-1.1.1.tgz",
      "integrity": "sha512-ei8Aos7ja0weRpFzJnEA9UHJ/7XQmqglbRwnf2ATjcB9Wq874VKH9kfjjirM6UhU2/E5fFYadylyhFldcqSidQ==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
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
    "node_modules/cosmiconfig": {
      "version": "9.0.2",
      "resolved": "https://registry.npmjs.org/cosmiconfig/-/cosmiconfig-9.0.2.tgz",
      "integrity": "sha512-gtTZxTDau1wL7Y7zifc2dd8jHSK/k6BTx/2Xp/BpdlAdnlYWFVt7qhJqgwi7637yRwRQ3qL4ZidbB4I8tA5VOg==",
      "license": "MIT",
      "dependencies": {
        "env-paths": "^2.2.1",
        "import-fresh": "^3.3.0",
        "js-yaml": "^4.1.0",
        "parse-json": "^5.2.0"
      },
      "engines": {
        "node": ">=14"
      },
      "funding": {
        "url": "https://github.com/sponsors/d-fischer"
      },
      "peerDependencies": {
        "typescript": ">=4.9.5"
      },
      "peerDependenciesMeta": {
        "typescript": {
          "optional": true
        }
      }
    },
    "node_modules/cross-spawn": {
      "version": "7.0.6",
      "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-7.0.6.tgz",
      "integrity": "sha512-uV2QOWP2nWzsy2aMp8aRibhi9dlzF5Hgh5SHaB9OiTGEyDTiJJyx0uy51QXdyWbtAHNua4XJzUKca3OzKUd3vA==",
      "license": "MIT",
      "dependencies": {
        "path-key": "^3.1.0",
        "shebang-command": "^2.0.0",
        "which": "^2.0.1"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/cssesc": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/cssesc/-/cssesc-3.0.0.tgz",
      "integrity": "sha512-/Tb/JcjK111nNScGob5MNtsntNM1aCNUDipB/TkwZFhyDrrE47SOx/18wF2bbjgc3ZzCSKW1T5nt5EbFoAz/Vg==",
      "license": "MIT",
      "bin": {
        "cssesc": "bin/cssesc"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/csstype": {
      "version": "3.2.3",
      "resolved": "https://registry.npmjs.org/csstype/-/csstype-3.2.3.tgz",
      "integrity": "sha512-z1HGKcYy2xA8AGQfwrn0PAy+PB7X/GSj3UVJW9qKyn43xWa+gl5nXmU4qqLMRzWVLFC8KusUX8T/0kCiOYpAIQ==",
      "devOptional": true,
      "license": "MIT"
    },
    "node_modules/damerau-levenshtein": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/damerau-levenshtein/-/damerau-levenshtein-1.0.8.tgz",
      "integrity": "sha512-sdQSFB7+llfUcQHUQO3+B8ERRj0Oa4w9POWMI/puGtuf7gFywGmkaLCElnudfTiKZV+NvHqL0ifzdrI8Ro7ESA==",
      "dev": true,
      "license": "BSD-2-Clause"
    },
    "node_modules/data-view-buffer": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/data-view-buffer/-/data-view-buffer-1.0.2.tgz",
      "integrity": "sha512-EmKO5V3OLXh1rtK2wgXRansaK1/mtVdTUEiEI0W8RkvgT05kfxaH29PliLnpLP73yYO6142Q72QNa8Wx/A5CqQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "es-errors": "^1.3.0",
        "is-data-view": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/data-view-byte-length": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/data-view-byte-length/-/data-view-byte-length-1.0.2.tgz",
      "integrity": "sha512-tuhGbE6CfTM9+5ANGf+oQb72Ky/0+s3xKUpHvShfiz2RxMFgFPjsXuRLBVMtvMs15awe45SRb83D6wH4ew6wlQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "es-errors": "^1.3.0",
        "is-data-view": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/inspect-js"
      }
    },
    "node_modules/data-view-byte-offset": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/data-view-byte-offset/-/data-view-byte-offset-1.0.1.tgz",
      "integrity": "sha512-BS8PfmtDGnrgYdOonGZQdLZslWIeCGFP9tpan0hi1Co2Zr2NKADsvGYA8XxuG/4UWgJ6Cjtv+YJnB6MM69QGlQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "is-data-view": "^1.0.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
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
    "node_modules/debounce-fn": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/debounce-fn/-/debounce-fn-4.0.0.tgz",
      "integrity": "sha512-8pYCQiL9Xdcg0UPSD3d+0KMlOjp+KGU5EPwYddgzQ7DATsg4fuUDjQtsYLmWjnk2obnNHgV3vE2Y4jejSOJVBQ==",
      "license": "MIT",
      "dependencies": {
        "mimic-fn": "^3.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/debug": {
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
    "node_modules/dedent": {
      "version": "1.7.2",
      "resolved": "https://registry.npmjs.org/dedent/-/dedent-1.7.2.tgz",
      "integrity": "sha512-WzMx3mW98SN+zn3hgemf4OzdmyNhhhKz5Ay0pUfQiMQ3e1g+xmTJWp/pKdwKVXhdSkAEGIIzqeuWrL3mV/AXbA==",
      "license": "MIT",
      "peerDependencies": {
        "babel-plugin-macros": "^3.1.0"
      },
      "peerDependenciesMeta": {
        "babel-plugin-macros": {
          "optional": true
        }
      }
    },
    "node_modules/deep-is": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/deep-is/-/deep-is-0.1.4.tgz",
      "integrity": "sha512-oIPzksmTg4/MriiaYGO+okXDT7ztn/w3Eptv/+gSIdMdKsJo0u4CfYNFJPy+4SKMuCqGw2wxnA+URMg3t8a/bQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/deepmerge": {
      "version": "4.3.1",
      "resolved": "https://registry.npmjs.org/deepmerge/-/deepmerge-4.3.1.tgz",
      "integrity": "sha512-3sUqbMEc77XqpdNO7FRyRog+eW3ph+GYCbj+rK+uYyRMuwsVy0rMiVtPn+QJlKFvWP/1PYpapqYn0Me2knFn+A==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/default-browser": {
      "version": "5.5.1",
      "resolved": "https://registry.npmjs.org/default-browser/-/default-browser-5.5.1.tgz",
      "integrity": "sha512-m1pAzaJgZ/gssEqlOhJkPJp8Xly7QyW6xcrkUa2KKcDeDSEMP7X8xipU3snUcfisTQx0w1AGae+9UtJSfVnXGw==",
      "license": "MIT",
      "dependencies": {
        "bundle-name": "^4.1.0",
        "default-browser-id": "^5.0.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/default-browser-id": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/default-browser-id/-/default-browser-id-5.0.1.tgz",
      "integrity": "sha512-x1VCxdX4t+8wVfd1so/9w+vQ4vx7lKd2Qp5tDRutErwmR85OgmfX7RlLRMWafRMY7hbEiXIbudNrjOAPa/hL8Q==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/define-data-property": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/define-data-property/-/define-data-property-1.1.4.tgz",
      "integrity": "sha512-rBMvIzlpA8v6E+SJZoo++HAYqsLrkg7MSfIinMPFhmkorw7X+dOXVJQs+QT69zGkzMyfDnIMN2Wid1+NbL3T+A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-define-property": "^1.0.0",
        "es-errors": "^1.3.0",
        "gopd": "^1.0.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/define-lazy-prop": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/define-lazy-prop/-/define-lazy-prop-3.0.0.tgz",
      "integrity": "sha512-N+MeXYoqr3pOgn8xfyRPREN7gHakLYjhsHhWGT3fWAiL4IkAt0iDw14QiiEm2bE30c5XX5q0FtAA3CK5f9/BUg==",
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/define-properties": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/define-properties/-/define-properties-1.2.1.tgz",
      "integrity": "sha512-8QmQKqEASLd5nx0U1B1okLElbUuuttJ/AnYmRXbbbGDWh6uS208EjD4Xqq/I9wK7u0v6O08XhTWnt5XtEbR6Dg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "define-data-property": "^1.0.1",
        "has-property-descriptors": "^1.0.0",
        "object-keys": "^1.1.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/delayed-stream": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/delayed-stream/-/delayed-stream-1.0.0.tgz",
      "integrity": "sha512-ZySD7Nf91aLB0RxL4KGrKHBXl7Eds1DAmEdcoVawXnLD7SDhpNgtuII2aAkg7a7QS41jxPSZ17p4VdGnMHk3MQ==",
      "license": "MIT",
      "engines": {
        "node": ">=0.4.0"
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
    "node_modules/detect-libc": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/detect-libc/-/detect-libc-2.1.2.tgz",
      "integrity": "sha512-Btj2BOOO83o3WyH59e8MgXsxEQVcarkUOpEYrubB0urwnN10yQ364rsiByU11nZlqWYZm05i/of7io4mzihBtQ==",
      "devOptional": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/diff": {
      "version": "8.0.4",
      "resolved": "https://registry.npmjs.org/diff/-/diff-8.0.4.tgz",
      "integrity": "sha512-DPi0FmjiSU5EvQV0++GFDOJ9ASQUVFh5kD+OzOnYdi7n3Wpm9hWWGfB/O2blfHcMVTL5WkQXSnRiK9makhrcnw==",
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.3.1"
      }
    },
    "node_modules/doctrine": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/doctrine/-/doctrine-2.1.0.tgz",
      "integrity": "sha512-35mSku4ZXK0vfCuHEDAwt55dg2jNajHZ1odvF+8SSr82EsZY4QmXfuWso8oEd8zRhVObSN18aM0CjSdoBX7zIw==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "esutils": "^2.0.2"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/dot-prop": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/dot-prop/-/dot-prop-6.0.1.tgz",
      "integrity": "sha512-tE7ztYzXHIeyvc7N+hR3oi7FIbf/NIjVP9hmAt3yMXzrQ072/fpjGLx2GxNxGxUl5V73MEqYzioOMoVhGMJ5cA==",
      "license": "MIT",
      "dependencies": {
        "is-obj": "^2.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
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
    "node_modules/ee-first": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/ee-first/-/ee-first-1.1.1.tgz",
      "integrity": "sha512-WMwm9LhRUo+WUaRN+vRuETqG89IgZphVSNkdFgeb6sS/E4OrDIN7t48CAewSHXc6C8lefD8KKfr5vY61brQlow==",
      "license": "MIT"
    },
    "node_modules/electron-to-chromium": {
      "version": "1.5.439",
      "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.5.439.tgz",
      "integrity": "sha512-qu6QIPXhsb+CRcAiTMNjR4A1y/7tCYKkKjr5CZXRVih6qkDf79peZ2BpEU3qoDBNCRrcy3Mra3X9nG5oruuA7Q==",
      "license": "ISC"
    },
    "node_modules/emoji-regex": {
      "version": "9.2.2",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-9.2.2.tgz",
      "integrity": "sha512-L18DaJsXSUk2+42pv8mLs5jJT2hqFkFE4j21wOmgbUqsZ2hL72NsUU785g9RXgo3s0ZNgVl42TiHp3ZtOv/Vyg==",
      "dev": true,
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
    "node_modules/engine.io-client": {
      "version": "6.6.7",
      "resolved": "https://registry.npmjs.org/engine.io-client/-/engine.io-client-6.6.7.tgz",
      "integrity": "sha512-GyAvmPA7gnRCpDQbYACAy79Lg4ewevrmaPzySZz0OVvgyZc3gEfLLqPTYk8wVBScjOEpM9ZO4KryyFpVItjGEA==",
      "license": "MIT",
      "dependencies": {
        "@socket.io/component-emitter": "~3.1.0",
        "debug": "~4.4.1",
        "engine.io-parser": "~5.2.1",
        "ws": "~8.21.0",
        "xmlhttprequest-ssl": "~2.1.1"
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
    "node_modules/enhanced-resolve": {
      "version": "5.25.1",
      "resolved": "https://registry.npmjs.org/enhanced-resolve/-/enhanced-resolve-5.25.1.tgz",
      "integrity": "sha512-nGXts5znJzmWPu+mIE9izCOzdg63oJca2mDzGWWTth7sr4aCToKcoyFVBQwN75Ij5Pf6p510EwkTqViTRzDV+w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "graceful-fs": "^4.2.4",
        "tapable": "^2.3.3"
      },
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/enquirer": {
      "version": "2.4.1",
      "resolved": "https://registry.npmjs.org/enquirer/-/enquirer-2.4.1.tgz",
      "integrity": "sha512-rRqJg/6gd538VHvR3PSrdRBb/1Vy2YfzHqzvbhGIQpDRKIa4FgV/54b5Q1xYSxOOwKvjXweS26E0Q+nAMwp2pQ==",
      "license": "MIT",
      "dependencies": {
        "ansi-colors": "^4.1.1",
        "strip-ansi": "^6.0.1"
      },
      "engines": {
        "node": ">=8.6"
      }
    },
    "node_modules/env-paths": {
      "version": "2.2.1",
      "resolved": "https://registry.npmjs.org/env-paths/-/env-paths-2.2.1.tgz",
      "integrity": "sha512-+h1lkLKhZMTYjog1VEpJNG7NZJWcuc2DDk/qsqSTRRCOXiLjeQ1d1/udrUGhqMxUgAlwKNZ0cf2uqan5GLuS2A==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/error-ex": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/error-ex/-/error-ex-1.3.4.tgz",
      "integrity": "sha512-sqQamAnR14VgCr1A618A3sGrygcpK+HEbenA/HiEAkkUwcZIIB/tgWqHFxWgOyDh4nB4JCRimh79dR5Ywc9MDQ==",
      "license": "MIT",
      "dependencies": {
        "is-arrayish": "^0.2.1"
      }
    },
    "node_modules/es-abstract": {
      "version": "1.24.2",
      "resolved": "https://registry.npmjs.org/es-abstract/-/es-abstract-1.24.2.tgz",
      "integrity": "sha512-2FpH9Q5i2RRwyEP1AylXe6nYLR5OhaJTZwmlcP0dL/+JCbgg7yyEo/sEK6HeGZRf3dFpWwThaRHVApXSkW3xeg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "array-buffer-byte-length": "^1.0.2",
        "arraybuffer.prototype.slice": "^1.0.4",
        "available-typed-arrays": "^1.0.7",
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.4",
        "data-view-buffer": "^1.0.2",
        "data-view-byte-length": "^1.0.2",
        "data-view-byte-offset": "^1.0.1",
        "es-define-property": "^1.0.1",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.1.1",
        "es-set-tostringtag": "^2.1.0",
        "es-to-primitive": "^1.3.0",
        "function.prototype.name": "^1.1.8",
        "get-intrinsic": "^1.3.0",
        "get-proto": "^1.0.1",
        "get-symbol-description": "^1.1.0",
        "globalthis": "^1.0.4",
        "gopd": "^1.2.0",
        "has-property-descriptors": "^1.0.2",
        "has-proto": "^1.2.0",
        "has-symbols": "^1.1.0",
        "hasown": "^2.0.2",
        "internal-slot": "^1.1.0",
        "is-array-buffer": "^3.0.5",
        "is-callable": "^1.2.7",
        "is-data-view": "^1.0.2",
        "is-negative-zero": "^2.0.3",
        "is-regex": "^1.2.1",
        "is-set": "^2.0.3",
        "is-shared-array-buffer": "^1.0.4",
        "is-string": "^1.1.1",
        "is-typed-array": "^1.1.15",
        "is-weakref": "^1.1.1",
        "math-intrinsics": "^1.1.0",
        "object-inspect": "^1.13.4",
        "object-keys": "^1.1.1",
        "object.assign": "^4.1.7",
        "own-keys": "^1.0.1",
        "regexp.prototype.flags": "^1.5.4",
        "safe-array-concat": "^1.1.3",
        "safe-push-apply": "^1.0.0",
        "safe-regex-test": "^1.1.0",
        "set-proto": "^1.0.0",
        "stop-iteration-iterator": "^1.1.0",
        "string.prototype.trim": "^1.2.10",
        "string.prototype.trimend": "^1.0.9",
        "string.prototype.trimstart": "^1.0.8",
        "typed-array-buffer": "^1.0.3",
        "typed-array-byte-length": "^1.0.3",
        "typed-array-byte-offset": "^1.0.4",
        "typed-array-length": "^1.0.7",
        "unbox-primitive": "^1.1.0",
        "which-typed-array": "^1.1.19"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/es-abstract-get": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/es-abstract-get/-/es-abstract-get-1.0.0.tgz",
      "integrity": "sha512-6PMWXpdhshVvFp+FoWYs1EvG1Nj0tvk0dZM+XcK0xMEM1czRVcP6ohqPWHy6qPagSpC8j4+p89WXlT+xXJs/fg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.1.2",
        "is-callable": "^1.2.7",
        "object-inspect": "^1.13.4"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
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
    "node_modules/es-iterator-helpers": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/es-iterator-helpers/-/es-iterator-helpers-1.4.0.tgz",
      "integrity": "sha512-c/A0P0oxkACDc+cKWw8evLXK83oBKgn0qPOqCYT4x9uolpCIJAcYvJC9QYKNDRPsTeGyCrQ326jrvgZWdCdK5Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.9",
        "call-bound": "^1.0.4",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.24.2",
        "es-errors": "^1.3.0",
        "es-set-tostringtag": "^2.1.0",
        "function-bind": "^1.1.2",
        "get-intrinsic": "^1.3.0",
        "globalthis": "^1.0.4",
        "gopd": "^1.2.0",
        "has-property-descriptors": "^1.0.2",
        "has-proto": "^1.2.0",
        "has-symbols": "^1.1.0",
        "internal-slot": "^1.1.0",
        "iterator.prototype": "^1.1.5",
        "math-intrinsics": "^1.1.0"
      },
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
    "node_modules/es-set-tostringtag": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/es-set-tostringtag/-/es-set-tostringtag-2.1.0.tgz",
      "integrity": "sha512-j6vWzfrGVfyXxge+O0x5sh6cvxAog0a/4Rdd2K36zCMV5eJ+/+tOAngRO8cODMNWbVRdVlmGZQL2YS3yR8bIUA==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.6",
        "has-tostringtag": "^1.0.2",
        "hasown": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-shim-unscopables": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/es-shim-unscopables/-/es-shim-unscopables-1.1.0.tgz",
      "integrity": "sha512-d9T8ucsEhh8Bi1woXCf+TIKDIROLG5WCkxg8geBCbvk22kzwC5G2OnXVMO6FUsvQlgUUXQ2itephWDLqDzbeCw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "hasown": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-to-primitive": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/es-to-primitive/-/es-to-primitive-1.3.4.tgz",
      "integrity": "sha512-yPDz7wqpg1/mmHLmS3tcfTfbw5f1eryXvyghYBffGdERwe+mV7ZcWzTR8LR17Kvqt3qfPurjlonmnq3MKXIOXw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-abstract-get": "^1.0.0",
        "es-define-property": "^1.0.1",
        "es-errors": "^1.3.0",
        "is-callable": "^1.2.7",
        "is-date-object": "^1.1.0",
        "is-symbol": "^1.1.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/escalade": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/escalade/-/escalade-3.2.0.tgz",
      "integrity": "sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/escape-html": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/escape-html/-/escape-html-1.0.3.tgz",
      "integrity": "sha512-NiSupZ4OeuGwr68lGIeym/ksIZMJodUGOSCZ/FSnTxcrekbvqrgdUxlJOMpijaKZVjAJrWrGs/6Jy8OMuyj9ow==",
      "license": "MIT"
    },
    "node_modules/escape-string-regexp": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-4.0.0.tgz",
      "integrity": "sha512-TtpcNJ3XAzx3Gq8sWRzJaVajRs0uVxA2YAkdb1jm2YkPz4G6egUFAyA3n5vtEIZefPk5Wa4UXbKuS5fKkJWdgA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/eslint": {
      "version": "9.39.5",
      "resolved": "https://registry.npmjs.org/eslint/-/eslint-9.39.5.tgz",
      "integrity": "sha512-DgZS62aPLXKlnxILS/AYCoRvHaZeXceIzlXPkkGGzJWSow1aEk0lbTlxUSlyjC8jcaKxAdOnTDz+o1JFSBsyjw==",
      "deprecated": "This version is no longer supported. Please see https://eslint.org/version-support for other options.",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@eslint-community/eslint-utils": "^4.8.0",
        "@eslint-community/regexpp": "^4.12.1",
        "@eslint/config-array": "^0.21.2",
        "@eslint/config-helpers": "^0.4.2",
        "@eslint/core": "^0.17.0",
        "@eslint/eslintrc": "^3.3.6",
        "@eslint/js": "9.39.5",
        "@eslint/plugin-kit": "^0.4.1",
        "@humanfs/node": "^0.16.6",
        "@humanwhocodes/module-importer": "^1.0.1",
        "@humanwhocodes/retry": "^0.4.2",
        "@types/estree": "^1.0.6",
        "ajv": "^6.14.0",
        "chalk": "^4.0.0",
        "cross-spawn": "^7.0.6",
        "debug": "^4.3.2",
        "escape-string-regexp": "^4.0.0",
        "eslint-scope": "^8.4.0",
        "eslint-visitor-keys": "^4.2.1",
        "espree": "^10.4.0",
        "esquery": "^1.5.0",
        "esutils": "^2.0.2",
        "fast-deep-equal": "^3.1.3",
        "file-entry-cache": "^8.0.0",
        "find-up": "^5.0.0",
        "glob-parent": "^6.0.2",
        "ignore": "^5.2.0",
        "imurmurhash": "^0.1.4",
        "is-glob": "^4.0.0",
        "json-stable-stringify-without-jsonify": "^1.0.1",
        "lodash.merge": "^4.6.2",
        "minimatch": "^3.1.5",
        "natural-compare": "^1.4.0",
        "optionator": "^0.9.3"
      },
      "bin": {
        "eslint": "bin/eslint.js"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://eslint.org/donate"
      },
      "peerDependencies": {
        "jiti": "*"
      },
      "peerDependenciesMeta": {
        "jiti": {
          "optional": true
        }
      }
    },
    "node_modules/eslint-config-next": {
      "version": "16.3.6",
      "resolved": "https://registry.npmjs.org/eslint-config-next/-/eslint-config-next-16.3.6.tgz",
      "integrity": "sha512-1Upt3U7BDwU+ilpe2byZjAfts9oNq4d4fv/zXEvs8/4yS+cwOQW/WCxUNy8gCDquX67SzeehDvKblVC6ZBMocQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@next/eslint-plugin-next": "16.3.6",
        "eslint-import-resolver-node": "^0.3.6",
        "eslint-import-resolver-typescript": "^3.5.2",
        "eslint-plugin-import": "^2.32.0",
        "eslint-plugin-jsx-a11y": "^6.10.0",
        "eslint-plugin-react": "^7.37.0",
        "eslint-plugin-react-hooks": "^7.0.0",
        "globals": "16.4.0",
        "typescript-eslint": "^8.46.0"
      },
      "peerDependencies": {
        "eslint": ">=9.0.0",
        "typescript": ">=3.3.1"
      },
      "peerDependenciesMeta": {
        "typescript": {
          "optional": true
        }
      }
    },
    "node_modules/eslint-config-next/node_modules/globals": {
      "version": "16.4.0",
      "resolved": "https://registry.npmjs.org/globals/-/globals-16.4.0.tgz",
      "integrity": "sha512-ob/2LcVVaVGCYN+r14cnwnoDPUufjiYgSqRhiFD0Q1iI4Odora5RE8Iv1D24hAz5oMophRGkGz+yuvQmmUMnMw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/eslint-import-resolver-node": {
      "version": "0.3.10",
      "resolved": "https://registry.npmjs.org/eslint-import-resolver-node/-/eslint-import-resolver-node-0.3.10.tgz",
      "integrity": "sha512-tRrKqFyCaKict5hOd244sL6EQFNycnMQnBe+j8uqGNXYzsImGbGUU4ibtoaBmv5FLwJwcFJNeg1GeVjQfbMrDQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "debug": "^3.2.7",
        "is-core-module": "^2.16.1",
        "resolve": "^2.0.0-next.6"
      }
    },
    "node_modules/eslint-import-resolver-node/node_modules/debug": {
      "version": "3.2.7",
      "resolved": "https://registry.npmjs.org/debug/-/debug-3.2.7.tgz",
      "integrity": "sha512-CFjzYYAi4ThfiQvizrFQevTTXHtnCqWfe7x1AhgEscTz6ZbLbfoLRLPugTQyBth6f8ZERVUSyWHFD/7Wu4t1XQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.1"
      }
    },
    "node_modules/eslint-import-resolver-typescript": {
      "version": "3.10.1",
      "resolved": "https://registry.npmjs.org/eslint-import-resolver-typescript/-/eslint-import-resolver-typescript-3.10.1.tgz",
      "integrity": "sha512-A1rHYb06zjMGAxdLSkN2fXPBwuSaQ0iO5M/hdyS0Ajj1VBaRp0sPD3dn1FhME3c/JluGFbwSxyCfqdSbtQLAHQ==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "@nolyfill/is-core-module": "1.0.39",
        "debug": "^4.4.0",
        "get-tsconfig": "^4.10.0",
        "is-bun-module": "^2.0.0",
        "stable-hash": "^0.0.5",
        "tinyglobby": "^0.2.13",
        "unrs-resolver": "^1.6.2"
      },
      "engines": {
        "node": "^14.18.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint-import-resolver-typescript"
      },
      "peerDependencies": {
        "eslint": "*",
        "eslint-plugin-import": "*",
        "eslint-plugin-import-x": "*"
      },
      "peerDependenciesMeta": {
        "eslint-plugin-import": {
          "optional": true
        },
        "eslint-plugin-import-x": {
          "optional": true
        }
      }
    },
    "node_modules/eslint-module-utils": {
      "version": "2.14.0",
      "resolved": "https://registry.npmjs.org/eslint-module-utils/-/eslint-module-utils-2.14.0.tgz",
      "integrity": "sha512-W2WCRZ9Dqntd+2u8jJcVMV2PKulc6RdLgUUoh/yQr3uB6lo/ZOeGx11sv60/8S4QFFKNslAlWhr9u0Ef7ZW6Ig==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "debug": "^3.2.7"
      },
      "engines": {
        "node": ">=4"
      },
      "peerDependenciesMeta": {
        "eslint": {
          "optional": true
        }
      }
    },
    "node_modules/eslint-module-utils/node_modules/debug": {
      "version": "3.2.7",
      "resolved": "https://registry.npmjs.org/debug/-/debug-3.2.7.tgz",
      "integrity": "sha512-CFjzYYAi4ThfiQvizrFQevTTXHtnCqWfe7x1AhgEscTz6ZbLbfoLRLPugTQyBth6f8ZERVUSyWHFD/7Wu4t1XQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.1"
      }
    },
    "node_modules/eslint-plugin-import": {
      "version": "2.32.0",
      "resolved": "https://registry.npmjs.org/eslint-plugin-import/-/eslint-plugin-import-2.32.0.tgz",
      "integrity": "sha512-whOE1HFo/qJDyX4SnXzP4N6zOWn79WhnCUY/iDR0mPfQZO8wcYE4JClzI2oZrhBnnMUCBCHZhO6VQyoBU95mZA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@rtsao/scc": "^1.1.0",
        "array-includes": "^3.1.9",
        "array.prototype.findlastindex": "^1.2.6",
        "array.prototype.flat": "^1.3.3",
        "array.prototype.flatmap": "^1.3.3",
        "debug": "^3.2.7",
        "doctrine": "^2.1.0",
        "eslint-import-resolver-node": "^0.3.9",
        "eslint-module-utils": "^2.12.1",
        "hasown": "^2.0.2",
        "is-core-module": "^2.16.1",
        "is-glob": "^4.0.3",
        "minimatch": "^3.1.2",
        "object.fromentries": "^2.0.8",
        "object.groupby": "^1.0.3",
        "object.values": "^1.2.1",
        "semver": "^6.3.1",
        "string.prototype.trimend": "^1.0.9",
        "tsconfig-paths": "^3.15.0"
      },
      "engines": {
        "node": ">=4"
      },
      "peerDependencies": {
        "eslint": "^2 || ^3 || ^4 || ^5 || ^6 || ^7.2.0 || ^8 || ^9"
      }
    },
    "node_modules/eslint-plugin-import/node_modules/debug": {
      "version": "3.2.7",
      "resolved": "https://registry.npmjs.org/debug/-/debug-3.2.7.tgz",
      "integrity": "sha512-CFjzYYAi4ThfiQvizrFQevTTXHtnCqWfe7x1AhgEscTz6ZbLbfoLRLPugTQyBth6f8ZERVUSyWHFD/7Wu4t1XQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.1"
      }
    },
    "node_modules/eslint-plugin-jsx-a11y": {
      "version": "6.10.2",
      "resolved": "https://registry.npmjs.org/eslint-plugin-jsx-a11y/-/eslint-plugin-jsx-a11y-6.10.2.tgz",
      "integrity": "sha512-scB3nz4WmG75pV8+3eRUQOHZlNSUhFNq37xnpgRkCCELU3XMvXAxLk1eqWWyE22Ki4Q01Fnsw9BA3cJHDPgn2Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "aria-query": "^5.3.2",
        "array-includes": "^3.1.8",
        "array.prototype.flatmap": "^1.3.2",
        "ast-types-flow": "^0.0.8",
        "axe-core": "^4.10.0",
        "axobject-query": "^4.1.0",
        "damerau-levenshtein": "^1.0.8",
        "emoji-regex": "^9.2.2",
        "hasown": "^2.0.2",
        "jsx-ast-utils": "^3.3.5",
        "language-tags": "^1.0.9",
        "minimatch": "^3.1.2",
        "object.fromentries": "^2.0.8",
        "safe-regex-test": "^1.0.3",
        "string.prototype.includes": "^2.0.1"
      },
      "engines": {
        "node": ">=4.0"
      },
      "peerDependencies": {
        "eslint": "^3 || ^4 || ^5 || ^6 || ^7 || ^8 || ^9"
      }
    },
    "node_modules/eslint-plugin-react": {
      "version": "7.37.5",
      "resolved": "https://registry.npmjs.org/eslint-plugin-react/-/eslint-plugin-react-7.37.5.tgz",
      "integrity": "sha512-Qteup0SqU15kdocexFNAJMvCJEfa2xUKNV4CC1xsVMrIIqEy3SQ/rqyxCWNzfrd3/ldy6HMlD2e0JDVpDg2qIA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "array-includes": "^3.1.8",
        "array.prototype.findlast": "^1.2.5",
        "array.prototype.flatmap": "^1.3.3",
        "array.prototype.tosorted": "^1.1.4",
        "doctrine": "^2.1.0",
        "es-iterator-helpers": "^1.2.1",
        "estraverse": "^5.3.0",
        "hasown": "^2.0.2",
        "jsx-ast-utils": "^2.4.1 || ^3.0.0",
        "minimatch": "^3.1.2",
        "object.entries": "^1.1.9",
        "object.fromentries": "^2.0.8",
        "object.values": "^1.2.1",
        "prop-types": "^15.8.1",
        "resolve": "^2.0.0-next.5",
        "semver": "^6.3.1",
        "string.prototype.matchall": "^4.0.12",
        "string.prototype.repeat": "^1.0.0"
      },
      "engines": {
        "node": ">=4"
      },
      "peerDependencies": {
        "eslint": "^3 || ^4 || ^5 || ^6 || ^7 || ^8 || ^9.7"
      }
    },
    "node_modules/eslint-plugin-react-hooks": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/eslint-plugin-react-hooks/-/eslint-plugin-react-hooks-7.1.1.tgz",
      "integrity": "sha512-f2I7Gw6JbvCexzIInuSbZpfdQ44D7iqdWX01FKLvrPgqxoE7oMj8clOfto8U6vYiz4yd5oKu39rRSVOe1zRu0g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/core": "^7.24.4",
        "@babel/parser": "^7.24.4",
        "hermes-parser": "^0.25.1",
        "zod": "^3.25.0 || ^4.0.0",
        "zod-validation-error": "^3.5.0 || ^4.0.0"
      },
      "engines": {
        "node": ">=18"
      },
      "peerDependencies": {
        "eslint": "^3.0.0 || ^4.0.0 || ^5.0.0 || ^6.0.0 || ^7.0.0 || ^8.0.0-0 || ^9.0.0 || ^10.0.0"
      }
    },
    "node_modules/eslint-scope": {
      "version": "8.4.0",
      "resolved": "https://registry.npmjs.org/eslint-scope/-/eslint-scope-8.4.0.tgz",
      "integrity": "sha512-sNXOfKCn74rt8RICKMvJS7XKV/Xk9kA7DyJr8mJik3S7Cwgy3qlkkmyS2uQB3jiJg6VNdZd/pDBJu0nvG2NlTg==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "esrecurse": "^4.3.0",
        "estraverse": "^5.2.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/eslint-visitor-keys": {
      "version": "4.2.1",
      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-4.2.1.tgz",
      "integrity": "sha512-Uhdk5sfqcee/9H/rCOJikYz67o0a2Tw2hGRPOG2Y1R2dg7brRe1uG0yaNQDHu+TO/uQPF/5eCapvYSmHUjt7JQ==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/eslint/node_modules/ajv": {
      "version": "6.15.0",
      "resolved": "https://registry.npmjs.org/ajv/-/ajv-6.15.0.tgz",
      "integrity": "sha512-fgFx7Hfoq60ytK2c7DhnF8jIvzYgOMxfugjLOSMHjLIPgenqa7S7oaagATUq99mV6IYvN2tRmC0wnTYX6iPbMw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fast-deep-equal": "^3.1.1",
        "fast-json-stable-stringify": "^2.0.0",
        "json-schema-traverse": "^0.4.1",
        "uri-js": "^4.2.2"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/epoberezkin"
      }
    },
    "node_modules/eslint/node_modules/json-schema-traverse": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/json-schema-traverse/-/json-schema-traverse-0.4.1.tgz",
      "integrity": "sha512-xbbCH5dCYU5T8LcEhhuh7HJ88HXuW3qsI3Y0zOZFKfZEHcpWiHU/Jxzk629Brsab/mMiHQti9wMP+845RPe3Vg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/espree": {
      "version": "10.4.0",
      "resolved": "https://registry.npmjs.org/espree/-/espree-10.4.0.tgz",
      "integrity": "sha512-j6PAQ2uUr79PZhBjP5C5fhl8e39FmRnOjsD5lGnWrFU8i2G776tBK7+nP8KuQUTTyAZUwfQqXAgrVH5MbH9CYQ==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "acorn": "^8.15.0",
        "acorn-jsx": "^5.3.2",
        "eslint-visitor-keys": "^4.2.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/esprima": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/esprima/-/esprima-4.0.1.tgz",
      "integrity": "sha512-eGuFFw7Upda+g4p+QHvnW0RyTX/SVeJBDM/gCtMARO0cLuT2HcEKnTPvhjV6aGeqrCB/sbNop0Kszm0jsaWU4A==",
      "license": "BSD-2-Clause",
      "bin": {
        "esparse": "bin/esparse.js",
        "esvalidate": "bin/esvalidate.js"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/esquery": {
      "version": "1.7.0",
      "resolved": "https://registry.npmjs.org/esquery/-/esquery-1.7.0.tgz",
      "integrity": "sha512-Ap6G0WQwcU/LHsvLwON1fAQX9Zp0A2Y6Y/cJBl9r/JbW90Zyg4/zbG6zzKa2OTALELarYHmKu0GhpM5EO+7T0g==",
      "dev": true,
      "license": "BSD-3-Clause",
      "dependencies": {
        "estraverse": "^5.1.0"
      },
      "engines": {
        "node": ">=0.10"
      }
    },
    "node_modules/esrecurse": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/esrecurse/-/esrecurse-4.3.0.tgz",
      "integrity": "sha512-KmfKL3b6G+RXvP8N1vr3Tq1kL/oCFgn2NYXEtqP8/L3pKapUA4G8cFVaoF3SU323CD4XypR/ffioHmkti6/Tag==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "estraverse": "^5.2.0"
      },
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/estraverse": {
      "version": "5.3.0",
      "resolved": "https://registry.npmjs.org/estraverse/-/estraverse-5.3.0.tgz",
      "integrity": "sha512-MMdARuVEQziNTeJD8DgMqmhwR11BRQ/cBP+pLtYdSTnf3MIO8fFeiINEbX36ZdNlfU/7A9f3gUw49B3oQsvwBA==",
      "dev": true,
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/esutils": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/esutils/-/esutils-2.0.3.tgz",
      "integrity": "sha512-kVscqXk4OCp68SZ0dkgEKVi6/8ij300KBWTJq32P/dYeWTSwK41WyTxalN1eRmA5Z9UU/LX9D7FWSmV9SAYx6g==",
      "dev": true,
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
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
    "node_modules/eventsource": {
      "version": "3.0.7",
      "resolved": "https://registry.npmjs.org/eventsource/-/eventsource-3.0.7.tgz",
      "integrity": "sha512-CRT1WTyuQoD771GW56XEZFQ/ZoSfWid1alKGDYMmkt2yl8UXrVR4pspqWNEcqKvVIzg6PAltWjxcSSPrboA4iA==",
      "license": "MIT",
      "dependencies": {
        "eventsource-parser": "^3.0.1"
      },
      "engines": {
        "node": ">=18.0.0"
      }
    },
    "node_modules/eventsource-parser": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/eventsource-parser/-/eventsource-parser-3.1.1.tgz",
      "integrity": "sha512-EKN1vKAMcZ8MlYMpaNuxN6R9yakzH6uajHcHVTqWJzvu5pWw9DyhbP35HH8MVBQ+dZjAfDxk+A8NiR9KWaXiyQ==",
      "license": "MIT",
      "engines": {
        "node": ">=18.0.0"
      }
    },
    "node_modules/execa": {
      "version": "9.6.1",
      "resolved": "https://registry.npmjs.org/execa/-/execa-9.6.1.tgz",
      "integrity": "sha512-9Be3ZoN4LmYR90tUoVu2te2BsbzHfhJyfEiAVfz7N5/zv+jduIfLrV2xdQXOHbaD6KgpGdO9PRPM1Y4Q9QkPkA==",
      "license": "MIT",
      "dependencies": {
        "@sindresorhus/merge-streams": "^4.0.0",
        "cross-spawn": "^7.0.6",
        "figures": "^6.1.0",
        "get-stream": "^9.0.0",
        "human-signals": "^8.0.1",
        "is-plain-obj": "^4.1.0",
        "is-stream": "^4.0.1",
        "npm-run-path": "^6.0.0",
        "pretty-ms": "^9.2.0",
        "signal-exit": "^4.1.0",
        "strip-final-newline": "^4.0.0",
        "yoctocolors": "^2.1.1"
      },
      "engines": {
        "node": "^18.19.0 || >=20.5.0"
      },
      "funding": {
        "url": "https://github.com/sindresorhus/execa?sponsor=1"
      }
    },
    "node_modules/express": {
      "version": "5.2.1",
      "resolved": "https://registry.npmjs.org/express/-/express-5.2.1.tgz",
      "integrity": "sha512-hIS4idWWai69NezIdRt2xFVofaF4j+6INOpJlVOLDO8zXGpUVEVzIYk12UUi2JzjEzWL3IOAxcTubgz9Po0yXw==",
      "license": "MIT",
      "dependencies": {
        "accepts": "^2.0.0",
        "body-parser": "^2.2.1",
        "content-disposition": "^1.0.0",
        "content-type": "^1.0.5",
        "cookie": "^0.7.1",
        "cookie-signature": "^1.2.1",
        "debug": "^4.4.0",
        "depd": "^2.0.0",
        "encodeurl": "^2.0.0",
        "escape-html": "^1.0.3",
        "etag": "^1.8.1",
        "finalhandler": "^2.1.0",
        "fresh": "^2.0.0",
        "http-errors": "^2.0.0",
        "merge-descriptors": "^2.0.0",
        "mime-types": "^3.0.0",
        "on-finished": "^2.4.1",
        "once": "^1.4.0",
        "parseurl": "^1.3.3",
        "proxy-addr": "^2.0.7",
        "qs": "^6.14.0",
        "range-parser": "^1.2.1",
        "router": "^2.2.0",
        "send": "^1.1.0",
        "serve-static": "^2.2.0",
        "statuses": "^2.0.1",
        "type-is": "^2.0.1",
        "vary": "^1.1.2"
      },
      "engines": {
        "node": ">= 18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/express-rate-limit": {
      "version": "8.7.0",
      "resolved": "https://registry.npmjs.org/express-rate-limit/-/express-rate-limit-8.7.0.tgz",
      "integrity": "sha512-hOwV7WOxXfjRpAM1DSJWZDXx3GhplwD8IfwuwvogD8i1Qnkgosw/H45s4ZnFAUHDAhPjlY9hLBvJhKmGMyY26g==",
      "license": "MIT",
      "dependencies": {
        "debug": "^4.4.3",
        "ip-address": "^10.2.0"
      },
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
    "node_modules/fast-deep-equal": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/fast-deep-equal/-/fast-deep-equal-3.1.3.tgz",
      "integrity": "sha512-f3qQ9oQy9j2AhBe/H9VC91wLmKBCCU/gDOnKNAYG5hswO7BLKj09Hc5HYNz9cGI++xlpDCIgDaitVs03ATR84Q==",
      "license": "MIT"
    },
    "node_modules/fast-glob": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/fast-glob/-/fast-glob-3.3.1.tgz",
      "integrity": "sha512-kNFPyjhh5cKjrUltxs+wFx+ZkbRaxxmZ+X0ZU31SOsxCEtP9VPgtq2teZw1DebupL5GmDaNQ6yKMMVcM41iqDg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.stat": "^2.0.2",
        "@nodelib/fs.walk": "^1.2.3",
        "glob-parent": "^5.1.2",
        "merge2": "^1.3.0",
        "micromatch": "^4.0.4"
      },
      "engines": {
        "node": ">=8.6.0"
      }
    },
    "node_modules/fast-glob/node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/fast-json-stable-stringify": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/fast-json-stable-stringify/-/fast-json-stable-stringify-2.1.0.tgz",
      "integrity": "sha512-lhd/wF+Lk98HZoTCtlVraHtfh5XYijIjalXck7saUtuanSDyLMxnHhSXEDJqHxD7msR8D0uCmqlkwjCV8xvwHw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fast-levenshtein": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/fast-levenshtein/-/fast-levenshtein-2.0.6.tgz",
      "integrity": "sha512-DCXu6Ifhqcks7TZKY3Hxp3y6qphY5SJZmrWMDrKcERSOXWQdMhU9Ig/PYrzyw/ul9jOIyh0N4M0tbC5hodg8dw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fast-uri": {
      "version": "3.1.8",
      "resolved": "https://registry.npmjs.org/fast-uri/-/fast-uri-3.1.8.tgz",
      "integrity": "sha512-GZMtZUTNRpOVIECoXwLNZS5xUGE+mVNbTB8h/7Rwh2TFWcBQiPzTgyZi05BF9UMZKkLJv8XBRJTlU7zg8+ZfMg==",
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
      "license": "BSD-3-Clause"
    },
    "node_modules/fastq": {
      "version": "1.20.3",
      "resolved": "https://registry.npmjs.org/fastq/-/fastq-1.20.3.tgz",
      "integrity": "sha512-XKv5nnLs6nLF71NgiKJLIZFLkPyIEuOselLG7ujZnGrRfQK8HpvY+WqKhAJUAdLomwVHErVS4LfxFlPq0/FTAw==",
      "license": "ISC",
      "dependencies": {
        "reusify": "^1.0.4"
      }
    },
    "node_modules/figures": {
      "version": "6.1.0",
      "resolved": "https://registry.npmjs.org/figures/-/figures-6.1.0.tgz",
      "integrity": "sha512-d+l3qxjSesT4V7v2fh+QnmFnUWv9lSpjarhShNTgBOfA0ttejbQUAlHLitbjkoRiDulW0OPoQPYIGhIC8ohejg==",
      "license": "MIT",
      "dependencies": {
        "is-unicode-supported": "^2.0.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/file-entry-cache": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/file-entry-cache/-/file-entry-cache-8.0.0.tgz",
      "integrity": "sha512-XXTUwCvisa5oacNGRP9SfNtYBNAMi+RPwBFmblZEF7N7swHYQS6/Zfk7SRwx4D5j3CH211YNRco1DEMNVfZCnQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "flat-cache": "^4.0.0"
      },
      "engines": {
        "node": ">=16.0.0"
      }
    },
    "node_modules/fill-range": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-7.1.1.tgz",
      "integrity": "sha512-YsGpe3WHLK8ZYi4tWDg2Jy3ebRz2rXowDxnld4bkQB00cc/1Zw9AWnC0i9ztDJitivtQvaI9KaLyKrc+hBW0yg==",
      "license": "MIT",
      "dependencies": {
        "to-regex-range": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/finalhandler": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/finalhandler/-/finalhandler-2.1.1.tgz",
      "integrity": "sha512-S8KoZgRZN+a5rNwqTxlZZePjT/4cnm0ROV70LedRHZ0p8u9fRID0hJUZQpkKLzro8LfmC8sx23bY6tVNxv8pQA==",
      "license": "MIT",
      "dependencies": {
        "debug": "^4.4.0",
        "encodeurl": "^2.0.0",
        "escape-html": "^1.0.3",
        "on-finished": "^2.4.1",
        "parseurl": "^1.3.3",
        "statuses": "^2.0.1"
      },
      "engines": {
        "node": ">= 18.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/find-up": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/find-up/-/find-up-5.0.0.tgz",
      "integrity": "sha512-78/PXT1wlLLDgTzDs7sjq9hzz0vXD+zn+7wypEe4fXQxCmdmqfGsEPQxmiCSQI3ajFV91bVSsvNtrJRiW6nGng==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "locate-path": "^6.0.0",
        "path-exists": "^4.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/flat-cache": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/flat-cache/-/flat-cache-4.0.1.tgz",
      "integrity": "sha512-f7ccFPK3SXFHpx15UIGyRJ/FJQctuKZ0zVuN3frBo4HnK3cay9VEW0R6yPYFHC0AgqhukPzKjq22t5DmAyqGyw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "flatted": "^3.2.9",
        "keyv": "^4.5.4"
      },
      "engines": {
        "node": ">=16"
      }
    },
    "node_modules/flatted": {
      "version": "3.4.4",
      "resolved": "https://registry.npmjs.org/flatted/-/flatted-3.4.4.tgz",
      "integrity": "sha512-5+ybhBZANEJxaH3X5evAFatUxLfEHSr7n6kYJ+1Qd0mUqr4eu9gIf6GDbWHf8RJijHrjjO8G+la14SlL2SeS1Q==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/follow-redirects": {
      "version": "1.16.1",
      "resolved": "https://registry.npmjs.org/follow-redirects/-/follow-redirects-1.16.1.tgz",
      "integrity": "sha512-FNvFGzoMLWmE6Yj9spb/zjd7yiNCHiAW9/Tg9CXrQ8wuu32HtlJOwWO11OJafl5FfY3DxTdQ0vj42zU1kvv5jg==",
      "funding": [
        {
          "type": "individual",
          "url": "https://github.com/sponsors/RubenVerborgh"
        }
      ],
      "license": "MIT",
      "engines": {
        "node": ">=4.0"
      },
      "peerDependenciesMeta": {
        "debug": {
          "optional": true
        }
      }
    },
    "node_modules/for-each": {
      "version": "0.3.5",
      "resolved": "https://registry.npmjs.org/for-each/-/for-each-0.3.5.tgz",
      "integrity": "sha512-dKx12eRCVIzqCxFGplyFKJMPvLEWgmNtUrpTiJIR5u97zEhRG8ySrtboPHZXx7daLxQVrl643cTzbab2tkQjxg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-callable": "^1.2.7"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/form-data": {
      "version": "4.0.6",
      "resolved": "https://registry.npmjs.org/form-data/-/form-data-4.0.6.tgz",
      "integrity": "sha512-vKatAh4SlVfgbv+YtmhiRjhEMJsYpsG1Y2rMQtR+SVSbytsSD1YGzDIcrAJmdFec88u/+VoGmxnl+80gL1tRCQ==",
      "license": "MIT",
      "dependencies": {
        "asynckit": "^0.4.0",
        "combined-stream": "^1.0.8",
        "es-set-tostringtag": "^2.1.0",
        "hasown": "^2.0.4",
        "mime-types": "^2.1.35"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/form-data/node_modules/mime-db": {
      "version": "1.52.0",
      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.52.0.tgz",
      "integrity": "sha512-sPU4uV7dYlvtWJxwwxHD0PuihVNiE7TyAbQ5SWxDCB9mUYvOgroQOwYQQOKPJ8CIbE+1ETVlOoK1UC2nU3gYvg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/form-data/node_modules/mime-types": {
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
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/fresh/-/fresh-2.0.0.tgz",
      "integrity": "sha512-Rx/WycZ60HOaqLKAi6cHRKKI7zxWbJ31MhntmtwMoaTeF7XFH9hhBp8vITaMidfljRQ6eYWCKkaTK+ykVJHP2A==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/fs-extra": {
      "version": "11.4.1",
      "resolved": "https://registry.npmjs.org/fs-extra/-/fs-extra-11.4.1.tgz",
      "integrity": "sha512-KYAb4c9BJQI6QqGKthV68OHe0badztdXJWKo0WtBA9IuCFPTKvE5ZdUBglP833aMjhaSPNO4A5j/EkzZtGlKjA==",
      "license": "MIT",
      "dependencies": {
        "graceful-fs": "^4.2.0",
        "jsonfile": "^6.0.1",
        "universalify": "^2.0.0"
      },
      "engines": {
        "node": ">=14.14"
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
    "node_modules/function.prototype.name": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/function.prototype.name/-/function.prototype.name-1.2.0.tgz",
      "integrity": "sha512-jObKIik1P2QjPHP5nz5BaOtUlfgS0fWo8IUByNXkM+o+02sJOi94em77GwJKQSJ3gfPHdgzLNrHc1uokV4P/ew==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.9",
        "call-bound": "^1.0.4",
        "es-define-property": "^1.0.1",
        "es-errors": "^1.3.0",
        "functions-have-names": "^1.2.3",
        "has-property-descriptors": "^1.0.2",
        "hasown": "^2.0.4",
        "is-callable": "^1.2.7",
        "is-document.all": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/functions-have-names": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/functions-have-names/-/functions-have-names-1.2.3.tgz",
      "integrity": "sha512-xckBUXyTIqT97tq2x2AMb+g163b5JFysYk0x4qxNFwbfQkmNZoiRHb6sPzI9/QV33WeuvVYBUIiD4NzNIyqaRQ==",
      "dev": true,
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/fuzzysort": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/fuzzysort/-/fuzzysort-3.1.0.tgz",
      "integrity": "sha512-sR9BNCjBg6LNgwvxlBd0sBABvQitkLzoVY9MYYROQVX/FvfJ4Mai9LsGhDgd8qYdds0bY77VzYd5iuB+v5rwQQ==",
      "license": "MIT"
    },
    "node_modules/generator-function": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/generator-function/-/generator-function-2.0.1.tgz",
      "integrity": "sha512-SFdFmIJi+ybC0vjlHN0ZGVGHc3lgE0DxPAT0djjVg+kjOnSqclqmj0KQ7ykTOLP6YxoqOvuAODGdcHJn+43q3g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/gensync": {
      "version": "1.0.0-beta.2",
      "resolved": "https://registry.npmjs.org/gensync/-/gensync-1.0.0-beta.2.tgz",
      "integrity": "sha512-3hN7NaskYvMDLQY55gnW3NQ+mesEAepTqlg+VEbj7zzqEMBVNhzcGYYeqFo/TlYz6eQiFcp1HcsCZO+nGgS8zg==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/get-east-asian-width": {
      "version": "1.7.0",
      "resolved": "https://registry.npmjs.org/get-east-asian-width/-/get-east-asian-width-1.7.0.tgz",
      "integrity": "sha512-XjH1AECxf0giL2V1aU8vKyRR2ppRUb5c0EvT7zuJTokQ74bNo52zOtghqdWIqrhUD79fo3x0WfKZdOqxF6LG1Q==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
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
    "node_modules/get-own-enumerable-keys": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/get-own-enumerable-keys/-/get-own-enumerable-keys-1.0.0.tgz",
      "integrity": "sha512-PKsK2FSrQCyxcGHsGrLDcK0lx+0Ke+6e8KFFozA9/fIQLhQzPaRvJFdcz7+Axg3jUH/Mq+NI4xa5u/UT2tQskA==",
      "license": "MIT",
      "engines": {
        "node": ">=14.16"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
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
    "node_modules/get-stream": {
      "version": "9.0.1",
      "resolved": "https://registry.npmjs.org/get-stream/-/get-stream-9.0.1.tgz",
      "integrity": "sha512-kVCxPF3vQM/N0B1PmoqVUqgHP+EeVjmZSQn+1oCRPxd2P21P2F19lIgbR3HBosbB1PUhOAoctJnfEn2GbN2eZA==",
      "license": "MIT",
      "dependencies": {
        "@sec-ant/readable-stream": "^0.4.1",
        "is-stream": "^4.0.1"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/get-symbol-description": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/get-symbol-description/-/get-symbol-description-1.1.0.tgz",
      "integrity": "sha512-w9UMqWwJxHNOvoNzSJ2oPF5wvYcvP7jUvYzhp67yEhTi17ZDBBC1z9pTdGuzjD+EFIqLSYRweZjqfiPzQ06Ebg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.6"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/get-tsconfig": {
      "version": "4.14.3",
      "resolved": "https://registry.npmjs.org/get-tsconfig/-/get-tsconfig-4.14.3.tgz",
      "integrity": "sha512-++QEw4DIY7WGoukz+/+A/8dGYPT9l9yIadnmSgZ8Rjr3YVSVDipQSO9CdnJo9ePqFqUUqh+wk9uIaoiAwsiPkA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "resolve-pkg-maps": "^1.0.0"
      },
      "funding": {
        "url": "https://github.com/privatenumber/get-tsconfig?sponsor=1"
      }
    },
    "node_modules/glob-parent": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-6.0.2.tgz",
      "integrity": "sha512-XxwI8EOhVQgWp6iDL+3b0r86f4d6AX6zSU55HfB4ydCEuXLXc5FcYeOu+nnGftS4TEju/11rt4KJPTMgbfmv4A==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.3"
      },
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/globals": {
      "version": "14.0.0",
      "resolved": "https://registry.npmjs.org/globals/-/globals-14.0.0.tgz",
      "integrity": "sha512-oahGvuMGQlPw/ivIYBjVSrWAfWLBeku5tpPE2fOPLi+WHffIWbuh2tCjhyQhTBPMf5E9jDEH4FOmTYgYwbKwtQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/globalthis": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/globalthis/-/globalthis-1.0.4.tgz",
      "integrity": "sha512-DpLKbNU4WylpxJykQujfCcwYWiV/Jhm50Goo0wrVILAv5jOr9d+H+UR3PhSCD2rCCEIg0uc+G+muBTwD54JhDQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "define-properties": "^1.2.1",
        "gopd": "^1.0.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
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
    "node_modules/graceful-fs": {
      "version": "4.2.11",
      "resolved": "https://registry.npmjs.org/graceful-fs/-/graceful-fs-4.2.11.tgz",
      "integrity": "sha512-RbJ5/jmFcNNCcDV5o9eTnBLJ/HszWV0P73bc+Ff4nS/rJj+YaS6IGyiOL0VoBYX+l1Wrl3k63h/KrH+nhJ0XvQ==",
      "license": "ISC"
    },
    "node_modules/has-bigints": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/has-bigints/-/has-bigints-1.1.0.tgz",
      "integrity": "sha512-R3pbpkcIqv2Pm3dUwgjclDRVmWpTJW2DcMzcIhEXEx1oh/CEMObMm3KLmRJOdvhM7o4uQBnwr8pzRK2sJWIqfg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/has-flag": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/has-flag/-/has-flag-4.0.0.tgz",
      "integrity": "sha512-EykJT/Q1KjTWctppgIAgfSO0tKVuZUjhgMr17kqTumMl6Afv3EISleU7qZUzoXDFTAHTDC4NOoG/ZxU3EvlMPQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/has-property-descriptors": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/has-property-descriptors/-/has-property-descriptors-1.0.2.tgz",
      "integrity": "sha512-55JNKuIW+vq4Ke1BjOTjM2YctQIvCT7GFzHwmfZPGo5wnrgkid0YQtnAleFSqumZm4az3n2BS+erby5ipJdgrg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-define-property": "^1.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/has-proto": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/has-proto/-/has-proto-1.2.0.tgz",
      "integrity": "sha512-KIL7eQPfHQRC8+XluaIw7BHUwwqL19bQn4hzNgdr+1wXoU0KKj6rufu47lhY7KbJR2C6T6+PfyN0Ea7wkSS+qQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "dunder-proto": "^1.0.0"
      },
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
    "node_modules/has-tostringtag": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/has-tostringtag/-/has-tostringtag-1.0.2.tgz",
      "integrity": "sha512-NqADB8VjPFLM2V0VvHUewwwsw0ZWBaIdgo+ieHtK3hasLz4qeCRjYcqfB6AQrBggRKppKF8L52/VqdVsO47Dlw==",
      "license": "MIT",
      "dependencies": {
        "has-symbols": "^1.0.3"
      },
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
    "node_modules/hermes-estree": {
      "version": "0.25.1",
      "resolved": "https://registry.npmjs.org/hermes-estree/-/hermes-estree-0.25.1.tgz",
      "integrity": "sha512-0wUoCcLp+5Ev5pDW2OriHC2MJCbwLwuRx+gAqMTOkGKJJiBCLjtrvy4PWUGn6MIVefecRpzoOZ/UV6iGdOr+Cw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/hermes-parser": {
      "version": "0.25.1",
      "resolved": "https://registry.npmjs.org/hermes-parser/-/hermes-parser-0.25.1.tgz",
      "integrity": "sha512-6pEjquH3rqaI6cYAXYPcz9MS4rY6R4ngRgrgfDshRptUZIc3lw0MCIJIGDj9++mfySOuPTHB4nrSW99BCvOPIA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "hermes-estree": "0.25.1"
      }
    },
    "node_modules/hono": {
      "version": "4.13.9",
      "resolved": "https://registry.npmjs.org/hono/-/hono-4.13.9.tgz",
      "integrity": "sha512-7dMkQmZoC4E6F7AtaQSPhlWAdnBti+j7rreMZl8QB4jFiEhP9TWbGWUMi8WYzBCgmgulxuvLQupKqo+Co6Omyg==",
      "license": "MIT",
      "engines": {
        "node": ">=16.9.0"
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
    "node_modules/https-proxy-agent": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/https-proxy-agent/-/https-proxy-agent-5.0.1.tgz",
      "integrity": "sha512-dFcAjpTQFgoLMzC2VwU+C/CbS7uRL0lWmxDITmqm7C+7F0Odmj6s9l6alZc6AELXhrnggM2CeWSXHGOdX2YtwA==",
      "license": "MIT",
      "dependencies": {
        "agent-base": "6",
        "debug": "4"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/human-signals": {
      "version": "8.0.1",
      "resolved": "https://registry.npmjs.org/human-signals/-/human-signals-8.0.1.tgz",
      "integrity": "sha512-eKCa6bwnJhvxj14kZk5NCPc6Hb6BdsU9DZcOnmQKSnO1VKrfV0zCvtttPZUsBvjmNDn8rpcJfpwSYnHBjc95MQ==",
      "license": "Apache-2.0",
      "engines": {
        "node": ">=18.18.0"
      }
    },
    "node_modules/iconv-lite": {
      "version": "0.7.3",
      "resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.7.3.tgz",
      "integrity": "sha512-IKXpvIzjnC9XTAUbVBcMfGS0EPaIXtW6v+zr+RRp+hqULEpo0owZax6wyRwPOJbWbzjYspQwusTsfVr0ifh4uQ==",
      "license": "MIT",
      "dependencies": {
        "safer-buffer": ">= 2.1.2 < 3.0.0"
      },
      "engines": {
        "node": ">=0.10.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/ignore": {
      "version": "5.3.2",
      "resolved": "https://registry.npmjs.org/ignore/-/ignore-5.3.2.tgz",
      "integrity": "sha512-hsBTNUqQTDwkWtcdYI2i06Y/nUBEsNEDJKjWdigLvegy8kDuJAS8uRlpkkcQpyEXL0Z/pjDy5HBmMjRCJ2gq+g==",
      "license": "MIT",
      "engines": {
        "node": ">= 4"
      }
    },
    "node_modules/import-fresh": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/import-fresh/-/import-fresh-3.3.1.tgz",
      "integrity": "sha512-TR3KfrTZTYLPB6jUjfx6MF9WcWrHL9su5TObK4ZkYgBdWKPOFoSoQIdEuTuR82pmtxH2spWG9h6etwfr1pLBqQ==",
      "license": "MIT",
      "dependencies": {
        "parent-module": "^1.0.0",
        "resolve-from": "^4.0.0"
      },
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/imurmurhash": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/imurmurhash/-/imurmurhash-0.1.4.tgz",
      "integrity": "sha512-JmXMZ6wuvDmLiHEml9ykzqO6lwFbof0GG4IkcGaENdCRDDmMVnny7s5HsIgHCbaq0w2MyPhDqkhTUgS2LU2PHA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.8.19"
      }
    },
    "node_modules/inherits": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.4.tgz",
      "integrity": "sha512-k/vGaX4/Yla3WzyMCvTQOXYeIHvqOKtnqBduzTHpzpQZzAskKMhZ2K+EnBiSM9zGSoIFeMpXKxa4dYeZIQqewQ==",
      "license": "ISC"
    },
    "node_modules/internal-slot": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/internal-slot/-/internal-slot-1.1.0.tgz",
      "integrity": "sha512-4gd7VpWNQNB4UKKCFFVcp1AVv+FMOgs9NKzjHKusc8jTMhd5eL1NqQqOpE0KzMds804/yHlglp3uxgluOqAPLw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "hasown": "^2.0.2",
        "side-channel": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/ip-address": {
      "version": "10.7.2",
      "resolved": "https://registry.npmjs.org/ip-address/-/ip-address-10.7.2.tgz",
      "integrity": "sha512-7H/2gFSIitxc0hG3nOI1glS8QLo/EHBFFLk8vEUjXY/xu0AdL8jZ9U1IzO2PUm0d2D/ofQcAifb0g6OBkt8U7w==",
      "license": "MIT",
      "engines": {
        "node": ">= 12"
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
    "node_modules/is-array-buffer": {
      "version": "3.0.5",
      "resolved": "https://registry.npmjs.org/is-array-buffer/-/is-array-buffer-3.0.5.tgz",
      "integrity": "sha512-DDfANUiiG2wC1qawP66qlTugJeL5HyzMpfr8lLK+jMQirGzNod0B12cFB/9q838Ru27sBwfw78/rdoU7RERz6A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.3",
        "get-intrinsic": "^1.2.6"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-arrayish": {
      "version": "0.2.1",
      "resolved": "https://registry.npmjs.org/is-arrayish/-/is-arrayish-0.2.1.tgz",
      "integrity": "sha512-zz06S8t0ozoDXMG+ube26zeCTNXcKIPJZJi8hBrF4idCLms4CG9QtK7qBl1boi5ODzFpjswb5JPmHCbMpjaYzg==",
      "license": "MIT"
    },
    "node_modules/is-async-function": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/is-async-function/-/is-async-function-2.1.1.tgz",
      "integrity": "sha512-9dgM/cZBnNvjzaMYHVoxxfPj2QXt22Ev7SuuPrs+xav0ukGB0S6d4ydZdEiM48kLx5kDV+QBPrpVnFyefL8kkQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "async-function": "^1.0.0",
        "call-bound": "^1.0.3",
        "get-proto": "^1.0.1",
        "has-tostringtag": "^1.0.2",
        "safe-regex-test": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-bigint": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/is-bigint/-/is-bigint-1.1.0.tgz",
      "integrity": "sha512-n4ZT37wG78iz03xPRKJrHTdZbe3IicyucEtdRsV5yglwc3GyUfbAfpSeD0FJ41NbUNSt5wbhqfp1fS+BgnvDFQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "has-bigints": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-boolean-object": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/is-boolean-object/-/is-boolean-object-1.2.2.tgz",
      "integrity": "sha512-wa56o2/ElJMYqjCjGkXri7it5FbebW5usLw/nPmCMs5DeZ7eziSYZhSmPRn0txqeW4LnAmQQU7FgqLpsEFKM4A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "has-tostringtag": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-bun-module": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/is-bun-module/-/is-bun-module-2.0.0.tgz",
      "integrity": "sha512-gNCGbnnnnFAUGKeZ9PdbyeGYJqewpmc2aKHUEMO5nQPWU9lOmv7jcmQIv+qHD8fXW6W7qfuCwX4rY9LNRjXrkQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "semver": "^7.7.1"
      }
    },
    "node_modules/is-bun-module/node_modules/semver": {
      "version": "7.8.5",
      "resolved": "https://registry.npmjs.org/semver/-/semver-7.8.5.tgz",
      "integrity": "sha512-Y7/KDsb8LjooZpwaqGyulO6DQlksgCncchHGk+sZIY4SBvUocMBEFH5Ur1fI4dV+Jvl0w6cjvucaIi40puRioA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/is-callable": {
      "version": "1.2.7",
      "resolved": "https://registry.npmjs.org/is-callable/-/is-callable-1.2.7.tgz",
      "integrity": "sha512-1BC0BVFhS/p0qtw6enp8e+8OD0UrK0oFLztSjNzhcKA3WDuJxxAPXzPuPtKkjEY9UUoEWlX/8fgKeu2S8i9JTA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-core-module": {
      "version": "2.17.0",
      "resolved": "https://registry.npmjs.org/is-core-module/-/is-core-module-2.17.0.tgz",
      "integrity": "sha512-J/vG0zBCbIKOQFfufSwyXdMrsohyJIUNkrnmo6WZGzoM7tr/lsbfW5b2BvisL6zsyMzK9UxV9L6c7AoFbyXHOA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "hasown": "^2.0.4"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-data-view": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/is-data-view/-/is-data-view-1.0.2.tgz",
      "integrity": "sha512-RKtWF8pGmS87i2D6gqQu/l7EYRlVdfzemCJN/P3UOs//x1QE7mfhvzHIApBTRf7axvT6DMGwSwBXYCT0nfB9xw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "get-intrinsic": "^1.2.6",
        "is-typed-array": "^1.1.13"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-date-object": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/is-date-object/-/is-date-object-1.1.0.tgz",
      "integrity": "sha512-PwwhEakHVKTdRNVOw+/Gyh0+MzlCl4R6qKvkhuvLtPMggI1WAHt9sOwZxQLSGpUaDnrdyDsomoRgNnCfKNSXXg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "has-tostringtag": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-docker": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/is-docker/-/is-docker-3.0.0.tgz",
      "integrity": "sha512-eljcgEDlEns/7AXFosB5K/2nCM4P7FQPkGc/DWLy5rmFEWvZayGrik1d9/QIY5nJ4f9YsVvBkA6kJpHn9rISdQ==",
      "license": "MIT",
      "bin": {
        "is-docker": "cli.js"
      },
      "engines": {
        "node": "^12.20.0 || ^14.13.1 || >=16.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/is-document.all": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/is-document.all/-/is-document.all-1.0.0.tgz",
      "integrity": "sha512-+XSoyS05OdBbhFuELhgTCpFNHkpBOJqtsZfUFFpe5QTw+9Sjbh8zitxhQkYAo6wV7e1Vb8cAPvpCk9jGam/82g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.4"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-extglob": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
      "integrity": "sha512-SbKbANkN603Vi4jEZv49LeVJMn4yGwsbzZworEoyEiutsN3nJYdbO36zfhGJ6QEDpOZIFkDtnq5JRxmvl3jsoQ==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-finalizationregistry": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/is-finalizationregistry/-/is-finalizationregistry-1.1.1.tgz",
      "integrity": "sha512-1pC6N8qWJbWoPtEjgcL2xyhQOP491EQjeUo3qTKcmV8YSDDJrOepfG8pcC7h/QgnQHYSv0mJ3Z/ZWxmatVrysg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-generator-function": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/is-generator-function/-/is-generator-function-1.1.2.tgz",
      "integrity": "sha512-upqt1SkGkODW9tsGNG5mtXTXtECizwtS2kA161M+gJPc1xdb/Ax629af6YrTwcOeQHbewrPNlE5Dx7kzvXTizA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.4",
        "generator-function": "^2.0.0",
        "get-proto": "^1.0.1",
        "has-tostringtag": "^1.0.2",
        "safe-regex-test": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-glob": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.3.tgz",
      "integrity": "sha512-xelSayHH36ZgE7ZWhli7pW34hNbNl8Ojv5KVmkJD4hBdD3th8Tfk9vYasLM+mXWOZhFkgZfxhLSnrwRr4elSSg==",
      "license": "MIT",
      "dependencies": {
        "is-extglob": "^2.1.1"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-in-ssh": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/is-in-ssh/-/is-in-ssh-1.0.0.tgz",
      "integrity": "sha512-jYa6Q9rH90kR1vKB6NM7qqd1mge3Fx4Dhw5TVlK1MUBqhEOuCagrEHMevNuCcbECmXZ0ThXkRm+Ymr51HwEPAw==",
      "license": "MIT",
      "engines": {
        "node": ">=20"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/is-inside-container": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/is-inside-container/-/is-inside-container-1.0.0.tgz",
      "integrity": "sha512-KIYLCCJghfHZxqjYBE7rEy0OBuTd5xCHS7tHVgvCLkx7StIoaxwNW3hCALgEUjFfeRk+MG/Qxmp/vtETEF3tRA==",
      "license": "MIT",
      "dependencies": {
        "is-docker": "^3.0.0"
      },
      "bin": {
        "is-inside-container": "cli.js"
      },
      "engines": {
        "node": ">=14.16"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/is-interactive": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/is-interactive/-/is-interactive-2.0.0.tgz",
      "integrity": "sha512-qP1vozQRI+BMOPcjFzrjXuQvdak2pHNUMZoeG2eRbiSqyvbEf/wQtEOTOX1guk6E3t36RkaqiSt8A/6YElNxLQ==",
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/is-map": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/is-map/-/is-map-2.0.3.tgz",
      "integrity": "sha512-1Qed0/Hr2m+YqxnM09CjA2d/i6YZNfF6R2oRAOj36eUdS6qIV/huPJNSEpKbupewFs+ZsJlxsjjPbc0/afW6Lw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-negative-zero": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/is-negative-zero/-/is-negative-zero-2.0.3.tgz",
      "integrity": "sha512-5KoIu2Ngpyek75jXodFvnafB6DJgr3u8uuK0LEZJjrU19DrMD3EVERaR8sjz8CCGgpZvxPl9SuE1GMVPFHx1mw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-number": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/is-number/-/is-number-7.0.0.tgz",
      "integrity": "sha512-41Cifkg6e8TylSpdtTpeLVMqvSBEVzTttHvERD741+pnZ8ANv0004MRL43QKPDlK9cGvNp6NZWZUBlbGXYxxng==",
      "license": "MIT",
      "engines": {
        "node": ">=0.12.0"
      }
    },
    "node_modules/is-number-object": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/is-number-object/-/is-number-object-1.1.1.tgz",
      "integrity": "sha512-lZhclumE1G6VYD8VHe35wFaIif+CTy5SJIi5+3y4psDgWu4wPDoBhF8NxUOinEc7pHgiTsT6MaBb92rKhhD+Xw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "has-tostringtag": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-obj": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/is-obj/-/is-obj-2.0.0.tgz",
      "integrity": "sha512-drqDG3cbczxxEJRoOXcOjtdp1J/lyp1mNn0xaznRs8+muBhgQcrnbspox5X5fOw0HnMnbfDzvnEMEtqDEJEo8w==",
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/is-plain-obj": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/is-plain-obj/-/is-plain-obj-4.1.0.tgz",
      "integrity": "sha512-+Pgi+vMuUNkJyExiMBt5IlFoMyKnr5zhJ4Uspz58WOhBF5QoIZkFyNHIbBAtHwzVAgk5RtndVNsDRN61/mmDqg==",
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/is-promise": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/is-promise/-/is-promise-4.0.0.tgz",
      "integrity": "sha512-hvpoI6korhJMnej285dSg6nu1+e6uxs7zG3BYAm5byqDsgJNWwxzM6z6iZiAgQR4TJ30JmBTOwqZUw3WlyH3AQ==",
      "license": "MIT"
    },
    "node_modules/is-regex": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/is-regex/-/is-regex-1.2.1.tgz",
      "integrity": "sha512-MjYsKHO5O7mCsmRGxWcLWheFqN9DJ/2TmngvjKXihe6efViPqc274+Fx/4fYj/r03+ESvBdTXK0V6tA3rgez1g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "gopd": "^1.2.0",
        "has-tostringtag": "^1.0.2",
        "hasown": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-regexp": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/is-regexp/-/is-regexp-3.1.0.tgz",
      "integrity": "sha512-rbku49cWloU5bSMI+zaRaXdQHXnthP6DZ/vLnfdSKyL4zUzuWnomtOEiZZOd+ioQ+avFo/qau3KPTc7Fjy1uPA==",
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/is-set": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/is-set/-/is-set-2.0.3.tgz",
      "integrity": "sha512-iPAjerrse27/ygGLxw+EBR9agv9Y6uLeYVJMu+QNCoouJ1/1ri0mGrcWpfCqFZuzzx3WjtwxG098X+n4OuRkPg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-shared-array-buffer": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/is-shared-array-buffer/-/is-shared-array-buffer-1.0.4.tgz",
      "integrity": "sha512-ISWac8drv4ZGfwKl5slpHG9OwPNty4jOWPRIhBpxOoD+hqITiwuipOQ2bNthAzwA3B4fIjO4Nln74N0S9byq8A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-stream": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/is-stream/-/is-stream-4.0.1.tgz",
      "integrity": "sha512-Dnz92NInDqYckGEUJv689RbRiTSEHCQ7wOVeALbkOz999YpqT46yMRIGtSNl2iCL1waAZSx40+h59NV/EwzV/A==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/is-string": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/is-string/-/is-string-1.1.1.tgz",
      "integrity": "sha512-BtEeSsoaQjlSPBemMQIrY1MY0uM6vnS1g5fmufYOtnxLGUZM2178PKbhsk7Ffv58IX+ZtcvoGwccYsh0PglkAA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "has-tostringtag": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-symbol": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/is-symbol/-/is-symbol-1.1.1.tgz",
      "integrity": "sha512-9gGx6GTtCQM73BgmHQXfDmLtfjjTUDSyoxTCbp5WtoixAhfgsDirWIcVQ/IHpvI5Vgd5i/J5F7B9cN/WlVbC/w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "has-symbols": "^1.1.0",
        "safe-regex-test": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-typed-array": {
      "version": "1.1.15",
      "resolved": "https://registry.npmjs.org/is-typed-array/-/is-typed-array-1.1.15.tgz",
      "integrity": "sha512-p3EcsicXjit7SaskXHs1hA91QxgTw46Fv6EFKKGS5DRFLD8yKnohjF3hxoju94b/OcMZoQukzpPpBE9uLVKzgQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "which-typed-array": "^1.1.16"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-unicode-supported": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/is-unicode-supported/-/is-unicode-supported-2.1.0.tgz",
      "integrity": "sha512-mE00Gnza5EEB3Ds0HfMyllZzbBrmLOX3vfWoj9A9PEnTfratQ/BcaJOuMhnkhjXvb2+FkY3VuHqtAGpTPmglFQ==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/is-weakmap": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/is-weakmap/-/is-weakmap-2.0.2.tgz",
      "integrity": "sha512-K5pXYOm9wqY1RgjpL3YTkF39tni1XajUIkawTLUo9EZEVUFga5gSQJF8nNS7ZwJQ02y+1YCNYcMh+HIf1ZqE+w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-weakref": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/is-weakref/-/is-weakref-1.1.1.tgz",
      "integrity": "sha512-6i9mGWSlqzNMEqpCp93KwRS1uUOodk2OJ6b+sq7ZPDSy2WuI5NFIxp/254TytR8ftefexkWn5xNiHUNpPOfSew==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-weakset": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/is-weakset/-/is-weakset-2.0.4.tgz",
      "integrity": "sha512-mfcwb6IzQyOKTs84CQMrOwW4gQcaTOAWJ0zzJCl2WSPDrWk/OzDaImWFH3djXhb24g4eudZfLRozAvPGw4d9hQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "get-intrinsic": "^1.2.6"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-wsl": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/is-wsl/-/is-wsl-3.1.1.tgz",
      "integrity": "sha512-e6rvdUCiQCAuumZslxRJWR/Doq4VpPR82kqclvcS0efgt430SlGIk05vdCN58+VrzgtIcfNODjozVielycD4Sw==",
      "license": "MIT",
      "dependencies": {
        "is-inside-container": "^1.0.0"
      },
      "engines": {
        "node": ">=16"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/isarray": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/isarray/-/isarray-2.0.5.tgz",
      "integrity": "sha512-xHjhDr3cNBK0BzdUJSPXZntQUx/mwMS5Rw4A7lPJ90XGAO6ISP/ePDNuo0vhqOZU+UD5JoodwCAAoZQd3FeAKw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/isexe": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/isexe/-/isexe-2.0.0.tgz",
      "integrity": "sha512-RHxMLp9lnKHGHRng9QFhRCMbYAcVpn69smSGcq3f36xjgVVWThj4qqLbTLlq7Ssj8B+fIQ1EuCEGI2lKsyQeIw==",
      "license": "ISC"
    },
    "node_modules/iterator.prototype": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/iterator.prototype/-/iterator.prototype-1.1.5.tgz",
      "integrity": "sha512-H0dkQoCa3b2VEeKQBOxFph+JAbcrQdE7KC0UkqwpLmv2EC4P41QXP+rqo9wYodACiG5/WM5s9oDApTU8utwj9g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "define-data-property": "^1.1.4",
        "es-object-atoms": "^1.0.0",
        "get-intrinsic": "^1.2.6",
        "get-proto": "^1.0.0",
        "has-symbols": "^1.1.0",
        "set-function-name": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/jiti": {
      "version": "2.7.0",
      "resolved": "https://registry.npmjs.org/jiti/-/jiti-2.7.0.tgz",
      "integrity": "sha512-AC/7JofJvZGrrneWNaEnJeOLUx+JlGt7tNa0wZiRPT4MY1wmfKjt2+6O2p2uz2+skll8OZZmJMNqeke7kKbNgQ==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "jiti": "lib/jiti-cli.mjs"
      }
    },
    "node_modules/jose": {
      "version": "6.2.12",
      "resolved": "https://registry.npmjs.org/jose/-/jose-6.2.12.tgz",
      "integrity": "sha512-9NiFmJEex0sy2Dk58j2UGBSHgUs2ypF9eZSu4L6vjOX3Dp96Sw1F3uL+H+D1sx02jZZdzUT0HgvCy59CuvXcWw==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/panva"
      }
    },
    "node_modules/js-tokens": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
      "integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ==",
      "license": "MIT"
    },
    "node_modules/js-yaml": {
      "version": "4.3.2",
      "resolved": "https://registry.npmjs.org/js-yaml/-/js-yaml-4.3.2.tgz",
      "integrity": "sha512-SFNOvSJ+Dgf/9An904Yx+CgSlIPCkIpao4qo51lpee25TIRejdH3rhR4EZMGoNx3/TP3O+wzWuiTFl4sqbltzA==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/puzrin"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/nodeca"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "argparse": "^2.0.1"
      },
      "bin": {
        "js-yaml": "bin/js-yaml.js"
      }
    },
    "node_modules/jsesc": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/jsesc/-/jsesc-3.1.0.tgz",
      "integrity": "sha512-/sM3dO2FOzXjKQhJuo0Q173wf2KOo8t4I8vHy6lF9poUp7bKT0/NHE8fPX23PwfhnykfqnC2xRxOnVw5XuGIaA==",
      "license": "MIT",
      "bin": {
        "jsesc": "bin/jsesc"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/json-buffer": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/json-buffer/-/json-buffer-3.0.1.tgz",
      "integrity": "sha512-4bV5BfR2mqfQTJm+V5tPPdf+ZpuhiIvTuAB5g8kcrXOZpTT/QwwVRWBywX1ozr6lEuPdbHxwaJlm9G6mI2sfSQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json-parse-even-better-errors": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/json-parse-even-better-errors/-/json-parse-even-better-errors-2.3.1.tgz",
      "integrity": "sha512-xyFwyhro/JEof6Ghe2iz2NcXoj2sloNsWr/XsERDK/oiPCfaNhl5ONfp+jQdAZRQQ0IJWNzH9zIZF7li91kh2w==",
      "license": "MIT"
    },
    "node_modules/json-schema-traverse": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/json-schema-traverse/-/json-schema-traverse-1.0.0.tgz",
      "integrity": "sha512-NM8/P9n3XjXhIZn1lLhkFaACTOURQXjWhV4BA/RnOv8xvgqtqpAX9IO4mRQxSx1Rlo4tqzeqb0sOlruaOy3dug==",
      "license": "MIT"
    },
    "node_modules/json-schema-typed": {
      "version": "8.0.2",
      "resolved": "https://registry.npmjs.org/json-schema-typed/-/json-schema-typed-8.0.2.tgz",
      "integrity": "sha512-fQhoXdcvc3V28x7C7BMs4P5+kNlgUURe2jmUT1T//oBRMDrqy1QPelJimwZGo7Hg9VPV3EQV5Bnq4hbFy2vetA==",
      "license": "BSD-2-Clause"
    },
    "node_modules/json-stable-stringify-without-jsonify": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/json-stable-stringify-without-jsonify/-/json-stable-stringify-without-jsonify-1.0.1.tgz",
      "integrity": "sha512-Bdboy+l7tA3OGW6FjyFHWkP5LuByj1Tk33Ljyq0axyzdk9//JSi2u3fP1QSmd1KNwq6VOKYGlAu87CisVir6Pw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json5": {
      "version": "2.2.3",
      "resolved": "https://registry.npmjs.org/json5/-/json5-2.2.3.tgz",
      "integrity": "sha512-XmOWe7eyHYH14cLdVPoyg+GOH3rYX++KpzrylJwSW98t3Nk+U8XOl8FWKOgwtzdb8lXGf6zYwDUzeHMWfxasyg==",
      "license": "MIT",
      "bin": {
        "json5": "lib/cli.js"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/jsonfile": {
      "version": "6.2.1",
      "resolved": "https://registry.npmjs.org/jsonfile/-/jsonfile-6.2.1.tgz",
      "integrity": "sha512-zwOTdL3rFQ/lRdBnntKVOX6k5cKJwEc1HdilT71BWEu7J41gXIB2MRp+vxduPSwZJPWBxEzv4yH1wYLJGUHX4Q==",
      "license": "MIT",
      "dependencies": {
        "universalify": "^2.0.0"
      },
      "optionalDependencies": {
        "graceful-fs": "^4.1.6"
      }
    },
    "node_modules/jsx-ast-utils": {
      "version": "3.3.5",
      "resolved": "https://registry.npmjs.org/jsx-ast-utils/-/jsx-ast-utils-3.3.5.tgz",
      "integrity": "sha512-ZZow9HBI5O6EPgSJLUb8n2NKgmVWTwCvHGwFuJlMjvLFqlGG6pjirPhtdsseaLZjSibD8eegzmYpUZwoIlj2cQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "array-includes": "^3.1.6",
        "array.prototype.flat": "^1.3.1",
        "object.assign": "^4.1.4",
        "object.values": "^1.1.6"
      },
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/keyv": {
      "version": "4.5.4",
      "resolved": "https://registry.npmjs.org/keyv/-/keyv-4.5.4.tgz",
      "integrity": "sha512-oxVHkHR/EJf2CNXnWxRLW6mg7JyCCUcG0DtEGmL2ctUo1PNTin1PUil+r/+4r5MpVgC/fn1kjsx7mjSujKqIpw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "json-buffer": "3.0.1"
      }
    },
    "node_modules/kleur": {
      "version": "4.1.5",
      "resolved": "https://registry.npmjs.org/kleur/-/kleur-4.1.5.tgz",
      "integrity": "sha512-o+NO+8WrRiQEE4/7nwRJhN1HWpVmJm511pBHUxPLtp0BUISzlBplORYSmTclCnJvQq2tKu/sgl3xVpkc7ZWuQQ==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/language-subtag-registry": {
      "version": "0.3.23",
      "resolved": "https://registry.npmjs.org/language-subtag-registry/-/language-subtag-registry-0.3.23.tgz",
      "integrity": "sha512-0K65Lea881pHotoGEa5gDlMxt3pctLi2RplBb7Ezh4rRdLEOtgi7n4EwK9lamnUCkKBqaeKRVebTq6BAxSkpXQ==",
      "dev": true,
      "license": "CC0-1.0"
    },
    "node_modules/language-tags": {
      "version": "1.0.9",
      "resolved": "https://registry.npmjs.org/language-tags/-/language-tags-1.0.9.tgz",
      "integrity": "sha512-MbjN408fEndfiQXbFQ1vnd+1NoLDsnQW41410oQBXiyXDMYH5z505juWa4KUE1LqxRC7DgOgZDbKLxHIwm27hA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "language-subtag-registry": "^0.3.20"
      },
      "engines": {
        "node": ">=0.10"
      }
    },
    "node_modules/levn": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/levn/-/levn-0.4.1.tgz",
      "integrity": "sha512-+bT2uH4E5LGE7h/n3evcS/sQlJXCpIp6ym8OWJ5eV6+67Dsql/LaaT7qJBAt2rzfoa/5QBGBhxDix1dMt2kQKQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "prelude-ls": "^1.2.1",
        "type-check": "~0.4.0"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/lightningcss": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss/-/lightningcss-1.32.0.tgz",
      "integrity": "sha512-NXYBzinNrblfraPGyrbPoD19C1h9lfI/1mzgWYvXUTe414Gz/X1FD2XBZSZM7rRTrMA8JL3OtAaGifrIKhQ5yQ==",
      "dev": true,
      "license": "MPL-2.0",
      "dependencies": {
        "detect-libc": "^2.0.3"
      },
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      },
      "optionalDependencies": {
        "lightningcss-android-arm64": "1.32.0",
        "lightningcss-darwin-arm64": "1.32.0",
        "lightningcss-darwin-x64": "1.32.0",
        "lightningcss-freebsd-x64": "1.32.0",
        "lightningcss-linux-arm-gnueabihf": "1.32.0",
        "lightningcss-linux-arm64-gnu": "1.32.0",
        "lightningcss-linux-arm64-musl": "1.32.0",
        "lightningcss-linux-x64-gnu": "1.32.0",
        "lightningcss-linux-x64-musl": "1.32.0",
        "lightningcss-win32-arm64-msvc": "1.32.0",
        "lightningcss-win32-x64-msvc": "1.32.0"
      }
    },
    "node_modules/lightningcss-android-arm64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-android-arm64/-/lightningcss-android-arm64-1.32.0.tgz",
      "integrity": "sha512-YK7/ClTt4kAK0vo6w3X+Pnm0D2cf2vPHbhOXdoNti1Ga0al1P4TBZhwjATvjNwLEBCnKvjJc2jQgHXH0NEwlAg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-darwin-arm64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-arm64/-/lightningcss-darwin-arm64-1.32.0.tgz",
      "integrity": "sha512-RzeG9Ju5bag2Bv1/lwlVJvBE3q6TtXskdZLLCyfg5pt+HLz9BqlICO7LZM7VHNTTn/5PRhHFBSjk5lc4cmscPQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-darwin-x64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-x64/-/lightningcss-darwin-x64-1.32.0.tgz",
      "integrity": "sha512-U+QsBp2m/s2wqpUYT/6wnlagdZbtZdndSmut/NJqlCcMLTWp5muCrID+K5UJ6jqD2BFshejCYXniPDbNh73V8w==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-freebsd-x64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-freebsd-x64/-/lightningcss-freebsd-x64-1.32.0.tgz",
      "integrity": "sha512-JCTigedEksZk3tHTTthnMdVfGf61Fky8Ji2E4YjUTEQX14xiy/lTzXnu1vwiZe3bYe0q+SpsSH/CTeDXK6WHig==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm-gnueabihf": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm-gnueabihf/-/lightningcss-linux-arm-gnueabihf-1.32.0.tgz",
      "integrity": "sha512-x6rnnpRa2GL0zQOkt6rts3YDPzduLpWvwAF6EMhXFVZXD4tPrBkEFqzGowzCsIWsPjqSK+tyNEODUBXeeVHSkw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm64-gnu": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-gnu/-/lightningcss-linux-arm64-gnu-1.32.0.tgz",
      "integrity": "sha512-0nnMyoyOLRJXfbMOilaSRcLH3Jw5z9HDNGfT/gwCPgaDjnx0i8w7vBzFLFR1f6CMLKF8gVbebmkUN3fa/kQJpQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm64-musl": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-musl/-/lightningcss-linux-arm64-musl-1.32.0.tgz",
      "integrity": "sha512-UpQkoenr4UJEzgVIYpI80lDFvRmPVg6oqboNHfoH4CQIfNA+HOrZ7Mo7KZP02dC6LjghPQJeBsvXhJod/wnIBg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-x64-gnu": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-gnu/-/lightningcss-linux-x64-gnu-1.32.0.tgz",
      "integrity": "sha512-V7Qr52IhZmdKPVr+Vtw8o+WLsQJYCTd8loIfpDaMRWGUZfBOYEJeyJIkqGIDMZPwPx24pUMfwSxxI8phr/MbOA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-x64-musl": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-musl/-/lightningcss-linux-x64-musl-1.32.0.tgz",
      "integrity": "sha512-bYcLp+Vb0awsiXg/80uCRezCYHNg1/l3mt0gzHnWV9XP1W5sKa5/TCdGWaR/zBM2PeF/HbsQv/j2URNOiVuxWg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-win32-arm64-msvc": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-arm64-msvc/-/lightningcss-win32-arm64-msvc-1.32.0.tgz",
      "integrity": "sha512-8SbC8BR40pS6baCM8sbtYDSwEVQd4JlFTOlaD3gWGHfThTcABnNDBda6eTZeqbofalIJhFx0qKzgHJmcPTnGdw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-win32-x64-msvc": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-x64-msvc/-/lightningcss-win32-x64-msvc-1.32.0.tgz",
      "integrity": "sha512-Amq9B/SoZYdDi1kFrojnoqPLxYhQ4Wo5XiL8EVJrVsB8ARoC1PWW6VGtT0WKCemjy8aC+louJnjS7U18x3b06Q==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lines-and-columns": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/lines-and-columns/-/lines-and-columns-1.2.4.tgz",
      "integrity": "sha512-7ylylesZQ/PV29jhEDl3Ufjo6ZX7gCqJr5F7PKrqc93v7fzSymt1BpwEU8nAUXs8qzzvqhbjhK5QZg6Mt/HkBg==",
      "license": "MIT"
    },
    "node_modules/locate-path": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-6.0.0.tgz",
      "integrity": "sha512-iPZK6eYjbxRu3uB4/WZ3EsEIMJFMqAoopl3R+zuq0UjcAm/MO6KCweDgPfP3elTztoKP3KtnVHxTn2NHBSDVUw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "p-locate": "^5.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/lodash.merge": {
      "version": "4.6.2",
      "resolved": "https://registry.npmjs.org/lodash.merge/-/lodash.merge-4.6.2.tgz",
      "integrity": "sha512-0KpjqXRVvrYyCsX1swR/XTK0va6VQkQM6MNo7PqW77ByjAhoARA8EfrP1N4+KlKj8YS0ZUCtRT/YUuhyYDujIQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/log-symbols": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/log-symbols/-/log-symbols-6.0.0.tgz",
      "integrity": "sha512-i24m8rpwhmPIS4zscNzK6MSEhk0DUWa/8iYQWxhffV8jkI4Phvs3F+quL5xvS0gdQR0FyTCMMH33Y78dDTzzIw==",
      "license": "MIT",
      "dependencies": {
        "chalk": "^5.3.0",
        "is-unicode-supported": "^1.3.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/log-symbols/node_modules/chalk": {
      "version": "5.6.2",
      "resolved": "https://registry.npmjs.org/chalk/-/chalk-5.6.2.tgz",
      "integrity": "sha512-7NzBL0rN6fMUW+f7A6Io4h40qQlG+xGmtMxfbnH/K7TAtt8JQWVQK+6g0UXKMeVJoyV5EkkNsErQ8pVD3bLHbA==",
      "license": "MIT",
      "engines": {
        "node": "^12.17.0 || ^14.13 || >=16.0.0"
      },
      "funding": {
        "url": "https://github.com/chalk/chalk?sponsor=1"
      }
    },
    "node_modules/log-symbols/node_modules/is-unicode-supported": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/is-unicode-supported/-/is-unicode-supported-1.3.0.tgz",
      "integrity": "sha512-43r2mRvz+8JRIKnWJ+3j8JtjRKZ6GmjzfaE/qiBJnikNnYv/6bagRJ1kUhNk8R5EX/GkobD+r+sfxCPJsiKBLQ==",
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/loose-envify": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/loose-envify/-/loose-envify-1.4.0.tgz",
      "integrity": "sha512-lyuxPGr/Wfhrlem2CL/UcnUc1zcqKAImBDzukY7Y5F/yQiNdko6+fRLevlw1HgMySw7f611UIY408EtxRSoK3Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "js-tokens": "^3.0.0 || ^4.0.0"
      },
      "bin": {
        "loose-envify": "cli.js"
      }
    },
    "node_modules/lru-cache": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-5.1.1.tgz",
      "integrity": "sha512-KpNARQA3Iwv+jTA0utUVVbrh+Jlrr1Fv0e56GGzAFOXN7dk/FviaDW8LHmK52DlcH4WP2n6gI8vN1aesBFgo9w==",
      "license": "ISC",
      "dependencies": {
        "yallist": "^3.0.2"
      }
    },
    "node_modules/lucide-react": {
      "version": "1.49.0",
      "resolved": "https://registry.npmjs.org/lucide-react/-/lucide-react-1.49.0.tgz",
      "integrity": "sha512-ApfaNM4/7jBrVopqLJ84Jz8TMQ1Q1JeZ1PmKh25aeS3E1FTVcMkSh1bEQB7dfzdIrwXRP8p3z4AJjTIHHb5IIA==",
      "license": "ISC",
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.5.1 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/magic-string": {
      "version": "0.30.21",
      "resolved": "https://registry.npmjs.org/magic-string/-/magic-string-0.30.21.tgz",
      "integrity": "sha512-vd2F4YUyEXKGcLHoq+TEyCjxueSeHnFxyyjNp80yg0XV4vUhnDer/lvvlqM/arB5bXQN5K2/3oinyCRyx8T2CQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.5"
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
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/media-typer/-/media-typer-1.1.1.tgz",
      "integrity": "sha512-yz3xRaG20c6/BOzvYoDaGtPmGscs7YivItZEEqe6GbwNfHuxu9YNmvnEkMzKldAGY4/80pRcQRZSEnhquk9XuQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/merge-descriptors": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/merge-descriptors/-/merge-descriptors-2.0.0.tgz",
      "integrity": "sha512-Snk314V5ayFLhp3fkUREub6WtjBfPdCPY1Ln8/8munuLuiYhsABgBVWsozAG+MWMbVEvcdcpbi9R7ww22l9Q3g==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/merge-stream": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/merge-stream/-/merge-stream-2.0.0.tgz",
      "integrity": "sha512-abv/qOcuPfk3URPfDzmZU1LKmuw8kT+0nIHvKrKgFrwifol/doWcdA4ZqsWQ8ENrFKkd67Mfpo/LovbIUsbt3w==",
      "license": "MIT"
    },
    "node_modules/merge2": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/merge2/-/merge2-1.4.1.tgz",
      "integrity": "sha512-8q7VEgMJW4J8tcfVPy8g09NcQwZdbwFEqhe/WZkoIzjn/3TGDwtOCYtXGxA3O8tPzpczCCDgv+P2P5y00ZJOOg==",
      "license": "MIT",
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/micromatch": {
      "version": "4.0.8",
      "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-4.0.8.tgz",
      "integrity": "sha512-PXwfBhYu0hBCPw8Dn0E+WDYb7af3dSLVWKi3HGv84IdF4TyFoC0ysxFd0Goxw7nSv4T/PzEJQxsYsEiFCKo2BA==",
      "license": "MIT",
      "dependencies": {
        "braces": "^3.0.3",
        "picomatch": "^2.3.1"
      },
      "engines": {
        "node": ">=8.6"
      }
    },
    "node_modules/mime-db": {
      "version": "1.54.0",
      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.54.0.tgz",
      "integrity": "sha512-aU5EJuIN2WDemCcAp2vFBfp/m4EAhWJnUNSSw0ixs7/kXbd6Pg64EmwJkNdFhB8aWt1sH2CTXrLxo/iAGV3oPQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/mime-types": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-3.0.2.tgz",
      "integrity": "sha512-Lbgzdk0h4juoQ9fCKXW4by0UJqj+nOOrI9MJ1sSj4nI8aI2eo1qmvQEie4VD1glsS250n15LsWsYtCugiStS5A==",
      "license": "MIT",
      "dependencies": {
        "mime-db": "^1.54.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/mimic-fn": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/mimic-fn/-/mimic-fn-3.1.0.tgz",
      "integrity": "sha512-Ysbi9uYW9hFyfrThdDEQuykN4Ey6BuwPD2kpI5ES/nFTDn/98yxYNLZJcgUAKPT/mcrLLKaGzJR9YVxJrIdASQ==",
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/mimic-function": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/mimic-function/-/mimic-function-5.0.1.tgz",
      "integrity": "sha512-VP79XUPxV2CigYP3jWwAUFSku2aKqBH7uTAapFWCBqutsbmDo96KY5o8uh6U+/YSIn5OxJnXp73beVkpqMIGhA==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/minimatch": {
      "version": "3.1.5",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-3.1.5.tgz",
      "integrity": "sha512-VgjWUsnnT6n+NUk6eZq77zeFdpW2LWDzP6zFGrCbHXiYNul5Dzqk2HHQ5uFH2DNW5Xbp8+jVzaeNt94ssEEl4w==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "brace-expansion": "^1.1.7"
      },
      "engines": {
        "node": "*"
      }
    },
    "node_modules/minimist": {
      "version": "1.2.8",
      "resolved": "https://registry.npmjs.org/minimist/-/minimist-1.2.8.tgz",
      "integrity": "sha512-2yyAR8qBkN3YuheJanUpWC5U3bb5osDywNB8RzDVlDwDHbocAJveqqj1u8+SVD7jkWT4yvsHCpWqqWqAxb0zCA==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
      "license": "MIT"
    },
    "node_modules/nanoid": {
      "version": "3.3.19",
      "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.19.tgz",
      "integrity": "sha512-Y2tUNy4ouw6tq5oDSKeQYGOyhkUBhNOcGV/02KC+6kd9eDGqdZd++mjMiIDilrBYvjEnCYvVtsuHCuP+okSfug==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "bin": {
        "nanoid": "bin/nanoid.cjs"
      },
      "engines": {
        "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
      }
    },
    "node_modules/napi-postinstall": {
      "version": "0.3.4",
      "resolved": "https://registry.npmjs.org/napi-postinstall/-/napi-postinstall-0.3.4.tgz",
      "integrity": "sha512-PHI5f1O0EP5xJ9gQmFGMS6IZcrVvTjpXjz7Na41gTE7eE2hK11lg04CECCYEEjdc17EV4DO+fkGEtt7TpTaTiQ==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "napi-postinstall": "lib/cli.js"
      },
      "engines": {
        "node": "^12.20.0 || ^14.18.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/napi-postinstall"
      }
    },
    "node_modules/natural-compare": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/natural-compare/-/natural-compare-1.4.0.tgz",
      "integrity": "sha512-OWND8ei3VtNC9h7V60qff3SVobHr996CTwgxubgyQYEpg290h9J0buyECNNJexkFm5sOajh5G116RYA1c8ZMSw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/negotiator": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/negotiator/-/negotiator-1.1.0.tgz",
      "integrity": "sha512-NMPBRMJgiQHjbd8phG3Vebdx4kZ1H121rbl5IkMqeOsahptB9BKo/d7oJ3zTXqTgagn2bWlNSXkh0QUGM31RYg==",
      "license": "MIT",
      "dependencies": {
        "content-type": "^2.1.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/negotiator/node_modules/content-type": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/content-type/-/content-type-2.1.0.tgz",
      "integrity": "sha512-mj7UPXE0jaqaOsukNZRUEfEi2AcL7C/vwmwcHV0O97eO1E1pxBZuyjlZrx5seTaNBg1U6+o35wpa35Qfcc+7ag==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/next": {
      "version": "16.3.6",
      "resolved": "https://registry.npmjs.org/next/-/next-16.3.6.tgz",
      "integrity": "sha512-L+otWM/aQbYTx98aZhgEoMb4bZAXx1YVW4UMA/vuCyCoWG5HJyZUili8QAkqzrcC+5///tsz3s0M+SlyB5bLMw==",
      "license": "MIT",
      "dependencies": {
        "@next/env": "16.3.6",
        "@swc/helpers": "0.5.23",
        "baseline-browser-mapping": "^2.9.19",
        "caniuse-lite": "^1.0.30001579",
        "postcss": "8.5.23",
        "styled-jsx": "5.1.6"
      },
      "bin": {
        "next": "dist/bin/next"
      },
      "engines": {
        "node": ">=20.9.0"
      },
      "optionalDependencies": {
        "@next/swc-darwin-arm64": "16.3.6",
        "@next/swc-darwin-x64": "16.3.6",
        "@next/swc-linux-arm64-gnu": "16.3.6",
        "@next/swc-linux-arm64-musl": "16.3.6",
        "@next/swc-linux-x64-gnu": "16.3.6",
        "@next/swc-linux-x64-musl": "16.3.6",
        "@next/swc-win32-arm64-msvc": "16.3.6",
        "@next/swc-win32-x64-msvc": "16.3.6",
        "sharp": "^0.35.4"
      },
      "peerDependencies": {
        "@opentelemetry/api": "^1.1.0",
        "@playwright/test": "^1.51.1",
        "babel-plugin-react-compiler": "*",
        "react": "^18.2.0 || 19.0.0-rc-de68d2f4-20241204 || ^19.0.0",
        "react-dom": "^18.2.0 || 19.0.0-rc-de68d2f4-20241204 || ^19.0.0",
        "sass": "^1.3.0"
      },
      "peerDependenciesMeta": {
        "@opentelemetry/api": {
          "optional": true
        },
        "@playwright/test": {
          "optional": true
        },
        "babel-plugin-react-compiler": {
          "optional": true
        },
        "sass": {
          "optional": true
        }
      }
    },
    "node_modules/next/node_modules/postcss": {
      "version": "8.5.23",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.5.23.tgz",
      "integrity": "sha512-g50586zr4bZmwFiTlflMu8E0bDTb5I5gertgwAKmsdUlTQIhZtunzUlD1WSzwcVWPoAVpsrA6vlfCD7oXvRwgg==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "nanoid": "^3.3.16",
        "picocolors": "^1.1.1",
        "source-map-js": "^1.2.1"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/node-exports-info": {
      "version": "1.6.2",
      "resolved": "https://registry.npmjs.org/node-exports-info/-/node-exports-info-1.6.2.tgz",
      "integrity": "sha512-kXs9Go0cah0qHVV2v389IXQLdLCeE1xfFtjOAF+iobu0OIoG1pje8At2vMHyaPMiPMnG/LWP50twML21eMcAag==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "array.prototype.flatmap": "^1.3.3",
        "es-errors": "^1.3.0",
        "object.entries": "^1.1.9",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/node-releases": {
      "version": "2.0.57",
      "resolved": "https://registry.npmjs.org/node-releases/-/node-releases-2.0.57.tgz",
      "integrity": "sha512-kQK9LGGFiHtrWiNhZtA7Qbw17AQz+dmsEKODRIVTXA9+e5MS/2gZEBhYJt13GrAz5/IOZKddH/0Z3TP/Zgo+yw==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/npm-run-path": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/npm-run-path/-/npm-run-path-6.0.0.tgz",
      "integrity": "sha512-9qny7Z9DsQU8Ou39ERsPU4OZQlSTP47ShQzuKZ6PRXpYLtIFgl/DEBYEXKlvcEa+9tHVcK8CF81Y2V72qaZhWA==",
      "license": "MIT",
      "dependencies": {
        "path-key": "^4.0.0",
        "unicorn-magic": "^0.3.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/npm-run-path/node_modules/path-key": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/path-key/-/path-key-4.0.0.tgz",
      "integrity": "sha512-haREypq7xkM7ErfgIyA0z+Bj4AGKlMSdlQE2jvJo6huWD1EdkKYV+G/T4nq0YEF2vgTT8kqMFKo1uHn950r4SQ==",
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
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
    "node_modules/object-keys": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/object-keys/-/object-keys-1.1.1.tgz",
      "integrity": "sha512-NuAESUOUMrlIXOfHKzD6bpPu3tYt3xvjNdRIQ+FeT0lNb4K8WR70CaDxhuNguS2XG+GjkyMwOzsN5ZktImfhLA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/object-treeify": {
      "version": "1.1.33",
      "resolved": "https://registry.npmjs.org/object-treeify/-/object-treeify-1.1.33.tgz",
      "integrity": "sha512-EFVjAYfzWqWsBMRHPMAXLCDIJnpMhdWAqR7xG6M6a2cs6PMFpl/+Z20w9zDW4vkxOFfddegBKq9Rehd0bxWE7A==",
      "license": "MIT",
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/object.assign": {
      "version": "4.1.7",
      "resolved": "https://registry.npmjs.org/object.assign/-/object.assign-4.1.7.tgz",
      "integrity": "sha512-nK28WOo+QIjBkDduTINE4JkF/UJJKyf2EJxvJKfblDpyg0Q+pkOHNTL0Qwy6NP6FhE/EnzV73BxxqcJaXY9anw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.3",
        "define-properties": "^1.2.1",
        "es-object-atoms": "^1.0.0",
        "has-symbols": "^1.1.0",
        "object-keys": "^1.1.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/object.entries": {
      "version": "1.1.9",
      "resolved": "https://registry.npmjs.org/object.entries/-/object.entries-1.1.9.tgz",
      "integrity": "sha512-8u/hfXFRBD1O0hPUjioLhoWFHRmt6tKA4/vZPyckBr18l1KE9uHrFaFaUi8MDRTpi4uak2goyPTSNJLXX2k2Hw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.4",
        "define-properties": "^1.2.1",
        "es-object-atoms": "^1.1.1"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/object.fromentries": {
      "version": "2.0.8",
      "resolved": "https://registry.npmjs.org/object.fromentries/-/object.fromentries-2.0.8.tgz",
      "integrity": "sha512-k6E21FzySsSK5a21KRADBd/NGneRegFO5pLHfdQLpRDETUNJueLXs3WCzyQ3tFRDYgbq3KHGXfTbi2bs8WQ6rQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.7",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.2",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/object.groupby": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/object.groupby/-/object.groupby-1.0.3.tgz",
      "integrity": "sha512-+Lhy3TQTuzXI5hevh8sBGqbmurHbbIjAi0Z4S63nthVLmLxfbj4T54a4CfZrXIrt9iP4mVAPYMo/v99taj3wjQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.7",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/object.values": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/object.values/-/object.values-1.2.1.tgz",
      "integrity": "sha512-gXah6aZrcUxjWg2zR2MwouP2eHlCBzdV4pygudehaKXSGW4v2AsRQUK+lwwXhii6KFZcunEnmSUoYp5CXibxtA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.3",
        "define-properties": "^1.2.1",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
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
    "node_modules/once": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/once/-/once-1.4.0.tgz",
      "integrity": "sha512-lNaJgI+2Q5URQBkccEKHTQOPaXdUxnZZElQTZY0MFUAuaEqe1E+Nyvgdz/aIyNi6Z9MzO5dv1H8n58/GELp3+w==",
      "license": "ISC",
      "dependencies": {
        "wrappy": "1"
      }
    },
    "node_modules/onetime": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/onetime/-/onetime-5.1.2.tgz",
      "integrity": "sha512-kbpaSSGJTWdAY5KPVeMOKXSrPtr8C8C7wodJbcsd51jRnmD+GZu8Y0VoU6Dm5Z4vWr0Ig/1NKuWRKf7j5aaYSg==",
      "license": "MIT",
      "dependencies": {
        "mimic-fn": "^2.1.0"
      },
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/onetime/node_modules/mimic-fn": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/mimic-fn/-/mimic-fn-2.1.0.tgz",
      "integrity": "sha512-OqbOk5oEQeAZ8WXWydlu9HJjz9WVdEIvamMCcXmuqUYjTknH/sqsWvhQ3vgwKFRR1HpjvNBKQ37nbJgYzGqGcg==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/open": {
      "version": "11.0.4",
      "resolved": "https://registry.npmjs.org/open/-/open-11.0.4.tgz",
      "integrity": "sha512-++Zlftm0kVLPmzC06t6epuWmcRMDbI4z5P3NNX979WA/k23+NtSOynEGzsVfZwguKw2mi5umVgnBlJQMwRz4Pg==",
      "license": "MIT",
      "dependencies": {
        "default-browser": "^5.5.1",
        "define-lazy-prop": "^3.0.0",
        "is-in-ssh": "^1.0.0",
        "is-inside-container": "^1.0.0",
        "powershell-utils": "^0.2.1",
        "wsl-utils": "^1.0.0"
      },
      "engines": {
        "node": ">=20"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/optionator": {
      "version": "0.9.4",
      "resolved": "https://registry.npmjs.org/optionator/-/optionator-0.9.4.tgz",
      "integrity": "sha512-6IpQ7mKUxRcZNLIObR0hz7lxsapSSIYNZJwXPGeF0mTVqGKFIXj1DQcMoT22S3ROcLyY/rz0PWaWZ9ayWmad9g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "deep-is": "^0.1.3",
        "fast-levenshtein": "^2.0.6",
        "levn": "^0.4.1",
        "prelude-ls": "^1.2.1",
        "type-check": "^0.4.0",
        "word-wrap": "^1.2.5"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/ora": {
      "version": "8.2.0",
      "resolved": "https://registry.npmjs.org/ora/-/ora-8.2.0.tgz",
      "integrity": "sha512-weP+BZ8MVNnlCm8c0Qdc1WSWq4Qn7I+9CJGm7Qali6g44e/PUzbjNqJX5NJ9ljlNMosfJvg1fKEGILklK9cwnw==",
      "license": "MIT",
      "dependencies": {
        "chalk": "^5.3.0",
        "cli-cursor": "^5.0.0",
        "cli-spinners": "^2.9.2",
        "is-interactive": "^2.0.0",
        "is-unicode-supported": "^2.0.0",
        "log-symbols": "^6.0.0",
        "stdin-discarder": "^0.2.2",
        "string-width": "^7.2.0",
        "strip-ansi": "^7.1.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/ora/node_modules/ansi-regex": {
      "version": "6.4.0",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-6.4.0.tgz",
      "integrity": "sha512-KzTVk2tCWAHtYrvvvaP8bJKJq2pVinhLcGEQdtLIYPbmNGNyYe8QwNaTUYQp2J7/vIsUKt5QCqAfUkYyG9DkOw==",
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-regex?sponsor=1"
      }
    },
    "node_modules/ora/node_modules/chalk": {
      "version": "5.6.2",
      "resolved": "https://registry.npmjs.org/chalk/-/chalk-5.6.2.tgz",
      "integrity": "sha512-7NzBL0rN6fMUW+f7A6Io4h40qQlG+xGmtMxfbnH/K7TAtt8JQWVQK+6g0UXKMeVJoyV5EkkNsErQ8pVD3bLHbA==",
      "license": "MIT",
      "engines": {
        "node": "^12.17.0 || ^14.13 || >=16.0.0"
      },
      "funding": {
        "url": "https://github.com/chalk/chalk?sponsor=1"
      }
    },
    "node_modules/ora/node_modules/strip-ansi": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-7.2.0.tgz",
      "integrity": "sha512-yDPMNjp4WyfYBkHnjIRLfca1i6KMyGCtsVgoKe/z1+6vukgaENdgGBZt+ZmKPc4gavvEZ5OgHfHdrazhgNyG7w==",
      "license": "MIT",
      "dependencies": {
        "ansi-regex": "^6.2.2"
      },
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/strip-ansi?sponsor=1"
      }
    },
    "node_modules/own-keys": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/own-keys/-/own-keys-1.0.2.tgz",
      "integrity": "sha512-19YVAg7T+WTrxggPukVq7DjTv6+PJ867TmhCvBsYwmbFCsZd344rq2Ld1p0wo8f8Qrrhgp82c6FJRqdXWtSEhg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.4",
        "get-intrinsic": "^1.3.0",
        "object-keys": "^1.1.1",
        "safe-push-apply": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/p-limit": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-3.1.0.tgz",
      "integrity": "sha512-TYOanM3wGwNGsZN2cVTYPArw454xnXj5qmWF1bEoAc4+cU/ol7GVh7odevjp1FNHduHc3KZMcFduxU5Xc6uJRQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "yocto-queue": "^0.1.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/p-locate": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-5.0.0.tgz",
      "integrity": "sha512-LaNjtRWUBY++zB5nE/NwcaoMylSPk+S+ZHNB1TzdbMJMny6dynpAGt7X/tl/QYq3TIeE6nxHppbo2LGymrG5Pw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "p-limit": "^3.0.2"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/p-try": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/p-try/-/p-try-2.2.0.tgz",
      "integrity": "sha512-R4nPAVTAU0B9D35/Gk3uJf/7XYbQcyohSKdvAxIRSNghFl4e71hVoGnBNQz9cWaXxO2I10KTC+3jMdvvoKw6dQ==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/parent-module": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/parent-module/-/parent-module-1.0.1.tgz",
      "integrity": "sha512-GQ2EWRpQV8/o+Aw8YqtfZZPfNRWZYkbidE9k5rpl/hC3vtHHBfGm2Ifi6qWV+coDGkrUKZAxE3Lot5kcsRlh+g==",
      "license": "MIT",
      "dependencies": {
        "callsites": "^3.0.0"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/parse-json": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/parse-json/-/parse-json-5.2.0.tgz",
      "integrity": "sha512-ayCKvm/phCGxOkYRSCM82iDwct8/EonSEgCSxWxD7ve6jHggsFl4fZVQBPRNgQoKiuV/odhFrGzQXZwbifC8Rg==",
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.0.0",
        "error-ex": "^1.3.1",
        "json-parse-even-better-errors": "^2.3.0",
        "lines-and-columns": "^1.1.6"
      },
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/parse-ms": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/parse-ms/-/parse-ms-4.0.0.tgz",
      "integrity": "sha512-TXfryirbmq34y8QBwgqCVLi+8oA3oWx2eAnSn62ITyEhEYaWRlVZ2DvMM9eZbMs/RfxPu/PK/aBLyGj4IrqMHw==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
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
    "node_modules/path-browserify": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/path-browserify/-/path-browserify-1.0.1.tgz",
      "integrity": "sha512-b7uo2UCUOYZcnF/3ID0lulOJi/bafxa1xPe7ZPsammBSpjSWQkjNxlt635YGS2MiR9GjvuXCtz2emr3jbsz98g==",
      "license": "MIT"
    },
    "node_modules/path-exists": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/path-exists/-/path-exists-4.0.0.tgz",
      "integrity": "sha512-ak9Qy5Q7jYb2Wwcey5Fpvg2KoAc/ZIhLSLOSBmRmygPsGwkVVt0fZa0qrtMz+m6tJTAHfZQ8FnmB4MG4LWy7/w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/path-key": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/path-key/-/path-key-3.1.1.tgz",
      "integrity": "sha512-ojmeN0qd+y0jszEtoY48r0Peq5dwMEkIlCOu6Q5f41lfkswXuKtYrhgoTpLnyIcHm24Uhqx+5Tqm2InSwLhE6Q==",
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/path-parse": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/path-parse/-/path-parse-1.0.7.tgz",
      "integrity": "sha512-LDJzPVEEEPR+y48z93A0Ed0yXb8pAByGWo/k5YYdYgpY2/2EsOsksJrq7lOHxryrVOn1ejG6oAp8ahvOIQD8sw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/path-to-regexp": {
      "version": "8.4.2",
      "resolved": "https://registry.npmjs.org/path-to-regexp/-/path-to-regexp-8.4.2.tgz",
      "integrity": "sha512-qRcuIdP69NPm4qbACK+aDogI5CBDMi1jKe0ry5rSQJz8JVLsC7jV8XpiJjGRLLol3N+R5ihGYcrPLTno6pAdBA==",
      "license": "MIT",
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/picocolors": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.1.1.tgz",
      "integrity": "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==",
      "license": "ISC"
    },
    "node_modules/picomatch": {
      "version": "2.3.2",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.2.tgz",
      "integrity": "sha512-V7+vQEJ06Z+c5tSye8S+nHUfI51xoXIXjHQ99cQtKUkQqqO1kO/KCJUfZXuB47h/YBlDhah2H3hdUGXn8ie0oA==",
      "license": "MIT",
      "engines": {
        "node": ">=8.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/pkce-challenge": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/pkce-challenge/-/pkce-challenge-5.0.1.tgz",
      "integrity": "sha512-wQ0b/W4Fr01qtpHlqSqspcj3EhBvimsdh0KlHhH8HRZnMsEa0ea2fTULOXOS9ccQr3om+GcGRk4e+isrZWV8qQ==",
      "license": "MIT",
      "engines": {
        "node": ">=16.20.0"
      }
    },
    "node_modules/pkg-up": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/pkg-up/-/pkg-up-3.1.0.tgz",
      "integrity": "sha512-nDywThFk1i4BQK4twPQ6TA4RT8bDY96yeuCVBWL3ePARCiEKDRSrNGbFIgUJpLp+XeIR65v8ra7WuJOFUBtkMA==",
      "license": "MIT",
      "dependencies": {
        "find-up": "^3.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/pkg-up/node_modules/find-up": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/find-up/-/find-up-3.0.0.tgz",
      "integrity": "sha512-1yD6RmLI1XBfxugvORwlck6f75tYL+iR0jqwsOrOxMZyGYqUuDhJ0l4AXdO1iX/FTs9cBAMEk1gWSEx1kSbylg==",
      "license": "MIT",
      "dependencies": {
        "locate-path": "^3.0.0"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/pkg-up/node_modules/locate-path": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-3.0.0.tgz",
      "integrity": "sha512-7AO748wWnIhNqAuaty2ZWHkQHRSNfPVIsPIfwEOWO22AmaoVrWavlOcMR5nzTLNYvp36X220/maaRsrec1G65A==",
      "license": "MIT",
      "dependencies": {
        "p-locate": "^3.0.0",
        "path-exists": "^3.0.0"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/pkg-up/node_modules/p-limit": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-2.3.0.tgz",
      "integrity": "sha512-//88mFWSJx8lxCzwdAABTJL2MyWB12+eIY7MDL2SqLmAkeKU9qxRvWuSyTjm3FUmpBEMuFfckAIqEaVGUDxb6w==",
      "license": "MIT",
      "dependencies": {
        "p-try": "^2.0.0"
      },
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/pkg-up/node_modules/p-locate": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-3.0.0.tgz",
      "integrity": "sha512-x+12w/To+4GFfgJhBEpiDcLozRJGegY+Ei7/z0tSLkMmxGZNybVMSfWj9aJn8Z5Fc7dBUNJOOVgPv2H7IwulSQ==",
      "license": "MIT",
      "dependencies": {
        "p-limit": "^2.0.0"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/pkg-up/node_modules/path-exists": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/path-exists/-/path-exists-3.0.0.tgz",
      "integrity": "sha512-bpC7GYwiDYQ4wYLe+FA8lhRjhQCMcQGuSgGGqDkg/QerRWw9CmGRT0iSOVRSZJ29NMLZgIzqaljJ63oaL4NIJQ==",
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/possible-typed-array-names": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/possible-typed-array-names/-/possible-typed-array-names-1.1.0.tgz",
      "integrity": "sha512-/+5VFTchJDoVj3bhoqi6UeymcD00DAwb1nJwamzPvHEszJ4FpF6SNNbUbOS8yI56qHzdV8eK0qEfOSiodkTdxg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/postcss": {
      "version": "8.5.28",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.5.28.tgz",
      "integrity": "sha512-RRuzqDtt5Y9h3quz5hWhK+TPnsmVs6WwSU6LkJMeY4HstUEDuYTG8UJSdawMRzmzAtV+KEoG8N3Qg2qLy5vM/A==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "nanoid": "^3.3.18",
        "picocolors": "^1.1.1",
        "source-map-js": "^1.2.1"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/postcss-selector-parser": {
      "version": "7.1.6",
      "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-7.1.6.tgz",
      "integrity": "sha512-7qASPzhKF2l2KLboRZux8CCTRMdGiV08vWmyKzPz22qZ7ZjQBOeY7rNzNoCLSUiftJ7HUq0GERHmxw/t0dCdMw==",
      "license": "MIT",
      "dependencies": {
        "cssesc": "^3.0.0",
        "util-deprecate": "^1.0.2"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/powershell-utils": {
      "version": "0.2.1",
      "resolved": "https://registry.npmjs.org/powershell-utils/-/powershell-utils-0.2.1.tgz",
      "integrity": "sha512-C+y9x90UElAddDZmV4qOx9W53B61PO7cIqWz2dQsWlwswuq4mr8NEwytdGKboYbQlGZ3awrkTeNvcZiZNHnQ8A==",
      "license": "MIT",
      "engines": {
        "node": ">=20"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/prelude-ls": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/prelude-ls/-/prelude-ls-1.2.1.tgz",
      "integrity": "sha512-vkcDPrRZo1QZLbn5RLGPpg/WmIQ65qoWWhcGKf/b5eplkkarX0m9z8ppCat4mlOqUsWpyNuYgO3VRyrYHSzX5g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/prettier": {
      "version": "3.9.9",
      "resolved": "https://registry.npmjs.org/prettier/-/prettier-3.9.9.tgz",
      "integrity": "sha512-Z/CJHIkdujO/OtN7nXUii0Rf3VT5SRuhjBA82Xvu2XhBUgX3nhP67T0LHceBdQLex7OOFGTox+Q5Yg8Jk2Qivg==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "prettier": "bin/prettier.cjs"
      },
      "engines": {
        "node": ">=14"
      },
      "funding": {
        "url": "https://github.com/prettier/prettier?sponsor=1"
      }
    },
    "node_modules/pretty-ms": {
      "version": "9.3.1",
      "resolved": "https://registry.npmjs.org/pretty-ms/-/pretty-ms-9.3.1.tgz",
      "integrity": "sha512-HzMy3Geq23nVALD/M2LliU+F+M+gVNsvkQWWqeBZ8HDiCgzo6YPJ/Omrmtq24EFrIsk0a3EkQGEd7bDOo+IhGA==",
      "license": "MIT",
      "dependencies": {
        "parse-ms": "^4.0.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/prompts": {
      "version": "2.4.2",
      "resolved": "https://registry.npmjs.org/prompts/-/prompts-2.4.2.tgz",
      "integrity": "sha512-NxNv/kLguCA7p3jE8oL2aEBsrJWgAakBpgmgK6lpPWV+WuOmY6r2/zbAVnP+T8bQlA0nzHXSJSJW0Hq7ylaD2Q==",
      "license": "MIT",
      "dependencies": {
        "kleur": "^3.0.3",
        "sisteransi": "^1.0.5"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/prompts/node_modules/kleur": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/kleur/-/kleur-3.0.3.tgz",
      "integrity": "sha512-eTIzlVOSUR+JxdDFepEYcBMtZ9Qqdef+rnzWdRZuMbOywu5tO2w2N7rqjoANZ5k9vywhL6Br1VRjUIgTQx4E8w==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/prop-types": {
      "version": "15.8.1",
      "resolved": "https://registry.npmjs.org/prop-types/-/prop-types-15.8.1.tgz",
      "integrity": "sha512-oj87CgZICdulUohogVAR7AjlC0327U4el4L6eAvOqCeudMDVU0NThNaV+b9Df4dXgSP1gXMTnPdhfe/2qDH5cg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "loose-envify": "^1.4.0",
        "object-assign": "^4.1.1",
        "react-is": "^16.13.1"
      }
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
    "node_modules/proxy-from-env": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/proxy-from-env/-/proxy-from-env-2.1.0.tgz",
      "integrity": "sha512-cJ+oHTW1VAEa8cJslgmUZrc+sjRKgAKl3Zyse6+PV38hZe/V6Z14TbCuXcan9F9ghlz4QrFr2c92TNF82UkYHA==",
      "license": "MIT",
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/punycode": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/punycode/-/punycode-2.3.1.tgz",
      "integrity": "sha512-vYt7UD1U9Wg6138shLtLOvdAu+8DsC/ilFtEVHcH+wydcSpNE20AfSOduf6MkRFahL5FY7X1oU7nKVZFtfq8Fg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
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
    "node_modules/queue-microtask": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/queue-microtask/-/queue-microtask-1.2.3.tgz",
      "integrity": "sha512-NuaNSa6flKT5JaSYQzJok04JzTL1CA6aGhv5rfLW3PgqA+M2ChpZQnAC8h8i4ZFkBS8X5RqkDBHA7r4hej3K9A==",
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
    "node_modules/range-parser": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/range-parser/-/range-parser-1.3.0.tgz",
      "integrity": "sha512-hek2mFQpPuI4E1BBKrSto+BU3e3x4xuarsbiwr3+lf7p44juvFMV0XFWQAP3xUyqXA4RrXLIoaSUGbSt056ZMw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/raw-body": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/raw-body/-/raw-body-3.0.2.tgz",
      "integrity": "sha512-K5zQjDllxWkf7Z5xJdV0/B0WTNqx6vxG70zJE4N0kBs4LovmEYWJzQGxC9bS9RAKu3bgM40lrd5zoLJ12MQ5BA==",
      "license": "MIT",
      "dependencies": {
        "bytes": "~3.1.2",
        "http-errors": "~2.0.1",
        "iconv-lite": "~0.7.0",
        "unpipe": "~1.0.0"
      },
      "engines": {
        "node": ">= 0.10"
      }
    },
    "node_modules/react": {
      "version": "19.2.8",
      "resolved": "https://registry.npmjs.org/react/-/react-19.2.8.tgz",
      "integrity": "sha512-PWaYA1L/q9u2u7xYQi+Y3L3Yfnie7XyLeaJICV1MGD6LprsBxcAqGjYyr0eY3p+QdsA+x/Irkt4Qif8D63+Sbw==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-dom": {
      "version": "19.2.8",
      "resolved": "https://registry.npmjs.org/react-dom/-/react-dom-19.2.8.tgz",
      "integrity": "sha512-rVprimfGBG3DR+Tq0IQG2DT5PxKth1WIGDmj5yPmlzr4YBe7uyE+Du4oVqTDXZSHGGGXRtTJEGSSePyQCMBglQ==",
      "license": "MIT",
      "dependencies": {
        "scheduler": "^0.27.0"
      },
      "peerDependencies": {
        "react": "^19.2.8"
      }
    },
    "node_modules/react-hook-form": {
      "version": "7.89.0",
      "resolved": "https://registry.npmjs.org/react-hook-form/-/react-hook-form-7.89.0.tgz",
      "integrity": "sha512-vKcoCfy8RKZDrhSdqsRFp0uEOdS1AhLjOL6hR7Wmfzg1akNxEhaPf5WORx8SgEQPVXakdDyDkqQp+KNxVnnPHg==",
      "license": "MIT",
      "engines": {
        "node": ">=18.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/react-hook-form"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8.0 || ^17 || ^18 || ^19"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/react-is": {
      "version": "16.13.1",
      "resolved": "https://registry.npmjs.org/react-is/-/react-is-16.13.1.tgz",
      "integrity": "sha512-24e6ynE2H+OKt4kqsOvNd8kBpV65zoxbA4BVsEOB3ARVWQki/DHzaUoC5KuON/BiccDaCCTZBuOcfZs70kR8bQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/recast": {
      "version": "0.23.21",
      "resolved": "https://registry.npmjs.org/recast/-/recast-0.23.21.tgz",
      "integrity": "sha512-mFAyJq9vUbSTARLZUvAEf1z3YxlvAwswbmxMx2mPA/MSm4KmpwvwvhsH/NIrZhyOuwD60Lzyw2qh83uCbgTPYw==",
      "license": "MIT",
      "dependencies": {
        "ast-types": "^0.16.1",
        "esprima": "~4.0.0",
        "source-map": "~0.6.1",
        "tiny-invariant": "^1.3.3",
        "tslib": "^2.0.1"
      },
      "engines": {
        "node": ">= 4"
      }
    },
    "node_modules/reflect.getprototypeof": {
      "version": "1.0.10",
      "resolved": "https://registry.npmjs.org/reflect.getprototypeof/-/reflect.getprototypeof-1.0.10.tgz",
      "integrity": "sha512-00o4I+DVrefhv+nX0ulyi3biSHCPDe+yLv5o/p6d/UVlirijB8E16FtfwSAi4g3tcqrQ4lRAqQSoFEZJehYEcw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.9",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.0.0",
        "get-intrinsic": "^1.2.7",
        "get-proto": "^1.0.1",
        "which-builtin-type": "^1.2.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/regexp.prototype.flags": {
      "version": "1.5.4",
      "resolved": "https://registry.npmjs.org/regexp.prototype.flags/-/regexp.prototype.flags-1.5.4.tgz",
      "integrity": "sha512-dYqgNSZbDwkaJ2ceRd9ojCGjBq+mOm9LmtXnAnEGyHhN/5R7iDW2TRw3h+o/jCFxus3P2LfWIIiwowAjANm7IA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "define-properties": "^1.2.1",
        "es-errors": "^1.3.0",
        "get-proto": "^1.0.1",
        "gopd": "^1.2.0",
        "set-function-name": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/require-from-string": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/require-from-string/-/require-from-string-2.0.2.tgz",
      "integrity": "sha512-Xf0nWe6RseziFMu+Ap9biiUbmplq6S9/p+7w7YXP/JBHhrUDDUhwa+vANyubuqfZWTveU//DYVGsDG7RKL/vEw==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/reselect": {
      "version": "5.3.0",
      "resolved": "https://registry.npmjs.org/reselect/-/reselect-5.3.0.tgz",
      "integrity": "sha512-XGoLeRAVzUTcJ1qkxPQhDJyIZ5d6zzZD9nT7AEZOaaU9UbWclhycElmhO+VD5bFeLuzhPBaOV2oXC8uG35ZSpg==",
      "license": "MIT"
    },
    "node_modules/resolve": {
      "version": "2.0.0-next.7",
      "resolved": "https://registry.npmjs.org/resolve/-/resolve-2.0.0-next.7.tgz",
      "integrity": "sha512-tqt+NBWwyaMgw3zDsnygx4CByWjQEJHOPMdslYhppaQSJUtL/D4JO9CcBBlhPoI8lz9oJIDXkwXfhF4aWqP8xQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "is-core-module": "^2.16.2",
        "node-exports-info": "^1.6.0",
        "object-keys": "^1.1.1",
        "path-parse": "^1.0.7",
        "supports-preserve-symlinks-flag": "^1.0.0"
      },
      "bin": {
        "resolve": "bin/resolve"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/resolve-from": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/resolve-from/-/resolve-from-4.0.0.tgz",
      "integrity": "sha512-pb/MYmXstAkysRFx8piNI1tGFNQIFA3vkE3Gq4EuA1dF6gHp/+vgZqsCGJapvy8N3Q+4o7FwvquPJcnZ7RYy4g==",
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/resolve-pkg-maps": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/resolve-pkg-maps/-/resolve-pkg-maps-1.0.0.tgz",
      "integrity": "sha512-seS2Tj26TBVOC2NIc2rOe2y2ZO7efxITtLZcGSOnHHNOQ7CkiUBfw0Iw2ck6xkIhPwLhKNLS8BO+hEpngQlqzw==",
      "dev": true,
      "license": "MIT",
      "funding": {
        "url": "https://github.com/privatenumber/resolve-pkg-maps?sponsor=1"
      }
    },
    "node_modules/restore-cursor": {
      "version": "5.1.0",
      "resolved": "https://registry.npmjs.org/restore-cursor/-/restore-cursor-5.1.0.tgz",
      "integrity": "sha512-oMA2dcrw6u0YfxJQXm342bFKX/E4sG9rbTzO9ptUcR/e8A33cHuvStiYOwH7fszkZlZ1z/ta9AAoPk2F4qIOHA==",
      "license": "MIT",
      "dependencies": {
        "onetime": "^7.0.0",
        "signal-exit": "^4.1.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/restore-cursor/node_modules/onetime": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/onetime/-/onetime-7.0.0.tgz",
      "integrity": "sha512-VXJjc87FScF88uafS3JllDgvAm+c/Slfz06lorj2uAY34rlUu0Nt+v8wreiImcrgAjjIHp1rXpTDlLOGw29WwQ==",
      "license": "MIT",
      "dependencies": {
        "mimic-function": "^5.0.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/reusify": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/reusify/-/reusify-1.1.0.tgz",
      "integrity": "sha512-g6QUff04oZpHs0eG5p83rFLhHeV00ug/Yf9nZM6fLeUrPguBTkTQOdpAWWspMh55TZfVQDPaN3NQJfbVRAxdIw==",
      "license": "MIT",
      "engines": {
        "iojs": ">=1.0.0",
        "node": ">=0.10.0"
      }
    },
    "node_modules/router": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/router/-/router-2.2.0.tgz",
      "integrity": "sha512-nLTrUKm2UyiL7rlhapu/Zl45FwNgkZGaCpZbIHajDYgwlJCOzLSk+cIPAnsEqV955GjILJnKbdQC1nVPz+gAYQ==",
      "license": "MIT",
      "dependencies": {
        "debug": "^4.4.0",
        "depd": "^2.0.0",
        "is-promise": "^4.0.0",
        "parseurl": "^1.3.3",
        "path-to-regexp": "^8.0.0"
      },
      "engines": {
        "node": ">= 18"
      }
    },
    "node_modules/run-applescript": {
      "version": "7.1.0",
      "resolved": "https://registry.npmjs.org/run-applescript/-/run-applescript-7.1.0.tgz",
      "integrity": "sha512-DPe5pVFaAsinSaV6QjQ6gdiedWDcRCbUuiQfQa2wmWV7+xC9bGulGI8+TdRmoFkAPaBXk8CrAbnlY2ISniJ47Q==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/run-parallel": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/run-parallel/-/run-parallel-1.2.0.tgz",
      "integrity": "sha512-5l4VyZR86LZ/lDxZTR6jqL8AFE2S0IFLMP26AbjsLVADxHdhB/c0GUsH+y39UfCi3dzz8OlQuPmnaJOMoDHQBA==",
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
      "license": "MIT",
      "dependencies": {
        "queue-microtask": "^1.2.2"
      }
    },
    "node_modules/safe-array-concat": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/safe-array-concat/-/safe-array-concat-1.1.4.tgz",
      "integrity": "sha512-wtZlHyOje6OZTGqAoaDKxFkgRtkF9CnHAVnCHKfuj200wAgL+bSJhdsCD2l0Qx/2ekEXjPWcyKkfGb5CPboslg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.9",
        "call-bound": "^1.0.4",
        "get-intrinsic": "^1.3.0",
        "has-symbols": "^1.1.0",
        "isarray": "^2.0.5"
      },
      "engines": {
        "node": ">=0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/safe-push-apply": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/safe-push-apply/-/safe-push-apply-1.0.0.tgz",
      "integrity": "sha512-iKE9w/Z7xCzUMIZqdBsp6pEQvwuEebH4vdpjcDWnyzaI6yl6O9FHvVpmGelvEHNsoY6wGblkxR6Zty/h00WiSA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "isarray": "^2.0.5"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/safe-regex-test": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/safe-regex-test/-/safe-regex-test-1.1.0.tgz",
      "integrity": "sha512-x/+Cz4YrimQxQccJf5mKEbIa1NzeCRNI5Ecl/ekmlYaampdNLPalVyIcCZNNH3MvmqBugV5TMYZXv0ljslUlaw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "is-regex": "^1.2.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/safer-buffer": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/safer-buffer/-/safer-buffer-2.1.2.tgz",
      "integrity": "sha512-YZo3K82SD7Riyi0E1EQPojLz7kpepnSQI9IyPbHHg1XXXevb5dJI7tpyN2ADxGcQbHG7vcyRHk0cbwqcQriUtg==",
      "license": "MIT"
    },
    "node_modules/scheduler": {
      "version": "0.27.0",
      "resolved": "https://registry.npmjs.org/scheduler/-/scheduler-0.27.0.tgz",
      "integrity": "sha512-eNv+WrVbKu1f3vbYJT/xtiF5syA5HPIMtf9IgY/nKg0sWqzAUEvqY/xm7OcZc/qafLx/iO9FgOmeSAp4v5ti/Q==",
      "license": "MIT"
    },
    "node_modules/semver": {
      "version": "6.3.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/send": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/send/-/send-1.2.1.tgz",
      "integrity": "sha512-1gnZf7DFcoIcajTjTwjwuDjzuz4PPcY2StKPlsGAQ1+YH20IRVrBaXSWmdjowTJ6u8Rc01PoYOGHXfP1mYcZNQ==",
      "license": "MIT",
      "dependencies": {
        "debug": "^4.4.3",
        "encodeurl": "^2.0.0",
        "escape-html": "^1.0.3",
        "etag": "^1.8.1",
        "fresh": "^2.0.0",
        "http-errors": "^2.0.1",
        "mime-types": "^3.0.2",
        "ms": "^2.1.3",
        "on-finished": "^2.4.1",
        "range-parser": "^1.2.1",
        "statuses": "^2.0.2"
      },
      "engines": {
        "node": ">= 18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/serve-static": {
      "version": "2.2.1",
      "resolved": "https://registry.npmjs.org/serve-static/-/serve-static-2.2.1.tgz",
      "integrity": "sha512-xRXBn0pPqQTVQiC8wyQrKs2MOlX24zQ0POGaj0kultvoOCstBQM5yvOhAVSUwOMjQtTvsPWoNCHfPGwaaQJhTw==",
      "license": "MIT",
      "dependencies": {
        "encodeurl": "^2.0.0",
        "escape-html": "^1.0.3",
        "parseurl": "^1.3.3",
        "send": "^1.2.0"
      },
      "engines": {
        "node": ">= 18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/set-function-length": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/set-function-length/-/set-function-length-1.2.2.tgz",
      "integrity": "sha512-pgRc4hJ4/sNjWCSS9AmnS40x3bNMDTknHgL5UaMBTMyJnU90EgWh1Rz+MC9eFu4BuN/UwZjKQuY/1v3rM7HMfg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "define-data-property": "^1.1.4",
        "es-errors": "^1.3.0",
        "function-bind": "^1.1.2",
        "get-intrinsic": "^1.2.4",
        "gopd": "^1.0.1",
        "has-property-descriptors": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/set-function-name": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/set-function-name/-/set-function-name-2.0.2.tgz",
      "integrity": "sha512-7PGFlmtwsEADb0WYyvCMa1t+yke6daIG4Wirafur5kcf+MhUnPms1UeR0CKQdTZD81yESwMHbtn+TR+dMviakQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "define-data-property": "^1.1.4",
        "es-errors": "^1.3.0",
        "functions-have-names": "^1.2.3",
        "has-property-descriptors": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/set-proto": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/set-proto/-/set-proto-1.0.0.tgz",
      "integrity": "sha512-RJRdvCo6IAnPdsvP/7m6bsQqNnn1FCBX5ZNtFL98MmFF/4xAIJTIg1YbHW5DC2W5SKZanrC6i4HsJqlajw/dZw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "dunder-proto": "^1.0.1",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/setprototypeof": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/setprototypeof/-/setprototypeof-1.2.0.tgz",
      "integrity": "sha512-E5LDX7Wrp85Kil5bhZv46j8jOeboKq5JMmYM3gVGdGH8xFpPWXUMsNrlODCrkoxMEeNi/XZIwuRvY4XNwYMJpw==",
      "license": "ISC"
    },
    "node_modules/shadcn": {
      "version": "4.21.0",
      "resolved": "https://registry.npmjs.org/shadcn/-/shadcn-4.21.0.tgz",
      "integrity": "sha512-UU2mFNusW8C5rvadKdH69vERYZqUlOOlXBcf0MYhYLdTGP6DPti7X4qovCu+RTfCqsAgq/T+YfE0Vnttxh9aiw==",
      "license": "MIT",
      "dependencies": {
        "@babel/core": "^7.28.0",
        "@babel/parser": "^7.28.0",
        "@babel/plugin-transform-typescript": "^7.28.0",
        "@babel/preset-typescript": "^7.27.1",
        "@dotenvx/dotenvx": "^1.48.4",
        "@modelcontextprotocol/sdk": "^1.26.0",
        "@types/validate-npm-package-name": "^4.0.2",
        "browserslist": "^4.26.2",
        "cn": "^0.2.4",
        "commander": "^14.0.0",
        "cosmiconfig": "^9.0.0",
        "dedent": "^1.6.0",
        "deepmerge": "^4.3.1",
        "diff": "^8.0.2",
        "execa": "^9.6.0",
        "fast-glob": "^3.3.3",
        "fs-extra": "^11.3.1",
        "fuzzysort": "^3.1.0",
        "kleur": "^4.1.5",
        "open": "^11.0.0",
        "ora": "^8.2.0",
        "postcss": "^8.5.6",
        "postcss-selector-parser": "^7.1.0",
        "prompts": "^2.4.2",
        "recast": "^0.23.11",
        "socks": "^2.8.8",
        "stringify-object": "^5.0.0",
        "ts-morph": "^26.0.0",
        "tsconfig-paths": "^4.2.0",
        "undici": "^7.27.2",
        "validate-npm-package-name": "^7.0.1",
        "zod": "^3.24.1",
        "zod-to-json-schema": "^3.24.6"
      },
      "bin": {
        "shadcn": "dist/index.js"
      },
      "engines": {
        "node": ">=20.18.1"
      }
    },
    "node_modules/shadcn/node_modules/cn": {
      "version": "0.2.6",
      "resolved": "https://registry.npmjs.org/cn/-/cn-0.2.6.tgz",
      "integrity": "sha512-+i4L0zUGgRcEnhsxueVrP7iBGxBx5iD0WOTYg1MwFEu2ZyCmH5Ov2V1cul2Ht5UchRQQgftCf4be/RxspuW6QQ==",
      "license": "MIT",
      "bin": {
        "cn": "bin/cn.mjs"
      },
      "engines": {
        "node": ">=20"
      }
    },
    "node_modules/shadcn/node_modules/fast-glob": {
      "version": "3.3.3",
      "resolved": "https://registry.npmjs.org/fast-glob/-/fast-glob-3.3.3.tgz",
      "integrity": "sha512-7MptL8U0cqcFdzIzwOTHoilX9x5BrNqye7Z/LuC7kCMRio1EMSyqRK3BEAUD7sXRq4iT4AzTVuZdhgQ2TCvYLg==",
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.stat": "^2.0.2",
        "@nodelib/fs.walk": "^1.2.3",
        "glob-parent": "^5.1.2",
        "merge2": "^1.3.0",
        "micromatch": "^4.0.8"
      },
      "engines": {
        "node": ">=8.6.0"
      }
    },
    "node_modules/shadcn/node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/shadcn/node_modules/tsconfig-paths": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/tsconfig-paths/-/tsconfig-paths-4.2.0.tgz",
      "integrity": "sha512-NoZ4roiN7LnbKn9QqE1amc9DJfzvZXxF4xDavcOWt1BPkdx+m+0gJuPM+S0vCe7zTJMYUP0R8pO2XMr+Y8oLIg==",
      "license": "MIT",
      "dependencies": {
        "json5": "^2.2.2",
        "minimist": "^1.2.6",
        "strip-bom": "^3.0.0"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/sharp": {
      "version": "0.35.4",
      "resolved": "https://registry.npmjs.org/sharp/-/sharp-0.35.4.tgz",
      "integrity": "sha512-n++8XWcj+jCOr2IOl7h8LbKnGBDY4aPbmprMONBNFdn0ImXqpGVv5zliDs0V9HbmbCQLpbuo2ej9rAoOQTvMDA==",
      "license": "Apache-2.0",
      "optional": true,
      "dependencies": {
        "@img/colour": "^1.1.0",
        "detect-libc": "^2.1.2",
        "semver": "^7.8.5"
      },
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-darwin-arm64": "0.35.4",
        "@img/sharp-darwin-x64": "0.35.4",
        "@img/sharp-freebsd-wasm32": "0.35.4",
        "@img/sharp-libvips-darwin-arm64": "1.3.3",
        "@img/sharp-libvips-darwin-x64": "1.3.3",
        "@img/sharp-libvips-linux-arm": "1.3.3",
        "@img/sharp-libvips-linux-arm64": "1.3.3",
        "@img/sharp-libvips-linux-ppc64": "1.3.3",
        "@img/sharp-libvips-linux-riscv64": "1.3.3",
        "@img/sharp-libvips-linux-s390x": "1.3.3",
        "@img/sharp-libvips-linux-x64": "1.3.3",
        "@img/sharp-libvips-linuxmusl-arm64": "1.3.3",
        "@img/sharp-libvips-linuxmusl-x64": "1.3.3",
        "@img/sharp-linux-arm": "0.35.4",
        "@img/sharp-linux-arm64": "0.35.4",
        "@img/sharp-linux-ppc64": "0.35.4",
        "@img/sharp-linux-riscv64": "0.35.4",
        "@img/sharp-linux-s390x": "0.35.4",
        "@img/sharp-linux-x64": "0.35.4",
        "@img/sharp-linuxmusl-arm64": "0.35.4",
        "@img/sharp-linuxmusl-x64": "0.35.4",
        "@img/sharp-webcontainers-wasm32": "0.35.4",
        "@img/sharp-win32-arm64": "0.35.4",
        "@img/sharp-win32-ia32": "0.35.4",
        "@img/sharp-win32-x64": "0.35.4"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        }
      }
    },
    "node_modules/sharp/node_modules/semver": {
      "version": "7.8.5",
      "resolved": "https://registry.npmjs.org/semver/-/semver-7.8.5.tgz",
      "integrity": "sha512-Y7/KDsb8LjooZpwaqGyulO6DQlksgCncchHGk+sZIY4SBvUocMBEFH5Ur1fI4dV+Jvl0w6cjvucaIi40puRioA==",
      "license": "ISC",
      "optional": true,
      "bin": {
        "semver": "bin/semver.js"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/shebang-command": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/shebang-command/-/shebang-command-2.0.0.tgz",
      "integrity": "sha512-kHxr2zZpYtdmrN1qDjrrX/Z1rR1kG8Dx+gkpK1G4eXmvXswmcE1hTWBWYUzlraYw1/yZp6YuDY77YtvbN0dmDA==",
      "license": "MIT",
      "dependencies": {
        "shebang-regex": "^3.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/shebang-regex": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/shebang-regex/-/shebang-regex-3.0.0.tgz",
      "integrity": "sha512-7++dFhtcx3353uBaq8DDR4NuxBetBzC7ZQOhmTQInHEd6bSrXdiEyzCvG07Z44UYdLShWUyXt5M/yhz8ekcb1A==",
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
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
    "node_modules/signal-exit": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/signal-exit/-/signal-exit-4.1.0.tgz",
      "integrity": "sha512-bzyZ1e88w9O1iNJbKnOlvYTrWPDl46O1bG0D3XInv+9tkPrxrN8jUUTiFlDkkmKWgn1M6CfIA13SuGqOa9Korw==",
      "license": "ISC",
      "engines": {
        "node": ">=14"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/sisteransi": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/sisteransi/-/sisteransi-1.0.5.tgz",
      "integrity": "sha512-bLGGlR1QxBcynn2d5YmDX4MGjlZvy2MRBDRNHLJ8VI6l6+9FUiyTFNJ0IveOSP0bcXgVDPRcfGqA0pjaqUpfVg==",
      "license": "MIT"
    },
    "node_modules/smart-buffer": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/smart-buffer/-/smart-buffer-4.2.0.tgz",
      "integrity": "sha512-94hK0Hh8rPqQl2xXc3HsaBoOXKV20MToPkcXvwbISWLEs+64sBq5kFgn2kJDHb1Pry9yrP0dxrCI9RRci7RXKg==",
      "license": "MIT",
      "engines": {
        "node": ">= 6.0.0",
        "npm": ">= 3.0.0"
      }
    },
    "node_modules/socket.io-client": {
      "version": "4.8.4",
      "resolved": "https://registry.npmjs.org/socket.io-client/-/socket.io-client-4.8.4.tgz",
      "integrity": "sha512-7wjKAvVXYOJsbmUgkWbnhPD4bFpkqrUR0++XOjpGFmqDqsqV1CI93VTraeExLxpjxEqrWgFoSRZu1ihjLWfkAA==",
      "license": "MIT",
      "dependencies": {
        "@socket.io/component-emitter": "~3.1.0",
        "debug": "~4.4.1",
        "engine.io-client": "~6.6.1",
        "socket.io-parser": "~4.2.4"
      },
      "engines": {
        "node": ">=10.0.0"
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
    "node_modules/socks": {
      "version": "2.8.10",
      "resolved": "https://registry.npmjs.org/socks/-/socks-2.8.10.tgz",
      "integrity": "sha512-e0VyvkVTwVYViNovRkZ9aodhxVlyoMn7eJhVUPxZ+eK9P/7CBkxvvsBOHqFPEH416726W8tLXXXjKwqgTErrCQ==",
      "license": "MIT",
      "dependencies": {
        "ip-address": "^10.1.1",
        "smart-buffer": "^4.2.0"
      },
      "engines": {
        "node": ">= 10.0.0",
        "npm": ">= 3.0.0"
      }
    },
    "node_modules/sonner": {
      "version": "2.0.8",
      "resolved": "https://registry.npmjs.org/sonner/-/sonner-2.0.8.tgz",
      "integrity": "sha512-UM/ByIoFra8yzV75n1o0Puu0bw5U/9UNnDacrJNspekBewIfsQ3D6ez1nvlWpt7aTsO6rujQtifBpycwIivqlg==",
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "^18.0.0 || ^19.0.0",
        "react": "^18.0.0 || ^19.0.0 || ^19.0.0-rc",
        "react-dom": "^18.0.0 || ^19.0.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/source-map": {
      "version": "0.6.1",
      "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
      "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/source-map-js": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.1.tgz",
      "integrity": "sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA==",
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/stable-hash": {
      "version": "0.0.5",
      "resolved": "https://registry.npmjs.org/stable-hash/-/stable-hash-0.0.5.tgz",
      "integrity": "sha512-+L3ccpzibovGXFK+Ap/f8LOS0ahMrHTf3xu7mMLSpEGU0EO9ucaysSylKo9eRDFNhWve/y275iPmIZ4z39a9iA==",
      "dev": true,
      "license": "MIT"
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
    "node_modules/stdin-discarder": {
      "version": "0.2.2",
      "resolved": "https://registry.npmjs.org/stdin-discarder/-/stdin-discarder-0.2.2.tgz",
      "integrity": "sha512-UhDfHmA92YAlNnCfhmq0VeNL5bDbiZGg7sZ2IvPsXubGkiNa9EC+tUTsjBRsYUAz87btI6/1wf4XoVvQ3uRnmQ==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/stop-iteration-iterator": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/stop-iteration-iterator/-/stop-iteration-iterator-1.1.0.tgz",
      "integrity": "sha512-eLoXW/DHyl62zxY4SCaIgnRhuMr6ri4juEYARS8E6sCEqzKpOiE521Ucofdx+KnDZl5xmvGYaaKCk5FEOxJCoQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "internal-slot": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/string-width": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-7.2.0.tgz",
      "integrity": "sha512-tsaTIkKW9b4N+AEj+SVA+WhJzV7/zMhcSu78mLKWSk7cXMOSHsBKFWUs0fWwq8QyK3MgJBQRX6Gbi4kYbdvGkQ==",
      "license": "MIT",
      "dependencies": {
        "emoji-regex": "^10.3.0",
        "get-east-asian-width": "^1.0.0",
        "strip-ansi": "^7.1.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/string-width/node_modules/ansi-regex": {
      "version": "6.4.0",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-6.4.0.tgz",
      "integrity": "sha512-KzTVk2tCWAHtYrvvvaP8bJKJq2pVinhLcGEQdtLIYPbmNGNyYe8QwNaTUYQp2J7/vIsUKt5QCqAfUkYyG9DkOw==",
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-regex?sponsor=1"
      }
    },
    "node_modules/string-width/node_modules/emoji-regex": {
      "version": "10.6.0",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-10.6.0.tgz",
      "integrity": "sha512-toUI84YS5YmxW219erniWD0CIVOo46xGKColeNQRgOzDorgBi1v4D71/OFzgD9GO2UGKIv1C3Sp8DAn0+j5w7A==",
      "license": "MIT"
    },
    "node_modules/string-width/node_modules/strip-ansi": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-7.2.0.tgz",
      "integrity": "sha512-yDPMNjp4WyfYBkHnjIRLfca1i6KMyGCtsVgoKe/z1+6vukgaENdgGBZt+ZmKPc4gavvEZ5OgHfHdrazhgNyG7w==",
      "license": "MIT",
      "dependencies": {
        "ansi-regex": "^6.2.2"
      },
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/strip-ansi?sponsor=1"
      }
    },
    "node_modules/string.prototype.includes": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/string.prototype.includes/-/string.prototype.includes-2.0.1.tgz",
      "integrity": "sha512-o7+c9bW6zpAdJHTtujeePODAhkuicdAryFsfVKwA+wGw89wJ4GTY484WTucM9hLtDEOpOvI+aHnzqnC5lHp4Rg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.7",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.3"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/string.prototype.matchall": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/string.prototype.matchall/-/string.prototype.matchall-4.1.0.tgz",
      "integrity": "sha512-tHNHTxInrYLCga9O9YGxWA3G9/nnzQw8UGAyqGx3Ar1pSTTzIuM4woFSq4SowkXCjJIwq5sIiQvEfRI9tCH1qQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.9",
        "call-bound": "^1.0.4",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.24.2",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.1.2",
        "get-intrinsic": "^1.3.0",
        "gopd": "^1.2.0",
        "has-symbols": "^1.1.0",
        "internal-slot": "^1.1.0",
        "regexp.prototype.flags": "^1.5.4",
        "set-function-name": "^2.0.2",
        "side-channel": "^1.1.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/string.prototype.repeat": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/string.prototype.repeat/-/string.prototype.repeat-1.0.0.tgz",
      "integrity": "sha512-0u/TldDbKD8bFCQ/4f5+mNRrXwZ8hg2w7ZR8wa16e8z9XpePWl3eGEcUD0OXpEH/VJH/2G3gjUtR3ZOiBe2S/w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "define-properties": "^1.1.3",
        "es-abstract": "^1.17.5"
      }
    },
    "node_modules/string.prototype.trim": {
      "version": "1.2.11",
      "resolved": "https://registry.npmjs.org/string.prototype.trim/-/string.prototype.trim-1.2.11.tgz",
      "integrity": "sha512-PwvK7BU+CMTJGYQCTZb5RWXIML92lftJLhQz1tBzgKiqGxJaMlBAa48POXaNAC2s4y8jr3EFqrkF9+44neS46w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.9",
        "call-bound": "^1.0.4",
        "define-data-property": "^1.1.4",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.24.2",
        "es-object-atoms": "^1.1.2",
        "has-property-descriptors": "^1.0.2",
        "safe-regex-test": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/string.prototype.trimend": {
      "version": "1.0.10",
      "resolved": "https://registry.npmjs.org/string.prototype.trimend/-/string.prototype.trimend-1.0.10.tgz",
      "integrity": "sha512-2+3aDAOmPTmuFwjDnmJG2ctEkQKVki7vOSqaxkv42Mowj1V6PnvuwFCRrR5lChUux1TBskPjfkeTOhqczDMxTw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.9",
        "call-bound": "^1.0.4",
        "define-properties": "^1.2.1",
        "es-object-atoms": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/string.prototype.trimstart": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/string.prototype.trimstart/-/string.prototype.trimstart-1.0.8.tgz",
      "integrity": "sha512-UXSH262CSZY1tfu3G3Secr6uGLCFVPMhIqHjlgCUtCCcgihYc/xKs9djMTMUOb2j1mVSeU8EU6NWc/iQKU6Gfg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.7",
        "define-properties": "^1.2.1",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/stringify-object": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/stringify-object/-/stringify-object-5.0.0.tgz",
      "integrity": "sha512-zaJYxz2FtcMb4f+g60KsRNFOpVMUyuJgA51Zi5Z1DOTC3S59+OQiVOzE9GZt0x72uBGWKsQIuBKeF9iusmKFsg==",
      "license": "BSD-2-Clause",
      "dependencies": {
        "get-own-enumerable-keys": "^1.0.0",
        "is-obj": "^3.0.0",
        "is-regexp": "^3.1.0"
      },
      "engines": {
        "node": ">=14.16"
      },
      "funding": {
        "url": "https://github.com/yeoman/stringify-object?sponsor=1"
      }
    },
    "node_modules/stringify-object/node_modules/is-obj": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/is-obj/-/is-obj-3.0.0.tgz",
      "integrity": "sha512-IlsXEHOjtKhpN8r/tRFj2nDyTmHvcfNeu/nrRIcXE17ROeatXchkojffa1SpdqW4cr/Fj6QkEf/Gn4zf6KKvEQ==",
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/strip-ansi": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
      "license": "MIT",
      "dependencies": {
        "ansi-regex": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/strip-bom": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/strip-bom/-/strip-bom-3.0.0.tgz",
      "integrity": "sha512-vavAMRXOgBVNF6nyEEmL3DBK19iRpDcoIwW+swQ+CbGiu7lju6t+JklA1MHweoWtadgt4ISVUsXLyDq34ddcwA==",
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/strip-final-newline": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/strip-final-newline/-/strip-final-newline-4.0.0.tgz",
      "integrity": "sha512-aulFJcD6YK8V1G7iRB5tigAP4TsHBZZrOV8pjV++zdUwmeV8uzbY7yn6h9MswN62adStNZFuCIx4haBnRuMDaw==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/strip-json-comments": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/strip-json-comments/-/strip-json-comments-3.1.1.tgz",
      "integrity": "sha512-6fPc+R4ihwqP6N/aIv2f1gMH8lOVtWQHoqC4yK6oSDVVocumAsfCqjkXnqiYMhmMwS/mEHLp7Vehlt3ql6lEig==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/styled-jsx": {
      "version": "5.1.6",
      "resolved": "https://registry.npmjs.org/styled-jsx/-/styled-jsx-5.1.6.tgz",
      "integrity": "sha512-qSVyDTeMotdvQYoHWLNGwRFJHC+i+ZvdBRYosOFgC+Wg1vx4frN2/RG/NA7SYqqvKNLf39P2LSRA2pu6n0XYZA==",
      "license": "MIT",
      "dependencies": {
        "client-only": "0.0.1"
      },
      "engines": {
        "node": ">= 12.0.0"
      },
      "peerDependencies": {
        "react": ">= 16.8.0 || 17.x.x || ^18.0.0-0 || ^19.0.0-0"
      },
      "peerDependenciesMeta": {
        "@babel/core": {
          "optional": true
        },
        "babel-plugin-macros": {
          "optional": true
        }
      }
    },
    "node_modules/supports-color": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-7.2.0.tgz",
      "integrity": "sha512-qpCAvRl9stuOHveKsn7HncJRvv501qIacKzQlO/+Lwxc9+0q2wLyv4Dfvt80/DPn2pqOBsJdDiogXGR9+OvwRw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "has-flag": "^4.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/supports-preserve-symlinks-flag": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/supports-preserve-symlinks-flag/-/supports-preserve-symlinks-flag-1.0.0.tgz",
      "integrity": "sha512-ot0WnXS9fgdkgIcePe6RHNk1WA8+muPa6cSjeR3V8K27q9BB1rTE3R1p7Hv0z1ZyAc8s6Vvv8DIyWf681MAt0w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/systeminformation": {
      "version": "5.33.13",
      "resolved": "https://registry.npmjs.org/systeminformation/-/systeminformation-5.33.13.tgz",
      "integrity": "sha512-GtyakkchTQKymM1WeAB652zi3rM1q00RKdc+jZe9KGstuc/mWUwAnQGN/RE5gVYvHIR8xYOUIUD9irVKDtA0wA==",
      "license": "MIT",
      "os": [
        "darwin",
        "linux",
        "win32",
        "freebsd",
        "openbsd",
        "netbsd",
        "sunos",
        "android"
      ],
      "bin": {
        "systeminformation": "lib/cli.js"
      },
      "engines": {
        "node": ">=10.0.0"
      },
      "funding": {
        "type": "Buy me a coffee",
        "url": "https://www.buymeacoffee.com/systeminfo"
      }
    },
    "node_modules/tailwind-merge": {
      "version": "3.7.0",
      "resolved": "https://registry.npmjs.org/tailwind-merge/-/tailwind-merge-3.7.0.tgz",
      "integrity": "sha512-XPPUyAc+cvspz3lHTcR/QgPfW2A0lv/xQNIjX3HGhLR+Nq2lHaLq5MtTesHn8GUr3W3DguT2KT5x3NVgRtYwmA==",
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/dcastil"
      }
    },
    "node_modules/tailwindcss": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/tailwindcss/-/tailwindcss-4.3.3.tgz",
      "integrity": "sha512-gOhV3P7ufE62QDGg1zVaTgCR+EtPv92k2nIhVcVKcLmxT1sUBsQGhnZj175j+MqRt4zLF7ic+sCYjfhxMxj7YQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/tapable": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/tapable/-/tapable-2.3.3.tgz",
      "integrity": "sha512-uxc/zpqFg6x7C8vOE7lh6Lbda8eEL9zmVm/PLeTPBRhh1xCgdWaQ+J1CUieGpIfm2HdtsUpRv+HshiasBMcc6A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/webpack"
      }
    },
    "node_modules/tiny-invariant": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/tiny-invariant/-/tiny-invariant-1.3.3.tgz",
      "integrity": "sha512-+FbBPE1o9QAYvviau/qC5SE3caw21q3xkvWKBtja5vgqOWIHHJ3ioaq1VPfn/Szqctz2bU/oYeKd9/z5BL+PVg==",
      "license": "MIT"
    },
    "node_modules/tinyglobby": {
      "version": "0.2.17",
      "resolved": "https://registry.npmjs.org/tinyglobby/-/tinyglobby-0.2.17.tgz",
      "integrity": "sha512-wXR/dYpcqKmfWpEdZjiKJOwCNFndD0DMnrW/cYjVGttEkBfVgcLFHoNrlj47mjOVic9yyNu65alsgF4NQyTa2g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fdir": "^6.5.0",
        "picomatch": "^4.0.4"
      },
      "engines": {
        "node": ">=12.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/SuperchupuDev"
      }
    },
    "node_modules/tinyglobby/node_modules/fdir": {
      "version": "6.5.0",
      "resolved": "https://registry.npmjs.org/fdir/-/fdir-6.5.0.tgz",
      "integrity": "sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12.0.0"
      },
      "peerDependencies": {
        "picomatch": "^3 || ^4"
      },
      "peerDependenciesMeta": {
        "picomatch": {
          "optional": true
        }
      }
    },
    "node_modules/tinyglobby/node_modules/picomatch": {
      "version": "4.0.7",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.7.tgz",
      "integrity": "sha512-qcJu88Q2IWqJsDD529JKMdwGm/dvInW4HvQnRwiH9JtihJvzGOscDtHE3x1pBKeUOTysQ8kVmLnJ2kJu7yhcGA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/to-regex-range": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-5.0.1.tgz",
      "integrity": "sha512-65P7iz6X5yEr1cwcgvQxbbIw7Uk3gOy5dIdtZ4rDveLqhrdJP+Li/Hx6tyK0NEb+2GCyneCMJiGqrADCSNk8sQ==",
      "license": "MIT",
      "dependencies": {
        "is-number": "^7.0.0"
      },
      "engines": {
        "node": ">=8.0"
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
    "node_modules/ts-api-utils": {
      "version": "2.5.0",
      "resolved": "https://registry.npmjs.org/ts-api-utils/-/ts-api-utils-2.5.0.tgz",
      "integrity": "sha512-OJ/ibxhPlqrMM0UiNHJ/0CKQkoKF243/AEmplt3qpRgkW8VG7IfOS41h7V8TjITqdByHzrjcS/2si+y4lIh8NA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18.12"
      },
      "peerDependencies": {
        "typescript": ">=4.8.4"
      }
    },
    "node_modules/ts-morph": {
      "version": "26.0.0",
      "resolved": "https://registry.npmjs.org/ts-morph/-/ts-morph-26.0.0.tgz",
      "integrity": "sha512-ztMO++owQnz8c/gIENcM9XfCEzgoGphTv+nKpYNM1bgsdOVC/jRZuEBf6N+mLLDNg68Kl+GgUZfOySaRiG1/Ug==",
      "license": "MIT",
      "dependencies": {
        "@ts-morph/common": "~0.27.0",
        "code-block-writer": "^13.0.3"
      }
    },
    "node_modules/tsconfig-paths": {
      "version": "3.15.0",
      "resolved": "https://registry.npmjs.org/tsconfig-paths/-/tsconfig-paths-3.15.0.tgz",
      "integrity": "sha512-2Ac2RgzDe/cn48GvOe3M+o82pEFewD3UPbyoUHHdKasHwJKjds4fLXWf/Ux5kATBKN20oaFGu+jbElp1pos0mg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/json5": "^0.0.29",
        "json5": "^1.0.2",
        "minimist": "^1.2.6",
        "strip-bom": "^3.0.0"
      }
    },
    "node_modules/tsconfig-paths/node_modules/json5": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/json5/-/json5-1.0.2.tgz",
      "integrity": "sha512-g1MWMLBiz8FKi1e4w0UyVL3w+iJceWAFBAaBnnGKOpNa5f8TLktkbre1+s6oICydWAm+HRUGTmI+//xv2hvXYA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "minimist": "^1.2.0"
      },
      "bin": {
        "json5": "lib/cli.js"
      }
    },
    "node_modules/tslib": {
      "version": "2.8.1",
      "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.8.1.tgz",
      "integrity": "sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w==",
      "license": "0BSD"
    },
    "node_modules/tw-animate-css": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/tw-animate-css/-/tw-animate-css-1.4.0.tgz",
      "integrity": "sha512-7bziOlRqH0hJx80h/3mbicLW7o8qLsH5+RaLR2t+OHM3D0JlWGODQKQ4cxbK7WlvmUxpcj6Kgu6EKqjrGFe3QQ==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/Wombosvideo"
      }
    },
    "node_modules/type-check": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/type-check/-/type-check-0.4.0.tgz",
      "integrity": "sha512-XleUoc9uwGXqjWwXaUTZAmzMcFZ5858QA2vvx1Ur5xIcixXIP+8LnFDgRplU30us6teqdlskFfu+ae4K79Ooew==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "prelude-ls": "^1.2.1"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/type-is": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/type-is/-/type-is-2.1.0.tgz",
      "integrity": "sha512-faYHw0anBbc/kWF3zFTEnxSFOAGUX9GFbOBthvDdLsIlEoWOFOtS0zgCiQYwIskL9iGXZL3kAXD8OoZ4GmMATA==",
      "license": "MIT",
      "dependencies": {
        "content-type": "^2.0.0",
        "media-typer": "^1.1.0",
        "mime-types": "^3.0.0"
      },
      "engines": {
        "node": ">= 18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/type-is/node_modules/content-type": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/content-type/-/content-type-2.1.0.tgz",
      "integrity": "sha512-mj7UPXE0jaqaOsukNZRUEfEi2AcL7C/vwmwcHV0O97eO1E1pxBZuyjlZrx5seTaNBg1U6+o35wpa35Qfcc+7ag==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/typed-array-buffer": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/typed-array-buffer/-/typed-array-buffer-1.0.3.tgz",
      "integrity": "sha512-nAYYwfY3qnzX30IkA6AQZjVbtK6duGontcQm1WSG1MD94YLqK0515GNApXkoxKOWMusVssAHWLh9SeaoefYFGw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "es-errors": "^1.3.0",
        "is-typed-array": "^1.1.14"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/typed-array-byte-length": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/typed-array-byte-length/-/typed-array-byte-length-1.0.3.tgz",
      "integrity": "sha512-BaXgOuIxz8n8pIq3e7Atg/7s+DpiYrxn4vdot3w9KbnBhcRQq6o3xemQdIfynqSeXeDrF32x+WvfzmOjPiY9lg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "for-each": "^0.3.3",
        "gopd": "^1.2.0",
        "has-proto": "^1.2.0",
        "is-typed-array": "^1.1.14"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/typed-array-byte-offset": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/typed-array-byte-offset/-/typed-array-byte-offset-1.0.5.tgz",
      "integrity": "sha512-0FHJvLPqZ7KJzp17O13jfsAjsqazgrxBu2zEK95PmUz8lv2+GjRuxUInCr2Rk9Dms3ihN21zJ929ZO43yJ95QQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "available-typed-arrays": "^1.0.7",
        "call-bind": "^1.0.9",
        "for-each": "^0.3.5",
        "gopd": "^1.2.0",
        "is-typed-array": "^1.1.15",
        "reflect.getprototypeof": "^1.0.10"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/typed-array-length": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/typed-array-length/-/typed-array-length-1.0.8.tgz",
      "integrity": "sha512-phPGCwqr2+Qo0fwniCE8e4pKnGu/yFb5nD5Y8bf0EEeiI5GklnACYA9GFy/DrAeRrKHXvHn+1SUsOWgJp6RO+g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.9",
        "for-each": "^0.3.5",
        "gopd": "^1.2.0",
        "is-typed-array": "^1.1.15",
        "possible-typed-array-names": "^1.1.0",
        "reflect.getprototypeof": "^1.0.10"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/typescript": {
      "version": "5.9.3",
      "resolved": "https://registry.npmjs.org/typescript/-/typescript-5.9.3.tgz",
      "integrity": "sha512-jl1vZzPDinLr9eUt3J/t7V6FgNEw9QjvBPdysz9KfQDD41fQrC2Y4vKQdiaUpFT4bXlb1RHhLpp8wtm6M5TgSw==",
      "devOptional": true,
      "license": "Apache-2.0",
      "bin": {
        "tsc": "bin/tsc",
        "tsserver": "bin/tsserver"
      },
      "engines": {
        "node": ">=14.17"
      }
    },
    "node_modules/typescript-eslint": {
      "version": "8.70.1",
      "resolved": "https://registry.npmjs.org/typescript-eslint/-/typescript-eslint-8.70.1.tgz",
      "integrity": "sha512-AcWG7KDjZ2THNXsgwttMaGmzVi0VFRlFYfqFHYQRbDpF3owuYbuiL8c7UUrd2k8s3PoSfIQrWfrGXfcElrWLYA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/eslint-plugin": "8.70.1",
        "@typescript-eslint/parser": "8.70.1",
        "@typescript-eslint/typescript-estree": "8.70.1",
        "@typescript-eslint/utils": "8.70.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/unbox-primitive": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/unbox-primitive/-/unbox-primitive-1.1.0.tgz",
      "integrity": "sha512-nWJ91DjeOkej/TA8pXQ3myruKpKEYgqvpw9lz4OPHj/NWFNluYrjbz9j01CJ8yKQd2g4jFoOkINCTW2I5LEEyw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "has-bigints": "^1.0.2",
        "has-symbols": "^1.1.0",
        "which-boxed-primitive": "^1.1.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/undici": {
      "version": "7.30.0",
      "resolved": "https://registry.npmjs.org/undici/-/undici-7.30.0.tgz",
      "integrity": "sha512-dkrQXeHSaoamnItlYbmzG0wFYrM0ZwDxCIg0A7aKjTyyhh9svRzCNFEzV+Vm05/yehjCzjDZ31KXfGEjYSztDQ==",
      "license": "MIT",
      "engines": {
        "node": ">=20.18.1"
      }
    },
    "node_modules/undici-types": {
      "version": "6.21.0",
      "resolved": "https://registry.npmjs.org/undici-types/-/undici-types-6.21.0.tgz",
      "integrity": "sha512-iwDZqg0QAGrg9Rav5H4n0M64c3mkR59cJ6wQp+7C4nI0gsmExaedaYLNO44eT4AtBBwjbTiGPMlt2Md0T9H9JQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/unicorn-magic": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/unicorn-magic/-/unicorn-magic-0.3.0.tgz",
      "integrity": "sha512-+QBBXBCvifc56fsbuxZQ6Sic3wqqc3WWaqxs58gvJrcOuN83HGTCwz3oS5phzU9LthRNE9VrJCFCLUgHeeFnfA==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/universalify": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/universalify/-/universalify-2.0.1.tgz",
      "integrity": "sha512-gptHNQghINnc/vTGIk0SOFGFNXw7JVrlRUtConJRlvaw6DuX0wO5Jeko9sWrMBhh+PsYAZ7oXAiOnf/UKogyiw==",
      "license": "MIT",
      "engines": {
        "node": ">= 10.0.0"
      }
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
    "node_modules/unrs-resolver": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/unrs-resolver/-/unrs-resolver-1.12.2.tgz",
      "integrity": "sha512-dmlRxBJJayXjqTwC+JtF1HhJmgf3ftQ3YejFcZrf4+KKtJv0qDsK1pjqaaVjG7wJ5NJ6UVP1OqRMQ71Z4C3rxQ==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "dependencies": {
        "napi-postinstall": "^0.3.4"
      },
      "funding": {
        "url": "https://opencollective.com/unrs-resolver"
      },
      "optionalDependencies": {
        "@unrs/resolver-binding-android-arm-eabi": "1.12.2",
        "@unrs/resolver-binding-android-arm64": "1.12.2",
        "@unrs/resolver-binding-darwin-arm64": "1.12.2",
        "@unrs/resolver-binding-darwin-x64": "1.12.2",
        "@unrs/resolver-binding-freebsd-x64": "1.12.2",
        "@unrs/resolver-binding-linux-arm-gnueabihf": "1.12.2",
        "@unrs/resolver-binding-linux-arm-musleabihf": "1.12.2",
        "@unrs/resolver-binding-linux-arm64-gnu": "1.12.2",
        "@unrs/resolver-binding-linux-arm64-musl": "1.12.2",
        "@unrs/resolver-binding-linux-loong64-gnu": "1.12.2",
        "@unrs/resolver-binding-linux-loong64-musl": "1.12.2",
        "@unrs/resolver-binding-linux-ppc64-gnu": "1.12.2",
        "@unrs/resolver-binding-linux-riscv64-gnu": "1.12.2",
        "@unrs/resolver-binding-linux-riscv64-musl": "1.12.2",
        "@unrs/resolver-binding-linux-s390x-gnu": "1.12.2",
        "@unrs/resolver-binding-linux-x64-gnu": "1.12.2",
        "@unrs/resolver-binding-linux-x64-musl": "1.12.2",
        "@unrs/resolver-binding-openharmony-arm64": "1.12.2",
        "@unrs/resolver-binding-wasm32-wasi": "1.12.2",
        "@unrs/resolver-binding-win32-arm64-msvc": "1.12.2",
        "@unrs/resolver-binding-win32-ia32-msvc": "1.12.2",
        "@unrs/resolver-binding-win32-x64-msvc": "1.12.2"
      }
    },
    "node_modules/update-browserslist-db": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/update-browserslist-db/-/update-browserslist-db-1.3.3.tgz",
      "integrity": "sha512-pJ2sYawQS0R/WI928Gj5GlPhTGzbMelq0+4INtSYNDV9ErKJcX6xjGWkoG/VnB3dpUm00zALaqkrUD77pO5TDQ==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "escalade": "^3.2.0",
        "picocolors": "^1.1.1"
      },
      "bin": {
        "update-browserslist-db": "cli.js"
      },
      "peerDependencies": {
        "browserslist": ">= 4.21.0"
      }
    },
    "node_modules/uri-js": {
      "version": "4.4.1",
      "resolved": "https://registry.npmjs.org/uri-js/-/uri-js-4.4.1.tgz",
      "integrity": "sha512-7rKUyy33Q1yc98pQ1DAmLtwX109F7TIfWlW1Ydo8Wl1ii1SeHieeh0HHfPeL2fMXK6z0s8ecKs9frCuLJvndBg==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "punycode": "^2.1.0"
      }
    },
    "node_modules/use-sync-external-store": {
      "version": "1.7.0",
      "resolved": "https://registry.npmjs.org/use-sync-external-store/-/use-sync-external-store-1.7.0.tgz",
      "integrity": "sha512-6L+EeigHMQhdaIPNIFUKwfWJSwWFQ8gJbJ2DLOs5sDIegTwR9fRxvnM3uciHKjIZhFz+KAv2emhWMRvDmMcY8A==",
      "license": "MIT",
      "peerDependencies": {
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/util-deprecate": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/util-deprecate/-/util-deprecate-1.0.2.tgz",
      "integrity": "sha512-EPD5q1uXyFxJpCrLnCc1nHnq3gOa6DZBocAIiI2TaSCA7VCJ1UJDMagCzIkXNsUYfD1daK//LTEQ8xiIbrHtcw==",
      "license": "MIT"
    },
    "node_modules/validate-npm-package-name": {
      "version": "7.0.2",
      "resolved": "https://registry.npmjs.org/validate-npm-package-name/-/validate-npm-package-name-7.0.2.tgz",
      "integrity": "sha512-hVDIBwsRruT73PbK7uP5ebUt+ezEtCmzZz3F59BSr2F6OVFnJ/6h8liuvdLrQ88Xmnk6/+xGGuq+pG9WwTuy3A==",
      "license": "ISC",
      "engines": {
        "node": "^20.17.0 || >=22.9.0"
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
    "node_modules/which": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/which/-/which-2.0.2.tgz",
      "integrity": "sha512-BLI3Tl1TW3Pvl70l3yq3Y64i+awpwXqsGBYWkkqMtnbXgrMD+yj7rhW0kuEDxzJaYXGjEW5ogapKNMEKNMjibA==",
      "license": "ISC",
      "dependencies": {
        "isexe": "^2.0.0"
      },
      "bin": {
        "node-which": "bin/node-which"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/which-boxed-primitive": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/which-boxed-primitive/-/which-boxed-primitive-1.1.1.tgz",
      "integrity": "sha512-TbX3mj8n0odCBFVlY8AxkqcHASw3L60jIuF8jFP78az3C2YhmGvqbHBpAjTRH2/xqYunrJ9g1jSyjCjpoWzIAA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-bigint": "^1.1.0",
        "is-boolean-object": "^1.2.1",
        "is-number-object": "^1.1.1",
        "is-string": "^1.1.1",
        "is-symbol": "^1.1.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/which-builtin-type": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/which-builtin-type/-/which-builtin-type-1.2.1.tgz",
      "integrity": "sha512-6iBczoX+kDQ7a3+YJBnh3T+KZRxM/iYNPXicqk66/Qfm1b93iu+yOImkg0zHbj5LNOcNv1TEADiZ0xa34B4q6Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "function.prototype.name": "^1.1.6",
        "has-tostringtag": "^1.0.2",
        "is-async-function": "^2.0.0",
        "is-date-object": "^1.1.0",
        "is-finalizationregistry": "^1.1.0",
        "is-generator-function": "^1.0.10",
        "is-regex": "^1.2.1",
        "is-weakref": "^1.0.2",
        "isarray": "^2.0.5",
        "which-boxed-primitive": "^1.1.0",
        "which-collection": "^1.0.2",
        "which-typed-array": "^1.1.16"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/which-collection": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/which-collection/-/which-collection-1.0.2.tgz",
      "integrity": "sha512-K4jVyjnBdgvc86Y6BkaLZEN933SwYOuBFkdmBu9ZfkcAbdVbpITnDmjvZ/aQjRXQrv5EPkTnD1s39GiiqbngCw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-map": "^2.0.3",
        "is-set": "^2.0.3",
        "is-weakmap": "^2.0.2",
        "is-weakset": "^2.0.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/which-typed-array": {
      "version": "1.1.24",
      "resolved": "https://registry.npmjs.org/which-typed-array/-/which-typed-array-1.1.24.tgz",
      "integrity": "sha512-wk4Mf4pR5mRP7eYuuTBCIQ9d0ud2Fv2jRLQpfgnRjbOxAFHmjKFValgTpitVKzJJS8ajnYQV2Du1SZ8j6b/EUQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "available-typed-arrays": "^1.0.7",
        "call-bind": "^1.0.9",
        "call-bound": "^1.0.4",
        "for-each": "^0.3.5",
        "get-proto": "^1.0.1",
        "gopd": "^1.2.0",
        "has-tostringtag": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/word-wrap": {
      "version": "1.2.5",
      "resolved": "https://registry.npmjs.org/word-wrap/-/word-wrap-1.2.5.tgz",
      "integrity": "sha512-BN22B5eaMMI9UMtjrGd5g5eCYPpCPDUy0FJXbYsaT5zYxjFOckS53SQDE3pWkVoWpHXVb3BrYcEN4Twa55B5cA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/wrappy": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/wrappy/-/wrappy-1.0.2.tgz",
      "integrity": "sha512-l4Sp/DRseor9wL6EvV2+TuQn63dMkPjZ/sp9XkghTEbV9KlPS1xUsZ3u7/IQO4wxtcFB4bgpQPRcR3QCvezPcQ==",
      "license": "ISC"
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
    "node_modules/wsl-utils": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/wsl-utils/-/wsl-utils-1.0.0.tgz",
      "integrity": "sha512-Hl0ZOAs672vg+06kfujwRhoS6/jehvULrlFkuF2dRu6pHgA8U06h3xqNIqNNU1LTXPcedxByAR4GS6pwQK0mgA==",
      "license": "MIT",
      "dependencies": {
        "is-wsl": "^3.1.0",
        "powershell-utils": "^0.1.0"
      },
      "engines": {
        "node": ">=20"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/wsl-utils/node_modules/powershell-utils": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/powershell-utils/-/powershell-utils-0.1.0.tgz",
      "integrity": "sha512-dM0jVuXJPsDN6DvRpea484tCUaMiXWjuCn++HGTqUWzGDjv5tZkEZldAJ/UMlqRYGFrD/etByo4/xOuC/snX2A==",
      "license": "MIT",
      "engines": {
        "node": ">=20"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/xmlhttprequest-ssl": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/xmlhttprequest-ssl/-/xmlhttprequest-ssl-2.1.2.tgz",
      "integrity": "sha512-TEU+nJVUUnA4CYJFLvK5X9AOeH4KvDvhIfm0vV1GaQRtchnG0hgK5p8hw/xjv8cunWYCsiPCSDzObPyhEwq3KQ==",
      "engines": {
        "node": ">=0.4.0"
      }
    },
    "node_modules/yallist": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/yallist/-/yallist-3.1.1.tgz",
      "integrity": "sha512-a4UGQaWPH59mOXUYnAG2ewncQS4i4F43Tv3JoAM+s2VDAmS9NsK8GpDMLrCHPksFT7h3K6TOoUNn2pb7RoXx4g==",
      "license": "ISC"
    },
    "node_modules/yocto-queue": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/yocto-queue/-/yocto-queue-0.1.0.tgz",
      "integrity": "sha512-rVksvsnNCdJ/ohGc6xgPwyN8eheCxsiLM8mxuE/t/mOVqJewPuO1miLpTHQiRgTKCLexL4MeAFVagts7HmNZ2Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/yocto-spinner": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/yocto-spinner/-/yocto-spinner-1.2.2.tgz",
      "integrity": "sha512-DODGl1wJjA/s5pnJFKau9lIYHT81lnhob1i3e1TjxZRxEhWRKl74nTbWE6H5KlkViQQTo/Z29YFdxzTZAMY3ng==",
      "license": "MIT",
      "dependencies": {
        "yoctocolors": "^2.1.1"
      },
      "engines": {
        "node": ">=18.19"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/yoctocolors": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/yoctocolors/-/yoctocolors-2.2.0.tgz",
      "integrity": "sha512-xYqdZFUK/VYazNl/oCDYN+3WloWQwMfZxBoiNt6qNyk+xfOdi598muWE42rNZFp1kNOiqW936q5RhUdnpqElSg==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
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
    },
    "node_modules/zod-to-json-schema": {
      "version": "3.25.2",
      "resolved": "https://registry.npmjs.org/zod-to-json-schema/-/zod-to-json-schema-3.25.2.tgz",
      "integrity": "sha512-O/PgfnpT1xKSDeQYSCfRI5Gy3hPf91mKVDuYLUHZJMiDFptvP41MSnWofm8dnCm0256ZNfZIM7DSzuSMAFnjHA==",
      "license": "ISC",
      "peerDependencies": {
        "zod": "^3.25.28 || ^4"
      }
    },
    "node_modules/zod-validation-error": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/zod-validation-error/-/zod-validation-error-4.0.2.tgz",
      "integrity": "sha512-Q6/nZLe6jxuU80qb/4uJ4t5v2VEZ44lzQjPDhYJNztRQ4wyWc6VF3D3Kb/fAuPetZQnhS3hnajCf9CsWesghLQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18.0.0"
      },
      "peerDependencies": {
        "zod": "^3.25.0 || ^4.0.0"
      }
    },
    "node_modules/zustand": {
      "version": "5.0.15",
      "resolved": "https://registry.npmjs.org/zustand/-/zustand-5.0.15.tgz",
      "integrity": "sha512-MpSEjRiBkA9crSYeOUH32rJC7SVqAbm0Fqcqge/bUi2PPoLcBWKOsG+C8mevmpr8TwXHBVkChbbJiyvkE+i/3A==",
      "license": "MIT",
      "engines": {
        "node": ">=12.20.0"
      },
      "peerDependencies": {
        "@types/react": ">=18.0.0",
        "immer": ">=9.0.6",
        "react": ">=18.0.0",
        "use-sync-external-store": ">=1.2.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "immer": {
          "optional": true
        },
        "react": {
          "optional": true
        },
        "use-sync-external-store": {
          "optional": true
        }
      }
    }
  }
}

```

# package.json

| Property | Value |
|----------|-------|
| Path | `package.json` |
| Size | 1,238 bytes |
| Extension | `.json` |
| Modified | 2026-10-02 15:13:23.442663 |

```json
{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  },
  "dependencies": {
    "@base-ui/react": "^1.8.0",
    "@hookform/resolvers": "^5.9.1",
    "@tanstack/react-query": "^5.104.0",
    "axios": "^1.20.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cookies-next": "^6.1.1",
    "date-fns": "^4.4.0",
    "lucide-react": "^1.49.0",
    "next": "16.3.6",
    "react": "19.2.8",
    "react-dom": "19.2.8",
    "react-hook-form": "^7.89.0",
    "shadcn": "^4.21.0",
    "socket.io-client": "^4.8.4",
    "sonner": "^2.0.8",
    "tailwind-merge": "^3.7.0",
    "tw-animate-css": "^1.4.0",
    "zod": "^3.25.76",
    "zustand": "^5.0.15"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "babel-plugin-react-compiler": "1.0.0",
    "eslint": "^9",
    "eslint-config-next": "16.3.6",
    "prettier": "^3.9.9",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}

```

# postcss.config.mjs

| Property | Value |
|----------|-------|
| Path | `postcss.config.mjs` |
| Size | 101 bytes |
| Extension | `.mjs` |
| Modified | 2026-10-01 17:02:22.904284 |

```mjs
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;

```

# public\file.svg

| Property | Value |
|----------|-------|
| Path | `public\file.svg` |
| Size | 391 bytes |
| Extension | `.svg` |
| Modified | 2026-09-29 13:25:28.284932 |

> **File nhị phân** (đã bỏ qua nội dung)

# public\globe.svg

| Property | Value |
|----------|-------|
| Path | `public\globe.svg` |
| Size | 1,035 bytes |
| Extension | `.svg` |
| Modified | 2026-09-29 13:25:28.284932 |

> **File nhị phân** (đã bỏ qua nội dung)

# public\next.svg

| Property | Value |
|----------|-------|
| Path | `public\next.svg` |
| Size | 1,375 bytes |
| Extension | `.svg` |
| Modified | 2026-09-29 13:25:28.286578 |

> **File nhị phân** (đã bỏ qua nội dung)

# public\vercel.svg

| Property | Value |
|----------|-------|
| Path | `public\vercel.svg` |
| Size | 128 bytes |
| Extension | `.svg` |
| Modified | 2026-09-29 13:25:28.287602 |

> **File nhị phân** (đã bỏ qua nội dung)

# public\window.svg

| Property | Value |
|----------|-------|
| Path | `public\window.svg` |
| Size | 385 bytes |
| Extension | `.svg` |
| Modified | 2026-09-29 13:25:28.287602 |

> **File nhị phân** (đã bỏ qua nội dung)

# src\api\auth.api.ts

| Property | Value |
|----------|-------|
| Path | `src\api\auth.api.ts` |
| Size | 2,847 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 13:58:39.077677 |

```typescript
import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';
import {
  ApiResponse,
  LoginPayload,
  RegisterPayload,
  VerifyCodePayload,
  ResetPasswordPayload,
  ChangePasswordPayload,
  CreateAddressPayload,
  ShippingAddress,
  UserProfile,
} from '@/types';

export const authApi = {
  login: async (payload: LoginPayload) => {
    const res = await apiClient.post<ApiResponse<{ accessToken: string; refreshToken: string; user: UserProfile }>>(
      API_ENDPOINTS.IDENTITY.LOGIN,
      payload
    );
    return res.data;
  },

  register: async (payload: RegisterPayload) => {
    const res = await apiClient.post<ApiResponse<{ message: string }>>(
      API_ENDPOINTS.IDENTITY.REGISTER,
      payload
    );
    return res.data;
  },

  verifyCode: async (payload: VerifyCodePayload) => {
    const res = await apiClient.post<ApiResponse<{ message: string }>>(
      API_ENDPOINTS.IDENTITY.VERIFY_CODE,
      payload
    );
    return res.data;
  },

  forgotPassword: async (email: string) => {
    const res = await apiClient.post<ApiResponse<{ message: string }>>(
      API_ENDPOINTS.IDENTITY.FORGOT_PASSWORD,
      { email }
    );
    return res.data;
  },

  resetPassword: async (payload: ResetPasswordPayload) => {
    const res = await apiClient.post<ApiResponse<{ message: string }>>(
      API_ENDPOINTS.IDENTITY.RESET_PASSWORD,
      payload
    );
    return res.data;
  },

  changePassword: async (payload: ChangePasswordPayload) => {
    const res = await apiClient.post<ApiResponse<{ message: string }>>(
      API_ENDPOINTS.IDENTITY.CHANGE_PASSWORD,
      payload
    );
    return res.data;
  },

  logout: async (refreshToken: string) => {
    const res = await apiClient.post<ApiResponse<{ message: string }>>(
      API_ENDPOINTS.IDENTITY.LOGOUT,
      { refreshToken }
    );
    return res.data;
  },

  // Sổ địa chỉ
  getAddresses: async () => {
    const res = await apiClient.get<ApiResponse<ShippingAddress[]>>(
      API_ENDPOINTS.IDENTITY.ADDRESSES
    );
    return res.data;
  },

  createAddress: async (payload: CreateAddressPayload) => {
    const res = await apiClient.post<ApiResponse<ShippingAddress>>(
      API_ENDPOINTS.IDENTITY.ADDRESSES,
      payload
    );
    return res.data;
  },

  updateAddress: async (addressId: number, payload: Partial<CreateAddressPayload>) => {
    const res = await apiClient.put<ApiResponse<ShippingAddress>>(
      `${API_ENDPOINTS.IDENTITY.ADDRESSES}/${addressId}`,
      payload
    );
    return res.data;
  },

  deleteAddress: async (addressId: number) => {
    const res = await apiClient.delete<ApiResponse<{ message: string }>>(
      `${API_ENDPOINTS.IDENTITY.ADDRESSES}/${addressId}`
    );
    return res.data;
  },
};
```

# src\api\cart.api.ts

| Property | Value |
|----------|-------|
| Path | `src\api\cart.api.ts` |
| Size | 1,307 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 13:57:29.118371 |

```typescript
import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';
import { ApiResponse, Cart, AddToCartPayload, UpdateCartItemPayload } from '@/types';

export const cartApi = {
  getCart: async () => {
    const res = await apiClient.get<ApiResponse<Cart>>(API_ENDPOINTS.CART_ORDER.CART);
    return res.data;
  },

  addToCart: async (payload: AddToCartPayload) => {
    const res = await apiClient.post<ApiResponse<Cart>>(
      API_ENDPOINTS.CART_ORDER.CART_ITEMS,
      payload
    );
    return res.data;
  },

  updateCartItem: async (itemId: number, payload: UpdateCartItemPayload) => {
    const res = await apiClient.patch<ApiResponse<Cart>>(
      `${API_ENDPOINTS.CART_ORDER.CART_ITEMS}/${itemId}`,
      payload
    );
    return res.data;
  },

  removeCartItem: async (itemId: number) => {
    const res = await apiClient.delete<ApiResponse<Cart>>(
      `${API_ENDPOINTS.CART_ORDER.CART_ITEMS}/${itemId}`
    );
    return res.data;
  },

  clearCart: async () => {
    const res = await apiClient.delete<ApiResponse<Cart>>(API_ENDPOINTS.CART_ORDER.CART);
    return res.data;
  },

  mergeCart: async () => {
    const res = await apiClient.post<ApiResponse<Cart>>(API_ENDPOINTS.CART_ORDER.CART_MERGE);
    return res.data;
  },
};
```

# src\api\catalog.api.ts

| Property | Value |
|----------|-------|
| Path | `src\api\catalog.api.ts` |
| Size | 2,920 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 13:57:12.065782 |

```typescript
import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';
import {
  ApiResponse,
  PaginatedResult,
  Product,
  Category,
  Brand,
  Tag,
  ProductVariant,
  SyncVariantsPayload,
  BasePaginationQuery,
} from '@/types';

interface ProductQuery extends BasePaginationQuery {
  categoryId?: number;
  brandId?: number;
  status?: string;
}

export const catalogApi = {
  // Sản phẩm
  getProducts: async (query?: ProductQuery) => {
    const res = await apiClient.get<PaginatedResult<Product>>(API_ENDPOINTS.CATALOG.PRODUCTS, {
      params: query,
    });
    return res.data;
  },

  getProductById: async (productId: number, lang = 'vi') => {
    const res = await apiClient.get<ApiResponse<Product>>(
      `${API_ENDPOINTS.CATALOG.PRODUCTS}/${productId}`,
      { params: { lang } }
    );
    return res.data;
  },

  createProduct: async (payload: any) => {
    const res = await apiClient.post<ApiResponse<Product>>(
      API_ENDPOINTS.CATALOG.PRODUCTS,
      payload
    );
    return res.data;
  },

  updateProduct: async (productId: number, payload: any) => {
    const res = await apiClient.put<ApiResponse<Product>>(
      `${API_ENDPOINTS.CATALOG.PRODUCTS}/${productId}`,
      payload
    );
    return res.data;
  },

  deleteProduct: async (productId: number) => {
    const res = await apiClient.delete<ApiResponse<{ message: string }>>(
      `${API_ENDPOINTS.CATALOG.PRODUCTS}/${productId}`
    );
    return res.data;
  },

  // Danh mục & Thương hiệu
  getCategories: async (lang = 'vi') => {
    const res = await apiClient.get<{ data: Category[]; totalItems: number }>(
      API_ENDPOINTS.CATALOG.CATEGORIES,
      { params: { lang } }
    );
    return res.data;
  },

  getBrands: async (query?: BasePaginationQuery) => {
    const res = await apiClient.get<PaginatedResult<Brand>>(API_ENDPOINTS.CATALOG.BRANDS, {
      params: query,
    });
    return res.data;
  },

  getTags: async () => {
    const res = await apiClient.get<PaginatedResult<Tag>>(API_ENDPOINTS.CATALOG.TAGS);
    return res.data;
  },

  // Biến thể & Tồn kho
  getVariantsByProductId: async (productId: number) => {
    const res = await apiClient.get<ApiResponse<ProductVariant[]>>(
      `${API_ENDPOINTS.CATALOG.VARIANTS}/products/${productId}`
    );
    return res.data;
  },

  syncVariants: async (payload: SyncVariantsPayload) => {
    const res = await apiClient.post<ApiResponse<ProductVariant[]>>(
      `${API_ENDPOINTS.CATALOG.VARIANTS}/sync`,
      payload
    );
    return res.data;
  },

  updateVariantStock: async (variantId: number, quantityChange: number) => {
    const res = await apiClient.patch<ApiResponse<ProductVariant>>(
      `${API_ENDPOINTS.CATALOG.VARIANTS}/${variantId}/stock`,
      { quantityChange }
    );
    return res.data;
  },
};
```

# src\api\client.ts

| Property | Value |
|----------|-------|
| Path | `src\api\client.ts` |
| Size | 2,884 bytes |
| Extension | `.ts` |
| Modified | 2026-10-05 20:42:08.849983 |

```typescript
// src/api/client.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_ENDPOINTS } from './endpoints';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  adapter: 'fetch',
  headers: {
    'Content-Type': 'application/json',
  },
});

const getClientCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
};

// 1. Request Interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken') || getClientCookie('accessToken');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      let sessionId = localStorage.getItem('sessionId');
      if (!sessionId) {
        sessionId = crypto.randomUUID();
        localStorage.setItem('sessionId', sessionId);
      }
      if (config.headers) {
        config.headers['x-session-id'] = sessionId;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 2. Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;

      if (!refreshToken) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${BASE_URL}${API_ENDPOINTS.IDENTITY.REFRESH}`, {
          refreshToken,
        });
        const newAccessToken = response.data.data.accessToken;

        localStorage.setItem('accessToken', newAccessToken);
        document.cookie = `accessToken=${newAccessToken}; path=/; max-age=3600`;

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return apiClient(originalRequest);
      } catch (err) {
        if (typeof window !== 'undefined') {
          localStorage.clear();
          window.location.href = '/login';
        }
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);
```

# src\api\endpoints.ts

| Property | Value |
|----------|-------|
| Path | `src\api\endpoints.ts` |
| Size | 1,366 bytes |
| Extension | `.ts` |
| Modified | 2026-10-05 20:42:08.851981 |

```typescript
export const API_ENDPOINTS = {
  IDENTITY: {
    LOGIN: '/identity/auth/login',
    REGISTER: '/identity/auth/register',
    REFRESH: '/identity/auth/refresh',
    VERIFY_CODE: '/identity/auth/verify-code',
    FORGOT_PASSWORD: '/identity/auth/forgot-password',
    RESET_PASSWORD: '/identity/auth/reset-password',
    CHANGE_PASSWORD: '/identity/auth/change-password',
    LOGOUT: '/identity/auth/logout',
    ADDRESSES: '/identity/addresses',
    USERS: '/identity/users',
    ROLES: '/identity/roles',
    PERMISSIONS: '/identity/roles/permissions',
  },
  CATALOG: {
    PRODUCTS: '/catalog/products',
    CATEGORIES: '/catalog/categories',
    BRANDS: '/catalog/brands',
    TAGS: '/catalog/tags',
    VARIANTS: '/catalog/variants',
  },
  CART_ORDER: {
    CART: '/cart-order/cart',
    CART_ITEMS: '/cart-order/cart/items',
    CART_MERGE: '/cart-order/cart/merge',
    ORDERS: '/cart-order/orders',
  },
  FULFILLMENT: {
    SHIPMENTS: '/fulfillment/shipments',
    PAYMENTS: '/fulfillment/payments',
    RETURNS: '/fulfillment/returns',
  },
  INVENTORY_SALE: {
    INVENTORY: '/inventory-sale/inventory',
    FLASH_SALES: '/inventory-sale/flash-sales',
  },
  LOYALTY_ENGAGE: {
    VOUCHERS: '/loyalty-engage/vouchers',
    POINTS: '/loyalty-engage/points',
    REVIEWS: '/loyalty-engage/reviews',
  },
} as const;
```

# src\api\flash-sale.api.ts

| Property | Value |
|----------|-------|
| Path | `src\api\flash-sale.api.ts` |
| Size | 2,062 bytes |
| Extension | `.ts` |
| Modified | 2026-10-05 20:42:08.852981 |

```typescript
import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';
import {
  ApiResponse,
  PaginatedResult,
  FlashSaleCampaign,
  CreateFlashSaleInput,
  UpdateFlashSaleInput,
  GetFlashSaleQuery,
} from '@/types';

export const flashSaleApi = {
  // Lấy danh sách các chiến dịch Flash Sale đang hoạt động (cho khách hàng)
  getActiveCampaigns: async () => {
    const res = await apiClient.get<ApiResponse<FlashSaleCampaign[]>>(
      `${API_ENDPOINTS.INVENTORY_SALE.FLASH_SALES}/active`
    );
    return res.data;
  },

  // Lấy danh sách chiến dịch Flash Sale có phân trang / lọc
  getCampaigns: async (query?: GetFlashSaleQuery) => {
    const res = await apiClient.get<PaginatedResult<FlashSaleCampaign>>(
      API_ENDPOINTS.INVENTORY_SALE.FLASH_SALES,
      { params: query }
    );
    return res.data;
  },

  // Chi tiết chiến dịch Flash Sale theo ID
  getCampaignById: async (campaignId: number) => {
    const res = await apiClient.get<ApiResponse<FlashSaleCampaign>>(
      `${API_ENDPOINTS.INVENTORY_SALE.FLASH_SALES}/${campaignId}`
    );
    return res.data;
  },

  // [ADMIN] Tạo chiến dịch Flash Sale mới
  createCampaign: async (payload: CreateFlashSaleInput) => {
    const res = await apiClient.post<ApiResponse<FlashSaleCampaign>>(
      API_ENDPOINTS.INVENTORY_SALE.FLASH_SALES,
      payload
    );
    return res.data;
  },

  // [ADMIN] Cập nhật chiến dịch Flash Sale
  updateCampaign: async (campaignId: number, payload: UpdateFlashSaleInput) => {
    const res = await apiClient.put<ApiResponse<FlashSaleCampaign>>(
      `${API_ENDPOINTS.INVENTORY_SALE.FLASH_SALES}/${campaignId}`,
      payload
    );
    return res.data;
  },

  // [ADMIN] Xóa chiến dịch Flash Sale
  deleteCampaign: async (campaignId: number) => {
    const res = await apiClient.delete<ApiResponse<{ message: string }>>(
      `${API_ENDPOINTS.INVENTORY_SALE.FLASH_SALES}/${campaignId}`
    );
    return res.data;
  },
};

```

# src\api\index.ts

| Property | Value |
|----------|-------|
| Path | `src\api\index.ts` |
| Size | 210 bytes |
| Extension | `.ts` |
| Modified | 2026-10-05 20:42:08.854136 |

```typescript
export * from './endpoints';
export * from './client';
export * from './auth.api';
export * from './catalog.api';
export * from './cart.api';
export * from './order.api';
export * from './flash-sale.api';
```

# src\api\order.api.ts

| Property | Value |
|----------|-------|
| Path | `src\api\order.api.ts` |
| Size | 1,454 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 14:03:05.883730 |

```typescript
import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';
import {
  ApiResponse,
  PaginatedResult,
  Order,
  CreateOrderPayload,
  UpdateOrderStatusPayload,
  BasePaginationQuery,
} from '@/types';

interface OrderQuery extends BasePaginationQuery {
  status?: string;
}

export const orderApi = {
  createOrder: async (payload: CreateOrderPayload) => {
    const res = await apiClient.post<ApiResponse<Order>>(
      API_ENDPOINTS.CART_ORDER.ORDERS,
      payload
    );
    return res.data;
  },

  getOrders: async (query?: OrderQuery) => {
    const res = await apiClient.get<PaginatedResult<Order>>(
      API_ENDPOINTS.CART_ORDER.ORDERS,
      { params: query }
    );
    return res.data;
  },

  getOrderById: async (orderId: number) => {
    const res = await apiClient.get<ApiResponse<Order>>(
      `${API_ENDPOINTS.CART_ORDER.ORDERS}/${orderId}`
    );
    return res.data;
  },

  cancelOrder: async (orderId: number) => {
    const res = await apiClient.post<ApiResponse<Order>>(
      `${API_ENDPOINTS.CART_ORDER.ORDERS}/${orderId}/cancel`
    );
    return res.data;
  },

  // Dành riêng cho Admin
  updateOrderStatus: async (orderId: number, payload: UpdateOrderStatusPayload) => {
    const res = await apiClient.patch<ApiResponse<Order>>(
      `${API_ENDPOINTS.CART_ORDER.ORDERS}/${orderId}/status`,
      payload
    );
    return res.data;
  },
};
```

# src\app\(account)\addresses\page.tsx

| Property | Value |
|----------|-------|
| Path | `src\app\(account)\addresses\page.tsx` |
| Size | 463 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.856354 |

```tsx
import { Metadata } from 'next';
import { AddressList } from '@/modules/user/components/address-list';

export const metadata: Metadata = {
  title: 'Sổ địa chỉ — Fashion Store',
  description: 'Quản lý các địa chỉ nhận hàng của bạn.',
};

export default function AddressesPage() {
  return (
    <div className="bg-white rounded-2xl border border-[#EAE6DF] p-6 sm:p-8 shadow-xs">
      <AddressList />
    </div>
  );
}


```

# src\app\(account)\layout.tsx

| Property | Value |
|----------|-------|
| Path | `src\app\(account)\layout.tsx` |
| Size | 4,944 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.857351 |

```tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Shield, MapPin, Package, LogOut, LayoutDashboard } from 'lucide-react';
import { SiteHeader } from '@/components/layouts/site-header';
import { SiteFooter } from '@/components/layouts/site-footer';
import { useAuth } from '@/components/providers/auth-provider';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/profile', label: 'Thông tin cá nhân', icon: User },
  { href: '/addresses', label: 'Sổ địa chỉ', icon: MapPin },
  { href: '/security', label: 'Bảo mật & Mật khẩu', icon: Shield },
  { href: '/orders', label: 'Đơn mua', icon: Package },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, isAdmin, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F4]">
      <SiteHeader />

      <main className="flex-1 mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 py-8 sm:py-12">
        <div className="mb-8">
          <span className="eyebrow block mb-2">QUẢN LÝ TÀI KHOẢN</span>
          <h1 className="font-display text-3xl sm:text-4xl text-[#1D1F20] tracking-tight">
            Tài khoản của tôi
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-[#EAE6DF] p-6 shadow-xs sticky top-28 space-y-6">
              {/* User overview */}
              <div className="flex items-center gap-3.5 pb-6 border-b border-[#EAE6DF]">
                <Avatar
                  src={user?.avatarUrl}
                  alt={user?.fullName || 'User'}
                  size="lg"
                  className="size-12 ring-2 ring-[#84EA53]/30"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-neutral-900 truncate">
                    {user?.fullName || 'Người dùng'}
                  </h3>
                  <p className="text-xs text-neutral-500 truncate">{user?.email}</p>
                  <div className="mt-1">
                    <Badge variant={isAdmin ? 'lime' : 'secondary'} className="text-[10px] py-0 px-2">
                      {user?.role?.name || (isAdmin ? 'Admin' : 'Khách hàng')}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition',
                        isActive
                          ? 'bg-[#1D1F20] text-white shadow-xs'
                          : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                      )}
                    >
                      <Icon className="size-4 shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}

                {isAdmin && (
                  <Link
                    href="/admin/dashboard"
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition mt-2"
                  >
                    <LayoutDashboard className="size-4 shrink-0 text-emerald-700" />
                    <span>Trang quản trị (Admin)</span>
                  </Link>
                )}
              </nav>

              {/* Logout Button */}
              <div className="pt-4 border-t border-[#EAE6DF]">
                <button
                  type="button"
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50 transition"
                >
                  <LogOut className="size-4 shrink-0" />
                  <span>Đăng xuất</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Content Area */}
          <section className="lg:col-span-3">
            {children}
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}


```

# src\app\(account)\orders\[orderId]\page.tsx

| Property | Value |
|----------|-------|
| Path | `src\app\(account)\orders\[orderId]\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:35.673574 |

```tsx

```

# src\app\(account)\orders\[orderId]\return\page.tsx

| Property | Value |
|----------|-------|
| Path | `src\app\(account)\orders\[orderId]\return\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:35.705497 |

```tsx

```

# src\app\(account)\orders\[orderId]\review\[productId]\page.tsx

| Property | Value |
|----------|-------|
| Path | `src\app\(account)\orders\[orderId]\review\[productId]\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:35.707495 |

```tsx

```

# src\app\(account)\orders\page.tsx

| Property | Value |
|----------|-------|
| Path | `src\app\(account)\orders\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:35.427431 |

```tsx

```

# src\app\(account)\profile\page.tsx

| Property | Value |
|----------|-------|
| Path | `src\app\(account)\profile\page.tsx` |
| Size | 848 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.858479 |

```tsx
import { Metadata } from 'next';
import { ProfileForm } from '@/modules/user/components/profile-form';

export const metadata: Metadata = {
  title: 'Hồ sơ cá nhân — Fashion Store',
  description: 'Quản lý thông tin cá nhân và điểm thưởng tài khoản của bạn.',
};

export default function ProfilePage() {
  return (
    <div className="bg-white rounded-2xl border border-[#EAE6DF] p-6 sm:p-8 shadow-xs">
      <div className="pb-6 border-b border-[#EAE6DF] mb-6">
        <h2 className="text-xl font-semibold text-neutral-900">
          Thông tin cá nhân
        </h2>
        <p className="text-xs text-neutral-500 mt-1">
          Cập nhật thông tin chi tiết để hỗ trợ giao hàng và liên hệ nhanh chóng.
        </p>
      </div>

      <ProfileForm />
    </div>
  );
}


```

# src\app\(account)\security\page.tsx

| Property | Value |
|----------|-------|
| Path | `src\app\(account)\security\page.tsx` |
| Size | 4,812 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.860386 |

```tsx
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, ShieldCheck } from 'lucide-react';
import { changePasswordSchema, type ChangePasswordFormData } from '@/modules/auth/schemas';
import { useAuth } from '@/modules/auth/hooks/use-auth';
import { FormField } from '@/components/ui/form-field';
import { Button } from '@/components/ui/button';

export default function SecurityPage() {
  const [showOld, setShowOld] = React.useState(false);
  const [showNew, setShowNew] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const { changePasswordMutation } = useAuth();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: ChangePasswordFormData) => {
    changePasswordMutation.mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-[#EAE6DF] p-6 sm:p-8 shadow-xs">
      <div className="pb-6 border-b border-[#EAE6DF] mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900">
            Bảo mật & Đổi mật khẩu
          </h2>
          <p className="text-xs text-neutral-500 mt-1">
            Định kỳ thay đổi mật khẩu để bảo vệ an toàn cho tài khoản và thông tin mua hàng.
          </p>
        </div>
        <div className="p-2.5 rounded-xl bg-neutral-100 text-neutral-800 hidden sm:block">
          <ShieldCheck className="size-5" />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-lg">
        <div className="relative">
          <FormField
            control={control}
            name="oldPassword"
            label="Mật khẩu hiện tại"
            type={showOld ? 'text' : 'password'}
            placeholder="••••••••"
            error={errors.oldPassword?.message}
          />
          <button
            type="button"
            onClick={() => setShowOld(!showOld)}
            className="absolute right-3.5 top-[34px] text-neutral-400 hover:text-neutral-700 transition"
            tabIndex={-1}
          >
            {showOld ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>

        <div className="relative">
          <FormField
            control={control}
            name="newPassword"
            label="Mật khẩu mới"
            type={showNew ? 'text' : 'password'}
            placeholder="Tối thiểu 8 ký tự (hoa, thường, số, ký tự)"
            error={errors.newPassword?.message}
          />
          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute right-3.5 top-[34px] text-neutral-400 hover:text-neutral-700 transition"
            tabIndex={-1}
          >
            {showNew ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>

        <div className="relative">
          <FormField
            control={control}
            name="confirmPassword"
            label="Xác nhận mật khẩu mới"
            type={showConfirm ? 'text' : 'password'}
            placeholder="Nhập lại mật khẩu mới"
            error={errors.confirmPassword?.message}
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3.5 top-[34px] text-neutral-400 hover:text-neutral-700 transition"
            tabIndex={-1}
          >
            {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            disabled={changePasswordMutation.isPending}
            className="h-11 px-8 rounded-xl bg-[#1D1F20] hover:bg-neutral-800 text-white font-medium shadow-sm transition active:scale-[0.99]"
          >
            {changePasswordMutation.isPending ? (
              <>
                <Loader2 className="size-4 animate-spin mr-2" />
                Đang cập nhật mật khẩu...
              </>
            ) : (
              'Cập nhật mật khẩu'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}


```

# src\app\(auth)\forgot-password\page.tsx

| Property | Value |
|----------|-------|
| Path | `src\app\(auth)\forgot-password\page.tsx` |
| Size | 1,567 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.862351 |

```tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { ForgotPasswordForm } from '@/modules/auth/components/forgot-password-form';

export const metadata: Metadata = {
  title: 'Quên mật khẩu — Fashion Store',
  description: 'Khôi phục mật khẩu tài khoản của bạn thông qua mã xác thực gửi về email.',
};

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen w-full flex flex-col justify-center items-center p-4 sm:p-6 bg-[#FBF9F4]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="eyebrow block mb-2 text-[#74736E]">FASHION STUDIO</span>
            <h1 className="font-display text-4xl text-[#1D1F20] tracking-tight">
              Quên mật khẩu
            </h1>
          </Link>
          <p className="text-xs text-neutral-500 mt-2">
            Nhập email của bạn để nhận mã xác thực khôi phục mật khẩu.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#EAE6DF] p-6 sm:p-8 shadow-xs">
          <ForgotPasswordForm />
        </div>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs text-neutral-500 hover:text-neutral-900 transition underline-offset-4 hover:underline"
          >
            ← Quay lại trang chủ
          </Link>
        </div>
      </div>
    </main>
  );
}


```

# src\app\(auth)\login\page.tsx

| Property | Value |
|----------|-------|
| Path | `src\app\(auth)\login\page.tsx` |
| Size | 1,528 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.865370 |

```tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { LoginForm } from '@/modules/auth/components/login-form';

export const metadata: Metadata = {
  title: 'Đăng nhập — Fashion Store',
  description: 'Đăng nhập vào tài khoản của bạn để trải nghiệm mua sắm và quản lý đơn hàng.',
};

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full flex flex-col justify-center items-center p-4 sm:p-6 bg-[#FBF9F4]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="eyebrow block mb-2 text-[#74736E]">FASHION STUDIO</span>
            <h1 className="font-display text-4xl text-[#1D1F20] tracking-tight">
              Đăng nhập
            </h1>
          </Link>
          <p className="text-xs text-neutral-500 mt-2">
            Chào mừng bạn quay trở lại. Hãy điền thông tin để tiếp tục.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#EAE6DF] p-6 sm:p-8 shadow-xs">
          <LoginForm />
        </div>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs text-neutral-500 hover:text-neutral-900 transition underline-offset-4 hover:underline"
          >
            ← Quay lại trang chủ
          </Link>
        </div>
      </div>
    </main>
  );
}


```

# src\app\(auth)\register\page.tsx

| Property | Value |
|----------|-------|
| Path | `src\app\(auth)\register\page.tsx` |
| Size | 1,553 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.867354 |

```tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { RegisterForm } from '@/modules/auth/components/register-form';

export const metadata: Metadata = {
  title: 'Đăng ký tài khoản — Fashion Store',
  description: 'Tạo tài khoản mới để nhận ưu đãi thành viên và theo dõi đơn hàng tiện lợi.',
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen w-full flex flex-col justify-center items-center p-4 sm:p-6 bg-[#FBF9F4]">
      <div className="w-full max-w-md my-8">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="eyebrow block mb-2 text-[#74736E]">FASHION STUDIO</span>
            <h1 className="font-display text-4xl text-[#1D1F20] tracking-tight">
              Đăng ký
            </h1>
          </Link>
          <p className="text-xs text-neutral-500 mt-2">
            Đăng ký tài khoản để bắt đầu trải nghiệm mua sắm độc quyền.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#EAE6DF] p-6 sm:p-8 shadow-xs">
          <RegisterForm />
        </div>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs text-neutral-500 hover:text-neutral-900 transition underline-offset-4 hover:underline"
          >
            ← Quay lại trang chủ
          </Link>
        </div>
      </div>
    </main>
  );
}


```

# src\app\(auth)\reset-password\page.tsx

| Property | Value |
|----------|-------|
| Path | `src\app\(auth)\reset-password\page.tsx` |
| Size | 5,399 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.868351 |

```tsx
'use client';

import * as React from 'react';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { resetPasswordSchema, type ResetPasswordFormData } from '@/modules/auth/schemas';
import { useAuth } from '@/modules/auth/hooks/use-auth';
import { FormField } from '@/components/ui/form-field';
import { Button } from '@/components/ui/button';

function ResetPasswordFormContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const { resetPasswordMutation } = useAuth();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token,
      newPassword: '',
      confirmPassword: '',
    },
  });

  React.useEffect(() => {
    if (token) {
      form.setValue('token', token);
    }
  }, [token, form]);

  const onSubmit = (data: ResetPasswordFormData) => {
    resetPasswordMutation.mutate(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <input type="hidden" {...form.register('token')} />

      {!token && (
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs">
          Không tìm thấy mã xác thực khôi phục mật khẩu. Vui lòng bắt đầu lại từ bước Quên mật khẩu.
        </div>
      )}

      <div className="relative">
        <FormField
          control={form.control}
          name="newPassword"
          label="Mật khẩu mới"
          type={showPassword ? 'text' : 'password'}
          placeholder="Tối thiểu 8 ký tự (hoa, thường, số, ký tự)"
          error={form.formState.errors.newPassword?.message}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3.5 top-[34px] text-neutral-400 hover:text-neutral-700 transition"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>

      <div className="relative">
        <FormField
          control={form.control}
          name="confirmPassword"
          label="Xác nhận mật khẩu mới"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Nhập lại mật khẩu mới"
          error={form.formState.errors.confirmPassword?.message}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3.5 top-[34px] text-neutral-400 hover:text-neutral-700 transition"
          tabIndex={-1}
        >
          {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>

      <Button
        type="submit"
        disabled={resetPasswordMutation.isPending || !token}
        className="w-full h-11 rounded-xl bg-[#1D1F20] hover:bg-neutral-800 text-white font-medium shadow-sm transition active:scale-[0.99] mt-2"
      >
        {resetPasswordMutation.isPending ? (
          <>
            <Loader2 className="size-4 animate-spin mr-2" />
            Đang cập nhật mật khẩu...
          </>
        ) : (
          'Lưu mật khẩu mới'
        )}
      </Button>

      <div className="text-center pt-2">
        <Link
          href="/login"
          className="text-xs text-neutral-500 hover:text-neutral-900 transition underline underline-offset-4"
        >
          ← Quay về đăng nhập
        </Link>
      </div>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen w-full flex flex-col justify-center items-center p-4 sm:p-6 bg-[#FBF9F4]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="eyebrow block mb-2 text-[#74736E]">FASHION STUDIO</span>
            <h1 className="font-display text-4xl text-[#1D1F20] tracking-tight">
              Đặt lại mật khẩu
            </h1>
          </Link>
          <p className="text-xs text-neutral-500 mt-2">
            Nhập mật khẩu mới an toàn cho tài khoản của bạn.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#EAE6DF] p-6 sm:p-8 shadow-xs">
          <Suspense fallback={<div className="text-center py-6 text-sm text-neutral-500">Đang tải...</div>}>
            <ResetPasswordFormContent />
          </Suspense>
        </div>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs text-neutral-500 hover:text-neutral-900 transition underline-offset-4 hover:underline"
          >
            ← Quay lại trang chủ
          </Link>
        </div>
      </div>
    </main>
  );
}


```

# src\app\(shop)\cart\page.tsx

| Property | Value |
|----------|-------|
| Path | `src\app\(shop)\cart\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:31.084895 |

```tsx

```

# src\app\(shop)\checkout\page.tsx

| Property | Value |
|----------|-------|
| Path | `src\app\(shop)\checkout\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:31.490579 |

```tsx

```

# src\app\(shop)\flash-sale\page.tsx

| Property | Value |
|----------|-------|
| Path | `src\app\(shop)\flash-sale\page.tsx` |
| Size | 9,015 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-06 00:08:13.655830 |

```tsx
'use client';

import { useEffect, useState } from 'react';
import { Flame, ShieldCheck, Zap, RefreshCw, ShoppingBag, Clock, Search } from 'lucide-react';
import { FlashSaleItem } from '@/types/inventory-sale';
import { FlashSaleCountdown } from '@/modules/flash-sale/components/countdown';
import { FlashSaleCard } from '@/modules/flash-sale/components/flash-sale-card';
import { Button } from '@/components/ui/button';
import { useFlashSaleStore } from '@/modules/flash-sale/store';
import { FlashSaleProvider, useFlashSaleContext } from '@/modules/flash-sale/context';

// Sub-component sử dụng Context
function FlashSaleItemList() {
  const { filteredItems } = useFlashSaleContext();

  if (filteredItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex size-16 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400">
          <Flame className="size-8" />
        </div>
        <h3 className="mt-4 text-lg font-bold text-zinc-900 dark:text-zinc-100">
          Không tìm thấy sản phẩm Flash Sale nào
        </h3>
        <p className="mt-1 text-sm text-zinc-500 max-w-sm">
          Thử tìm kiếm với từ khóa khác hoặc quay lại sau!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {filteredItems.map((item) => (
        <FlashSaleCard key={item.id || item.variantId} item={item} />
      ))}
    </div>
  );
}

// Sub-component sử dụng Context cho Toolbar Tìm kiếm
function FlashSaleToolbar({ onRefresh }: { onRefresh: () => void }) {
  const { searchQuery, setSearchQuery, filteredItems } = useFlashSaleContext();

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-white p-4 shadow-xs dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
      <div className="flex items-center gap-2">
        <ShoppingBag className="size-5 text-red-600" />
        <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
          Sản phẩm Flash Sale ({filteredItems.length})
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm trong sale..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 rounded-xl border border-zinc-300 bg-zinc-50 px-3.5 py-1.5 text-sm focus:border-red-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800"
          />
        </div>
        <Button onClick={onRefresh} variant="outline" size="sm" className="gap-1.5">
          <RefreshCw className="size-3.5" />
          Làm mới
        </Button>
      </div>
    </div>
  );
}

export default function FlashSaleShopPage() {
  // 1. GLOAL STATE (Zustand Store)
  const {
    activeCampaigns,
    selectedCampaignId,
    loading,
    fetchActiveCampaigns,
    setSelectedCampaignId,
    getActiveCampaign,
  } = useFlashSaleStore();

  // 2. LOCAL STATE (useState) cho UI trợ lý đếm ngược / tab local
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchActiveCampaigns();
  }, [fetchActiveCampaigns]);

  const activeCampaign = getActiveCampaign();

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchActiveCampaigns();
    setRefreshing(false);
  };

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-20">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-zinc-950 text-white py-12 px-4 sm:px-8 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(239,68,68,0.25),transparent_60%)]" />
        <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_80%_20%,rgba(245,158,11,0.2),transparent_50%)]" />

        <div className="relative z-10 mx-auto max-w-[1440px]">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3.5 py-1 text-xs font-bold text-red-400 backdrop-blur-md">
                <Flame className="size-4 fill-red-500 text-red-500 animate-pulse" />
                <span>CHƯƠNG TRÌNH KHUYẾN MÃI GIỜ VÀNG</span>
              </div>
              <h1 className="mt-4 font-display text-4xl font-black tracking-tight sm:text-6xl text-white">
                FLASH SALE SĂN DEAL KHỦNG
              </h1>
              <p className="mt-3 text-sm sm:text-base text-zinc-300">
                Sở hữu ngay những sản phẩm thời trang cao cấp với mức giá giảm tới 70%. Số lượng có hạn theo từng khung giờ vàng!
              </p>

              {/* Guarantees */}
              <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold text-zinc-300">
                <div className="flex items-center gap-1.5 rounded-lg bg-zinc-900/80 px-3 py-1.5 border border-zinc-800">
                  <ShieldCheck className="size-4 text-emerald-400" />
                  <span>Sản phẩm chính hãng 100%</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg bg-zinc-900/80 px-3 py-1.5 border border-zinc-800">
                  <Zap className="size-4 text-amber-400" />
                  <span>Giao hàng thần tốc</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg bg-zinc-900/80 px-3 py-1.5 border border-zinc-800">
                  <Clock className="size-4 text-red-400" />
                  <span>Cập nhật theo khung giờ</span>
                </div>
              </div>
            </div>

            {/* Countdown Box */}
            {activeCampaign && (
              <div className="flex flex-col items-start md:items-end rounded-2xl border border-red-500/20 bg-zinc-900/90 p-6 backdrop-blur-md shadow-2xl">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                  Thời gian diễn ra
                </span>
                <h3 className="mt-1 text-lg font-bold text-white mb-3">
                  {activeCampaign.name}
                </h3>
                <FlashSaleCountdown
                  targetTime={activeCampaign.endTime}
                  startTime={activeCampaign.startTime}
                  size="lg"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="mx-auto max-w-[1440px] px-4 pt-8 sm:px-8 lg:px-12">
        {/* Campaign Tabs */}
        {activeCampaigns.length > 1 && (
          <div className="mb-8 flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {activeCampaigns.map((c) => {
              const isSelected = c.id === activeCampaign?.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCampaignId(c.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-bold transition-all shadow-xs ${isSelected
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 scale-105'
                      : 'bg-white text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800'
                    }`}
                >
                  <Flame className={`size-4 ${isSelected ? 'fill-amber-300 text-amber-300' : 'text-zinc-400'}`} />
                  <span>{c.name}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* 3. CONTEXT PROVIDER bao bọc danh sách sản phẩm & toolbar */}
        <FlashSaleProvider campaign={activeCampaign || null}>
          <FlashSaleToolbar onRefresh={handleRefresh} />

          {loading || refreshing ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-80 animate-pulse rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
              ))}
            </div>
          ) : (
            <FlashSaleItemList />
          )}
        </FlashSaleProvider>
      </div>
    </main>
  );
}

```

# src\app\(shop)\layout.tsx

| Property | Value |
|----------|-------|
| Path | `src\app\(shop)\layout.tsx` |
| Size | 431 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-06 00:08:13.656305 |

```tsx
import { ReactNode } from 'react';
import { SiteHeader } from '@/components/layouts/site-header';
import { SiteFooter } from '@/components/layouts/site-footer';

export default function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#FBF9F4]">
      <SiteHeader />
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </div>
  );
}

```

# src\app\(shop)\order-success\[orderCode]\page.tsx

| Property | Value |
|----------|-------|
| Path | `src\app\(shop)\order-success\[orderCode]\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:31.618409 |

```tsx

```

# src\app\(shop)\page.tsx

| Property | Value |
|----------|-------|
| Path | `src\app\(shop)\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:30.861115 |

```tsx

```

# src\app\(shop)\products\[productId]\page.tsx

| Property | Value |
|----------|-------|
| Path | `src\app\(shop)\products\[productId]\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:30.940195 |

```tsx

```

# src\app\(shop)\products\page.tsx

| Property | Value |
|----------|-------|
| Path | `src\app\(shop)\products\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:30.937019 |

```tsx

```

# src\app\admin\brands\page.tsx

| Property | Value |
|----------|-------|
| Path | `src\app\admin\brands\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:37.288294 |

```tsx

```

# src\app\admin\categories\page.tsx

| Property | Value |
|----------|-------|
| Path | `src\app\admin\categories\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:37.286297 |

```tsx

```

# src\app\admin\chat\page.tsx

| Property | Value |
|----------|-------|
| Path | `src\app\admin\chat\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:43.847033 |

```tsx

```

# src\app\admin\dashboard\page.tsx

| Property | Value |
|----------|-------|
| Path | `src\app\admin\dashboard\page.tsx` |
| Size | 10,499 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.873186 |

```tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import {
  Users,
  ShoppingBag,
  TrendingUp,
  PackageCheck,
  ArrowUpRight,
  Shield,
  Layers,
  Clock,
} from 'lucide-react';
import { adminApi } from '@/modules/admin/api';
import { DashboardCard } from '@/modules/admin/components/dashboard-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

export default function AdminDashboardPage() {
  const { data: statsData, isLoading } = useQuery({
    queryKey: ['admin-dashboard-stats'],
    queryFn: () => adminApi.getDashboardStats(),
  });

  const stats = statsData?.data;

  const mockRecentOrders = [
    { id: 'ORD-8921', customer: 'Hoàng Minh Tuấn', items: 'Áo sơ mi Oxford (Trắng) x1', total: '450.000 ₫', status: 'CONFIRMED', time: '10 phút trước' },
    { id: 'ORD-8920', customer: 'Lê Thuỳ Dung', items: 'Quần tây Pleated Trousers x1', total: '790.000 ₫', status: 'PROCESSING', time: '35 phút trước' },
    { id: 'ORD-8919', customer: 'Phạm Thanh Sơn', items: 'Blazer Oversized Knit x1, Khăn lụa x1', total: '1.650.000 ₫', status: 'DELIVERED', time: '2 giờ trước' },
    { id: 'ORD-8918', customer: 'Trần Bảo Ngọc', items: 'Váy Linen Midi Dress x1', total: '920.000 ₫', status: 'PENDING_PAYMENT', time: '4 giờ trước' },
    { id: 'ORD-8917', customer: 'Đỗ Quốc Anh', items: 'Áo thun Pima Cotton x2', total: '580.000 ₫', status: 'SHIPPED', time: '5 giờ trước' },
  ];

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return <Badge variant="success">Hoàn thành</Badge>;
      case 'CONFIRMED':
      case 'PROCESSING':
        return <Badge variant="lime">Đang xử lý</Badge>;
      case 'SHIPPED':
        return <Badge variant="secondary">Đang giao</Badge>;
      case 'PENDING_PAYMENT':
        return <Badge variant="warning">Chờ thanh toán</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="eyebrow block mb-1">TỔNG QUAN HỆ THỐNG</span>
          <h1 className="font-display text-3xl sm:text-4xl text-[#1D1F20] tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Theo dõi các chỉ số tăng trưởng, đơn hàng và hoạt động người dùng trong thời gian thực.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link href="/admin/users">
            <Button variant="outline" className="rounded-xl border-[#EAE6DF] text-xs h-10">
              <Users className="size-4 mr-2" /> Quản lý Users
            </Button>
          </Link>
          <Link href="/admin/roles">
            <Button className="rounded-xl bg-[#1D1F20] text-white text-xs h-10">
              <Shield className="size-4 mr-2" /> Phân quyền Roles
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <DashboardCard
          title="Tổng doanh thu"
          value={isLoading ? '...' : `${(stats?.totalRevenue || 0).toLocaleString('vi-VN')} ₫`}
          icon={TrendingUp}
          change="+18.4%"
          trend="up"
          description="so với tháng trước"
        />
        <DashboardCard
          title="Tổng đơn hàng"
          value={isLoading ? '...' : (stats?.totalOrders || 0).toLocaleString('vi-VN')}
          icon={PackageCheck}
          change="+8.2%"
          trend="up"
          description="tỷ lệ hoàn tất 96%"
        />
        <DashboardCard
          title="Người dùng đăng ký"
          value={isLoading ? '...' : (stats?.totalUsers || 0).toLocaleString('vi-VN')}
          icon={Users}
          change="+12.5%"
          trend="up"
          description={`+${stats?.newUsersThisMonth || 0} trong tháng này`}
        />
        <DashboardCard
          title="Sản phẩm đang bán"
          value={isLoading ? '...' : (stats?.totalProducts || 0).toLocaleString('vi-VN')}
          icon={ShoppingBag}
          change="+4 mới"
          trend="neutral"
          description="12 danh mục hiện hữu"
        />
      </div>

      {/* Quick shortcuts & Status view */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-[#EAE6DF] p-6 shadow-xs lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#EAE6DF]">
            <h3 className="text-sm font-semibold text-neutral-900">
              Phím tắt nhanh
            </h3>
            <span className="text-[10px] text-neutral-400">Điều hướng</span>
          </div>

          <div className="space-y-2">
            <Link
              href="/admin/users"
              className="flex items-center justify-between p-3 rounded-xl border border-[#EAE6DF] hover:bg-neutral-50 transition group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-neutral-100 text-neutral-700">
                  <Users className="size-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-800">Danh sách người dùng</p>
                  <p className="text-[10px] text-neutral-400">Xem, khóa hoặc cập nhật tài khoản</p>
                </div>
              </div>
              <ArrowUpRight className="size-4 text-neutral-400 group-hover:text-neutral-900 transition" />
            </Link>

            <Link
              href="/admin/roles"
              className="flex items-center justify-between p-3 rounded-xl border border-[#EAE6DF] hover:bg-neutral-50 transition group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-neutral-100 text-neutral-700">
                  <Shield className="size-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-800">Quản lý vai trò & quyền</p>
                  <p className="text-[10px] text-neutral-400">Thiết lập RBAC Admin, Staff, Customer</p>
                </div>
              </div>
              <ArrowUpRight className="size-4 text-neutral-400 group-hover:text-neutral-900 transition" />
            </Link>

            <Link
              href="/admin/products"
              className="flex items-center justify-between p-3 rounded-xl border border-[#EAE6DF] hover:bg-neutral-50 transition group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-neutral-100 text-neutral-700">
                  <Layers className="size-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-800">Quản lý sản phẩm</p>
                  <p className="text-[10px] text-neutral-400">Kho hàng, thuộc tính và biến thể</p>
                </div>
              </div>
              <ArrowUpRight className="size-4 text-neutral-400 group-hover:text-neutral-900 transition" />
            </Link>
          </div>
        </div>

        {/* Recent orders table */}
        <div className="bg-white rounded-2xl border border-[#EAE6DF] p-6 shadow-xs lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#EAE6DF]">
            <div>
              <h3 className="text-sm font-semibold text-neutral-900">
                Đơn hàng gần đây
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Các giao dịch vừa phát sinh trên hệ thống
              </p>
            </div>
            <Link href="/admin/orders">
              <Button variant="ghost" size="sm" className="text-xs text-neutral-600 hover:text-neutral-900">
                Xem tất cả đơn →
              </Button>
            </Link>
          </div>

          <div className="overflow-hidden rounded-xl border border-[#EAE6DF]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã đơn</TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>Tổng tiền</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thời gian</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockRecentOrders.map((ord) => (
                  <TableRow key={ord.id}>
                    <TableCell className="font-semibold text-neutral-900 text-xs">
                      {ord.id}
                    </TableCell>
                    <TableCell className="text-xs">
                      <p className="font-medium text-neutral-800">{ord.customer}</p>
                      <p className="text-[11px] text-neutral-400 truncate max-w-[160px]">{ord.items}</p>
                    </TableCell>
                    <TableCell className="font-medium text-xs text-neutral-900">
                      {ord.total}
                    </TableCell>
                    <TableCell>{getOrderStatusBadge(ord.status)}</TableCell>
                    <TableCell className="text-right text-xs text-neutral-400">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="size-3" />
                        {ord.time}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}


```

# src\app\admin\flash-sales\page.tsx

| Property | Value |
|----------|-------|
| Path | `src\app\admin\flash-sales\page.tsx` |
| Size | 33,640 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.875717 |

```tsx
'use client';

import { useEffect, useState } from 'react';
import {
  Flame,
  Plus,
  Pencil,
  Trash2,
  Calendar,
  Layers,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  RefreshCcw,
  AlertCircle,
  Eye,
  X,
  Sparkles,
} from 'lucide-react';
import {
  FlashSaleCampaign,
  FlashSaleItem,
  FlashSaleItemPayload,
  CreateFlashSaleInput,
  UpdateFlashSaleInput,
} from '@/types/inventory-sale';
import { flashSaleApi } from '@/api/flash-sale.api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog } from '@/components/ui/dialog';

export default function AdminFlashSalesPage() {
  const [campaigns, setCampaigns] = useState<FlashSaleCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'inactive'>('all');

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<FlashSaleCampaign | null>(null);
  const [detailCampaign, setDetailCampaign] = useState<FlashSaleCampaign | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState<{
    name: string;
    bannerUrl: string;
    startTime: string;
    endTime: string;
    isActive: boolean;
    items: FlashSaleItemPayload[];
  }>({
    name: '',
    bannerUrl: '',
    startTime: '',
    endTime: '',
    isActive: true,
    items: [{ variantId: 1, flashSalePrice: 100000, promoQuantity: 10 }],
  });

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const res = await flashSaleApi.getCampaigns({
        page,
        limit: 10,
        isActive: activeFilter === 'all' ? undefined : activeFilter === 'active',
      });
      setCampaigns(res.data || []);
      setTotalItems(res.totalItems || 0);
    } catch (err: any) {
      console.error('Lỗi khi tải danh sách Flash Sale:', err);
      setErrorMessage(err?.response?.data?.message || 'Không thể kết nối đến máy chủ');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [page, activeFilter]);

  const handleOpenCreate = () => {
    setEditingCampaign(null);
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const toInputString = (d: Date) => d.toISOString().slice(0, 16);

    setFormData({
      name: 'Chiến Dịch Flash Sale Hot ' + (campaigns.length + 1),
      bannerUrl: '',
      startTime: toInputString(now),
      endTime: toInputString(tomorrow),
      isActive: true,
      items: [{ variantId: 1, flashSalePrice: 150000, promoQuantity: 20 }],
    });
    setErrorMessage(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (campaign: FlashSaleCampaign) => {
    setEditingCampaign(campaign);
    const toInputString = (str: string) => {
      try {
        return new Date(str).toISOString().slice(0, 16);
      } catch {
        return '';
      }
    };

    setFormData({
      name: campaign.name,
      bannerUrl: campaign.bannerUrl || '',
      startTime: toInputString(campaign.startTime),
      endTime: toInputString(campaign.endTime),
      isActive: campaign.isActive,
      items:
        campaign.items && campaign.items.length > 0
          ? campaign.items.map((i) => ({
              variantId: i.variantId,
              flashSalePrice: Number(i.flashSalePrice),
              promoQuantity: i.promoQuantity,
            }))
          : [{ variantId: 1, flashSalePrice: 100000, promoQuantity: 10 }],
    });
    setErrorMessage(null);
    setIsFormOpen(true);
  };

  const handleAddItemRow = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { variantId: prev.items.length + 1, flashSalePrice: 100000, promoQuantity: 10 }],
    }));
  };

  const handleRemoveItemRow = (index: number) => {
    if (formData.items.length <= 1) {
      setErrorMessage('Chiến dịch Flash Sale phải có ít nhất 1 sản phẩm');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleItemChange = (index: number, field: keyof FlashSaleItemPayload, value: number) => {
    setFormData((prev) => {
      const updated = [...prev.items];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, items: updated };
    });
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim()) {
      setErrorMessage('Tên chiến dịch không được để trống');
      return;
    }
    if (!formData.startTime || !formData.endTime) {
      setErrorMessage('Vui lòng chọn thời gian bắt đầu và kết thúc');
      return;
    }
    if (new Date(formData.startTime) >= new Date(formData.endTime)) {
      setErrorMessage('Thời gian kết thúc phải sau thời gian bắt đầu');
      return;
    }

    // Check duplicate variants
    const variantIds = formData.items.map((i) => i.variantId);
    if (new Set(variantIds).size !== variantIds.length) {
      setErrorMessage('Không được có sản phẩm trùng nhau trong chiến dịch');
      return;
    }

    setSubmitting(true);

    try {
      if (editingCampaign) {
        const payload: UpdateFlashSaleInput = {
          name: formData.name,
          bannerUrl: formData.bannerUrl || undefined,
          startTime: new Date(formData.startTime).toISOString(),
          endTime: new Date(formData.endTime).toISOString(),
          isActive: formData.isActive,
          items: formData.items,
        };
        await flashSaleApi.updateCampaign(editingCampaign.id, payload);
        setSuccessMessage('Cập nhật chiến dịch Flash Sale thành công!');
      } else {
        const payload: CreateFlashSaleInput = {
          name: formData.name,
          bannerUrl: formData.bannerUrl || undefined,
          startTime: new Date(formData.startTime).toISOString(),
          endTime: new Date(formData.endTime).toISOString(),
          isActive: formData.isActive,
          items: formData.items,
        };
        await flashSaleApi.createCampaign(payload);
        setSuccessMessage('Tạo chiến dịch Flash Sale thành công!');
      }

      setIsFormOpen(false);
      fetchCampaigns();
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      console.error('Submit error:', err);
      setErrorMessage(
        err?.response?.data?.message || err?.message || 'Có lỗi xảy ra khi lưu chiến dịch'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    setSubmitting(true);
    try {
      await flashSaleApi.deleteCampaign(id);
      setSuccessMessage('Xóa chiến dịch thành công!');
      setDeleteConfirmId(null);
      fetchCampaigns();
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      setErrorMessage(err?.response?.data?.message || 'Xóa chiến dịch thất bại');
    } finally {
      setSubmitting(false);
    }
  };

  const getCampaignStatus = (c: FlashSaleCampaign) => {
    if (!c.isActive) {
      return { label: 'Đã tắt', color: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400' };
    }
    const now = new Date().getTime();
    const start = new Date(c.startTime).getTime();
    const end = new Date(c.endTime).getTime();

    if (now < start) {
      return { label: 'Sắp diễn ra', color: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' };
    }
    if (now > end) {
      return { label: 'Đã kết thúc', color: 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400' };
    }
    return { label: 'Đang diễn ra', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' };
  };

  const filteredCampaigns = campaigns.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatVND = (num: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);

  const formatDateTime = (str: string) => {
    try {
      return new Date(str).toLocaleString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    } catch {
      return str;
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-red-600 font-bold text-sm">
            <Flame className="size-5 fill-red-600 text-red-600 animate-pulse" />
            <span>MODULE INVENTORY SALE</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
            Quản Lý Flash Sale
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Tạo và cấu hình các chiến dịch giảm giá theo khung giờ chớp nhoáng
          </p>
        </div>

        <Button onClick={handleOpenCreate} className="bg-red-600 hover:bg-red-700 text-white font-bold gap-2 shadow-lg shadow-red-600/20">
          <Plus className="size-4" />
          Tạo chiến dịch mới
        </Button>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm font-semibold text-emerald-800 dark:bg-emerald-950/50 dark:border-emerald-800 dark:text-emerald-300">
          <CheckCircle2 className="size-5 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 p-4 text-sm font-semibold text-red-800 dark:bg-red-950/50 dark:border-red-800 dark:text-red-300">
          <AlertCircle className="size-5 text-red-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-xs font-bold uppercase tracking-wider">Tổng chiến dịch</span>
            <Layers className="size-5 text-red-600" />
          </div>
          <div className="mt-3 text-3xl font-black text-zinc-900 dark:text-zinc-100">
            {totalItems}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-xs font-bold uppercase tracking-wider">Đang hoạt động</span>
            <Sparkles className="size-5 text-emerald-600" />
          </div>
          <div className="mt-3 text-3xl font-black text-emerald-600 dark:text-emerald-400">
            {campaigns.filter((c) => c.isActive).length}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-xs font-bold uppercase tracking-wider">Tổng SP Sale</span>
            <Flame className="size-5 text-amber-500" />
          </div>
          <div className="mt-3 text-3xl font-black text-zinc-900 dark:text-zinc-100">
            {campaigns.reduce((acc, c) => acc + (c.items?.length || 0), 0)}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-xs font-bold uppercase tracking-wider">Số lượng đã bán</span>
            <CheckCircle2 className="size-5 text-indigo-600" />
          </div>
          <div className="mt-3 text-3xl font-black text-indigo-600 dark:text-indigo-400">
            {campaigns.reduce(
              (acc, c) => acc + (c.items?.reduce((iAcc, item) => iAcc + (item.soldQuantity || 0), 0) || 0),
              0
            )}
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-white p-4 shadow-xs dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
          <Input
            placeholder="Tìm theo tên chiến dịch..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-xl"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-xl bg-zinc-100 p-1 dark:bg-zinc-800">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                activeFilter === 'all' ? 'bg-white text-zinc-900 shadow-xs dark:bg-zinc-700 dark:text-zinc-100' : 'text-zinc-500'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setActiveFilter('active')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                activeFilter === 'active' ? 'bg-white text-zinc-900 shadow-xs dark:bg-zinc-700 dark:text-zinc-100' : 'text-zinc-500'
              }`}
            >
              Hoạt động
            </button>
            <button
              onClick={() => setActiveFilter('inactive')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                activeFilter === 'inactive' ? 'bg-white text-zinc-900 shadow-xs dark:bg-zinc-700 dark:text-zinc-100' : 'text-zinc-500'
              }`}
            >
              Đã tắt
            </button>
          </div>

          <Button onClick={fetchCampaigns} variant="outline" size="sm" className="gap-1.5">
            <RefreshCcw className="size-3.5" />
          </Button>
        </div>
      </div>

      {/* Campaign Table */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:bg-zinc-800/50 dark:text-zinc-400">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Tên chiến dịch</th>
                <th className="px-6 py-4">Thời gian</th>
                <th className="px-6 py-4">Sản phẩm</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-500">
                    Đang tải dữ liệu chiến dịch Flash Sale...
                  </td>
                </tr>
              ) : filteredCampaigns.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-500">
                    Chưa có chiến dịch Flash Sale nào.
                  </td>
                </tr>
              ) : (
                filteredCampaigns.map((c) => {
                  const status = getCampaignStatus(c);
                  return (
                    <tr key={c.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/50 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-zinc-400">#{c.id}</td>
                      <td className="px-6 py-4 font-bold text-zinc-900 dark:text-zinc-100">
                        {c.name}
                      </td>
                      <td className="px-6 py-4 text-xs text-zinc-500">
                        <div className="flex items-center gap-1 font-medium text-zinc-700 dark:text-zinc-300">
                          <Calendar className="size-3.5 text-zinc-400" />
                          <span>{formatDateTime(c.startTime)}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-zinc-400">
                          <Clock className="size-3.5" />
                          <span>đến {formatDateTime(c.endTime)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                          <Flame className="size-3 text-red-500" />
                          {c.items?.length || 0} biến thể
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-extrabold ${status.color}`}>
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            onClick={() => setDetailCampaign(c)}
                            variant="ghost"
                            size="icon-sm"
                            title="Xem chi tiết"
                          >
                            <Eye className="size-4" />
                          </Button>
                          <Button
                            onClick={() => handleOpenEdit(c)}
                            variant="ghost"
                            size="icon-sm"
                            title="Sửa chiến dịch"
                          >
                            <Pencil className="size-4 text-amber-600" />
                          </Button>
                          <Button
                            onClick={() => setDeleteConfirmId(c.id)}
                            variant="ghost"
                            size="icon-sm"
                            title="Xóa chiến dịch"
                          >
                            <Trash2 className="size-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Modal (Create / Edit) */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 md:p-8 shadow-2xl dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between border-b pb-4 dark:border-zinc-800">
              <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Flame className="size-5 text-red-600" />
                {editingCampaign ? 'Chỉnh Sửa Flash Sale' : 'Tạo Chiến Dịch Flash Sale'}
              </h2>
              <button
                onClick={() => setIsFormOpen(false)}
                className="rounded-full p-1.5 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="mt-6 space-y-6">
              {errorMessage && (
                <div className="rounded-xl bg-red-50 p-3.5 text-xs font-semibold text-red-700 border border-red-200 dark:bg-red-950/50 dark:border-red-800 dark:text-red-300">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5 block">
                    Tên chiến dịch *
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="VD: Flash Sale Giờ Vàng 12h-14h"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5 block">
                    Thời gian bắt đầu *
                  </label>
                  <Input
                    type="datetime-local"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5 block">
                    Thời gian kết thúc *
                  </label>
                  <Input
                    type="datetime-local"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5 block">
                    Banner URL (Tùy chọn)
                  </label>
                  <Input
                    value={formData.bannerUrl}
                    onChange={(e) => setFormData({ ...formData, bannerUrl: e.target.value })}
                    placeholder="https://example.com/banner.jpg"
                  />
                </div>

                <div className="sm:col-span-2 flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="size-4 rounded border-zinc-300 text-red-600 focus:ring-red-500"
                  />
                  <label htmlFor="isActive" className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                    Kích hoạt chiến dịch ngay lập tức
                  </label>
                </div>
              </div>

              {/* Items Builder */}
              <div className="border-t pt-6 dark:border-zinc-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                    Danh sách sản phẩm tham gia sale
                  </h3>
                  <Button
                    type="button"
                    onClick={handleAddItemRow}
                    variant="outline"
                    size="sm"
                    className="gap-1.5 text-xs font-bold"
                  >
                    <Plus className="size-3.5" /> Thêm sản phẩm
                  </Button>
                </div>

                <div className="space-y-3">
                  {formData.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-12 gap-3 items-center rounded-xl bg-zinc-50 p-3 border border-zinc-200 dark:bg-zinc-800/50 dark:border-zinc-700"
                    >
                      <div className="col-span-3">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase block mb-1">
                          Variant ID *
                        </label>
                        <Input
                          type="number"
                          value={item.variantId}
                          onChange={(e) => handleItemChange(idx, 'variantId', Number(e.target.value))}
                          min={1}
                          required
                        />
                      </div>
                      <div className="col-span-4">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase block mb-1">
                          Giá Flash Sale (VNĐ) *
                        </label>
                        <Input
                          type="number"
                          value={item.flashSalePrice}
                          onChange={(e) => handleItemChange(idx, 'flashSalePrice', Number(e.target.value))}
                          min={1}
                          required
                        />
                      </div>
                      <div className="col-span-4">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase block mb-1">
                          Số lượng KM *
                        </label>
                        <Input
                          type="number"
                          value={item.promoQuantity}
                          onChange={(e) => handleItemChange(idx, 'promoQuantity', Number(e.target.value))}
                          min={1}
                          required
                        />
                      </div>
                      <div className="col-span-1 flex justify-end pt-4">
                        <Button
                          type="button"
                          onClick={() => handleRemoveItemRow(idx)}
                          variant="ghost"
                          size="icon-xs"
                          className="text-red-500 hover:bg-red-50"
                        >
                          <X className="size-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 border-t pt-6 dark:border-zinc-800">
                <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                  Hủy bỏ
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold"
                >
                  {submitting ? 'Đang lưu...' : editingCampaign ? 'Cập nhật chiến dịch' : 'Tạo mới chiến dịch'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {detailCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 md:p-8 shadow-2xl dark:bg-zinc-900">
            <div className="flex items-center justify-between border-b pb-4 dark:border-zinc-800">
              <h2 className="text-lg font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Flame className="size-5 text-red-600" />
                Chi tiết chiến dịch: {detailCampaign.name}
              </h2>
              <button
                onClick={() => setDetailCampaign(null)}
                className="rounded-full p-1.5 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="mt-6 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
                <div>
                  <span className="text-xs text-zinc-500 block">Thời gian bắt đầu</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">
                    {formatDateTime(detailCampaign.startTime)}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-zinc-500 block">Thời gian kết thúc</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">
                    {formatDateTime(detailCampaign.endTime)}
                  </span>
                </div>
              </div>

              <h4 className="font-bold uppercase text-xs tracking-wider text-zinc-500 pt-2">
                Danh sách sản phẩm trong sale ({detailCampaign.items?.length || 0})
              </h4>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {detailCampaign.items?.map((item) => (
                  <div
                    key={item.id || item.variantId}
                    className="flex items-center justify-between rounded-xl border border-zinc-200 p-3 dark:border-zinc-800"
                  >
                    <div>
                      <div className="font-bold text-zinc-900 dark:text-zinc-100">
                        {item.variant?.product?.defaultName || `Biến thể #${item.variantId}`}
                      </div>
                      <div className="text-xs text-zinc-500 font-mono">SKU: {item.variant?.sku || item.variantId}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-extrabold text-red-600">{formatVND(Number(item.flashSalePrice))}</div>
                      <div className="text-xs text-zinc-500">
                        Đã bán {item.soldQuantity}/{item.promoQuantity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-end border-t pt-4 dark:border-zinc-800">
              <Button onClick={() => setDetailCampaign(null)} variant="outline">
                Đóng
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Xác nhận xóa chiến dịch</h3>
            <p className="mt-2 text-sm text-zinc-500">
              Bạn có chắc chắn muốn xóa chiến dịch Flash Sale này không? Thao tác này không thể hoàn tác.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setDeleteConfirmId(null)}>
                Hủy
              </Button>
              <Button
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={submitting}
                className="bg-red-600 hover:bg-red-700 text-white font-bold"
              >
                {submitting ? 'Đang xóa...' : 'Xóa chiến dịch'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

```

# src\app\admin\inventory\import\page.tsx

| Property | Value |
|----------|-------|
| Path | `src\app\admin\inventory\import\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:37.375046 |

```tsx

```

# src\app\admin\inventory\page.tsx

| Property | Value |
|----------|-------|
| Path | `src\app\admin\inventory\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:37.337399 |

```tsx

```

# src\app\admin\layout.tsx

| Property | Value |
|----------|-------|
| Path | `src\app\admin\layout.tsx` |
| Size | 4,014 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.877289 |

```tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AdminSidebar } from '@/modules/admin/components/sidebar';
import { useAuth } from '@/components/providers/auth-provider';
import { Avatar } from '@/components/ui/avatar';
import { Bell, Search, ShieldAlert, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBF9F4]">
        <div className="animate-pulse text-sm text-neutral-500">Đang khởi tạo quyền quản trị...</div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FBF9F4] p-6 text-center">
        <div className="size-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
          <ShieldAlert className="size-7" />
        </div>
        <h2 className="text-xl font-semibold text-neutral-900 mb-2">
          Truy cập bị từ chối
        </h2>
        <p className="text-xs text-neutral-500 max-w-sm mb-6 leading-relaxed">
          Khu vực này chỉ dành cho tài khoản có quyền Quản trị viên (Admin). Bạn không có quyền truy cập vào nội dung này.
        </p>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => router.push('/')}
            className="rounded-xl border-[#EAE6DF]"
          >
            <ArrowLeft className="size-4 mr-2" /> Về trang chủ
          </Button>
          <Button
            onClick={() => router.push('/login')}
            className="rounded-xl bg-[#1D1F20] text-white"
          >
            Đăng nhập tài khoản khác
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#FBF9F4]">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white/80 backdrop-blur border-b border-[#EAE6DF] px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="eyebrow text-[#74736E]">ADMINISTRATION CONSOLE</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="p-2 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-xl transition relative"
            >
              <Bell className="size-4" />
              <span className="absolute top-1.5 right-1.5 size-2 bg-emerald-500 rounded-full ring-2 ring-white" />
            </button>

            <div className="h-6 w-px bg-[#EAE6DF]" />

            <Link
              href="/profile"
              className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-neutral-50 transition"
            >
              <Avatar
                src={user?.avatarUrl}
                alt={user?.fullName || 'Admin'}
                size="sm"
                className="size-7"
              />
              <span className="text-xs font-semibold text-neutral-800 hidden sm:inline">
                {user?.fullName}
              </span>
            </Link>
          </div>
        </header>

        {/* Dynamic page content */}
        <main className="flex-1 p-6 sm:p-8 max-w-[1440px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}


```

# src\app\admin\orders\[orderId]\page.tsx

| Property | Value |
|----------|-------|
| Path | `src\app\admin\orders\[orderId]\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:37.143519 |

```tsx

```

# src\app\admin\orders\page.tsx

| Property | Value |
|----------|-------|
| Path | `src\app\admin\orders\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:37.128379 |

```tsx

```

# src\app\admin\payments\page.tsx

| Property | Value |
|----------|-------|
| Path | `src\app\admin\payments\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:37.742314 |

```tsx

```

# src\app\admin\products\[productId]\edit\page.tsx

| Property | Value |
|----------|-------|
| Path | `src\app\admin\products\[productId]\edit\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:37.226997 |

```tsx

```

# src\app\admin\products\[productId]\variants\page.tsx

| Property | Value |
|----------|-------|
| Path | `src\app\admin\products\[productId]\variants\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:37.262203 |

```tsx

```

# src\app\admin\products\new\page.tsx

| Property | Value |
|----------|-------|
| Path | `src\app\admin\products\new\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:37.224997 |

```tsx

```

# src\app\admin\products\page.tsx

| Property | Value |
|----------|-------|
| Path | `src\app\admin\products\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:37.151522 |

```tsx

```

# src\app\admin\returns\page.tsx

| Property | Value |
|----------|-------|
| Path | `src\app\admin\returns\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:37.711116 |

```tsx

```

# src\app\admin\reviews\page.tsx

| Property | Value |
|----------|-------|
| Path | `src\app\admin\reviews\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:37.834844 |

```tsx

```

# src\app\admin\roles\page.tsx

| Property | Value |
|----------|-------|
| Path | `src\app\admin\roles\page.tsx` |
| Size | 17,817 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.879289 |

```tsx
'use client';

import * as React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  Shield,
  Plus,
  Edit3,
  Trash2,
  CheckCircle2,
  XCircle,
  KeyRound,
  Loader2,
  Lock,
} from 'lucide-react';
import { adminApi } from '@/modules/admin/api';
import { SearchInput } from '@/components/ui/search-input';
import { DataTable, type Column } from '@/modules/admin/components/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import type { Role, Permission } from '@/types';

interface RoleFormData {
  name: string;
  code: string;
  isActive: boolean;
  permissionIds: number[];
}

export default function AdminRolesPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState('');
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingRole, setEditingRole] = React.useState<Role | null>(null);
  const [deleteTargetRole, setDeleteTargetRole] = React.useState<Role | null>(null);

  // Fetch Roles
  const { data: rolesData, isLoading } = useQuery({
    queryKey: ['admin-roles', page, search],
    queryFn: () =>
      adminApi.getRoles({
        page,
        limit: 10,
        search: search || undefined,
      }),
  });

  // Fetch Permissions
  const { data: permissionsData } = useQuery({
    queryKey: ['admin-permissions'],
    queryFn: () => adminApi.getPermissions({ limit: 100 }),
  });

  const permissions = permissionsData?.data || [];

  // Group permissions by module
  const permissionsByModule = React.useMemo(() => {
    const groups: Record<string, Permission[]> = {};
    permissions.forEach((perm) => {
      const mod = perm.module || 'CHUNG';
      if (!groups[mod]) groups[mod] = [];
      groups[mod].push(perm);
    });
    return groups;
  }, [permissions]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<RoleFormData>({
    defaultValues: {
      name: '',
      code: '',
      isActive: true,
      permissionIds: [],
    },
  });

  const selectedPermissionIds = watch('permissionIds') || [];
  const isActiveWatched = watch('isActive');

  const openCreateDialog = () => {
    setEditingRole(null);
    reset({
      name: '',
      code: '',
      isActive: true,
      permissionIds: [],
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (role: Role) => {
    setEditingRole(role);
    reset({
      name: role.name,
      code: role.code,
      isActive: role.isActive ?? true,
      permissionIds: role.permissions?.map((p) => p.id) || [],
    });
    setIsDialogOpen(true);
  };

  const togglePermission = (id: number) => {
    const current = new Set(selectedPermissionIds);
    if (current.has(id)) {
      current.delete(id);
    } else {
      current.add(id);
    }
    setValue('permissionIds', Array.from(current));
  };

  const toggleAllInModule = (modulePermissions: Permission[]) => {
    const current = new Set(selectedPermissionIds);
    const allModuleSelected = modulePermissions.every((p) => current.has(p.id));

    if (allModuleSelected) {
      modulePermissions.forEach((p) => current.delete(p.id));
    } else {
      modulePermissions.forEach((p) => current.add(p.id));
    }
    setValue('permissionIds', Array.from(current));
  };

  // Mutation save role
  const saveRoleMutation = useMutation({
    mutationFn: async (data: RoleFormData) => {
      if (editingRole) {
        return adminApi.updateRole(editingRole.id, {
          name: data.name,
          isActive: data.isActive,
          permissionIds: data.permissionIds,
        });
      } else {
        return adminApi.createRole({
          name: data.name,
          code: data.code.toUpperCase(),
          permissionIds: data.permissionIds,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-roles'] });
      toast.success(editingRole ? 'Cập nhật vai trò thành công!' : 'Tạo vai trò mới thành công!');
      setIsDialogOpen(false);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Lưu vai trò thất bại');
    },
  });

  // Mutation delete role
  const deleteRoleMutation = useMutation({
    mutationFn: (roleId: number) => adminApi.deleteRole(roleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-roles'] });
      toast.success('Xóa vai trò thành công!');
      setDeleteTargetRole(null);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Xóa vai trò thất bại');
    },
  });

  const onSubmit = (data: RoleFormData) => {
    saveRoleMutation.mutate(data);
  };

  const isCoreRole = (code: string) => {
    return ['ADMIN', 'CUSTOMER'].includes(code?.toUpperCase());
  };

  const columns: Column<Role>[] = [
    {
      header: 'ID',
      className: 'w-16 text-center text-xs text-neutral-400 font-mono',
      cell: (role) => `#${role.id}`,
    },
    {
      header: 'Tên vai trò',
      cell: (role) => (
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-xl bg-neutral-100 text-neutral-700 flex items-center justify-center">
            <Shield className="size-4" />
          </div>
          <div>
            <p className="font-semibold text-xs text-neutral-900">{role.name}</p>
            <p className="text-[11px] text-neutral-400 font-mono">{role.code}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Số quyền hạn',
      cell: (role) => (
        <span className="text-xs font-semibold text-neutral-700 flex items-center gap-1.5">
          <KeyRound className="size-3.5 text-neutral-400" />
          {role.permissions?.length || 0} quyền
        </span>
      ),
    },
    {
      header: 'Trạng thái',
      cell: (role) =>
        role.isActive ? (
          <Badge variant="success" className="gap-1 text-[11px]">
            <CheckCircle2 className="size-3" /> Hoạt động
          </Badge>
        ) : (
          <Badge variant="destructive" className="gap-1 text-[11px]">
            <XCircle className="size-3" /> Vô hiệu
          </Badge>
        ),
    },
    {
      header: 'Hành động',
      className: 'text-right',
      cell: (role) => (
        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            onClick={() => openEditDialog(role)}
            title="Chỉnh sửa vai trò"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition"
          >
            <Edit3 className="size-4" />
          </button>

          {!isCoreRole(role.code) ? (
            <button
              type="button"
              onClick={() => setDeleteTargetRole(role)}
              title="Xóa vai trò"
              className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition"
            >
              <Trash2 className="size-4" />
            </button>
          ) : (
            <span
              title="Vai trò hệ thống cốt lõi không thể xóa"
              className="p-1.5 text-neutral-300 cursor-not-allowed"
            >
              <Lock className="size-4" />
            </span>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="eyebrow block mb-1">PHÂN QUYỀN HỆ THỐNG</span>
          <h1 className="font-display text-3xl sm:text-4xl text-[#1D1F20] tracking-tight">
            Vai trò & Quyền hạn
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Thiết lập danh mục vai trò người dùng (Roles) và ma trận phân quyền tính năng (RBAC).
          </p>
        </div>

        <Button
          onClick={openCreateDialog}
          className="h-10 px-4 rounded-xl bg-[#1D1F20] hover:bg-neutral-800 text-white font-medium flex items-center gap-2"
        >
          <Plus className="size-4" />
          <span>Thêm vai trò mới</span>
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-[#EAE6DF] p-4 flex items-center justify-between shadow-xs">
        <SearchInput
          value={search}
          onChange={(val) => {
            setSearch(val);
            setPage(1);
          }}
          placeholder="Tìm kiếm theo tên hoặc mã vai trò..."
          className="max-w-md"
        />
      </div>

      {/* Roles Data Table */}
      <DataTable
        columns={columns}
        data={rolesData?.data || []}
        isLoading={isLoading}
        page={page}
        totalPages={rolesData?.totalPages || 1}
        totalItems={rolesData?.totalItems}
        onPageChange={setPage}
        emptyMessage="Không tìm thấy vai trò nào."
      />

      {/* Create / Edit Role Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl bg-white border border-[#EAE6DF] rounded-2xl p-6 max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-neutral-900">
              {editingRole ? `Chỉnh sửa vai trò "${editingRole.name}"` : 'Tạo vai trò mới'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-2 flex-1 overflow-y-auto pr-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
                  Tên vai trò
                </label>
                <input
                  {...register('name', { required: 'Tên vai trò là bắt buộc' })}
                  placeholder="Ví dụ: Quản trị viên chi nhánh"
                  className="w-full rounded-xl border border-[#EAE6DF] bg-white px-4 py-2 text-sm text-neutral-800 outline-none focus:border-neutral-900 shadow-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
                  Mã vai trò (Code)
                </label>
                <input
                  {...register('code', { required: 'Mã vai trò là bắt buộc' })}
                  disabled={!!editingRole}
                  placeholder="Ví dụ: BRANCH_MANAGER"
                  className="w-full rounded-xl border border-[#EAE6DF] bg-white px-4 py-2 text-sm text-neutral-800 outline-none focus:border-neutral-900 shadow-xs uppercase font-mono disabled:bg-neutral-100 disabled:text-neutral-500"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={isActiveWatched}
                onChange={(e) => setValue('isActive', e.target.checked)}
                className="rounded border-[#EAE6DF] accent-neutral-900 size-4"
              />
              <span className="text-xs font-medium text-neutral-700">Kích hoạt vai trò này</span>
            </label>

            {/* Matrix Permissions By Module */}
            <div className="space-y-3 pt-2 border-t border-[#EAE6DF]">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 flex items-center gap-1.5">
                  <KeyRound className="size-3.5" />
                  Danh mục quyền hạn ({selectedPermissionIds.length} đã chọn)
                </h4>
              </div>

              {Object.keys(permissionsByModule).length === 0 ? (
                <div className="text-center py-6 text-xs text-neutral-400">
                  Đang tải danh sách quyền hạn...
                </div>
              ) : (
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                  {Object.entries(permissionsByModule).map(([mod, perms]) => {
                    const allSelected = perms.every((p) =>
                      selectedPermissionIds.includes(p.id)
                    );
                    return (
                      <div
                        key={mod}
                        className="rounded-xl border border-[#EAE6DF] p-3.5 bg-neutral-50/50 space-y-2.5"
                      >
                        <div className="flex items-center justify-between pb-2 border-b border-[#EAE6DF]">
                          <span className="text-xs font-bold text-neutral-900 uppercase tracking-wide">
                            {mod}
                          </span>
                          <button
                            type="button"
                            onClick={() => toggleAllInModule(perms)}
                            className="text-[11px] text-neutral-500 hover:text-neutral-900 font-medium"
                          >
                            {allSelected ? 'Bỏ chọn module' : 'Chọn tất cả module'}
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {perms.map((p) => {
                            const isChecked = selectedPermissionIds.includes(p.id);
                            return (
                              <label
                                key={p.id}
                                className={`flex items-start gap-2 p-2 rounded-lg border transition cursor-pointer text-xs ${
                                  isChecked
                                    ? 'border-neutral-900 bg-white font-medium'
                                    : 'border-[#EAE6DF] bg-white/70 hover:border-neutral-300'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => togglePermission(p.id)}
                                  className="rounded border-[#EAE6DF] accent-neutral-900 size-3.5 mt-0.5"
                                />
                                <div className="min-w-0">
                                  <p className="text-neutral-900 truncate font-mono text-[11px]">
                                    {p.code}
                                  </p>
                                  {p.description && (
                                    <p className="text-[10px] text-neutral-500 line-clamp-1">
                                      {p.description}
                                    </p>
                                  )}
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <DialogFooter className="mt-6 flex flex-row justify-end gap-2.5 pt-3 border-t border-[#EAE6DF]">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="rounded-xl border-[#EAE6DF]"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={saveRoleMutation.isPending}
                className="rounded-xl bg-[#1D1F20] hover:bg-neutral-800 text-white font-medium"
              >
                {saveRoleMutation.isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin mr-2" />
                    Đang lưu...
                  </>
                ) : (
                  'Lưu vai trò'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirm Delete Role */}
      <ConfirmDialog
        open={!!deleteTargetRole}
        onOpenChange={(open) => !open && setDeleteTargetRole(null)}
        title="Xóa vai trò"
        description={`Bạn có chắc chắn muốn xóa vai trò "${deleteTargetRole?.name}" (${deleteTargetRole?.code})? Hành động này sẽ loại bỏ quyền hạn của những người dùng đang giữ vai trò này.`}
        variant="destructive"
        confirmText="Xóa vai trò"
        isLoading={deleteRoleMutation.isPending}
        onConfirm={() => {
          if (deleteTargetRole) deleteRoleMutation.mutate(deleteTargetRole.id);
        }}
      />
    </div>
  );
}


```

# src\app\admin\shipments\page.tsx

| Property | Value |
|----------|-------|
| Path | `src\app\admin\shipments\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:37.377678 |

```tsx

```

# src\app\admin\users\page.tsx

| Property | Value |
|----------|-------|
| Path | `src\app\admin\users\page.tsx` |
| Size | 13,910 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.882291 |

```tsx
'use client';

import * as React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  Users,
  Search,
  Filter,
  MoreVertical,
  ShieldAlert,
  ShieldCheck,
  Ban,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  Phone,
  Mail,
  UserCheck,
} from 'lucide-react';
import { adminApi } from '@/modules/admin/api';
import { SearchInput } from '@/components/ui/search-input';
import { DataTable, type Column } from '@/modules/admin/components/data-table';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { UserProfile, UserStatus } from '@/types';

export default function AdminUsersPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<UserStatus | ''>('');
  const [selectedUser, setSelectedUser] = React.useState<UserProfile | null>(null);
  const [statusChangeTarget, setStatusChangeTarget] = React.useState<{
    user: UserProfile;
    newStatus: UserStatus;
  } | null>(null);
  const [deleteTargetUser, setDeleteTargetUser] = React.useState<UserProfile | null>(null);

  // Fetch Users
  const { data: usersData, isLoading } = useQuery({
    queryKey: ['admin-users', page, search, statusFilter],
    queryFn: () =>
      adminApi.getUsers({
        page,
        limit: 10,
        search: search || undefined,
        status: statusFilter || undefined,
      }),
  });

  // Mutation update status
  const updateStatusMutation = useMutation({
    mutationFn: ({ userId, status }: { userId: number; status: UserStatus }) =>
      adminApi.updateUserStatus(userId, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast.success('Cập nhật trạng thái người dùng thành công!');
      setStatusChangeTarget(null);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Cập nhật trạng thái thất bại');
    },
  });

  // Mutation delete user
  const deleteUserMutation = useMutation({
    mutationFn: (userId: number) => adminApi.deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast.success('Đã xóa tài khoản người dùng!');
      setDeleteTargetUser(null);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Xóa người dùng thất bại');
    },
  });

  const getStatusBadge = (status: UserStatus) => {
    switch (status) {
      case 'ACTIVE':
        return <Badge variant="success">Hoạt động</Badge>;
      case 'BLOCKED':
        return <Badge variant="destructive">Bị khóa</Badge>;
      case 'INACTIVE':
        return <Badge variant="warning">Chưa kích hoạt</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const columns: Column<UserProfile>[] = [
    {
      header: 'ID',
      className: 'w-16 text-center text-xs text-neutral-400 font-mono',
      cell: (user) => `#${user.id}`,
    },
    {
      header: 'Người dùng',
      cell: (user) => (
        <div className="flex items-center gap-3">
          <Avatar
            src={user.avatarUrl}
            alt={user.fullName}
            size="sm"
            className="size-8"
          />
          <div>
            <p className="font-semibold text-xs text-neutral-900">{user.fullName}</p>
            <p className="text-[11px] text-neutral-400">{user.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Số điện thoại',
      cell: (user) => (
        <span className="text-xs text-neutral-600 font-mono">
          {user.phoneNumber || '—'}
        </span>
      ),
    },
    {
      header: 'Vai trò',
      cell: (user) => (
        <Badge
          variant={user.role?.code === 'ADMIN' ? 'lime' : 'secondary'}
          className="text-[11px]"
        >
          {user.role?.name || user.role?.code || 'Customer'}
        </Badge>
      ),
    },
    {
      header: 'Điểm thưởng',
      cell: (user) => (
        <span className="text-xs font-semibold text-neutral-800 flex items-center gap-1">
          <Sparkles className="size-3 text-amber-500 fill-amber-500" />
          {(user.rewardPoints || 0).toLocaleString('vi-VN')}
        </span>
      ),
    },
    {
      header: 'Trạng thái',
      cell: (user) => getStatusBadge(user.status),
    },
    {
      header: 'Hành động',
      className: 'text-right',
      cell: (user) => (
        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            onClick={() => setSelectedUser(user)}
            title="Xem chi tiết"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition"
          >
            <Eye className="size-4" />
          </button>

          {user.status === 'ACTIVE' ? (
            <button
              type="button"
              onClick={() =>
                setStatusChangeTarget({ user, newStatus: 'BLOCKED' })
              }
              title="Khóa tài khoản"
              className="p-1.5 rounded-lg text-neutral-400 hover:text-amber-600 hover:bg-amber-50 transition"
            >
              <Ban className="size-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() =>
                setStatusChangeTarget({ user, newStatus: 'ACTIVE' })
              }
              title="Kích hoạt lại"
              className="p-1.5 rounded-lg text-neutral-400 hover:text-emerald-600 hover:bg-emerald-50 transition"
            >
              <CheckCircle2 className="size-4" />
            </button>
          )}

          <button
            type="button"
            onClick={() => setDeleteTargetUser(user)}
            title="Xóa người dùng"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="eyebrow block mb-1">QUẢN TRỊ TÀI KHOẢN</span>
          <h1 className="font-display text-3xl sm:text-4xl text-[#1D1F20] tracking-tight">
            Người dùng
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Xem danh sách tài khoản khách hàng và nhân viên, cập nhật trạng thái hoạt động.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-[#EAE6DF] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <SearchInput
          value={search}
          onChange={(val) => {
            setSearch(val);
            setPage(1);
          }}
          placeholder="Tìm theo tên hoặc email người dùng..."
          className="max-w-md"
        />

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 shrink-0">
            <Filter className="size-3.5" />
            <span>Trạng thái:</span>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as UserStatus | '');
              setPage(1);
            }}
            className="rounded-xl border border-[#EAE6DF] bg-white px-3 py-2 text-xs font-medium text-neutral-800 outline-none transition focus:border-neutral-900 shadow-xs cursor-pointer"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="ACTIVE">Hoạt động (ACTIVE)</option>
            <option value="INACTIVE">Chưa kích hoạt (INACTIVE)</option>
            <option value="BLOCKED">Bị khóa (BLOCKED)</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={usersData?.data || []}
        isLoading={isLoading}
        page={page}
        totalPages={usersData?.totalPages || 1}
        totalItems={usersData?.totalItems}
        onPageChange={setPage}
        emptyMessage="Không tìm thấy người dùng nào phù hợp với bộ lọc."
      />

      {/* User Details Modal */}
      <Dialog open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
        <DialogContent className="sm:max-w-md bg-white border border-[#EAE6DF] rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold text-neutral-900">
              Chi tiết người dùng #{selectedUser?.id}
            </DialogTitle>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-5 pt-2">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-neutral-50 border border-[#EAE6DF]">
                <Avatar
                  src={selectedUser.avatarUrl}
                  alt={selectedUser.fullName}
                  size="lg"
                  className="size-14"
                />
                <div>
                  <h3 className="font-semibold text-sm text-neutral-900">
                    {selectedUser.fullName}
                  </h3>
                  <p className="text-xs text-neutral-500">{selectedUser.email}</p>
                  <div className="mt-1 flex gap-2">
                    {getStatusBadge(selectedUser.status)}
                    <Badge variant="lime" className="text-[10px]">
                      {selectedUser.role?.name || 'Customer'}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between py-2 border-b border-[#EAE6DF]">
                  <span className="text-neutral-500 flex items-center gap-2">
                    <Phone className="size-3.5" /> Số điện thoại
                  </span>
                  <span className="font-medium text-neutral-800">
                    {selectedUser.phoneNumber || 'Chưa cung cấp'}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-[#EAE6DF]">
                  <span className="text-neutral-500 flex items-center gap-2">
                    <Sparkles className="size-3.5" /> Điểm thưởng tích lũy
                  </span>
                  <span className="font-bold text-neutral-900">
                    {(selectedUser.rewardPoints || 0).toLocaleString('vi-VN')} điểm
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-[#EAE6DF]">
                  <span className="text-neutral-500 flex items-center gap-2">
                    <Clock className="size-3.5" /> Ngày tạo tài khoản
                  </span>
                  <span className="font-medium text-neutral-800">
                    {selectedUser.createdAt
                      ? new Date(selectedUser.createdAt).toLocaleDateString('vi-VN')
                      : '—'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Confirm Change Status Dialog */}
      <ConfirmDialog
        open={!!statusChangeTarget}
        onOpenChange={(open) => !open && setStatusChangeTarget(null)}
        title={statusChangeTarget?.newStatus === 'BLOCKED' ? 'Khóa tài khoản người dùng' : 'Kích hoạt lại tài khoản'}
        description={`Bạn có chắc chắn muốn thay đổi trạng thái của tài khoản ${statusChangeTarget?.user.fullName} sang "${statusChangeTarget?.newStatus}"?`}
        variant={statusChangeTarget?.newStatus === 'BLOCKED' ? 'destructive' : 'default'}
        confirmText="Xác nhận thay đổi"
        isLoading={updateStatusMutation.isPending}
        onConfirm={() => {
          if (statusChangeTarget) {
            updateStatusMutation.mutate({
              userId: statusChangeTarget.user.id,
              status: statusChangeTarget.newStatus,
            });
          }
        }}
      />

      {/* Confirm Delete User Dialog */}
      <ConfirmDialog
        open={!!deleteTargetUser}
        onOpenChange={(open) => !open && setDeleteTargetUser(null)}
        title="Xóa vĩnh viễn người dùng"
        description={`Cảnh báo: Hành động này sẽ xóa người dùng "${deleteTargetUser?.fullName}" (${deleteTargetUser?.email}) khỏi cơ sở dữ liệu. Thao tác không thể hoàn tác.`}
        variant="destructive"
        confirmText="Xóa người dùng"
        isLoading={deleteUserMutation.isPending}
        onConfirm={() => {
          if (deleteTargetUser) {
            deleteUserMutation.mutate(deleteTargetUser.id);
          }
        }}
      />
    </div>
  );
}


```

# src\app\admin\vouchers\page.tsx

| Property | Value |
|----------|-------|
| Path | `src\app\admin\vouchers\page.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:05:37.807409 |

```tsx

```

# src\app\favicon.ico

| Property | Value |
|----------|-------|
| Path | `src\app\favicon.ico` |
| Size | 25,931 bytes |
| Extension | `.ico` |
| Modified | 2026-09-29 13:25:28.291414 |

> **File nhị phân** (đã bỏ qua nội dung)

# src\app\globals.css

| Property | Value |
|----------|-------|
| Path | `src\app\globals.css` |
| Size | 948 bytes |
| Extension | `.css` |
| Modified | 2026-10-01 17:02:22.908285 |

```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');
@import 'tailwindcss';
@import 'tw-animate-css';
:root {
  --cream: #fbf9f4;
  --ink: #1d1f20;
  --lime: #84ea53;
  --line: #eae6df;
}
* {
  box-sizing: border-box;
}
html {
  background: var(--cream);
}
body {
  margin: 0;
  background: var(--cream);
  color: var(--ink);
  font-family: 'Inter', Arial, sans-serif;
}
a {
  color: inherit;
  text-decoration: none;
}
button,
input {
  font: inherit;
}
.font-display {
  font-family: 'Cormorant Garamond', Georgia, serif;
}
.eyebrow {
  color: #74736e;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}
.section-title {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  line-height: 0.9;
  letter-spacing: -0.035em;
}

```

# src\app\layout.tsx

| Property | Value |
|----------|-------|
| Path | `src\app\layout.tsx` |
| Size | 819 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:12:38.528389 |

```tsx
import type { Metadata } from 'next';
import { QueryProvider } from '@/components/providers/query-provider';
import { AuthProvider } from '@/components/providers/auth-provider';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fashion Store — Considered Goods',
  description: 'A curated edit of fashion and everyday objects.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body className="bg-[#FBF9F4] text-[#1D1F20] antialiased">
        <QueryProvider>
          <AuthProvider>
            {children}
            <Toaster position="top-right" richColors />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
```

# src\app\page.tsx

| Property | Value |
|----------|-------|
| Path | `src\app\page.tsx` |
| Size | 4,570 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:12:52.431988 |

```tsx
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ChevronRight, Star } from 'lucide-react';
import { categories, products } from '@/modules/catalog/mock';
import { ProductCard } from '@/modules/catalog/components/product-card';

export default function Home() {
  return (
    <main>
      <section className="mx-auto max-w-[1440px] px-4 pb-6 pt-4 sm:px-8 lg:px-12">
        <div className="relative min-h-[500px] overflow-hidden rounded-2xl bg-[#1D1F20] px-7 py-10 text-white sm:px-12 sm:py-16 lg:px-20">
          <div className="absolute -right-10 top-0 h-full w-3/5 bg-[radial-gradient(circle_at_70%_35%,rgba(132,234,83,.5),transparent_34%),linear-gradient(120deg,transparent_10%,rgba(255,255,255,.05)_90%)] opacity-90" />
          <div className="relative z-10 max-w-xl">
            <p className="mb-6 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.23em] text-[#84EA53]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#84EA53]" /> The new
              essentials
            </p>
            <h1 className="font-display text-6xl leading-[.9] tracking-[-.04em] sm:text-8xl">
              Objects with a point of view.
            </h1>
            <p className="mt-7 max-w-md text-sm leading-6 text-white/65 sm:text-base">
              Thoughtful fashion and everyday pieces, chosen for the way they
              make a room, an outfit, or a day feel.
            </p>
            <Link
              href="/search"
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#84EA53] px-6 py-3.5 text-sm font-bold text-[#1D1F20] transition-transform hover:-translate-y-0.5"
            >
              Shop new arrivals <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="absolute bottom-8 right-8 hidden max-w-[190px] border-l border-white/20 pl-5 text-xs leading-5 text-white/55 lg:block">
            <Star size={15} fill="#84EA53" color="#84EA53" className="mb-3" />
            Curated goods for a considered life.
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-8 lg:px-12 lg:py-20">
        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="eyebrow">Browse the edit</p>
            <h2 className="section-title mt-2">Shop by feeling</h2>
          </div>
          <Link
            href="/search"
            className="hidden items-center gap-1 text-sm font-semibold sm:flex"
          >
            View all <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {categories.slice(0, 4).map((category) => (
            <Link
              key={category.name}
              href={`/search?category=${category.name}`}
              className="group relative min-h-[220px] overflow-hidden rounded-xl bg-white sm:min-h-[300px]"
            >
              <Image
                src={category.image}
                alt=""
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
              <div className="absolute bottom-5 left-5 text-white">
                <p className="font-display text-3xl">{category.name}</p>
                <p className="mt-1 text-xs text-white/70">
                  {category.count} pieces
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-[1440px] px-4 pb-20 sm:px-8 lg:px-12">
        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="eyebrow">Picked for you</p>
            <h2 className="section-title mt-2">The good stuff</h2>
          </div>
          <Link
            href="/search"
            className="flex items-center gap-1 text-sm font-semibold"
          >
            Explore edit <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}

```

# src\components\layouts\admin-sidebar.tsx

| Property | Value |
|----------|-------|
| Path | `src\components\layouts\admin-sidebar.tsx` |
| Size | 70 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.884291 |

```tsx
export { AdminSidebar } from '@/modules/admin/components/sidebar';


```

# src\components\layouts\mobile-nav.tsx

| Property | Value |
|----------|-------|
| Path | `src\components\layouts\mobile-nav.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.090879 |

```tsx

```

# src\components\layouts\site-footer.tsx

| Property | Value |
|----------|-------|
| Path | `src\components\layouts\site-footer.tsx` |
| Size | 2,546 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.886554 |

```tsx
import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t border-[#EAE6DF] bg-white py-12 mt-auto">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="font-display text-2xl font-semibold tracking-[-.06em]">
              common<span className="text-[#84EA53]">.</span>
            </Link>
            <p className="mt-3 text-xs text-neutral-500 leading-relaxed max-w-xs">
              Bộ sưu tập chọn lọc thời trang đương đại và các sản phẩm phong cách sống tối giản.
            </p>
          </div>
          <div>
            <h4 className="eyebrow mb-3">Tài khoản</h4>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li><Link href="/profile" className="hover:text-neutral-900 transition">Hồ sơ cá nhân</Link></li>
              <li><Link href="/orders" className="hover:text-neutral-900 transition">Lịch sử đơn hàng</Link></li>
              <li><Link href="/addresses" className="hover:text-neutral-900 transition">Sổ địa chỉ</Link></li>
              <li><Link href="/security" className="hover:text-neutral-900 transition">Bảo mật tài khoản</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="eyebrow mb-3">Hỗ trợ khách hàng</h4>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li><Link href="#" className="hover:text-neutral-900 transition">Chính sách đổi trả</Link></li>
              <li><Link href="#" className="hover:text-neutral-900 transition">Hướng dẫn chọn size</Link></li>
              <li><Link href="#" className="hover:text-neutral-900 transition">Phương thức thanh toán</Link></li>
              <li><Link href="#" className="hover:text-neutral-900 transition">Câu hỏi thường gặp</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="eyebrow mb-3">Về chúng tôi</h4>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Trải nghiệm mua sắm hiện đại, tinh tế và bền vững.
            </p>
            <p className="text-xs text-neutral-400 mt-4">
              © {new Date().getFullYear()} Common Fashion. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}


```

# src\components\layouts\site-header.tsx

| Property | Value |
|----------|-------|
| Path | `src\components\layouts\site-header.tsx` |
| Size | 2,609 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.092869 |

```tsx
'use client';
import Link from 'next/link';
import { Search, ShoppingBag } from 'lucide-react';
import { categories } from '@/modules/catalog/mock';
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#EAE6DF] bg-[#FBF9F4]/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center gap-5 px-4 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="shrink-0 font-display text-3xl font-semibold tracking-[-.06em]"
        >
          common<span className="text-[#84EA53]">.</span>
        </Link>
        <div className="hidden h-11 max-w-[430px] flex-1 items-center rounded-full border border-[#EAE6DF] bg-white px-4 shadow-[0_5px_20px_rgba(29,31,32,.04)] sm:flex">
          <Search size={17} className="mr-3 text-[#74736e]" />
          <input
            aria-label="Search products"
            placeholder="Search for an object, a feeling..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-[#9b9991]"
          />
          <kbd className="rounded bg-[#FBF9F4] px-2 py-1 text-[10px] text-[#74736e]">
            ⌘ K
          </kbd>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/search"
            className="rounded-full p-2.5 hover:bg-white sm:hidden"
          >
            <Search size={20} />
          </Link>
          <Link
            href="/cart"
            className="relative rounded-full p-2.5 hover:bg-white"
          >
            <ShoppingBag size={20} />
            <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#84EA53] text-[9px] font-bold">
              2
            </span>
          </Link>
        </div>
      </div>
      <nav className="scrollbar-none mx-auto flex max-w-[1440px] gap-7 overflow-x-auto px-4 pb-3 sm:px-8 lg:px-12">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/search?category=${category.name}`}
            className="group flex min-w-fit flex-col items-center gap-1 text-[#74736e] transition-colors hover:text-[#1D1F20]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#EAE6DF] bg-white text-base group-hover:border-[#84EA53]">
              {category.icon}
            </span>
            <span className="text-[10px] font-medium">{category.name}</span>
          </Link>
        ))}
      </nav>
    </header>
  );
}

```

# src\components\providers\auth-provider.tsx

| Property | Value |
|----------|-------|
| Path | `src\components\providers\auth-provider.tsx` |
| Size | 2,838 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:08:10.767791 |

```tsx
'use client';

import React, { createContext, useContext, useSyncExternalStore } from 'react';
import { UserProfile } from '@/types';
import { cartApi } from '@/api/cart.api';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (accessToken: string, refreshToken: string, user: UserProfile) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Helper quản lý việc lắng nghe thay đổi của localStorage
function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('local-storage-change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('local-storage-change', callback);
  };
}

function getStoredUserSnapshot(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('user');
}

function getStoredUserServerSnapshot(): string | null {
  return null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Lấy dữ liệu user an toàn không qua useEffect đồng bộ
  const userString = useSyncExternalStore(
    subscribe,
    getStoredUserSnapshot,
    getStoredUserServerSnapshot
  );

  const user: UserProfile | null = React.useMemo(() => {
    if (!userString) return null;
    try {
      return JSON.parse(userString);
    } catch {
      return null;
    }
  }, [userString]);

  const login = async (accessToken: string, refreshToken: string, newUser: UserProfile) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    document.cookie = `accessToken=${accessToken}; path=/; max-age=3600`;

    // Thông báo cho useSyncExternalStore cập nhật tức thì
    window.dispatchEvent(new Event('local-storage-change'));

    try {
      await cartApi.mergeCart();
    } catch (err) {
      console.error('Merge cart failed:', err);
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    document.cookie = 'accessToken=; path=/; max-age=0';

    window.dispatchEvent(new Event('local-storage-change'));
    window.location.href = '/login';
  };

  const value = React.useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isAdmin: user?.role?.code === 'ADMIN',
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
```

# src\components\providers\query-provider.tsx

| Property | Value |
|----------|-------|
| Path | `src\components\providers\query-provider.tsx` |
| Size | 623 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 14:53:18.462067 |

```tsx
// src/components/providers/query-provider.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // Cache 1 phút
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
```

# src\components\providers\socket-provider.tsx

| Property | Value |
|----------|-------|
| Path | `src\components\providers\socket-provider.tsx` |
| Size | 1,619 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:08:20.910211 |

```tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    
    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000', {
      auth: { token },
      autoConnect: !!token,
    });

    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);

    socketInstance.on('connect', onConnect);
    socketInstance.on('disconnect', onDisconnect);

    // Gán socket qua callback bất đồng bộ để không kích hoạt cascading render warning
    const timer = setTimeout(() => {
      setSocket(socketInstance);
    }, 0);

    return () => {
      clearTimeout(timer);
      socketInstance.off('connect', onConnect);
      socketInstance.off('disconnect', onDisconnect);
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);
```

# src\components\ui\avatar.tsx

| Property | Value |
|----------|-------|
| Path | `src\components\ui\avatar.tsx` |
| Size | 1,365 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.888693 |

```tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'default' | 'lg' | 'xl';
}

export function Avatar({
  src,
  alt = 'Avatar',
  fallback,
  size = 'default',
  className,
  ...props
}: AvatarProps) {
  const [imageError, setImageError] = React.useState(false);

  const sizeClasses = {
    sm: 'size-7 text-xs',
    default: 'size-9 text-xs',
    lg: 'size-12 text-sm',
    xl: 'size-16 text-base font-medium',
  };

  const getFallbackText = () => {
    if (fallback) return fallback.slice(0, 2).toUpperCase();
    if (alt) return alt.slice(0, 2).toUpperCase();
    return 'U';
  };

  return (
    <div
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-neutral-200 text-neutral-700 font-semibold select-none ring-1 ring-black/5',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {src && !imageError ? (
        <img
          src={src}
          alt={alt}
          onError={() => setImageError(true)}
          className="size-full object-cover"
        />
      ) : (
        <span>{getFallbackText()}</span>
      )}
    </div>
  );
}


```

# src\components\ui\badge.tsx

| Property | Value |
|----------|-------|
| Path | `src\components\ui\badge.tsx` |
| Size | 1,265 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.889966 |

```tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-neutral-900 text-white',
        secondary: 'bg-neutral-100 text-neutral-800 border border-neutral-200',
        outline: 'border border-[#EAE6DF] text-neutral-700 bg-transparent',
        success: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60',
        warning: 'bg-amber-50 text-amber-700 border border-amber-200/60',
        destructive: 'bg-rose-50 text-rose-700 border border-rose-200/60',
        lime: 'bg-[#84EA53]/20 text-neutral-900 border border-[#84EA53]/40 font-semibold',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };


```

# src\components\ui\button.tsx

| Property | Value |
|----------|-------|
| Path | `src\components\ui\button.tsx` |
| Size | 3,303 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:21:31.367495 |

```tsx
import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/80',
        outline:
          'border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
        ghost:
          'hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50',
        destructive:
          'bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default:
          'h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: 'h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        icon: 'size-8',
        'icon-xs':
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        'icon-sm':
          'size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg',
        'icon-lg': 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };

```

# src\components\ui\card.tsx

| Property | Value |
|----------|-------|
| Path | `src\components\ui\card.tsx` |
| Size | 2,746 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:21:31.367495 |

```tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

function Card({
  className,
  size = 'default',
  ...props
}: React.ComponentProps<'div'> & { size?: 'default' | 'sm' }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        'group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl',
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        'group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)',
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        'font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm',
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('px-(--card-spacing)', className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        'flex items-center rounded-b-xl border-t bg-muted/50 p-(--card-spacing)',
        className,
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};

```

# src\components\ui\confirm-dialog.tsx

| Property | Value |
|----------|-------|
| Path | `src\components\ui\confirm-dialog.tsx` |
| Size | 2,910 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.891332 |

```tsx
'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './dialog';
import { Button } from './button';
import { AlertTriangle, Info } from 'lucide-react';

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => void | Promise<void>;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
  isLoading?: boolean;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmText = 'Xác nhận',
  cancelText = 'Hủy',
  variant = 'default',
  isLoading = false,
}: ConfirmDialogProps) {
  const handleConfirm = async () => {
    await onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white border border-[#EAE6DF] rounded-2xl p-6 shadow-xl">
        <DialogHeader className="gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`p-2.5 rounded-xl ${
                variant === 'destructive'
                  ? 'bg-rose-50 text-rose-600'
                  : 'bg-neutral-100 text-neutral-800'
              }`}
            >
              {variant === 'destructive' ? (
                <AlertTriangle className="size-5" />
              ) : (
                <Info className="size-5" />
              )}
            </div>
            <DialogTitle className="text-base font-semibold text-neutral-900">
              {title}
            </DialogTitle>
          </div>
          <DialogDescription className="text-sm text-neutral-600 leading-relaxed pt-1">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-6 flex flex-row justify-end gap-2.5 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="rounded-xl border-[#EAE6DF] hover:bg-neutral-50 text-neutral-700"
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            variant={variant === 'destructive' ? 'destructive' : 'default'}
            onClick={handleConfirm}
            disabled={isLoading}
            className={`rounded-xl ${
              variant === 'destructive'
                ? 'bg-rose-600 hover:bg-rose-700 text-white'
                : 'bg-[#1D1F20] hover:bg-neutral-800 text-white'
            }`}
          >
            {isLoading ? 'Đang xử lý...' : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


```

# src\components\ui\dialog.tsx

| Property | Value |
|----------|-------|
| Path | `src\components\ui\dialog.tsx` |
| Size | 4,246 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:21:31.367495 |

```tsx
'use client';

import * as React from 'react';
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        'fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0',
        className,
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean;
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          'fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <Button
                variant="ghost"
                className="absolute top-2 right-2"
                size="icon-sm"
              />
            }
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  );
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  showCloseButton?: boolean;
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        '-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end',
        className,
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close render={<Button variant="outline" />}>
          Close
        </DialogPrimitive.Close>
      )}
    </div>
  );
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        'font-heading text-base leading-none font-medium',
        className,
      )}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        'text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground',
        className,
      )}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};

```

# src\components\ui\dropdown-menu.tsx

| Property | Value |
|----------|-------|
| Path | `src\components\ui\dropdown-menu.tsx` |
| Size | 9,079 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:21:31.186415 |

```tsx
'use client';

import * as React from 'react';
import { Menu as MenuPrimitive } from '@base-ui/react/menu';
import { cn } from '@/lib/utils';
import { ChevronRightIcon, CheckIcon } from 'lucide-react';

function DropdownMenu({ ...props }: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuPortal({ ...props }: MenuPrimitive.Portal.Props) {
  return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />;
}

function DropdownMenuTrigger({ ...props }: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

function DropdownMenuContent({
  align = 'start',
  alignOffset = 0,
  side = 'bottom',
  sideOffset = 4,
  className,
  ...props
}: MenuPrimitive.Popup.Props &
  Pick<
    MenuPrimitive.Positioner.Props,
    'align' | 'alignOffset' | 'side' | 'sideOffset'
  >) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className="isolate z-50 outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={cn(
            'z-50 max-h-(--available-height) w-(--anchor-width) min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95',
            className,
          )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

function DropdownMenuGroup({ ...props }: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />;
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: MenuPrimitive.GroupLabel.Props & {
  inset?: boolean;
}) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        'px-1.5 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7',
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuItem({
  className,
  inset,
  variant = 'default',
  ...props
}: MenuPrimitive.Item.Props & {
  inset?: boolean;
  variant?: 'default' | 'destructive';
}) {
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "group/dropdown-menu-item relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuSub({ ...props }: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />;
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: MenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean;
}) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-popup-open:bg-accent data-popup-open:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto" />
    </MenuPrimitive.SubmenuTrigger>
  );
}

function DropdownMenuSubContent({
  align = 'start',
  alignOffset = -3,
  side = 'right',
  sideOffset = 0,
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
  return (
    <DropdownMenuContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        'w-auto min-w-[96px] rounded-lg bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/10 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
        className,
      )}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  );
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: MenuPrimitive.CheckboxItem.Props & {
  inset?: boolean;
}) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      checked={checked}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
        <MenuPrimitive.CheckboxItemIndicator>
          <CheckIcon />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  );
}

function DropdownMenuRadioGroup({ ...props }: MenuPrimitive.RadioGroup.Props) {
  return (
    <MenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  );
}

function DropdownMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: MenuPrimitive.RadioItem.Props & {
  inset?: boolean;
}) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-radio-item-indicator"
      >
        <MenuPrimitive.RadioItemIndicator>
          <CheckIcon />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn('-mx-1 my-1 h-px bg-border', className)}
      {...props}
    />
  );
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        'ml-auto text-xs tracking-widest text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground',
        className,
      )}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};

```

# src\components\ui\form-field.tsx

| Property | Value |
|----------|-------|
| Path | `src\components\ui\form-field.tsx` |
| Size | 1,191 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 14:54:46.911571 |

```tsx
// src/components/ui/form-field.tsx
import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
}

export function FormField<T extends FieldValues>({
  control,
  name,
  label,
  type = 'text',
  placeholder,
  error,
}: FormFieldProps<T>) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type={type}
            placeholder={placeholder}
            className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition focus:border-neutral-900 ${
              error ? 'border-red-500 bg-red-50/20' : 'border-[#EAE6DF] bg-white'
            }`}
          />
        )}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
```

# src\components\ui\input.tsx

| Property | Value |
|----------|-------|
| Path | `src\components\ui\input.tsx` |
| Size | 1,064 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:21:31.177108 |

```tsx
import * as React from 'react';
import { Input as InputPrimitive } from '@base-ui/react/input';
import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        'h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
        className,
      )}
      {...props}
    />
  );
}

export { Input };

```

# src\components\ui\pagination.tsx

| Property | Value |
|----------|-------|
| Path | `src\components\ui\pagination.tsx` |
| Size | 3,253 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.892571 |

```tsx
import * as React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  totalItems?: number;
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  className,
  totalItems,
}: PaginationProps) {
  if (totalPages <= 1 && !totalItems) return null;

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push('ellipsis-start');

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (page < totalPages - 2) pages.push('ellipsis-end');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className={cn('flex flex-col sm:flex-row items-center justify-between gap-4 py-3', className)}>
      {totalItems !== undefined && (
        <p className="text-xs text-neutral-500">
          Hiển thị trang <span className="font-semibold text-neutral-800">{page}</span> / <span className="font-semibold text-neutral-800">{totalPages || 1}</span> (Tổng cộng <span className="font-semibold text-neutral-800">{totalItems}</span> bản ghi)
        </p>
      )}

      <div className="flex items-center gap-1.5 ml-auto">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="rounded-lg h-8 px-2 text-xs"
        >
          <ChevronLeft className="size-4" />
          <span className="hidden sm:inline">Trước</span>
        </Button>

        {getPageNumbers().map((p, idx) => {
          if (typeof p === 'string') {
            return (
              <span key={`ellipsis-${idx}`} className="px-2 text-neutral-400">
                <MoreHorizontal className="size-4" />
              </span>
            );
          }
          return (
            <Button
              key={p}
              variant={page === p ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPageChange(p)}
              className={cn(
                'size-8 p-0 text-xs rounded-lg font-medium',
                page === p
                  ? 'bg-[#1D1F20] text-white hover:bg-neutral-800'
                  : 'text-neutral-700 hover:bg-neutral-100 border-[#EAE6DF]'
              )}
            >
              {p}
            </Button>
          );
        })}

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="rounded-lg h-8 px-2 text-xs"
        >
          <span className="hidden sm:inline">Sau</span>
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}


```

# src\components\ui\search-input.tsx

| Property | Value |
|----------|-------|
| Path | `src\components\ui\search-input.tsx` |
| Size | 1,834 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.893605 |

```tsx
'use client';

import * as React from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
  debounceMs?: number;
}

export function SearchInput({
  value: initialValue = '',
  onChange,
  debounceMs = 300,
  className,
  placeholder = 'Tìm kiếm...',
  ...props
}: SearchInputProps) {
  const [searchTerm, setSearchTerm] = React.useState(initialValue);

  React.useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      onChange?.(searchTerm);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchTerm, debounceMs, onChange]);

  return (
    <div className={cn('relative flex items-center w-full max-w-sm', className)}>
      <Search className="absolute left-3 size-4 text-neutral-400 pointer-events-none" />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[#EAE6DF] bg-white pl-9 pr-9 py-2 text-sm text-neutral-800 placeholder:text-neutral-400 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10 shadow-xs"
        {...props}
      />
      {searchTerm && (
        <button
          type="button"
          onClick={() => {
            setSearchTerm('');
            onChange?.('');
          }}
          className="absolute right-3 text-neutral-400 hover:text-neutral-700 focus:outline-none"
        >
          <X className="size-3.5" />
        </button>
      )}
    </div>
  );
}


```

# src\components\ui\select.tsx

| Property | Value |
|----------|-------|
| Path | `src\components\ui\select.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.098958 |

```tsx

```

# src\components\ui\skeleton.tsx

| Property | Value |
|----------|-------|
| Path | `src\components\ui\skeleton.tsx` |
| Size | 306 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.894568 |

```tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-neutral-200/70', className)}
      {...props}
    />
  );
}


```

# src\components\ui\table.tsx

| Property | Value |
|----------|-------|
| Path | `src\components\ui\table.tsx` |
| Size | 2,588 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.895664 |

```tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

function Table({ className, ...props }: React.ComponentProps<'table'>) {
  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto">
      <table
        data-slot="table"
        className={cn('w-full caption-bottom text-left text-sm', className)}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
  return (
    <thead
      data-slot="table-header"
      className={cn('border-b border-[#EAE6DF] bg-neutral-50/50 text-xs uppercase tracking-wider text-neutral-500 font-medium', className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return (
    <tbody
      data-slot="table-body"
      className={cn('[&_tr:last-child]:border-0 divide-y divide-[#EAE6DF]', className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn('border-t border-[#EAE6DF] bg-muted/50 font-medium [&>tr]:last:border-b-0', className)}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        'border-b border-[#EAE6DF] transition-colors hover:bg-neutral-50/80 data-[state=selected]:bg-muted',
        className
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        'h-11 px-4 text-left align-middle font-semibold text-neutral-700 whitespace-nowrap [&:has([role=checkbox])]:pr-0',
        className
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
  return (
    <td
      data-slot="table-cell"
      className={cn('p-4 align-middle whitespace-nowrap text-neutral-800 [&:has([role=checkbox])]:pr-0', className)}
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<'caption'>) {
  return (
    <caption
      data-slot="table-caption"
      className={cn('mt-4 text-sm text-neutral-500', className)}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};


```

# src\components\ui\textarea.tsx

| Property | Value |
|----------|-------|
| Path | `src\components\ui\textarea.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.100870 |

```tsx

```

# src\lib\api\client.ts

| Property | Value |
|----------|-------|
| Path | `src\lib\api\client.ts` |
| Size | 34 bytes |
| Extension | `.ts` |
| Modified | 2026-10-01 17:02:22.921283 |

```typescript
export { api } from './request';

```

# src\lib\api\request.ts

| Property | Value |
|----------|-------|
| Path | `src\lib\api\request.ts` |
| Size | 1,182 bytes |
| Extension | `.ts` |
| Modified | 2026-10-01 17:02:22.922283 |

```typescript
const API_URL = process.env.BACKEND_URL;

if (!API_URL) {
  throw new Error('BACKEND_URL is not defined');
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}

export const api = {
  get<T>(path: string, options?: RequestInit) {
    return request<T>(path, {
      ...options,
      method: 'GET',
    });
  },

  post<T>(path: string, body?: unknown, options?: RequestInit) {
    return request<T>(path, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  },

  put<T>(path: string, body?: unknown, options?: RequestInit) {
    return request<T>(path, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  },

  delete<T>(path: string, options?: RequestInit) {
    return request<T>(path, {
      ...options,
      method: 'DELETE',
    });
  },
};

```

# src\lib\auth\permissions.ts

| Property | Value |
|----------|-------|
| Path | `src\lib\auth\permissions.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.102878 |

```typescript

```

# src\lib\auth\session.ts

| Property | Value |
|----------|-------|
| Path | `src\lib\auth\session.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.103916 |

```typescript

```

# src\lib\constants\index.ts

| Property | Value |
|----------|-------|
| Path | `src\lib\constants\index.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.104867 |

```typescript

```

# src\lib\stores\ui.store.ts

| Property | Value |
|----------|-------|
| Path | `src\lib\stores\ui.store.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.106873 |

```typescript

```

# src\lib\utils\cn.ts

| Property | Value |
|----------|-------|
| Path | `src\lib\utils\cn.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.108042 |

```typescript

```

# src\lib\utils\format-currency.ts

| Property | Value |
|----------|-------|
| Path | `src\lib\utils\format-currency.ts` |
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

# src\lib\utils\format-date.ts

| Property | Value |
|----------|-------|
| Path | `src\lib\utils\format-date.ts` |
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

# src\lib\utils.ts

| Property | Value |
|----------|-------|
| Path | `src\lib\utils.ts` |
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

# src\middleware.ts

| Property | Value |
|----------|-------|
| Path | `src\middleware.ts` |
| Size | 1,101 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 14:57:30.080911 |

```typescript
// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value || request.headers.get('authorization');
  const { pathname } = request.nextUrl;

  // 1. Bảo vệ các trang yêu cầu đăng nhập (/checkout, /account/*)
  const isProtectedUserRoute = pathname.startsWith('/checkout') || pathname.startsWith('/account');
  if (isProtectedUserRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirectUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Bảo vệ khu vực Admin (/admin/*)
  if (pathname.startsWith('/admin')) {
    // Với Admin có thể giải mã token hoặc đối chiếu cookie role
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/checkout/:path*', '/account/:path*', '/admin/:path*'],
};
```

# src\modules\admin\api.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\admin\api.ts` |
| Size | 3,929 bytes |
| Extension | `.ts` |
| Modified | 2026-10-05 20:42:08.904566 |

```typescript
import { apiClient } from '@/api/client';
import { API_ENDPOINTS } from '@/api/endpoints';
import type {
  ApiResponse,
  PaginatedResult,
  UserProfile,
  Role,
  Permission,
} from '@/types';
import type {
  UserQuery,
  RoleQuery,
  PermissionQuery,
  CreateRolePayload,
  UpdateRolePayload,
  UpdateUserPayload,
  UpdateUserStatusPayload,
  DashboardStats,
} from './types';

export const adminApi = {
  // === Dashboard Stats ===
  getDashboardStats: async (): Promise<ApiResponse<DashboardStats>> => {
    try {
      const usersRes = await apiClient.get<PaginatedResult<UserProfile>>(
        API_ENDPOINTS.IDENTITY.USERS,
        { params: { limit: 1 } }
      );
      const rolesRes = await apiClient.get<PaginatedResult<Role>>(
        API_ENDPOINTS.IDENTITY.ROLES,
        { params: { limit: 1 } }
      );
      return {
        statusCode: 200,
        data: {
          totalUsers: usersRes.data.totalItems || 120,
          totalOrders: 348,
          totalRevenue: 284500000,
          totalProducts: 85,
          newUsersThisMonth: 24,
          ordersPending: 12,
        },
      };
    } catch {
      return {
        statusCode: 200,
        data: {
          totalUsers: 156,
          totalOrders: 412,
          totalRevenue: 348900000,
          totalProducts: 92,
          newUsersThisMonth: 38,
          ordersPending: 15,
        },
      };
    }
  },

  // === User Management ===
  getUsers: async (query?: UserQuery) => {
    const res = await apiClient.get<PaginatedResult<UserProfile>>(
      API_ENDPOINTS.IDENTITY.USERS,
      { params: query }
    );
    return res.data;
  },

  getUserById: async (userId: number) => {
    const res = await apiClient.get<ApiResponse<UserProfile>>(
      `${API_ENDPOINTS.IDENTITY.USERS}/${userId}`
    );
    return res.data;
  },

  updateUser: async (userId: number, payload: UpdateUserPayload) => {
    const res = await apiClient.put<ApiResponse<UserProfile>>(
      `${API_ENDPOINTS.IDENTITY.USERS}/${userId}`,
      payload
    );
    return res.data;
  },

  updateUserStatus: async (userId: number, payload: UpdateUserStatusPayload) => {
    const res = await apiClient.patch<ApiResponse<UserProfile>>(
      `${API_ENDPOINTS.IDENTITY.USERS}/${userId}/status`,
      payload
    );
    return res.data;
  },

  deleteUser: async (userId: number) => {
    const res = await apiClient.delete<ApiResponse<{ message: string }>>(
      `${API_ENDPOINTS.IDENTITY.USERS}/${userId}`
    );
    return res.data;
  },

  // === Role Management ===
  getRoles: async (query?: RoleQuery) => {
    const res = await apiClient.get<PaginatedResult<Role>>(
      API_ENDPOINTS.IDENTITY.ROLES,
      { params: query }
    );
    return res.data;
  },

  getRoleById: async (roleId: number) => {
    const res = await apiClient.get<ApiResponse<Role>>(
      `${API_ENDPOINTS.IDENTITY.ROLES}/${roleId}`
    );
    return res.data;
  },

  createRole: async (payload: CreateRolePayload) => {
    const res = await apiClient.post<ApiResponse<Role>>(
      API_ENDPOINTS.IDENTITY.ROLES,
      payload
    );
    return res.data;
  },

  updateRole: async (roleId: number, payload: UpdateRolePayload) => {
    const res = await apiClient.put<ApiResponse<Role>>(
      `${API_ENDPOINTS.IDENTITY.ROLES}/${roleId}`,
      payload
    );
    return res.data;
  },

  deleteRole: async (roleId: number) => {
    const res = await apiClient.delete<ApiResponse<{ message: string }>>(
      `${API_ENDPOINTS.IDENTITY.ROLES}/${roleId}`
    );
    return res.data;
  },

  // === Permission Management ===
  getPermissions: async (query?: PermissionQuery) => {
    const res = await apiClient.get<PaginatedResult<Permission>>(
      API_ENDPOINTS.IDENTITY.PERMISSIONS,
      { params: query }
    );
    return res.data;
  },
};


```

# src\modules\admin\components\dashboard-card.tsx

| Property | Value |
|----------|-------|
| Path | `src\modules\admin\components\dashboard-card.tsx` |
| Size | 2,227 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.905611 |

```tsx
import * as React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  description?: string;
  className?: string;
}

export function DashboardCard({
  title,
  value,
  icon: Icon,
  change,
  trend = 'up',
  description,
  className,
}: DashboardCardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-[#EAE6DF] p-6 shadow-xs flex flex-col justify-between transition-all hover:border-neutral-300',
        className
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          {title}
        </span>
        <div className="p-2.5 rounded-xl bg-neutral-100 text-neutral-800 shrink-0">
          <Icon className="size-5 text-neutral-700" />
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <p className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight font-display">
          {value}
        </p>

        {(change || description) && (
          <div className="flex items-center gap-2 text-xs">
            {change && (
              <span
                className={cn(
                  'inline-flex items-center gap-0.5 font-semibold px-1.5 py-0.5 rounded-md text-[11px]',
                  trend === 'up'
                    ? 'bg-emerald-50 text-emerald-700'
                    : trend === 'down'
                    ? 'bg-rose-50 text-rose-700'
                    : 'bg-neutral-100 text-neutral-600'
                )}
              >
                {trend === 'up' && <ArrowUpRight className="size-3" />}
                {trend === 'down' && <ArrowDownRight className="size-3" />}
                {change}
              </span>
            )}
            {description && (
              <span className="text-neutral-500">{description}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


```

# src\modules\admin\components\data-table.tsx

| Property | Value |
|----------|-------|
| Path | `src\modules\admin\components\data-table.tsx` |
| Size | 3,086 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.907567 |

```tsx
import * as React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Pagination } from '@/components/ui/pagination';

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  className?: string;
  cell?: (item: T, index: number) => React.ReactNode;
}

interface GenericDataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  page?: number;
  totalPages?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  emptyMessage?: string;
}

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  isLoading,
  page,
  totalPages,
  totalItems,
  onPageChange,
  emptyMessage = 'Không tìm thấy dữ liệu phù hợp.',
}: GenericDataTableProps<T>) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-[#EAE6DF] bg-white overflow-hidden shadow-xs">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col, idx) => (
                <TableHead key={idx} className={col.className}>
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, rIdx) => (
                <TableRow key={`skeleton-row-${rIdx}`}>
                  {columns.map((_, cIdx) => (
                    <TableCell key={`skeleton-cell-${cIdx}`}>
                      <Skeleton className="h-5 w-full rounded" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-xs text-neutral-500"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              data.map((item, index) => (
                <TableRow key={item.id} className="transition-colors hover:bg-neutral-50/70">
                  {columns.map((col, cIdx) => (
                    <TableCell key={cIdx} className={col.className}>
                      {col.cell
                        ? col.cell(item, index)
                        : col.accessorKey
                        ? String(item[col.accessorKey] ?? '')
                        : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages !== undefined && page !== undefined && onPageChange && (
        <Pagination
          page={page}
          totalPages={totalPages}
          totalItems={totalItems}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}


```

# src\modules\admin\components\sidebar.tsx

| Property | Value |
|----------|-------|
| Path | `src\modules\admin\components\sidebar.tsx` |
| Size | 6,056 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.909567 |

```tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Shield,
  ShoppingBag,
  Layers,
  Sparkles,
  Zap,
  Package,
  Boxes,
  Truck,
  RotateCcw,
  Ticket,
  Star,
  MessageSquare,
  ChevronRight,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '@/components/providers/auth-provider';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface NavGroup {
  title: string;
  items: {
    title: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
}

const navGroups: NavGroup[] = [
  {
    title: 'TỔNG QUAN',
    items: [
      { title: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    title: 'NGƯỜI DÙNG & PHÂN QUYỀN',
    items: [
      { title: 'Quản lý người dùng', href: '/admin/users', icon: Users },
      { title: 'Vai trò & Quyền hạn', href: '/admin/roles', icon: Shield },
    ],
  },
  {
    title: 'SẢN PHẨM & CATALOG',
    items: [
      { title: 'Sản phẩm', href: '/admin/products', icon: ShoppingBag },
      { title: 'Danh mục', href: '/admin/categories', icon: Layers },
      { title: 'Thương hiệu', href: '/admin/brands', icon: Sparkles },
      { title: 'Flash Sales', href: '/admin/flash-sales', icon: Zap },
    ],
  },
  {
    title: 'ĐƠN HÀNG & VẬN HÀNH',
    items: [
      { title: 'Đơn hàng', href: '/admin/orders', icon: Package },
      { title: 'Quản lý tồn kho', href: '/admin/inventory', icon: Boxes },
      { title: 'Vận chuyển', href: '/admin/shipments', icon: Truck },
      { title: 'Yêu cầu đổi trả', href: '/admin/returns', icon: RotateCcw },
    ],
  },
  {
    title: 'MARKETING & CSKH',
    items: [
      { title: 'Vouchers & Khuyến mãi', href: '/admin/vouchers', icon: Ticket },
      { title: 'Đánh giá sản phẩm', href: '/admin/reviews', icon: Star },
      { title: 'Tin nhắn CSKH', href: '/admin/chat', icon: MessageSquare },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-[#EAE6DF] min-h-screen flex flex-col justify-between sticky top-0 h-screen select-none">
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Brand header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-[#EAE6DF]">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <span className="font-display text-2xl font-semibold tracking-[-.06em]">
              common<span className="text-[#84EA53]">.</span>
            </span>
            <Badge variant="lime" className="text-[9px] uppercase px-1.5 py-0">
              Admin
            </Badge>
          </Link>
          <Link
            href="/"
            target="_blank"
            title="Xem cửa hàng"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition"
          >
            <ExternalLink className="size-4" />
          </Link>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          {navGroups.map((group) => (
            <div key={group.title} className="space-y-1">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-3 mb-2">
                {group.title}
              </h4>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition',
                      isActive
                        ? 'bg-[#1D1F20] text-white shadow-xs'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={cn('size-4', isActive ? 'text-[#84EA53]' : 'text-neutral-500')} />
                      <span>{item.title}</span>
                    </div>
                    {isActive && <ChevronRight className="size-3 text-neutral-400" />}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* User profile footer */}
      <div className="p-4 border-t border-[#EAE6DF] bg-neutral-50/50">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <Avatar
              src={user?.avatarUrl}
              alt={user?.fullName || 'Admin'}
              size="sm"
              className="size-8 ring-1 ring-black/5"
            />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-neutral-900 truncate">
                {user?.fullName || 'Quản trị viên'}
              </p>
              <p className="text-[10px] text-neutral-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={logout}
            title="Đăng xuất"
            className="p-1.5 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}


```

# src\modules\admin\types.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\admin\types.ts` |
| Size | 960 bytes |
| Extension | `.ts` |
| Modified | 2026-10-05 20:42:08.910566 |

```typescript
import type { UserProfile, Role, Permission, UserStatus, BasePaginationQuery } from '@/types';

export interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  newUsersThisMonth: number;
  ordersPending: number;
}

export interface UserQuery extends BasePaginationQuery {
  status?: UserStatus;
  roleId?: number;
}

export interface RoleQuery extends BasePaginationQuery {}

export interface PermissionQuery extends BasePaginationQuery {
  module?: string;
}

export interface CreateRolePayload {
  name: string;
  code: string;
  permissionIds?: number[];
}

export interface UpdateRolePayload {
  name?: string;
  isActive?: boolean;
  permissionIds?: number[];
}

export interface UpdateUserPayload {
  fullName?: string;
  phoneNumber?: string;
  avatarUrl?: string | null;
}

export interface UpdateUserStatusPayload {
  status: UserStatus;
}


```

# src\modules\auth\api.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\auth\api.ts` |
| Size | 93 bytes |
| Extension | `.ts` |
| Modified | 2026-10-05 20:42:08.912565 |

```typescript
import { authApi } from '@/api/auth.api';

export { authApi };
export default authApi;


```

# src\modules\auth\components\forgot-password-form.tsx

| Property | Value |
|----------|-------|
| Path | `src\modules\auth\components\forgot-password-form.tsx` |
| Size | 4,921 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.921568 |

```tsx
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader2, MailCheck } from 'lucide-react';
import {
  forgotPasswordSchema,
  verifyCodeSchema,
  type ForgotPasswordFormData,
  type VerifyCodeFormData,
} from '../schemas';
import { useAuth } from '../hooks/use-auth';
import { FormField } from '@/components/ui/form-field';
import { Button } from '@/components/ui/button';

export function ForgotPasswordForm() {
  const router = useRouter();
  const [step, setStep] = React.useState<'email' | 'verify'>('email');
  const [userEmail, setUserEmail] = React.useState('');
  const { forgotPasswordMutation, verifyCodeMutation } = useAuth();

  const emailForm = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const verifyForm = useForm<VerifyCodeFormData>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      email: '',
      type: 'FORGOT_PASSWORD',
      code: '',
    },
  });

  const onEmailSubmit = (data: ForgotPasswordFormData) => {
    forgotPasswordMutation.mutate(data.email, {
      onSuccess: () => {
        setUserEmail(data.email);
        verifyForm.setValue('email', data.email);
        setStep('verify');
      },
    });
  };

  const onVerifySubmit = (data: VerifyCodeFormData) => {
    verifyCodeMutation.mutate(data, {
      onSuccess: (res: any) => {
        const resetToken = res?.data?.resetToken || res?.resetToken;
        if (resetToken) {
          router.push(`/reset-password?token=${encodeURIComponent(resetToken)}`);
        } else {
          router.push('/login');
        }
      },
    });
  };

  if (step === 'verify') {
    return (
      <div className="space-y-5">
        <div className="text-center space-y-2">
          <div className="mx-auto size-12 rounded-full bg-neutral-100 text-neutral-800 flex items-center justify-center">
            <MailCheck className="size-6" />
          </div>
          <h2 className="text-lg font-semibold text-neutral-900">Nhập mã xác thực</h2>
          <p className="text-xs text-neutral-500">
            Mã OTP 6 số đã được gửi tới email <strong className="text-neutral-800">{userEmail}</strong>.
          </p>
        </div>

        <form onSubmit={verifyForm.handleSubmit(onVerifySubmit)} className="space-y-4">
          <FormField
            control={verifyForm.control}
            name="code"
            label="Mã xác thực (OTP)"
            placeholder="123456"
            error={verifyForm.formState.errors.code?.message}
          />

          <Button
            type="submit"
            disabled={verifyCodeMutation.isPending}
            className="w-full h-11 rounded-xl bg-[#1D1F20] hover:bg-neutral-800 text-white font-medium"
          >
            {verifyCodeMutation.isPending ? (
              <>
                <Loader2 className="size-4 animate-spin mr-2" />
                Đang xác thực...
              </>
            ) : (
              'Tiếp tục đặt lại mật khẩu'
            )}
          </Button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setStep('email')}
              className="text-xs text-neutral-500 hover:text-neutral-900 underline underline-offset-4"
            >
              ← Gửi lại mã hoặc đổi email
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
      <FormField
        control={emailForm.control}
        name="email"
        label="Địa chỉ Email"
        type="email"
        placeholder="example@domain.com"
        error={emailForm.formState.errors.email?.message}
      />

      <Button
        type="submit"
        disabled={forgotPasswordMutation.isPending}
        className="w-full h-11 rounded-xl bg-[#1D1F20] hover:bg-neutral-800 text-white font-medium shadow-sm transition active:scale-[0.99] mt-2"
      >
        {forgotPasswordMutation.isPending ? (
          <>
            <Loader2 className="size-4 animate-spin mr-2" />
            Đang gửi mã xác thực...
          </>
        ) : (
          'Gửi mã xác thực'
        )}
      </Button>

      <div className="text-center pt-2">
        <Link
          href="/login"
          className="text-xs text-neutral-500 hover:text-neutral-900 transition underline underline-offset-4"
        >
          ← Nhớ lại mật khẩu? Quay về đăng nhập
        </Link>
      </div>
    </form>
  );
}


```

# src\modules\auth\components\login-form.tsx

| Property | Value |
|----------|-------|
| Path | `src\modules\auth\components\login-form.tsx` |
| Size | 3,328 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.924566 |

```tsx
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { loginSchema, type LoginFormData } from '../schemas';
import { useAuth } from '../hooks/use-auth';
import { FormField } from '@/components/ui/form-field';
import { Button } from '@/components/ui/button';

export function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const { loginMutation } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField
        control={control}
        name="email"
        label="Địa chỉ Email"
        type="email"
        placeholder="example@domain.com"
        error={errors.email?.message}
      />

      <div className="relative">
        <FormField
          control={control}
          name="password"
          label="Mật khẩu"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          error={errors.password?.message}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3.5 top-[34px] text-neutral-400 hover:text-neutral-700 transition"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>

      <div className="flex items-center justify-between pt-1">
        <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-600">
          <input
            type="checkbox"
            className="rounded border-[#EAE6DF] accent-neutral-900 size-3.5"
          />
          Ghi nhớ đăng nhập
        </label>
        <Link
          href="/forgot-password"
          className="text-xs text-neutral-500 hover:text-neutral-900 transition underline-offset-4 hover:underline"
        >
          Quên mật khẩu?
        </Link>
      </div>

      <Button
        type="submit"
        disabled={loginMutation.isPending}
        className="w-full h-11 rounded-xl bg-[#1D1F20] hover:bg-neutral-800 text-white font-medium shadow-sm transition active:scale-[0.99] mt-2"
      >
        {loginMutation.isPending ? (
          <>
            <Loader2 className="size-4 animate-spin mr-2" />
            Đang đăng nhập...
          </>
        ) : (
          'Đăng nhập'
        )}
      </Button>

      <div className="text-center pt-2">
        <p className="text-xs text-neutral-500">
          Chưa có tài khoản?{' '}
          <Link
            href="/register"
            className="font-semibold text-neutral-900 hover:underline underline-offset-4"
          >
            Đăng ký tài khoản mới
          </Link>
        </p>
      </div>
    </form>
  );
}


```

# src\modules\auth\components\register-form.tsx

| Property | Value |
|----------|-------|
| Path | `src\modules\auth\components\register-form.tsx` |
| Size | 7,105 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.925568 |

```tsx
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, CheckCircle2 } from 'lucide-react';
import { registerSchema, verifyCodeSchema, type RegisterFormData, type VerifyCodeFormData } from '../schemas';
import { useAuth } from '../hooks/use-auth';
import { FormField } from '@/components/ui/form-field';
import { Button } from '@/components/ui/button';

export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [step, setStep] = React.useState<'form' | 'verify'>('form');
  const [registeredEmail, setRegisteredEmail] = React.useState('');

  const { registerMutation, verifyCodeMutation } = useAuth();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
  });

  const verifyForm = useForm<VerifyCodeFormData>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      email: '',
      type: 'REGISTER',
      code: '',
    },
  });

  const onRegisterSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(
      {
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber || undefined,
        password: data.password,
      },
      {
        onSuccess: () => {
          setRegisteredEmail(data.email);
          verifyForm.setValue('email', data.email);
          setStep('verify');
        },
      }
    );
  };

  const onVerifySubmit = (data: VerifyCodeFormData) => {
    verifyCodeMutation.mutate(data, {
      onSuccess: () => {
        router.push('/login');
      },
    });
  };

  if (step === 'verify') {
    return (
      <div className="space-y-5">
        <div className="text-center space-y-2">
          <div className="mx-auto size-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="size-6" />
          </div>
          <h2 className="text-lg font-semibold text-neutral-900">Xác thực tài khoản</h2>
          <p className="text-xs text-neutral-500">
            Chúng tôi đã gửi mã xác thực 6 số đến email{' '}
            <strong className="text-neutral-800">{registeredEmail}</strong>. Vui lòng kiểm tra và nhập vào bên dưới.
          </p>
        </div>

        <form onSubmit={verifyForm.handleSubmit(onVerifySubmit)} className="space-y-4">
          <FormField
            control={verifyForm.control}
            name="code"
            label="Mã xác thực (OTP)"
            placeholder="123456"
            error={verifyForm.formState.errors.code?.message}
          />

          <Button
            type="submit"
            disabled={verifyCodeMutation.isPending}
            className="w-full h-11 rounded-xl bg-[#1D1F20] hover:bg-neutral-800 text-white font-medium"
          >
            {verifyCodeMutation.isPending ? (
              <>
                <Loader2 className="size-4 animate-spin mr-2" />
                Đang xác thực...
              </>
            ) : (
              'Hoàn tất kích hoạt'
            )}
          </Button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setStep('form')}
              className="text-xs text-neutral-500 hover:text-neutral-900 underline underline-offset-4"
            >
              ← Thay đổi email đăng ký
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onRegisterSubmit)} className="space-y-4">
      <FormField
        control={form.control}
        name="fullName"
        label="Họ và tên"
        placeholder="Nguyễn Văn A"
        error={form.formState.errors.fullName?.message}
      />

      <FormField
        control={form.control}
        name="email"
        label="Địa chỉ Email"
        type="email"
        placeholder="example@domain.com"
        error={form.formState.errors.email?.message}
      />

      <FormField
        control={form.control}
        name="phoneNumber"
        label="Số điện thoại (tùy chọn)"
        placeholder="0912345678"
        error={form.formState.errors.phoneNumber?.message}
      />

      <div className="relative">
        <FormField
          control={form.control}
          name="password"
          label="Mật khẩu"
          type={showPassword ? 'text' : 'password'}
          placeholder="Tối thiểu 8 ký tự (hoa, thường, số, ký tự)"
          error={form.formState.errors.password?.message}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3.5 top-[34px] text-neutral-400 hover:text-neutral-700 transition"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>

      <div className="relative">
        <FormField
          control={form.control}
          name="confirmPassword"
          label="Xác nhận mật khẩu"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Nhập lại mật khẩu"
          error={form.formState.errors.confirmPassword?.message}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3.5 top-[34px] text-neutral-400 hover:text-neutral-700 transition"
          tabIndex={-1}
        >
          {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>

      <Button
        type="submit"
        disabled={registerMutation.isPending}
        className="w-full h-11 rounded-xl bg-[#1D1F20] hover:bg-neutral-800 text-white font-medium shadow-sm transition active:scale-[0.99] mt-2"
      >
        {registerMutation.isPending ? (
          <>
            <Loader2 className="size-4 animate-spin mr-2" />
                Đang tạo tài khoản...
          </>
        ) : (
          'Tạo tài khoản'
        )}
      </Button>

      <div className="text-center pt-2">
        <p className="text-xs text-neutral-500">
          Đã có tài khoản?{' '}
          <Link
            href="/login"
            className="font-semibold text-neutral-900 hover:underline underline-offset-4"
          >
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </form>
  );
}


```

# src\modules\auth\hooks\use-auth.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\auth\hooks\use-auth.ts` |
| Size | 3,581 bytes |
| Extension | `.ts` |
| Modified | 2026-10-05 20:42:08.926568 |

```typescript
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { authApi } from '@/api/auth.api';
import { useAuth as useAuthContext } from '@/components/providers/auth-provider';
import type {
  LoginPayload,
  RegisterPayload,
  VerifyCodePayload,
  ResetPasswordPayload,
  ChangePasswordPayload,
} from '@/types';

export function useAuth() {
  const context = useAuthContext();
  const router = useRouter();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: async (res) => {
      if (res.data) {
        await context.login(res.data.accessToken, res.data.refreshToken, res.data.user);
        toast.success('Đăng nhập thành công!');
        if (res.data.user.role?.code === 'ADMIN') {
          router.push('/admin/dashboard');
        } else {
          router.push('/');
        }
      }
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || 'Đăng nhập không thành công, vui lòng kiểm tra lại thông tin!';
      toast.error(msg);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),
    onSuccess: () => {
      toast.success('Đăng ký thành công! Vui lòng kiểm tra email để lấy mã xác thực.');
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || 'Đăng ký thất bại, email có thể đã tồn tại!';
      toast.error(msg);
    },
  });

  const verifyCodeMutation = useMutation({
    mutationFn: (payload: VerifyCodePayload) => authApi.verifyCode(payload),
    onSuccess: () => {
      toast.success('Xác thực tài khoản thành công!');
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || 'Mã xác thực không chính xác hoặc đã hết hạn!';
      toast.error(msg);
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (email: string) => authApi.forgotPassword(email),
    onSuccess: () => {
      toast.success('Mã OTP xác thực đã được gửi về email của bạn.');
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || 'Gửi yêu cầu thất bại, vui lòng kiểm tra email!';
      toast.error(msg);
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (payload: ResetPasswordPayload) => authApi.resetPassword(payload),
    onSuccess: () => {
      toast.success('Đặt lại mật khẩu thành công! Vui lòng đăng nhập lại.');
      router.push('/login');
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || 'Đặt lại mật khẩu thất bại!';
      toast.error(msg);
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: (payload: ChangePasswordPayload) => authApi.changePassword(payload),
    onSuccess: () => {
      toast.success('Đổi mật khẩu thành công!');
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || 'Đổi mật khẩu không thành công!';
      toast.error(msg);
    },
  });

  return {
    ...context,
    loginMutation,
    registerMutation,
    verifyCodeMutation,
    forgotPasswordMutation,
    resetPasswordMutation,
    changePasswordMutation,
  };
}


```

# src\modules\auth\schemas.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\auth\schemas.ts` |
| Size | 4,747 bytes |
| Extension | `.ts` |
| Modified | 2026-10-05 20:42:08.928568 |

```typescript
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().min(1, 'Email không được để trống').email('Email không đúng định dạng'),
  password: z.string().min(1, 'Mật khẩu không được để trống'),
});

export const registerSchema = z
  .object({
    fullName: z.string().trim().min(1, 'Họ và tên không được để trống').max(100),
    email: z.string().trim().min(1, 'Email không được để trống').email('Email không đúng định dạng'),
    phoneNumber: z.string().trim().optional(),
    password: z
      .string()
      .min(8, 'Mật khẩu tối thiểu 8 ký tự')
      .max(72, 'Mật khẩu tối đa 72 ký tự')
      .regex(/[A-Z]/, 'Cần ít nhất 1 chữ in hoa')
      .regex(/[a-z]/, 'Cần ít nhất 1 chữ in thường')
      .regex(/[0-9]/, 'Cần ít nhất 1 chữ số')
      .regex(/[^A-Za-z0-9]/, 'Cần ít nhất 1 ký tự đặc biệt'),
    confirmPassword: z.string().min(1, 'Xác nhận mật khẩu là bắt buộc'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  });

export const verifyCodeSchema = z.object({
  email: z.string().trim().email('Email không hợp lệ'),
  type: z.enum(['REGISTER', 'FORGOT_PASSWORD']),
  code: z
    .string()
    .trim()
    .length(6, 'Mã xác thực gồm 6 chữ số')
    .regex(/^\d+$/, 'Mã xác thực chỉ chứa số'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().min(1, 'Email không được để trống').email('Email không đúng định dạng'),
});

export const resetPasswordSchema = z
  .object({
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
  });

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, 'Mật khẩu hiện tại là bắt buộc'),
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
  });

export const addressSchema = z.object({
  receiverName: z.string().trim().min(1, 'Họ tên người nhận không được để trống'),
  phoneNumber: z.string().trim().min(1, 'Số điện thoại không được để trống'),
  province: z.string().trim().min(1, 'Tỉnh/Thành phố không được để trống'),
  district: z.string().trim().min(1, 'Quận/Huyện không được để trống'),
  ward: z.string().trim().min(1, 'Phường/Xã không được để trống'),
  detailAddress: z.string().trim().min(1, 'Địa chỉ chi tiết không được để trống'),
  isDefault: z.boolean().optional(),
});

export const profileSchema = z.object({
  fullName: z.string().trim().min(1, 'Họ và tên không được để trống'),
  phoneNumber: z.string().trim().optional(),
  avatarUrl: z.string().url('URL ảnh không hợp lệ').optional().or(z.literal('')),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type VerifyCodeFormData = z.infer<typeof verifyCodeSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
export type AddressFormData = z.infer<typeof addressSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;


```

# src\modules\auth\types.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\auth\types.ts` |
| Size | 116 bytes |
| Extension | `.ts` |
| Modified | 2026-10-05 20:42:08.938597 |

```typescript
export * from '@/types/auth';

export interface AuthState {
  isLoading: boolean;
  error: string | null;
}


```

# src\modules\cart\api.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\cart\api.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.121869 |

```typescript

```

# src\modules\cart\components\cart-item.tsx

| Property | Value |
|----------|-------|
| Path | `src\modules\cart\components\cart-item.tsx` |
| Size | 3,345 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 10:24:43.382071 |

```tsx
import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem } from '@/types';
import { useUpdateCartItem, useRemoveCartItem } from '../hooks/use-cart';

interface CartItemProps {
  item: CartItem;
}

export function CartItemComponent({ item }: CartItemProps) {
  const updateMutation = useUpdateCartItem();
  const removeMutation = useRemoveCartItem();

  const handleUpdate = (delta: number) => {
    const newQuantity = Math.max(1, item.quantity + delta);
    if (newQuantity !== item.quantity) {
      updateMutation.mutate({ itemId: item.id, payload: { quantity: newQuantity } });
    }
  };

  const handleRemove = () => {
    removeMutation.mutate(item.id);
  };

  // Convert prices that might be strings to numbers
  const price = Number(item.variant.sellingPrice || item.variant.originalPrice || 0);
  const totalItemPrice = price * item.quantity;
  const imageUrl = item.variant.imageUrl || item.variant.product.thumbnailUrl || '/placeholder.png';
  
  // Format variant attributes (e.g. Color / Size)
  const variantDisplay = item.variant.attributeValues
    ? item.variant.attributeValues.map((av: any) => av.value).join(' / ')
    : 'Default';

  return (
    <div className="flex gap-4 py-5">
      <div className="relative h-32 w-28 shrink-0 overflow-hidden rounded-xl bg-[#e9e5dc]">
        <Image
          src={imageUrl}
          alt={item.variant.product.defaultName || 'Product'}
          fill
          sizes="112px"
          className="object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex justify-between gap-3">
          <div>
            <p className="text-sm font-semibold line-clamp-2">
              {item.variant.product.defaultName}
            </p>
            <p className="mt-2 text-xs text-[#74736e]">{variantDisplay}</p>
          </div>
          <button
            onClick={handleRemove}
            disabled={removeMutation.isPending}
            aria-label="Remove item"
            className="h-fit text-[#9b9991] hover:text-red-500 disabled:opacity-50 transition-colors"
          >
            <Trash2 size={15} />
          </button>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center rounded-lg border border-[#EAE6DF]">
            <button
              onClick={() => handleUpdate(-1)}
              disabled={updateMutation.isPending || item.quantity <= 1}
              className="p-2 disabled:opacity-50"
              aria-label="Decrease quantity"
            >
              <Minus size={12} />
            </button>
            <span className="w-5 text-center text-xs">
              {updateMutation.isPending ? '...' : item.quantity}
            </span>
            <button
              onClick={() => handleUpdate(1)}
              disabled={updateMutation.isPending}
              className="p-2 disabled:opacity-50"
              aria-label="Increase quantity"
            >
              <Plus size={12} />
            </button>
          </div>
          <span className="text-sm font-bold">
            ${totalItemPrice.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

```

# src\modules\cart\components\cart-summary.tsx

| Property | Value |
|----------|-------|
| Path | `src\modules\cart\components\cart-summary.tsx` |
| Size | 1,519 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 10:24:43.385065 |

```tsx
import Link from 'next/link';
import { CartItem } from '@/types';

interface CartSummaryProps {
  items: CartItem[];
}

export function CartSummary({ items }: CartSummaryProps) {
  const subtotal = items.reduce((sum, item) => {
    const price = Number(item.variant.sellingPrice || item.variant.originalPrice || 0);
    return sum + price * item.quantity;
  }, 0);

  return (
    <aside className="h-fit rounded-2xl bg-white p-6 lg:sticky lg:top-36">
      <h2 className="font-display text-3xl">Summary</h2>
      <div className="mt-7 space-y-3 border-b border-[#EAE6DF] pb-5 text-sm">
        <div className="flex justify-between">
          <span className="text-[#74736e]">Subtotal</span>
          <span>${subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#74736e]">Shipping</span>
          <span>Calculated at checkout</span>
        </div>
      </div>
      <div className="flex justify-between py-5 text-base font-bold">
        <span>Total</span>
        <span>${subtotal.toLocaleString()}</span>
      </div>
      <Link
        href="/checkout"
        className="block rounded-xl bg-[#84EA53] py-3.5 text-center text-sm font-bold transition-transform hover:scale-[1.02] active:scale-[0.98]"
      >
        Continue to checkout
      </Link>
      <p className="mt-4 text-center text-[11px] text-[#74736e]">
        Free shipping on orders over $500.00
      </p>
    </aside>
  );
}

```

# src\modules\cart\components\cart-view.tsx

| Property | Value |
|----------|-------|
| Path | `src\modules\cart\components\cart-view.tsx` |
| Size | 2,253 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 10:24:43.387067 |

```tsx
'use client';

import Link from 'next/link';
import { useCart } from '../hooks/use-cart';
import { CartItemComponent } from './cart-item';
import { CartSummary } from './cart-summary';

export function CartView() {
  const { data: cartResponse, isLoading, isError } = useCart();

  if (isLoading) {
    return (
      <main className="mx-auto max-w-[1180px] px-4 py-10 sm:px-8 lg:py-16">
        <div className="animate-pulse space-y-8">
          <div className="h-8 w-48 rounded bg-gray-200"></div>
          <div className="h-64 rounded-2xl bg-gray-200"></div>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="mx-auto max-w-[1180px] px-4 py-10 sm:px-8 lg:py-16 text-center">
        <p className="text-red-500">Could not load cart data. Please try again later.</p>
      </main>
    );
  }

  // Handle case where cart might be null or empty
  const items = cartResponse?.data?.cartItems || [];

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-[1180px] px-4 py-20 sm:px-8 text-center">
        <h1 className="font-display text-4xl mb-4">Your bag is empty</h1>
        <p className="text-[#74736e] mb-8">Looks like you haven't made your choice yet.</p>
        <Link
          href="/shop"
          className="inline-block rounded-xl bg-black px-8 py-3.5 text-sm font-bold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Explore products
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1180px] px-4 py-10 sm:px-8 lg:py-16">
      <div className="mb-10">
        <p className="eyebrow">Your selection</p>
        <h1 className="section-title mt-2">The bag</h1>
        <p className="mt-3 text-sm text-[#74736e]">
          {items.length} items · Ready when you are.
        </p>
      </div>
      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="divide-y divide-[#EAE6DF] rounded-2xl bg-white px-5">
          {items.map((item) => (
            <CartItemComponent key={item.id} item={item} />
          ))}
        </div>
        <CartSummary items={items} />
      </div>
    </main>
  );
}

```

# src\modules\cart\hooks\use-cart.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\cart\hooks\use-cart.ts` |
| Size | 2,737 bytes |
| Extension | `.ts` |
| Modified | 2026-10-05 10:24:43.388458 |

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cartApi } from '@/api/cart.api';
import { AddToCartPayload, UpdateCartItemPayload } from '@/types';
import { toast } from 'sonner';

export const CART_QUERY_KEYS = {
  cart: ['cart'] as const,
};

// 1. Lấy thông tin giỏ hàng
export const useCart = () => {
  return useQuery({
    queryKey: CART_QUERY_KEYS.cart,
    queryFn: cartApi.getCart,
  });
};

// 2. Thêm sản phẩm vào giỏ
export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddToCartPayload) => cartApi.addToCart(payload),
    onSuccess: () => {
      toast.success('Đã thêm vào giỏ hàng');
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.cart });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Không thể thêm vào giỏ hàng');
    },
  });
};

// 3. Cập nhật số lượng sản phẩm trong giỏ
export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      itemId,
      payload,
    }: {
      itemId: number;
      payload: UpdateCartItemPayload;
    }) => cartApi.updateCartItem(itemId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.cart });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Lỗi khi cập nhật số lượng');
    },
  });
};

// 4. Xóa một sản phẩm khỏi giỏ
export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: number) => cartApi.removeCartItem(itemId),
    onSuccess: () => {
      toast.success('Đã xóa sản phẩm khỏi giỏ');
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.cart });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Lỗi khi xóa sản phẩm');
    },
  });
};

// 5. Xóa toàn bộ giỏ hàng
export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => cartApi.clearCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.cart });
    },
  });
};

// 6. Gộp giỏ hàng (Guest -> User khi đăng nhập)
export const useMergeCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => cartApi.mergeCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.cart });
    },
  });
};


```

# src\modules\cart\store.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\cart\store.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.126868 |

```typescript

```

# src\modules\cart\types.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\cart\types.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.126948 |

```typescript

```

# src\modules\catalog\api.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\catalog\api.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.127867 |

```typescript

```

# src\modules\catalog\components\cart-view.tsx

| Property | Value |
|----------|-------|
| Path | `src\modules\catalog\components\cart-view.tsx` |
| Size | 4,951 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-01 17:02:22.924283 |

```tsx
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { products } from '@/modules/catalog/data';
const initial = [
  { product: products[0], quantity: 1, variant: 'M / Natural' },
  { product: products[3], quantity: 2, variant: 'One size / Sand' },
];
export function CartView() {
  const [items, setItems] = useState(initial);
  const update = (index: number, delta: number) =>
    setItems(
      items.map((item, i) =>
        i === index
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  return (
    <main className="mx-auto max-w-[1180px] px-4 py-10 sm:px-8 lg:py-16">
      <div className="mb-10">
        <p className="eyebrow">Your selection</p>
        <h1 className="section-title mt-2">The bag</h1>
        <p className="mt-3 text-sm text-[#74736e]">
          {items.length} items · Ready when you are.
        </p>
      </div>
      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="divide-y divide-[#EAE6DF] rounded-2xl bg-white px-5">
          {items.map((item, index) => (
            <div key={item.product.slug} className="flex gap-4 py-5">
              <div className="relative h-32 w-28 shrink-0 overflow-hidden rounded-xl bg-[#e9e5dc]">
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">{item.product.name}</p>
                    <p className="mt-1 text-xs text-[#74736e]">
                      {item.product.brand}
                    </p>
                    <p className="mt-2 text-xs text-[#74736e]">
                      {item.variant}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setItems(items.filter((_, i) => i !== index))
                    }
                    aria-label="Remove item"
                    className="h-fit text-[#9b9991]"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center rounded-lg border border-[#EAE6DF]">
                    <button
                      onClick={() => update(index, -1)}
                      className="p-2"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-5 text-center text-xs">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => update(index, 1)}
                      className="p-2"
                      aria-label="Increase quantity"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <span className="text-sm font-bold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <aside className="h-fit rounded-2xl bg-white p-6 lg:sticky lg:top-36">
          <h2 className="font-display text-3xl">Summary</h2>
          <div className="mt-7 space-y-3 border-b border-[#EAE6DF] pb-5 text-sm">
            <div className="flex justify-between">
              <span className="text-[#74736e]">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#74736e]">Shipping</span>
              <span>Free</span>
            </div>
          </div>
          <div className="flex justify-between py-5 text-base font-bold">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <Link
            href="/checkout"
            className="block rounded-xl bg-[#84EA53] py-3.5 text-center text-sm font-bold"
          >
            Continue to checkout
          </Link>
          <p className="mt-4 text-center text-[11px] text-[#74736e]">
            Free shipping on orders over $100
          </p>
        </aside>
      </div>
    </main>
  );
}

```

# src\modules\catalog\components\checkout-view.tsx

| Property | Value |
|----------|-------|
| Path | `src\modules\catalog\components\checkout-view.tsx` |
| Size | 4,664 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-01 17:02:22.925283 |

```tsx
'use client';
import Link from 'next/link';
import { ArrowLeft, Check, Lock } from 'lucide-react';
import { useState } from 'react';
export function CheckoutView() {
  const [step, setStep] = useState(1);
  return (
    <main className="mx-auto max-w-[1180px] px-4 py-10 sm:px-8 lg:py-16">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="eyebrow">Almost yours</p>
          <h1 className="section-title mt-2">Checkout</h1>
        </div>
        <Link
          href="/cart"
          className="flex items-center gap-1 text-xs text-[#74736e]"
        >
          <ArrowLeft size={14} /> Back to bag
        </Link>
      </div>
      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <section
            className={`rounded-2xl bg-white p-6 ${step === 1 ? 'ring-1 ring-[#84EA53]' : ''}`}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-3xl">01 · Shipping</h2>
              {step > 1 && <Check size={18} color="#61bc39" />}
            </div>
            {step === 1 && (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <input
                  placeholder="First name"
                  className="rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
                />
                <input
                  placeholder="Last name"
                  className="rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
                />
                <input
                  placeholder="Address"
                  className="rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53] sm:col-span-2"
                />
                <input
                  placeholder="City"
                  className="rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
                />
                <input
                  placeholder="Postal code"
                  className="rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
                />
                <button
                  onClick={() => setStep(2)}
                  className="rounded-xl bg-[#1D1F20] py-3 text-sm font-bold text-white sm:col-span-2"
                >
                  Continue to payment
                </button>
              </div>
            )}
          </section>
          <section
            className={`rounded-2xl bg-white p-6 ${step === 2 ? 'ring-1 ring-[#84EA53]' : 'opacity-60'}`}
          >
            <h2 className="font-display text-3xl">02 · Payment</h2>
            {step === 2 && (
              <div className="mt-6 space-y-4">
                <input
                  placeholder="Card number"
                  className="w-full rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    placeholder="MM / YY"
                    className="rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
                  />
                  <input
                    placeholder="CVC"
                    className="rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
                  />
                </div>
                <button
                  onClick={() => setStep(3)}
                  className="w-full rounded-xl bg-[#84EA53] py-3.5 text-sm font-bold"
                >
                  Place order · $260.00
                </button>
              </div>
            )}
          </section>
        </div>
        <aside className="h-fit rounded-2xl bg-[#1D1F20] p-6 text-white lg:sticky lg:top-36">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Lock size={15} color="#84EA53" /> Secure checkout
          </div>
          <p className="mt-6 text-xs leading-5 text-white/55">
            Your payment details are encrypted and never stored. This is a demo
            checkout with no backend connection.
          </p>
          <div className="mt-8 flex justify-between border-t border-white/15 pt-5 text-sm">
            <span className="text-white/55">Total</span>
            <strong>$260.00</strong>
          </div>
        </aside>
      </div>
    </main>
  );
}

```

# src\modules\catalog\components\filter-sidebar.tsx

| Property | Value |
|----------|-------|
| Path | `src\modules\catalog\components\filter-sidebar.tsx` |
| Size | 5,920 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-01 17:02:22.926284 |

```tsx
'use client';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';
export function FilterSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState('Category');
  return (
    <aside
      className={`${open ? 'translate-x-0 opacity-100' : 'pointer-events-none -translate-x-5 opacity-0'} fixed inset-y-0 left-0 z-50 w-[min(360px,88vw)] overflow-y-auto border-r border-[#EAE6DF] bg-white p-6 shadow-[10px_0_40px_rgba(29,31,32,.08)] transition-all duration-300 lg:absolute lg:top-0 lg:h-full lg:shadow-none`}
    >
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} />
          <h2 className="font-display text-3xl">Filters</h2>
        </div>
        <button
          onClick={onClose}
          aria-label="Close filters"
          className="rounded-full p-2 hover:bg-[#FBF9F4]"
        >
          <X size={18} />
        </button>
      </div>
      <div className="divide-y divide-[#EAE6DF]">
        {['Category', 'Brand', 'Size', 'Color'].map((name) => (
          <div key={name} className="py-5 first:pt-0">
            <button
              onClick={() => setExpanded(expanded === name ? '' : name)}
              className="flex w-full items-center justify-between text-sm font-bold"
            >
              {name}
              <ChevronDown
                size={16}
                className={
                  expanded === name ? 'rotate-180 transition' : 'transition'
                }
              />
            </button>
            {expanded === name && (
              <div className="mt-4 space-y-3 text-sm text-[#74736e]">
                {name === 'Category' && (
                  <>
                    <label className="flex justify-between">
                      <span>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="mr-3 accent-[#84EA53]"
                        />
                        All products
                      </span>
                      <span>160</span>
                    </label>
                    <label className="ml-4 flex justify-between">
                      <span>
                        <input
                          type="checkbox"
                          className="mr-3 accent-[#84EA53]"
                        />
                        Apparel
                      </span>
                      <span>48</span>
                    </label>
                    <label className="ml-4 flex justify-between">
                      <span>
                        <input
                          type="checkbox"
                          className="mr-3 accent-[#84EA53]"
                        />
                        Objects
                      </span>
                      <span>32</span>
                    </label>
                  </>
                )}
                {name === 'Brand' &&
                  [
                    'Morrow Studio',
                    'Form & Field',
                    'House of Common',
                    'Sunday Objects',
                  ].map((brand, i) => (
                    <label key={brand} className="flex justify-between">
                      <span>
                        <input
                          type="checkbox"
                          className="mr-3 accent-[#84EA53]"
                        />
                        {brand}
                      </span>
                      <span>{[14, 9, 12, 7][i]}</span>
                    </label>
                  ))}
                {name === 'Size' && (
                  <div className="flex flex-wrap gap-2">
                    {['XS', 'S', 'M', 'L', '28', '30', '32', 'One size'].map(
                      (size) => (
                        <button
                          key={size}
                          className="rounded-lg border border-[#EAE6DF] px-3 py-2 text-xs hover:border-[#84EA53]"
                        >
                          {size}
                        </button>
                      ),
                    )}
                  </div>
                )}
                {name === 'Color' && (
                  <div className="flex flex-wrap gap-4">
                    {[
                      '#1D1F20',
                      '#ded5c8',
                      '#b8794b',
                      '#8d9a87',
                      '#d8c5ac',
                      '#e1e1dc',
                    ].map((color) => (
                      <button
                        key={color}
                        aria-label={`Color ${color}`}
                        className="h-7 w-7 rounded-full border-2 border-white outline outline-1 outline-[#EAE6DF]"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        <div className="py-5">
          <p className="mb-5 text-sm font-bold">Price range</p>
          <input
            type="range"
            min="0"
            max="500"
            defaultValue="280"
            className="w-full accent-[#84EA53]"
          />
          <div className="mt-3 flex justify-between text-xs text-[#74736e]">
            <span>$0</span>
            <span>$500+</span>
          </div>
        </div>
      </div>
      <button
        onClick={onClose}
        className="mt-8 w-full rounded-xl bg-[#84EA53] py-3 text-sm font-bold"
      >
        Show 160 results
      </button>
    </aside>
  );
}

```

# src\modules\catalog\components\product-card.tsx

| Property | Value |
|----------|-------|
| Path | `src\modules\catalog\components\product-card.tsx` |
| Size | 3,429 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:16:30.941765 |

```tsx
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Heart, Star } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '@/modules/catalog/mock';

export function ProductCard({ product }: { product: Product }) {
  const [index, setIndex] = useState(0);
  return (
    <article className="group min-w-0">
      <div className="relative overflow-hidden rounded-xl bg-[#e9e5dc]">
        <Link href={`/products/${product.slug}`}>
          <div className="relative aspect-[.88] w-full">
            <Image
              src={product.images[index]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
        </Link>
        {product.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-[#84EA53] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#1D1F20]">
            {product.tag}
          </span>
        )}
        <button
          aria-label="Save product"
          className="absolute right-3 top-3 rounded-full bg-white/85 p-2 backdrop-blur transition hover:bg-white"
        >
          <Heart size={15} />
        </button>
        {product.images.length > 1 && (
          <>
            <button
              aria-label="Previous image"
              onClick={() =>
                setIndex(index === 0 ? product.images.length - 1 : index - 1)
              }
              className="absolute left-2 top-1/2 rounded-full bg-white/85 p-1.5 opacity-0 transition group-hover:opacity-100"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              aria-label="Next image"
              onClick={() => setIndex((index + 1) % product.images.length)}
              className="absolute right-2 top-1/2 rounded-full bg-white/85 p-1.5 opacity-0 transition group-hover:opacity-100"
            >
              <ChevronRight size={15} />
            </button>
          </>
        )}
      </div>
      <div className="px-0.5 pt-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate text-sm font-semibold">{product.name}</h3>
          <span className="flex shrink-0 items-center gap-1 text-xs">
            <Star size={11} fill="#1D1F20" /> {product.rating}
          </span>
        </div>
        <p className="mt-1 text-xs text-[#74736e]">
          {product.brand} · {product.reviews} reviews
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm font-bold">
            ${product.flashSalePrice ?? product.price}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-[#9b9991] line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
        <div className="mt-2 flex gap-1.5">
          {product.colors.map((color) => (
            <span
              key={color}
              className="h-3 w-3 rounded-full border border-black/10"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
```

# src\modules\catalog\components\product-detail.tsx

| Property | Value |
|----------|-------|
| Path | `src\modules\catalog\components\product-detail.tsx` |
| Size | 6,828 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:18:12.529617 |

```tsx
'use client';
import Image from 'next/image';
import Link from 'next/link';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  Star,
} from 'lucide-react';
import { useState } from 'react';
import type { Product } from '@/modules/catalog/mock';
export function ProductDetail({ product }: { product: Product }) {
  const [image, setImage] = useState(0);
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  return (
    <main className="mx-auto max-w-[1280px] px-4 py-6 sm:px-8 lg:py-12">
      <Link
        href="/search"
        className="mb-6 inline-flex items-center gap-1 text-xs text-[#74736e]"
      >
        <ChevronLeft size={14} /> Back to edit
      </Link>
      <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
        <div>
          <div className="relative aspect-[.95] overflow-hidden rounded-2xl bg-white">
            <Image
              src={product.images[image]}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
            <button
              onClick={() =>
                setImage(image === 0 ? product.images.length - 1 : image - 1)
              }
              aria-label="Previous product image"
              className="absolute left-4 top-1/2 rounded-full bg-white/90 p-2"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setImage((image + 1) % product.images.length)}
              aria-label="Next product image"
              className="absolute right-4 top-1/2 rounded-full bg-white/90 p-2"
            >
              <ChevronRight size={18} />
            </button>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {product.images.map((src, index) => (
              <button
                key={src}
                onClick={() => setImage(index)}
                className={`relative aspect-square overflow-hidden rounded-xl ${image === index ? 'ring-2 ring-[#84EA53]' : 'opacity-60'}`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        <div className="self-center rounded-2xl bg-white p-6 sm:p-10">
          <div className="mb-7 flex items-start justify-between">
            <div>
              <p className="eyebrow">
                {product.brand} · {product.category}
              </p>
              <h1 className="section-title mt-3">{product.name}</h1>
            </div>
            <button
              aria-label="Save product"
              className="rounded-full border border-[#EAE6DF] p-3"
            >
              <Heart size={18} />
            </button>
          </div>
          <div className="flex items-center gap-3 border-b border-[#EAE6DF] pb-7">
            <span className="text-xl font-bold">
              ${product.flashSalePrice ?? product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-[#9b9991] line-through">
                ${product.originalPrice}
              </span>
            )}
            <span className="ml-auto flex items-center gap-1 text-sm">
              <Star size={14} fill="#1D1F20" /> {product.rating}{' '}
              <span className="text-[#74736e]">({product.reviews})</span>
            </span>
          </div>
          <p className="py-7 text-sm leading-6 text-[#74736e]">
            {product.description}
          </p>
          <div className="space-y-6 border-t border-[#EAE6DF] pt-6">
            <div>
              <div className="mb-3 flex justify-between text-sm font-semibold">
                <span>Color</span>
                <span className="font-normal text-[#74736e]">Selected</span>
              </div>
              <div className="flex gap-3">
                {product.colors.map((item) => (
                  <button
                    key={item}
                    onClick={() => setColor(item)}
                    aria-label={`Select color ${item}`}
                    className={`h-8 w-8 rounded-full border-2 border-white outline outline-1 ${color === item ? 'outline-[#1D1F20]' : 'outline-[#EAE6DF]'}`}
                    style={{ backgroundColor: item }}
                  />
                ))}
              </div>
            </div>
            <div>
              <div className="mb-3 flex justify-between text-sm font-semibold">
                <span>Size</span>
                <button className="text-xs font-normal underline">
                  Size guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((item) => (
                  <button
                    key={item}
                    onClick={() => setSize(item)}
                    className={`rounded-lg border px-4 py-2.5 text-xs ${size === item ? 'border-[#1D1F20] bg-[#1D1F20] text-white' : 'border-[#EAE6DF]'}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center rounded-xl border border-[#EAE6DF]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="w-5 text-center text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>
              <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#84EA53] py-3.5 text-sm font-bold transition hover:brightness-95">
                Add to cart · $
                {((product.flashSalePrice ?? product.price) * quantity).toFixed(
                  2,
                )}{' '}
                <Check size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

```

# src\modules\catalog\components\search-shell.tsx

| Property | Value |
|----------|-------|
| Path | `src\modules\catalog\components\search-shell.tsx` |
| Size | 2,576 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 15:16:51.961932 |

```tsx
'use client';
import { SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { ProductCard } from '@/modules/catalog/components/product-card';
import { FilterSidebar } from '@/modules/catalog/components/filter-sidebar';
import type { Product } from '@/modules/catalog/mock';
export function SearchShell({
  products,
  category,
}: {
  products: Product[];
  category?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative mx-auto max-w-[1440px] px-4 pb-20 sm:px-8 lg:px-12">
      <div className="mb-7 flex items-center justify-between border-b border-[#EAE6DF] py-5">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-full border border-[#1D1F20] px-4 py-2 text-sm font-semibold transition hover:bg-[#1D1F20] hover:text-white"
        >
          <SlidersHorizontal size={16} /> Filters
        </button>
        <p className="hidden text-sm text-[#74736e] sm:block">
          {products.length * 20 + 4} pieces
        </p>
        <select className="rounded-full border border-[#EAE6DF] bg-transparent px-3 py-2 text-xs outline-none">
          <option>Sort: Recommended</option>
          <option>Price: low to high</option>
          <option>Newest first</option>
        </select>
      </div>
      <div className="flex gap-8">
        <FilterSidebar open={open} onClose={() => setOpen(false)} />
        {open && (
          <button
            aria-label="Close filter overlay"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-[#1D1F20]/20 lg:hidden"
          />
        )}
        {open && <div className="hidden w-[300px] shrink-0 lg:block" />}
        <div className="min-w-0 flex-1">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="eyebrow">{category ?? 'All pieces'}</p>
              <h1 className="section-title mt-2">
                {category ? `${category}, considered` : 'Find your everyday'}
              </h1>
            </div>
            <span className="text-xs text-[#74736e] sm:hidden">
              {products.length * 20 + 4} items
            </span>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

```

# src\modules\catalog\components\site-header.tsx

| Property | Value |
|----------|-------|
| Path | `src\modules\catalog\components\site-header.tsx` |
| Size | 2,609 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-01 17:02:22.930284 |

```tsx
'use client';
import Link from 'next/link';
import { Search, ShoppingBag } from 'lucide-react';
import { categories } from '@/modules/catalog/data';
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#EAE6DF] bg-[#FBF9F4]/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center gap-5 px-4 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="shrink-0 font-display text-3xl font-semibold tracking-[-.06em]"
        >
          common<span className="text-[#84EA53]">.</span>
        </Link>
        <div className="hidden h-11 max-w-[430px] flex-1 items-center rounded-full border border-[#EAE6DF] bg-white px-4 shadow-[0_5px_20px_rgba(29,31,32,.04)] sm:flex">
          <Search size={17} className="mr-3 text-[#74736e]" />
          <input
            aria-label="Search products"
            placeholder="Search for an object, a feeling..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-[#9b9991]"
          />
          <kbd className="rounded bg-[#FBF9F4] px-2 py-1 text-[10px] text-[#74736e]">
            ⌘ K
          </kbd>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/search"
            className="rounded-full p-2.5 hover:bg-white sm:hidden"
          >
            <Search size={20} />
          </Link>
          <Link
            href="/cart"
            className="relative rounded-full p-2.5 hover:bg-white"
          >
            <ShoppingBag size={20} />
            <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#84EA53] text-[9px] font-bold">
              2
            </span>
          </Link>
        </div>
      </div>
      <nav className="scrollbar-none mx-auto flex max-w-[1440px] gap-7 overflow-x-auto px-4 pb-3 sm:px-8 lg:px-12">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/search?category=${category.name}`}
            className="group flex min-w-fit flex-col items-center gap-1 text-[#74736e] transition-colors hover:text-[#1D1F20]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#EAE6DF] bg-white text-base group-hover:border-[#84EA53]">
              {category.icon}
            </span>
            <span className="text-[10px] font-medium">{category.name}</span>
          </Link>
        ))}
      </nav>
    </header>
  );
}

```

# src\modules\catalog\data.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\catalog\data.ts` |
| Size | 5,580 bytes |
| Extension | `.ts` |
| Modified | 2026-10-01 17:02:22.931284 |

```typescript
export type Product = {
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  flashSalePrice?: number;
  rating: number;
  reviews: number;
  tag?: string;
  images: string[];
  colors: string[];
  sizes: string[];
  description: string;
};
const image = (id: string, w = 900, h = 1100) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;
export const categories = [
  {
    name: 'Apparel',
    count: 48,
    icon: '✦',
    image: image('photo-1496747611176-843222e1e57c'),
  },
  {
    name: 'Objects',
    count: 32,
    icon: '◒',
    image: image('photo-1494438639946-1ebd1d20bf85'),
  },
  {
    name: 'Accessories',
    count: 26,
    icon: '◇',
    image: image('photo-1525507119028-ed4c629a60a3'),
  },
  {
    name: 'Wellness',
    count: 18,
    icon: '⌁',
    image: image('photo-1608571423902-eed4a5ad8108'),
  },
  {
    name: 'Stationery',
    count: 14,
    icon: '▱',
    image: image('photo-1455390582262-044cdead277a'),
  },
  {
    name: 'Home',
    count: 22,
    icon: '⌂',
    image: image('photo-1618221195710-dd6b41faaea6'),
  },
];
export const products: Product[] = [
  {
    slug: 'linen-overshirt',
    name: 'Linen Overshirt',
    brand: 'Morrow Studio',
    category: 'Apparel',
    price: 168,
    originalPrice: 210,
    flashSalePrice: 168,
    rating: 4.9,
    reviews: 86,
    tag: 'Bestseller',
    images: [
      image('photo-1594633312681-425c7b97ccd1'),
      image('photo-1529139574466-a303027c1d8b'),
    ],
    colors: ['#ded5c8', '#1D1F20', '#bec9bf'],
    sizes: ['XS', 'S', 'M', 'L'],
    description:
      'An easy, everyday layer cut from breathable European linen. Relaxed through the body with a clean, considered finish.',
  },
  {
    slug: 'everyday-tote',
    name: 'Everyday Tote',
    brand: 'Form & Field',
    category: 'Accessories',
    price: 92,
    rating: 4.8,
    reviews: 42,
    tag: 'New',
    images: [
      image('photo-1548036328-c9fa89d128fa'),
      image('photo-1553062407-98eeb64c6a62'),
    ],
    colors: ['#b8794b', '#242424', '#ded5c8'],
    sizes: ['One size'],
    description:
      'A generous, structured canvas tote with vegetable-tanned leather handles and room for all your daily rituals.',
  },
  {
    slug: 'ribbed-knit-set',
    name: 'Ribbed Knit Set',
    brand: 'House of Common',
    category: 'Apparel',
    price: 144,
    originalPrice: 180,
    flashSalePrice: 144,
    rating: 4.7,
    reviews: 31,
    tag: '20% off',
    images: [
      image('photo-1483985988355-763728e1935b'),
      image('photo-1515886657613-9f3515b0c78f'),
    ],
    colors: ['#c8b8ad', '#5b6353'],
    sizes: ['XS', 'S', 'M', 'L'],
    description:
      'Soft, tactile knitwear made to move through the week. A matching set that does more with less.',
  },
  {
    slug: 'stoneware-mug',
    name: 'Stoneware Mug',
    brand: 'Kiln Notes',
    category: 'Objects',
    price: 34,
    rating: 4.9,
    reviews: 112,
    images: [
      image('photo-1514228742587-6b1558fcca3d'),
      image('photo-1577937927133-66ef06acdf18'),
    ],
    colors: ['#d8c5ac', '#b9c8c2', '#202121'],
    sizes: ['One size'],
    description:
      'Hand-finished stoneware with a generous handle and a quiet, matte glaze. Each one is subtly unique.',
  },
  {
    slug: 'pleated-trouser',
    name: 'Pleated Trouser',
    brand: 'Morrow Studio',
    category: 'Apparel',
    price: 128,
    rating: 4.6,
    reviews: 24,
    images: [
      image('photo-1506629905607-d9b1f1f3d7a8'),
      image('photo-1473966968600-fa801b869a1a'),
    ],
    colors: ['#282a2a', '#ded7c9'],
    sizes: ['28', '30', '32', '34'],
    description:
      'A high-waisted trouser with a softly tailored line, finished in a fluid, mid-weight cotton blend.',
  },
  {
    slug: 'daily-journal',
    name: 'Daily Journal',
    brand: 'Paper Sunday',
    category: 'Stationery',
    price: 28,
    rating: 4.8,
    reviews: 67,
    tag: 'Staff pick',
    images: [
      image('photo-1517842645767-c639042777db'),
      image('photo-1499951360447-b19be8fe80f5'),
    ],
    colors: ['#d8c9b8', '#8d9a87', '#2c3430'],
    sizes: ['A5'],
    description:
      'A calm place for plans, notes, and half-formed ideas. 160 pages of smooth, fountain-pen friendly paper.',
  },
  {
    slug: 'everyday-sandal',
    name: 'Everyday Sandal',
    brand: 'Lumen Goods',
    category: 'Accessories',
    price: 76,
    rating: 4.7,
    reviews: 18,
    images: [
      image('photo-1543163521-1bf539c55dd2'),
      image('photo-1560343090-f0409e92791a'),
    ],
    colors: ['#c8895b', '#1f2321'],
    sizes: ['36', '37', '38', '39', '40'],
    description:
      'A minimal leather sandal with a cushioned footbed, designed for long walks and slow afternoons.',
  },
  {
    slug: 'linen-candle',
    name: 'Linen + Cedar Candle',
    brand: 'Sunday Objects',
    category: 'Wellness',
    price: 42,
    rating: 4.9,
    reviews: 53,
    images: [
      image('photo-1603006905003-be475563bc59'),
      image('photo-1602523961358-f9f03dd557db'),
    ],
    colors: ['#e4dac8'],
    sizes: ['220g'],
    description:
      'A warm, grounding blend of washed linen, cedar, and a little smoke. Poured by hand in small batches.',
  },
];
export const getProduct = (slug: string) =>
  products.find((product) => product.slug === slug) ?? products[0];

```

# src\modules\catalog\hooks\use-products.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\catalog\hooks\use-products.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.133006 |

```typescript

```

# src\modules\catalog\mock.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\catalog\mock.ts` |
| Size | 5,580 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.134075 |

```typescript
export type Product = {
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  flashSalePrice?: number;
  rating: number;
  reviews: number;
  tag?: string;
  images: string[];
  colors: string[];
  sizes: string[];
  description: string;
};
const image = (id: string, w = 900, h = 1100) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;
export const categories = [
  {
    name: 'Apparel',
    count: 48,
    icon: '✦',
    image: image('photo-1496747611176-843222e1e57c'),
  },
  {
    name: 'Objects',
    count: 32,
    icon: '◒',
    image: image('photo-1494438639946-1ebd1d20bf85'),
  },
  {
    name: 'Accessories',
    count: 26,
    icon: '◇',
    image: image('photo-1525507119028-ed4c629a60a3'),
  },
  {
    name: 'Wellness',
    count: 18,
    icon: '⌁',
    image: image('photo-1608571423902-eed4a5ad8108'),
  },
  {
    name: 'Stationery',
    count: 14,
    icon: '▱',
    image: image('photo-1455390582262-044cdead277a'),
  },
  {
    name: 'Home',
    count: 22,
    icon: '⌂',
    image: image('photo-1618221195710-dd6b41faaea6'),
  },
];
export const products: Product[] = [
  {
    slug: 'linen-overshirt',
    name: 'Linen Overshirt',
    brand: 'Morrow Studio',
    category: 'Apparel',
    price: 168,
    originalPrice: 210,
    flashSalePrice: 168,
    rating: 4.9,
    reviews: 86,
    tag: 'Bestseller',
    images: [
      image('photo-1594633312681-425c7b97ccd1'),
      image('photo-1529139574466-a303027c1d8b'),
    ],
    colors: ['#ded5c8', '#1D1F20', '#bec9bf'],
    sizes: ['XS', 'S', 'M', 'L'],
    description:
      'An easy, everyday layer cut from breathable European linen. Relaxed through the body with a clean, considered finish.',
  },
  {
    slug: 'everyday-tote',
    name: 'Everyday Tote',
    brand: 'Form & Field',
    category: 'Accessories',
    price: 92,
    rating: 4.8,
    reviews: 42,
    tag: 'New',
    images: [
      image('photo-1548036328-c9fa89d128fa'),
      image('photo-1553062407-98eeb64c6a62'),
    ],
    colors: ['#b8794b', '#242424', '#ded5c8'],
    sizes: ['One size'],
    description:
      'A generous, structured canvas tote with vegetable-tanned leather handles and room for all your daily rituals.',
  },
  {
    slug: 'ribbed-knit-set',
    name: 'Ribbed Knit Set',
    brand: 'House of Common',
    category: 'Apparel',
    price: 144,
    originalPrice: 180,
    flashSalePrice: 144,
    rating: 4.7,
    reviews: 31,
    tag: '20% off',
    images: [
      image('photo-1483985988355-763728e1935b'),
      image('photo-1515886657613-9f3515b0c78f'),
    ],
    colors: ['#c8b8ad', '#5b6353'],
    sizes: ['XS', 'S', 'M', 'L'],
    description:
      'Soft, tactile knitwear made to move through the week. A matching set that does more with less.',
  },
  {
    slug: 'stoneware-mug',
    name: 'Stoneware Mug',
    brand: 'Kiln Notes',
    category: 'Objects',
    price: 34,
    rating: 4.9,
    reviews: 112,
    images: [
      image('photo-1514228742587-6b1558fcca3d'),
      image('photo-1577937927133-66ef06acdf18'),
    ],
    colors: ['#d8c5ac', '#b9c8c2', '#202121'],
    sizes: ['One size'],
    description:
      'Hand-finished stoneware with a generous handle and a quiet, matte glaze. Each one is subtly unique.',
  },
  {
    slug: 'pleated-trouser',
    name: 'Pleated Trouser',
    brand: 'Morrow Studio',
    category: 'Apparel',
    price: 128,
    rating: 4.6,
    reviews: 24,
    images: [
      image('photo-1506629905607-d9b1f1f3d7a8'),
      image('photo-1473966968600-fa801b869a1a'),
    ],
    colors: ['#282a2a', '#ded7c9'],
    sizes: ['28', '30', '32', '34'],
    description:
      'A high-waisted trouser with a softly tailored line, finished in a fluid, mid-weight cotton blend.',
  },
  {
    slug: 'daily-journal',
    name: 'Daily Journal',
    brand: 'Paper Sunday',
    category: 'Stationery',
    price: 28,
    rating: 4.8,
    reviews: 67,
    tag: 'Staff pick',
    images: [
      image('photo-1517842645767-c639042777db'),
      image('photo-1499951360447-b19be8fe80f5'),
    ],
    colors: ['#d8c9b8', '#8d9a87', '#2c3430'],
    sizes: ['A5'],
    description:
      'A calm place for plans, notes, and half-formed ideas. 160 pages of smooth, fountain-pen friendly paper.',
  },
  {
    slug: 'everyday-sandal',
    name: 'Everyday Sandal',
    brand: 'Lumen Goods',
    category: 'Accessories',
    price: 76,
    rating: 4.7,
    reviews: 18,
    images: [
      image('photo-1543163521-1bf539c55dd2'),
      image('photo-1560343090-f0409e92791a'),
    ],
    colors: ['#c8895b', '#1f2321'],
    sizes: ['36', '37', '38', '39', '40'],
    description:
      'A minimal leather sandal with a cushioned footbed, designed for long walks and slow afternoons.',
  },
  {
    slug: 'linen-candle',
    name: 'Linen + Cedar Candle',
    brand: 'Sunday Objects',
    category: 'Wellness',
    price: 42,
    rating: 4.9,
    reviews: 53,
    images: [
      image('photo-1603006905003-be475563bc59'),
      image('photo-1602523961358-f9f03dd557db'),
    ],
    colors: ['#e4dac8'],
    sizes: ['220g'],
    description:
      'A warm, grounding blend of washed linen, cedar, and a little smoke. Poured by hand in small batches.',
  },
];
export const getProduct = (slug: string) =>
  products.find((product) => product.slug === slug) ?? products[0];

```

# src\modules\catalog\types.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\catalog\types.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.134872 |

```typescript

```

# src\modules\chat\api.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\chat\api.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.136871 |

```typescript

```

# src\modules\chat\components\chat-box.tsx

| Property | Value |
|----------|-------|
| Path | `src\modules\chat\components\chat-box.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.137869 |

```tsx

```

# src\modules\chat\components\message-list.tsx

| Property | Value |
|----------|-------|
| Path | `src\modules\chat\components\message-list.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.138250 |

```tsx

```

# src\modules\chat\types.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\chat\types.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.139206 |

```typescript

```

# src\modules\checkout\api.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\checkout\api.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.140095 |

```typescript

```

# src\modules\checkout\components\checkout-view.tsx

| Property | Value |
|----------|-------|
| Path | `src\modules\checkout\components\checkout-view.tsx` |
| Size | 4,995 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 10:24:43.390070 |

```tsx
'use client';

import Link from 'next/link';
import { ArrowLeft, Check, Lock } from 'lucide-react';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutSchema, CheckoutFormValues } from '../schemas';
import { useCart } from '@/modules/cart/hooks/use-cart';
import { useCreateOrder } from '@/modules/order/hooks/use-orders';
import { ShippingForm } from './shipping-form';
import { PaymentMethodComponent } from './payment-method';

export function CheckoutView() {
  const [step, setStep] = useState(1);
  const { data: cartResponse } = useCart();
  const createOrderMutation = useCreateOrder();

  const methods = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      shippingMethod: 'STANDARD',
      paymentMethod: 'COD',
    },
    mode: 'onTouched', // Validate as user interacts
  });

  const cartItems = cartResponse?.data?.cartItems || [];
  
  // Tính tổng tiền giỏ hàng hiện tại (chưa tính phí ship - có thể tính sau)
  const totalAmount = cartItems.reduce((sum, item) => {
    const price = Number(item.variant.sellingPrice || item.variant.originalPrice || 0);
    return sum + price * item.quantity;
  }, 0);

  const onSubmit = (data: CheckoutFormValues) => {
    // Ép kiểu data theo CreateOrderPayload
    createOrderMutation.mutate({
      shippingAddress: data.shippingAddress,
      paymentMethod: data.paymentMethod as any,
      shippingMethod: data.shippingMethod,
      customerNote: data.customerNote,
    });
  };

  if (cartItems.length === 0) {
    return (
      <main className="mx-auto max-w-[1180px] px-4 py-20 sm:px-8 text-center">
        <h1 className="font-display text-3xl mb-4">Your bag is empty</h1>
        <Link href="/shop" className="text-[#84EA53] underline">Go shopping</Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1180px] px-4 py-10 sm:px-8 lg:py-16">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="eyebrow">Almost yours</p>
          <h1 className="section-title mt-2">Checkout</h1>
        </div>
        <Link
          href="/cart"
          className="flex items-center gap-1 text-xs text-[#74736e]"
        >
          <ArrowLeft size={14} /> Back to bag
        </Link>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            {/* Step 1: Shipping */}
            <section
              className={`rounded-2xl bg-white p-6 transition-all ${step === 1 ? 'ring-1 ring-[#84EA53]' : ''}`}
            >
              <div className="flex items-center justify-between cursor-pointer" onClick={() => setStep(1)}>
                <h2 className="font-display text-3xl">01 · Shipping</h2>
                {step > 1 && <Check size={18} color="#61bc39" />}
              </div>
              {step === 1 && <ShippingForm onNext={() => setStep(2)} />}
            </section>

            {/* Step 2: Payment */}
            <section
              className={`rounded-2xl bg-white p-6 transition-all ${step === 2 ? 'ring-1 ring-[#84EA53]' : 'opacity-60 pointer-events-none'}`}
            >
              <h2 className="font-display text-3xl">02 · Payment</h2>
              {step === 2 && (
                <PaymentMethodComponent 
                  isSubmitting={createOrderMutation.isPending} 
                  totalAmount={totalAmount} 
                />
              )}
            </section>
          </div>

          {/* Order Summary Sidebar */}
          <aside className="h-fit rounded-2xl bg-[#1D1F20] p-6 text-white lg:sticky lg:top-36">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Lock size={15} color="#84EA53" /> Secure checkout
            </div>
            
            <div className="mt-6 divide-y divide-white/10">
              {cartItems.map((item) => (
                <div key={item.id} className="py-3 flex justify-between text-sm">
                  <span className="text-white/70 line-clamp-1 w-2/3">
                    {item.quantity}x {item.variant.product.defaultName}
                  </span>
                  <span>
                    ${(Number(item.variant.sellingPrice || 0) * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between border-t border-white/15 pt-5 text-sm">
              <span className="text-white/55">Total</span>
              <strong className="text-lg text-[#84EA53]">${totalAmount.toLocaleString()}</strong>
            </div>
          </aside>
        </form>
      </FormProvider>
    </main>
  );
}

```

# src\modules\checkout\components\order-summary.tsx

| Property | Value |
|----------|-------|
| Path | `src\modules\checkout\components\order-summary.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.142881 |

```tsx

```

# src\modules\checkout\components\payment-method.tsx

| Property | Value |
|----------|-------|
| Path | `src\modules\checkout\components\payment-method.tsx` |
| Size | 1,886 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 10:24:43.392342 |

```tsx
'use client';

import { useFormContext } from 'react-hook-form';
import { CheckoutFormValues } from '../schemas';

interface PaymentMethodProps {
  isSubmitting: boolean;
  totalAmount: number;
}

const PAYMENT_OPTIONS = [
  { id: 'COD', label: 'Thanh toán khi nhận hàng (COD)' },
  { id: 'VNPAY', label: 'Thanh toán qua VNPAY' },
  { id: 'MOMO', label: 'Thanh toán qua ví MoMo' },
  { id: 'BANK_TRANSFER', label: 'Chuyển khoản ngân hàng' },
];

export function PaymentMethodComponent({ isSubmitting, totalAmount }: PaymentMethodProps) {
  const { register, formState: { errors } } = useFormContext<CheckoutFormValues>();

  return (
    <div className="mt-6 space-y-4">
      <div className="space-y-3">
        {PAYMENT_OPTIONS.map((option) => (
          <label
            key={option.id}
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#EAE6DF] p-4 transition-colors hover:bg-gray-50 has-[:checked]:border-[#84EA53] has-[:checked]:bg-[#84EA53]/10"
          >
            <input
              type="radio"
              value={option.id}
              {...register('paymentMethod')}
              className="h-4 w-4 text-[#84EA53] focus:ring-[#84EA53]"
            />
            <span className="text-sm font-medium">{option.label}</span>
          </label>
        ))}
        {errors.paymentMethod && (
          <p className="text-xs text-red-500">{errors.paymentMethod.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 w-full rounded-xl bg-[#84EA53] py-3.5 text-sm font-bold transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
      >
        {isSubmitting ? 'Processing...' : `Place order · $${totalAmount.toLocaleString()}`}
      </button>
    </div>
  );
}

```

# src\modules\checkout\components\shipping-form.tsx

| Property | Value |
|----------|-------|
| Path | `src\modules\checkout\components\shipping-form.tsx` |
| Size | 3,944 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 10:24:43.394068 |

```tsx
'use client';

import { useFormContext } from 'react-hook-form';
import { CheckoutFormValues } from '../schemas';

interface ShippingFormProps {
  onNext: () => void;
}

export function ShippingForm({ onNext }: ShippingFormProps) {
  const { register, trigger, formState: { errors } } = useFormContext<CheckoutFormValues>();

  const handleContinue = async () => {
    // Validate only shipping fields before moving to payment step
    const isStepValid = await trigger('shippingAddress');
    if (isStepValid) {
      onNext();
    }
  };

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      <div>
        <input
          {...register('shippingAddress.receiverName')}
          placeholder="Họ và tên người nhận"
          className="w-full rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
        />
        {errors.shippingAddress?.receiverName && (
          <p className="mt-1 text-xs text-red-500">{errors.shippingAddress.receiverName.message}</p>
        )}
      </div>

      <div>
        <input
          {...register('shippingAddress.receiverPhone')}
          placeholder="Số điện thoại"
          className="w-full rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
        />
        {errors.shippingAddress?.receiverPhone && (
          <p className="mt-1 text-xs text-red-500">{errors.shippingAddress.receiverPhone.message}</p>
        )}
      </div>

      <div>
        <input
          {...register('shippingAddress.province')}
          placeholder="Tỉnh/Thành phố"
          className="w-full rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
        />
        {errors.shippingAddress?.province && (
          <p className="mt-1 text-xs text-red-500">{errors.shippingAddress.province.message}</p>
        )}
      </div>

      <div>
        <input
          {...register('shippingAddress.district')}
          placeholder="Quận/Huyện"
          className="w-full rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
        />
        {errors.shippingAddress?.district && (
          <p className="mt-1 text-xs text-red-500">{errors.shippingAddress.district.message}</p>
        )}
      </div>

      <div>
        <input
          {...register('shippingAddress.ward')}
          placeholder="Phường/Xã"
          className="w-full rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
        />
        {errors.shippingAddress?.ward && (
          <p className="mt-1 text-xs text-red-500">{errors.shippingAddress.ward.message}</p>
        )}
      </div>

      <div className="sm:col-span-2">
        <input
          {...register('shippingAddress.detailAddress')}
          placeholder="Địa chỉ chi tiết (Số nhà, đường...)"
          className="w-full rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53]"
        />
        {errors.shippingAddress?.detailAddress && (
          <p className="mt-1 text-xs text-red-500">{errors.shippingAddress.detailAddress.message}</p>
        )}
      </div>

      <div className="sm:col-span-2">
        <textarea
          {...register('customerNote')}
          placeholder="Ghi chú đơn hàng (Tùy chọn)"
          rows={3}
          className="w-full rounded-xl border border-[#EAE6DF] px-4 py-3 text-sm outline-none focus:border-[#84EA53] resize-none"
        />
      </div>

      <button
        type="button"
        onClick={handleContinue}
        className="rounded-xl bg-[#1D1F20] py-3 text-sm font-bold text-white sm:col-span-2 transition-transform hover:scale-[1.01] active:scale-[0.99]"
      >
        Continue to payment
      </button>
    </div>
  );
}

```

# src\modules\checkout\schemas.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\checkout\schemas.ts` |
| Size | 2,171 bytes |
| Extension | `.ts` |
| Modified | 2026-10-05 10:24:43.395218 |

```typescript
import { z } from 'zod';
import { PaymentMethod } from '@/types';

// Regex kiểm tra số điện thoại chuẩn Việt Nam
const phoneRegex = /^(84|0)[35789]\d{8}$/;

export const shippingAddressSchema = z.object({
  receiverName: z
    .string()
    .trim()
    .min(2, 'Tên người nhận phải có ít nhất 2 ký tự')
    .max(100, 'Tên quá dài, tối đa 100 ký tự'),
  receiverPhone: z
    .string()
    .trim()
    .regex(phoneRegex, 'Số điện thoại không hợp lệ (VD: 0912345678)'),
  province: z.string().trim().min(1, 'Vui lòng chọn Tỉnh/Thành phố'),
  district: z.string().trim().min(1, 'Vui lòng chọn Quận/Huyện'),
  ward: z.string().trim().min(1, 'Vui lòng chọn Phường/Xã'),
  detailAddress: z
    .string()
    .trim()
    .min(5, 'Địa chỉ chi tiết phải có ít nhất 5 ký tự')
    .max(500, 'Địa chỉ quá dài'),
});

export const checkoutSchema = z
  .object({
    // Nếu truyền danh sách ID vào thì chỉ thanh toán những món đó, nếu không truyền sẽ thanh toán toàn bộ giỏ
    cartItemIds: z.array(z.number()).optional(),

    // Khách chọn địa chỉ đã lưu hoặc nhập địa chỉ mới
    shippingAddressId: z.number().optional(),
    shippingAddress: shippingAddressSchema.optional(),

    paymentMethod: z.enum(['COD', 'VNPAY', 'MOMO', 'BANK_TRANSFER'], {
      required_error: 'Vui lòng chọn phương thức thanh toán',
      invalid_type_error: 'Phương thức thanh toán không hợp lệ',
    }),
    
    shippingMethod: z.string().optional(),
    customerNote: z.string().max(1000, 'Ghi chú không được quá 1000 ký tự').optional(),
    voucherCode: z.string().optional(),
    pointUsed: z.number().min(0, 'Số điểm không hợp lệ').optional(),
  })
  .refine((data) => data.shippingAddressId || data.shippingAddress, {
    message: 'Vui lòng chọn địa chỉ đã lưu hoặc nhập địa chỉ giao hàng mới',
    path: ['shippingAddress'], // Báo lỗi tại field shippingAddress
  });

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

```

# src\modules\checkout\types.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\checkout\types.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.145868 |

```typescript

```

# src\modules\flash-sale\api.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\flash-sale\api.ts` |
| Size | 39 bytes |
| Extension | `.ts` |
| Modified | 2026-10-05 20:42:08.940640 |

```typescript
export * from '@/api/flash-sale.api';

```

# src\modules\flash-sale\components\countdown.tsx

| Property | Value |
|----------|-------|
| Path | `src\modules\flash-sale\components\countdown.tsx` |
| Size | 5,324 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.943597 |

```tsx
'use client';

import { useEffect, useState } from 'react';
import { Clock, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CountdownProps {
  targetTime: string | Date;
  startTime?: string | Date;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  onEnd?: () => void;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isEnded: boolean;
  isUpcoming: boolean;
}

function calculateTimeRemaining(target: string | Date, start?: string | Date): TimeRemaining {
  const now = new Date().getTime();
  const startTime = start ? new Date(start).getTime() : 0;
  const targetTime = new Date(target).getTime();

  if (start && now < startTime) {
    const diff = startTime - now;
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      isEnded: false,
      isUpcoming: true,
    };
  }

  const diff = targetTime - now;

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isEnded: true,
      isUpcoming: false,
    };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isEnded: false,
    isUpcoming: false,
  };
}

export function FlashSaleCountdown({
  targetTime,
  startTime,
  className,
  size = 'md',
  showLabels = true,
  onEnd,
}: CountdownProps) {
  const [time, setTime] = useState<TimeRemaining>(() =>
    calculateTimeRemaining(targetTime, startTime)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const nextTime = calculateTimeRemaining(targetTime, startTime);
      setTime(nextTime);

      if (nextTime.isEnded) {
        clearInterval(timer);
        onEnd?.();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime, startTime, onEnd]);

  if (time.isEnded) {
    return (
      <div className={cn('inline-flex items-center gap-1.5 font-semibold text-muted-foreground', className)}>
        <Clock className="size-4" />
        <span>Chiến dịch đã kết thúc</span>
      </div>
    );
  }

  const pad = (n: number) => n.toString().padStart(2, '0');

  const sizeClasses = {
    sm: {
      box: 'px-1.5 py-0.5 text-xs font-mono font-bold rounded',
      colon: 'text-xs font-bold mx-0.5',
      label: 'text-[9px] uppercase tracking-wider',
    },
    md: {
      box: 'px-2.5 py-1 text-sm font-mono font-extrabold rounded-md',
      colon: 'text-sm font-bold mx-1',
      label: 'text-[10px] uppercase tracking-wider',
    },
    lg: {
      box: 'px-3.5 py-1.5 text-lg font-mono font-black rounded-lg',
      colon: 'text-base font-bold mx-1.5',
      label: 'text-xs uppercase tracking-wider',
    },
  }[size];

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex items-center text-red-500 font-bold animate-pulse">
        <Flame className={cn(size === 'lg' ? 'size-5' : size === 'sm' ? 'size-3.5' : 'size-4')} />
        <span className="text-xs uppercase ml-1 tracking-wider">
          {time.isUpcoming ? 'Bắt đầu sau' : 'Kết thúc sau'}
        </span>
      </div>

      <div className="flex items-center">
        {time.days > 0 && (
          <>
            <div className="flex flex-col items-center">
              <span className={cn('bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm', sizeClasses.box)}>
                {pad(time.days)}
              </span>
              {showLabels && <span className={cn('mt-0.5 text-zinc-500', sizeClasses.label)}>ngày</span>}
            </div>
            <span className={cn('text-zinc-400', sizeClasses.colon)}>:</span>
          </>
        )}

        <div className="flex flex-col items-center">
          <span className={cn('bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm', sizeClasses.box)}>
            {pad(time.hours)}
          </span>
          {showLabels && <span className={cn('mt-0.5 text-zinc-500', sizeClasses.label)}>giờ</span>}
        </div>

        <span className={cn('text-zinc-400', sizeClasses.colon)}>:</span>

        <div className="flex flex-col items-center">
          <span className={cn('bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm', sizeClasses.box)}>
            {pad(time.minutes)}
          </span>
          {showLabels && <span className={cn('mt-0.5 text-zinc-500', sizeClasses.label)}>phút</span>}
        </div>

        <span className={cn('text-zinc-400', sizeClasses.colon)}>:</span>

        <div className="flex flex-col items-center">
          <span className={cn('bg-red-600 text-white shadow-sm shadow-red-500/20', sizeClasses.box)}>
            {pad(time.seconds)}
          </span>
          {showLabels && <span className={cn('mt-0.5 text-red-500 font-semibold', sizeClasses.label)}>giây</span>}
        </div>
      </div>
    </div>
  );
}

```

# src\modules\flash-sale\components\flash-sale-card.tsx

| Property | Value |
|----------|-------|
| Path | `src\modules\flash-sale\components\flash-sale-card.tsx` |
| Size | 6,404 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.945601 |

```tsx
'use client';

import Image from 'next/image';
import { Flame, ShoppingCart, Check, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { FlashSaleItem } from '@/types/inventory-sale';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { cartApi } from '@/api/cart.api';

interface FlashSaleCardProps {
  item: FlashSaleItem;
  className?: string;
}

export function FlashSaleCard({ item, className }: FlashSaleCardProps) {
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const productName = item.variant?.product?.defaultName || `Biến thể #${item.variantId}`;
  const sku = item.variant?.sku || `SKU-${item.variantId}`;
  
  const flashPrice = Number(item.flashSalePrice);
  const originalPrice = Number(item.variant?.sellingPrice || item.variant?.originalPrice || flashPrice * 1.3);
  
  const discountPercent = originalPrice > flashPrice 
    ? Math.round(((originalPrice - flashPrice) / originalPrice) * 100) 
    : 0;

  const soldCount = item.soldQuantity || 0;
  const totalCount = item.promoQuantity || 1;
  const progressPercent = Math.min(Math.round((soldCount / totalCount) * 100), 100);
  const isSoldOut = soldCount >= totalCount;

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  const handleAddToCart = async () => {
    if (isSoldOut || adding) return;
    setAdding(true);
    try {
      await cartApi.addToCart({
        variantId: item.variantId,
        quantity: 1,
      });
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      console.error('Không thể thêm sản phẩm vào giỏ hàng:', err);
    } finally {
      setAdding(false);
    }
  };

  return (
    <article
      className={cn(
        'group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-3 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-950',
        className
      )}
    >
      <div>
        {/* Image & Discount Badge Container */}
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900">
          <Image
            src="/images/product-placeholder.jpg"
            alt={productName}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Flash Sale Tag */}
          <div className="absolute left-2.5 top-2.5 flex items-center gap-1 rounded-full bg-red-600 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-md shadow-red-600/30">
            <Flame className="size-3.5 fill-amber-300 text-amber-300 animate-pulse" />
            <span>Flash Sale</span>
          </div>

          {/* Discount Percentage Badge */}
          {discountPercent > 0 && (
            <div className="absolute right-2.5 top-2.5 rounded-full bg-amber-400 px-2 py-0.5 text-xs font-black text-zinc-950 shadow-sm">
              -{discountPercent}%
            </div>
          )}

          {/* Sold Out Overlay */}
          {isSoldOut && (
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/70 backdrop-blur-[2px]">
              <span className="rounded-full bg-red-600/90 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg">
                Đã hết hàng
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="mt-3 flex flex-col gap-1.5">
          <div className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500">
            SKU: {sku}
          </div>
          <h3 className="line-clamp-2 text-sm font-semibold text-zinc-900 transition-colors group-hover:text-red-600 dark:text-zinc-100 dark:group-hover:text-red-400">
            {productName}
          </h3>

          {/* Pricing */}
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-red-600 dark:text-red-500">
              {formatPrice(flashPrice)}
            </span>
            {originalPrice > flashPrice && (
              <span className="text-xs font-medium text-zinc-400 line-through dark:text-zinc-500">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Progress & Cart Action */}
      <div className="mt-4 flex flex-col gap-2.5">
        {/* Quantity Sold Progress Bar */}
        <div className="relative overflow-hidden rounded-full bg-zinc-100 p-1 dark:bg-zinc-800">
          <div
            className="h-3.5 rounded-full bg-gradient-to-r from-amber-500 to-red-600 transition-all duration-500"
            style={{ width: `${Math.max(progressPercent, 5)}%` }}
          />
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
            {isSoldOut ? 'Đã bán hết' : `Đã bán ${soldCount}/${totalCount}`}
          </span>
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={isSoldOut || adding}
          variant={added ? 'secondary' : 'default'}
          className={cn(
            'w-full font-bold transition-all shadow-sm',
            !isSoldOut && !added && 'bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700'
          )}
        >
          {adding ? (
            <>
              <Loader2 className="mr-1.5 size-4 animate-spin" />
              Đang xử lý...
            </>
          ) : added ? (
            <>
              <Check className="mr-1.5 size-4 text-green-600" />
              Đã thêm vào giỏ
            </>
          ) : isSoldOut ? (
            'Tạm hết hàng'
          ) : (
            <>
              <ShoppingCart className="mr-1.5 size-4" />
              Mua ngay
            </>
          )}
        </Button>
      </div>
    </article>
  );
}

```

# src\modules\flash-sale\components\flash-sale-section.tsx

| Property | Value |
|----------|-------|
| Path | `src\modules\flash-sale\components\flash-sale-section.tsx` |
| Size | 3,731 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.946734 |

```tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Flame, ArrowRight, Sparkles } from 'lucide-react';
import { FlashSaleCampaign } from '@/types/inventory-sale';
import { flashSaleApi } from '@/api/flash-sale.api';
import { FlashSaleCountdown } from './countdown';
import { FlashSaleCard } from './flash-sale-card';

export function FlashSaleSection() {
  const [campaigns, setCampaigns] = useState<FlashSaleCampaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActive() {
      try {
        const res = await flashSaleApi.getActiveCampaigns();
        if (res.data) {
          setCampaigns(res.data);
        }
      } catch (err) {
        console.error('Failed to fetch active flash sale campaigns:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchActive();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-8 lg:px-12">
        <div className="h-48 animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-800" />
      </div>
    );
  }

  if (!campaigns.length) return null;

  const currentCampaign = campaigns[0];
  const items = currentCampaign.items || [];

  return (
    <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-8 lg:px-12">
      <div className="overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-b from-red-950/10 via-background to-background p-6 shadow-xl dark:from-red-950/30 sm:p-8">
        {/* Header Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-red-500/10 pb-6">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg shadow-red-600/30">
              <Flame className="size-7 fill-amber-300 text-amber-300 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-widest text-red-600 dark:text-red-400">
                  Ưu đãi giới hạn
                </span>
                <span className="flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700 dark:bg-red-950 dark:text-red-300">
                  <Sparkles className="size-3" /> HOT SALE
                </span>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
                {currentCampaign.name}
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <FlashSaleCountdown
              targetTime={currentCampaign.endTime}
              startTime={currentCampaign.startTime}
              size="md"
            />
            <Link
              href="/flash-sale"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-red-600 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-red-600 dark:hover:text-white"
            >
              Xem tất cả <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        {/* Item Grid */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.slice(0, 4).map((item) => (
            <FlashSaleCard key={item.id || item.variantId} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

```

# src\modules\flash-sale\context.tsx

| Property | Value |
|----------|-------|
| Path | `src\modules\flash-sale\context.tsx` |
| Size | 1,699 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-06 00:08:13.658305 |

```tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FlashSaleCampaign, FlashSaleItem } from '@/types/inventory-sale';

interface FlashSaleContextType {
  campaign: FlashSaleCampaign | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedItem: FlashSaleItem | null;
  setSelectedItem: (item: FlashSaleItem | null) => void;
  filteredItems: FlashSaleItem[];
}

const FlashSaleContext = createContext<FlashSaleContextType | undefined>(undefined);

export function FlashSaleProvider({
  campaign,
  children,
}: {
  campaign: FlashSaleCampaign | null;
  children: ReactNode;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<FlashSaleItem | null>(null);

  const rawItems = campaign?.items || [];
  const filteredItems = rawItems.filter((item) => {
    if (!searchQuery.trim()) return true;
    const name = item.variant?.product?.defaultName?.toLowerCase() || '';
    const sku = item.variant?.sku?.toLowerCase() || '';
    const q = searchQuery.toLowerCase();
    return name.includes(q) || sku.includes(q);
  });

  return (
    <FlashSaleContext.Provider
      value={{
        campaign,
        searchQuery,
        setSearchQuery,
        selectedItem,
        setSelectedItem,
        filteredItems,
      }}
    >
      {children}
    </FlashSaleContext.Provider>
  );
}

export function useFlashSaleContext() {
  const context = useContext(FlashSaleContext);
  if (!context) {
    throw new Error('useFlashSaleContext phải được dùng bên trong FlashSaleProvider');
  }
  return context;
}

```

# src\modules\flash-sale\store.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\flash-sale\store.ts` |
| Size | 1,977 bytes |
| Extension | `.ts` |
| Modified | 2026-10-06 00:08:13.659305 |

```typescript
import { create } from 'zustand';
import { FlashSaleCampaign, FlashSaleItem } from '@/types/inventory-sale';
import { flashSaleApi } from '@/api/flash-sale.api';

interface FlashSaleState {
  activeCampaigns: FlashSaleCampaign[];
  selectedCampaignId: number | null;
  loading: boolean;
  error: string | null;

  // Actions
  fetchActiveCampaigns: () => Promise<void>;
  setSelectedCampaignId: (id: number | null) => void;
  updateItemSoldQuantity: (variantId: number, soldQuantity: number) => void;
  getActiveCampaign: () => FlashSaleCampaign | undefined;
}

export const useFlashSaleStore = create<FlashSaleState>((set, get) => ({
  activeCampaigns: [],
  selectedCampaignId: null,
  loading: false,
  error: null,

  fetchActiveCampaigns: async () => {
    set({ loading: true, error: null });
    try {
      const res = await flashSaleApi.getActiveCampaigns();
      const campaigns = res.data || [];
      set({
        activeCampaigns: campaigns,
        selectedCampaignId: campaigns.length > 0 ? campaigns[0].id : null,
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || 'Không thể tải danh sách Flash Sale',
        loading: false,
      });
    }
  },

  setSelectedCampaignId: (id: number | null) => {
    set({ selectedCampaignId: id });
  },

  updateItemSoldQuantity: (variantId: number, soldQuantity: number) => {
    set((state) => ({
      activeCampaigns: state.activeCampaigns.map((campaign) => ({
        ...campaign,
        items: campaign.items?.map((item) =>
          item.variantId === variantId ? { ...item, soldQuantity } : item
        ),
      })),
    }));
  },

  getActiveCampaign: () => {
    const { activeCampaigns, selectedCampaignId } = get();
    if (!selectedCampaignId) return activeCampaigns[0];
    return activeCampaigns.find((c) => c.id === selectedCampaignId) || activeCampaigns[0];
  },
}));

```

# src\modules\flash-sale\types.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\flash-sale\types.ts` |
| Size | 200 bytes |
| Extension | `.ts` |
| Modified | 2026-10-05 20:42:08.949732 |

```typescript
export * from '@/types/inventory-sale';

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isEnded: boolean;
  isUpcoming: boolean;
}

```

# src\modules\order\api.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\order\api.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.150333 |

```typescript

```

# src\modules\order\components\order-detail.tsx

| Property | Value |
|----------|-------|
| Path | `src\modules\order\components\order-detail.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.151867 |

```tsx

```

# src\modules\order\components\order-list.tsx

| Property | Value |
|----------|-------|
| Path | `src\modules\order\components\order-list.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.152190 |

```tsx

```

# src\modules\order\components\order-status.tsx

| Property | Value |
|----------|-------|
| Path | `src\modules\order\components\order-status.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.152866 |

```tsx

```

# src\modules\order\hooks\use-orders.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\order\hooks\use-orders.ts` |
| Size | 1,255 bytes |
| Extension | `.ts` |
| Modified | 2026-10-05 10:24:43.397176 |

```typescript
import { useMutation } from '@tanstack/react-query';
import { orderApi } from '@/api/order.api';
import { CreateOrderPayload } from '@/types';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { CART_QUERY_KEYS } from '@/modules/cart/hooks/use-cart';

export const useCreateOrder = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateOrderPayload) => orderApi.createOrder(payload),
    onSuccess: (response) => {
      toast.success('Đặt hàng thành công!');
      // Clear cart cache since order is placed
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.cart });
      
      // Redirect based on payment method or to success page
      const orderData = response.data;
      if (orderData?.id) {
        // Mock redirection to an order confirmation page or list
        router.push(`/account/orders/${orderData.id}`);
      } else {
        router.push('/account/orders');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Có lỗi xảy ra khi đặt hàng');
    },
  });
};

```

# src\modules\order\types.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\order\types.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.155388 |

```typescript

```

# src\modules\review\api.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\review\api.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.156878 |

```typescript

```

# src\modules\review\components\rating.tsx

| Property | Value |
|----------|-------|
| Path | `src\modules\review\components\rating.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.157868 |

```tsx

```

# src\modules\review\components\review-form.tsx

| Property | Value |
|----------|-------|
| Path | `src\modules\review\components\review-form.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.158204 |

```tsx

```

# src\modules\review\components\review-list.tsx

| Property | Value |
|----------|-------|
| Path | `src\modules\review\components\review-list.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.158870 |

```tsx

```

# src\modules\review\types.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\review\types.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.159367 |

```typescript

```

# src\modules\user\api.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\user\api.ts` |
| Size | 164 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.160868 |

```typescript
import { api } from '@/lib/api/client';
import type { User } from './types';

export function getUser(id: string) {
  return api.get<User>(`/users/${id}`);
}

```

# src\modules\user\components\address-list.tsx

| Property | Value |
|----------|-------|
| Path | `src\modules\user\components\address-list.tsx` |
| Size | 12,998 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.951938 |

```tsx
'use client';

import * as React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Plus, MapPin, Trash2, Edit3, Check, Loader2 } from 'lucide-react';
import { authApi } from '@/api/auth.api';
import { addressSchema, type AddressFormData } from '@/modules/auth/schemas';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FormField } from '@/components/ui/form-field';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import type { ShippingAddress } from '@/types';

export function AddressList() {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingAddress, setEditingAddress] = React.useState<ShippingAddress | null>(null);
  const [deleteTargetId, setDeleteTargetId] = React.useState<number | null>(null);

  const { data: addressesData, isLoading } = useQuery({
    queryKey: ['addresses'],
    queryFn: async () => {
      const res = await authApi.getAddresses();
      return res.data || [];
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      receiverName: '',
      phoneNumber: '',
      province: '',
      district: '',
      ward: '',
      detailAddress: '',
      isDefault: false,
    },
  });

  const isDefaultWatched = watch('isDefault');

  const openCreateDialog = () => {
    setEditingAddress(null);
    reset({
      receiverName: '',
      phoneNumber: '',
      province: '',
      district: '',
      ward: '',
      detailAddress: '',
      isDefault: false,
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (addr: ShippingAddress) => {
    setEditingAddress(addr);
    reset({
      receiverName: addr.receiverName,
      phoneNumber: addr.phoneNumber,
      province: addr.province,
      district: addr.district,
      ward: addr.ward,
      detailAddress: addr.detailAddress,
      isDefault: addr.isDefault,
    });
    setIsDialogOpen(true);
  };

  const saveMutation = useMutation({
    mutationFn: async (data: AddressFormData) => {
      if (editingAddress) {
        return authApi.updateAddress(editingAddress.id, data);
      } else {
        return authApi.createAddress(data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      toast.success(editingAddress ? 'Cập nhật địa chỉ thành công!' : 'Thêm địa chỉ mới thành công!');
      setIsDialogOpen(false);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Thao tác thất bại, vui lòng thử lại');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return authApi.deleteAddress(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      toast.success('Xóa địa chỉ thành công!');
      setDeleteTargetId(null);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Xóa địa chỉ thất bại');
    },
  });

  const onSubmit = (data: AddressFormData) => {
    saveMutation.mutate(data);
  };

  const addresses = addressesData || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#EAE6DF]">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900">Sổ địa chỉ nhận hàng</h2>
          <p className="text-xs text-neutral-500 mt-1">
            Quản lý danh sách địa chỉ nhận hàng để tiện lợi khi thanh toán.
          </p>
        </div>
        <Button
          onClick={openCreateDialog}
          className="h-10 px-4 rounded-xl bg-[#1D1F20] hover:bg-neutral-800 text-white font-medium flex items-center gap-2 shrink-0"
        >
          <Plus className="size-4" />
          <span>Thêm địa chỉ mới</span>
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-44 rounded-2xl" />
          <Skeleton className="h-44 rounded-2xl" />
        </div>
      ) : addresses.length === 0 ? (
        <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-[#EAE6DF] bg-neutral-50/40">
          <MapPin className="size-8 mx-auto text-neutral-400 mb-2" />
          <h3 className="text-sm font-semibold text-neutral-800">Chưa có địa chỉ nào</h3>
          <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
            Bạn chưa lưu địa chỉ nhận hàng nào. Hãy thêm địa chỉ đầu tiên để bắt đầu đặt hàng.
          </p>
          <Button
            onClick={openCreateDialog}
            variant="outline"
            size="sm"
            className="mt-4 rounded-xl border-[#EAE6DF]"
          >
            Thêm ngay
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`p-5 rounded-2xl border transition relative flex flex-col justify-between ${
                addr.isDefault
                  ? 'border-neutral-900 bg-neutral-50/30'
                  : 'border-[#EAE6DF] bg-white hover:border-neutral-300'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-neutral-900">
                      {addr.receiverName}
                    </h4>
                    {addr.isDefault && (
                      <Badge variant="lime" className="text-[10px] py-0">
                        Mặc định
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => openEditDialog(addr)}
                      className="p-1.5 text-neutral-400 hover:text-neutral-700 transition rounded-lg hover:bg-neutral-100"
                    >
                      <Edit3 className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteTargetId(addr.id)}
                      className="p-1.5 text-neutral-400 hover:text-rose-600 transition rounded-lg hover:bg-rose-50"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-neutral-600">
                  <span className="text-neutral-400">Điện thoại: </span>
                  {addr.phoneNumber}
                </p>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  <span className="text-neutral-400">Địa chỉ: </span>
                  {addr.detailAddress}, {addr.ward}, {addr.district}, {addr.province}
                </p>
              </div>

              {!addr.isDefault && (
                <div className="pt-3 mt-3 border-t border-[#EAE6DF]/70">
                  <button
                    type="button"
                    onClick={() =>
                      saveMutation.mutate({
                        ...addr,
                        isDefault: true,
                      })
                    }
                    className="text-xs text-neutral-500 hover:text-neutral-900 font-medium transition flex items-center gap-1"
                  >
                    <Check className="size-3.5" />
                    Đặt làm mặc định
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg bg-white border border-[#EAE6DF] rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-neutral-900">
              {editingAddress ? 'Cập nhật địa chỉ' : 'Thêm địa chỉ nhận hàng'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={control}
                name="receiverName"
                label="Tên người nhận"
                placeholder="Nguyễn Văn A"
                error={errors.receiverName?.message}
              />
              <FormField
                control={control}
                name="phoneNumber"
                label="Số điện thoại"
                placeholder="0912345678"
                error={errors.phoneNumber?.message}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <FormField
                control={control}
                name="province"
                label="Tỉnh / Thành"
                placeholder="TP. Hồ Chí Minh"
                error={errors.province?.message}
              />
              <FormField
                control={control}
                name="district"
                label="Quận / Huyện"
                placeholder="Quận 1"
                error={errors.district?.message}
              />
              <FormField
                control={control}
                name="ward"
                label="Phường / Xã"
                placeholder="Bến Nghé"
                error={errors.ward?.message}
              />
            </div>

            <FormField
              control={control}
              name="detailAddress"
              label="Địa chỉ chi tiết (Số nhà, tên đường)"
              placeholder="123 Đường Lê Lợi"
              error={errors.detailAddress?.message}
            />

            <label className="flex items-center gap-2 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={isDefaultWatched}
                onChange={(e) => setValue('isDefault', e.target.checked)}
                className="rounded border-[#EAE6DF] accent-neutral-900 size-4"
              />
              <span className="text-xs text-neutral-700">Đặt làm địa chỉ giao hàng mặc định</span>
            </label>

            <DialogFooter className="mt-6 flex flex-row justify-end gap-2.5 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="rounded-xl border-[#EAE6DF]"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={saveMutation.isPending}
                className="rounded-xl bg-[#1D1F20] hover:bg-neutral-800 text-white font-medium"
              >
                {saveMutation.isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin mr-2" />
                    Đang lưu...
                  </>
                ) : (
                  'Lưu địa chỉ'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <ConfirmDialog
        open={deleteTargetId !== null}
        onOpenChange={(open) => !open && setDeleteTargetId(null)}
        title="Xóa địa chỉ"
        description="Bạn có chắc chắn muốn xóa địa chỉ nhận hàng này? Thao tác này không thể hoàn tác."
        variant="destructive"
        confirmText="Xóa vĩnh viễn"
        isLoading={deleteMutation.isPending}
        onConfirm={() => {
          if (deleteTargetId) deleteMutation.mutate(deleteTargetId);
        }}
      />
    </div>
  );
}


```

# src\modules\user\components\profile-form.tsx

| Property | Value |
|----------|-------|
| Path | `src\modules\user\components\profile-form.tsx` |
| Size | 6,764 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-05 20:42:08.952731 |

```tsx
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { profileSchema, type ProfileFormData } from '@/modules/auth/schemas';
import { useAuth } from '@/components/providers/auth-provider';
import { apiClient } from '@/api/client';
import { API_ENDPOINTS } from '@/api/endpoints';
import { FormField } from '@/components/ui/form-field';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import type { ApiResponse, UserProfile } from '@/types';

export function ProfileForm() {
  const { user } = useAuth();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.fullName || '',
      phoneNumber: user?.phoneNumber || '',
      avatarUrl: user?.avatarUrl || '',
    },
  });

  React.useEffect(() => {
    if (user) {
      setValue('fullName', user.fullName || '');
      setValue('phoneNumber', user.phoneNumber || '');
      setValue('avatarUrl', user.avatarUrl || '');
    }
  }, [user, setValue]);

  const currentAvatarUrl = watch('avatarUrl');

  const updateProfileMutation = useMutation({
    mutationFn: async (data: ProfileFormData) => {
      if (!user?.id) throw new Error('Không tìm thấy thông tin người dùng');
      const res = await apiClient.put<ApiResponse<UserProfile>>(
        `${API_ENDPOINTS.IDENTITY.USERS}/${user.id}`,
        {
          fullName: data.fullName,
          phoneNumber: data.phoneNumber || undefined,
          avatarUrl: data.avatarUrl || null,
        }
      );
      return res.data;
    },
    onSuccess: (res) => {
      if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data));
        window.dispatchEvent(new Event('local-storage-change'));
        toast.success('Cập nhật hồ sơ thành công!');
      }
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Cập nhật thất bại, vui lòng thử lại');
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    updateProfileMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Avatar Preview & URL */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-4 rounded-xl bg-neutral-50/80 border border-[#EAE6DF]">
        <Avatar
          src={currentAvatarUrl || user?.avatarUrl}
          alt={user?.fullName || 'User'}
          size="xl"
          className="size-20 ring-4 ring-white shadow-xs"
        />
        <div className="space-y-1.5 flex-1">
          <h4 className="text-sm font-semibold text-neutral-900">Ảnh đại diện</h4>
          <p className="text-xs text-neutral-500">
            Dán đường dẫn ảnh đại diện (URL) của bạn để cập nhật ảnh hiển thị.
          </p>
          <div className="max-w-md pt-1">
            <FormField
              control={control}
              name="avatarUrl"
              label=""
              placeholder="https://example.com/avatar.jpg"
              error={errors.avatarUrl?.message}
            />
          </div>
        </div>
      </div>

      {/* Rewards & Role Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border border-[#EAE6DF] bg-neutral-50/40 flex items-center justify-between">
          <div>
            <p className="text-xs text-neutral-500">Điểm thưởng thành viên</p>
            <p className="text-xl font-bold text-neutral-900 flex items-center gap-1.5 mt-0.5">
              <Sparkles className="size-4 text-amber-500 fill-amber-500" />
              {user?.rewardPoints?.toLocaleString('vi-VN') || 0} điểm
            </p>
          </div>
          <Badge variant="lime" className="text-[11px]">Hạng Bạc</Badge>
        </div>

        <div className="p-4 rounded-xl border border-[#EAE6DF] bg-neutral-50/40 flex items-center justify-between">
          <div>
            <p className="text-xs text-neutral-500">Trạng thái tài khoản</p>
            <p className="text-sm font-semibold text-emerald-600 flex items-center gap-1.5 mt-1">
              <CheckCircle2 className="size-4" />
              {user?.status === 'ACTIVE' ? 'Đang hoạt động' : user?.status}
            </p>
          </div>
          <Badge variant="success" className="text-[11px]">Đã kích hoạt</Badge>
        </div>
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          control={control}
          name="fullName"
          label="Họ và tên"
          placeholder="Nguyễn Văn A"
          error={errors.fullName?.message}
        />

        <FormField
          control={control}
          name="phoneNumber"
          label="Số điện thoại"
          placeholder="0912345678"
          error={errors.phoneNumber?.message}
        />
      </div>

      {/* Readonly Email */}
      <div className="space-y-1">
        <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
          Địa chỉ Email
        </label>
        <input
          type="email"
          value={user?.email || ''}
          disabled
          className="w-full rounded-xl border border-[#EAE6DF] bg-neutral-100/70 px-4 py-2.5 text-sm text-neutral-500 cursor-not-allowed outline-none"
        />
        <p className="text-[11px] text-neutral-400">
          Email đăng nhập được cố định để bảo vệ an toàn danh tính tài khoản của bạn.
        </p>
      </div>

      <div className="flex justify-end pt-4 border-t border-[#EAE6DF]">
        <Button
          type="submit"
          disabled={updateProfileMutation.isPending || !isDirty}
          className="h-11 px-8 rounded-xl bg-[#1D1F20] hover:bg-neutral-800 text-white font-medium transition active:scale-[0.99]"
        >
          {updateProfileMutation.isPending ? (
            <>
              <Loader2 className="size-4 animate-spin mr-2" />
              Đang lưu thay đổi...
            </>
          ) : (
            'Lưu thay đổi'
          )}
        </Button>
      </div>
    </form>
  );
}


```

# src\modules\user\types.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\user\types.ts` |
| Size | 78 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.162979 |

```typescript
export interface User {
  id: string;
  name: string;
  email: string;
}

```

# src\modules\voucher\api.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\voucher\api.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.163868 |

```typescript

```

# src\modules\voucher\components\voucher-input.tsx

| Property | Value |
|----------|-------|
| Path | `src\modules\voucher\components\voucher-input.tsx` |
| Size | 0 bytes |
| Extension | `.tsx` |
| Modified | 2026-10-02 09:57:03.165899 |

```tsx

```

# src\modules\voucher\types.ts

| Property | Value |
|----------|-------|
| Path | `src\modules\voucher\types.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.166045 |

```typescript

```

# src\types\api.ts

| Property | Value |
|----------|-------|
| Path | `src\types\api.ts` |
| Size | 0 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 09:57:03.167167 |

```typescript

```

# src\types\auth.ts

| Property | Value |
|----------|-------|
| Path | `src\types\auth.ts` |
| Size | 1,872 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 13:50:18.218645 |

```typescript
import { UserStatus } from './enums'; //[cite: 1, 2]

export interface Permission {
  id: number;
  code: string;
  module: string;
  description?: string | null;
}

export interface Role {
  id: number;
  code: 'ADMIN' | 'STAFF' | 'CUSTOMER' | string; //[cite: 1, 2]
  name: string;
  isActive: boolean;
  permissions?: Permission[];
}

export interface UserProfile {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  avatarUrl?: string | null;
  rewardPoints: number;
  status: UserStatus; //[cite: 1, 2]
  roleId: number;
  role?: Role;
  createdAt: string;
}

export interface ShippingAddress {
  id: number;
  userId: number;
  receiverName: string;
  phoneNumber: string;
  province: string;
  district: string;
  ward: string;
  detailAddress: string;
  isDefault: boolean;
  createdAt?: string;
}

export interface DeviceSession {
  id: number;
  userId: number;
  refreshToken: string;
  ipAddress: string;
  isActive: boolean;
  expiresAt: string;
  createdAt: string;
}

// Payload DTO gửi lên Backend
export interface RegisterPayload {
  fullName: string;
  email: string;
  phoneNumber?: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface VerifyCodePayload {
  email: string;
  type: 'REGISTER' | 'FORGOT_PASSWORD'; //[cite: 1, 2]
  code: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface CreateAddressPayload {
  receiverName: string;
  phoneNumber: string;
  province: string;
  district: string;
  ward: string;
  detailAddress: string;
  isDefault?: boolean;
}
```

# src\types\cart-order.ts

| Property | Value |
|----------|-------|
| Path | `src\types\cart-order.ts` |
| Size | 2,322 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 13:51:02.989577 |

```typescript
import { OrderStatus, PaymentMethod, PaymentStatus } from './enums'; //[cite: 1, 2]
import { ProductVariant, Product } from './catalog';

export interface CartItem {
  id: number;
  cartId: number;
  variantId: number;
  quantity: number;
  variant: ProductVariant & {
    product: Product;
  };
}

export interface Cart {
  id: number;
  userId?: number | null;
  sessionId?: string | null;
  cartItems: CartItem[];
}

export interface OrderItem {
  id: number;
  orderId: number;
  variantId?: number | null;
  productName: string;
  skuCode: string;
  variantValue: string;
  productImageUrl?: string | null;
  unitPrice: number | string;
  quantity: number;
}

export interface Order {
  id: number;
  orderCode: string;
  userId: number;
  receiverName: string;
  receiverPhone: string;
  province: string;
  district: string;
  ward: string;
  detailAddress: string;
  subTotal: number | string;
  shippingFee: number | string;
  shippingMethod: string;
  shippingDiscount: number | string;
  voucherCode?: string | null;
  voucherDiscount: number | string;
  pointUsed: number;
  pointDiscount: number | string;
  pointEarned: number;
  totalAmount: number | string;
  paymentMethod: PaymentMethod; //[cite: 1, 2]
  paymentStatus: PaymentStatus; //[cite: 1, 2]
  status: OrderStatus; //[cite: 1, 2]
  customerNote?: string | null;
  orderDate: string;
  orderItems: OrderItem[];
  shipment?: any;
  paymentTransactions?: any[];
}

// Payload Thêm vào giỏ
export interface AddToCartPayload {
  variantId: number;
  quantity: number;
}

// Payload Cập nhật số lượng giỏ
export interface UpdateCartItemPayload {
  quantity: number;
}

// Payload Đặt hàng (Checkout)
export interface CreateOrderPayload {
  cartItemIds?: number[];
  shippingAddressId?: number;
  shippingAddress?: {
    receiverName: string;
    receiverPhone: string;
    province: string;
    district: string;
    ward: string;
    detailAddress: string;
  };
  paymentMethod: PaymentMethod; //[cite: 1, 2]
  shippingMethod?: string;
  customerNote?: string;
  voucherCode?: string;
  pointUsed?: number;
}

// Payload Admin đổi trạng thái đơn
export interface UpdateOrderStatusPayload {
  status: OrderStatus; //[cite: 1, 2]
}
```

# src\types\catalog.ts

| Property | Value |
|----------|-------|
| Path | `src\types\catalog.ts` |
| Size | 2,917 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 13:50:40.716679 |

```typescript
import { ProductStatus } from './enums'; //[cite: 1, 2]

export interface Language {
  id: string; // 'vi' | 'en'
  name: string;
  isDefault: boolean;
}

export interface CategoryTranslation {
  id: number;
  categoryId: number;
  languageId: string;
  name: string;
  description?: string | null;
}

export interface Category {
  id: number;
  defaultName: string;
  iconUrl?: string | null;
  isVisible: boolean;
  parentId?: number | null;
  parent?: Category | null;
  children?: Category[];
  translations?: CategoryTranslation[];
}

export interface Brand {
  id: number;
  defaultName: string;
  logoUrl?: string | null;
  translations?: Array<{
    languageId: string;
    name: string;
    description?: string | null;
  }>;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Attribute {
  id: number;
  name: string; // Ví dụ: "Màu sắc", "Size"
  values?: AttributeValue[];
}

export interface AttributeValue {
  id: number;
  attributeId: number;
  value: string; // Ví dụ: "Đỏ", "XL"
  attribute?: Attribute;
}

export interface ProductVariant {
  id: number;
  productId: number;
  sku: string;
  stockQuantity: number;
  originalPrice: number | string;
  sellingPrice: number | string;
  weightGram: number;
  imageUrl?: string | null;
  attributeValues: Array<{
    id: number;
    value: string;
    attribute: {
      id: number;
      name: string;
    };
  }>;
  flashSaleItems?: Array<{
    flashSalePrice: number | string;
    promoQuantity: number;
    soldQuantity: number;
    campaign: {
      isActive: boolean;
      startTime: string;
      endTime: string;
    };
  }>;
}

export interface ProductImage {
  id: number;
  productId: number;
  imageUrl: string;
  displayOrder: number;
}

export interface ProductTranslation {
  id: number;
  productId: number;
  languageId: string;
  name: string;
  shortDesc?: string | null;
  detailDesc?: string | null;
}

export interface Product {
  id: number;
  defaultName: string;
  thumbnailUrl?: string | null;
  status: ProductStatus; //[cite: 1, 2]
  categoryId: number;
  brandId?: number | null;
  category?: Category;
  brand?: Brand | null;
  images?: ProductImage[];
  variants?: ProductVariant[];
  translations?: ProductTranslation[];
  tags?: Tag[];
  createdAt: string;
}

// Payload đồng bộ Ma trận Biến thể (Pessimistic Sync)
export interface SyncVariantsPayload {
  productId: number;
  attributes: Array<{
    name: string;
    options: string[];
  }>;
  variants: Array<{
    id?: number | null;
    sku: string;
    originalPrice: number;
    sellingPrice: number;
    stockQuantity: number;
    weightGram: number;
    imageUrl?: string | null;
    attributeValues: Array<{
      attributeName: string;
      value: string;
    }>;
  }>;
}
```

# src\types\common.ts

| Property | Value |
|----------|-------|
| Path | `src\types\common.ts` |
| Size | 751 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 13:50:02.904926 |

```typescript
// Khung phản hồi API chuẩn từ Express server
export interface ApiResponse<T = any> {
  statusCode: number;
  message?: string;
  data: T;
  success?: boolean;
}

// Khung phân trang chuẩn (Pagination metadata)
export interface PaginatedResult<T> {
  data: T[];
  totalItems: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Tham số Query phân trang cơ sở
export interface BasePaginationQuery {
  page?: number;
  limit?: number;
  search?: string;
  lang?: string;
}

// Cấu trúc lỗi trả về từ Validation Pipe (Zod / Express errorFilter)
export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  errors?: Record<string, string[]>;
  stack?: string;
}
```

# src\types\enums.ts

| Property | Value |
|----------|-------|
| Path | `src\types\enums.ts` |
| Size | 1,620 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 13:49:50.550717 |

```typescript
// Trạng thái người dùng
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'BLOCKED'; //[cite: 1, 2]

// Loại mã xác thực OTP
export type VerificationCodeType = 'REGISTER' | 'FORGOT_PASSWORD' | 'LOGIN' | 'DISABLE_2FA'; //[cite: 1, 2]

// Trạng thái mở bán của sản phẩm
export type ProductStatus = 'DRAFT' | 'PUBLISHED' | 'OUT_OF_STOCK' | 'ARCHIVED'; //[cite: 1, 2]

// Loại biến động kho hàng
export type InventoryTransType = 'IMPORT' | 'EXPORT_ORDER' | 'RETURN_INBOUND' | 'ADJUSTMENT'; //[cite: 1, 2]

// Phương thức thanh toán được hỗ trợ
export type PaymentMethod = 'COD' | 'VNPAY' | 'MOMO' | 'BANK_TRANSFER'; //[cite: 1, 2]

// Trạng thái thanh toán của hóa đơn
export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED'; //[cite: 1, 2]

// Vòng đời trạng thái đơn hàng
export type OrderStatus = 
  | 'PENDING_PAYMENT' 
  | 'CONFIRMED' 
  | 'PROCESSING' 
  | 'SHIPPED' 
  | 'DELIVERED' 
  | 'CANCELLED' 
  | 'RETURNED'; //[cite: 1, 2]

// Tiến trình vận đơn của đối tác giao hàng
export type ShipmentStatus = 'PENDING' | 'PICKED_UP' | 'IN_TRANSIT' | 'DELIVERED' | 'FAILED'; //[cite: 1, 2]

// Trạng thái duyệt khiếu nại đổi trả
export type ReturnStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED'; //[cite: 1, 2]

// Cách thức giảm giá của Voucher
export type DiscountType = 'PERCENTAGE' | 'FIXED_AMOUNT'; //[cite: 1, 2]

// Biến động điểm thưởng thành viên
export type PointTransType = 'EARN' | 'REDEEM' | 'REFUND' | 'EXPIRE'; //[cite: 1, 2]
```

# src\types\fulfillment.ts

| Property | Value |
|----------|-------|
| Path | `src\types\fulfillment.ts` |
| Size | 1,713 bytes |
| Extension | `.ts` |
| Modified | 2026-10-02 13:51:16.158673 |

```typescript
import { ShipmentStatus, PaymentStatus, ReturnStatus } from './enums'; //[cite: 1, 2]
import { OrderItem } from './cart-order';

export interface Shipment {
  id: number;
  orderId: number;
  carrier: string;
  trackingCode: string;
  actualShippingFee: number | string;
  status: ShipmentStatus; //[cite: 1, 2]
  estimatedDelivery?: string | null;
  createdAt: string;
  order?: {
    orderCode: string;
    receiverName: string;
    receiverPhone: string;
  };
}

export interface PaymentTransaction {
  id: number;
  orderId: number;
  provider: string;
  providerTransId: string;
  amount: number | string;
  status: PaymentStatus; //[cite: 1, 2]
  createdAt: string;
  order?: {
    orderCode: string;
    totalAmount: number | string;
    paymentMethod: string;
  };
}

export interface ReturnMedia {
  id: number;
  returnRequestId: number;
  mediaUrl: string;
  mediaType: string;
}

export interface ReturnRequest {
  id: number;
  orderItemId: number;
  quantity: number;
  reason: string;
  description?: string | null;
  status: ReturnStatus; //[cite: 1, 2]
  createdAt: string;
  orderItem?: OrderItem;
  medias?: ReturnMedia[];
}

// Payload tạo đơn vận chuyển (Admin)
export interface CreateShipmentPayload {
  orderId: number;
  carrier: string;
  trackingCode: string;
  actualShippingFee: number;
  status?: ShipmentStatus; //[cite: 1, 2]
  estimatedDelivery?: string;
}

// Payload khách gửi yêu cầu hoàn trả
export interface CreateReturnPayload {
  orderItemId: number;
  quantity: number;
  reason: string;
  description?: string;
  medias?: Array<{
    mediaUrl: string;
    mediaType: string;
  }>;
}
```

# src\types\index.ts

| Property | Value |
|----------|-------|
| Path | `src\types\index.ts` |
| Size | 237 bytes |
| Extension | `.ts` |
| Modified | 2026-10-05 20:42:08.954906 |

```typescript
export * from './enums';
export * from './common';
export * from './auth';
export * from './catalog';
export * from './cart-order';
export * from './fulfillment';
export * from './loyalty-engage';
export * from './inventory-sale';
```

# src\types\inventory-sale.ts

| Property | Value |
|----------|-------|
| Path | `src\types\inventory-sale.ts` |
| Size | 1,364 bytes |
| Extension | `.ts` |
| Modified | 2026-10-05 20:42:08.956148 |

```typescript
import { BasePaginationQuery } from './common';

export interface FlashSaleItemVariant {
  sku: string;
  stockQuantity: number;
  originalPrice: number | string;
  sellingPrice: number | string;
  product?: {
    defaultName: string;
  };
}

export interface FlashSaleItem {
  id: number;
  campaignId: number;
  variantId: number;
  flashSalePrice: number | string;
  promoQuantity: number;
  soldQuantity: number;
  variant?: FlashSaleItemVariant;
}

export interface FlashSaleCampaign {
  id: number;
  name: string;
  bannerUrl?: string | null;
  startTime: string;
  endTime: string;
  isActive: boolean;
  items?: FlashSaleItem[];
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export interface FlashSaleItemPayload {
  variantId: number;
  flashSalePrice: number;
  promoQuantity: number;
}

export interface CreateFlashSaleInput {
  name: string;
  bannerUrl?: string;
  startTime: string | Date;
  endTime: string | Date;
  isActive?: boolean;
  items: FlashSaleItemPayload[];
}

export interface UpdateFlashSaleInput {
  name?: string;
  bannerUrl?: string;
  startTime?: string | Date;
  endTime?: string | Date;
  isActive?: boolean;
  items?: FlashSaleItemPayload[];
}

export interface GetFlashSaleQuery extends BasePaginationQuery {
  isActive?: boolean;
}

```

# src\types\loyalty-engage.ts

| Property | Value |
|----------|-------|
| Path | `src\types\loyalty-engage.ts` |
| Size | 1,442 bytes |
| Extension | `.ts` |
| Modified | 2026-10-05 20:42:08.958901 |

```typescript
import { DiscountType, PointTransType } from './enums'; //[cite: 1, 2]
import { UserProfile } from './auth';
import { Product } from './catalog';

export type { FlashSaleItem, FlashSaleCampaign } from './inventory-sale';

export interface Voucher {
  id: number;
  code: string;
  discountType: DiscountType; //[cite: 1, 2]
  discountValue: number | string;
  minOrderValue: number | string;
  maxDiscountAmt?: number | string | null;
  totalUsageLimit: number;
  usedCount: number;
  userUsageLimit: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface PointTransaction {
  id: number;
  userId: number;
  orderId?: number | null;
  pointChange: number;
  currentPoint: number;
  transactionType: PointTransType; //[cite: 1, 2]
  description: string;
  createdAt: string;
}

export interface ProductReview {
  id: number;
  productId: number;
  userId: number;
  orderId?: number | null;
  rating: number; // 1-5
  content: string;
  shopReply?: string | null;
  updateCount: number;
  isHidden: boolean;
  createdAt: string;
  user?: UserProfile;
  product?: Product;
  medias?: Array<{
    id: number;
    mediaUrl: string;
    mediaType: string;
  }>;
}

export interface ChatMessage {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  attachmentUrl?: string | null;
  readAt?: string | null;
  createdAt: string;
}
```

# tsconfig.json

| Property | Value |
|----------|-------|
| Path | `tsconfig.json` |
| Size | 704 bytes |
| Extension | `.json` |
| Modified | 2026-09-29 13:25:28.331981 |

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}

```

