const express=require('express');
const mongoose =require('mongoose')
const router = express.Router();
const orderSchema=require('../models/vaccinatingPeople')



router.post('/add',(req,res,next)=>{
    const vaccinatingPeopledetails = new orderSchema({
        _id:new mongoose.Types.ObjectId(),
        firstName:req.body.firstName,
        secondName:req.body.secondName,
        age:req.body.age,
        gender:req.body.gender,
        aadhaar:req.body.aadhaar,
        address:req.body.address,
        state:req.body.state,
        city:req.body.city,
        pincode:req.body.pincode,
        dose:req.body.dose
    });
    vaccinatingPeopledetails.save()
    .then(result=>{
        res.status(200).json({
            message:'Vaccinator added',
            data: vaccinatordetails
        });
    })
    .catch( error=>{
        console.log(error)
    });
});

module.exports = router;