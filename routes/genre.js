import Joi from "joi";
import express from "express";
const router = express.Router();

let genres = [
  { id: 1, name: "Horror" },
  { id: 2, name: "Comedy" },
  { id: 3, name: "Action" },
];

router.get("/", (req, res) => {
  res.send(genres);
});
router.get("/:id", (req, res) => {
  const genre = genres.find((c) => c.id === Number.parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  res.send(genre);
});
router.post("/", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
});

router.put("/:id", (req, res) => {
  //check if the id exixts
  const genre = genres.find((c) => c.id === Number.parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  //validate the inout data is in good shape
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //update the genre
  genre.name = req.body.name;
  genres = genres.map((c) => (c.id === genre.id ? genre : c));
  res.send(genres);
});

router.delete("/:id", (req, res) => {
  //check if the id exixts
  const genre = genres.find((c) => c.id === Number.parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  //delete the genre
  genres = genres.filter((c) => c.id !== genre.id);
  res.send(genres);
});

export default router;
