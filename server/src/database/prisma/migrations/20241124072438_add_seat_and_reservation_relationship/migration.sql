/*
  Warnings:

  - The values [CREDIT_CARD,PAYPAL,BANK_TRANSFER,CASH] on the enum `PaymentMethod` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `MovieId` on the `Reservation` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PaymentMethod_new" AS ENUM ('GOPAY', 'BCA', 'BNI', 'MANDIRI', 'QRIS');
ALTER TABLE "Payment" ALTER COLUMN "Method" TYPE "PaymentMethod_new" USING ("Method"::text::"PaymentMethod_new");
ALTER TYPE "PaymentMethod" RENAME TO "PaymentMethod_old";
ALTER TYPE "PaymentMethod_new" RENAME TO "PaymentMethod";
DROP TYPE "PaymentMethod_old";
COMMIT;

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "MovieId";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "Point" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "ReservationSeat" (
    "ReservationSeatId" TEXT NOT NULL,
    "ReservationId" TEXT NOT NULL,
    "SeatId" TEXT NOT NULL,

    CONSTRAINT "ReservationSeat_pkey" PRIMARY KEY ("ReservationSeatId")
);

-- AddForeignKey
ALTER TABLE "ReservationSeat" ADD CONSTRAINT "ReservationSeat_ReservationId_fkey" FOREIGN KEY ("ReservationId") REFERENCES "Reservation"("ReservationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationSeat" ADD CONSTRAINT "ReservationSeat_SeatId_fkey" FOREIGN KEY ("SeatId") REFERENCES "Seat"("SeatId") ON DELETE RESTRICT ON UPDATE CASCADE;
