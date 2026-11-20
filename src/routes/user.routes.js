const express = require("express");
const router = express.Router();
const roleMiddleware = require("../middleware/role.middleware");

const { createUser, loginUser } = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/users/register", createUser);
router.post("/users/login", loginUser);
router.get("/protected", authMiddleware, (req, res) => {
  return res.status(200).json({
    message: "Access granted",
    user: req.user,
  });
});

router.get("/admin", authMiddleware, roleMiddleware("admin"), (req, res) => {
  return res.status(200).json({
    message: "Welcome Admin",
  });
});

module.exports = router;
