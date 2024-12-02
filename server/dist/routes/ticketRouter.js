"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketRouter = void 0;
const express_1 = __importDefault(require("express"));
const ticketController_1 = require("@/controllers/ticketController");
const protect_1 = require("@/middleware/protect");
const ticketRouter = express_1.default.Router();
exports.ticketRouter = ticketRouter;
ticketRouter.get("/", protect_1.protect, ticketController_1.getTicketByUserId);
//# sourceMappingURL=ticketRouter.js.map