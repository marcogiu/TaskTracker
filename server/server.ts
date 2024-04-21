import { createApp } from "./app";
import { connectDB } from "./db";

const app = createApp();

connectDB();

app.listen(8080, () => console.log(`Server is listening on port ${8080}`));
