/*
  Warnings:

  - You are about to drop the column `Type` on the `Seat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Seat" DROP COLUMN "Type";

-- DropEnum
DROP TYPE "SeatType";
