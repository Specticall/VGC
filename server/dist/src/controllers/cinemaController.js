"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCinema = void 0;
const utils_1 = require("../utils");
const AppError_1 = require("../utils/AppError");
const statusCodes_1 = require("../utils/statusCodes");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// get list of cinema aja
const getCinema = async (request, response, next) => {
    try {
        const cinemas = await prisma.cinema.findMany();
        if (!cinemas) {
            throw new AppError_1.AppError("No Cinema Found", statusCodes_1.STATUS.NOT_FOUND);
        }
        return (0, utils_1.successRes)(response, cinemas);
    }
    catch (e) {
        next(e);
    }
};
exports.getCinema = getCinema;
//# sourceMappingURL=cinemaController.js.map