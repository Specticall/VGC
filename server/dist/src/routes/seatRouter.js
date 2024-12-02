"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seatRouter = void 0;
const express_1 = __importDefault(require("express"));
const seatController_1 = require("../controllers/seatController");
const seatRouter = express_1.default.Router();
exports.seatRouter = seatRouter;
seatRouter.get("/:id", seatController_1.getSeatsByMovieId);
seatRouter.get("/room/:roomId", seatController_1.getSeatsByRoomId);
//# sourceMappingURL=seatRouter.js.map