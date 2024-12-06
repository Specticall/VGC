import express from "express";
import { getLanguages } from "../controllers/languagesController";

const languageRouter = express.Router();
languageRouter.get("/", getLanguages);

export { languageRouter };
