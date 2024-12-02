"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSchedules = exports.postSchedules = exports.getSchedules = void 0;
const utils_1 = require("../utils");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getSchedules = async (request, response, next) => {
    try {
        const movieId = request.query.movieId;
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
            throw new utils_1.AppError("No schedules found", utils_1.STATUS.NOT_FOUND);
        }
        return (0, utils_1.successRes)(response, schedules);
    }
    catch (error) {
        next(error);
    }
};
exports.getSchedules = getSchedules;
const postSchedules = async (request, response, next) => {
    try {
        const { movieId } = request.params;
        const { roomId, startDate, time } = request.body;
        if (!roomId) {
            throw new utils_1.AppError("Room not found in the specified cinema", utils_1.STATUS.BAD_REQUEST);
        }
        const duration = await prisma.movie.findUnique({
            where: { MovieId: movieId },
        });
        if (!duration) {
            throw new utils_1.AppError("duration not found", utils_1.STATUS.NOT_FOUND);
        }
        const durationMilisecond = duration.DurationMinutes * 60 * 1000;
        if (!startDate) {
            throw new utils_1.AppError("Date Not Found", utils_1.STATUS.BAD_REQUEST);
        }
        if (!movieId) {
            throw new utils_1.AppError("Movie Not Found", utils_1.STATUS.BAD_REQUEST);
        }
        if (!time || !Array.isArray(time)) {
            throw new utils_1.AppError("Time should be an array", utils_1.STATUS.BAD_REQUEST);
        }
        await Promise.all(time.map(async (t) => {
            return await prisma.schedule.create({
                data: {
                    StartTime: new Date(`${startDate}T${t}`),
                    EndTime: new Date(new Date(`${startDate}T${t}`).getTime() + durationMilisecond),
                    RoomId: roomId,
                    MovieId: movieId,
                },
            });
        }));
        return (0, utils_1.successRes)(response, "Schedules Created");
    }
    catch (error) {
        next(error);
    }
};
exports.postSchedules = postSchedules;
const deleteSchedules = async (request, response, next) => {
    try {
        const scheduleId = request.params.scheduleId;
        await prisma.schedule.delete({
            where: {
                ScheduleId: scheduleId,
            },
        });
        return (0, utils_1.successRes)(response, "Schedules Deleted");
    }
    catch (e) {
        next(e);
    }
};
exports.deleteSchedules = deleteSchedules;
//# sourceMappingURL=scheduleController.js.map