const ExpressError = require("./utils/ExpressError");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You Must Login First");
    return res.redirect("/login");
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
