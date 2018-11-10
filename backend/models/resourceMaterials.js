const mongoose = require('mongoose');
const  resourceMaterialsSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    project: {type:mongoose.Schema.Types.ObjectId,ref:'Projects',required:true},
    type: {type: String, enum:['equipment', 'facilities', 'funding'], required: true},
    status: {type: String, enum: ['Available', 'Not-Available'], default: 'Available', required: true}

});
module.exports = mongoose.model('Resource',resourceMaterialsSchema);