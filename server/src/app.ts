import express from "express";
import cors from "cors";

import { 
  movieRouter 
} from "./routes";

const app = express();
// Enable fetching from localhost
app.use(cors());

// Middle to parse body request
app.use(express.json());

app.use("/movies", movieRouter);

export default app;
