import { getGenres } from "../controllers/genreController";
import { protect } from "../middleware/protect";
import express from "express";

const genreRouter = express.Router();
genreRouter.get("/", protect, getGenres);

export { genreRouter };
