import { getLanguages } from "src/controllers/languagesController";
import express from "express";

const languageRouter = express.Router();
languageRouter.get("/", getLanguages);

export { languageRouter };
