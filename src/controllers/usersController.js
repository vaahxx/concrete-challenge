const User = require('../models/User');
const bcrypt = require('bcryptjs');

const signUp = async (req, res, next) => {
    //verifica se o email já está cadastrado no banco de dados
    const emailExists = await User.findOne({email: req.body.email});
    if (emailExists) return res.status(400).json({"mensagem": "email já cadastrado"});

    // criptografa a senha
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(req.body.senha, salt);

    // cria um novo usuário
    const user = new User(req.body);
    user.senha = hashedPassword;
    try {
        const savedUser = await user.save();
        res.status(200).send(savedUser);
    } catch (err) {
        res.status(400).json(err);
    }
}; 

const signIn = (req, res, next) => {

};

const getUser = (req, res, next) => {

};

module.exports = {
    signUp,
    signIn,
    getUser
}