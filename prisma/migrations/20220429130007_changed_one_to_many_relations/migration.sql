/*
  Warnings:

  - You are about to drop the column `productId` on the `Purchase` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[customerId]` on the table `Purchase` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `purchaseId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_productId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "purchaseId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "productId";

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_customerId_key" ON "Purchase"("customerId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
