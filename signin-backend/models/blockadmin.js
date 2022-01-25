const express = require('express');
const mongoose = require('mongoose');
const app = express();
const blockAdminSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    age:Number,
    mobile:Number,
    address:String,
    position:String,
    hospitalname:String,
    hospitaladdress:String,
    blockId:String,
    type:String,
    role:String
})

module.exports = mongoose.model('BlockAdmin',blockAdminSchema);