import { snapApi } from "@/config/config";
import { AppError, STATUS, successRes } from "@/utils";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { RequestHandler } from "express";

const prisma = new PrismaClient();

export const createSnapTransaction: RequestHandler = async (req, res, next) => {
  try {
    const { userId, scheduleId, seatIds } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        UserId: userId,
      }
    });

    const schedule = await prisma.schedule.findUnique({
      where: {
        ScheduleId: scheduleId,
      }
    });

    const movie = await prisma.movie.findUnique({
      where: {
        MovieId: schedule?.MovieId,
      }
    });

    const seats = await prisma.seat.findMany({
      where: {
        SeatId: {
          in: seatIds,
        },
      },
    });

    const roomIdsFromSeats = seats.map(seat => seat.RoomId);
    const uniqueRoomIds = new Set(roomIdsFromSeats);

    if (uniqueRoomIds.size > 1) {
      throw new AppError("SeatIds must be in the same room", STATUS.BAD_REQUEST);
    }

    const name = user?.Name || ""; 
    const nameParts = name.split(" ");
    const quantity = seatIds.length;
    const snapTransaction = {
      item_details: {
        id: movie?.MovieId || "",
        price: Number(movie?.Price || 0),
        quantity: quantity,
        name: movie?.Title || "",
      },
      transaction_details: {
        order_id: randomUUID(),
        gross_amount: quantity * Number(movie?.Price || 0),
      },
      customer_details: {
        first_name:  nameParts.length > 1 ? nameParts.slice(0, -1).join(" ") : nameParts[0],
        last_name: nameParts.length > 1 ? nameParts.slice(-1)[0] : "",
        email: user?.Email || "",
        phone: "",
      },
    };

    const token = await snapApi.createTransactionToken(snapTransaction);
    return successRes(res, {token});

  } catch (e) {
    next(e);
  }
};
