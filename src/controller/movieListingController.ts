import { Genre } from "../model/genre.js";
import Joi from "joi";
import { getGenreById } from "./genreController.js";
import { Request, Response } from "express";
import {
  IMovieListing,
  MovieListing,
  IJoiMovieListing,
} from "../model/movieListing.js";

const validateMovieListing = async ({
  title,
  genreId,
  numberInStock,
  dailyRentalRate,
}: IJoiMovieListing) => {
  const MovieListingJoiSchema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0).max(255).required(),
    dailyRentalRate: Joi.number().min(0).max(255).required(),
  });

  return await MovieListingJoiSchema.validateAsync({
    title,
    genreId,
    numberInStock,
    dailyRentalRate,
  });
};

export const getMovieListings = async (req: Request, res: Response) => {
  try {
    const movieListings = await MovieListing.find();
    res.json(movieListings);
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ message: err.message });
  }
};

export const getMovieListingById = async (req: Request, res: Response) => {
  try {
    const movieListing = await MovieListing.findById(req.params.id);
    if (!movieListing)
      return res.status(404).json({ message: "Movie listing not found" });
    res.json(movieListing);
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ message: err.message });
  }
};

export const postMovieListing = async (req: Request, res: Response) => {
  const { title, genreId, numberInStock, dailyRentalRate } = req.body;
  const validatedMovieListing = await validateMovieListing({
    title,
    genreId,
    numberInStock,
    dailyRentalRate,
  });
  if (!validatedMovieListing) {
    return res.status(400).json({ message: "Invalid movie listing data" });
  }

  const genreDoc = await Genre.findById(genreId);

  if (!genreDoc) {
    return res.status(400).json({ message: "Invalid genre ID provided" });
  }

  await MovieListing.create({
    title,
    genre: {
      name: genreDoc.name,
    },
    numberInStock,
    dailyRentalRate,
  })
    .then((createdMovieListing: IMovieListing) =>
      res.status(201).json(createdMovieListing),
    )
    .catch(
      (err: Error) =>
        err instanceof Error && res.status(500).json({ message: err.message }),
    );
};
