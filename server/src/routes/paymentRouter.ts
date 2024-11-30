import { createSnapTransaction } from "@/controllers/paymentController";
import express from "express";

const paymentRouter = express.Router();

// paymentRouter.post("/create", createPayment);
paymentRouter.post("/snap", createSnapTransaction);

export { paymentRouter };