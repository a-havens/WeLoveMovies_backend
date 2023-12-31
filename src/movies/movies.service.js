//requires code outside of file for use
const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

//uses mapProperties in utils folder to create nested 'critic' object
const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at"
   });

//queries movies that are showing in theaters
async function list(is_showing) {
  return knex("movies")
    .select("movies.*")
    .modify((queryBuilder) => {
      if (is_showing) {
        queryBuilder
          .join(
            "movies_theaters",
            "movies.movie_id",
            "movies_theaters.movie_id"
          )
          .where({ "movies_theaters.is_showing": true })
          .groupBy("movies.movie_id");
      }
    });
}

//queries a single movie with 'movie_id'
async function read(movie_id) {
  return knex("movies").select("*").where({ movie_id }).first();
  
}

//queries all theaters where single movie is showing
async function listTheatersForMovie(movieId) {
  return knex("theaters")
    .select("theaters.*")
    .join("movies_theaters", "theaters.theater_id", "movies_theaters.theater_id")
    .where({ "movies_theaters.movie_id": movieId });
}

//queries all reviews for a single movie
async function listReviewsForMovie(movieId) {
  return knex("reviews as r")
  .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ "r.movie_id": movieId })
    .then((reviews) => reviews.map(addCritic));;
}

//exports functions for use in 'movies.controller.js'
module.exports = {
  list,
  read,
  listTheatersForMovie,
  listReviewsForMovie
};
