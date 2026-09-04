import { loadEnvFile } from "node:process";
import express from "express";
import database from "./config/database.js";

loadEnvFile();

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

try {
  await database();
  app.listen(port, () => {
    console.log(`App listening at ${port}`);
  });
} catch (err) {
  console.error("Failed to start server:", err);
  process.exit(1);
}
