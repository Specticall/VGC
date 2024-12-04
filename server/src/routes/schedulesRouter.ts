import express from "express";
import { protect } from "../middleware/protect";
import { getSchedules, postSchedules } from "../controllers";

const schedulesRouter = express.Router();
schedulesRouter.get("/", protect, getSchedules);
schedulesRouter.post("/:movieId", protect, postSchedules);

export { schedulesRouter };
