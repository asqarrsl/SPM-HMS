const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const facilitySchema = new Schema(
  {
    name: String,
    duration: String,
    headcount: String,
    price: String,
    availability: {
      type: String,
      default: 1,
    },
    status: {
      type: String,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Facility", facilitySchema);

