/*
  Warnings:

  - You are about to drop the column `EndTime` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `Price` on the `Schedule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "EndTime",
DROP COLUMN "Price";
