/*
  Warnings:

  - You are about to drop the column `EndDate` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `StartDate` on the `Schedule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "EndDate",
DROP COLUMN "StartDate";
