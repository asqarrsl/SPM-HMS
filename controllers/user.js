const User = require("../models/user");

module.exports.renderRegister = (req, res) => {
  res.render("user/register");
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
