import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./routes/authRoute";
import { config } from "./config/config";

export function createApp(): Application {
  const app: Application = express();

  if (config.nodeEnv === "development") {
    app.use(morgan("dev"));
  }

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const corsOptions = {
    origin: config.corsOrigin,
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));

  app.get("/api", (req: Request, res: Response) => {
    res.status(200).json({ message: "TaskTracker Web Service" });
  });

  app.use("/api/users", authRoutes);

  app.get("*", (req: Request, res: Response) => {
    res.status(404).json({ message: "404 Not Found" });
  });

  return app;
}
