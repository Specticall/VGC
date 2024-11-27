import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { errBadRequest, successRes } from "@/utils";

const prisma = new PrismaClient();

export const getCasts : RequestHandler = async (req, res, next) => {
  try{
    const actors = await prisma.cast.findMany();
    return successRes(res, actors);
  } catch(e) {
    return errBadRequest(next);
  }
};