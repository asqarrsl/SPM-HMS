const User = require("../../models/user");

module.exports.index = (req, res) => {
  res.render("admin/user/index");
};

module.exports.create = (req, res) => {
  res.render("admin/user/create");
};

module.exports.alldata = async (req, res) => {
  var data = await User.find({status:1});
  res.send({ data });
};

module.exports.register = async (req, res) => {
  try {
    const { fname, lname, role, email, username, password } = req.body.user;
    const newUser = new User({ fname, lname, email, username, role });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to SPM HMS!");
      res.redirect("/admin/user");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/admin/user/create");
  }
};

module.exports.edit = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    req.flash("error", "Couldn't find that User!");
    return res.redirect(`/admin/user`);
  }
  res.render("admin/user/edit", { user });
};

module.exports.update = async (req, res) => {
  const { id } = req.params;
  const users = await User.findByIdAndUpdate(id, { ...req.body.user });
  await users.save();

  req.flash("success", "Successfully Updated the Users!");
  res.redirect(`/admin/user/`);
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  user.status = 4;
  await user.save();

  req.flash("success", "Successfully Deleted a User!");
  res.redirect(`/admin/user`);
};
