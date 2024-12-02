"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCasts = void 0;
const client_1 = require("@prisma/client");
const utils_1 = require("@/utils");
const prisma = new client_1.PrismaClient();
const getCasts = async (req, res, next) => {
    try {
        const actors = await prisma.cast.findMany({
            where: {
                Image: {
                    not: null,
                },
            },
            // take: 50,
        });
        if (!actors) {
            throw new utils_1.AppError("No actors found", utils_1.STATUS.NOT_FOUND);
        }
        return (0, utils_1.successRes)(res, actors);
    }
    catch (e) {
        next(e);
    }
};
exports.getCasts = getCasts;
//# sourceMappingURL=castController.js.map