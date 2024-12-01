import { createSnapTransaction } from "@/controllers/paymentController";
import express from "express";

const paymentRouter = express.Router();

paymentRouter.post("/", createSnapTransaction);

export { paymentRouter };