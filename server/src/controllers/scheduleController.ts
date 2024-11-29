import { successRes } from "@/utils";
import { AppError } from "@/utils/AppError";
import { STATUS } from "@/utils/statusCodes";
import { PrismaClient } from "@prisma/client";
import { count } from "console";
import { RequestHandler } from "express";

const prisma = new PrismaClient();

export const getSchedules: RequestHandler = async (request, response, next) => {
  try {
    const movieId = request.query.movieId as string | undefined;

    const schedules = await prisma.schedule.findMany({
      where: {
        MovieId: movieId,
      },
      include: {
        movie: {
          select: {
            Title: true,
            Poster: true,
            Tagline: true,
          },
        },
        room: {
          select: {
            Name: true,
            cinema: {
              select: {
                Name: true,
              },
            },
          },
        },
        _count: {
          select: {
            reservations: true,
          },
        },
      },
      take: 100,
    });
    if (!schedules) {
      throw new AppError("No schedules found", STATUS.NOT_FOUND);
    }

    return successRes(response, schedules);
  } catch (error) {
    next(error);
  }
};
