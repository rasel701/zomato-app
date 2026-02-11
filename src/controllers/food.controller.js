const foodModel = require("../models/food.model");
const { uploadVideoFile } = require("../services/video.service");
const { v4: uuid } = require("uuid");

const createFood = async (req, res) => {
  const { name, description } = req.body;
  const videoFile = req.file.buffer;
  const video = await uploadVideoFile(videoFile.toString("base64"), uuid());
  const foodItem = await foodModel.create({
    name: name,
    description,
    video: video.url,
    foodPartner: req.foodPartner._id,
  });

  res.status(201).json({
    message: "Food created successfully",
    food: foodItem,
  });
};

module.exports = {
  createFood,
};
