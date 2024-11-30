import { getSchedules, postSchedules } from "@/controllers/scheduleController";
import { protect } from "@/middleware/protect";
import express from "express";

const schedulesRouter = express.Router();
schedulesRouter.get("/", protect, getSchedules);
schedulesRouter.post("/:movieId", protect, postSchedules);

export { schedulesRouter };
