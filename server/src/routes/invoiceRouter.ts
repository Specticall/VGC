import { generateInvoice } from "@/invoice/invoiceGenerator";
import { protect } from "@/middleware/protect";
import express from "express";

const invoiceRouter = express.Router();

invoiceRouter.post("/", generateInvoice);

export { invoiceRouter };
