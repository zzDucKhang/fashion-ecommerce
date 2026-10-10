# ==========================================
# GIAI ĐOẠN 1: BUILD (Chuẩn bị và biên dịch)
# ==========================================
FROM node:20-alpine AS builder

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy các tệp cấu hình package
COPY package*.json ./
COPY tsconfig.json ./

# Cài đặt toàn bộ dependencies (bao gồm devDependencies để build)
RUN npm ci

# Copy mã nguồn và schema Prisma
COPY src/ ./src/
COPY prisma/ ./prisma/

# Generate Prisma Client
RUN npx prisma generate

# Build mã nguồn TypeScript ra JavaScript
RUN npm run build

# ==========================================
# GIAI ĐOẠN 2: PRODUCTION (Chạy ứng dụng)
# ==========================================
FROM node:20-alpine AS runner

WORKDIR /app

# Thiết lập NODE_ENV
ENV NODE_ENV=production

# Copy package*.json để cài dependencies
COPY package*.json ./

# Chỉ cài production dependencies (tối ưu kích thước image)
RUN npm ci --omit=dev

# Copy thư mục build từ stage builder
COPY --from=builder /app/dist ./dist

# Copy Prisma schema và engine từ builder
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Non-root user để tăng bảo mật (DevSecOps)
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs
USER nodejs

# Expose port (nên trùng với biến môi trường PORT)
EXPOSE 3000

# Khởi chạy server
CMD ["node", "dist/server.js"]
