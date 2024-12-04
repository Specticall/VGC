import { getGenres } from "src/controllers/genreController";
import { protect } from "src/middleware/protect";
import express from "express";

const genreRouter = express.Router();
genreRouter.get("/", protect, getGenres);

export { genreRouter };
