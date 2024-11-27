import { errInternalServer, successRes } from "@/utils";
import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";

const prisma = new PrismaClient();

export const getMovies : RequestHandler = async (req, res, next) => {
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
            movie: true, 
          },
        },
      },
    });
    return successRes(res, movies);
  } catch(e) {
    return errInternalServer(next);
  }
};