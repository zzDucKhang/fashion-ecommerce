# PROJECT SCOPE & BOUNDARY INVARIANTS: LOYALTY & ENGAGEMENT

## 1. Nguyên Tắc Cốt Lõi (Core Directive)
Từ thời điểm này cho đến khi dự án hoàn thành, toàn bộ trọng tâm công việc CHỈ XOAY QUANH 3 dịch vụ thuộc module Loyalty & Engagement:
- **Point Service** (`point`): Tích điểm, tiêu điểm, lịch sử biến động điểm thưởng (`PointTransaction`).
- **Review Service** (`review`): Đánh giá sản phẩm, quản lý media đánh giá (`ReviewMedia`), duyệt và phản hồi đánh giá.
- **Voucher Service** (`voucher`): Mã giảm giá, kiểm tra tính hợp lệ đơn hàng, tính số tiền chiết khấu, giới hạn lượt dùng.

---

## 2. Quy Tắc Luồng Dữ Liệu & Ranh Giới (Data Flow & State Invariants)
1. **Giao tiếp chéo (Cross-Module Communication):**
   - Các service `point`, `review`, `voucher` **TUYỆT ĐỐI KHÔNG** gọi HTTP API nội bộ.
   - Mọi thao tác cập nhật đồng bộ liên module (ví dụ: cộng điểm sau khi hoàn tất đơn hàng, trừ điểm khi thanh toán) **BẮT BUỘC** phải sử dụng `prisma.$transaction` để bảo toàn tính toán vẹn ACID.
2. **Voucher Concurrency Architecture:**
   - Cập nhật Voucher phải đi qua **Redis Atomic Counters** trước (sử dụng thư viện `ioredis`) để chống tranh chấp/oversell ở tải cao.
   - Sau đó mới đồng bộ dữ liệu xuống PostgreSQL.
   - Định kỳ đối soát lệch số liệu (reconciliation) thông qua Cronjob hàng đêm (`startVoucherReconciliationCron`).
3. **Ranh giới Khóa Ngoại & Snapshot (Foreign Keys & Reference Boundaries):**
   - `point` và `review` liên kết trực tiếp với `userId` từ module `identity` (FK) và `orderId` từ module `cart-order` (FK).
   - `voucher` **LƯU DƯỚI DẠNG SNAPSHOT** vào bảng `Order` (`voucherCode` và `voucherDiscount`).
   - Kiểm tra giới hạn lượt dùng Voucher của User bằng cách đếm động: `count(Order.voucherCode = code AND userId = :userId)`.
   - **TUYỆT ĐỐI KHÔNG** tạo thêm Foreign Key vật lý từ bảng `Voucher` sang bảng `Order`.

---

## 3. Phân Định Quyền Hạn Thư Mục (Directory Boundary Matrix)

| Khu vực | Đường dẫn thư mục | Quyền hạn | Quy tắc thực thi |
| :--- | :--- | :---: | :--- |
| **Backend Loyalty Core** | `server/src/modules/loyalty-engage/point/`<br>`server/src/modules/loyalty-engage/review/`<br>`server/src/modules/loyalty-engage/voucher/`<br>`server/src/modules/loyalty-engage/loyalty-engage.routes.ts` | **READ-WRITE** | Được phép tạo mới, refactor, sửa logic nghiệp vụ, thêm API endpoints, tối ưu query và viết test. |
| **Backend Các module khác** | `server/src/modules/identity/`<br>`server/src/modules/catalog/`<br>`server/src/modules/cart-order/`<br>`server/src/modules/inventory-sale/`<br>`server/src/modules/fulfillment/`<br>`server/src/modules/loyalty-engage/chat/` | **STRICTLY READ-ONLY** | **TUYỆT ĐỐI KHÔNG ĐƯỢC SỬA CODE.** Chỉ được phép đọc để tham chiếu kiểu dữ liệu (`interface`, `type`), enum, hằng số hoặc kiểm tra interface liên kết. |
| **Frontend Loyalty Module** | `client/src/modules/loyalty-engage/` | **READ-WRITE** | Toàn quyền phát triển components, hooks, state, và API client phục vụ Point, Review, Voucher. |
| **Frontend UI Tích Hợp** | Các file trang/component hiển thị liên quan trực tiếp (như khối đánh giá trên Product Detail, ô nhập Voucher trên Checkout, trang Lịch sử điểm/Voucher trong User Profile) | **LIMITED WRITE** | Chỉ sửa đúng phần component giao diện và hook liên quan đến 3 tính năng này. Tuyệt đối không thay đổi cấu trúc luồng chính của Checkout hay Auth. |
| **Database Schema & Migrations** | `server/prisma/` hoặc schema database | **CONTROLLED WRITE** | Chỉ được phép thêm/sửa đổi bảng và trường liên quan trực tiếp đến `PointTransaction`, `ProductReview`, `ReviewMedia`, `Voucher`. Không tạo FK vật lý từ Voucher sang Order. |

---

## 4. Quy Trình Kiểm Định & Phòng Ngừa Vi Phạm (Verification & Rollback)
1. **Kiểm tra Blast-Radius:** Trước khi báo cáo hoàn thành bất kỳ task nào, agent BẮT BUỘC phải chạy `git status` và `git diff --name-only` để rà soát danh sách file bị thay đổi.
2. **Khôi phục ngay lập tức:** Nếu phát hiện bất kỳ file nào nằm ngoài phạm vi 3 service trên bị chỉnh sửa ngoài ý muốn, phải lập tức rollback file đó về trạng thái nguyên bản (`git checkout -- <file>`).
