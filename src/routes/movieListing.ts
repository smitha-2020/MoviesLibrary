import express from "express";
import {
  getMovieListings,
  postMovieListing,
} from "../controller/movieListingController.js";
const router = express.Router();

router.get("/", getMovieListings);
router.post("/", postMovieListing);

export default router;
