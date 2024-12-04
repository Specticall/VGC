import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { successRes, AppError, STATUS } from "src/utils";

const prisma = new PrismaClient();

export const getCasts: RequestHandler = async (req, res, next) => {
  try {
    const actors = await prisma.cast.findMany({
      where: {
        Image: {
          not: null,
        },
      },
      // take: 50,
    });

    if (!actors) {
      throw new AppError("No actors found", STATUS.NOT_FOUND);
    }

    return successRes(res, actors);
  } catch (e) {
    next(e);
  }
};
