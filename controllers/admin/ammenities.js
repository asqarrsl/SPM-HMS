const Ammenity = require("../../models/amenities");

module.exports.index = (req, res) => {
  res.render("admin/ammenity/index");
};

module.exports.create = async  (req, res) => {
  res.render("admin/ammenity/create");
};


module.exports.alldata = async (req, res) => {
  var data = await Ammenity.find({});
  res.send({ data });
};

module.exports.store = async (req,res)=>{
  const ammenity = new Ammenity(req.body.ammenity);
  await ammenity.save();
  
  req.flash('success','Successfully made a ammenity!');
  res.redirect(`/admin/ammenity`);
}
module.exports.edit = async (req,res)=>{  
  const ammenity = await Ammenity.findById(req.params.id);
  if(!ammenity){
      req.flash('error',"Couldn't find that ammenity!");
      return res.redirect(`/admin/ammenity`);
  }
  res.render('admin/ammenity/edit',{ammenity});
}

module.exports.update = async (req,res)=>{
  const {id} = req.params
  const ammenity = await Ammenity.findByIdAndUpdate(id, {...req.body.ammenity});
  await ammenity.save();

  req.flash('success','Successfully Updated the ammenity!');
  res.redirect(`/admin/ammenity/`);
}

module.exports.delete = async (req,res)=>{
  const {id} = req.params
  const ammenity = await Ammenity.findById(id);
  ammenity.status = 4;
  await ammenity.save();

  req.flash('success','Successfully Deleted a ammenity!');
  res.redirect(`/admin/ammenity`);
}

