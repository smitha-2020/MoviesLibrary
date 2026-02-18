import express from "express";
import config from "config";
import mongoose from "mongoose";

import genreRoute from "./routes/genre.js";

const app = express();
const dbConfig = config.get("dbConfig");

mongoose
  .connect(`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.dbName}`)
  .then(() => {
    console.log(`Connected to MongoDB ${dbConfig.dbName}`);
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err.message);
  });

app.use(express.json());

app.use("/api/genre", genreRoute);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
