import mongoose from "mongoose";
const { Schema } = mongoose;

export const genreSchema = new Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
});

export const Genre = mongoose.model("Genre", genreSchema);
