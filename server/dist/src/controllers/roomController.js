"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRooms = void 0;
const utils_1 = require("@/utils");
const AppError_1 = require("@/utils/AppError");
const statusCodes_1 = require("@/utils/statusCodes");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// get list of cinema aja
const getRooms = async (request, response, next) => {
    try {
        const cinemaId = request.params.cinemaId;
        const rooms = await prisma.room.findMany({
            where: {
                CinemaId: cinemaId,
            },
        });
        if (!rooms) {
            throw new AppError_1.AppError("No Rooms Found", statusCodes_1.STATUS.NOT_FOUND);
        }
        return (0, utils_1.successRes)(response, rooms);
    }
    catch (e) {
        next(e);
    }
};
exports.getRooms = getRooms;
//# sourceMappingURL=roomController.js.map