import express from "express";
import { getSeatsByMovieId } from "@/controllers/seatController";

const seatRouter = express.Router();

seatRouter.get("/:id", getSeatsByMovieId);

export { seatRouter };