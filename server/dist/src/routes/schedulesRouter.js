"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schedulesRouter = void 0;
const scheduleController_1 = require("../controllers/scheduleController");
const protect_1 = require("../middleware/protect");
const express_1 = __importDefault(require("express"));
const schedulesRouter = express_1.default.Router();
exports.schedulesRouter = schedulesRouter;
schedulesRouter.get("/", protect_1.protect, scheduleController_1.getSchedules);
schedulesRouter.post("/:movieId", protect_1.protect, scheduleController_1.postSchedules);
//# sourceMappingURL=schedulesRouter.js.map