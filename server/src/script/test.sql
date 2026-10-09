DO $$
DECLARE
  v_user1_id INT;
  v_user2_id INT;
  v_address1_id INT;
  v_address2_id INT;
  v_variant_id INT;
  v_cart1_id INT;
  v_cart2_id INT;
  -- Chuỗi hash chuẩn của Password@123
  v_hash VARCHAR := '$2b$10$6qpiXB5.kieeFvONnhSebeVq79Xtiwnk0f.u8hEVgJ8oumEaGZui6';
BEGIN
  ---------------------------------------------------------
  -- 1. KHỞI TẠO HOẶC CẬP NHẬT USER VÀ PASSWORD
  ---------------------------------------------------------
  INSERT INTO "User" (email, password, name, "updatedAt") 
  VALUES ('binh.tran@fashionstore.com', v_hash, 'Bình Trần', NOW())
  ON CONFLICT (email) DO UPDATE SET password = EXCLUDED.password
  RETURNING id INTO v_user1_id;

  INSERT INTO "User" (email, password, name, "updatedAt") 
  VALUES ('cuc.le@fashionstore.com', v_hash, 'Cúc Lê', NOW())
  ON CONFLICT (email) DO UPDATE SET password = EXCLUDED.password
  RETURNING id INTO v_user2_id;

  ---------------------------------------------------------
  -- 2. TẠO ĐỊA CHỈ MỚI CHO TỪNG USER
  ---------------------------------------------------------
  INSERT INTO "Address" ("userId", street, city, "isDefault", "updatedAt")
  VALUES (v_user1_id, '123 Lê Lợi (Test Race 1)', 'HCM', true, NOW())
  RETURNING id INTO v_address1_id;

  INSERT INTO "Address" ("userId", street, city, "isDefault", "updatedAt")
  VALUES (v_user2_id, '456 Nguyễn Huệ (Test Race 2)', 'HCM', true, NOW())
  RETURNING id INTO v_address2_id;

  ---------------------------------------------------------
  -- 3. XỬ LÝ TỒN KHO = 1 (OPTIMISTIC LOCK)
  ---------------------------------------------------------
  -- Lấy ID của SKU-1000
  SELECT id INTO v_variant_id FROM "ProductVariant" WHERE sku = 'SKU-1000';
  
  -- Ép số lượng tồn kho về đúng 1
  UPDATE "ProductVariant" SET "stockQuantity" = 1 WHERE id = v_variant_id;

  ---------------------------------------------------------
  -- 4. TẠO HOẶC LẤY CART
  ---------------------------------------------------------
  INSERT INTO "Cart" ("userId", "updatedAt") VALUES (v_user1_id, NOW())
  ON CONFLICT ("userId") DO UPDATE SET "updatedAt" = NOW() RETURNING id INTO v_cart1_id;

  INSERT INTO "Cart" ("userId", "updatedAt") VALUES (v_user2_id, NOW())
  ON CONFLICT ("userId") DO UPDATE SET "updatedAt" = NOW() RETURNING id INTO v_cart2_id;

  ---------------------------------------------------------
  -- 5. XÓA SẠCH GIỎ HÀNG CŨ & THÊM LẠI SẢN PHẨM MỚI
  ---------------------------------------------------------
  DELETE FROM "CartItem" WHERE "cartId" IN (v_cart1_id, v_cart2_id);

  INSERT INTO "CartItem" ("cartId", "variantId", "quantity", "updatedAt")
  VALUES (v_cart1_id, v_variant_id, 1, NOW());

  INSERT INTO "CartItem" ("cartId", "variantId", "quantity", "updatedAt")
  VALUES (v_cart2_id, v_variant_id, 1, NOW());

  ---------------------------------------------------------
  -- 6. IN RA KẾT QUẢ ĐỂ CHÈN VÀO TESTRACE.JS
  ---------------------------------------------------------
  RAISE NOTICE '==================================================';
  RAISE NOTICE '✅ SEED THÀNH CÔNG!';
  RAISE NOTICE '📌 COPY 2 ID NÀY VÀO MẢNG "users" TRONG testrace.js:';
  RAISE NOTICE 'User 1 (Bình) -> addressId: %', v_address1_id;
  RAISE NOTICE 'User 2 (Cúc)  -> addressId: %', v_address2_id;
  RAISE NOTICE '==================================================';
END $$;