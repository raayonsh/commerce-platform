import express from "express";
import { loadEnvFile } from "node:process";

import { connectDB, disconnectDB } from "./config/database.js";

loadEnvFile();

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

try {
  await connectDB();

  const server = app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });

  const handleShutdown = async () => {
    console.log("\nShutting down gracefully...");

    server.close(async () => {
      await disconnectDB();
      process.exit(0);
    });
  };

  process.on("SIGINT", handleShutdown);
  process.on("SIGTERM", handleShutdown);
} catch (err) {
  console.error("Failed to start server:", err.message);
  process.exit(1);
}
