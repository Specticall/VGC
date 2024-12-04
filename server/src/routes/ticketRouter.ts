import express from "express";
import { protect } from "../middleware/protect";
import { getTicketByUserId } from "../controllers/ticketController";
// import { protect } from "src/middleware/protect";

const ticketRouter = express.Router();

ticketRouter.get("/", protect, getTicketByUserId);

export { ticketRouter };
