import { getLanguages } from "@/controllers/languagesController";
import express from "express";

const languageRouter = express.Router();
languageRouter.get("/", getLanguages);

export { languageRouter };
