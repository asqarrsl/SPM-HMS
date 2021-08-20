const Country = require("../../models/country");
const State = require("../../models/state");


module.exports.create = async  (req, res) => {
  let country = await Country.find({});
  res.render("admin/state/create",{country});
};

module.exports.store = async (req,res)=>{
  const state = new State(req.body.state);
  await state.save();
  
  req.flash('success','Successfully made a Customer!');
  res.redirect(`/admin/state`);
}


