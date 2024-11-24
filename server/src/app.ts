import express from "express";
import cors from "cors";
import cinemas from "./assets/cinemas";
const app = express();

// Enable fetching from localhost
app.use(cors());

// Middle to parse body request
app.use(express.json());


app.get("/cinemas", (req, res) => {
  res.json(cinemas);
});

export default app;
