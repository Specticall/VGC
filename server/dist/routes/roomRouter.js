"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomRouter = void 0;
const controllers_1 = require("@/controllers");
const express_1 = __importDefault(require("express"));
const roomRouter = express_1.default.Router();
exports.roomRouter = roomRouter;
roomRouter.get("/:cinemaId", controllers_1.getRooms);
//# sourceMappingURL=roomRouter.js.map