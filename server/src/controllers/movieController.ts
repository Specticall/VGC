import { successRes } from "@/utils";
import { AppError } from "@/utils/AppError";
import { STATUS } from "@/utils/statusCodes";
import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";

const prisma = new PrismaClient();

export const getMovies: RequestHandler = async (req, res, next) => {
  try {
    const movies = await prisma.movie.findMany({
      include: {
        language: true,
        genres: {
          include: {
            genre: true,
          },
        },
        casts: {
          include: {
            cast: true,
          },
        },
        schedules: {
          include: {
            room: true,
          },
        },
      },
    });

    if (!movies) {
      throw new AppError("No movies found", STATUS.NOT_FOUND);
    }

    return successRes(res, movies);
  } catch (e) {
    next(e);
  }
};
