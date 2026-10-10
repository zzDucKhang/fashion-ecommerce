-- ==========================================
-- TỐI ƯU CƠ SỞ DỮ LIỆU: SQL PROCEDURES & TRIGGERS
-- ==========================================

-- 1. MATERIALIZED RATING & REVIEW COUNT (Bảng Product)
-- Triggers cập nhật tự động `averageRating` và `reviewCount` vào bảng Product mỗi khi có ProductReview mới/được duyệt.
-- Tránh việc phải tính trung bình cộng (AVG) và COUNT mỗi lần hiển thị danh sách sản phẩm.

CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        -- Cập nhật averageRating và reviewCount cho productId mới
        UPDATE "Product"
        SET 
            "reviewCount" = (
                SELECT COUNT(*) 
                FROM "ProductReview" 
                WHERE "productId" = NEW."productId" AND "isHidden" = false AND "deletedAt" IS NULL
            ),
            "averageRating" = COALESCE((
                SELECT ROUND(AVG(rating)::numeric, 1) 
                FROM "ProductReview" 
                WHERE "productId" = NEW."productId" AND "isHidden" = false AND "deletedAt" IS NULL
            ), 0)
        WHERE id = NEW."productId";
    END IF;

    IF TG_OP = 'DELETE' OR (TG_OP = 'UPDATE' AND OLD."productId" != NEW."productId") THEN
        -- Cập nhật lại cho productId cũ (nếu chuyển review sang product khác hoặc xóa review)
        UPDATE "Product"
        SET 
            "reviewCount" = (
                SELECT COUNT(*) 
                FROM "ProductReview" 
                WHERE "productId" = OLD."productId" AND "isHidden" = false AND "deletedAt" IS NULL
            ),
            "averageRating" = COALESCE((
                SELECT ROUND(AVG(rating)::numeric, 1) 
                FROM "ProductReview" 
                WHERE "productId" = OLD."productId" AND "isHidden" = false AND "deletedAt" IS NULL
            ), 0)
        WHERE id = OLD."productId";
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_update_product_rating ON "ProductReview";

CREATE TRIGGER trg_update_product_rating
AFTER INSERT OR UPDATE OR DELETE ON "ProductReview"
FOR EACH ROW
EXECUTE FUNCTION update_product_rating();
