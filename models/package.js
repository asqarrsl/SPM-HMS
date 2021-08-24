const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const packageSchema = new Schema(
  {
    name: String,
    amount: String,
    facilities: String,
    ammenities: String,
    // facilities:{
    //     type:Schema.Types.ObjectId,
    //     ref:'Facility'
    // },
    // ammenities:{
    //     type:Schema.Types.ObjectId,
    //     ref:'Amenities'
    // },
    type: String,
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

module.exports = mongoose.model("Package", packageSchema);
