import { generateInvoice } from "src/invoice/invoiceGenerator";
import { protect } from "src/middleware/protect";
import express from "express";

const invoiceRouter = express.Router();

invoiceRouter.post("/", protect, generateInvoice);

export { invoiceRouter };
