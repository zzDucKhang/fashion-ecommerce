const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function safeDelete(modelName) {
  if (prisma[modelName] && typeof prisma[modelName].deleteMany === 'function') {
    await prisma[modelName].deleteMany();
  }
}

async function main() {
  console.log('🚀 Bắt đầu làm sạch dữ liệu cũ...');

  // 1. XÓA DỮ LIỆU CŨ THEO THỨ TỰ RÀNG BUỘC KHÓA NGOẠI
  await safeDelete('message');
  await safeDelete('chat');
  await safeDelete('reviewMedia');
  await safeDelete('productReview');
  await safeDelete('pointTransaction');
  await safeDelete('flashSaleItem');
  await safeDelete('flashSaleCampaign');
  await safeDelete('inventoryTransaction');
  await safeDelete('returnMedia');
  await safeDelete('returnRequest');
  await safeDelete('paymentTransaction');
  await safeDelete('shipment');
  await safeDelete('orderItem');
  await safeDelete('order');
  await safeDelete('cartItem');
  await safeDelete('cart');
  await safeDelete('productImage');
  await safeDelete('productVariant');
  await safeDelete('product');
  await safeDelete('voucher');
  await safeDelete('tag');
  await safeDelete('brand');
  await safeDelete('category');
  await safeDelete('deviceSession');
  await safeDelete('shippingAddress');
  await safeDelete('user');

  console.log('🧹 Đã xóa sạch dữ liệu cũ. Bắt đầu seed bộ dữ liệu khổng lồ chuẩn Production...\n');

  // ==========================================
  // BẢNG 1: ROLES & PERMISSIONS
  // ==========================================
  let adminRole = await prisma.role.findUnique({ where: { code: 'ADMIN' } });
  if (!adminRole) {
    adminRole = await prisma.role.create({
      data: { code: 'ADMIN', name: 'Quản trị viên tối cao', isActive: true },
    });
  }
  let staffRole = await prisma.role.findUnique({ where: { code: 'STAFF' } });
  if (!staffRole) {
    staffRole = await prisma.role.create({
      data: { code: 'STAFF', name: 'Nhân viên quản lý cửa hàng', isActive: true },
    });
  }
  let customerRole = await prisma.role.findUnique({ where: { code: 'CUSTOMER' } });
  if (!customerRole) {
    customerRole = await prisma.role.create({
      data: { code: 'CUSTOMER', name: 'Khách hàng', isActive: true },
    });
  }
  console.log(`✅ Roles sẵn sàng: ADMIN (${adminRole.id}), STAFF (${staffRole.id}), CUSTOMER (${customerRole.id})`);

  // ==========================================
  // BẢNG 2: USERS (10 tài khoản phong phú)
  // ==========================================
  const defaultPassword = bcrypt.hashSync('Password123@', 10);
  const usersData = [
    {
      fullName: 'Nguyễn Quản Trị',
      email: 'admin@fashion.com',
      phoneNumber: '0901000001',
      roleId: adminRole.id,
      status: 'ACTIVE',
      rewardPoints: 10000,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    {
      fullName: 'Trần Nhân Viên (CSKH)',
      email: 'staff@fashion.com',
      phoneNumber: '0901000002',
      roleId: staffRole.id,
      status: 'ACTIVE',
      rewardPoints: 1000,
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    {
      fullName: 'Hoàng Khách Hàng (VIP)',
      email: 'customer@fashion.com',
      phoneNumber: '0901000003',
      roleId: customerRole.id,
      status: 'ACTIVE',
      rewardPoints: 50000, // 50.000 điểm tương đương 50.000 VNĐ
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    },
    {
      fullName: 'Lê Thùy Dung (Gold Member)',
      email: 'customer2@fashion.com',
      phoneNumber: '0901000004',
      roleId: customerRole.id,
      status: 'ACTIVE',
      rewardPoints: 32000,
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    },
    {
      fullName: 'Vũ Minh Tuấn',
      email: 'tuan.vu@gmail.com',
      phoneNumber: '0901000005',
      roleId: customerRole.id,
      status: 'ACTIVE',
      rewardPoints: 18500,
      avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
    },
    {
      fullName: 'Phạm Phương Thảo',
      email: 'thao.pham@gmail.com',
      phoneNumber: '0901000006',
      roleId: customerRole.id,
      status: 'ACTIVE',
      rewardPoints: 12400,
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    },
    {
      fullName: 'Đặng Quốc Huy',
      email: 'huy.dang@gmail.com',
      phoneNumber: '0901000007',
      roleId: customerRole.id,
      status: 'ACTIVE',
      rewardPoints: 5000,
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    },
    {
      fullName: 'Ngô Mỹ Linh',
      email: 'linh.ngo@gmail.com',
      phoneNumber: '0901000008',
      roleId: customerRole.id,
      status: 'ACTIVE',
      rewardPoints: 7500,
      avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
    },
    {
      fullName: 'Bùi Đức Anh',
      email: 'ducanh.bui@gmail.com',
      phoneNumber: '0901000009',
      roleId: customerRole.id,
      status: 'ACTIVE',
      rewardPoints: 2000,
      avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    },
    {
      fullName: 'Trương Ánh Tuyết',
      email: 'tuyet.truong@gmail.com',
      phoneNumber: '0901000010',
      roleId: customerRole.id,
      status: 'ACTIVE',
      rewardPoints: 0,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
  ];

  const users = [];
  for (const u of usersData) {
    const item = await prisma.user.create({
      data: {
        ...u,
        passwordHash: defaultPassword,
      },
    });
    users.push(item);
  }
  console.log(`✅ Đã tạo ${users.length} tài khoản người dùng mẫu (Mật khẩu: Password123@)`);

  // ==========================================
  // BẢNG 3: ĐỊA CHỈ GIAO HÀNG (SHIPPING_ADDRESS)
  // ==========================================
  const addresses = [];
  for (let i = 0; i < users.length; i++) {
    const addr = await prisma.shippingAddress.create({
      data: {
        userId: users[i].id,
        receiverName: users[i].fullName,
        phoneNumber: users[i].phoneNumber,
        province: 'Thành phố Hồ Chí Minh',
        district: 'Quận 1',
        ward: 'Phường Bến Nghé',
        detailAddress: `${100 + i * 15} Đường Lê Lợi`,
        isDefault: true,
      },
    });
    addresses.push(addr);
  }
  console.log('✅ Đã tạo Địa chỉ giao hàng mặc định cho 10 người dùng');

  // ==========================================
  // BẢNG 4: DANH MỤC SẢN PHẨM (CATEGORY - 10 danh mục)
  // ==========================================
  const categoriesData = [
    { defaultName: 'Áo Nam', iconUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80', isVisible: true },
    { defaultName: 'Quần Nam', iconUrl: 'https://images.unsplash.com/photo-1506629905607-d9b1f1f3d7a8?auto=format&fit=crop&w=800&q=80', isVisible: true },
    { defaultName: 'Áo Nữ', iconUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80', isVisible: true },
    { defaultName: 'Váy & Đầm', iconUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80', isVisible: true },
    { defaultName: 'Áo Khoác & Blazer', iconUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80', isVisible: true },
    { defaultName: 'Đồ Thể Thao', iconUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80', isVisible: true },
    { defaultName: 'Phụ Kiện Thời Trang', iconUrl: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=800&q=80', isVisible: true },
    { defaultName: 'Giày & Dép', iconUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80', isVisible: true },
    { defaultName: 'Nón & Mũ', iconUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80', isVisible: true },
    { defaultName: 'Đồ Lót & Mặc Nhà', iconUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80', isVisible: true },
  ];

  const categories = [];
  for (const c of categoriesData) {
    const item = await prisma.category.create({ data: c });
    categories.push(item);
  }
  console.log('✅ Đã tạo 10 Danh mục sản phẩm');

  // ==========================================
  // BẢNG 5: THƯƠNG HIỆU (BRAND - 10 thương hiệu)
  // ==========================================
  const brandsData = [
    { defaultName: 'Morrow Studio', logoUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=300&q=80' },
    { defaultName: 'Form & Field', logoUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=300&q=80' },
    { defaultName: 'House of Common', logoUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=300&q=80' },
    { defaultName: 'Sunday Objects', logoUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=300&q=80' },
    { defaultName: 'Lumen Goods', logoUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=300&q=80' },
    { defaultName: 'Urban Minimal', logoUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=300&q=80' },
    { defaultName: 'Nordic Clean', logoUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=300&q=80' },
    { defaultName: 'Cotton Atelier', logoUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=300&q=80' },
    { defaultName: 'Denim Craft', logoUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=300&q=80' },
    { defaultName: 'Silky Touch', logoUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=300&q=80' },
  ];

  const brands = [];
  for (const b of brandsData) {
    const item = await prisma.brand.create({ data: b });
    brands.push(item);
  }
  console.log('✅ Đã tạo 10 Thương hiệu thời trang');

  // ==========================================
  // BẢNG 6: THẺ TAGS (TAG - 8 thẻ)
  // ==========================================
  const tagsData = ['Hot Trend', 'Hàng Mới', 'Bán Chạy', 'Basic Minimalist', 'Sale Giảm Giá', 'Cao Cấp', 'Eco-Friendly Organic', 'Limited Edition'];
  const tags = [];
  for (const t of tagsData) {
    const item = await prisma.tag.create({ data: { name: t } });
    tags.push(item);
  }
  console.log('✅ Đã tạo 8 Thẻ Tag');

  // ==========================================
  // BẢNG 7: SẢN PHẨM KHỔNG LỒ (60 SẢN PHẨM THỰC TẾ)
  // ==========================================
  const productDefinitions = [
    // --- 1. Áo Nam (Cat 0) ---
    { name: 'Áo Thun Oversize Minimalist 100% Cotton', catIdx: 0, brandIdx: 0, img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80', price: 290000 },
    { name: 'Áo Sơ Mi Oxford Dài Tay Form Regular Fit', catIdx: 0, brandIdx: 1, img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80', price: 380000 },
    { name: 'Áo Polo Nam Vải Pique Co Giãn Thoáng Khí', catIdx: 0, brandIdx: 2, img: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80', price: 320000 },
    { name: 'Áo Sơ Mi Cổ Tàu Đũi Linen Cao Cấp', catIdx: 0, brandIdx: 7, img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80', price: 420000 },
    { name: 'Áo Len Dệt Kim Cổ Tròn Dáng Rộng Hàn Quốc', catIdx: 0, brandIdx: 6, img: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80', price: 490000 },
    { name: 'Áo Tank Top Thể Thao Nam Thun Lạnh Co Giãn', catIdx: 0, brandIdx: 5, img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80', price: 190000 },

    // --- 2. Quần Nam (Cat 1) ---
    { name: 'Quần Jean Nam Slim Fit Denim Co Giãn', catIdx: 1, brandIdx: 8, img: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80', price: 520000 },
    { name: 'Quần Kaki Chino Nam Dáng Suông Công Sở', catIdx: 1, brandIdx: 2, img: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80', price: 460000 },
    { name: 'Quần Tây Âu Nam Cạp Cao 1 Ly Lịch Lãm', catIdx: 1, brandIdx: 1, img: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80', price: 580000 },
    { name: 'Quần Jean Baggy Nam Ống Rộng Streetwear', catIdx: 1, brandIdx: 8, img: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80', price: 480000 },
    { name: 'Quần Short Đũi Nam Dạo Phố Mùa Hè', catIdx: 1, brandIdx: 7, img: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80', price: 280000 },
    { name: 'Quần Jogger Nam Túi Hộp Bo Gấu Năng Động', catIdx: 1, brandIdx: 5, img: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=800&q=80', price: 390000 },

    // --- 3. Áo Nữ (Cat 2) ---
    { name: 'Áo Croptop Nữ Dệt Kim Cổ Vuông Năng Động', catIdx: 2, brandIdx: 3, img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80', price: 240000 },
    { name: 'Áo Kiểu Nữ Tay Phồng Voan Tơ Tiểu Thư', catIdx: 2, brandIdx: 4, img: 'https://images.unsplash.com/photo-1534126511673-b6899657816a?auto=format&fit=crop&w=800&q=80', price: 320000 },
    { name: 'Áo Sơ Mi Lụa Tơ Tằm Nữ Cổ Vest Sang Trọng', catIdx: 2, brandIdx: 9, img: 'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=800&q=80', price: 450000 },
    { name: 'Áo Baby Tee Cotton Cổ Tròn Họa Tiết Retro', catIdx: 2, brandIdx: 0, img: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80', price: 210000 },
    { name: 'Áo Hai Dây Lụa Satin Viền Ren Quyến Rũ', catIdx: 2, brandIdx: 9, img: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=800&q=80', price: 260000 },
    { name: 'Áo Trễ Vai Bo Thun Nữ Tính Dạo Phố', catIdx: 2, brandIdx: 3, img: 'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&fit=crop&w=800&q=80', price: 310000 },

    // --- 4. Váy & Đầm (Cat 3) ---
    { name: 'Đầm Maxi Hoa Nhí Dáng Xòe Đi Biển', catIdx: 3, brandIdx: 3, img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80', price: 490000 },
    { name: 'Đầm Dự Tiệc Cổ Yếm Xếp Ly Lụa Satin', catIdx: 3, brandIdx: 9, img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80', price: 650000 },
    { name: 'Chân Váy Chữ A Kaki Midi Xẻ Tà Trước', catIdx: 3, brandIdx: 2, img: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=800&q=80', price: 360000 },
    { name: 'Đầm Sơ Mi Suông Linen Kèm Thắt Lưng Bản Nhỏ', catIdx: 3, brandIdx: 7, img: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80', price: 540000 },
    { name: 'Chân Váy Tennis Xếp Ly Năng Động Học Đường', catIdx: 3, brandIdx: 5, img: 'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&w=800&q=80', price: 270000 },
    { name: 'Đầm Bodycon Len Tăm Ôm Sát Tôn Dáng', catIdx: 3, brandIdx: 4, img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80', price: 410000 },

    // --- 5. Áo Khoác & Blazer (Cat 4) ---
    { name: 'Áo Blazer Nữ Hai Hàng Khuy Tối Giản', catIdx: 4, brandIdx: 0, img: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=800&q=80', price: 790000 },
    { name: 'Áo Khoác Dù Bomber Unisex Chống Gió Chống Nước', catIdx: 4, brandIdx: 5, img: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80', price: 580000 },
    { name: 'Áo Cardigan Dệt Kim Cổ V Form Rộng Vintage', catIdx: 4, brandIdx: 6, img: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80', price: 460000 },
    { name: 'Áo Khoác Denim Jacket Nam Cổ Bẻ Bụi Bặm', catIdx: 4, brandIdx: 8, img: 'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?auto=format&fit=crop&w=800&q=80', price: 680000 },
    { name: 'Áo Khoác Dạ Tweed Tiểu Thư Viền Kim Tuyến', catIdx: 4, brandIdx: 4, img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80', price: 890000 },
    { name: 'Áo Măng Tô Trench Coat Dáng Dài Thanh Lịch', catIdx: 4, brandIdx: 1, img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80', price: 1190000 },

    // --- 6. Đồ Thể Thao (Cat 5) ---
    { name: 'Áo Thun Thể Thao Pro Dry Thoáng Khí', catIdx: 5, brandIdx: 5, img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80', price: 260000 },
    { name: 'Quần Legging Nữ Cạp Cao Nâng Mông Tập Gym', catIdx: 5, brandIdx: 5, img: 'https://images.unsplash.com/photo-1506629072922-3a32f6a6cf49?auto=format&fit=crop&w=800&q=80', price: 310000 },
    { name: 'Bra Thể Thao Đệm Mút Hỗ Trợ Chống Sốc Yoga', catIdx: 5, brandIdx: 5, img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80', price: 250000 },
    { name: 'Quần Short Thể Thao 2 Lớp Chạy Bộ Nam', catIdx: 5, brandIdx: 5, img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80', price: 290000 },
    { name: 'Bộ Set Đồ Tập Activewear Co Giãn 4 Chiều', catIdx: 5, brandIdx: 5, img: 'https://images.unsplash.com/photo-1483721074577-83216853a4c0?auto=format&fit=crop&w=800&q=80', price: 560000 },
    { name: 'Áo Khoác Gió Thể Thao Siêu Nhẹ Kháng Nước', catIdx: 5, brandIdx: 5, img: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80', price: 420000 },

    // --- 7. Phụ Kiện Thời Trang (Cat 6) ---
    { name: 'Túi Tote Canvas Dày Dặn Nhiều Ngăn Tiện Lợi', catIdx: 6, brandIdx: 3, img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80', price: 180000 },
    { name: 'Thắt Lưng Nam Da Bò Thật Khóa Kim Tinh Tế', catIdx: 6, brandIdx: 1, img: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=800&q=80', price: 290000 },
    { name: 'Kính Mát Unisex Gọng Kim Loại Chống Tia UV400', catIdx: 6, brandIdx: 0, img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80', price: 340000 },
    { name: 'Ví Da Nam Mini Đựng Thẻ Gập Đôi Tiện Dụng', catIdx: 6, brandIdx: 1, img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80', price: 250000 },
    { name: 'Khăn Quàng Lụa Satin Họa Tiết Vuông Vintage', catIdx: 6, brandIdx: 9, img: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80', price: 160000 },
    { name: 'Balo Laptop Chống Nước Phong Cách Minimalist', catIdx: 6, brandIdx: 6, img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80', price: 590000 },

    // --- 8. Giày & Dép (Cat 7) ---
    { name: 'Giày Sneaker Trắng Chunky Đế Bánh Mì', catIdx: 7, brandIdx: 6, img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80', price: 850000 },
    { name: 'Sandal Nữ Quai Mảnh Gót Vuông 5cm Dễ Đi', catIdx: 7, brandIdx: 4, img: 'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=800&q=80', price: 420000 },
    { name: 'Giày Lười Loafer Nam Da Bóng Khóa Ngang', catIdx: 7, brandIdx: 1, img: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=800&q=80', price: 920000 },
    { name: 'Giày Boots Cổ Thấp Da Lộn Chelsea Boots', catIdx: 7, brandIdx: 8, img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80', price: 1050000 },
    { name: 'Dép Quai Ngang Đúc Nguyên Khối Êm Chân', catIdx: 7, brandIdx: 5, img: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=800&q=80', price: 180000 },
    { name: 'Giày Cao Gót Mũi Nhọn 7cm Sang Trọng', catIdx: 7, brandIdx: 4, img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80', price: 680000 },

    // --- 9. Nón & Mũ (Cat 8) ---
    { name: 'Nón Bucket Vành Tròn Thời Trang Unisex', catIdx: 8, brandIdx: 6, img: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=800&q=80', price: 150000 },
    { name: 'Mũ Lưỡi Trai Classic Vintage Thêu Chữ', catIdx: 8, brandIdx: 5, img: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80', price: 140000 },
    { name: 'Mũ Nồi Beret Nữ Dạ Len Cổ Điển Pháp', catIdx: 8, brandIdx: 4, img: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=800&q=80', price: 190000 },
    { name: 'Nón Rộng Vành Đi Biển Có Dây Cột Nơ Xinh', catIdx: 8, brandIdx: 3, img: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80', price: 220000 },
    { name: 'Mũ Beanie Len Dệt Kim Ấm Áp Mùa Đông', catIdx: 8, brandIdx: 0, img: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=800&q=80', price: 160000 },
    { name: 'Mũ Nửa Đầu Thể Thao Chống Nắng Chơi Golf', catIdx: 8, brandIdx: 5, img: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80', price: 170000 },

    // --- 10. Đồ Lót & Mặc Nhà (Cat 9) ---
    { name: 'Set Đồ Ngủ Pijama Lụa Satin Cao Cấp Dài Tay', catIdx: 9, brandIdx: 9, img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80', price: 450000 },
    { name: 'Áo Choàng Tắm Unisex Cotton Dệt Tổ Ong Thấm Hút', catIdx: 9, brandIdx: 7, img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80', price: 590000 },
    { name: 'Bộ Mặc Nhà Đũi Xước Quần Lửng Thoáng Mát', catIdx: 9, brandIdx: 7, img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80', price: 320000 },
    { name: 'Set 3 Quần Boxer Nam Kháng Khuẩn Co Giãn', catIdx: 9, brandIdx: 2, img: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80', price: 260000 },
    { name: 'Set Áo Quần Loungewear Nữ Cotton Dáng Rộng', catIdx: 9, brandIdx: 0, img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80', price: 380000 },
    { name: 'Váy Ngủ Hai Dây Lụa Mềm Mại Quyến Rũ', catIdx: 9, brandIdx: 9, img: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=800&q=80', price: 290000 },
  ];

  const products = [];
  const allVariants = [];

  for (let i = 0; i < productDefinitions.length; i++) {
    const pDef = productDefinitions[i];
    const prod = await prisma.product.create({
      data: {
        defaultName: pDef.name,
        thumbnailUrl: pDef.img,
        status: 'PUBLISHED',
        categoryId: categories[pDef.catIdx].id,
        brandId: brands[pDef.brandIdx].id,
      },
    });
    products.push(prod);

    // Gán 1-2 tag ngẫu nhiên
    const tag1 = tags[i % tags.length];
    const tag2 = tags[(i + 3) % tags.length];

    // Tạo ProductImages (1-2 ảnh)
    await prisma.productImage.create({
      data: {
        productId: prod.id,
        imageUrl: pDef.img,
        displayOrder: 1,
      },
    });

    // Tạo 3 Biến thể (Variants: Màu sắc - Size)
    const variantOptions = [
      { name: 'Đen - M', sku: `SKU-${prod.id}-BLK-M` },
      { name: 'Đen - L', sku: `SKU-${prod.id}-BLK-L` },
      { name: 'Trắng - L', sku: `SKU-${prod.id}-WHT-L` },
    ];

    for (const vOpt of variantOptions) {
      const v = await prisma.productVariant.create({
        data: {
          productId: prod.id,
          sku: vOpt.sku,
          variant: 'Màu sắc - Kích cỡ',
          variantValue: vOpt.name,
          stockQuantity: 120,
          originalPrice: pDef.price,
          sellingPrice: Math.round(pDef.price * 0.9), // Giảm nhẹ 10%
          weightGram: 300,
          imageUrl: pDef.img,
        },
      });
      allVariants.push(v);
    }
  }
  console.log(`✅ Đã tạo ${products.length} Sản phẩm và ${allVariants.length} Biến thể SKU tồn kho dồi dào`);

  // ==========================================
  // BẢNG 8: VOUCHER (8 mã ưu đãi thực tế)
  // ==========================================
  const vouchersData = [
    { code: 'GIAM10K', discountType: 'FIXED_AMOUNT', discountValue: 10000, minOrderValue: 100000, maxDiscountAmt: 10000 },
    { code: 'WELCOME10', discountType: 'PERCENTAGE', discountValue: 10, minOrderValue: 200000, maxDiscountAmt: 50000 },
    { code: 'FREESHIP', discountType: 'FIXED_AMOUNT', discountValue: 30000, minOrderValue: 300000, maxDiscountAmt: 30000 },
    { code: 'SALE20K', discountType: 'FIXED_AMOUNT', discountValue: 20000, minOrderValue: 250000, maxDiscountAmt: 20000 },
    { code: 'VIP50K', discountType: 'FIXED_AMOUNT', discountValue: 50000, minOrderValue: 500000, maxDiscountAmt: 50000 },
    { code: 'SUMMER30', discountType: 'PERCENTAGE', discountValue: 15, minOrderValue: 400000, maxDiscountAmt: 80000 },
    { code: 'MEGA100K', discountType: 'FIXED_AMOUNT', discountValue: 100000, minOrderValue: 1000000, maxDiscountAmt: 100000 },
    { code: 'FLASH15', discountType: 'FIXED_AMOUNT', discountValue: 15000, minOrderValue: 150000, maxDiscountAmt: 15000 },
  ];

  const now = new Date();
  const nextMonth = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  for (const v of vouchersData) {
    await prisma.voucher.create({
      data: {
        code: v.code,
        discountType: v.discountType,
        discountValue: v.discountValue,
        minOrderValue: v.minOrderValue,
        maxDiscountAmt: v.maxDiscountAmt,
        totalUsageLimit: 1000,
        usedCount: 15,
        userUsageLimit: 5,
        isActive: true,
        startDate: now,
        endDate: nextMonth,
      },
    });
  }
  console.log('✅ Đã tạo 8 Vouchers ưu đãi thực tế');

  // ==========================================
  // BẢNG 9: CHIẾN DỊCH FLASH SALE (10 sản phẩm sale sâu)
  // ==========================================
  const campaign = await prisma.flashSaleCampaign.create({
    data: {
      name: 'Siêu Sale Chào Hè 2026 - Giảm Đến 50%',
      bannerUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',
      startTime: now,
      endTime: nextMonth,
      isActive: true,
    },
  });

  for (let i = 0; i < 10; i++) {
    const saleVar = allVariants[i * 3];
    await prisma.flashSaleItem.create({
      data: {
        campaignId: campaign.id,
        variantId: saleVar.id,
        flashSalePrice: Math.round(Number(saleVar.sellingPrice) * 0.7),
        promoQuantity: 50,
        soldQuantity: 12 + i * 2,
      },
    });
  }
  console.log('✅ Đã tạo Chiến dịch Flash Sale đang hoạt động với 10 sản phẩm sale sâu');

  // ==========================================
  // BẢNG 10: ĐƠN HÀNG TOÀN DIỆN (25 ĐƠN HÀNG TRẢI DÀI MỌI TRẠNG THÁI)
  // ==========================================
  const vipUser = users.find((u) => u.email === 'customer@fashion.com');
  const vipAddress = addresses.find((a) => a.userId === vipUser.id);

  // Đơn 1: Đã giao thành công (DELIVERED) cho VIP - Sản phẩm 0 - CHƯA REVIEW!
  const orderDelivered1 = await prisma.order.create({
    data: {
      orderCode: 'ORD-VIP-DELIVERED-01',
      userId: vipUser.id,
      shippingAddress: `${vipAddress.receiverName} | ${vipAddress.phoneNumber} | ${vipAddress.detailAddress}, ${vipAddress.ward}, ${vipAddress.district}, ${vipAddress.province}`,
      subTotal: 520000,
      shippingFee: 30000,
      shippingMethod: 'STANDARD',
      shippingDiscount: 0,
      voucherCode: 'GIAM10K',
      voucherDiscount: 10000,
      pointUsed: 0,
      pointDiscount: 0,
      pointEarned: 5400,
      totalAmount: 540000,
      paymentMethod: 'COD',
      paymentStatus: 'SUCCESS',
      status: 'DELIVERED', // Cho phép đánh giá ngay!
      customerNote: 'Giao giờ hành chính',
      orderDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: orderDelivered1.id,
      variantId: allVariants[0].id,
      productName: products[0].defaultName,
      skuCode: allVariants[0].sku,
      variantValue: allVariants[0].variantValue,
      productImageUrl: products[0].thumbnailUrl,
      unitPrice: allVariants[0].sellingPrice,
      quantity: 2,
    },
  });

  // Đơn 2: Đã giao thành công (DELIVERED) cho VIP - Sản phẩm 1 - CHƯA REVIEW!
  const orderDelivered2 = await prisma.order.create({
    data: {
      orderCode: 'ORD-VIP-DELIVERED-02',
      userId: vipUser.id,
      shippingAddress: `${vipAddress.receiverName} | ${vipAddress.phoneNumber} | ${vipAddress.detailAddress}, ${vipAddress.ward}, ${vipAddress.district}, ${vipAddress.province}`,
      subTotal: 350000,
      shippingFee: 30000,
      shippingMethod: 'STANDARD',
      shippingDiscount: 0,
      voucherCode: null,
      voucherDiscount: 0,
      pointUsed: 0,
      pointDiscount: 0,
      pointEarned: 3800,
      totalAmount: 380000,
      paymentMethod: 'BANK_TRANSFER',
      paymentStatus: 'SUCCESS',
      status: 'DELIVERED', // Cho phép đánh giá!
      customerNote: 'Để gói hàng cẩn thận',
      orderDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: orderDelivered2.id,
      variantId: allVariants[3].id,
      productName: products[1].defaultName,
      skuCode: allVariants[3].sku,
      variantValue: allVariants[3].variantValue,
      productImageUrl: products[1].thumbnailUrl,
      unitPrice: allVariants[3].sellingPrice,
      quantity: 1,
    },
  });

  // Đơn 3: Chờ thanh toán (PENDING_PAYMENT) - Cho VIP để test VietQR modal
  const orderPendingPayment = await prisma.order.create({
    data: {
      orderCode: 'ORD-VIP-PENDING-PAY-01',
      userId: vipUser.id,
      shippingAddress: `${vipAddress.receiverName} | ${vipAddress.phoneNumber} | ${vipAddress.detailAddress}, ${vipAddress.ward}, ${vipAddress.district}, ${vipAddress.province}`,
      subTotal: 490000,
      shippingFee: 30000,
      shippingMethod: 'STANDARD',
      shippingDiscount: 0,
      voucherCode: null,
      voucherDiscount: 0,
      pointUsed: 0,
      pointDiscount: 0,
      pointEarned: 5200,
      totalAmount: 520000,
      paymentMethod: 'BANK_TRANSFER',
      paymentStatus: 'PENDING',
      status: 'PENDING_PAYMENT',
      customerNote: 'Sẽ chuyển khoản qua ngân hàng',
      orderDate: new Date(),
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: orderPendingPayment.id,
      variantId: allVariants[6].id,
      productName: products[2].defaultName,
      skuCode: allVariants[6].sku,
      variantValue: allVariants[6].variantValue,
      productImageUrl: products[2].thumbnailUrl,
      unitPrice: allVariants[6].sellingPrice,
      quantity: 1,
    },
  });

  // Tạo thêm 22 đơn hàng phong phú khác trải khắp các trạng thái và khách hàng
  const statuses = ['DELIVERED', 'SHIPPED', 'PROCESSING', 'PENDING_PAYMENT', 'CANCELLED', 'RETURNED'];
  const otherCustomers = users.filter((u) => u.id !== vipUser.id && u.roleId === customerRole.id);

  for (let i = 0; i < 22; i++) {
    const cust = otherCustomers[i % otherCustomers.length];
    const custAddr = addresses.find((a) => a.userId === cust.id) || addresses[0];
    const ordStatus = statuses[i % statuses.length];
    const pIdx = (i * 2 + 3) % products.length;
    const vIdx = pIdx * 3;
    const prod = products[pIdx];
    const variant = allVariants[vIdx];
    const price = Number(variant.sellingPrice);

    const ord = await prisma.order.create({
      data: {
        orderCode: `ORD-BULK-2026-${String(i + 1).padStart(3, '0')}`,
        userId: cust.id,
        shippingAddress: `${custAddr.receiverName} | ${custAddr.phoneNumber} | ${custAddr.detailAddress}, ${custAddr.ward}, ${custAddr.district}, ${custAddr.province}`,
        subTotal: price,
        shippingFee: 30000,
        shippingMethod: 'STANDARD',
        shippingDiscount: i % 3 === 0 ? 30000 : 0,
        voucherCode: i % 2 === 0 ? 'GIAM10K' : null,
        voucherDiscount: i % 2 === 0 ? 10000 : 0,
        pointUsed: 0,
        pointDiscount: 0,
        pointEarned: Math.floor(price * 0.01),
        totalAmount: price + 30000 - (i % 2 === 0 ? 10000 : 0),
        paymentMethod: i % 2 === 0 ? 'COD' : 'BANK_TRANSFER',
        paymentStatus: ordStatus === 'DELIVERED' || ordStatus === 'SHIPPED' ? 'SUCCESS' : 'PENDING',
        status: ordStatus,
        customerNote: `Giao hàng mẫu ${i + 1}`,
        orderDate: new Date(Date.now() - (i + 1) * 2 * 24 * 60 * 60 * 1000),
      },
    });

    await prisma.orderItem.create({
      data: {
        orderId: ord.id,
        variantId: variant.id,
        productName: prod.defaultName,
        skuCode: variant.sku,
        variantValue: variant.variantValue,
        productImageUrl: prod.thumbnailUrl,
        unitPrice: variant.sellingPrice,
        quantity: 1,
      },
    });
  }

  console.log('✅ Đã tạo 25 Đơn hàng toàn diện phủ khắp tất cả các trạng thái (DELIVERED, SHIPPED, PROCESSING, PENDING, CANCELLED, RETURNED)');

  // ==========================================
  // BẢNG 11: ĐÁNH GIÁ SẢN PHẨM MẪU (PRODUCT REVIEWS - 20 bài đánh giá)
  // ==========================================
  const reviewComments = [
    'Chất vải sờ vào rất mát và mịn, đường may tinh xảo. Giao hàng cực nhanh trong 2 ngày!',
    'Form áo mặc lên người rất tôn dáng, phối đồ đi chơi hay đi làm đều đẹp.',
    'Giá quá hời so với chất lượng nhận được, sẽ tiếp tục ủng hộ thương hiệu này lâu dài.',
    'Đóng gói cẩn thận 2 lớp hộp, nhân viên giao hàng lịch sự, chấm 5 sao!',
    'Màu sắc y như hình chụp, mặc thoáng mồ hôi rất thích hợp cho mùa hè này.',
    'Đã mua lần thứ 3 tại shop, chất lượng luôn ổn định và xứng đáng với giá tiền.',
    'Form dáng chuẩn đẹp, vải dày dặn vừa phải, không bị nhăn sau khi giặt máy.',
    'Rất ưng ý với sản phẩm này, bạn bè ai cũng khen đẹp khi mặc đi chơi.',
  ];

  for (let i = 0; i < 20; i++) {
    const reviewer = otherCustomers[i % otherCustomers.length];
    const targetProd = products[(i + 4) % products.length];
    const rating = 4 + (i % 2); // 4 hoặc 5 sao

    await prisma.productReview.create({
      data: {
        userId: reviewer.id,
        productId: targetProd.id,
        rating: rating,
        content: reviewComments[i % reviewComments.length],
      },
    });
  }
  console.log('✅ Đã tạo 20 Đánh giá sản phẩm mẫu với độ hài lòng cao');

  // ==========================================
  // BẢNG 12: LỊCH SỬ TÍCH ĐIỂM (POINT TRANSACTIONS)
  // ==========================================
  await prisma.pointTransaction.create({
    data: {
      userId: vipUser.id,
      orderId: orderDelivered1.id,
      pointChange: 5400,
      currentPoint: 50000,
      transactionType: 'EARN',
      description: 'Cộng 5.400 điểm thưởng từ đơn hàng hoàn thành ORD-VIP-DELIVERED-01',
    },
  });

  await prisma.pointTransaction.create({
    data: {
      userId: vipUser.id,
      orderId: orderDelivered2.id,
      pointChange: 3800,
      currentPoint: 44600,
      transactionType: 'EARN',
      description: 'Cộng 3.800 điểm thưởng từ đơn hàng hoàn thành ORD-VIP-DELIVERED-02',
    },
  });
  console.log('✅ Đã khởi tạo Lịch sử giao dịch điểm thưởng chi tiết');

  // ==========================================
  // BẢNG 13: CUỘC TRÒ CHUYỆN & TIN NHẮN CSKH
  // ==========================================
  const chat1 = await prisma.chat.create({
    data: {
      userId: vipUser.id,
      status: 'OPEN',
    },
  });

  await prisma.message.create({
    data: {
      chatId: chat1.id,
      senderId: vipUser.id,
      content: 'Chào shop, áo sơ mi form regular này người 1m75 nặng 68kg thì mặc size L có vừa vặn không ạ?',
      sendDate: new Date(Date.now() - 30 * 60 * 1000),
    },
  });

  await prisma.message.create({
    data: {
      chatId: chat1.id,
      senderId: users[0].id, // Admin reply
      content: 'Dạ chào bạn! Chiều cao 1m75 nặng 68kg mặc size L là chuẩn form regular fit rất đẹp và thoải mái ạ.',
      sendDate: new Date(Date.now() - 25 * 60 * 1000),
    },
  });

  const chat2 = await prisma.chat.create({
    data: {
      userId: otherCustomers[0].id,
      status: 'OPEN',
    },
  });

  await prisma.message.create({
    data: {
      chatId: chat2.id,
      senderId: otherCustomers[0].id,
      content: 'Shop cho mình hỏi đơn hàng ORD-BULK-2026-001 bao giờ giao tới Quận 1 vậy ạ?',
      sendDate: new Date(Date.now() - 10 * 60 * 1000),
    },
  });

  await prisma.message.create({
    data: {
      chatId: chat2.id,
      senderId: users[1].id, // Staff reply
      content: 'Dạ đơn của bạn đã được đóng gói và bàn giao cho đơn vị vận chuyển, dự kiến giao trong ngày mai bạn nhé!',
      sendDate: new Date(Date.now() - 5 * 60 * 1000),
    },
  });

  console.log('✅ Đã khởi tạo các Cuộc trò chuyện CSKH mẫu thời gian thực');

  console.log('\n🎉 ======================================================== 🎉');
  console.log('🎉 SEED BỘ DỮ LIỆU KHỔNG LỒ TOÀN DIỆN THÀNH CÔNG RỰC RỠ! 🎉');
  console.log(`🎉 60 Sản phẩm | 180 SKU | 25 Đơn hàng | 8 Vouchers | 20 Reviews 🎉`);
  console.log('🎉 SẴN SÀNG TRIỂN KHAI PRODUCTION & DEPLOY LÊN VERCEL! 🎉');
  console.log('🎉 ======================================================== 🎉\n');
}

main()
  .catch((e) => {
    console.error('❌ Lỗi khi seed dữ liệu:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });