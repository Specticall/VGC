import { getRooms } from "src/controllers";
import express from "express";

const roomRouter = express.Router();
roomRouter.get("/:cinemaId", getRooms);

export { roomRouter };
