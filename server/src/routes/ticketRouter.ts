import express from "express";
import { getTicketByUserId } from "src/controllers/ticketController";
import { protect } from "src/middleware/protect";

const ticketRouter = express.Router();

ticketRouter.get("/", protect, getTicketByUserId);

export { ticketRouter };
