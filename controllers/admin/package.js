const Package = require("../../models/package");

module.exports.index = (req, res) => {
  res.render("admin/package/index");
};

module.exports.create = async (req, res) => {
  res.render("admin/package/create");
};

module.exports.alldata = async (req, res) => {
  var data = await Package.find({status:1});
  res.send({ data });
};

module.exports.store = async (req, res) => {
  const package = new Package(req.body.package);
  await package.save();

  req.flash("success", "Successfully made a package!");
  res.redirect(`/admin/package`);
};
module.exports.edit = async (req, res) => {
  const package = await Package.findById(req.params.id);
  if (!package) {
    req.flash("error", "Couldn't find that package!");
    return res.redirect(`/admin/package`);
  }
  res.render("admin/package/edit", { package });
};

module.exports.update = async (req, res) => {
  const { id } = req.params;
  const package = await Package.findByIdAndUpdate(id, { ...req.body.package });
  await package.save();

  req.flash("success", "Successfully Updated the package!");
  res.redirect(`/admin/package/`);
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  const package = await Package.findById(id);
  package.status = 4;
  await package.save();

  req.flash("success", "Successfully Deleted a package!");
  res.redirect(`/admin/package`);
};
