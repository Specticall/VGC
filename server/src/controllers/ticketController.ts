import { AppError, STATUS, successRes } from "../utils";

import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";

const prisma = new PrismaClient();

export const getTicketByUserId: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    const { id: userId } = request.body.payload;
    if (!userId) {
      throw new AppError("User id not found", STATUS.BAD_REQUEST);
    }

    const tickets = await prisma.reservation.findMany({
      where: {
        UserId: userId,
        payment: {
          IsPaid: true,
        },
      },
      select: {
        ReservationId: true,

        seats: {
          select: {
            seat: {
              select: {
                Number: true,
                Row: true,
              },
            },
          },
        },
        schedule: {
          select: {
            StartTime: true,
            EndTime: true,
            room: {
              select: {
                Name: true,
                cinema: {
                  select: {
                    Name: true,
                    Location: true,
                  },
                },
              },
            },
            movie: {
              select: {
                Title: true,
                Poster: true,
              },
            },
          },
        },
      },
    });

    return successRes(response, tickets);
  } catch (error) {
    next(error);
  }
};

export const getTicketByReservationId: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    const { reservationId } = request.params;
    if (!reservationId) {
      throw new AppError("User id not found", STATUS.BAD_REQUEST);
    }

    const tickets = await prisma.reservation.findFirst({
      where: {
        ReservationId: reservationId,
        payment: {
          IsPaid: true,
        },
      },
      select: {
        ReservationId: true,

        seats: {
          select: {
            seat: {
              select: {
                Number: true,
                Row: true,
              },
            },
          },
        },
        schedule: {
          select: {
            StartTime: true,
            EndTime: true,
            room: {
              select: {
                Name: true,
                cinema: {
                  select: {
                    Name: true,
                    Location: true,
                  },
                },
              },
            },
            movie: {
              select: {
                Title: true,
                Poster: true,
              },
            },
          },
        },
      },
    });

    return successRes(response, tickets);
  } catch (error) {
    next(error);
  }
};
