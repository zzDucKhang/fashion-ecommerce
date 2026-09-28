-- Allow carts to belong to a browser session without a registered user.
ALTER TABLE "Cart" ALTER COLUMN "userId" DROP NOT NULL;
DROP INDEX IF EXISTS "Cart_userId_key";
CREATE UNIQUE INDEX "Cart_sessionId_key" ON "Cart"("sessionId");

-- Keep the selected delivery method with the order.
ALTER TABLE "Order" ADD COLUMN "shippingMethod" VARCHAR(50) NOT NULL DEFAULT 'STANDARD';