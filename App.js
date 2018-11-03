const express = require ('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const app  = express();
const cors = require('cors');
const morgan = require('morgan');

const userRoutes= require('./backend/routes/users');
const projectRoutes= require('./backend/routes/projects');
const loginRoutes= require('./backend/routes/login');

mongoose.connect('mongodb://localhost/ProjectManagementSERVER');
mongoose.Promise = global.Promise;

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(morgan('developer'));
app.use(cors());

app.use('/users',userRoutes);
app.use('/projects',projectRoutes);
app.use('/login',loginRoutes);



console.log("Server is Now Running...");
module.exports = app;