import dotenv from "dotenv";
dotenv.config();

interface Config {
  nodeEnv: string;
  port: number;
  mongoUri: string;
  jwtSecret: string;
  corsOrigin: string;
  emailConfig: {
    service: string;
    username: string;
    password: string;
  };
  logLevel: string;
}

export const config: Config = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "3000"),
  mongoUri: process.env.MONGO_URI!,
  jwtSecret: process.env.JWT_SECRET!,
  corsOrigin: process.env.CORS_ORIGIN!,
  emailConfig: {
    service: process.env.EMAIL_SERVICE!,
    username: process.env.EMAIL_USERNAME!,
    password: process.env.EMAIL_PASSWORD!,
  },
  logLevel: process.env.LOG_LEVEL || "debug",
};
