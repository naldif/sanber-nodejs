import express, { Request, Response } from "express";
const path = require('path');

const PORT = 3000;

function init() {
  const app = express();

  app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
  });
  
  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      message: "OK",
      data: null,
    });
  });

  app.get("/hello", (req: Request, res: Response) => {
    res.status(200).json({
      message: "Success fetch message",
      data: "Hello World!",
    });
  });

  app.get("/user", (req: Request, res: Response) => {
    res.status(200).json({
      message: "Success fetch user",
      data: {
          "id": 1,
          "name": "Budi",
          "username": "budidu",
          "email": "budidu@mail.com"
        }
    });
  });

  app.use(express.static(path.join(__dirname, 'public')));

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

init();
