
const express=require('express');
const mongoose =require('mongoose');
const { count } = require('../models/blockadmin');
const router = express.Router();
const  blockAdminSchema = require("../models/blockadmin")



router.get('/',(request,response,next)=>{
    blockAdminSchema.find()
    .exec()
    .then(docu=>{
        const len = docu.length;
        const adminDetails=docu.map(result=>{
            return{
                _id :result._id,
                FirstName: result.firstName,
                LastName: result.lastName,
                Age: result.age,
                Address:result.address,
                State : result.state,
                City: result.city,
                Pincode: result.pincode,
                Gender : result.gender,
                Type : result.type,
                Role : result.role,
                HospitalName : result.hospitalName,
                HospitalId : result.hospitalId,
                request:{
                    type:'GET',
                    url:'http://localhost:4000/blockadmin/'+result._id
                }
            }
        })
        response.status(200).json({
            Count : len,
            AdminDetails : adminDetails
        });
    })
    .catch(error=>{
        response.status(404).json({
            message:"Document is empyt",
            error:error
        })
    })
 });







router.post('/',(req, res, next) => {
    const blockadmin = new blockAdminSchema({
        _id:new mongoose.Types.ObjectId(),
        firstName:req.body.firstname,
        lastName:req.body.lastname,
        age:req.body.age,
        address:req.body.address,
        state:req.body.state,
        city:req.body.city,
        pincode:req.body.pincode,
        gender:req.body.gender,
        type:req.body.type,
        role:req.body.role,
        hospitalName:req.body.hospitalname,
        hospitalId:req.body.hospitalid
    })
    blockadmin.save()
    .then(result=>{
        const adminDetails = {
            Id : result._id,
           FirstName: result.firstName,
           LastName: result.lastName,
           Age: result.age,
           Address:result.address,
           State : result.state,
           City: result.city,
           Pincode: result.pincode,
           Gender : result.gender,
           Type : result.type,
           Role : result.role,
           HospitalName : result.hospitalName,
           HospitalId : result.hospitalId
        }
       res.status(200).json({
           message : "successfullY added admin",
           AdminDetails : adminDetails
           });
    })
    .catch(err=>{
        json.status(404).json({
            message : "error adding admin",
            error : err
        });
   });   
})



router.get('/:adminId',(req,res,next)=>{
    const id = req.params.adminId;
    blockAdminSchema.findById(id)
    .exec()
    .then(result=>{
        const adminDetail={
            _id :result._id,
            FirstName: result.firstName,
            LastName: result.lastName,
            Age: result.age,
            Address:result.address,
            State : result.state,
            City: result.city,
            Pincode: result.pincode,
            Gender : result.gender,
            Type : result.type,
            Role : result.role,
            HospitalName : result.hospitalName,
            HospitalId : result.hospitalId,
            request:{
                type:'GET',
                url:'http://localhost:4000/blockadmin/'+result._id
            }
        }
        res.status(200).json({
            message: 'Admin Found',
            AdminDetails : adminDetail
        });
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json({
            message: 'No Admin Found',
            error : error
        })
    })
});




router.put('/:adminId',async (req,res,next)=>{
    const id=req.params.centerId;
    const adminDetail = new blockAdminSchema({
               __id: id,
               firstName:req.body.firstname,
               lastName:req.body.lastname,
               age:req.body.age,
               address:req.body.address,
               state:req.body.state,
               city:req.body.city,
               pincode:req.body.pincode,
               gender:req.body.gender,
               type:req.body.type,
               role:req.body.role,
               hospitalName:req.body.hospitalname,
               hospitalId:req.body.hospitalid
    });
    blockAdminSchema.updateOne({_id: id}, adminDetail).then(result=>{
        const adminDetails={
            _id :result._id,
            FirstName: result.firstName,
            LastName: result.lastName,
            Age: result.age,
            Address:result.address,
            State : result.state,
            City: result.city,
            Pincode: result.pincode,
            Gender : result.gender,
            Type : result.type,
            Role : result.role,
            HospitalName : result.hospitalName,
            HospitalId : result.hospitalId,
            request:{
                type:'GET',
                url:'http://localhost:4000/blockadmin/'+result._id
        }
    }
        res.status(200).json({
            message: 'Successfully Updated',
            UpdatedAdminDetails : adminDetail
        });
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json({
            message : 'Admin Id not found',
            error : error
        })
    })
    });




router.delete('/:adminId',(req,res,next)=>{
    const id=req.params.adminId;
    blockAdminSchema.remove({_id:id})
    .exec()
    .then(doc=>{
        res.status(200).json({
            message:'Admin Deleted',
            data:doc
        });
    })
    .catch(error=>{
        res.status(500).json({
            message:'Not Deleted',
            error : error
        })
    })
   
});



module.exports = router;