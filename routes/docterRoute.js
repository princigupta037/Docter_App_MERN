const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Docter = require("../models/docterModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/change-docter-status", async (req, res) => {
  try {
    const docter = await Docter.findById(req.body.user._id);
    res.status(200).send({
      message: "Docter status changed successfully",
      success: true,
      data: docter,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in applying for docter account",
      success: false,
      error,
    });
  }
});

module.exports = router;
