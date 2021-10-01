const ExpressError = require("./utils/ExpressError");
const {
  customerSchema,
  ammenitySchema,
  countrySchema,
  facilitySchema,
  packageSchema,
  paymentSchema,
  bookingSchema,
  roomSchema,
  stateSchema,
  userSchema,
} = require("./Schemas.js");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You Must Login First");
    return res.redirect("/login");
  }
  next();
};
module.exports.isIdValid = (req, res, next) => {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    console.log("gggg");
    // req.session.returnTo = req.originalUrl;
    next(new ExpressError("Page Not Found", 404));
    // req.flash("error", "You Must Login First")
    // return res.redirect("/login");
  }
  next();
};
module.exports.isNotLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You are already authenticated");
    return res.redirect("back");
  }
  next();
};
module.exports.isAdmin = async (req, res, next) => {
  if (res.locals.currentUser.role != "a") {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "Access Denied");
    return res.redirect("/");
  }
  next();
};
module.exports.isReceptionist = async (req, res, next) => {
  if (res.locals.currentUser.role != "r") {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "Access Denied");
    return res.redirect("/");
  }
  next();
};
module.exports.validateCustomer = (req, res, next) => {
  const { error } = customerSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    req.flash("error", msg);
    return res.redirect("/admin/customer/create");
  } else {
    next();
  }
};
module.exports.validateCustomerRep = (req, res, next) => {
  const { error } = customerSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    req.flash("error", msg);
    return res.redirect("/receptionist/customer/create");
  } else {
    next();
  }
};

module.exports.validateAmmenity = (req, res, next) => {
  const { error } = ammenitySchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    req.flash("error", msg);
    return res.redirect("/admin/ammenity/create");
  } else {
    next();
  }
};
module.exports.validateCountry = (req, res, next) => {
  const { error } = countrySchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    req.flash("error", msg);
    return res.redirect("/admin/country");
  } else {
    next();
  }
};
module.exports.validatFacility = (req, res, next) => {
  const { error } = facilitySchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    req.flash("error", msg);
    return res.redirect("/admin/facility/create");
  } else {
    next();
  }
};
module.exports.validatePackage = (req, res, next) => {
  const { error } = packageSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    req.flash("error", msg);
    return res.redirect("/admin/package/create");
  } else {
    next();
  }
};
module.exports.validatePayment = (req, res, next) => {
  const { error } = paymentSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    req.flash("error", msg);
    return res.redirect("/receptionist/booking/payment");
  } else {
    next();
  }
};
module.exports.validateBooking = (req, res, next) => {
  const { error } = bookingSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    req.flash("error", msg);
    return res.redirect("/receptionist/booking/create");
  } else {
    next();
  }
};
module.exports.validateRoom = (req, res, next) => {
  const { error } = roomSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    req.flash("error", msg);
    return res.redirect("/admin/room/create");
  } else {
    next();
  }
};
module.exports.validateState = (req, res, next) => {
  const { error } = stateSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    req.flash("error", msg);
    return res.redirect("/admin/state");
  } else {
    next();
  }
};
module.exports.validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    req.flash("error", msg);
    return res.redirect("/admin/user/create");
  } else {
    next();
  }
};
