const Booking = require("../../models/room_booking");
const Customer = require("../../models/customer");
const Package = require("../../models/package");
const Room = require("../../models/room");
const Amenities = require("../../models/amenities");

module.exports.index = (req, res) => {
  res.render("receptionist/booking/index");
};

module.exports.create = async (req, res) => {
  let data = [];
  let packages = await Package.find({status:1});
  let customers = await Customer.find({status:1});
  let rooms = await Room.find({status:1});
  let ammenities = await Amenities.find({status:1});
  data["packages"] = packages;
  data["ammenities"] = ammenities;
  data["customers"] = customers;
  data["rooms"] = rooms;
  res.render("receptionist/booking/create", { data });
};

module.exports.alldata = async (req, res) => {
  var data = await Booking.find({status:1}).populate('room').populate('customer').populate('ammenities').populate('facilities');
  console.log(data);
  res.send({ data });
};

module.exports.store = async (req, res) => {
  const booking = new Booking(req.body.booking);
  await booking.save();

  req.flash("success", "Successfully made a Booking!");
  res.redirect(`/receptionist/booking`);
};
module.exports.edit = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    req.flash("error", "Couldn't find that Booking!");
    return res.redirect(`/admin/booking`);
  }
  res.render("receptionist/booking/edit", { booking });
};

module.exports.update = async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.findByIdAndUpdate(id, {
    ...req.body.booking,
  });
  await booking.save();

  req.flash("success", "Successfully Updated the Booking!");
  res.redirect(`/receptionist/booking/`);
};

// module.exports.delete = async (req, res) => {
//   const { id } = req.params;
//   const booking = await booking.findById(id);
//   booking.status = 4;
//   await booking.save();

//   req.flash("success", "Successfully Deleted a booking!");
//   res.redirect(`/admin/booking`);
// };
