//checks if the USER environment variable is defined 
if (process.env.USER) require("dotenv").config();

//necessary requires in order for API to properly work
const express = require("express");
const cors = require("cors")
const app = express();
const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

//using cors and express
app.use(cors());
app.use(express.json());

//using 'movies', 'reviews', and 'theaters' routers
app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

//using error functions
app.use(notFound);
app.use(errorHandler);

//exporting 'app' to be used in 'server.js'
module.exports = app;

