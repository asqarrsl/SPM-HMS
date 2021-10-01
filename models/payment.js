const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema(
  {
    name: String,
    card_no: String,
    cvc: String,
    expire: String,
    amount: String,
    booking_id: {
      type: Schema.Types.ObjectId,
      ref: "RoomBooking",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", paymentSchema);
