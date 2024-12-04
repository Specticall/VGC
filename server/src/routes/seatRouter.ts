import express from "express";
import {
  getSeatsByMovieId,
  getSeatsByRoomId,
} from "src/controllers/seatController";

const seatRouter = express.Router();

seatRouter.get("/:id", getSeatsByMovieId);
seatRouter.get("/room/:roomId", getSeatsByRoomId);

export { seatRouter };
