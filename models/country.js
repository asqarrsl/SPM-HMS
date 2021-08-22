const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  name: String,
  code: String,
});

module.exports = mongoose.model("Country", roomSchema);
