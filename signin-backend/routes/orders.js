const express=require('express');
const mongoose =require('mongoose')
const router = express.Router();
const orderSchema=require('../models/orders')
router.get('/',(request,response,next)=>{
    ProductSchema.find()
    .select('name price _id')
    .exec()
    
    const products=result.map(pro =>{
        return {
            _id:pro._id,
            product:pro.product,
            quantity:pro.quantity
        }
    })
    response.status(200).json({
        message:'ordered created',
        products:products
    });
    response.status(200).json({
        message:'Orderers were fetched'
    });
});
router.post('/',(request,response,next)=>{
    const order = new orderSchema({
        _id:new mongoose.Types.ObjectId(),
        product:request.body.productid,
       quantity:request.body.quantity
    });
    order.save()
    .then(result=>{
        const products=result.map(pro =>{
            return {
                _id:pro._id,
                product:pro.product,
                quantity:pro.quantity
            }
        })
        response.status(200).json({
            message:'ordered created',
            products:products
        });
    })
    .catch( error=>{
        console.log(error)
    });
 
   
});

module.exports = router;