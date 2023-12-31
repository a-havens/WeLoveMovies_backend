//requires code outside of file for use
const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

//routes for /reviews/:reviewId
router.route("/:reviewId")
.put(controller.update)
.delete(controller.destroy)
.all(methodNotAllowed);

//routes for /reviews/movieId
router.route("/:movieId")
.get(controller.list)
.all(methodNotAllowed);

//exports router for use in 'app.js'
module.exports = router;