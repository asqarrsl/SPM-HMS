const ExpressError = require("./utils/ExpressError");
const {customerSchema} = require('./Schemas.js');

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You Must Login First");
    return res.redirect("/login");
  }
  next();
};
module.exports.isNotLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You are already authenticated");
    return res.redirect('back');
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
module.exports.validateCustomer = (req,res,next) =>{
  const { error } = customerSchema.validate(req.body);
  if (error) {
      const msg = error.details.map(el=>el.message).join(',');
      req.flash("error", "Access Denied");
      return res.redirect('/admin/customer/create', { message: req.flash('error') });
      // next();
      // throw new ExpressError(msg,400)
  }else{
      next();
  }
}