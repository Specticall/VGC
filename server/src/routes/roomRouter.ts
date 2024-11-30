import { getRooms } from "@/controllers";
import express from "express";

const roomRouter = express.Router();
roomRouter.get("/:cinemaId", getRooms);

export { roomRouter };
