const Customer = require("../../models/customer");
const Country = require("../../models/country");
const State = require("../../models/state");

module.exports.index = (req, res) => {
  res.render("admin/customer/index");
};

module.exports.create = async (req, res) => {
  let data = [];
  let state = await State.find({});
  let country = await Country.find({});
  data["states"] = state;
  data["countries"] = country;
  res.render("admin/customer/create", { data });
};

module.exports.alldata = async (req, res) => {
  var data = await Customer.find({status:1}).populate('state').populate('country');
  res.send({ data });
};

module.exports.store = async (req, res) => {
  const customer = new Customer(req.body.customer);
  await customer.save();

  req.flash("success", "Successfully made a Customer!");
  res.redirect(`/admin/customer`);
};
module.exports.edit = async (req, res) => {
  let data = [];
  let state = await State.find({});
  let country = await Country.find({});
  data["states"] = state;
  data["countries"] = country;
  const customer = await Customer.findById(req.params.id);
  if (!customer) {
    req.flash("error", "Couldn't find that Customer!");
    return res.redirect(`/admin/customer`);
  }
  res.render("admin/customer/edit", { customer,data });
};

module.exports.update = async (req, res) => {
  const { id } = req.params;
  const customer = await Customer.findByIdAndUpdate(id, {
    ...req.body.customer,
  });
  await customer.save();

  req.flash("success", "Successfully Updated the Customer!");
  res.redirect(`/admin/customer/`);
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  const customer = await Customer.findById(id);
  customer.status = 4;
  await customer.save();

  req.flash("success", "Successfully Deleted a Customer!");
  res.redirect(`/admin/customer`);
};
