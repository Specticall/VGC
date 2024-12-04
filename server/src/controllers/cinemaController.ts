import { AppError, STATUS, successRes } from "../utils";
import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";

const prisma = new PrismaClient();

// get list of cinema aja
export const getCinema: RequestHandler = async (request, response, next) => {
	try {
		const cinemas = await prisma.cinema.findMany();
		if (!cinemas) {
			throw new AppError("No Cinema Found", STATUS.NOT_FOUND);
		}
		return successRes(response, cinemas);
	} catch (e) {
		next(e);
	}
};
