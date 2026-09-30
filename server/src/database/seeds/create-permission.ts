import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// 1. Danh sách Permissions chuẩn theo các Module của dự án
const PERMISSIONS = [
  // --- MODULE: IDENTITY (User, Role, Permission) ---
  { code: 'USER:VIEW', module: 'IDENTITY', description: 'Xem danh sách và chi tiết người dùng' },
  { code: 'USER:UPDATE', module: 'IDENTITY', description: 'Cập nhật thông tin người dùng' },
  { code: 'USER:STATUS_UPDATE', module: 'IDENTITY', description: 'Khóa / Mở khóa tài khoản người dùng' },
  { code: 'USER:DELETE', module: 'IDENTITY', description: 'Xóa người dùng' },

  { code: 'ROLE:VIEW', module: 'IDENTITY', description: 'Xem danh sách và chi tiết vai trò' },
  { code: 'ROLE:CREATE', module: 'IDENTITY', description: 'Tạo vai trò mới' },
  { code: 'ROLE:UPDATE', module: 'IDENTITY', description: 'Cập nhật vai trò và gán quyền' },
  { code: 'ROLE:DELETE', module: 'IDENTITY', description: 'Xóa vai trò' },

  { code: 'PERMISSION:VIEW', module: 'IDENTITY', description: 'Xem danh sách quyền hệ thống' },
  { code: 'PERMISSION:CREATE', module: 'IDENTITY', description: 'Tạo quyền hệ thống mới' },
  { code: 'PERMISSION:UPDATE', module: 'IDENTITY', description: 'Cập nhật quyền hệ thống' },
  { code: 'PERMISSION:DELETE', module: 'IDENTITY', description: 'Xóa quyền hệ thống' },

  // --- MODULE: CATALOG (Category, Brand, Product, Variant, Tag) ---
  { code: 'CATEGORY:VIEW', module: 'CATALOG', description: 'Xem danh mục sản phẩm' },
  { code: 'CATEGORY:CREATE', module: 'CATALOG', description: 'Tạo danh mục sản phẩm' },
  { code: 'CATEGORY:UPDATE', module: 'CATALOG', description: 'Cập nhật danh mục sản phẩm' },
  { code: 'CATEGORY:DELETE', module: 'CATALOG', description: 'Xóa danh mục sản phẩm' },

  { code: 'BRAND:VIEW', module: 'CATALOG', description: 'Xem thương hiệu' },
  { code: 'BRAND:CREATE', module: 'CATALOG', description: 'Tạo thương hiệu' },
  { code: 'BRAND:UPDATE', module: 'CATALOG', description: 'Cập nhật thương hiệu' },
  { code: 'BRAND:DELETE', module: 'CATALOG', description: 'Xóa thương hiệu' },

  { code: 'PRODUCT:VIEW', module: 'CATALOG', description: 'Xem sản phẩm' },
  { code: 'PRODUCT:CREATE', module: 'CATALOG', description: 'Tạo sản phẩm mới' },
  { code: 'PRODUCT:UPDATE', module: 'CATALOG', description: 'Cập nhật thông tin sản phẩm' },
  { code: 'PRODUCT:DELETE', module: 'CATALOG', description: 'Xóa sản phẩm' },

  { code: 'VARIANT:MANAGE', module: 'CATALOG', description: 'Đồng bộ và quản lý biến thể, thuộc tính' },

  { code: 'TAG:MANAGE', module: 'CATALOG', description: 'Quản lý thẻ tag sản phẩm' },
  { code: 'LANGUAGE:MANAGE', module: 'CATALOG', description: 'Quản lý ngôn ngữ và bản dịch' },

  // --- MODULE: CART & ORDER ---
  { code: 'ORDER:VIEW', module: 'CART_ORDER', description: 'Xem danh sách và chi tiết đơn hàng' },
  { code: 'ORDER:CREATE', module: 'CART_ORDER', description: 'Tạo đơn hàng mới' },
  { code: 'ORDER:CANCEL', module: 'CART_ORDER', description: 'Hủy đơn hàng' },
  { code: 'ORDER:STATUS_UPDATE', module: 'CART_ORDER', description: 'Cập nhật trạng thái đơn hàng (Duyệt, Giao hàng)' },

  // --- MODULE: INVENTORY & SALE ---
  { code: 'INVENTORY:VIEW', module: 'INVENTORY_SALE', description: 'Xem lịch sử biến động và tồn kho' },
  { code: 'INVENTORY:ADJUST', module: 'INVENTORY_SALE', description: 'Điều chỉnh nhập/xuất tồn kho thủ công' },

  { code: 'FLASH_SALE:VIEW', module: 'INVENTORY_SALE', description: 'Xem danh sách chiến dịch Flash Sale' },
  { code: 'FLASH_SALE:CREATE', module: 'INVENTORY_SALE', description: 'Tạo chiến dịch Flash Sale' },
  { code: 'FLASH_SALE:UPDATE', module: 'INVENTORY_SALE', description: 'Cập nhật chiến dịch Flash Sale' },
  { code: 'FLASH_SALE:DELETE', module: 'INVENTORY_SALE', description: 'Xóa chiến dịch Flash Sale' },

  // --- MODULE: FULFILLMENT (Shipment, Payment, Return) ---
  { code: 'SHIPMENT:VIEW', module: 'FULFILLMENT', description: 'Tra cứu thông tin vận chuyển đơn hàng' },
  { code: 'SHIPMENT:MANAGE', module: 'FULFILLMENT', description: 'Tạo, cập nhật trạng thái lô hàng vận chuyển' },

  { code: 'PAYMENT:VIEW', module: 'FULFILLMENT', description: 'Xem lịch sử giao dịch thanh toán' },

  { code: 'RETURN:VIEW', module: 'FULFILLMENT', description: 'Xem danh sách yêu cầu đổi trả' },
  { code: 'RETURN:CREATE', module: 'FULFILLMENT', description: 'Tạo yêu cầu đổi trả hàng' },
  { code: 'RETURN:UPDATE', module: 'FULFILLMENT', description: 'Duyệt hoặc từ chối yêu cầu đổi trả hàng' },

  // --- MODULE: LOYALTY & ENGAGE (Voucher, Point, Review, Chat) ---
  { code: 'VOUCHER:VIEW', module: 'LOYALTY_ENGAGE', description: 'Xem danh sách mã giảm giá' },
  { code: 'VOUCHER:CREATE', module: 'LOYALTY_ENGAGE', description: 'Tạo mã giảm giá mới' },
  { code: 'VOUCHER:UPDATE', module: 'LOYALTY_ENGAGE', description: 'Cập nhật mã giảm giá' },
  { code: 'VOUCHER:DELETE', module: 'LOYALTY_ENGAGE', description: 'Xóa mã giảm giá' },

  { code: 'POINT:VIEW', module: 'LOYALTY_ENGAGE', description: 'Xem lịch sử tích và dùng điểm thưởng' },
  { code: 'POINT:MANAGE', module: 'LOYALTY_ENGAGE', description: 'Cộng hoặc trừ điểm thưởng thủ công' },

  { code: 'REVIEW:VIEW', module: 'LOYALTY_ENGAGE', description: 'Xem đánh giá sản phẩm' },
  { code: 'REVIEW:CREATE', module: 'LOYALTY_ENGAGE', description: 'Đánh giá sản phẩm đã mua' },
  { code: 'REVIEW:REPLY', module: 'LOYALTY_ENGAGE', description: 'Phản hồi đánh giá của khách hàng' },
  { code: 'REVIEW:HIDE', module: 'LOYALTY_ENGAGE', description: 'Ẩn đánh giá vi phạm' },

  { code: 'CHAT:ACCESS', module: 'LOYALTY_ENGAGE', description: 'Tham gia nhắn tin tư vấn trực tiếp' },
]

