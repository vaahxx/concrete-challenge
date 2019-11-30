const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('./verifyToken');

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
    // gera o token do usuário
    const generatedToken = await jwt.sign({ id: user._id }, 'secretKey', {
        // o token expira em 2 minutos
        expiresIn: '120'
    });
    user.token = generatedToken;
    try {
        const savedUser = await user.save();
        return res.status(200).send(savedUser);
    } catch (err) {
        res.status(400).json(err);
    }
};

const signIn = async (req, res, next) => {
    //verifica se o email está cadastrado no banco de dados
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(401).json({'mensagem': 'usuário e/ou senha inválidos'});

    //verificação de senha
    const validPassword = await bcrypt.compare(req.body.senha, user.senha);
    if (!validPassword) return res.status(401).json({'mensagem': 'usuário e/ou senha inválidos'});

    return res.status(200).send(user);

    //res.header('auth-token', token).send(token);
};

const getUser = async (req, res, next) => {
    const token = req.header('auth-token');
    const user = await User.findOne({_id: req.params.id});

    if (!token) return res.status(401).send({'mensagem': 'acesso negado, sem token'});

    if (user.token !== token) return res.status(401).send({
        mensagem: 'acesso negado, não autorizado',
        token: token,
        userToken: user.token
    });

    const verificado = jwt.verify(token, 'secretKey', (err, decoded) => {
        if (err) return res.status(401).send({mensagem: 'sessão inválida, token expirado'});
        req.auth = decoded;
        return res.status(200).send(user);
    });
    console.log(verificado);


};

module.exports = {
    signUp,
    signIn,
    getUser
}