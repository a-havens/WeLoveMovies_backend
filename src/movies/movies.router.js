//requires code outside of file for use
const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

//routes for /movies/:movieId/theaters
router.route("/:movieId/theaters")
.get(controller.listTheatersForMovie)
.all(methodNotAllowed);

//routes for /movies/:movieId/reviews
router.route("/:movieId/reviews")
.get(controller.listReviewsForMovie)
.all(methodNotAllowed);

//routes for /movies/:movieId
router.route("/:movieId")
.get(controller.read)
.all(methodNotAllowed);

//routes for /movies
router.route("/")
.get(controller.list)
.all(methodNotAllowed);

//exports routes for use in 'app.js'
module.exports = router;