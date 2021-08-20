const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema({
    name:String,
    country:{
        type:Schema.Types.ObjectId,
        ref:'Country'
    },
});

module.exports = mongoose.model('State',stateSchema);