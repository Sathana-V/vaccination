const mongoose = require('mongoose');
const vaccineCentreSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    hospitalname:String,
    address:String,
    type:String,
    accomodation:String,
    hospitalId:String,
    verified:String
});

module.exports = mongoose.model('VaccineCentre',vaccineCentreSchema);