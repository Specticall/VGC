-- CreateEnum
CREATE TYPE "Status" AS ENUM ('COMING_SOON', 'NOW_SHOWING', 'END_OF_SHOWING');

-- CreateEnum
CREATE TYPE "Row" AS ENUM ('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K');

-- CreateEnum
CREATE TYPE "SeatType" AS ENUM ('REGULAR', 'VIP');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "AgeRestriction" AS ENUM ('SU', 'R13', 'D17');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CREDIT_CARD', 'PAYPAL', 'BANK_TRANSFER', 'CASH');

-- CreateTable
CREATE TABLE "User" (
    "UserId" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "ProfilePicture" TEXT,
    "Point" INTEGER NOT NULL,
    "Age" INTEGER NOT NULL,
    "Role" "UserRole" NOT NULL DEFAULT 'USER',
    "DateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("UserId")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "ReservationId" TEXT NOT NULL,
    "TotalPrice" DECIMAL(8,2) NOT NULL,
    "UserId" TEXT NOT NULL,
    "MovieId" TEXT NOT NULL,
    "ScheduleId" TEXT NOT NULL,
    "Reminder1Status" BOOLEAN NOT NULL,
    "Reminder2Status" BOOLEAN NOT NULL,
    "Reminder3Status" BOOLEAN NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("ReservationId")
);

-- CreateTable
CREATE TABLE "Movie" (
    "MovieId" TEXT NOT NULL,
    "RoomId" TEXT NOT NULL,
    "Title" TEXT NOT NULL,
    "Tagline" TEXT NOT NULL,
    "DurationMinutes" INTEGER NOT NULL,
    "Rating" DECIMAL(3,2) NOT NULL DEFAULT 0.00,
    "Poster" TEXT,
    "Backdrop" TEXT,
    "Trailer" TEXT,
    "Status" "Status" NOT NULL,
    "AgeRestriction" "AgeRestriction" NOT NULL,
    "ReleaseDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("MovieId")
);

-- CreateTable
CREATE TABLE "Language" (
    "LanguageId" TEXT NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("LanguageId")
);

-- CreateTable
CREATE TABLE "MovieLanguage" (
    "MovieLanguageId" TEXT NOT NULL,
    "MovieId" TEXT NOT NULL,
    "LanguageId" TEXT NOT NULL,

    CONSTRAINT "MovieLanguage_pkey" PRIMARY KEY ("MovieLanguageId")
);

-- CreateTable
CREATE TABLE "Genre" (
    "GenreId" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("GenreId")
);

-- CreateTable
CREATE TABLE "MovieGenre" (
    "MovieGenreId" TEXT NOT NULL,
    "MovieId" TEXT NOT NULL,
    "GenreId" INTEGER NOT NULL,

    CONSTRAINT "MovieGenre_pkey" PRIMARY KEY ("MovieGenreId")
);

-- CreateTable
CREATE TABLE "Cast" (
    "CastId" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Image" TEXT NOT NULL,
    "Character" TEXT NOT NULL,
    "MovieId" TEXT NOT NULL,

    CONSTRAINT "Cast_pkey" PRIMARY KEY ("CastId")
);

-- CreateTable
CREATE TABLE "Cinema" (
    "CinemaId" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Location" TEXT NOT NULL,
    "Contact" TEXT,

    CONSTRAINT "Cinema_pkey" PRIMARY KEY ("CinemaId")
);

-- CreateTable
CREATE TABLE "Room" (
    "RoomId" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "SeatCapacity" INTEGER NOT NULL,
    "CinemaId" TEXT NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("RoomId")
);

-- CreateTable
CREATE TABLE "Seat" (
    "SeatId" TEXT NOT NULL,
    "RoomId" TEXT NOT NULL,
    "Row" "Row" NOT NULL,
    "Number" INTEGER NOT NULL,
    "Type" "SeatType" NOT NULL,

    CONSTRAINT "Seat_pkey" PRIMARY KEY ("SeatId")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "ScheduleId" TEXT NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL,
    "StartTime" TIMESTAMP(3) NOT NULL,
    "EndTime" TIMESTAMP(3) NOT NULL,
    "Price" DECIMAL(8,2) NOT NULL,
    "RoomId" TEXT NOT NULL,
    "MovieId" TEXT NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("ScheduleId")
);

-- CreateTable
CREATE TABLE "Payment" (
    "PaymentId" TEXT NOT NULL,
    "Method" "PaymentMethod" NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ReservationId" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("PaymentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_ReservationId_key" ON "Payment"("ReservationId");

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_ScheduleId_fkey" FOREIGN KEY ("ScheduleId") REFERENCES "Schedule"("ScheduleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieLanguage" ADD CONSTRAINT "MovieLanguage_MovieId_fkey" FOREIGN KEY ("MovieId") REFERENCES "Movie"("MovieId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieLanguage" ADD CONSTRAINT "MovieLanguage_LanguageId_fkey" FOREIGN KEY ("LanguageId") REFERENCES "Language"("LanguageId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieGenre" ADD CONSTRAINT "MovieGenre_MovieId_fkey" FOREIGN KEY ("MovieId") REFERENCES "Movie"("MovieId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieGenre" ADD CONSTRAINT "MovieGenre_GenreId_fkey" FOREIGN KEY ("GenreId") REFERENCES "Genre"("GenreId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cast" ADD CONSTRAINT "Cast_MovieId_fkey" FOREIGN KEY ("MovieId") REFERENCES "Movie"("MovieId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_CinemaId_fkey" FOREIGN KEY ("CinemaId") REFERENCES "Cinema"("CinemaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_RoomId_fkey" FOREIGN KEY ("RoomId") REFERENCES "Room"("RoomId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_RoomId_fkey" FOREIGN KEY ("RoomId") REFERENCES "Room"("RoomId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_MovieId_fkey" FOREIGN KEY ("MovieId") REFERENCES "Movie"("MovieId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_ReservationId_fkey" FOREIGN KEY ("ReservationId") REFERENCES "Reservation"("ReservationId") ON DELETE RESTRICT ON UPDATE CASCADE;
