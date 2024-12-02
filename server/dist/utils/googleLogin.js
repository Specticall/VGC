"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginGoogle = void 0;
const client_1 = require("@prisma/client");
const axios_1 = __importDefault(require("axios"));
const helper_1 = require("./helper");
const prisma = new client_1.PrismaClient();
const loginGoogle = async (token) => {
    const userInfo = await axios_1.default.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const existingUser = await prisma.user.findUnique({
        where: {
            Email: userInfo.data.email,
        },
    });
    let newUser;
    if (existingUser) {
        console.log("User already exists:", existingUser);
        newUser = existingUser;
    }
    else {
        console.log("User does not exist, creating new user...");
        newUser = await prisma.user.create({
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
    return (0, helper_1.createJWT)(existingUser || newUser);
};
exports.loginGoogle = loginGoogle;
//# sourceMappingURL=googleLogin.js.map