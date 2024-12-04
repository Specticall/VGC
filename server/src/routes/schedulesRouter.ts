import { getSchedules, postSchedules } from "src/controllers/scheduleController";
import { protect } from "src/middleware/protect";
import express from "express";

const schedulesRouter = express.Router();
schedulesRouter.get("/", protect, getSchedules);
schedulesRouter.post("/:movieId", protect, postSchedules);

export { schedulesRouter };
