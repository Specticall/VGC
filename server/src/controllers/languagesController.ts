import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import { successRes } from "../utils";

const prisma = new PrismaClient();

export const getLanguages: RequestHandler = async (request, response, next) => {
  try {
    const languages = await prisma.language.findMany({
      orderBy: {
        Name: "asc",
      },
    });

    return successRes(response, languages);
  } catch (error) {
    next(error);
  }
};
