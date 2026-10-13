# Fashion E-Commerce

Nền tảng thương mại điện tử thời trang gồm storefront cho khách hàng và hệ thống quản trị cửa hàng. Dự án được tổ chức theo mô hình frontend/backend tách biệt trong cùng một repository.

> Dự án đang trong quá trình phát triển. Các tính năng gửi email, lưu trữ S3 và thanh toán SePay cần được cấu hình trước khi sử dụng.

## Tính năng

### Khách hàng

- Đăng ký, đăng nhập, xác thực tài khoản và khôi phục mật khẩu.
- Quản lý hồ sơ, bảo mật tài khoản và địa chỉ giao hàng.
- Duyệt, tìm kiếm và lọc sản phẩm theo danh mục, thương hiệu, thẻ và biến thể.
- Quản lý giỏ hàng cho khách vãng lai và người dùng đã đăng nhập.
- Đặt hàng, thanh toán, theo dõi trạng thái và xem lịch sử đơn hàng.
- Sử dụng voucher, tích lũy và đổi điểm thưởng.
- Gửi yêu cầu đổi trả, đánh giá sản phẩm và trò chuyện trực tuyến.
- Theo dõi các chương trình Flash Sale.

### Quản trị viên và nhân viên

- Dashboard tổng quan và quản lý đơn hàng.
- Quản lý sản phẩm, biến thể, thuộc tính, danh mục, thương hiệu và thẻ.
- Quản lý tồn kho, nhập kho và lịch sử biến động tồn kho.
- Quản lý thanh toán, vận chuyển, đổi trả, voucher và Flash Sale.
- Quản lý người dùng, vai trò và quyền truy cập theo RBAC.
- Kiểm duyệt đánh giá và hỗ trợ khách hàng qua hệ thống chat.

## Công nghệ

| Khu vực | Công nghệ |
| --- | --- |
| Frontend | Next.js 16, React 19, TypeScript |
| UI | Tailwind CSS 4, Base UI/shadcn, Lucide |
| Client state và API | TanStack Query, SWR, Zustand, Axios |
| Backend | Node.js, Express 4, TypeScript |
| Database | PostgreSQL, Prisma ORM 6 |
| Cache và realtime | Redis, Socket.IO, BullMQ |
| Xác thực và validation | JWT, bcrypt, Zod |
| Dịch vụ tích hợp | Nodemailer, AWS S3 SDK, SePay |

## Kiến trúc thư mục

```text
fashion-ecommerce/
├── client/                  # Ứng dụng Next.js
│   └── src/
│       ├── app/             # Storefront, tài khoản và trang quản trị
│       ├── api/             # API client và endpoint
│       ├── components/      # Layout, provider và UI dùng chung
│       ├── modules/         # Các module nghiệp vụ phía frontend
│       └── types/           # Kiểu dữ liệu TypeScript
├── server/                  # REST API Express
│   ├── prisma/              # Schema và migration
│   └── src/
│       ├── modules/         # Các module nghiệp vụ phía backend
│       ├── middlewares/     # Guard, pipe, filter và interceptor
│       ├── database/        # Prisma, Redis và seed
│       ├── queues/          # Tác vụ nền
│       └── sockets/         # Socket.IO
├── docker-compose.yml       # PostgreSQL và Redis cho local
└── package.json             # Script dùng chung ở root
```

## Yêu cầu môi trường

- Node.js `20.9+` và npm.
- Docker Desktop và Docker Compose.
- Gmail App Password nếu cần gửi email.
- Tài khoản SePay và thông tin S3 nếu cần sử dụng các tích hợp tương ứng.

## Cài đặt

### 1. Khởi động dịch vụ nền

Từ thư mục gốc:

```bash
docker compose up -d postgres redis
```

Docker Compose cung cấp:

| Dịch vụ | Địa chỉ | Thông tin mặc định |
| --- | --- | --- |
| PostgreSQL 15 | `localhost:5432` | Database `fashion_ecommerce`, user `postgres`, password `your_password` |
| Redis 7 | `localhost:6379` | Không yêu cầu mật khẩu |

Không dùng các thông tin mặc định này trong production.

### 2. Cấu hình backend

Sao chép file mẫu:

```bash
# macOS / Linux
cp server/.env.example server/.env
```

