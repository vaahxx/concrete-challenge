const router = require('express').Router();
const controller = require('../controllers/usersController');
//sign up
router.post('/cadastrar', controller.signUp);
//sign in
router.post('/entrar', controller.signIn);
//buscar usuario
router.get('/entrar/:id', controller.getUser);
//remover usuario
router.delete('/remover/:id', controller.deleteUser);

module.exports = router;
