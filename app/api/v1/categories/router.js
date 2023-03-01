//Import Router package from express
const router = require("express").Router();

//Import function from /categories/controller.js
const { create, index, find, update, destroy } = require("./controller");

//Test categories router with GET method
/*router.get("/categories", (req, res) => {
  res.status(200).json({ status: "success", message: "ini api categories" });
});*/

//Create Route Endpoint with POST method
router.post("/categories", create);

//Find Route Endpoint with GET method
router.get("/categories", index);

//Find Route Endpoint by field_id with GET method
router.get("/categories/:id", find);

//Update Route Endpoint by field_id with PUT method
router.put("/categories/:id", update);

//Delete Route Endpoint by field_id with DELETE method
router.delete("/categories/:id", destroy);

//Export router
module.exports = router;
