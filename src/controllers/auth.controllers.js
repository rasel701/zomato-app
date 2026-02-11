const userModel = require("../models/auth.model");
const foodpartnerModel = require("../models/foodpartner.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  console.log({ fullName, email, password });

  const isUserExists = await userModel.findOne({
    email,
  });

  if (isUserExists) {
    return res.status(400).json({
      message: "User already axists",
    });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const createUser = await userModel.create({
    fullName,
    password: hashPassword,
    email,
  });
  const token = jwt.sign({ id: createUser._id }, process.env.JWT_SECRET);

  res.cookie("token", token);
  res.status(201).json({
    message: "User registered successfully",
    user: {
      _id: createUser._id,
      email: createUser.email,
      fullName: createUser.fullName,
    },
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email,
  });
  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const isPassword = await bcrypt.compare(password, user.password);

  if (!isPassword) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    },
  });
};

const logoutUser = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully",
  });
};

const registerFoodPartner = async (req, res) => {
  const { name, email, password } = req.body;

  const isExists = await foodpartnerModel.findOne({ email });

  if (isExists) {
    return res.status(400).json({
      message: "Food partner account already exists",
    });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const foodpartner = await foodpartnerModel.create({
    email,
    name,
    password: hashPassword,
  });
  const token = jwt.sign({ id: foodpartner._id }, process.env.JWT_SECRET);
  res.cookie("token", token);

  res.status(201).json({
    message: "Food partner registered successfully",
    foodPartner: {
      _id: foodpartner._id,
      email: foodpartner.email,
      name: foodpartner.email,
    },
  });
};

const loginFoodPartner = async (req, res) => {
  const { email, password } = req.body;

  const isExists = await foodpartnerModel.findOne({
    email,
  });
  if (!isExists) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, isExists.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign({ id: isExists._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  res.status(201).json({
    message: "Food partner logged in successfully",
    foodPartner: {
      _id: isExists._id,
      name: isExists.email,
      email: isExists.email,
    },
  });
};

const logoutFoodPartner = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Food partner logged out successfully",
  });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
};
