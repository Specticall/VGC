import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { successRes } from "@/utils";
import { AppError } from "@/utils/AppError";
import { STATUS } from "@/utils/statusCodes";

const prisma = new PrismaClient();

export const getCasts: RequestHandler = async (req, res, next) => {
  try {
    const actors = await prisma.cast.findMany();

    if (!actors) {
      throw new AppError("No actors found", STATUS.NOT_FOUND);
    }

    return successRes(res, actors);
  } catch (e) {
    next(e);
  }
};
