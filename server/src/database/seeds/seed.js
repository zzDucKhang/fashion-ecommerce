const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient();



async function main() {
  console.log('🚀 Bắt đầu làm sạch dữ liệu cũ...');
  async function safeDelete(modelName) {
  if (prisma[modelName] && typeof prisma[modelName].deleteMany === 'function') {
    await prisma[modelName].deleteMany();
  }
}

  // 1. XÓA DỮ LIỆU CŨ THEO THỨ TỰ NGƯỢC CỦA RÀNG BUỘC KHÓA NGOẠI
  await safeDelete('message');
  await safeDelete('chat');
  await safeDelete('reviewMedia');
  await safeDelete('productReview');
  await safeDelete('pointTransaction');
  await safeDelete('flashSaleItem');
  await safeDelete('flashSaleCampaign');
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
  await safeDelete('user');

  console.log('🧹 Đã xóa sạch dữ liệu cũ. Bắt đầu seed 10 records mỗi bảng...\n');

  

  // ==========================================
  // BẢNG 4: USER (10 records)
  // ==========================================
  const defaultPassword = '$2b$10$ZMMPYdVKis.BdKi/HV3ft.00OG7du3x/uFeythS1YZJ5vTmvO5o1K'; // bcrypt hash of "Password123@"
  const adminRole = await prisma.role.findUnique({ where: { code: 'ADMIN' } });
  const staffRole = await prisma.role.findUnique({ where: { code: 'STAFF' } });
  const customerRole = await prisma.role.findUnique({ where: { code: 'CUSTOMER' } });

  const adminId = adminRole ? adminRole.id : 1;
  const staffId = staffRole ? staffRole.id : 2;
  const customerId = customerRole ? customerRole.id : 3;

  const usersData = [
    { fullName: 'Nguyễn Quản Trị', email: 'admin@fashion.com', phoneNumber: '0901000001', roleId: adminId, status: 'ACTIVE', rewardPoints: 5000 },
    { fullName: 'Trần Nhân Viên', email: 'staff@fashion.com', phoneNumber: '0901000002', roleId: staffId, status: 'ACTIVE', rewardPoints: 200 },
    { fullName: 'Lê Hoàng Nam', email: 'nam.le@gmail.com', phoneNumber: '0901000003', roleId: staffId, status: 'ACTIVE', rewardPoints: 1200 },
    { fullName: 'Phạm Thị Thảo', email: 'thao.pham@gmail.com', phoneNumber: '0901000004', roleId: staffId, status: 'ACTIVE', rewardPoints: 450 },
    { fullName: 'Vũ Minh Tuấn', email: 'tuan.vu@gmail.com', phoneNumber: '0901000005', roleId: customerId, status: 'ACTIVE', rewardPoints: 0 },
    { fullName: 'Hoàng Mai Anh', email: 'maianh.hoang@gmail.com', phoneNumber: '0901000006', roleId: customerId, status: 'ACTIVE', rewardPoints: 3400 },
    { fullName: 'Đặng Quốc Bảo', email: 'bao.dang@gmail.com', phoneNumber: '0901000007', roleId: customerId, status: 'ACTIVE', rewardPoints: 80 },
    { fullName: 'Bùi Phương Ly', email: 'ly.bui@gmail.com', phoneNumber: '0901000008', roleId: customerId, status: 'ACTIVE', rewardPoints: 950 },
    { fullName: 'Đỗ Tiến Dũng', email: 'dung.do@gmail.com', phoneNumber: '0901000009', roleId: customerId, status: 'INACTIVE', rewardPoints: 0 },
    { fullName: 'Ngô Khánh Linh', email: 'linh.ngo@gmail.com', phoneNumber: '0901000010', roleId: customerId, status: 'BLOCKED', rewardPoints: 10 },
  ];

  const users = [];
  for (const u of usersData) {
    const item = await prisma.user.create({
      data: {
        ...u,
        passwordHash: defaultPassword,
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      },
    });
    users.push(item);
  }
  console.log('✅ Đã tạo 10 Users (Mật khẩu: Password123@)');

  // ==========================================
  // BẢNG 5: SHIPPING_ADDRESS (10 records)
  // ==========================================
  const addresses = [];
  for (let i = 0; i < 10; i++) {
    const addr = await prisma.shippingAddress.create({
      data: {
        userId: users[i].id,
        receiverName: users[i].fullName,
        phoneNumber: users[i].phoneNumber,
        province: 'Thành phố Hồ Chí Minh',
        district: `Quận ${i + 1}`,
        ward: `Phường 0${i + 1}`,
        detailAddress: `${100 + i * 15} Đường Lê Lợi`,
        isDefault: true,
      },
    });
    addresses.push(addr);
  }
  console.log('✅ Đã tạo 10 ShippingAddresses');

  // ==========================================
  // BẢNG 6: DEVICE_SESSION (10 records)
  // ==========================================
  for (let i = 0; i < 10; i++) {
    await prisma.deviceSession.create({
      data: {
        userId: users[i].id,
        refreshToken: `refresh_token_sample_string_hash_${i + 1}_uuid`,
        ipAddress: `192.168.1.${10 + i}`,
        isActive: i % 2 === 0,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });
  }
  console.log('✅ Đã tạo 10 DeviceSessions');

  // ==========================================
  // BẢNG 7: CATEGORY (10 records - ĐÃ THAY EMOJI BẰNG URL HỢP LỆ)
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
  console.log('✅ Đã tạo 10 Categories (iconUrl chuẩn URL hình ảnh)');

  // ==========================================
  // BẢNG 8: BRAND (10 records)
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
    { defaultName: 'Silk & Linen', logoUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=300&q=80' },
  ];

  const brands = [];
  for (const b of brandsData) {
    const item = await prisma.brand.create({ data: b });
    brands.push(item);
  }
  console.log('✅ Đã tạo 10 Brands');

  // ==========================================
  // BẢNG 9: TAG (10 records)
  // ==========================================
  const tagsData = [
    'Hot Trend', 'Bestseller', 'Mùa Hè', 'Thu Đông', 'Vintage',
    'Minimalist', 'Cotton 100%', 'Cao Cấp', 'Giảm Giá', 'Mới Về'
  ];
  for (const name of tagsData) {
    await prisma.tag.create({ data: { name } });
  }
  console.log('✅ Đã tạo 10 Tags');

  // ==========================================
  // BẢNG 10: PRODUCT (10 records)
  // ==========================================
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
    'Áo Hoodie Nỉ Bông Unisex'
  ];

  const products = [];
  for (let i = 0; i < 10; i++) {
    const p = await prisma.product.create({
      data: {
        defaultName: productNames[i],
        thumbnailUrl: categoriesData[i].iconUrl,
        status: 'PUBLISHED',
        categoryId: categories[i].id,
        brandId: brands[i].id,
      },
    });
    products.push(p);
  }
  console.log('✅ Đã tạo 10 Products');

  // ==========================================
  // BẢNG 11: PRODUCT_IMAGE (10 records)
  // ==========================================
  for (let i = 0; i < 10; i++) {
    await prisma.productImage.create({
      data: {
        productId: products[i].id,
        imageUrl: categoriesData[i].iconUrl,
        displayOrder: 1,
      },
    });
  }
  console.log('✅ Đã tạo 10 ProductImages');

  // ==========================================
  // BẢNG 12: PRODUCT_VARIANT (10 records)
  // ==========================================
  const variants = [];
  for (let i = 0; i < 10; i++) {
    const origPrice = 250000 + i * 50000;
    const sellPrice = origPrice - 30000;
    const v = await prisma.productVariant.create({
      data: {
        productId: products[i].id,
        sku: `SKU-${products[i].id}-DEN-L`,
        variant: 'Màu sắc - Kích cỡ',
        variantValue: 'Đen - L',
        stockQuantity: 100,
        originalPrice: origPrice,
        sellingPrice: sellPrice,
        weightGram: 300,
        imageUrl: categoriesData[i].iconUrl,
      },
    });
    variants.push(v);
  }
  console.log('✅ Đã tạo 10 ProductVariants');

  // ==========================================
  // BẢNG 13: CART (10 records)
  // ==========================================
  const carts = [];
  for (let i = 0; i < 10; i++) {
    const c = await prisma.cart.create({
      data: {
        userId: users[i].id,
        sessionId: `session_token_${i + 1}`,
      },
    });
    carts.push(c);
  }
  console.log('✅ Đã tạo 10 Carts');

  // ==========================================
  // BẢNG 14: CART_ITEM (10 records)
  // ==========================================
  for (let i = 0; i < 10; i++) {
    await prisma.cartItem.create({
      data: {
        cartId: carts[i].id,
        variantId: variants[i].id,
        quantity: (i % 3) + 1,
      },
    });
  }
  console.log('✅ Đã tạo 10 CartItems');

  // ==========================================
  // BẢNG 15: VOUCHER (10 records)
  // ==========================================
  const vouchers = [];
  for (let i = 0; i < 10; i++) {
    const v = await prisma.voucher.create({
      data: {
        code: `FASHION${(i + 1) * 10}K`,
        discountType: i % 2 === 0 ? 'FIXED_AMOUNT' : 'PERCENTAGE',
        discountValue: i % 2 === 0 ? (i + 1) * 20000 : 10 + i,
        minOrderValue: 200000,
        maxDiscountAmt: 100000,
        totalUsageLimit: 500,
        usedCount: i * 5,
        userUsageLimit: 1,
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        isActive: true,
      },
    });
    vouchers.push(v);
  }
  console.log('✅ Đã tạo 10 Vouchers');

  // ==========================================
  // BẢNG 16: ORDER (10 records)
  // ==========================================
  const orderStatuses = [
    'PENDING_PAYMENT', 'CONFIRMED', 'PROCESSING', 'SHIPPED',
    'DELIVERED', 'DELIVERED', 'DELIVERED', 'CANCELLED', 'RETURNED', 'PROCESSING'
  ];

  const orders = [];
  for (let i = 0; i < 10; i++) {
    const subTotal = Number(variants[i].sellingPrice) * 2;
    const shippingFee = 30000;
    const discount = 20000;
    const totalAmount = subTotal + shippingFee - discount;

    const ord = await prisma.order.create({
      data: {
        orderCode: `ORD-2026100${i + 1}`,
        userId: users[i].id,
        shippingAddress: `${addresses[i].receiverName} | ${addresses[i].phoneNumber} | ${addresses[i].detailAddress}, ${addresses[i].ward}, ${addresses[i].district}, ${addresses[i].province}`,
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
        paymentMethod: i % 2 === 0 ? 'COD' : 'BANK_TRANSFER',
        paymentStatus: i >= 4 ? 'SUCCESS' : 'PENDING',
        status: orderStatuses[i],
        customerNote: 'Giao hàng giờ hành chính',
      },
    });
    orders.push(ord);
  }
  console.log('✅ Đã tạo 10 Orders');

  // ==========================================
  // BẢNG 17: ORDER_ITEM (10 records)
  // ==========================================
  const orderItems = [];
  for (let i = 0; i < 10; i++) {
    const item = await prisma.orderItem.create({
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
    orderItems.push(item);
  }
  console.log('✅ Đã tạo 10 OrderItems');

  // ==========================================
  // BẢNG 18: SHIPMENT (10 records)
  // ==========================================
  const shipmentStatuses = ['PENDING', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED', 'DELIVERED', 'DELIVERED', 'DELIVERED', 'FAILED', 'DELIVERED', 'IN_TRANSIT'];
  for (let i = 0; i < 10; i++) {
    await prisma.shipment.create({
      data: {
        orderId: orders[i].id,
        carrier: i % 2 === 0 ? 'Giao Hàng Nhanh (GHN)' : 'Viettel Post',
        trackingCode: `TRK-VN-998877${i}`,
        actualShippingFee: 28000,
        status: shipmentStatuses[i],
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      },
    });
  }
  console.log('✅ Đã tạo 10 Shipments');

  // ==========================================
  // BẢNG 19: PAYMENT_TRANSACTION (10 records)
  // ==========================================
  for (let i = 0; i < 10; i++) {
    await prisma.paymentTransaction.create({
      data: {
        orderId: orders[i].id,
        provider: i % 2 === 0 ? 'COD' : 'SEPAY_BANK',
        providerTransId: `TXN_SEPAY_202610_${i + 1000}`,
        amount: orders[i].totalAmount,
        status: orders[i].paymentStatus,
      },
    });
  }
  console.log('✅ Đã tạo 10 PaymentTransactions');

  // ==========================================
  // BẢNG 20: RETURN_REQUEST (10 records)
  // ==========================================
  const returnRequests = [];
  const returnStatuses = ['PENDING', 'APPROVED', 'REJECTED', 'COMPLETED', 'PENDING', 'APPROVED', 'PENDING', 'REJECTED', 'COMPLETED', 'PENDING'];
  for (let i = 0; i < 10; i++) {
    const rr = await prisma.returnRequest.create({
      data: {
        orderItemId: orderItems[i].id,
        quantity: 1,
        reason: i % 2 === 0 ? 'Mặc không vừa size, muốn đổi lớn hơn' : 'Sản phẩm có chỉ thừa / lỗi nhẹ',
        description: 'Vải đẹp nhưng form hơi rộng so với bảng size chuẩn.',
        status: returnStatuses[i],
      },
    });
    returnRequests.push(rr);
  }
  console.log('✅ Đã tạo 10 ReturnRequests');

  // ==========================================
  // BẢNG 21: RETURN_MEDIA (10 records)
  // ==========================================
  if (prisma.returnMedia) {
    for (let i = 0; i < 10; i++) {
      await prisma.returnMedia.create({
        data: {
          returnRequestId: returnRequests[i].id,
          mediaUrl: 'https://images.unsplash.com/photo-1506629905607-d9b1f1f3d7a8?auto=format&fit=crop&w=400&q=80',
          mediaType: 'IMAGE',
        },
      });
    }
    console.log('✅ Đã tạo 10 ReturnMedias');
  }

  // InventoryTransaction model was removed

  // ==========================================
  // BẢNG 23: FLASH_SALE_CAMPAIGN (10 records)
  // ==========================================
  const campaigns = [];
  for (let i = 0; i < 10; i++) {
    const fsc = await prisma.flashSaleCampaign.create({
      data: {
        name: `Flash Sale Giờ Vàng Ngày 10/${i + 1}`,
        bannerUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',
        startTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
        endTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
        isActive: i === 0,
      },
    });
    campaigns.push(fsc);
  }
  console.log('✅ Đã tạo 10 FlashSaleCampaigns');

  // ==========================================
  // BẢNG 24: FLASH_SALE_ITEM (10 records)
  // ==========================================
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
  console.log('✅ Đã tạo 10 FlashSaleItems');

  // ==========================================
  // BẢNG 25: POINT_TRANSACTION (10 records)
  // ==========================================
  for (let i = 0; i < 10; i++) {
    await prisma.pointTransaction.create({
      data: {
        userId: users[i].id,
        orderId: orders[i].id,
        pointChange: 150,
        currentPoint: users[i].rewardPoints,
        transactionType: 'EARN',
        description: `Tích điểm 1% từ đơn hàng ${orders[i].orderCode}`,
      },
    });
  }
  console.log('✅ Đã tạo 10 PointTransactions');

  // ==========================================
  // BẢNG 26: PRODUCT_REVIEW (10 records)
  // ==========================================
  const reviews = [];
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
    'Mẫu mã hiện đại, rất dễ phối đồ đi làm hoặc đi chơi.'
  ];

  for (let i = 0; i < 10; i++) {
    const rev = await prisma.productReview.create({
      data: {
        productId: products[i].id,
        userId: users[i].id,
        orderId: orders[i].id,
        rating: 5,
        content: reviewContents[i],
        shopReply: 'Dạ cảm ơn bạn đã tin yêu và ủng hộ sản phẩm của thương hiệu ạ!',
        isHidden: false,
      },
    });
    reviews.push(rev);
  }
  console.log('✅ Đã tạo 10 ProductReviews');

  // ==========================================
  // BẢNG 27: REVIEW_MEDIA (10 records)
  if (prisma.reviewMedia) {
    for (let i = 0; i < 10; i++) {
      await prisma.reviewMedia.create({
        data: {
          reviewId: reviews[i].id,
          mediaUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80',
          mediaType: 'IMAGE',
        },
      });
    }
    console.log('✅ Đã tạo 10 ReviewMedias');
  }

  // ==========================================
  // BẢNG 28: CHAT (10 records)
  // ==========================================
  const chats = [];
  for (let i = 0; i < 10; i++) {
    const ch = await prisma.chat.create({
      data: {
        userId: users[i].id,
        status: i % 3 === 0 ? 'OPEN' : 'CLOSED',
      },
    });
    chats.push(ch);
  }
  console.log('✅ Đã tạo 10 Chats');

  // ==========================================
  // BẢNG 29: MESSAGE (10 records)
  // ==========================================
  for (let i = 0; i < 10; i++) {
    await prisma.message.create({
      data: {
        chatId: chats[i].id,
        senderId: users[i].id,
        content: `Chào shop, mình cao 1m75 nặng 68kg thì mặc size L của sản phẩm ${products[i].defaultName} có vừa không?`,
        isRead: true,
      },
    });
  }
  console.log('✅ Đã tạo 10 Messages');

  console.log('\n🎉 ================================================ 🎉');
  console.log('🎉 SEED DỮ LIỆU TOÀN DIỆN THÀNH CÔNG RỰC RỠ (10 records / bảng)! 🎉');
  console.log('🎉 ================================================ 🎉');
}

main()
  .catch((e) => {
    console.error('❌ Lỗi khi thực thi seed script:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });