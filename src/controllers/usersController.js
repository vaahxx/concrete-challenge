const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secretKey } = require('./verifyToken');

const signUp = async (req, res, next) => {
    //verifica se o email já está cadastrado no banco de dados
    const emailExists = await User.findOne({email: req.body.email});
    if (emailExists) return res.status(400).json({"mensagem": "email já cadastrado"});

    // criptografa a senha
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(req.body.senha, salt);

    // cria um novo usuário e grava a senha criptografada
    const user = new User(req.body);
    user.senha = hashedPassword;
    try {
        const savedUser = await user.save();
        res.status(200).send(savedUser);
    } catch (err) {
        res.status(400).json(err);
    }
}; 

const signIn = async (req, res, next) => {
    //verifica se o email está cadastrado no banco de dados
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).json({'mensagem': 'email não encontrado'});

    //verificação de senha 
    const validPassword = await bcrypt.compare(req.body.senha, user.senha);
    if (!validPassword) return res.status(400).json({'mensagem': 'senha incorreta'});

    const token = await jwt.sign({ _id: user.id }, secretKey);
    res.header('auth-token', token).send(token);
};

const getUser = (req, res, next) => {

};

module.exports = {
    signUp,
    signIn,
    getUser
}