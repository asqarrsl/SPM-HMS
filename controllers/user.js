const Customer = require("../models/customer");
const Room = require("../models/room");
const Booking = require("../models/room_booking");
const User = require("../models/user");

module.exports.renderProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.render("user/profile", { user });
};

module.exports.update = async (req, res) => {
  const id = req.user.id;
  const user = await User.findByIdAndUpdate(id, {
    ...req.body.user,
  });
  await user.save();

  req.flash("success", "Successfully Updated Your Account!");
  res.redirect(`/profile`);
};

module.exports.register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to SPM HMS!");
      res.redirect("/admin/index");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/register");
  }
};

module.exports.renderLogin = (req, res) => {
  res.render("user/login");
};

module.exports.login = (req, res) => {
  req.flash("success", "welcome back!");
  console.log(req.session);
  let redirectUrl = req.session.returnTo;
  if (req.user.role == "a") {
    console.log(req.user.role);
    redirectUrl = "/admin/dashboard";
  } else if (req.user.role == "r") {
    console.log("s" + req.user.role);
    redirectUrl = "/receptionist/dashboard";
  } 
  
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
  req.logOut();
  req.flash("success", "Logged Out Successfully");
  res.redirect("/");
};

module.exports.adminDash = async (req, res) => {
  let data = [];
  data["booking"] = await Booking.find({ status: 1, availability: 1 });
  var d = new Date();
  d.setMonth(d.getMonth() - 1);

  data["thismonth_booking"] = await Booking.find({
    status: 1,
    createdAt: {
      $gte: d,
      $lt: new Date(),
    },
  });
  data["thismonth_booking_current"] = await Booking.find({
    status: 1,
    availability: 1,
    createdAt: {
      $gte: d,
      $lt: new Date(),
    },
  });
  data["total_booking"] = await Booking.find({ status: 1 });
  data["thismonth_out_booking"] = await Booking.find({
    status: 1,
    availability: 0,
    createdAt: {
      $gte: d,
      $lt: new Date(),
    },
  });
  data["out_booking"] = await Booking.find({ status: 1, availability: 0 });

  data["rooms_book"] = await Room.find({ status: 1, availability: 0 });
  data["customers"] = await Customer.find({ status: 1, availability: 1 });
  data["rooms_available"] = await Room.find({ status: 1, availability: 1 });
  res.render("admin/dashboard/dashboard", { data });
};

module.exports.repDash = async (req, res) => {
  let data = [];
  data["customers"] = await Customer.find({ status: 1, availability: 1 });
  data["rooms_book"] = await Room.find({ status: 1, availability: 0 });
  data["booking"] = await Booking.find({ status: 1, availability: 1 });
  data["rooms_available"] = await Room.find({ status: 1, availability: 1 });
  res.render("receptionist/dashboard/dashboard", { data });
};

module.exports.home = (req, res) => {
  res.render("receptionist/dashboard/dashboard");
};
