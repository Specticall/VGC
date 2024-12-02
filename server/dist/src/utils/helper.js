"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFileName = exports.createJWT = exports.shuffleArray = exports.roundTimeDownToNearest5 = void 0;
const config_1 = require("../config/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const roundTimeDownToNearest5 = (date) => {
    const minutes = date.getMinutes();
    const roundedMinutes = Math.floor(minutes / 5) * 5;
    date.setMinutes(roundedMinutes);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
};
exports.roundTimeDownToNearest5 = roundTimeDownToNearest5;
const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
};
exports.shuffleArray = shuffleArray;
const createJWT = (userData) => {
    const tokenPayload = {
        id: userData.UserId,
        email: userData.Email,
        role: userData.Role,
    };
    return jsonwebtoken_1.default.sign(tokenPayload, config_1.JWT_SECRET, { expiresIn: "6h" });
};
exports.createJWT = createJWT;
const generateFileName = (bytes = 32) => crypto_1.default.randomBytes(bytes).toString("hex");
exports.generateFileName = generateFileName;
//# sourceMappingURL=helper.js.map