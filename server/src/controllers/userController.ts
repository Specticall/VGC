import { successRes } from "@/utils";
import { AppError } from "@/utils/AppError";
import { STATUS } from "@/utils/statusCodes";
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
