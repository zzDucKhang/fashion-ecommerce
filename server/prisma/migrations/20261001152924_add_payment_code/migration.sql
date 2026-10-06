/*
  Warnings:

  - A unique constraint covering the columns `[paymentCode]` on the table `PaymentTransaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `paymentCode` to the `PaymentTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PaymentTransaction" ADD COLUMN     "paymentCode" VARCHAR(255),
ALTER COLUMN "providerTransId" DROP NOT NULL;

-- Backfill existing data
UPDATE "PaymentTransaction" SET "paymentCode" = 'PAY_' || id WHERE "paymentCode" IS NULL;

-- AlterTable to set NOT NULL
ALTER TABLE "PaymentTransaction" ALTER COLUMN "paymentCode" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PaymentTransaction_paymentCode_key" ON "PaymentTransaction"("paymentCode");
