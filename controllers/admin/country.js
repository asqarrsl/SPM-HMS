const Country = require("../../models/country");
const State = require("../../models/state");

module.exports.create = async (req, res) => {
  res.render("admin/country/create");
};

module.exports.store = async (req, res) => {
  const country = new Country(req.body.country);
  await country.save();
  req.flash("success", "Successfully made a Customer!");
  res.redirect(`/admin/country`);
};
