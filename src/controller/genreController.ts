import { Genre } from "../model/genre.js";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const getGenres = async (_req: Request, res: Response) => {
  try {
    const genres = await Genre.find();
    return res.status(StatusCodes.OK).send(genres);
  } catch (err) {
    if (err instanceof Error)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
  }
};

export const getGenreById = async (req: Request, res: Response) => {
  try {
    const genre = await Genre.findById(req.params.id);
    if (!genre)
      return res
        .status(StatusCodes.NOT_FOUND)
        .send("The genre with the given ID was not found.");
    return res.send(genre);
  } catch (err) {
    if (err instanceof Error)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
  }
};

export const postGenre = async (req: Request, res: Response) => {
  const genreToPost = { name: req.body.name };
  let createdGenre = await Genre.create(genreToPost);
  res.send(createdGenre);
};

export const putGenre = async (req: Request, res: Response) => {
  const genreToUpdate = { name: req.body.name };

  const updatedGenre = await Genre.findByIdAndUpdate(
    req.params.id,
    genreToUpdate,
    { returnDocument: "after" },
  );

  if (!updatedGenre) {
    return res.status(404).send("The genre with the given ID was not found.");
  }

  res.send(updatedGenre);
};

export const deleteGenre = async (req: Request, res: Response) => {
  const deletedGenre = await Genre.findByIdAndDelete(req.params.id);
  if (!deletedGenre) {
    return res.status(404).send("The genre with the given ID was not found.");
  }
  res.send(deletedGenre);
};
