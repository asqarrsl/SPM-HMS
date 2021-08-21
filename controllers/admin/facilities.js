const Facility = require("../../models/facility");

module.exports.index = (req, res) => {

  res.render("admin/facility/index");

};

module.exports.create = async  (req, res) => {

  res.render("admin/facility/create");

};


module.exports.alldata = async (req, res) => {

  var data = await Facility.find({});

  res.send({ data });

};

module.exports.store = async (req,res)=>{

  const facility = new Facility(req.body.facility);

  await facility.save();
  
  req.flash('success','Successfully made a facility!');
  res.redirect(`/admin/facility`);

}
module.exports.edit = async (req,res)=>{  

  const facility = await Facility.findById(req.params.id);

  if(!facility){

      req.flash('error',"Couldn't find that facility!");
      return res.redirect(`/admin/facility`);

  }
  res.render('admin/facility/edit',{facility});

}

module.exports.update = async (req,res)=>{

  const {id} = req.params
  const facility = await Facility.findByIdAndUpdate(id, {...req.body.facility});
  await facility.save();

  req.flash('success','Successfully Updated the facility!');
  res.redirect(`/admin/facility/`);

}

module.exports.delete = async (req,res)=>{

  const {id} = req.params
  const facility = await Facility.findById(id);
  facility.status = 4;
  await facility.save();

  req.flash('success','Successfully Deleted a facility!');
  res.redirect(`/admin/facility`);
  
}

