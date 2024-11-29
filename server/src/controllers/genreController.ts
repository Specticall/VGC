import { successRes } from "@/utils";
import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";

const prisma = new PrismaClient();

export const getGenres: RequestHandler = async (request, response, next) => {
  try {
    const genres = await prisma.genre.findMany();

    return successRes(response, genres);
  } catch (error) {
    next(error);
  }
};
