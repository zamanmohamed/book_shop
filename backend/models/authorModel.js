import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
  }
);

const Author = mongoose.model("Author", authorSchema);

export default Author;
