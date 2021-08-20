const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const passportLocalMongoose = require('passport-local-mongoose');

const customerSchema = new Schema({
    fname:String,
    lname:String,
    email:String,
    mobile:String,
    nic:String,
    dob:Date,
    address:String,
    city:String,
    // state:String,
    // country:String,
    state:{
        type:Schema.Types.ObjectId,
        ref:'State'
    },
    country:{
        type:Schema.Types.ObjectId,
        ref:'Country'
    },
    status:{
        type:String,
        default : 1
    },
},{
    timestamps: true
});

// customerSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Customer',customerSchema)