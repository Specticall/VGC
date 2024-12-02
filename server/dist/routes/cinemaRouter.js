"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cinemaRouter = void 0;
const cinemaController_1 = require("@/controllers/cinemaController");
const protect_1 = require("@/middleware/protect");
const express_1 = __importDefault(require("express"));
const cinemaRouter = express_1.default.Router();
exports.cinemaRouter = cinemaRouter;
cinemaRouter.get("/", protect_1.protect, cinemaController_1.getCinema);
//# sourceMappingURL=cinemaRouter.js.map