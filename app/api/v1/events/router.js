const express = require("express");
const router = express();
const {
  create,
  index,
  find,
  update,
  destroy,
  updateStatus,
} = require("./controller");

const {
  authenticatedUser,
  authorizedRoles,
} = require("../../../middlewares/auth");

router.get("/events", authenticatedUser, authorizedRoles("organizer"), index);
router.get(
  "/events/:id",
  authenticatedUser,
  authorizedRoles("organizer"),
  find
);
router.put(
  "/events/:id",
  authenticatedUser,
  authorizedRoles("organizer"),
  update
);
router.delete(
  "/events/:id",
  authenticatedUser,
  authorizedRoles("organizer"),
  destroy
);
router.post("/events", authenticatedUser, authorizedRoles("organizer"), create);
router.put(
  "/events/:id/status",
  authenticatedUser,
  authorizedRoles("organizer"),
  updateStatus
);

module.exports = router;
