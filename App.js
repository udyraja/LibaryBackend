const express = require ('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const app  = express();
const cors = require('cors');
const morgan = require('morgan');

const articlesRoutes= require('./backend/routes/articles');
const authorsRoutes= require('./backend/routes/authors');

mongoose.connect('mongodb://localhost/Test');
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
           res.header('Access-Control-Allow-Methods','PUT','POST','PATCH','DELETE','GET');
           return res.status(200).json({})
       }
       next();
    });


app.use('/articles',articlesRoutes);
app.use('/authors',authorsRoutes);


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