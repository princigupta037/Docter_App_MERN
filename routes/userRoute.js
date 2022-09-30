const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", async (req, res) => {
  console.log("inside register");

  try {
    console.log("inside register");
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
    console.log(error);

    res.status(500).send({ message: "Error in Creating User", success: false });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(200).send({ message: "User does not exist", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (isMatch) {
      res.status(200).send({ message: "Pasword Incorrect", success: false });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res
        .status(200)
        .send({ message: "Login Success", success: true, data: token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error in Login User", success: false });
  }
});

router.post("/get-user-info-by-id", authMiddleware, async (req, res) => {
  try {
    console.log('inside')
    const user = await User.findById(req.body.userId);
    if (!user) {
      res.status(200).send({ message: "User not found", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: {
          name: user.name,
          email: user.email,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error in fetching user", success: false });
  }
});

module.exports = router;
