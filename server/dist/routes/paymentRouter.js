"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRouter = void 0;
const paymentController_1 = require("@/controllers/paymentController");
const protect_1 = require("@/middleware/protect");
const express_1 = __importDefault(require("express"));
const paymentRouter = express_1.default.Router();
exports.paymentRouter = paymentRouter;
paymentRouter.post("/", protect_1.protect, paymentController_1.createSnapTransaction);
paymentRouter.put("/", protect_1.protect, paymentController_1.updatePaidStatus);
//# sourceMappingURL=paymentRouter.js.map