import asyncHandler from "express-async-handler";
import Author from "../models/authorModel.js";

//@route GET/api/author
const getAuthors = asyncHandler(async (req, res) => {
  const authors = await Author.find({});

  res.json({ authors });
});

//@route GET/api/author/:id
const getAuthorByID = asyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.id);

  if (author) {
    res.json(author);
  } else {
    res.status(401);
    throw new Error("Product Not Found");
  }
});

// @route   POST /api/author
const createAuthor = asyncHandler(async (req, res) => {
  const { first_name, last_name } = req.body;

  const author = new Author({ first_name, last_name });

  const createdAuthor = await author.save();
  res.status(201).json(createdAuthor);
});

// @route   PUT /api/author/:id
const updateAuthor = asyncHandler(async (req, res) => {
  const { first_name, last_name } = req.body;

  const author = await Author.findById(req.params.id);

  if (author) {
    author.first_name = first_name;
    author.last_name = last_name;

    const updatedAuthor = await author.save();
    res.json(updatedAuthor);
  } else {
    res.status(404);
    throw new Error("Author not found");
  }
});

export { createAuthor, getAuthors, getAuthorByID, updateAuthor };
