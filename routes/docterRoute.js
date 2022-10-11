const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Docter = require("../models/docterModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const Appointment = require("../models/appointmentModel");

router.post("/get-docter-data", async (req, res) => {
  try {
    console.log(req.body.userId, "req.body.userId");
    const docter = await Docter.findOne({ userId: req.body.userId });
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

router.post("/update-docter-data", async (req, res) => {
  try {
    console.log(req.body.userId, "req.body.userId");
    const docter = await Docter.findOneAndUpdate(
      { userId: req.body.userId },
      { ...req.body }
    );
    console.log(docter, "docter");
    res.status(200).send({
      message: "Docter profile updated successfully",
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

router.post("/get-docter-info-by-id", async (req, res) => {
  try {
    const docter = await Docter.findOneAndUpdate(
      { docterId: req.body.docterId },
      { ...req.body }
    );
    res.status(200).send({
      message: "Docter profile updated successfully",
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

router.get(
  "/get-appointments-by-docterId",
  authMiddleware,
  async (req, res) => {
    try {
      const docter = await Docter.findOne({ userId: req.query.userId });
      const appointments = await Appointment.find({ docterId: docter?._id });
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
  }
);

module.exports = router;
