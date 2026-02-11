const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
} = require("../controllers/auth.controllers");

const router = express.Router();

// user auth APIs

router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.get("/user/logout", logoutUser);

// foodparnter auth APIs

router.post("/food-partner/register", registerFoodPartner);
router.post("/food-partner/login", loginFoodPartner);
router.get("/food-parter/logout", logoutFoodPartner);

module.exports = router;
