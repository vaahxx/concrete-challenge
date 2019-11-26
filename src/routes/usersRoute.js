const router = require('express').Router();
const controller = require('../controllers/usersController');

//sign up
router.post('/cadastrar', controller.signUp);
//sign in
router.get('/entrar', controller.signIn);
//buscar usuario
router.get('/buscar-usuario', controller.getUser);

module.exports = router; 

