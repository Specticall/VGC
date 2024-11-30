-- DropForeignKey
ALTER TABLE "MovieCast" DROP CONSTRAINT "MovieCast_CastId_fkey";

-- DropForeignKey
ALTER TABLE "MovieCast" DROP CONSTRAINT "MovieCast_MovieId_fkey";

-- DropForeignKey
ALTER TABLE "MovieGenre" DROP CONSTRAINT "MovieGenre_GenreId_fkey";

-- DropForeignKey
ALTER TABLE "MovieGenre" DROP CONSTRAINT "MovieGenre_MovieId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_ReservationId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_ScheduleId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_UserId_fkey";

-- DropForeignKey
ALTER TABLE "ReservationSeat" DROP CONSTRAINT "ReservationSeat_ReservationId_fkey";

-- DropForeignKey
ALTER TABLE "ReservationSeat" DROP CONSTRAINT "ReservationSeat_SeatId_fkey";

-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_CinemaId_fkey";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_MovieId_fkey";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_RoomId_fkey";

-- DropForeignKey
ALTER TABLE "Seat" DROP CONSTRAINT "Seat_RoomId_fkey";

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("UserId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_ScheduleId_fkey" FOREIGN KEY ("ScheduleId") REFERENCES "Schedule"("ScheduleId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieGenre" ADD CONSTRAINT "MovieGenre_MovieId_fkey" FOREIGN KEY ("MovieId") REFERENCES "Movie"("MovieId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieGenre" ADD CONSTRAINT "MovieGenre_GenreId_fkey" FOREIGN KEY ("GenreId") REFERENCES "Genre"("GenreId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieCast" ADD CONSTRAINT "MovieCast_MovieId_fkey" FOREIGN KEY ("MovieId") REFERENCES "Movie"("MovieId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieCast" ADD CONSTRAINT "MovieCast_CastId_fkey" FOREIGN KEY ("CastId") REFERENCES "Cast"("CastId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_CinemaId_fkey" FOREIGN KEY ("CinemaId") REFERENCES "Cinema"("CinemaId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_RoomId_fkey" FOREIGN KEY ("RoomId") REFERENCES "Room"("RoomId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationSeat" ADD CONSTRAINT "ReservationSeat_ReservationId_fkey" FOREIGN KEY ("ReservationId") REFERENCES "Reservation"("ReservationId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationSeat" ADD CONSTRAINT "ReservationSeat_SeatId_fkey" FOREIGN KEY ("SeatId") REFERENCES "Seat"("SeatId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_RoomId_fkey" FOREIGN KEY ("RoomId") REFERENCES "Room"("RoomId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_MovieId_fkey" FOREIGN KEY ("MovieId") REFERENCES "Movie"("MovieId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_ReservationId_fkey" FOREIGN KEY ("ReservationId") REFERENCES "Reservation"("ReservationId") ON DELETE CASCADE ON UPDATE CASCADE;
