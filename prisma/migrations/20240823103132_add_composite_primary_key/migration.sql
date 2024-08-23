/*
  Warnings:

  - The primary key for the `CartItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `CartItem` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ALTER COLUMN "quantity" DROP DEFAULT,
ADD CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id");
