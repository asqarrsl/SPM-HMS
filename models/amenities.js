const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const amenitiesSchema = new Schema(
  {
    name: String,
    quantity: String,
    price_per_unit: String,
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

module.exports = mongoose.model("Amenities", amenitiesSchema);
