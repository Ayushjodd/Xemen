/*
  Warnings:
  - You are about to drop the column `status` on the `Order` table. All the data in the column will be lost.
  - Added the required column `Orderstatus` to the `Order` table without a default value. This is not possible if the table is not empty.
*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "status",
ADD COLUMN     "Orderstatus" "Status" NOT NULL;