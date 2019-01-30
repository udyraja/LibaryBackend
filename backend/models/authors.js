const mongoose = require('mongoose');
const  authorsSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    authorName:{type:String, required:true},

});
module.exports = mongoose.model('Author',authorsSchema);