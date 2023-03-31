const router = require("express").Router();
const { createCMSOrganizer, createCMSUser, index } = require("./controller");
const {
  authenticatedUser,
  authorizedRoles,
} = require("../../../middlewares/auth");

router.post(
  "/organizers",
  authenticatedUser,
  authorizedRoles("owner"),
  createCMSOrganizer
);

router.post(
  "/users",
  authenticatedUser,
  authorizedRoles("organizer"),
  createCMSUser
);

router.get("/users", authenticatedUser, authorizedRoles("owner"), index);

module.exports = router;
