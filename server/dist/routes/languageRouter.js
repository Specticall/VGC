"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.languageRouter = void 0;
const languagesController_1 = require("@/controllers/languagesController");
const express_1 = __importDefault(require("express"));
const languageRouter = express_1.default.Router();
exports.languageRouter = languageRouter;
languageRouter.get("/", languagesController_1.getLanguages);
//# sourceMappingURL=languageRouter.js.map