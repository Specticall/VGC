"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGenres = void 0;
const utils_1 = require("../utils");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getGenres = async (request, response, next) => {
    try {
        const genres = await prisma.genre.findMany();
        return (0, utils_1.successRes)(response, genres);
    }
    catch (error) {
        next(error);
    }
};
exports.getGenres = getGenres;
//# sourceMappingURL=genreController.js.map