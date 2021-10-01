const Room = require("../../models/room");

module.exports.index = (req, res) => {
  res.render("receptionist/room/index");
};

module.exports.alldata = async (req, res) => {
  var data = await Room.find({ status: 1 });
  res.send({ data });
};
