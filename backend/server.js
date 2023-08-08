import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import authorRoutes from "./routes/authorRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";


dotenv.config();

connectDB();

const app = express();

//allow to accept JSON data
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/author", authorRoutes);
app.use("/api/book", bookRoutes);



//Error Handing
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server Running in ${process.env.NODE_ENV} Port 5000`)
);
