//requires code outside of file for use
const router = require("express").Router({ mergeParams: true });
const controller = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

//routes for /theaters
router.route("/").get(controller.list).all(methodNotAllowed);

//exports route for use in 'app.js'
module.exports = router;
