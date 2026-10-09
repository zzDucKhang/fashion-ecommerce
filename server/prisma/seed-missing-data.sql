-- =============================================================================
-- FASHION E-COMMERCE DATABASE INITIAL SEED (POSTGRESQL)
-- Seed missing essential data across all core modules:
-- 1. Identity: Roles, Permissions, Users, Shipping Addresses
-- 2. Catalog: Categories, Brands, Tags, Products, Images, Variants
-- 3. Loyalty & Engagement: Vouchers, Point Transactions, Reviews
-- 4. Inventory & Sale: Flash Sale Campaigns, Flash Sale Items
-- 5. Cart & Order: Sample Carts, Orders, Order Items, Shipments, Payments
-- 6. Chat: Support Chats, Messages
-- =============================================================================

BEGIN;

-- Standard Bcrypt Hash for 'Password@123'
-- $2b$10$6qpiXB5.kieeFvONnhSebeVq79Xtiwnk0f.u8hEVgJ8oumEaGZui6

-- 1. IDENTITY & ROLES VERIFICATION
INSERT INTO "Role" (id, code, name, "isActive", "createdAt", "updatedAt")
VALUES 
  (1, 'ADMIN', 'Quản trị viên tối cao', true, NOW(), NOW()),
  (2, 'STAFF', 'Nhân viên quản lý cửa hàng', true, NOW(), NOW()),
  (3, 'CUSTOMER', 'Khách hàng', true, NOW(), NOW())
ON CONFLICT (code) DO UPDATE SET name = EXCLUDED.name, "isActive" = true;

-- Adjust sequence for Role
SELECT setval(pg_get_serial_sequence('"Role"', 'id'), GREATEST((SELECT MAX(id) FROM "Role"), 3));

