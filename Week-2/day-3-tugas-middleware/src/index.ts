import express, { Request, Response } from "express";

import routes from "./routes/api";
import bodyParser from "body-parser";

const PORT = 3000;

function init() { 
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true}))
  // app.use(bodyParser.json());
  // app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api", routes);

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

init();
