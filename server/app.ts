import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/AuthRoute";

export function createApp(): Application {
  const app: Application = express();

  dotenv.config();

  app.use(morgan("dev"));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());

  app.get("/api", (req: Request, res: Response) => {
    res.status(200).json({ message: "TaskTracker Web Service" });
  });

  app.use("/api/users", authRoutes);

  app.get("*", (req: Request, res: Response) => {
    res.status(404).json({ message: "404 Not Found" });
  });

  return app;
}
