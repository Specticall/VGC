import express from "express";
import { getTicketByUserId } from "@/controllers/ticketController";
import { protect } from "@/middleware/protect";

const ticketRouter = express.Router();

ticketRouter.get("/", protect, getTicketByUserId);

export { ticketRouter };
