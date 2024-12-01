import { snapApi } from "@/config/config";
import { AppError, STATUS, successRes } from "@/utils";
import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";

const prisma = new PrismaClient();

export const createSnapTransaction: RequestHandler = async (req, res, next) => {
  try {
    const { id: userId } = req.body.payload;
    const { seatIds, scheduleId } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        UserId: userId,
      },
    });

    if (!user) {
      throw new AppError("User not found", STATUS.NOT_FOUND);
    }

    const schedule = await prisma.schedule.findUnique({
      where: {
        ScheduleId: scheduleId,
      },
    });

    const movie = await prisma.movie.findUnique({
      where: {
        MovieId: schedule?.MovieId,
      },
    });

    if (!movie) {
      throw new AppError("Movie not found", STATUS.NOT_FOUND);
    }

    const seats = await prisma.seat.findMany({
      where: {
        SeatId: {
          in: seatIds,
        },
      },
    });

    const roomIdsFromSeats = seats.map((seat) => seat.RoomId);
    const uniqueRoomIds = new Set(roomIdsFromSeats);

    if (uniqueRoomIds.size > 1) {
      throw new AppError(
        "SeatIds must be in the same room",
        STATUS.BAD_REQUEST
      );
    }

    const name = user?.Name || "";
    const nameParts = name.split(" ");
    const quantity = seatIds.length;

    const reservation = await prisma.reservation.create({
      data: {
        UserId: userId,
        ScheduleId: scheduleId,
        IsUsed: false,
        TotalPrice: quantity * Number(movie?.Price || 0),
        seats: {
          create: seatIds.map((seatId: string) => ({
            SeatId: seatId,
          })),
        },
        payment: {
          create: {
            IsPaid: false,
          },
        },
      },
    });

    const snapTransaction = {
      item_details: {
        id: movie.MovieId,
        price: movie.Price,
        quantity: quantity,
        name: movie.Title,
      },
      transaction_details: {
        order_id: reservation.ReservationId,
        gross_amount: reservation.TotalPrice,
      },
      customer_details: {
        first_name:
          nameParts.length > 1
            ? nameParts.slice(0, -1).join(" ")
            : nameParts[0],
        last_name: nameParts.length > 1 ? nameParts.slice(-1)[0] : "",
        email: user?.Email,
        phone: "",
      },
    };

    const token = await snapApi.createTransactionToken(snapTransaction);
    return successRes(res, { token });
  } catch (e) {
    next(e);
  }
};

export const updatePaidStatus: RequestHandler = async (req, res, next) => {
  try {
    const { reservationId } = req.body;

    const reservation = await prisma.reservation.findUnique({
      where: {
        ReservationId: reservationId,
      },
      include: {
        payment: true,
      },
    });

    if (!reservation) {
      throw new AppError("Reservation not found", STATUS.NOT_FOUND);
    }

    if (reservation && reservation.payment && reservation.payment.IsPaid) {
      return successRes(res, { message: "Already paid" });
    }

    await prisma.reservation.update({
      where: {
        ReservationId: reservationId,
      },
      data: {
        payment: {
          update: {
            IsPaid: true,
          },
        },
      },
    });

    return successRes(res, { message: "Payment success" });
  } catch (e) {
    next(e);
  }
};
