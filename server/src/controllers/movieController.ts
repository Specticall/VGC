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

export const getMovieById: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;
    if (!id) {
      throw new AppError(
        "id is missing the request parameter",
        STATUS.BAD_REQUEST
      );
    }

    const movieData = await prisma.movie.findUnique({
      where: {
        MovieId: id,
      },
      include: {
        language: true,
        casts: {
          select: {
            CastId: true,
          },
        },
        genres: {
          include: {
            genre: true,
          },
        },
      },
    });
    if (!movieData) {
      throw new AppError(
        `Movie with the id of ${id} was not found`,
        STATUS.NOT_FOUND
      );
    }

    return successRes(response, movieData);
  } catch (error) {
    next(error);
  }
};
