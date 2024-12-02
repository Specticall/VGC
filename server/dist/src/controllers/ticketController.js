"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTicketByUserId = void 0;
const utils_1 = require("../utils");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getTicketByUserId = async (request, response, next) => {
    try {
        const { id: userId } = request.body.payload;
        if (!userId) {
            throw new utils_1.AppError("User id not found", utils_1.STATUS.BAD_REQUEST);
        }
        const tickets = await prisma.reservation.findMany({
            where: {
                UserId: userId,
                payment: {
                    IsPaid: true,
                },
            },
            select: {
                ReservationId: true,
                seats: {
                    select: {
                        seat: {
                            select: {
                                Number: true,
                                Row: true,
                            },
                        },
                    },
                },
                schedule: {
                    select: {
                        StartTime: true,
                        EndTime: true,
                        room: {
                            select: {
                                Name: true,
                                cinema: {
                                    select: {
                                        Name: true,
                                        Location: true,
                                    },
                                },
                            },
                        },
                        movie: {
                            select: {
                                Title: true,
                            },
                        },
                    },
                },
            },
        });
        return (0, utils_1.successRes)(response, tickets);
    }
    catch (error) {
        next(error);
    }
};
exports.getTicketByUserId = getTicketByUserId;
//# sourceMappingURL=ticketController.js.map