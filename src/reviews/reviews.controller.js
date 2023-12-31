//requires code outside of file for use
const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const methodNotAllowed = require("../errors/methodNotAllowed");

//middleware that checks that review exists with 'reviewId' as parameter
async function reviewExists(req, res, next) {
  const review = await service.read(req.params.reviewId)
  if (review) {
    res.locals.review = review;
    return next();
  }
  //returns 404 status with error message if no review found
  next({ status: 404, message: `Review cannot be found.` });
}

//deletes found review
async function destroy(req, res) {
  const review = res.locals.review.review_id;
  await service.destroy(review);
  //returns 204 success status
  res.sendStatus(204);
}

//lists all reviews for single movie
async function list(req, res) {
  const movie = req.params.movieId
  const data = await service.list(movie)
  res.json({ data });
}

//ensures 'movieId' in path; if not, calls methodNotAllowed()
function hasMovieIdInPath(req, res, next) {
  if (req.params.movieId) {
    return next();
  }
  methodNotAllowed(req, res, next);
}

//ensures no 'movieId' in path; if so, calls methodNotAllowed()
function noMovieIdInPath(req, res, next) {
  if (req.params.movieId) {
    return methodNotAllowed(req, res, next);
  }
  next();
}

//takes request with 'reviewId' and body and updates review
async function update(req, res) {
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  const data = await service.update(updatedReview);
  res.json({ data });
}

//exports functions for use in 'reviews.router.js'
module.exports = {
  destroy: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(destroy),
  ],
  list: [hasMovieIdInPath, asyncErrorBoundary(list)],
  update: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(update),
  ],
};
