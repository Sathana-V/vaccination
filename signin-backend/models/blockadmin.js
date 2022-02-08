const express = require('express');
const mongoose = require('mongoose');
const app = express();
const blockAdminSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    firstName:String,
    lastName:String,
    age:Number,
    address:String,
    state:String,
    city:String,
    pincode:String,
    phoneNumber:String,
    gender:String,
    type:String,
    role:String,
    hospitalName:String,
    hospitalAddress:String,
    hospitalId:String
})

module.exports = mongoose.model('BlockAdmin',blockAdminSchema);