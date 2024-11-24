/*
  Warnings:

  - Added the required column `IsoCode` to the `Language` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Language" ADD COLUMN     "IsoCode" TEXT NOT NULL;
