const Customer = require("../../models/customer");
const Country = require("../../models/country");
const State = require("../../models/state");

module.exports.index = (req, res) => {
	res.render("receptionist/customer/index");
  };
  
  module.exports.create = async (req, res) => {
	let data = [];
	let state = await State.find({});
	let country = await Country.find({});
	data["states"] = state;
	data["countries"] = country;
	res.render("receptionist/customer/create", { data });
  };
  
  module.exports.alldata = async (req, res) => {
	var data = await Customer.find({status:1}).populate('state').populate('country');
	console.log(data);
	res.send({ data });
  };