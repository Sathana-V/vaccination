const express=require('express')
const router=express.Router()
const siginTemplate = require('../models/signinTemplate')
router.post('/signup',(request,response)=>{
    const siginedUpUser = new siginTemplate({
           fullName:request.body.fullName,
           userName:request.body.userName,
           password:request.body.password,
           email:request.body.email
    })
    siginedUpUser.save()
   .then(data=>{
       console.log(data)
       response.json(data)
   })
   .catch(error=>{
       response.json(error)
   })
})

module.exports = router