const express = require("express");
const router = express.Router();

const { createUser, loginUser } = require("../controllers/user.controller");

router.post("/users/register", createUser);
router.post("/users/login", loginUser);

module.exports = router;
