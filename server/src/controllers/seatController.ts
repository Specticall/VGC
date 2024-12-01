import { successRes } from "@/utils";
import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";

const prisma = new PrismaClient();

export const getSeatsByMovieId: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const cinemas = await prisma.cinema.findMany({
      include: {
        rooms: {
          include: {
            schedules: {
              where: { MovieId: id },
              include: {
                reservations: {
                  include: {
                    seats: true,
                  },
                },
              },
            },
            seats: true,
          },
        },
      },
    });

    const result = cinemas.map((cinema) => ({
      CinemaId: cinema.CinemaId,
      Name: cinema.Name,
      rooms: cinema.rooms
        .filter((room) =>
          room.schedules.some((schedule) => schedule.MovieId === id)
        )
        .map((room) => {
          const schedules = room.schedules.map((schedule) => {
            const reservedSeatIds = schedule.reservations.flatMap((reservation) =>
              reservation.seats.map((seat) => seat.SeatId)
            );

            const reservedSeats = room.seats.filter((seat) =>
              reservedSeatIds.includes(seat.SeatId)
            );

            const unreservedSeats = room.seats.filter(
              (seat) => !reservedSeatIds.includes(seat.SeatId)
            );

            return {
              ScheduleId: schedule.ScheduleId,
              StartTime: schedule.StartTime,
              EndTime: schedule.EndTime,
              reservedSeats: reservedSeats.map((seat) => ({
                seatId: seat.SeatId,
                row: seat.Row,
                number: seat.Number,
              })),
              unreservedSeats: unreservedSeats.map((seat) => ({
                seatId: seat.SeatId,
                row: seat.Row,
                number: seat.Number,
              })),
            };
          });

          return {
            RoomId: room.RoomId,
            RoomName: room.Name,
            schedules, 
          };
        }),
    }));

    return successRes(res, result);
  } catch (e) {
    next(e);
  }
};
