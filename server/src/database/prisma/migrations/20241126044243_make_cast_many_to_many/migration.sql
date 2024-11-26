/*
  Warnings:

  - You are about to drop the column `MovieId` on the `Cast` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cast" DROP CONSTRAINT "Cast_MovieId_fkey";

-- AlterTable
ALTER TABLE "Cast" DROP COLUMN "MovieId";

-- CreateTable
CREATE TABLE "MovieCast" (
    "MovieCastId" TEXT NOT NULL,
    "MovieId" TEXT NOT NULL,
    "CastId" TEXT NOT NULL,

    CONSTRAINT "MovieCast_pkey" PRIMARY KEY ("MovieCastId")
);

-- AddForeignKey
ALTER TABLE "MovieCast" ADD CONSTRAINT "MovieCast_MovieId_fkey" FOREIGN KEY ("MovieId") REFERENCES "Movie"("MovieId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieCast" ADD CONSTRAINT "MovieCast_CastId_fkey" FOREIGN KEY ("CastId") REFERENCES "Cast"("CastId") ON DELETE RESTRICT ON UPDATE CASCADE;
