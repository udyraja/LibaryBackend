const express= require ('express');
const router = express.Router();

const LoginController = require('../controllers/login');

router.post('/signup',LoginController.login_signUp);
router.post('/login',LoginController.login_login);

module.exports =router;