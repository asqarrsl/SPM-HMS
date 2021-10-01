const Booking = require("../../models/room_booking");
const Customer = require("../../models/customer");
const Package = require("../../models/package");
const Payment = require("../../models/payment");
const Room = require("../../models/room");
const Amenities = require("../../models/amenities");

module.exports.payment = async (req, res) => {
  var booking = req.session.booking;
  var data = booking["total"];
  res.render("receptionist/booking/payment", { data });
};

module.exports.pay = async (req, res) => {
  const booking = new Booking(req.session.booking);

  await booking.save();

  const payment = new Payment(req.body.payment);
  payment["amount"] = booking["total"];
  payment["booking_id"] = booking._id;

  await payment.save();

  let customer_id = booking.customer;
  const customers = await Customer.findById(customer_id);
  customers.availability = 1;

  await customers.save();

  const room_no = booking.room;
  const room = await Room.findById(room_no);
  room.availability = 0;

  await room.save();

  req.session.booking = "";
  req.flash("success", "Successfully made a Payment!");
  res.redirect(`/receptionist/booking`);
};


module.exports.checkout = async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.findById(id);
  booking.availability = 0;
  await booking.save();


  let customer_id = booking.customer;
  let room_id = booking.room;

  const customers = await Customer.findById(customer_id);
  customers.availability = 0;

  await customers.save();

  const room = await Room.findById(room_id);
  room.availability = 1;

  await room.save();

  // req.flash("success", "Successfully Checked out!");
  // res.download(`views/receptionist/booking/reciept.ejs`);
  res.redirect(`/receptionist/booking`);
  // res.redirect(`/receptionist/booking/reciept`,{booking});




};

module.exports.reciept = async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.findById(id)
    .populate({
      path: 'customer',
      populate:{
        path:'country'
      },
      populate:{
        path:'state'
      },
    }
    )
    .populate("room")
    .populate("package")
    .populate("ammenities")
    ;

    const payment = await Payment.find({booking_id:id})
  res.render("receptionist/booking/reciept",{booking,payment});

};