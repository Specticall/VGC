import express from "express";
import { getRooms } from "../controllers";

const roomRouter = express.Router();
roomRouter.get("/:cinemaId", getRooms);

export { roomRouter };
