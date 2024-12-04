
import express from "express";
import { createSnapTransaction, updatePaidStatus } from "../controllers/paymentController";
import { protect } from "../middleware/protect";

const paymentRouter = express.Router();

paymentRouter.post("/", protect, createSnapTransaction);
paymentRouter.put("/", protect, updatePaidStatus);

export { paymentRouter };
