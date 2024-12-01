import { createSnapTransaction, updatePaidStatus } from "@/controllers/paymentController";
import express from "express";

const paymentRouter = express.Router();

paymentRouter.post("/", createSnapTransaction);
paymentRouter.put("/", updatePaidStatus);


export { paymentRouter };