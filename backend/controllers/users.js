const Users = require('../models/users');
const mongoose =require('mongoose');

exports.users_get_all=(req,res,next) => {
    Users.find()
        .select('name email _id')
        .exec()
        .then(docs => {
            const response ={
                count : docs.length,
                users:docs.map(doc=>{
                    return{
                        name:doc.name,
                        email:doc.email,
                        _id:doc._id,
                        request:{
                            type:'GET',
                            url:'http://localhost:3001/users/' + doc._id
                        }

                    }
                })
            };
            res.status(200).json(response);
            /*    if(docs.length >=0){
                    res.status(200).json(docs);
                }else{
                    res.status(404).json({
                        message:'no entry is found'
                    });
                }*/
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
};
exports.users_add_new= (req,res,next) => {
    const users =new Users({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        email:req.body.email
    });
    users
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message:'Created new User',
                createdUser: {
                    name:result.name,
                    email:result.email,
                    _id:result._id,
                    request:{
                        type:'GET',
                        url:"http://localhost:3001/users/" + result._id
                    }
                }
            });
        })
        .catch(err=> {
            console.log(err);
            res.status(500).json({
                error:err
            });

        });

};
exports.users_get_userId =(req,res,next)=> {
    const id = req.params.userId;
    Users.findById(id)
        .select('name email _id')
        .exec()
        .then(doc=>{
            console.log("From Database",doc);
            if(doc){
                res.status(200).json({
                    user:doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3001/users'
                    }
                });

            }else{
                res.status((404).json({message:'no valid entry found'}));
            }
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error : err});
        });

};
exports.users_update=(req,res,next)=> {
    const id =req.params.userId;
    const updateOps ={};
    for (const ops of req.body){
        updateOps[ops.prpName]=ops.value;
    }
    Users.update({_id:id},{$set:updateOps})
        .exec()
        .then(result=>{
            console.log(result);
            res.status(200).json({
                message :'user is updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3001/users/' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error : err});
        });
};
exports.users_delete=(req,res,next)=> {
    const id =req.params.userId;
    Users.remove({_id:id})
        .exec()
        .then(result =>{
            res.status(200).json({
                message :'user is deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3001/users',
                    body:{name :'String' , email:'String'}
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