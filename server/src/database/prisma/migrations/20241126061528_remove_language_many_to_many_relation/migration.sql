/*
  Warnings:

  - You are about to drop the column `RoomId` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the `MovieLanguage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `LanguageId` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MovieLanguage" DROP CONSTRAINT "MovieLanguage_LanguageId_fkey";

-- DropForeignKey
ALTER TABLE "MovieLanguage" DROP CONSTRAINT "MovieLanguage_MovieId_fkey";

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "RoomId",
ADD COLUMN     "LanguageId" TEXT NOT NULL,
ALTER COLUMN "ReleaseDate" DROP NOT NULL;

-- DropTable
DROP TABLE "MovieLanguage";

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_LanguageId_fkey" FOREIGN KEY ("LanguageId") REFERENCES "Language"("LanguageId") ON DELETE RESTRICT ON UPDATE CASCADE;
