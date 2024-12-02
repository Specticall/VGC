"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoiceRouter = void 0;
const invoiceGenerator_1 = require("@/invoice/invoiceGenerator");
const express_1 = __importDefault(require("express"));
const invoiceRouter = express_1.default.Router();
exports.invoiceRouter = invoiceRouter;
invoiceRouter.post("/", invoiceGenerator_1.generateInvoice);
//# sourceMappingURL=invoiceRouter.js.map