/*
  Warnings:

  - You are about to drop the column `purchaseId` on the `Product` table. All the data in the column will be lost.
  - Added the required column `customerId` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_purchaseId_fkey";

-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_id_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "purchaseId";

-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "customerId" INTEGER NOT NULL,
ADD COLUMN     "productId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
