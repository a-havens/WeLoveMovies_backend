//requires code outside of file for use
const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

//a function that accepts an array and when called returns an array with one element for each unique field value.
const reduceMovies = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
});

//quesries list of all theaters then passes higher order function
async function list() {
  return knex("theaters")
    .join(
      "movies_theaters",
      "movies_theaters.theater_id",
      "theaters.theater_id"
    )
    .join("movies", "movies.movie_id", "movies_theaters.movie_id")
    .then(reduceMovies);
}

//exports function for use in 'theaters.controller.js'
module.exports = {
  list,
};
