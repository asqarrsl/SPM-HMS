const Package = require("../../models/package");
const Facility = require("../../models/facility");
const Amenities = require("../../models/amenities");

module.exports.index = (req, res) => {
  res.render("admin/package/index");
};

module.exports.create = async (req, res) => {
  var data = [];
  data["facility"] = await Facility.find({ status: 1 });
  data["amenities"] = await Amenities.find({ status: 1 });
  res.render("admin/package/create", { data });
};

module.exports.alldata = async (req, res) => {
<<<<<<< HEAD
  var data = await Package.find({ status: 1 }).populate('facilities').populate('ammenities');
=======
  var data = await Package.find({ status: 1 })
    .populate("facilities")
    .populate("ammenities");
>>>>>>> 681bcb755f9be267b87f2ffa13da34a4fdfa84f8
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
  var data = [];
  data["facility"] = await Facility.find({ status: 1 });
  data["amenities"] = await Amenities.find({ status: 1 });
  if (!package) {
    req.flash("error", "Couldn't find that package!");
    return res.redirect(`/admin/package`);
  }
  res.render("admin/package/edit", { package, data });
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
