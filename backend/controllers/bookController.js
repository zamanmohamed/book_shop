import asyncHandler from "express-async-handler";
import Book from "../models/bookModel.js";

//@route GET/api/author
const getBooks = asyncHandler(async (req, res) => {
  const Books = await Book.find({});

  res.json({ Books });
});

//@route GET/api/book/:id
const getBookByID = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id).populate({ path: "author" });

  if (book) {
    res.json(book);
  } else {
    res.status(401);
    throw new Error("Product Not Found");
  }
});

// @route   POST /api/book
const createBook = asyncHandler(async (req, res) => {
  const { name, isbn, author } = req.body;

  const book = new Book({ name, isbn, author });

  const createdBook = await book.save();
  res.status(201).json(createdBook);
});

// @route   PUT /api/book/:id
const updateBook = asyncHandler(async (req, res) => {
  const { name, isbn, author } = req.body;

  const book = await Book.findById(req.params.id);

  if (book) {
    book.name = name;
    book.isbn = isbn;
    book.author = author;

    const updatedAuthor = await book.save();
    res.json(updatedAuthor);
  } else {
    res.status(404);
    throw new Error("Author not found");
  }
});

export { getBooks, getBookByID, createBook, updateBook };
