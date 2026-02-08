const userModel = require("../models/auth.model");
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

module.exports = { registerUser, loginUser };
