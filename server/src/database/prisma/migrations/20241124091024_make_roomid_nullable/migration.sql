/*
  Warnings:

  - Added the required column `Price` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "Price" DECIMAL(8,2) NOT NULL,
ALTER COLUMN "RoomId" DROP NOT NULL;
