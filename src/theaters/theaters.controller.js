//requires code outside of file for use
const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//lists all theaters
async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}

//exports function for use in 'theaters.router.js'
module.exports = {
  list: asyncErrorBoundary(list),
};
