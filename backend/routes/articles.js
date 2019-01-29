const express= require ('express');
const router = express.Router();

const CheackAuth =require('../middleware/check_auth');

const UserController = require('../controllers/users');


router.get('/',UserController.users_get_all);

router.post('/',CheackAuth,UserController.users_add_new);
//get the User ID
router.get('/:userId',UserController.users_get_userId);

//update User
router.patch('/:userId',UserController.users_update);

//delete user
router.delete('/:userId',UserController.users_delete);

module.exports =router;

