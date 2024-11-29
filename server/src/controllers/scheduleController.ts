import { successRes } from "@/utils";
import { AppError } from "@/utils/AppError";
import { STATUS } from "@/utils/statusCodes";
import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import { getRooms } from "./roomController";
import { Decimal } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

export const getSchedules: RequestHandler = async (request, response, next) => {
	try {
		const movieId = request.query.movieId as string | undefined;

		const schedules = await prisma.schedule.findMany({
			where: {
				MovieId: movieId,
			},
			include: {
				movie: {
					select: {
						Title: true,
						Poster: true,
						Tagline: true,
					},
				},
				room: {
					select: {
						Name: true,
						cinema: {
							select: {
								Name: true,
							},
						},
					},
				},
				_count: {
					select: {
						reservations: true,
					},
				},
			},
			take: 100,
		});
		if (!schedules) {
			throw new AppError("No schedules found", STATUS.NOT_FOUND);
		}

		return successRes(response, schedules);
	} catch (error) {
		next(error);
	}
};

export const postSchedules: RequestHandler = async (
	request,
	response,
	next
) => {
	// StartTime       DateTime
	// EndTime         DateTime
	// RoomId          String
	// MovieId         String
	// CreatedAt       DateTime     @default(now())
	// UpdatedAt       DateTime     @updatedAt
	// room            Room          @relation(fields: [RoomId], references: [RoomId])
	// movie           Movie         @relation(fields: [MovieId], references: [MovieId])
	// reservations    Reservation[]
	try {
		const { roomId, movieId, ticketPrice, startDate, time, duration } =
			request.body;

		if (!roomId) {
			throw new AppError(
				"Room not found in the specified cinema",
				STATUS.BAD_REQUEST
			);
		}
		if (!ticketPrice) {
			throw new AppError("Price Not Found", STATUS.BAD_REQUEST);
		}
		if (!startDate) {
			throw new AppError("Date Not Found", STATUS.BAD_REQUEST);
		}

		if (!movieId) {
			throw new AppError("Movie Not Found", STATUS.BAD_REQUEST);
		}

		if (!time || !Array.isArray(time)) {
			throw new AppError("Time should be an array", STATUS.BAD_REQUEST);
		}
		// const schedules = await Promise.all(
		// 	time.map(async (t: string) => {
		// 		return await prisma.schedule.create({
		// 			data: {
		// 				RoomId: roomId,
		// 				Date: date,
		// 				Time: t,
		// 			},
		// 		});
		// 	})
		// );

		// return successRes(response, schedules);
	} catch (error) {
		next(error);
	}
};
