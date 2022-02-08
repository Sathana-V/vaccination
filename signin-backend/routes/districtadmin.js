const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const blockAdminSchema = require('../models/blockadmin');


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

// router.get('/vaccinecenter',(req, res) => {
//     app.use('/vaccinecenter',center);
// })






module.exports = router;