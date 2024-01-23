const express = require("express");
const app = express();
const { User } = require("./models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    res.status(400).json({ message: "Email is required" });
  }
  if (!password) {
    res.status(400).json({ message: "Password is required" });
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    res.status(401).json({ message: "Invalid email/password" });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    res.status(401).json({ message: "Invalid email/password" });
  }

  const accessToken = jwt.sign({ id: user.id });
  res.status(200).json({ message: "Login success", accessToken });
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
