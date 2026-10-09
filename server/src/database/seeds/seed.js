const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const IMAGE =
  'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80';

const AVATAR =
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';

async function safeDelete(modelName) {
  const model = prisma[modelName];

  if (model && typeof model.deleteMany === 'function') {
    await model.deleteMany();
  }
}

async function main() {
  console.log('🚀 Starting database seed...\n');

  // ============================================================
  // 1. CLEAN OLD DATA
  // ============================================================

  console.log('🧹 Cleaning old data...');

  // Delete children before parents.
  await safeDelete('message');
  await safeDelete('chat');

  await safeDelete('reviewMedia');
  await safeDelete('productReview');

  await safeDelete('pointTransaction');

  await safeDelete('flashSaleItem');
  await safeDelete('flashSaleCampaign');

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

  await safeDelete('verificationCode');

  // User depends on Role.
  await safeDelete('user');

  // Role <-> Permission relation.
  await safeDelete('role');
  await safeDelete('permission');

  console.log('✅ Old data cleaned.\n');

  // ============================================================
  // 2. ROLES
  // ============================================================

  console.log('👥 Creating roles...');

  const adminRole = await prisma.role.create({
    data: {
      code: 'ADMIN',
      name: 'Administrator',
      isActive: true,
    },
  });

  const staffRole = await prisma.role.create({
    data: {
      code: 'STAFF',
      name: 'Staff',
      isActive: true,
    },
  });

  const customerRole = await prisma.role.create({
    data: {
      code: 'CUSTOMER',
      name: 'Customer',
      isActive: true,
    },
  });

  console.log('✅ Created 3 roles');

  // ============================================================
  // 3. PERMISSIONS
  // ============================================================

  console.log('🔐 Creating permissions...');

  const permissionData = [
    ['USER_READ', 'USER', 'View users'],
    ['USER_CREATE', 'USER', 'Create users'],
    ['USER_UPDATE', 'USER', 'Update users'],
    ['USER_DELETE', 'USER', 'Delete users'],

    ['PRODUCT_READ', 'PRODUCT', 'View products'],
    ['PRODUCT_CREATE', 'PRODUCT', 'Create products'],
    ['PRODUCT_UPDATE', 'PRODUCT', 'Update products'],
    ['PRODUCT_DELETE', 'PRODUCT', 'Delete products'],

    ['ORDER_READ', 'ORDER', 'View orders'],
    ['ORDER_UPDATE', 'ORDER', 'Update orders'],

    ['PAYMENT_READ', 'PAYMENT', 'View payments'],
    ['PAYMENT_UPDATE', 'PAYMENT', 'Update payments'],
  ];

  const permissions = [];

  for (const [code, module, description] of permissionData) {
    const permission = await prisma.permission.create({
      data: {
        code,
        module,
        description,
      },
    });

    permissions.push(permission);
  }

  // Give ADMIN all permissions.
  await prisma.role.update({
    where: {
      id: adminRole.id,
    },
    data: {
      permissions: {
        connect: permissions.map((permission) => ({
          id: permission.id,
        })),
      },
    },
  });

  // Staff gets product/order/payment permissions.
  const staffPermissions = permissions.filter((permission) =>
    ['PRODUCT', 'ORDER', 'PAYMENT'].includes(permission.module),
  );

  await prisma.role.update({
    where: {
      id: staffRole.id,
    },
    data: {
      permissions: {
        connect: staffPermissions.map((permission) => ({
          id: permission.id,
        })),
      },
    },
  });

  console.log(`✅ Created ${permissions.length} permissions`);

  // ============================================================
  // 4. USERS
  // ============================================================

  console.log('👤 Creating users...');

  // NOTE:
  // This is seed/demo data.
  // Replace with a real password hash in production.
  const defaultPassword = '$2b$10$8pEygMoehw9Gi0KNztcQFumhvgnC.2MMpb8fSXAgrJd6DJUD7kLdu';

  const usersData = [
    {
      fullName: 'Nguyễn Quản Trị',
      email: 'admin@fashion.com',
      phoneNumber: '0901000001',
      roleId: adminRole.id,
      status: 'ACTIVE',
      rewardPoints: 5000,
    },
    {
      fullName: 'Trần Nhân Viên',
      email: 'staff@fashion.com',
      phoneNumber: '0901000002',
      roleId: staffRole.id,
      status: 'ACTIVE',
      rewardPoints: 200,
    },
    {
      fullName: 'Lê Hoàng Nam',
      email: 'nam.le@gmail.com',
      phoneNumber: '0901000003',
      roleId: staffRole.id,
      status: 'ACTIVE',
      rewardPoints: 1200,
    },
    {
      fullName: 'Phạm Thị Thảo',
      email: 'thao.pham@gmail.com',
      phoneNumber: '0901000004',
      roleId: staffRole.id,
      status: 'ACTIVE',
      rewardPoints: 450,
    },
    {
      fullName: 'Vũ Minh Tuấn',
      email: 'tuan.vu@gmail.com',
      phoneNumber: '0901000005',
      roleId: customerRole.id,
      status: 'ACTIVE',
      rewardPoints: 0,
    },
    {
      fullName: 'Hoàng Mai Anh',
      email: 'maianh.hoang@gmail.com',
      phoneNumber: '0901000006',
      roleId: customerRole.id,
      status: 'ACTIVE',
      rewardPoints: 3400,
    },
    {
      fullName: 'Đặng Quốc Bảo',
      email: 'bao.dang@gmail.com',
      phoneNumber: '0901000007',
      roleId: customerRole.id,
      status: 'ACTIVE',
      rewardPoints: 80,
    },
    {
      fullName: 'Bùi Phương Ly',
      email: 'ly.bui@gmail.com',
      phoneNumber: '0901000008',
      roleId: customerRole.id,
      status: 'ACTIVE',
      rewardPoints: 950,
    },
    {
      fullName: 'Đỗ Tiến Dũng',
      email: 'dung.do@gmail.com',
      phoneNumber: '0901000009',
      roleId: customerRole.id,
      status: 'INACTIVE',
      rewardPoints: 0,
    },
    {
      fullName: 'Ngô Khánh Linh',
      email: 'linh.ngo@gmail.com',
      phoneNumber: '0901000010',
      roleId: customerRole.id,
      status: 'BLOCKED',
      rewardPoints: 10,
    },
  ];

  const users = [];

  for (const userData of usersData) {
    const user = await prisma.user.create({
      data: {
        ...userData,
        passwordHash: defaultPassword,
        avatarUrl: AVATAR,
      },
    });

    users.push(user);
  }

  console.log('✅ Created 10 users');

  // ============================================================
  // 5. VERIFICATION CODES
  // ============================================================

  console.log('✉️ Creating verification codes...');

  for (let i = 0; i < 10; i++) {
    await prisma.verificationCode.create({
      data: {
        email: users[i].email,
        code: `${100000 + i}`,
        type: i % 2 === 0 ? 'REGISTER' : 'FORGOT_PASSWORD',
        isUsed: i % 2 === 0,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      },
    });
  }

  console.log('✅ Created 10 verification codes');

  // ============================================================
  // 6. SHIPPING ADDRESSES
  // ============================================================

  const addresses = [];

  for (let i = 0; i < 10; i++) {
    const address = await prisma.shippingAddress.create({
      data: {
        userId: users[i].id,
        receiverName: users[i].fullName,
        phoneNumber: users[i].phoneNumber,
        province: 'Thành phố Hồ Chí Minh',
        district: `Quận ${i + 1}`,
        ward: `Phường ${String(i + 1).padStart(2, '0')}`,
        detailAddress: `${100 + i * 15} Đường Lê Lợi`,
        isDefault: true,
      },
    });

    addresses.push(address);
  }

  console.log('✅ Created 10 shipping addresses');

  // ============================================================
  // 7. DEVICE SESSIONS
  // ============================================================

  for (let i = 0; i < 10; i++) {
    await prisma.deviceSession.create({
      data: {
        userId: users[i].id,
        refreshToken: `refresh_token_sample_${i + 1}`,
        ipAddress: `192.168.1.${10 + i}`,
        isActive: i % 2 === 0,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });
  }

  console.log('✅ Created 10 device sessions');

  // ============================================================
  // 8. CATEGORIES
  // ============================================================

  const categoriesData = [
    'Áo Nam',
    'Quần Nam',
    'Áo Nữ',
    'Váy & Đầm',
    'Áo Khoác & Blazer',
    'Đồ Thể Thao',
    'Phụ Kiện Thời Trang',
    'Giày & Dép',
    'Nón & Mũ',
    'Đồ Lót & Mặc Nhà',
  ];

  const categories = [];

  for (let i = 0; i < categoriesData.length; i++) {
    const category = await prisma.category.create({
      data: {
        defaultName: categoriesData[i],
        iconUrl: IMAGE,
        isVisible: true,
      },
    });

    categories.push(category);
  }

  console.log('✅ Created 10 categories');

  // ============================================================
  // 9. BRANDS
  // ============================================================

  const brandNames = [
    'Morrow Studio',
    'Form & Field',
    'House of Common',
    'Sunday Objects',
    'Lumen Goods',
    'Urban Minimal',
    'Nordic Clean',
    'Cotton Atelier',
    'Denim Craft',
    'Silk & Linen',
  ];

  const brands = [];

  for (const name of brandNames) {
    const brand = await prisma.brand.create({
      data: {
        defaultName: name,
        logoUrl: IMAGE,
      },
    });

    brands.push(brand);
  }

  console.log('✅ Created 10 brands');

  // ============================================================
  // 10. TAGS
  // ============================================================

  const tagNames = [
    'Hot Trend',
    'Bestseller',
    'Mùa Hè',
    'Thu Đông',
    'Vintage',
    'Minimalist',
    'Cotton 100%',
    'Cao Cấp',
    'Giảm Giá',
    'Mới Về',
  ];

  const tags = [];

  for (const name of tagNames) {
    const tag = await prisma.tag.create({
      data: {
        name,
      },
    });

    tags.push(tag);
  }

  console.log('✅ Created 10 tags');

  // ============================================================
  // 11. PRODUCTS
  // ============================================================

  const productNames = [
    'Áo Sơ Mi Linen Form Rộng',
    'Quần Tây Baggy Xếp Ly',
    'Áo Thun Heavyweight 260gsm',
    'Chân Váy Chữ A Lưng Cao',
    'Áo Khoác Blazer 2 Hàng Nút',
    'Quần Jeans Ống Suông Indigo',
    'Áo Len Dệt Kim Cổ Tròn',
    'Túi Canvas Đeo Vai Minimal',
    'Mũ Bucket Cotton Washed',
    'Áo Hoodie Nỉ Bông Unisex',
  ];

  const products = [];

  for (let i = 0; i < 10; i++) {
    const product = await prisma.product.create({
      data: {
        defaultName: productNames[i],
        thumbnailUrl: IMAGE,
        status: 'PUBLISHED',
        categoryId: categories[i].id,
        brandId: brands[i].id,

        // Connect some tags.
        tags: {
          connect: [
            {
              id: tags[i].id,
            },
          ],
        },
      },
    });

    products.push(product);
  }

  console.log('✅ Created 10 products');

  // ============================================================
  // 12. PRODUCT IMAGES
  // ============================================================

  for (let i = 0; i < 10; i++) {
    await prisma.productImage.create({
      data: {
        productId: products[i].id,
        imageUrl: IMAGE,
        displayOrder: 1,
      },
    });
  }

  console.log('✅ Created 10 product images');

  // ============================================================
  // 13. PRODUCT VARIANTS
  // ============================================================

  const variants = [];

  for (let i = 0; i < 10; i++) {
    const originalPrice = 250000 + i * 50000;
    const sellingPrice = originalPrice - 30000;

    const variant = await prisma.productVariant.create({
      data: {
        productId: products[i].id,
        sku: `SKU-${products[i].id}-DEN-L`,
        variant: 'Màu sắc - Kích cỡ',
        variantValue: 'Đen - L',
        stockQuantity: 100,
        originalPrice,
        sellingPrice,
        weightGram: 300,
        imageUrl: IMAGE,
      },
    });

    variants.push(variant);
  }

  console.log('✅ Created 10 product variants');

  // ============================================================
  // 14. CARTS
  // ============================================================

  const carts = [];

  for (let i = 0; i < 10; i++) {
    const cart = await prisma.cart.create({
      data: {
        userId: users[i].id,
        sessionId: `session_token_${i + 1}`,
      },
    });

    carts.push(cart);
  }

  console.log('✅ Created 10 carts');

  // ============================================================
  // 15. CART ITEMS
  // ============================================================

  for (let i = 0; i < 10; i++) {
    await prisma.cartItem.create({
      data: {
        cartId: carts[i].id,
        variantId: variants[i].id,
        quantity: (i % 3) + 1,
      },
    });
  }

  console.log('✅ Created 10 cart items');

  // ============================================================
  // 16. VOUCHERS
  // ============================================================

  const vouchers = [];

  for (let i = 0; i < 10; i++) {
    const voucher = await prisma.voucher.create({
      data: {
        code: `FASHION${(i + 1) * 10}K`,
        discountType:
          i % 2 === 0 ? 'FIXED_AMOUNT' : 'PERCENTAGE',
        discountValue:
          i % 2 === 0 ? (i + 1) * 20000 : 10 + i,
        minOrderValue: 200000,
        maxDiscountAmt: 100000,
        totalUsageLimit: 500,
        usedCount: i * 5,
        userUsageLimit: 1,
        startDate: new Date(),
        endDate: new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000,
        ),
        isActive: true,
      },
    });

    vouchers.push(voucher);
  }

  console.log('✅ Created 10 vouchers');

  // ============================================================
  // 17. ORDERS
  // ============================================================

  const orderStatuses = [
    'PENDING_PAYMENT',
    'CONFIRMED',
    'PROCESSING',
    'SHIPPED',
    'DELIVERED',
    'DELIVERED',
    'DELIVERED',
    'CANCELLED',
    'RETURNED',
    'PROCESSING',
  ];

  const orders = [];

  for (let i = 0; i < 10; i++) {
    const subTotal = Number(variants[i].sellingPrice) * 2;
    const shippingFee = 30000;
    const discount = 20000;
    const totalAmount = subTotal + shippingFee - discount;

    const order = await prisma.order.create({
      data: {
        orderCode: `ORD-2026100${i + 1}`,
        userId: users[i].id,

        shippingAddress:
          `${addresses[i].receiverName} | ` +
          `${addresses[i].phoneNumber} | ` +
          `${addresses[i].detailAddress}, ` +
          `${addresses[i].ward}, ` +
          `${addresses[i].district}, ` +
          `${addresses[i].province}`,

        subTotal,
        shippingFee,
        shippingMethod: 'STANDARD',
        shippingDiscount: 0,

        voucherCode: vouchers[i].code,
        voucherDiscount: discount,

        pointUsed: 0,
        pointDiscount: 0,
        pointEarned: Math.floor(totalAmount * 0.01),

        totalAmount,

        paymentMethod:
          i % 2 === 0 ? 'COD' : 'BANK_TRANSFER',

        paymentStatus:
          i >= 4 ? 'SUCCESS' : 'PENDING',

        status: orderStatuses[i],

        customerNote: 'Giao hàng giờ hành chính',
      },
    });

    orders.push(order);
  }

  console.log('✅ Created 10 orders');

  // ============================================================
  // 18. ORDER ITEMS
  // ============================================================

  const orderItems = [];

  for (let i = 0; i < 10; i++) {
    const orderItem = await prisma.orderItem.create({
      data: {
        orderId: orders[i].id,
        variantId: variants[i].id,

        productName: products[i].defaultName,
        skuCode: variants[i].sku,
        variantValue: variants[i].variantValue,
        productImageUrl: variants[i].imageUrl,

        unitPrice: variants[i].sellingPrice,
        quantity: 2,
      },
    });

    orderItems.push(orderItem);
  }

  console.log('✅ Created 10 order items');

  // ============================================================
  // 19. SHIPMENTS
  // ============================================================

  const shipmentStatuses = [
    'PENDING',
    'PICKED_UP',
    'IN_TRANSIT',
    'DELIVERED',
    'DELIVERED',
    'DELIVERED',
    'DELIVERED',
    'FAILED',
    'DELIVERED',
    'IN_TRANSIT',
  ];

  for (let i = 0; i < 10; i++) {
    await prisma.shipment.create({
      data: {
        orderId: orders[i].id,
        carrier:
          i % 2 === 0
            ? 'Giao Hàng Nhanh (GHN)'
            : 'Viettel Post',

        trackingCode: `TRK-VN-998877${i}`,

        actualShippingFee: 28000,
        status: shipmentStatuses[i],

        estimatedDelivery: new Date(
          Date.now() + 3 * 24 * 60 * 60 * 1000,
        ),
      },
    });
  }

  console.log('✅ Created 10 shipments');

  // ============================================================
  // 20. PAYMENT TRANSACTIONS
  // ============================================================

  for (let i = 0; i < 10; i++) {
    await prisma.paymentTransaction.create({
      data: {
        orderId: orders[i].id,

        provider:
          i % 2 === 0
            ? 'COD'
            : 'SEPAY_BANK',

        providerTransId:
          `TXN_SEPAY_202610_${i + 1000}`,

        amount: orders[i].totalAmount,
        status: orders[i].paymentStatus,
      },
    });
  }

  console.log('✅ Created 10 payment transactions');

  // ============================================================
  // 21. RETURN REQUESTS
  // ============================================================

  const returnStatuses = [
    'PENDING',
    'APPROVED',
    'REJECTED',
    'COMPLETED',
    'PENDING',
    'APPROVED',
    'PENDING',
    'REJECTED',
    'COMPLETED',
    'PENDING',
  ];

  const returnRequests = [];

  for (let i = 0; i < 10; i++) {
    const returnRequest = await prisma.returnRequest.create({
      data: {
        orderItemId: orderItems[i].id,
        quantity: 1,

        reason:
          i % 2 === 0
            ? 'Mặc không vừa size, muốn đổi lớn hơn'
            : 'Sản phẩm có chỉ thừa / lỗi nhẹ',

        description:
          'Vải đẹp nhưng form hơi rộng so với bảng size chuẩn.',

        status: returnStatuses[i],
      },
    });

    returnRequests.push(returnRequest);
  }

  console.log('✅ Created 10 return requests');

  // ============================================================
  // 22. RETURN MEDIA
  // ============================================================

  for (let i = 0; i < 10; i++) {
    await prisma.returnMedia.create({
      data: {
        returnRequestId: returnRequests[i].id,
        mediaUrl: IMAGE,
        mediaType: 'IMAGE',
      },
    });
  }

  console.log('✅ Created 10 return media');

  // ============================================================
  // 23. FLASH SALE CAMPAIGNS
  // ============================================================

  const campaigns = [];

  for (let i = 0; i < 10; i++) {
    const campaign =
      await prisma.flashSaleCampaign.create({
        data: {
          name: `Flash Sale Giờ Vàng Ngày ${i + 1}`,
          bannerUrl: IMAGE,

          startTime: new Date(
            Date.now() - 2 * 60 * 60 * 1000,
          ),

          endTime: new Date(
            Date.now() + 24 * 60 * 60 * 1000,
          ),

          isActive: i === 0,
        },
      });

    campaigns.push(campaign);
  }

  console.log('✅ Created 10 flash sale campaigns');

  // ============================================================
  // 24. FLASH SALE ITEMS
  // ============================================================

  for (let i = 0; i < 10; i++) {
    await prisma.flashSaleItem.create({
      data: {
        campaignId: campaigns[0].id,
        variantId: variants[i].id,

        flashSalePrice: 149000,
        promoQuantity: 50,
        soldQuantity: i * 3,
      },
    });
  }

  console.log('✅ Created 10 flash sale items');

  // ============================================================
  // 25. POINT TRANSACTIONS
  // ============================================================

  for (let i = 0; i < 10; i++) {
    await prisma.pointTransaction.create({
      data: {
        userId: users[i].id,
        orderId: orders[i].id,

        pointChange: 150,
        currentPoint: users[i].rewardPoints,

        transactionType: 'EARN',

        description:
          `Tích điểm 1% từ đơn hàng ${orders[i].orderCode}`,
      },
    });
  }

  console.log('✅ Created 10 point transactions');

  // ============================================================
  // 26. PRODUCT REVIEWS
  // ============================================================

  const reviewContents = [
    'Chất vải thoáng mát, đường may rất kỹ lưỡng, rất đáng tiền!',
    'Màu sắc y như hình chụp, giao hàng thần tốc trong 2 ngày.',
    'Form áo mặc tôn dáng, đóng gói bọc hộp sang trọng.',
    'Vải mềm mịn không xù lông khi giặt máy.',
    'Giá quá rẻ so với chất lượng nhận được!',
    'Tư vấn viên nhiệt tình chọn size chuẩn vừa khít.',
    'Quần mặc đứng form, vải không bị nhăn nhiều.',
    'Rất thích phong cách tối giản này, sẽ ủng hộ shop tiếp.',
    'Sản phẩm đẹp 10/10, chấm shop 5 sao chất lượng.',
    'Mẫu mã hiện đại, rất dễ phối đồ đi làm hoặc đi chơi.',
  ];

  const reviews = [];

  for (let i = 0; i < 10; i++) {
    const review = await prisma.productReview.create({
      data: {
        productId: products[i].id,
        userId: users[i].id,
        orderId: orders[i].id,

        rating: 5,
        content: reviewContents[i],

        shopReply:
          'Dạ cảm ơn bạn đã tin yêu và ủng hộ sản phẩm của thương hiệu ạ!',

        isHidden: false,
      },
    });

    reviews.push(review);
  }

  console.log('✅ Created 10 product reviews');

  // ============================================================
  // 27. REVIEW MEDIA
  // ============================================================

  for (let i = 0; i < 10; i++) {
    await prisma.reviewMedia.create({
      data: {
        reviewId: reviews[i].id,
        mediaUrl: IMAGE,
        mediaType: 'IMAGE',
      },
    });
  }

  console.log('✅ Created 10 review media');

  // ============================================================
  // 28. CHATS
  // ============================================================

  const chats = [];

  for (let i = 0; i < 10; i++) {
    const chat = await prisma.chat.create({
      data: {
        userId: users[i].id,

        // Your schema has:
        // OPEN / WAITING / CLOSED
        status:
          i % 3 === 0
            ? 'OPEN'
            : i % 3 === 1
              ? 'WAITING'
              : 'CLOSED',
      },
    });

    chats.push(chat);
  }

  console.log('✅ Created 10 chats');

  // ============================================================
  // 29. MESSAGES
  // ============================================================

  for (let i = 0; i < 10; i++) {
    await prisma.message.create({
      data: {
        chatId: chats[i].id,
        senderId: users[i].id,

        content:
          `Chào shop, mình cao 1m75 nặng 68kg ` +
          `thì mặc size L của sản phẩm ` +
          `${products[i].defaultName} có vừa không?`,

        isRead: true,
      },
    });
  }

  console.log('✅ Created 10 messages');

  // ============================================================
  // DONE
  // ============================================================

  console.log('\n==============================================');
  console.log('🎉 DATABASE SEED SUCCESSFUL!');
  console.log('==============================================');
  console.log('');
  console.log('Created:');
  console.log('  - 3 roles');
  console.log(`  - ${permissions.length} permissions`);
  console.log('  - 10 users');
  console.log('  - 10 verification codes');
  console.log('  - 10 shipping addresses');
  console.log('  - 10 device sessions');
  console.log('  - 10 categories');
  console.log('  - 10 brands');
  console.log('  - 10 tags');
  console.log('  - 10 products');
  console.log('  - 10 product images');
  console.log('  - 10 product variants');
  console.log('  - 10 carts');
  console.log('  - 10 cart items');
  console.log('  - 10 vouchers');
  console.log('  - 10 orders');
  console.log('  - 10 order items');
  console.log('  - 10 shipments');
  console.log('  - 10 payment transactions');
  console.log('  - 10 return requests');
  console.log('  - 10 return media');
  console.log('  - 10 flash sale campaigns');
  console.log('  - 10 flash sale items');
  console.log('  - 10 point transactions');
  console.log('  - 10 product reviews');
  console.log('  - 10 review media');
  console.log('  - 10 chats');
  console.log('  - 10 messages');
  console.log('');
  console.log('🔑 Demo password: Password@123');
}

main()
  .catch((error) => {
    console.error('\n❌ SEED FAILED:\n');
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });