/*
  Warnings:

  - The primary key for the `Genre` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `GenreId` on the `Genre` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `GenreId` on the `MovieGenre` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "MovieGenre" DROP CONSTRAINT "MovieGenre_GenreId_fkey";

-- AlterTable
ALTER TABLE "Genre" DROP CONSTRAINT "Genre_pkey",
DROP COLUMN "GenreId",
ADD COLUMN     "GenreId" INTEGER NOT NULL,
ADD CONSTRAINT "Genre_pkey" PRIMARY KEY ("GenreId");

-- AlterTable
ALTER TABLE "MovieGenre" DROP COLUMN "GenreId",
ADD COLUMN     "GenreId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "MovieGenre" ADD CONSTRAINT "MovieGenre_GenreId_fkey" FOREIGN KEY ("GenreId") REFERENCES "Genre"("GenreId") ON DELETE RESTRICT ON UPDATE CASCADE;
