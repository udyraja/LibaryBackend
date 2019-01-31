const mongoose =require('mongoose');

const Author = require('../models/authors');
const Article = require('../models/articles');


exports.articles_get_all=(req,res,next) => {
    Article.find()
        .select('authorId author title Url Content CreatedAt UpdatedAt _id')
        .populate('authorId','name')
        .exec()
        .then(docs => {
            const response ={
                count : docs.length,
                author:docs.map(doc=>{
                    return{
                        _id:doc._id,
                        authorId:doc.authorId,
                        author:doc.author,
                        title:doc.title,
                        Url:doc.Url,
                        Content:doc.Content,
                        CreatedAt:doc.CreatedAt,
                        UpdatedAt:doc.UpdatedAt,
                        request:{
                            type:'GET',
                            url:'http://localhost:3001/articles/' + doc._id
                        }

                    }
                })
            };
          /*  res.status(200).json(response);
            /!*    if(docs.length >=0){
                    res.status(200).json(docs);
                }else{
                    res.status(404).json({
                        message:'no entry is found'
                    });
                }*!/*/
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
};
exports.articles_add_new =(req,res,next) => {
    Author.findById(req.body.authorId)
        .then(author =>{
            if(!author){
                return res.status(404).json({
                    message:"Author not Found"
                });
            }
            const article=new Article({
                _id:new mongoose.Types.ObjectId(),
                authorId:req.body.authorId,
                author:req.body.author,
                title:req.body.title,
                Url:req.body.Url,
                Content:req.body.Content,
                CreatedAt:req.body.CreatedAt,
                UpdatedAt:req.body.UpdatedAt,

            });
            return article
                .save()
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message:'Article is Stored',
                CreatedArticle:{
                    _id:result._id,
                    authorId:result.authorId,
                  //  author:result.author,
                    title:result.title,
                    Url:result.Url,
                    Content:result.Content,
                    CreatedAt:result.CreatedAt,
                    UpdatedAt:result.UpdatedAt,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3001/articles/' + result._id
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
exports.articles_get_authorId =(req,res,next)=> {
    Article.findById(req.params.authorId)
        .populate('author')
        .exec()
        .then(docs => {
            if(!author){
                return res.status(404).json({
                    message:"Author not Found"
                });
            }
            res.status(200).json({
                articles:docs,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3001/articles/'
                }
            })

        })
        .catch(err =>{
            res.status(500).json({
                error:err
            });
        });

};
exports.articles_update=(req,res,next)=> {
    const id =req.params.articleId;
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
                    url: 'http://localhost:3001/articles/' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error : err});
        });
};
exports.articles_delete=(req,res,next)=> {
    const id =req.params.articleId;
    Article.remove({_id:id})
        .exec()
        .then(result =>{
            res.status(200).json({
                message :'Article is deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3001/articles'
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