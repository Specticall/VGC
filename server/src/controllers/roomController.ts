import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import { AppError, STATUS, successRes } from "../utils";

const prisma = new PrismaClient();

// get list of cinema aja
export const getRooms: RequestHandler = async (request, response, next) => {
	try {
		const cinemaId = request.params.cinemaId as string | undefined;
		const rooms = await prisma.room.findMany({
			where: {
				CinemaId: cinemaId,
			},
		});
		if (!rooms) {
			throw new AppError("No Rooms Found", STATUS.NOT_FOUND);
		}
		return successRes(response, rooms);
	} catch (e) {
		next(e);
	}
};
