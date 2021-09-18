const User = require("../models/user");

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
  let redirectUrl = req.session.returnTo;
  if (req.user.role === "a") {
    console.log(req.user.role);
    redirectUrl = req.session.returnTo || "/admin/index";
  }else if(req.user.role === "r"){
    console.log("s"+req.user.role);
    redirectUrl = req.session.returnTo || "/receptionist/index";
  }else{
    redirectUrl = req.session.returnTo || "/";

  }
  // const redirectUrl = req.session.returnTo || "/admin/index";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
  req.logOut();
  req.flash("success", "Logged Out Successfully");
  res.redirect("/");
};
