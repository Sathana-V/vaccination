const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const blockAdminSchema = require('../models/blockadmin');
const vaccineCentreschema = require('../models/vaccineCentre');
const userSchema = require('../models/user');



router.post('/',(req,res,next) => {
   blockAdminSchema.find().
   exec()
   .then(result => {
       res.status(200).json({
           Home : "admins",
           AdminsDetails : result
       });
   })
   .catch(err => {
       res.status(404).json(err);
   });
});

router.post('/add/vaccinecentre',(req, res, next) => {
    const vaccinecentre = new vaccineCentreschema({
        _id:new mongoose.Types.ObjectId(),
        hospitalname:req.body.hospitalname,
        address:req.body.address,
        type:req.body.type,
        accomodation:req.body.accomodation,
        hospitalId:req.body.hospitalId,
        verified:req.body.verified
    })
    vaccinecentre.save()
    .then(result=>{
       res.status(200).json({
           message : "success",
           Centredetails : vaccinecentre});
    })
    .catch(err=>{
        json.status(404).json(err);
   });
})




router.post('/add/blockadmin',(req, res, next) => {
    const blockadmin = new blockAdminSchema({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        age:req.body.age,
        mobile:req.body.mobile,
        address:req.body.address,
        position:req.body.position,
        hospitalname:req.body.hospitalname,
        hospitaladdress:req.body.hospitaladdress,
        blockId:req.body.blockId,
        type:req.body.type,
        role:req.body.role
    })
    blockadmin.save()
    .then(result=>{
       res.status(200).json({
           message : "success",
           AdminDetails : result
       });
    })
    .catch(err=>{
        json.status(404).json(err);
   });   
})



module.exports = router;