"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const config_1 = require("../config/config");
const utils_1 = require("../utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const protect = async (request, response, next) => {
    try {
        const bearerToken = request.headers.authorization;
        const token = bearerToken?.split(" ")[1];
        if (!token) {
            throw new utils_1.AppError("Token was not found in the request", utils_1.STATUS.UNAUTHORIZED);
        }
        const payload = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
        if (!payload) {
            throw new utils_1.AppError("Something went wrong while trying to parse the token", utils_1.STATUS.INTERNAL_SERVER_ERROR);
        }
        request.body.payload = payload;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.protect = protect;
//# sourceMappingURL=protect.js.map