```powershell
# Windows PowerShell
Copy-Item server/.env.example server/.env
```

Tối thiểu, kiểm tra các biến sau trong `server/.env`:

```dotenv
NODE_ENV=dev
PORT=3000
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/fashion_ecommerce?schema=public"
REDIS_URL="redis://localhost:6379"
ACCESS_TOKEN_SECRET="change-this-access-secret"
REFRESH_TOKEN_SECRET="change-this-refresh-secret"
MAIL_USER="your_email@gmail.com"
MAIL_PASS=""
```

Giữ nguyên các biến `SEPAY_*` và `S3_*` nếu chưa dùng thanh toán hoặc lưu trữ file. Hãy thay toàn bộ secret mẫu trước khi triển khai.

### 3. Cài dependencies

```bash
npm --prefix server install
npm --prefix client install
```

### 4. Khởi tạo database

```bash
cd server
npx prisma generate
npx prisma migrate dev
npx prisma db seed
cd ..
```

Lệnh seed mặc định đồng bộ quyền và các vai trò cơ bản. File `server/src/database/seeds/seed.js` là script tạo dữ liệu mẫu riêng và có thể xóa dữ liệu hiện có; chỉ chạy script này trên database thử nghiệm.

## Chạy dự án

Mở hai terminal tại thư mục gốc.

**Terminal 1: backend**

```bash
npm run dev:server
```

Backend chạy tại `http://localhost:3000`.

**Terminal 2: frontend**

```bash
npm run dev:client -- --port 3001
```

Frontend chạy tại `http://localhost:3001` và gọi API tại `http://localhost:3000/api/v1`.

Các địa chỉ kiểm tra nhanh:

- Website: [http://localhost:3001](http://localhost:3001)
- Health check: [http://localhost:3000/health](http://localhost:3000/health)
- Trang quản trị: [http://localhost:3001/admin/dashboard](http://localhost:3001/admin/dashboard)

Có thể chạy cả hai service bằng một lệnh:

```bash
npm run dev
```

Nếu script này không tìm thấy `concurrently`, cài package ở root hoặc tiếp tục dùng hai terminal như hướng dẫn trên.

## Các lệnh thường dùng

| Lệnh | Mục đích |
| --- | --- |
| `npm run dev:server` | Chạy backend ở chế độ phát triển |
| `npm run dev:client` | Chạy frontend ở chế độ phát triển |
| `npm run build` | Build lần lượt backend và frontend |
| `npm run build:server` | Build backend TypeScript |
| `npm run build:client` | Build frontend Next.js |
| `npm run prisma:generate` | Sinh Prisma Client |
| `npm run prisma:push` | Đồng bộ schema bằng `prisma db push` |
| `npm run prisma:seed` | Seed quyền và vai trò |

### Backend

```bash
cd server
npm run dev
npm run build
npm start
npx prisma migrate dev
```

### Frontend

```bash
cd client
npm run dev
npm run build
npm start
npm run lint
npm run format:check
```

## API và tích hợp

API chính sử dụng tiền tố `/api/v1`:

| Nhóm | Phạm vi |
| --- | --- |
| `/identity` | Tài khoản, người dùng, địa chỉ, vai trò và quyền |
| `/catalog` | Sản phẩm, danh mục, thương hiệu, thẻ và biến thể |
| `/cart-order` | Giỏ hàng và đơn hàng |
| `/inventory-sale` | Tồn kho và Flash Sale |
| `/fulfillment` | Thanh toán, vận chuyển và đổi trả |
| `/loyalty-engage` | Voucher, điểm thưởng, đánh giá và chat |

Webhook thanh toán SePay được tiếp nhận tại:

```text
/api/v1/fulfillment/payments/webhook/sepay
```

Để kiểm thử webhook local, có thể dùng ngrok:

```bash
npx ngrok config add-authtoken <TOKEN_CUA_BAN>
npx ngrok http 3000
```

## Các mục liên quan

- [Schema Prisma](server/prisma/schema.prisma)
- [Mẫu biến môi trường](server/.env.example)
- [Khởi tạo ứng dụng backend](server/src/app.ts)
- [Điểm khởi chạy backend](server/src/server.ts)
- [Danh sách endpoint frontend](client/src/api/endpoints.ts)
