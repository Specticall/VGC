import express from "express";
import cors from "cors";

import {
  authRouter,
  castRouter,
  languageRouter,
  movieRouter,
  paymentRouter,
  s3Router,
  seatRouter,
  userRouter,
} from "./routes";
import { errorHandler } from "./controllers/errorController";
import { schedulesRouter } from "./routes/schedulesRouter";
import { genreRouter } from "./routes/genreRouter";
import { cinemaRouter } from "./routes/cinemaRouter";
import { roomRouter } from "./routes/roomRouter";
import { ticketRouter } from "./routes/ticketRouter";

const app = express();
// Enable fetching from localhost
app.use(cors());

// Middle to parse body request
app.use(express.json());

app.use("/movies", movieRouter);
app.use("/casts", castRouter);
app.use("/presigned", s3Router);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/schedules", schedulesRouter);
app.use("/languages", languageRouter);
app.use("/genres", genreRouter);
app.use("/payments", paymentRouter);
app.use("/cinemas", cinemaRouter);
app.use("/rooms", roomRouter);
app.use("/seats", seatRouter);
app.use("/tickets", ticketRouter);

app.use(errorHandler);

export default app;
