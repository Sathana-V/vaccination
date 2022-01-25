const express=require('express');
const mongoose =require('mongoose')
const router = express.Router();
const  ProductSchema = require("../models/product")
router.get('/',(request,response,next)=>{
   ProductSchema.find()
   .select('name price _id')
   .exec()
   .then(docu=>{
       const product=docu.map(doc=>{
           return{
               name:doc.name,
               price:doc.price,
               id:doc._id,
               request:{
                   type:'GET',
                   url:'http://localhost:4000/products/'+doc._id
               }
           }
       })
       response.status(200).json(product);
   })
   .catch(error=>{
       response.status(404).json({
           message:"DOCUMENTs arE EMPTY",
           error:error
       })
   })
});
router.post('/',(request,response,next)=>{
    const product = new ProductSchema({
        _id:new mongoose.Types.ObjectId(),
        name:request.body.name,
        price:request.body.price
    });
    product.save()
    .then(result=>{
        console.log(result)
    })
    .catch( error=>{
        console.log(error)
    });
    response.status(200).json({
        message:'Handling post requests',
        createdProduct:product
    });
});
router.get('/:productId',(request,response,next)=>{
    const id = request.params.productId;
    ProductSchema.findById(id).exec()
    .then(doc=>{
        console.log(doc)
        const product={
            name:doc.name,
            price:doc.price,
            id:doc._id,
            request:{
                type:'GET',
                url:'http://localhost:4000/products/'+doc._id
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
router.patch('/:productId',async (request,response,next)=>{
    const id=request.params.productId;
    const updateOps = request.body;
   const result = await ProductSchema.findByIdAndUpdate(id,updateOps,{new:true})
    .exec()
    .then(doc=>{
        response.status(200).json({
            message:'updated successfully',
            data:{
                data:doc
            }
        });
    })
    .catch(error=>{
        response.status(500).json({
            error:error,
            message:'not updated',
            data:error
        })
    })   
});
router.delete('/:productId',(request,response,next)=>{
    const id=request.body.productId;
    ProductSchema.remove({_id:id})
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