const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const authRoute = require("../src/routes/auth.route");

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api", authRoute);

module.exports = app;
