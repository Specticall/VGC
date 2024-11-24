/*
  Warnings:

  - The primary key for the `Genre` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "MovieGenre" DROP CONSTRAINT "MovieGenre_GenreId_fkey";

-- AlterTable
ALTER TABLE "Genre" DROP CONSTRAINT "Genre_pkey",
ALTER COLUMN "GenreId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Genre_pkey" PRIMARY KEY ("GenreId");

-- AlterTable
ALTER TABLE "MovieGenre" ALTER COLUMN "GenreId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "MovieGenre" ADD CONSTRAINT "MovieGenre_GenreId_fkey" FOREIGN KEY ("GenreId") REFERENCES "Genre"("GenreId") ON DELETE RESTRICT ON UPDATE CASCADE;
