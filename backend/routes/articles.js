const express= require ('express');
const router = express.Router();

//const CheackAuth =require('../middleware/check_auth');

const ArticleController = require('../controllers/articles');

//Get All Articles

router.get('/',ArticleController.articles_get_all);

//Add a new article

router.post('/',ArticleController.articles_add_new);

//get the articles by article id

router.get('/:articleId',ArticleController.articles_get_authorId);

//update article

router.patch('/:articleId',ArticleController.articles_update);

//delete article

router.delete('/:articleId',ArticleController.articles_delete);

module.exports =router;

