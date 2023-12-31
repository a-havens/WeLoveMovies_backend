//requires code outside of file for use
const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//middleware that checks if movie exists using 'movieId'
async function movieExists(req, res, next) {
  const movie = await service.read(req.params.movieId);

  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  //returns 404 status with error message if no movie found
  next({ status: 404, message: `Movie cannot be found.` });
}

//returns a single movie
async function read(req, res) {
  res.json({ data: res.locals.movie });
}

//returns movies currently showing in theaters
async function list(req, res) {
  const isShowing = req.query.is_showing === "true";
    const data = await service.list(isShowing);
    res.json({ data });
}

//lists theaters where specific movie is showing
async function listTheatersForMovie(req, res) {
  const movieId = req.params.movieId;
    const data = await service.listTheatersForMovie(movieId);
    res.json({ data });
}

//list all reviews for a specific movie
async function listReviewsForMovie(req, res) {
  const movieId = req.params.movieId;
    const data = await service.listReviewsForMovie(movieId);
    res.json({ data });
}

//exports functions for use in 'movies.router.js'
module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
  listTheatersForMovie: [asyncErrorBoundary(listTheatersForMovie)],
  listReviewsForMovie: [asyncErrorBoundary(listReviewsForMovie)]
};