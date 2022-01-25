const mongoose = require('mongoose');
const VaccinatingPeopleSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    firstname:String,
    secondname:String,
    age:Number,
    gender:String,
    aadhaar:Number,
    address:String,
    state:String,
    city:String,
    pincode:String,
    dose:Number
});
module.exports = mongoose.model('VaccinatingPeople',VaccinatingPeopleSchema);