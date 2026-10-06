const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- Đang xóa sạch dữ liệu cũ (Clean Database) ---');
  // Xóa theo thứ tự từ bảng phụ thuộc (child) lên bảng cha (parent)
  await prisma.reviewMedia.deleteMany({});
  await prisma.productReview.deleteMany({});
  await prisma.message.deleteMany({});
  await prisma.websocketSession.deleteMany({});
  await prisma.pointTransaction.deleteMany({});
  await prisma.paymentTransaction.deleteMany({});
  await prisma.returnMedia.deleteMany({});
  await prisma.returnRequest.deleteMany({});
  await prisma.shipment.deleteMany({});
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.cartItem.deleteMany({});
  await prisma.cart.deleteMany({});
  await prisma.flashSaleItem.deleteMany({});
  await prisma.flashSaleCampaign.deleteMany({});
  await prisma.inventoryLog.deleteMany({});
  await prisma.productVariant.deleteMany({});
  await prisma.attributeValue.deleteMany({});
  await prisma.attribute.deleteMany({});
  await prisma.productImage.deleteMany({});
  await prisma.productTranslation.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.tag.deleteMany({});
  await prisma.brandTranslation.deleteMany({});
  await prisma.brand.deleteMany({});
  await prisma.categoryTranslation.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.language.deleteMany({});
  await prisma.shippingAddress.deleteMany({});
  await prisma.deviceSession.deleteMany({});
  await prisma.verificationCode.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.role.deleteMany({});
  await prisma.permission.deleteMany({});
  await prisma.voucher.deleteMany({});

  console.log('--- 1. Seed Languages (2 bản ghi) ---');
  const langVi = await prisma.language.create({ data: { id: 'vi', name: 'Tiếng Việt', isDefault: true } });
  const langEn = await prisma.language.create({ data: { id: 'en', name: 'English', isDefault: false } });

  console.log('--- 2. Seed Permissions (10 bản ghi) ---');
  const permissionCodes = [
    { code: 'USER_READ', module: 'USER', description: 'Xem danh sách người dùng' },
    { code: 'USER_WRITE', module: 'USER', description: 'Tạo và cập nhật người dùng' },
    { code: 'ROLE_MANAGE', module: 'ROLE', description: 'Quản lý vai trò và quyền hạn' },
    { code: 'CATALOG_READ', module: 'CATALOG', description: 'Xem danh mục và sản phẩm' },
    { code: 'CATALOG_WRITE', module: 'CATALOG', description: 'Thêm/sửa danh mục và sản phẩm' },
    { code: 'ORDER_READ', module: 'ORDER', description: 'Xem danh sách đơn hàng' },
    { code: 'ORDER_UPDATE', module: 'ORDER', description: 'Cập nhật trạng thái đơn hàng' },
    { code: 'INVENTORY_MANAGE', module: 'INVENTORY', description: 'Quản lý nhập xuất tồn kho' },
    { code: 'FLASH_SALE_MANAGE', module: 'PROMOTION', description: 'Tạo và chỉnh sửa Flash Sale' },
    { code: 'VOUCHER_MANAGE', module: 'PROMOTION', description: 'Tạo mã voucher giảm giá' },
  ];
  const permissions = [];
  for (const perm of permissionCodes) {
    permissions.push(await prisma.permission.create({ data: perm }));
  }

  console.log('--- 3. Seed Roles (10 bản ghi) ---');
  const roleNames = [
    { code: 'ADMIN', name: 'Quản trị viên tối cao' },
    { code: 'CUSTOMER', name: 'Khách hàng thông thường' },
    { code: 'STAFF', name: 'Nhân viên vận hành' },
    { code: 'WAREHOUSE_STAFF', name: 'Thủ kho' },
    { code: 'MARKETING_LEAD', name: 'Trưởng nhóm Marketing' },
    { code: 'CONTENT_CREATOR', name: 'Nhân viên nội dung' },
    { code: 'SALES_REP', name: 'Nhân viên bán hàng' },
    { code: 'CUSTOMER_SUPPORT', name: 'Hỗ trợ khách hàng' },
    { code: 'FINANCE_STAFF', name: 'Nhân viên kế toán' },
    { code: 'BRANCH_MANAGER', name: 'Quản lý chi nhánh' },
  ];
  const roles = [];
  for (let i = 0; i < roleNames.length; i++) {
    const role = await prisma.role.create({
      data: {
        code: roleNames[i].code,
        name: roleNames[i].name,
        isActive: true,
        permissions: {
          connect: permissions.slice(0, 3 + (i % 7)).map(p => ({ id: p.id })),
        },
      },
    });
    roles.push(role);
  }

  console.log('--- 4. Seed Users (10 bản ghi) ---');
  // PasswordHash tương ứng: "Password@123"
  const defaultPasswordHash = '$2a$10$wT8h5uKjL66o70FmHsz5hO1tH5yQ82M60jYmRrn4PekgPms36eTWW';
  const users = [];
  const userSeeds = [
    { fullName: 'Đức Khang Admin', email: 'admin@fashionstore.com', phone: '0901234567', roleId: roles[0].id },
    { fullName: 'Trần Văn Bình', email: 'binh.tran@fashionstore.com', phone: '0912345678', roleId: roles[1].id },
    { fullName: 'Lê Thị Cúc', email: 'cuc.le@fashionstore.com', phone: '0923456789', roleId: roles[1].id },
    { fullName: 'Phạm Minh Duy', email: 'duy.pham@fashionstore.com', phone: '0934567890', roleId: roles[1].id },
    { fullName: 'Hoàng Thị Giang', email: 'giang.hoang@fashionstore.com', phone: '0945678901', roleId: roles[2].id },
    { fullName: 'Đỗ Hùng Dũng', email: 'dung.do@fashionstore.com', phone: '0956789012', roleId: roles[1].id },
    { fullName: 'Vũ Thanh Hằng', email: 'hang.vu@fashionstore.com', phone: '0967890123', roleId: roles[1].id },
    { fullName: 'Ngô Kiến Huy', email: 'huy.ngo@fashionstore.com', phone: '0978901234', roleId: roles[1].id },
    { fullName: 'Bùi Kim Ngân', email: 'ngan.bui@fashionstore.com', phone: '0989012345', roleId: roles[1].id },
    { fullName: 'Đặng Tuấn Tú', email: 'tu.dang@fashionstore.com', phone: '0990123456', roleId: roles[1].id },
  ];
  for (const u of userSeeds) {
    users.push(
      await prisma.user.create({
        data: {
          fullName: u.fullName,
          email: u.email,
          phoneNumber: u.phone,
          passwordHash: defaultPasswordHash,
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          rewardPoints: Math.floor(Math.random() * 500) * 10,
          status: 'ACTIVE',
          roleId: u.roleId,
        },
      })
    );
  }

  console.log('--- 5. Seed Shipping Addresses (10 bản ghi) ---');
  for (let i = 0; i < 10; i++) {
    await prisma.shippingAddress.create({
      data: {
        userId: users[i].id,
        receiverName: users[i].fullName,
        phoneNumber: users[i].phoneNumber,
        province: 'Thành phố Hồ Chí Minh',
        district: 'Thành phố Thủ Đức',
        ward: 'Phường Linh Chiểu',
        detailAddress: `${10 + i * 2} Đường Võ Văn Ngân, Khu phố ${i + 1}`,
        isDefault: true,
      },
    });
  }

  console.log('--- 6. Seed Device Sessions & Verification Codes (10 bản ghi mỗi loại) ---');
  for (let i = 0; i < 10; i++) {
    await prisma.deviceSession.create({
      data: {
        userId: users[i].id,
        refreshToken: `refresh_token_sample_string_hash_${i}_${Date.now()}`,
        ipAddress: `192.168.1.${10 + i}`,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    await prisma.verificationCode.create({
      data: {
        email: users[i].email,
        code: `12345${i}`,
        type: i % 2 === 0 ? 'REGISTER' : 'FORGOT_PASSWORD',
        isUsed: false,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      },
    });
  }

  console.log('--- 7. Seed Categories & Translations (10 bản ghi) ---');
  const categoryNames = [
    'Áo sơ mi', 'Áo thun Pima', 'Quần tây công sở', 'Quần Jeans Denim', 'Áo Blazer & Suit',
    'Váy đầm Linen', 'Áo khoác gió', 'Túi xách da', 'Giày Sneakers', 'Phụ kiện thời trang'
  ];
  const categories = [];
  for (let i = 0; i < categoryNames.length; i++) {
    const cat = await prisma.category.create({
      data: {
        defaultName: categoryNames[i],
        isVisible: true,
        translations: {
          create: [
            { languageId: langVi.id, name: categoryNames[i], description: `Danh mục thời trang cao cấp: ${categoryNames[i]}` },
            { languageId: langEn.id, name: `Category ${categoryNames[i]}`, description: `Luxury category ${categoryNames[i]}` },
          ],
        },
      },
    });
    categories.push(cat);
  }

  console.log('--- 8. Seed Brands & Translations (10 bản ghi) ---');
  const brandNames = [
    'Morrow Studio', 'Form & Field', 'House of Common', 'Sunday Objects', 'Lumen Goods',
    'Kiln Notes', 'Urban Tailor', 'Nordic Minimal', 'Aesthetic Label', 'Zenith Heritage'
  ];
  const brands = [];
  for (let i = 0; i < brandNames.length; i++) {
    const br = await prisma.brand.create({
      data: {
        defaultName: brandNames[i],
        logoUrl: `https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300`,
        translations: {
          create: [
            { languageId: langVi.id, name: brandNames[i], description: `Thương hiệu thiết kế tối giản ${brandNames[i]}` },
            { languageId: langEn.id, name: brandNames[i], description: `Minimalist brand ${brandNames[i]}` },
          ],
        },
      },
    });
    brands.push(br);
  }

  console.log('--- 9. Seed Tags (10 bản ghi) ---');
  const tagList = ['New Arrival', 'Bestseller', 'Summer Collection', 'Minimalism', 'Organic Cotton', 'Linen Blend', 'Hot Deal', 'Vintage', 'Formal Wear', 'Limited Edition'];
  const tags = [];
  for (const t of tagList) {
    tags.push(await prisma.tag.create({ data: { name: t } }));
  }

  console.log('--- 10. Seed Attributes & AttributeValues (10 bản ghi giá trị) ---');
  const attrColor = await prisma.attribute.create({ data: { name: 'Màu sắc' } });
  const attrSize = await prisma.attribute.create({ data: { name: 'Kích cỡ' } });

  const colorVals = ['Trắng', 'Đen', 'Xám', 'Xanh Navy', 'Beige'];
  const sizeVals = ['S', 'M', 'L', 'XL', 'FreeSize'];

  const colorValRecords = [];
  for (const c of colorVals) {
    colorValRecords.push(await prisma.attributeValue.create({ data: { attributeId: attrColor.id, value: c } }));
  }
  const sizeValRecords = [];
  for (const s of sizeVals) {
    sizeValRecords.push(await prisma.attributeValue.create({ data: { attributeId: attrSize.id, value: s } }));
  }

  console.log('--- 11. Seed Products, Translations & Images (10 bản ghi) ---');
  const productSamples = [
    { name: 'Áo sơ mi Oxford Linen Classic', price: 450000, img: 'photo-1594633312681-425c7b97ccd1' },
    { name: 'Quần tây Pleated Trousers', price: 790000, img: 'photo-1506629905607-d9b1f1f3d7a8' },
    { name: 'Blazer Oversized Cotton Knit', price: 1250000, img: 'photo-1483985988355-763728e1935b' },
    { name: 'Áo thun Pima Cotton Basic', price: 290000, img: 'photo-1521572267360-ee0c2909d518' },
    { name: 'Váy đầm Linen Midi Dress', price: 920000, img: 'photo-1515886657613-9f3515b0c78f' },
    { name: 'Túi xách Everyday Canvas Tote', price: 380000, img: 'photo-1548036328-c9fa89d128fa' },
    { name: 'Áo khoác gió Urban Windbreaker', price: 850000, img: 'photo-1544441893-675973e31985' },
    { name: 'Quần Jeans Slimfit Indigo', price: 680000, img: 'photo-1541099649105-f69ad21f3246' },
    { name: 'Khăn choàng lụa Silk Scarf', price: 320000, img: 'photo-1608571423902-eed4a5ad8108' },
    { name: 'Set đầm dệt kim Ribbed Knit Set', price: 1100000, img: 'photo-1496747611176-843222e1e57c' },
  ];

  const products = [];
  for (let i = 0; i < productSamples.length; i++) {
    const item = productSamples[i];
    const p = await prisma.product.create({
      data: {
        defaultName: item.name,
        thumbnailUrl: `https://images.unsplash.com/${item.img}?auto=format&fit=crop&w=800&q=80`,
        status: 'PUBLISHED',
        categoryId: categories[i].id,
        brandId: brands[i].id,
        tags: { connect: [{ id: tags[i % tags.length].id }] },
        translations: {
          create: [
            {
              languageId: langVi.id,
              name: item.name,
              shortDesc: 'Thiết kế tinh xảo, đường may chuẩn xác, chất liệu tự nhiên bền vững.',
              detailDesc: 'Sản phẩm được gia công từ nguồn vải hữu cơ đã qua xử lý nhiệt chống co rút, mang lại cảm giác thoải mái suốt ngày dài.',
            },
            {
              languageId: langEn.id,
              name: `EN - ${item.name}`,
              shortDesc: 'Modern minimal garment crafted with precision.',
              detailDesc: 'Breathable and durable everyday essential fabric designed for long-lasting comfort.',
            },
          ],
        },
        images: {
          create: [
            { imageUrl: `https://images.unsplash.com/${item.img}?auto=format&fit=crop&w=800&q=80`, displayOrder: 1 },
          ],
        },
      },
    });
    products.push(p);
  }

  console.log('--- 12. Seed Product Variants & Inventory Logs (10 bản ghi) ---');
  const variants = [];
  for (let i = 0; i < products.length; i++) {
    const v = await prisma.productVariant.create({
      data: {
        productId: products[i].id,
        sku: `SKU-${1000 + i}`,
        stockQuantity: 100,
        originalPrice: productSamples[i].price,
        sellingPrice: productSamples[i].price * 0.9,
        weightGram: 350,
        imageUrl: products[i].thumbnailUrl,
        attributeValues: {
          connect: [
            { id: colorValRecords[i % colorValRecords.length].id },
            { id: sizeValRecords[i % sizeValRecords.length].id },
          ],
        },
      },
    });
    variants.push(v);

    await prisma.inventoryLog.create({
      data: {
        variantId: v.id,
        transType: 'IMPORT',
        quantityChange: 100,
        note: `Nhập kho ban đầu lô hàng đầu tiên ${v.sku}`,
      },
    });
  }

  console.log('--- 13. Seed Flash Sale Campaigns & Items (10 bản ghi mỗi loại) ---');
  const now = new Date();
  for (let i = 0; i < 10; i++) {
    const campaign = await prisma.flashSaleCampaign.create({
      data: {
        name: `Flash Sale Giờ Vàng Đợt ${i + 1}`,
        startTime: new Date(now.getTime() - 2 * 60 * 60 * 1000),
        endTime: new Date(now.getTime() + (24 + i * 2) * 60 * 60 * 1000),
        isActive: true,
        bannerUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200',
        items: {
          create: {
            variantId: variants[i].id,
            flashSalePrice: Number(variants[i].sellingPrice) * 0.8,
            promoQuantity: 50,
            soldQuantity: 10 + i * 2,
          },
        },
      },
    });
  }

  console.log('--- 14. Seed Carts & Cart Items (10 bản ghi) ---');
  for (let i = 0; i < 10; i++) {
    const cart = await prisma.cart.create({
      data: {
        userId: users[i].id,
        sessionId: `session_uuid_demo_${i}`,
      },
    });

    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        variantId: variants[i].id,
        quantity: (i % 3) + 1,
      },
    });
  }

  console.log('--- 15. Seed Vouchers (10 bản ghi) ---');
  const vouchers = [];
  for (let i = 0; i < 10; i++) {
    vouchers.push(
      await prisma.voucher.create({
        data: {
          code: `FASHION${10 + i * 5}`,
          discountType: i % 2 === 0 ? 'PERCENTAGE' : 'FIXED_AMOUNT',
          discountValue: i % 2 === 0 ? 10 + i * 2 : 50000,
          minOrderValue: 300000,
          maxDiscountAmt: 100000,
          totalUsageLimit: 500,
          usedCount: i * 10,
          startDate: new Date(),
          endDate: new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000),
          isActive: true,
        },
      })
    );
  }

  console.log('--- 16. Seed Orders, OrderItems, Shipments & Payments (10 bản ghi) ---');
  const orderStatuses = [
    'DELIVERED', 'PROCESSING', 'CONFIRMED', 'SHIPPED', 'DELIVERED',
    'PENDING_PAYMENT', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'PROCESSING'
  ];
  const paymentMethods = ['COD', 'VNPAY', 'MOMO', 'BANK_TRANSFER'];

  for (let i = 0; i < 10; i++) {
    const unitPrice = Number(variants[i].sellingPrice);
    const quantity = 1;
    const subTotal = unitPrice * quantity;
    const shippingFee = 30000;
    const totalAmount = subTotal + shippingFee;

    const order = await prisma.order.create({
      data: {
        orderCode: `ORD-2026-${1000 + i}`,
        userId: users[i].id,
        receiverName: users[i].fullName,
        receiverPhone: users[i].phoneNumber,
        province: 'TP. Hồ Chí Minh',
        district: 'Thành phố Thủ Đức',
        ward: 'Phường Linh Chiểu',
        detailAddress: `${15 + i} Đường Võ Văn Ngân`,
        subTotal,
        shippingFee,
        totalAmount,
        paymentMethod: paymentMethods[i % paymentMethods.length],
        paymentStatus: orderStatuses[i] === 'DELIVERED' ? 'SUCCESS' : 'PENDING',
        status: orderStatuses[i],
        customerNote: `Giao hàng giờ hành chính đơn số ${i + 1}`,
        orderItems: {
          create: {
            variantId: variants[i].id,
            productName: products[i].defaultName,
            skuCode: variants[i].sku,
            variantValue: 'Tiêu chuẩn',
            productImageUrl: products[i].thumbnailUrl,
            unitPrice,
            quantity,
          },
        },
      },
      include: {
        orderItems: true,
      },
    });

    // Seed Shipment tương ứng
    await prisma.shipment.create({
      data: {
        orderId: order.id,
        carrier: i % 2 === 0 ? 'Giao Hàng Tiết Kiệm (GHTK)' : 'Giao Hàng Nhanh (GHN)',
        trackingCode: `TRACK_${order.orderCode}_VN`,
        actualShippingFee: 30000,
        status: orderStatuses[i] === 'DELIVERED' ? 'DELIVERED' : 'IN_TRANSIT',
        estimatedDelivery: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000),
      },
    });

    // Seed Payment Transaction tương ứng
    await prisma.paymentTransaction.create({
      data: {
        orderId: order.id,
        provider: order.paymentMethod,
        providerTransId: `TRANS_${order.orderCode}_${Date.now()}`,
        amount: totalAmount,
        status: order.paymentStatus,
      },
    });

    // Seed Return Request & Return Media cho đơn vị thứ 9 (để demo chức năng đổi trả)
    if (i === 9) {
      const returnReq = await prisma.returnRequest.create({
        data: {
          orderItemId: order.orderItems[0].id,
          quantity: 1,
          reason: 'Kích cỡ không vừa vặn',
          description: 'Tôi muốn đổi sang kích thước lớn hơn một size.',
          status: 'PENDING',
        },
      });

      await prisma.returnMedia.create({
        data: {
          returnRequestId: returnReq.id,
          mediaUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800',
          mediaType: 'IMAGE',
        },
      });
    }
  }

  console.log('--- 17. Seed Point Transactions (10 bản ghi) ---');
  for (let i = 0; i < 10; i++) {
    await prisma.pointTransaction.create({
      data: {
        userId: users[i].id,
        pointChange: 50,
        currentPoint: users[i].rewardPoints + 50,
        transactionType: 'EARN',
        description: `Tích lũy điểm thưởng thành viên đơn hàng #${1000 + i}`,
      },
    });
  }

  console.log('--- 18. Seed Product Reviews & Review Medias (10 bản ghi) ---');
  for (let i = 0; i < 10; i++) {
    const review = await prisma.productReview.create({
      data: {
        productId: products[i].id,
        userId: users[i].id,
        rating: 5,
        content: `Chất liệu sản phẩm ${products[i].defaultName} rất đẹp, form dáng đúng chuẩn thiết kế. Ủng hộ shop tiếp tục!`,
        shopReply: 'Cảm ơn quý khách đã tin tưởng trải nghiệm sản phẩm của thương hiệu chúng tôi!',
      },
    });

    await prisma.reviewMedia.create({
      data: {
        reviewId: review.id,
        mediaUrl: products[i].thumbnailUrl || 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800',
        mediaType: 'IMAGE',
      },
    });
  }

  console.log('--- 19. Seed Messages & Websocket Sessions (10 bản ghi) ---');
  for (let i = 0; i < 10; i++) {
    await prisma.message.create({
      data: {
        senderId: users[i].id,
        receiverId: users[0].id, // Gửi tới Admin
        content: `Xin chào Admin, tôi cần hỗ trợ tư vấn chọn size cho đơn hàng #${1000 + i}!`,
      },
    });

    await prisma.websocketSession.create({
      data: {
        socketId: `socket_conn_id_realtime_${i}_${Date.now()}`,
        userId: users[i].id,
      },
    });
  }

  console.log(' SEED TOÀN BỘ 10 DATA MỖI BẢNG THÀNH CÔNG RỰC RỠ!');
}

main()
  .catch((e) => {
    console.error('Lỗi khi seed dữ liệu:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });