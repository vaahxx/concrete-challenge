const router = require('express').Router();
const controller = require('../controllers/usersController');

//sign up
router.post('/cadastrar', controller.signUp);
//sign in
//router.get('/entrar', controller.signIn);
//buscar usuario
//router.get('/entrar/:id', controller.getUser);

module.exports = router; 

