const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Docter = require("../models/docterModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const Appointment = require("../models/appointmentModel");
const moment = require("moment");

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
    console.log("inside");
    const user = await User.findById(req.body.userId);
    user.password = undefined;
    if (!user) {
      res.status(200).send({ message: "User not found", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error in fetching user", success: false });
  }
});

router.post("/apply-docter-account", async (req, res) => {
  try {
    console.log("insideee");
    const newdocter = new Docter({ ...req.body, status: "pending" });
    await newdocter.save();
    const adminUser = await User.findOne({ isAdmin: true });
    const unseenNotifications = adminUser.unseenNotifications;
    unseenNotifications.push({
      type: "new-docter-request",
      message: `${newdocter.firstName} ${newdocter.lastName} has applied for docter account`,
      data: {
        docterID: newdocter._id,
        name: newdocter.firstName + " " + newdocter.lastName,
      },
      onClickPath: "/admin/docter",
    });
    await User.findByIdAndUpdate(adminUser._id, { unseenNotifications });
    res
      .status(200)
      .send({ message: "Docter account applied successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in applying for docter account",
      success: false,
    });
  }
});

router.post("/mark-all-notifications-as-seen", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    const unseenNotifications = user.unseenNotifications;
    const seenNotifications = user.seenNotifications;
    seenNotifications.push(...unseenNotifications);
    user.unseenNotifications = [];
    user.seenNotifications = seenNotifications;
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      message: "Notifications marked as seen",
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in applying for docter account",
      success: false,
    });
  }
});

router.post("/delete-all-notifications", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.seenNotifications = [];
    user.unseenNotifications = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      message: "Notifications marked as seen",
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in applying for docter account",
      success: false,
    });
  }
});

router.post("/get-all-approved-docters", async (req, res) => {
  try {
    console.log(req.body.userId, "req.body.userId");
    const docter = await Docter.findOne({ status: "approved" });
    console.log(docter, "docter");
    res.status(200).send({
      message: "Docter profile fetched successfully",
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

router.post("/book-appointment", authMiddleware, async (req, res) => {
  try {
    req.body.status = "pending";
    // req.body.date = moment(req.body.date).format("YYYY-MM-DD").toISOString();
    // req.body.time = moment(req.body.time).format("HH:mm").toISOString();
    const appointment = new Appointment(req.body);
    await appointment.save();
    // console.log(userInfo);
    const user = await User.findOne({ _id: req.body.docterInfo.userId });
    user.unseenNotifications.push({
      type: "new-appointment-request",
      // message: `New appointment request from ${req.body.userInfo.name}`,
      onClickPath: "/docter/appointments",
    });
    await user.save();
    res.status(200).send({
      message: "Appointment booked successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in booking appointment",
      success: false,
      error,
    });
  }
});

router.post("/check-availability", authMiddleware, async (req, res) => {
  try {
    const date = moment(req.body.date, "DD:MM-YYYY").toISOString();
    const fromTime = moment(req.body.fromTime, "HH:mm")
      .subtract(1,'hours')
      .toISOString();
    const toTime = moment(req.body.toTime, "HH:mm")
      .add(1,'hours')
      .toISOString();
    const docterId = req.body.docterId;
    const appointments = await Appointment.find({
      docterId,
      date,
      time: { $gte: fromTime, $lte: toTime },
    });
    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Appointments not available",
        success: true,
      });
    } else {
      return res.status(200).send({
        message: "Appointment available",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in booking appointment",
      success: false,
      error,
    });
  }
});

router.get("/get-appointments-by-userId", authMiddleware,async (req, res) => {
  try {
    const appointments = await Appointment.findOne({ userId: req.body.userId });
    res.status(200).send({
      message: "Appointments fetched successfully",
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in applying for appointments account",
      success: false,
      error,
    });
  }
});
module.exports = router;
