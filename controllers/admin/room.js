const Room = require("../../models/room");
const Country = require("../../models/country");
const State = require("../../models/state");

module.exports.index = (req, res) => {
  res.render("admin/room/index");
};

module.exports.create = async  (req, res) => {
  res.render("admin/room/create");
};


module.exports.alldata = async (req, res) => {
  var data = await Room.find({});
  res.send({ data });
};

module.exports.store = async (req,res)=>{
  const room = new Room(req.body.room);
  await room.save();
  
  req.flash('success','Successfully made a room!');
  res.redirect(`/admin/room`);
}
module.exports.edit = async (req,res)=>{  
  const room = await Room.findById(req.params.id);
  if(!room){
      req.flash('error',"Couldn't find that Room!");
      return res.redirect(`/admin/room`);
  }
  res.render('admin/room/edit',{room});
}

module.exports.update = async (req,res)=>{
  const {id} = req.params
  const room = await Room.findByIdAndUpdate(id, {...req.body.room});
  await room.save();

  req.flash('success','Successfully Updated the Room!');
  res.redirect(`/admin/room/`);
}

module.exports.delete = async (req,res)=>{
  const {id} = req.params
  const room = await Room.findById(id);
  room.status = 4;
  await room.save();

  req.flash('success','Successfully Deleted a Room!');
  res.redirect(`/admin/room`);
}

