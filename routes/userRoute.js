const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

router.post('/register', async (req, res) => {
  console.log('inside register')

  try {
    console.log('inside register')
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      res.status(200).send({ message: "User already exists" });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = new User(req.body);
    const newUser = new User(req.body);
    await newUser.save();
    res
      .status(200)
      .send({ message: "User created successfully", success: true });
  } catch (error) {
    res.status(500).send({ message: "Error in Creating User", success: false });
  }
});

router.post('/login', async (req, res) => {
  try {
  } catch {}
});

module.exports = router;
