import express from "express";
const router = express.Router();
import {
  getBooks,
  getBookByID,
  createBook,
  updateBook,
} from "../controllers/bookController.js";

// if( !mongoose.Types.ObjectId.isValid(id) ) return false;

router.route("/").post(createBook).get(getBooks);
router.route("/:id").get(getBookByID).put(updateBook);

export default router;
