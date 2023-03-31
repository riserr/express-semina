const router = require("express").Router();
const { index, create, destroy, find, update } = require("./controller");
const {
  authenticatedUser,
  authorizedRoles,
} = require("../../../middlewares/auth");

router.get("/talents", authenticatedUser, authorizedRoles("organizer"), index);

router.post(
  "/talents",
  authenticatedUser,
  authorizedRoles("organizer"),
  create
);

router.get(
  "/talents/:id",
  authenticatedUser,
  authorizedRoles("organizer"),
  find
);

router.put(
  "/talents/:id",
  authenticatedUser,
  authorizedRoles("organizer"),
  update
);

router.delete(
  "/talents/:id",
  authenticatedUser,
  authorizedRoles("organizer"),
  destroy
);

module.exports = router;
