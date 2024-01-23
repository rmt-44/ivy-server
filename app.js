const express = require("express");
const app = express();
const { User } = require("./models");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    await User.create({ username, password });
    res.json({ message: "Register success" });
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      res.status(400).json({ message: err.errors[0].message });
    } else if (err.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({ message: err.errors[0].message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