async function main() {
  console.log('⏳ Bắt đầu quá trình seed Role & Permission...')

  // 1. Khởi tạo/Cập nhật toàn bộ Permission (Upsert)
  const upsertedPermissions = []
  for (const perm of PERMISSIONS) {
    const p = await prisma.permission.upsert({
      where: { code: perm.code },
      update: {
        module: perm.module,
        description: perm.description,
        deletedAt: null,
      },
      create: {
        code: perm.code,
        module: perm.module,
        description: perm.description,
      },
    })
    upsertedPermissions.push(p)
  }
  console.log(`✅ Đã đồng bộ ${upsertedPermissions.length} permissions vào Database.`)

  // 2. Tạo hoặc Cập nhật Role: ADMIN (Toàn quyền)
  const adminRole = await prisma.role.upsert({
    where: { code: 'ADMIN' },
    update: {
      name: 'Quản trị viên tối cao',
      isActive: true,
      deletedAt: null,
      permissions: {
        set: upsertedPermissions.map((p) => ({ id: p.id })),
      },
    },
    create: {
      code: 'ADMIN',
      name: 'Quản trị viên tối cao',
      isActive: true,
      permissions: {
        connect: upsertedPermissions.map((p) => ({ id: p.id })),
      },
    },
  })
  console.log(`✅ Đã gán ${upsertedPermissions.length} quyền cho Role: ADMIN (ID: ${adminRole.id})`)

  // 3. Tạo hoặc Cập nhật Role: STAFF (Nhân viên vận hành & bán hàng)
  const staffPermissions = upsertedPermissions.filter((p) => {
    // Staff không có quyền quản lý Phân quyền (ROLE, PERMISSION) và xóa Người dùng
    const forbiddenCodes = [
      'ROLE:CREATE', 'ROLE:UPDATE', 'ROLE:DELETE',
      'PERMISSION:CREATE', 'PERMISSION:UPDATE', 'PERMISSION:DELETE',
      'USER:DELETE',
    ]
    return !forbiddenCodes.includes(p.code)
  })

  const staffRole = await prisma.role.upsert({
    where: { code: 'STAFF' },
    update: {
      name: 'Nhân viên quản lý cửa hàng',
      isActive: true,
      deletedAt: null,
      permissions: {
        set: staffPermissions.map((p) => ({ id: p.id })),
      },
    },
    create: {
      code: 'STAFF',
      name: 'Nhân viên quản lý cửa hàng',
      isActive: true,
      permissions: {
        connect: staffPermissions.map((p) => ({ id: p.id })),
      },
    },
  })
  console.log(`✅ Đã gán ${staffPermissions.length} quyền cho Role: STAFF (ID: ${staffRole.id})`)

  // 4. Tạo hoặc Cập nhật Role: CUSTOMER (Khách hàng thông thường)
  const customerAllowedCodes = [
    'PRODUCT:VIEW',
    'CATEGORY:VIEW',
    'BRAND:VIEW',
    'ORDER:CREATE',
    'ORDER:VIEW',
    'ORDER:CANCEL',
    'FLASH_SALE:VIEW',
    'VOUCHER:VIEW',
    'POINT:VIEW',
    'REVIEW:VIEW',
    'REVIEW:CREATE',
    'RETURN:CREATE',
    'CHAT:ACCESS',
  ]
  const customerPermissions = upsertedPermissions.filter((p) =>
    customerAllowedCodes.includes(p.code)
  )

  const customerRole = await prisma.role.upsert({
    where: { code: 'CUSTOMER' },
    update: {
      name: 'Khách hàng',
      isActive: true,
      deletedAt: null,
      permissions: {
        set: customerPermissions.map((p) => ({ id: p.id })),
      },
    },
    create: {
      code: 'CUSTOMER',
      name: 'Khách hàng',
      isActive: true,
      permissions: {
        connect: customerPermissions.map((p) => ({ id: p.id })),
      },
    },
  })
  console.log(`✅ Đã gán ${customerPermissions.length} quyền cho Role: CUSTOMER (ID: ${customerRole.id})`)

  console.log('🎉 Quá trình Seed phân quyền hoàn tất thành công!')
}

main()
  .catch((e) => {
    console.error('❌ Lỗi khi thực thi Seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })