const mongoose = require('mongoose');
const  objectivesSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    user:{type:mongoose.Schema.Types.ObjectId,ref:'Users',required:true},
    description: {type: String, required: true},
    status: {type: String, enum:['on-going', 'completed'], required: true}

});
module.exports = mongoose.model('Objectives',objectivesSchema);