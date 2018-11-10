const express = require ('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const app  = express();
const cors = require('cors');
const morgan = require('morgan');

const userRoutes= require('./backend/routes/users');
const projectRoutes= require('./backend/routes/projects');
const loginRoutes= require('./backend/routes/login');
const resourceRoutes= require('./backend/routes/resourceMaterials');

mongoose.connect('mongodb://localhost/ProjectManagementSERVER');
mongoose.Promise = global.Promise;

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(morgan('developer'));
app.use(cors());
app.use((req,res,next)=>{
       res.header('Access-Control-Allow-Origin','*');
       res.header('Access-Control-Allow-Headers',
           'Origin,X-Requested-With,Content-Type,Accept,Authorization'
       );
       if(req.method == 'OPTIONS'){
           res.header('Access-Control-Allow-Methods','PUT','POST','PATCH','DELETE,GET');
           return res.status(200).json({})
       }
       next();
    });


app.use('/users',userRoutes);
app.use('/projects',projectRoutes);
app.use('/login',loginRoutes);
app.use('/resources',resourceRoutes);

app.use((req,res,next)=>{
    const error =new Error('Not Found');
    error.status= 404;
    next(error);
});
app.use((error, req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    });
});

console.log("Server is Now Running...");
module.exports = app;