const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerFacilitySchema = new Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CustomerFacility", customerFacilitySchema);
