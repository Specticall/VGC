import express from "express";
import {
  getSeatsByMovieId,
  getSeatsByRoomId,
} from "../controllers/seatController";

const seatRouter = express.Router();

seatRouter.get("/:id", getSeatsByMovieId);
seatRouter.get("/room/:scheduleId/:roomId", getSeatsByRoomId);

export { seatRouter };
