import { getSchedules } from "@/controllers/scheduleController";
import { protect } from "@/middleware/protect";
import express from "express";

const schedulesRouter = express.Router();
schedulesRouter.get("/", protect, getSchedules);

export { schedulesRouter };
