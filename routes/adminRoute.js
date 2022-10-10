const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Docter = require("../models/docterModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/get-users-list", authMiddleware, async (req, res) => {
  try {
    const docters = await User.find();
    res.status(200).send({
      message: "Users List fetched successfully",
      success: true,
      data: docters,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in applying for docter account",
      success: false,
    });
  }
});

router.get("/get-docters-list", authMiddleware, async (req, res) => {
  try {
    const docters = await Docter.find();
    res.status(200).send({
      message: "Docters List fetched successfully",
      success: true,
      data: docters,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in applying for docter account",
      success: false,
    });
  }
});

router.post("/change-docter-status", async (req, res) => {
  try {
    const { docterId, status } = req.body;
    const docter = await Docter.findByIdAndUpdate(docterId, {
      status,
    });
    res.status(200).send({
      message: "Docter status changed successfully",
      success: true,
      data: docter,
    });
    const user = await User.findOne({ _id: docter.userId });
    const unseenNotifications = user.unseenNotifications;
    unseenNotifications.push({
      type: "new-docter-request-changed",
      message: `${newdocter.firstName} ${newdocter.lastName} has applied for docter account`,
      data: {
        docterID: newdocter._id,
        name: newdocter.firstName + " " + newdocter.lastName,
      },
      onClickPath: "/admin/docter",
    });
    user.isDocter =status === "approved" ? true : false;
    await User.findByIdAndUpdate(user._id, { unseenNotifications });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in applying for docter account",
      success: false,
    });
  }
});

module.exports = router;
