const express=require('express')
const app=express();
const morgan=require('morgan');
const mongoose = require('mongoose')
const bodyparser=require('body-parser')
const orderRoutes=require('./routes/orders')
const cors=require('cors')
const productRoutes=require("./routes/products")
const userRoutes=require('./routes/user');
const vaccinatingPeople = require('./routes/vaccinatingPeople');
const districtAdmin = require('./routes/districtadmin');
// mongoose.connect(
//     "mongodb+srv://sathana:"
//     +process.env.MONGO_ATLAS_PW+
//     "@cluster0.bwfr3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
// );
mongoose.connect('mongodb://localhost:27017/zilla');
mongoose.Promise=global.Promise;
app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use(cors());
// app.use((req,res,next)=>{
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers','Origin,X-Requested-With, Content-Type, Accept, Authorization');
//     if(req.method==='OPTIONS')
//     {
//         res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE'); 
//         return res.status(200).json({})
//     }
// });

app.use('/products',productRoutes);
app.use('/orders',orderRoutes);
app.use('/users',userRoutes);
app.use('/vaccinatingPeople',vaccinatingPeople);
app.use('/districtadmin',districtAdmin);
app.use((req,res,next)=>{
    const error =new Error('Not found anything');
    error.status=404;
    next(error);
})


app.use((error,req,res,next)=>{
    res.status(error.status||500);
    res.json({
        error:{
            message:error.message
        }
    })
})


module.exports = app;