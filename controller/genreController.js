import { Genre } from "../model/genre.js";
import Joi from "joi";

const pageSize = 10;
const pageNumber = 2;

export const GenreJoiSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
});

export const getGenres = async (req, res) => {
  try {
    const genres = await Genre.find();
    return res.send(genres);
  } catch (err) {
    console.error("Error fetching genres:", err);
    return res.status(500).send("Server error");
  }
};

export const getGenreById = async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  return res.send(genre);
};

export const postGenre = async (req, res) => {
  const genreToPost = { name: req.body.name };

  try {
    const result = await GenreJoiSchema.validateAsync(genreToPost);
    console.log(result);
  } catch (err) {
    return res.status(400).send(err.message);
  }

  await Genre.create(genreToPost);

  res.send(genreToPost);
};

export const putGenre = async (req, res) => {
  const genreToUpdate = { name: req.body.name };

  try {
    const result = await GenreJoiSchema.validateAsync(genreToUpdate);
    console.log(result);
  } catch (err) {
    return res.status(400).send(err.message);
  }

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
