import express from "express";
import cors from "cors";

import {
  authRouter,
  castRouter,
  movieRouter,
  s3Router,
  userRouter,
} from "./routes";
import { errorHandler } from "./controllers/errorController";

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

app.use(errorHandler);

export default app;
