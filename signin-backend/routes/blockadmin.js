
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
                id:result._id,
                firstName: result.firstName,
                lastName: result.lastName,
                age: result.age,
                address:result.address,
                state : result.state,
                hospitalAddress:result.hospitalAddress,
                city: result.city,
                phoneNumber:result.phoneNumber,
                pincode: result.pincode,
                gender : result.gender,
                type : result.type,
                role : result.role,
                hospitalName : result.hospitalName,
                hospitalId : result.hospitalId,
                
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
       
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        age:req.body.age,
        address:req.body.address,
        state:req.body.state,
        city:req.body.city,
        pincode:req.body.pincode,
        gender:req.body.gender,
        type:req.body.type,
        role:req.body.role,
        phoneNumber:req.body.phoneNumber,
        hospitalName:req.body.hospitalName,
        hospitalId:req.body.hospitalId,
        hospitalAddress:req.body.hospitalAddress
    })
    blockadmin.save()
    .then(result=>{
        const adminDetails = {
            id : result._id,
            firstName: result.firstName,
            lastName: result.lastName,
            age: result.age,
            address:result.address,
            state : result.state,
            city: result.city,
            phoneNumber:result.phoneNumber,
            pincode: result.pincode,
            gender : result.gender,
            type : result.type,
            role : result.role,
            hospitalName : result.hospitalName,
            hospitalId : result.hospitalId,
            hospitalAddress:result.hospitalAddress
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
            hospitalAddress:result.hospitalAddress,
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
    const id=req.params.adminId;
    const adminDetail = new blockAdminSchema({
               __id: id,
               firstName:req.body.firstName,
               lastName:req.body.lastName,
               age:req.body.age,
               address:req.body.address,
               state:req.body.state,
               city:req.body.city,
               pincode:req.body.pincode,
               gender:req.body.gender,
               type:req.body.type,
               role:req.body.role,
               hospitalName:req.body.hospitalName,
               hospitalAddress:req.body.hospitalAddress,
               hospitalId:req.body.hospitalId
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
            hospitalName:req.body.hospitalName,
            hospitalAddress:req.body.hospitalAddress,
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