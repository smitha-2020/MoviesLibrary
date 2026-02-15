import express from "express";
import genres from "./routes/genre.js";

const app = express();

app.use(express.json());

app.use("/api/genres", genres);


app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
