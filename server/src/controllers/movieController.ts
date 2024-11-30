import { successRes, AppError, STATUS } from "@/utils";
import { AgeRestriction, PrismaClient, Status } from "@prisma/client";
import { RequestHandler } from "express";
import { deleteFile } from "./s3Controller";

const prisma = new PrismaClient();

type MovieType = {
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
    }: MovieType = req.body;

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
          create: genreIds.map((genreId) => ({
            genre: {
              connect: {
                GenreId: genreId,
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
          create: castIds.map((castId) => ({
            cast: {
              connect: {
                CastId: castId,
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

export const updateMovie: RequestHandler = async (req, res, next) => {
  try {
    const { movieId } = req.params;
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
    }: MovieType = req.body;

    const movie = await prisma.movie.findUnique({
      where: {
        MovieId: movieId,
      },
    });

    if (movie?.Poster && movie.Poster !== poster) {
      deleteFile(movie.Poster);
    }

    if (movie?.Backdrop && movie.Backdrop !== backdrop) {
      deleteFile(movie.Backdrop);
    }

    if (movie?.Trailer && movie.Trailer !== trailer) {
      deleteFile(movie.Trailer);
    }

    await prisma.movie.update({
      where: {
        MovieId: movieId,
      },
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
        language: {
          connect: {
            LanguageId: languageId,
          },
        },
        genres: {
          deleteMany: {},
          create: genreIds.map((genreId) => ({
            genre: {
              connect: {
                GenreId: genreId,
              },
            },
          })),
        },
        casts: {
          deleteMany: {},
          create: castIds.map((castId) => ({
            cast: {
              connect: {
                CastId: castId,
              },
            },
          })),
        },
      },
    });

    return successRes(res, "Movie updated successfully");
  } catch (e) {
    next(e);
  }
};

export const deleteMovie: RequestHandler = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const movie = await prisma.movie.findUnique({
      where: {
        MovieId: movieId,
      },
    });

    if (movie?.Poster) {
      deleteFile(movie.Poster);
    }

    if (movie?.Backdrop) {
      deleteFile(movie.Backdrop);
    }

    if (movie?.Trailer) {
      deleteFile(movie.Trailer);
    }

    await prisma.movie.delete({
      where: {
        MovieId: movieId,
      },
    });

    return successRes(res, "Movie deleted successfully");
  } catch (e) {
    next(e);
  }
};
