const mongoose =require('mongoose');

const Projects = require('../models/projects');
const User =require('../models/users');


exports.projects_get_all=(req,res,next) => {
    Projects.find()
        .select('user projectName Objectives ResourceMaterials TimeAllocation _id')
        .populate('user','name')
        .exec()
        .then(docs => {
            res.status(200).json({
                count : docs.length,
                projects:docs.map(doc =>{
                    return {
                        _id:doc._id,
                        user:doc.user,
                        projectName:doc.projectName,
                        Objectives:doc.Objectives,
                        ResourceMaterials:doc.ResourceMaterials,
                        TimeAllocation:doc.TimeAllocation,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3001/projects/' + doc._id
                        }
                    }
                })

            });
        })
        .catch(err =>{
            res.status(500).json({
                error:err
            });
        });
};
exports.projects_add_new =(req,res,next) => {
    User.findById(req.body.userId)
        .then(user =>{
            if(!user){
                return res.status(404).json({
                    message:"User not Found"
                });
            }
            const project=new Projects({
                _id:new mongoose.Types.ObjectId(),
                user:req.body.userId,
                projectName:req.body.projectName,
                Objectives:req.body.Objectives,
                ResourceMaterials :req.body.ResourceMaterials,
                TimeAllocation :req.body.TimeAllocation
            });
            return project
                .save()
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message:'Project is Stored',
                CreatedProject:{
                    _id:result._id,
                    user:result.user,
                    projectName:result.projectName,
                    Objectives:result.Objectives,
                    ResourceMaterials:result.ResourceMaterials,
                    TimeAllocation:result.TimeAllocation,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3001/projects/' + result._id
                    }
                }
            });
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
};
exports.projects_get_projectById=(req,res,next) => {
    Projects.findById(req.params.userId)
        .populate('user')
        .exec()
        .then(docs => {
            if(!user){
                return res.status(404).json({
                    message:"User not Found"
                });
            }
            res.status(200).json({
                projects:docs,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3001/projects/'
                }
            })

        })
        .catch(err =>{
            res.status(500).json({
                error:err
            });
        });
};
exports.projects_delete=(req,res,next) => {
    const id =req.params.projectId;
    Projects.remove({_id:id})
        .exec()
        .then(result =>{
            res.status(200).json({
                message :'Project is deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3001/projects',
                    body:{userId:'ID', projectName:'String', Objectives:'String', ResourceMaterials:'String', TimeAllocation:'String'}
                }
            });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
}