"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLanguages = void 0;
const utils_1 = require("../utils");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getLanguages = async (request, response, next) => {
    try {
        const languages = await prisma.language.findMany({
            orderBy: {
                Name: "asc",
            },
        });
        return (0, utils_1.successRes)(response, languages);
    }
    catch (error) {
        next(error);
    }
};
exports.getLanguages = getLanguages;
//# sourceMappingURL=languagesController.js.map