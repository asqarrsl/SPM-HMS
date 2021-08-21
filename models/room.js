const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const imageSchema = new Schema({
    url:String,
    filename:String
});

imageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload','/upload/w_300');
});
const roomSchema = new Schema({
    number:String,
    type:String,
    charge:String,
    headcount:String,
    image:String,
    // image:[imageSchema],
    status:{
        type:String,
        default : 1
    },
},{
    timestamps: true
});

module.exports = mongoose.model('Room',roomSchema);