const express= require ('express');
const router = express.Router();

//const CheackAuth =require('../middleware/check_auth');

const ArticleController = require('../controllers/articles');


router.get('/',ArticleController.articles_get_all);

router.post('/',ArticleController.articles_add_new);
//get the User ID
router.get('/:articleId',ArticleController.articles_get_userId);

//update User
/*router.patch('/:articleId',ArticleController.articles_update);*/

//delete user
router.delete('/:articleId',ArticleController.articles_delete);

module.exports =router;

