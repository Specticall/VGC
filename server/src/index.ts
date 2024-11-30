import { config } from "dotenv";

// Configure enviroment variables
config({ path: "./.env" });

//////////////////////////

import app from "./app";
import swaggerDocs from "./swagger";

const PORT = process.env.PORT;
app.listen(PORT, () => {
  swaggerDocs(app);
  console.log(`Application Running on port ${PORT}...`);
});
