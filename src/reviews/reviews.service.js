//requires knex for use
const knex = require("../db/connection");

//destroys single review
function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

//queries list of all reviews for specific movie
function list(movie_id) {
  return knex("reviews as r")
  .select("r.*")
  .where({ "r.movie_id": movie_id });
  
}

//queries a single review
function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

//queries a single critic
function readCritic(criticId) {
  return knex("critics").select("*").where({ critic_id: criticId }).first();
}

//returns critic for specific review
async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

//updates review including nested critic
function update(review) {
  return knex("reviews")
    .select("*")
    .where({ review_id: review.review_id })
    .update(review, "*")
    .then(()=> read(review.review_id))
    .then(setCritic);
    
}

//exports functions for use in 'reviews.controller.js'
module.exports = {
  destroy,
  list,
  read,
  update,
};