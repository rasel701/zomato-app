const express = require("express");
const foodController = require("../controllers/food.controller");
const authMiddelware = require("../middelwares/auth.midd");
const router = express.Router();
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/",
  authMiddelware.authFoodPartnerMiddelware,
  upload.single("video"),
  foodController.createFood,
);

module.exports = router;
