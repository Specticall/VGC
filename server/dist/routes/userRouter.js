"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const userController_1 = require("@/controllers/userController");
const protect_1 = require("@/middleware/protect");
const express_1 = __importDefault(require("express"));
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
userRouter.use(protect_1.protect);
userRouter.get("/", userController_1.getUsers);
userRouter.post("/search-history", userController_1.storeSearchHistory);
userRouter.get("/search-history", userController_1.getSearchHistory);
//# sourceMappingURL=userRouter.js.map