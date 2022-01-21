const { response } = require('express');
const express=require('express')
const mongoose=require('mongoose')
const router = express.Router();
const userSchema=require('../models/user');
router.get('/',(request,response,next)=>{
    userSchema.find()
    .exec()
    .then(result=>{
        response.status(200)
        .json(result)
    })
    .catch(error=>{
        response.json({
            error:error
        })
    })
})
router.post('/',(request,response,next)=>{
    const user=userSchema({
        _id:new mongoose.Types.ObjectId(),
        userName:request.body.userName,
        email:request.body.email,
        password:request.body.password
    })
    user.save()
    .then(result => {
        response.status(200)
        .json({
            message:result
        })
    })
    .catch(error => {
        response.json({
            error:error,
            user:user
        })
    })
})
router.get('/:userId',(request,response,next)=>{
    const id = request.params.userId;
    userSchema.findById(id).exec()
    .then(doc=>{
        console.log(doc)
        const product={
            name:doc.userName,
            password:doc.password,
            email:doc.email,
            id:doc._id,
            request:{
                type:'GET',
                url:'http://localhost:4000/orders/'+doc._id
            }
        }
        response.status(200).json(product);
    })
    .catch(error=>{
        console.log(error);
        response.status(500).json({
            error:error
        })
    })
});
router.delete('/:userId',(request,response,next)=>{
    const id=request.params.userId;
    console.log(id)
    userSchema.remove({_id:id})
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
module.exports=router