import { getMovie } from "@/controllers/movieController";
import express from "express";

const movieRouter = express.Router();

movieRouter.get("/", getMovie);
// movieRouter.get("/:id", getMovieById);
// movieRouter.post("/", getMovie);
// movieRouter.patch("/", getMovie);
// movieRouter.delete("/", getMovie);

export { movieRouter };