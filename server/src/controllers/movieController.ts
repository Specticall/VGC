import { successRes, AppError, STATUS } from "@/utils";
import { AgeRestriction, PrismaClient, Status } from "@prisma/client";
import { RequestHandler } from "express";

const prisma = new PrismaClient();

type CreateMovieType = {
  title: string;
  tagline: string;
  durationMinutes: number;
  price: number;
  status: Status;
  releaseDate: Date;
  poster: string;
  backdrop: string;
  trailer: string;
  ageRestriction: AgeRestriction;
  genreIds: number[];
  languageId: string;
  castIds: string[];
};

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
      orderBy: {
        CreatedAt: "desc",
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

export const createMovie: RequestHandler = async (req, res, next) => {
  try {
    const {
      title,
      tagline,
      durationMinutes,
      price,
      status,
      releaseDate,
      poster,
      backdrop,
      trailer,
      ageRestriction,
      genreIds,
      languageId,
      castIds,
    }: CreateMovieType = req.body;

    await prisma.movie.create({
      data: {
        Title: title,
        Tagline: tagline,
        DurationMinutes: durationMinutes,
        Price: price,
        Poster: poster,
        Backdrop: backdrop,
        Status: status,
        Trailer: trailer,
        AgeRestriction: ageRestriction as AgeRestriction,
        ReleaseDate: releaseDate,
        genres: {
          create: genreIds.map((genre) => ({
            genre: {
              connect: {
                GenreId: genre,
              },
            },
          })),
        },
        language: {
          connect: {
            LanguageId: languageId,
          },
        },
        casts: {
          create: castIds.map((cast) => ({
            cast: {
              connect: {
                CastId: cast,
              },
            },
          })),
        },
      },
    });

    return successRes(res, "Successfuly created movie");
  } catch (e) {
    next(e);
  }
};
