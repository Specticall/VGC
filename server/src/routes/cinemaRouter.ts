import { getCinema } from "src/controllers/cinemaController";
import { protect } from "src/middleware/protect";
import express from "express";

const cinemaRouter = express.Router();
cinemaRouter.get("/", protect, getCinema);

export { cinemaRouter };
