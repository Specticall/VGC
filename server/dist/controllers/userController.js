"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeSearchHistory = exports.getSearchHistory = exports.getUsers = void 0;
const utils_1 = require("@/utils");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getUsers = async (request, response, next) => {
    try {
        const { id } = request.body.payload;
        const userData = await prisma.user.findUnique({
            where: { UserId: id },
        });
        if (!userData) {
            throw new utils_1.AppError("User not found", utils_1.STATUS.NOT_FOUND);
        }
        return (0, utils_1.successRes)(response, userData);
    }
    catch (error) {
        next(error);
    }
};
exports.getUsers = getUsers;
const getSearchHistory = async (request, response, next) => {
    try {
        const { id: userId } = request.body.payload;
        const searchHistory = await prisma.searchHistory.findMany({
            where: {
                UserId: userId,
            },
            distinct: ["Query"],
            orderBy: {
                CreatedAt: "desc",
            },
            take: 5,
        });
        return (0, utils_1.successRes)(response, searchHistory);
    }
    catch (error) {
        next(error);
    }
};
exports.getSearchHistory = getSearchHistory;
const storeSearchHistory = async (request, response, next) => {
    try {
        const { id: userId } = request.body.payload;
        const { movieId, query } = request.body;
        if (!movieId || !query) {
            throw new utils_1.AppError("movieId and query is missing in the request body", utils_1.STATUS.BAD_REQUEST);
        }
        const sameMovieWasSearched = await prisma.searchHistory.findFirst({
            where: {
                MovieId: movieId,
                UserId: userId,
            },
        });
        if (sameMovieWasSearched) {
            await prisma.searchHistory.update({
                where: {
                    SearchHistoryId: sameMovieWasSearched.SearchHistoryId,
                },
                data: {
                    CreatedAt: new Date(),
                },
            });
        }
        else {
            await prisma.searchHistory.create({
                data: {
                    MovieId: movieId,
                    Query: query,
                    UserId: userId,
                },
            });
        }
        return (0, utils_1.successRes)(response, "Successfuly saved search history");
    }
    catch (error) {
        next(error);
    }
};
exports.storeSearchHistory = storeSearchHistory;
//# sourceMappingURL=userController.js.map