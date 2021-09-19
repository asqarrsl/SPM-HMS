const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomBookingSchema = new Schema(
  {
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
    },
    ammenities: [
      {
        type: Schema.Types.ObjectId,
        ref: "Amenities",
      },
    ],
    facilities: [
      {
        type: Schema.Types.ObjectId,
        ref: "Facility",
      },
    ],
    check_in: Date,
    checkout: Date,
    // image:[imageSchema],
    status: {
      type: String,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RoomBooking", roomBookingSchema);
