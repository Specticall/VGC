import { AppError, STATUS, successRes } from "../utils";
import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";

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
	try {
		const { movieId } = request.params;
		const { roomId, startDate, time } = request.body;

		if (!roomId) {
			throw new AppError(
				"Room not found in the specified cinema",
				STATUS.BAD_REQUEST
			);
		}
		const duration = await prisma.movie.findUnique({
			where: { MovieId: movieId },
		});
		if (!duration) {
			throw new AppError("duration not found", STATUS.NOT_FOUND);
		}
		const durationMilisecond = duration.DurationMinutes * 60 * 1000;
		if (!startDate) {
			throw new AppError("Date Not Found", STATUS.BAD_REQUEST);
		}

		if (!movieId) {
			throw new AppError("Movie Not Found", STATUS.BAD_REQUEST);
		}

		if (!time || !Array.isArray(time)) {
			throw new AppError("Time should be an array", STATUS.BAD_REQUEST);
		}

		await Promise.all(
			time.map(async (t: string) => {
				return await prisma.schedule.create({
					data: {
						StartTime: new Date(`${startDate}T${t}`),
						EndTime: new Date(
							new Date(`${startDate}T${t}`).getTime() + durationMilisecond
						),
						RoomId: roomId,
						MovieId: movieId,
					},
				});
			})
		);

		return successRes(response, "Schedules Created");
	} catch (error) {
		next(error);
	}
};

export const deleteSchedules: RequestHandler = async (
	request,
	response,
	next
) => {
	try {
		const scheduleId = request.params.scheduleId as string;
		await prisma.schedule.delete({
			where: {
				ScheduleId: scheduleId,
			},
		});
		return successRes(response, "Schedules Deleted");
	} catch (e) {
		next(e);
	}
};
