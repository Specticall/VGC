"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = exports.loginWithGoogle = void 0;
const utils_1 = require("@/utils");
const client_1 = require("@prisma/client");
const axios_1 = __importDefault(require("axios"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const loginWithGoogle = async (request, response, next) => {
    try {
        const accessToken = request.body["access_token"];
        if (!accessToken) {
            throw new utils_1.AppError("Token is missing in the request body", utils_1.STATUS.BAD_REQUEST);
        }
        const userInfo = await axios_1.default.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`);
        const existingUser = await prisma.user.findUnique({
            where: {
                Email: userInfo.data.email,
            },
        });
        let userData;
        if (existingUser) {
            userData = existingUser;
        }
        else {
            userData = await prisma.user.create({
                data: {
                    Name: userInfo.data.name,
                    Email: userInfo.data.email,
                    ProfilePicture: userInfo.data.picture,
                    Password: "",
                    Age: 0,
                    Role: "USER",
                },
            });
        }
        const jwtToken = (0, utils_1.createJWT)(userData);
        if (!jwtToken) {
            throw new utils_1.AppError("Something went wrong while trying to create the token", utils_1.STATUS.INTERNAL_SERVER_ERROR);
        }
        return (0, utils_1.successRes)(response, {
            token: jwtToken,
            userData,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.loginWithGoogle = loginWithGoogle;
const login = async (request, response, next) => {
    try {
        const { access_token, email, password } = request.body;
        if (!access_token) {
            throw new utils_1.AppError("Token is missing in the request body", utils_1.STATUS.BAD_REQUEST);
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.includes("'")) {
            throw new utils_1.AppError("AOWKAOWKAOWK MAU SQL INJECT YA PUKI?", utils_1.STATUS.BAD_REQUEST);
        }
        if (!emailRegex.test(email)) {
            throw new utils_1.AppError("Email format is invalid", utils_1.STATUS.BAD_REQUEST);
        }
        if (!email) {
            throw new utils_1.AppError("email is missing in the request body", utils_1.STATUS.BAD_REQUEST);
        }
        if (!password) {
            throw new utils_1.AppError("password is missing in the request body", utils_1.STATUS.BAD_REQUEST);
        }
        const userData = await prisma.user.findUnique({
            where: { Email: email },
        });
        if (!userData || !(await bcrypt_1.default.compare(password, userData.Password))) {
            throw new utils_1.AppError("Invalid email or password", utils_1.STATUS.UNAUTHORIZED);
        }
        const jwtToken = (0, utils_1.createJWT)(userData);
        if (!jwtToken) {
            throw new utils_1.AppError("Something went wrong while trying to create the token", utils_1.STATUS.INTERNAL_SERVER_ERROR);
        }
        return (0, utils_1.successRes)(response, {
            token: jwtToken,
            userData: userData,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
const register = async (request, response, next) => {
    try {
        const { access_token, name, email, password, age } = request.body;
        if (!access_token) {
            throw new utils_1.AppError("Token is missing in the request body", utils_1.STATUS.BAD_REQUEST);
        }
        if (!name) {
            throw new utils_1.AppError("Name is missing in the request body", utils_1.STATUS.BAD_REQUEST);
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.includes("'")) {
            throw new utils_1.AppError("AOWKAOWKAOWK MAU SQL INJECT YA PUKI?", utils_1.STATUS.BAD_REQUEST);
        }
        if (!emailRegex.test(email)) {
            throw new utils_1.AppError("Email format is invalid", utils_1.STATUS.BAD_REQUEST);
        }
        if (!email) {
            throw new utils_1.AppError("Email is missing in the request body", utils_1.STATUS.BAD_REQUEST);
        }
        if (!password) {
            throw new utils_1.AppError("password is missing in the request body", utils_1.STATUS.BAD_REQUEST);
        }
        if (!age) {
            throw new utils_1.AppError("Age is missing in the request body", utils_1.STATUS.BAD_REQUEST);
        }
        const existingUser = await prisma.user.findUnique({
            where: { Email: email },
        });
        if (existingUser) {
            throw new utils_1.AppError("User with this email already exists", utils_1.STATUS.FORBIDDEN);
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 12);
        const newUser = await prisma.user.create({
            data: {
                Name: name,
                Email: email,
                Password: hashedPassword,
                ProfilePicture: "",
                Age: age,
                Role: "USER",
            },
        });
        const jwtToken = (0, utils_1.createJWT)(newUser);
        if (!jwtToken) {
            throw new utils_1.AppError("Something went wrong while trying to create the token", utils_1.STATUS.INTERNAL_SERVER_ERROR);
        }
        return (0, utils_1.successRes)(response, {
            token: jwtToken,
            userData: newUser,
        });
    }
    catch (e) {
        next(e);
    }
};
exports.register = register;
//# sourceMappingURL=authController.js.map