-- DropForeignKey
ALTER TABLE "SearchHistory" DROP CONSTRAINT "SearchHistory_MovieId_fkey";

-- AddForeignKey
ALTER TABLE "SearchHistory" ADD CONSTRAINT "SearchHistory_MovieId_fkey" FOREIGN KEY ("MovieId") REFERENCES "Movie"("MovieId") ON DELETE CASCADE ON UPDATE CASCADE;
