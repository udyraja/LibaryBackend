const mongoose = require('mongoose');
const  projectsSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    user:{type:mongoose.Schema.Types.ObjectId,ref:'Users',required:true},
    projectName: {type:String, required:true},
    Objectives:{type:String, default:1},
    ResourceMaterials :{type:String, default:1},
    TimeAllocation :{type:String, default:1}
});
module.exports = mongoose.model('Projects',projectsSchema);