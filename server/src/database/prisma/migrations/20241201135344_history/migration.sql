

-- CreateTable
CREATE TABLE "SearchHistory" (
    "SearchHistoryId" TEXT NOT NULL,
    "Query" TEXT NOT NULL,
    "MovieId" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,

    CONSTRAINT "SearchHistory_pkey" PRIMARY KEY ("SearchHistoryId")
);

-- AddForeignKey
ALTER TABLE "SearchHistory" ADD CONSTRAINT "SearchHistory_MovieId_fkey" FOREIGN KEY ("MovieId") REFERENCES "Movie"("MovieId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SearchHistory" ADD CONSTRAINT "SearchHistory_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;
