"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSeatsByRoomId = exports.getSeatsByMovieId = void 0;
const utils_1 = require("../utils");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getSeatsByMovieId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cinemas = await prisma.cinema.findMany({
            include: {
                rooms: {
                    include: {
                        schedules: {
                            where: {
                                MovieId: id,
                            },
                            include: {
                                reservations: {
                                    include: {
                                        seats: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        const grouped = cinemas
            .map((cinema) => {
            const roomsWithSchedules = cinema.rooms.filter((c) => c.schedules.length > 0);
            const groupedByDates = {};
            roomsWithSchedules.forEach((room) => {
                room.schedules.forEach((schedule) => {
                    const date = schedule.StartTime.toISOString().split("T")[0];
                    const scheduleSummary = {
                        RoomId: room.RoomId,
                        StartTime: schedule.StartTime,
                        EndTime: schedule.EndTime,
                        Reservations: schedule.reservations,
                        ScheduleId: schedule.ScheduleId,
                    };
                    if (groupedByDates[date]) {
                        groupedByDates[date].push(scheduleSummary);
                    }
                    else {
                        groupedByDates[date] = [scheduleSummary];
                    }
                });
            });
            return {
                CinemaId: cinema.CinemaId,
                Name: cinema.Name,
                Location: cinema.Location,
                Contact: cinema.Contact,
                Schedules: groupedByDates,
            };
        })
            .filter((cinema) => Object.keys(cinema.Schedules).length > 0);
        return (0, utils_1.successRes)(res, grouped);
    }
    catch (e) {
        next(e);
    }
};
exports.getSeatsByMovieId = getSeatsByMovieId;
const getSeatsByRoomId = async (request, response, next) => {
    try {
        const { roomId } = request.params;
        const seats = await prisma.seat.findMany({
            where: {
                RoomId: roomId,
            },
            orderBy: {
                Row: "asc",
            },
        });
        const reservedSeats = await prisma.reservationSeat.findMany({
            where: {
                seat: {
                    RoomId: roomId,
                },
            },
            orderBy: {
                seat: {
                    Row: "asc",
                },
            },
        });
        return (0, utils_1.successRes)(response, { seats, reservedSeats });
    }
    catch (error) {
        next(error);
    }
};
exports.getSeatsByRoomId = getSeatsByRoomId;
// export const getSeatsByMovieId: RequestHandler = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const cinemas = await prisma.cinema.findMany({
//       include: {
//         rooms: {
//           include: {
//             schedules: {
//               where: { MovieId: id },
//               include: {
//                 reservations: {
//                   include: {
//                     seats: true,
//                   },
//                 },
//               },
//             },
//             seats: true,
//           },
//         },
//       },
//     });
//     const result = cinemas
//       .map((cinema) => ({
//         CinemaId: cinema.CinemaId,
//         Name: cinema.Name,
//         rooms: cinema.rooms
//           .filter((room) =>
//             room.schedules.some((schedule) => schedule.MovieId === id)
//           )
//           .map((room) => {
//             const schedules = room.schedules.map((schedule) => {
//               const reservedSeatIds = schedule.reservations.flatMap(
//                 (reservation) => reservation.seats.map((seat) => seat.SeatId)
//               );
//               const reservedSeats = room.seats.filter((seat) =>
//                 reservedSeatIds.includes(seat.SeatId)
//               );
//               const unreservedSeats = room.seats.filter(
//                 (seat) => !reservedSeatIds.includes(seat.SeatId)
//               );
//               return {
//                 ScheduleId: schedule.ScheduleId,
//                 StartTime: schedule.StartTime,
//                 EndTime: schedule.EndTime,
//                 reservedSeats: reservedSeats.map((seat) => ({
//                   seatId: seat.SeatId,
//                   row: seat.Row,
//                   number: seat.Number,
//                 })),
//                 unreservedSeats: unreservedSeats.map((seat) => ({
//                   seatId: seat.SeatId,
//                   row: seat.Row,
//                   number: seat.Number,
//                 })),
//               };
//             });
//             return {
//               RoomId: room.RoomId,
//               RoomName: room.Name,
//               schedules,
//             };
//           }),
//       }))
//       .filter((cinema) => cinema.rooms.length > 0);
//     return successRes(res, result);
//   } catch (e) {
//     next(e);
//   }
// };
//# sourceMappingURL=seatController.js.map