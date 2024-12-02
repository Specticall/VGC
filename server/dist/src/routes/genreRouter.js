"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genreRouter = void 0;
const genreController_1 = require("@/controllers/genreController");
const protect_1 = require("@/middleware/protect");
const express_1 = __importDefault(require("express"));
const genreRouter = express_1.default.Router();
exports.genreRouter = genreRouter;
genreRouter.get("/", protect_1.protect, genreController_1.getGenres);
//# sourceMappingURL=genreRouter.js.map