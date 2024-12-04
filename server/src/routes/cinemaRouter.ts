import { getCinema } from "../controllers/cinemaController";
import { protect } from "../middleware/protect";
import express from "express";

const cinemaRouter = express.Router();
cinemaRouter.get("/", protect, getCinema);

export { cinemaRouter };
