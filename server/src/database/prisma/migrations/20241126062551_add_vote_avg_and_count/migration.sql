-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "VoteAverage" DECIMAL(3,2) NOT NULL DEFAULT 0.00,
ADD COLUMN     "VoteCount" INTEGER NOT NULL DEFAULT 0;