const mongoose = require('mongoose');
const vaccinationCenterSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    hospitalName:String,
    hospitalID:String,
    address1:String,
    address2:String,
    block:String,
    state:String,
    district:String,
    pincode:String,
    type:String,
    latitude:String,
    longitude:String
});

module.exports = mongoose.model('VaccinationCenter',vaccinationCenterSchema);