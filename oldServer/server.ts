import { createApp } from "./app";
import mongoose from "mongoose";
import { config } from "./config/config";

const connectDB = async (): Promise<void> => {
  try {
    const dbUri = config.mongoUri;
    if (!dbUri) {
      console.error(
        "MongoDB connection URI is missing in the environment variables."
      );
      process.exit(1);
    }
    await mongoose.connect(dbUri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

const app = createApp();

connectDB();

const PORT = config.port;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
