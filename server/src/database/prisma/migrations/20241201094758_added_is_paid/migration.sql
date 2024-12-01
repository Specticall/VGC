/*
  Warnings:

  - You are about to drop the column `Method` on the `Payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "Method",
ADD COLUMN     "IsPaid" BOOLEAN NOT NULL DEFAULT false;

-- DropEnum
DROP TYPE "PaymentMethod";
