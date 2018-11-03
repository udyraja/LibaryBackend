const mongoose = require('mongoose');
const  loginSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    username:{type:String,required:true},
    Email: {
        type:String,
        required:true,
        unique:true,
        match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password:{type:String ,required:true}

});
module.exports = mongoose.model('Login',loginSchema);