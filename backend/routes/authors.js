const express= require ('express');
const router = express.Router();

const AuthorController = require('../controllers/authors');

router.get('/',AuthorController.authors_get_all);

router.post('/',AuthorController.authors_add_new);

router.get('/:authorId',AuthorController.authors_get_projectById);

router.delete('/:authorId',AuthorController.authors_delete);

module.exports =router;


