import { successRes, AppError, STATUS } from "src/utils";
import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";

const prisma = new PrismaClient();

export const getUsers: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.body.payload;

    const userData = await prisma.user.findUnique({
      where: { UserId: id },
    });
    if (!userData) {
      throw new AppError("User not found", STATUS.NOT_FOUND);
    }

    return successRes(response, userData);
  } catch (error) {
    next(error);
  }
};

export const getSearchHistory: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    const { id: userId } = request.body.payload;
    const searchHistory = await prisma.searchHistory.findMany({
      where: {
        UserId: userId,
      },
      distinct: ["Query"],
      orderBy: {
        CreatedAt: "desc",
      },
      take: 5,
    });

    return successRes(response, searchHistory);
  } catch (error) {
    next(error);
  }
};

export const storeSearchHistory: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    const { id: userId } = request.body.payload;
    const { movieId, query } = request.body;
    if (!movieId || !query) {
      throw new AppError(
        "movieId and query is missing in the request body",
        STATUS.BAD_REQUEST
      );
    }

    const sameMovieWasSearched = await prisma.searchHistory.findFirst({
      where: {
        MovieId: movieId,
        UserId: userId,
      },
    });
    if (sameMovieWasSearched) {
      await prisma.searchHistory.update({
        where: {
          SearchHistoryId: sameMovieWasSearched.SearchHistoryId,
        },
        data: {
          CreatedAt: new Date(),
        },
      });
    } else {
      await prisma.searchHistory.create({
        data: {
          MovieId: movieId,
          Query: query,
          UserId: userId,
        },
      });
    }

    return successRes(response, "Successfuly saved search history");
  } catch (error) {
    next(error);
  }
};
