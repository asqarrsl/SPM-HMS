const Booking = require("../../models/room_booking");
const Customer = require("../../models/customer");
const Package = require("../../models/package");
const Payment = require("../../models/payment");
const Room = require("../../models/room");
const Amenities = require("../../models/amenities");

module.exports.index = (req, res) => {
  res.render("receptionist/booking/index");
};

module.exports.create = async (req, res) => {
  let data = [];
  let packages = await Package.find({ status: 1 });
  let customers = await Customer.find({ status: 1 });
  let rooms = await Room.find({ status: 1, availability: 1 });
  let ammenities = await Amenities.find({ status: 1 });
  data["packages"] = packages;
  data["ammenities"] = ammenities;
  data["customers"] = customers;
  data["rooms"] = rooms;
  res.render("receptionist/booking/create", { data });
};

module.exports.alldata = async (req, res) => {
  var data = await Booking.find({ status: 1 })
    .populate("room")
    .populate("customer")
    .populate("ammenities")
    .populate("package");
  // console.log(data);
  res.send({ data });
};

module.exports.store = async (req, res) => {
  const booking = new Booking(req.body.booking);
  req.session.booking = booking;

  req.flash("success", "Successfully made a Booking!");
  res.redirect(`/receptionist/booking/payment`);
};

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

module.exports.edit = async (req, res) => {
  let data = [];
  let packages = await Package.find({ status: 1 });
  let customers = await Customer.find({ status: 1 });
  let rooms = await Room.find({ status: 1, availability: 1 });
  let ammenities = await Amenities.find({ status: 1 });
  data["packages"] = packages;
  data["ammenities"] = ammenities;
  data["customers"] = customers;
  data["rooms"] = rooms;

  const booking = await Booking.findById(req.params.id)
    .populate("customer")
    .populate("room");
  if (!booking) {
    req.flash("error", "Couldn't find that Booking!");
    return res.redirect(`/admin/booking`);
  }
  res.render("receptionist/booking/edit", { booking, data });
};

module.exports.update = async (req, res) => {
  const { id } = req.params;
  let bookingcheck = await Booking.findById(id);
  let bookings = req.body.booking;
  bookings.total =
    (bookingcheck.total > 0 ? parseFloat(bookingcheck.total) : 0) +
    (bookings.sub_total > 0 ? parseFloat(bookings.sub_total) : 0);
  const booking = await Booking.findByIdAndUpdate(id, {
    ...bookings,
  });
  res.redirect(`/receptionist/booking/`);
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
  res.redirect(`/receptionist/booking`);
};

module.exports.reciept = async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.findById(id)
    .populate({
      path: "customer",
      populate: {
        path: "country",
      },
      populate: {
        path: "state",
      },
    })
    .populate("room")
    .populate("package")
    .populate("ammenities");
  const payment = await Payment.find({ booking_id: id });
  res.render("receptionist/booking/reciept", { booking, payment });
};
