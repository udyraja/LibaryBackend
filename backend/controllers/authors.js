const mongoose =require('mongoose');

const Author = require('../models/authors');



exports.authors_get_all=(req,res,next) => {
    Author.find()
        .select('authorName _id')
        .exec()
        .then(docs => {
            res.status(200).json({
                count : docs.length,
                authors:docs.map(doc =>{
                    return {
                        _id:doc._id,
                        authorName:doc. authorName,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3001/authors/' + doc._id
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

exports.authors_add_new= (req,res,next) => {
    const authors =new Author({
        _id:new mongoose.Types.ObjectId(),
        authorName:req.body.authorName

    });
    authors
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message:'Created new Author',
                createdAuthor: {
                    authorName:result.authorName,
                    _id:result._id,
                    request:{
                        type:'GET',
                        url:"http://localhost:3001/authors/" + result._id
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

exports.authors_get_projectById=(req,res,next) => {
    const id = req.params.authorId;
    Author.findById(id)
        .select('authorName _id')
        .exec()
        .then(doc=>{
            console.log("From Database",doc);
            if(doc){
                res.status(200).json({
                    user:doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3001/authors'
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

exports.authors_delete=(req,res,next) => {
    const id =req.params.authorId;
    Author.remove({_id:id})
        .exec()
        .then(result =>{
            res.status(200).json({
                message :'Author is deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3001/authors',
                    body:{authorName :'String'}
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