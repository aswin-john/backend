const express = require("express");
const router = express.Router();

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

module.exports = router;
