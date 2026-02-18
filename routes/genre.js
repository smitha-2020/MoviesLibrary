import express from "express";
const router = express.Router();
import {
  getGenreById,
  getGenres,
  postGenre,
  putGenre,
} from "../controller/genreController.js";

router.get("/", getGenres);
router.get("/:id", getGenreById);
router.post("/", postGenre);
router.put("/:id", putGenre);

export default router;
