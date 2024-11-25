/*
  Warnings:

  - You are about to drop the column `Date` on the `Schedule` table. All the data in the column will be lost.
  - Added the required column `IsUsed` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `EndDate` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `StartDate` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "IsUsed" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "Date",
ADD COLUMN     "EndDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "StartDate" TIMESTAMP(3) NOT NULL;
