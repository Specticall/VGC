import express from "express";
import { protect } from "../middleware/protect";
import {
  getTicketByReservationId,
  getTicketByUserId,
} from "../controllers/ticketController";
const ticketRouter = express.Router();

ticketRouter.get("/", protect, getTicketByUserId);
ticketRouter.get("/:reservationId", protect, getTicketByReservationId);

export { ticketRouter };
