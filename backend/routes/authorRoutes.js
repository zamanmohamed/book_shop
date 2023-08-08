import express from "express";
const router = express.Router();
import {
  createAuthor,
  getAuthors,
  getAuthorByID,
  updateAuthor,
} from "../controllers/AuthorControllers.js";

router.route("/").get(getAuthors).post(createAuthor);

router.route("/:id").get(getAuthorByID).put(updateAuthor);

export default router;
