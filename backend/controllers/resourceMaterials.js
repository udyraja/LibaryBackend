const mongoose =require('mongoose');

const Resource = require('../models/resourceMaterials');
const Project = require('../models/projects');

// Display list of all Resource.
exports.resource_list = (req, res,next) => {
    Resource.find()
        .select('projectName type status _id')
        .populate('projectName')
        .exec()
        .then(docs => {
            res.status(200).json({
                count : docs.length,
                resources:docs.map(doc =>{
                    return {
                        _id:doc._id,
                        projectName:doc.projectName,
                        type:doc.type,
                        status:doc.status,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3001/resources/' + doc._id
                        }
                    }
                })

            });
        })
        .catch(err =>{
            res.status(500).json({
                error:err
            });
        })
};

// Display detail page for a specific Resource.
exports.resource_detail = (req, res,next) =>{
    Resource.findById(req.params.projectId)
        .populate('projectName')
        .exec()
        .then(docs => {
            if(!projectName){
                return res.status(404).json({
                    message:"Project not Found"
                });
            }
            res.status(200).json({
                resources:docs,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3001/resources/'
                }
            })

        })
        .catch(err =>{
            res.status(500).json({
                error:err
            });
        });
};


// Resource create on POST.
exports.resource_create_post = (req, res,next) => {
    Project.findById(req.body.projectId)
        .then(project => {
            if (!project) {
                return res.status(404).json({
                    message: "Project not Found"
                });
            }
            const resource = new Resource({
                _id: new mongoose.Types.ObjectId(),
                project: req.body.projectId,
                type: req.body.type,
                status: req.body.status,
            });
            return resource
                .save()
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Resource is Stored',
                CreatedProject: {
                    _id: result._id,
                    project: result.project,
                    type: result.type,
                    status: result.status,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3001/resources/' + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

};
// Resource delete on DELETE.
exports.resource_delete_post = function(req, res) {
    const id =req.params.ResourceId;
    Resource.remove({_id:id})
        .exec()
        .then(result =>{
            res.status(200).json({
                message :'Resource is deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3001/resources',
                    body:{project:'ID', type:'String', status:'String'}
                }
            });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
};