-- 2. USERS SEED
INSERT INTO "User" (id, email, "fullName", "phoneNumber", "passwordHash", "avatarUrl", "rewardPoints", status, "roleId", "createdAt", "updatedAt")
VALUES 
  (101, 'admin@fashionstore.com', 'Admin Quản Trị', '0901000001', '$2b$10$6qpiXB5.kieeFvONnhSebeVq79Xtiwnk0f.u8hEVgJ8oumEaGZui6', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', 5000, 'ACTIVE', 1, NOW(), NOW()),
  (102, 'staff@fashionstore.com', 'Trần Nhân Viên', '0901000002', '$2b$10$6qpiXB5.kieeFvONnhSebeVq79Xtiwnk0f.u8hEVgJ8oumEaGZui6', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', 200, 'ACTIVE', 2, NOW(), NOW()),
  (103, 'customer1@fashionstore.com', 'Lê Hoàng Nam', '0901000003', '$2b$10$6qpiXB5.kieeFvONnhSebeVq79Xtiwnk0f.u8hEVgJ8oumEaGZui6', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80', 1200, 'ACTIVE', 3, NOW(), NOW()),
  (104, 'customer2@fashionstore.com', 'Phạm Thị Thảo', '0901000004', '$2b$10$6qpiXB5.kieeFvONnhSebeVq79Xtiwnk0f.u8hEVgJ8oumEaGZui6', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80', 450, 'ACTIVE', 3, NOW(), NOW()),
  (105, 'binh.tran@fashionstore.com', 'Bình Trần', '0901000005', '$2b$10$6qpiXB5.kieeFvONnhSebeVq79Xtiwnk0f.u8hEVgJ8oumEaGZui6', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80', 800, 'ACTIVE', 3, NOW(), NOW()),
  (106, 'cuc.le@fashionstore.com', 'Cúc Lê', '0901000006', '$2b$10$6qpiXB5.kieeFvONnhSebeVq79Xtiwnk0f.u8hEVgJ8oumEaGZui6', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80', 1500, 'ACTIVE', 3, NOW(), NOW())
ON CONFLICT (email) DO UPDATE 
SET "fullName" = EXCLUDED."fullName",
    "passwordHash" = EXCLUDED."passwordHash",
    "roleId" = EXCLUDED."roleId",
    "rewardPoints" = EXCLUDED."rewardPoints",
    "updatedAt" = NOW();

SELECT setval(pg_get_serial_sequence('"User"', 'id'), GREATEST((SELECT MAX(id) FROM "User"), 106));

-- 3. SHIPPING ADDRESSES
INSERT INTO "ShippingAddress" (id, "userId", "receiverName", "phoneNumber", province, district, ward, "detailAddress", "isDefault", "createdAt", "updatedAt")
VALUES
  (201, 103, 'Lê Hoàng Nam', '0901000003', 'Thành phố Hồ Chí Minh', 'Quận 1', 'Phường Bến Nghé', '72 Lê Thánh Tôn', true, NOW(), NOW()),
  (202, 104, 'Phạm Thị Thảo', '0901000004', 'Thành phố Hồ Chí Minh', 'Quận 3', 'Phường Võ Thị Sáu', '123 Nam Kỳ Khởi Nghĩa', true, NOW(), NOW()),
  (203, 105, 'Bình Trần', '0901000005', 'Thành phố Hồ Chí Minh', 'Quận 1', 'Phường Bến Thành', '123 Lê Lợi', true, NOW(), NOW()),
  (204, 106, 'Cúc Lê', '0901000006', 'Thành phố Hồ Chí Minh', 'Quận 1', 'Phường Bến Nghé', '456 Nguyễn Huệ', true, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

SELECT setval(pg_get_serial_sequence('"ShippingAddress"', 'id'), GREATEST((SELECT MAX(id) FROM "ShippingAddress"), 204));

-- 4. CATEGORIES (Hierarchical)
INSERT INTO "Category" (id, "defaultName", "iconUrl", "isVisible", "parentId", "createdAt", "updatedAt")
VALUES
  (1, 'Thời Trang Nam', 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=100&q=80', true, NULL, NOW(), NOW()),
  (2, 'Thời Trang Nữ', 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=100&q=80', true, NULL, NOW(), NOW()),
  (3, 'Phụ Kiện', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=100&q=80', true, NULL, NOW(), NOW()),
  (4, 'Giày Dép', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=100&q=80', true, NULL, NOW(), NOW()),
  -- Subcategories
  (11, 'Áo Thun Nam', NULL, true, 1, NOW(), NOW()),
  (12, 'Áo Sơ Mi Nam', NULL, true, 1, NOW(), NOW()),
  (13, 'Quần Jeans Nam', NULL, true, 1, NOW(), NOW()),
  (21, 'Đầm & Váy Nữ', NULL, true, 2, NOW(), NOW()),
  (22, 'Áo Kiểu Nữ', NULL, true, 2, NOW(), NOW())
ON CONFLICT (id) DO UPDATE SET "defaultName" = EXCLUDED."defaultName", "parentId" = EXCLUDED."parentId";

SELECT setval(pg_get_serial_sequence('"Category"', 'id'), GREATEST((SELECT MAX(id) FROM "Category"), 22));

-- 5. BRANDS
INSERT INTO "Brand" (id, "defaultName", "logoUrl", "createdAt", "updatedAt")
VALUES
  (1, 'Nike', 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg', NOW(), NOW()),
  (2, 'Adidas', 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg', NOW(), NOW()),
  (3, 'Uniqlo', 'https://upload.wikimedia.org/wikipedia/commons/9/92/UNIQLO_logo.svg', NOW(), NOW()),
  (4, 'Zara', 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg', NOW(), NOW()),
  (5, 'Coolmate', 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=100&q=80', NOW(), NOW())
ON CONFLICT (id) DO UPDATE SET "defaultName" = EXCLUDED."defaultName";

SELECT setval(pg_get_serial_sequence('"Brand"', 'id'), GREATEST((SELECT MAX(id) FROM "Brand"), 5));

-- 6. TAGS
INSERT INTO "Tag" (id, name, "createdAt", "updatedAt")
VALUES
  (1, 'Trending', NOW(), NOW()),
  (2, 'New Arrival', NOW(), NOW()),
  (3, 'Best Seller', NOW(), NOW()),
  (4, 'Sale 50%', NOW(), NOW()),
  (5, 'Summer Collection', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

SELECT setval(pg_get_serial_sequence('"Tag"', 'id'), GREATEST((SELECT MAX(id) FROM "Tag"), 5));

-- 7. PRODUCTS
INSERT INTO "Product" (id, "defaultName", "thumbnailUrl", status, "categoryId", "brandId", "createdAt", "updatedAt")
VALUES
  (1, 'Áo Thun Nam Cotton Compact Siêu Mát', 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80', 'PUBLISHED', 11, 5, NOW(), NOW()),
  (2, 'Áo Sơ Mi Oxford Dài Tay Cao Cấp', 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80', 'PUBLISHED', 12, 3, NOW(), NOW()),
  (3, 'Quần Jeans Slim Fit Co Giãn 4 Chiều', 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80', 'PUBLISHED', 13, 4, NOW(), NOW()),
  (4, 'Váy Maxi Hoa Nhí Dáng Xòe Vintage', 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80', 'PUBLISHED', 21, 4, NOW(), NOW()),
  (5, 'Giày Sneaker Air Streetwear Low', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80', 'PUBLISHED', 4, 1, NOW(), NOW()),
  (6, 'Áo Hoodie Nỉ Bông Phối Màu Basic', 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80', 'PUBLISHED', 11, 2, NOW(), NOW())
ON CONFLICT (id) DO UPDATE 
SET "defaultName" = EXCLUDED."defaultName",
    "thumbnailUrl" = EXCLUDED."thumbnailUrl",
    status = EXCLUDED.status,
    "categoryId" = EXCLUDED."categoryId",
    "brandId" = EXCLUDED."brandId",
    "updatedAt" = NOW();

SELECT setval(pg_get_serial_sequence('"Product"', 'id'), GREATEST((SELECT MAX(id) FROM "Product"), 6));

-- 8. PRODUCT IMAGES
INSERT INTO "ProductImage" (id, "productId", "imageUrl", "displayOrder", "createdAt")
VALUES
  (1, 1, 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80', 1, NOW()),
  (2, 1, 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80', 2, NOW()),
  (3, 2, 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80', 1, NOW()),
  (4, 3, 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80', 1, NOW()),
  (5, 4, 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80', 1, NOW()),
  (6, 5, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80', 1, NOW())
ON CONFLICT (id) DO NOTHING;

SELECT setval(pg_get_serial_sequence('"ProductImage"', 'id'), GREATEST((SELECT MAX(id) FROM "ProductImage"), 6));

-- 9. PRODUCT VARIANTS
INSERT INTO "ProductVariant" (id, "productId", sku, "stockQuantity", "originalPrice", "sellingPrice", "weightGram", "imageUrl", variant, "variantValue", "createdAt", "updatedAt")
VALUES
  -- Product 1
  (1, 1, 'SKU-1000', 50, 250000.00, 199000.00, 250, 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80', 'Size / Màu', 'Trắng / M', NOW(), NOW()),
  (2, 1, 'SKU-1001', 40, 250000.00, 199000.00, 250, 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80', 'Size / Màu', 'Trắng / L', NOW(), NOW()),
  (3, 1, 'SKU-1002', 35, 250000.00, 199000.00, 250, 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80', 'Size / Màu', 'Đen / L', NOW(), NOW()),
  -- Product 2
  (4, 2, 'SKU-2001', 30, 450000.00, 380000.00, 300, 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80', 'Size / Màu', 'Xanh Nhạt / M', NOW(), NOW()),
  (5, 2, 'SKU-2002', 25, 450000.00, 380000.00, 300, 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80', 'Size / Màu', 'Trắng / L', NOW(), NOW()),
  -- Product 3
  (6, 3, 'SKU-3001', 45, 550000.00, 450000.00, 500, 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80', 'Size', 'Size 30', NOW(), NOW()),
  (7, 3, 'SKU-3002', 20, 550000.00, 450000.00, 500, 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80', 'Size', 'Size 31', NOW(), NOW()),
  -- Product 4
  (8, 4, 'SKU-4001', 20, 620000.00, 490000.00, 350, 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80', 'Size / Màu', 'Vàng Hoa / FreeSize', NOW(), NOW()),
  -- Product 5
  (9, 5, 'SKU-5001', 15, 1200000.00, 990000.00, 800, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80', 'Size', '41', NOW(), NOW()),
  (10, 5, 'SKU-5002', 18, 1200000.00, 990000.00, 800, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80', 'Size', '42', NOW(), NOW()),
  -- Product 6
  (11, 6, 'SKU-6001', 40, 420000.00, 320000.00, 450, 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80', 'Size / Màu', 'Xám / XL', NOW(), NOW())
ON CONFLICT (sku) DO UPDATE 
SET "stockQuantity" = EXCLUDED."stockQuantity",
    "sellingPrice" = EXCLUDED."sellingPrice",
    "updatedAt" = NOW();

SELECT setval(pg_get_serial_sequence('"ProductVariant"', 'id'), GREATEST((SELECT MAX(id) FROM "ProductVariant"), 11));

-- 10. PRODUCT TAG RELATIONS (_ProductTags)
INSERT INTO "_ProductTags" ("A", "B")
VALUES
  (1, 1), (1, 2), (1, 3),
  (2, 2), (2, 3),
  (3, 1), (3, 4),
  (4, 1), (4, 5),
  (5, 1), (5, 3),
  (6, 4)
ON CONFLICT DO NOTHING;

-- 11. VOUCHERS (Loyalty Module)
INSERT INTO "Voucher" (id, code, "discountType", "discountValue", "minOrderValue", "maxDiscountAmt", "totalUsageLimit", "usedCount", "userUsageLimit", "startDate", "endDate", "isActive", "createdAt", "updatedAt")
VALUES
  (1, 'WELCOME2026', 'PERCENTAGE', 15.00, 200000.00, 50000.00, 1000, 15, 1, NOW() - INTERVAL '7 days', NOW() + INTERVAL '90 days', true, NOW(), NOW()),
  (2, 'FREESHIP30K', 'FIXED_AMOUNT', 30000.00, 150000.00, 30000.00, 500, 32, 2, NOW() - INTERVAL '5 days', NOW() + INTERVAL '60 days', true, NOW(), NOW()),
  (3, 'VIPDISCOUNT', 'PERCENTAGE', 20.00, 500000.00, 200000.00, 100, 5, 1, NOW() - INTERVAL '2 days', NOW() + INTERVAL '30 days', true, NOW(), NOW()),
  (4, 'FLASH50K', 'FIXED_AMOUNT', 50000.00, 300000.00, 50000.00, 200, 8, 1, NOW() - INTERVAL '1 days', NOW() + INTERVAL '14 days', true, NOW(), NOW()),
  (5, 'MEGA100K', 'FIXED_AMOUNT', 100000.00, 800000.00, 100000.00, 50, 0, 1, NOW(), NOW() + INTERVAL '7 days', true, NOW(), NOW())
ON CONFLICT (code) DO UPDATE 
SET "discountValue" = EXCLUDED."discountValue",
    "minOrderValue" = EXCLUDED."minOrderValue",
    "isActive" = EXCLUDED."isActive",
    "updatedAt" = NOW();

SELECT setval(pg_get_serial_sequence('"Voucher"', 'id'), GREATEST((SELECT MAX(id) FROM "Voucher"), 5));

-- 12. FLASH SALE CAMPAIGN & ITEMS
INSERT INTO "FlashSaleCampaign" (id, name, "bannerUrl", "startTime", "endTime", "isActive", "createdAt", "updatedAt")
VALUES
  (1, 'Đại Tiệc Flash Sale Siêu Hè 2026', 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80', NOW() - INTERVAL '1 hour', NOW() + INTERVAL '48 hours', true, NOW(), NOW())
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, "isActive" = true;

SELECT setval(pg_get_serial_sequence('"FlashSaleCampaign"', 'id'), GREATEST((SELECT MAX(id) FROM "FlashSaleCampaign"), 1));

INSERT INTO "FlashSaleItem" (id, "campaignId", "variantId", "flashSalePrice", "promoQuantity", "soldQuantity")
VALUES
  (1, 1, 1, 149000.00, 30, 8),
  (2, 1, 4, 299000.00, 15, 3),
  (3, 1, 9, 790000.00, 10, 2)
ON CONFLICT ("campaignId", "variantId") DO UPDATE 
SET "flashSalePrice" = EXCLUDED."flashSalePrice",
    "promoQuantity" = EXCLUDED."promoQuantity";

SELECT setval(pg_get_serial_sequence('"FlashSaleItem"', 'id'), GREATEST((SELECT MAX(id) FROM "FlashSaleItem"), 3));

-- 13. CARTS & CART ITEMS
INSERT INTO "Cart" (id, "userId", "sessionId", "createdAt", "updatedAt")
VALUES
  (1, 103, NULL, NOW(), NOW()),
  (2, 104, NULL, NOW(), NOW()),
  (3, 105, NULL, NOW(), NOW()),
  (4, 106, NULL, NOW(), NOW())
ON CONFLICT ("userId") DO UPDATE SET "updatedAt" = NOW();

SELECT setval(pg_get_serial_sequence('"Cart"', 'id'), GREATEST((SELECT MAX(id) FROM "Cart"), 4));

INSERT INTO "CartItem" (id, "cartId", "variantId", quantity, "createdAt", "updatedAt")
VALUES
  (1, 1, 1, 2, NOW(), NOW()),
  (2, 1, 4, 1, NOW(), NOW()),
  (3, 3, 1, 1, NOW(), NOW()),
  (4, 4, 1, 1, NOW(), NOW())
ON CONFLICT ("cartId", "variantId") DO UPDATE SET quantity = EXCLUDED.quantity;

SELECT setval(pg_get_serial_sequence('"CartItem"', 'id'), GREATEST((SELECT MAX(id) FROM "CartItem"), 4));

-- 14. ORDERS & ORDER ITEMS
INSERT INTO "Order" (id, "orderCode", "userId", "shippingAddress", "subTotal", "shippingFee", "shippingMethod", "shippingDiscount", "voucherCode", "voucherDiscount", "pointUsed", "pointDiscount", "pointEarned", "totalAmount", "paymentMethod", "paymentStatus", status, "customerNote", "orderDate", "createdAt", "updatedAt")
VALUES
  (1, 'ORD-202610-001', 103, '72 Lê Thánh Tôn, Phường Bến Nghé, Quận 1, TP.HCM', 778000.00, 30000.00, 'STANDARD', 30000.00, 'FREESHIP30K', 30000.00, 20, 20000.00, 77, 758000.00, 'COD', 'PENDING', 'DELIVERED', 'Giao giờ hành chính', NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days', NOW()),
  (2, 'ORD-202610-002', 104, '123 Nam Kỳ Khởi Nghĩa, Phường Võ Thị Sáu, Quận 3, TP.HCM', 490000.00, 30000.00, 'STANDARD', 0.00, 'WELCOME2026', 50000.00, 0, 0.00, 47, 470000.00, 'BANK_TRANSFER', 'SUCCESS', 'PROCESSING', 'Gọi trước khi giao', NOW() - INTERVAL '1 days', NOW() - INTERVAL '1 days', NOW()),
  (3, 'ORD-202610-003', 105, '123 Lê Lợi, Phường Bến Thành, Quận 1, TP.HCM', 199000.00, 30000.00, 'STANDARD', 0.00, NULL, 0.00, 0, 0.00, 20, 229000.00, 'COD', 'PENDING', 'CONFIRMED', NULL, NOW(), NOW(), NOW())
ON CONFLICT ("orderCode") DO UPDATE SET status = EXCLUDED.status, "updatedAt" = NOW();

SELECT setval(pg_get_serial_sequence('"Order"', 'id'), GREATEST((SELECT MAX(id) FROM "Order"), 3));

INSERT INTO "OrderItem" (id, "orderId", "variantId", "productName", "skuCode", "variantValue", "productImageUrl", "unitPrice", quantity, "createdAt")
VALUES
  (1, 1, 1, 'Áo Thun Nam Cotton Compact Siêu Mát', 'SKU-1000', 'Trắng / M', 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80', 199000.00, 2, NOW()),
  (2, 1, 4, 'Áo Sơ Mi Oxford Dài Tay Cao Cấp', 'SKU-2001', 'Xanh Nhạt / M', 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80', 380000.00, 1, NOW()),
  (3, 2, 8, 'Váy Maxi Hoa Nhí Dáng Xòe Vintage', 'SKU-4001', 'Vàng Hoa / FreeSize', 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80', 490000.00, 1, NOW()),
  (4, 3, 1, 'Áo Thun Nam Cotton Compact Siêu Mát', 'SKU-1000', 'Trắng / M', 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80', 199000.00, 1, NOW())
ON CONFLICT (id) DO NOTHING;

SELECT setval(pg_get_serial_sequence('"OrderItem"', 'id'), GREATEST((SELECT MAX(id) FROM "OrderItem"), 4));

-- 15. SHIPMENT & PAYMENT TRANSACTIONS
INSERT INTO "Shipment" (id, "orderId", carrier, "trackingCode", "actualShippingFee", status, "estimatedDelivery", "createdAt", "updatedAt")
VALUES
  (1, 1, 'GIAO_HANG_NHANH', 'GHN-VN-9823101', 28000.00, 'DELIVERED', NOW() - INTERVAL '1 days', NOW(), NOW()),
  (2, 2, 'GIAO_HANG_TIET_KIEM', 'GHTK-VN-5491023', 25000.00, 'IN_TRANSIT', NOW() + INTERVAL '1 days', NOW(), NOW())
ON CONFLICT ("orderId") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"Shipment"', 'id'), GREATEST((SELECT MAX(id) FROM "Shipment"), 2));

INSERT INTO "PaymentTransaction" (id, "orderId", provider, "providerTransId", amount, status, "createdAt", "updatedAt")
VALUES
  (1, 2, 'SEPAY', 'TXN_SEPAY_202610_8849', 470000.00, 'SUCCESS', NOW() - INTERVAL '1 days', NOW())
ON CONFLICT ("orderId") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"PaymentTransaction"', 'id'), GREATEST((SELECT MAX(id) FROM "PaymentTransaction"), 1));

-- 16. POINT TRANSACTIONS (Loyalty Module)
INSERT INTO "PointTransaction" (id, "userId", "orderId", "pointChange", "currentPoint", "transactionType", description, "createdAt")
VALUES
  (1, 103, 1, 77, 1200, 'EARN', 'Tích điểm cho đơn hàng #ORD-202610-001', NOW() - INTERVAL '1 days'),
  (2, 103, 1, -20, 1123, 'REDEEM', 'Sử dụng điểm cho đơn hàng #ORD-202610-001', NOW() - INTERVAL '3 days'),
  (3, 104, 2, 47, 450, 'EARN', 'Tích điểm cho đơn hàng #ORD-202610-002', NOW())
ON CONFLICT (id) DO NOTHING;

SELECT setval(pg_get_serial_sequence('"PointTransaction"', 'id'), GREATEST((SELECT MAX(id) FROM "PointTransaction"), 3));

-- 17. PRODUCT REVIEWS & MEDIA
INSERT INTO "ProductReview" (id, "productId", "userId", "orderId", rating, content, "shopReply", "isHidden", "createdAt", "updatedAt")
VALUES
  (1, 1, 103, 1, 5, 'Vải cotton compact rất mềm mịn và thấm hút mồ hôi tốt. Đường may chuẩn, form áo ôm vừa vặn!', 'Cảm ơn bạn đã tin tưởng và ủng hộ Fashion Store!', false, NOW() - INTERVAL '1 days', NOW()),
  (2, 2, 103, 1, 4, 'Áo sơ mi vải oxford đứng form, màu sắc nhã nhặn, giao hàng nhanh.', NULL, false, NOW() - INTERVAL '1 days', NOW())
ON CONFLICT ("orderId", "productId") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"ProductReview"', 'id'), GREATEST((SELECT MAX(id) FROM "ProductReview"), 2));

INSERT INTO "ReviewMedia" (id, "reviewId", "mediaUrl", "mediaType")
VALUES
  (1, 1, 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80', 'IMAGE')
ON CONFLICT (id) DO NOTHING;

SELECT setval(pg_get_serial_sequence('"ReviewMedia"', 'id'), GREATEST((SELECT MAX(id) FROM "ReviewMedia"), 1));

-- 18. CHAT & MESSAGES
INSERT INTO "Chat" (id, "userId", status, "startedAt", "createdAt", "updatedAt")
VALUES
  (1, 103, 'OPEN', NOW() - INTERVAL '2 hours', NOW(), NOW()),
  (2, 104, 'CLOSED', NOW() - INTERVAL '1 days', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

SELECT setval(pg_get_serial_sequence('"Chat"', 'id'), GREATEST((SELECT MAX(id) FROM "Chat"), 2));

INSERT INTO "Message" (id, "chatId", "senderId", content, "isRead", "sendDate", "createdAt")
VALUES
  (1, 1, 103, 'Chào shop, áo thun cotton compact size L cho người cao 1m75 nặng 70kg có vừa không ạ?', true, NOW() - INTERVAL '2 hours', NOW()),
  (2, 1, 102, 'Dạ chào bạn Nam! Với số đo 1m75 và 70kg thì bạn mặc size L là vừa vặn, thoải mái luôn nhé!', true, NOW() - INTERVAL '1 hour 50 minutes', NOW()),
  (3, 1, 103, 'Cảm ơn shop nhiều, mình vừa đặt 2 áo rồi nhé.', false, NOW() - INTERVAL '1 hour 30 minutes', NOW())
ON CONFLICT (id) DO NOTHING;

SELECT setval(pg_get_serial_sequence('"Message"', 'id'), GREATEST((SELECT MAX(id) FROM "Message"), 3));

COMMIT;
