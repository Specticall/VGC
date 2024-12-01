import { createSnapTransaction } from "@/controllers/paymentController";
import { protect } from "@/middleware/protect";
import express from "express";

const paymentRouter = express.Router();

// paymentRouter.post("/create", createPayment);
paymentRouter.post("/", protect, createSnapTransaction);

export { paymentRouter };
