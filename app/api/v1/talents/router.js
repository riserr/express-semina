const router = require("express").Router();
const { index } = require("./controller");

router.get("/talents", index);

module.exports = router;
