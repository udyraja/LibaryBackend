const mongoose =require('mongoose');

const Objective = require('../models/objectives');
const User= require('../models/users');


// Objective create on POST.
exports.objective_create_post =(req,res,next) => {
    User.findById(req.body.userId)
        .then(user =>{
            if(!user){
                return res.status(404).json({
                    message:"User not Found"
                });
            }
            const objective=new Objective({
                _id:new mongoose.Types.ObjectId(),
                user:req.body.userId,
                description:req.body.description,
                status:req.body.status,

            });
            return objective
                .save()
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message:'objective is Stored',
                CreatedObjective:{
                    _id:result._id,
                    user:result.user,
                    description:result.description,
                    status:result.status,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3001/objectives/' + result._id
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