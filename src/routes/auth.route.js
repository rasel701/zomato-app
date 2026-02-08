const express = require("express");
const { registerUser, loginUser } = require("../controllers/auth.controllers");

const router = express.Router();

router.post("/user/register", registerUser);
router.post("/user/login", loginUser);

module.exports = router;
