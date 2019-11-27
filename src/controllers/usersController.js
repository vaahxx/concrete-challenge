const User = require('../models/User');

const signUp = async (req, res, next) => {
    //verifica se o email já está cadastrado no banco de dados
    const emailExists = await User.findOne({email: req.body.email});
    if (emailExists) return res.status(400).json({"mensagem": "email já cadastrado"});
    
    // cria um novo usuário
    const user = new User(req.body);
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