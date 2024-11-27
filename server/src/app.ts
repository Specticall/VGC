import express from "express";
import cors from "cors";

import { 
  castRouter,
  movieRouter,
  s3Router
} from "./routes";

const app = express();
// Enable fetching from localhost
app.use(cors());

// Middle to parse body request
app.use(express.json());

app.use("/movies", movieRouter);
app.use("/casts", castRouter);
app.use("/presigned", s3Router);

export default app;
