const express=require('express');
const mongoose =require('mongoose')
const router = express.Router();
const  vaccinationCenterSchema = require("../models/vaccinationCenterSchema")
router.get('/',(request,response,next)=>{
   vaccinationCenterSchema.find()
   .exec()
   .then(docu=>{
       const centers=docu.map(doc=>{
           return{
               id:doc._id,
               hospitalName:doc.hospitalName,
               hospitalID:doc.hospitalID,
               type:doc.type,
               block:doc.block,
               state:doc.state,
               district:doc.district,
               pincode:doc.pincode,
               address1:doc.address1,
               address2:doc.address2,
               latitude:doc.latitude,
               longitude:doc.longitude,
               request:{
                   type:'GET',
                   url:'http://localhost:4000/products/'+doc._id
               }
           }
       })
       response.status(200).json(centers);
   })
   .catch(error=>{
       response.status(404).json({
           message:"DOCUMENTs arE EMPTY",
           error:error
       })
   })
});
router.post('/',(request,response,next)=>{
    const centers = new vaccinationCenterSchema({
        _id:new mongoose.Types.ObjectId(),
              
               hospitalName:request.body.hospitalName,
               hospitalID:request.body.hospitalID,
               type:request.body.type,
               block:request.body.block,
               state:request.body.state,
               district:request.body.district,
               pincode:request.body.pincode,
               address1:request.body.address1,
               address2:request.body.address2,
               latitude:request.body.latitude,
               longitude:request.body.longitude,
    });
    centers.save()
  
    .then(result=>{
        const centerResult={
        id:result._id,
        hospitalName:result.hospitalName,
        hospitalID:result.hospitalID,
        type:result.type,
        block:result.block,
        state:result.state,
        district:result.district,
        pincode:result.pincode,
        address1:result.address1,
        address2:result.address2,
        latitude:result.latitude,
        longitude:result.longitude,
       
    }
    response.status(200).json({
        message:'Handling post requests',
        createdcenters:centerResult
    });
        console.log(result)
    })
    .catch( error=>{
       
        response.status(200).json({
            message:'Error',
            createdcenters:error
        });
        console.log(error)
    });
    
});
router.get('/:centersId',(request,response,next)=>{
    const id = request.params.centersId;
    vaccinationCenterSchema.findById(id)
    .exec()
    .then(doc=>{
        console.log(doc)
        const centers={
            id:doc._id,
            hospitalName:doc.hospitalName,
            hospitalID:doc.hospitalID,
            type:doc.type,
            block:doc.block,
            state:doc.state,
            district:doc.district,
            pincode:doc.pincode,
            // address:address1+address2,
            address1:doc.address1,
            address2:doc.address2,
            latitude:doc.latitude,
            longitude:doc.longitude,
            request:{
                type:'GET',
                url:'http://localhost:4000/centers/'+doc._id
            }
        }
        response.status(200).json(centers);
    })
    .catch(error=>{
        console.log(error);
        response.status(500).json({
            error:id
        })
    })
});
router.put('/:centerId',async (request,response,next)=>{
    const id=request.params.centerId;
    const centers = new vaccinationCenterSchema({
               _id:id,
               hospitalName:request.body.hospitalName,
               hospitalID:request.body.hospitalID,
               type:request.body.type,
               block:request.body.block,
               state:request.body.state,
               district:request.body.district,
               pincode:request.body.pincode,
               address1:request.body.address1,
               address2:request.body.address2,
               latitude:request.body.latitude,
               longitude:request.body.longitude,
    });
    vaccinationCenterSchema.updateOne({_id: id}, centers).then(doc=>{
        console.log(doc)
        const centers={
            id:doc._id,
            hospitalName:doc.hospitalName,
            hospitalID:doc.hospitalID,
            type:doc.type,
            block:doc.block,
            state:doc.state,
            district:doc.district,
            pincode:doc.pincode,
            // address:address1+address2,
            address1:doc.address1,
            address2:doc.address2,
            latitude:doc.latitude,
            longitude:doc.longitude,
            request:{
                type:'GET',
                url:'http://localhost:4000/centers/'+doc._id
            }
        }
        response.status(200).json(centers);
    })
    .catch(error=>{
        console.log(error);
        response.status(500).json({
            error:id
        })
    })
    });

router.delete('/:centerId',(request,response,next)=>{
    const id=request.params.centerId;
    vaccinationCenterSchema.remove({_id:id})
    .exec()
    .then(doc=>{
        response.status(200).json({
            message:'deleetd succesfullt',
            data:doc
        });
    })
    .catch(error=>{
        response.status(500).json({
            error:error,
            message:'un succesfull'
        })
    })
   
});
module.exports = router;