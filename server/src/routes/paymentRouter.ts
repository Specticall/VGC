import {
  createSnapTransaction,
  updatePaidStatus,
} from "src/controllers/paymentController";
import { protect } from "src/middleware/protect";
import express from "express";

const paymentRouter = express.Router();

paymentRouter.post("/", protect, createSnapTransaction);
paymentRouter.put("/", protect, updatePaidStatus);

export { paymentRouter };
