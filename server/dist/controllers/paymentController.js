"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePaidStatus = exports.createSnapTransaction = void 0;
const config_1 = require("@/config/config");
const utils_1 = require("@/utils");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createSnapTransaction = async (req, res, next) => {
    try {
        const { id: userId } = req.body.payload;
        const { seatIds, scheduleId } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                UserId: userId,
            },
        });
        if (!user) {
            throw new utils_1.AppError("User not found", utils_1.STATUS.NOT_FOUND);
        }
        const schedule = await prisma.schedule.findUnique({
            where: {
                ScheduleId: scheduleId,
            },
        });
        const movie = await prisma.movie.findUnique({
            where: {
                MovieId: schedule?.MovieId,
            },
        });
        if (!movie) {
            throw new utils_1.AppError("Movie not found", utils_1.STATUS.NOT_FOUND);
        }
        const seats = await prisma.seat.findMany({
            where: {
                SeatId: {
                    in: seatIds,
                },
            },
        });
        const roomIdsFromSeats = seats.map((seat) => seat.RoomId);
        const uniqueRoomIds = new Set(roomIdsFromSeats);
        if (uniqueRoomIds.size > 1) {
            throw new utils_1.AppError("SeatIds must be in the same room", utils_1.STATUS.BAD_REQUEST);
        }
        const name = user?.Name || "";
        const nameParts = name.split(" ");
        const quantity = seatIds.length;
        const reservation = await prisma.reservation.create({
            data: {
                UserId: userId,
                ScheduleId: scheduleId,
                IsUsed: false,
                TotalPrice: quantity * Number(movie?.Price || 0),
                payment: {
                    create: {
                        IsPaid: false,
                    },
                },
            },
        });
        const snapTransaction = {
            item_details: {
                id: movie.MovieId,
                price: movie.Price,
                quantity: quantity,
                name: movie.Title,
            },
            transaction_details: {
                order_id: reservation.ReservationId,
                gross_amount: reservation.TotalPrice,
            },
            customer_details: {
                first_name: nameParts.length > 1
                    ? nameParts.slice(0, -1).join(" ")
                    : nameParts[0],
                last_name: nameParts.length > 1 ? nameParts.slice(-1)[0] : "",
                email: user?.Email,
                phone: "",
            },
        };
        const token = await config_1.snapApi.createTransactionToken(snapTransaction);
        return (0, utils_1.successRes)(res, { token, reservationId: reservation.ReservationId });
    }
    catch (e) {
        next(e);
    }
};
exports.createSnapTransaction = createSnapTransaction;
const updatePaidStatus = async (req, res, next) => {
    try {
        const { reservationId, seatIds } = req.body;
        const reservation = await prisma.reservation.findUnique({
            where: {
                ReservationId: reservationId,
            },
            include: {
                payment: true,
            },
        });
        if (!reservation) {
            throw new utils_1.AppError("Reservation not found", utils_1.STATUS.NOT_FOUND);
        }
        if (reservation && reservation.payment && reservation.payment.IsPaid) {
            return (0, utils_1.successRes)(res, { message: "Already paid" });
        }
        await prisma.reservation.update({
            where: {
                ReservationId: reservationId,
            },
            data: {
                payment: {
                    update: {
                        IsPaid: true,
                    },
                },
                seats: {
                    create: seatIds.map((seatId) => ({
                        SeatId: seatId,
                    })),
                },
            },
        });
        return (0, utils_1.successRes)(res, { message: "Payment success" });
    }
    catch (e) {
        next(e);
    }
};
exports.updatePaidStatus = updatePaidStatus;
//# sourceMappingURL=paymentController.js.map