/*
  Warnings:

  - A unique constraint covering the columns `[paymentCode]` on the table `PaymentTransaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `paymentCode` to the `PaymentTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PaymentTransaction" ADD COLUMN     "paymentCode" VARCHAR(255) NOT NULL,
ALTER COLUMN "providerTransId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PaymentTransaction_paymentCode_key" ON "PaymentTransaction"("paymentCode");
