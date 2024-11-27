import { errInternalServer, successRes } from "@/utils";
import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";

const prisma = new PrismaClient();

export const getMovie : RequestHandler = async (req, res, next) => {
  try {
    const movies = await prisma.movie.findMany();
    
    return successRes(res, movies);
  } catch(e) {
    errInternalServer(next);
  }
};