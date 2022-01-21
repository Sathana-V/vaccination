const express=require('express');
const mongoose =require('mongoose')
const router = express.Router();
const orderSchema=require('../models/orders')
router.get('/',(request,response,next)=>{
    response.status(200).json({
        message:'Orderers were fetched'
    });
});
router.post('/',(request,response,next)=>{
    const order = new orderSchema({
        _id:new mongoose.Types.ObjectId(),
        product:request.body.product,
       quantity:request.body.quantity
    });
    order.save()
    .then(result=>{
       
        response.status(200).json({
            message:'ordered created',
           // products:products
        });
    })
    .catch( error=>{
        console.log(error)
    });
 
   
});

module.exports = router;