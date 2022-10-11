const mongoose = require("mongoose");
const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    docterId: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,       
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    docterInfo: {
      type: Object,
      required: true,
    },
    // userInfo: {
    //   type: Object,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

const appointmentModel = mongoose.model("appointments", appointmentSchema);
module.exports = appointmentModel;
