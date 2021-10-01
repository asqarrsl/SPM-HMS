const User = require("../models/user");

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

module.exports.renderRegister = (req, res) => {
  res.render("user/register");
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
  const redirectUrl = req.session.returnTo || "/admin/index";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
  req.logOut();
  req.flash("success", "Logged Out Successfully");
  res.redirect("/");
};
